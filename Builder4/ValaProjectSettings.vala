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

        // my vars (def)

    // ctor 
    public ValaProjectSettings()
    {
        _this = this;
        this.el = new Gtk.VBox( true, 0 );

        // my vars (dec)

        // set gobject values
        var child_0 = new Xcls_Notebook2( _this );
        child_0.ref();
        this.el.pack_start (  child_0.el , true,true,0 );
    }

    // user defined functions 
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
            var child_0 = new Xcls_VBox3( _this );
            child_0.ref();
            this.el.add (  child_0.el  );
            var child_1 = new Xcls_HPaned18( _this );
            child_1.ref();
            this.el.add (  child_1.el  );
        }

        // user defined functions 
    }
    public class Xcls_VBox3 : Object 
    {
        public Gtk.VBox el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_VBox3(ValaProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.VBox( false, 0 );

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_Label4( _this );
            child_0.ref();
            this.el.pack_start (  child_0.el , false,false,0 );
            var child_1 = new Xcls_compile_flags( _this );
            child_1.ref();
            this.el.pack_end (  child_1.el , false,false,0 );
            var child_2 = new Xcls_Label6( _this );
            child_2.ref();
            this.el.pack_end (  child_2.el , false,false,0 );
            var child_3 = new Xcls_ScrolledWindow7( _this );
            child_3.ref();
            this.el.pack_end (  child_3.el , true,true,0 );
            var child_4 = new Xcls_Label12( _this );
            child_4.ref();
            this.el.pack_end (  child_4.el , false,false,0 );
            var child_5 = new Xcls_ScrolledWindow13( _this );
            child_5.ref();
            this.el.pack_end (  child_5.el , true,true,0 );
        }

        // user defined functions 
    }
    public class Xcls_Label4 : Object 
    {
        public Gtk.Label el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_Label4(ValaProjectSettings _owner )
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
            this.el = new Gtk.Entry();

            // my vars (dec)

            // set gobject values
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
            this.el = new Gtk.Label( "packages" );

            // my vars (dec)

            // set gobject values
        }

        // user defined functions 
    }
    public class Xcls_ScrolledWindow7 : Object 
    {
        public Gtk.ScrolledWindow el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_ScrolledWindow7(ValaProjectSettings _owner )
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
            var child_0 = new Xcls_ListStore9( _this );
            child_0.ref();
            this.el.set_model (  child_0.el  );
            var child_1 = new Xcls_TreeViewColumn10( _this );
            child_1.ref();
            this.el.append_column (  child_1.el  );
        }

        // user defined functions 
    }
    public class Xcls_ListStore9 : Object 
    {
        public Gtk.ListStore el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_ListStore9(ValaProjectSettings _owner )
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
    public class Xcls_TreeViewColumn10 : Object 
    {
        public Gtk.TreeViewColumn el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_TreeViewColumn10(ValaProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.TreeViewColumn();

            // my vars (dec)

            // set gobject values
            this.el.title = "name";
            this.el.resizable = true;
            var child_0 = new Xcls_CellRendererText11( _this );
            child_0.ref();
            this.el.pack_start (  child_0.el , false );

            // init method 

            this.el.add_attribute(_this.keyrender.el , "markup", 2 );
             this.el.add_attribute(_this.keyrender.el , "text", 1 );        }

        // user defined functions 
    }
    public class Xcls_CellRendererText11 : Object 
    {
        public Gtk.CellRendererText el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_CellRendererText11(ValaProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.CellRendererText();

            // my vars (dec)

            // set gobject values
        }

        // user defined functions 
    }
    public class Xcls_Label12 : Object 
    {
        public Gtk.Label el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_Label12(ValaProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.Label( "Available Directories" );

            // my vars (dec)

            // set gobject values
        }

        // user defined functions 
    }
    public class Xcls_ScrolledWindow13 : Object 
    {
        public Gtk.ScrolledWindow el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_ScrolledWindow13(ValaProjectSettings _owner )
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
            var child_0 = new Xcls_ListStore15( _this );
            child_0.ref();
            this.el.set_model (  child_0.el  );
            var child_1 = new Xcls_TreeViewColumn16( _this );
            child_1.ref();
            this.el.append_column (  child_1.el  );
        }

        // user defined functions 
    }
    public class Xcls_ListStore15 : Object 
    {
        public Gtk.ListStore el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_ListStore15(ValaProjectSettings _owner )
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
    public class Xcls_TreeViewColumn16 : Object 
    {
        public Gtk.TreeViewColumn el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_TreeViewColumn16(ValaProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.TreeViewColumn();

            // my vars (dec)

            // set gobject values
            this.el.title = "name";
            this.el.resizable = true;
            var child_0 = new Xcls_CellRendererText17( _this );
            child_0.ref();
            this.el.pack_start (  child_0.el , false );

            // init method 

            this.el.add_attribute(_this.keyrender.el , "markup", 2 );
             this.el.add_attribute(_this.keyrender.el , "text", 1 );        }

        // user defined functions 
    }
    public class Xcls_CellRendererText17 : Object 
    {
        public Gtk.CellRendererText el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_CellRendererText17(ValaProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.CellRendererText();

            // my vars (dec)

            // set gobject values
        }

        // user defined functions 
    }
    public class Xcls_HPaned18 : Object 
    {
        public Gtk.HPaned el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_HPaned18(ValaProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.HPaned();

            // my vars (dec)

            // set gobject values
            this.el.position = 300;
            var child_0 = new Xcls_ScrolledWindow19( _this );
            child_0.ref();
            this.el.add1 (  child_0.el  );
            var child_1 = new Xcls_set_vbox( _this );
            child_1.ref();
            this.el.add2 (  child_1.el  );
        }

        // user defined functions 
    }
    public class Xcls_ScrolledWindow19 : Object 
    {
        public Gtk.ScrolledWindow el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_ScrolledWindow19(ValaProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.ScrolledWindow( null, null );

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_set_tree( _this );
            child_0.ref();

            // init method 

            {  
            this.el.set_policy (Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC);
            
            }        }

        // user defined functions 
    }
    public class Xcls_set_tree : Object 
    {
        public Gtk.TreeView el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_set_tree(ValaProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.TreeView();

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
            var child_0 = new Xcls_Label22( _this );
            child_0.ref();
            this.el.pack_start (  child_0.el , false,false,0 );
            var child_1 = new Xcls_build_pack_target( _this );
            child_1.ref();
            this.el.pack_end (  child_1.el , false,false,0 );
            var child_2 = new Xcls_Label24( _this );
            child_2.ref();
            this.el.pack_end (  child_2.el , false,false,0 );
            var child_3 = new Xcls_build_compile_flags( _this );
            child_3.ref();
            this.el.pack_end (  child_3.el , false,false,0 );
            var child_4 = new Xcls_Label26( _this );
            child_4.ref();
            this.el.pack_end (  child_4.el , false,false,0 );
            var child_5 = new Xcls_ScrolledWindow27( _this );
            child_5.ref();
        }

        // user defined functions 
    }
    public class Xcls_Label22 : Object 
    {
        public Gtk.Label el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_Label22(ValaProjectSettings _owner )
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
    public class Xcls_Label24 : Object 
    {
        public Gtk.Label el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_Label24(ValaProjectSettings _owner )
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
    public class Xcls_Label26 : Object 
    {
        public Gtk.Label el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_Label26(ValaProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.Label( "Files to compile" );

            // my vars (dec)

            // set gobject values
        }

        // user defined functions 
    }
    public class Xcls_ScrolledWindow27 : Object 
    {
        public Gtk.ScrolledWindow el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_ScrolledWindow27(ValaProjectSettings _owner )
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
        }

        // user defined functions 
    }
}
