namespace Palete {

	
/*	
	
	
    public class Introspect.El : Object
    {
        public enum eltype { 
            NS,
            CLASS,
            METHOD,
            PROP
        }
                
            
        public eltype type;
    }

*/
    public class Roo : Palete {
		
		
        public Roo()
        {


            
            base();
            this.name = "Roo";
			  
        }

	Gee.HashMap<string,GirObject> propsFromJSONArray(string type, JSON.JsonArray ar)
	{

		var ret = new Gee.HashMap<string,GirObject>();
		
		for (var i =0 ; i < ar.get_length(); i++) {
			var o = ar.get_object_element(i);
			var name = o.get_string_member("name"); 
			var prop = new GirObject(string, name );  
		     
			prop.type        = o.get_string_member("type");
		        prop.doctxt  = o.get_string_member("desc");
			prop.propertyof = o.has_member("memberOf") ? o.get_string_member("memberOf") : "";
			prop.sig = o.has_member("sig") ? o.get_string_member("sig") : "";
		     
			ret.set(name,prop);
		}
		return ret;
	}
	Gee.HashMap<string,GirObject> classes; 
        public override void  load () {

		this.loadUsageFile("/usr/share/appBuilder/RooUsage.txt");
		this.classes = new Gee.HashMap<string,GirObject>;

            
		var pa = new Json.Parser();
		pa.load_from_file("/usr/share/appBuilder/rooprops.txt");
		var node = pa.get_root();

		var clist =  node.get_object().get_object_member("data");
    		clist.foreach_member((o , key, value) => {
			//print(key+"\n");
		 
			var cls = new GirObject("class", key);  
			cls.members = this.propsFromJSONArray(o.get_object().get_array_member("props"));
			cls.signals = this.propsFromJSONArray(o.get_object().get_array_member("events"));
			this.classes.set(key, cls);
		}
			
    		
		
             
        }
	  
        
        public string doc(string what) {
		return "";
		/*var ns = what.split(".")[0];


		
		
            var gir =  Gir.factory(ns);
			return   gir.doc(what);
			*/
			
            //return typeof(this.comments[ns][what]) == 'undefined' ?  '' : this.comments[ns][what];
        }

		// does not handle implements...
		
        public override Gee.HashMap<string,GirObject> getPropertiesFor(string ename, string type)
        {
		    //print("Loading for " + ename);
		    


				// if (typeof(this.proplist[ename]) != 'undefined') {
		        //print("using cache");
		     //   return this.proplist[ename][type];
		    //}
		    // use introspection to get lists..
	 
   		
		var cls = this.classes.get(es[1]);
		var ret = new Gee.HashMap<string,GirObject>();
		if (cls == null) {
			
			return ret;
			//throw new Error.INVALID_VALUE( "Could not find class: " + ename);
	
		}

		//cls.parseProps();
		//cls.parseSignals(); // ?? needed for add handler..
		//cls.parseMethods(); // ?? needed for ??..
		//cls.parseConstructors(); // ?? needed for ??..

		//cls.overlayParent();

		switch  (type) {
			case "props":
				return cls.props;
			case "signals":
				return cls.signals;
			case "methods":
				return ret;
			case "ctors":
				return ret;
			default:
				throw new Error.INVALID_VALUE( "getPropertiesFor called with: " + type);
				//var ret = new Gee.HashMap<string,GirObject>();
				//return ret;
		
		}
		
	
		//cls.overlayInterfaces(gir);


             
        }
	public string[] getInheritsFor(string ename)
	{
		string[] ret = {};
		var es = ename.split(".");
		var gir = Gir.factory(es[0]);
		
		var cls = gir.classes.get(es[1]);
		if (cls == null) {
			return ret;
		}
		return cls.inheritsToStringArray();
		

	}


	public override void fillPack(JsRender.Node node,JsRender.Node parent)
	{   

		 return;
	}
 
	
    }
}
 
