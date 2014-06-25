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

    public Xcls_filelayout filelayout;
    public Xcls_image +image;
    public Xcls_title +title;

        // my vars

        // ctor 
    public Xcls_ClutterFiles()
    {
        _this = this;
        ClutterFiles = this;
        this.el = new Clutter.ScrollActor();

        // my vars

        // set gobject values
        var child_0 = new Xcls_filelayout(_this);
        child_0.ref();
        this.el.add_child (  child_0.el  );
    }

    // userdefined functions 

    // skip scroll_mode - not pipe 

    // skip id - not pipe 

    // skip xtype - not pipe 

    // skip |xns - no return type

    // skip items - not pipe 

    // skip xvala_cls - not pipe 

    // skip xvala_xcls - not pipe 

    // skip xvala_id - not pipe 
    public class Xcls_filelayout : Object 
    {
        public Clutter.Actor el;
        private Xcls_ClutterFiles  _this;


            // my vars

            // ctor 
        public Xcls_filelayout(Xcls_ClutterFiles _owner )
        {
            _this = _owner;
            _this.filelayout = this;
            this.el = new Clutter.Actor();

            // my vars

            // set gobject values
            var child_0 = new Xcls_FlowLayout3(_this);
            child_0.ref();
            this.el.layout_manager = child_0.el;
        }

        // userdefined functions 

        // skip id - not pipe 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |xns - no return type

        // skip items - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_FlowLayout3 : Object 
    {
        public Clutter.FlowLayout el;
        private Xcls_ClutterFiles  _this;


            // my vars

            // ctor 
        public Xcls_FlowLayout3(Xcls_ClutterFiles _owner )
        {
            _this = _owner;
            this.el = new Clutter.FlowLayout();

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip *prop - not pipe 

        // skip xtype - not pipe 

        // skip |xns - no return type

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_fileitem : Object 
    {
        public Clutter.Actor el;
        private Xcls_ClutterFiles  _this;


            // my vars

            // ctor 
        public Xcls_fileitem(Xcls_ClutterFiles _owner , string fname, string title)
        {
            _this = _owner;
            this.el = new Clutter.Actor();

            // my vars

            // set gobject values
            var child_0 = new Xcls_BoxLayout5(_this);
            child_0.ref();
            this.el.layout_manager = child_0.el;
            var child_1 = new Xcls_image(_this);
            child_1.ref();
            this.el.add_child (  child_1.el  );
            var child_2 = new Xcls_title(_this);
            child_2.ref();
            this.el.add_child (  child_2.el  );
        }

        // userdefined functions 

        // skip *args - not pipe 

        // skip id - not pipe 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |xns - no return type

        // skip items - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_BoxLayout5 : Object 
    {
        public Clutter.BoxLayout el;
        private Xcls_ClutterFiles  _this;


            // my vars

            // ctor 
        public Xcls_BoxLayout5(Xcls_ClutterFiles _owner )
        {
            _this = _owner;
            this.el = new Clutter.BoxLayout();

            // my vars

            // set gobject values
            this.el.orientation = Clutter.Orientation.VERTICAL;
            this.el.spacing = 4;

            // init method 
            this.el.set_size(100,100);
              
        }

        // userdefined functions 

        // skip *prop - not pipe 

        // skip spacing - already used 

        // skip xtype - not pipe 

        // skip |init - already used 

        // skip |orientation - already used 

        // skip |xns - no return type

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_image : Object 
    {
        public Clutter.Texture el;
        private Xcls_ClutterFiles  _this;


            // my vars

            // ctor 
        public Xcls_image(Xcls_ClutterFiles _owner , string fname)
        {
            _this = _owner;
            this.el = new Clutter.Texture();

            // my vars

            // set gobject values
            this.el.x_align = "Clutter.ActorAlign.START";
            this.el.x_expand = "true";
            this.el.y_align = "Clutter.ActorAlign.START";
            this.el.y_expand = "false";
        }

        // userdefined functions 

        // skip *args - not pipe 

        // skip ctor - not pipe 

        // skip id - not pipe 

        // skip x_align - already used 

        // skip x_expand - already used 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip y_align - already used 

        // skip y_expand - already used 

        // skip |xns - no return type

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_title : Object 
    {
        public Clutter.Text el;
        private Xcls_ClutterFiles  _this;


            // my vars

            // ctor 
        public Xcls_title(Xcls_ClutterFiles _owner , string name)
        {
            _this = _owner;
            this.el = new Clutter.Text();

            // my vars

            // set gobject values
            this.el.x_align = "Clutter.ActorAlign.START";
            this.el.x_expand = "true";
            this.el.y_align = "Clutter.ActorAlign.START";
            this.el.y_expand = "false";
        }

        // userdefined functions 

        // skip pack - not pipe 

        // skip *args - not pipe 

        // skip *ctor - not pipe 

        // skip id - not pipe 

        // skip x_align - already used 

        // skip x_expand - already used 

        // skip xtype - not pipe 

        // skip y_align - already used 

        // skip y_expand - already used 

        // skip |xns - no return type

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
}
