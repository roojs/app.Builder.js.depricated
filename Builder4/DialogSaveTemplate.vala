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

public class Xcls_DialogSaveTemplate
{
    public Gtk.Dialog el;
    private static Xcls_DialogSaveTemplate  _this;

    public Xcls_name name;

        // my vars
    public JsRender.Node data;
    public Palete.Palete palete;

        // ctor 
    public Xcls_DialogSaveTemplate()
    {
        this.el = new Gtk.Dialog();
        _this = this;
        DialogSaveTemplate = this;

        // my vars

        // set gobject values
        this.el.default_height = 200;
        this.el.default_width = 400;
        this.el.modal = true;
        var child_0 = new Xcls_HBox2();
        this.el.add (  child_0.el  );
        var child_1 = new Xcls_Button5();
        this.el.add_action_widget (  child_1.el , 0 );
        var child_2 = new Xcls_Button6();
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
                    "You must give the template a name. "
                );
                return;
            }
            if (!Regex.match_simple ("^[A-Za-z]+$", name) || 
                !Regex.match_simple ("^[A-Za-z ]+$", name) )
            {
                StandardErrorDialog.show(
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

    // skip listeners - not pipe 

    // skip .JsRender.Node:data - already used 

    // skip .Palete.Palete:palete - already used 

    // skip default_height - already used 

    // skip default_width - already used 

    // skip xtype - not pipe 

    // skip |modal - already used 
    public void show (Palete.Palete palete, JsRender.Node data) {
            _this.data = data;
            _this.palete = palete;
            _this.name.el.set_text("");
            this.el.show_all();
        }

    // skip |xns - no return type

    // skip items - not pipe 

    // skip id - not pipe 

    // skip xvala_cls - not pipe 

    // skip xvala_xcls - not pipe 

    // skip xvala_id - not pipe 
    public class Xcls_HBox2
    {
        public Gtk.HBox el;

            // my vars

            // ctor 
        public Xcls_HBox2()
        {
            this.el = new Gtk.HBox( true, 0 );

            // my vars

            // set gobject values
            var child_0 = new Xcls_Label3();
            this.el.add (  child_0.el  );
            var child_1 = new Xcls_name();
            this.el.add (  child_1.el  );
        }

        // userdefined functions 

        // skip xtype - not pipe 

        // skip |pack - already used 

        // skip |xns - no return type

        // skip items - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_Label3
    {
        public Gtk.Label el;

            // my vars

            // ctor 
        public Xcls_Label3()
        {
            this.el = new Gtk.Label( "Name" );

            // my vars

            // set gobject values

            // listeners 
        }

        // userdefined functions 

        // skip label - already used 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |xns - no return type

        // skip listeners - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_name
    {
        public Gtk.Entry el;

            // my vars

            // ctor 
        public Xcls_name()
        {
            this.el = new Gtk.Entry();
            _this.name = this;

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip id - not pipe 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |xns - no return type

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_Button5
    {
        public Gtk.Button el;

            // my vars

            // ctor 
        public Xcls_Button5()
        {
            this.el = new Gtk.Button();

            // my vars

            // set gobject values
            this.el.label = "Cancel";
        }

        // userdefined functions 

        // skip label - already used 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |xns - no return type

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_Button6
    {
        public Gtk.Button el;

            // my vars

            // ctor 
        public Xcls_Button6()
        {
            this.el = new Gtk.Button();

            // my vars

            // set gobject values
            this.el.label = "OK";
        }

        // userdefined functions 

        // skip label - already used 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |xns - no return type

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
}
