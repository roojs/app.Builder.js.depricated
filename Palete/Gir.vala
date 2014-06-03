
// valac --pkg libxml-2.0 --pkg gee-1.0  Gir.vala -o /tmp/Gir
public static int main (string[] args) {
    
    var g = new Palete.Gir("/usr/share/gir-1.0/Gtk-3.0.gir");
    
    return 0;
}

namespace Palete {

    public class GirObject: Object {
        string name;
        
        public GirObject(string n) {
            this.name = n;
        }
    
    }
    
    public class Method: Object {
        
        Value return_value = null;
        
        public Ctor(string n) {
            base(n);
        }
    
    }
    
    
    public class Ctor: Method {
        
        public Ctor(string n) {
            base(n);
        }
    
    }
    public class Params: Object {
        Gee.HashMap<string,Param> params;
        public Ctor(string n) {
            base(n);
            this.params = new Gee.HashMap<string,Param>();
        }
    
    }
    
    
    public class Value: Object {
        string type;
        public Ctor(string n) {
            this.type= "";
            base(n);
        }
    
    }
    
    
    public class Cls: GirObject {
        string parent;
        GLib.List<string> implements;
        GLib.List<Ctor> ctors;
        Gee.HashMap<string,Method> methods;
        
        public Cls(string n) {
            base(n);
            this.name = n;
            this.implements = new GLib.List<string>();
            this.ctors = new GLib.List<Ctor>();
            this.methods =new ee.HashMap<string,Method>();
        }
    
    }
    
    
    
    public class Gir : GirObject {
    
        string name; // filename..
        string  package;
        
        Gee.Hashmap<string,string> includes;
        Gee.Hashmap<string,Cls> classes;
        
        //Gee.Hashmap<string,what> nodes;
    
        public Gir (string file)
        {
            base(file);
            //this.nodes = new Gee.Hashmap<string,what>();
            this.includes = new Gee.Hashmap<string,string>();
            
            var doc = Xml.Parser.parse_file (file);
            var root = doc->get_root_element();
            this.walk( root, this );
            delete doc;
        
        }
        public void walk(Xml.Node* element, GirObject? parent)
        {
            var n = element->get_prop("name");
            
            print(parent.name + "==>" + n +"\n");
            switch (element->name) {
                case "repository":
                    
                    break;
                case "include":
                    ((Gir)parent).includes.set(n, element->get_prop("version"));
                    break
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
                    break; // not handled..
                
                case "class":
                    var c = new Cls(parent.name + "." + n);
                    ((Gir)parent).classes.set(parent.name + "." + n, c);
                    c.parent = element->get_prop("parent");
                    parent = c;
                    break;
                
                case "doc":
                    break;
                
                case "implements":
                    ((Cls)parent).implements.add(n);
                    break;
                
                case "constructor":
                    var c = new Ctor(n);
                    ((Cls)parent).ctors.add(c);
                    parent  = c;
                    break;
                case "return_value":
                    var c = new Value("return-value");
                    ((Method)parent).return_value = c;
                    parent =c;
                    break;
                
                case "type":
                    ((Value)parent).type = n;
                    return; // no children?
                    break;
                
                case "method":
                    var c = new Method(n);
                    ((Cls)parent).methods.set(n,c);
                    parent = c;
                    break;
                
                case "parameters":
                    
                
                
                
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