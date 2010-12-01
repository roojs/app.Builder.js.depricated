Gtk = imports.gi.Gtk;
Gdk = imports.gi.Gdk;
Pango = imports.gi.Pango;
GLib = imports.gi.GLib;
Gio = imports.gi.Gio;
GObject = imports.gi.GObject;
GtkSource = imports.gi.GtkSource;
WebKit = imports.gi.WebKit;
Vte = imports.gi.Vte;
GtkClutter = imports.gi.GtkClutter;
Gdl = imports.gi.Gdl;
console = imports.console;
XObject = imports.XObject.XObject;
Window=new XObject({
    xtype: Gtk.Window,
    init : function() {
        XObject.prototype.init.call(this);
        this.el.show_all();
    },
    items : [
        {
            xtype: Gtk.HBox,
            items : [
                {
                    xtype: Gtk.ScrolledWindow,
                    items : [
                        {
                            xtype: Gtk.TreeView,
                            items : [
                                {
                                    xtype: Gtk.ListStore
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: Gtk.ScrolledWindow,
                    items : [
                        {
                            xtype: Gtk.TreeView
                        }
                    ]
                },
                {
                    xtype: Gtk.ScrolledWindow,
                    items : [
                        {
                            xtype: Gtk.TreeView
                        }
                    ]
                }
            ]
        }
    ]
});
Window.init();
XObject.cache['/Window'] = Window;
