static ValaProjectSettings  _ValaProjectSettings;

public class ValaProjectSettings : Object 
{
    public Gtk.VBox el;
    private ValaProjectSettings  _this;

    public static ValaProjectSettings singleton()
    {
        if (_ValaProjectSettings == null) {
            _ValaProjectSettings= new ValaProjectSettings();
        }
        return _ValaProjectSettings;
    }
    public Xcls_label_global label_global;
    public Xcls_label_targets label_targets;
    public Xcls_compile_flags compile_flags;
    public Xcls_default_packages_tree_store default_packages_tree_store;
    public Xcls_packages_render packages_render;
    public Xcls_packages_render packages_render;
    public Xcls_default_directory_tree_store default_directory_tree_store;
    public Xcls_directory_render directory_render;
    public Xcls_targets_tree targets_tree;
    public Xcls_targets_render targets_render;
    public Xcls_files_render files_render;

        // my vars (def)
    public Project.Gtk project;

    // ctor 
    public ValaProjectSettings()
    {
        _this = this;
        this.el = new Gtk.VBox( true, 0 );

        // my vars (dec)
        this.project = null;

        // set gobject values
        var child_0 = new Xcls_Notebook2( _this );
        child_0.ref();
        this.el.pack_start (  child_0.el , true,true,0 );
    }

    // user defined functions 
    public void show (Project.Gtk project) {
    
        this.project=  project;
    
        this.compile_flags.el.text = "";
        this.default_packages_tree_store.el.clear();
        this.default_directory_tree_store.el.clear();    
        
        if (this.project.compilegroups.has_key("default")) {
            var def = this.project.compilegroups.get("default");
            this.compile_flags.el.text = def.compile_flags;
            this.default_packages_tree_store.load(def.packages);
            this.default_directory_tree_store.load(def.sources);
        }
       
    
    
    }
    public class Xcls_Notebook2 : Object 
    {
        public Gtk.Notebook el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_Notebook2(ValaProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.Notebook();

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_label_global( _this );
            child_0.ref();
            var child_1 = new Xcls_label_targets( _this );
            child_1.ref();
            var child_2 = new Xcls_VBox5( _this );
            child_2.ref();
            this.el.append_page (  child_2.el , _this.label_global.el );
            var child_3 = new Xcls_HPaned22( _this );
            child_3.ref();
            this.el.append_page (  child_3.el , _this.label_targets.el );
        }

        // user defined functions 
    }
    public class Xcls_label_global : Object 
    {
        public Gtk.Label el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_label_global(ValaProjectSettings _owner )
        {
            _this = _owner;
            _this.label_global = this;
            this.el = new Gtk.Label( "Global" );

            // my vars (dec)

            // set gobject values
        }

        // user defined functions 
    }
    public class Xcls_label_targets : Object 
    {
        public Gtk.Label el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_label_targets(ValaProjectSettings _owner )
        {
            _this = _owner;
            _this.label_targets = this;
            this.el = new Gtk.Label( "Targets" );

            // my vars (dec)

            // set gobject values
        }

        // user defined functions 
    }
    public class Xcls_VBox5 : Object 
    {
        public Gtk.VBox el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_VBox5(ValaProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.VBox( false, 0 );

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_Label6( _this );
            child_0.ref();
            this.el.pack_start (  child_0.el , false,false,0 );
            var child_1 = new Xcls_compile_flags( _this );
            child_1.ref();
            this.el.pack_start (  child_1.el , false,false,0 );
            var child_2 = new Xcls_Label8( _this );
            child_2.ref();
            this.el.pack_start (  child_2.el , false,false,0 );
            var child_3 = new Xcls_ScrolledWindow9( _this );
            child_3.ref();
            this.el.pack_start (  child_3.el , true,true,0 );
            var child_4 = new Xcls_Label16( _this );
            child_4.ref();
            this.el.pack_start (  child_4.el , false,false,0 );
            var child_5 = new Xcls_ScrolledWindow17( _this );
            child_5.ref();
            this.el.pack_start (  child_5.el , true,true,0 );
        }

        // user defined functions 
    }
    public class Xcls_Label6 : Object 
    {
        public Gtk.Label el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_Label6(ValaProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.Label( "compile flags" );

            // my vars (dec)

            // set gobject values
        }

        // user defined functions 
    }
    public class Xcls_compile_flags : Object 
    {
        public Gtk.Entry el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_compile_flags(ValaProjectSettings _owner )
        {
            _this = _owner;
            _this.compile_flags = this;
            this.el = new Gtk.Entry();

            // my vars (dec)

            // set gobject values
        }

