
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
		   
		   GLib.FileUtils.get_contents(this.path, this.contents);
		   
		}
         
        
		
        public override string toSourcePreview()
        {
			 
		}
      
        public override string toSource()
        {
			return this.contents;
            
             
            
        }
		
        public override void save() {
            this.writeFile(this.path, this.contents);
            
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
         
   
        string getHelpUrl(string cls)
        {
            return ""; 
        }
        public override void  findTransStrings(Node? node )
		{
			// not yet..
		}
	
        
	  

		

	}
}



