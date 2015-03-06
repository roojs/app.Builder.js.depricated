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
			 
		print(request.get_path());
			 
		var  file = File.new_for_path ("/home/alan/gitlive" + request.get_path());
		if (!file.query_exists()) {
			return;
		}
			
		var stream = file.read();
		var info = file.query_info(
				 "standard::*",
				FileQueryInfoFlags.NONE
		);
		
		request.finish (  stream, info.get_size(), info.get_content_type());
	}
}
