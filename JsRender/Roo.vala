
extern  WebKit.WebExtension get_webkit_extension();

namespace JsRender {

    static int rid = 0; 
 
    class Roo : JsRender 
    {
       string region;
        bool disabled;
        
        public Roo(Project.Project project, string path) {
            base( project, path);
            this.xtype = "Roo";
             
            
            
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
			FileUtils.set_contents(js, js_src, js_src.length);            
		} catch (FileError e ) {
			print("Save failed\n");
		}
		// for bootstrap - we can write the HTML to the templates directory..
            
            //var top = this.guessName(this.items[0]);
            //print ("TOP = " + top)
             
            
            
            
        }

	string html;

	//public void saveHTML ( WebKit.WebView webview) 
	public void saveHTML ( int page_id )
	{

		var we = new WebKit.WebExtension();
		var web_frame = we.get_page(page_id);

		var top = this.tree.fqn();
    		print ("TOP = " + top + "\n" );
    		if (top != "Roo.bootstrap.Body") {
        		return;
    		}
    		print("SAVE HTML -- ");
    		//print(frame);



		this.html = "";
		
    		var dom = web_frame.get_dom_document().body;
    		//print(dom);
            
    		//Roo.select('body > div',true).each(function(el) {
    		this.traverseDOMTree(dom, 1);


		return;
		/*
            // wait a second.
            
    		//GLib.timeout_add_seconds(0, 1, function() {
                //    print("run refresh?");
                var html = _this.traversedom(frame);
                //print(html);
                
                //print(_this.path);
                var dir = File.dirname(_this.path) +  File.SEPARATOR + 'templates';
                //print(dir);
                if (!File.isDirectory(dir)) {
                    print("Skip no template sub-directory");
                    return false;
                }
                var fn = dir + File.SEPARATOR + File.basename(_this.path).replace(/\.bjs$/, '.html');
                //print(fn);
                File.write(fn, html);
                
                
                 return false; // only once..
                
                
                
            });
            */
            
            
            
        }
         
        
        public void traverseDOMTree(WebKit.DOM.HTMLElement currentElement, int depth) 
	{
		if (currentElement == null) {
			return;
		}

		if (currentElement.class_name.contains("roo-dynamic")) {
			return;
		}

		//Roo.log(currentElement);
		var i =0;
		var nodeName = currentElement.node_name;
		var tagName = currentElement.tag_name;

		if  (nodeName == "#text") {
			this.html += currentElement.node_value;
			return;
		}



		if(nodeName == "BR"){
			this.html += "<BR/>";
			return;
		}
		if (nodeName != "BODY") {

			
			// Prints the node tagName, such as <A>, <IMG>, etc
			if (tagName.length > 0) {
				string[] attr = {};

				for(i = 0; i < currentElement.attributes.length;i++) {
					var aname = currentElement.attributes.item(i).node_name;
					if (aname=="id") {
					    aname= "xbuilderid";
					}
					// skip
					if (currentElement.attributes.item(i).node_value == "builderel") {
					    return;
					}
					attr += (aname + "=\"" + currentElement.attributes.item(i).node_value + "\"" );
			    }
			    
			    
			    this.html +="<"+ currentElement.tag_name + 
					( attr.length > 0 ? (" "  + string.joinv(" ", attr )) : "") +
					">";
			} 
			else {
				this.html+= "[unknown tag]";
			}
		} else {
			tagName = "";
		}
		// Traverse the tree
		i = 0;
		var currentElementChild = currentElement.child_nodes.item(i);
		var allText = true;
		while (currentElementChild != null) {
			// Formatting code (indent the tree so it looks nice on the screen)

			if  (currentElementChild.node_name == "#text") {
			    this.html = currentElementChild.node_value;
			    i++;
			    currentElementChild = currentElement.child_nodes.item(i);
			    continue;
			}   
			allText = false;
			this.html += "\n";
			for (var j = 0; j < depth; j++) {
				// &#166 is just a vertical line
				this.html+="  ";
			}               

			    
			// Recursively traverse the tree structure of the child node
			this.traverseDOMTree((WebKit.DOM.HTMLElement) currentElementChild, depth+1);
			i++;
			currentElementChild=currentElement.child_nodes.item(i);
		}
		if (!allText) {
			    // The remaining code is mostly for formatting the tree
			this.html+="\n";
			for (var j = 0; j < depth - 1; j++) {
				this.html+="  ";
			}     
		}
		if (tagName.length > 0) {
			this.html += "</"+tagName+">";
		}

        }
        
        
        
        
         /**
         * convert xtype for munged output..
         * 
         */
        /*
        mungeXtype : function(xtype, els)
        {
            var bits = xtype.split('.');
            // assume it has lenght!
            
            els.push("xtype: '"+ bits.pop()+"'");
            els.push('xns: '+ bits.join('.'));
            if (xtype.match(/bootstrap/)) {
                els.push("'xtype-bootstrap' : '"+ xtype +"'");
            }
                //code
            
            
            
        },
        */
        
