static GtkView  _GtkView;

public class GtkView : Object 
{
    public Gtk.VPaned el;
    private GtkView  _this;

    public static GtkView singleton()
    {
        if (_GtkView == null) {
            _GtkView= new GtkView();
        }
        return _GtkView;
    }
    public Xcls_GtkView GtkView;
    public Xcls_container container;

        // my vars (def)
    public Gtk.Widget lastObj;
    public JsRender.JsRender file;

    // ctor 
    public GtkView()
    {
        _this = this;
        this.el = new Gtk.VPaned();

        // my vars (dec)
        this.lastObj = null;
        this.file = null;

        // set gobject values
        var child_0 = new Xcls_GtkView( _this );
        child_0.ref();
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
    s
    public class Xcls_GtkView : Object 
    {
        public Gtk.Viewport el;
        private GtkView  _this;


            // my vars (def)
        public Gtk.Widget lastObj;
        public JsRender.JsRender file;

        // ctor 
        public Xcls_GtkView(GtkView _owner )
        {
            _this = _owner;
            _this.GtkView = this;
            this.el = new Gtk.Viewport( null, null );

            // my vars (dec)
            this.lastObj = null;
            this.file = null;

            // set gobject values
            var child_0 = new Xcls_container( _this );
            child_0.ref();
            this.el.add (  child_0.el  );
        }

        // user defined functions 
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
    }
    public class Xcls_container : Object 
    {
        public Gtk.HBox el;
        private GtkView  _this;


            // my vars (def)

        // ctor 
        public Xcls_container(GtkView _owner )
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
