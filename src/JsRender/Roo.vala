/*
 * Renderer for Javascript output (roo library based)
 * 
 * - translation support
 * -  doubleStringProps contains elements that are 'translable'
 *    ** in the old method this our compression tool could extract them
 *  - the  new idea is to make a list at the top of the javascript file
 *    and output a map...
 *    
 * 
 * 
 * 
 * 
 */
namespace JsRender {

    static int rid = 0; 
   
    class Roo : JsRender 
    {
        string region;
        bool disabled;


        
        public Roo(Project.Project project, string path) {
            base( project, path);
            this.xtype = "Roo";
             this.language = "js";
            
            
            //this.items = false;
            //if (cfg.json) {
            //    var jstr =  JSON.parse(cfg.json);
            //    this.items = [ jstr ];
            //    //console.log(cfg.items.length);
            //    delete cfg.json; // not needed!
            // }
            this.modOrder = "001"; /// sequence id that this uses.
            this.region = "center";
            this.disabled = false;
            
            // super?!?!
            this.id = "file-roo-%d".printf(rid++);
            //console.dump(this);
            // various loader methods..

            string[]  dsp = { "title",
                "legend",
                "loadingText",
                "emptyText",
                "qtip",
                "value",
                "text",
                "emptyMsg",
                "displayMsg" };
            for (var i=0;i<dsp.length;i++) {
                this.doubleStringProps.add(dsp[i]);
            }

            
        }
    
    /*    
        setNSID : function(id)
        {
            
            this.items[0]['|module'] = id;
       
            
        },
        
        
        getType: function() {
            return 'Roo';
        },

    */
		
	public   override void	 removeFiles() {
		var html = GLib.Path.get_dirname(this.path) +"/templates/" + name + ".html";
		if (FileUtils.test(html, FileTest.EXISTS)) {
			GLib.FileUtils.remove(html);
		}
		var js = GLib.Path.get_dirname(this.path) +"/" + name + ".html";
		if (FileUtils.test(js, FileTest.EXISTS)) {
			GLib.FileUtils.remove(js);
		}
	}
		
        public  override void  loadItems() throws GLib.Error // : function(cb, sync) == original was async.
        {
            
             
		print("load Items!");
		if (this.tree != null) {
			return;
		}
		print("load " + this.path);

		var pa = new Json.Parser();
		pa.load_from_file(this.path);
		var node = pa.get_root();

		if (node.get_node_type () != Json.NodeType.OBJECT) {
			throw new Error.INVALID_FORMAT ("Unexpected element type %s", node.type_name ());
		}
		var obj = node.get_object ();
	
	
		this.modOrder = this.jsonHasOrEmpty(obj, "modOrder");
		this.name = this.jsonHasOrEmpty(obj, "name");
		this.parent = this.jsonHasOrEmpty(obj, "parent");
		this.permname = this.jsonHasOrEmpty(obj, "permname");
		this.title = this.jsonHasOrEmpty(obj, "title");
		this.modOrder = this.jsonHasOrEmpty(obj, "modOrder");

		var bjs_version_str = this.jsonHasOrEmpty(obj, "bjs-version");
		bjs_version_str = bjs_version_str == "" ? "1" : bjs_version_str;

		
		// load items[0] ??? into tree...
		if (obj.has_member("items") 
			&& 
			obj.get_member("items").get_node_type() == Json.NodeType.ARRAY
			&&
			obj.get_array_member("items").get_length() > 0
		) {
			this.tree = new Node(); 
			var ar = obj.get_array_member("items");
			var tree_base = ar.get_object_element(0);
			this.tree.loadFromJson(tree_base, int.parse(bjs_version_str));
		}


            
        }
        /**
         * old code had broken xtypes and used arrays differently,
         * this code should try and clean it up..
         * 
         * 
         * /
        fixItems : function(node, fixthis)
        {
            if (fixthis) {
                // fix xtype.
                var fn = this.guessName(node);
                //print("guessname got " + fn);
                if (fn) {
                    var bits = fn.split('.');
                    node.xtype = bits.pop();
                    node['|xns'] = bits.join('.');
                    
                }
                // fix array???
                 
                
            }
            if (!node.items || !node.items.length) {
                return;
            }
            var _this = this;
            var aitems = [];
            var nitems = [];
            node.items.forEach(function(i) {
                
                
                
                _this.fixItems(i, true);
                if (i.xtype == 'Array') {
                    aitems.push(i);
                    return;
                }    
                nitems.push(i);
            });
            node.items = nitems; 
            
            if (!aitems.length) {
                return;
            }
            
            aitems.forEach(function(i) {
                
                if (!i.items || !i.items.length) {
                    return;
                }
                var prop = i['*prop'] + '[]';
                // colModel to cm?
                i.items.forEach(function(c) {
                    c['*prop']  = prop;
                    node.items.push(c);
                    
                });
                
                
            });
            
            
            // array handling.. 
            
            
            
            
            
        },
    */
        
