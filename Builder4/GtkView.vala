static GtkView  _GtkView;

public class GtkView : Object 
{
    public Gtk.Vpaned el;
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
        this.el = new Gtk.Vpaned();

        // my vars (dec)
    }

    // user defined functions 
}
