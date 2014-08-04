/* -- to compile
valac  --pkg gio-2.0  --pkg posix  --pkg gtk+-3.0 --pkg libnotify --pkg gtksourceview-3.0  --pkg  libwnck-3.0 \
    /tmp/GladeView.vala  -o /tmp/GladeView
*/


/* -- to test class
static int main (string[] args) {
    Gtk.init (ref args);
    new Xcls_GladeView();
    GladeView.show_all();
     Gtk.main ();
    return 0;
}
*/


public static Xcls_GladeView  GladeView;

public class Xcls_GladeView : Object 
{
    public Glade.DesignView el;
    private Xcls_GladeView  _this;

    public static Xcls_GladeView singleton()
    {
        if (GladeView == null) {
            GladeView= new Xcls_GladeView();
        }
        return GladeView;
    }

        // my vars

        // ctor 
    public Xcls_GladeView()
    {
        _this = this;
        this.el = new Glade.DesignView(new Glade.Project());

        // my vars

        // set gobject values

        // listeners 
    }

    // userdefined functions 

    // skip |xns - no return type
}
