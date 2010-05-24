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
EditProject=new XObject({
    xtype: Gtk.Dialog,
    default_height : 300,
    default_width : 600,
    items : [
        {
            xtype: Gtk.VBox,
            pack : function(p,e) {
                                p.el.get_content_area().add(e.el)
                            },
            items : [
                {
                    xtype: Gtk.HBox,
                    pack : "pack_start,false,true,0",
                    items : [
                        {
                            xtype: Gtk.Label,
                            pack : "add",
                            label : "Project Name"
                        },
                        {
                            xtype: Gtk.Entry,
                            pack : "pack_end,true,true,0",
                            id : "name"
                        }
                    ]
                },
                {
                    xtype: Gtk.HBox,
                    pack : "pack_start,false,true,0",
                    items : [
                        {
                            xtype: Gtk.Label,
                            pack : "add",
                            label : "Project type :"
                        },
                        {
                            xtype: Gtk.Entry,
                            pack : "add"
                        }
                    ]
                }
            ]
        },
        {
            xtype: Gtk.Button,
            pack : "add_action_widget,1",
            label : "OK"
        },
        {
            xtype: Gtk.Button,
            pack : "add_action_widget,0",
            label : "Cancel"
        }
    ]
});
EditProject.init();
XObject.cache['/EditProject'] = EditProject;
