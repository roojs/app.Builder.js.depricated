static Editor  _Editor;

public class Editor : Object
{
    public Gtk.VBox el;
    private Editor  _this;

    public static Editor singleton()
    {
        if (_Editor == null) {
            _Editor= new Editor();
        }
        return _Editor;
    }
    public Xcls_save_button save_button;
    public Xcls_key_edit key_edit;
    public Xcls_RightEditor RightEditor;
    public Xcls_view view;
    public Xcls_buffer buffer;

        // my vars (def)
    public Xcls_MainWindow window;
    public string activeEditor;
    public int pos_root_x;
    public int pos_root_y;
    public string ptype;
    public string key;
    public JsRender.JsRender file;
    public bool pos;
    public bool dirty;
    public signal void save ();
    public JsRender.Node node;

    // ctor
    public Editor()
    {
        _this = this;
        this.el = new Gtk.VBox( false, 0 );

        // my vars (dec)
        this.window = null;
        this.activeEditor = "";
        this.ptype = "";
        this.key = "";
        this.file = null;
        this.pos = false;
        this.dirty = false;
        this.node = null;

        // set gobject values
        var child_0 = new Xcls_HBox2( _this );
        child_0.ref();
        this.el.pack_start (  child_0.el , false,true );
        var child_1 = new Xcls_RightEditor( _this );
        child_1.ref();
        this.el.add (  child_1.el  );
    }

    // user defined functions
    public   bool saveContents ()  {
        
        
        
        
        
        
        
       
         
         var str = _this.buffer.toString();
         
          
         
         
         if (!_this.buffer.checkSyntax()) {
             print("check syntax failed");
             //this.get('/StandardErrorDialog').show("Fix errors in code and save.."); 
             //return false;
         }
         
         // LeftPanel.model.changed(  str , false);
         _this.dirty = false;
         _this.save_button.el.sensitive = false;
         
         
            
         
        // find the text for the node..
        if (ptype == "listener") {
            this.node.listeners.set(key,str);
        
        } else {
             this.node.props.set(key,str);
        }
    
         
        
        // call the signal..
        this.save();
        
        return true;
    
    }
    public   void show (JsRender.JsRender file, JsRender.Node node, string ptype, string key)
    {
        this.ptype = ptype;
        this.key  = key;
        this.node = node;
        this.file = file;
        
       string val = "";
        // find the text for the node..
        if (ptype == "listener") {
            val = node.listeners.get(key);
        
        } else {
            val = node.props.get(key);
        }
        this.view.load(val);
        this.key_edit.el.text = key;    
    
    }
    public class Xcls_HBox2 : Object
    {
        public Gtk.HBox el;
        private Editor  _this;


            // my vars (def)

        // ctor
        public Xcls_HBox2(Editor _owner )
        {
            _this = _owner;
            this.el = new Gtk.HBox( false, 0 );

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_save_button( _this );
            child_0.ref();
            this.el.pack_start (  child_0.el , false,false );
            var child_1 = new Xcls_key_edit( _this );
            child_1.ref();
            this.el.pack_end (  child_1.el , true,true );
        }

        // user defined functions
    }
    public class Xcls_save_button : Object
    {
        public Gtk.Button el;
        private Editor  _this;


            // my vars (def)

        // ctor
        public Xcls_save_button(Editor _owner )
        {
            _this = _owner;
            _this.save_button = this;
            this.el = new Gtk.Button();

            // my vars (dec)

            // set gobject values
            this.el.label = "Save";

            //listeners
            this.el.clicked.connect( () => { 
                _this.saveContents();
            });
        }

        // user defined functions
    }

    public class Xcls_key_edit : Object
    {
        public Gtk.Entry el;
        private Editor  _this;


            // my vars (def)

        // ctor
        public Xcls_key_edit(Editor _owner )
        {
            _this = _owner;
            _this.key_edit = this;
            this.el = new Gtk.Entry();

            // my vars (dec)

            // set gobject values
        }

        // user defined functions
    }


    public class Xcls_RightEditor : Object
    {
        public Gtk.ScrolledWindow el;
        private Editor  _this;


