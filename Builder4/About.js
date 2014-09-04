Gtk = imports.gi.Gtk;
Gdk = imports.gi.Gdk;
Pango = imports.gi.Pango;
GLib = imports.gi.GLib;
Gio = imports.gi.Gio;
GObject = imports.gi.GObject;
GtkSource = imports.gi.GtkSource;
WebKit = imports.gi.WebKit;
Vte = imports.gi.Vte;
console = imports.console;
XObject = imports.XObject.XObject;
About=new XObject({
    show_all : () {
        this.el.show_all();
    },
    copyright : "LGPL",
    xtype : "AboutDialog",
    program_name : "app.Builder.js",
    modal : TRUE,
    authors : { "Alan Knowles" },
    xns : Gtk,
    website : "http://www.akbkhome.com/blog.php",
    license : "LGPL",
    listeners : {
    	delete_event : (self, event) => {
    	       this.el.hide();
    	       return true;
    	    
    	   },
    	response : (rid) => {
    	       this.el.hide();
    	   }
    }
});
About.init();
XObject.cache['/About'] = About;