        public override string  toSourcePreview()
        {
            print("to source preview\n");
	    if (this.tree == null) {
		    return "";
	    }
            var top = this.tree.fqn();
            //print(JSON.stringify(this.items, null,4));
                       
            if (top == null) {
				print ("guessname returned false");
                return "";
            }
            
            
            if (top.contains("Dialog")) {
                return this.toSourceDialog(true);
            }
            
            if (top.contains("Modal")) {
                return this.toSourceModal(true);
            }
            
            return this.toSourceLayout(true);
            
            
            
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
            return string.joinv("\n",s);
            
       
        }
        // a standard dialog module.
        // fixme - this could be alot neater..
        public string toSourceDialog(bool isPreview) 
        {
            
            //var items = JSON.parse(JSON.stringify(this.items[0]));
            
            
            var o = this.mungeToString("            ");   

 
            string[] adda = { " = {",
                "",
                "    dialog : false,",
                "    callback:  false,",
                "",   
                "    show : function(data, cb)",
                "    {",
                "        if (!this.dialog) {",
                "            this.create();",
                "        }",
                "",
                "        this.callback = cb;",
                "        this.data = data;",
                "        this.dialog.show(this.data._el);",
                "        if (this.form) {",
                "           this.form.reset();",
                "           this.form.setValues(data);",
                "           this.form.fireEvent('actioncomplete', this.form,  { type: 'setdata', data: data });",
                "        }",
                "",   
                "    },",
                "",
                "    create : function()",
                "    {",
                "        var _this = this;",
                "        this.dialog = Roo.factory(" 
            };
            string[] addb = {  
                        ");",
                "    }",
                "};",
                ""
            };
            return  this.outputHeader() + "\n" +
                this.name + string.joinv("\n", adda) + o + string.joinv("\n", addb);
            
             
             
             
        }
        
        public string toSourceModal(bool isPreview) 
        {
            
            
            //var items = JSON.parse(JSON.stringify(this.items[0]));
            var o = this.mungeToString("            ");   
            
            string[] adda = { " = {",
                "",
                "    dialog : false,",
                "    callback:  false,",
                "",   
                "    show : function(data, cb)",
                "    {",
                "        if (!this.dialog) {",
                "            this.create();",
                "        }",
                "",
                "        this.callback = cb;",
                "        this.data = data;",
                "        this.dialog.show(this.data._el);",
                "        if (this.form) {",
                "           this.form.reset();",
                "           this.form.setValues(data);",
                "           this.form.fireEvent('actioncomplete', this.form,  { type: 'setdata', data: data });",
                "        }",
                "",   
                "    },",
                "",
                "    create : function()",
                "    {",
                "        var _this = this;",
                "        this.dialog = Roo.factory("
            };
            string[] addb =  {
                ");",
                "    }",
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
            
            var o = this.mungeToString("            ");   
            var reg = new Regex("[^A-Za-z.]+");
            
            string modkey = this.modOrder + "-" + reg.replace(this.name, this.name.length, 0 , "-");
            
            string  parent =   (this.parent.length > 0 ?  "'" + this.parent + "'" :  "false");

            if (isPreview) {
                parent = "false"; 
            }
            
          
            return 
                this.outputHeader() + "\n" +
                
                this.name  +  " = new Roo.XComponent({\n" +
                "    part     :  "+ this.pathToPart() + ",\n" +
                        /// critical used by builder to associate modules/parts/persm
                "    order    : '" +modkey+"',\n" +
                "    region   : '" + this.region   +"',\n" +
                "    parent   : "+ parent + ",\n" +
                "    name     : " + this.tree.quoteString(this.title.length > 0 ? this.title : "unnamed module") + ",\n" +
                "    disabled : " + (this.disabled ? "true" : "false") +", \n" +
                "    permname : '" + (this.permname.length > 0 ? this.permname : "") +"', \n" +
                    
               // "    tree : function() { return this._tree(); },\n" +   //BC
                "    _tree : function()\n" +
                "    {\n" +
                "        var _this = this;\n" + // bc
                "        var MODULE = this;\n" + /// this looks like a better name.
                "        return " + o + ";" +
                "    }\n" +
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
		public override  string toValaSource(bool testcompile) { 
			return ""; // never called as roo does not output vala.. yet...
		}
     
    }
}