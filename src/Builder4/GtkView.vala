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
        var child_0 = new Xcls_ScrolledWindow2( _this );
        child_0.ref();
        this.el.pack1 (  child_0.el , true,true );

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
            file.compile_notice.connect(this.compileNotice);
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
        print("err %s / %s:%d / %s\n", type,file,line,message);
        var cs = _this.compile_result_store;    
        if (type =="START") {
            // reset the tree;
            cs.el.clear();   
    //        cs.el.set_sort_column_id(0, Gtk.SortType.ASCENDING);   
            return;
        }
        if (type =="END") {
            // reset the tree;
    
            _this.compile_tree.el.expand_all(); 
            cs.el.set_sort_column_id(0, Gtk.SortType.ASCENDING);   
            return;
        }
        
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
         var ftv = cs.nodeFindOrCreate(tv, "%d:%s".printf(top, file), GLib.Path.get_basename( file) );
         
          cs.nodeAppendOrCreate(ftv, "%d:%s:%d".printf(top, file,line), file,line, message);         
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
}
