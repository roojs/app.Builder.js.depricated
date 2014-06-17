/* -- to compile
valac  --pkg gio-2.0  --pkg posix  --pkg gtk+-3.0 --pkg libnotify --pkg gtksourceview-3.0  --pkg  libwnck-3.0 \
    /tmp/WindowLeftTree.vala  -o /tmp/WindowLeftTree
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


public static Xcls_WindowLeftTree  WindowLeftTree;

public class Xcls_WindowLeftTree : Object 
{
    public Gtk.Window el;
    private Xcls_WindowLeftTree  _this;

    public Xcls_LeftTreeMenu LeftTreeMenu;

        // ctor 
    public Xcls_WindowLeftTree()
    {
        this.el = new Gtk.Window(  );
        _this = this;
        WindowLeftTree = this;

        // my vars

        // set gobject values
        this.el.shadow_type = Gtk.ShadowType.IN;
        var child_0 = new Xcls_button(_this);
        this.el.add (  child_0.el  );
        _this.LeftTreeMenu = new Xcls_LeftTreeMenu(_this);

        // init method 
         this.el.set_policy (Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC);
         
    }
 

    // skip xvala_id - not pipe 
    public class Xcls_button : Object 
    {
        public Gtk.Button el;
        private Xcls_WindowLeftTree  _this;
 
            // ctor 
        public Xcls_button(Xcls_WindowLeftTree _owner)
        {
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
 
                    
                 _this.LeftTreeMenu.el.set_screen(Gdk.Screen.get_default());
                 _this.LeftTreeMenu.el.show_all();
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
        public Xcls_LeftTreeMenu(Xcls_WindowLeftTree _owner)
        {
            print("Xcls_LeftTreeMenu:Ctor called\n");
            _this = _owner;
		 
			
			this.el = new Gtk.Menu();
            _this.LeftTreeMenu = this;

            // my vars

            // set gobject values
            var child_0 = new Xcls_MenuItem7(_this);
            this.el.add (  child_0.el  );
            var child_1 = new Xcls_MenuItem8(_this);
            this.el.add (  child_1.el  );
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
    public class Xcls_MenuItem7 : Object 
    {
        public Gtk.MenuItem el;
        private Xcls_WindowLeftTree  _this;


            // my vars

            // ctor 
        public Xcls_MenuItem7(Xcls_WindowLeftTree _owner)
        {
            
            _this = _owner;
		 
			this.el = new Gtk.MenuItem.with_label("Delete Element");
            // my vars

            // set gobject values
            //this.el.label = "Delete Element";
			print("add activate\n");
            // listeners 
			
			
            this.el.select.connect(   ( ) => {
                
                print("SELECT?");
                
				return  ;
            } );
        }

        // userdefined functions 

        // skip listeners - not pipe 

        // skip label - already used 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |xns - no return type

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_MenuItem8 : Object 
    {
        public Gtk.MenuItem el;
        private Xcls_WindowLeftTree  _this;


            // my vars

            // ctor 
        public Xcls_MenuItem8(Xcls_WindowLeftTree _owner)
        {
            this.el = new Gtk.MenuItem();
            _this = _owner;

            // my vars

            // set gobject values
            this.el.label = "Save as Template";

            // listeners 
            this.el.activate.connect(   () => {
            
                 DialogSaveTemplate.show(_this.model.file.palete(), _this.getActiveElement());
                 
                
            } );
        }

        // userdefined functions 

        // skip listeners - not pipe 

        // skip label - already used 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |xns - no return type

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
}
