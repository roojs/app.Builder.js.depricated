static GtkView  _GtkView;

public class GtkView : Object 
{
    public Gtk.Viewport el;
    private GtkView  _this;

    public static GtkView singleton()
    {
        if (_GtkView == null) {
            _GtkView= new GtkView();
        }
        return _GtkView;
    }

        // my vars (def)

    // ctor 
    public GtkView()
    {
        _this = this;
        this.el = new Gtk.Viewport( null, null );

        // my vars (dec)

        // set gobject values
        var child_0 = new Xcls_HBox2( _this );
        child_0.ref();
        this.el.add (  child_0.el  );
    }

    // user defined functions 
    public void addNode (Object parent, JsRender.Node node) {  
    
        var type = GLib.Type.from_name(node.fqn());
        if (type < 1) {
            return;
        }
        var  child = new Object(type);
        
    
    }
    public class Xcls_HBox2 : Object 
    {
        public Gtk.HBox el;
        private GtkView  _this;


            // my vars (def)

        // ctor 
        public Xcls_HBox2(GtkView _owner )
        {
            _this = _owner;
            this.el = new Gtk.HBox( true, 0 );

            // my vars (dec)

            // set gobject values
        }

        // user defined functions 
    }
}
