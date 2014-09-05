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
    project_selected : "(Project.Project project)",
    id : "WindowLeftProjects",
    getSelectedProject : () {    
        Gtk.TreeIter iter;
        Gtk.TreeModel mod;
                
        var s = this.view.el.get_selection();
        if (!s.get_selected(out mod, out iter)) {
            return null;
        }
        
        GLib.Value gval;
    
        mod.get_value(iter, 1 , out gval);
        var project = (Project.Project)gval.get_object();
        
        return project;
    },
    is_loaded : false,
    xtype : "VBox",
    load : () {
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
    is_loading : false,
    selectProject : (Project.Project project) {
        
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
    xns : Gtk,
    homogeneous : false,
    show_new_project : "()",
    listeners : {
    	show : ( ) => {
    	       this.load();
    	   }
    },
    items : [
    	{
            shadow_type : Gtk.ShadowType.IN,
            xtype : "ScrolledWindow",
            xns : Gtk,
            items : [
            	{
                    id : "view",
                    xtype : "TreeView",
                    enable_tree_lines : true,
                    headers_visible : false,
                    xns : Gtk,
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
                    items : [
                    	{
                            id : "model",
                            xtype : "ListStore",
                            columns : typeof(string), typeof(Object),
                            n_columns : 2,
                            xns : Gtk
                        },
                    	{
                            xtype : "TreeViewColumn",
                            xns : Gtk,
                            items : [
                            	{
                                    id : "namecol",
                                    xtype : "CellRendererText",
                                    xns : Gtk
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
