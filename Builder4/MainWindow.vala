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
    public Xcls_tree tree;
    public Xcls_props props;
    public Xcls_clutterembed clutterembed;
    public Xcls_rooview rooview;

        // my vars
    public Xcls_WindowLeftTree left_tree;
    public string title;

        // ctor 
    public Xcls_MainWindow()
    {
        _this = this;
        MainWindow = this;
        this.el = new Gtk.Window( Gtk.WindowType.TOPLEVEL );

        // my vars
        this.left_tree = null;
        this.title = "Application Builder";

        // set gobject values
        this.el.border_width = 0;
        this.el.default_height = 500;
        this.el.default_width = 800;
        var child_0 = new Xcls_vbox(_this);
        child_0.ref();
        this.el.add (  child_0.el  );

        // init method 
         
        	  
            this.el.show_all();
            
            

        // listeners 
        this.el.show.connect(   ( ) => {
        
            //imports.Builder.Provider.ProjectManager.ProjectManager.loadConfig();
            //this.get('/MidPropTree').hideWin();
            //this.get('/RightPalete').hide();
            //this.get('/BottomPane').el.hide();
            //this.get('/Editor').el.show_all();
          
        } );
        this.el.delete_event.connect(   (   event) => {
            return false;
        } );
    }

    // userdefined functions 

    // skip listeners - not pipe 

    // skip .Xcls_WindowLeftTree:left_tree - already used 

    // skip .string:title - already used 

    // skip border_width - already used 

    // skip default_height - already used 

    // skip default_width - already used 

    // skip destroy - not pipe 

    // skip id - not pipe 

    // skip xtype - not pipe 

    // skip |init - already used 

    // skip |type - already used 
    public void setTitle (string str) {
            this.el.set_title(this.title + " - " + str);
        }
    public void show() {
            this.left_tree =new Xcls_WindowLeftTree();
            _this.vbox.el.pack_start(this.left_tree.el,true, true,0);
            this.el.show_all();
        
        }

    // skip |xns - no return type

    // skip items - not pipe 

    // skip xvala_cls - not pipe 

    // skip xvala_xcls - not pipe 

    // skip xvala_id - not pipe 
    public class Xcls_vbox : Object 
    {
        public Gtk.VBox el;
        private Xcls_MainWindow  _this;


            // my vars

            // ctor 
        public Xcls_vbox(Xcls_MainWindow _owner)
        {
            _this = _owner;
            _this.vbox = this;
            this.el = new Gtk.VBox( false, 0 );

            // my vars

            // set gobject values
            var child_0 = new Xcls_topbar(_this);
            child_0.ref();
            this.el.pack_start (  child_0.el , false,true,0 );
            var child_1 = new Xcls_HPaned4(_this);
            child_1.ref();
            this.el.pack_end (  child_1.el , true,true,0 );
        }

        // userdefined functions 

        // skip |homogeneous - already used 

        // skip id - not pipe 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |xns - no return type

        // skip items - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_topbar : Object 
    {
        public Gtk.HBox el;
        private Xcls_MainWindow  _this;


            // my vars

            // ctor 
        public Xcls_topbar(Xcls_MainWindow _owner)
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

        // skip |homogeneous - already used 

        // skip id - not pipe 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |height_request - already used 

        // skip |vexpand - already used 

        // skip |xns - no return type

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_HPaned4 : Object 
    {
        public Gtk.HPaned el;
        private Xcls_MainWindow  _this;


            // my vars

            // ctor 
        public Xcls_HPaned4(Xcls_MainWindow _owner)
        {
            _this = _owner;
            this.el = new Gtk.HPaned();

            // my vars

            // set gobject values
            this.el.position = 400;
            var child_0 = new Xcls_VBox5(_this);
            child_0.ref();
            this.el.add1 (  child_0.el  );
            var child_1 = new Xcls_VBox9(_this);
            child_1.ref();
            this.el.add2 (  child_1.el  );
        }

        // userdefined functions 

        // skip pack - not pipe 

        // skip position - already used 

        // skip xtype - not pipe 

        // skip |xns - no return type

        // skip items - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_VBox5 : Object 
    {
        public Gtk.VBox el;
        private Xcls_MainWindow  _this;


            // my vars

            // ctor 
        public Xcls_VBox5(Xcls_MainWindow _owner)
        {
            _this = _owner;
            this.el = new Gtk.VBox( true, 0 );

            // my vars

            // set gobject values
            var child_0 = new Xcls_VPaned6(_this);
            child_0.ref();
            this.el.pack_start (  child_0.el , false,true,0 );
        }

        // userdefined functions 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |xns - no return type

        // skip items - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_VPaned6 : Object 
    {
        public Gtk.VPaned el;
        private Xcls_MainWindow  _this;


            // my vars

            // ctor 
        public Xcls_VPaned6(Xcls_MainWindow _owner)
        {
            _this = _owner;
            this.el = new Gtk.VPaned();

            // my vars

            // set gobject values
            var child_0 = new Xcls_tree(_this);
            child_0.ref();
            this.el.add1 (  child_0.el  );
            var child_1 = new Xcls_props(_this);
            child_1.ref();
            this.el.add2 (  child_1.el  );
        }

        // userdefined functions 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |xns - no return type

        // skip items - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_tree : Object 
    {
        public Gtk.VBox el;
        private Xcls_MainWindow  _this;


            // my vars

            // ctor 
        public Xcls_tree(Xcls_MainWindow _owner)
        {
            _this = _owner;
            _this.tree = this;
            this.el = new Gtk.VBox( true, 0 );

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip id - not pipe 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |xns - no return type

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_props : Object 
    {
        public Gtk.VBox el;
        private Xcls_MainWindow  _this;


            // my vars

            // ctor 
        public Xcls_props(Xcls_MainWindow _owner)
        {
            _this = _owner;
            _this.props = this;
            this.el = new Gtk.VBox( true, 0 );

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip id - not pipe 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |xns - no return type

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_VBox9 : Object 
    {
        public Gtk.VBox el;
        private Xcls_MainWindow  _this;


            // my vars

            // ctor 
        public Xcls_VBox9(Xcls_MainWindow _owner)
        {
            _this = _owner;
            this.el = new Gtk.VBox( true, 0 );

            // my vars

            // set gobject values
            var child_0 = new Xcls_clutterembed(_this);
            child_0.ref();
            this.el.add (  child_0.el  );
        }

        // userdefined functions 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |xns - no return type

        // skip items - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_clutterembed : Object 
    {
        public GtkClutter.Embed el;
        private Xcls_MainWindow  _this;


            // my vars

            // ctor 
        public Xcls_clutterembed(Xcls_MainWindow _owner)
        {
            _this = _owner;
            _this.clutterembed = this;
            this.el = new GtkClutter.Embed();

            // my vars

            // set gobject values
            var child_0 = new Xcls_rooview(_this);
            child_0.ref();
            this.el.get_stage().add_child (  child_0.el  );

            // init method 
            var stage = this.el.get_stage();
            stage.set_background_color(  Clutter.Color.from_string("#000"));
        }

        // userdefined functions 

        // skip id - not pipe 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |init - already used 

        // skip |xns - no return type

        // skip items - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_rooview : Object 
    {
        public GtkClutter.Actor el;
        private Xcls_MainWindow  _this;


            // my vars

            // ctor 
        public Xcls_rooview(Xcls_MainWindow _owner)
        {
            _this = _owner;
            _this.rooview = this;
            this.el = new GtkClutter.Actor();

            // my vars

            // set gobject values

            // init method 
            {
                this.el.set_position(100,100);
                this.el.set_pivot_point(0.5f,0.5f);
                
            }
        }

        // userdefined functions 

        // skip id - not pipe 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |init - already used 

        // skip |xns - no return type

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
}