            // my vars (def)

        // ctor
        public Xcls_RightEditor(Editor _owner )
        {
            _this = _owner;
            _this.RightEditor = this;
            this.el = new Gtk.ScrolledWindow( null, null );

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_view( _this );
            child_0.ref();
            this.el.add (  child_0.el  );

            // init method

            this.el.set_policy(Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC);
        }

        // user defined functions
    }
    public class Xcls_view : Object
    {
        public Gtk.SourceView el;
        private Editor  _this;


            // my vars (def)

        // ctor
        public Xcls_view(Editor _owner )
        {
            _this = _owner;
            _this.view = this;
            this.el = new Gtk.SourceView();

            // my vars (dec)

            // set gobject values
            this.el.auto_indent = true;
            this.el.indent_width = 4;
            this.el.show_line_marks = true;
            this.el.insert_spaces_instead_of_tabs = true;
            this.el.show_line_numbers = true;
            this.el.highlight_current_line = true;
            var child_0 = new Xcls_buffer( _this );
            child_0.ref();
            this.el.set_buffer (  child_0.el  );

            // init method

            var description =   Pango.FontDescription.from_string("monospace");
                description.set_size(8000);
                this.el.override_font(description);
            
                var attrs = new Gtk.SourceMarkAttributes();
                var  pink = new Gdk.RGBA();
                pink.parse ( "pink");
                attrs.set_background ( pink);
                attrs.set_icon_name ( "process-stop");    
                attrs.query_tooltip_text.connect(( mark) => {
                    //print("tooltip query? %s\n", mark.name);
                    return mark.name;
                });
                
                this.el.set_mark_attributes ("error", attrs, 1);

            //listeners
            this.el.key_release_event.connect( (event) => {
                
                if (event.keyval == 115 && (event.state & Gdk.ModifierType.CONTROL_MASK ) > 0 ) {
                    print("SAVE: ctrl-S  pressed");
                    _this.saveContents();
                    return false;
                }
               // print(event.key.keyval)
                
                return false;
            
            });
        }

        // user defined functions
        public   void load (string str) {
        
        // show the help page for the active node..
           //this.get('/Help').show();
        
        
          // this.get('/BottomPane').el.set_current_page(0);
            this.el.get_buffer().set_text(str, str.length);
            var lm = Gtk.SourceLanguageManager.get_default();
            
            var lang = _this.file.language;
            //?? is javascript going to work as js?
            
            ((Gtk.SourceBuffer)(this.el.get_buffer())) .set_language(lm.get_language(lang));
            var buf = this.el.get_buffer();
             
            _this.dirty = false;
            this.el.grab_focus();
            _this.save_button.el.sensitive = false;
        }
    }
    public class Xcls_buffer : Object
    {
        public Gtk.SourceBuffer el;
        private Editor  _this;


            // my vars (def)
        public bool check_queued;
        public int error_line;
        public bool check_running;

        // ctor
        public Xcls_buffer(Editor _owner )
        {
            _this = _owner;
            _this.buffer = this;
            this.el = new Gtk.SourceBuffer( null );

            // my vars (dec)
            this.check_queued = false;
            this.error_line = -1;
            this.check_running = false;

            // set gobject values

            //listeners
            this.el.changed.connect( () => {
                // check syntax??
                // ??needed..??
                _this.save_button.el.sensitive = true;
                print("EDITOR CHANGED");
                this.checkSyntax();
               
                _this.dirty = true;
            
                // this.get('/LeftPanel.model').changed(  str , false);
                return ;
            });
        }

