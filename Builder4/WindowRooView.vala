/* -- to compile
valac  --pkg gio-2.0  --pkg posix  --pkg gtk+-3.0 --pkg libnotify --pkg gtksourceview-3.0  --pkg  libwnck-3.0 \
    /tmp/WindowRooView.vala  -o /tmp/WindowRooView
*/


/* -- to test class
static int main (string[] args) {
    Gtk.init (ref args);
    new Xcls_WindowRooView();
    WindowRooView.show_all();
     Gtk.main ();
    return 0;
}
*/


public static Xcls_WindowRooView  WindowRooView;

public class Xcls_WindowRooView : Object 
{
    public Gtk.VPaned el;
    private Xcls_WindowRooView  _this;

    public Xcls_AutoRedraw AutoRedraw;
    public Xcls_view view;
    public Xcls_inspector inspector;

        // my vars
    public JsRender.JsRender file;

        // ctor 
    public Xcls_WindowRooView()
    {
        _this = this;
        WindowRooView = this;
        this.el = new Gtk.VPaned();

        // my vars

        // set gobject values
        var child_0 = new Xcls_VBox2(_this);
        child_0.ref();
        var child_1 = new Xcls_ScrolledWindow9(_this);
        child_1.ref();
        this.el.add (  child_1.el  );
    }

    // userdefined functions 

    // skip .JsRender.JsRender:file - already used 

    // skip id - not pipe 

    // skip pack - not pipe 

    // skip xtype - not pipe 
    public void loadFile(JsRender.JsRender file)
        {
            this.file = file;
            this.view.renderJS(true);
        }

    // skip |xns - no return type

    // skip items - not pipe 

    // skip xvala_cls - not pipe 

    // skip xvala_xcls - not pipe 

    // skip xvala_id - not pipe 
    public class Xcls_VBox2 : Object 
    {
        public Gtk.VBox el;
        private Xcls_WindowRooView  _this;


            // my vars

            // ctor 
        public Xcls_VBox2(Xcls_WindowRooView _owner)
        {
            _this = _owner;
            this.el = new Gtk.VBox( true, 0 );

            // my vars

            // set gobject values
            var child_0 = new Xcls_HBox3(_this);
            child_0.ref();
            this.el.pack_start (  child_0.el , false,true,0 );
            var child_1 = new Xcls_ScrolledWindow7(_this);
            child_1.ref();
            this.el.add (  child_1.el  );
        }

        // userdefined functions 

        // skip |xns - no return type

        // skip xtype - not pipe 

        // skip pack - not pipe 

