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
ns_list.forEach(function(ns_name) {   
    var  core = imports.gi[ns_name];
});


print("Looping throught namespaces");
var ns_idx = [];
ns_list.forEach(function(ns_name) 
{
    
    //if (ns_idx.length) {         return ;/* do one - for testing */ } 
    
    var  core = imports.gi[ns_name];
    var idx = { name: ns_name}; 
    print("START:" + ns_name);
   
    var ns = NameSpace.ns(ns_name); // fetch all the elements in namespace...
    
    
    var actions = {
        'objects' : 'Class',
        'interfaces' : 'Interface',
        //'structs' : 'Struct',
        //'unions' : 'Union',
        //'enums' : 'Enum'
        
    };
    
    for (var i in actions) {
        // we flag GLib as a GObject lib...
       
        ns[i].forEach( function(n) {
            
            print('NameSpace.factory(' + actions[i] +','+ns_name+','+n);
            var odata =   NameSpace.factory(actions[i], ns_name, n);
            print(JSON.stringify(odata,null,4));
        }); 
    }
    
    
});
