/**
 * Originally this was supposed to intercept http calls and redirect them
 * but that is not supported in webkit2 (without using the extension api)
 * 
 * so for now we have modified our server to serve use a base url of xhttp:
 * 
 * so all relative urls are based on that 
 * 
 * Idea is to serve the files from the file system, so no need to setup apache etc...
 * This should work for the static content like css / javascript etc.. but 
 * will cause issues with 'dynamic' xhr files (eg. the php stuff)
 *
 * the idea is nicked from geary.
 * 
 */
public errordomain FakeServerError {
	FILE_DOES_NOT_EXIST
}

public class FakeServerCache : Object
{

	public string data;
	public string content_type;
	public int64 size; 

	public static Gee.HashMap<string,GLib.MemoryInputStream> cache;
	
        public static factory(string fname)
	{
	    if (cache == null) {
		cache = new Gee.HashMap<string,GLib.MemoryInputStream>();
	    }
	    if (cache.has_key(fn)) {
		return cache.get(fn);
	    }
	    var el = new  FakeServerCache(fn);
 
	     
	    cache.set(fn, el);
	    return el;
	}


	public FakeServerCache( string fname) {
		var  file = File.new_for_path ( GLib.Environment.get_home_dir() + "/gitlive" + fname);
		if (!file.query_exists()) {
		    this.data = "";
		    this.content_type = "";
		    this.size = 0;
		    return;
		}
		 var info = file.query_info(
				 "standard::*",
				FileQueryInfoFlags.NONE
		);
	    this.content_type = info.get_content_type();
	    this.size = info.get_size();
	    string data;
	    size_t length;
	    GLib.FileUtils.get_contents(file.get_path(), out data, out length);
	    this.data = data;
	    

	}
}

public class FakeServer : Object
{
	WebKit.WebView view;
	
	public FakeServer(WebKit.WebView wkview)
	{
		this.view = wkview;
		
		
		// 
		
		  
        // Hook up signals.
  
        //this.view.resource_load_started.connect(on_resource_request_starting);
        //this.view.navigation_policy_decision_requested.connect(on_navigation_policy_decision_requested);
        //this.view.new_window_policy_decision_requested.connect(on_navigation_policy_decision_requested);
          
         // 
         this.view.get_context().register_uri_scheme("xhttp",  serve);
        
    }
    
    
    public void serve(WebKit.URISchemeRequest request)
    { 
		// request is URISchemeRequest
			 
		print("REQ: %s\n",request.get_path());
		
 		
		var  file = File.new_for_path ( GLib.Environment.get_home_dir() + "/gitlive" + request.get_path());
		if (!file.query_exists()) {
			print("Skip file missing = %s/gitlive%s\n", GLib.Environment.get_home_dir() , request.get_path());
			request.finish_error(new FakeServerError.FILE_DOES_NOT_EXIST ("My error msg"));
			return;
		}
		

		if (!cache.has_key(file.get_path())) {
		    
	
		    string data;
		    size_t length;
		    GLib.FileUtils.get_contents(file.get_path(), out data, out length);
 
		    var stream = new GLib.MemoryInputStream.from_data (data.data,  GLib.free);
		    cache.set(file.get_path(), stream);
		}
		
		// we could cache these memory streams... so no need to keep reading from disk...
		// then what happens if file get's updated - neet to check the data against the cache..
		
		
		print("Sending %s (%s:%s)\n", request.get_path(), info.get_size().to_string(), info.get_content_type());
		
		request.finish (  cache.get(request.get_path()), info.get_size()  , info.get_content_type());
		//stream.close();
	}
}
