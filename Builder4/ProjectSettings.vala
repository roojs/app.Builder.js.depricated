/* -- to compile
valac  --pkg gio-2.0  --pkg posix  --pkg gtk+-3.0 --pkg libnotify --pkg gtksourceview-3.0  --pkg  libwnck-3.0 \
    /tmp/ProjectSettings.vala  -o /tmp/ProjectSettings
*/


/* -- to test class
static int main (string[] args) {
    Gtk.init (ref args);
    new Xcls_ProjectSettings();
    ProjectSettings.show_all();
     Gtk.main ();
    return 0;
}
*/


public static Xcls_ProjectSettings  ProjectSettings;

public class Xcls_ProjectSettings : Object 
{
    public Gtk.VBox el;
    private Xcls_ProjectSettings  _this;

    public static Xcls_ProjectSettings singleton()
    {
        if (ProjectSettings == null) {
            ProjectSettings= new Xcls_ProjectSettings();
        }
        return ProjectSettings;
    }
    public Xcls_path path;
    public Xcls_base_template base_template;
    public Xcls_rootURL rootURL;
    public Xcls_view view;

        // my vars
    public Project.Project project;
    public signal void buttonPressed(string btn);

        // ctor 
    public Xcls_ProjectSettings()
    {
        _this = this;
        this.el = new Gtk.VBox( false, 0 );

        // my vars

        // set gobject values
        this.el.border_width = 5;
        var child_0 = new Xcls_HBox2( _this );
        child_0.ref();
        this.el.pack_start (  child_0.el , false,false,0 );
        var child_1 = new Xcls_path( _this );
        child_1.ref();
        this.el.pack_start (  child_1.el , false,false,0 );
        var child_2 = new Xcls_Label6( _this );
        child_2.ref();
        this.el.pack_start (  child_2.el , false,false,0 );
        var child_3 = new Xcls_HBox7( _this );
        child_3.ref();
        this.el.pack_start (  child_3.el , false,false,0 );
        var child_4 = new Xcls_HBox10( _this );
        child_4.ref();
        this.el.pack_start (  child_4.el , false,false,0 );
        var child_5 = new Xcls_ScrolledWindow13( _this );
        child_5.ref();
        this.el.pack_start (  child_5.el , true,true,0 );
    }

    // userdefined functions 
    public void save()
        {
           var buf =    _this.view.el.get_buffer();
           Gtk.TextIter s;
             Gtk.TextIter e;
            buf.get_start_iter(out s);
            buf.get_end_iter(out e);
              _this.project.runhtml = buf.get_text(s,e,true);
              
            _this.project.rootURL = _this.rootURL.el.get_text();
            _this.project.base_template = _this.base_template.el.get_text();    
            
            
        }
    public void show (Project.Project project) {
            _this.project = project;
            _this.path.el.label = project.firstPath();
            // get the active project.
             var lm = Gtk.SourceLanguageManager.get_default();
                        
            ((Gtk.SourceBuffer)(_this.view.el.get_buffer())) .set_language(
            
                lm.get_language("html"));
          
            //print (project.fn);
            //project.runhtml = project.runhtml || '';
            _this.view.el.get_buffer().set_text(project.runhtml);
            
            //this.el.show_all();
        }

    // skip |xns - no return type
    public class Xcls_HBox2 : Object 
    {
        public Gtk.HBox el;
        private Xcls_ProjectSettings  _this;


            // my vars

