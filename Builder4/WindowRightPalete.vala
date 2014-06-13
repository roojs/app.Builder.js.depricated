/* -- to compile
valac  --pkg gio-2.0  --pkg posix  --pkg gtk+-3.0 --pkg libnotify --pkg gtksourceview-3.0  --pkg  libwnck-3.0 \
    /tmp/WindowRightPalete.vala  -o /tmp/WindowRightPalete
*/


/* -- to test class
static int main (string[] args) {
    Gtk.init (ref args);
    new Xcls_RightPalete();
    WindowRightPalete.show_all();
     Gtk.main ();
    return 0;
}
*/


public static Xcls_RightPalete  WindowRightPalete;

public class Xcls_RightPalete
{
    public Gtk.VBox el;
    private Xcls_RightPalete  _this;

    public Xcls_buttonbar buttonbar;
    public Xcls_viewbox viewbox;
    public Xcls_model model;
    public Xcls_txtrender txtrender;

        // my vars
    public Palete.Palete provider;
    public signal void drag_end();

        // ctor 
    public Xcls_RightPalete()
    {
        this.el = new Gtk.VBox( true, 0 );
        _this = this;
        WindowRightPalete = this;

        // my vars

        // set gobject values
        var child_0 = new Xcls_buttonbar(_this);
        this.el.add (  child_0.el  );
        var child_1 = new Xcls_viewbox(_this);
        this.el.add (  child_1.el  );
    }

    // userdefined functions 

    // skip .Palete.Palete:provider - already used 

    // skip .signal:void:drag_end() - already used 

    // skip id - not pipe 

    // skip pack - not pipe 

    // skip xtype - not pipe 
    public void hide () {
              _this.buttonbar.el.show();
              _this.viewbox.el.hide();
          //    print("TRIED TO HIDE");
        } 
    public void show () {
            _this.buttonbar.el.hide();
            _this.viewbox.el.show();
           // this.get('model').expanded();
             
        }

    // skip |xns - no return type

    // skip items - not pipe 

    // skip xvala_cls - not pipe 

    // skip xvala_xcls - not pipe 

    // skip xvala_id - not pipe 
    public class Xcls_buttonbar
    {
        public Gtk.VBox el;
        private Xcls_RightPalete  _this;


            // my vars

            // ctor 
        public Xcls_buttonbar(Xcls_RightPalete _owner)
        {
            this.el = new Gtk.VBox( true, 0 );
            _this = _owner;
            _this.buttonbar = this;

            // my vars

            // set gobject values
            var child_0 = new Xcls_Button3(_this);
            this.el.pack_start (  child_0.el , false,true );
            var child_1 = new Xcls_Label5(_this);
            this.el.add (  child_1.el  );
        }

        // userdefined functions 

        // skip |xns - no return type

        // skip xtype - not pipe 

        // skip pack - not pipe 

        // skip id - not pipe 

