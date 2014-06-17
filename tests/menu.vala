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


	var w = new Gtk.Window(  );

	var b = new Gtk.Button.with_label ("Click me (0)");

	var leftmenu = new Gtk.Menu();
	
    this.el.button_press_event.connect(   ( ev) => {
        
        if (ev.type != Gdk.EventType.BUTTON_PRESS  || ev.button != 3) {
            return false;
        }

            
        //leftmenu.el.set_screen(Gdk.Screen.get_default());
         
        leftmenu.popup(null, null, null,  ev.button, ev.time);
	
          return true;
    } );
	
        // my vars

        // set gobject values
        
        var child_0 = new Xcls_button(); child_0.init(__this);
        this.el.add (  child_0.el  );
       __this.LeftTreeMenu = new Xcls_LeftTreeMenu();
	__this.LeftTreeMenu.init(__this);

        // init method 
         
         
    }
 

    // skip xvala_id - not pipe 
    public class Xcls_button : Object 
    {
        public Gtk.Button el;
        private Xcls_WindowLeftTree __this;
 
            // ctor 
        public void init(Xcls_WindowLeftTree _owner)
        {
			
			this.el = new Gtk.Button.with_label ("Click me (0)");
           __this = _owner;
           __this.button = this;

             

            // listeners 
            this.el.button_press_event.connect(   ( ev) => {
                //console.log("button press?");
            
                
 
                  if (ev.type != Gdk.EventType.BUTTON_PRESS  || ev.button != 3) {
                    //print("click" + ev.type);
                    return false;
                }
 
                    
                __this.LeftTreeMenu.el.set_screen(Gdk.Screen.get_default());
                 
                __this.LeftTreeMenu.el.popup(null, null, null,  ev.button, ev.time);
			
				//   print("click:" + res.path.to_string());
                  return true;
            } );
            
        }

         
    }



	
    public class Xcls_LeftTreeMenu : Object 
    {
        public Gtk.Menu el;
        private Xcls_WindowLeftTree __this;


            // my vars

            // ctor 
        public void init(Xcls_WindowLeftTree _owner)
        {
			
			print("Xcls_LeftTreeMenu:Ctor called\n");
           __this = _owner;
		 
			
			this.el = new Gtk.Menu();
           __this.LeftTreeMenu = this;

            // my vars

            // set gobject values
            var child_0 = new Xcls_MenuItem7();
			child_0.init(__this);
			this.el.append (  child_0.el  );
			
            var child_1 = new Xcls_MenuItem8();
			child_1.init(__this);
            this.el.append (  child_1.el  );
			this.el.show_all();
        }

        
    }
    public class Xcls_MenuItem7  
    {
        public Gtk.MenuItem el;
        private Xcls_WindowLeftTree __this;


            // my vars

            // ctor 
        
		public void init(Xcls_WindowLeftTree  _owner) {
	 
           __this = _owner;
		 
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
        private Xcls_WindowLeftTree __this;


            // my vars

            // ctor 
        public void init(Xcls_WindowLeftTree _owner)
        {
			
			this.el = new Gtk.MenuItem();
           __this = _owner;

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
