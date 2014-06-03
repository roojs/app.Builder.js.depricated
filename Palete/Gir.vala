
namespace Palate {

    class Gir : Object {
    
        Gee.Hashmap<string,what> nodes;
    
        public Gir (string file)
        {
            this.nodes = new Gee.Hashmap<string,what>();
            
            var doc = Xml.Parser.parse_file (file);
            var root = doc->get_root_element();
            this.walk( root, "" );
        
        }
        public void walk(Xml.Node* element, string in_path)
        {
            var n = element->get_prop("name");
            var path = "" + in_path;
           
            if (element.name == "signal") {
                path += '.signal';
            }
            
            if (n != null) {
                path += path.length ? '.' : '';
                path += n;
            }
            if (element.name == 'return-value') {
                path += '.return-value';
            }
            
            //var d =   getAttribute(element,'doc');
            //if (d) {
             //   Seed.print(path + ':' + d);
            //    ret[path] = d;
            //}
            for (Xml.Node* iter = node->children; iter != null; iter = iter->next) {
             	if (iter->type == Xml.ElementType.TEXT_NODE) {
                    continue;
                }
                this.walk(element, path)
            }
            
        }
        
    
    
    }
 
        
        // no idea why this is broken on my build system.
        var  getAttribute = function(n, name){
            var properties = n.properties;
            while (properties){
                if (properties.name == name)
                    return properties.children.content;
                properties = properties.next
            }
            return null;
        }
                
        
        function walk (element, path) {
            
            
            if (!element) {
                return;
            }
            
            var n =  getAttribute(element, 'name') ;
            //console.log("WALK" + n);
            if (element.name == 'signal') {
                path += '.signal';
            }
            
            if (n) {
                path += path.length ? '.' : '';
                path += n;
            }
            if (element.name == 'return-value') {
                path += '.return-value';
            }
            
            var d =   getAttribute(element,'doc');
            if (d) {
             //   Seed.print(path + ':' + d);
                ret[path] = d;
            }
            
            var child = element.children;

            while (child){
                //console.log(child.tag);
                if (child.type == "element"){
                    walk (child, path);
                }
                child = child.next;
            }
        }
        
        var pth = GI.Repository.get_search_path ();
        
        
        var gir_path = pth[0].replace(/lib\/girepository-1.0/, 'share\/gir-1.0');
       
        
        //console.log(fn);
        var  fn = gir_path + '/'+ ns + '-' + ver + '.gir';
       // console.log(fn);
        
        if (!GLib.file_test(fn, GLib.FileTest.EXISTS)) {
            console.log('missing docc file ' + fn);
            this.comments[ns] = {};
            
            return;
        }
        var doc = xml.parseFile(fn);
        //console.log("xmldoc?" + doc);
        walk (doc.root, '');
        //console.dump(ret);
        this.comments[ns] = ret;

    },
    registry : { },
    factory : function(type, ns, name) {
        if (typeof (this.registry[ns +'.' + name]) == 'undefined') {
            this.registry[ns +'.' + name] = new imports[type][type](ns,name);
            this.registry[ns +'.' + name].load();
        }
        
        return this.registry[ns +'.' + name];
    }
        
};