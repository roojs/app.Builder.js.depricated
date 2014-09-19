//<Script type="text/javascript">

namespace JsRender {


	public errordomain Error {
		INVALID_FORMAT
	}
		
	public abstract class JsRender  : Object {
		/**
		 * @cfg {Array} doubleStringProps list of properties that can be double quoted.
		 */
		public Gee.ArrayList<string> doubleStringProps;
		
		public string id;
		public string name;   // is the JS name of the file.
		public string fullname;
		public string path;  // is the full path to the file.
		public string parent;  // JS parent.
		public string region;  // RooJS - insert region.
        
		public string title;  // a title.. ?? nickname.. ??? -

		public string permname;
		public string modOrder;
		public string xtype;
		public uint64 webkit_page_id; // set by webkit view - used to extract extension/etc..
		    
		public Project.Project project;
		//Project : false, // link to container project!
		
		public Node tree; // the tree of nodes.
		
		public GLib.List<JsRender> cn; // child files.. (used by project ... should move code here..)

		public bool hasParent; 

		public signal void changed (Node? node, string source); 

		/**
		 * UI componenets
		 * 
		 */
		//public Xcls_Editor editor;
		
		
		
		public JsRender(Project.Project project, string path) {
		    
		    this.cn = new GLib.List<JsRender>();
		    this.path = path;
		    this.project = project;
		    this.hasParent = false;
		    this.parent = "";
		    this.tree = null;
		    this.title = "";
		    this.region = "";
		    this.permname = "";
		    this.modOrder = "";
			
		    // should use basename reallly...
			
		    var ar = this.path.split("/");
		        // name is in theory filename without .bjs (or .js eventually...)
		    try {
		        Regex regex = new Regex ("\\.(bjs|js)$");

		        this.name = ar.length > 0 ? regex.replace(ar[ar.length-1],ar[ar.length-1].length, 0 , "") : "";
		    } catch (Error e) {
		        this.name = "???";
		    }
		    this.fullname = (this.parent.length > 0 ? (this.parent + ".") : "" ) + this.name;

		   this.doubleStringProps = new Gee.ArrayList<string>();
		    
		}
		// not sure why xt is needed... -> project contains xtype..
		
		public static JsRender factory(string xt, Project.Project project, string path)
		{
	 
		    switch (xt) {
		        case "Gtk":
		            return new Gtk(project, path);
		        case "Roo":
		            return new Roo(project, path);
		    }
			throw new Error.INVALID_FORMAT("JsRender Factory called with xtype=%s", xt);
		    return null;    
		}

		public string toJsonString()
		{
			var generator = new Json.Generator ();
		    generator.indent = 4;
		    generator.pretty = true;
		    var node = new Json.Node(Json.NodeType.OBJECT);
		    node.set_object(this.toJsonObject());
		    generator.set_root(node);
		    return generator.to_data(null);
		}
	
		public string nickType()
		{
			var ar = this.name.split(".");
			string[] ret = {};
			for (var i =0; i < ar.length -1; i++) {
				ret += ar[i];
			}
			return string.joinv(".", ret);
			
		}
		public string nickName()
		{
			var ar = this.name.split(".");
			return ar[ar.length-1];
			
		}

		
		public string getIconFileName(bool return_default)
		{
			 
			var m5 = GLib.Checksum.compute_for_string(GLib.ChecksumType.MD5,this.path); 

			var dir = GLib.Environment.get_home_dir() + "/.Builder/icons";
			if (!FileUtils.test(dir, FileTest.IS_DIR)) {
				 File.new_for_path(dir).make_directory();
			}
			var fname = dir + "/" + m5 + ".png";
			
			if (!return_default) {
				print("getIconFileName return %s\n", fname);
				return fname;
			}
			
			if (FileUtils.test(fname, FileTest.EXISTS)) {
				print("getIconFileName return %s\n", fname);
				return fname;
			}
			// we need to create this somehow...
			print("getIconFileName return %s\n", GLib.Environment.get_home_dir() + "/.Builder/test.jpg");
			return  GLib.Environment.get_home_dir() + "/.Builder/test.jpg";

		}
		

		public void saveBJS()
		{
		     
		    var generator = new Json.Generator ();
		    generator.indent = 4;
		    generator.pretty = true;
		    var node = new Json.Node(Json.NodeType.OBJECT);
		    node.set_object(this.toJsonObject());
		    generator.set_root(node);
		    
		    print("WRITE :%s\n " , this.path);// + "\n" + JSON.stringify(write));
		    try {
		        generator.to_file(this.path);
		    } catch(Error e) {
		        print("Save failed");
		    }
		}
		 
		 

		public abstract void loadItems() throws GLib.Error;
		
