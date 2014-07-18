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
    public Xcls_keycol keycol;
    public Xcls_keyrender keyrender;
    public Xcls_valcol valcol;
    public Xcls_valrender valrender;
    public Xcls_ContextMenu ContextMenu;

        // my vars
    public JsRender.JsRender file;
    public JsRender.Node node;
    public bool allow_edit;
    public signal void changed();
    public signal void show_add_props(string type);
    public signal void show_editor(JsRender.JsRender file, JsRender.Node node, string type, string key);

        // ctor 
    public Xcls_LeftProps()
    {
        _this = this;
        WindowLeftProps = this;
        this.el = new Gtk.VBox( false   , 0 );

        // my vars
        this.allow_edit = false;

        // set gobject values
        var child_0 = new Xcls_HBox2( _this );
        child_0.ref();
        this.el.pack_start (  child_0.el , false,true,0 );
        var child_1 = new Xcls_EditProps( _this );
        child_1.ref();
        this.el.pack_end (  child_1.el , true,true,0 );
    }

    // userdefined functions 
    public string keyFormat(string val, string type) {
            
            // Glib.markup_escape_text(val);
        
            if (type == "listener") {
                return "<span font_weight=\"bold\" color=\"#660000\">" + 
                    GLib.Markup.escape_text(val) +
                     "</span>";
            }
            // property..
            if (val.length < 1) {
                return "<span  color=\"#FF0000\">--empty--</span>";
            }
            
            //@ = signal
            //$ = property with 
            //# - object properties
            //* = special
            // all of these... - display value is last element..
            var ar = val.strip().split(" ");
            
            
            var dval = GLib.Markup.escape_text(ar[ar.length-1]);
            
            
            
            
            switch(val[0]) {
                case '@': // signal // just bold balck?
                    if (dval[0] == '@') {
                        dval = dval.substring(1);
                    }
                
                    return @"<span  font_weight=\"bold\">@ $dval</span>";        
                case '#': // object properties?
                    if (dval[0] == '#') {
                        dval = dval.substring(1);
                    }
                    return @"<span  font_weight=\"bold\">$dval</span>";
                case '*': // special
                    if (dval[0] == '*') {
                        dval = dval.substring(1);
                    }
                    return @"<span   color=\"#0000CC\" font_weight=\"bold\">$dval</span>";            
                case '$':
                    if (dval[0] == '$') {
                        dval = dval.substring(1);
                    }
                    return @"<span   style=\"italic\">$dval</span>";
               case '|': // user defined methods
                    if (dval[0] == '|') {
                        dval = dval.substring(1);
                    }
                    return @"<span color=\"#008000\" font_weight=\"bold\">$dval</span>";
                    
                      
                    
                default:
                    return dval;
            }
              
            
        
        }
    public string keySortFormat(string key) {
            // listeners first - with 0
            // specials
            if (key[0] == '*') {
                return "1 " + key;
            }
            // functions
            
            var bits = key.split(" ");
            
            if (key[0] == '|') {
                return "2 " + bits[bits.length -1];
            }
            // signals
            if (key[0] == '@') {
                return "3 " + bits[bits.length -1];
            }
                
            // props
            if (key[0] == '#') {
                return "4 " + bits[bits.length -1];
            }
            // the rest..
            return "5 " + bits[bits.length -1];    
        
        
        
        }
    public void addProp (string type, string key, string value) {
              // info includes key, val, skel, etype..
              //console.dump(info);
                //type = info.type.toLowerCase();
                //var data = this.toJS();
                
         
                    
            if (type == "listener") {
                if (this.node.listeners.has_key(key)) {
                    return;
                }
                this.node.listeners.set(key,value);
            } else  {
            
                if (this.node.props.has_key(key)) {
                    return;
                }
                this.node.props.set(key,value);
            }
                   
              
            // add a row???
            this.load(this.file, this.node);
            
            
            
            /// need to find the row which I've just added..
            
            
            var s = this.view.el.get_selection();
            s.unselect_all();
            
          
            this.model.el.foreach((model, path, iter) => {
                GLib.Value gval;
            
                this.model.el.get_value(iter, 0 , out gval);
                if ((string)gval != type) {
                    return false;
                }
                this.model.el.get_value(iter, 1 , out gval);
                if ((string)gval != key) {
                    return false;
                }
                this.startEditingValue(this.model.el.get_path(iter));
                //s.select_iter(iter);
                return true; 
            });
            
            
            
                      
        }
    public void before_edit()
        {
        
            print("before edit - stop editing\n");
            
          // these do not appear to trigger save...
            _this.keyrender.el.stop_editing(false);
            _this.keyrender.el.editable  =false;
        
            _this.valrender.el.stop_editing(false);
            _this.valrender.el.editable  =false;    
            
            
        // technicall stop the popup editor..
        
        }
    public void deleteSelected () {
            
                    Gtk.TreeIter iter;
                    Gtk.TreeModel mod;
                    
                    var s = this.view.el.get_selection();
                    s.get_selected(out mod, out iter);
                         
                          
                    GLib.Value gval;
                    mod.get_value(iter, 0 , out gval);
                    var type = (string)gval;
                    
                    mod.get_value(iter, 1 , out gval);
                    var key = (string)gval;
                    
                    switch(type) {
                        case "listener":
                            this.node.listeners.remove(key);
                            break;
                            
                        case "prop":
                            this.node.props.remove(key);
                            break;
                    }
                    this.load(this.file, this.node);
                    
                    _this.changed();
        }
    public void finish_editing() {
             // 
            this.before_edit();
        }
    public void load(JsRender.JsRender file, JsRender.Node? node) 
        {
            print("load leftprops\n");
            this.before_edit();
            this.node = node;
            this.file = file;
            
         
            this.model.el.clear();
                      
            //this.get('/RightEditor').el.hide();
            if (node ==null) {
                return ;
            }
             
            
        
            //var provider = this.get('/LeftTree').getPaleteProvider();
            Gtk.TreeIter iter;
            
            //typeof(string),  // 0 key type
             //typeof(string),  // 1 key
             //typeof(string),  // 2 key (display)
             //typeof(string),  // 3 value
             //typeof(string),  // 4 value (display)
             //typeof(string),  // 5 both (tooltip)
            
            
            
            
            // really need a way to sort the hashmap...
            var m = this.model.el;
            
            var miter = node.listeners.map_iterator();
            
            while(miter.next()) {
                m.append(out iter,null);
                
                var dl = miter.get_value().split("\n");
                var dis_val = dl.length > 0 ? (dl[0].strip()+ "...") : "";
                
                m.set(iter, 
                        0, "listener",
                    1, miter.get_key(),
                    2, this.keyFormat(miter.get_key() , "listener"),
                    3, miter.get_value(),
                    4, dis_val,
                    5, "<tt>" +  GLib.Markup.escape_text(miter.get_key() + " " + miter.get_value()) + "</tt>",
                    6,  "0 " + miter.get_key()
                ); 
             }
             
              
            miter = node.props.map_iterator();
            
            
           while(miter.next()) {
                m.append(out iter,null);
                var dl = miter.get_value().split("\n");
                var dis_val = dl.length > 0 ? dl[0] : "";
        
                m.set(iter, 
                        0, "props",
                        1, miter.get_key(),
                        2,  this.keyFormat(miter.get_key() , "prop"),
                        3, miter.get_value(),
                        4, dis_val,
                         5, "<tt>" + GLib.Markup.escape_text(miter.get_key() + " " + miter.get_value()) + "</tt>",
                         6,  this.keySortFormat(miter.get_key())
                    ); 
           }
           print("clear selection\n");
           // clear selection?
           this.model.el.set_sort_column_id(6,Gtk.SortType.ASCENDING); // sort by real key..
           
           this.view.el.get_selection().unselect_all();
           
           
           
        }
    public void startEditingKey( Gtk.TreePath path) {
            
             
            
          
            // others... - fill in options for true/false?
            
               
            GLib.Timeout.add_full(GLib.Priority.DEFAULT,10 , () => {
                this.allow_edit  = true;
                this.keyrender.el.editable = true;
                this.keycol.el.clear_attributes(this.keyrender.el);
                this.keycol.el.add_attribute(this.keyrender.el, "text", 1);
                this.view.el.set_cursor_on_cell(
                    path,
                    this.keycol.el,
                    this.keyrender.el,
                    true
                );
                this.keycol.el.add_attribute(this.keyrender.el, "markup", 2);        
                return false;
            });
              
            
        }
    public void startEditingValue( Gtk.TreePath path) {
                    
                     
                    
                    Gtk.TreeIter iter;
        
                    var mod = this.model.el;
                    mod.get_iter (out iter, path);
                     
                    /*
                        m.set(iter, 
                                0, "listener",
                                1, miter.get_key(),
                                2, "<b>" + miter.get_key() + "</b>",
                                3, miter.get_value()
                            ); 
                     
                    */
                    GLib.Value gval;
                    mod.get_value(iter, 3 , out gval);
                    var val = (string)gval;
                
                    mod.get_value(iter, 1 , out gval);
                    var key = (string)gval;
                    
                    mod.get_value(iter, 0 , out gval);
                    var type = (string)gval;
                    
                    var use_textarea = false;
                    
                    if (type == "listener") {
                        use_textarea = true;
                    }
                    if (key.length > 0 && key[0] == '|') {
                        use_textarea = true;
                    }
                    if (use_textarea) {
                        print("Call show editor\n");
                        GLib.Timeout.add_full(GLib.Priority.DEFAULT,10 , () => {
                            this.view.el.get_selection().select_path(path);
                            return false;
                        });
                        this.show_editor(file, node, type, key);
                        
                        return;
                    }
                    // others... - fill in options for true/false?
                   print("turn on editing %s \n" , mod.get_path(iter).to_string());
                    
                    GLib.Timeout.add_full(GLib.Priority.DEFAULT,10 , () => {
                        this.allow_edit  = true;
                        this.valrender.el.editable = true;
                        this.view.el.set_cursor_on_cell(
                            path,
                            this.valcol.el,
                            this.valrender.el,
                            true
                        );
                        return false;
                    });
                    
                }

    // skip |xns - no return type
    public class Xcls_HBox2 : Object 
    {
        public Gtk.HBox el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_HBox2(Xcls_LeftProps _owner )
        {
            _this = _owner;
            this.el = new Gtk.HBox( true, 0 );

            // my vars

            // set gobject values
            var child_0 = new Xcls_Button3( _this );
            child_0.ref();
            this.el.add (  child_0.el  );
            var child_1 = new Xcls_Button7( _this );
            child_1.ref();
            this.el.add (  child_1.el  );
            var child_2 = new Xcls_Button11( _this );
            child_2.ref();
            this.el.add (  child_2.el  );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_Button3 : Object 
    {
        public Gtk.Button el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_Button3(Xcls_LeftProps _owner )
        {
            _this = _owner;
            this.el = new Gtk.Button();

            // my vars

            // set gobject values
            var child_0 = new Xcls_HBox4( _this );
            child_0.ref();
            this.el.add (  child_0.el  );

            // listeners 
            this.el.button_press_event.connect(  ( event ) => {
                _this.show_add_props("prop");
                return false;
            } );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_HBox4 : Object 
    {
        public Gtk.HBox el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_HBox4(Xcls_LeftProps _owner )
        {
            _this = _owner;
            this.el = new Gtk.HBox( true, 0 );

            // my vars

            // set gobject values
            var child_0 = new Xcls_Image5( _this );
            child_0.ref();
            this.el.add (  child_0.el  );
            var child_1 = new Xcls_Label6( _this );
            child_1.ref();
            this.el.add (  child_1.el  );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_Image5 : Object 
    {
        public Gtk.Image el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_Image5(Xcls_LeftProps _owner )
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
    }
    public class Xcls_Label6 : Object 
    {
        public Gtk.Label el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_Label6(Xcls_LeftProps _owner )
        {
            _this = _owner;
            this.el = new Gtk.Label( "Property" );

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_Button7 : Object 
    {
        public Gtk.Button el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_Button7(Xcls_LeftProps _owner )
        {
            _this = _owner;
            this.el = new Gtk.Button();

            // my vars

            // set gobject values
            var child_0 = new Xcls_HBox8( _this );
            child_0.ref();
            this.el.add (  child_0.el  );

            // listeners 
            this.el.button_press_event.connect(   ( event)  => {
                
            // 	if (!this.get('/Editor').save()) {
            // 	    // popup!! - click handled.. 
            // 	    return true;
            //        }
                _this.show_add_props("listener");
                return false;
            } );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_HBox8 : Object 
    {
        public Gtk.HBox el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_HBox8(Xcls_LeftProps _owner )
        {
            _this = _owner;
            this.el = new Gtk.HBox( true, 0 );

            // my vars

            // set gobject values
            var child_0 = new Xcls_Image9( _this );
            child_0.ref();
            this.el.add (  child_0.el  );
            var child_1 = new Xcls_Label10( _this );
            child_1.ref();
            this.el.add (  child_1.el  );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_Image9 : Object 
    {
        public Gtk.Image el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_Image9(Xcls_LeftProps _owner )
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
    }
    public class Xcls_Label10 : Object 
    {
        public Gtk.Label el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_Label10(Xcls_LeftProps _owner )
        {
            _this = _owner;
            this.el = new Gtk.Label( "Handler" );

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_Button11 : Object 
    {
        public Gtk.Button el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_Button11(Xcls_LeftProps _owner )
        {
            _this = _owner;
            this.el = new Gtk.Button();

            // my vars

            // set gobject values
            var child_0 = new Xcls_HBox12( _this );
            child_0.ref();
            this.el.add (  child_0.el  );
            var child_1 = new Xcls_AddPropertyPopup( _this );
            child_1.ref();

            // listeners 
            this.el.button_press_event.connect(   (self, ev) => {
                _this.before_edit();
                
                    
                var p = _this.AddPropertyPopup;
                p.el.set_screen(Gdk.Screen.get_default());
                p.el.show_all();
                 p.el.popup(null, null, null, ev.button, ev.time);
                 return true;
            } );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_HBox12 : Object 
    {
        public Gtk.HBox el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_HBox12(Xcls_LeftProps _owner )
        {
            _this = _owner;
            this.el = new Gtk.HBox( true, 0 );

            // my vars

            // set gobject values
            var child_0 = new Xcls_Image13( _this );
            child_0.ref();
            this.el.add (  child_0.el  );
            var child_1 = new Xcls_Label14( _this );
            child_1.ref();
            this.el.add (  child_1.el  );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_Image13 : Object 
    {
        public Gtk.Image el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_Image13(Xcls_LeftProps _owner )
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
    }
    public class Xcls_Label14 : Object 
    {
        public Gtk.Label el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_Label14(Xcls_LeftProps _owner )
        {
            _this = _owner;
            this.el = new Gtk.Label( "Other" );

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_AddPropertyPopup : Object 
    {
        public Gtk.Menu el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_AddPropertyPopup(Xcls_LeftProps _owner )
        {
            _this = _owner;
            _this.AddPropertyPopup = this;
            this.el = new Gtk.Menu();

            // my vars

            // set gobject values
            var child_0 = new Xcls_MenuItem16( _this );
            child_0.ref();
            this.el.append (  child_0.el  );
            var child_1 = new Xcls_MenuItem17( _this );
            child_1.ref();
            this.el.append (  child_1.el  );
            var child_2 = new Xcls_MenuItem18( _this );
            child_2.ref();
            this.el.append (  child_2.el  );
            var child_3 = new Xcls_SeparatorMenuItem19( _this );
            child_3.ref();
            this.el.add (  child_3.el  );
            var child_4 = new Xcls_MenuItem20( _this );
            child_4.ref();
            this.el.append (  child_4.el  );
            var child_5 = new Xcls_MenuItem21( _this );
            child_5.ref();
            this.el.append (  child_5.el  );
            var child_6 = new Xcls_MenuItem22( _this );
            child_6.ref();
            this.el.append (  child_6.el  );
            var child_7 = new Xcls_SeparatorMenuItem23( _this );
            child_7.ref();
            this.el.add (  child_7.el  );
            var child_8 = new Xcls_MenuItem24( _this );
            child_8.ref();
            this.el.append (  child_8.el  );
            var child_9 = new Xcls_MenuItem25( _this );
            child_9.ref();
            this.el.append (  child_9.el  );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_MenuItem16 : Object 
    {
        public Gtk.MenuItem el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_MenuItem16(Xcls_LeftProps _owner )
        {
            _this = _owner;
            this.el = new Gtk.MenuItem();

            // my vars

            // set gobject values
            this.el.label = "ID";
            this.el.tooltip_markup = "Using this.get('*someid') will find any id in an application.";

            // listeners 
            this.el.activate.connect(  ()  => {
                _this.addProp( "prop", ".string:id", "");
            } );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_MenuItem17 : Object 
    {
        public Gtk.MenuItem el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_MenuItem17(Xcls_LeftProps _owner )
        {
            _this = _owner;
            this.el = new Gtk.MenuItem();

            // my vars

            // set gobject values
            this.el.label = "PACK";
            this.el.tooltip_markup = "Add what type of packing is to be used";

            // listeners 
            this.el.activate.connect(   ( ) => {
            
                _this.addProp( "prop", "*pack","add");
            } );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_MenuItem18 : Object 
    {
        public Gtk.MenuItem el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_MenuItem18(Xcls_LeftProps _owner )
        {
            _this = _owner;
            this.el = new Gtk.MenuItem();

            // my vars

            // set gobject values
            this.el.label = "INIT";
            this.el.tooltip_markup = "Override the init method";

            // listeners 
            this.el.activate.connect(   ( ) => {
            
                _this.addProp( "prop",  "|init", "{\n\n}\n" );
            } );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_SeparatorMenuItem19 : Object 
    {
        public Gtk.SeparatorMenuItem el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_SeparatorMenuItem19(Xcls_LeftProps _owner )
        {
            _this = _owner;
            this.el = new Gtk.SeparatorMenuItem();

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_MenuItem20 : Object 
    {
        public Gtk.MenuItem el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_MenuItem20(Xcls_LeftProps _owner )
        {
            _this = _owner;
            this.el = new Gtk.MenuItem();

            // my vars

            // set gobject values
            this.el.label = "String";
            this.el.tooltip_markup = "Add a user defined string property";

            // listeners 
            this.el.activate.connect(   (self) => {
            
                _this.addProp( "prop", ".string:XXXX", "");
            
            } );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_MenuItem21 : Object 
    {
        public Gtk.MenuItem el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_MenuItem21(Xcls_LeftProps _owner )
        {
            _this = _owner;
            this.el = new Gtk.MenuItem();

            // my vars

            // set gobject values
            this.el.label = "Number";
            this.el.tooltip_markup = "Add a user defined number property";

            // listeners 
            this.el.activate.connect(   ( ) =>{
            
                _this.addProp("prop",  ".int:XXX", "0");
            } );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_MenuItem22 : Object 
    {
        public Gtk.MenuItem el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_MenuItem22(Xcls_LeftProps _owner )
        {
            _this = _owner;
            this.el = new Gtk.MenuItem();

            // my vars

            // set gobject values
            this.el.label = "Boolean";
            this.el.tooltip_markup = "Add a user defined boolean property";

            // listeners 
            this.el.activate.connect(   ( ) =>{
            
                _this.addProp( "prop", ".bool:XXX", "true");
            } );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_SeparatorMenuItem23 : Object 
    {
        public Gtk.SeparatorMenuItem el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_SeparatorMenuItem23(Xcls_LeftProps _owner )
        {
            _this = _owner;
            this.el = new Gtk.SeparatorMenuItem();

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_MenuItem24 : Object 
    {
        public Gtk.MenuItem el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_MenuItem24(Xcls_LeftProps _owner )
        {
            _this = _owner;
            this.el = new Gtk.MenuItem();

            // my vars

            // set gobject values
            this.el.label = "Javascript Function";
            this.el.tooltip_markup = "Add a user function boolean property";

            // listeners 
            this.el.activate.connect(   ( ) =>{
            
                _this.addProp("prop",  "|XXXX", "function() { }");
            } );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_MenuItem25 : Object 
    {
        public Gtk.MenuItem el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_MenuItem25(Xcls_LeftProps _owner )
        {
            _this = _owner;
            this.el = new Gtk.MenuItem();

            // my vars

            // set gobject values
            this.el.label = "Vala Method";
            this.el.tooltip_markup = "Add a user function boolean property";

            // listeners 
            this.el.activate.connect(   ( ) =>{
            
                _this.addProp( "prop", "|.type:return_type:XXXX", "() {\n\n}\n");
            } );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_EditProps : Object 
    {
        public Gtk.ScrolledWindow el;
        private Xcls_LeftProps  _this;


            // my vars
        public bool editing;

            // ctor 
        public Xcls_EditProps(Xcls_LeftProps _owner )
        {
            _this = _owner;
            _this.EditProps = this;
            this.el = new Gtk.ScrolledWindow( null, null );

            // my vars
            this.editing = false;

            // set gobject values
            this.el.shadow_type = Gtk.ShadowType.IN;
            var child_0 = new Xcls_view( _this );
            child_0.ref();
            this.el.add (  child_0.el  );
            var child_1 = new Xcls_ContextMenu( _this );
            child_1.ref();

            // init method 
              {
              
               this.el.set_policy (Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC);
            }
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_view : Object 
    {
        public Gtk.TreeView el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_view(Xcls_LeftProps _owner )
        {
            _this = _owner;
            _this.view = this;
            this.el = new Gtk.TreeView();

            // my vars

            // set gobject values
            this.el.enable_tree_lines = true;
            this.el.headers_visible = false;
            this.el.tooltip_column = 5;
            var child_0 = new Xcls_model( _this );
            child_0.ref();
            this.el.set_model (  child_0.el  );
            var child_1 = new Xcls_keycol( _this );
            child_1.ref();
            this.el.append_column (  child_1.el  );
            var child_2 = new Xcls_valcol( _this );
            child_2.ref();
            this.el.append_column (  child_2.el  );

            // init method 
            {
                var selection = this.el.get_selection();
                selection.set_mode( Gtk.SelectionMode.SINGLE);
            
            
                var description = new Pango.FontDescription();
                description.set_size(8000);
                this.el.modify_font(description);
            }

            // listeners 
            this.el.button_press_event.connect(   ( ev)  => {
            
                _this.before_edit();
                
                Gtk.TreeViewColumn col;
                int cell_x;
                int cell_y;
                Gtk.TreePath path;
                if (!this.el.get_path_at_pos((int)ev.x, (int) ev.y, out path, out col, out cell_x, out cell_y )) {
                    print("nothing selected on click");
                    GLib.Timeout.add_full(GLib.Priority.DEFAULT,10 , () => {
                        this.el.get_selection().unselect_all();
                        return false;
                    });
                    return false; //not on a element.
                }
                
                 // right click.
                 if (ev.type == Gdk.EventType.BUTTON_PRESS  && ev.button == 3) {    
                    // show popup!.   
                    if (col.title == "value") {
                        return false;
                    }
            
                    var p = _this.ContextMenu;
            
                    p.el.set_screen(Gdk.Screen.get_default());
                    p.el.show_all();
                    p.el.popup(null, null, null,  ev.button, ev.time);
                    //Seed.print("click:" + res.column.title);
                    // select the 
                    GLib.Timeout.add_full(GLib.Priority.DEFAULT,10 , () => {
              
                        this.el.get_selection().select_path(path);
                        return false;
                    });
                    
                    return false;
                }
                
                 
                if (col.title != "value") {
                    print("col title != value");
                    
                    GLib.Timeout.add_full(GLib.Priority.DEFAULT,10 , () => {
                        this.el.get_selection().select_path(path);
                        return false;
                    });
                    
                    
                      //  XObject.error("column is not value?");
                    return false; // ignore.. - key click.. ??? should we do this??
                }
                
                // currently editing???
            //    if (  this.activePath) {
                    
                 //   this.activePath = false;
                   // stop editing!!!!
                 /*
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
                    */
                    
                    //this.EditProps.editableColumn.items[0].el.stop_editing();
                    //this.EditProps.editing = false;
                
                //    XObject.error("Currently editing?");
                 //   return false;
               // }
                
               // var renderer = this.valrender.el; // set has_entry..
                
                //var type = this.get('/LeftPanel.model').getType(res.path.to_string());
                    
                // get options for this type -- this is to support option lists etc..
                //var provider = this.get('/LeftTree').getPaleteProvider();
                //var opts = provider.findOptions(type);
                
            //    if (opts === false) {
                    // it's text etnry
            //         this.get('/LeftPanel').editableColumn.setOptions([]);
            //        renderer.has_entry = true;
            //    } else {
            //         this.get('/LeftPanel').editableColumn.setOptions(opts);
            //        renderer.has_entry = false;
            //    }
            
                // we need to set the selected row..
                
                 //Gtk.TreePath path;
            
                 ;
                 
                _this.startEditingValue(path); // assumes selected row..
                    
               //Seed.print("click" + ev.type);
                //console.dump(res);
                return false;
            
                          
               
            } );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_model : Object 
    {
        public Gtk.TreeStore el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_model(Xcls_LeftProps _owner )
        {
            _this = _owner;
            _this.model = this;
            this.el = new Gtk.TreeStore( 7,      typeof(string),  // 0 key type
     typeof(string),  // 1 key
     typeof(string),  // 2 key (display)
     typeof(string),  // 3 value
     typeof(string),   // 4 value (display)
     typeof(string),   // 5 both (tooltip)     
     typeof(string)   // 6 key (for sorting)
 );

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip |changed - no return type

        // skip |toShort - no return type

        // skip |xns - no return type
    }
    public class Xcls_keycol : Object 
    {
        public Gtk.TreeViewColumn el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_keycol(Xcls_LeftProps _owner )
        {
            _this = _owner;
            _this.keycol = this;
            this.el = new Gtk.TreeViewColumn();

            // my vars

            // set gobject values
            this.el.title = "key";
            var child_0 = new Xcls_keyrender( _this );
            child_0.ref();
            this.el.pack_start (  child_0.el , false );

            // init method 
             this.el.add_attribute(_this.keyrender.el , "markup", 2 );
             this.el.add_attribute(_this.keyrender.el , "text", 1 );
              
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_keyrender : Object 
    {
        public Gtk.CellRendererText el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_keyrender(Xcls_LeftProps _owner )
        {
            _this = _owner;
            _this.keyrender = this;
            this.el = new Gtk.CellRendererText();

            // my vars

            // set gobject values

            // listeners 
            this.el.editing_started.connect( (  editable, path) => {
            
                 //   this.get('/LeftPanel.model').activePath  = path;
            
            } );
            this.el.edited.connect(   (path, newtext) => {
                    print("Keyrender  - signal:edited\n");
                
                this.el.editable = false;
              
            /*
             m.set(iter, 
                            0, "listener",
                            1, miter.get_key(),
                            2, "<b>" + miter.get_key() + "</b>",
                            3, miter.get_value()
                        ); 
            
              */      
            
                    Gtk.TreeIter  iter;
                    _this.model.el.get_iter(out iter, new Gtk.TreePath.from_string(path));
                    GLib.Value gval;
                    
                     _this.model.el.get_value(iter,1, out gval);
                    var oldval = (string)gval;
                    
                     _this.model.el.get_value(iter,0, out gval);
                    var ktype = (string)gval;
                   
                    _this.model.el.set_value(iter, 1, newtext);
                    
                    
                    switch(ktype) {
                        case "listener":
                            _this.node.listeners.set(newtext, _this.node.listeners.get(oldval));
                            _this.node.listeners.remove(oldval);
                            break;
                        case "prop":
                            _this.node.props.set(newtext, _this.node.props.get(oldval));
                            _this.node.props.remove(oldval);
                            break;
                     }
                     _this.changed();
                      
            } );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_valcol : Object 
    {
        public Gtk.TreeViewColumn el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_valcol(Xcls_LeftProps _owner )
        {
            _this = _owner;
            _this.valcol = this;
            this.el = new Gtk.TreeViewColumn();

            // my vars

            // set gobject values
            this.el.title = "value";
            var child_0 = new Xcls_valrender( _this );
            child_0.ref();
            this.el.pack_start (  child_0.el , true );

            // init method 
            {
            	
            	//     typeof(string),  // 0 key type
                // typeof(string),  // 1 key
                // typeof(string),  // 2 key (display)
                // typeof(string),  // 3 value
                // typeof(string)   // 4 value (display)
            
            	
            	this.el.add_attribute(_this.valrender.el , "text", 4 );
            	//this.el.add_attribute(_this.valrender.el , "sensitive", 4 );
            	//this.el.add_attribute(this.items[0].el , 'editable', 3 );
                      // this.el.set_cell_data_func(cell, age_cell_data_func, NULL, NULL);
            
             //	this.get('/LeftPanel').editableColumn= this;
            }
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_valrender : Object 
    {
        public Gtk.CellRendererCombo el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_valrender(Xcls_LeftProps _owner )
        {
            _this = _owner;
            _this.valrender = this;
            this.el = new Gtk.CellRendererCombo();

            // my vars

            // set gobject values
            this.el.editable = false;
            this.el.has_entry = true;
            this.el.text_column = 0;
            var child_0 = new Xcls_ListStore33( _this );
            child_0.ref();
            this.el.model = child_0.el;

            // listeners 
            this.el.edited.connect(   (path, newtext) => {
                print("Valrender  - signal:edited\n");
              
                    this.el.editable = false;
            /*  
             m.set(iter, 
                            0, "listener",
                            1, miter.get_key(),
                            2, "<b>" + miter.get_key() + "</b>",
                            3, miter.get_value(),
                            4, display_value(short);
                        ); 
            
              */      
            
                    Gtk.TreeIter  iter;
                    _this.model.el.get_iter(out iter, new Gtk.TreePath.from_string(path));
                    GLib.Value gval;
                    
                     _this.model.el.get_value(iter,0, out gval);
                    var ktype = (string)gval;
                    
                    
                     _this.model.el.get_value(iter,3, out gval);
                    var oldval = (string)gval;
                    
                     _this.model.el.get_value(iter,1, out gval);
                    var key = (string)gval;
                    
                     
                    
                    switch(ktype) {
                        case "listener":
                            _this.node.listeners.set(key, newtext);
                            break;
                        case "prop":
                            _this.node.props.set(key,newtext);
                            break;
                     }
                     _this.load(_this.file,_this.node);
                     _this.changed();
                      
            } );
            this.el.editing_started.connect( ( editable, path) => {
                //_this.editing = true;
                if (_this.allow_edit) {
                    _this.allow_edit =false;
                    return;
                }
                print("val - editing_Started\n");
                this.el.editable = false; // make sure it's not editor...
               
            } );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_ListStore33 : Object 
    {
        public Gtk.ListStore el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_ListStore33(Xcls_LeftProps _owner )
        {
            _this = _owner;
            this.el = new Gtk.ListStore( 1, typeof(string) );

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_ContextMenu : Object 
    {
        public Gtk.Menu el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_ContextMenu(Xcls_LeftProps _owner )
        {
            _this = _owner;
            _this.ContextMenu = this;
            this.el = new Gtk.Menu();

            // my vars

            // set gobject values
            var child_0 = new Xcls_MenuItem35( _this );
            child_0.ref();
            this.el.append (  child_0.el  );
            var child_1 = new Xcls_SeparatorMenuItem36( _this );
            child_1.ref();
            this.el.append (  child_1.el  );
            var child_2 = new Xcls_MenuItem37( _this );
            child_2.ref();
            this.el.append (  child_2.el  );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_MenuItem35 : Object 
    {
        public Gtk.MenuItem el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_MenuItem35(Xcls_LeftProps _owner )
        {
            _this = _owner;
            this.el = new Gtk.MenuItem();

            // my vars

            // set gobject values
            this.el.label = "Edit";

            // listeners 
            this.el.activate.connect(   ( )  =>{
              
                var s = _this.view.el.get_selection();
                Gtk.TreeIter iter;
                Gtk.TreeModel model;
                s.get_selected (out  model, out  iter);
                _this.startEditingKey(model.get_path(iter));
            } );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_SeparatorMenuItem36 : Object 
    {
        public Gtk.SeparatorMenuItem el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_SeparatorMenuItem36(Xcls_LeftProps _owner )
        {
            _this = _owner;
            this.el = new Gtk.SeparatorMenuItem();

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_MenuItem37 : Object 
    {
        public Gtk.MenuItem el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_MenuItem37(Xcls_LeftProps _owner )
        {
            _this = _owner;
            this.el = new Gtk.MenuItem();

            // my vars

            // set gobject values
            this.el.label = "Delete";

            // listeners 
            this.el.activate.connect(   ( )  =>{
            	_this.deleteSelected();
            } );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
}
