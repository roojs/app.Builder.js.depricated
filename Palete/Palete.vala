
namespace Palete 
{

	public static JSCore.Object class_constructor(JSCore.Context ctx, JSCore.Object constructor,  JSCore.Value[] arguments, out JSCore.Value exception) 
            {
                var c = new JSCore.Class (class_definition);
                var o = new JSCore.Object (ctx, c, null);

                /*
                    Do something with object
                */

                return o;
            }
	static const JSCore.StaticFunction[] class_functions = {
                 { null, null, 0 }
            };
	static const JSCore.ClassDefinition class_definition = {
            0,
            JSCore.ClassAttribute.None,
            "App",
            null,

            null,
            class_functions,

            null,
            null,

            null,
            null,
            null,
            null,

            null,
            null,
            class_constructor,
            null,
            null
            };


	public errordomain Error {
		INVALID_TYPE,
		NEED_IMPLEMENTING,
		MISSING_FILE,
		INVALID_VALUE
	}

	public class Usage : Object 
	{
		public Gee.ArrayList<string> left;
		public Gee.ArrayList<string> right;
		public Usage(Gee.ArrayList<string> ileft, Gee.ArrayList<string> iright)
		{
			this.left = ileft;
			this.right=  iright;
		}
		public bool leftHas(string s)
		{
			for(var i = 0 ; i < this.left.size; i++) {
				var m = this.left.get(i);
				if (s == m) {
					return true;
				}
				if (!m.contains(":")) {
					continue;
				}
				var ar = m.split(":");
				if (ar[0] == s) {
					return true;
				}
			}
			return false;
				
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
            case "Roo":
                cache.set(xtype, new Roo());
                break;
            default:
                throw new Error.INVALID_TYPE("invalid argument to Palete factory");
        }
        return cache.get(xtype);
    }
       

    public abstract class Palete : Object 
    {
        
       
        public string name;

	public Gee.ArrayList<Usage> map;
		
        public Palete()
        {
            // nothing?
		this.map = null;
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
        listChildren: function (existing) {
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
	

	    
	public string[] getChildList(string in_rval)
        {

		if (this.map == null) {
			this.load();
		}
		// empty == *top
		
		var rval = in_rval == "" ? "*top" : in_rval; 
				
				// should be a bit more than this..
			// -> it should look for all elements that inherit 
    		string[] ret = {};
		var rt = new Gee.ArrayList<string>();
		for (var i = 0; i < this.map.size; i++) {
			var m = this.map.get(i);
				
        		if (!m.leftHas(rval)) {
				continue;
			}
			print("found LEFT, adding right\n");
		
			for(var ii =0; ii < m.right.size; ii++) {
        			var l = m.right.get(ii);
					
			        if (rt.index_of(l) > -1) {
			            continue;
			        }
				//print("ADD " + string.joinv(", ", ret) + "\n");
        			ret += l;
				rt.add(l);
    			}
       			
                
    		}
		print ("drop list for %s is:\n%s\n", rval, string.joinv("\n", ret));
		//console.log("DROP LIST:");
		//console.dump(ret);
		return ret;
            
        }

	    
        public string[] getDropList(string rval)
        {

		if (this.map == null) {
			this.load();
		}

				
				// should be a bit more than this..
			// -> it should look for all elements that inherit 
    		string[] ret = {};
		var rt = new Gee.ArrayList<string>();
		for (var i = 0; i < this.map.size; i++) {
			var m = this.map.get(i);
				
        		if (m.right.index_of(rval) < 0) {
				continue;
			}
			//print("found RIGHT, adding left\n");
		
			for(var ii =0; ii < m.left.size; ii++) {
        			var l = m.left.get(ii);
					
			        if (rt.index_of(l) > -1) {
			            continue;
			        }
				//print("ADD " + string.joinv(", ", ret) + "\n");
        			ret += l;
				rt.add(l);
    			}
       			
                
    		}
		 print ("drop list for %s is:\n%s\n", rval, string.joinv("\n", ret));
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


		ret.loadFromJson(obj, 1);
		ret.ref(); // not sure if needed -- but we had a case where ret became uninitialized?
		
		return ret;
	 }
          public   void  loadUsageFile (string fname) {



			
     		print("Palete Load called\n");
		string raw;
		if (!FileUtils.test (fname, FileTest.EXISTS)) {
			throw new Error.MISSING_FILE(fname + " not found");
		}
	
		FileUtils.get_contents(fname, out raw);
  	      // print(data);
		var data  = raw.split("\n");
		var state = 0;
		var cfg = new Gee.ArrayList<Usage>();
		var left = new Gee.ArrayList<string>();
		var right = new Gee.ArrayList<string>();
	
		for (var i = 0; i < data.length; i++) {
			var d = data[i].strip();
			//print("READ " + d + "\n");
			if (
				d.length < 1
			    ||
			     Regex.match_simple ("^\\s+$", d)
			    ||
				Regex.match_simple ("^\\s*/", d)
		     ){
			    continue;
			}
				
		        if (Regex.match_simple ("^left:", d)) { 
		            state = 1;
		            if (left.size > 0 ){
		                cfg.add(new Usage( left, right));
						}
		            left = new Gee.ArrayList<string>();
					right = new Gee.ArrayList<string>();
		            continue;
		        }
		         if (Regex.match_simple ("^right:", d)) { 
		            state = 2;
		            continue;
		        }
		        if (state == 1) {
						//print("add left: " + d + "\n");
		            left.add(d);
		            continue;
		        }
					//print("add Right: " + d + "\n");
		        right.add(d);
		        //Seed.quit();
		       
		}
		if (left.size > 0 ){
			cfg.add(new Usage( left, right));
		}
		this.map = cfg;

        }

	
	    
	public string validateCode(string code, string language) 
	{   

		print("validate code (%s) %s\n", language, code);
		if (language == "javascript") {
			//var cd = new JSCore.ClassDefinitionEmpty();
			string res;
			var ret = Javascript.singleton(code, out res);
			print ("ret = %s" , ret ? "OK" : "BAD");
			
			return "";
		}

		print ("not javascript\n");
		return "";

	}

	    
          
        public abstract void fillPack(JsRender.Node node,JsRender.Node parent);
	public abstract void load();
	public abstract Gee.HashMap<string,GirObject> getPropertiesFor(string ename, string type);
	public abstract GirObject? getClass(string ename);
    }


}



