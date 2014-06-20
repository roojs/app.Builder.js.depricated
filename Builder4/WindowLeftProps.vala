/* -- to compile
valac  --pkg gio-2.0  --pkg posix  --pkg gtk+-3.0 --pkg libnotify --pkg gtksourceview-3.0  --pkg  libwnck-3.0 \
    /tmp/WindowLeftProps.vala  -o /tmp/WindowLeftProps
*/


/* -- to test class
static int main (string[] args) {
    Gtk.init (ref args);
    new Xcls_LeftProps();
    WindowLeftProps.show_all();
     Gtk.main ();
    return 0;
}
*/


public static Xcls_LeftProps  WindowLeftProps;

public class Xcls_LeftProps : Object 
{
    public Gtk.VBox el;
    private Xcls_LeftProps  _this;

    public Xcls_AddPropertyPopup AddPropertyPopup;
    public Xcls_EditProps EditProps;
    public Xcls_view view;
    public Xcls_model model;
    public Xcls_ContextMenu ContextMenu;

        // my vars
    public signal void showAddProps(string type);

        // ctor 
    public Xcls_LeftProps()
    {
        _this = this;
        WindowLeftProps = this;
        this.el = new Gtk.VBox( true, 0 );

        // my vars

        // set gobject values
        var child_0 = new Xcls_HBox2(_this);
        child_0.ref();
        this.el.pack_start (  child_0.el , false,true,0 );
        var child_1 = new Xcls_EditProps(_this);
        child_1.ref();
        this.el.add (  child_1.el  );
    }

    // userdefined functions 

    // skip .signal:void:showAddProps - already used 

    // skip id - not pipe 

    // skip xtype - not pipe 

    // skip |xns - no return type

    // skip items - not pipe 

    // skip xvala_cls - not pipe 

    // skip xvala_xcls - not pipe 

    // skip xvala_id - not pipe 
    public class Xcls_HBox2 : Object 
    {
        public Gtk.HBox el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_HBox2(Xcls_LeftProps _owner)
        {
            _this = _owner;
            this.el = new Gtk.HBox( true, 0 );

            // my vars

            // set gobject values
            var child_0 = new Xcls_Button3(_this);
            child_0.ref();
            this.el.add (  child_0.el  );
            var child_1 = new Xcls_Button7(_this);
            child_1.ref();
            this.el.add (  child_1.el  );
            var child_2 = new Xcls_Button11(_this);
            child_2.ref();
            this.el.add (  child_2.el  );
        }

        // userdefined functions 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |xns - no return type