		/**
		 *
		 * load from a javascript file.. rather than bjs..
		 * 
		 *
		 */
		 /*
		_loadItems : function(cb)
		{
		    // already loaded..
		    if (this.items !== false) {
		        return false;
		    }
		      
		    
		    
		    var tr = new  TokenReader(  { 
		        keepDocs :true, 
		        keepWhite : true,  
		        keepComments : true, 
		        sepIdents : false,
		        collapseWhite : false,
		        filename : args[0],
		        ignoreBadGrammer: true
		    });
		    
		    var str = File.read(this.path);
		    var toks = tr.tokenize(new TextStream(str));  
		    var rf = new JsParser(toks);
		    rf.parse();
		    var cfg = rf.cfg;
		    
		    this.modOrder = cfg.modOrder || '001';
		    this.name = cfg.name.replace(/\.bjs/, ''); // BC!
		    this.parent =  cfg.parent;
		    this.permname =  cfg.permname || '';
		    this.title =  cfg.title || cfg.name;;
		    this.items = cfg.items || []; 
		    //???
		    //this.fixItems(_this, false);
		    cb();
		    return true;    
		        
		},
		*/
		    /**
		     * accepts:
		     * { success : , failure : , scope : }
		     * 
		     * 
		     * 
		     */
		/*     
		void getTree ( o ) {
		    print("File.getTree tree called on base object?!?!");
		}
	*/
		public string jsonHasOrEmpty(Json.Object obj, string key) {
			return obj.has_member(key) ? 
						obj.get_string_member(key) : "";
		}

		
		public Json.Object toJsonObject ()
		{
		    
		    
			var ret = new Json.Object();
			//ret.set_string_member("id", this.id); // not relivant..
			ret.set_string_member("name", this.name);
			ret.set_string_member("parent", this.parent == null ? "" : this.parent);
			ret.set_string_member("title", this.title == null ? "" : this.title);
			ret.set_string_member("path", this.path);
			//ret.set_string_member("items", this.items);
			ret.set_string_member("permname", this.permname  == null ? "" : this.permname);
			ret.set_string_member("modOrder", this.modOrder  == null ? "" : this.modOrder);
			var ar = new Json.Array();
			// empty files do not have a tree.
			if (this.tree != null) {
				ar.add_object_element(this.tree.toJsonObject());
			}
			ret.set_array_member("items", ar);
		
		    return ret;
		}
		
		

		public string getTitle ()
		{
		    if (this.title.length > 0) {
		        return this.title;
		    }
		    var a = this.path.split("/");
		    return a[a.length-1];
		}
		public string getTitleTip()
		{
		    if (this.title.length > 0) {
		        return "<b>" + this.title + "</b> " + this.path;
		    }
		    return this.path;
		}
		/*
		    sortCn: function()
		    {
		        this.cn.sort(function(a,b) {
		            return a.path > b.path;// ? 1 : -1;
		        });
		    },
		*/
		    // should be in palete provider really..


		public Palete.Palete palete()
		{
			return Palete.factory(this.xtype);

		}
		
		public string guessName(Node ar) // turns the object into full name.
		{
		     // eg. xns: Roo, xtype: XXX -> Roo.xxx
		    if (!ar.hasXnsType()) {
		       return "";
		    }
		    
		    return ar.get("* xns") + "." + ar.get("* xtype");
		                      
		                        
		}
		/**
		 *  non-atomic write (replacement for put contents, as it creates temporary files.
		 */
		public void writeFile(string path, string contents) throws GLib.IOError
		{

			         
			var f = GLib.File.new_for_path(path);
			var data_out = new GLib.DataOutputStream(
                                          f.replace(null, false, Gio.FileCreateFlags.NONE, null)
         	       );
			data_out.put_string(string, null);
			data_out.close(null);
		}
		/*
		copyTo: function(path, cb)
		{
		    var _this = this;
		    this.loadItems(function() {
		        
		        _this.path = path;
		        cb();
		    });
		    
		},
		*/
		
		/**
		 * 
		 * munge JSON tree into Javascript code.
		 *
		 * NOTE - needs a deep copy of original tree, before starting..
		 *     - so that it does not modify current..
		 * 
		 * FIXME: + or / prefixes to properties hide it from renderer.
		 * FIXME: '*props' - not supported by this.. ?? - upto rendering code..
		 * FIXME: needs to understand what properties might be translatable (eg. double quotes)
		 * 
		 * @arg {object} obj the object or array to munge..
		 * @arg {boolean} isListener - is the array being sent a listener..
		 * @arg {string} pad - the padding to indent with. 
		 */
		
		public string mungeToString(string pad)
		{
			if (this.tree == null) {
				return "";
			}
			var x = new NodeToJs(this.tree, this.doubleStringProps, pad);
			return x.munge();
			
		    
		}
		public abstract void save();
		public abstract void saveHTML(string html);
		public abstract string toSource() ;
		public abstract string toSourcePreview() ;
		  
	} 

}
 