        // skip items - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_HBox3 : Object 
    {
        public Gtk.HBox el;
        private Xcls_WindowRooView  _this;


            // my vars

            // ctor 
        public Xcls_HBox3(Xcls_WindowRooView _owner)
        {
            _this = _owner;
            this.el = new Gtk.HBox( true, 0 );

            // my vars

            // set gobject values
            var child_0 = new Xcls_Button4(_this);
            child_0.ref();
            this.el.pack_start (  child_0.el , false,false,0 );
            var child_1 = new Xcls_AutoRedraw(_this);
            child_1.ref();
            this.el.pack_start (  child_1.el , false,false,0 );
            var child_2 = new Xcls_Button6(_this);
            child_2.ref();
            this.el.pack_start (  child_2.el , false,false,0 );
        }

        // userdefined functions 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |xns - no return type

        // skip items - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_Button4 : Object 
    {
        public Gtk.Button el;
        private Xcls_WindowRooView  _this;


            // my vars

            // ctor 
        public Xcls_Button4(Xcls_WindowRooView _owner)
        {
            _this = _owner;
            this.el = new Gtk.Button();

            // my vars

            // set gobject values
            this.el.label = "Redraw";

            // listeners 
            this.el.clicked.connect( ( ) => {
                _this.view.renderJS(  true);
            } );
        }

        // userdefined functions 

        // skip listeners - not pipe 

        // skip label - already used 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |xns - no return type

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_AutoRedraw : Object 
    {
        public Gtk.CheckButton el;
        private Xcls_WindowRooView  _this;


            // my vars

            // ctor 
        public Xcls_AutoRedraw(Xcls_WindowRooView _owner)
        {
            _this = _owner;
            _this.AutoRedraw = this;
            this.el = new Gtk.CheckButton();

            // my vars

            // set gobject values
            this.el.active = true;
            this.el.label = "Auto Redraw On";

            // listeners 
            this.el.toggled.connect(  (state) => {
                this.el.set_label(this.el.active  ? "Auto Redraw On" : "Auto Redraw Off");
            } );
        }

        // userdefined functions 

        // skip listeners - not pipe 

        // skip |active - already used 

        // skip id - not pipe 

        // skip label - already used 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |xns - no return type

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_Button6 : Object 
    {
        public Gtk.Button el;
        private Xcls_WindowRooView  _this;


            // my vars

            // ctor 
        public Xcls_Button6(Xcls_WindowRooView _owner)
        {
            _this = _owner;
            this.el = new Gtk.Button();

            // my vars

            // set gobject values
            this.el.label = "Full Redraw";

            // listeners 
            this.el.clicked.connect(  () => {
              _this.view.redraws = 99;
              _this.view.renderJS(true);
            } );
        }

        // userdefined functions 

        // skip listeners - not pipe 

        // skip label - already used 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |xns - no return type

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_ScrolledWindow7 : Object 
    {
        public Gtk.ScrolledWindow el;
        private Xcls_WindowRooView  _this;


            // my vars

            // ctor 
        public Xcls_ScrolledWindow7(Xcls_WindowRooView _owner)
        {
            _this = _owner;
            this.el = new Gtk.ScrolledWindow( null, null );

            // my vars

            // set gobject values
            this.el.shadow_type = Gtk.ShadowType.IN;
            var child_0 = new Xcls_view(_this);
            child_0.ref();
            this.el.add (  child_0.el  );

            // init method 
              this.el.set_policy(Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC);
             
        }

        // userdefined functions 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |init - already used 

        // skip |shadow_type - already used 

        // skip |xns - no return type

        // skip items - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_view : Object 
    {
        public WebKit.WebView el;
        private Xcls_WindowRooView  _this;


            // my vars
        public GLib.DateTime lastRedraw;
        public bool pendingRedraw;
        public bool refreshRequired;
        public int redraws;
        public string renderedData;
        public string runhtml;

            // ctor 
        public Xcls_view(Xcls_WindowRooView _owner)
        {
            _this = _owner;
            _this.view = this;
            this.el = new WebKit.WebView();

            // my vars
            this.lastRedraw = null;
            this.pendingRedraw = false;
            this.refreshRequired = false;
            this.redraws = 0;
            this.renderedData = "";
            this.runhtml = "";

            // set gobject values

            // init method 
             {
                // this may not work!?
                var settings =  this.el.get_settings();
                settings.enable_developer_extras = true;
                
                // this was an attempt to change the url perms.. did not work..
                // settings.enable_file_access_from_file_uris = true;
                // settings.enable_offline_web_application_cache - true;
                // settings.enable_universal_access_from_file_uris = true;
               
                 
                 
                 
                 // FIXME - base url of script..
                 // we need it so some of the database features work.
                this.el.load_html( "Render not ready" , 
                        //fixme - should be a config option!
                        // or should we catch stuff and fix it up..
                        "http://localhost/app.Builder/"
                );
                    
                    
               //this.el.open('file:///' + __script_path__ + '/../builder.html');
                /*
                Gtk.drag_dest_set
                (
                        this.el,              //
                        Gtk.DestDefaults.MOTION  | Gtk.DestDefaults.HIGHLIGHT,
                        null,            // list of targets
                        Gdk.DragAction.COPY         // what to do with data after dropped 
                );
                                        
               // print("RB: TARGETS : " + LeftTree.atoms["STRING"]);
                Gtk.drag_dest_set_target_list(this.el, this.get('/Window').targetList);
                */
                GLib.Timeout.add_seconds(1,  ()  =>{
                    //    print("run refresh?");
                     this.runRefresh(); 
                     return true;
                 });
                
                
            }

            // listeners 
            this.el.drag_drop.connect(   ( ctx, x, y,time, ud) => {
                return false;
                /*
            	print("TARGET: drag-drop");
                    var is_valid_drop_site = true;
                    
                     
                    Gtk.drag_get_data
                    (
                            w,         // will receive 'drag-data-received' signal 
                            ctx,        /* represents the current state of the DnD 
                            this.get('/Window').atoms["STRING"],    /* the target type we want 
                            time            /* time stamp 
                    );
                                    
                                    
                                    /* No target offered by source => error 
                                   
            
            	return  is_valid_drop_site;
            	*/
            } );
        }

        // userdefined functions 

        // skip listeners - not pipe 

        // skip .GLib.DateTime:lastRedraw - already used 

        // skip .bool:pendingRedraw - already used 

        // skip .bool:refreshRequired - already used 

        // skip .int:redraws - already used 

        // skip .string:renderedData - already used 

        // skip .string:runhtml - already used 

        // skip id - not pipe 

        // skip pack - not pipe 

        // skip redraws - not pipe 

        // skip xtype - not pipe 

        // skip |init - already used 
        public void renderJS(bool force) {
            
                // this is the public redraw call..
                // we refresh in a loop privately..
                var autodraw = _this.AutoRedraw.el.active;
                if (!autodraw && !force) {
                    print("Skipping redraw - no force, and autodraw off");
                    return;
                }
                this.refreshRequired  = true;
            }
        public void runRefresh () 
            {
                // this is run every 2 seconds from the init..
            
              
                
                if (!this.refreshRequired) {
                   // print("no refresh required");
                    return;
                }
            
                if (this.lastRedraw != null) {
                   // do not redraw if last redraw was less that 5 seconds ago.
                   if ((int64)(new DateTime.now_local()).difference(this.lastRedraw) < 5000 ) {
                        return;
                    }
                }
                
                if (_this.file == null) {
                    return;
                }
                
                
                 this.refreshRequired = false;
               //  print("HTML RENDERING");
                 
                 
                 //this.get('/BottomPane').el.show();
                 //this.get('/BottomPane').el.set_current_page(2);// webkit inspector
            
                var js = _this.file.toSourcePreview();
            
                if (js.length < 1) {
                    print("no data");
                    return;
                }
            //    var  data = js[0];
                this.redraws++;
              
                var project = _this.file.project;  
            
                 //print (project.fn);
                 // set it to non-empty.
                 
            //     runhtml = runhtml.length ?  runhtml : '<script type="text/javascript"></script>'; 
                
            
              //   this.runhtml  = this.runhtml || '';
                
                 if ((project.runhtml != this.runhtml) || (this.redraws > 10)) {
                    // then we need to reload the browser using
                    // load_html_string..
                    
                    // then trigger a redraw once it's loaded..
                     this.pendingRedraw = true;
                     
                     var runhtml = "<script type=\"text/javascript\">\n" ;
                     string builderhtml;
                     GLib.FileUtils.get_contents("/home/alan/gitlive/app.Builder.js/builder.html.js", out builderhtml);
                     
                     runhtml += builderhtml + "\n";
                     runhtml += "</script>\n" ;
                    
                    // fix to make sure they are the same..
                    this.runhtml = project.runhtml;
                    // need to modify paths
                    
                    string inhtml;
                    GLib.FileUtils.get_contents("/home/alan/gitlive/app.Builder.js/builder.html", out inhtml);
                    
                    
                    var html = inhtml.replace("</head>", runhtml + this.runhtml + "</head>");
                    //print("LOAD HTML " + html);
                    
                    this.el.load_html( html , 
                        //fixme - should be a config option!
                        "http://localhost/app.Builder/"
                    );
                    this.redraws = 0;
                    // should trigger load_finished! - which in truns shoudl set refresh Required;
                    return;
                
                }
                
                
                this.renderedData = js;
            
                
                //if (!this.ready) {
              //      console.log('not loaded yet');
                //}
                this.lastRedraw = new DateTime.now_local();
            
                this.el.run_javascript("Builder.render(" + this.renderedData + ");", null);
            //     print( "before render" +    this.lastRedraw);
            //    print( "after render" +    (new Date()));
                
            }

        // skip |xns - no return type

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_ScrolledWindow9 : Object 
    {
        public Gtk.ScrolledWindow el;
        private Xcls_WindowRooView  _this;


            // my vars

            // ctor 
        public Xcls_ScrolledWindow9(Xcls_WindowRooView _owner)
        {
            _this = _owner;
            this.el = new Gtk.ScrolledWindow( null, null );

            // my vars

            // set gobject values
            var child_0 = new Xcls_inspector(_this);
            child_0.ref();
            this.el.add (  child_0.el  );

            // listeners 
        }

        // userdefined functions 

        // skip xtype - not pipe 

        // skip |xns - no return type

        // skip pack - not pipe 

        // skip listeners - not pipe 

        // skip items - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_inspector : Object 
    {
        public WebKit.WebInspector el;
        private Xcls_WindowRooView  _this;


            // my vars

            // ctor 
        public Xcls_inspector(Xcls_WindowRooView _owner)
        {
            _this = _owner;
            _this.inspector = this;
            this.el = _this.view.el.get_inspector() ;

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip .ctor - not pipe 

        // skip id - not pipe 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |xns - no return type

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
}
