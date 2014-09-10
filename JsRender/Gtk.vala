

namespace JsRender {


 
    int gid = 1;

  
    public  class Gtk : JsRender
    {
       

        public Gtk(Project.Project project, string path) {
        
            base( project, path);
            this.xtype = "Gtk";
             
            
            
            //this.items = false;
            //if (cfg.json) {
            //    var jstr =  JSON.parse(cfg.json);
            //    this.items = [ jstr ];
            //    //console.log(cfg.items.length);
            //    delete cfg.json; // not needed!
            // }
             
            
            
            // super?!?!
            this.id = "file-gtk-%d".printf(gid++);
            //console.dump(this);
            // various loader methods..

            // Class = list of arguments ... and which property to use as a value.
       

            
            
        }
          

        /*
        setNSID : function(id)
        {
            
            this.items[0]['*class'] = id;
            
            
        },
        getType: function() {
            return 'Gtk';
        },
        */

        
         public   override void  loadItems() throws GLib.Error // : function(cb, sync) == original was async.
        {
          
            print("load Items!");
            if (this.tree != null) {
                return;
            }
            
            print("load: " + this.path);


            var pa = new Json.Parser();
            pa.load_from_file(this.path);
            var node = pa.get_root();
            
            if (node.get_node_type () != Json.NodeType.OBJECT) {
		        throw new Error.INVALID_FORMAT ("Unexpected element type %s", node.type_name ());
	        }
            var obj = node.get_object ();
            //this.modOrder = obj.get_string_member("modOrder");
            this.name = obj.get_string_member("name");
            this.parent = obj.get_string_member("parent");
            //this.permname = obj.get_string_member("permname");
            this.title = obj.get_string_member("title");
            //this.modOrder = obj.get_string_member("modOrder");
             
            // load items[0] ??? into tree...
	    var bjs_version_str = this.jsonHasOrEmpty(obj, "bjs-version");
	    bjs_version_str = bjs_version_str == "" ? "1" : bjs_version_str;

	    if (obj.has_member("items") 
			&& 
			obj.array_member("items").get_node_type() == Json.NodeType.ARRAY
			&&
			obj.get_array_member("items").get_length() > 0
		) {
		    var ar = obj.get_array_member("items");
		    var tree_base = ar.get_object_element(0);
		    this.tree = new Node();
		    this.tree.loadFromJson(tree_base, int.parse(bjs_version_str));

	    }
            
            
        }
         
         // convert xtype for munged output..
         
         /*
        mungeXtype : function(xtype, els)
        {
            els.push('xtype: '+ xtype);
        },
        */
		
        public override string toSourcePreview()
        {
			return "";
		}
      
        public override string toSource()
        {
        
            
            if (this.tree == null) {
                return "";
            }
            
            // var data = JSON.parse(JSON.stringify(this.items[0]));
            // we should base this on the objects in the tree really..
            string[]  inc = { "Gtk", "Gdk", "Pango", "GLib", "Gio", "GObject", 
                "GtkSource", "WebKit", "Vte" }; //, "GtkClutter" , "Gdl"];
            var src = "";
			 
            for (var i=0; i< inc.length; i++) {
				var e = inc[i];
                src += e+" = imports.gi." + e +";\n";
            }
            
            src += "console = imports.console;\n"; // path?!!?
            src += "XObject = imports.XObject.XObject;\n"; // path?!!?
            
            
            src += this.name + "=new XObject("+ this.mungeToString("    ") + ");\n";
            src += this.name + ".init();\n";
            // register it in the cache
            src += "XObject.cache['/" + this.name + "'] = " + this.name + ";\n";
            
            
            return src;
            
            
        }
		
        public override void save() {
            this.saveBJS();
            this.saveJS();
            this.saveVala();
        }
	    // ignore these calls.
        public override void saveHTML ( string html ) {}
	    
		    
        /** 
         *  saveJS
         * 
         * save as a javascript file.
         * why is this not save...???
         * 
         */ 
          
        void saveJS()
        {
             
            var fn = GLib.Path.get_dirname(this.path) + "/" + this.name + ".js";
            print("WRITE :%s\n " , fn);
            FileUtils.set_contents(fn, this.toSource());
            
        }
        
       void  saveVala()
        {
    		if (this.tree == null) {
			return;
		}
    		var fn = GLib.Path.get_dirname(this.path) + "/" + this.name + ".vala";
    		print("WRITE :%s\n " , fn);
		FileUtils.set_contents(fn,  NodeToVala.mungeFile(this));
            
            
        }
		/*
        valaCompileCmd : function()
        {
            
            var fn = '/tmp/' + this.name + '.vala';
            print("WRITE : " + fn);
            File.write(fn, this.toVala(true));
            
            
            
            return ["valac",
                   "--pkg",  "gio-2.0",
                   "--pkg" , "posix" ,
                   "--pkg" , "gtk+-3.0",
                   "--pkg",  "libnotify",
                   "--pkg",  "gtksourceview-3.0",
                   "--pkg", "libwnck-3.0",
                   fn ,   "-o", "/tmp/" + this.name];
            
           
             
            
        },
        */
        
   
        string getHelpUrl(string cls)
        {
            return "http://devel.akbkhome.com/seed/" + cls + ".html";
        }
        
	
        
	  

		

	}
}



