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


Array.prototype.pushUnique = function(v) {
    if (this.indexOf(v) < 0) {
        this.push(v);
    }
}

function BuildLists () {
 
    
 

    var ns_list = [ 'Gtk' , 'Gdk', 'Pango', 'GtkSource', 'WebKit', 'Vte', 'GtkClutter'] ; //NameSpace.namespaces();
     
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
    //print(JSON.stringify(classes['Gtk.CellRenderer'] , null, 4));
    //print(JSON.stringify(classes['Gtk.CellRenderer'].titleType, null, 4));
    //print(JSON.stringify(classes['Gtk.CellRenderer'].childClasses, null, 4));
    //print(JSON.stringify(classes['Gtk.CellRenderer'].implementedBy, null, 4));
          
    

    print("Looping throught namespaces");
    var ns_idx = [];
    var implementations = {};
    
    var methods = {};
    var allmethods = [];  
    
    for (cls in classes) {
        var odata = classes[cls];
    
        methods[cls] = {
            //titleType : odata.titleType,
            extendsClasses : [],
            can_contain : [],
            can_contain_using: [],
          //  can_be_added_to : [],
            //using_methods : { },
            can_be_added_to_as : {}
        };
        odata.extendsClasses.forEach(function(child) {
            methods[cls].extendsClasses.push(child.alias);
        });
        
        implementations[odata.alias] = odata.titleType == 'Class' ? odata.childClasses :  odata.implementedBy;
        
    }
    for (cls in classes) {
        var odata = classes[cls];
        
       
        
        //print(cls);
        //print(JSON.stringify(odata.methods,null,4));
        odata.methods.forEach(function(m) {
            
            
            
            
             if (!m.name.match(/^(add|pack)/)) {
                return;
            }
            //print(JSON.stringify(m,null,4));
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
                
                if (m.memberOf == 'Gtk.Buildable') {
                    return;
                }
				//"Gtk.Widget:add_accelerator",
				//"Gtk.Widget:add_device_events"

                if (m.name.match(/^(add_mnemonic_label|add_accelerator|add_device_events)$/)) {
                    return;
                }
        
                // in theory you can not add a window to anything.. ???
                //if ('Gtk.Window' == addable_type || methods[addable_type].extendsClasses.indexOf('Gtk.Window') > -1) {
                //    return;
                //}
        // 
        
                //print(full_method_name );
                
                //if (allmethods.indexOf(full_method_name) < 0) {
                //    allmethods.push(full_method_name);
                //}
                
                methods[cls].can_contain.pushUnique(addable_type);
                var add = m.memberOf +':'+ m.name;
 
                methods[cls].can_contain_using.pushUnique(add);
                //methods[cls].using_methods[m.name] = m.params;
                
                //if (methods[addable_type].can_be_added_to.indexOf(cls) < 0) { 
                //    methods[addable_type].can_be_added_to.push(cls);
                //}
                
                
                
                if (typeof(methods[addable_type].can_be_added_to_as[cls]) == 'undefined') {
                    methods[addable_type].can_be_added_to_as[cls]=[];
                }
                methods[addable_type].can_be_added_to_as[cls].pushUnique( add );
                implementations[cls].forEach(function(imp) {
                    
                    
                    if (typeof(methods[addable_type ].can_be_added_to_as[imp]) == 'undefined') {
                        methods[addable_type].can_be_added_to_as[imp] = [];
                    }
                    
                    methods[addable_type].can_be_added_to_as[imp].pushUnique(add);
                     
                    
                });
                // also needs to add
                //print(addable_type);
                //print(JSON.stringify(implementations[addable_type], null,4));
                 
                
                implementations[addable_type].forEach(function(addable_child) {
                    
                    //if (addable_child == 'Gtk.AboutDialog') {
                    //    print(JSON.stringify(methods[addable_child].extendsClasses,null,4));Seed.exit();
                        
                    //}
                    
                    if (addable_child == 'Gtk.Window' ||
                            methods[addable_child].extendsClasses.indexOf('Gtk.Window') > -1) {
                        return;
                    }
                    
                    if (typeof(methods[addable_child].can_be_added_to_as[cls]) == 'undefined') {
                        methods[addable_child].can_be_added_to_as[cls]=[];
                    }
                    methods[addable_child].can_be_added_to_as[cls].pushUnique( add );
                    implementations[cls].forEach(function(imp) {
                        if (typeof(methods[addable_child ].can_be_added_to_as[imp]) == 'undefined') {
                            methods[addable_child].can_be_added_to_as[imp] = [];
                        }
                        
                        methods[addable_child].can_be_added_to_as[imp].pushUnique(add);
                         
                        
                    });
                
                  
                    
                });
                
                 
                
                
                
                
                
                
                
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
    /*
    // fill in the added to list..
    for(var p in methods ) {
        var odata = methods[p];
        
        methods[p].can_be_added_to.forEach(function(c) {
            methods[p].can_be_added_to_as[c]=c;
            implementations[c].forEach(function(imp) {
                methods[p].can_be_added_to_as[imp]=c;
            });
        });
        
        
    }
    */
    // now do the reverese 'can be added to'
    
    
    
    this.methods = methods;
    this.allmethods = methods;
    this.implementations = implementations;
    //print(JSON.stringify(methods,null,4)); Seed.exit();
    // dump out a usage file..
    
    function verifyUsageMethod(parent,child,method)
    {
        // currently only verifies add on container.
        if (method !='Gtk.Container:add') {
            return true;
        }
        
        var cls = parent.split('.').pop();
         
        
        if (parent == 'Gtk.Bin' || methods['Gtk.Bin'].extendsClasses.indexOf(parent) > -1) {
            return false;
        }
        if (['GtkSource.CompletionInfo',
             'Gtk.MenuShell',
             'GtkSource.View', // ??? nothing can be added to it?
             'WebKit.WebView', // ??? nothing can be added to it?
             'GtkClutter.Embed'
             ].indexOf(parent) > -1) {
             return false;
        }
        
        print("TRY ctor:  " + parent );

        var x = new imports.gi.Gtk[cls]();
        print("TRY child type:  " + parent);
        
        print(parent + " : says children are of type : " + x.child_type());
        return true;
        
    }
    
    function is_a(cls, instance_of) {
        return methods[cls].extendsClasses.indexOf(instance_of) > -1; 
    }
    
    function verifyUsage(parent,child)
    {
        // find all the methods that child can be added to parent.
        var mts = methods[parent].can_contain_using;
        for(var i =0;i<mts.length;i++) {
            var m = mts[i].split(':');
            if (!is_a(child,m[0])) {
                continue;
                
            }
            if (verifyUsageMethod(parent,child,mts[i])) {
                return true;
            }
        }
        return false;
        
        
    }
    
    
    
    
    
    
    // basically anything that is a Gtk.Container, should be available at the top.
    /*
left:
 *top
right:
	Gtk.Window 
	Gtk.Dialog
	Gtk.MessageDialog
	Gtk.AboutDialog
	Gtk.Dialog
	Gtk.FontSelectionDialog 
	Gtk.InputDialog 
	Gtk.ColorSelectionDialog 
	Gtk.FileChooserDialog
	Gtk.Menu
	GtkClutter.Window
	Gtk.OffScreenWindow
    */
// these should really be based on heirachy..
    usage = {};
    tops = {}
    usage['*top'] = implementations['Gtk.Container'];
    usage['*top'].forEach(function(ch) {
        tops[ch] = [ '*top' ];
    });
    for(var cls in methods) {
        if (cls =='Gtk.Builder') {
            continue;
        }
        for (var par in methods[cls].can_be_added_to_as) {
            
            if (typeof(usage[par]) == 'undefined') {
                usage[par] = [];
            }
            
            if (!verifyUsage(par,cls)) {
                continue;
            }
            
            usage[par].pushUnique(cls);
            if (typeof(tops[cls]) == 'undefined') {
                tops[cls] = [];
            }
            tops[cls].pushUnique(par);
        }
    }
    function canTop(cls, rec) {
        
        rec = rec || 0;
        //print('CANTOP: ' + cls + ' =' + rec);
        if (rec > 5) {
       //     print('SKIP : ' + cls);
        }
        if (typeof(tops[cls]) == 'undefined') {
            return false;
        }
        for (var i =0; i < tops[cls].length; i++) {
            if (tops[cls][i] == '*top') {
                return true;
            }
            if (cls == tops[cls][i]) {
                continue;
            }
            if (canTop(tops[cls][i], rec+1)) {
                return true;
            }
        }
        return false;
        
    }
    
    
    
    print (JSON.stringify(usage,null,4));
    var nusage = {};
	var usage_left = {};
    for(var par in usage) {
        // see if the parent can be added to something.
        if (!canTop(par)) {
            continue;
        }
		var duped = false;
		for(var dupe in usage) {
			if (par != dupe
				&& typeof(nusage[dupe]) != 'undefined'
				&& usage[par].join(',') == usage[dupe].join(',')) {
				duped = true;
				
				if (typeof(usage_left[dupe]) == 'undefined') {
					usage_left[dupe] = []; 
				}
				//print(par+ ' is a dupe of ' + dupe);
				usage_left[dupe].pushUnique(par);
				break;
			}
		}
		 if (duped) {
		 	continue;
		 }
        nusage[par] = usage[par];
        
    }
    usage = nusage;
    //print(JSON.stringify(nusage,null,4));  Seed.exit();
    print(JSON.stringify(methods['Gtk.TextView'],null,4));

    var str = [];
	for(var par in usage) {
		str.push('left');
		str.push('   ' + par);
		if (typeof(usage_left[par]) != 'undefined') {
			usage_left[par].forEach(function(d) { str.push('    ' + d);});
		}
		str.push('right');
		usage[par].forEach(function(d) { str.push('    ' + d);});
		str.push('');
	}
	print(str.join("\n"));
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
        - can_be_added_to_as (left)
        
        
        
        B) what method is available when this object is dropped onto this one.
        
        - get the right hand side?
        
        
     
     
    */
    
    
    //print(JSON.stringify(implementations,null,4));
    
}
imports.gi.Gtk.init(Seed.argv);
BuildLists();

// we now have a list of classes / methods that can be used..
// we now need a ui to flag stuff as "don't bother with"


