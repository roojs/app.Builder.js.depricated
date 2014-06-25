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

        // my vars

        // ctor 
    public Xcls_ClutterFiles()
    {
        _this = this;
        ClutterFiles = this;
        this.el = new Clutter.ScrollActor();

        // my vars

        // set gobject values
        var child_0 = new Xcls_filelayout( _this );
        child_0.ref();
        this.el.add_child (  child_0.el  );
    }

    // userdefined functions 
    public void show(Project.Project pr) {
            // list all the files, and create new Xcls_fileitem for each one.
            
            var fiter = pr.files.map_iterator();
            while (fiter.next()) {
                var a = new Xcls_fileitem(this,fiter.get_value());
                this.filelayout.el.add_child(a.el);
            }
            this.el.show_all();
        }

    // skip |xns - no return type
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
            var child_0 = new Xcls_FlowLayout3( _this );
            child_0.ref();
            this.el.layout_manager = child_0.el;
        }

        // userdefined functions 

        // skip |xns - no return type
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
            this.el = new Clutter.FlowLayout( Clutter.FlowOrientation.HORIZONTAL );

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_fileitem : Object 
    {
        public Clutter.Actor el;
        private Xcls_ClutterFiles  _this;


            // my vars
        public Xcls_image image;
        public Xcls_title title;

            // ctor 
        public Xcls_fileitem(Xcls_ClutterFiles _owner , JsRender.JsRender file)
        {
            _this = _owner;
            this.el = new Clutter.Actor();

            // my vars

            // set gobject values
            var child_0 = new Xcls_BoxLayout5( _this );
            child_0.ref();
            this.el.layout_manager = child_0.el;
            var child_1 = new Xcls_image( _this ,file);
            child_1.ref();
            this.el.add_child (  child_1.el  );
            this.image =  child_1;
            var child_2 = new Xcls_title( _this ,file);
            child_2.ref();
            this.el.add_child (  child_2.el  );
            this.title =  child_2;

            // init method 
            this.el.set_size(100,100);
        }

        // userdefined functions 

        // skip |xns - no return type
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
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_image : Object 
    {
        public Clutter.Texture el;
        private Xcls_ClutterFiles  _this;


            // my vars

            // ctor 
        public Xcls_image(Xcls_ClutterFiles _owner , JsRender.JsRender file)
        {
            _this = _owner;
            this.el = new Clutter.Texture.from_file(file.getIconFile());

            // my vars

            // set gobject values
            this.el.x_align = Clutter.ActorAlign.START;
            this.el.x_expand = true;
            this.el.y_align = Clutter.ActorAlign.START;
            this.el.y_expand = false;
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_title : Object 
    {
        public Clutter.Text el;
        private Xcls_ClutterFiles  _this;


            // my vars

            // ctor 
        public Xcls_title(Xcls_ClutterFiles _owner , JsRender.JsRender file)
        {
            _this = _owner;
            this.el = new Clutter.Text();

            // my vars

            // set gobject values
            this.el.x_align = Clutter.ActorAlign.START;
            this.el.x_expand = true;
            this.el.y_align = Clutter.ActorAlign.START;
            this.el.y_expand = false;
        }

        // userdefined functions 

        // skip |xns - no return type
    }
}
