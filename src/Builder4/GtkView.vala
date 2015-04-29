static Xcls_GtkView  _GtkView;

public class Xcls_GtkView : Object 
{
    public Gtk.VPaned el;
    private Xcls_GtkView  _this;

    public static Xcls_GtkView singleton()
    {
        if (_GtkView == null) {
            _GtkView= new Xcls_GtkView();
        }
        return _GtkView;
    }
    public Xcls_view_layout view_layout;
    public Xcls_container container;
    public Xcls_compile_view compile_view;
    public Xcls_compile_result_store compile_result_store;

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
        this.el = new Gtk.VPaned();

        // my vars (dec)
        this.lastObj = null;
        this.width = 0;
        this.file = null;
        this.height = 0;

        // set gobject values
        var child_0 = new Xcls_ScrolledWindow2( _this );
        child_0.ref();
        this.el.pack1 (  child_0.el , true,true );
        var child_1 = new Xcls_compile_view( _this );
        child_1.ref();
        this.el.pack2 (  child_1.el , true,true );

        // listeners 
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
        
           // this.el.set_position((int)(this.el.max_position * 0.7));
            this.el.set_position(this.el.max_position );
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
    public void compileNotice ( string  type,   string file,   int line,   string  message) {
        // if type = "START"... then we reset the tree?
        // the issue is that the compiler is continually going..
        // so editing a file etc.. may change things.?
        // probably not an issue.
        if (type =="START") {
            // reset the tree;
            return;
        }
        var cs = _this.compile_result_store;
        
        var top = 0;
        var title = "";
        switch(type) {
            case "ERR":
                title = "Errors";
                top =0;
                break;
            
            case "WARN":
                title = "Warnings";
                top =1;
                break;
                
            case "DEPR":
                title = "Depricated";
                top=2;
                break;
            
            default:
                title = type;
                top =3;
                break;
        }
                
        
         var tv = cs.nodeFindOrCreate(null, top.to_string(), title);
         tv = cs.nodeFindOrCreate(tv, "%d:%s".printf(top, file), file);
          cs.nodeAppendOrCreate(tv, "%d:%s:%d".printf(top, file,line), file,line, message);
        
    }
    public class Xcls_ScrolledWindow2 : Object 
    {
        public Gtk.ScrolledWindow el;
        private Xcls_GtkView  _this;


            // my vars (def)

        // ctor 
        public Xcls_ScrolledWindow2(Xcls_GtkView _owner )
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
    public class Xcls_compile_view : Object 
    {
        public Gtk.VBox el;
        private Xcls_GtkView  _this;


            // my vars (def)

        // ctor 
        public Xcls_compile_view(Xcls_GtkView _owner )
        {
            _this = _owner;
            _this.compile_view = this;
            this.el = new Gtk.VBox( false, 0 );

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_HBox6( _this );
            child_0.ref();
            this.el.pack_start (  child_0.el , false,false,0 );
            var child_1 = new Xcls_HBox8( _this );
            child_1.ref();
            this.el.pack_start (  child_1.el , true,true,0 );
        }

        // user defined functions 
    }
    public class Xcls_HBox6 : Object 
    {
        public Gtk.HBox el;
        private Xcls_GtkView  _this;


            // my vars (def)

        // ctor 
        public Xcls_HBox6(Xcls_GtkView _owner )
        {
            _this = _owner;
            this.el = new Gtk.HBox( true, 0 );

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_Button7( _this );
            child_0.ref();
            this.el.pack_start (  child_0.el , true,true,0 );
        }

        // user defined functions 
    }
    public class Xcls_Button7 : Object 
    {
        public Gtk.Button el;
        private Xcls_GtkView  _this;


            // my vars (def)

        // ctor 
        public Xcls_Button7(Xcls_GtkView _owner )
        {
            _this = _owner;
            this.el = new Gtk.Button();

            // my vars (dec)

            // set gobject values
            this.el.label = "Full Compile";
        }

        // user defined functions 
    }
    public class Xcls_HBox8 : Object 
    {
        public Gtk.HBox el;
        private Xcls_GtkView  _this;


            // my vars (def)

        // ctor 
        public Xcls_HBox8(Xcls_GtkView _owner )
        {
            _this = _owner;
            this.el = new Gtk.HBox( true, 0 );

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_TreeView9( _this );
            child_0.ref();
            this.el.add (  child_0.el  );
            var child_1 = new Xcls_ScrolledWindow13( _this );
            child_1.ref();
            this.el.pack_start (  child_1.el , true,true,0 );
        }

