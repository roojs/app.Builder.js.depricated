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

    public static Xcls_LeftProps singleton()
    {
        if (WindowLeftProps == null) {
            WindowLeftProps= new Xcls_LeftProps();
        }
        return WindowLeftProps;
    }
    public Xcls_AddPropertyPopup AddPropertyPopup;
    public Xcls_EditProps EditProps;
    public Xcls_view view;
    public Xcls_model model;
    public Xcls_keycol keycol;
    public Xcls_keyrender keyrender;
    public Xcls_valcol valcol;
    public Xcls_valrender valrender;
    public Xcls_valrendermodel valrendermodel;
    public Xcls_ContextMenu ContextMenu;

        // my vars
    public JsRender.JsRender file;
    public JsRender.Node node;
    public bool allow_edit;
    public signal bool stop_editor();
    public signal void changed();
    public signal void show_add_props(string type);
    public signal void show_editor(JsRender.JsRender file, JsRender.Node node, string type, string key);

        // ctor 
    public Xcls_LeftProps()
    {
        _this = this;
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
    public void addProp (string in_type, string key, string value, string value_type) {
              // info includes key, val, skel, etype..
              //console.dump(info);
                //type = info.type.toLowerCase();
                //var data = this.toJS();
                
            var type = in_type == "signals" ? "listener" : in_type;
            
            var fkey = (value_type.length > 0 ? value_type + " " : "") + key;
                    
            if (type == "listener") {
                if (this.node.listeners.has_key(key)) {
                    return;
                }
                this.node.listeners.set(key,value);
            } else  {
            
                if (this.node.props.has_key(fkey)) {
                    return;
                }
                this.node.props.set(fkey,value);
            }
                   
              
            // add a row???
            this.load(this.file, this.node);
            
            
            
            /// need to find the row which I've just added..
            
            
            var s = this.view.el.get_selection();
            s.unselect_all();
            
            print("trying to find new iter");
          
            this.model.el.foreach((model, path, iter) => {
                GLib.Value gval;
            
                this.model.el.get_value(iter, 0 , out gval);
                if ((string)gval != type) {
                    print("not type: %s = %s\n", (string)gval , type);
                    return false;
                }
                this.model.el.get_value(iter, 1 , out gval);
                if ((string)gval != fkey) {
                    print("not key: %s = %s\n", (string)gval , fkey);
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
                        
                    case "props":
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
                
                this.updateIter(iter,  "listener", miter.get_key(), miter.get_value());
                
                 
             }
             
              
            miter = node.props.map_iterator();
            
            
           while(miter.next()) {
                m.append(out iter,null);
                 this.updateIter(iter,  "prop", miter.get_key(), miter.get_value());
                 
           }
           print("clear selection\n");
           // clear selection?
           this.model.el.set_sort_column_id(6,Gtk.SortType.ASCENDING); // sort by real key..
           
           this.view.el.get_selection().unselect_all();
           
           
           
        }
    public void startEditingKey( Gtk.TreePath path) {
            
             if (!this.stop_editor()) {
                return;
             }
          
            // others... - fill in options for true/false?
            
               
            GLib.Timeout.add_full(GLib.Priority.DEFAULT,10 , () => {
                this.allow_edit  = true;
                this.keyrender.el.editable = true;
             
                this.view.el.set_cursor_on_cell(
                    path,
                    this.keycol.el,
                    this.keyrender.el,
                    true
                );
                       
                return false;
            });
              
            
        }
    public void startEditingValue( Gtk.TreePath path) {
                    print("start editing?\n");
                    if (!this.stop_editor()) {
                        print("stop editor failed\n");
                        return;
                    }
                    
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
                    var type_ar = key.split(" ");
                    
                    
                    
                    mod.get_value(iter, 0 , out gval);
                    var type = (string)gval;
                    
                   
                    
                    var use_textarea = false;
                    
                    if (type == "listener") {
                        use_textarea = true;
                    }
                    if (key.length > 0 && key[0] == '$') {
                        use_textarea = true;
                    }
                    if (use_textarea) {
                        print("Call show editor\n");
                        GLib.Timeout.add_full(GLib.Priority.DEFAULT,10 , () => {
                            this.view.el.get_selection().select_path(path);
                            
                            this.show_editor(file, node, type, key);
                            
                            return false;
                        });
                       
                        
                        return;
                    }

			 // if its' a combo... then show the options..
			
		                       
		        print (type_ar[0].up());

			if (type_ar.length > 1 && (
		                type_ar[0].up() == "BOOLEAN"
		                ||
		                type_ar[0].up() == "BOOL"                        
		            )) {
				this.allow_edit  = true;
				
		                print("start editing try/false)???");
		                this.valrender.el.has_entry = false;
		                string[] opts =  { "true", "false" };
		                this.valrender.setOptions(opts);
		                this.valrender.el.has_entry = false;
				this.valrender.el.editable = false;
				return;
		            }
	        
	    this.valrender.el.has_entry = false;
                    // others... - fill in options for true/false?
                   print("turn on editing %s \n" , mod.get_path(iter).to_string());
                    
                    GLib.Timeout.add_full(GLib.Priority.DEFAULT,10 , () => {
                        
                        // at this point - work out the type...
                        this.valrender.el.has_entry = true;
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
    public void updateIter(Gtk.TreeIter iter,  string type, string key, string value) {
        
            print("update Iter %s, %s\n", key,value);
            //typeof(string),  // 0 key type
             //typeof(string),  // 1 key
             //typeof(string),  // 2 key (display)
             //typeof(string),  // 3 value
             //typeof(string),  // 4 value (display)
             //typeof(string),  // 5 both (tooltip)
             //typeof(string),  // 6 key (sort)
            
            var dl = value.strip().split("\n");
        
            var dis_val = dl.length > 1 ? (dl[0].strip()+ "...") : dl[0];
            
            if (type == "listener") {
             
               
                
                this.model.el.set(iter, 
                        0, type,
                    1, key,
                    2, this.keyFormat(key ,type),
                    3, value,
                    4, dis_val,
                    5, "<tt>" +  GLib.Markup.escape_text(key + " " +value) + "</tt>",
                    6,  "0 " + key
                ); 
                return;
            }
            
        
        
            this.model.el.set(iter, 
                    0, "props",
                    1, key,
                    2,  this.keyFormat(key , "prop"),
                    3, value,
                    4, dis_val,
                     5, "<tt>" + GLib.Markup.escape_text(key + " " + value) + "</tt>",
                     6,  this.keySortFormat(key)
                ); 
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
            var child_0 = new Xcls_MenuItem8( _this );
            child_0.ref();
            this.el.append (  child_0.el  );
            var child_1 = new Xcls_MenuItem9( _this );
            child_1.ref();
            this.el.append (  child_1.el  );
            var child_2 = new Xcls_MenuItem10( _this );
            child_2.ref();
            this.el.append (  child_2.el  );
            var child_3 = new Xcls_SeparatorMenuItem11( _this );
            child_3.ref();
            this.el.add (  child_3.el  );
            var child_4 = new Xcls_MenuItem12( _this );
            child_4.ref();
            this.el.append (  child_4.el  );
            var child_5 = new Xcls_MenuItem13( _this );
            child_5.ref();
            this.el.append (  child_5.el  );
            var child_6 = new Xcls_MenuItem14( _this );
            child_6.ref();
            this.el.append (  child_6.el  );
            var child_7 = new Xcls_SeparatorMenuItem15( _this );
            child_7.ref();
            this.el.add (  child_7.el  );
            var child_8 = new Xcls_MenuItem16( _this );
            child_8.ref();
            this.el.append (  child_8.el  );
            var child_9 = new Xcls_MenuItem17( _this );
            child_9.ref();
            this.el.append (  child_9.el  );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_MenuItem8 : Object 
    {
        public Gtk.MenuItem el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_MenuItem8(Xcls_LeftProps _owner )
        {
            _this = _owner;
            this.el = new Gtk.MenuItem();

            // my vars

            // set gobject values
            this.el.label = "ID";
            this.el.tooltip_markup = "Using this.get('*someid') will find any id in an application.";

            // listeners 
            this.el.activate.connect(  ()  => {
                _this.addProp( "prop", "id", "", "string");
            } );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_MenuItem9 : Object 
    {
        public Gtk.MenuItem el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_MenuItem9(Xcls_LeftProps _owner )
        {
            _this = _owner;
            this.el = new Gtk.MenuItem();

            // my vars

            // set gobject values
            this.el.label = "PACK";
            this.el.tooltip_markup = "Add what type of packing is to be used";

            // listeners 
            this.el.activate.connect(   ( ) => {
            
                _this.addProp( "prop", "pack","add", "*");
            } );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_MenuItem10 : Object 
    {
        public Gtk.MenuItem el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_MenuItem10(Xcls_LeftProps _owner )
        {
            _this = _owner;
            this.el = new Gtk.MenuItem();

            // my vars

            // set gobject values
            this.el.label = "INIT";
            this.el.tooltip_markup = "Override the init method";

            // listeners 
            this.el.activate.connect(   ( ) => {
            
                _this.addProp( "prop",  "init", "{\n\n}\n", "*" );
            } );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_SeparatorMenuItem11 : Object 
    {
        public Gtk.SeparatorMenuItem el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_SeparatorMenuItem11(Xcls_LeftProps _owner )
        {
            _this = _owner;
            this.el = new Gtk.SeparatorMenuItem();

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_MenuItem12 : Object 
    {
        public Gtk.MenuItem el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_MenuItem12(Xcls_LeftProps _owner )
        {
            _this = _owner;
            this.el = new Gtk.MenuItem();

            // my vars

            // set gobject values
            this.el.label = "String";
            this.el.tooltip_markup = "Add a user defined string property";

            // listeners 
            this.el.activate.connect(   (self) => {
            
                _this.addProp( "prop", "XXXX", "","string");
            
            } );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_MenuItem13 : Object 
    {
        public Gtk.MenuItem el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_MenuItem13(Xcls_LeftProps _owner )
        {
            _this = _owner;
            this.el = new Gtk.MenuItem();

            // my vars

            // set gobject values
            this.el.label = "Number";
            this.el.tooltip_markup = "Add a user defined number property";

            // listeners 
            this.el.activate.connect(   ( ) =>{
            
                _this.addProp("prop",  "XXX", "0", "int");
            } );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_MenuItem14 : Object 
    {
        public Gtk.MenuItem el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_MenuItem14(Xcls_LeftProps _owner )
        {
            _this = _owner;
            this.el = new Gtk.MenuItem();

            // my vars

            // set gobject values
            this.el.label = "Boolean";
            this.el.tooltip_markup = "Add a user defined boolean property";

            // listeners 
            this.el.activate.connect(   ( ) =>{
            
                _this.addProp( "prop", "XXX", "true", "bool");
            } );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_SeparatorMenuItem15 : Object 
    {
        public Gtk.SeparatorMenuItem el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_SeparatorMenuItem15(Xcls_LeftProps _owner )
        {
            _this = _owner;
            this.el = new Gtk.SeparatorMenuItem();

            // my vars

            // set gobject values
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
            this.el.label = "Javascript Function";
            this.el.tooltip_markup = "Add a user function boolean property";

            // listeners 
            this.el.activate.connect(   ( ) =>{
            
                _this.addProp("prop",  "XXXX", "function() { }", "| function");
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
            this.el.label = "Vala Method";
            this.el.tooltip_markup = "Add a user function boolean property";

            // listeners 
            this.el.activate.connect(   ( ) =>{
            
                _this.addProp( "prop", "XXXX", "() {\n\n}\n", "| return_type");
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
            this.el.headers_visible = true;
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
                    if (col.title == "Value") {
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
                
                 
                if (col.title != "Value") {
                    print("col title != Value");
                    
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
            this.el.resizable = true;
            this.el.title = "Name";
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
            
                 Gtk.TreeIter  iter;
                _this.model.el.get_iter(out iter, new Gtk.TreePath.from_string(path));
                GLib.Value gval;
                              
            
            
                 //   this.get('/LeftPanel.model').activePath  = path;
                _this.model.el.get_value(iter,1, out gval);
                    var val = (string)gval;
                             
                    ((Gtk.Entry)editable).set_text(val);                 
            } );
            this.el.edited.connect(   (path, newtext) => {
                    print("Keyrender  - signal:edited\n");
                
                this.el.editable = false;
              
             
            
                    Gtk.TreeIter  iter;
                    _this.model.el.get_iter(out iter, new Gtk.TreePath.from_string(path));
                    GLib.Value gval;
                    
                     _this.model.el.get_value(iter,1, out gval);
                    var oldval = (string)gval;
                    
                     _this.model.el.get_value(iter,0, out gval);
                    var ktype = (string)gval;
                   
                    _this.model.el.set_value(iter, 1, newtext);
                    
                    print("ktype: %s\n",ktype);
                    switch(ktype) {
                        case "listener":
                            var ov = _this.node.listeners.get(oldval);
                            _this.node.listeners.set(newtext, ov);
                            _this.node.listeners.remove(oldval);
                            
                            _this.updateIter(iter,  ktype, newtext, ov);
                            
                            break;
                        case "props":
                            var ov = _this.node.props.get(oldval);
                            _this.node.props.set(newtext, ov);
                            _this.node.props.remove(oldval);
                            _this.updateIter(iter,  ktype, newtext, ov);
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
            this.el.resizable = true;
            this.el.title = "Value";
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
            var child_0 = new Xcls_valrendermodel( _this );
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
                            _this.updateIter(iter,ktype,key,newtext);
                            break;
                        case "props":
                            _this.node.props.set(key,newtext);
                            _this.updateIter(iter,ktype, key,newtext);                
                            break;
                     }
            //         _this.load(_this.file,_this.node);
                     _this.changed();
                      
            } );
            this.el.editing_started.connect( ( editable, path) => {
                //_this.editing = true;
                if (!_this.allow_edit) {
                   
                     print("val - editing_Started\n");
                    this.el.editable = false; // make sure it's not editor...
               
                     
                    return;
                }
                 _this.allow_edit =false;
                
               
               
               
                 Gtk.TreeIter  iter;
                _this.model.el.get_iter(out iter, new Gtk.TreePath.from_string(path));
                GLib.Value gval;
                              
            
            
                 //   this.get('/LeftPanel.model').activePath  = path;
                   _this.model.el.get_value(iter,3, out gval);
                
                
                    var val = (string)gval;
                    var combo =        (Gtk.ComboBox)editable;
            
                   var entry =  (Gtk.Entry) combo.get_child();        
                entry.set_text(val);
               
            } );
        }

        // userdefined functions 
        public void setOptions(string[] ar) {
                  var m = _this.valrendermodel.el;
                    m.clear();
                 Gtk.TreeIter iret;
                for (var i =0; i < ar.length; i++) {
                        m.append(out iret);
                        m.set_value(iret, 0, ar[i]);
                }
            
            }

        // skip |xns - no return type
    }
    public class Xcls_valrendermodel : Object 
    {
        public Gtk.ListStore el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_valrendermodel(Xcls_LeftProps _owner )
        {
            _this = _owner;
            _this.valrendermodel = this;
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
            var child_0 = new Xcls_MenuItem27( _this );
            child_0.ref();
            this.el.append (  child_0.el  );
            var child_1 = new Xcls_SeparatorMenuItem28( _this );
            child_1.ref();
            this.el.append (  child_1.el  );
            var child_2 = new Xcls_MenuItem29( _this );
            child_2.ref();
            this.el.append (  child_2.el  );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_MenuItem27 : Object 
    {
        public Gtk.MenuItem el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_MenuItem27(Xcls_LeftProps _owner )
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
    public class Xcls_SeparatorMenuItem28 : Object 
    {
        public Gtk.SeparatorMenuItem el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_SeparatorMenuItem28(Xcls_LeftProps _owner )
        {
            _this = _owner;
            this.el = new Gtk.SeparatorMenuItem();

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_MenuItem29 : Object 
    {
        public Gtk.MenuItem el;
        private Xcls_LeftProps  _this;


            // my vars

            // ctor 
        public Xcls_MenuItem29(Xcls_LeftProps _owner )
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
