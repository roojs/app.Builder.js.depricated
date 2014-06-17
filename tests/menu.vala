/* -- to compile
valac  --pkg gio-2.0  --pkg posix  --pkg gtk+-3.0  \
    menu.vala  -o /tmp/menutest
*/


/* -- to test class
static int main (string[] args) {
    Gtk.init (ref args);
    new Xcls_WindowLeftTree();
    WindowLeftTree.show_all();
     Gtk.main ();
    return 0;
}
*/
	
int main (string[] args) {
    Gtk.init (ref args);
    
	GLib.Log.set_always_fatal(LogLevelFlags.LEVEL_ERROR | LogLevelFlags.LEVEL_CRITICAL); 
	
	var a  = new Xcls_WindowLeftTree();
	a.el.show_all();
	
	Gtk.main();

    
	
	return 0;
}

public static Xcls_WindowLeftTree  WindowLeftTree;

public class Xcls_WindowLeftTree : Object 
{
    public Gtk.Window el;
    private Xcls_WindowLeftTree  _this;
	public Xcls_button button;
    public Xcls_LeftTreeMenu LeftTreeMenu;

        // ctor 
    public void init()
    {
		base();
		this.el = new Gtk.Window(  );
        _this = this;
        WindowLeftTree = this;

        // my vars

        // set gobject values
        
        var child_0 = new Xcls_button(_this);
        this.el.add (  child_0.el  );
        _this.LeftTreeMenu = new Xcls_LeftTreeMenu(_this);

        // init method 
         
         
    }
 

    // skip xvala_id - not pipe 
    public class Xcls_button : Object 
    {
        public Gtk.Button el;
        private Xcls_WindowLeftTree  _this;
 
            // ctor 
        public void init(Xcls_WindowLeftTree _owner)
        {
			base();
			this.el = new Gtk.Button.with_label ("Click me (0)");
            _this = _owner;
            _this.button = this;

             

            // listeners 
            this.el.button_press_event.connect(   ( ev) => {
                //console.log("button press?");
            
                
 
                  if (ev.type != Gdk.EventType.BUTTON_PRESS  || ev.button != 3) {
                    //print("click" + ev.type);
                    return false;
                }
 
                    
                 //_this.LeftTreeMenu.el.set_screen(Gdk.Screen.get_default());
                 
                 _this.LeftTreeMenu.el.popup(null, null, null,  ev.button, ev.time);
			
				//   print("click:" + res.path.to_string());
                  return true;
            } );
            
        }

         
    }



	
    public class Xcls_LeftTreeMenu : Object 
    {
        public Gtk.Menu el;
        private Xcls_WindowLeftTree  _this;


            // my vars

            // ctor 
        public void init(Xcls_WindowLeftTree _owner)
        {
			base();
			print("Xcls_LeftTreeMenu:Ctor called\n");
            _this = _owner;
		 
			
			this.el = new Gtk.Menu();
            _this.LeftTreeMenu = this;

            // my vars

            // set gobject values
            var child_0 = new Xcls_MenuItem7(_this);
			child_0.initListeners();
			this.el.append (  child_0.el  );
			
            var child_1 = new Xcls_MenuItem8(_this);
            this.el.append (  child_1.el  );
			this.el.show_all();
        }

        
    }
    public class Xcls_MenuItem7 : Object 
    {
        public Gtk.MenuItem el;
        private Xcls_WindowLeftTree  _this;


            // my vars

            // ctor 
        
		public void init(Xcls_WindowLeftTree  _owner) {
			base();
            _this = _owner;
		 
			this.el = new Gtk.MenuItem.with_label("Delete Element");
            // my vars

            // set gobject values
            //this.el.label = "Delete Element";
			
            // listeners 

			print("add activate\n");
            this.el.activate.connect(   ( ) => {
                
                print("SELECT?");
                
				return  ;
            } );
        }
 
    }
    public class Xcls_MenuItem8 : Object 
    {
        public Gtk.MenuItem el;
        private Xcls_WindowLeftTree  _this;


            // my vars

            // ctor 
        public Xcls_MenuItem8(Xcls_WindowLeftTree _owner)
        {
			base();
			this.el = new Gtk.MenuItem();
            _this = _owner;

            // my vars

            // set gobject values
            this.el.label = "Save as Template";

            // listeners 
            this.el.activate.connect(   () => {
            
                print("connect");  
                
            } );
        }

         
    }
}
