static Xcls_DialogConfirm  _DialogConfirm;

public class Xcls_DialogConfirm : Object 
{
    public Gtk.MessageDialog el;
    private Xcls_DialogConfirm  _this;

    public static Xcls_DialogConfirm singleton()
    {
        if (_DialogConfirm == null) {
            _DialogConfirm= new Xcls_DialogConfirm();
        }
        return _DialogConfirm;
    }

        // my vars (def)

    // ctor 
    public Xcls_DialogConfirm()
    {
        _this = this;
        this.el = new Gtk.MessageDialog( null, Gtk.DialogFlags.MODAL, Gtk.MessageType.QUESTION, Gtk.ButtonsType.YES_NO, "Tests", null );

        // my vars (dec)

        // set gobject values
        this.el.title = "Please Confirm d";
        this.el.name = "DialogConfirm";
        this.el.modal = true;
        this.el.use_markup = true;

        // listeners 
        this.el.delete_event.connect( (event) => {
            this.el.response(Gtk.ResponseType.CANCEL);
            this.el.hide();
            return true;
            //test
        });
    }

    // user defined functions 
    public int show (string title, string msg) {
         //if (!this.el) { this.init(); } 
         //this.success = success;
         this.el.title = title;
        this.el.text =  msg;
        this.el.show_all();
        var ret =   this.el.run();
        //print("ret got %d", ret);
        this.el.hide();
        return ret;
        
    
    }
}
