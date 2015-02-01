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
    xtype: Gtk.AboutDialog,
    listeners : {
        response : function (self, response_id) {
            this.el.hide();
        },
        delete_event : function (self, event) {
            this.el.hide();
            return true;
        }
    },
    authors : "Alan Knowles",
    copyright : "LGPL",
    license : "LGPL",
    program_name : "app.Builder.js",
    website : "http://www.akbkhome.com/blog.php",
    modal : true
});
About.init();
XObject.cache['/About'] = About;
