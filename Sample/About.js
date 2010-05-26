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
    authors : "Alan Knowles",
    copyright : "LGPL",
    license : "LGPL",
    program_name : "app.Builder.js",
    modal : true
});
About.init();
XObject.cache['/About'] = About;
