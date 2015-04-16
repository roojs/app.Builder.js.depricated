static Xcls_WindowRooView  _WindowRooView;

public class Xcls_WindowRooView : Object 
{
    public Gtk.VPaned el;
    private Xcls_WindowRooView  _this;

    public static Xcls_WindowRooView singleton()
    {
        if (_WindowRooView == null) {
            _WindowRooView= new Xcls_WindowRooView();
        }
        return _WindowRooView;
    }
    public Xcls_viewbox viewbox;
    public Xcls_AutoRedraw AutoRedraw;
    public Xcls_viewcontainer viewcontainer;
    public Xcls_view view;
    public Xcls_inspectorcontainer inspectorcontainer;

        // my vars (def)
    public JsRender.JsRender file;

    // ctor 
    public Xcls_WindowRooView()
    {
        _this = this;
        this.el = new Gtk.VPaned();

        // my vars (dec)

        // set gobject values
        var child_0 = new Xcls_viewbox( _this );
        child_0.ref();
        this.el.pack1 (  child_0.el , true,true );
        var child_1 = new Xcls_inspectorcontainer( _this );
        child_1.ref();
        this.el.pack2 (  child_1.el , true,true );
    }

    // user defined functions 
    public void createThumb () {
        
        
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
    public void loadFile (JsRender.JsRender file)
    {
        this.file = file;
        this.view.renderJS(true);
    }
    public void requestRedraw () {
        this.view.renderJS(false);
    }
    public class Xcls_viewbox : Object 
    {
        public Gtk.VBox el;
        private Xcls_WindowRooView  _this;


            // my vars (def)

        // ctor 
        public Xcls_viewbox(Xcls_WindowRooView _owner )
        {
            _this = _owner;
            _this.viewbox = this;
            this.el = new Gtk.VBox( false, 0 );

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_HBox3( _this );
            child_0.ref();
            this.el.pack_start (  child_0.el , false,true,0 );
            var child_1 = new Xcls_viewcontainer( _this );
            child_1.ref();
            this.el.pack_end (  child_1.el , true,true,0 );
        }

        // user defined functions 
    }
    public class Xcls_HBox3 : Object 
    {
        public Gtk.HBox el;
        private Xcls_WindowRooView  _this;


            // my vars (def)

        // ctor 
        public Xcls_HBox3(Xcls_WindowRooView _owner )
        {
            _this = _owner;
            this.el = new Gtk.HBox( true, 0 );

            // my vars (dec)

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

        // user defined functions 
    }
    public class Xcls_Button4 : Object 
    {
        public Gtk.Button el;
        private Xcls_WindowRooView  _this;


            // my vars (def)

        // ctor 
        public Xcls_Button4(Xcls_WindowRooView _owner )
        {
            _this = _owner;
            this.el = new Gtk.Button();

            // my vars (dec)

            // set gobject values
            this.el.label = "Redraw";

            // listeners 
            this.el.clicked.connect( ( ) => {
                _this.view.renderJS(  true);
            });
        }

        // user defined functions 
    }
    public class Xcls_AutoRedraw : Object 
    {
        public Gtk.CheckButton el;
        private Xcls_WindowRooView  _this;


            // my vars (def)

        // ctor 
        public Xcls_AutoRedraw(Xcls_WindowRooView _owner )
        {
            _this = _owner;
            _this.AutoRedraw = this;
            this.el = new Gtk.CheckButton();

            // my vars (dec)

            // set gobject values
            this.el.active = true;
            this.el.label = "Auto Redraw On";

            // listeners 
            this.el.toggled.connect( (state) => {
                this.el.set_label(this.el.active  ? "Auto Redraw On" : "Auto Redraw Off");
            });
        }

        // user defined functions 
    }
    public class Xcls_Button6 : Object 
    {
        public Gtk.Button el;
        private Xcls_WindowRooView  _this;


            // my vars (def)

        // ctor 
        public Xcls_Button6(Xcls_WindowRooView _owner )
        {
            _this = _owner;
            this.el = new Gtk.Button();

            // my vars (dec)

            // set gobject values
            this.el.label = "Full Redraw";

            // listeners 
            this.el.clicked.connect( () => {
              _this.view.redraws = 99;
                _this.view.el.web_context.clear_cache();  
              //_this.view.renderJS(true);
              FakeServerCache.clear();
              _this.view.reInit();
            
            });
        }

        // user defined functions 
    }
    public class Xcls_viewcontainer : Object 
    {
        public Gtk.ScrolledWindow el;
        private Xcls_WindowRooView  _this;


            // my vars (def)

        // ctor 
        public Xcls_viewcontainer(Xcls_WindowRooView _owner )
        {
            _this = _owner;
            _this.viewcontainer = this;
            this.el = new Gtk.ScrolledWindow( null, null );

            // my vars (dec)

            // set gobject values
            this.el.shadow_type = Gtk.ShadowType.IN;
            var child_0 = new Xcls_view( _this );
            child_0.ref();
            this.el.add (  child_0.el  );

            // init method 

            this.el.set_policy(Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC);
        }

        // user defined functions 
    }
    public class Xcls_view : Object 
    {
        public WebKit.WebView el;
        private Xcls_WindowRooView  _this;


            // my vars (def)
        public string renderedData;
        public bool refreshRequired;
        public WebKit.WebInspector inspector;
        public string runjs;
        public int redraws;
        public GLib.DateTime lastRedraw;
        public string runhtml;
        public bool pendingRedraw;

        // ctor 
        public Xcls_view(Xcls_WindowRooView _owner )
        {
            _this = _owner;
            _this.view = this;
            this.el = new WebKit.WebView();

            // my vars (dec)
            this.renderedData = "";
            this.refreshRequired = false;
            this.runjs = "";
            this.redraws = 0;
            this.lastRedraw = null;
            this.runhtml = "";
            this.pendingRedraw = false;

            // set gobject values

            // init method 

            {
                // this may not work!?
                var settings =  this.el.get_settings();
                settings.enable_developer_extras = true;
                
                
                var fs= new FakeServer(this.el);
                fs.ref();
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
                     //print("run refresh?");
                     if (this.el == null) {
                        return false;
                     }
                     this.runRefresh(); 
                     return true;
                 });
                
                
            }

            // listeners 
            this.el.script_dialog.connect( (dialog) => {
                if (this.el == null) {
                    return true;
                }
                
                 var msg = dialog.get_message();
                 if (msg.length < 4) {
                    return false;
                 }
                 if (msg.substring(0,4) != "IPC:") {
                     return false;
                 }
                 var ar = msg.split(":", 3);
                if (ar.length < 3) {
                    return false;
                }
                switch(ar[1]) {
                    case "SAVEHTML":
                        _this.file.saveHTML(ar[2]);
                        return true;
                    default:
                        return false;
                }
                
            });
            this.el.show.connect( ( ) => {
                this.initInspector();;
            });
            this.el.drag_drop.connect( ( ctx, x, y,time, ud) => {
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
            });
            this.el.load_changed.connect( (le) => {
                if (le != WebKit.LoadEvent.FINISHED) {
                    return;
                }
                if (this.runjs.length < 1) {
                    return;
                }
              //  this.el.run_javascript(this.runjs, null);
                 FakeServerCache.remove(    this.runjs);
                this.runjs = "";
            });
        }

        // user defined functions 
        public void reInit () {
           print("reInit?");
                 // if this happens destroy the webkit..
                 // recreate it..
             this.el.stop_loading();
                 
             if (_this.viewbox.el.get_parent() == null) {
                return;
             }
                 
                 
            _this.viewbox.el.remove(_this.viewcontainer.el);
            _this.el.remove(_this.inspectorcontainer.el);        
                 
                 // destory seems to cause problems.
                 //this.el.destroy();
                //_this.viewcontainer.el.destroy();
                 //_this.inspectorcontainer.el.destroy();
             var  inv =new Xcls_inspectorcontainer(_this);
              inv.ref();
              _this.el.pack2(inv.el,true,true);
              
              
             this.el = null;         
             var nv =new Xcls_viewcontainer(_this);
             nv.ref();
             _this.viewbox.el.pack_end(nv.el,true,true,0);
                 
                 
             inv.el.show_all();
             nv.el.show_all();
                 //while(Gtk.events_pending ()) Gtk.main_iteration ();
                 //_this.view.renderJS(true); 
             _this.view.refreshRequired  = true;
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
            _this.file.webkit_page_id  = this.el.get_page_id();
            
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
            
            
            GLib.FileUtils.get_contents(BuilderApplication.configDirectory() + "/resources/roo.builder.js", out builderhtml);
        
            runhtml += builderhtml + "\n";
            runhtml += "</script>\n" ;
        
            // fix to make sure they are the same..
            this.runhtml = project.runhtml;
            // need to modify paths
        
            string inhtml;
            var base_template = _this.file.project.base_template;
            
            if (base_template.length > 0 && !FileUtils.test(
                BuilderApplication.configDirectory() + "/resources/" +  base_template, FileTest.EXISTS)  
                ) {
                   print("invalid base_template name - using default:  %s\n", base_template);
                   base_template = "";
            
            }
            
            GLib.FileUtils.get_contents(
                BuilderApplication.configDirectory() + "/resources/" + 
                    (base_template.length > 0 ? base_template :  "roo.builder.html")
                    , out inhtml);
            
            
            this.renderedData = js;
        
        
            string js_src = js + "\n" +
        	"Roo.onReady(function() {\n" +
        	"if (" + _this.file.name +".show) " +  _this.file.name +".show({});\n" +
        	"Roo.XComponent.build();\n" +
        	"});\n";
        	
           // print("render js: " + js);
            //if (!this.ready) {
          //      console.log('not loaded yet');
            //}
            this.lastRedraw = new DateTime.now_local();
        
        
            //this.runjs = js_src;
            var fc =    FakeServerCache.factory_with_data(js_src);
            this.runjs = fc.fname;
            
                var html = inhtml.replace("</head>", runhtml + this.runhtml + 
                    "<script type=\"text/javascript\" src=\"xhttp://localhost" + fc.fname + "\"></script>" +   
                      //  "<script type=\"text/javascript\">\n" +
                      //  js_src + "\n" + 
                      //  "</script>" + 
                                
                "</head>");
                //print("LOAD HTML " + html);
                
                 var rootURL = _this.file.project.rootURL;
           
                
                
                this.el.load_html( html , 
                    //fixme - should be a config option!
                    (rootURL.length > 0 ? rootURL : "xhttp://localhost/app.Builder.js/")
                );
                
            // force the inspector...        
               //   this.initInspector();
                
                // - no need for this, the builder javascript will call it when build is complete
                //GLib.Timeout.add_seconds(1, () => {
                //    this.el.run_javascript("Builder.saveHTML()",null);
                //    return false;
                //});
        //     print( "before render" +    this.lastRedraw);
        //    print( "after render" +    (new Date()));
            
        }
        public void initInspector () {
            
           /* if (this.inspector == this.el.get_inspector()) {
                this.inspector.show();
                this.inspector.open_window();        
                print("init inspecter called, and inspector is the same as existing\n");
                return;
            }
            print("new inspector?\n");
        */
            this.inspector = this.el.get_inspector();
            this.inspector.ref();
            
            // got a new inspector...
                
            this.inspector.open_window.connect(() => {
                 this.inspector = this.el.get_inspector();
                print("inspector attach\n");
                var wv = this.inspector.get_web_view();
                if (wv != null) {
                    print("got inspector web view\n");
                    
                    var cn = _this.inspectorcontainer.el.get_child();
                    if (cn != null) {
                         _this.inspectorcontainer.el.remove(cn);
                     }
                    
                    _this.inspectorcontainer.el.add(wv);
                    wv.show();
                } else {
                    //this.inspector.close();
                    
                    //this.inspector = null;
                   
         
                }
                return true;
               
            });
            /*
            this.inspector.closed.connect(() => {
                 print("inspector closed?!?");
                 // if this happens destroy the webkit..
                 // recreate it..
                 this.el.stop_loading();
                 
                 if (_this.viewbox.el.get_parent() == null) {
                    return;
                 }
                 
                 
                _this.viewbox.el.remove(_this.viewcontainer.el);
                _this.el.remove(_this.inspectorcontainer.el);        
                 
                 // destory seems to cause problems.
                 //this.el.destroy();
                //_this.viewcontainer.el.destroy();
                 //_this.inspectorcontainer.el.destroy();
        
                 this.el = null;         
                 var nv =new Xcls_viewcontainer(_this);
                 nv.ref();
                 _this.viewbox.el.pack_end(nv.el,true,true,0);
                 
                  var  inv =new Xcls_inspectorcontainer(_this);
                  inv.ref();
                  _this.el.pack2(inv.el,true,true);
                 
                 inv.el.show_all();
                 nv.el.show_all();
                 //while(Gtk.events_pending ()) Gtk.main_iteration ();
                 //_this.view.renderJS(true); 
                 _this.view.refreshRequired  = true;
               
            }); 
            */
            
            this.inspector.show();
        }
        public void renderJS (bool force) {
        
            // this is the public redraw call..
            // we refresh in a loop privately..
            var autodraw = _this.AutoRedraw.el.active;
            if (!autodraw && !force) {
                print("Skipping redraw - no force, and autodraw off");
                return;
            }
             
            this.refreshRequired  = true;
        }
    }
    public class Xcls_inspectorcontainer : Object 
    {
        public Gtk.ScrolledWindow el;
        private Xcls_WindowRooView  _this;


            // my vars (def)

        // ctor 
        public Xcls_inspectorcontainer(Xcls_WindowRooView _owner )
        {
            _this = _owner;
            _this.inspectorcontainer = this;
            this.el = new Gtk.ScrolledWindow( null, null );

            // my vars (dec)

            // set gobject values
            this.el.shadow_type = Gtk.ShadowType.IN;

            // init method 

            this.el.set_policy(Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC);
        }

        // user defined functions 
    }
}
