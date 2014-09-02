/* -- to compile
valac  --pkg gio-2.0  --pkg posix  --pkg gtk+-3.0 --pkg libnotify --pkg gtksourceview-3.0  --pkg  libwnck-3.0 \
    /tmp/DialogSaveModule.vala  -o /tmp/DialogSaveModule
*/


/* -- to test class
static int main (string[] args) {
    Gtk.init (ref args);
    new Xcls_DialogSaveModule();
    DialogSaveModule.show_all();
     Gtk.main ();
    return 0;
}
*/


public static Xcls_DialogSaveModule  DialogSaveModule;

public class Xcls_DialogSaveModule : Object 
{
    public Gtk.Dialog el;
    private Xcls_DialogSaveModule  _this;

    public static Xcls_DialogSaveModule singleton()
    {
        if (DialogSaveModule == null) {
            DialogSaveModule= new Xcls_DialogSaveModule();
        }
        return DialogSaveModule;
    }
    public Xcls_name name;

        // my vars
    public JsRender.Node data;
    public Project.Project project;

        // ctor 
    public Xcls_DialogSaveModule()
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
            this.el.response(Gtk.Response.CANCEL);
            return true;
            
        } );
    }

    // userdefined functions 
    public string show (Gtk.Window parent, Project.Project project, JsRender.Node data) {
         
             
            this.el.set_transient_for(parent);
            this.el.modal = true;
            
            this.data = data;
            this.project = project;
            this.name.el.set_text("");
            this.el.show_all();
            
            while (true) {
                var response_id = this.el.run();
                if (response_id < 1) {
                    this.el.hide();
                     return;
                }
                
                var name = _this.name.el.get_text();
                if (name.length < 1) {
                    StandardErrorDialog.singleton().show(
                        (Gtk.Window) _this.el,
                        "You must give the template a name. "
                    );
                    continue;
                }
                if (!Regex.match_simple ("^[A-Za-z.]+$", name) || 
                    !Regex.match_simple ("^[A-Za-z.]+$", name) )
                {
                    StandardErrorDialog.show(
                        (Gtk.Window) _this.el,
        
                        "Template Nane must contain only letters dots"
                    );
                    continue;
                }
                break;
            }
            var f = _this.project.newFile(name);
            f.tree =  _this.data.deepClone();
            f.save();
            
            // now we save it..
            this.el.hide();
            
            return name;
            
            
            
        }

    // skip |xns - no return type
    public class Xcls_HBox2 : Object 
    {
        public Gtk.HBox el;
        private Xcls_DialogSaveModule  _this;


            // my vars

            // ctor 
        public Xcls_HBox2(Xcls_DialogSaveModule _owner )
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
        private Xcls_DialogSaveModule  _this;


            // my vars

            // ctor 
        public Xcls_Label3(Xcls_DialogSaveModule _owner )
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
        private Xcls_DialogSaveModule  _this;


            // my vars

            // ctor 
        public Xcls_name(Xcls_DialogSaveModule _owner )
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
        private Xcls_DialogSaveModule  _this;


            // my vars

            // ctor 
        public Xcls_Button5(Xcls_DialogSaveModule _owner )
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
        private Xcls_DialogSaveModule  _this;


            // my vars

            // ctor 
        public Xcls_Button6(Xcls_DialogSaveModule _owner )
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