        // user defined functions 
    }
    public class Xcls_TreeView9 : Object 
    {
        public Gtk.TreeView el;
        private Xcls_GtkView  _this;


            // my vars (def)

        // ctor 
        public Xcls_TreeView9(Xcls_GtkView _owner )
        {
            _this = _owner;
            this.el = new Gtk.TreeView();

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_compile_result_store( _this );
            child_0.ref();
            this.el.set_model (  child_0.el  );
            var child_1 = new Xcls_column( _this );
            child_1.ref();
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
        public void nodeAppendOrCreate (Gtk.TreePath  par, string id, string file, int line, string message) {
        
            Gtk.TreeIter piter;
             
            this.el.get_iter(out piter, par);
             
            // loop through parent childnre
            Gtk.TreeIter iter; 
            var loop =  par == null ? 
                this.el.iter_children(out iter, null) :
                 this.el.iter_children(out iter,  piter);
            
            while (loop) {
                GLib.Value val;
                this.el.get_value(iter, 0, out val);
                var sval = (string)val;
                if (sval == id) {
                    GLib.Value mval;
                    this.el.get_value(iter, 2, out mval);
                    var smval = (string)mval;
                    mval.set_string(smval + "\n" + message); //markup?
                
                    return;
                }
                loop = this.el.iter_next(ref iter);    
            }
            
            // create the node...
            if (par == null) {
                this.el.append(out iter, null);
            } else {
                this.el.append(out iter, piter);
            }
            this.el.set(iter, id, line, message, file,-1);
                
            return ;
        
        }
        public Gtk.TreePath nodeFindOrCreate (Gtk.TreePath? par, string id, string title) {
        
            // loop through parent childnre
            Gtk.TreeIter piter   ;
            Gtk.TreeIter iter;
            var loop = true;
            if (par != null) {
                this.el.get_iter(out piter, par);
                loop = this.el.iter_children(out iter,  piter);
            } else {
                loop = this.el.iter_children(out iter, null) ;
            }
                 
                 
            while (loop) {
                GLib.Value val;
                this.el.get_value(iter, 0, out val);
                var sval = (string)val;
                if (sval == id) {
                    return this.el.get_path(iter);
                }
                loop = this.el.iter_next(ref iter);    
            }
            // create the node...
             if (par == null) {
                this.el.append(out iter, null);
            } else {
              this.el.get_iter(out piter, par);
                this.el.append(out iter, piter);
            }
            
            this.el.set(iter, id, 0, title, "",-1);
               
            return   this.el.get_path(iter);
        
        }
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
            var child_0 = new Xcls_CellRendererText12( _this );
            child_0.ref();
            this.el.pack_start (  child_0.el , false );
        }

        // user defined functions 
    }
    public class Xcls_CellRendererText12 : Object 
    {
        public Gtk.CellRendererText el;
        private Xcls_GtkView  _this;


            // my vars (def)

        // ctor 
        public Xcls_CellRendererText12(Xcls_GtkView _owner )
        {
            _this = _owner;
            this.el = new Gtk.CellRendererText();

            // my vars (dec)

            // set gobject values
        }

        // user defined functions 
    }
    public class Xcls_ScrolledWindow13 : Object 
    {
        public Gtk.ScrolledWindow el;
        private Xcls_GtkView  _this;


            // my vars (def)

        // ctor 
        public Xcls_ScrolledWindow13(Xcls_GtkView _owner )
        {
            _this = _owner;
            this.el = new Gtk.ScrolledWindow( null, null );

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_View14( _this );
            child_0.ref();
            this.el.add (  child_0.el  );
        }

        // user defined functions 
    }
    public class Xcls_View14 : Object 
    {
        public Gtk.SourceView el;
        private Xcls_GtkView  _this;


            // my vars (def)

        // ctor 
        public Xcls_View14(Xcls_GtkView _owner )
        {
            _this = _owner;
            this.el = new Gtk.SourceView();

            // my vars (dec)

            // set gobject values
            this.el.editable = false;
            this.el.show_line_marks = true;
            this.el.show_line_numbers = true;
        }

        // user defined functions 
    }
}
