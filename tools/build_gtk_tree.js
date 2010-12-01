//<script type="text/javascript">

// see if we can build the insertion tree for gtk - using introspection

// it should build the tree of feasible insertions, then we will have to manually prune it..

// it needs to know
// a) what the inherited types are
// b) what methods are available for each type, that include a reference to another type..

// let's start with types.. 

imports.searchPath.push('../../gnome.introspection-doc-generator');

XObject     = imports.XObject.XObject;
File        = imports.File.File; 
 
// Introspecion specific..
NameSpace   = imports.Introspect.NameSpace.NameSpace; 
Link        = imports.Introspect.Link.Link; 

var ns_list = NameSpace.namespaces();
 
ns_list = ns_list.sort();
// let's try and load them, so we find out early what will fail.
print("loading library to make sure it works.");
ns_list.forEach(function(ns_name) 
{   
    var  core = imports.gi[ns_name];
});

