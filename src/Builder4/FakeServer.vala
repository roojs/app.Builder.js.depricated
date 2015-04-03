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
			return;
		}
		var info = file.query_info(
				 "standard::*",
				FileQueryInfoFlags.NONE
		);
		
		string data;
		size_t length;
		GLib.FileUtils.get_contents(file.get_path(), out data, out length);
		
		var stream = new MemoryInputStream.from_data (data,  GLib.free);
		
		// we could cache these memory streams... so no need to keep reading from disk...
		
		
		print("Sending %s (%s:%s)\n", request.get_path(), info.get_size().to_string(), info.get_content_type());
		
		request.finish (  stream, info.get_size()  , info.get_content_type());
		//stream.close();
	}
}
