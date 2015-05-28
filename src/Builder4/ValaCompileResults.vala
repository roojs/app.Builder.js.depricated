static Xcls_ValaCompileResults  _ValaCompileResults;

public class Xcls_ValaCompileResults : Object
{
    public Gtk.Popover el;
    private Xcls_ValaCompileResults  _this;

    public static Xcls_ValaCompileResults singleton()
    {
        if (_ValaCompileResults == null) {
            _ValaCompileResults= new Xcls_ValaCompileResults();
        }
        return _ValaCompileResults;
    }
    public Xcls_compile_view compile_view;
    public Xcls_sourceview sourceview;

        // my vars (def)
    public Xcls_MainWindow window;
    public bool active;

    // ctor
    public Xcls_ValaCompileResults()
    {
        _this = this;
        this.el = new Gtk.Popover( null );

        // my vars (dec)
        this.active = false;

        // set gobject values
        this.el.width_request = 600;
        this.el.height_request = 400;
        this.el.modal = true;
        this.el.position = Gtk.PositionType.TOP;
        var child_0 = new Xcls_compile_view( _this );
        child_0.ref();
        this.el.add (  child_0.el  );
    }

    // user defined functions
    public void show ( Gtk.Widget onbtn, bool reset) {
    	this.window.el.get_size(out w, out h);
        
        // left tree = 250, editor area = 500?
        
        var new_w = int.min(500, w-100);
        if (new_w > (w-100)) {
            new_w = w-100;
        }
        this.el.set_size_request( int.max(100, new_w), int.max(100, h-120));
     
    
        if (this.el.relative_to == null) {
            this.el.set_relative_to(onbtn);
        }
        this.el.show_all();
       // not sure why..
       
       
       
        while(Gtk.events_pending()) { 
                Gtk.main_iteration();
        }
        if (reset) {
    		var buf = (Gtk.SourceBuffer)this.sourceview.el.get_buffer();
    		buf.set_text("",0);
    	}
        
        
    }
    public class Xcls_compile_view : Object
    {
        public Gtk.Box el;
        private Xcls_ValaCompileResults  _this;


            // my vars (def)

        // ctor
        public Xcls_compile_view(Xcls_ValaCompileResults _owner )
        {
            _this = _owner;
            _this.compile_view = this;
            this.el = new Gtk.Box( Gtk.Orientation.VERTICAL, 0 );

            // my vars (dec)

            // set gobject values
            this.el.homogeneous = false;
            var child_0 = new Xcls_ScrolledWindow3( _this );
            child_0.ref();
            this.el.pack_end (  child_0.el , true,true,0 );
        }

        // user defined functions
    }
    public class Xcls_ScrolledWindow3 : Object
    {
        public Gtk.ScrolledWindow el;
        private Xcls_ValaCompileResults  _this;


            // my vars (def)

        // ctor
        public Xcls_ScrolledWindow3(Xcls_ValaCompileResults _owner )
        {
            _this = _owner;
            this.el = new Gtk.ScrolledWindow( null, null );

            // my vars (dec)

            // set gobject values
            this.el.hexpand = true;
            var child_0 = new Xcls_sourceview( _this );
            child_0.ref();
            this.el.add (  child_0.el  );

            // init method

            {
             this.el.set_policy (Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC);
             
            
            }
        }

        // user defined functions
    }
    public class Xcls_sourceview : Object
    {
        public Gtk.SourceView el;
        private Xcls_ValaCompileResults  _this;


            // my vars (def)

        // ctor
        public Xcls_sourceview(Xcls_ValaCompileResults _owner )
        {
            _this = _owner;
            _this.sourceview = this;
            this.el = new Gtk.SourceView();

            // my vars (dec)

            // set gobject values
            this.el.editable = false;
            this.el.show_line_numbers = true;

            // init method

            {
            
                var description =   Pango.FontDescription.from_string("monospace");
                description.set_size(8000);
                this.el.override_font(description);
            
            
            }
        }

        // user defined functions
    }



}
