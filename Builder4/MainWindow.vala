/* -- to compile
valac  --pkg gio-2.0  --pkg posix  --pkg gtk+-3.0 --pkg libnotify --pkg gtksourceview-3.0  --pkg  libwnck-3.0 \
    /tmp/MainWindow.vala  -o /tmp/MainWindow
*/


/* -- to test class
static int main (string[] args) {
    Gtk.init (ref args);
    new Xcls_MainWindow();
    MainWindow.show_all();
     Gtk.main ();
    return 0;
}
*/


public static Xcls_MainWindow  MainWindow;

public class Xcls_MainWindow : Object 
{
    public Gtk.Window el;
    private Xcls_MainWindow  _this;

    public Xcls_vbox vbox;
    public Xcls_topbar topbar;
    public Xcls_mainpane mainpane;
    public Xcls_leftpane leftpane;
    public Xcls_editpane editpane;
    public Xcls_tree tree;
    public Xcls_props props;
    public Xcls_clutterembed clutterembed;
    public Xcls_rooview rooview;
    public Xcls_projectbutton projectbutton;

        // my vars
    public Project.Project project;
    public Xcls_ClutterFiles clutterfiles;
    public Xcls_LeftProps left_props;
    public Xcls_WindowLeftProjects left_projects;
    public Xcls_WindowLeftTree left_tree;
    public Xcls_WindowRooView window_rooview;
    public bool children_loaded;
    public bool is_editing;
    public string title;

        // ctor 
    public Xcls_MainWindow()
    {
        _this = this;
        MainWindow = this;
        this.el = new Gtk.Window( Gtk.WindowType.TOPLEVEL );

        // my vars
        this.clutterfiles = null;
        this.left_props = null;
        this.left_projects = null;
        this.left_tree = null;
        this.window_rooview = null;
        this.children_loaded = false;
        this.is_editing = false;
        this.title = "Application Builder";

        // set gobject values
        this.el.border_width = 0;
        this.el.default_height = 500;
        this.el.default_width = 800;
        var child_0 = new Xcls_vbox( _this );
        child_0.ref();
        this.el.add (  child_0.el  );

        // init method 
         
        	  
            //this.el.show_all();
            
            

        // listeners 
        this.el.show.connect(   ( ) => {
            // hide the file editing..
           
            this.hideViewEditing();
        } );
        this.el.delete_event.connect(   (   event) => {
            return false;
        } );
    }

    // userdefined functions 
    public void hideViewEditing  ( )   {
            
             this.editpane.createThumb();
             
             this.editpane.el.hide();
            //this.rooview.el.hide();
             this.left_projects.el.show();
            
            var el = _this.rooview.el;
            el.save_easing_state();
           
            // show project / file view..
            //_this.mainpane.lastWidth = _this.leftpane.el.get_position();
            //_this.mainpane.el.set_position(0);
            // rotate y 180..
            el.set_rotation_angle(Clutter.RotateAxis.Y_AXIS, 360.0f);
            el.set_scale(0.0f,0.0f);
            _this.is_editing = false;
        
            _this.clutterfiles.loadProject(_this.project);
        
            el.restore_easing_state();
                
            print("show view browsing");
        }
    public void initChildren () {
            // this needs putting in a better place..
            
            print("init children");
            this.left_tree =new Xcls_WindowLeftTree();
            this.left_tree.ref();
            this.tree.el.pack_start(this.left_tree.el,true, true,0);
        
        
            this.left_props =new Xcls_LeftProps();
            this.left_props.ref();
            this.props.el.pack_start(this.left_props.el,true, true,0);
        
        
            // left projects..
             this.left_projects = new Xcls_WindowLeftProjects();
             this.left_projects.ref();
            this.leftpane.el.pack_start(this.left_projects.el,true, true,0);
           
            
           
            this.window_rooview  =new Xcls_WindowRooView();
            this.window_rooview.ref();
            ((Gtk.Container)(this.rooview.el.get_widget())).add(this.window_rooview.el);
            this.window_rooview.el.show_all();
        
            var stage = _this.rooview.el.get_stage();
            stage.set_background_color(  Clutter.Color.from_string("#000"));
            
            this.clutterfiles = new Xcls_ClutterFiles();
            this.clutterfiles.ref();
            stage.add_child(this.clutterfiles.el);
            this.clutterfiles.el.show_all();
        
        
            this.clutterfiles.open.connect((file) => { 
                _this.showViewEditing();
                this.left_tree.model.loadFile(file);
                this.window_rooview.loadFile(file);
                print("OPEN : " + file.name);
        
            });
        
            this.left_projects.project_selected.connect((proj) => {
                proj.scanDirs();
                _this.clutterfiles.loadProject(proj);
            
            });
        
        
        
        
        
            //w.el.show_all();
            var tl = new Clutter.Timeline(6000);
            tl.set_repeat_count(-1);
            tl.start();
            tl.ref();
        
            this.children_loaded = true;
        
        
        
        
        }
    public void setTitle (string str) {
            this.el.set_title(this.title + " - " + str);
        }
    public void show() {
            this.left_tree =new Xcls_WindowLeftTree();
            _this.vbox.el.pack_start(this.left_tree.el,true, true,0);
            this.el.show_all();
        
        }
    public void showViewEditing  ( )  {
             this.editpane.el.show();
          //   this.rooview.el.show();
             this.left_projects.el.hide();
            
              
            
            var el = _this.rooview.el;
                el.save_easing_state();
          
            
                el.set_rotation_angle(Clutter.RotateAxis.Y_AXIS, 0.0f);
                el.set_scale(1.0f,1.0f);
                _this.is_editing = true;
               // _this.mainpane.el.set_position(_this.leftpane.lastWidth);
                _this.clutterfiles.el.hide();
            
            el.restore_easing_state();
                
            print("show view editing");
        }

