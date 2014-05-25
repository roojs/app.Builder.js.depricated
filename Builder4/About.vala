/* -- to compile
valac  --pkg gio-2.0  --pkg posix  --pkg gtk+-3.0 --pkg libnotify --pkg gtksourceview-3.0  --pkg  libwnck-3.0 \
    /tmp/About.vala  -o /tmp/About
*/


/* -- to test class
static int main (string[] args) {
    Gtk.init (ref args);
    new Xcls_AboutDialog1();
    About.show_all();
     Gtk.main ();
    return 0;
}
*/


public static Xcls_AboutDialog1  About;

private static Xcls_AboutDialog1  _this;

public class Xcls_AboutDialog1
{
    public Gtk.AboutDialog el;

        // my vars

        // ctor 
    public Xcls_AboutDialog1()
    {
        this.el = new Gtk.AboutDialog();
        _this = this;
        About = this;

        // my vars

        // set gobject values
        this.el.copyright = "LGPL";
        this.el.license = "LGPL";
        this.el.modal = true;
        this.el.program_name = "app.Builder.js";
        this.el.website = "http://www.akbkhome.com/blog.php";

        // listeners 
        this.el.response.connect( (rid) => {
            this.el.hide();
        } );
    }

    // userdefined functions 

    // skip listeners - not pipe 

    // skip authors - not pipe 

    // skip copyright - already used 

    // skip license - already used 

    // skip program_name - already used 

    // skip website - already used 

    // skip xtype - not pipe 

    // skip |modal - already used 

    // skip |xns - could not find seperator

    // skip xvala_cls - not pipe 

    // skip xvala_xcls - not pipe 

    // skip xvala_id - not pipe 
}
