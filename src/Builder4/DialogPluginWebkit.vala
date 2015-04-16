static Xcls_DialogPluginWebkit  _DialogPluginWebkit;

public class Xcls_DialogPluginWebkit : Object 
{
    public Gtk.Dialog el;
    private Xcls_DialogPluginWebkit  _this;

    public static Xcls_DialogPluginWebkit singleton()
    {
        if (_DialogPluginWebkit == null) {
            _DialogPluginWebkit= new Xcls_DialogPluginWebkit();
        }
        return _DialogPluginWebkit;
    }
    public Xcls_patchview patchview;

        // my vars (def)

    // ctor 
    public Xcls_DialogPluginWebkit()
    {
        _this = this;
        this.el = new Gtk.Dialog();

        // my vars (dec)

        // set gobject values
        this.el.default_height = 500;
        this.el.default_width = 500;
        this.el.deletable = true;
        var child_0 = new Xcls_VBox2( _this );
        child_0.ref();
        this.el.get_content_area().add (  child_0.el  );
    }

    // user defined functions 
    public class Xcls_VBox2 : Object 
    {
        public Gtk.VBox el;
        private Xcls_DialogPluginWebkit  _this;


            // my vars (def)

        // ctor 
        public Xcls_VBox2(Xcls_DialogPluginWebkit _owner )
        {
            _this = _owner;
            this.el = new Gtk.VBox( true, 0 );

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_ScrolledWindow3( _this );
            child_0.ref();
            this.el.pack_end (  child_0.el , true,true,0 );
        }

        // user defined functions 
    }
    public class Xcls_ScrolledWindow3 : Object 
    {
        public Gtk.ScrolledWindow el;
        private Xcls_DialogPluginWebkit  _this;


            // my vars (def)

        // ctor 
        public Xcls_ScrolledWindow3(Xcls_DialogPluginWebkit _owner )
        {
            _this = _owner;
            this.el = new Gtk.ScrolledWindow( null, null );

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_patchview( _this );
            child_0.ref();
            this.el.add (  child_0.el  );

            // init method 

            this.el.set_policy(Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC);
        }

        // user defined functions 
    }
    public class Xcls_patchview : Object 
    {
        public WebKit.WebView el;
        private Xcls_DialogPluginWebkit  _this;


            // my vars (def)

        // ctor 
        public Xcls_patchview(Xcls_DialogPluginWebkit _owner )
        {
            _this = _owner;
            _this.patchview = this;
            this.el = new WebKit.WebView();

            // my vars (dec)

            // set gobject values

            // init method 

            {
                // this may not work!?
                var settings =  this.el.get_settings();
                
                 
                //var fs= new FakeServer(this.el);
                //fs.ref();
                // this was an attempt to change the url perms.. did not work..
                // settings.enable_file_access_from_file_uris = true;
                // settings.enable_offline_web_application_cache - true;
                // settings.enable_universal_access_from_file_uris = true;
               
                 
                
                
                
            
                 // FIXME - base url of script..
                 // we need it so some of the database features work.
                this.el.load_html( "Render not ready" , 
                        //fixme - should be a config option!
                        // or should we catch stuff and fix it up..
                        "xhttp://localhost/app.Builder/"
                );
                    
                    
                
                
            }
        }

        // user defined functions 
    }
}
