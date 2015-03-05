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
          
        // Load the HTML into WebKit.
        // Note: load_finished signal MUST be hooked up before this call.
        string html_text = GearyApplication.instance.read_theme_file("message-viewer.html") ?? "";
        load_string(html_text, "text/html", "UTF8", "");
	}
	
	private bool on_navigation_policy_decision_requested(
		WebKit.WebFrame frame,
        WebKit.NetworkRequest request,
        WebKit.WebNavigationAction navigation_action,
        WebKit.WebPolicyDecision policy_decision
	) {
        policy_decision.ignore();
        
        // Other policy-decisions may be requested for various reasons. The existence of an iframe,
        // for example, causes a policy-decision request with an "OTHER" reason. We don't want to
        // open a webpage in the browser just because an email contains an iframe.
        //if (navigation_action.reason == WebKit.WebNavigationReason.LINK_CLICKED)
        //    link_selected(request.uri);
        return true;
    }
		
}
