
namespace Palete 
{
    public errordomain Error {
        INVALID_TYPE,
        NEED_IMPLEMENTING,
		MISSING_FILE,
		INVALID_VALUE
    }

	public class Usage : Object 
	{
		public GLib.List<string> left;
		public GLib.List<string> right;
		public Usage(GLib.List<string> ileft, GLib.List<string> iright)
		{
			this.left = ileft.copy();
			this.right=  iright.copy();
		}
	}

	

    static Gee.HashMap<string,Palete>? cache = null;
    
	public static Palete factory(string xtype)
    {
        if (cache == null) {
            cache = new Gee.HashMap<string,Palete>();
        }
        if (cache.get(xtype) != null) {
            return cache.get(xtype);
        }
        switch(xtype) {
            case "Gtk":
                cache.set(xtype, new Gtk());
                break;
            //case "Roo":
            //    cache.set(xtype, new Roo());
                break;
            default:
                throw new Error.INVALID_TYPE("invalid argument to Palete factory");
        }
        return cache.get(xtype);
    }
       

    public class Palete : Object 
    {
        
       
        public string name;

		public GLib.List<Usage> map;
		
        public Palete()
        {
            // nothing?
        }
        
        
        //map : false, // array of mappings   left: [] , right : []
        
        //items : false, // the tree of nodes.
        
        


        string  guessName(JsRender.Node ar) throws Error // turns the object into full name.
        {
            throw new Error.NEED_IMPLEMENTING("xxx. guessName needs implimenting");
        }
            

            
        /**
         * gather a  list of potentional objects that can be added..
         * 
         */
        /*
        gatherList: function (existing) {
            existing = existing || [];
           // existing.push('*top'); // always have top
            var ret  = []; 
            console.log("GATHER LIST? " + this.map.length);
            
            
            function addRight(right) {
                right.forEach(function(r) {
                    if (ret.indexOf(r) > -1) {
                        return;
                    }
                    ret.push(r);
                });
            }
            
            this.map.forEach(function(m) {
                var done = false
                m.left.forEach( function(left) {
                    if (done) return; 
                    
                    var l = left.replace(/:.*$/, '');
                   // print("chk:" + l + " in " + existing.join(',')); 
                    if (existing.indexOf(l) > -1) {
                        addRight(m.right);
                        done =true;
                        //return true; // no more needed..
                    }
                });
                
            });
            ret.sort();
            
           // console.dump(ret);
            return ret;
            
            
            
        },
        */
        public GLib.List<string> getDropList(string rval)
        {
            
            var ret = new GLib.List<string>();
			for (var i = 0; i < this.map.length(); i++) {
				var m = this.map.nth_data(i);
				
                if (m.right.index(rval) > -1) {
					for(var ii =0; ii < m.left.legnth(); ii++) {
                		var l = m.left.nth_data(ii);
						
                        if (ret.index(l) > -1) {
                            continue;
                        }
                        ret.append(l);
                    }
                }
                
            }
            //console.log("DROP LIST:");
            //console.dump(ret);
            return ret;
            
        }
        /**
         * basic guess type.. 
         * 
         * /
        findType : function (data, prop, value)
        {
            if (prop[0] == '|') {
                return 'function';
            }
            return typeof(value);
        },
        
        
        findOptions : function(ename)
        {
            switch(ename.toLowerCase()) {
                case 'boolean': 
                    return [ 'true', 'false' ];
                // everything else does not have options.
                case 'string': 
                case 'utf8': 
                case 'int': 
                case 'uint': 
                case 'function': 
                    return false;
                default: 
                    console.log("OOPS: = unknown type: " + ename);
                    return false;
            }
        },
        confirmCanAdd: function(parent, child) {
            // confirms that one obj can be added to another.
            // returns true, for items, or list of properties that can hold it..
            return true;
            
        },
        getDefaultPack: function(pname, cname) {
            return 'add';
        },
	*/
        public void saveTemplate (string name, JsRender.Node data)
        {

			var gn = data.fqn();
            // store it in user's directory..
            var appdir =  GLib.Environment.get_home_dir() + "/.Builder"; 

			
            if (!GLib.FileUtils.test(appdir+ "/" + gn, GLib.FileTest.IS_DIR)) {
				GLib.File.new_for_path (appdir+ "/" + gn).make_directory ();
				
            }
            GLib.FileUtils.set_contents(appdir+ "/" + gn + "/" +  name + ".json", data.toJsonString());
            
        }
	
        /**
         * list templates - in home directory (and app dir in future...)
         * @param {String} name  - eg. Gtk.Window..
         * @return {Array} list of templates available..
         */
	  
        public  GLib.List<string> listTemplates (JsRender.Node node)
        {
            
            var gn = node.fqn();
            
            var ret = new GLib.List<string>();
            var dir= GLib.Environment.get_home_dir() + "/.Builder/" + gn;
			if (!GLib.FileUtils.test(dir, GLib.FileTest.IS_DIR)) {
        		return ret;
			}
			


			            
			var f = File.new_for_path(dir);
        
            var file_enum = f.enumerate_children(GLib.FileAttribute.STANDARD_DISPLAY_NAME, GLib.FileQueryInfoFlags.NONE, null);
             
            FileInfo next_file; 
            while ((next_file = file_enum.next_file(null)) != null) {
                var n = next_file.get_display_name();
    			if (!Regex.match_simple ("\\.json$", n)) {
					continue;
				}
				ret.append( dir + "/" + n);
            }
            return ret;
            
        }
 
        public JsRender.Node? loadTemplate(string path)
        {

		    var pa = new Json.Parser();
            pa.load_from_file(path);
            var node = pa.get_root();
            
            if (node.get_node_type () != Json.NodeType.OBJECT) {
		        return null;
	        }
            var obj = node.get_object ();
             
            var ret = new JsRender.Node();
            ret.loadFromJson(obj);
            return ret;
        }
            
        
    }

}



