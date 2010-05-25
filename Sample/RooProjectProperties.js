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
                        p.el.get_content_area().add(e.el);
                        e.border_width  =5;
                    },
            items : [
                {
                    xtype: Gtk.Table,
                    pack : "pack_start,true,true,3",
                    init : function() {
                        this.el = new Gtk.Table.c_new(1,2, false);
                        XObject.prototype.init.call(this);
                    
                    },
                    items : [
                        {
                            xtype: Gtk.Label,
                            pack : "attach,0,1,0,1,0,0,0,0",
                            label : "baseURL"
                        },
                        {
                            xtype: Gtk.Entry,
                            pack : "attach,1,2,0,1",
                            listeners : {
                                
                            }
                        },
                        {
                            xtype: Gtk.Label,
                            pack : "attach,0,1,1,2,0,0,1,0",
                            label : "login:"
                        },
                        {
                            xtype: Gtk.Entry,
                            pack : "attach,1,2,1,2",
                            listeners : {
                                
                            }
                        },
                        {
                            xtype: Gtk.Label,
                            pack : "attach,0,1,2,3,0,0,1,0",
                            label : "password"
                        },
                        {
                            xtype: Gtk.Entry,
                            pack : "attach,1,2,2,3",
                            visibility : false
                        }
                    ]
                }
            ]
        }
    ]
});
RooProjectProperties.init();
XObject.cache['/RooProjectProperties'] = RooProjectProperties;
