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

	public static Gee.HashMap<string,FakeServerCache> cache;
	
        public static FakeServerCache factory(string fname)
	{
	    if (cache == null) {
		cache = new Gee.HashMap<string,FakeServerCache>();
	    }
	    if (cache.has_key(fname)) {
		return cache.get(fname);
	    }
	    var el = new  FakeServerCache(fname);
 
	     
	    cache.set(fname, el);
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
	    try { 
		GLib.FileUtils.get_contents(file.get_path(), out data, out length);
	    } catch (Error e) {
		

	    }

	    this.data = data;

	    print("FakeServerCache :%s, %s (%s/%d)\n", fname , 
	  	  this.content_type, this.size.to_string(), this.data.length);
	    

	}


	public   InputStream? run_async( ) 
	{
		//var f = ensure_resource();

		var stream =  new GLib.MemoryInputStream.from_data (this.data.data,  GLib.free);

		return stream;
	}
	private async InputStream? run_impl(Cancellable? cancellable) throws GLib.Error
	{
	    SourceFunc callback = run_impl.callback;
	    InputStream? ret = null;
	    Error? err = null;
	    new Thread<void*>("builder-fake-webserver", () => {
		    // Actually do it
		    try
		    {
			    ret = this.run_async();
		    }
		    catch (Error e)
		    {
			    err = e;
		    }

		    // Schedule the callback in idle
		    Idle.add((owned)callback);
		    return null;
	    });

	    // Wait for it to finish, yield to caller
	    yield;

	    if (err != null)
	    {
		    throw err;
	    }

	    // Return the input stream
	    return ret;
	}
	public void run(WebKit.URISchemeRequest request, Cancellable? cancellable) 
	{
	    run_impl.begin(cancellable, (obj, res) => {
		InputStream? stream = null;

		try {
			stream = this.run_impl.end(res);
		} catch (Error e)  {
		    request.finish_error(e);
		}
		if (stream == null) {
		    stream = new MemoryInputStream();
		}
		print("Send : %s (%s/%d)\n",  
		      this.content_type, this.size.to_string(), this.data.length);
		
		request.finish(stream,
	                 this.size,
	                 this.content_type);
                 
	    
		});
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
	var cx = this.view.get_context();
        cx.register_uri_scheme("xhttp",  serve);
	cx.set_cache_model (WebKit.CacheModel.DOCUMENT_VIEWER);
        
    }
    
    
    public void serve(WebKit.URISchemeRequest request)
    { 
		// request is URISchemeRequest
			 
		print("REQ: %s\n",request.get_path());
		var cdata = FakeServerCache.factory(request.get_path());
	
 		if (cdata.size < 1 ) {
			print("Skip file missing = %s/gitlive%s\n", GLib.Environment.get_home_dir() , request.get_path());
			request.finish_error(new FakeServerError.FILE_DOES_NOT_EXIST ("My error msg"));
			return;
		}
	
		print("Send :%s, %s (%s/%d)", request.get_path(), 
		      cdata.content_type, cdata.size.to_string(), cdata.data.length);
		cdata.run(request,    null);
		//var stream = new GLib.MemoryInputStream.from_data (cdata.data.data,  GLib.free);
		    
		// we could cache these memory streams... so no need to keep reading from disk...
		// then what happens if file get's updated - neet to check the data against the cache..
		
		
		
		//request.finish (  stream, cdata.size  , cdata.content_type);
		//stream.close();
	}

   
}
