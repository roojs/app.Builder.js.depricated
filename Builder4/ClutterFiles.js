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
    id : "ClutterFiles",
    items : [
        {
            xtype: Clutter.FlowLayout,
            pack : false,
            items : [
                {
                    xtype: Clutter.Actor,
                    pack : false,
                    items : [
                        {
                            xtype: Clutter.Texture,
                            '*args' : "string fname",
                            '*nocreate' : 1,
                            ctor : "from_file(fname)",
                            id : "image",
                            pack : false,
                            x_align : "Clutter.ActorAlign.START",
                            x_expand : "true",
                            y_align : "Clutter.ActorAlign.START",
                            y_expand : "false"
                        },
                        {
                            xtype: Clutter.Text,
                            '*args' : "string name",
                            pack : false,
                            x_align : "Clutter.ActorAlign.START",
                            x_expand : "true",
                            y_align : "Clutter.ActorAlign.START",
                            y_expand : "false",
                             : ""
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
            ]
        }
    ]
});
ClutterFiles.init();
XObject.cache['/ClutterFiles'] = ClutterFiles;
