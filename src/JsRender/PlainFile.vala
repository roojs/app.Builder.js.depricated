
/**
 * 
 *  this is the code represents a File when using the Gtk view..
 *   
 *  It ues NodeToGtk
 * 
 * 
 */

namespace JsRender {


 
    int gid = 1;

  
    public  class PlainFile : JsRender
    {
		string contents;

        public PlainFile(Project.Project project, string path) {
        
            base( project, path);
            this.xtype = "PlainFile";
            
            
            // fixme...
            this.language = "vala";
            
			this.contents = "";
            
            // super?!?!
            this.id = "file-plain-%d".printf(gid++);
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

		public   override void	 removeFiles() {
			if (FileUtils.test(this.pat, FileTest.EXISTS)) {
				GLib.FileUtils.remove(this.pat);
			}
			 
		}
        
		public   override void  loadItems() throws GLib.Error // : function(cb, sync) == original was async.
		{
		   return;
		}
         
        
		
        public override string toSourcePreview()
        {
			return "";
		}
      
        public override string toSource()
        {
			return "";
            
             
            
        }
		
        public override void save() {
            
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
            this.writeFile(fn, this.toSource());
            
        }
        
       void  saveVala()
        {
    		if (this.tree == null) {
			return;
		}
    		var fn = GLib.Path.get_dirname(this.path) + "/" + this.name + ".vala";
    		print("WRITE :%s\n " , fn);
			this.writeFile(fn,  NodeToVala.mungeFile(this));
            
            
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
        public override void  findTransStrings(Node? node )
		{
			// not yet..
		}
	
        
	  

		

	}
}



