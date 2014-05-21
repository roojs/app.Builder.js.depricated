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

private static Xcls_MessageDialog1  _this;

public class Xcls_MessageDialog1
{
    public Gtk.MessageDialog el;

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
        this.el.response.connect(  ( response_id) =>  {
           this.el.hide();
            //print("RESPOSE: " + response_id);
            if (response_id == -8) { //yes!
                   print("CALL SUCCES?");
              // this.success();
            }
        
        } );
        this.el.delete_event.connect( (event) => {
            this.el.hide();
            return true;
        } );
    }

    // userdefined functions 

    // skip listeners - not pipe 

    // skip text - already used 

    // skip title - already used 

    // skip xtype - not pipe 
    public void show_all() {
            this.show("test","test");
        }

    // skip |buttons - already used 

    // skip |message_type - already used 

    // skip |modal - already used 
    public void show(string msg) {
             //if (!this.el) { this.init(); } 
             //this.success = success;
            this.el.text =  msg;
            this.el.show_all();
        
        }

    // skip |use_markup - already used 

    // skip |xns - could not find seperator

    // skip xvala_cls - not pipe 

    // skip xvala_xcls - not pipe 

    // skip xvala_id - not pipe 
}
