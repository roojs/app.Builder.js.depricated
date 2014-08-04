
// valac -g  --pkg gee-1.0 --pkg libxml-2.0 --pkg gobject-introspection-1.0 --pkg json-glib-1.0  Palete/Gir.vala -o /tmp/Gir
/* 
public static int main (string[] args) {
    
    var g = Palete.Gir.factory("Gtk");
	var test = g.classes.get("ToolButton");
	
	
    var generator = new Json.Generator ();
    var n = new Json.Node(Json.NodeType.OBJECT);
    n.set_object(test.toJSON());
    generator.set_root(n);
    generator.indent = 4;
    generator.pretty = true;
    
    print(generator.to_data(null));
    return 0;
}
 */
namespace Palete {
	public errordomain GirError {
        INVALID_TYPE,
        NEED_IMPLEMENTING,
		MISSING_FILE,
		INVALID_VALUE
    }
    public class GirObject: Object {
        public string name;
	public string ns;
	public string propertyof;
        public string type;
        public string nodetype;
        public string  package;
        
        public GirObject paramset = null;
        public GirObject return_value = null;
            
        public bool is_instance;
        public bool is_array;
        public bool  is_varargs;
        public  string parent;
        public  string value;
	// to be filled in...
 
	public  string sig;

	bool is_overlaid;
        public Gee.ArrayList<GirObject> params;
        public Gee.ArrayList<string> implements;
	public Gee.ArrayList<string> inherits; // full list of all classes and interfaces...
        public Gee.HashMap<string,GirObject> ctors;
        public Gee.HashMap<string,GirObject> methods;
        public Gee.HashMap<string,string>    includes;
        public Gee.HashMap<string,GirObject> classes;
        public Gee.HashMap<string,GirObject> props;
        public Gee.HashMap<string,GirObject> consts;
        public Gee.HashMap<string,GirObject> signals;
        public string doctxt;
        public GirObject(string nodetype, string n)
	{
		this.nodetype = nodetype;
		this.name = n;
		this.ns = "";
		this.parent = "";
		this.type = "";
		this.propertyof = "";
		this.is_array = false;
		this.is_instance = false;
		this.is_varargs = false;
		this.doctxt = "";
		
		this.sig = "";
		
		this.implements = new Gee.ArrayList<string>();
		this.inherits  = new Gee.ArrayList<string>(); // list of all ancestors. (interfaces and parents)
		this.includes   = new Gee.HashMap<string,string>();

		this.params = new Gee.ArrayList<GirObject>();
		this.ctors      = new Gee.HashMap<string,GirObject>();
		this.methods    =new Gee.HashMap<string,GirObject>();

		this.classes    = new Gee.HashMap<string,GirObject>();
		this.props      = new Gee.HashMap<string,GirObject>();
		this.consts     = new Gee.HashMap<string,GirObject>();
		this.signals    = new Gee.HashMap<string,GirObject>();
		this.is_overlaid = false;
		this.paramset = null;
        }

		public string[] inheritsToStringArray()
		{
			string[] ret = {};
			for(var i =0;i< this.inherits.size; i++) {
				ret += this.inherits.get(i);
			}
			return ret;

		}

		
		public void  overlayParent()
		{
			
			if (this.parent.length < 1 || this.is_overlaid) {
				this.is_overlaid = true;
				return;
			}
			// print("Overlaying " +this.name + " with " + this.parent + "\n");

			var pcls = this.clsToObject( this.parent);
			if (pcls == null) {
				throw new GirError.INVALID_VALUE("Could not find class : " + 
					this.parent + " of " + this.name  + " in " + this.ns);
			}
			
			pcls.overlayParent( );
			this.copyFrom(pcls,false);
			for(var i=0; i < this.implements.size; i++) {
				var clsname = this.implements.get(i);
				var picls = this.clsToObject(clsname);
				this.copyFrom(picls,true);
			}
			this.is_overlaid = true;
			
		}
		public GirObject clsToObject(string in_pn)
		{
			var pn = in_pn;
			var gir = Gir.factory (this.ns);
			if (in_pn.contains(".")) {
				gir =  Gir.factory(in_pn.split(".")[0]);
				pn = in_pn.split(".")[1];
			}
			
			return gir.classes.get(pn);

			
		}
		public string fqn() {
			return this.ns + this.name;
		}
		
