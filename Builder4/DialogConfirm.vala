/* -- to compile
valac  --pkg gio-2.0  --pkg posix  --pkg gtk+-3.0 --pkg libnotify --pkg gtksourceview-3.0  --pkg  libwnck-3.0 \
    /tmp/test.vala  -o /tmp/DialogConfirm
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

public class Xcls_MessageDialog1 : Gtk.MessageDialog
{

        // my vars

        // ctor 
    public Xcls_MessageDialog1()
    {
        _this = this;
        DialogConfirm = this;

        // my vars

        // set gobject values
        Object(buttons : Gtk.ButtonsType.YES_NO);
        this.message_type = Gtk.MessageType.QUESTION;
        this.modal = true;
        this.text = "-";
        this.title = "Please Confirm";
        this.use_markup = true;

        // listeners 
        this.response.connect(  ( response_id) =>  {
           this.hide();
            //print("RESPOSE: " + response_id);
            if (response_id == -8) { //yes!
                   print("CALL SUCCES?");
              // this.success();
            }
        
        } );
        this.delete_event.connect( (event) => {
            this.hide();
            return true;
        } );
    }

    // userdefined functions 
}
