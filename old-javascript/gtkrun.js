#!/usr/bin/seed 
//<Script type="text/javascript">
/**
 * runtime file
 * takes a gtk project directory, and turns it into an application!
 * by compling the files into JS files..
 * 
 * Initially developed for runtime testing. (the vte runner)
 * 
 * Might be the way to go for full runtime 
 * 
 * 
 * Usage: (call with wrapper to set up directories..)
 *    sh builder.sh
 * 
 * Concepts.. 
 * a) load dependancies.. (eg. gi's..) - derived later?
 * Gtk.init()
 * 
 * loop the files (find .bjs)
 *   - comple to js (if not exist // or force enabled..)
 * b) load all the files
 * 
 * Gtk.main();
 * 
 */
// autogen?

// sort out import path - this is  a bit of a mess..
GIRepository = imports.gi.GIRepository;
GLib        = imports.gi.GLib;

// we add this in, as it appears to get lost sometimes if we set it using the ENV. variable in builder.sh
GIRepository.Repository.prepend_search_path(GLib.get_home_dir() + '/.Builder/girepository-1.2');
//print(JSON.stringify(GIRepository.IRepository.get_search_path()));

Gtk         = imports.gi.Gtk;
Gdk         = imports.gi.Gdk;
Pango       = imports.gi.Pango;

Gio         = imports.gi.Gio;
GObject     = imports.gi.GObject;
GtkSource   = imports.gi.GtkSource;
WebKit      = imports.gi.WebKit;
Vte         = imports.gi.Vte;
 
//Gdl         = imports.gi.Gdl;

//GtkClutter  = imports.gi.GtkClutter;


if (typeof(GtkClutter) != 'undefined') {    
    GtkClutter.init(Seed.argv);
}


File    = imports.File.File;

XObject = imports.XObject.XObject;
//XObject.debug = true;
Gtk.init(Seed.argv);

Globals = imports.Globals;


imports.searchPath.push('/'); // allow global paths..
// error checking todo..
var files = File.list(Seed.argv[2]);
var olist = [];

var gtkbuilder = false;
files.forEach(function(f) {
    var fp = Seed.argv[2] + '/' + f;
    
    
    
    if (!fp.match(/\.js$/)) {
        return;
    }
    var js = fp; //.replace(/\.js$/, '.js');
    if (File.isFile(js)) {
        // check file time.. = bjs is less than compiled file..
        //if (File.mtime(fp) < File.mtime(js)) {
            XObject.log("LOADING" + js);
            olist.push(imports[js]);
            return;
        //}
        // Compiling BJS is depreciated..
        //olist.push(imports[js]);
        //return;
        
    }
    
    return;
    /*
    var gtkbuilder =  new imports.Builder.Provider.File.Gtk.Gtk({ path : fp });
    gtkbuilder.loadItems(function() { });
    XObject.log("COMPILING" + js);
    var fn = gtkbuilder.saveJS();
    if (fn === false) { // skip files that do not contain anythng!
        return;
    }
    olist.push(imports[fn]);
    */
    
});



          
Gtk.main();
 
