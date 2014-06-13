/* -- to compile
valac  --pkg gio-2.0  --pkg posix  --pkg gtk+-3.0 --pkg libnotify --pkg gtksourceview-3.0  --pkg  libwnck-3.0 \
    /tmp/MainWindow.vala  -o /tmp/MainWindow
*/


/* -- to test class
static int main (string[] args) {
    Gtk.init (ref args);
    new Xcls_Window();
    MainWindow.show_all();
     Gtk.main ();
    return 0;
}
*/


public static Xcls_Window  MainWindow;

public class Xcls_Window
{
    public Gtk.Window el;
    private Xcls_Window  _this;

    public Xcls_w-vbox w-vbox;

        // my vars

        // ctor 
    public Xcls_Window()
    {
        this.el = new Gtk.Window();
        _this = this;
        MainWindow = this;

        // my vars

        // set gobject values
        this.el.border_width = 0;
        this.el.default_height = 500;
        this.el.default_width = 800;
        this.el.title = "Application Builder";
        this.el.type = Gtk.WindowType.TOPLEVEL;
        var child_0 = new Xcls_w-vbox(_this);
        this.el.add (  child_0.el  );

        // listeners 
        this.el.show.connect( function (self) {
          print("WINDOW SHOWING - trying to hide");
        imports.Builder.Provider.ProjectManager.ProjectManager.loadConfig();
         	this.get('/MidPropTree').hideWin();
            this.get('/RightPalete').hide();
            this.get('/BottomPane').el.hide();
            //this.get('/Editor').el.show_all();
        
        } );
        this.el.delete_event.connect( function (self, event) {
        
        } );
    }

    // userdefined functions 

    // skip destroy - not pipe 

    // skip listeners - not pipe 

    // skip border_width - already used 

    // skip default_height - already used 

    // skip default_width - already used 

    // skip id - not pipe 

    // skip title - already used 

    // skip xtype - not pipe 

    // skip |init - already used 

    // skip |setTitle - no return type

    // skip |type - already used 

    // skip |xns - no return type

    // skip items - not pipe 

    // skip xvala_cls - not pipe 

    // skip xvala_xcls - not pipe 

    // skip xvala_id - not pipe 
    public class Xcls_w-vbox
    {
        public Gtk.VBox el;
        private Xcls_Window  _this;


            // my vars

            // ctor 
        public Xcls_w-vbox(Xcls_Window _owner)
        {
            this.el = new Gtk.VBox( true, 0 );
            _this = _owner;
            _this.w-vbox = this;

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip |xns - no return type

        // skip xtype - not pipe 

        // skip id - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
}
