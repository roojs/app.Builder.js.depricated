/* -- to compile
valac  --pkg gio-2.0  --pkg posix  --pkg gtk+-3.0 --pkg libnotify --pkg gtksourceview-3.0  --pkg  libwnck-3.0 \
    /tmp/test.vala  -o /tmp/false
*/


/* -- to test class
static int main (string[] args) {
    Gtk.init (ref args);
    new Xcls_AboutDialog1();
    false.show_all();
     Gtk.main ();
    return 0;
}
*/


public static Xcls_AboutDialog1  undefined;

private static Xcls_AboutDialog1  _this;

public class Xcls_AboutDialog1 : Gtk.AboutDialog
{

        // my vars

        // ctor 
    public Xcls_AboutDialog1()
    {
        _this = this;
        undefined = this;

        // my vars

        // set gobject values
        this.copyright = "LGPL";
        this.license = "LGPL";
        this.modal = true;
        this.program_name = "app.Builder.js";
        this.website = "http://www.akbkhome.com/blog.php";

        // listeners 
        this.response.connect( (rid) => {
            this.hide();
        } );
    }

    // userdefined functions 
}
