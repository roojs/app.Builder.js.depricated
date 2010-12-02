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
    listeners : {
        show : function (self) {
            print("SHOW");
            var BuildLists = imports['BuildLists.js'].BuildLists;
            this.data = new BuildLists();
            print(JSON.stringify(this.data.allmethods, null,4));
            
            var ls = this.get('method-list-store');
            this.data.allmethods.forEach(function(v) {
                ls.append( [ v ]);
            });
            var ls = this.get('children-list-store');
            this.data.allchildren.forEach(function(v) {
                ls.append( [ v ]);
            });
            var ls = this.get('class-list-store');
            for (var c in this.data.methods) {
                ls.append( [ c , true ]);
            };
            
            
            
        }
    },
    default_height : 500,
    default_width : 600,
    init : function() {
        XObject.prototype.init.call(this);
        this.el.show_all();
    },
    items : [
        {
            xtype: Gtk.VBox,
            items : [
                {
                    xtype: Gtk.HBox,
                    pack : "pack_start,false,false",
                    items : [
                        {
                            xtype: Gtk.Button,
                            label : "Reset"
                        }
                    ]
                },
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
                                            xtype: Gtk.ListStore,
                                            id : "class-list-store",
                                            init : function() 
                                                    {
                                                        XObject.prototype.init.call(this);
                                                        this.el.set_column_types ( 6, [
                                                            GObject.TYPE_STRING, 
                                                            GObject.TYPE_BOOLEAN, 
                                                            GObject.TYPE_STRING, 
                                                            GObject.TYPE_STRING, 
                                                            GObject.TYPE_STRING, 
                                                            GObject.TYPE_STRING 
                                                        ] );
                                                        
                                                    }
                                        },
                                        {
                                            xtype: Gtk.TreeViewColumn,
                                            title : "Class",
                                            items : [
                                                {
                                                    xtype: Gtk.CellRendererText
                                                }
                                            ]
                                        },
                                        {
                                            xtype: Gtk.TreeViewColumn,
                                            title : "Active",
                                            items : [
                                                {
                                                    xtype: Gtk.CellRendererToggle
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
                                            xtype: Gtk.ListStore,
                                            id : "method-list-store"
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
                        },
                        {
                            xtype: Gtk.ScrolledWindow,
                            items : [
                                {
                                    xtype: Gtk.TreeView,
                                    items : [
                                        {
                                            xtype: Gtk.ListStore,
                                            id : "children-list-store"
                                        },
                                        {
                                            xtype: Gtk.TreeViewColumn,
                                            title : "Child classes",
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
        }
    ]
});
Window.init();
XObject.cache['/Window'] = Window;
