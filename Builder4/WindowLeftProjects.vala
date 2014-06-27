/* -- to compile
valac  --pkg gio-2.0  --pkg posix  --pkg gtk+-3.0 --pkg libnotify --pkg gtksourceview-3.0  --pkg  libwnck-3.0 \
    /tmp/WindowLeftProjects.vala  -o /tmp/WindowLeftProjects
*/


/* -- to test class
static int main (string[] args) {
    Gtk.init (ref args);
    new Xcls_WindowLeftProjects();
    WindowLeftProjects.show_all();
     Gtk.main ();
    return 0;
}
*/


public static Xcls_WindowLeftProjects  WindowLeftProjects;

public class Xcls_WindowLeftProjects : Object 
{
    public Gtk.ScrolledWindow el;
    private Xcls_WindowLeftProjects  _this;

    public Xcls_model model;
    public Xcls_namecol namecol;

        // my vars

        // ctor 
    public Xcls_WindowLeftProjects()
    {
        _this = this;
        WindowLeftProjects = this;
        this.el = new Gtk.ScrolledWindow( null, null );

        // my vars

        // set gobject values
        this.el.shadow_type = Gtk.ShadowType.IN;
        var child_0 = new Xcls_TreeView2( _this );
        child_0.ref();
        this.el.add (  child_0.el  );

        // init method 
          this.el.set_policy (Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC)
    }

    // userdefined functions 

    // skip |xns - no return type
    public class Xcls_TreeView2 : Object 
    {
        public Gtk.TreeView el;
        private Xcls_WindowLeftProjects  _this;


            // my vars

            // ctor 
        public Xcls_TreeView2(Xcls_WindowLeftProjects _owner )
        {
            _this = _owner;
            this.el = new Gtk.TreeView();

            // my vars

            // set gobject values
            this.el.enable_tree_lines = true;
            this.el.headers_visible = false;
            this.el.tooltip_column = 2;
            var child_0 = new Xcls_model( _this );
            child_0.ref();
            this.el.set_model (  child_0.el  );
            var child_1 = new Xcls_TreeViewColumn4( _this );
            child_1.ref();
            this.el.append_column (  child_1.el  );

            // init method 
            function() {
            	XObject.prototype.init.call(this); 
                                
                   var description = new Pango.FontDescription.c_new();
                 description.set_size(8000);
                this.el.modify_font(description);     
                                
                //this.selection = this.el.get_selection();
                // this.selection.set_mode( Gtk.SelectionMode.SINGLE);
             
            
                
              
                
            }

            // listeners 
            this.el.cursor_changed.connect( function (self) {
                   var iter = new Gtk.TreeIter();
                                    
                                    //console.log('changed');
                    var m = this.get('model');
            	if (!this.selection){
            		this.selection = this.el.get_selection();
            	}
            
                    var s = this.selection;
                    if (!s.get_selected(m.el, iter)) {
            		return; 
            	}
                    var tp = m.el.get_path(iter).to_string();
                    
                    
                    // var val = "";
                    
                    var key = m.getValue(tp, 0);
                    
                    var type = m.getValue(tp, 1);
                    var skel = m.getValue(tp, 3);
                    var etype = m.getValue(tp, 5);
                    
                    
                    this.get('/MidPropTree').hideWin();
            
                    if (type.toLowerCase() == 'function') {
                        
                        if (etype != 'events') {
                            key = '|' + key;
                        }
                        
                        this.get('/LeftPanel.model').add({
                            key :  key, 
                            type : type,
                            val  : skel,
                            etype : etype
                        })  
                        return;
                    }
                    // has dot in name, and is boolean???? this does not make sense..
                    //if (type.indexOf('.') > -1 ||  type.toLowerCase() == 'boolean') {
                    //     key = '|' + key;
                   // }
                    
                    this.get('/LeftPanel.model').add( {
                        key : key, 
                        type : type,
                        //skel  : skel,
                        etype : etype
                       }) //, 
            } );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_model : Object 
    {
        public Gtk.ListStore el;
        private Xcls_WindowLeftProjects  _this;


            // my vars

            // ctor 
        public Xcls_model(Xcls_WindowLeftProjects _owner )
        {
            _this = _owner;
            _this.model = this;
            this.el = new Gtk.ListStore( 2, "typeof(string), typeof(Object)" );

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_TreeViewColumn4 : Object 
    {
        public Gtk.TreeViewColumn el;
        private Xcls_WindowLeftProjects  _this;


            // my vars

            // ctor 
        public Xcls_TreeViewColumn4(Xcls_WindowLeftProjects _owner )
        {
            _this = _owner;
            this.el = new Gtk.TreeViewColumn();

            // my vars

            // set gobject values
            var child_0 = new Xcls_namecol( _this );
            child_0.ref();
            this.el.pack_start (  child_0.el , true );

            // init method 
                this.el.add_attribute(_this.namecol.el , "markup", 4  );
             
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_namecol : Object 
    {
        public Gtk.CellRendererText el;
        private Xcls_WindowLeftProjects  _this;


            // my vars

            // ctor 
        public Xcls_namecol(Xcls_WindowLeftProjects _owner )
        {
            _this = _owner;
            _this.namecol = this;
            this.el = new Gtk.CellRendererText();

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip |xns - no return type
    }
}
