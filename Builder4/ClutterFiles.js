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
ClutterFiles=new XObject({
    xtype: Clutter.ScrollActor,
    scroll_mode : "Clutter.ScrollMode.VERTICAL",
    id : "ClutterFiles",
    layout_manager : {
        xtype: Clutter.Actor,
        id : "filelayout",
        pack : false,
        items : [
            {
                xtype: Clutter.Actor,
                '*args' : "string fname, string title",
                id : "*fileitem",
                pack : false,
                items : [
                    {
                        xtype: Clutter.Texture,
                        '*args' : "string fname",
                        id : "*image",
                        ctor : "from_file(fname)",
                        pack : false,
                        x_align : "Clutter.ActorAlign.START",
                        x_expand : "true",
                        y_align : "Clutter.ActorAlign.START",
                        y_expand : "false"
                    },
                    {
                        xtype: Clutter.Text,
                        '*args' : "string name",
                        '*ctor' : "with_text(\"Arial\", name)",
                        id : "*title",
                        x_align : "Clutter.ActorAlign.START",
                        x_expand : "true",
                        y_align : "Clutter.ActorAlign.START",
                        y_expand : "false"
                    }
                ],
                layout_manager : {
                    xtype: Clutter.BoxLayout,
                    spacing : 4,
                    xpack : "",
                    init : this.el.set_size(100,100);,
                    orientation : Clutter.Orientation.VERTICAL
                }
            }
        ],
        layout_manager : {
            xtype: Clutter.FlowLayout,
            pack : false
        }
    }
});
ClutterFiles.init();
XObject.cache['/ClutterFiles'] = ClutterFiles;
