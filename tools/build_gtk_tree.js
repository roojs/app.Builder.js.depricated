//<script type="text/javascript">

// see if we can build the insertion tree for gtk - using introspection

// it should build the tree of feasible insertions, then we will have to manually prune it..

// it needs to know
// a) what the inherited types are
// b) what methods are available for each type, that include a reference to another type..

// let's start with types.. 
GIRepository = imports.gi.GIRepository;
GLib        = imports.gi.GLib;

// we add this in, as it appears to get lost sometimes if we set it using the ENV. variable in builder.sh
GIRepository.IRepository.prepend_search_path(GLib.get_home_dir() + '/.Builder/girepository-1.1');


imports.searchPath.push('../../gnome.introspection-doc-generator');

XObject     = imports.XObject.XObject;
File        = imports.File.File; 
 
// Introspecion specific..
NameSpace   = imports.Introspect.NameSpace.NameSpace; 
Link        = imports.Introspect.Link.Link; 

var ns_list = [ 'Gtk' ] ; //NameSpace.namespaces();
 
ns_list = ns_list.sort();
// let's try and load them, so we find out early what will fail.
print("loading library to make sure it works.");

var classes = {};

ns_list.forEach(function(ns_name) {   
    var  core = imports.gi[ns_name];
    var ns = NameSpace.ns(ns_name); // fetch all the elements in namespace...
    ns['objects'].forEach( function(n) {
        var odata = NameSpace.factory('Class', ns_name, n);
        classes[odata.alias] = odata;
        
    });
    ns['interfaces'].forEach( function(n) {
         var odata =NameSpace.factory('Interface', ns_name, n);
        classes[odata.alias] = odata;
    });
});


print("Looping throught namespaces");
var ns_idx = [];
var implementations = {};
var methods = {}
   
for (cls in classes) {
    var odata = classes[cls];
    methods[cls] = {}
       
    implementations[odata.alias] = odata.titleType == 'Class' ? odata.childClasses :  odata.implementedBy;  
    //print(JSON.stringify(odata.methods,null,4));
    odata.methods.forEach(function(m) {
       
        m.params.forEach(function(p) {
             
            if (!p.type || typeof(classes[p.type]) == 'undefined') {
                return;
            }
            if (typeof(methods[cls][p.type]) == 'undefined') {
                methods[cls][p.type] = [];
            }
            if (methods[cls][p.type].indexOf(m.name) > -1) {
                return;
            }
            methods[cls][p.type].push(m.name);
            
        });
        
    });
    //for(method in odata.methods) {
    //    print(method.name);
    //}
    
    
}
print(JSON.stringify(methods,null,4));
print(JSON.stringify(implementations,null,4));

// we now have a list of classes / methods that can be used..
// we now need a ui to flag stuff as "don't bother with"


