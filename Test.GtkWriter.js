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
    paths : { "/home/alan/gitlive/app.Builder.js/Builder4" : "dir" },
    xtype :  "Gtk",
    
});



var tf = proj.files['/home/alan/gitlive/app.Builder.js/Builder4/DialogNewComponent.bjs'];
tf.loadItems(function() {
    
    print(tf.toVala());
    //print(JSON.stringify(tf,null,4));
    
    
}, true); 