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

        // my vars (def)

    // ctor 
    public GtkView()
    {
        _this = this;
        this.el = new Gtk.VPaned();

        // my vars (dec)

        // set gobject values
        var child_0 = new Xcls_Viewport2( _this );
        child_0.ref();
    }

    // user defined functions 
    public class Xcls_Viewport2 : Object 
    {
        public Gtk.Viewport el;
        private GtkView  _this;


            // my vars (def)

        // ctor 
        public Xcls_Viewport2(GtkView _owner )
        {
            _this = _owner;
            this.el = new Gtk.Viewport( null, null );

            // my vars (dec)

            // set gobject values
        }

        // user defined functions 
    }
}
