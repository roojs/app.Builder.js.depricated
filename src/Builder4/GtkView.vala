static Xcls_GtkView  _GtkView;

public class Xcls_GtkView : Object
{
    public Gtk.VBox el;
    private Xcls_GtkView  _this;

    public static Xcls_GtkView singleton()
    {
        if (_GtkView == null) {
            _GtkView= new Xcls_GtkView();
        }
        return _GtkView;
    }
    public Xcls_label_global label_global;
    public Xcls_label_global label_global;
    public Xcls_view_layout view_layout;
    public Xcls_container container;

        // my vars (def)
    public Gtk.Widget lastObj;
    public int width;
    public Xcls_MainWindow main_window;
    public JsRender.JsRender file;
    public int height;

    // ctor
    public Xcls_GtkView()
    {
        _this = this;
        this.el = new Gtk.VBox( true, 0 );

        // my vars (dec)
        this.lastObj = null;
        this.width = 0;
        this.file = null;
        this.height = 0;

        // set gobject values
        var child_0 = new Xcls_Notebook2( _this );
        child_0.ref();
        this.el.pack_start (  child_0.el , true,true,0 );
        var child_1 = new Xcls_ScrolledWindow5( _this );
        child_1.ref();
        this.el.pack_start (  child_1.el , true,true,0 );

        //listeners
        this.el.size_allocate.connect( (aloc) => {
        
            this.width = aloc.width;
            this.height =aloc.height;
            });
    }

    // user defined functions
    public void createThumb () {
        
        
        if (this.file == null) {
            return;
        }
        var filename = this.file.getIconFileName(false);
        
        var  win = this.el.get_parent_window();
        var width = win.get_width();
        var height = win.get_height();
    
        Gdk.Pixbuf screenshot = Gdk.pixbuf_get_from_window(win, 0, 0, width, height); // this.el.position?
    
        screenshot.save(filename,"png");
        return;
        
        
        
        
        
         
        
        // should we hold until it's printed...
        
          
    
        
        
    
    
        
         
    }
    public void loadFile (JsRender.JsRender file) 
    {
            this.file = null;
            
            if (file.tree == null) {
                return;
            }
            this.file = file;
            if (this.lastObj != null) {
                this.container.el.remove(this.lastObj);
            }
            
            // hide the compile view at present..
              
            
            var w = this.width;
            var h = this.height;
            
            print("ALLOC SET SIZES %d, %d\n", w,h); 
            
            // set the container size min to 500/500 or 20 px less than max..
            w = int.max (w-20, 500);
            h = int.max (h-20, 500); 
            
            print("SET SIZES %d, %d\n", w,h);       
            _this.container.el.set_size_request(w,h);
            
            _this.view_layout.el.set_size(w,h); // should be baded on calc.. -- see update_scrolled.
            var rgba = Gdk.RGBA ();
            rgba.parse ("#ccc");
            _this.view_layout.el.override_background_color(Gtk.StateFlags.NORMAL, rgba);
            
            
    	var x = new JsRender.NodeToGtk(file.tree);
            var obj = x.munge() as Gtk.Widget;
            this.lastObj = null;
    	if (obj == null) {
            	return;
    	}
    	this.lastObj = obj;
            
            this.container.el.add(obj);
            obj.show_all();
            
             
            
    }
    public class Xcls_Notebook2 : Object
    {
        public Gtk.Notebook el;
        private Xcls_GtkView  _this;


            // my vars (def)

        // ctor
        public Xcls_Notebook2(Xcls_GtkView _owner )
        {
            _this = _owner;
            this.el = new Gtk.Notebook();

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_label_global( _this );
            child_0.ref();
            var child_1 = new Xcls_label_global( _this );
            child_1.ref();
        }

        // user defined functions
    }
    public class Xcls_label_global : Object
    {
        public Gtk.Label el;
        private Xcls_GtkView  _this;


            // my vars (def)

        // ctor
        public Xcls_label_global(Xcls_GtkView _owner )
        {
            _this = _owner;
            _this.label_global = this;
            this.el = new Gtk.Label( "Global" );

            // my vars (dec)

            // set gobject values
        }

        // user defined functions
    }

    public class Xcls_label_global : Object
    {
        public Gtk.Label el;
        private Xcls_GtkView  _this;


            // my vars (def)

        // ctor
        public Xcls_label_global(Xcls_GtkView _owner )
        {
            _this = _owner;
            _this.label_global = this;
            this.el = new Gtk.Label( "Global" );

            // my vars (dec)

            // set gobject values
        }

        // user defined functions
    }


    public class Xcls_ScrolledWindow5 : Object
    {
        public Gtk.ScrolledWindow el;
        private Xcls_GtkView  _this;


            // my vars (def)

        // ctor
        public Xcls_ScrolledWindow5(Xcls_GtkView _owner )
        {
            _this = _owner;
            this.el = new Gtk.ScrolledWindow( null, null );

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_view_layout( _this );
            child_0.ref();
            this.el.add (  child_0.el  );
        }

        // user defined functions
    }
    public class Xcls_view_layout : Object
    {
        public Gtk.Layout el;
        private Xcls_GtkView  _this;


            // my vars (def)

        // ctor
        public Xcls_view_layout(Xcls_GtkView _owner )
        {
            _this = _owner;
            _this.view_layout = this;
            this.el = new Gtk.Layout( null, null );

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_container( _this );
            child_0.ref();
            this.el.put (  child_0.el , 10,10 );
        }

        // user defined functions
    }
    public class Xcls_container : Object
    {
        public Gtk.HBox el;
        private Xcls_GtkView  _this;


            // my vars (def)

        // ctor
        public Xcls_container(Xcls_GtkView _owner )
        {
            _this = _owner;
            _this.container = this;
            this.el = new Gtk.HBox( true, 0 );

            // my vars (dec)

            // set gobject values
        }

        // user defined functions
    }



}
