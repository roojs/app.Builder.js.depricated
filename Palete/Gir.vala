
// valac --pkg libxml-2.0 --pkg gee-1.0  Gir.vala -o /tmp/Gir
public static int main (string[] args) {
    
    var g = new Palete.Gir("/usr/share/gir-1.0/Gtk-3.0.gir");
    
    return 0;
}

namespace Palete {

    public class GirObject: Object {
        public string name;
        public string nodetype;
        public Params params;
        public Value return_value = null;
        
        public GirObject(string nodetype, string n) {
            this.nodetype = nodetype;
            this.name = n;
        }
    
    }
    
    public class Method: GirObject {
        public Params params;
        public Value return_value = null;
        
        public Method(string n) {
            base(n);
        }
    
    }
    
    
    public class Ctor: Method {
       
        public Ctor(string n) {
            base(n);
        }
    
    }
    public class Params: Value {
        public Gee.HashMap<string,Param> params;
        public Params(string n) {
            base(n);
            this.params = new Gee.HashMap<string,Param>();
        }
    
    }
    
    
    public class Value: GirObject {
        public string type;
        public Value(string n) {
            this.type = "";
            base(n);
        }
    
    }
    
    public class Param: Value {
        public bool is_instance;
        public Param(string n) {
            is_instance = false;
            base(n);
        }
    
    }
    
    
    public class Cls: GirObject {
        public bool is_instance;
        public  string parent;
        public GLib.List<string> implements;
        public GLib.List<Ctor> ctors;
        public Gee.HashMap<string,Method> methods;
        
        public Cls(string n) {
            base(n);
            this.name = n;
            this.implements = new GLib.List<string>();
            this.ctors = new GLib.List<Ctor>();
            this.methods =new Gee.HashMap<string,Method>();
        }
    
    }
    
    
    
    public class Gir : GirObject {
    
         public string  package;
        
        public Gee.HashMap<string,string> includes;
        public Gee.HashMap<string,Cls> classes;
        
        //Gee.Hashmap<string,what> nodes;
    
        public Gir (string file)
        {
            base(file);
            //this.nodes = new Gee.Hashmap<string,what>();
            this.includes = new Gee.HashMap<string,string>();
            this.classes= new Gee.HashMap<string,Cls>();
            
            var doc = Xml.Parser.parse_file (file);
            var root = doc->get_root_element();
            this.walk( root, this );
            delete doc;
        
        }
        public void walk(Xml.Node* element, GirObject? parent)
        {
            var n = element->get_prop("name");
            
            print(element->name + " ("  + parent.name + "==>" + n +")\n");
            switch (element->name) {
                case "repository":
                    break;
                
                case "include":
                    ((Gir)parent).includes.set(n, element->get_prop("version"));
                    break;
                
                case "package":
                    ((Gir)parent).package = n;
                    break;
                
                case "c:include":
                    break;
                
                case "namespace":
                    ((Gir)parent).name = n;
                    break;
                
                case "alias":
                    return;
                    //break; // not handled..
                
                case "class":
                    var c = new Cls(parent.name + "." + n);
                    ((Gir)parent).classes.set(parent.name + "." + n, c);
                    c.parent = element->get_prop("parent");
                    parent = (GirObject)c;
                    break;
                
                case "doc":
                    return;
                
                case "implements":
                    ((Cls)parent).implements.append(n);
                    break;
                
                case "constructor":
                    var c = new Ctor(n);
                    ((Cls)parent).ctors.append(c);
                    parent  = (GirObject)c;
                    break;
                
                case "return-value":
                    var c = new Value("return-value");
                    ((Method)parent).return_value = c;
                    parent = (GirObject)c;
                    break;
                
                case "virtual-method":
                    return;
                
                case "type":
                    ((Value)parent).type = n;
                    return; // no children?
                    //break;
                
                case "method":
                    var c = new Method(n);
                    ((Cls)parent).methods.set(n,c);
                    parent = (GirObject)c;
                    break;
                
                case "parameters":
                    var c = new Params(n);
                    ((Method)parent).params = c;
                    parent = (GirObject)c;
                    break;
                
                case "instance-parameter":
                    var c = new Param(n);
                    c.is_instance = true;
                    ((Params)parent).params.set(n,c);
                    parent = (GirObject)c;
                    break;
                
                case "parameter":
                    var c = new Param(n);
                    ((Params)parent).params.set(n,c);
                    parent = (GirObject)c;
                    break;
                
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