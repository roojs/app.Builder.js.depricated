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

public class ResourcesItem : Object {
	public string target;
	public string src;
	public ResourcesItem(string src, string target) }
		this.target = target;
		this.src = src;
	}
	
}


public class Resources : Object
{

     public signal void updateProgress(uint cur_pos);

     static Resources singleton_val;
     
      
     Gee.ArrayList<ResourcesItem> fetch_files;
     
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
		 
		var avail_files = { 
			"roodata.json",
			"bootstrap.builder.html",
			"roo.builder.html",
			"roo.builder.js",
			"Gir.overides",
			"RooUsage.txt",
			"GtkUsage.txt",
			"Editors/*.js"
			//"Editors/Editor.Roo.grid.GridPanel.js"
		};
		this.fetch_files = new Gee.ArrayList<string>();
		for (var i=0;i < avail_files.length; i++) {
			var target = avail_files[i];
			var src = "https://raw.githubusercontent.com/roojs/app.Builder.js/master/resources/" + target;
			 
			if (target == "roodata.json") {
				src = "https://raw.githubusercontent.com/roojs/roojs1/master/docs/json/roodata.json";
				//src = "http://git.roojs.org/?p=roojs1;a=blob_plain;f=docs/json/roodata.json";
			}
			if (target.contains('*')) {
				var split = target.split('*');
				src = "https://api.github.com/repos/roojs/app.Builder.js/contents/resources/" + split[0];
			}
			
			this.fetch_files.add(new ResourcesItem(src,target));
		}
		
		
		
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
        
        
        if (this.fetch_pos > this.fetch_files.size) {
			 this.updateProgress(0);
		     this.fetch_pos = 0;
		     return;
			
		}
         
		this.fetchResourceFrom ( src, target );
		 

	 }
	 public void checkResources()
	 {
		bool needsload = false;
		string[] res = this.fetch_files;
			
		for (var i = 0; i <  this.fetch_files.length; i++ ) { 
			
			if (!FileUtils.test(
				BuilderApplication.configDirectory() + "/resources/"  + this.fetch_files.get(i).target
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
		 
	public void parseDirectory(string json, string target)
	{
		var pa = new Json.Parser();
		pa.load_from_file(json);
		var node = pa.get_root();
		if (node.get_node_type () != Json.NodeType.ARRAY) {
			return;
			//throw new Error.INVALID_FORMAT ("Unexpected element type %s", node.type_name ());
		}
		
		var split = target.split('*');
		var obj = node.get_array ();
		for(var i = 0; i < node.get_length(); i++) {
			var ob = node.get_object_element(i);
			var n = ob.get_string_member("name");
			var p = ob.get_string_member("path");
			if (split.length > 1 && !name.has_suffix(split[1])) {
				// not related..
				continue;
			}
			
		}
	


    
    public void fetchResourceFrom(ResourcesItem item)
    {
		 
		// fetch...
		print("downloading %s \nto : %s\n", item.src,item.target);
		var session = new Soup.Session ();
		session.user_agent = "App Builder ";
	    var message = new Soup.Message ("GET",  item.src );
        session.queue_message (message, (sess, mess) => {
			
			if (item.target.contains('*')) {
				// then it's a directory listing in JSON, and we need to add any new items to our list..
				// it's used to fetch Editors (and maybe other stuff..)
				this.parseDirectory((string) message.response_body.data,item.target );
				this.fetchNext();
				return;
			}
			
			
			var tfn = BuilderApplication.configDirectory() + "/resources/" + target;
			
			
			// create parent directory if needed
			if (!GLib.FileUtils.test (GLib.Path.get_dirname(tfn), FileTest.IS_DIR)) {
				var f =  GLib.File.new_for_path(GLib.Path.get_dirname(tfn));
				f.make_directory_with_parents ();
			}
			
			
			
			
			// set data??? - if it's binary?
            FileUtils.set_contents(  tfn, (string) message.response_body.data );
            
            switch (item.target) {
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
