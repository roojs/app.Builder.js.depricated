/**
 * Resources
 * 
 * Idea is to manage resourse used by the app.
 * 
 * The original code downloaded all the resources before it renders the main window
 * 
 * This is a bit annoying as although they do change quite a bit, it's not on every page load
 * 
 * So the Resource fetching behaviour should be a button on the File view page
 * That starts the refresh of the resources.
 * 
 * I'm not quite sure how we should flow this - if we do them all at once.. might be a bit of a server 
 * overload... so sequentially may be best...
*/

public class Resources : Object
{

     var fetch_pos = 0;
     public void fetchStart()
     {
          this.fetch_pos =0;
         this.fetchNext();
         
     }
     public void fetchNext()
    {
        var cur = this.fetch_pos;
        this.fetch_pos++;
        switch (cur) {
               case 0: // html for rendering?
                    this.fetchResourceFrom (
                        "http://git.roojs.org/?p=app.Builder.js;a=blob_plain;f=resources/bootstrap.builder.html",
                        "bootstrap.builder.html",
                        (sess,msg) => {
                               this.fetchNext();
                    });
                    break;
                   
     )

    
    
    
     string[] res = { 
				"bootstrap.builder.html",
				"roo.builder.html",
				"roo.builder.js",
				"Gir.overides",
				"RooUsage.txt",
				"GtkUsage.txt"
			};
			for (var i = 0; i < res.length; i++ ) { 
				this.fetchResource(res[i], force);
			}
			
			this.fetchResourceFrom (
	                        "http://git.roojs.org/?p=roojs1;a=blob_plain;f=docs/json/roodata.json",
	                        "roodata.json",
                		force
                        );
			

		}
		public void fetchResource(string res, bool force) {
			if (!force && FileUtils.test(configDirectory() + "/resources/" + res, FileTest.EXISTS)) {
				return;
			}
			this.fetchResourceFrom(
	                       "http://git.roojs.org/?p=app.Builder.js;a=blob_plain;f=resources/" + res,
	                       res,
			       force
                       );
			


    
    public void fetchResourceFrom(string src, string target, Soup.SessionCallback? callback)
    {
		 
		// fetch...
		print("downloading %s \nto : %s\n", src,res);
		var session = new Soup.Session ();
		session.user_agent = "App Builder ";
	    var message = new Soup.Message ("GET",  src );
        session.queue_message (message, (sess, mess) => {

            FileUtils.set_contents(
               configDirectory() + "/resources/" + res,
                 (string) message.response_body.data
            );
                
            callback(sess,mess);
        });
		     

	}