		public void copyFrom(GirObject pcls, bool is_interface) 
		{

			this.inherits.add(pcls.fqn());
			var iter = pcls.methods.map_iterator();
			while(iter.next()) {
                if (null != this.methods.get(iter.get_key())) {
					continue;
				}
				
				this.methods.set(iter.get_key(), iter.get_value());
            }
			
			iter = pcls.props.map_iterator();
			while(iter.next()) {
                if (null != this.props.get(iter.get_key())) {
					continue;
				}
				
				this.props.set(iter.get_key(), iter.get_value());
            }
			
			iter = pcls.signals.map_iterator();
			while(iter.next()) {
                if (null != this.signals.get(iter.get_key())) {
					continue;
				}
				
				this.signals.set(iter.get_key(), iter.get_value());
            }	
	}
		
        public Json.Object toJSON()
        {
            var r = new Json.Object();
            r.set_string_member("nodetype", this.nodetype);
            r.set_string_member("name", this.name);
			if (this.propertyof.length > 0) {
                r.set_string_member("of", this.propertyof);
            }
            if (this.type.length > 0) {
                r.set_string_member("type", this.type);
            }
	    if (this.parent != null && this.parent.length > 0) {
                r.set_string_member("parent", this.parent);
            }
	    if (this.sig.length > 0) {
                r.set_string_member("sig", this.sig);
            }
		
            // is_arary / is_instance / is_varargs..
            
            if (this.implements.size > 0) {
                r.set_array_member("length", this.toJSONArrayString(this.implements));
            }
            
            if (this.params.size > 0) {
                r.set_array_member("params", this.toJSONArrayObject(this.params));
            }
            if (this.ctors.size > 0) {
                r.set_object_member("ctors", this.toJSONObject(this.ctors));
            }
            if (this.methods.size > 0) {
                r.set_object_member("methods", this.toJSONObject(this.methods));
            }
            if (this.includes.size > 0) {
                r.set_object_member("includes", this.toJSONObjectString(this.includes));
            }
            if (this.classes.size > 0) {
                r.set_object_member("classes", this.toJSONObject(this.classes));
            }
            if (this.props.size > 0) {
                r.set_object_member("props", this.toJSONObject(this.props));
            }
            if (this.consts.size > 0) {
                r.set_object_member("consts", this.toJSONObject(this.consts));
            }
            if (this.signals.size > 0) {
                r.set_object_member("signals", this.toJSONObject(this.signals));
            }
            if (this.paramset != null) {
                r.set_object_member("params", this.paramset.toJSON());
            }
            if (this.return_value != null) {
                r.set_object_member("return_value", this.return_value.toJSON());
            }
            return r;
        }
        public Json.Object toJSONObject(Gee.HashMap<string,GirObject> map)
        {
            var r = new Json.Object();
            var iter = map.map_iterator();
            while(iter.next()) {
                r.set_object_member(iter.get_key(), iter.get_value().toJSON());
            }
            return r;
        }
        public Json.Object  toJSONObjectString(Gee.HashMap<string,string> map)
        {
            var r = new Json.Object();
            var iter = map.map_iterator();
            while(iter.next()) {
                r.set_string_member(iter.get_key(), iter.get_value());
            }
            return r;
        }
        public Json.Array toJSONArrayString(Gee.ArrayList<string> map)
        {
            var r = new Json.Array();
            for(var i =0;i< map.size;i++) {
            
                r.add_string_element(map.get(i));
            }
            return r;
        }
	public Json.Array toJSONArrayObject(Gee.ArrayList<GirObject> map)
        {
            var r = new Json.Array();
            for(var i =0;i< map.size;i++) {
            
                r.add_object_element(map.get(i).toJSON());
            }
            return r;
        }
    }
    
     
    
    
    
