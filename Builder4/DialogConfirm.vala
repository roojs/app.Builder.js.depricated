/* -- to compile
valac  --pkg gio-2.0  --pkg posix  --pkg gtk+-3.0 --pkg libnotify --pkg gtksourceview-3.0  --pkg  libwnck-3.0 \
    /tmp/test.vala  -o /tmp/false
*/


/* -- to test class
static int main (string[] args) {
    Gtk.init (ref args);
    new Xcls_MessageDialog1();
    false.show_all();
     Gtk.main ();
    return 0;
}
*/


public static Xcls_MessageDialog1  undefined;

private static Xcls_MessageDialog1  _this;

public class Xcls_MessageDialog1 : Gtk.MessageDialog
{

        // my vars

        // ctor 
    public Xcls_MessageDialog1()
    {
        _this = this;
        undefined = this;

        // my vars

        // set gobject values
        this.buttons = Gtk.ButtonsType.YES_NO;
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
              //this.success();
            }
        
        } );
    }

    // userdefined functions 
}
