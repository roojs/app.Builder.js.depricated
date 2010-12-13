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
                ls.append( [ v , true, true ]);
            });
            
            var ls = this.get('children-list-store');
            this.data.allchildren.forEach(function(v) {
                ls.append( [ v , true, true ]);
            });
            var ls = this.get('class-list-store');
            var i =0;
            for (var c in this.data.methods) {
                i++;
                ls.append( [ c , true ,   true]);
            };
            print(JSON.stringify(this.data.methods['Gtk.AccelGroup']));
            
            
            
        }
    },
    default_height : 500,
    default_width : 600,
    id : "window",
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
                                    listeners : {
                                        cursor_changed : function (self) {
                                        
                                            var sel  = this.el.get_selection();
                                        
                                            
                                            var iter = new Gtk.TreeIter();
                                            sel.get_selected(this.model.el, iter);
                                            
                                            var tp = this.model.el.get_path(iter).to_string();
                                            print(tp);
                                            // 
                                            var cls = this.model.getValue(tp, 0);
                                            print(cls);
                                            var data = this.get('/window').data;
                                            
                                        
                                            // hide all the rows in the methods list.
                                            var tp = false; 
                                            var cstore = this.get('/window.children-list-store');
                                            var meths = [];
                                            while (false !== (tp = cstore.nextPath(tp))) {
                                                var mname = cstore.getValue(tp, 0);
                                                var show = typeof(data.methods[cls][mname]) == 'undefined' ? false :true;
                                                if (show) {
                                                    meths.push.apply(meths, data.methods[cls][mname]);
                                                }
                                                cstore.setValue(tp, 2, show); // hide..  
                                        
                                                
                                            }    
                                            print(JSON.stringify(meths));
                                        
                                            tp = false; 
                                            var mstore = this.get('/window.method-list-store');
                                            while (false !== (tp = mstore.nextPath(tp))) {
                                                var mname = mstore.getValue(tp, 0);
                                                var show = meths.indexOf(mname) > -1  ? true :false;
                                            
                                                mstore.setValue(tp, 2, show); // hide..  
                                            }
                                            
                                            
                                            
                                        }
                                    },
                                    items : [
                                        {
                                            xtype: Gtk.TreeModelFilter,
                                            init : function() {
                                                this.items[0].pack = false;
                                                this.items[0].init();
                                                this.list = this.items[0];
                                                this.el = new Gtk.TreeModelFilter.c_new(this.items[0].el, null);
                                                 this.el.set_visible_column(2);
                                                XObject.prototype.init.call(this);
                                                this.parent.model = this;
                                               
                                            },
                                            items : [
                                                {
                                                    xtype: Gtk.ListStore,
                                                    id : "class-list-store",
                                                    pack : false,
                                                    init : function() 
                                                            {
                                                                XObject.prototype.init.call(this);
                                                                this.el.set_column_types ( 6, [
                                                                    GObject.TYPE_STRING, 
                                                                    GObject.TYPE_BOOLEAN, 
                                                                    GObject.TYPE_BOOLEAN, 
                                                                    GObject.TYPE_STRING, 
                                                                    GObject.TYPE_STRING, 
                                                                    GObject.TYPE_STRING 
                                                                ] );
                                                                
                                                            }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: Gtk.TreeViewColumn,
                                            title : "Class",
                                            expand : true,
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
                                                    xtype: Gtk.CellRendererToggle,
                                                    listeners : {
                                                        toggled : function (self, path) {
                                                            print("TOGGLE");
                                                            // this.list
                                                        
                                                        
                                                             
                                                            var old = this.list.getValue(path, 1);
                                                           // print(JSON.stringify(old));
                                                            this.list.setValue(path, 1, old ? false : true)
                                                            
                                                            
                                                            
                                                            
                                                        }
                                                    },
                                                    activatable : true
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
                                            xtype: Gtk.TreeModelFilter,
                                            init : function() {
                                                this.items[0].pack = false;
                                                this.items[0].init();
                                                this.list = this.items[0];
                                                this.el = new Gtk.TreeModelFilter.c_new(this.items[0].el, null);
                                                 this.el.set_visible_column(2);
                                                XObject.prototype.init.call(this);
                                               
                                            },
                                            items : [
                                                {
                                                    xtype: Gtk.ListStore,
                                                    id : "method-list-store",
                                                    init : function() 
                                                            {
                                                                XObject.prototype.init.call(this);
                                                                this.el.set_column_types ( 6, [
                                                                    GObject.TYPE_STRING, 
                                                                    GObject.TYPE_BOOLEAN, 
                                                                    GObject.TYPE_BOOLEAN, 
                                                                    GObject.TYPE_STRING, 
                                                                    GObject.TYPE_STRING, 
                                                                    GObject.TYPE_STRING 
                                                                ] );
                                                                
                                                            }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: Gtk.TreeViewColumn,
                                            title : "Methods",
                                            expand : true,
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
                                                    xtype: Gtk.CellRendererToggle,
                                                    listeners : {
                                                        toggled : function (self, path) {
                                                            print("TOGGLE");
                                                            // this.list
                                                        
                                                        
                                                             
                                                            var old = this.list.getValue(path, 1);
                                                           // print(JSON.stringify(old));
                                                            this.list.setValue(path, 1, old ? false : true)
                                                            
                                                            
                                                            
                                                            
                                                        }
                                                    },
                                                    activatable : true
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
                                            xtype: Gtk.TreeModelFilter,
                                            init : function() {
                                                this.items[0].pack = false;
                                                this.items[0].init();
                                                this.list = this.items[0];
                                                this.el = new Gtk.TreeModelFilter.c_new(this.items[0].el, null);
                                                 this.el.set_visible_column(2);
                                                XObject.prototype.init.call(this);
                                               
                                            },
                                            items : [
                                                {
                                                    xtype: Gtk.ListStore,
                                                    id : "children-list-store",
                                                    pack : false,
                                                    init : function() 
                                                            {
                                                                XObject.prototype.init.call(this);
                                                                this.el.set_column_types ( 6, [
                                                                    GObject.TYPE_STRING, 
                                                                    GObject.TYPE_BOOLEAN, 
                                                                    GObject.TYPE_BOOLEAN, 
                                                                    GObject.TYPE_STRING, 
                                                                    GObject.TYPE_STRING, 
                                                                    GObject.TYPE_STRING 
                                                                ] );
                                                                
                                                            }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: Gtk.TreeViewColumn,
                                            title : "Child classes",
                                            expand : true,
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
                                                    xtype: Gtk.CellRendererToggle,
                                                    listeners : {
                                                        toggled : function (self, path) {
                                                            print("TOGGLE");
                                                            // this.list
                                                        
                                                        
                                                             
                                                            var old = this.list.getValue(path, 1);
                                                           // print(JSON.stringify(old));
                                                            this.list.setValue(path, 1, old ? false : true)
                                                            
                                                            
                                                            
                                                            
                                                        }
                                                    },
                                                    activatable : true
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
