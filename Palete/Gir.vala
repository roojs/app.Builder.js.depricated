
// valac --pkg libxml-2.0 Gir.vala /tmp/Gir
public static int main (string[] args) {
    
    var g = new Gir("/usr/share/gir-1.0/Gtk-3.0.gir");
    
    return 0;
}

namespace Palate {

    class Gir : Object {
    
        //Gee.Hashmap<string,what> nodes;
    
        public Gir (string file)
        {
            //this.nodes = new Gee.Hashmap<string,what>();
            
            var doc = Xml.Parser.parse_file (file);
            var root = doc->get_root_element();
            this.walk( root, "" );
            delete doc;
        
        }
        public void walk(Xml.Node* element, string in_path)
        {
            var n = element->get_prop("name");
            var path = "" + in_path;
           
            if (element.name == "signal") {
                path += ".signal";
            }
            
            if (n != null) {
                path += path.length ? ".": "";
                path += n;
            }
            if (element.name == "return-value") {
                path += ".return-value";
            }
            print(path + "\n");
            
            //var d =   getAttribute(element,'doc');
            //if (d) {
             //   Seed.print(path + ':' + d);
            //    ret[path] = d;
            //}
            for (Xml.Node* iter = node->children; iter != null; iter = iter->next) {
             	if (iter->type == Xml.ElementType.TEXT_NODE) {
                    continue;
                }
                this.walk(element, path);
            }
            
        }
        
    
    
    } 
        
}