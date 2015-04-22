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

     public signal void updateProgress(uint cur_pos);

     static Resources singleton_val;
     
     string[] avail_files;
     
     public static Resources singleton()
     {
        if (singleton_val == null) {
            singleton_val = new Resources();
            singleton_val.ref();
        }
        return singleton_val;
            
     }
	 public Resources ()
	 {
		 
	   this.avail_files = { 
		   "roodata.json",
			"bootstrap.builder.html",
			"roo.builder.html",
			"roo.builder.js",
			"Gir.overides",
			"RooUsage.txt",
			"GtkUsage.txt",
			"Editors/Edit.Roo.grid.Grid.js"
		};
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
        
        
        if (cur > this.avail_files.length) {
			this.updateProgress(0);
		     this.fetch_pos = 0;
		     return;
			
		}
        var target = this.avail_files[cur];
        var src = "http://git.roojs.org/?p=app.Builder.js;a=blob_plain;f=resources/" + target;
        if (target == "roodata.json") {
			src = "http://git.roojs.org/?p=roojs1;a=blob_plain;f=docs/json/roodata.json";
		}

		this.fetchResourceFrom (
			src,
			target,
			(sess,msg) => {
				switch (target) {
					case "Gir.overides":
						Palete.Gir.factory("Gtk").loadOverrides(true);
						break;
						
					case "GtkUsage.txt":
						Palete.factory("Gtk").load();
						break;
						
					case "roodata.json":
						Palete.factory("Roo").classes  = null;
						Palete.factory("Roo").load();
						break;
						
					default:
						break;
				}
			    this.fetchNext();
		});
		 

	 }
	 public void checkResources()
	 {
		bool needsload = false;
		string[] res = this.avail_files;
			
		for (var i = 0; i < res.length; i++ ) { 
			
			if (!FileUtils.test(
				BuilderApplication.configDirectory() + "/resources/"  + res[i],
				FileTest.EXISTS
				)) {
				needsload = true;
			}
		}
		if (!needsload) {
			return;
		}
		this.fetchStart();
	 }
		 
			


    
    public void fetchResourceFrom(string src, string target)
    {
		 
		// fetch...
		print("downloading %s \nto : %s\n", src,target);
		var session = new Soup.Session ();
		session.user_agent = "App Builder ";
	    var message = new Soup.Message ("GET",  src );
        session.queue_message (message, (sess, mess) => {
			
			
			var tfn = BuilderApplication.configDirectory() + "/resources/" + target;
			// create parent directory if needed
			if (!GLib.FileUtils.test (GLib.Path.get_dirname(tfn), FileTest.IS_DIR)) {
				var f =  GLib.File.new_for_path(GLib.Path.get_dirname(tfn));
				f.make_directory_with_parents ();
			}
			
			
			// set data??? - if it's binary?
            FileUtils.set_contents(  tfn, (string) message.response_body.data );
            
            switch (target) {
				case "Gir.overides":
					Palete.Gir.factory("Gtk").loadOverrides(true);
					break;
					
				case "GtkUsage.txt":
					Palete.factory("Gtk").load();
					break;
					
				case "roodata.json":
					Palete.factory("Roo").classes  = null;
					Palete.factory("Roo").load();
					break;
					
				default:
					break;
			}
            
            this.fetchNext();
             
        });
		     

    }
}