        // user defined functions
        public bool highlightErrors ( Gee.HashMap<int,string> validate_res) {
                this.error_line = validate_res.size;
        
                if (this.error_line < 1) {
                      return true;
                }
                var tlines = this.el.get_line_count ();
                Gtk.TextIter iter;
                var valiter = validate_res.map_iterator();
                while (valiter.next()) {
                
            //        print("get inter\n");
                    var eline = valiter.get_key();
                    if (eline > tlines) {
                        continue;
                    }
                    this.el.get_iter_at_line( out iter, eline);
                    //print("mark line\n");
                    this.el.create_source_mark(valiter.get_value(), "error", iter);
                }   
                return false;
            }
        public   string toString () {
            
            Gtk.TextIter s;
            Gtk.TextIter e;
            this.el.get_start_iter(out s);
            this.el.get_end_iter(out e);
            var ret = this.el.get_text(s,e,true);
            //print("TO STRING? " + ret);
            return ret;
        }
        public   bool checkSyntax () {
         
            if (this.check_running) {
                print("Check is running\n");
                if (this.check_queued) { 
                    print("Check is already queued");
                    return true;
                }
                this.check_queued = true;
                print("Adding queued Check ");
                GLib.Timeout.add_seconds(1, () => {
                    this.check_queued = false;
                    
                    this.checkSyntax();
                    return false;
                });
            
        
                return true;
            }
           
           
            var p = Palete.factory(_this.file.xtype);   
            
            var str = this.toString();
            
            string res = "";
            
            if (this.error_line > 0) {
                 Gtk.TextIter start;
                 Gtk.TextIter end;     
                this.el.get_bounds (out start, out end);
        
                this.el.remove_source_marks (start, end, null);
            }
            
            if (str.length < 1) {
                print("checkSyntax - empty string?\n");
                return true;
            }
            this.check_running = true;
            
            
            if (_this.file.language == "js") {
                this.check_running = false;
                print("calling validate javascript\n"); 
                return this.highlightErrors(p.validateJavascript(
                    str, 
                     _this.key, 
                    _this.ptype,
                    _this.file,
                    _this.node
                ));    
                
            }
                
                
            print("calling validate vala\n");    
            // clear the buttons.
            _this.window.statusbar_errors.el.hide();
            _this.window.statusbar_warnings.el.hide();
            _this.window.statusbar_depricated.el.hide();
            
            
            
            p.validateVala(
                str, 
                 _this.key, 
                _this.ptype,
                _this.file,
                _this.node,
                (obj) => {
                    this.check_running = false;
                    this.highlightErrorsJson(obj);            
                    
                    //var validate_res = p.validateVala.end(res);
                    //this.highlightErrors(validate_res);
        
                }
                
            );
             
            
            
            //print("done mark line\n");
             
            return true; // at present allow saving - even if it's invalid..
        }
        public bool highlightErrorsJson (string type, Json.Object obj) {
              Gtk.TextIter start;
             Gtk.TextIter end;     
                this.el.get_bounds (out start, out end);
                
                this.el.remove_source_marks (start, end, type);
                         
             
             // we should highlight other types of errors..
            
            if (!obj.has_member(type)) {
                print("Return has no errors\n");
                return true;
            }
            var err = obj.get_object_member(type);
            
            
            
            if (!err.has_member(_this.file.path)) {
                print("File path has no errors\n");
                return true;
            }
        
            var lines = err.get_object_member(_this.file.path);
            
            var offset = 1;
            if (obj.has_member("line_offset")) {
                offset = (int)obj.get_int_member("line_offset") + 1;
            }
             
            
            var tlines = this.el.get_line_count () +1;
            
            lines.foreach_member((obj, line, node) => {
                
                     Gtk.TextIter iter;
            //        print("get inter\n");
                    var eline = int.parse(line) - offset;
                    print("GOT ERROR on line %s -- converted to %d\n", line,eline);
                    
                    
                    if (eline > tlines || eline < 0) {
                        return;
                    }
                    this.el.get_iter_at_line( out iter, eline);
                    //print("mark line\n");
                    var msg  = "Line: %d".printf(eline+1);
                    var ar = lines.get_array_member(line);
                    for (var i = 0 ; i < ar.get_length(); i++) {
        		    msg += (msg.length > 0) ? "\n" : "";
        		    msg += ar.get_string_element(i);
        	    }
                    
                    
                    this.el.create_source_mark(msg, "error", iter);
                } );
                return false;
            
        
        
        
        
        }
    }



}