    public class Gir : GirObject {
    
        static  Gee.HashMap<string,Gir> cache = null;
        //Gee.Hashmap<string,what> nodes;
		public static Gir factory(string ns) {
			if (cache == null) {
				cache = new Gee.HashMap<string,Gir>();
			}
			var ret = cache.get(ns);
			if (ret != null) {
				return ret;
			}
			var add = new Gir(ns);
			cache.set(ns, add);
			
			var iter = add.classes.map_iterator();
			while(iter.next()) {
            	
				iter.get_value().overlayParent();
            }	

			return cache.get(ns);
			
		}
		/**
		 * guess the fqn of a type == eg. gboolean or Widget etc...
		 */
		public static string fqtype(string type, string ns) {
			var g = factory(ns);
			if (g.classes.has_key(type)) {
				return ns + "." + type;
			}
			// look at includes..
			var iter = g.includes.map_iterator();
			while(iter.next()) {
				var ret = fqtype(type, iter.get_key());
				if (ret != type) {
					return ret;
				}
            }	
			return type;
		}

		public static string guessDefaultValueForType(string type) {
			if (type.contains(".")) {
				return "null";
			}
			switch(type) {
				case "gboolean":
					return "true";
				case "guint":
					return "0";
				case "utf8":
					return "\"\"";
				default:
					return "?"+  type + "?";
			}

		}


		
	 
