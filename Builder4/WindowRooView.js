Gtk = imports.gi.Gtk;
Gdk = imports.gi.Gdk;
Pango = imports.gi.Pango;
GLib = imports.gi.GLib;
Gio = imports.gi.Gio;
GObject = imports.gi.GObject;
GtkSource = imports.gi.GtkSource;
WebKit = imports.gi.WebKit;
Vte = imports.gi.Vte;
console = imports.console;
XObject = imports.XObject.XObject;
WindowRooView=new XObject({
    id : "WindowRooView",
    createThumb : () {
        
        
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
        
          
    
        
        
    
    
        
         
    },
    loadFile : (JsRender.JsRender file)
    {
        this.file = file;
        this.view.renderJS(true);
    },
    xtype : "VPaned",
    file : "",
    requestRedraw : () {
        this.view.renderJS(false);
    },
    xns : Gtk,
    items : [
    	{
            id : "viewbox",
            xtype : "VBox",
            xns : Gtk,
            homogeneous : FALSE,
            items : [
            	{
                    vexpand : FALSE,
                    height_request : 20,
                    xtype : "HBox",
                    xns : Gtk,
                    homogeneous : TRUE,
                    items : [
                    	{
                            label : "Redraw",
                            xtype : "Button",
                            xns : Gtk,
                            listeners : {
                            	clicked : ( ) => {
                            	       _this.view.renderJS(  true);
                            	   }
                            }
                        },
                    	{
                            label : "Auto Redraw On",
                            id : "AutoRedraw",
                            active : TRUE,
                            xtype : "CheckButton",
                            xns : Gtk,
                            listeners : {
                            	toggled : (state) => {
                            	       this.el.set_label(this.el.active  ? "Auto Redraw On" : "Auto Redraw Off");
                            	   }
                            }
                        },
                    	{
                            label : "Full Redraw",
                            xtype : "Button",
                            xns : Gtk,
                            listeners : {
                            	clicked : () => {
                            	     _this.view.redraws = 99;
                            	       _this.view.el.web_context.clear_cache();  
                            	     _this.view.renderJS(true);
                            	   
                            	   }
                            }
                        }
                    ]

                },
            	{
                    id : "viewcontainer",
                    shadow_type : Gtk.ShadowType.IN,
                    xtype : "ScrolledWindow",
                    xns : Gtk,
                    items : [
                    	{
                            renderedData : "\"\"",
                            id : "view",
                            refreshRequired : false,
                            redraws : 0,
                            xtype : "WebView",
                            inspector : "",
                            redraws : 0,
                            runRefresh : () 
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
                                
                                
                                GLib.FileUtils.get_contents(Builder4.Application.configDirectory() + "/resources/roo.builder.js", out builderhtml);
                            
                                runhtml += builderhtml + "\n";
                                runhtml += "</script>\n" ;
                            
                                // fix to make sure they are the same..
                                this.runhtml = project.runhtml;
                                // need to modify paths
                            
                                string inhtml;
                                var base_template = _this.file.project.base_template;
                                
                                if (base_template.length > 0 && !FileUtils.test(
                                    Builder4.Application.configDirectory() + "/resources/" +  base_template, FileTest.EXISTS)  
                                    ) {
                                       print("invalid base_template name - using default:  %s\n", base_template);
                                       base_template = "";
                                
                                }
                                
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
                            	
                               // print("render js: " + js);
                                //if (!this.ready) {
                              //      console.log('not loaded yet');
                                //}
                                this.lastRedraw = new DateTime.now_local();
                            
                                    var html = inhtml.replace("</head>", runhtml + this.runhtml + 
                                    
                                            "<script type=\"text/javascript\">\n" +
                                            js_src + "\n" + 
                                            "</script>" + 
                                                    
                                    "</head>");
                                    //print("LOAD HTML " + html);
                                    
                                     var rootURL = _this.file.project.rootURL;
                               
                                    
                                    
                                    this.el.load_html( html , 
                                        //fixme - should be a config option!
                                        (rootURL.length > 0 ? rootURL : "http://localhost/app.Builder/")
                                    );
                                    
                                // force the inspector...        
                                      this.initInspector();
                                    
                                    // - no need for this, the builder javascript will call it when build is complete
                                    //GLib.Timeout.add_seconds(1, () => {
                                    //    this.el.run_javascript("Builder.saveHTML()",null);
                                    //    return false;
                                    //});
                            //     print( "before render" +    this.lastRedraw);
                            //    print( "after render" +    (new Date()));
                                
                            },
                            xns : WebKit,
                            initInspector : () {
                                
                                if (this.inspector == this.el.get_inspector()) {
                                    this.inspector.show();
                                    this.inspector.open_window();        
                                    print("init inspecter called, and inspector is the same as existing\n");
                                    return;
                                }
                                print("new inspector?\n");
                            
                                this.inspector = this.el.get_inspector();
                                this.inspector.ref();
                                
                                // got a new inspector...
                                    
                                this.inspector.open_window.connect(() => {
                                     this.inspector = this.el.get_inspector();
                                    print("inspector attach\n");
                                    var wv = this.inspector.get_web_view();
                                    if (wv != null) {
                                        print("got inspector web view\n");
                                        _this.inspectorcontainer.el.add(wv);
                                        wv.show();
                                    } else {
                                        //this.inspector.close();
                                        
                                        //this.inspector = null;
                                       
                             
                                    }
                                    return true;
                                   
                                });
                                this.inspector.closed.connect(() => {
                                     print("inspector closed?!?");
                                     // if this happens destroy the webkit..
                                     // recreate it..
                                    _this.viewbox.el.remove(_this.viewcontainer.el);
                                    _this.el.remove(_this.inspectorcontainer.el);        
                                     this.el.destroy();
                                     this.el = null;
                                     _this.viewcontainer.el.destroy();
                                     _this.inspectorcontainer.el.destroy();
                                     
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
                                     nv.refreshRequired  = true;
                                   
                                }); 
                                
                                this.inspector.show();
                            },
                            lastRedraw : "null",
                            runhtml : "\"\"",
                            pendingRedraw : false,
                            renderJS : (bool force) {
                            
                                // this is the public redraw call..
                                // we refresh in a loop privately..
                                var autodraw = _this.AutoRedraw.el.active;
                                if (!autodraw && !force) {
                                    print("Skipping redraw - no force, and autodraw off");
                                    return;
                                }
                                this.refreshRequired  = true;
                            },
                            listeners : {
                            	script_dialog : (dialog) => {
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
                            	       
                            	   },
                            	show : ( ) => {
                            	       this.initInspector();;
                            	   },
                            	drag_drop : ( ctx, x, y,time, ud) => {
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
                            	   }
                            }
                        }
                    ]

                }
            ]

        },
    	{
            id : "inspectorcontainer",
            shadow_type : Gtk.ShadowType.IN,
            xtype : "ScrolledWindow",
            xns : Gtk
        }
    ]

});
WindowRooView.init();
XObject.cache['/WindowRooView'] = WindowRooView;
