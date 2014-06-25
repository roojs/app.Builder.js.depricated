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
    public Xcls_filelayout_manager filelayout_manager;

        // my vars

        // ctor 
    public Xcls_ClutterFiles()
    {
        _this = this;
        ClutterFiles = this;
        this.el = new Clutter.ScrollActor();

        // my vars

        // set gobject values
        this.el.reactive = true;
        var child_0 = new Xcls_filelayout( _this );
        child_0.ref();
        this.el.add_child (  child_0.el  );

        // listeners 
        this.el.scroll_event.connect( ( event)  => {
        
            //Sprint("scroll event");
            var y = this.filelayout.el.y;
            var dir = event.direction;
            switch (dir) {
                case Clutter.ScrollDirection.UP:
                    y += event.y /2;
                    break;
                case Clutter.ScrollDirection.DOWN:
                    y -= event.y /2 ;
                    break;
                default:
                    return false;
            }
            // range of scroll -- can go up -- eg.. -ve value.
            
            y = float.min(0, y);
            
            // to work out the max -ve number
            // height of filelayout
            // height of scrollactor..
            
            var last_child_bottom = this.filelayout.el.last_child.y +  this.filelayout.el.last_child.height;
             if ( (-1 * (y+100)) > (  last_child_bottom - this.el.height)) {
                return  false;
            }
        
        
            
            
        //    print("\nlast child - this height = %f  ==== new y %f\n ".printf( 
          //          last_child_bottom - this.el.height,
           //         y));    
           // y = float.min(0, y);    //??
           // print("scroll event of %f  - new y = %f ".printf(event.y, y));
            this.filelayout.el.y = y;
            return true;
                
        } );
    }

    // userdefined functions 
    public void set_size(float w, float h) {
            _this.filelayout_manager.el.max_column_width = w - 150;
           this.el.set_size(this.el.get_stage().width-150,
                                this.el.get_stage().height);
                    this.el.set_position(100,50);
        }
    public void show(Project.Project pr) {
            // list all the files, and create new Xcls_fileitem for each one.
            
            var fiter = pr.files.map_iterator();
            while (fiter.next()) {
                var a = new Xcls_fileitem(this,fiter.get_value());
                a.ref();
                print("add " + fiter.get_value().name + "\n");
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
            this.el.reactive = true;
            var child_0 = new Xcls_filelayout_manager( _this );
            child_0.ref();
            this.el.layout_manager = child_0.el;

            // init method 
            this.el.add_constraint(
                new Clutter.BindConstraint(_this.el,Clutter.BindCoordinate.SIZE, 0.0f)
            );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_filelayout_manager : Object 
    {
        public Clutter.FlowLayout el;
        private Xcls_ClutterFiles  _this;


            // my vars

            // ctor 
        public Xcls_filelayout_manager(Xcls_ClutterFiles _owner )
        {
            _this = _owner;
            _this.filelayout_manager = this;
            this.el = new Clutter.FlowLayout( Clutter.FlowOrientation.HORIZONTAL );

            // my vars

            // set gobject values
            this.el.column_spacing = 20;
            this.el.homogeneous = true;
            this.el.row_spacing = 20;
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
            this.el = new Clutter.Text.full("Sans 10px", file.nickName(),new Clutter.Color.from_string("#fff"));

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