        // user defined functions 
    }
    public class Xcls_Label8 : Object 
    {
        public Gtk.Label el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_Label8(ValaProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.Label( "packages" );

            // my vars (dec)

            // set gobject values
        }

        // user defined functions 
    }
    public class Xcls_ScrolledWindow9 : Object 
    {
        public Gtk.ScrolledWindow el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_ScrolledWindow9(ValaProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.ScrolledWindow( null, null );

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_default_packages_tree( _this );
            child_0.ref();
            this.el.add (  child_0.el  );
        }

        // user defined functions 
    }
    public class Xcls_default_packages_tree : Object 
    {
        public Gtk.TreeView el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_default_packages_tree(ValaProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.TreeView();

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_default_packages_tree_store( _this );
            child_0.ref();
            this.el.set_model (  child_0.el  );
            var child_1 = new Xcls_TreeViewColumn12( _this );
            child_1.ref();
            this.el.append_column (  child_1.el  );
            var child_2 = new Xcls_TreeViewColumn14( _this );
            child_2.ref();
            this.el.append_column (  child_2.el  );
        }

        // user defined functions 
    }
    public class Xcls_default_packages_tree_store : Object 
    {
        public Gtk.ListStore el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_default_packages_tree_store(ValaProjectSettings _owner )
        {
            _this = _owner;
            _this.default_packages_tree_store = this;
            this.el = new Gtk.ListStore( 2,     typeof(string),  // 0 key type
     typeof(string) // ??
      );

            // my vars (dec)

            // set gobject values
        }

        // user defined functions 
        public void load (Gee.ArrayList items) {
         
        
        
        
        
            Gtk.TreeIter citer;
        
            for(var i =0 ; i < items.size; i++) {
                 this.model.el.append(out citer);   
                 
                this.model.el.set_value(citer, 0,   items.get(i) ); // title 
                this.model.el.set_value(citer, 1,   items.get(i) );
            }
            this.model.el.set_sort_column_id(0,Gtk.SortType.ASCENDING);
            
        }
    }
    public class Xcls_TreeViewColumn12 : Object 
    {
        public Gtk.TreeViewColumn el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_TreeViewColumn12(ValaProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.TreeViewColumn();

            // my vars (dec)

            // set gobject values
            this.el.title = "name";
            this.el.resizable = true;
            var child_0 = new Xcls_packages_render( _this );
            child_0.ref();
            this.el.pack_start (  child_0.el , false );

            // init method 

            this.el.add_attribute(_this.packages_render.el , "markup", 2 );
             this.el.add_attribute(_this.packages_render.el , "text", 1 );        }

        // user defined functions 
    }
    public class Xcls_packages_render : Object 
    {
        public Gtk.CellRendererText el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_packages_render(ValaProjectSettings _owner )
        {
            _this = _owner;
            _this.packages_render = this;
            this.el = new Gtk.CellRendererText();

            // my vars (dec)

            // set gobject values
        }

        // user defined functions 
    }
    public class Xcls_TreeViewColumn14 : Object 
    {
        public Gtk.TreeViewColumn el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_TreeViewColumn14(ValaProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.TreeViewColumn();

            // my vars (dec)

            // set gobject values
            this.el.title = "use";
            this.el.resizable = true;
            var child_0 = new Xcls_packages_render( _this );
            child_0.ref();
            this.el.pack_start (  child_0.el , false );

            // init method 

            this.el.add_attribute(_this.packages_render.el , "markup", 2 );
             this.el.add_attribute(_this.packages_render.el , "text", 1 );        }

        // user defined functions 
    }
    public class Xcls_packages_render : Object 
    {
        public Gtk.CellRendererText el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_packages_render(ValaProjectSettings _owner )
        {
            _this = _owner;
            _this.packages_render = this;
            this.el = new Gtk.CellRendererText();

            // my vars (dec)

            // set gobject values
        }

        // user defined functions 
    }
    public class Xcls_Label16 : Object 
    {
        public Gtk.Label el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_Label16(ValaProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.Label( "Available Directories" );

            // my vars (dec)

            // set gobject values
        }

        // user defined functions 
    }
    public class Xcls_ScrolledWindow17 : Object 
    {
        public Gtk.ScrolledWindow el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_ScrolledWindow17(ValaProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.ScrolledWindow( null, null );

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_default_directory_tree( _this );
            child_0.ref();
            this.el.add (  child_0.el  );
        }

