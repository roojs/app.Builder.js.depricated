

var pr = new imports.Project.Gtk.Gtk({
    xtype : "Gtk",
    name : "Builder4",
    paths : { "/home/alan/gitlive/app.Builder/Builder4" : "dir" }
    
});

var f = pr.files['/home/alan/gitlive/app.Builder/Builder4'];
print(JSON.stringify(f));