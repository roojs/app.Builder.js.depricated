/* -- to compile
valac  --pkg gio-2.0  --pkg posix  --pkg gtk+-3.0 --pkg libnotify --pkg gtksourceview-3.0  --pkg  libwnck-3.0 \
    /tmp/WindowLeftProjects.vala  -o /tmp/WindowLeftProjects
*/


/* -- to test class
static int main (string[] args) {
    Gtk.init (ref args);
    new Xcls_WindowLeftProjects();
    WindowLeftProjects.show_all();
     Gtk.main ();
    return 0;
}
*/


public static Xcls_WindowLeftProjects  WindowLeftProjects;

public class Xcls_WindowLeftProjects : Object 
{
    public Gtk.VBox el;
    private Xcls_WindowLeftProjects  _this;

    public Xcls_view view;
    public Xcls_model model;
    public Xcls_namecol namecol;

        // my vars
    public bool is_loaded;
    public bool is_loading;
    public signal void project_selected(Project.Project project);
    public signal void show_new_project();

        // ctor 
    public Xcls_WindowLeftProjects()
    {
        _this = this;
        WindowLeftProjects = this;
        this.el = new Gtk.VBox( false, 0 );

        // my vars
        this.is_loaded = false;
        this.is_loading = false;

        // set gobject values
        var child_0 = new Xcls_HBox2( _this );
        child_0.ref();
        this.el.pack_start (  child_0.el , false,true,0 );
        var child_1 = new Xcls_ScrolledWindow15( _this );
        child_1.ref();
        this.el.pack_end (  child_1.el , true,true,0 );

        // listeners 
        this.el.show.connect(   ( ) => {
            this.load();
        } );
    }

    // userdefined functions 
    public void load() {
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
             
             _this.is_loading = false;     
        }
    public void selectProject(Project.Project project) {
            
            var sel = _this.view.el.get_selection();
            
            sel.unselect_all();
            
            
            _this.model.el.foreach((mod, path, iter) => {
                GLib.Value val;
            
                mod.get_value(iter, 1, out val);
                if ( ( (Project.Project)val.get_object()) != project) {
                    return false;//continue
                }
                sel.select_iter(iter);
                return true;
                
            
            });
            
        }

    // skip |xns - no return type
    public class Xcls_HBox2 : Object 
    {
        public Gtk.HBox el;
        private Xcls_WindowLeftProjects  _this;


            // my vars

