

var pr = new imports.Project.Gtk.Gtk({
    xtype : "Gtk",
    name : "Builder4",
    paths : { "/home/alan/gitlive/app.Builder.js/Builder4" : "dir" }
    
});
print(JSON.stringify(pr.files,null,4));
var f = pr.files['/home/alan/gitlive/app.Builder.js/Builder4/About.bjs'];
print(JSON.stringify(f,null,4));