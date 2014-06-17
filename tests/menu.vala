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
	a.init();
	a.el.show_all();
	
	Gtk.main();

    
	
	return 0;
}

public static Xcls_WindowLeftTree  WindowLeftTree;

public class Xcls_WindowLeftTree : Object 
{
    public Gtk.Window el;
    public Xcls_WindowLeftTree  _xthis;
	public Xcls_button button;
    public Xcls_LeftTreeMenu LeftTreeMenu;

        // ctor 
    public void init()
    {
		 
		this.el = new Gtk.Window(  );
        _xthis = this;
        WindowLeftTree = this;

        // my vars

        // set gobject values
        
        var child_0 = new Xcls_button(); child_0.init( );
        this.el.add (  child_0.el  );
        _xthis.LeftTreeMenu = new Xcls_LeftTreeMenu();
		_xthis.LeftTreeMenu.init( );

        // init method 
         
         
    }
 

    // skip xvala_id - not pipe 
    public class Xcls_button : Object 
    {
        public Gtk.Button el;
       
 
            // ctor 
        public void init( )
        {
			
			this.el = new Gtk.Button.with_label ("Click me (0)");
            
            _xthis.button = this;

             

            // listeners 
            this.el.button_press_event.connect(   ( ev) => {
                //console.log("button press?");
            
                
 
                  if (ev.type != Gdk.EventType.BUTTON_PRESS  || ev.button != 3) {
                    //print("click" + ev.type);
                    return false;
                }
 
                    
                 //_xthis.LeftTreeMenu.el.set_screen(Gdk.Screen.get_default());
                 
                 _xthis.LeftTreeMenu.el.popup(null, null, null,  ev.button, ev.time);
			
				//   print("click:" + res.path.to_string());
                  return true;
            } );
            
        }

         
    }



	
    public class Xcls_LeftTreeMenu : Object 
    {
        public Gtk.Menu el;
    


            // my vars

            // ctor 
        public void init(Xcls_WindowLeftTree _owner)
        {
			
			print("Xcls_LeftTreeMenu:Ctor called\n");
           
		 
			
			this.el = new Gtk.Menu();
            _xthis.LeftTreeMenu = this;

            // my vars

            // set gobject values
            var child_0 = new Xcls_MenuItem7();
			child_0.init(   );
			this.el.append (  child_0.el  );
			
            var child_1 = new Xcls_MenuItem8();
			child_1.init( );
            this.el.append (  child_1.el  );
			this.el.show_all();
        }

        
    }
    public class Xcls_MenuItem7 : Object 
    {
        public Gtk.MenuItem el;
         


            // my vars

            // ctor 
        
		public void init(Xcls_WindowLeftTree  _owner) {
	 
           
		 
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
        


            // my vars

            // ctor 
        public void init(Xcls_WindowLeftTree _owner)
        {
			
			this.el = new Gtk.MenuItem();
          

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
