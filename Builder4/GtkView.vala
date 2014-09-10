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
    }

    // user defined functions 
}
