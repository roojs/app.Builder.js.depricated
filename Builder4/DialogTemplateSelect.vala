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

public class Xcls_DialogTemplateSelect
{
    public Gtk.Dialog el;
    private static Xcls_DialogTemplateSelect  _this;

    public Xcls_combo combo;
    public Xcls_cellrenderer cellrenderer;
    public Xcls_model model;

        // my vars

        // ctor 
    public Xcls_DialogTemplateSelect()
    {
        this.el = new Gtk.Dialog();
        _this = this;
        DialogTemplateSelect = this;

        // my vars

        // set gobject values
        this.el.default_height = 200;
        this.el.default_width = 400;
        this.el.modal = true;
        var child_0 = new Xcls_VBox2();
        this.el.get_content_area().add  (  child_0.el  );
        var child_1 = new Xcls_Button8();
        this.el.add_action_widget (  child_1.el , 0 );

        // listeners 
        this.el.delete_event.connect(   (self, event)  =>{
            this.el.hide();
            return true;
        } );
    }

    // userdefined functions 

    // skip listeners - not pipe 

    // skip default_height - already used 

    // skip default_width - already used 

    // skip xtype - not pipe 
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

    // skip |modal - already used 

    // skip |xns - no return type

    // skip items - not pipe 

    // skip id - not pipe 

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
            this.el = new Gtk.VBox( true, 0 );

            // my vars

            // set gobject values
            var child_0 = new Xcls_HBox3();
            this.el.pack_start (  child_0.el , false,false,0 );
        }

        // userdefined functions 

        // skip xtype - not pipe 

        // skip |pack - already used 

        // skip |xns - no return type

        // skip items - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_HBox3
    {
        public Gtk.HBox el;

            // my vars

            // ctor 
        public Xcls_HBox3()
        {
            this.el = new Gtk.HBox( true, 0 );

            // my vars

            // set gobject values
            var child_0 = new Xcls_Label4();
            this.el.pack_start (  child_0.el , false,false );
            var child_1 = new Xcls_combo();
            this.el.add (  child_1.el  );

            // listeners 
        }

        // userdefined functions 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |xns - no return type

        // skip listeners - not pipe 

        // skip items - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_Label4
    {
        public Gtk.Label el;

            // my vars

            // ctor 
        public Xcls_Label4()
        {
            this.el = new Gtk.Label( "Select Template : " );

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip label - already used 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |xns - no return type

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_combo
    {
        public Gtk.ComboBox el;

            // my vars

            // ctor 
        public Xcls_combo()
        {
            this.el = new Gtk.ComboBox();
            _this.combo = this;

            // my vars

            // set gobject values
            var child_0 = new Xcls_cellrenderer();
            this.el.pack_start (  child_0.el , true );
            var child_1 = new Xcls_model();
            this.el.set_model (  child_1.el  );
        }

        // userdefined functions 

        // skip id - not pipe 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |init - already used 

        // skip |xns - no return type

        // skip items - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_cellrenderer
    {
        public Gtk.CellRendererText el;

            // my vars

            // ctor 
        public Xcls_cellrenderer()
        {
            this.el = new Gtk.CellRendererText();
            _this.cellrenderer = this;

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip id - not pipe 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |xns - no return type

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_model
    {
        public Gtk.ListStore el;

            // my vars

            // ctor 
        public Xcls_model()
        {
            this.el = new Gtk.ListStore( 2, typeof(string),typeof(string) );
            _this.model = this;

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip id - not pipe 

        // skip n_columns - already used 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |columns - already used 
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

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_Button8
    {
        public Gtk.Button el;

            // my vars

            // ctor 
        public Xcls_Button8()
        {
            this.el = new Gtk.Button();

            // my vars

            // set gobject values
            this.el.label = "OK";
        }

        // userdefined functions 

        // skip label - already used 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |xns - no return type

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
}
