static DialogTemplateSelect  _DialogTemplateSelect;

public class DialogTemplateSelect : Object 
{
    public Gtk.Dialog el;
    private DialogTemplateSelect  _this;

    public static DialogTemplateSelect singleton()
    {
        if (_DialogTemplateSelect == null) {
            _DialogTemplateSelect= new DialogTemplateSelect();
        }
        return _DialogTemplateSelect;
    }
    public Xcls_combo combo;
    public Xcls_cellrenderer cellrenderer;
    public Xcls_model model;

        // my vars (def)

    // ctor 
    public DialogTemplateSelect()
    {
        _this = this;
        this.el = new Gtk.Dialog();

        // my vars (dec)

        // set gobject values
        this.el.title = "Add an Object";
        this.el.default_height = 200;
        this.el.default_width = 400;
        this.el.modal = true;
        var child_0 = new Xcls_VBox2( _this );
        child_0.ref();
        this.el.get_content_area().add (  child_0.el  );
        var child_1 = new Xcls_Button8( _this );
        child_1.ref();
        this.el.add_action_widget (  child_1.el , 0 );
        var child_2 = new Xcls_Button9( _this );
        child_2.ref();
        this.el.add_action_widget (  child_2.el , 0 );
        var child_3 = new Xcls_Button10( _this );
        child_3.ref();
        this.el.add_action_widget (  child_3.el , 0 );

        // listeners 
        this.el.delete_event.connect( (self, event)  =>{
            this.el.hide();
            return true;
        });
    }

    // user defined functions 
    public JsRender.Node? show (Gtk.Window pwindow, Palete.Palete pal, JsRender.Node node) {
        
        this.el.show_all();
        var opts = pal.listTemplates(node);
        if (opts.length() < 1) {
            this.el.hide();
            return node;
        }
        this.el.set_attached_to( pwindow);
         this.el.set_transient_for( pwindow);
        
        //opts.unshift({ path: '' , name :'Just add Element' });
         _this.model.loadData(opts);
         _this.combo.el.set_active(0);
         
       
        this.el.run();
        this.el.hide();    
        //var ix = _this.combo.el.get_active();
        //if (ix < 1 ) {
        //    return node;
       // }
       Gtk.TreeIter iter;
        _this.combo.el.get_active_iter (out iter);
        Value vfname;
        this.model.el.get_value (iter, 0, out vfname);
        
        if (((string)vfname).length < 1) {
            return node;
        }
        return pal.loadTemplate((string)vfname);
    
    }
    public class Xcls_VBox2 : Object 
    {
        public Gtk.VBox el;
        private DialogTemplateSelect  _this;


            // my vars (def)

        // ctor 
        public Xcls_VBox2(DialogTemplateSelect _owner )
        {
            _this = _owner;
            this.el = new Gtk.VBox( true, 0 );

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_HBox3( _this );
            child_0.ref();
            this.el.pack_start (  child_0.el , false,false,0 );
        }

        // user defined functions 
    }
    public class Xcls_HBox3 : Object 
    {
        public Gtk.HBox el;
        private DialogTemplateSelect  _this;


            // my vars (def)

        // ctor 
        public Xcls_HBox3(DialogTemplateSelect _owner )
        {
            _this = _owner;
            this.el = new Gtk.HBox( true, 0 );

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_Label4( _this );
            child_0.ref();
            this.el.pack_start (  child_0.el , false,false );
            var child_1 = new Xcls_combo( _this );
            child_1.ref();
            this.el.add (  child_1.el  );
        }

        // user defined functions 
    }
    public class Xcls_Label4 : Object 
    {
        public Gtk.Label el;
        private DialogTemplateSelect  _this;


            // my vars (def)

        // ctor 
        public Xcls_Label4(DialogTemplateSelect _owner )
        {
            _this = _owner;
            this.el = new Gtk.Label( "Select Template : " );

            // my vars (dec)

            // set gobject values
        }

        // user defined functions 
    }
    public class Xcls_combo : Object 
    {
        public Gtk.ComboBox el;
        private DialogTemplateSelect  _this;


            // my vars (def)

        // ctor 
        public Xcls_combo(DialogTemplateSelect _owner )
        {
            _this = _owner;
            _this.combo = this;
            this.el = new Gtk.ComboBox();

            // my vars (dec)

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

        // user defined functions 
    }
    public class Xcls_cellrenderer : Object 
    {
        public Gtk.CellRendererText el;
        private DialogTemplateSelect  _this;


            // my vars (def)

        // ctor 
        public Xcls_cellrenderer(DialogTemplateSelect _owner )
        {
            _this = _owner;
            _this.cellrenderer = this;
            this.el = new Gtk.CellRendererText();

            // my vars (dec)

            // set gobject values
        }

        // user defined functions 
    }
    public class Xcls_model : Object 
    {
        public Gtk.ListStore el;
        private DialogTemplateSelect  _this;


            // my vars (def)

        // ctor 
        public Xcls_model(DialogTemplateSelect _owner )
        {
            _this = _owner;
            _this.model = this;
            this.el = new Gtk.ListStore( 2, typeof(string),typeof(string) );

            // my vars (dec)

            // set gobject values
        }

        // user defined functions 
        public void loadData (GLib.List<string> data) {
            this.el.clear();                                    
            Gtk.TreeIter iter;
            var el = this.el;
            
           /// el.append(out iter);
            
             
           // el.set_value(iter, 0, "");
           // el.set_value(iter, 1, "aaa  - Just add Element - aaa");
            
            for (var i = 0; i < data.length();i++) {
            
        
                el.append(out iter);
                var str = data.nth_data(i);
                var fn = Path.get_basename (str);
                fn.replace(".json", "");
                
                el.set_value(iter, 0, str);
                el.set_value(iter, 1, fn);
                
            }
            this.el.set_sort_column_id(1, Gtk.SortType.ASCENDING);          
                                             
        }
    }
    public class Xcls_Button8 : Object 
    {
        public Gtk.Button el;
        private DialogTemplateSelect  _this;


            // my vars (def)

        // ctor 
        public Xcls_Button8(DialogTemplateSelect _owner )
        {
            _this = _owner;
            this.el = new Gtk.Button();

            // my vars (dec)

            // set gobject values
            this.el.label = "OK";
        }

        // user defined functions 
    }
    public class Xcls_Button9 : Object 
    {
        public Gtk.Button el;
        private DialogTemplateSelect  _this;


            // my vars (def)

        // ctor 
        public Xcls_Button9(DialogTemplateSelect _owner )
        {
            _this = _owner;
            this.el = new Gtk.Button();

            // my vars (dec)

            // set gobject values
            this.el.label = "OK";
        }

        // user defined functions 
    }
    public class Xcls_Button10 : Object 
    {
        public Gtk.Button el;
        private DialogTemplateSelect  _this;


            // my vars (def)

        // ctor 
        public Xcls_Button10(DialogTemplateSelect _owner )
        {
            _this = _owner;
            this.el = new Gtk.Button();

            // my vars (dec)

            // set gobject values
            this.el.label = "OK";
        }

        // user defined functions 
    }
}
