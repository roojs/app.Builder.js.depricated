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
            xtype: Gtk.HBox,
            pack : "pack_start,false,true,0",
            items : [
                {
                    xtype: Gtk.Button,
                    listeners : {
                        clicked : ( ) => {
                            _this.view.renderJS(null,true);
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
                    active : "true",
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
                        load_finished : function (self, object) {
                            print("load finished");
                        //    print("load_finished"); return;
                        	// if (this.ready) { // dont do it twice!
                        	 //   return; 
                        	//}
                        	if (!this.inspectorShown) {
                                   this.el.get_inspector().show();
                                   this.inspectorShown = true;
                        	}
                        
                        	this.ready = true;
                        	
                                if (this.pendingRedraw) {
                                    this.pendingRedraw = false;
                                    this.refreshRequired  = true;
                                }
                                //var js = this.get('/LeftTree.model').toJS();
                                //if (js && js[0]) {
                            	//    this.renderJS(js[0]);
                            	//}
                        
                        },
                        script_alert : function (self, object, p0) {
                            // 	print(p0);
                                return false;
                                return true; // do not display anything...
                        },
                        console_message : function (self, object, p0, p1) {
                            print(object);
                           //  console.log(object);
                           
                        
                            if (object.match(/variable/) && object.match(/Builder/)) {
                                print("got builder missing message");
                                this.refreshRequired = true;
                                this.lastRedraw = 0;
                                this.runRefresh();
                                return true;
                            }
                            
                           
                                if (!object.match(/^\{/)) {
                                
                                    //this.get('/Terminal').feed(object);
                                    return true; // do not handle!!! -> later maybe in console..
                                }
                                
                                
                                
                                
                               // console.log(object);
                                var val =  JSON.parse(object);
                        
                                if (typeof(val['hover-node']) != 'undefined') {
                                    this.activeNode = val['hover-node'];
                                    console.log('active node: ' + this.activeNode);
                                    return true;
                                }
                        
                                 var ret = false;
                                 if (typeof(val['id']) != 'undefined') {
                                   // this.activeNode = val['id'];
                                    var tg = this.get('/LeftTree.model').findDropNode(val['id'], true); 
                                    if (!tg || typeof(tg[0]) == 'undefined') {
                                        return false;
                                    }
                                    print("SELECT node " + tg[0]);
                                    
                                    this.get('/LeftTree.view').selectNode(tg[0]);
                                    ret  = true;
                                    
                                } 
                                if (ret && typeof(val['set']) != 'undefined') {
                                   this.get('/LeftPanel.model').add({
                                        key : val['set'],
                                        val : val['value']
                                    });
                                    //console.log('active node: ' + this.activeNode);
                                    
                                }
                                //Seed.print('a:'+a);
                                //Seed.print('b:'+b);
                                //Seed.print('c:'+c);
                                return ret;
                        },
                        drag_motion : function (w, ctx,  x,   y,   time, ud) {
                           // console.log('DRAG MOTION'); 
                                // status:
                                // if lastCurrentNode == this.currentNode.. -- don't change anything..
                                this.targetData = [];
                                this.el.execute_script("Builder.overPos(" + x +','+ y + ");");
                                
                                // A) find out from drag all the places that node could be dropped.
                                var src = Gtk.drag_get_source_widget(ctx);
                                if (!src.dropList) {
                                    Gdk.drag_status(ctx, 0, time);
                                    return true;
                                }
                                // b) get what we are over.. (from activeNode)
                                // tree is empty.. - list should be correct..
                                if (!this.get('/LeftTree.model').currentTree) {
                                    Gdk.drag_status(ctx, Gdk.DragAction.COPY,time);
                                    return true;
                                    
                                }
                                // c) ask tree where it should be dropped... - eg. parent.. (after node ontop)
                                
                                var tg = this.get('/LeftTree.model').findDropNode(this.activeNode, src.dropList);
                                console.dump(tg);
                                if (!tg.length) {
                                    Gdk.drag_status(ctx, 0,time);
                                    this.get('/LeftTree.view').highlight(false);
                                    return true;
                                }
                                 
                                // if we have a target..
                                // -> highlight it! (in browser)
                                // -> highlight it! (in tree)
                                
                                Gdk.drag_status(ctx, Gdk.DragAction.COPY,time);
                                this.get('/LeftTree.view').highlight(tg);
                                this.targetData = tg;
                                // for tree we should handle this...
                                return true;
                        },
                        drag_drop : function (w, ctx, x, y,time, ud) {
                        	print("TARGET: drag-drop");
                                var is_valid_drop_site = true;
                                
                                 
                                Gtk.drag_get_data
                                (
                                        w,         /* will receive 'drag-data-received' signal */
                                        ctx,        /* represents the current state of the DnD */
                                        this.get('/Window').atoms["STRING"],    /* the target type we want */
                                        time            /* time stamp */
                                );
                                                
                                                
                                                /* No target offered by source => error */
                                               
                        
                        	return  is_valid_drop_site;
                        },
                        drag_data_received : function (w, ctx,  x,  y, sel_data,  target_type,  time, ud) 
                            {
                                print("Browser: drag-data-received");
                                var delete_selection_data = false;
                                vardnd_success = false;
                                /* Deal with what we are given from source */
                                if( sel_data && sel_data.length ) {
                                    
                                    if (ctx.action == Gdk.DragAction.ASK)  {
                                        /* Ask the user to move or copy, then set the ctx action. */
                                    }
                        
                                    if (ctx.action == Gdk.DragAction.MOVE) {
                                        delete_selection_data = true;
                                    }
                                    var source = Gtk.drag_get_source_widget(ctx);
                        
                                    print("Browser: source.DRAGDATA? " + source.dragData);
                                    if (this.targetData) {
                                        print(this.targetData);
                                        this.get('/LeftTree.model').dropNode(this.targetData,  source.dragData);
                                    }
                                    
                                    
                                    
                                    dnd_success = true;
                        
                                }
                        
                                if (dnd_success == false)
                                {
                                        Seed.print ("DnD data transfer failed!\n");
                                }
                                
                                Gtk.drag_finish (ctx, dnd_success, delete_selection_data, time);
                                return true;
                            },
                        create_web_view : function (self, object) {
                          print("CREATE WEB VIEW");
                           return null; //new WebKit.WebView();
                        }
                    },
                    id : "view",
                    pack : "add",
                    redraws : 0,
                    init : // this may not work!?
                        var settings =  this.el.get_settings();
                        settings.enable_developer_extras = true;
                        
                        // this was an attempt to change the url perms.. did not work..
                        // settings.enable_file_access_from_file_uris = true;
                        // settings.enable_offline_web_application_cache - true;
                        // settings.enable_universal_access_from_file_uris = true;
                        var _this = this;
                         
                         // init inspector..
                        this.el.get_inspector().signal.inspect_web_view.connect(function(wi, pg) {
                             _this.inspector.el.show();
                             return _this..inspector.el;
                        
                        });
                         
                         // FIXME - base url of script..
                         // we need it so some of the database features work.
                        this.el.load_html_string( "Render not ready" , 
                                //fixme - should be a config option!
                                // or should we catch stuff and fix it up..
                                'http://localhost/app.Builder/'
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
                        GLib.timeout_add_seconds(0, 1, function() {
                            //    print("run refresh?");
                             this.runRefresh(); 
                             return true;
                         });
                        
                        
                    },
                    renderJS : (bool force) {
                    
                        // this is the public redraw call..
                        // we refresh in a loop privately..
                        var autodraw = this.AutoRedraw.el.active;
                        if (!autodraw && !force) {
                            print("Skipping redraw - no force, and autodraw off");
                            return;
                        }
                        this.refreshRequired  = true;
                    },
                    runRefresh : function() 
                    {
                        // this is run every 2 seconds from the init..
                    
                      
                        
                        if (!this.refreshRequired) {
                           // print("no refresh required");
                            return;
                        }
                    
                        if (this.lastRedraw) {
                           // do not redraw if last redraw was less that 5 seconds ago.
                           if (((new Date()) -  this.lastRedraw) < 5000) {
                                return;
                            }
                        }
                        
                        
                        
                        
                         if (!this.get('/Window.LeftTree').getActiveFile()) {
                            return;
                         }
                         this.refreshRequired = false;
                       //  print("HTML RENDERING");
                         
                         this.get('/BottomPane').el.show();
                         this.get('/BottomPane').el.set_current_page(2);// webkit inspector
                    
                        
                        var js = this.get('/LeftTree.model').toJS();
                        if (!js || !js.length) {
                            print("no data");
                            return;
                        }
                        var  data = js[0];
                        this.redraws++;
                        
                         var project = this.get('/Window.LeftTree').getActiveFile().project;
                         //print (project.fn);
                         // set it to non-empty.
                         project.runhtml  =     project.runhtml  || '';
                         project.runhtml  = project.runhtml.length ?  project.runhtml : '<script type="text/javascript"></script>'; 
                        
                    
                         this.runhtml  = this.runhtml || '';
                        
                         if ((project.runhtml != this.runhtml) || (this.redraws > 10)) {
                            // then we need to reload the browser using
                            // load_html_string..
                            
                            // then trigger a redraw once it's loaded..
                            this.pendingRedraw = true;
                             var runhtml = '<script type="text/javascript">' + "\n" ;
                             runhtml +=imports.File.File.read(__script_path__ + '/../builder.html.js') + "\n";
                             runhtml += '</script>'+ "\n" ;
                            
                            this.runhtml = project.runhtml;
                            // need to modify paths
                            
                            
                            
                            var html = imports.File.File.read(__script_path__ + '/../builder.html');
                            html = html.replace('</head>', runhtml + this.runhtml + '</head>');
                            print("LOAD HTML " + html);
                            this.el.load_html_string( html , 
                                //fixme - should be a config option!
                                'http://localhost/app.Builder/'
                            );
                            this.redraws = 0;
                            // should trigger load_finished! - which in truns shoudl set refresh Required;
                            return;
                        
                        }
                        
                        
                        this.renderedData = data;
                        var str = JSON.stringify(data) ;
                        
                        if (!this.ready) {
                            console.log('not loaded yet');
                        }
                        this.lastRedraw = new Date();
                    
                        this.el.execute_script("Builder.render(" + JSON.stringify(data) + ");");
                         print( "before render" +    this.lastRedraw);
                        print( "after render" +    (new Date()));
                        
                    }
                }
            ]
        }
    ]
});
WindowRooView.init();
XObject.cache['/WindowRooView'] = WindowRooView;
