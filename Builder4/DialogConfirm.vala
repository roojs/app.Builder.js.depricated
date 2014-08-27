/* -- to compile
valac  --pkg gio-2.0  --pkg posix  --pkg gtk+-3.0 --pkg libnotify --pkg gtksourceview-3.0  --pkg  libwnck-3.0 \
    /tmp/DialogConfirm.vala  -o /tmp/DialogConfirm
*/


/* -- to test class
static int main (string[] args) {
    Gtk.init (ref args);
    new Xcls_DialogConfirm();
    DialogConfirm.show_all();
     Gtk.main ();
    return 0;
}
*/


public static Xcls_DialogConfirm  DialogConfirm;

public class Xcls_DialogConfirm : Object 
{
    public Gtk.MessageDialog el;
    private Xcls_DialogConfirm  _this;

    public static Xcls_DialogConfirm singleton()
    {
        if (DialogConfirm == null) {
            DialogConfirm= new Xcls_DialogConfirm();
        }
        return DialogConfirm;
    }

        // my vars

        // ctor 
    public Xcls_DialogConfirm()
    {
        _this = this;
        this.el = new Gtk.MessageDialog( null, Gtk.DialogFlags.MODAL, Gtk.MessageType.QUESTION, Gtk.ButtonsType.YES_NO, "Tests" );

        // my vars

        // set gobject values
        this.el.modal = true;
        this.el.name = "DialogConfirm";
        this.el.title = "Please Confirm d";
        this.el.use_markup = true;

        // listeners 
        this.el.delete_event.connect(  (event) => {
            this.el.response(Gtk.ResponseType.CANCEL);
            this.el.hide();
            return true;
        }
         
        
        
         );
    }

    // userdefined functions 
    public int show  (string title, string msg) {
             //if (!this.el) { this.init(); } 
             //this.success = success;
             this.el.title = title;
            this.el.text =  msg;
            this.el.show_all();
            return  this.el.run();
            
        
        }
         

    // skip |xns - no return type
}
