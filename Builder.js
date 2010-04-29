//<Script type="text/javascript">
Gtk = imports.gi.Gtk;
Gdk = imports.gi.Gdk;
GLib = imports.gi.GLib;
Builder = imports['Builder.js']; // this!
Roo = imports['Roo.js']; // this!
JSDOC =  imports['JSDOC.js']; // this!
xnew = imports['xnew.js'];
console = imports['console.js'];

// not needeD?
Builder.projects = [];





xnew.load( Builder ,  'Builder');
xnew.load( Roo,  'Roo' );
xnew.load( Builder.Provider, 'Builder/Provider' );
xnew.load( Builder.Provider.File, 'Builder/Provider/File' );
xnew.load( Builder.Provider.Project, 'Builder/Provider/Project' );
xnew.load( Builder.Provider.Palete, 'Builder/Provider/Palete' );
 
 
Builder.atoms = {
   "STRING" : Gdk.atom_intern("STRING")
}

function run() { 
    Builder.Provider.ProjectManager.loadConfig();
     
     
    Seed.print('done import window');
    Gtk.init(0, null);
     
    xnew.xnew(Builder.Window.create());
          
    Gtk.main();
    
}

