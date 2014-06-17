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
    xtype: Gtk.VBox,
    id : "WindowRooView",
    pack : "add",
    items : [
        {
            xtype: Gtk.VBox,
            pack : false,
            items : [
                {
                    xtype: Gtk.HBox,
                    pack : "pack_start,false,true,0",
                    items : [
                        {
                            xtype: Gtk.Button,
                            listeners : {
                                clicked : ( ) => {
                                    _this.view.renderJS(  true);
                                }
                            },
                            label : "Redraw",
                            pack : "pack_start,false,false,0"
                        },
                        {
                            xtype: Gtk.CheckButton,
                            listeners : {
                                toggled : (state) => {
                                    this.el.set_label(this.el.active  ? "Auto Redraw On" : "Auto Redraw Off");
                                }
                            },
                            active : true,
                            id : "AutoRedraw",
                            label : "Auto Redraw On",
                            pack : "pack_start,false,false,0"
                        },
                        {
                            xtype: Gtk.Button,
                            listeners : {
                                clicked : () => {
                                  _this.view.redraws = 99;
                                  _this.view.renderJS(true);
                                }
                            },
                            label : "Full Redraw",
                            pack : "pack_start,false,false,0"
                        }
                    ]
                },
                {
                    xtype: Gtk.ScrolledWindow,
                    pack : "add",
                    init : this.el.set_policy(Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC);,
                    shadow_type : Gtk.ShadowType.IN,
                    items : [
                        {
                            xtype: WebKit.WebView,
                            listeners : {
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
                            },
                            id : "view",
                            pack : "add",
                            redraws : 0,
                            init : {
                                // this may not work!?
                                var settings =  this.el.get_settings();
                                settings.enable_developer_extras = true;
                                
                                // this was an attempt to change the url perms.. did not work..
                                // settings.enable_file_access_from_file_uris = true;
                                // settings.enable_offline_web_application_cache - true;
                                // settings.enable_universal_access_from_file_uris = true;
                               
                                 
                                 // init inspector..
                                this.el.get_inspector().inspect_web_view.connect( (  pg) => {
                                     _this.inspector.el.show();
                                     return _this.inspector.el;
                                
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
                                    //    print("run refresh?");
                                     this.runRefresh(); 
                                     return true;
                                 });
                                
                                
                            },
                            'void:renderJS' : (bool force) {
                            
                                // this is the public redraw call..
                                // we refresh in a loop privately..
                                var autodraw = _this.AutoRedraw.el.active;
                                if (!autodraw && !force) {
                                    print("Skipping redraw - no force, and autodraw off");
                                    return;
                                }
                                this.refreshRequired  = true;
                            },
                            'void:runRefresh' : () 
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
                            
                                this.el.execute_script("Builder.render(" + this.renderedData + ");");
                            //     print( "before render" +    this.lastRedraw);
                            //    print( "after render" +    (new Date()));
                                
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: Gtk.ScrolledWindow,
            pack : "add",
            items : [
                {
                    xtype: WebKit.WebView,
                    id : "inspector",
                    pack : "add"
                }
            ]
        }
    ]
});
WindowRooView.init();
XObject.cache['/WindowRooView'] = WindowRooView;