        // skip items - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_Button3
    {
        public Gtk.Button el;
        private Xcls_RightPalete  _this;


            // my vars

            // ctor 
        public Xcls_Button3(Xcls_RightPalete _owner)
        {
            this.el = new Gtk.Button();
            _this = _owner;

            // my vars

            // set gobject values
            var child_0 = new Xcls_Image4(_this);
            this.el.add (  child_0.el  );

            // listeners 
            this.el.clicked.connect( () => {
            	_this.show();
            } );
        }

        // userdefined functions 

        // skip listeners - not pipe 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |xns - no return type

        // skip items - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_Image4
    {
        public Gtk.Image el;
        private Xcls_RightPalete  _this;


            // my vars

            // ctor 
        public Xcls_Image4(Xcls_RightPalete _owner)
        {
            this.el = new Gtk.Image();
            _this = _owner;

            // my vars

            // set gobject values
            this.el.icon_size = Gtk.IconSize.MENU;
            this.el.stock = Gtk.STOCK_GOTO_FIRST;
        }

        // userdefined functions 

        // skip |xns - no return type

        // skip xtype - not pipe 

        // skip pack - not pipe 

        // skip |stock - already used 

        // skip |icon_size - already used 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_Label5
    {
        public Gtk.Label el;
        private Xcls_RightPalete  _this;


            // my vars

            // ctor 
        public Xcls_Label5(Xcls_RightPalete _owner)
        {
            this.el = new Gtk.Label( "Palete" );
            _this = _owner;

            // my vars

            // set gobject values
            this.el.angle = 270;

            // listeners 
            this.el.enter_notify_event.connect(  ( event) => {
                _this.show();
                return false;
            } );
        }

        // userdefined functions 

        // skip listeners - not pipe 

        // skip angle - already used 

        // skip label - already used 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |init - already used 

        // skip |xns - no return type

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_viewbox
    {
        public Gtk.VBox el;
        private Xcls_RightPalete  _this;


            // my vars

            // ctor 
        public Xcls_viewbox(Xcls_RightPalete _owner)
        {
            this.el = new Gtk.VBox( true, 0 );
            _this = _owner;
            _this.viewbox = this;

            // my vars

            // set gobject values
            var child_0 = new Xcls_HBox7(_this);
            this.el.pack_start (  child_0.el , false,true );
            var child_1 = new Xcls_ScrolledWindow11(_this);
            this.el.add (  child_1.el  );
        }

        // userdefined functions 

        // skip |xns - no return type

        // skip xtype - not pipe 

        // skip pack - not pipe 

        // skip id - not pipe 

        // skip items - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_HBox7
    {
        public Gtk.HBox el;
        private Xcls_RightPalete  _this;


            // my vars

            // ctor 
        public Xcls_HBox7(Xcls_RightPalete _owner)
        {
            this.el = new Gtk.HBox( true, 0 );
            _this = _owner;

            // my vars

            // set gobject values
            var child_0 = new Xcls_Label8(_this);
            this.el.add (  child_0.el  );
            var child_1 = new Xcls_Button9(_this);
            this.el.pack_start (  child_1.el , false,true );
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
    public class Xcls_Label8
    {
        public Gtk.Label el;
        private Xcls_RightPalete  _this;


            // my vars

            // ctor 
        public Xcls_Label8(Xcls_RightPalete _owner)
        {
            this.el = new Gtk.Label( "Palete" );
            _this = _owner;

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip |xns - no return type

        // skip xtype - not pipe 

        // skip pack - not pipe 

        // skip label - already used 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_Button9
    {
        public Gtk.Button el;
        private Xcls_RightPalete  _this;


            // my vars

            // ctor 
        public Xcls_Button9(Xcls_RightPalete _owner)
        {
            this.el = new Gtk.Button();
            _this = _owner;

            // my vars

            // set gobject values
            var child_0 = new Xcls_Image10(_this);
            this.el.add (  child_0.el  );

            // listeners 
            this.el.clicked.connect(   () => {
            	_this.hide();
            } );
        }

        // userdefined functions 

        // skip listeners - not pipe 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |xns - no return type

        // skip items - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_Image10
    {
        public Gtk.Image el;
        private Xcls_RightPalete  _this;


            // my vars

            // ctor 
        public Xcls_Image10(Xcls_RightPalete _owner)
        {
            this.el = new Gtk.Image();
            _this = _owner;

            // my vars

            // set gobject values
            this.el.icon_size = Gtk.IconSize.MENU;
            this.el.stock = Gtk.STOCK_GOTO_LAST;
        }

        // userdefined functions 

        // skip |xns - no return type

        // skip xtype - not pipe 

        // skip pack - not pipe 

        // skip |stock - already used 

        // skip |icon_size - already used 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_ScrolledWindow11
    {
        public Gtk.ScrolledWindow el;
        private Xcls_RightPalete  _this;


            // my vars

            // ctor 
        public Xcls_ScrolledWindow11(Xcls_RightPalete _owner)
        {
            this.el = new Gtk.ScrolledWindow( null, null );
            _this = _owner;

            // my vars

            // set gobject values
            this.el.shadow_type = Gtk.ShadowType.IN;
            var child_0 = new Xcls_TreeView12(_this);
            this.el.add (  child_0.el  );
        }

        // userdefined functions 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |init - already used 

        // skip |shadow_type - already used 

        // skip |xns - no return type

        // skip items - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_TreeView12
    {
        public Gtk.TreeView el;
        private Xcls_RightPalete  _this;


            // my vars
        public GLib.List dropList;
        public string dragData;

            // ctor 
        public Xcls_TreeView12(Xcls_RightPalete _owner)
        {
            this.el = new Gtk.TreeView();
            _this = _owner;

            // my vars

            // set gobject values
            this.el.enable_tree_lines = true;
            this.el.headers_visible = false;
            var child_0 = new Xcls_model(_this);
            this.el.set_model (  child_0.el  );
            var child_1 = new Xcls_TreeViewColumn14(_this);
            this.el.append_column (  child_1.el  );

            // listeners 
            this.el.drag_begin.connect(   ( ctx) => {
                // we could fill this in now...
            //        Seed.print('SOURCE: drag-begin');
                    
                    
                    
                    Gtk.TreeIter iter;
                    var s = this.el.get_selection();
                    
                    Gtk.TreeModel mod;
                    s.get_selected(out mod, out iter);
                    var path = mod.get_path(iter);
                    
                    /// pix is a surface..
                    var pix = this.el.create_row_drag_icon ( path);
                        
                            
                    Gtk.drag_set_icon_surface (ctx, pix);
                    GLib.Value value;
                    
            
                    _this.model.el.get_value(iter, 0, out value);
                    if (_this.provider == null) {
                        return;
                    }
                    //if (!this.get('/RightPalete').provider) {
                    //    return false;
                    //}
                    //this.dropList = _this.provider.getDropList((string)value);
                    this.dragData = (string) value;
                     
                    
                    return;
            } );
            this.el.drag_data_get.connect(   (drag_context, selection_data, info, time) => {
             	//Seed.print('Palete: drag-data-get: ' + target_type);
                    if (this.dragData.length > 0 ) {
                        selection_data.set_text(this.dragData ,this.dragData.length);
                    }
                    
                    
                    //this.el.dragData = "TEST from source widget";
                    
                    
            } );
            this.el.drag_end.connect( ( drag_context)  => {
             	//Seed.print('SOURCE: drag-end');
            	
            	this.dragData = "";
            	this.dropList = null;
            	_this.drag_end(); // call signal..
            	//this.get('/LeftTree.view').highlight(false);
            	 
            } );
            this.el.button_press_event.connect(  ( event) => {
            
             //	if (!this.get('/Editor').save()) {
             //	    // popup!! - click handled.. 
            // 	    return true;
            //        }
                return false;
            } );
        }

        // userdefined functions 

        // skip listeners - not pipe 

        // skip .GLib.List:dropList - already used 

        // skip .string:dragData - already used 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |enable_tree_lines - already used 

        // skip |headers_visible - already used 

        // skip |init - already used 

        // skip |xns - no return type

        // skip items - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_model
    {
        public Gtk.ListStore el;
        private Xcls_RightPalete  _this;


            // my vars

            // ctor 
        public Xcls_model(Xcls_RightPalete _owner)
        {
            this.el = new Gtk.ListStore( 2, "typeof(string),typeof(string)" );
            _this = _owner;
            _this.model = this;

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip columns - already used 

        // skip id - not pipe 

        // skip n_columns - already used 

        // skip pack - not pipe 

        // skip xtype - not pipe 
        public string getValue (Gtk.TreeIter iter, int col)  {
                GLib.Value gval;
                 this.el.get_value(iter, col , out gval);
                return  (string)gval;
                
                
            }
        public void load (GLib.List<string> tr, Gtk.TreeIter? iter)
            {
                if (iter == null) {
                    this.el.clear();
                }
                //console.log('Project tree load: ' + tr.length);
            
                Gtk.TreeIter citer;
                //this.insert(citer,iter,0);
                for(var i =0 ; i < tr.length(); i++) {
                    if (iter == null) {
                        
                        this.el.append(out citer);   
                    } else {
                        this.el.insert_before(out citer,iter);
                    }
                    
                    var r = tr.nth_data(i);
                    //Seed.print(r);
                    this.el.set_value(citer, 0,   r ); // title 
                    
                    //this.el.set_value(citer, 1,  new GObject.Value( r)); //id
                    //if (r.cn && r.cn.length) {
                    //    this.load(r.cn, citer);
                    //}
                }
                
                
            }

        // skip |xns - no return type

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_TreeViewColumn14
    {
        public Gtk.TreeViewColumn el;
        private Xcls_RightPalete  _this;


            // my vars

            // ctor 
        public Xcls_TreeViewColumn14(Xcls_RightPalete _owner)
        {
            this.el = new Gtk.TreeViewColumn();
            _this = _owner;

            // my vars

            // set gobject values
            var child_0 = new Xcls_txtrender(_this);
            this.el.pack_start (  child_0.el , true );
        }

        // userdefined functions 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |init - already used 

        // skip |xns - no return type

        // skip items - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_txtrender
    {
        public Gtk.CellRendererText el;
        private Xcls_RightPalete  _this;


            // my vars

            // ctor 
        public Xcls_txtrender(Xcls_RightPalete _owner)
        {
            this.el = new Gtk.CellRendererText();
            _this = _owner;
            _this.txtrender = this;

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip id - not pipe 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |xns - no return type

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
}
