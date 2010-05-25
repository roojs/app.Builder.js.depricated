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
        // get the active project.
        var file = this.get('/Window.LeftTree').getActiveFile();
        if (!file) {
            this.get('/StandardErrorDialog').show("No file is currently active");
            return;
        }
        var project = this.get('/Window.LeftTree').getActiveFile().project;
        print (project.fn);
    
        this.el.show_all();
    },
    default_width : 500,
    listeners : {
        "delete_event":function (self, event) {
            this.el.hide()
            return true;
        },
        "response":function (self, response_id) {
           print(response_id);
           if (!response_id) {
              this.el.hide();
              return;
           }
           // ok pressed..
           this.el.hide();
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
                        this.el = new Gtk.Table.c_new(1,2, true);
                        XObject.prototype.init.call(this);
                    
                    },
                    items : [
                        {
                            xtype: Gtk.Label,
                            pack : "attach,0,1,0,1,0,0,0,0",
                            label : "baseURL "
                        },
                        {
                            xtype: Gtk.Entry,
                            pack : "attach,1,2,0,1,5"
                        },
                        {
                            xtype: Gtk.Label,
                            pack : "attach,0,1,1,2,0,0,1,0",
                            label : "login:"
                        },
                        {
                            xtype: Gtk.Entry,
                            pack : "attach,1,2,1,2,5"
                        },
                        {
                            xtype: Gtk.Label,
                            pack : "attach,0,1,2,3,0,0,1,0",
                            label : "password"
                        },
                        {
                            xtype: Gtk.Entry,
                            pack : "attach,1,2,2,3,5",
                            visibility : false
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
RooProjectProperties.init();
XObject.cache['/RooProjectProperties'] = RooProjectProperties;
