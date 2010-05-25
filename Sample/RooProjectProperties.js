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
    listeners : {
        "delete_event":function (self, event) {
            this.el.hide()
            return true;
        }
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
                    init : function() {
                        this.el = new Gtk.Table.c_new(2,2, false);
                        XObject.prototype.init.call(this);
                    
                    },
                    listeners : {
                        
                    },
                    items : [
                        {
                            xtype: Gtk.Label,
                            pack : "add",
                            label : "baseURL",
                            'eft-attac' : 0,
                            'op-attac' : 0,
                            'ight-attac' : 1
                        },
                        {
                            xtype: Gtk.Entry,
                            pack : "add",
                            'eft-attac' : 1,
                            'op-attac' : 0,
                            'ight-attac' : 2
                        },
                        {
                            xtype: Gtk.Label,
                            pack : "add",
                            label : "baseURL",
                            left_attach : 0,
                            'op-attac' : 1
                        },
                        {
                            xtype: Gtk.Entry,
                            pack : "add",
                            left_attach : 1,
                            'op-attac' : 1
                        }
                    ]
                }
            ]
        }
    ]
});
RooProjectProperties.init();
XObject.cache['/RooProjectProperties'] = RooProjectProperties;
