/* -- to compile
valac  --pkg gio-2.0  --pkg posix  --pkg gtk+-3.0 --pkg libnotify --pkg gtksourceview-3.0  --pkg  libwnck-3.0 \
    /tmp/DialogTemplateSelect.vala  -o /tmp/DialogTemplateSelect
*/


/* -- to test class
static int main (string[] args) {
    Gtk.init (ref args);
    new Xcls_DialogTemplateSelect();
    DialogTemplateSelect.show_all();
     Gtk.main ();
    return 0;
}
*/


public static Xcls_DialogTemplateSelect  DialogTemplateSelect;

public class Xcls_DialogTemplateSelect : Object 
{
    public Gtk.Dialog el;
    private Xcls_DialogTemplateSelect  _this;

    public static Xcls_DialogTemplateSelect singleton()
    {
        if (DialogTemplateSelect == null) {
            DialogTemplateSelect= new Xcls_DialogTemplateSelect();
        }
        return DialogTemplateSelect;
    }
    public Xcls_combo combo;
    public Xcls_cellrenderer cellrenderer;
    public Xcls_model model;

        // my vars

        // ctor 
    public Xcls_DialogTemplateSelect()
    {
        _this = this;
        this.el = new Dialog(Xcls_MainWindow.el);

        // my vars

        // set gobject values
        this.el.default_height = 200;
        this.el.default_width = 400;
        this.el.modal = true;
        this.el.title = "Add an Object";
        var child_0 = new Xcls_VBox2( _this );
        child_0.ref();
        this.el.get_content_area().add  (  child_0.el  );
        var child_1 = new Xcls_Button8( _this );
        child_1.ref();
        this.el.add_action_widget (  child_1.el , 0 );

        // listeners 
        this.el.delete_event.connect(   (self, event)  =>{
            this.el.hide();
            return true;
        } );
    }

    // userdefined functions 
    public JsRender.Node? show (Palete.Palete pal, JsRender.Node node) {
            
        
            var opts = pal.listTemplates(node);
            if (opts.length() < 1) {
                return node;
            }
            
            //opts.unshift({ path: '' , name :'Just add Element' });
             _this.model.loadData(opts);
             _this.combo.el.set_active(0);
             
            this.el.show_all();
            this.el.run();
            this.el.hide();
            var ix = _this.combo.el.get_active();
            if (ix < 1 ) {
                return null;
            }
            
        
            return pal.loadTemplate(opts.nth_data(ix));
        
        }

    // skip |xns - no return type
    public class Xcls_VBox2 : Object 
    {
        public Gtk.VBox el;
        private Xcls_DialogTemplateSelect  _this;


            // my vars

            // ctor 
        public Xcls_VBox2(Xcls_DialogTemplateSelect _owner )
        {
            _this = _owner;
            this.el = new Gtk.VBox( true, 0 );

            // my vars

            // set gobject values
            var child_0 = new Xcls_HBox3( _this );
            child_0.ref();
            this.el.pack_start (  child_0.el , false,false,0 );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_HBox3 : Object 
    {
        public Gtk.HBox el;
        private Xcls_DialogTemplateSelect  _this;


            // my vars

            // ctor 
        public Xcls_HBox3(Xcls_DialogTemplateSelect _owner )
        {
            _this = _owner;
            this.el = new Gtk.HBox( true, 0 );

            // my vars

            // set gobject values
            var child_0 = new Xcls_Label4( _this );
            child_0.ref();
            this.el.pack_start (  child_0.el , false,false );
            var child_1 = new Xcls_combo( _this );
            child_1.ref();
            this.el.add (  child_1.el  );

            // listeners 
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_Label4 : Object 
    {
        public Gtk.Label el;
        private Xcls_DialogTemplateSelect  _this;


            // my vars

            // ctor 
        public Xcls_Label4(Xcls_DialogTemplateSelect _owner )
        {
            _this = _owner;
            this.el = new Gtk.Label( "Select Template : " );

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_combo : Object 
    {
        public Gtk.ComboBox el;
        private Xcls_DialogTemplateSelect  _this;


            // my vars

            // ctor 
        public Xcls_combo(Xcls_DialogTemplateSelect _owner )
        {
            _this = _owner;
            _this.combo = this;
            this.el = new Gtk.ComboBox();

            // my vars

            // set gobject values
            var child_0 = new Xcls_cellrenderer( _this );
            child_0.ref();
            this.el.pack_start (  child_0.el , true );
            var child_1 = new Xcls_model( _this );
            child_1.ref();
            this.el.set_model (  child_1.el  );

            // init method 
            this.el.add_attribute(_this.cellrenderer.el , "markup", 1 );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_cellrenderer : Object 
    {
        public Gtk.CellRendererText el;
        private Xcls_DialogTemplateSelect  _this;


            // my vars

            // ctor 
        public Xcls_cellrenderer(Xcls_DialogTemplateSelect _owner )
        {
            _this = _owner;
            _this.cellrenderer = this;
            this.el = new Gtk.CellRendererText();

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_model : Object 
    {
        public Gtk.ListStore el;
        private Xcls_DialogTemplateSelect  _this;


            // my vars

            // ctor 
        public Xcls_model(Xcls_DialogTemplateSelect _owner )
        {
            _this = _owner;
            _this.model = this;
            this.el = new Gtk.ListStore( 2, typeof(string),typeof(string) );

            // my vars

            // set gobject values
        }

        // userdefined functions 
        public void loadData  (GLib.List<string> data) {
                this.el.clear();                                    
                Gtk.TreeIter iter;
                var el = this.el;
                
                el.append(out iter);
                
                 
                el.set_value(iter, 0, "");
                el.set_value(iter, 1, "Just add Element");
                
                for (var i = 0; i < data.length();i++) {
                
            
                    el.append(out iter);
                    var str = data.nth_data(i);
                    var fn = Path.get_basename (str);
                    fn.replace(".json", "");
                    
                    el.set_value(iter, 0, fn);
                    el.set_value(iter, 1, str);
                    
                }
                          
                                                 
            }

        // skip |xns - no return type
    }
    public class Xcls_Button8 : Object 
    {
        public Gtk.Button el;
        private Xcls_DialogTemplateSelect  _this;


            // my vars

            // ctor 
        public Xcls_Button8(Xcls_DialogTemplateSelect _owner )
        {
            _this = _owner;
            this.el = new Gtk.Button();

            // my vars

            // set gobject values
            this.el.label = "OK";
        }

        // userdefined functions 

        // skip |xns - no return type
    }
}