	public  override  void save()
        {
            
		print("--- JsRender.Roo.save");
		this.saveBJS();

		// no tree..
		if (this.tree == null) {
			return;
		}
		// now write the js file..
		string js;
		try {
			Regex regex = new Regex("\\.(bjs|js)$");

			js = regex.replace(this.path,this.path.length , 0 , ".js");
		} catch (RegexError e) {
			this.name = "???";
			print("count not make filename from path");
			return;
		}


		//var d = new Date();
		var js_src = this.toSource();            
		//print("TO SOURCE in " + ((new Date()) - d) + "ms");
		try {
			this.writeFile(js, js_src);            
		} catch (FileError e ) {
			print("Save failed\n");
		}
		// for bootstrap - we can write the HTML to the templates directory..
    		 
            //var top = this.guessName(this.items[0]);
            //print ("TOP = " + top)
             
            
            
            
        }

	 

	 
	public override void saveHTML ( string html )
	{
		 
		var top = this.tree.fqn();
    		print ("TOP = " + top + "\n" );
    		if (top.index_of("Roo.bootstrap.") < 0 &&
		    top.index_of("Roo.mailer.") < 0
		        ) {
        		return;
    		}
    		
    		
// now write the js file..
		string fn;
		try {
			Regex regex = new Regex("\\.(bjs|js)$");

			fn = regex.replace(this.path,this.path.length , 0 , ".html");
		} catch (RegexError e) {
			this.name = "???";
			print("count not make filename from path");
			return;
		}
		var bn = GLib.Path.get_basename(fn);
		var dn = GLib.Path.get_dirname(fn);

		var targetdir = dn + (
              		top.index_of("Roo.mailer.") < 0 ? "/templates" : "" );
	                      
		
		if (!FileUtils.test(targetdir, FileTest.IS_DIR)) {
			print("Skip save - templates folder does not exist : %s\n", targetdir);
			return;
		}
		print("SAVE HTML -- %s\n%s\n",targetdir + "/" +  bn, html);
		try {
			this.writeFile(targetdir + "/" +  bn , html);            
		} catch (FileError e ) {
			print("SaveHtml failed\n");
		}
            
            
            
        }

	public Gee.ArrayList<string> findxincludes(Node node,   Gee.ArrayList<string> ret)
	{
		
		if (node.props.has_key("* xinclude")) {
			ret.add(node.props.get("* xinclude"));
	        }
		for (var i =0; i < node.items.size; i++) {
			this.findxincludes(node.items.get(i), ret);
		}
		return ret;
			
	}
	Gee.HashMap<string,string> transStrings; // map of md5 -> string..

	 
	public Gee.ArrayList<string> transStrings(Node node )
	{
		// iterate properties...
		// use doubleStringProps
		
		// flagging a translatable string..
		// the code would use string _astring to indicate a translatable string
		// the to use it it would do String.format(this._message, somedata);
		
		// loop through and find string starting with '_' 
		
		
		
		var iter = node.props.map_iterator();
		while (iter.next()) {
			// key formats : XXXX
			// XXX - plain
			// string XXX - with type
			// $ XXX - with flag (no type)
			// $ string XXX - with flag
			string kname;
			string ktype;
			string kflag;
			node.normalize_key(iter.get_key(), out kname, out ktype, out kflag);
			if (kflag == "$") {
				continue;
			}
			var str = iter.get_value();
			if (this.doubleStringProps.indexOf(kname) > -1) {
				this.transStrings.set(str,  
					GLib.Checksum.compute_for_string (ChecksumType.MD5, str)
				);
				continue;
			}
			if (ktype == "string" && kname[0] == '_') {
				this.transStrings.set(str,  
					GLib.Checksum.compute_for_string (ChecksumType.MD5, str)
				);
				continue;
			}
			
		}
		 

		
		// iterate children..
		for (var i =0; i < node.items.size; i++) {
			this.transStrings(node.items.get(i) );
		}
		return ret;
			
	}    
        /**
	 * javascript used in Webkit preview 
         */
        
