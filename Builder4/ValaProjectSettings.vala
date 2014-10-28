static ValaProjectSettings  _ValaProjectSettings;

public class ValaProjectSettings : Object 
{
    public Gtk.Dialog el;
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
        this.el = new Gtk.Dialog();

        // my vars (dec)

        // set gobject values
        this.el.title = "Edit Compile Settings";
        var child_0 = new Xcls_Notebook2( _this );
        child_0.ref();
        var child_1 = new Xcls_Button23( _this );
        child_1.ref();
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
            var child_1 = new Xcls_HPaned12( _this );
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
            var child_4 = new Xcls_Label9( _this );
            child_4.ref();
            this.el.pack_end (  child_4.el , false,false,0 );
            var child_5 = new Xcls_ScrolledWindow10( _this );
            child_5.ref();
            this.el.add (  child_5.el  );
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
            var child_0 = new Xcls_packages_tree( _this );
            child_0.ref();
        }

        // user defined functions 
    }
    public class Xcls_packages_tree : Object 
    {
        public Gtk.TreeView el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_packages_tree(ValaProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.TreeView();

            // my vars (dec)

            // set gobject values
        }

        // user defined functions 
    }
    public class Xcls_Label9 : Object 
    {
        public Gtk.Label el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_Label9(ValaProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.Label( "Available Directories" );

            // my vars (dec)

            // set gobject values
        }

        // user defined functions 
    }
    public class Xcls_ScrolledWindow10 : Object 
    {
        public Gtk.ScrolledWindow el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_ScrolledWindow10(ValaProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.ScrolledWindow( null, null );

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_directory_tree( _this );
            child_0.ref();
        }

        // user defined functions 
    }
    public class Xcls_directory_tree : Object 
    {
        public Gtk.TreeView el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_directory_tree(ValaProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.TreeView();

            // my vars (dec)

            // set gobject values
        }

        // user defined functions 
    }
    public class Xcls_HPaned12 : Object 
    {
        public Gtk.HPaned el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_HPaned12(ValaProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.HPaned();

            // my vars (dec)

            // set gobject values
            this.el.min_position = 300;
            this.el.position = 300;
            var child_0 = new Xcls_ScrolledWindow13( _this );
            child_0.ref();
            var child_1 = new Xcls_set_vbox( _this );
            child_1.ref();
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
            var child_0 = new Xcls_set_tree( _this );
            child_0.ref();
        }

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
            var child_0 = new Xcls_Label16( _this );
            child_0.ref();
            this.el.pack_start (  child_0.el , false,false,0 );
            var child_1 = new Xcls_build_pack_target( _this );
            child_1.ref();
            this.el.pack_end (  child_1.el , false,false,0 );
            var child_2 = new Xcls_Label18( _this );
            child_2.ref();
            this.el.pack_end (  child_2.el , false,false,0 );
            var child_3 = new Xcls_build_compile_flags( _this );
            child_3.ref();
            this.el.pack_end (  child_3.el , false,false,0 );
            var child_4 = new Xcls_Label20( _this );
            child_4.ref();
            this.el.pack_end (  child_4.el , false,false,0 );
            var child_5 = new Xcls_ScrolledWindow21( _this );
            child_5.ref();
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
    public class Xcls_Label18 : Object 
    {
        public Gtk.Label el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_Label18(ValaProjectSettings _owner )
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
    public class Xcls_Label20 : Object 
    {
        public Gtk.Label el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_Label20(ValaProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.Label( "Files to compile" );

            // my vars (dec)

            // set gobject values
        }

        // user defined functions 
    }
    public class Xcls_ScrolledWindow21 : Object 
    {
        public Gtk.ScrolledWindow el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_ScrolledWindow21(ValaProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.ScrolledWindow( null, null );

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_packages_tree( _this );
            child_0.ref();
        }

        // user defined functions 
    }
    public class Xcls_packages_tree : Object 
    {
        public Gtk.TreeView el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_packages_tree(ValaProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.TreeView();

            // my vars (dec)

            // set gobject values
        }

        // user defined functions 
    }
    public class Xcls_Button23 : Object 
    {
        public Gtk.Button el;
        private ValaProjectSettings  _this;


            // my vars (def)

        // ctor 
        public Xcls_Button23(ValaProjectSettings _owner )
        {
            _this = _owner;
            this.el = new Gtk.Button();

            // my vars (dec)

            // set gobject values
        }

        // user defined functions 
    }
}
