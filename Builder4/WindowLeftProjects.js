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
    xtype: Gtk.ScrolledWindow,
    id : "WindowLeftProjects",
    pack : "pack_end,false,true,0",
    'void:load' : () {
         Project.loadAll();
         var projects = Project.allProjectsByName();
         for (var i = 0; i < projects.size; i++) {
         
         
         
         }
         
         
         
    },
    init : this.el.set_policy (Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC),
    shadow_type : Gtk.ShadowType.IN,
    items : [
        {
            xtype: Gtk.TreeView,
            listeners : {
                cursor_changed : () => {
                
                    Gtk.TreeIter iter;
                    Gtk.TreeModel mod;
                            
                    var s = this.view.el.get_selection();
                    s.get_selected(out mod, out iter);
                  
                    GLib.Value gval;
                
                    mod.get_value(iter, 1 , out gval);
                    var project = (Project.Project)gval.get_object();
                    
                    _this.project_selected(project);
                    
                }
            },
            pack : "add",
            tooltip_column : 2,
            enable_tree_lines : true,
            headers_visible : false,
            init : function() {
            	XObject.prototype.init.call(this); 
                                
                   var description = new Pango.FontDescription.c_new();
                 description.set_size(8000);
                this.el.modify_font(description);     
                                
                //this.selection = this.el.get_selection();
                // this.selection.set_mode( Gtk.SelectionMode.SINGLE);
             
            
                
              
                
            },
            items : [
                {
                    xtype: Gtk.ListStore,
                    columns : "typeof(string), typeof(Object)",
                    id : "model",
                    n_columns : 2,
                    pack : "set_model"
                },
                {
                    xtype: Gtk.TreeViewColumn,
                    pack : "append_column",
                    init : this.el.add_attribute(_this.namecol.el , "markup", 4  );,
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
});
WindowLeftProjects.init();
XObject.cache['/WindowLeftProjects'] = WindowLeftProjects;