        public override string  toSourcePreview()
        {
		print("to source preview\n");
		if (this.tree == null) {
			return "";
		}
		var top = this.tree.fqn();
		var xinc = new Gee.ArrayList<string>(); 

		this.findxincludes(this.tree, xinc);
		print("got %d xincludes\n", xinc.size);
		var prefix_data = "";
		if (xinc.size > 0 ) {
			for(var i = 0; i < xinc.size; i++) {
				print("check xinclude:  %s\n", xinc.get(i));
				var sf = this.project.getByName(xinc.get(i));
				if (sf == null) {
					print("Failed to find file by name?\n");
					continue;
				}

				sf.loadItems();
				var xinc_str = sf.toSource();
				
				//string xinc_str;
				//FileUtils.get_contents(js, out xinc_str);
				prefix_data += "\n" + xinc_str + "\n";
				
			}

		}

		
		
		//print(JSON.stringify(this.items, null,4));
		       
		if (top == null) {
			print ("guessname returned false");
			return "";
		}


		if (top.contains("Dialog")) {
			return prefix_data + this.toSourceDialog(true);
		}

		if (top.contains("Modal")) {
			return prefix_data + this.toSourceModal(true);
		}

		return prefix_data + this.toSourceLayout(true);
            
            
            
        }
        
        /**
         * This needs to use some options on the project
         * to determine how the file is output..
         * 
         * At present we are hard coding it..
         * 
         * 
         */
        public override string toSource()
        {
            // dump the file tree back out to a string.
            
            // we have 2 types = dialogs and components
            // 
	    if (this.tree == null) {
		    return "";
	    }
            var top = this.tree.fqn();
            if (top == null) {
                return "";
            }
            if (top.contains("Dialog")) {
                return this.toSourceDialog(false);
            }
            
            if (top.contains("Modal")) {
                return this.toSourceModal(false);
            }
            return this.toSourceLayout(false);
            
            /*
            eventually support 'classes??'
             return this.toSourceStdClass();
            */
              
        }
       
        public string outputHeader()
        {
    		string[] s = {
		        "//<script type=\"text/javascript\">",
		        "",
		        "// Auto generated file - created by app.Builder.js- do not edit directly (at present!)",
		        ""
		   
    		};  
    		var ret=  string.joinv("\n",s);
		var bits = this.name.split(".");
		if (bits.length > 1) {
			ret += "\nRoo.namespace(\'" + 
				this.name.substring(0, this.name.length - (bits[bits.length-1].length + 1)) +
				"');\n";
				
		}
		/// genericlly used..
		  
		return ret;
            
       
        }
        // a standard dialog module.
        // fixme - this could be alot neater..
        public string toSourceDialog(bool isPreview) 
        {
            
            //var items = JSON.parse(JSON.stringify(this.items[0]));
            
            
            var o = this.mungeToString("    ");   

 
            string[] adda = { " = {",
                "",
                " dialog : false,",
                " callback:  false,",
                "",   
                " show : function(data, cb)",
                " {",
                "  if (!this.dialog) {",
                "   this.create();",
                "  }",
                "",
                "  this.callback = cb;",
                "  this.data = data;",
                "  this.dialog.show(this.data._el);",
                "  if (this.form) {",
                "   this.form.reset();",
                "   this.form.setValues(data);",
                "   this.form.fireEvent('actioncomplete', this.form,  { type: 'setdata', data: data });",
                "  }",
                "",   
                " },",
                "",
                " create : function()",
                " {",
                "   var _this = this;",
                "   this.dialog = Roo.factory(" 
            };
            string[] addb = {  
                   ");",
                " }",
                "};",
                ""
            };
            return  this.outputHeader() + "\n" +
                this.name + string.joinv("\n", adda) + o + string.joinv("\n", addb);
            
             
             
             
        }
        