        public Gir (string ns)  
        {

		var gi = GI.Repository.get_default();
		gi.require(ns, null, 0);
			
		var ver = gi.get_version(ns);
		unowned GLib.SList<string>  pth = GI.Repository.get_search_path ();
		var gir_path = pth.nth_data(0).replace("/lib/girepository-1.0", "/share/gir-1.0");
		//console.log(fn);
		var file  = gir_path + "/" + ns + "-" + ver + ".gir";
		// print("ns: " + ns + "\n");
		// print("ver: " + ver + "\n");
		// print(file);


		base("Package",ns);
				this.ns = ns;
    	    //this.nodes = new Gee.Hashmap<string,what>();
             
		var doc = Xml.Parser.parse_file (file);
		var root = doc->get_root_element();
		this.walk( root, (GirObject) this );

		delete doc;
        
        }
        public void walk(Xml.Node* element, GirObject? parent)
        {
            var n = element->get_prop("name");
            if (n == null) {
                n = "";
            }
            //print(element->name + " ("  + parent.name + "==>" + n +")\n");
            switch (element->name) {
                case "repository":
                    break;
                
                case "include":
                    parent.includes.set(n, element->get_prop("version"));
                    break;
                
                case "package":
                    parent.package = n;
                    break;
                
                case "c:include":
                    break;
                
                case "namespace":
                    parent.name = n;
                    break;
                
                case "alias":
                    return;
                    //break; // not handled..
                
                case "class":
                    var c = new GirObject("Class", parent.name + "." + n);
                    parent.classes.set(n, c);
					c.ns = this.ns;
                    c.parent = element->get_prop("parent");
					if (c.parent == null) {
						c.parent = "";
					}
                    parent =  c;
                    break;
                
                case "interface":
                    var c = new GirObject("Interface", parent.name + "." + n);
                    parent.classes.set(n, c);
					c.ns = this.ns;
					c.ns = parent.name;
                    c.parent = element->get_prop("parent");
					if (c.parent == null) {
						c.parent = "";
					}
					parent =  c;
                    break;
                
                
                case "doc":
                    parent.doctxt = element->get_content();
                    return;
                
                case "implements":
                    parent.implements.add(n);
                    break;
                
                case "constructor":
                    var c = new GirObject("Ctor",n);
					c.ns = this.ns;
                    parent.ctors.set(n,c);
                    parent  = c;
                    break;
                
                case "return-value":
                    var c = new GirObject("Return", "return-value");
					c.ns = this.ns;
                    parent.return_value = c;
                    parent =  c;
                    break;
                
                case "virtual-method": // not sure...
                    return;
                /*
                    var c = new GirObject("Signal",n);
                    parent.signals.set(n,c);
                    parent = c;
                    break;
                */
                case "signal": // Glib:signal
                    var c = new GirObject("Signal",n.replace("-", "_"));
					c.ns = this.ns;
                    parent.signals.set(n.replace("-", "_"),c);
                    parent = c;
                    break;
                    
                
              
                case "callback": // not sure...
                    return;
                
                
                case "type":
                    parent.type = n;
					
					return; // no children?
                    //break;
                
                case "method":
                    var c = new GirObject("Method",n);
					c.ns = this.ns;
					c.propertyof = parent.name;
                    parent.methods.set(n,c);
                    parent = c;
                    break;
                
                case "parameters":
                    var c = new GirObject("Paramset",n);
					c.ns = this.ns;
                    parent.paramset = c;
                    parent =  c;
                    break;
                
                case "instance-parameter":
                    var c = new GirObject("Param",n);
					c.ns = this.ns;
                    c.is_instance = true;
                    parent.params.add(c);
                    parent = c;
                    break;
                
                case "parameter":
                    var c = new GirObject("Param",n);
					c.ns = this.ns;
                    parent.params.add(c);
                    parent = c;
                    break;
                
                case "property":
                case "field":
                    var c = new GirObject("Prop",n.replace("-", "_"));
					c.ns = this.ns;
					c.propertyof = parent.name;
                    parent.props.set(n.replace("-", "_"),c);
                    parent = c;
                    break;
                
                case "function":
                    var c = new GirObject("Function",n);
					c.ns = this.ns;
                    parent.methods.set(n,c);
                    parent = c;
                    break;
                
                case "array":
                    parent.is_array = true;  
                    break; // type is added soon..
                
                case "varargs":
                    parent.is_varargs= true;  
                    return;
                
                case "constant":
                    var c = new GirObject("Const",n);
                    c.value = element->get_prop("value");
					c.ns = this.ns;
                    parent.consts.set(n,c);
                    parent = c;
                    return;
                    //break;
                
                case "enumeration":
                    var c = new GirObject("Enum",n);
					c.ns = this.ns;
                    parent.consts.set(n,c);
					
                    parent = c;
                    break;
                
                case "member":
                    var c = new GirObject("EnumMember",n);
					c.ns = this.ns;
                    c.value = element->get_prop("value");
                    parent.consts.set(n,c);
                    return;
                    break;
                
                
                case "doc-deprecated":
                    return;
                
                case "record": // struct?
                    return;
                case "bitfield": // ignore?
                    return;
                case "prerequisite": // ignore?
                    return;
				case "union": // ignore?
                    return;
				default:
                    print("UNHANDLED Gir file element: " + element->name +"\n");
                    return;
            }
            /*
            if (element->name == "signal") {
                path += ".signal";
            }
            
            
            if (element->name == "return-value") {
                path += ".return-value";
            }
            print(path + ":"  + element->name + "\n");
            */
            //var d =   getAttribute(element,'doc');
            //if (d) {
             //   Seed.print(path + ':' + d);
            //    ret[path] = d;
            //}
            for (Xml.Node* iter = element->children; iter != null; iter = iter->next) {
             	if (iter->type == Xml.ElementType.TEXT_NODE) {
                    continue;
                }
                this.walk(iter, parent);
            }
            
        }
        public string doc(string what)
		{
			var ar = what.split(".");
			var cls = this.classes.get(ar[1]);
			if (ar.length == 2) {
				return cls.doctxt != null ? cls.doctxt : "";
			}
			// return the property.. by default..
			var pr = cls.props.get(ar[2]);
			return pr.doctxt != null ? pr.doctxt : "";

		}
    
    
    } 
        
}
