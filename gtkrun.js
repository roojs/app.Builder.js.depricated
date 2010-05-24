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

XObject = imports.XObject.XObject;
XObject.debug = true;
Gtk.init(Seed.argv);
imports.searchPath.push('/'); // allow global paths..
// error checking todo..
var files = File.list(Seed.argv[2]);
var olist = [];

var gtkbuilder = false;
files.forEach(function(f) {
    var fp = Seed.argv[2] + '/' + f;
    if (!fp.match(/\.bjs$/)) {
        return;
    }
    var js = fp.replace(/\.bjs$/, '.js');
    if (File.isFile(js)) {
        // check file time.. = bjs is less than compiled file..
        if (File.mtime(fp) < File.mtime(js)) {
            print ("LOADING" + js);
            olist.push(imports[js]);
            return;
        }
        
        
    }
    var gtkbuilder =  new imports.Builder.Provider.File.Gtk.Gtk({ path : fp });
    gtkbuilder.loadItems(function() { });
    print ("COMPILING" + js);
    var fn = gtkbuilder.saveJS();
    if (fn === false) { // skip files that do not contain anythng!
        return;
    }
    olist.push(imports[fn]);
    
    
});



          
Gtk.main();
 