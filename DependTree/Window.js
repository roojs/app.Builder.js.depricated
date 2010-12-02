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
    default_height : 500,
    default_width : 600,
    init : function() {
        XObject.prototype.init.call(this);
        this.el.show_all();
    },
    listeners : {
        show : function (self) {
        
        }
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
                                },
                                {
                                    xtype: Gtk.TreeViewColumn,
                                    title : "Class",
                                    items : [
                                        {
                                            xtype: Gtk.CellRendererText
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: Gtk.ScrolledWindow,
                    items : [
                        {
                            xtype: Gtk.TreeView,
                            items : [
                                {
                                    xtype: Gtk.ListStore
                                },
                                {
                                    xtype: Gtk.TreeViewColumn,
                                    title : "Child Classes",
                                    items : [
                                        {
                                            xtype: Gtk.CellRendererText
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: Gtk.ScrolledWindow,
                    items : [
                        {
                            xtype: Gtk.TreeView,
                            items : [
                                {
                                    xtype: Gtk.ListStore
                                },
                                {
                                    xtype: Gtk.TreeViewColumn,
                                    title : "Methods",
                                    items : [
                                        {
                                            xtype: Gtk.CellRendererText
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});
Window.init();
XObject.cache['/Window'] = Window;
