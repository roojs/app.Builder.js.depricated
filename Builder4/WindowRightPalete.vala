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

public class Xcls_RightPalete : Object 
{
    public Gtk.VBox el;
    private Xcls_RightPalete  _this;

    public Xcls_buttonbar buttonbar;
    public Xcls_viewbox viewbox;
    public Xcls_model model;
    public Xcls_txtrender txtrender;

        // my vars
    public Palete.Palete provider;
    public signal void after_node_change(JSRender.Node? node);
    public signal void before_node_change(JSRender.Node? node);
    public signal void drag_end();

        // ctor 
    public Xcls_RightPalete()
    {
        _this = this;
        WindowRightPalete = this;
        this.el = new Gtk.VBox( true, 0 );

        // my vars

        // set gobject values
        var child_0 = new Xcls_buttonbar( _this );
        child_0.ref();
        this.el.add (  child_0.el  );
        var child_1 = new Xcls_viewbox( _this );
        child_1.ref();
        this.el.add (  child_1.el  );
    }

    // userdefined functions 
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
    public class Xcls_buttonbar : Object 
    {
        public Gtk.VBox el;
        private Xcls_RightPalete  _this;


            // my vars

            // ctor 
        public Xcls_buttonbar(Xcls_RightPalete _owner )
        {
            _this = _owner;
            _this.buttonbar = this;
            this.el = new Gtk.VBox( true, 0 );

            // my vars

            // set gobject values
            var child_0 = new Xcls_Button3( _this );
            child_0.ref();
            this.el.pack_start (  child_0.el , false,true );
            var child_1 = new Xcls_Label5( _this );
            child_1.ref();
            this.el.add (  child_1.el  );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_Button3 : Object 
    {
        public Gtk.Button el;
        private Xcls_RightPalete  _this;


            // my vars

            // ctor 
        public Xcls_Button3(Xcls_RightPalete _owner )
        {
            _this = _owner;
            this.el = new Gtk.Button();

            // my vars

            // set gobject values
            var child_0 = new Xcls_Image4( _this );
            child_0.ref();
            this.el.add (  child_0.el  );

            // listeners 
            this.el.clicked.connect( () => {
            	_this.show();
            } );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_Image4 : Object 
    {
        public Gtk.Image el;
        private Xcls_RightPalete  _this;


            // my vars

            // ctor 
        public Xcls_Image4(Xcls_RightPalete _owner )
        {
            _this = _owner;
            this.el = new Gtk.Image();

            // my vars

            // set gobject values
            this.el.icon_size = Gtk.IconSize.MENU;
            this.el.stock = Gtk.STOCK_GOTO_FIRST;
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_Label5 : Object 
    {
        public Gtk.Label el;
        private Xcls_RightPalete  _this;


            // my vars

            // ctor 
        public Xcls_Label5(Xcls_RightPalete _owner )
        {
            _this = _owner;
            this.el = new Gtk.Label( "Palete" );

            // my vars

            // set gobject values
            this.el.angle = 270;

            // init method 
             this.el.add_events ( Gdk.EventMask.BUTTON_MOTION_MASK );
             

            // listeners 
            this.el.enter_notify_event.connect(  ( event) => {
                _this.show();
                return false;
            } );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_viewbox : Object 
    {
        public Gtk.VBox el;
        private Xcls_RightPalete  _this;


            // my vars

            // ctor 
        public Xcls_viewbox(Xcls_RightPalete _owner )
        {
            _this = _owner;
            _this.viewbox = this;
            this.el = new Gtk.VBox( true, 0 );

            // my vars

            // set gobject values
            var child_0 = new Xcls_HBox7( _this );
            child_0.ref();
            this.el.pack_start (  child_0.el , false,true );
            var child_1 = new Xcls_ScrolledWindow11( _this );
            child_1.ref();
            this.el.add (  child_1.el  );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_HBox7 : Object 
    {
        public Gtk.HBox el;
        private Xcls_RightPalete  _this;


            // my vars

            // ctor 
        public Xcls_HBox7(Xcls_RightPalete _owner )
        {
            _this = _owner;
            this.el = new Gtk.HBox( true, 0 );

            // my vars

            // set gobject values
            var child_0 = new Xcls_Label8( _this );
            child_0.ref();
            this.el.add (  child_0.el  );
            var child_1 = new Xcls_Button9( _this );
            child_1.ref();
            this.el.pack_start (  child_1.el , false,true );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_Label8 : Object 
    {
        public Gtk.Label el;
        private Xcls_RightPalete  _this;


            // my vars

            // ctor 
        public Xcls_Label8(Xcls_RightPalete _owner )
        {
            _this = _owner;
            this.el = new Gtk.Label( "Palete" );

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_Button9 : Object 
    {
        public Gtk.Button el;
        private Xcls_RightPalete  _this;


            // my vars

            // ctor 
        public Xcls_Button9(Xcls_RightPalete _owner )
        {
            _this = _owner;
            this.el = new Gtk.Button();

            // my vars

            // set gobject values
            var child_0 = new Xcls_Image10( _this );
            child_0.ref();
            this.el.add (  child_0.el  );

            // listeners 
            this.el.clicked.connect(   () => {
            	_this.hide();
            } );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_Image10 : Object 
    {
        public Gtk.Image el;
        private Xcls_RightPalete  _this;


            // my vars

            // ctor 
        public Xcls_Image10(Xcls_RightPalete _owner )
        {
            _this = _owner;
            this.el = new Gtk.Image();

            // my vars

            // set gobject values
            this.el.icon_size = Gtk.IconSize.MENU;
            this.el.stock = Gtk.STOCK_GOTO_LAST;
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_ScrolledWindow11 : Object 
    {
        public Gtk.ScrolledWindow el;
        private Xcls_RightPalete  _this;


            // my vars

            // ctor 
        public Xcls_ScrolledWindow11(Xcls_RightPalete _owner )
        {
            _this = _owner;
            this.el = new Gtk.ScrolledWindow( null, null );

            // my vars

            // set gobject values
            this.el.shadow_type = Gtk.ShadowType.IN;
            var child_0 = new Xcls_TreeView12( _this );
            child_0.ref();
            this.el.add (  child_0.el  );

            // init method 
              this.el.set_policy(Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC);
               this.el.set_size_request(-1,200);
             
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_TreeView12 : Object 
    {
        public Gtk.TreeView el;
        private Xcls_RightPalete  _this;


            // my vars
        public string dragData;

            // ctor 
        public Xcls_TreeView12(Xcls_RightPalete _owner )
        {
            _this = _owner;
            this.el = new Gtk.TreeView();

            // my vars

            // set gobject values
            this.el.enable_tree_lines = true;
            this.el.headers_visible = false;
            var child_0 = new Xcls_model( _this );
            child_0.ref();
            this.el.set_model (  child_0.el  );
            var child_1 = new Xcls_TreeViewColumn14( _this );
            child_1.ref();
            this.el.append_column (  child_1.el  );

            // init method 
             {
                this.el.set_size_request(150,-1);
                                      //  set_reorderable: [1]
                                              
                var description = new Pango.FontDescription();
                description.set_size(8000);
                this.el.modify_font(description);
                
                var selection = this.el.get_selection();
                selection.set_mode( Gtk.SelectionMode.SINGLE);
               // this.selection.signal['changed'].connect(function() {
                //    _view.listeners['cursor-changed'].apply(_view, [ _view, '']);
                //});
                // see: http://live.gnome.org/GnomeLove/DragNDropTutorial
                 
                Gtk.drag_source_set (
                        this.el,            /* widget will be drag-able */
                        Gdk.ModifierType.BUTTON1_MASK,       /* modifier that will start a drag */
                        Builder4.Application.targetList,            /* lists of target to support */
                        Gdk.DragAction.COPY         /* what to do with data after dropped */
                );
                //Gtk.drag_source_set_target_list(this.el, LeftTree.targetList);
               
               // Gtk.drag_source_set_target_list(this.el, Application.targetList);
               // Gtk.drag_source_add_text_targets(this.el); 
             
            }

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
            	//this.dropList = null;
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

        // skip |xns - no return type
    }
    public class Xcls_model : Object 
    {
        public Gtk.ListStore el;
        private Xcls_RightPalete  _this;


            // my vars

            // ctor 
        public Xcls_model(Xcls_RightPalete _owner )
        {
            _this = _owner;
            _this.model = this;
            this.el = new Gtk.ListStore( 2, "typeof(string),typeof(string)" );

            // my vars

            // set gobject values
        }

        // userdefined functions 
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
    }
    public class Xcls_TreeViewColumn14 : Object 
    {
        public Gtk.TreeViewColumn el;
        private Xcls_RightPalete  _this;


            // my vars

            // ctor 
        public Xcls_TreeViewColumn14(Xcls_RightPalete _owner )
        {
            _this = _owner;
            this.el = new Gtk.TreeViewColumn();

            // my vars

            // set gobject values
            var child_0 = new Xcls_txtrender( _this );
            child_0.ref();
            this.el.pack_start (  child_0.el , true );

            // init method 
             this.el.add_attribute(_this.txtrender.el , "markup", 0 );
             
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_txtrender : Object 
    {
        public Gtk.CellRendererText el;
        private Xcls_RightPalete  _this;


            // my vars

            // ctor 
        public Xcls_txtrender(Xcls_RightPalete _owner )
        {
            _this = _owner;
            _this.txtrender = this;
            this.el = new Gtk.CellRendererText();

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip |xns - no return type
    }
}
