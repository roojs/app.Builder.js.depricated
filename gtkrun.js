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
 * Usage
 * gtkrun.js /path/to/myproject
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
 
Gtk = imports.gi.Gtk;
Gdk = imports.gi.Gdk;
Pango = imports.gi.Pango;
GLib = imports.gi.GLib;
Gio = imports.gi.Gio;
GObject = imports.gi.GObject;
GtkSource = imports.gi.GtkSource;
WebKit = imports.gi.WebKit;
Vte = imports.gi.Vte;

File = imports.File.File;

Gtk.init(Seed.argv);

// error checking todo..
var files = File.list(Seed.argv[2]);
var olist = [];

var gtkbuilder = false;
files.forEach(function(f) {
    if (!f.match(/\.bjs$/)) {
        continue;
    }
    if (File.isFile(f.replace(/\.bjs$/, '.js'))) {
        olist.push(imports[f.replace(/\.bjs$/, '.js')]);
        continue;
    }
    var gtkbuilder =  new imports.Builder.Provider.File.Gtk.Gtk({ path : f });
    gtkbuilder.loadItems();
    gtkbuilder.saveJS();
    olist.push(imports[f.replace(/\.bjs$/, '.js')]);
    
    
});



          
Gtk.main();
 