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
    public Xcls_label_preview label_preview;
    public Xcls_label_code label_code;
    public Xcls_view_layout view_layout;
    public Xcls_container container;
    public Xcls_compile_tree compile_tree;
    public Xcls_compile_result_store compile_result_store;
    public Xcls_renderer renderer;

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
            var child_0 = new Xcls_label_preview( _this );
            child_0.ref();
            var child_1 = new Xcls_label_code( _this );
            child_1.ref();
            var child_2 = new Xcls_ScrolledWindow5( _this );
            child_2.ref();
            this.el.append_page (  child_2.el , _this.label_preview.el );
            var child_3 = new Xcls_ScrolledWindow8( _this );
            child_3.ref();
            this.el.add (  child_3.el  );
        }

        // user defined functions
    }
    public class Xcls_label_preview : Object
    {
        public Gtk.Label el;
        private Xcls_GtkView  _this;


            // my vars (def)

        // ctor
        public Xcls_label_preview(Xcls_GtkView _owner )
        {
            _this = _owner;
            _this.label_preview = this;
            this.el = new Gtk.Label( "Preview" );

            // my vars (dec)

            // set gobject values
        }

        // user defined functions
    }

    public class Xcls_label_code : Object
    {
        public Gtk.Label el;
        private Xcls_GtkView  _this;


            // my vars (def)

        // ctor
        public Xcls_label_code(Xcls_GtkView _owner )
        {
            _this = _owner;
            _this.label_code = this;
            this.el = new Gtk.Label( "Code" );

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



    public class Xcls_ScrolledWindow8 : Object
    {
        public Gtk.ScrolledWindow el;
        private Xcls_GtkView  _this;


            // my vars (def)

        // ctor
        public Xcls_ScrolledWindow8(Xcls_GtkView _owner )
        {
            _this = _owner;
            this.el = new Gtk.ScrolledWindow( null, null );

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_compile_tree( _this );
            child_0.ref();
            this.el.add (  child_0.el  );

            // init method

            {
             this.el.set_policy (Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC);
             
            
            }
        }

        // user defined functions
    }
    public class Xcls_compile_tree : Object
    {
        public Gtk.TreeView el;
        private Xcls_GtkView  _this;


            // my vars (def)

        // ctor
        public Xcls_compile_tree(Xcls_GtkView _owner )
        {
            _this = _owner;
            _this.compile_tree = this;
            this.el = new Gtk.TreeView();

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_compile_result_store( _this );
            child_0.ref();
            this.el.set_model (  child_0.el  );
            var child_1 = new Xcls_column( _this );
            child_1.ref();
            this.el.append_column (  child_1.el  );

            // init method

            {
             var description = new Pango.FontDescription();
                description.set_size(8000);
                this.el.modify_font(description);
            
            }

            //listeners
            this.el.cursor_changed.connect( () => {
                var sel = this.el.get_selection();
            
                if (sel.count_selected_rows() < 1) {
            
                    print("selected rows < 1\n");
                    //??this.mo 
                    return  ;
                }
                    
                    //console.log('changed');
                 
                 Gtk.TreeIter iter;
                 Gtk.TreeModel mod;
                sel.get_selected(out mod, out iter);
                /*
                 store.set(citer, 
                        0, file + ":" + line, 
                        1, int.parse(line), 
                        2, GLib.Markup.escape_text(line + ": " + msg), 
                        3, file,-1);
                
                });
                */
                
                
                
                // var val = "";
                GLib.Value value;
                _this.compile_result_store.el.get_value(iter, 3, out value);
                var fname = (string)value;
                GLib.Value lvalue;
                _this.compile_result_store.el.get_value(iter, 1, out lvalue);
                var line = (int) lvalue;
                
                
                
             
                
                
                print ("loadfile %s : %d", fname,line);
                
                _this.sourceview.loadFile(fname, line);
                
                
                        
                        
            });
        }

        // user defined functions
    }
    public class Xcls_compile_result_store : Object
    {
        public Gtk.TreeStore el;
        private Xcls_GtkView  _this;


            // my vars (def)

        // ctor
        public Xcls_compile_result_store(Xcls_GtkView _owner )
        {
            _this = _owner;
            _this.compile_result_store = this;
            this.el = new Gtk.TreeStore( 4,   typeof(string), typeof(int), typeof(string), typeof(string)  );

            // my vars (dec)

            // set gobject values
        }

        // user defined functions
    }

    public class Xcls_column : Object
    {
        public Gtk.TreeViewColumn el;
        private Xcls_GtkView  _this;


            // my vars (def)

        // ctor
        public Xcls_column(Xcls_GtkView _owner )
        {
            _this = _owner;
            this.el = new Gtk.TreeViewColumn();

            // my vars (dec)

            // set gobject values
            this.el.title = "Compile output";
            var child_0 = new Xcls_renderer( _this );
            child_0.ref();
            this.el.pack_start (  child_0.el , true );

            // init method

            {
              this.el.add_attribute(_this.renderer.el , "markup", 2 );
             
            }
        }

        // user defined functions
    }
    public class Xcls_renderer : Object
    {
        public Gtk.CellRendererText el;
        private Xcls_GtkView  _this;


            // my vars (def)

        // ctor
        public Xcls_renderer(Xcls_GtkView _owner )
        {
            _this = _owner;
            _this.renderer = this;
            this.el = new Gtk.CellRendererText();

            // my vars (dec)

            // set gobject values
        }

        // user defined functions
    }





}