            // ctor 
        public Xcls_HBox2(Xcls_WindowLeftProjects _owner )
        {
            _this = _owner;
            this.el = new Gtk.HBox( true, 0 );

            // my vars

            // set gobject values
            var child_0 = new Xcls_Button3( _this );
            child_0.ref();
            this.el.add (  child_0.el  );
            var child_1 = new Xcls_Button7( _this );
            child_1.ref();
            this.el.add (  child_1.el  );
            var child_2 = new Xcls_Button11( _this );
            child_2.ref();
            this.el.add (  child_2.el  );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_Button3 : Object 
    {
        public Gtk.Button el;
        private Xcls_WindowLeftProjects  _this;


            // my vars

            // ctor 
        public Xcls_Button3(Xcls_WindowLeftProjects _owner )
        {
            _this = _owner;
            this.el = new Gtk.Button();

            // my vars

            // set gobject values
            var child_0 = new Xcls_HBox4( _this );
            child_0.ref();
            this.el.add (  child_0.el  );

            // listeners 
            this.el.button_press_event.connect(  ( event ) => {
                _this.show_new_project();
                return false;
            } );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_HBox4 : Object 
    {
        public Gtk.HBox el;
        private Xcls_WindowLeftProjects  _this;


            // my vars

            // ctor 
        public Xcls_HBox4(Xcls_WindowLeftProjects _owner )
        {
            _this = _owner;
            this.el = new Gtk.HBox( true, 0 );

            // my vars

            // set gobject values
            var child_0 = new Xcls_Image5( _this );
            child_0.ref();
            this.el.add (  child_0.el  );
            var child_1 = new Xcls_Label6( _this );
            child_1.ref();
            this.el.add (  child_1.el  );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_Image5 : Object 
    {
        public Gtk.Image el;
        private Xcls_WindowLeftProjects  _this;


            // my vars

            // ctor 
        public Xcls_Image5(Xcls_WindowLeftProjects _owner )
        {
            _this = _owner;
            this.el = new Gtk.Image();

            // my vars

            // set gobject values
            this.el.icon_size = Gtk.IconSize.MENU;
            this.el.stock = Gtk.STOCK_ADD;
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_Label6 : Object 
    {
        public Gtk.Label el;
        private Xcls_WindowLeftProjects  _this;


            // my vars

            // ctor 
        public Xcls_Label6(Xcls_WindowLeftProjects _owner )
        {
            _this = _owner;
            this.el = new Gtk.Label( "Add" );

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_Button7 : Object 
    {
        public Gtk.Button el;
        private Xcls_WindowLeftProjects  _this;


            // my vars

            // ctor 
        public Xcls_Button7(Xcls_WindowLeftProjects _owner )
        {
            _this = _owner;
            this.el = new Gtk.Button();

            // my vars

            // set gobject values
            var child_0 = new Xcls_HBox8( _this );
            child_0.ref();
            this.el.add (  child_0.el  );

            // listeners 
            this.el.button_press_event.connect(  ( event ) => {
                _this.show_new_project();
                return false;
            } );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_HBox8 : Object 
    {
        public Gtk.HBox el;
        private Xcls_WindowLeftProjects  _this;


            // my vars

            // ctor 
        public Xcls_HBox8(Xcls_WindowLeftProjects _owner )
        {
            _this = _owner;
            this.el = new Gtk.HBox( true, 0 );

            // my vars

            // set gobject values
            var child_0 = new Xcls_Image9( _this );
            child_0.ref();
            this.el.add (  child_0.el  );
            var child_1 = new Xcls_Label10( _this );
            child_1.ref();
            this.el.add (  child_1.el  );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_Image9 : Object 
    {
        public Gtk.Image el;
        private Xcls_WindowLeftProjects  _this;


            // my vars

            // ctor 
        public Xcls_Image9(Xcls_WindowLeftProjects _owner )
        {
            _this = _owner;
            this.el = new Gtk.Image();

            // my vars

            // set gobject values
            this.el.icon_size = Gtk.IconSize.MENU;
            this.el.stock = Gtk.STOCK_EDIT;
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_Label10 : Object 
    {
        public Gtk.Label el;
        private Xcls_WindowLeftProjects  _this;


            // my vars

            // ctor 
        public Xcls_Label10(Xcls_WindowLeftProjects _owner )
        {
            _this = _owner;
            this.el = new Gtk.Label( "Edit  " );

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_Button11 : Object 
    {
        public Gtk.Button el;
        private Xcls_WindowLeftProjects  _this;


            // my vars

            // ctor 
        public Xcls_Button11(Xcls_WindowLeftProjects _owner )
        {
            _this = _owner;
            this.el = new Gtk.Button();

            // my vars

            // set gobject values
            var child_0 = new Xcls_HBox12( _this );
            child_0.ref();
            this.el.add (  child_0.el  );

            // listeners 
            this.el.button_press_event.connect(  ( event ) => {
                _this.show_new_project();
                return false;
            } );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_HBox12 : Object 
    {
        public Gtk.HBox el;
        private Xcls_WindowLeftProjects  _this;


            // my vars

            // ctor 
        public Xcls_HBox12(Xcls_WindowLeftProjects _owner )
        {
            _this = _owner;
            this.el = new Gtk.HBox( true, 0 );

            // my vars

            // set gobject values
            var child_0 = new Xcls_Image13( _this );
            child_0.ref();
            this.el.add (  child_0.el  );
            var child_1 = new Xcls_Label14( _this );
            child_1.ref();
            this.el.add (  child_1.el  );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_Image13 : Object 
    {
        public Gtk.Image el;
        private Xcls_WindowLeftProjects  _this;


            // my vars

            // ctor 
        public Xcls_Image13(Xcls_WindowLeftProjects _owner )
        {
            _this = _owner;
            this.el = new Gtk.Image();

            // my vars

            // set gobject values
            this.el.icon_size = Gtk.IconSize.MENU;
            this.el.stock = Gtk.STOCK_DELETE;
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_Label14 : Object 
    {
        public Gtk.Label el;
        private Xcls_WindowLeftProjects  _this;


            // my vars

            // ctor 
        public Xcls_Label14(Xcls_WindowLeftProjects _owner )
        {
            _this = _owner;
            this.el = new Gtk.Label( "Delete  " );

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_ScrolledWindow15 : Object 
    {
        public Gtk.ScrolledWindow el;
        private Xcls_WindowLeftProjects  _this;


            // my vars

            // ctor 
        public Xcls_ScrolledWindow15(Xcls_WindowLeftProjects _owner )
        {
            _this = _owner;
            this.el = new Gtk.ScrolledWindow( null, null );

            // my vars

            // set gobject values
            this.el.shadow_type = Gtk.ShadowType.IN;
            var child_0 = new Xcls_view( _this );
            child_0.ref();
            this.el.add (  child_0.el  );

            // init method 
              this.el.set_policy (Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC);
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_view : Object 
    {
        public Gtk.TreeView el;
        private Xcls_WindowLeftProjects  _this;


            // my vars

            // ctor 
        public Xcls_view(Xcls_WindowLeftProjects _owner )
        {
            _this = _owner;
            _this.view = this;
            this.el = new Gtk.TreeView();

            // my vars

            // set gobject values
            this.el.enable_tree_lines = true;
            this.el.headers_visible = false;
            var child_0 = new Xcls_model( _this );
            child_0.ref();
            this.el.set_model (  child_0.el  );
            var child_1 = new Xcls_TreeViewColumn18( _this );
            child_1.ref();
            this.el.append_column (  child_1.el  );

            // init method 
              var description = new Pango.FontDescription();
                 description.set_size(8000);
                this.el.modify_font(description);     
                                
                var selection = this.el.get_selection();
                selection.set_mode( Gtk.SelectionMode.SINGLE);
             
            
                
              

            // listeners 
            this.el.cursor_changed.connect(  () => {
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
                
            } );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_model : Object 
    {
        public Gtk.ListStore el;
        private Xcls_WindowLeftProjects  _this;


            // my vars

            // ctor 
        public Xcls_model(Xcls_WindowLeftProjects _owner )
        {
            _this = _owner;
            _this.model = this;
            this.el = new Gtk.ListStore( 2, typeof(string), typeof(Object) );

            // my vars

            // set gobject values

            // init method 
            function() {
                XObject.prototype.init.call(this);
            }

            // listeners 
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_TreeViewColumn18 : Object 
    {
        public Gtk.TreeViewColumn el;
        private Xcls_WindowLeftProjects  _this;


            // my vars

            // ctor 
        public Xcls_TreeViewColumn18(Xcls_WindowLeftProjects _owner )
        {
            _this = _owner;
            this.el = new Gtk.TreeViewColumn();

            // my vars

            // set gobject values
            var child_0 = new Xcls_namecol( _this );
            child_0.ref();
            this.el.pack_start (  child_0.el , true );

            // init method 
                this.el.add_attribute(_this.namecol.el , "markup", 0  );
             
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_namecol : Object 
    {
        public Gtk.CellRendererText el;
        private Xcls_WindowLeftProjects  _this;


            // my vars

            // ctor 
        public Xcls_namecol(Xcls_WindowLeftProjects _owner )
        {
            _this = _owner;
            _this.namecol = this;
            this.el = new Gtk.CellRendererText();

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip |xns - no return type
    }
}
