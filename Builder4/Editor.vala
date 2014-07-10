/* -- to compile
valac  --pkg gio-2.0  --pkg posix  --pkg gtk+-3.0 --pkg libnotify --pkg gtksourceview-3.0  --pkg  libwnck-3.0 \
    /tmp/Editor.vala  -o /tmp/Editor
*/


/* -- to test class
static int main (string[] args) {
    Gtk.init (ref args);
    new Xcls_Editor();
    Editor.show_all();
     Gtk.main ();
    return 0;
}
*/


public static Xcls_Editor  Editor;

public class Xcls_Editor : Object 
{
    public Gtk.Window el;
    private Xcls_Editor  _this;

    public Xcls_save_button save_button;
    public Xcls_RightEditor RightEditor;
    public Xcls_view view;
    public Xcls_buffer buffer;

        // my vars
    public bool dirty;
    public bool pos;
    public int pos_root_x;
    public int pos_root_y;
    public string activeEditor;
    public string active_path;

        // ctor 
    public Xcls_Editor()
    {
        _this = this;
        Editor = this;
        this.el = new Gtk.Window( null );

        // my vars
        this.dirty = false;
        this.pos = false;
        this.activeEditor = "";
        this.active_path = "";

        // set gobject values
        this.el.height_request = 300;
        this.el.title = "Application Builder -  Code  Editor";
        this.el.width_request = 500;
        var child_0 = new Xcls_VBox2( _this );
        child_0.ref();
        this.el.add (  child_0.el  );

        // init method 
        function() {
            XObject.prototype.init.call(this);
           // this.show_all();
        }

        // listeners 
        this.el.configure_event.connect(  (object) => {
            _this.pos = true;
            this.el.get_position(out _this.pos_root_x, out _this.pos_root_y);
        
        
            return false;
        }
         
         );
        this.el.show.connect(   () => {
            if (this.pos) {
                _this.el.move(this.pos_root_x,this.pos_root_y);
            }
        }
          );
    }

    // userdefined functions 
    public bool save  ()  {
        
            if (!Editor.RightEditor.save()) {
                // no hiding with errors.
                return true;
            }
            _this.active_path = "";
            _this.el.hide();
            return true;
        
        } 

    // skip |show_all - no return type
    public void show_all  () {
            this.el.show_all();
        
        }
         

    // skip |xns - no return type
    public class Xcls_VBox2 : Object 
    {
        public Gtk.VBox el;
        private Xcls_Editor  _this;


            // my vars