        // user defined functions 
    }
    public class Xcls_default_directory_tree : Object 
    {
        public Gtk.TreeView el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_default_directory_tree(ValaProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.TreeView();

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_default_directory_tree_store( _this );
            child_0.ref();
            this.el.set_model (  child_0.el  );
            var child_1 = new Xcls_TreeViewColumn20( _this );
            child_1.ref();
            this.el.append_column (  child_1.el  );
        }

        // user defined functions 
    }
    public class Xcls_default_directory_tree_store : Object 
    {
        public Gtk.ListStore el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_default_directory_tree_store(ValaProjectSettings _owner )
        {
            _this = _owner;
            _this.default_directory_tree_store = this;
            this.el = new Gtk.ListStore( 2,     typeof(string),  // 0 key type
     typeof(string) // ??
      );

            // my vars (dec)

            // set gobject values
        }

        // user defined functions 
        public void load (Gee.ArrayList items) {
         
         
            Gtk.TreeIter citer;
        
            for(var i =0 ; i < items.size; i++) {
                 this.model.el.append(out citer);   
                 
                this.model.el.set_value(citer, 0,   items.get(i) ); // title 
                this.model.el.set_value(citer, 1,   items.get(i) );
            }
            this.model.el.set_sort_column_id(0,Gtk.SortType.ASCENDING);
            
        }
    }
    public class Xcls_TreeViewColumn20 : Object 
    {
        public Gtk.TreeViewColumn el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_TreeViewColumn20(ValaProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.TreeViewColumn();

            // my vars (dec)

            // set gobject values
            this.el.title = "name";
            this.el.resizable = true;
            var child_0 = new Xcls_directory_render( _this );
            child_0.ref();
            this.el.pack_start (  child_0.el , false );

            // init method 

            this.el.add_attribute(_this.directory_render.el , "markup", 2 );
             this.el.add_attribute(_this.directory_render.el , "text", 1 );        }

        // user defined functions 
    }
    public class Xcls_directory_render : Object 
    {
        public Gtk.CellRendererText el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_directory_render(ValaProjectSettings _owner )
        {
            _this = _owner;
            _this.directory_render = this;
            this.el = new Gtk.CellRendererText();

            // my vars (dec)

            // set gobject values
        }

        // user defined functions 
    }
    public class Xcls_HPaned22 : Object 
    {
        public Gtk.HPaned el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_HPaned22(ValaProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.HPaned();

            // my vars (dec)

            // set gobject values
            this.el.position = 300;
            var child_0 = new Xcls_ScrolledWindow23( _this );
            child_0.ref();
            this.el.add1 (  child_0.el  );
            var child_1 = new Xcls_set_vbox( _this );
            child_1.ref();
            this.el.add2 (  child_1.el  );
        }

        // user defined functions 
    }
    public class Xcls_ScrolledWindow23 : Object 
    {
        public Gtk.ScrolledWindow el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_ScrolledWindow23(ValaProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.ScrolledWindow( null, null );

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_targets_tree( _this );
            child_0.ref();

            // init method 

            {  
            this.el.set_policy (Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC);
            
            }        }

        // user defined functions 
    }
    public class Xcls_targets_tree : Object 
    {
        public Gtk.TreeView el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_targets_tree(ValaProjectSettings _owner )
        {
            _this = _owner;
            _this.targets_tree = this;
            this.el = new Gtk.TreeView();

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_ListStore25( _this );
            child_0.ref();
            this.el.set_model (  child_0.el  );
            var child_1 = new Xcls_TreeViewColumn26( _this );
            child_1.ref();
            this.el.append_column (  child_1.el  );
        }

        // user defined functions 
    }
    public class Xcls_ListStore25 : Object 
    {
        public Gtk.ListStore el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_ListStore25(ValaProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.ListStore( 2,     typeof(string),  // 0 key type
     typeof(string) // ??
      );

            // my vars (dec)

            // set gobject values
        }

        // user defined functions 
    }
    public class Xcls_TreeViewColumn26 : Object 
    {
        public Gtk.TreeViewColumn el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_TreeViewColumn26(ValaProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.TreeViewColumn();

            // my vars (dec)

            // set gobject values
            this.el.title = "name";
            this.el.resizable = true;
            var child_0 = new Xcls_targets_render( _this );
            child_0.ref();
            this.el.pack_start (  child_0.el , false );

            // init method 

            this.el.add_attribute(_this.targets_render.el , "markup", 2 );
             this.el.add_attribute(_this.targets_render.el , "text", 1 );        }

