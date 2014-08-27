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
WindowLeftProjects=new XObject({
    xtype: Gtk.VBox,
    listeners : {
        show : ( ) => {
            this.load();
        }
    },
    id : "WindowLeftProjects",
    pack : "pack_end,false,true,0",
    homogeneous : false,
    'void:load' : () {
         // clear list...
        
         if (_this.is_loaded) {
             return;
         }
         _this.is_loading = true;
            
         _this.is_loaded = true;
         
         Project.Project.loadAll();
         var projects = Project.Project.allProjectsByName();
         
         Gtk.TreeIter iter;
         var m = this.model.el;
         m.clear();
              
         for (var i = 0; i < projects.size; i++) {
            m.append(out iter);
            m.set(iter,   0,projects.get(i).name );
            
            var o = new GLib.Value(typeof(Object));
            o.set_object((Object)projects.get(i));
                       
            m.set_value(iter, 1, o);
         
         }
         m.set_sort_column_id(0, Gtk.SortType.ASCENDING);
         _this.is_loading = false;     
    },
    'void:selectProject' : (Project.Project project) {
        
        var sel = _this.view.el.get_selection();
        
        sel.unselect_all();
        
        var found = false;
        _this.model.el.foreach((mod, path, iter) => {
            GLib.Value val;
        
            mod.get_value(iter, 1, out val);
            if ( ( (Project.Project)val.get_object()).fn != project.fn) {
                print("SKIP %s != %s\n", ((Project.Project)val.get_object()).name , project.name);
                return false;//continue
            }
            sel.select_iter(iter);
            this.project_selected(project);
            found = true;
            return true;
            
        
        });
         if (!found) {
    	    print("tried to select %s, could not find it", project.name);
        }
    },
    items : [
        {
            xtype: Gtk.HBox,
            pack : "pack_start,false,true,0",
            items : [
                {
                    xtype: Gtk.Button,
                    listeners : {
                        button_press_event : ( event ) => {
                            _this.show_new_project();
                            return false;
                        }
                    },
                    pack : "add",
                    items : [
                        {
                            xtype: Gtk.HBox,
                            pack : "add",
                            items : [
                                {
                                    xtype: Gtk.Image,
                                    pack : "add",
                                    stock : Gtk.STOCK_ADD,
                                    icon_size : Gtk.IconSize.MENU
                                },
                                {
                                    xtype: Gtk.Label,
                                    label : "Add",
                                    pack : "add"
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: Gtk.Button,
                    listeners : {
                        button_press_event : ( event ) => {
                            _this.show_new_project();
                            return false;
                        }
                    },
                    pack : "add",
                    items : [
                        {
                            xtype: Gtk.HBox,
                            pack : "add",
                            items : [
                                {
                                    xtype: Gtk.Image,
                                    pack : "add",
                                    icon_size : Gtk.IconSize.MENU,
                                    stock : Gtk.STOCK_DELETE
                                },
                                {
                                    xtype: Gtk.Label,
                                    label : "Delete  ",
                                    pack : "add"
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype: Gtk.ScrolledWindow,
            pack : "pack_end,true,true,0",
            init : this.el.set_policy (Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC);,
            shadow_type : Gtk.ShadowType.IN,
            items : [
                {
                    xtype: Gtk.TreeView,
                    listeners : {
                        cursor_changed : () => {
                            if (_this.is_loading) {
                                return;
                            }
                            
                            Gtk.TreeIter iter;
                            Gtk.TreeModel mod;
                                    
                            var s = this.el.get_selection();
                            if (!s.get_selected(out mod, out iter)) {
                                return;
                            }
                            
                            GLib.Value gval;
                        
                            mod.get_value(iter, 1 , out gval);
                            var project = (Project.Project)gval.get_object();
                            
                            _this.project_selected(project);
                            
                        }
                    },
                    id : "view",
                    pack : "add",
                    enable_tree_lines : true,
                    headers_visible : false,
                    init : var description = new Pango.FontDescription();
                         description.set_size(8000);
                        this.el.modify_font(description);     
                                        
                        var selection = this.el.get_selection();
                        selection.set_mode( Gtk.SelectionMode.SINGLE);,
                    items : [
                        {
                            xtype: Gtk.ListStore,
                            id : "model",
                            n_columns : 2,
                            pack : "set_model",
                            columns : typeof(string), typeof(Object),
                            init : {
                               this.el.set_sort_func(0, (mod,a,b) => {
                                   GLib.Value ga, gb;
                                   mod.get_value(a,0, out ga);
                                   mod.get_value(b,0, out gb);
                                    
                                    if ((string)ga == (string)gb) {
                                        return 0;
                                    }
                                    return (string)ga > (string)gb ? 1 : -1;
                               }); 
                            
                            
                            }
                        },
                        {
                            xtype: Gtk.TreeViewColumn,
                            pack : "append_column",
                            init : this.el.add_attribute(_this.namecol.el , "markup", 0  );,
                            items : [
                                {
                                    xtype: Gtk.CellRendererText,
                                    id : "namecol",
                                    pack : "pack_start,true"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});
WindowLeftProjects.init();
XObject.cache['/WindowLeftProjects'] = WindowLeftProjects;
