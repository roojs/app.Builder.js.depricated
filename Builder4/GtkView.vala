static Xcls_GtkView  _GtkView;

public class Xcls_GtkView : Object 
{
    public Gtk.Viewport el;
    private Xcls_GtkView  _this;

    public static Xcls_GtkView singleton()
    {
        if (_GtkView == null) {
            _GtkView= new Xcls_GtkView();
        }
        return _GtkView;
    }
    public Xcls_container container;

        // my vars (def)
    public Gtk.Widget lastObj;

    // ctor 
    public Xcls_GtkView()
    {
        _this = this;
        this.el = new Gtk.Viewport( null, null );

        // my vars (dec)
        this.lastObj = null;

        // set gobject values
        var child_0 = new Xcls_container( _this );
        child_0.ref();
        this.el.add (  child_0.el  );
    }

    // user defined functions 
    public void loadFile (JsRender.JsRender file) 
    {
        
     
    
            if (file.tree == null) {
                return;
            }
            if (this.lastObj != null) {
                this.container.el.remove(this.lastObj);
            }
     
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
    public return_type XXXX () {
        
        
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
