/* -- to compile
valac  --pkg gio-2.0  --pkg posix  --pkg gtk+-3.0 --pkg libnotify --pkg gtksourceview-3.0  --pkg  libwnck-3.0 \
    /tmp/DialogSaveTemplate.vala  -o /tmp/DialogSaveTemplate
*/


/* -- to test class
static int main (string[] args) {
    Gtk.init (ref args);
    new Xcls_DialogSaveTemplate();
    DialogSaveTemplate.show_all();
     Gtk.main ();
    return 0;
}
*/


public static Xcls_DialogSaveTemplate  DialogSaveTemplate;

public class Xcls_DialogSaveTemplate : Object 
{
    public Gtk.Dialog el;
    private Xcls_DialogSaveTemplate  _this;

    public static Xcls_DialogSaveTemplate singleton()
    {
        if (DialogSaveTemplate == null) {
            DialogSaveTemplate= new Xcls_DialogSaveTemplate();
        }
        return DialogSaveTemplate;
    }
    public Xcls_name name;

        // my vars
    public JsRender.Node data;
    public Palete.Palete palete;

        // ctor 
    public Xcls_DialogSaveTemplate()
    {
        _this = this;
        this.el = new Gtk.Dialog();

        // my vars

        // set gobject values
        this.el.default_height = 200;
        this.el.default_width = 400;
        this.el.modal = true;
        var child_0 = new Xcls_HBox2( _this );
        child_0.ref();
        this.el. get_content_area().add

 (  child_0.el  );
        var child_1 = new Xcls_Button5( _this );
        child_1.ref();
        this.el.add_action_widget (  child_1.el , 0 );
        var child_2 = new Xcls_Button6( _this );
        child_2.ref();
        this.el.add_action_widget (  child_2.el , 1 );

        // listeners 
        this.el.delete_event.connect(  (self, event) => {
            this.el.hide();
            return true;
            
        } );
        this.el.response.connect( (self, response_id) => {
        
            if (response_id < 1) {
                this.el.hide();
                 return;
            }
            var name = _this.name.el.get_text();
            if (name.length < 1) {
                StandardErrorDialog.show(
                    this.el,
                    "You must give the template a name. "
                );
                return;
            }
            if (!Regex.match_simple ("^[A-Za-z]+$", name) || 
                !Regex.match_simple ("^[A-Za-z ]+$", name) )
            {
                StandardErrorDialog.show(
                    this.el,
                    "Template Nane must contain only letters and spaces. "
                );
                 return;
            }
            _this.palete.saveTemplate(name, _this.data);
            // now we save it..
            this.el.hide();
            
        } );
    }

    // userdefined functions 
    public static void show (Gtk.Window parent, Palete.Palete palete, JsRender.Node data) {
         
            
         
             var t =DialogSaveTemplate;
            if (t == null) {
               t =   new Xcls_DialogSaveTemplate();
            }
            t.el.set_transient_for(parent);
            t.data = data;
            t.palete = palete;
            t.name.el.set_text("");
            t.el.show_all();
        }

    // skip |xns - no return type
    public class Xcls_HBox2 : Object 
    {
        public Gtk.HBox el;
        private Xcls_DialogSaveTemplate  _this;


            // my vars

            // ctor 
        public Xcls_HBox2(Xcls_DialogSaveTemplate _owner )
        {
            _this = _owner;
            this.el = new Gtk.HBox( true, 0 );

            // my vars

            // set gobject values
            var child_0 = new Xcls_Label3( _this );
            child_0.ref();
            this.el.add (  child_0.el  );
            var child_1 = new Xcls_name( _this );
            child_1.ref();
            this.el.add (  child_1.el  );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_Label3 : Object 
    {
        public Gtk.Label el;
        private Xcls_DialogSaveTemplate  _this;


            // my vars

            // ctor 
        public Xcls_Label3(Xcls_DialogSaveTemplate _owner )
        {
            _this = _owner;
            this.el = new Gtk.Label( "Name" );

            // my vars

            // set gobject values

            // listeners 
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_name : Object 
    {
        public Gtk.Entry el;
        private Xcls_DialogSaveTemplate  _this;


            // my vars

            // ctor 
        public Xcls_name(Xcls_DialogSaveTemplate _owner )
        {
            _this = _owner;
            _this.name = this;
            this.el = new Gtk.Entry();

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_Button5 : Object 
    {
        public Gtk.Button el;
        private Xcls_DialogSaveTemplate  _this;


            // my vars

            // ctor 
        public Xcls_Button5(Xcls_DialogSaveTemplate _owner )
        {
            _this = _owner;
            this.el = new Gtk.Button();

            // my vars

            // set gobject values
            this.el.label = "Cancel";
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_Button6 : Object 
    {
        public Gtk.Button el;
        private Xcls_DialogSaveTemplate  _this;


            // my vars

            // ctor 
        public Xcls_Button6(Xcls_DialogSaveTemplate _owner )
        {
            _this = _owner;
            this.el = new Gtk.Button();

            // my vars

            // set gobject values
            this.el.label = "OK";
        }

        // userdefined functions 

        // skip |xns - no return type
    }
}