            // ctor 
        public Xcls_VBox2(Xcls_Editor _owner )
        {
            _this = _owner;
            this.el = new Gtk.VBox( true, 0 );

            // my vars

            // set gobject values
            var child_0 = new Xcls_Toolbar3( _this );
            child_0.ref();
            this.el.pack_start (  child_0.el , false,true );
            var child_1 = new Xcls_RightEditor( _this );
            child_1.ref();
            this.el.add (  child_1.el  );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_Toolbar3 : Object 
    {
        public Gtk.Toolbar el;
        private Xcls_Editor  _this;


            // my vars

            // ctor 
        public Xcls_Toolbar3(Xcls_Editor _owner )
        {
            _this = _owner;
            this.el = new Gtk.Toolbar();

            // my vars

            // set gobject values
            var child_0 = new Xcls_save_button( _this );
            child_0.ref();
            this.el.add (  child_0.el  );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_save_button : Object 
    {
        public Gtk.ToolButton el;
        private Xcls_Editor  _this;


            // my vars

            // ctor 
        public Xcls_save_button(Xcls_Editor _owner )
        {
            _this = _owner;
            _this.save_button = this;
            this.el = new Gtk.ToolButton( null, "Save" );

            // my vars

            // set gobject values

            // listeners 
            this.el.clicked.connect(  () => { 
                Editor.RightEditor.save();
            }
             
             );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_RightEditor : Object 
    {
        public Gtk.ScrolledWindow el;
        private Xcls_Editor  _this;


            // my vars

            // ctor 
        public Xcls_RightEditor(Xcls_Editor _owner )
        {
            _this = _owner;
            _this.RightEditor = this;
            this.el = new Gtk.ScrolledWindow( null, null );

            // my vars

            // set gobject values
            var child_0 = new Xcls_view( _this );
            child_0.ref();
            this.el.add (  child_0.el  );
        }

        // userdefined functions 
        public bool save  () {
                 print("editor.rightbutton.save");
                 if (_this.active_path.length  < 1 ) {
                      print("skip - no active path");
                    return true;
                 }
                 
                 var str = Editor.buffer.toString();
                 
                 if (!Editor.buffer.checkSyntax()) {
                     print("check syntax failed");
                     //this.get('/StandardErrorDialog').show("Fix errors in code and save.."); 
                     return false;
                 }
                 
                 // LeftPanel.model.changed(  str , false);
                 _this.dirty = false;
                 _this.save_button.el.sensitive = false;
                 print("set save button grey");
                 return true;
            }
             

        // skip |xns - no return type
    }
    public class Xcls_view : Object 
    {
        public Gtk.SourceView el;
        private Xcls_Editor  _this;


            // my vars

            // ctor 
        public Xcls_view(Xcls_Editor _owner )
        {
            _this = _owner;
            _this.view = this;
            this.el = new Gtk.SourceView();

            // my vars

            // set gobject values
            this.el.auto_indent = true;
            this.el.indent_width = 4;
            this.el.insert_spaces_instead_of_tabs = true;
            this.el.show_line_numbers = true;
            var child_0 = new Xcls_buffer( _this );
            child_0.ref();
            this.el.set_buffer (  child_0.el  );

            // init method 
             
                var description =   Pango.FontDescription.from_string("monospace");
                description.set_size(8000);
                this.el.override_font(description);
            
             

            // listeners 
            this.el.key_release_event.connect(  (event) => {
                
                if (event.keyval == 115 && (event.state & Gdk.ModifierType.CONTROL_MASK ) > 0 ) {
                    print("SAVE: ctrl-S  pressed");
                    this.save();
                    return false;
                }
               // print(event.key.keyval)
                
                return false;
            
            } 
            
             );
        }

        // userdefined functions 
        public void load (string str) {
            
            // show the help page for the active node..
               //this.get('/Help').show();
            
            
              // this.get('/BottomPane').el.set_current_page(0);
                this.el.get_buffer().set_text(str, str.length);
                var lm = Gtk.SourceLanguageManager.get_default();
                
                ((Gtk.SourceBuffer)(this.el.get_buffer())) .set_language(lm.get_language("js"));
                var buf = this.el.get_buffer();
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
                Editor.dirty = false;
                this.el.grab_focus();
                _this.save_button.el.sensitive = false;
            }
        public void save () {
            
                Editor.RightEditor.save();
            }
             

        // skip |xns - no return type
    }
    public class Xcls_buffer : Object 
    {
        public Gtk.SourceBuffer el;
        private Xcls_Editor  _this;


            // my vars

            // ctor 
        public Xcls_buffer(Xcls_Editor _owner )
        {
            _this = _owner;
            _this.buffer = this;
            this.el = new Gtk.SourceBuffer( null );

            // my vars

            // set gobject values

            // listeners 
            this.el.changed.connect(  () => {
                // check syntax??
                    if(this.checkSyntax()) {
                    Editor.save_button.el.sensitive = true;
                }
               // print("EDITOR CHANGED");
                Editor.dirty = true;
            
                // this.get('/LeftPanel.model').changed(  str , false);
                return ;
            }
            
             
             );
        }

        // userdefined functions 
        public bool checkSyntax () {
             /*
                var str = this.toString();
                var res = "";
                /*
                try {
                  //  print('var res = ' + str);
                    Seed.check_syntax('var res = ' + str);
                    
                   
                } catch (e) {
                    
                    this.get('/RightEditor.view').el.modify_base(Gtk.StateType.NORMAL, new Gdk.Color({
                        red: 0xFFFF, green: 0xCCCC , blue : 0xCCCC
                       }));
                    print("SYNTAX ERROR IN EDITOR");   
                    print(e);
                    // print(str);
                    //console.dump(e);
                    return false;
                }
                 this.get('/RightEditor.view').el.modify_base(Gtk.StateType.NORMAL, new Gdk.Color({
                    red: 0xFFFF, green: 0xFFFF , blue : 0xFFFF
                   }));
                */
                return true;
            }
        public string toString  () {
                
                Gtk.TextIter s;
                Gtk.TextIter e;
                this.el.get_start_iter(out s);
                this.el.get_end_iter(out e);
                var ret = this.el.get_text(s,e,true);
                //print("TO STRING? " + ret);
                return ret;
            }
             

        // skip |xns - no return type
    }
}
