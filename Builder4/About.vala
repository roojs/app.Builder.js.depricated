static Xcls_About  _About;

public class Xcls_About : Object 
{
    public Gtk.AboutDialog el;
    private Xcls_About  _this;

    public static Xcls_About singleton()
    {
        if (_About == null) {
            _About= new Xcls_About();
        }
        return _About;
    }

        // my vars (def)

    // ctor 
    public Xcls_About()
    {
        _this = this;
        this.el = new Gtk.AboutDialog();

        // my vars (dec)

        // set gobject values
        this.el.program_name = "app.Builder.js";
        this.el.license = "LGPL";
        this.el.authors = { "Alan Knowles" };
        this.el.website = "http://www.akbkhome.com/blog.php";
        this.el.modal = true;
        this.el.copyright = "LGPL";

        // listeners 
        this.el.delete_event.connect( (self, event) => {
            this.el.hide();
            return true;
            //test
        });
        this.el.response.connect( (rid) => {
            this.el.hide();
        });
    }

    // user defined functions 
    public  void show_all () {
        this.el.show_all();
    }
}
