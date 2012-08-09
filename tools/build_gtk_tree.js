//<script type="text/javascript">


/**
 * usage:
 * 
 * this.data = new BuildLists();
 * 
 * 
 * 
 * 
 * 
 */
// see if we can build the insertion tree for gtk - using introspection

// it should build the tree of feasible insertions, then we will have to manually prune it..

// it needs to know
// a) what the inherited types are
// b) what methods are available for each type, that include a reference to another type..

// let's start with types.. 
GIRepository = imports.gi.GIRepository;
GLib        = imports.gi.GLib;

// we add this in, as it appears to get lost sometimes if we set it using the ENV. variable in builder.sh
//GIRepository.Repository.prepend_search_path(GLib.get_home_dir() + '/.Builder/girepository-1.1');


imports.searchPath.push('../../gnome.introspection-doc-generator');

XObject     = imports.XObject.XObject;
File        = imports.File.File; 
 
// Introspecion specific..
NameSpace   = imports.Introspect.NameSpace.NameSpace; 
Link        = imports.Introspect.Link.Link; 



function BuildLists () {
 

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
    var methods = {};
    var allmethods = [];  
    
    for (cls in classes) {
        
        methods[cls] = {
            can_contain : [],
            can_be_added_to : [],
            using_methods : { }
            
        };
        var odata = classes[cls];
        
        implementations[odata.alias] = odata.titleType == 'Class' ? odata.childClasses :  odata.implementedBy;
        
    }
    for (cls in classes) {
        var odata = classes[cls];
        
        
        //print(JSON.stringify(odata.methods,null,4));
        odata.methods.forEach(function(m) {
           
            m.params.forEach(function(p) {
                 
                if (!p.type || typeof(classes[p.type]) == 'undefined') {
                    return;
                }
                // now add it..
                //print(JSON.stringify(p));Seed.exit();
                var addable_type = p.type;
                if (addable_type.indexOf('.') < 0) {
                    addable_type = p.memberOf + '.' + p.type;
                }
                
                
                if (!m.name.match(/^(add|pack)/)) {
                    return;
                }
                
                //print(full_method_name );
                
                //if (allmethods.indexOf(full_method_name) < 0) {
                //    allmethods.push(full_method_name);
                //}
                if (methods[cls].can_contain.indexOf(addable_type) < 0) {
                    methods[cls].can_contain.push(addable_type);
                }
                methods[cls].using_methods[m.name] = m.params;
                
                return;
            /*
                    methods[cls].using_methods[m.name] = {};
                }
                
                
                if (typeof(methods[cls][full_method_name]) == 'undefined') {
                    methods[cls][full_method_name] = [];
                }
                if (methods[cls][full_method_name].indexOf(m.name) > -1) {
                    return;
                }
                methods[cls][full_method_name].push(m.name);
            */  
            });
            
        });
        //for(method in odata.methods) {
        //    print(method.name);
        //}
        
        
    }
    for (var p in methods) {
        for
        
        
        
    }
    
    // now do the reverese 'can be added to'
    
    
    
    this.methods = methods;
    this.allmethods = methods;
    this.implementations = implementations;
    print(JSON.stringify(methods,null,4));
    
    //print(JSON.stringify(implementations ,null,4));
    /*
      methods is
        [a class]
            [has methods that use this object]
                [list of methods of the top class..]
     
     
      So let's pick one..
        TOP        ARRAY  2ND
        Gtk.Button.add(Gtk.Widget) <<
        
        
        What we need:
        
        A) what can this dragged element be dropped onto.
        eg. list of parents.
        
        
        
        
        B) what method is available when this object is dropped onto this one.
        
        
        
     
     
    */
    
    
    //print(JSON.stringify(implementations,null,4));
    
}
BuildLists();

// we now have a list of classes / methods that can be used..
// we now need a ui to flag stuff as "don't bother with"


