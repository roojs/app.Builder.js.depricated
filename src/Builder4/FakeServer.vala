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
        this.wkview.load_finished.connect(on_load_finished);
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
    
    
    
		
}
