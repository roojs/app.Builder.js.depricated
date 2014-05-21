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

private static Xcls_Editor  _this;

public class Xcls_Editor
{
    public Gtk.Window el;
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
        this.el = new Gtk.Window();
        _this = this;
        Editor = this;

        // my vars
        this..activeEditor = "";
        this..active_path = "";
        this..dirty = false;
        this..pos = false;

        // set gobject values
        this.el.height_request = 300;
        this.el.title = "Application Builder - Editor";
        this.el.width_request = 500;
        var child_0 = new Xcls_VBox2();
        this.el.add (  child_0.el  );

        // listeners 
        this.el.delete_event.connect( (event) => {
            if (!Editor.RightEditor.save()) {
                // no hiding with errors.
                return true;
            }
            _this.el.hide();
            _this.active_path = "";
            return true;
        } );
        this.el.configure_event.connect(  (object) => {
            _this.pos = true;
            this.el.get_position(out _this.pos_root_x, out _this.pos_root_y);
        
        
            return false;
        } );
        this.el.show.connect(  () => {
            if (this.pos) {
                _this.el.move(this.pos_root_x,this.pos_root_y);
            }
        } );
    }

    // userdefined functions 

    // skip listeners - not pipe 

    // skip .activeEditor - already used 

    // skip .active_path - already used 

    // skip .dirty - already used 

    // skip .pos - already used 

    // skip .pos_root_x - already used 

    // skip .pos_root_y - already used 

    // skip height_request - already used 

    // skip id - not pipe 

    // skip title - already used 

    // skip width_request - already used 

    // skip xtype - not pipe 

    // skip |init - already used 
    public bool save()  {
        
            if (!Editor.RightEditor.save()) {
                // no hiding with errors.
                return true;
            }
            _this.active_path = "";
            _this.el.hide();
            return true;
        
        }

    // skip |xns - could not find seperator

    // skip items - not pipe 

    // skip xvala_cls - not pipe 

    // skip xvala_xcls - not pipe 

    // skip xvala_id - not pipe 
    public class Xcls_VBox2
    {
        public Gtk.VBox el;

            // my vars

            // ctor 
        public Xcls_VBox2()
        {
            this.el = new Gtk.VBox();

            // my vars

            // set gobject values
            var child_0 = new Xcls_Toolbar3();
            this.el.pack_start (  child_0.el , false,true );
            var child_1 = new Xcls_RightEditor();
            this.el.add (  child_1.el  );
        }

        // userdefined functions 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |xns - could not find seperator

        // skip items - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_Toolbar3
    {
        public Gtk.Toolbar el;

            // my vars

            // ctor 
        public Xcls_Toolbar3()
        {
            this.el = new Gtk.Toolbar();

            // my vars

            // set gobject values
            var child_0 = new Xcls_save_button();
            this.el.add (  child_0.el  );
        }

        // userdefined functions 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |xns - could not find seperator

        // skip items - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_save_button
    {
        public Gtk.ToolButton el;

            // my vars

            // ctor 
        public Xcls_save_button()
        {
            this.el = new Gtk.ToolButton();
            _this.save_button = this;

            // my vars

            // set gobject values
            this.el.label = "Save";

            // listeners 
            this.el.clicked.connect( () => { 
                Editor.RightEditor.save();
            } );
        }

        // userdefined functions 

        // skip listeners - not pipe 

        // skip id - not pipe 

        // skip label - already used 

        // skip xtype - not pipe 

        // skip |xns - could not find seperator

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_RightEditor
    {
        public Gtk.ScrolledWindow el;

            // my vars

            // ctor 
        public Xcls_RightEditor()
        {
            this.el = new Gtk.ScrolledWindow();
            _this.RightEditor = this;

            // my vars

            // set gobject values
            var child_0 = new Xcls_view();
            this.el.add (  child_0.el  );
        }

        // userdefined functions 

        // skip id - not pipe 

        // skip pack - not pipe 

        // skip xtype - not pipe 
        public bool save() {
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

        // skip |xns - could not find seperator

        // skip items - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_view
    {
        public Gtk.SourceView el;

            // my vars

            // ctor 
        public Xcls_view()
        {
            this.el = new Gtk.SourceView();
            _this.view = this;

            // my vars

            // set gobject values
            this.el.auto_indent = true;
            this.el.indent_width = 4;
            this.el.insert_spaces_instead_of_tabs = true;
            this.el.show_line_numbers = true;
            var child_0 = new Xcls_buffer();
            this.el.set_buffer (  child_0.el  );

            // init method 
                var description =   Pango.FontDescription.from_string("monospace");
                description.set_size(8000);
                this.override_font(description);

            // listeners 
            this.el.key_release_event.connect( (event) => {
                
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

        // skip listeners - not pipe 

        // skip id - not pipe 

        // skip indent_width - already used 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |auto_indent - already used 

        // skip |init - already used 

        // skip |insert_spaces_instead_of_tabs - already used 

        // skip |load - could not find seperator
        public void save() {
            
                Editor.RightEditor.save();
            }

        // skip |show_line_numbers - already used 

        // skip |xns - could not find seperator

        // skip items - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_buffer
    {
        public Gtk.SourceBuffer el;

            // my vars

            // ctor 
        public Xcls_buffer()
        {
            this.el = new Gtk.SourceBuffer();
            _this.buffer = this;

            // my vars

            // set gobject values

            // listeners 
            this.el.changed.connect( () => {
                // check syntax??
                    if(this.checkSyntax()) {
                    Editor.save_button.sensitive = true;
                }
               // print("EDITOR CHANGED");
                Editor.dirty = true;
            
                // this.get('/LeftPanel.model').changed(  str , false);
                return ;
            } );
        }

        // userdefined functions 

        // skip listeners - not pipe 

        // skip id - not pipe 

        // skip pack - not pipe 

        // skip xtype - not pipe 
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

        // skip |xns - could not find seperator

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
}
