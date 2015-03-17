/**
 * Resources
 * 
 * Idea is to manage resourse used by the app.
 * 
 * The original code downloaded all the resources before it renders the main window
 * 
 * This is a bit annoying as although they do change quite a bit, it's not on every app start
 * 
 * So the Resource fetching behaviour should be a button on the File view page
 * That starts the refresh of the resources.
 * 
 * I'm not quite sure how we should flow this - if we do them all at once.. might be a bit of a server 
 * overload... so sequentially may be best...
*/

public class Resources : Object
{

     delegate void updateProgress(uint cur_pos);

     static Resources singleton_val;
     static Resources singleton()
     {
        if (singleton_val != null) {
            singleton_val = new Resources();
        }
        return singleton_val;
            
     }

    
     uint fetch_pos = 0;
     public void fetchStart()
     {
            if (this.fetch_pos > 0) { // only fetch one at a time...
                return;
            }
            this.fetch_pos =0;
            this.fetchNext();
         
     }
     public void fetchNext()
    {
        var cur = this.fetch_pos;
        this.fetch_pos++;
        this.updateProgress(this.fetch_pos); // min=0;
        switch (cur) {
               case 0: // html for rendering Bootstrap apps.
                    this.fetchResourceFrom (
                        "http://git.roojs.org/?p=app.Builder.js;a=blob_plain;f=resources/bootstrap.builder.html",
                        "bootstrap.builder.html",
                        (sess,msg) => {
                               this.fetchNext();
                    });
                    break;
              case 1:// html for rendering Roo apps.
                     this.fetchResourceFrom (
                        "http://git.roojs.org/?p=app.Builder.js;a=blob_plain;f=resources/roo.builder.html",
                        "roo.builder.html",
                        (sess,msg) => {
                               this.fetchNext();
                    });
                    break;
             case 2: // generic javascript
                 this.fetchResourceFrom (
                        "http://git.roojs.org/?p=app.Builder.js;a=blob_plain;f=resources/roo.builder.js",
                        "roo.builder.js",
                        (sess,msg) => {
                            // should trigger a redraw on a the webkit if it's live...
                               this.fetchNext();
                    });
                    break;

            case 3: // Gir overrides - used to handle the fact we are not querying valadoc yet....and gir does
                    // not map that well to vala...
                    this.fetchResourceFrom (
                        "http://git.roojs.org/?p=app.Builder.js;a=blob_plain;f=resources/Gir.overides",
                        "Gir.overides",
                        (sess,msg) => {
                                (new Palete.GirObject()).loadOverides(true);
                                
                               this.fetchNext();
                    });
                    break;

            case 4: // The main gtk tree rules 
                    this.fetchResourceFrom (
                        "http://git.roojs.org/?p=app.Builder.js;a=blob_plain;f=resources/GtkUsage.txt",
                        "GtkUsage.txt",
                        (sess,msg) => {
                                Palete.factory("Gtk").load();
                               this.fetchNext();
                    });
                    break;
            case 5: // The main roo tree rules 
                    this.fetchResourceFrom (
                        "http://git.roojs.org/?p=app.Builder.js;a=blob_plain;f=resources/RooUsage.txt",
                        "RooUsage.txt",
                        (sess,msg) => {
                                // next step triggers the 
                                this.fetchNext();
                    });
                    break;     
          case 6: // The docs / types for Roojs - it's already in roojs if checked out..??
                    // we might be better just checking if roojs is set up configured.
                    
                    this.fetchResourceFrom (
                        "http://git.roojs.org/?p=roojs1;a=blob_plain;f=docs/json/roodata.json",
                        "roodata.json",
                        (sess,msg) => {
                                // See Palete.Roo
                            Palete/factory("Roo").classes. = null;
                            Palete factory("Roo").load();
                                this.updateProgress(0);
                               this.fetch_pos = 0;
                    });
                    break;  
        }

    
    
    
   

	 }
	 public void checkResources()
	 {
		    bool needsload = false;
		    string[] res = { 
				"bootstrap.builder.html",
				"roo.builder.html",
				"roo.builder.js",
				"Gir.overides",
				"RooUsage.txt",
				"GtkUsage.txt"
			};
			
			for (var i = 0; i < res.length; i++ ) { 
				
				if (!FileUtils.test(
					Application.configDirectory() + "/resources/"  + res[i],FileTest.EXISTS
					)) {
					needsload = true;
				}
			}
			if (!needsload) {
				return;
			}
			this.fetchStart();
	 }
		 
			


    
    public void fetchResourceFrom(string src, string target, Soup.SessionCallback? callback)
    {
		 
		// fetch...
		print("downloading %s \nto : %s\n", src,res);
		var session = new Soup.Session ();
		session.user_agent = "App Builder ";
	    var message = new Soup.Message ("GET",  src );
        session.queue_message (message, (sess, mess) => {

            FileUtils.set_contents(
               Application.configDirectory() + "/resources/" + res,
                 (string) message.response_body.data
            );
                
            callback(sess,mess);
        });
		     

	}
