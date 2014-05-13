/*
 *
 * Code to test output as gtk file
 *
 * all it does is load a bjs file, and try to save...
 *
 *
 */



var proj = new imports.Project.Gtk.Gtk({
    name : "Test",
    paths : { "/home/alan/gitlive/app.Builder/Builder4" : "dir" },
    xtype :  "Gtk",
    
});

print(JSON.stringify(proj.files['/home/alan/gitlive/app.Builder/Builder4/About.bjs'], null,4));