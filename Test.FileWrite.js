
 

var pr = new imports.Project.Gtk.Gtk({
    xtype : "Gtk",
    name : "Builder4",
    paths : { "/home/alan/gitlive/app.Builder.js/Builder4" : "dir" }
    
});
print(JSON.stringify(pr.files,null,4));
var f = pr.files['/home/alan/gitlive/app.Builder.js/Builder4/Editor.bjs'];
print(JSON.stringify(f,null,4));





function loaded()
{
    print(JSON.stringify(f,null,4));
    
    print(f.toVala(function(str) {
        print(str);
    }))
    
    
}
f.loadItems(loaded);