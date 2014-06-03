
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
    
    public class Cls: GirObject {
        string parent;
        GLib.List<string> implements;
        public Cls(string n) {
            base(n);
            this.name = n;
            this.implements = new GLib.List<string>();
        }
    
    }
    public class Gir : GirObject {
    
        string  package;
        
        Gee.Hashmap<string,string> includes;
        Gee.Hashmap<string,Cls> classes;
        
        //Gee.Hashmap<string,what> nodes;
    
        public Gir (string file)
        {
            //this.nodes = new Gee.Hashmap<string,what>();
            this.includes = new Gee.Hashmap<string,string>();
            
            var doc = Xml.Parser.parse_file (file);
            var root = doc->get_root_element();
            this.walk( root, "" );
            delete doc;
        
        }
        public void walk(Xml.Node* element, GirObject? parent)
        {
            var n = element->get_prop("name");
            var path = "" + in_path;
            
            switch (element->name) {
                case "repository":
                    
                    break;
                case "include":
                    this.includes.set(n, element->get_prop("version"));
                    break
                case "package":
                    this.package = n;
                    break;
                case "c:include":
                    break;
                
                case "namespace":
                    path = n;
                    break;
                
                case "alias":
                    return;
                    break; // not handled..
                
                case "class":
                    
                    path += n;
                    var c = new Cls(path);
                    this.classes.set(n, new Cls(path));
                    c.parent = element->get_prop("parent");
                
                case "doc":
                    break;
                
                case "implements":
                    this.classes.get(path).implements.add(n);
                    break;
                case "constructor":
                    
                
                
            }
            
            if (element->name == "signal") {
                path += ".signal";
            }
            
            if (n != null) {
                path += path.length > 0 ? ".": "";
                path += n;
            }
            if (element->name == "return-value") {
                path += ".return-value";
            }
            print(path + ":"  + element->name + "\n");
            
            //var d =   getAttribute(element,'doc');
            //if (d) {
             //   Seed.print(path + ':' + d);
            //    ret[path] = d;
            //}
            for (Xml.Node* iter = element->children; iter != null; iter = iter->next) {
             	if (iter->type == Xml.ElementType.TEXT_NODE) {
                    continue;
                }
                this.walk(iter, path);
            }
            
        }
        
    
    
    } 
        
}