            // ctor 
        public Xcls_HBox2(Xcls_ProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.HBox( false, 0 );

            // my vars

            // set gobject values
            var child_0 = new Xcls_Button3( _this );
            child_0.ref();
            this.el.add (  child_0.el  );
            var child_1 = new Xcls_Button4( _this );
            child_1.ref();
            this.el.add (  child_1.el  );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_Button3 : Object 
    {
        public Gtk.Button el;
        private Xcls_ProjectSettings  _this;


            // my vars

            // ctor 
        public Xcls_Button3(Xcls_ProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.Button();

            // my vars

            // set gobject values
            this.el.label = "Apply";

            // listeners 
            this.el.button_press_event.connect( () => {
                _this.save();
                      
                _this.buttonPressed("apply");
                    return false;
            } );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_Button4 : Object 
    {
        public Gtk.Button el;
        private Xcls_ProjectSettings  _this;


            // my vars

            // ctor 
        public Xcls_Button4(Xcls_ProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.Button();

            // my vars

            // set gobject values
            this.el.label = "Save";

            // listeners 
            this.el.button_press_event.connect( () => {
                   _this.save();
                      
                _this.buttonPressed("save");
                    return false;
            } );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_path : Object 
    {
        public Gtk.Label el;
        private Xcls_ProjectSettings  _this;


            // my vars

            // ctor 
        public Xcls_path(Xcls_ProjectSettings _owner )
        {
            _this = _owner;
            _this.path = this;
            this.el = new Gtk.Label( "filename" );

            // my vars

            // set gobject values
            this.el.xalign = 0f;
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_Label6 : Object 
    {
        public Gtk.Label el;
        private Xcls_ProjectSettings  _this;


            // my vars

            // ctor 
        public Xcls_Label6(Xcls_ProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.Label( "HTML To insert at end of <HEAD>" );

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_HBox7 : Object 
    {
        public Gtk.HBox el;
        private Xcls_ProjectSettings  _this;


            // my vars

            // ctor 
        public Xcls_HBox7(Xcls_ProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.HBox( false, 0 );

            // my vars

            // set gobject values
            var child_0 = new Xcls_Label8( _this );
            child_0.ref();
            this.el.pack_start (  child_0.el , false,false,0 );
            var child_1 = new Xcls_base_template( _this );
            child_1.ref();
            this.el.add (  child_1.el  );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_Label8 : Object 
    {
        public Gtk.Label el;
        private Xcls_ProjectSettings  _this;


            // my vars

            // ctor 
        public Xcls_Label8(Xcls_ProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.Label( "HTML template file" );

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_base_template : Object 
    {
        public Gtk.Entry el;
        private Xcls_ProjectSettings  _this;


            // my vars

            // ctor 
        public Xcls_base_template(Xcls_ProjectSettings _owner )
        {
            _this = _owner;
            _this.base_template = this;
            this.el = new Gtk.Entry();

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_HBox10 : Object 
    {
        public Gtk.HBox el;
        private Xcls_ProjectSettings  _this;


            // my vars

            // ctor 
        public Xcls_HBox10(Xcls_ProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.HBox( false, 0 );

            // my vars

            // set gobject values
            var child_0 = new Xcls_Label11( _this );
            child_0.ref();
            this.el.pack_start (  child_0.el , false,false,0 );
            var child_1 = new Xcls_rootURL( _this );
            child_1.ref();
            this.el.add (  child_1.el  );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_Label11 : Object 
    {
        public Gtk.Label el;
        private Xcls_ProjectSettings  _this;


            // my vars

            // ctor 
        public Xcls_Label11(Xcls_ProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.Label( "root URL" );

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_rootURL : Object 
    {
        public Gtk.Entry el;
        private Xcls_ProjectSettings  _this;


            // my vars

            // ctor 
        public Xcls_rootURL(Xcls_ProjectSettings _owner )
        {
            _this = _owner;
            _this.rootURL = this;
            this.el = new Gtk.Entry();

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_ScrolledWindow13 : Object 
    {
        public Gtk.ScrolledWindow el;
        private Xcls_ProjectSettings  _this;


            // my vars

            // ctor 
        public Xcls_ScrolledWindow13(Xcls_ProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.ScrolledWindow( null, null );

            // my vars

            // set gobject values
            var child_0 = new Xcls_view( _this );
            child_0.ref();
            this.el.add (  child_0.el  );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_view : Object 
    {
        public Gtk.SourceView el;
        private Xcls_ProjectSettings  _this;


            // my vars

            // ctor 
        public Xcls_view(Xcls_ProjectSettings _owner )
        {
            _this = _owner;
            _this.view = this;
            this.el = new Gtk.SourceView();

            // my vars

            // set gobject values

            // init method 
             
                var description =   Pango.FontDescription.from_string("monospace");
                description.set_size(9000);
                this.el.override_font(description);

            // listeners 
            this.el.key_release_event.connect(  ( event) =>{
                if (event.keyval != 115) {
                    return false;
                     
                }
                if   ( (event.state & Gdk.ModifierType.CONTROL_MASK ) < 1 ) {
                    return false;
                }
                 var buf =    this.el.get_buffer();
                Gtk.TextIter s;
                Gtk.TextIter e;
                buf.get_start_iter(out s);
                buf.get_end_iter(out e);
                _this.project.runhtml = buf.get_text(s,e,true);
                
                      
                _this.buttonPressed("save");
                 
                return false;
                     
            } );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
}
