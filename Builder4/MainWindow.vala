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
    public Xcls_projecteditview projecteditview;
    public Xcls_buttonlayout buttonlayout;
    public Xcls_projectbutton projectbutton;
    public Xcls_projecteditbutton projecteditbutton;
    public Xcls_objectshowbutton objectshowbutton;
    public Xcls_addpropbutton addpropbutton;
    public Xcls_addlistenerbutton addlistenerbutton;

        // my vars
    public Project.Project project;
    public Xcls_ClutterFiles clutterfiles;
    public Xcls_LeftProps left_props;
    public Xcls_ProjectSettings projectsettings;
    public Xcls_WindowLeftProjects left_projects;
    public Xcls_WindowLeftTree left_tree;
    public Xcls_WindowRooView window_rooview;
    public bool children_loaded;
    public string state;
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
        this.projectsettings = null;
        this.left_projects = null;
        this.left_tree = null;
        this.window_rooview = null;
        this.children_loaded = false;
        this.title = "Application Builder";

        // set gobject values
        this.el.border_width = 0;
        this.el.default_height = 500;
        this.el.default_width = 800;
        var child_0 = new Xcls_vbox( _this );
        child_0.ref();
        this.el.add (  child_0.el  );

        // init method 
         this.state = "files";
        	  
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
    public void hideAddListener() {
              // return to editing state..
               
              //_this.projectbutton.el.show();
             //_this.projecteditbutton.el.show();
             
             
            //this.rooview.el.hide();
             //this.edit_project.el.show();
             
             //_this.projecteditview.el.save_easing_state();
            var el = _this.rooview.el;
            el.save_easing_state();
        
            
            el.set_scale(1.0f,1.0f);
        //       _this.projecteditview.el.set_scale(1.0f,0.0f);
            _this.state = "edit";
        
         
            //_this.clutterfiles.loadProject(_this.project);
        
            el.restore_easing_state();
              //_this.projecteditview.el.restore_easing_state();  
         
        
        }
    public void hideAddProp() {
              // return to editing state..
               
              //_this.projectbutton.el.show();
             //_this.projecteditbutton.el.show();
             
             
            //this.rooview.el.hide();
             //this.edit_project.el.show();
             
             //_this.projecteditview.el.save_easing_state();
            var el = _this.rooview.el;
            el.save_easing_state();
        
            
            el.set_scale(1.0f,1.0f);
        //       _this.projecteditview.el.set_scale(1.0f,0.0f);
            _this.state = "edit";
        
         
            //_this.clutterfiles.loadProject(_this.project);
        
            el.restore_easing_state();
              //_this.projecteditview.el.restore_easing_state();  
         
        
        }
    public void hideObjects() {
              // return to editing state..
               
              //_this.projectbutton.el.show();
             //_this.projecteditbutton.el.show();
             
             
            //this.rooview.el.hide();
             //this.edit_project.el.show();
             
             //_this.projecteditview.el.save_easing_state();
            var el = _this.rooview.el;
            el.save_easing_state();
        
            
            el.set_scale(1.0f,1.0f);
        //       _this.projecteditview.el.set_scale(1.0f,0.0f);
            _this.state = "edit";
        
         
            //_this.clutterfiles.loadProject(_this.project);
        
            el.restore_easing_state();
              //_this.projecteditview.el.restore_easing_state();  
         
        
        }
    public void hideProjectEdit () {
            // return to editing state..
               
              _this.projectbutton.el.show();
             _this.projecteditbutton.el.show();
             
             
            //this.rooview.el.hide();
             //this.edit_project.el.show();
                _this.projecteditview.el.save_easing_state();
            var el = _this.rooview.el;
            el.save_easing_state();
        
            
            el.set_scale(1.0f,1.0f);
               _this.projecteditview.el.set_scale(1.0f,0.0f);
            _this.state = "edit";
        
         
            //_this.clutterfiles.loadProject(_this.project);
        
            el.restore_easing_state();
              _this.projecteditview.el.restore_easing_state();  
          
        }
    public void hideViewEditing  ( )   {
            
             this.window_rooview.createThumb();
                  _this.projecteditbutton.el.hide();
             this.editpane.el.hide();
            //this.rooview.el.hide();
             this.left_projects.el.show();
            
            var el = _this.rooview.el;
            el.save_easing_state();
              el.set_easing_duration(1000);
            // show project / file view..
            //_this.mainpane.lastWidth = _this.leftpane.el.get_position();
            //_this.mainpane.el.set_position(0);
            // rotate y 180..
            el.set_rotation_angle(Clutter.RotateAxis.Y_AXIS, 360.0f);
            el.set_scale(0.0f,0.0f);
           
                _this.state = "files";
        
            _this.left_projects.selectProject(_this.project);
            //_this.clutterfiles.loadProject(_this.project);
        
            el.restore_easing_state();
                
            print("show view browsing");
        }
    public void initChildren () {
            // this needs putting in a better place..
            
            print("init children");
            this.left_tree = new Xcls_WindowLeftTree();
            this.left_tree.ref();
            this.tree.el.pack_start(this.left_tree.el,true, true,0);
            this.left_tree.node_selected.connect((sel) => {
                if (sel == null) {
                    this.left_props.el.hide();
                } 
                this.left_props.el.show();
                this.left_props.load(this.left_tree.getActiveFile(), sel);
                
            
            });
            this.left_tree.before_node_change.connect((sel) => {
                this.left_props.finish_editing();
                 
            });
            
            
        
        
        
            this.left_props =new Xcls_LeftProps();
            this.left_props.ref();
            this.props.el.pack_start(this.left_props.el,true, true,0);
        
        
            // left projects..
             this.left_projects = new Xcls_WindowLeftProjects();
             this.left_projects.ref();
            this.leftpane.el.pack_start(this.left_projects.el,true, true,0);
           
            this.left_projects.project_selected.connect((proj) => {
                proj.scanDirs();
                _this.clutterfiles.loadProject(proj);
            
            });
            
           
            // project edit..
            this.projectsettings  =new Xcls_ProjectSettings();
            this.projectsettings.ref();  /// really?
            ((Gtk.Container)(this.projecteditview.el.get_widget())).add(this.projectsettings.el);
            //this.projectsettings.el.show_all();
        
            var stage = _this.projecteditview.el.get_stage();
            stage.set_background_color(  Clutter.Color.from_string("#000"));
            
             this.projectsettings.buttonPressed.connect((btn) => {
                if (btn == "save") {
                     _this.window_rooview.view.renderJS(true);
                }
                if (btn == "apply") {
                    _this.window_rooview.view.renderJS(true);
                    return;
                }
                this.hideProjectEdit();
                 
             });
            
            
            
            
            
            //  roo view
            
             this.window_rooview  =new Xcls_WindowRooView();
            this.window_rooview.ref();
            ((Gtk.Container)(this.rooview.el.get_widget())).add(this.window_rooview.el);
            this.window_rooview.el.show_all();
        
            stage = _this.rooview.el.get_stage();
            stage.set_background_color(  Clutter.Color.from_string("#000"));
            
           
            
            // clutter files
            
            
            this.clutterfiles = new Xcls_ClutterFiles();
            this.clutterfiles.ref();
            stage.add_child(this.clutterfiles.el);
            this.clutterfiles.el.show_all();
        
        
            this.clutterfiles.open.connect((file) => { 
                _this.project = file.project;
                _this.showViewEditing();
                this.left_tree.model.loadFile(file);
                
                this.window_rooview.loadFile(file);
                print("OPEN : " + file.name);
        
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
    public void showAddListener() {
        
             
             
             
             
             
            //this.rooview.el.hide();
            //this.projectsettings.el.show_all();
            //this.projectsettings.show(this.project);
        
            //_this.projecteditview.el.save_easing_state();
                
            var el = _this.rooview.el;
            el.save_easing_state();
           
            
            el.set_scale(0.5f,0.5f);
        
            //_this.projecteditview.el.set_scale(1.0f,1.0f);
           
           
         
            //_this.clutterfiles.loadProject(_this.project);
        
            el.restore_easing_state();
            //_this.projecteditview.el.restore_easing_state();
            this.state = "addlistener";
        }
    public void showAddProp() {
        
             
             
             
             
             
            //this.rooview.el.hide();
            //this.projectsettings.el.show_all();
            //this.projectsettings.show(this.project);
        
            //_this.projecteditview.el.save_easing_state();
                
            var el = _this.rooview.el;
            el.save_easing_state();
           
            
            el.set_scale(0.5f,0.5f);
        
            //_this.projecteditview.el.set_scale(1.0f,1.0f);
           
           
         
            //_this.clutterfiles.loadProject(_this.project);
        
            el.restore_easing_state();
            //_this.projecteditview.el.restore_easing_state();
            this.state = "addprops";
        }
    public void showObjects() {
        
             
             
             
             
             
            //this.rooview.el.hide();
            //this.projectsettings.el.show_all();
            //this.projectsettings.show(this.project);
        
            //_this.projecteditview.el.save_easing_state();
                
            var el = _this.rooview.el;
            el.save_easing_state();
           
            
            el.set_scale(0.5f,0.5f);
        
            //_this.projecteditview.el.set_scale(1.0f,1.0f);
           
           
         
            //_this.clutterfiles.loadProject(_this.project);
        
            el.restore_easing_state();
            //_this.projecteditview.el.restore_easing_state();
            this.state = "objects";
        }
    public void showProjectEdit () {
            // make the browser smaller, and show the edit dialog
            
            
             _this.projectbutton.el.hide();
             _this.projecteditbutton.el.hide();
             
             
            //this.rooview.el.hide();
            this.projectsettings.el.show_all();
            this.projectsettings.show(this.project);
            _this.projecteditview.el.save_easing_state();
                
            var el = _this.rooview.el;
            el.save_easing_state();
           
            
            el.set_scale(0.5f,0.5f);
        
            _this.projecteditview.el.set_scale(1.0f,1.0f);
           
            _this.state = "projectedit";
             
         
            //_this.clutterfiles.loadProject(_this.project);
        
            el.restore_easing_state();
            _this.projecteditview.el.restore_easing_state();
          //  print("show view browsing");
            
        }
    public void showViewEditing  ( )  {
             this.editpane.el.show();
          //   this.rooview.el.show();
             this.left_projects.el.hide();
            
               _this.projecteditbutton.el.show();
            
            var el = _this.rooview.el;
                el.save_easing_state();
          
            
                el.set_rotation_angle(Clutter.RotateAxis.Y_AXIS, 0.0f);
                el.set_scale(1.0f,1.0f);
                _this.state = "edit";
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
            var child_1 = new Xcls_projecteditview( _this );
            child_1.ref();
            this.el.get_stage().add_child (  child_1.el  );
            var child_2 = new Xcls_buttonlayout( _this );
            child_2.ref();
            this.el.get_stage().add_child (  child_2.el  );

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
                _this.projecteditview.el.set_size(alloc.width-50,
                       alloc.height / 2.0f);
            
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
                this.el.set_pivot_point(1.0f,1.0f);
                
                this.el.set_size(_this.clutterembed.el.get_stage().width-50,
                        _this.clutterembed.el.get_stage().height);
                        
            }
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_projecteditview : Object 
    {
        public GtkClutter.Actor el;
        private Xcls_MainWindow  _this;


            // my vars

            // ctor 
        public Xcls_projecteditview(Xcls_MainWindow _owner )
        {
            _this = _owner;
            _this.projecteditview = this;
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
                this.el.set_pivot_point(0.0f,0.0f);
                this.el.set_scale(1.0f,0.0f);
                this.el.set_size(_this.clutterembed.el.get_stage().width-50,
                        _this.clutterembed.el.get_stage().height /2);
                        
            }
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_buttonlayout : Object 
    {
        public Clutter.Actor el;
        private Xcls_MainWindow  _this;


            // my vars

            // ctor 
        public Xcls_buttonlayout(Xcls_MainWindow _owner )
        {
            _this = _owner;
            _this.buttonlayout = this;
            this.el = new Clutter.Actor();

            // my vars

            // set gobject values
            var child_0 = new Xcls_BoxLayout14( _this );
            child_0.ref();
            this.el.layout_manager = child_0.el;
            var child_1 = new Xcls_projectbutton( _this );
            child_1.ref();
            this.el.add_child (  child_1.el  );
            var child_2 = new Xcls_projecteditbutton( _this );
            child_2.ref();
            this.el.add_child (  child_2.el  );
            var child_3 = new Xcls_objectshowbutton( _this );
            child_3.ref();
            this.el.add_child (  child_3.el  );
            var child_4 = new Xcls_addpropbutton( _this );
            child_4.ref();
            this.el.add_child (  child_4.el  );
            var child_5 = new Xcls_addlistenerbutton( _this );
            child_5.ref();
            this.el.add_child (  child_5.el  );

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
                 this.el.set_size(50,
                       _this.clutterembed.el.get_stage().height);
                 
            }
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_BoxLayout14 : Object 
    {
        public Clutter.BoxLayout el;
        private Xcls_MainWindow  _this;


            // my vars

            // ctor 
        public Xcls_BoxLayout14(Xcls_MainWindow _owner )
        {
            _this = _owner;
            this.el = new Clutter.BoxLayout();

            // my vars

            // set gobject values
            this.el.orientation = Clutter.Orientation.VERTICAL;
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_projectbutton : Object 
    {
        public Clutter.Actor el;
        private Xcls_MainWindow  _this;


            // my vars

            // ctor 
        public Xcls_projectbutton(Xcls_MainWindow _owner )
        {
            _this = _owner;
            _this.projectbutton = this;
            this.el = new Clutter.Actor();

            // my vars

            // set gobject values
            this.el.reactive = true;
            var child_0 = new Xcls_Text16( _this );
            child_0.ref();
            this.el.add_child (  child_0.el  );

            // init method 
            this.el.set_size(50,50);

            // listeners 
            this.el.enter_event.connect( (  event)  => {
                this.el.background_color = new Clutter.Color.from_string("#333");
                    return false;
            } );
            this.el.leave_event.connect( (  event)  => {
                this.el.background_color = new Clutter.Color.from_string("#000");
                return false;
            } );
            this.el.button_press_event.connect(   ( ) => {
                switch (_this.state) {
                    case "edit":
                    
                        _this.hideViewEditing();
                        break;  
                    case "files":
                        _this.showViewEditing();
                        break; 
                    default:
                        break;
                }
                return false;    
            
            } );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_Text16 : Object 
    {
        public Clutter.Text el;
        private Xcls_MainWindow  _this;


            // my vars

            // ctor 
        public Xcls_Text16(Xcls_MainWindow _owner )
        {
            _this = _owner;
            this.el = new Clutter.Text.full("Sans 10px","Open\nFiles",new Clutter.Color.from_string("#fff"));

            // my vars

            // set gobject values
            this.el.line_alignment = Pango.Alignment.CENTER;
            this.el.x_align = Clutter.ActorAlign.CENTER;
            this.el.x_expand = false;
            this.el.y_align = Clutter.ActorAlign.CENTER;
            this.el.y_expand = false;
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_projecteditbutton : Object 
    {
        public Clutter.Actor el;
        private Xcls_MainWindow  _this;


            // my vars

            // ctor 
        public Xcls_projecteditbutton(Xcls_MainWindow _owner )
        {
            _this = _owner;
            _this.projecteditbutton = this;
            this.el = new Clutter.Actor();

            // my vars

            // set gobject values
            this.el.reactive = true;
            var child_0 = new Xcls_Text18( _this );
            child_0.ref();
            this.el.add_child (  child_0.el  );

            // init method 
            this.el.set_size(50,50);

            // listeners 
            this.el.enter_event.connect( (  event)  => {
                this.el.background_color = new Clutter.Color.from_string("#333");
                    return false;
            } );
            this.el.leave_event.connect( (  event)  => {
                this.el.background_color = new Clutter.Color.from_string("#000");
                return false;
            } );
            this.el.button_press_event.connect(   ( ) => {
                switch (_this.state) {
                    case "edit":
                        _this.showProjectEdit();
                        break;  
                    case "files":
                        // _this.showViewEditing();
                        break; 
                    case "projectedit":
                        _this.hideProjectEdit();
                        break;
                    default:
                        break;
                }
                return false;    
            
            
            } );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_Text18 : Object 
    {
        public Clutter.Text el;
        private Xcls_MainWindow  _this;


            // my vars

            // ctor 
        public Xcls_Text18(Xcls_MainWindow _owner )
        {
            _this = _owner;
            this.el = new Clutter.Text.full("Sans 10px","Edit\nProject\nDetails",new Clutter.Color.from_string("#fff"));

            // my vars

            // set gobject values
            this.el.line_alignment = Pango.Alignment.CENTER;
            this.el.x_align = Clutter.ActorAlign.CENTER;
            this.el.x_expand = false;
            this.el.y_align = Clutter.ActorAlign.CENTER;
            this.el.y_expand = false;
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_objectshowbutton : Object 
    {
        public Clutter.Actor el;
        private Xcls_MainWindow  _this;


            // my vars

            // ctor 
        public Xcls_objectshowbutton(Xcls_MainWindow _owner )
        {
            _this = _owner;
            _this.objectshowbutton = this;
            this.el = new Clutter.Actor();

            // my vars

            // set gobject values
            this.el.reactive = true;
            var child_0 = new Xcls_Text20( _this );
            child_0.ref();
            this.el.add_child (  child_0.el  );

            // init method 
            this.el.set_size(50,50);

            // listeners 
            this.el.enter_event.connect( (  event)  => {
                this.el.background_color = new Clutter.Color.from_string("#333");
                    return false;
            } );
            this.el.leave_event.connect( (  event)  => {
                this.el.background_color = new Clutter.Color.from_string("#000");
                return false;
            } );
            this.el.button_press_event.connect(   ( ) => {
                
                
                
                switch (_this.state) {
            
             
                    case "addprop":
                        _this.hideAddProp();
                        _this.showObject();
                        break;
                case "addlistener":
                        _this.hideAddListener();
                        _this.showObject();
                        break;
            
            // show            
                    case "edit":
                        _this.showObject();
                        break;
                        
            // hide            
                    case "objects":
                        _this.hideObject();
                        break;
                        break;
                                    
                    default:
                        print("unhandled add objects from %s\n",_this.state);
                        break;
                }
                return false;    
            
            
            } );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_Text20 : Object 
    {
        public Clutter.Text el;
        private Xcls_MainWindow  _this;


            // my vars

            // ctor 
        public Xcls_Text20(Xcls_MainWindow _owner )
        {
            _this = _owner;
            this.el = new Clutter.Text.full("Sans 10px","Show\nPalate",new Clutter.Color.from_string("#fff"));

            // my vars

            // set gobject values
            this.el.line_alignment = Pango.Alignment.CENTER;
            this.el.x_align = Clutter.ActorAlign.CENTER;
            this.el.x_expand = false;
            this.el.y_align = Clutter.ActorAlign.CENTER;
            this.el.y_expand = false;
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_addpropbutton : Object 
    {
        public Clutter.Actor el;
        private Xcls_MainWindow  _this;


            // my vars

            // ctor 
        public Xcls_addpropbutton(Xcls_MainWindow _owner )
        {
            _this = _owner;
            _this.addpropbutton = this;
            this.el = new Clutter.Actor();

            // my vars

            // set gobject values
            this.el.reactive = true;
            var child_0 = new Xcls_Text22( _this );
            child_0.ref();
            this.el.add_child (  child_0.el  );

            // init method 
            this.el.set_size(50,50);

            // listeners 
            this.el.enter_event.connect( (  event)  => {
                this.el.background_color = new Clutter.Color.from_string("#333");
                    return false;
            } );
            this.el.leave_event.connect( (  event)  => {
                this.el.background_color = new Clutter.Color.from_string("#000");
                return false;
            } );
            this.el.button_press_event.connect(   ( ) => {
                
                
                
                switch (_this.state) {
                    case "edit":
                        _this.showAddProp();
                        break;
                        
                    case "objects":
                        _this.hideObjects();
                        _this.showAddProp();
                        break;
                   
                    case "addlistener":
                        _this.hideAddListener();
                        _this.showAddProp();            
                        break;
                        
                        
                    case "addprops":
                        _this.hideAddProp();
                        break;
                        
                    default:
                        print("unhandled add property from %s\n",_this.state);
                        break;
                        
                }
                return false;    
            
            
            } );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_Text22 : Object 
    {
        public Clutter.Text el;
        private Xcls_MainWindow  _this;


            // my vars

            // ctor 
        public Xcls_Text22(Xcls_MainWindow _owner )
        {
            _this = _owner;
            this.el = new Clutter.Text.full("Sans 10px","Add\nProperty",new Clutter.Color.from_string("#fff"));

            // my vars

            // set gobject values
            this.el.line_alignment = Pango.Alignment.CENTER;
            this.el.x_align = Clutter.ActorAlign.CENTER;
            this.el.x_expand = false;
            this.el.y_align = Clutter.ActorAlign.CENTER;
            this.el.y_expand = false;
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_addlistenerbutton : Object 
    {
        public Clutter.Actor el;
        private Xcls_MainWindow  _this;


            // my vars

            // ctor 
        public Xcls_addlistenerbutton(Xcls_MainWindow _owner )
        {
            _this = _owner;
            _this.addlistenerbutton = this;
            this.el = new Clutter.Actor();

            // my vars

            // set gobject values
            this.el.reactive = true;
            var child_0 = new Xcls_Text24( _this );
            child_0.ref();
            this.el.add_child (  child_0.el  );

            // init method 
            this.el.set_size(50,50);

            // listeners 
            this.el.enter_event.connect( (  event)  => {
                this.el.background_color = new Clutter.Color.from_string("#333");
                    return false;
            } );
            this.el.leave_event.connect( (  event)  => {
                this.el.background_color = new Clutter.Color.from_string("#000");
                return false;
            } );
            this.el.button_press_event.connect(   ( ) => {
                
                
                
                switch (_this.state) {
                    case "edit":
                        _this.showAddListener();
                        break;
                        
                    case "objects":
                        _this.hideObjects();
                        _this.showAddListener();
                        break;
            
                    case "addlistener":
                        _this.hideAddListener();
                        break;
            
                        
                    case "addprops":
                        _this.hideAddProps();
                        _this.showAddListener();
                        break;
                        
                      default:
                        print("unhandled add listener from %s\n",_this.state);
            
                        break;
                        
                }
                return false;    
            
            
            } );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_Text24 : Object 
    {
        public Clutter.Text el;
        private Xcls_MainWindow  _this;


            // my vars

            // ctor 
        public Xcls_Text24(Xcls_MainWindow _owner )
        {
            _this = _owner;
            this.el = new Clutter.Text.full("Sans 10px","Add\nListener",new Clutter.Color.from_string("#fff"));

            // my vars

            // set gobject values
            this.el.line_alignment = Pango.Alignment.CENTER;
            this.el.x_align = Clutter.ActorAlign.CENTER;
            this.el.x_expand = false;
            this.el.y_align = Clutter.ActorAlign.CENTER;
            this.el.y_expand = false;
        }

        // userdefined functions 

        // skip |xns - no return type
    }
}