        // user defined functions 
    }
    public class Xcls_targets_render : Object 
    {
        public Gtk.CellRendererText el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_targets_render(ValaProjectSettings _owner )
        {
            _this = _owner;
            _this.targets_render = this;
            this.el = new Gtk.CellRendererText();

            // my vars (dec)

            // set gobject values
        }

        // user defined functions 
    }
    public class Xcls_set_vbox : Object 
    {
        public Gtk.VBox el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_set_vbox(ValaProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.VBox( false, 0 );

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_Label29( _this );
            child_0.ref();
            this.el.pack_start (  child_0.el , false,false,0 );
            var child_1 = new Xcls_build_pack_target( _this );
            child_1.ref();
            this.el.pack_start (  child_1.el , false,false,0 );
            var child_2 = new Xcls_Label31( _this );
            child_2.ref();
            this.el.pack_start (  child_2.el , false,false,0 );
            var child_3 = new Xcls_build_compile_flags( _this );
            child_3.ref();
            this.el.pack_start (  child_3.el , false,false,0 );
            var child_4 = new Xcls_Label33( _this );
            child_4.ref();
            this.el.pack_start (  child_4.el , false,false,0 );
            var child_5 = new Xcls_ScrolledWindow34( _this );
            child_5.ref();
            this.el.pack_start (  child_5.el , true,true,0 );
        }

        // user defined functions 
    }
    public class Xcls_Label29 : Object 
    {
        public Gtk.Label el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_Label29(ValaProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.Label( "target filename" );

            // my vars (dec)

            // set gobject values
        }

        // user defined functions 
    }
    public class Xcls_build_pack_target : Object 
    {
        public Gtk.Entry el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_build_pack_target(ValaProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.Entry();

            // my vars (dec)

            // set gobject values
        }

        // user defined functions 
    }
    public class Xcls_Label31 : Object 
    {
        public Gtk.Label el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_Label31(ValaProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.Label( "compile flags" );

            // my vars (dec)

            // set gobject values
        }

        // user defined functions 
    }
    public class Xcls_build_compile_flags : Object 
    {
        public Gtk.Entry el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_build_compile_flags(ValaProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.Entry();

            // my vars (dec)

            // set gobject values
        }

        // user defined functions 
    }
    public class Xcls_Label33 : Object 
    {
        public Gtk.Label el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_Label33(ValaProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.Label( "Files to compile" );

            // my vars (dec)

            // set gobject values
        }

        // user defined functions 
    }
    public class Xcls_ScrolledWindow34 : Object 
    {
        public Gtk.ScrolledWindow el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_ScrolledWindow34(ValaProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.ScrolledWindow( null, null );

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_files_tree( _this );
            child_0.ref();
        }

        // user defined functions 
    }
    public class Xcls_files_tree : Object 
    {
        public Gtk.TreeView el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_files_tree(ValaProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.TreeView();

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_ListStore36( _this );
            child_0.ref();
            this.el.set_model (  child_0.el  );
            var child_1 = new Xcls_TreeViewColumn37( _this );
            child_1.ref();
            this.el.append_column (  child_1.el  );
        }

        // user defined functions 
    }
    public class Xcls_ListStore36 : Object 
    {
        public Gtk.ListStore el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_ListStore36(ValaProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.ListStore( 2,     typeof(string),  // 0 key type
     typeof(string) // ??
      );

            // my vars (dec)

            // set gobject values
        }

        // user defined functions 
    }
    public class Xcls_TreeViewColumn37 : Object 
    {
        public Gtk.TreeViewColumn el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_TreeViewColumn37(ValaProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.TreeViewColumn();

            // my vars (dec)

            // set gobject values
            this.el.title = "name";
            this.el.resizable = true;
            var child_0 = new Xcls_files_render( _this );
            child_0.ref();
            this.el.pack_start (  child_0.el , false );

            // init method 

            this.el.add_attribute(_this.files_render.el , "markup", 2 );
             this.el.add_attribute(_this.files_render.el , "text", 1 );        }

        // user defined functions 
    }
    public class Xcls_files_render : Object 
    {
        public Gtk.CellRendererText el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_files_render(ValaProjectSettings _owner )
        {
            _this = _owner;
            _this.files_render = this;
            this.el = new Gtk.CellRendererText();

            // my vars (dec)

            // set gobject values
        }

        // user defined functions 
    }
}
