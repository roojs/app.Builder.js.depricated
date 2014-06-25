/* -- to compile
valac  --pkg gio-2.0  --pkg posix  --pkg gtk+-3.0 --pkg libnotify --pkg gtksourceview-3.0  --pkg  libwnck-3.0 \
    /tmp/ClutterFiles.vala  -o /tmp/ClutterFiles
*/


/* -- to test class
static int main (string[] args) {
    Gtk.init (ref args);
    new Xcls_ClutterFiles();
    ClutterFiles.show_all();
     Gtk.main ();
    return 0;
}
*/


public static Xcls_ClutterFiles  ClutterFiles;

public class Xcls_ClutterFiles : Object 
{
    public Clutter.ScrollActor el;
    private Xcls_ClutterFiles  _this;


        // my vars

        // ctor 
    public Xcls_ClutterFiles()
    {
        _this = this;
        ClutterFiles = this;
        this.el = new Clutter.ScrollActor();

        // my vars

        // set gobject values
        var child_0 = new Xcls_FlowLayout2(_this);
        child_0.ref();
    }

    // userdefined functions 

    // skip id - not pipe 

    // skip xtype - not pipe 

    // skip |xns - no return type

    // skip items - not pipe 

    // skip xvala_cls - not pipe 

    // skip xvala_xcls - not pipe 

    // skip xvala_id - not pipe 
    public class Xcls_FlowLayout2 : Object 
    {
        public Clutter.FlowLayout el;
        private Xcls_ClutterFiles  _this;


            // my vars

            // ctor 
        public Xcls_FlowLayout2(Xcls_ClutterFiles _owner)
        {
            _this = _owner;
            this.el = new Clutter.FlowLayout();

            // my vars

            // set gobject values
            var child_0 = new Xcls_Actor3(_this);
            child_0.ref();
        }

        // userdefined functions 

        // skip |xns - no return type

        // skip xtype - not pipe 

        // skip pack - not pipe 

        // skip items - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_Actor3 : Object 
    {
        public Clutter.Actor el;
        private Xcls_ClutterFiles  _this;


            // my vars

            // ctor 
        public Xcls_Actor3(Xcls_ClutterFiles _owner)
        {
            _this = _owner;
            this.el = new Clutter.Actor();

            // my vars

            // set gobject values
            var child_0 = new Xcls_BoxLayout4(_this);
            child_0.ref();
            this.el.add (  child_0.el  );
            var child_1 = new Xcls_Image5(_this);
            child_1.ref();
        }

        // userdefined functions 

        // skip |xns - no return type

        // skip xtype - not pipe 

        // skip pack - not pipe 

        // skip items - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_BoxLayout4 : Object 
    {
        public Clutter.BoxLayout el;
        private Xcls_ClutterFiles  _this;


            // my vars

            // ctor 
        public Xcls_BoxLayout4(Xcls_ClutterFiles _owner)
        {
            _this = _owner;
            this.el = new Clutter.BoxLayout();

            // my vars

            // set gobject values
            this.el.orientation = Clutter.Orientation,VERTICAL;
            this.el.spacing = 4;

            // init method 
            this.el.set_size(100,100);
             
        }

        // userdefined functions 

        // skip *prop - not pipe 

        // skip spacing - already used 

        // skip xpack - not pipe 

        // skip xtype - not pipe 

        // skip |init - already used 

        // skip |orientation - already used 

        // skip |xns - no return type

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_Image5 : Object 
    {
        public Clutter.Image el;
        private Xcls_ClutterFiles  _this;


            // my vars

            // ctor 
        public Xcls_Image5(Xcls_ClutterFiles _owner)
        {
            _this = _owner;
            this.el = new Clutter.Image();

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip y_align - not pipe 

        // skip |xns - no return type

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
}
