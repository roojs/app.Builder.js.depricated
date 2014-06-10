/* -- to compile
valac  --pkg gio-2.0  --pkg posix  --pkg gtk+-3.0 --pkg libnotify --pkg gtksourceview-3.0  --pkg  libwnck-3.0 \
    /tmp/DialogConfirm.vala  -o /tmp/DialogConfirm
*/


/* -- to test class
static int main (string[] args) {
    Gtk.init (ref args);
    new Xcls_MessageDialog1();
    DialogConfirm.show_all();
     Gtk.main ();
    return 0;
}
*/


public static Xcls_MessageDialog1  DialogConfirm;

public class Xcls_MessageDialog1
{
    public Gtk.MessageDialog el;
    private static Xcls_MessageDialog1  _this;


        // my vars

        // ctor 
    public Xcls_MessageDialog1()
    {
        this.el = new Gtk.MessageDialog( null, Gtk.DialogFlags.MODAL, Gtk.MessageType.QUESTION, Gtk.ButtonsType.YES_NO, "Tests" );
        _this = this;
        DialogConfirm = this;

        // my vars

        // set gobject values
        this.el.modal = true;
        this.el.title = "Please Confirm d";
        this.el.use_markup = true;

        // listeners 
        this.el.delete_event.connect(  (event) => {
            this.el.hide();
            return true;
        }
          );
    }

    // userdefined functions 
    public void show_allvoid () {
            this.show("test");
        }
         

    // skip listeners - not pipe 

    // skip text - already used 

    // skip title - already used 

    // skip xtype - not pipe 

    // skip |buttons - already used 

    // skip |message_type - already used 

    // skip |modal - already used 
    public void show  (string msg) {
             //if (!this.el) { this.init(); } 
             //this.success = success;
            this.el.text =  msg;
            this.el.show_all();
        
        }
         

    // skip |use_markup - already used 

    // skip |xns - no return type

    // skip xvala_cls - not pipe 

    // skip xvala_xcls - not pipe 

    // skip xvala_id - not pipe 
}
