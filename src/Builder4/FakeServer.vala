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
	Webkit.WebView view
	
	public FakeServer(Webkit.WebView wkview)
	{
		this.view = wkview;
		// 
		
		  
        // Hook up signals.
  
        this.wkview.resource_request_starting.connect(on_resource_request_starting);
        this.wkview.navigation_policy_decision_requested.connect(on_navigation_policy_decision_requested);
        this.wkview.new_window_policy_decision_requested.connect(on_navigation_policy_decision_requested);
          
         // 
         webcontext.register_uri_scheme("xhttp",  ( request) => {
			 // request is URISchemeRequest
        
	}
	
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
    
    private void on_resource_request_starting(
		WebKit.WebFrame web_frame,
        WebKit.WebResource web_resource, 
        WebKit.NetworkRequest request,
        WebKit.NetworkResponse? response) {
        if (response != null) {
            // A request that was previously approved resulted in a redirect.
            return;
        }

        string? uri = request.get_uri();
        if (uri == null) {
			return;
		}
		if (Regex.match_simple ("\.php", uri)) {
			return;
		}
         
        request.set_uri("x"+ uri);
           
    }
    public void serve(Webkit.URISchemeRequest request)
    { 
		// request is URISchemeRequest
			 
			 
			 
		var  file = File.new_for_path ("my-test.bin");
		var stream = file.read();
		var info = file.query_info(
				 "standard::*",
				FileQueryInfoFlags.NONE
		);
		
		request.finish (InputStream stream, info.get_size(), info.get_content_type());
		
}