        // skip items - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_Button3 : Object 
    {
        public Gtk.Button el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_Button3(Xcls_LeftProps _owner)
        {
            _this = _owner;
            this.el = new Gtk.Button();

            // my vars

            // set gobject values
            var child_0 = new Xcls_HBox4(_this);
            child_0.ref();
            this.el.add (  child_0.el  );

            // listeners 
            this.el.button_press_event.connect(  ( event ) => {
                _this.showAddProps("prop");
                return false;
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
    public class Xcls_HBox4 : Object 
    {
        public Gtk.HBox el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_HBox4(Xcls_LeftProps _owner)
        {
            _this = _owner;
            this.el = new Gtk.HBox( true, 0 );

            // my vars

            // set gobject values
            var child_0 = new Xcls_Image5(_this);
            child_0.ref();
            this.el.add (  child_0.el  );
            var child_1 = new Xcls_Label6(_this);
            child_1.ref();
            this.el.add (  child_1.el  );
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
    public class Xcls_Image5 : Object 
    {
        public Gtk.Image el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_Image5(Xcls_LeftProps _owner)
        {
            _this = _owner;
            this.el = new Gtk.Image();

            // my vars

            // set gobject values
            this.el.icon_size = Gtk.IconSize.MENU;
            this.el.stock = Gtk.STOCK_ADD;
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
    public class Xcls_Label6 : Object 
    {
        public Gtk.Label el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_Label6(Xcls_LeftProps _owner)
        {
            _this = _owner;
            this.el = new Gtk.Label( "Property" );

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
    public class Xcls_Button7 : Object 
    {
        public Gtk.Button el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_Button7(Xcls_LeftProps _owner)
        {
            _this = _owner;
            this.el = new Gtk.Button();

            // my vars

            // set gobject values
            var child_0 = new Xcls_HBox8(_this);
            child_0.ref();
            this.el.add (  child_0.el  );

            // listeners 
            this.el.button_press_event.connect( function ( event)  => {
                
            // 	if (!this.get('/Editor').save()) {
            // 	    // popup!! - click handled.. 
            // 	    return true;
            //        }
                _this.showAddProps("'events");
                return false;
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
    public class Xcls_HBox8 : Object 
    {
        public Gtk.HBox el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_HBox8(Xcls_LeftProps _owner)
        {
            _this = _owner;
            this.el = new Gtk.HBox( true, 0 );

            // my vars

            // set gobject values
            var child_0 = new Xcls_Image9(_this);
            child_0.ref();
            this.el.add (  child_0.el  );
            var child_1 = new Xcls_Label10(_this);
            child_1.ref();
            this.el.add (  child_1.el  );
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
    public class Xcls_Image9 : Object 
    {
        public Gtk.Image el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_Image9(Xcls_LeftProps _owner)
        {
            _this = _owner;
            this.el = new Gtk.Image();

            // my vars

            // set gobject values
            this.el.icon_size = Gtk.IconSize.MENU;
            this.el.stock = Gtk.STOCK_ADD;
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
    public class Xcls_Label10 : Object 
    {
        public Gtk.Label el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_Label10(Xcls_LeftProps _owner)
        {
            _this = _owner;
            this.el = new Gtk.Label( "Handler" );

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
    public class Xcls_Button11 : Object 
    {
        public Gtk.Button el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_Button11(Xcls_LeftProps _owner)
        {
            _this = _owner;
            this.el = new Gtk.Button();

            // my vars

            // set gobject values
            var child_0 = new Xcls_HBox12(_this);
            child_0.ref();
            this.el.add (  child_0.el  );
            var child_1 = new Xcls_AddPropertyPopup(_this);
            child_1.ref();

            // listeners 
            this.el.button_press_event.connect( function (self, ev) {
            
             	if (!this.get('/Editor').save()) {
             	    // popup!! - click handled.. 
             	    return true;
                    }
                    
            	var p = this.AddPropertyPopup;
             	p.el.set_screen(Gdk.Screen.get_default());
                    p.el.show_all();
                     p.el.popup(null, null, null, 3, ev.button.time);
                return true;
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
    public class Xcls_HBox12 : Object 
    {
        public Gtk.HBox el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_HBox12(Xcls_LeftProps _owner)
        {
            _this = _owner;
            this.el = new Gtk.HBox( true, 0 );

            // my vars

            // set gobject values
            var child_0 = new Xcls_Image13(_this);
            child_0.ref();
            this.el.add (  child_0.el  );
            var child_1 = new Xcls_Label14(_this);
            child_1.ref();
            this.el.add (  child_1.el  );
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
    public class Xcls_Image13 : Object 
    {
        public Gtk.Image el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_Image13(Xcls_LeftProps _owner)
        {
            _this = _owner;
            this.el = new Gtk.Image();

            // my vars

            // set gobject values
            this.el.icon_size = Gtk.IconSize.MENU;
            this.el.stock = Gtk.STOCK_ADD;
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
    public class Xcls_Label14 : Object 
    {
        public Gtk.Label el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_Label14(Xcls_LeftProps _owner)
        {
            _this = _owner;
            this.el = new Gtk.Label( "Other" );

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
    public class Xcls_AddPropertyPopup : Object 
    {
        public Gtk.Menu el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_AddPropertyPopup(Xcls_LeftProps _owner)
        {
            _this = _owner;
            _this.AddPropertyPopup = this;
            this.el = new Gtk.Menu();

            // my vars

            // set gobject values
            var child_0 = new Xcls_MenuItem16(_this);
            child_0.ref();
            this.el.append (  child_0.el  );
            var child_1 = new Xcls_MenuItem17(_this);
            child_1.ref();
            this.el.append (  child_1.el  );
            var child_2 = new Xcls_MenuItem18(_this);
            child_2.ref();
            this.el.append (  child_2.el  );
            var child_3 = new Xcls_SeparatorMenuItem19(_this);
            child_3.ref();
            this.el.add (  child_3.el  );
            var child_4 = new Xcls_MenuItem20(_this);
            child_4.ref();
            this.el.append (  child_4.el  );
            var child_5 = new Xcls_MenuItem21(_this);
            child_5.ref();
            this.el.append (  child_5.el  );
            var child_6 = new Xcls_MenuItem22(_this);
            child_6.ref();
            this.el.append (  child_6.el  );
            var child_7 = new Xcls_SeparatorMenuItem23(_this);
            child_7.ref();
            this.el.add (  child_7.el  );
            var child_8 = new Xcls_MenuItem24(_this);
            child_8.ref();
            this.el.append (  child_8.el  );
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
    public class Xcls_MenuItem16 : Object 
    {
        public Gtk.MenuItem el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_MenuItem16(Xcls_LeftProps _owner)
        {
            _this = _owner;
            this.el = new Gtk.MenuItem();

            // my vars

            // set gobject values
            this.el.label = "ID";
            this.el.tooltip_markup = "Using this.get('*someid') will find any id in an application.";

            // listeners 
            this.el.activate.connect(  ()  => {
                _this.addProp( ".string:id", "");
            } );
        }

        // userdefined functions 

        // skip listeners - not pipe 

        // skip label - already used 

        // skip pack - not pipe 

        // skip tooltip_markup - already used 

        // skip xtype - not pipe 

        // skip |xns - no return type

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_MenuItem17 : Object 
    {
        public Gtk.MenuItem el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_MenuItem17(Xcls_LeftProps _owner)
        {
            _this = _owner;
            this.el = new Gtk.MenuItem();

            // my vars

            // set gobject values
            this.el.label = "PACK";
            this.el.tooltip_markup = "Add what type of packing is to be used";

            // listeners 
            this.el.activate.connect(   ( ) => {
            
                _this.addProp( "*pack","add");
            } );
        }

        // userdefined functions 

        // skip listeners - not pipe 

        // skip label - already used 

        // skip pack - not pipe 

        // skip tooltip_markup - already used 

        // skip xtype - not pipe 

        // skip |xns - no return type

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_MenuItem18 : Object 
    {
        public Gtk.MenuItem el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_MenuItem18(Xcls_LeftProps _owner)
        {
            _this = _owner;
            this.el = new Gtk.MenuItem();

            // my vars

            // set gobject values
            this.el.label = "INIT";
            this.el.tooltip_markup = "Override the init method";

            // listeners 
            this.el.activate.connect(   ( ) => {
            
                this.addProp( "|init", "{\n\n}\n" );
            } );
        }

        // userdefined functions 

        // skip listeners - not pipe 

        // skip label - already used 

        // skip pack - not pipe 

        // skip tooltip_markup - already used 

        // skip xtype - not pipe 

        // skip |xns - no return type

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_SeparatorMenuItem19 : Object 
    {
        public Gtk.SeparatorMenuItem el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_SeparatorMenuItem19(Xcls_LeftProps _owner)
        {
            _this = _owner;
            this.el = new Gtk.SeparatorMenuItem();

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip |xns - no return type

        // skip xtype - not pipe 

        // skip pack - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_MenuItem20 : Object 
    {
        public Gtk.MenuItem el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_MenuItem20(Xcls_LeftProps _owner)
        {
            _this = _owner;
            this.el = new Gtk.MenuItem();

            // my vars

            // set gobject values
            this.el.label = "String";
            this.el.tooltip_markup = "Add a user defined string property";

            // listeners 
            this.el.activate.connect( function (self) {
            
                this.get('/LeftPanel.model').add( {
              		  key : '', 
                            type : 'string',
                            val  : "",
                            etype : 'props'
                });
            } );
        }

        // userdefined functions 

        // skip |xns - no return type

        // skip xtype - not pipe 

        // skip pack - not pipe 

        // skip tooltip_markup - already used 

        // skip label - already used 

        // skip listeners - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_MenuItem21 : Object 
    {
        public Gtk.MenuItem el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_MenuItem21(Xcls_LeftProps _owner)
        {
            _this = _owner;
            this.el = new Gtk.MenuItem();

            // my vars

            // set gobject values
            this.el.label = "Number";
            this.el.tooltip_markup = "Add a user defined number property";

            // listeners 
            this.el.activate.connect( function (self) {
            
                this.get('/LeftPanel.model').add( {
              		  key : '', 
                            type : 'number',
                            val  : 0,
                            etype : 'props'
                });
            } );
        }

        // userdefined functions 

        // skip |xns - no return type

        // skip xtype - not pipe 

        // skip pack - not pipe 

        // skip tooltip_markup - already used 

        // skip label - already used 

        // skip listeners - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_MenuItem22 : Object 
    {
        public Gtk.MenuItem el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_MenuItem22(Xcls_LeftProps _owner)
        {
            _this = _owner;
            this.el = new Gtk.MenuItem();

            // my vars

            // set gobject values
            this.el.label = "Boolean";
            this.el.tooltip_markup = "Add a user defined boolean property";

            // listeners 
            this.el.activate.connect( function (self) {
            
                this.get('/LeftPanel.model').add( {
              		  key : '', 
                            type : 'boolean',
                            val  : false,
                            etype : 'props'
                });
            } );
        }

        // userdefined functions 

        // skip |xns - no return type

        // skip xtype - not pipe 

        // skip pack - not pipe 

        // skip tooltip_markup - already used 

        // skip label - already used 

        // skip listeners - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_SeparatorMenuItem23 : Object 
    {
        public Gtk.SeparatorMenuItem el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_SeparatorMenuItem23(Xcls_LeftProps _owner)
        {
            _this = _owner;
            this.el = new Gtk.SeparatorMenuItem();

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip |xns - no return type

        // skip xtype - not pipe 

        // skip pack - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_MenuItem24 : Object 
    {
        public Gtk.MenuItem el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_MenuItem24(Xcls_LeftProps _owner)
        {
            _this = _owner;
            this.el = new Gtk.MenuItem();

            // my vars

            // set gobject values
            this.el.label = "Function";
            this.el.tooltip_markup = "Add a user function boolean property";

            // listeners 
            this.el.activate.connect( function (self) {
            
                this.get('/LeftPanel.model').add( {
              	    key : '|', 
                                    type : 'function',
                                    val  : "function() {\n    \n}\n",
                                    etype : 'props'
                });
            } );
        }

        // userdefined functions 

        // skip |xns - no return type

        // skip xtype - not pipe 

        // skip pack - not pipe 

        // skip tooltip_markup - already used 

        // skip label - already used 

        // skip listeners - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_EditProps : Object 
    {
        public Gtk.ScrolledWindow el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_EditProps(Xcls_LeftProps _owner)
        {
            _this = _owner;
            _this.EditProps = this;
            this.el = new Gtk.ScrolledWindow( null, null );

            // my vars

            // set gobject values
            this.el.shadow_type = Gtk.ShadowType.IN;
            var child_0 = new Xcls_view(_this);
            child_0.ref();
            this.el.add (  child_0.el  );
            var child_1 = new Xcls_ContextMenu(_this);
            child_1.ref();

            // init method 
            function() {
                XObject.prototype.init.call(this);
               this.el.set_policy (Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC);
            }
        }

        // userdefined functions 

        // skip editing - not pipe 

        // skip id - not pipe 

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
    public class Xcls_view : Object 
    {
        public Gtk.TreeView el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_view(Xcls_LeftProps _owner)
        {
            _this = _owner;
            _this.view = this;
            this.el = new Gtk.TreeView();

            // my vars

            // set gobject values
            this.el.enable_tree_lines = true;
            this.el.headers_visible = false;
            this.el.tooltip_column = 5;
            var child_0 = new Xcls_model(_this);
            child_0.ref();
            this.el.set_model (  child_0.el  );
            var child_1 = new Xcls_TreeViewColumn28(_this);
            child_1.ref();
            this.el.append_column (  child_1.el  );
            var child_2 = new Xcls_TreeViewColumn30(_this);
            child_2.ref();
            this.el.append_column (  child_2.el  );

            // init method 
            function() {
                 XObject.prototype.init.call(this); 
                                   
                                this.selection = this.el.get_selection();
                                this.selection.set_mode( Gtk.SelectionMode.SINGLE);
                             
                                
                                var description = new Pango.FontDescription.c_new();
                                description.set_size(8000);
                                this.el.modify_font(description);
            }

            // listeners 
            this.el.button_press_event.connect( function (self, ev) {
            
                
                if (!this.get('/Editor').save()) {
                    // popup!! - click handled.. 
                    return true;
                }
                var res = { }; 
                
                if (!this.el.get_path_at_pos(ev.button.x,ev.button.y, res)) {
                    return false; //not on a element.
                }
                
                 // right click.
                 if (ev.type == Gdk.EventType.BUTTON_PRESS  && ev.button.button == 3) {    
                    // show popup!.   
                    if (res.column.title == 'value' && this.get('/LeftPanel').editing) {
                        return false;
                    }
                    //if (! this.get('/LeftPanelPopup')LeftPanelPopup.el) LeftPanelPopup.init();
                    var p = this.get('/LeftPanelPopup');
                    if (!p.el) {
                        p.init();
                    }
            
                    p.el.set_screen(Gdk.Screen.get_default());
                    p.el.show_all();
                    p.el.popup(null, null, null, null, 3, ev.button.time);
                    //Seed.print("click:" + res.column.title);
                    
                    
                    return false;
                }
                
                 
                if (res.column.title != 'value') {
                      //  XObject.error("column is not value?");
                    return false; // ignore.. - key click.. ??? should we do this??
                }
                
                // currently editing???
            //    if (  this.activePath) {
                    
                 //   this.activePath = false;
                   // stop editing!!!!
                    if (this.get('/Editor').dirty) {
                        //if (!this.get('/Editor.buffer').checkSyntax()) {
                        //   this.get('/StandardErrorDialog').show("Fix errors in code and save.."); 
                        //   return true;
                        //    // error Dialog
                        //}
                        if (!this.get('/Editor.view').save()) {
                            return true;
                        }
                    }   
                    this.get('/LeftPanel').editableColumn.items[0].el.stop_editing();
                    this.get('/LeftPanel').editing = false;
                
                //    XObject.error("Currently editing?");
                 //   return false;
               // }
                
                var renderer = this.get('/LeftPanel').editableColumn.items[0].el; // set has_entry..
                
                var type = this.get('/LeftPanel.model').getType(res.path.to_string());
                    
                // get options for this type -- this is to support option lists etc..
                var provider = this.get('/LeftTree').getPaleteProvider();
                var opts = provider.findOptions(type);
                
                if (opts === false) {
                    // it's text etnry
                     this.get('/LeftPanel').editableColumn.setOptions([]);
                    renderer.has_entry = true;
                } else {
                     this.get('/LeftPanel').editableColumn.setOptions(opts);
                    renderer.has_entry = false;
                }
                this.get('/LeftPanel.model').startEditing(res.path.to_string(), 1);
                    
               //Seed.print("click" + ev.type);
                //console.dump(res);
                return false;
            
                          
               
            } );
        }

        // userdefined functions 

        // skip listeners - not pipe 

        // skip id - not pipe 

        // skip tooltip_column - already used 

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
    public class Xcls_model : Object 
    {
        public Gtk.TreeStore el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_model(Xcls_LeftProps _owner)
        {
            _this = _owner;
            _this.model = this;
            this.el = new Gtk.TreeStore( null, null );

            // my vars

            // set gobject values

            // init method 
            function() {
                XObject.prototype.init.call(this);
            this.el.set_column_types ( 6, [
                                            GObject.TYPE_STRING,  // 0 real key
                                            GObject.TYPE_STRING, // 1 real value 
                                             GObject.TYPE_STRING,  // 2 visable key
                                             GObject.TYPE_STRING, // 3 visable value
                                             GObject.TYPE_STRING, // 4 need to store type of!!!
                                              GObject.TYPE_STRING // 5 tooltip
                                          
                                        ]);
            }
        }

        // userdefined functions 

        // skip activePath - not pipe 

        // skip id - not pipe 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |add - no return type

        // skip |changed - no return type

        // skip |deleteSelected - no return type

        // skip |getIterValue - no return type

        // skip |getType - no return type

        // skip |getValue - no return type

        // skip |init - already used 

        // skip |load - no return type

        // skip |startEditing - no return type

        // skip |toJS - no return type

        // skip |toShort - no return type

        // skip |xns - no return type

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_TreeViewColumn28 : Object 
    {
        public Gtk.TreeViewColumn el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_TreeViewColumn28(Xcls_LeftProps _owner)
        {
            _this = _owner;
            this.el = new Gtk.TreeViewColumn();

            // my vars

            // set gobject values
            this.el.title = "key";
            var child_0 = new Xcls_CellRendererText29(_this);
            child_0.ref();
            this.el.pack_start (  child_0.el  );

            // init method 
            function() {
                XObject.prototype.init.call(this);
            
                this.el.add_attribute(this.items[0].el , 'markup', 2 );
                this.get('/LeftPanel').propertyColumn = this;
            }
        }

        // userdefined functions 

        // skip |xns - no return type

        // skip xtype - not pipe 

        // skip pack - not pipe 

        // skip |init - already used 

        // skip title - already used 

        // skip items - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_CellRendererText29 : Object 
    {
        public Gtk.CellRendererText el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_CellRendererText29(Xcls_LeftProps _owner)
        {
            _this = _owner;
            this.el = new Gtk.CellRendererText();

            // my vars

            // set gobject values

            // listeners 
            this.el.editing_started.connect( function (self, editable, path) {
            
                    this.get('/LeftPanel.model').activePath  = path;
            
            } );
            this.el.edited.connect( function (self, object, p0) {
            	var model = this.get('/LeftPanel.model');
                    var path = model.activePath;
                    var iter = new Gtk.TreeIter();
                    model.el.get_iter(iter, new Gtk.TreePath.from_string(path));
                    model.el.set_value(iter, 0, p0);
                    model.el.set_value(iter, 2, p0);
                    
            	model.activePath = false;
            
            	this.get('/LeftTree.model').changed(model.toJS(), true); 
                    this.el.editable = false;
            } );
        }

        // userdefined functions 

        // skip |xns - no return type

        // skip xtype - not pipe 

        // skip pack - not pipe 

        // skip listeners - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_TreeViewColumn30 : Object 
    {
        public Gtk.TreeViewColumn el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_TreeViewColumn30(Xcls_LeftProps _owner)
        {
            _this = _owner;
            this.el = new Gtk.TreeViewColumn();

            // my vars

            // set gobject values
            this.el.title = "value";
            var child_0 = new Xcls_CellRendererCombo31(_this);
            child_0.ref();
            this.el.pack_start (  child_0.el  );

            // init method 
            function() {
                XObject.prototype.init.call(this);
            	this.el.add_attribute(this.items[0].el , 'text', 3 );
            	this.el.add_attribute(this.items[0].el , 'sensitive', 3 );
            	//this.el.add_attribute(this.items[0].el , 'editable', 3 );
                      // this.el.set_cell_data_func(cell, age_cell_data_func, NULL, NULL);
            
             	this.get('/LeftPanel').editableColumn= this;
            }
        }

        // userdefined functions 

        // skip pack - not pipe 

        // skip title - already used 

        // skip xtype - not pipe 

        // skip |init - already used 

        // skip |setOptions - no return type

        // skip |xns - no return type

        // skip items - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_CellRendererCombo31 : Object 
    {
        public Gtk.CellRendererCombo el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_CellRendererCombo31(Xcls_LeftProps _owner)
        {
            _this = _owner;
            this.el = new Gtk.CellRendererCombo();

            // my vars

            // set gobject values
            this.el.editable = false;
            this.el.has_entry = true;
            this.el.text_column = 0;

            // init method 
            function() {
                XObject.prototype.init.call(this);
               this.el.model = new Gtk.ListStore();
                this.el.model.set_column_types ( 1, [
                    GObject.TYPE_STRING  // 0 real key
                  ]);
            }

            // listeners 
            this.el.edited.connect( function (self, object, p0) {
             	this.get('/LeftPanel').editing = false;
             	var ap = this.get('/LeftPanel.model').activePath
            	print("EDITED? "  + ap + " - p:" + p0 + " t:" + p0);
                    this.get('/LeftPanel.model').changed(p0, true);
                    this.get('/LeftPanel.model').activePath = false;
                    this.el.editable = false;
            } );
            this.el.editing_started.connect( function (self, editable, path) {
               this.get('/LeftPanel').editing  = true;
            	//  console.log('editing started');
                   // r.has_entry = false;
            
                this.el.editable = false; // make sure it's not editor...
               
            } );
        }

        // userdefined functions 

        // skip listeners - not pipe 

        // skip editable - already used 

        // skip pack - not pipe 

        // skip text_column - already used 

        // skip xtype - not pipe 

        // skip |has_entry - already used 

        // skip |init - already used 

        // skip |xns - no return type

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_ContextMenu : Object 
    {
        public Gtk.Menu el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_ContextMenu(Xcls_LeftProps _owner)
        {
            _this = _owner;
            _this.ContextMenu = this;
            this.el = new Gtk.Menu();

            // my vars

            // set gobject values
            var child_0 = new Xcls_MenuItem33(_this);
            child_0.ref();
            this.el.append (  child_0.el  );
            var child_1 = new Xcls_MenuItem34(_this);
            child_1.ref();
            this.el.append (  child_1.el  );
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
    public class Xcls_MenuItem33 : Object 
    {
        public Gtk.MenuItem el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_MenuItem33(Xcls_LeftProps _owner)
        {
            _this = _owner;
            this.el = new Gtk.MenuItem();

            // my vars

            // set gobject values
            this.el.label = "Delete";

            // listeners 
            this.el.activate.connect( function (self) {
            	this.get('/LeftPanel.model').deleteSelected();
            } );
        }

        // userdefined functions 

        // skip |xns - no return type

        // skip xtype - not pipe 

        // skip pack - not pipe 

        // skip label - already used 

        // skip listeners - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_MenuItem34 : Object 
    {
        public Gtk.MenuItem el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_MenuItem34(Xcls_LeftProps _owner)
        {
            _this = _owner;
            this.el = new Gtk.MenuItem();

            // my vars

            // set gobject values
            this.el.label = "Edit";

            // listeners 
            this.el.activate.connect( function (self) {
            	this.get('/LeftPanel.model').startEditing(false, 0);
            } );
        }

        // userdefined functions 

        // skip |xns - no return type

        // skip xtype - not pipe 

        // skip pack - not pipe 

        // skip label - already used 

        // skip listeners - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
}
