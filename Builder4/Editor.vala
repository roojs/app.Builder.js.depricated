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
             return false;
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

            // listeners 
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

            this.el.set_policy(Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC);        }

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
                Gtk.Color pink;
                Gtk.Color.parse ( out pink, "pink");
                attrs.set_background (attrs, pink);
                this.el.set_mark_attributes ("error", attrs, 1);
            // listeners 
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
            
            /* -- what does all this do? */
            /*
            var cursor = buf.get_mark("insert");
            Gtk.TextIter iter;
            buf.get_iter_at_mark(out iter, cursor);
            iter.set_line(1);
            iter.set_line_offset(4);
            buf.move_mark(cursor, iter);
            
            
            cursor = buf.get_mark("selection_bound");
            //iter= new Gtk.TextIter;
            buf.get_iter_at_mark(out iter, cursor);
            iter.set_line(1);
            iter.set_line_offset(4);
            buf.move_mark(cursor, iter);
            
            */
            
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
        public int error_line;

        // ctor 
        public Xcls_buffer(Editor _owner )
        {
            _this = _owner;
            _this.buffer = this;
            this.el = new Gtk.SourceBuffer( null );

            // my vars (dec)
            this.error_line = -1;

            // set gobject values

            // listeners 
            this.el.changed.connect( () => {
                // check syntax??
                    if(this.checkSyntax()) {
                    _this.save_button.el.sensitive = true;
                }
               // print("EDITOR CHANGED");
                _this.dirty = true;
            
                // this.get('/LeftPanel.model').changed(  str , false);
                return ;
            });
        }

        // user defined functions 
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
         
            var p = Palete.factory(_this.file.xtype);   
            
            var str = this.toString();
            
            string res = "";
            
            if (this.error_line > -1) {
                 Gtk.TextIter start;
                 Gtk.TextIter end;     
                this.el.get_bounds (out start, out end);
        
                this.el.remove_source_marks (start, end, null);
            }
            var line =  p.validateCode(
                str, 
                _this.ptype == "listener" ? "| function " : _this.key, 
                _this.file.language, 
                out res
            );
            this.error_line = line;
            print("got line %d\n%s\n", line, res);
            if (line < 0) {
            
              return true;
            }
              Gtk.TextIter iter;
            this.el.get_iter_at_line( out iter, line);
            var m = this.el.create_source_mark(res, "error", iter);
             
            return false;
        }
    }
}
