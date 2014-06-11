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
    private static Xcls_RightPalete  _this;

    public Xcls_buttonbar buttonbar;
    public Xcls_viewbox viewbox;
    public Xcls_model model;
    public Xcls_txtrender txtrender;

        // my vars
    public signal void drag_end();
    public Project.Project provider;

        // ctor 
    public Xcls_RightPalete()
    {
        this.el = new Gtk.VBox( true, 0 );
        _this = this;
        WindowRightPalete = this;

        // my vars

        // set gobject values
        var child_0 = new Xcls_buttonbar();
        this.el.add (  child_0.el  );
        var child_1 = new Xcls_viewbox();
        this.el.add (  child_1.el  );
    }

    // userdefined functions 

    // skip .signal:void:drag_end() - already used 

    // skip .Project.Project:provider - already used 

    // skip id - not pipe 

    // skip pack - not pipe 

    // skip xtype - not pipe 
    public void hide () {
            
              _this.buttonbar.el.show();
              _this.viewbox.el.hide();
          //    print("TRIED TO HIDE");
        }
    public void showfunction() {
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

            // my vars

            // ctor 
        public Xcls_buttonbar()
        {
            this.el = new Gtk.VBox( true, 0 );
            _this.buttonbar = this;

            // my vars

            // set gobject values
            var child_0 = new Xcls_Button3();
            this.el.pack_start (  child_0.el , false,true );
            var child_1 = new Xcls_Label5();
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

            // my vars

            // ctor 
        public Xcls_Button3()
        {
            this.el = new Gtk.Button();

            // my vars

            // set gobject values
            var child_0 = new Xcls_Image4();
            this.el.add (  child_0.el  );

            // listeners 
            this.el.clicked.connect(   (self) => {
            	_this..show();
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

            // my vars

            // ctor 
        public Xcls_Image4()
        {
            this.el = new Gtk.Image();

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

            // my vars

            // ctor 
        public Xcls_Label5()
        {
            this.el = new Gtk.Label( "Palete" );

            // my vars

            // set gobject values
            this.el.angle = 270;

            // listeners 
            this.el.enter_notify_event.connect(  (self, event) => {
                RightPalete.show();
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

            // my vars

            // ctor 
        public Xcls_viewbox()
        {
            this.el = new Gtk.VBox( true, 0 );
            _this.viewbox = this;

            // my vars

            // set gobject values
            var child_0 = new Xcls_HBox7();
            this.el.pack_start (  child_0.el , false,true );
            var child_1 = new Xcls_ScrolledWindow11();
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

            // my vars

            // ctor 
        public Xcls_HBox7()
        {
            this.el = new Gtk.HBox( true, 0 );

            // my vars

            // set gobject values
            var child_0 = new Xcls_Label8();
            this.el.add (  child_0.el  );
            var child_1 = new Xcls_Button9();
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

            // my vars

            // ctor 
        public Xcls_Label8()
        {
            this.el = new Gtk.Label( "Palete" );

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

            // my vars

            // ctor 
        public Xcls_Button9()
        {
            this.el = new Gtk.Button();

            // my vars

            // set gobject values
            var child_0 = new Xcls_Image10();
            this.el.add (  child_0.el  );

            // listeners 
            this.el.clicked.connect( function (self) {
            	_this.RightPalete.hide();
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

            // my vars

            // ctor 
        public Xcls_Image10()
        {
            this.el = new Gtk.Image();

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

            // my vars

            // ctor 
        public Xcls_ScrolledWindow11()
        {
            this.el = new Gtk.ScrolledWindow( null, null );

            // my vars

            // set gobject values
            this.el.shadow_type = Gtk.ShadowType.IN;
            var child_0 = new Xcls_TreeView12();
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

            // my vars
        public GLib.List dropList;
        public string dragData;

            // ctor 
        public Xcls_TreeView12()
        {
            this.el = new Gtk.TreeView();

            // my vars

            // set gobject values
            this.el.enable_tree_lines = true;
            this.el.headers_visible = false;
            var child_0 = new Xcls_model();
            this.el.set_model (  child_0.el  );
            var child_1 = new Xcls_TreeViewColumn14();
            this.el.append_column (  child_1.el  );

            // listeners 
            this.el.drag_begin.connect(   ( ctx) => {
                // we could fill this in now...
            //        Seed.print('SOURCE: drag-begin');
                    
                    
                    
                    Gtk.TreeIter iter;
                    var s = _this.selection;
                    
                    s.get_selected(_this.model.el, out iter);
                    var path = _this.model.el.get_path(iter);
                    
                    /// pix is a surface..
                    var pix = this.el.create_row_drag_icon ( path);
                        
                            
                    Gtk.drag_set_icon_surface (ctx, pix);
                    Glib.Value val;
                    
            
                    _this.model.el.get_value(iter, 0, out value);
                    if (_this.provider == null) {
                        return false;
                    }
                    //if (!this.get('/RightPalete').provider) {
                    //    return false;
                    //}
                    this.dropList = _this.provider.getDropList((string)value);
                    this.dragData = (string) value;
                     
                    
                    return true;
            } );
            this.el.drag_data_get.connect(   (drag_context, selection_data, info, time) => {
             	//Seed.print('Palete: drag-data-get: ' + target_type);
                    if (this.el.dragData.length > 0 ) {
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
            	return true;
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

            // my vars

            // ctor 
        public Xcls_model()
        {
            this.el = new Gtk.ListStore( 2, "typeof(string),typeof(string)" );
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
                        this.el.insert(out citer,iter,-1);
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
        public string getValue (Gtk.TreeIter iter, int col)  {
                GLib.Value gval;
                 this.el.get_value(iter, col , out gval);
                return  (string)gval;
                
                
            }

        // skip |xns - no return type

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_TreeViewColumn14
    {
        public Gtk.TreeViewColumn el;

            // my vars

            // ctor 
        public Xcls_TreeViewColumn14()
        {
            this.el = new Gtk.TreeViewColumn();

            // my vars

            // set gobject values
            var child_0 = new Xcls_txtrender();
            this.el.pack_start (  child_0.el  );
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

            // my vars

            // ctor 
        public Xcls_txtrender()
        {
            this.el = new Gtk.CellRendererText();
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
