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



var tf = proj.files['/home/alan/gitlive/app.Builder/Builder4/About.bjs'];
tf.loadItems(function() {
    print(JSON.stringify(tf,null,4));
    
    
}, true); 