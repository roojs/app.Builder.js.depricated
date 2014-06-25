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
                    layout_manager : {
                        xtype: Clutter.BoxLayout,
                        spacing : 4,
                        xpack : "",
                        init : this.el.set_size(100,100);,
                        orientation : Clutter.Orientation,VERTICAL,
                        items : [
                            {
                                xtype: Clutter.Image,
                                pack : "add"
                            },
                            {
                                xtype: Clutter.Text,
                                pack : false
                            }
                        ]
                    }
                }
            ]
        }
    ]
});
ClutterFiles.init();
XObject.cache['/ClutterFiles'] = ClutterFiles;