    // skip |xns - no return type
    public class Xcls_vbox : Object 
    {
        public Gtk.VBox el;
        private Xcls_MainWindow  _this;


            // my vars

            // ctor 
        public Xcls_vbox(Xcls_MainWindow _owner )
        {
            _this = _owner;
            _this.vbox = this;
            this.el = new Gtk.VBox( false, 0 );

            // my vars

            // set gobject values
            var child_0 = new Xcls_topbar( _this );
            child_0.ref();
            this.el.pack_start (  child_0.el , false,true,0 );
            var child_1 = new Xcls_mainpane( _this );
            child_1.ref();
            this.el.pack_end (  child_1.el , true,true,0 );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_topbar : Object 
    {
        public Gtk.HBox el;
        private Xcls_MainWindow  _this;


            // my vars

            // ctor 
        public Xcls_topbar(Xcls_MainWindow _owner )
        {
            _this = _owner;
            _this.topbar = this;
            this.el = new Gtk.HBox( true, 0 );

            // my vars

            // set gobject values
            this.el.height_request = 20;
            this.el.vexpand = false  ;
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_mainpane : Object 
    {
        public Gtk.HPaned el;
        private Xcls_MainWindow  _this;


            // my vars
        public int lastWidth;

            // ctor 
        public Xcls_mainpane(Xcls_MainWindow _owner )
        {
            _this = _owner;
            _this.mainpane = this;
            this.el = new Gtk.HPaned();

            // my vars
            this.lastWidth = 0;

            // set gobject values
            this.el.position = 400;
            var child_0 = new Xcls_leftpane( _this );
            child_0.ref();
            this.el.add1 (  child_0.el  );
            var child_1 = new Xcls_VBox9( _this );
            child_1.ref();
            this.el.add2 (  child_1.el  );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_leftpane : Object 
    {
        public Gtk.VBox el;
        private Xcls_MainWindow  _this;


            // my vars

            // ctor 
        public Xcls_leftpane(Xcls_MainWindow _owner )
        {
            _this = _owner;
            _this.leftpane = this;
            this.el = new Gtk.VBox( true, 0 );

            // my vars

            // set gobject values
            var child_0 = new Xcls_editpane( _this );
            child_0.ref();
            this.el.pack_start (  child_0.el , false,true,0 );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_editpane : Object 
    {
        public Gtk.VPaned el;
        private Xcls_MainWindow  _this;


            // my vars

            // ctor 
        public Xcls_editpane(Xcls_MainWindow _owner )
        {
            _this = _owner;
            _this.editpane = this;
            this.el = new Gtk.VPaned();

            // my vars

            // set gobject values
            var child_0 = new Xcls_tree( _this );
            child_0.ref();
            this.el.add1 (  child_0.el  );
            var child_1 = new Xcls_props( _this );
            child_1.ref();
            this.el.add2 (  child_1.el  );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_tree : Object 
    {
        public Gtk.VBox el;
        private Xcls_MainWindow  _this;


            // my vars

            // ctor 
        public Xcls_tree(Xcls_MainWindow _owner )
        {
            _this = _owner;
            _this.tree = this;
            this.el = new Gtk.VBox( true, 0 );

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_props : Object 
    {
        public Gtk.VBox el;
        private Xcls_MainWindow  _this;


            // my vars

            // ctor 
        public Xcls_props(Xcls_MainWindow _owner )
        {
            _this = _owner;
            _this.props = this;
            this.el = new Gtk.VBox( true, 0 );

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_VBox9 : Object 
    {
        public Gtk.VBox el;
        private Xcls_MainWindow  _this;


            // my vars

            // ctor 
        public Xcls_VBox9(Xcls_MainWindow _owner )
        {
            _this = _owner;
            this.el = new Gtk.VBox( true, 0 );

            // my vars

            // set gobject values
            var child_0 = new Xcls_clutterembed( _this );
            child_0.ref();
            this.el.pack_start (  child_0.el , true,true,0 );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_clutterembed : Object 
    {
        public GtkClutter.Embed el;
        private Xcls_MainWindow  _this;


            // my vars

            // ctor 
        public Xcls_clutterembed(Xcls_MainWindow _owner )
        {
            _this = _owner;
            _this.clutterembed = this;
            this.el = new GtkClutter.Embed();

            // my vars

            // set gobject values
            var child_0 = new Xcls_rooview( _this );
            child_0.ref();
            this.el.get_stage().add_child (  child_0.el  );
            var child_1 = new Xcls_projectbutton( _this );
            child_1.ref();
            this.el.get_stage().add_child (  child_1.el  );

            // init method 
                var stage = this.el.get_stage();
                stage.set_background_color(  Clutter.Color.from_string("#000"));
                
                

            // listeners 
            this.el.size_allocate.connect(   (  alloc) => {
                //if (!_this.children_loaded) {  return; }
                print("size_allocation %d,%d\n".printf(alloc.width, alloc.height));
            
            /*    _this.rooview.el.set_size(this.el.get_stage().width-50,
                        this.el.get_stage().height);
                _this.clutterfiles.set_size(this.el.get_stage().width-50,
                       this.el.get_stage().height);
            */
               // this.el.set_size_request(alloc.width,alloc.height);
               // this.el.get_stage().set_size(alloc.width,alloc.height);
                _this.rooview.el.set_size(alloc.width-50,
                        alloc.height);
                _this.clutterfiles.set_size(alloc.width-50,
                       alloc.height);
            } );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_rooview : Object 
    {
        public GtkClutter.Actor el;
        private Xcls_MainWindow  _this;


            // my vars

            // ctor 
        public Xcls_rooview(Xcls_MainWindow _owner )
        {
            _this = _owner;
            _this.rooview = this;
            this.el = new GtkClutter.Actor();

            // my vars

            // set gobject values

            // init method 
            {
               
               
                this.el.add_constraint(
                    new Clutter.AlignConstraint(
                        _this.clutterembed.el.get_stage(), 
                        Clutter.AlignAxis.X_AXIS,
                        1.0f
                    )
                );
                    
                //this.el.set_position(100,100);
                this.el.set_pivot_point(0.5f,0.5f);
                
                this.el.set_size(_this.clutterembed.el.get_stage().width-50,
                        _this.clutterembed.el.get_stage().height);
                        
            }
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_projectbutton : Object 
    {
        public GtkClutter.Actor el;
        private Xcls_MainWindow  _this;


            // my vars

            // ctor 
        public Xcls_projectbutton(Xcls_MainWindow _owner )
        {
            _this = _owner;
            _this.projectbutton = this;
            this.el = new GtkClutter.Actor();

            // my vars

            // set gobject values
            var child_0 = new Xcls_Button13( _this );
            child_0.ref();

            // init method 
            {
                
                this.el.add_constraint(
                    new Clutter.AlignConstraint(
                        _this.clutterembed.el.get_stage(), 
                        Clutter.AlignAxis.X_AXIS,
                        0.0f
                    )
                );
                
                //this.el.set_position(100,100);
                this.el.set_pivot_point(0.5f,0.5f);
                this.el.set_size(50,50);
            }
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_Button13 : Object 
    {
        public Gtk.Button el;
        private Xcls_MainWindow  _this;


            // my vars

            // ctor 
        public Xcls_Button13(Xcls_MainWindow _owner )
        {
            _this = _owner;
            this.el = new Gtk.Button();

            // my vars

            // set gobject values
            this.el.label = "P";

            // init method 
            {
                ((Gtk.Container)(_this.projectbutton.el.get_widget())).add(this.el);
            }

            // listeners 
            this.el.clicked.connect(   ( ) => {
                 
                if (_this.is_editing) { 
                    _this.hideViewEditing();
                } else {
                    _this.showViewEditing();
                }
                    
            
            } );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
}
