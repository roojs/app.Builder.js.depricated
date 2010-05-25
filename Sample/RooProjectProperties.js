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
RooProjectProperties=new XObject({
    xtype: Gtk.Dialog,
    modal : true,
    show : function() {
        this.el.show_all();
    },
    items : [
        {
            xtype: Gtk.VBox,
            pack : function(p,e) {
                        p.el.get_content_area().add(e.el)
                    },
            items : [
                {
                    xtype: Gtk.Table,
                    pack : "add",
                    n_columns : 2,
                    n_rows : 2,
                    items : [
                        {
                            xtype: Gtk.Label,
                            pack : "add",
                            label : "baseURL",
                            left_attach : 0
                        },
                        {
                            xtype: Gtk.Entry,
                            pack : "add",
                            left_attach : 1,
                            listeners : {
                                
                            }
                        }
                    ]
                }
            ]
        }
    ]
});
RooProjectProperties.init();
XObject.cache['/RooProjectProperties'] = RooProjectProperties;
