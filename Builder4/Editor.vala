/* -- to compile
valac  --pkg gio-2.0  --pkg posix  --pkg gtk+-3.0 --pkg libnotify --pkg gtksourceview-3.0  --pkg  libwnck-3.0 \
    /tmp/test.vala  -o /tmp/Editor
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

private static Xcls_Editor  _this;

public class Xcls_Editor : Gtk.Window
{
    public Xcls_save_button save_button;
    public Xcls_RightEditor RightEditor;
    public Xcls_view view;
    public Xcls_buffer buffer;

        // my vars
    public string activeEditor;
    public string active_path;
    public bool dirty;
    public bool pos;
    public int pos_root_x;
    public int pos_root_y;

        // ctor 
    public Xcls_Editor()
    {
        _this = this;
        Editor = this;

        // my vars
        this.activeEditor = "";
        this.active_path = "";
        this.dirty = false;
        this.pos = false;

        // set gobject values
        this.height_request = 300;
        this.title = "Application Builder - Editor";
        this.width_request = 500;
        this.add (  new Xcls_VBox2() );

        // listeners 
        this.delete_event.connect( (event) => {
            if (!Editor.RightEditor.save()) {
                // no hiding with errors.
                return true;
            }
            _this.hide();
            _this.active_path = "";
            return true;
        } );
        this.configure_event.connect(  (object) => {
            _this.pos = true;
            this.get_position(out _this.pos_root_x, out _this.pos_root_y);
        
        
            return false;
        } );
        this.show.connect(  () => {
            if (this.pos) {
                _this.move(this.pos_root_x,this.pos_root_y);
            }
        } );
    }

    // userdefined functions 
    public bool save()  {
        
            if (!Editor.RightEditor.save()) {
                // no hiding with errors.
                return true;
            }
            _this.active_path = "";
            _this.hide();
            return true;
        
        }
    public class Xcls_VBox2 : Gtk.VBox
    {

            // my vars

            // ctor 
        public Xcls_VBox2()
        {

            // my vars

            // set gobject values
            this.pack_start (  new Xcls_Toolbar3(), false,true );
            this.add (  new Xcls_RightEditor() );
        }

        // userdefined functions 
    }
    public class Xcls_Toolbar3 : Gtk.Toolbar
    {

            // my vars

            // ctor 
        public Xcls_Toolbar3()
        {

            // my vars

            // set gobject values
            this.add (  new Xcls_save_button() );
        }

        // userdefined functions 
    }
    public class Xcls_save_button : Gtk.ToolButton
    {

            // my vars

            // ctor 
        public Xcls_save_button()
        {
            _this.save_button = this;

            // my vars

            // set gobject values
            this.label = "Save";

            // listeners 
            this.clicked.connect( () => { 
                Editor.RightEditor.save();
            } );
        }

        // userdefined functions 
    }
    public class Xcls_RightEditor : Gtk.ScrolledWindow
    {

            // my vars

            // ctor 
        public Xcls_RightEditor()
        {
            _this.RightEditor = this;

            // my vars

            // set gobject values
            this.add (  new Xcls_view() );
        }

        // userdefined functions 
        public bool save() {
            
                 if (_this.active_path.length  < 1 ) {
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
                 _this.save_button.sensitive = false;
                 return true;
            }
    }
    public class Xcls_view : Gtk.SourceView
    {

            // my vars

            // ctor 
        public Xcls_view()
        {
            _this.view = this;

            // my vars

            // set gobject values
            this.auto_indent = true;
            this.indent_width = 4;
            this.insert_spaces_instead_of_tabs = true;
            this.show_line_numbers = true;
            this.set_buffer (  new Xcls_buffer() );

            // init method 
                var description =   Pango.FontDescription.from_string("monospace");
                description.set_size(8000);
                this.override_font(description);

            // listeners 
            this.key_release_event.connect( (event) => {
                
                if (event.key.keyval == 115 && (event.key.state & Gdk.ModifierType.CONTROL_MASK ) > 0 ) {
                    print("SAVE: ctrl-S  pressed");
                    this.save();
                    return false;
                }
               // print(event.key.keyval)
                
                return false;
            
            } );
        }

        // userdefined functions 
        public void save() {
            
                Editor.RightEditor.save();
            }
    }
    public class Xcls_buffer : Gtk.SourceBuffer
    {

            // my vars

            // ctor 
        public Xcls_buffer()
        {
            _this.buffer = this;

            // my vars

            // set gobject values

            // listeners 
        }

        // userdefined functions 
        public bool checkSyntax() { 
                // we could try running valac... ?? but it's a bit confusing..
                return true;
            
            }
        public string toString() {
                
                Gtk.TextIter s;
                Gtk.TextIter e;
                this.get_start_iter(out s);
                this.get_end_iter(out e);
                var ret = this.get_text(s,e,true);
                //print("TO STRING? " + ret);
                return ret;
            }
    }
}
