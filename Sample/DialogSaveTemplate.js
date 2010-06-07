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
DialogSaveTemplate=new XObject({
    xtype: Gtk.Dialog,
    listeners : {
        delete_event : function (self, event) {
            return true;
        }
    },
    default_height : 200,
    default_width : 400,
    items : [
        {
            xtype: Gtk.HBox,
            pack : "add",
            items : [
                {
                    xtype: Gtk.Label,
                    label : "Name",
                    pack : "add"
                },
                {
                    xtype: Gtk.Entry,
                    pack : "add"
                }
            ]
        },
        {
            xtype: Gtk.Button,
            label : "Cancel",
            pack : "add_action_widget,0"
        },
        {
            xtype: Gtk.Button,
            label : "Cancel",
            pack : "add_action_widget,0"
        }
    ]
});
DialogSaveTemplate.init();
XObject.cache['/DialogSaveTemplate'] = DialogSaveTemplate;
