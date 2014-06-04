
// valac -g  --pkg gee-1.0 --pkg libxml-2.0 --pkg gobject-introspection-1.0 --pkg json-glib-1.0  Palete/Gir.vala -o /tmp/Gir
 
public static int main (string[] args) {
    
    var g = new Palete.Gir("Gtk.gir");
    var generator = new Json.Generator ();
    var n = new Json.Node(Json.NodeType.OBJECT);
    n.set_object(g.toJSON());
    generator.set_root(n);
    generator.indent = 4;
    generator.pretty = true;
    
    print(generator.to_data(null));
    return 0;
}
 
namespace Palete {

    public class GirObject: Object {
        public string name;
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
            
        public Gee.HashMap<string,GirObject> params;
        public GLib.List<string> implements;
        public Gee.HashMap<string,GirObject> ctors;
        public Gee.HashMap<string,GirObject> methods;
        public Gee.HashMap<string,string>    includes;
        public Gee.HashMap<string,GirObject> classes;
        public Gee.HashMap<string,GirObject> props;
        public Gee.HashMap<string,GirObject> consts;
        public Gee.HashMap<string,GirObject> signals;
        public string doc;
        public GirObject(string nodetype, string n)
		{
            this.nodetype = nodetype;
            this.name = n;
             
            this.type = "";
            this.is_array = false;
            this.is_instance = false;
            this.is_varargs = false;
            this.implements = new GLib.List<string>();
            this.includes   = new Gee.HashMap<string,string>();
            
            this.params = new Gee.HashMap<string,GirObject>();
            this.ctors      = new Gee.HashMap<string,GirObject>();
            this.methods    =new Gee.HashMap<string,GirObject>();
           
            this.classes    = new Gee.HashMap<string,GirObject>();
            this.props      = new Gee.HashMap<string,GirObject>();
            this.consts     = new Gee.HashMap<string,GirObject>();
            this.signals    = new Gee.HashMap<string,GirObject>();
        }

		public void  overlayParent(Gir gir)
		{

			//gir.classes.get(

		}
		
        public Json.Object toJSON()
        {
            var r = new Json.Object();
            r.set_string_member("nodetype", this.nodetype);
            r.set_string_member("name", this.name);
            if (this.type.length > 0) {
                r.set_string_member("type", this.type);
            }
            // is_arary / is_instance / is_varargs..
            
            if (this.implements.length() > 0) {
                r.set_array_member("length", this.toJSONArrayString(this.implements));
            }
            
            if (this.params.size > 0) {
                r.set_object_member("params", this.toJSONObject(this.params));
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
                r.set_object_member("cosignalsnsts", this.toJSONObject(this.signals));
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
        public Json.Array toJSONArrayString(GLib.List<string> map)
        {
            var r = new Json.Array();
            for(var i =0;i< map.length();i++) {
            
                r.add_string_element(map.nth_data(i));
            }
            return r;
        }
    }
    
     
    
    
    
    public class Gir : GirObject {
    
        
        //Gee.Hashmap<string,what> nodes;
    
        public Gir (string ns)
        {

			var gi = GI.Repository.get_default();
		    var ver = gi.get_version(ns);
		   unowned var  pth = GI.Repository.get_search_path ();
		    var gir_path = pth.nth_data(0).replace("/lib/girepository-1.0/", "/share/gir-1.0/");
		   //console.log(fn);
		    var file  = gir_path + "/" + ns + "-" + ver + ".gir";
		    


			base("Package",ns);
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
                    parent.classes.set(parent.name + "." + n, c);
                    c.parent = element->get_prop("parent");
                    parent =  c;
                    break;
                
                case "interface":
                    var c = new GirObject("Interface", parent.name + "." + n);
                    parent.classes.set(parent.name + "." + n, c);
                    c.parent = element->get_prop("parent");
                    parent =  c;
                    break;
                
                
                case "doc":
                    parent.doc = element->get_content();
                    return;
                
                case "implements":
                    parent.implements.append(n);
                    break;
                
                case "constructor":
                    var c = new GirObject("Ctor",n);
                    parent.ctors.set(n,c);
                    parent  = c;
                    break;
                
                case "return-value":
                    var c = new GirObject("Return", "return-value");
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
                    var c = new GirObject("Signal",n);
                    parent.signals.set(n,c);
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
                    parent.methods.set(n,c);
                    parent = c;
                    break;
                
                case "parameters":
                    var c = new GirObject("Paramset",n);
                    parent.paramset = c;
                    parent =  c;
                    break;
                
                case "instance-parameter":
                    var c = new GirObject("Param",n);
                    c.is_instance = true;
                    parent.params.set(n,c);
                    parent = c;
                    break;
                
                case "parameter":
                    var c = new GirObject("Param",n);
                    parent.params.set(n,c);
                    parent = c;
                    break;
                
                case "property":
                case "field":
                    var c = new GirObject("Prop",n);
                    parent.props.set(n,c);
                    parent = c;
                    break;
                
                case "function":
                    var c = new GirObject("Function",n);
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
                    parent.consts.set(n,c);
                    parent = c;
                    return;
                    //break;
                
                case "enumeration":
                    var c = new GirObject("Enum",n);
                    parent.consts.set(n,c);
                    parent = c;
                    break;
                
                case "member":
                    var c = new GirObject("EnumMember",n);
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
                default:
                    print("UNHANDLED" + element->name +"\n");
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
        
    
    
    } 
        
}
