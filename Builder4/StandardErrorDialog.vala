/* -- to compile
valac  --pkg gio-2.0  --pkg posix  --pkg gtk+-3.0 --pkg libnotify --pkg gtksourceview-3.0  --pkg  libwnck-3.0 \
    /tmp/StandardErrorDialog.vala  -o /tmp/StandardErrorDialog
*/


/* -- to test class
static int main (string[] args) {
    Gtk.init (ref args);
    new Xcls_StandardErrorDialog();
    StandardErrorDialog.show_all();
     Gtk.main ();
    return 0;
}
*/


public static Xcls_StandardErrorDialog  StandardErrorDialog;

public class Xcls_StandardErrorDialog
{
    public Gtk.MessageDialog el;
    private static Xcls_StandardErrorDialog  _this;


        // my vars

        // ctor 
    public Xcls_StandardErrorDialog()
    {
        this.el = new Gtk.MessageDialog( null, Gtk.DialogFlags.MODAL, Gtk.MessageType.ERROR, Gtk.ButtonsType.OK, "fixme" );
        _this = this;
        StandardErrorDialog = this;

        // my vars

        // set gobject values
        this.el.modal = true;
        this.el.use_markup = true;

        // listeners 
        this.el.delete_event.connect(   (self, event)  => {
            this.el.hide();
            return true;
        } 
         );
        this.el.response.connect(   (self, response_id) => {
           this.el.hide();
        } );
    }

    // userdefined functions 

    // skip listeners - not pipe 

    // skip text - already used 

    // skip xtype - not pipe 

    // skip |buttons - already used 

    // skip |message_type - already used 

    // skip |modal - already used 

    // skip |use_markup - already used 
    public void show (string msg) {
        
            this.el.text =  msg;
            this.el.show_all();
        }
    public void show_all () {
            this.show("TEST");
        }

    // skip |xns - no return type

    // skip id - not pipe 

    // skip xvala_cls - not pipe 

    // skip xvala_xcls - not pipe 

    // skip xvala_id - not pipe 
}
