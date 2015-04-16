static DialogPluginWebkit  _DialogPluginWebkit;

public class DialogPluginWebkit : Object 
{
    public Gtk.Dialog el;
    private DialogPluginWebkit  _this;

    public static DialogPluginWebkit singleton()
    {
        if (_DialogPluginWebkit == null) {
            _DialogPluginWebkit= new DialogPluginWebkit();
        }
        return _DialogPluginWebkit;
    }
    public Xcls_patchview patchview;

        // my vars (def)

    // ctor 
    public DialogPluginWebkit()
    {
        _this = this;
        this.el = new Gtk.Dialog();

        // my vars (dec)

        // set gobject values
        var child_0 = new Xcls_VBox2( _this );
        child_0.ref();
        this.el.get_content_area().add (  child_0.el  );
    }

    // user defined functions 
    public class Xcls_VBox2 : Object 
    {
        public Gtk.VBox el;
        private DialogPluginWebkit  _this;


            // my vars (def)

        // ctor 
        public Xcls_VBox2(DialogPluginWebkit _owner )
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
        private DialogPluginWebkit  _this;


            // my vars (def)

        // ctor 
        public Xcls_ScrolledWindow3(DialogPluginWebkit _owner )
        {
            _this = _owner;
            this.el = new Gtk.ScrolledWindow( null, null );

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_patchview( _this );
            child_0.ref();
            this.el.add (  child_0.el  );

            // init method 

            function() {
                XObject.prototype.init.call(this);
                  this.el.set_policy (Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC)
            }
        }

        // user defined functions 
    }
    public class Xcls_patchview : Object 
    {
        public WebKit.WebView el;
        private DialogPluginWebkit  _this;


            // my vars (def)

        // ctor 
        public Xcls_patchview(DialogPluginWebkit _owner )
        {
            _this = _owner;
            _this.patchview = this;
            this.el = new WebKit.WebView();

            // my vars (dec)

            // set gobject values
        }

        // user defined functions 
    }
}