        public string toSourceModal(bool isPreview) 
        {
            
            
            //var items = JSON.parse(JSON.stringify(this.items[0]));
            var o = this.mungeToString("    ");   
            
            string[] adda = { " = {",
                "",
                " dialog : false,",
                " callback:  false,",
                "",   
                " show : function(data, cb)",
                " {",
                "  if (!this.dialog) {",
                "   this.create();",
                "  }",
                "",
                "  this.callback = cb;",
                "  this.data = data;",
                "  this.dialog.show(this.data._el);",
                "  if (this.form) {",
                "   this.form.reset();",
                "   this.form.setValues(data);",
                "   this.form.fireEvent('actioncomplete', this.form,  { type: 'setdata', data: data });",
                "  }",
                "",   
                " },",
                "",
                " create : function()",
                " {",
                "  var _this = this;",
                "  this.dialog = Roo.factory("
            };
            string[] addb =  {
                "  );",
                " }",
                "};",
                ""
            };
            return this.outputHeader() + "\n" + 
                this.name + string.joinv("\n", adda) + o + string.joinv("\n", addb);
             
             
             
        }
        
        
        public string   pathToPart()
        {
            var dir = Path.get_basename(Path.get_dirname(this.path));
            var ar = dir.split(".");
            var modname = ar[ar.length-1];
            
            // now we have the 'module name'..
            var fbits = Path.get_basename(this.path).split(".");
            
             
            var npart = fbits[fbits.length - 2]; // this should be 'AdminProjectManager' for example...
            if (modname.length < npart.length && npart.substring(0, modname.length) == modname) {
                npart = npart.substring(modname.length);
            }
            return "[" + this.tree.quoteString(modname) + ", " + this.tree.quoteString(npart) + " ]";
            //return ret;
            
            
            
            
        }
        
        // a layout compoent 
        public string toSourceLayout(bool isPreview) 
        {
          
            
    		if (isPreview) {
    			//       topItem.region = 'center';
    			//    topItem.background = false;
    		}
            
    		var o = this.mungeToString("   ");   
    		var reg = new Regex("[^A-Za-z.]+");
            
    		string modkey = this.modOrder + "-" + reg.replace(this.name, this.name.length, 0 , "-");
            
    		string  parent =   (this.parent.length > 0 ?  "'" + this.parent + "'" :  "false");

		
		
    		if (isPreview) {
			// set to false to ensure this is the top level..
        		parent = "false";
			var topnode = this.tree.fqn();
			print("topnode = %s\n", topnode);
			if (GLib.Regex.match_simple("^Roo\\.bootstrap\\.",topnode) &&
			    topnode != "Roo.bootstrap.Body"
			) {
				parent = "\"#bootstrap-body\"";
			}
			  
    		}
            
          
    		return 
		        this.outputHeader() + "\n" +
		        
		        this.name  +  " = new Roo.XComponent({\n" +
		        "  part     :  "+ this.pathToPart() + ",\n" +
		                /// critical used by builder to associate modules/parts/persm
		        "  order    : '" +modkey+"',\n" +
		        "  region   : '" + this.region   +"',\n" +
		        "  parent   : "+ parent + ",\n" +
		        "  name     : " + this.tree.quoteString(this.title.length > 0 ? this.title : "unnamed module") + ",\n" +
		        "  disabled : " + (this.disabled ? "true" : "false") +", \n" +
		        "  permname : '" + (this.permname.length > 0 ? this.permname : "") +"', \n" +
		            
		       // "    tree : function() { return this._tree(); },\n" +   //BC
		        "  _tree : function()\n" +
		        "  {\n" +
		        "   var _this = this;\n" + // bc
		        "   var MODULE = this;\n" + /// this looks like a better name.
		        "   return " + o + ";" +
		        "  }\n" +
		        "});\n";
		         
             
            
        }
            
        public new string? guessName (Node? ar) // turns the object into full name.
        {
             // eg. xns: Roo, xtype: XXX -> Roo.xxx
            if (ar == null) {
                return null;
            }
            
            string[] ret = {} ;
            ret += (ar.get("|xns").length < 1 ? "Roo": ar.get("|xns"));
             
            
            if ( ar.get("xtype").length < 1) {
                return null;
            }
                    
            var xtype = ar.get("xtype");

            if (xtype[0] == '*') { // prefixes????
                xtype  = xtype.substring(1);
            }
            if (! Regex.match_simple("^Roo", xtype)) {
                
                // already starts with roo...
                ret = {};
            }
            ret += xtype;
            var str =  string.joinv(".", ret);
            
            return str;
           // 
            //Palete.Palete.factory("Roo").guessName(str);
            
                            
                                 
        }
        
        string getHelpUrl(string cls)
        {
            return "http://www.roojs.com/roojs1/docs/symbols/" + cls + ".html";
        }
		 
     
    }
}
