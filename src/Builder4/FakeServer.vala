/**
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
  
        this.view.resource_load_started.connect(on_resource_request_starting);
        //this.view.navigation_policy_decision_requested.connect(on_navigation_policy_decision_requested);
        //this.view.new_window_policy_decision_requested.connect(on_navigation_policy_decision_requested);
          
         // 
         this.view.get_context().register_uri_scheme("xhttp",  serve);
        
	}
	/*
	private bool on_navigation_policy_decision_requested(
		WebKit.WebFrame frame,
        WebKit.NetworkRequest request,
        WebKit.WebNavigationAction navigation_action,
        WebKit.WebPolicyDecision policy_decision
	) {
        policy_decision.ignore();
        
        // not sure if we should allow navigations...
        return true;
    }
    */
    private void on_resource_request_starting(
		WebKit.WebResource resource, 
		WebKit.URIRequest request) {
        if (resource == null) {
			print("REQUEST : %s\n",uri);
            // A request that was previously approved resulted in a redirect.
            return;
        }

        string? uri = request.get_uri();
        
        if (uri == null) {
			return;
		}
		print("REQUEST : %s\n",uri);
		if (Regex.match_simple ("\\.php", uri)) {
			
			return;
		}
        print("CHANGE TO : x%s\n",uri);
        request.set_uri("x"+ uri);
           
    }
    public void serve(WebKit.URISchemeRequest request)
    { 
		// request is URISchemeRequest
			 
		print(request.get_path());
			 
		var  file = File.new_for_path ("/home/alan/gitlive/" + request.get_path());
		var stream = file.read();
		var info = file.query_info(
				 "standard::*",
				FileQueryInfoFlags.NONE
		);
		
		request.finish (  stream, info.get_size(), info.get_content_type());
	}
}
