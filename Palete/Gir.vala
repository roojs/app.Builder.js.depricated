
namespace Palate {

    class Gir : Object {
    
        public Gir (string file)
        {
        
            var doc = Xml.Parser.parse_file (file);
            var root = doc->get_root_element();
        
        }
    
    
    }

 commentLoad : function(ns)
    {
        
        if (typeof(this.comments[ns]) != 'undefined') {
            return;
        }
        
        console.log("LOAD DOCS: " + ns);
        var gi = GI.Repository.get_default();
        var ver = gi.get_version(ns);
        if (!ver) {
            this.comments[ns] = {};
            return;
        }
        var ret = { };
        
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