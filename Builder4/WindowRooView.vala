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

    public static Xcls_WindowRooView singleton()
    {
        if (WindowRooView == null) {
            WindowRooView= new Xcls_WindowRooView();
        }
        return WindowRooView;
    }
    public Xcls_AutoRedraw AutoRedraw;
    public Xcls_view view;
    public Xcls_inspectorcontainer inspectorcontainer;

        // my vars
    public JsRender.JsRender file;

        // ctor 
    public Xcls_WindowRooView()
    {
        _this = this;
        this.el = new Gtk.VPaned();

        // my vars

        // set gobject values
        var child_0 = new Xcls_VBox2( _this );
        child_0.ref();
        this.el.pack1 (  child_0.el , true,true );
        var child_1 = new Xcls_inspectorcontainer( _this );
        child_1.ref();
        this.el.pack2 (  child_1.el , true,true );
    }

    // userdefined functions 
    public void createThumb() {
            
            
            if (this.file == null) {
                return;
            }
            var filename = this.file.getIconFileName(false);
            
            var  win = this.el.get_parent_window();
            var width = win.get_width();
            var height = win.get_height();
        
            Gdk.Pixbuf screenshot = Gdk.pixbuf_get_from_window(win, 0, 0, width, this.el.position);
        
            screenshot.save(filename,"png");
            return;
            
            
            
            
            
            
            
            var p = new WebKit.PrintOperation(_this.view.el);
             
            var ps = new Gtk.PrintSettings();
            ps.set_printer("Print to File");
            ps.set("output-file-format", "pdf");
            ps.set("output-uri", "file://" + filename + ".pdf");
        
            // find the printer...
            
            /*
            var ar = Gtk.PaperSize.get_paper_sizes(false);
            var psetup = new Gtk.PageSetup();
            for(var i = 0; i < ar.length(); i++) {
                if (ar.nth_data(i).get_name() =="iso_a4") {
                    psetup.set_paper_size(ar.nth_data(i));
                }
            }
            psetup.set_orientation(Gtk.PageOrientation.LANDSCAPE);
            
             
            p.set_page_setup(psetup);
            */
            p.set_print_settings(ps);
            
            p.finished.connect(() => {
                print("creating thumbnail for " + filename + ".pdf\n"); 
                var s = new Cairo.PdfSurface(filename + ".pdf", 400,400);
            
                s.write_to_png (filename);
                
               // var f = GLib.File.new_for_path (filename + ".pdf");
               // f.delete();
            });
            
            
            p.print();
            
            // should we hold until it's printed...
            
              
        
            
            
        
        
            
             
        }
    public void loadFile(JsRender.JsRender file)
        {
            this.file = file;
            this.view.renderJS(true);
        }
    public void requestRedraw() {
            this.view.renderJS(false);
        }

    // skip |xns - no return type
    public class Xcls_VBox2 : Object 
    {
        public Gtk.VBox el;
        private Xcls_WindowRooView  _this;


            // my vars

            // ctor 
        public Xcls_VBox2(Xcls_WindowRooView _owner )
        {
            _this = _owner;
            this.el = new Gtk.VBox( false, 0 );

            // my vars

            // set gobject values
            var child_0 = new Xcls_HBox3( _this );
            child_0.ref();
            this.el.pack_start (  child_0.el , false,true,0 );
            var child_1 = new Xcls_ScrolledWindow7( _this );
            child_1.ref();
            this.el.pack_end (  child_1.el , true,true,0 );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_HBox3 : Object 
    {
        public Gtk.HBox el;
        private Xcls_WindowRooView  _this;


            // my vars

            // ctor 
        public Xcls_HBox3(Xcls_WindowRooView _owner )
        {
            _this = _owner;
            this.el = new Gtk.HBox( true, 0 );

            // my vars

            // set gobject values
            this.el.height_request = 20;
            this.el.vexpand = false;
            var child_0 = new Xcls_Button4( _this );
            child_0.ref();
            this.el.pack_start (  child_0.el , false,false,0 );
            var child_1 = new Xcls_AutoRedraw( _this );
            child_1.ref();
            this.el.pack_start (  child_1.el , false,false,0 );
            var child_2 = new Xcls_Button6( _this );
            child_2.ref();
            this.el.pack_start (  child_2.el , false,false,0 );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_Button4 : Object 
    {
        public Gtk.Button el;
        private Xcls_WindowRooView  _this;


            // my vars

            // ctor 
        public Xcls_Button4(Xcls_WindowRooView _owner )
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

        // skip |xns - no return type
    }
    public class Xcls_AutoRedraw : Object 
    {
        public Gtk.CheckButton el;
        private Xcls_WindowRooView  _this;


            // my vars

            // ctor 
        public Xcls_AutoRedraw(Xcls_WindowRooView _owner )
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

        // skip |xns - no return type
    }
    public class Xcls_Button6 : Object 
    {
        public Gtk.Button el;
        private Xcls_WindowRooView  _this;


            // my vars

            // ctor 
        public Xcls_Button6(Xcls_WindowRooView _owner )
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

        // skip |xns - no return type
    }
    public class Xcls_ScrolledWindow7 : Object 
    {
        public Gtk.ScrolledWindow el;
        private Xcls_WindowRooView  _this;


            // my vars

            // ctor 
        public Xcls_ScrolledWindow7(Xcls_WindowRooView _owner )
        {
            _this = _owner;
            this.el = new Gtk.ScrolledWindow( null, null );

            // my vars

            // set gobject values
            this.el.shadow_type = Gtk.ShadowType.IN;
            var child_0 = new Xcls_view( _this );
            child_0.ref();
            this.el.add (  child_0.el  );

            // init method 
              this.el.set_policy(Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC);
             
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_view : Object 
    {
        public WebKit.WebView el;
        private Xcls_WindowRooView  _this;


            // my vars
        public GLib.DateTime lastRedraw;
        public WebKit.WebInspector inspector;
        public bool pendingRedraw;
        public bool refreshRequired;
        public int redraws;
        public string renderedData;
        public string runhtml;

            // ctor 
        public Xcls_view(Xcls_WindowRooView _owner )
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
               
                 
                
                this.inspector = this.el.get_inspector();
                this.inspector.open_window.connect(() => {
                
                    print("inspector attach\n");
                    var wv = this.inspector.get_web_view();
                    if (wv != null) {
                        print("got inspector web view\n");
                        _this.inspectorcontainer.el.add(wv);
                        wv.show();
                    } else {
                        print("no web view yet\n");
                    }
                    return true;
                   
                });
                
            
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
                     print("run refresh?");
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
            this.el.show.connect(   ( ) => {
                this.inspector.show();
            } );
        }

        // userdefined functions 
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
             
             
                // then we need to reload the browser using
                // load_html_string..
            
                // then trigger a redraw once it's loaded..
                this.pendingRedraw = true;
            
                var runhtml = "<script type=\"text/javascript\">\n" ;
                string builderhtml;
                GLib.FileUtils.get_contents(Builder4.Application.configDirectory() + "/resources/builder.html.js", out builderhtml);
            
                runhtml += builderhtml + "\n";
                runhtml += "</script>\n" ;
            
                // fix to make sure they are the same..
                this.runhtml = project.runhtml;
                // need to modify paths
            
                string inhtml;
                var base_template = _this.file.project.base_template;
                
                GLib.FileUtils.get_contents(
                    Builder4.Application.configDirectory() + "/resources/" + 
                        (base_template.length > 0 ? base_template :  "roo.builder.html")
                        , out inhtml);
                
                
                this.renderedData = js;
            
            
                string js_src = js + "\n" +
            	"Roo.onReady(function() {\n" +
            	"if (" + _this.file.name +".show) " +  _this.file.name +".show({});\n" +
            	"Roo.XComponent.build();\n" +
            	"});\n";
            	
                print("render js: " + js);
                //if (!this.ready) {
              //      console.log('not loaded yet');
                //}
                this.lastRedraw = new DateTime.now_local();
            
                    var html = inhtml.replace("</head>", runhtml + this.runhtml + 
                    
                            "<script type=\"text/javascript\">\n" +
                            js_src + "\n" + 
                            "</script>" + 
                                    
                    "</head>");
                    print("LOAD HTML " + html);
                    
                     var rootURL = _this.file.project.rootURL;
               
                    
                    
                    this.el.load_html( html , 
                        //fixme - should be a config option!
                        (rootURL.length > 0 ? rootURL : "http://localhost/app.Builder/")
                    );
                    
            //     print( "before render" +    this.lastRedraw);
            //    print( "after render" +    (new Date()));
                
            }

        // skip |xns - no return type
    }
    public class Xcls_inspectorcontainer : Object 
    {
        public Gtk.ScrolledWindow el;
        private Xcls_WindowRooView  _this;


            // my vars

            // ctor 
        public Xcls_inspectorcontainer(Xcls_WindowRooView _owner )
        {
            _this = _owner;
            _this.inspectorcontainer = this;
            this.el = new Gtk.ScrolledWindow( null, null );

            // my vars

            // set gobject values
            this.el.shadow_type = Gtk.ShadowType.IN;

            // init method 
              this.el.set_policy(Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC);
             
        }

        // userdefined functions 

        // skip |xns - no return type
    }
}
