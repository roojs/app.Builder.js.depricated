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

 

Window=new XObject({
    xtype: Gtk.Window,
    listeners : {
        delete_event : function (self, event) {
            return false;
        },
        destroy : function (self) {
           Gtk.main_quit();
        },
        show : function (self) {
			
		  imports.ProjectManager.ProjectManager.loadConfig();
			
		  print("HIDEWIN - calling MidPropTree hidewin")
			  this.get('/MidPropTree').hideWin();
			  this.get('/RightPalete').hide();
			  this.get('/BottomPane').el.hide();
			  //this.get('/Editor').el.show_all();
		  
        }
    },
    border_width : 0,
    default_height : 500,
    default_width : 800,
    id : "Window",
    title : "Application Builder",
 
    setTitle : function(str) {
        this.el.set_title(this.title + ' - ' + str);
    },
    type : Gtk.WindowType.TOPLEVEL,
    items : [
        {
            xtype: Gtk.VBox,
            id : "w-vbox",
            items : [
                {
                    xtype: Gtk.MenuBar,
                    pack : "pack_start,false,false",
                    items : [
                        {
                            xtype: Gtk.MenuItem,
                            use_underline : true,
                            label : "_File",
                            items : [
                                {
                                    xtype: Gtk.Menu,
                                    pack : "set_submenu",
                                    items : [
                                        {
                                            xtype: Gtk.MenuItem,
                                            use_underline : true,
                                            label : "New _Project",
                                            listeners : {
                                                activate : function (self) {
                                                         var _this = this;
                                                	this.get('/EditProject').show({
                                                	    success : function(pr) {
                                                		     _this.get('/LeftProjectTree').get('combo').setValue(pr.fn);
                                                	    }
                                                	});
                                                }
                                            }
                                        },
                                        {
                                            xtype: Gtk.MenuItem,
                                            label : "_New File",
                                            use_underline : true,
                                            listeners : {
                                                activate : function (self) {
                                                 	var fn = this.get('/LeftProjectTree.combo').getValue();
                                                        if (!fn) {
                                                            this.get('/LeftProjectTree').showNoProjectSelected();
                                                            return true;
                                                        }
                                                        var pm = imports.ProjectManager.ProjectManager;
                                                        this.get('/DialogNewComponent').show({
                                                            project : pm.getByFn(fn)
                                                        });
                                                }
                                            }
                                        },
                                        {
                                            xtype: Gtk.SeparatorMenuItem,
                                            pack : "add"
                                        },
                                        {
                                            xtype: Gtk.MenuItem,
                                            use_underline : true,
                                            pack : "add",
                                            label : "D_elete Project",
                                            listeners : {
                                                activate : function (self) {
                                                
                                                	var fn =  this.get('/LeftProjectTree').get('combo').getValue();
                                                	if (!fn.length) {
                                                		this.get('/StandardErrorDialog').show("Select a project")
                                                		return;
                                                        }
                                                	var pm = imports.ProjectManager.ProjectManager;
                                                	var pr  = pm.getByFn(fn);
                                                
                                                	// confirm..
                                                	this.get('/DialogConfirm').show("Are you sure you want to delete project '" + pr.name + "'", function() {
                                                		pm.deleteProject(fn);
                                                		print("DELETE?");
                                                	});
                                                
                                                }
                                            }
                                        },
                                        {
                                            xtype: Gtk.SeparatorMenuItem,
                                            pack : "add"
                                        },
                                        {
                                            xtype: Gtk.MenuItem,
                                            pack : "add",
                                            label : "_Quit",
                                            use_underline : true,
                                            listeners : {
                                                activate : function (self) {
                                                   Gtk.main_quit();
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: Gtk.MenuItem,
                            label : "_Edit",
                            use_underline : true,
                            pack : "add",
                            items : [
                                {
                                    xtype: Gtk.Menu,
                                    pack : "set_submenu",
                                    items : [
                                        {
                                            xtype: Gtk.MenuItem,
                                            listeners : {
                                                activate : function (self) {
                                                 	var fn = this.get('/LeftTree').getActiveFile();
                                                        if (!fn) {
                                                            this.get('/StandardErrorDialog').show("No File active");
                                                            return true;
                                                        }
                                                 
                                                        this.get('/DialogNewComponent').show(fn);
                                                        return true;
                                                }
                                            },
                                            label : "File _Properties",
                                            pack : "add",
                                            use_underline : true
                                        },
                                        {
                                            xtype: Gtk.MenuItem,
                                            listeners : {
                                                activate : function (self, event) {
                                                    this.get('/RooProjectProperties').show();
                                                    return false;
                                                }
                                            },
                                            label : "Modify Project HTML ",
                                            pack : "add",
                                            use_underline : true
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: Gtk.MenuItem,
                            label : "_View",
                            use_underline : true,
                            items : [
                                {
                                    xtype: Gtk.Menu,
                                    pack : "set_submenu",
                                    items : [
                                        {
                                            xtype: Gtk.MenuItem,
                                            listeners : {
                                                activate : function (self, event) {
                                                      var js = this.get('/LeftTree.model').toJS();
                                                    if (js && js[0]) {
                                                        this.get('/RightBrowser.view').renderJS(js[0], true);
                                                    } 
                                                    return false;
                                                }
                                            },
                                            label : "_Redraw (Roo)",
                                            pack : "add",
                                            use_underline : true
                                        },
                                        {
                                            xtype: Gtk.MenuItem,
                                            listeners : {
                                                activate : function (self, event) 
                                                {
                                                        /* Firefox testing for debugging..
                                                          - we can create a /tmp directory, and put.
                                                            builder.html, builder.html.js, link roojs1 
                                                            add at the end of builder.html Roo.onload(function() {
                                                	  */
                                                	 if (!this.get('/Window.LeftTree').getActiveFile()) {
                                                            return;
                                                        }
                                                        
                                                        var js = this.get('/LeftTree.model').toJS();
                                                         if (!js ||  !js[0]) {
                                                            return;
                                                        }
                                                        var project = this.get('/Window.LeftTree').getActiveFile().project;
                                                        //print (project.fn);
                                                        
                                                        project.runhtml  = project.runhtml || '';
                                                
                                                
                                                	var File = imports.File.File;
                                                	
                                                	var target = "/tmp/firetest"; // fixme..
                                                	if (!File.isDirectory(target)) {
                                                	    File.mkdir(target);
                                                        }
                                                	File.copy(__script_path__ + '/../builder.html.js', target+ '/builder.html.js', Gio.FileCopyFlags.OVERWRITE);
                                                	if (!File.exists( target+ '/roojs1')) {
                                                            File.link( target+ '/roojs1', __script_path__ + '/../roojs1');
                                                    	}
                                                        
                                                        
                                                        
                                                        var html = imports.File.File.read(__script_path__ + '/../builder.html');
                                                        html = html.replace('</head>', project.runhtml + '</head>');
                                                        
                                                       
                                                        var     jsstr = JSON.stringify(js[0], null, 4);
                                                       
                                                        var runbuilder = '<script type="text/javascript">' + "\n" + 
                                                            " Builder.render(" + jsstr + ");\n" +
                                                            '</script>';
                                                        
                                                        html = html.replace('</body>', runbuilder + '</body>');
                                                
                                                	File.write( target+ '/builder.html', html);
                                                	
                                                        this.get('/Terminal').feed("RUN DIR:" + target);
                                                    var out = {};
                                                    this.get('/Terminal').el.fork_command_full(
                                                                Vte.PtyFlags.DEFAULT,
                                                                target ,
                                                                [], //argv
                                                                [], // env
                                                                0, //spawn flags
                                                                null, // user func
                                                                null, // child setupdata
                                                                out
                                                        ); 
                                                    var cmd = "firefox file://" + target + "/builder.html  \n";
                                                    this.get('/Terminal').el.feed_child(cmd, cmd.length);
                                                     return false;
                                                }
                                            },
                                            label : "_Test in Firefox (Roo)",
                                            pack : "add",
                                            use_underline : true
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: Gtk.MenuItem,
                            label : "_Help",
                            use_underline : true,
                            pack : "add",
                            items : [
                                {
                                    xtype: Gtk.Menu,
                                    pack : "set_submenu",
                                    items : [
                                        {
                                            xtype: Gtk.MenuItem,
                                            pack : "add",
                                            label : "_About",
                                            use_underline : true,
                                            listeners : {
                                                activate : function (self) {
                                                    this.get('/About').el.run();
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: Gtk.HPaned,
                    id : "left",
                    position : 400,
                    items : [
                        {
                            xtype: Gtk.HBox,
                            items : [
                                {
                                    xtype: Gtk.VPaned,
                                    position : 300,
                                    id : "leftvpaned",
                                    items : [
                                        {
                                            xtype: Gtk.VBox,
                                            id : "LeftTopPanel",
                                            items : [
                                                {
                                                    xtype: Gtk.Expander,
													events : [
														Gdk.EventMask.BUTTON_MOTION_MASK 
													],
													 
                                                    listeners : {
                                                        activate : function (self) {
                                                            // this does not actually expand it..
                                                            // that is done by GTK..
                                                            
                                                            
                                                         	if (!this.get('/Editor').save()) {
                                                         	    // popup!! - click handled.. 
                                                         	    return true;
                                                            }
                                                        
                                                            if (!this.el.expanded) {
                                                                this.onExpand();
                                                            } else {
                                                                this.onCollapse();
                                                            }
                                                            return true;
                                                        	  
                                                        } /*,
                                                        enter_notify_event : function (self, event) {
                                                            return true;
                                                             this.el.expanded = !this.el.expanded;
                                                        //if (this.el.expanded ) {
                                                            this.listeners.activate.call(this);
                                                        //   }
                                                        
                                                        return true;
                                                        }
                                                        */
                                                    },
                                                    id : "expander",
                                                    label : "Select Project or File",
                                                    pack : "pack_start,false,true",
                                                  
                                                    onCollapse : function() {
                                                        
                                                        var nb = this.get('/LeftTopPanel.notebook');
                                                        nb.el.set_current_page(0);
                                                    },
                                                    onExpand : function() {
                                                        var nb = this.get('/LeftTopPanel.notebook');            
                                                        var pm  = imports.ProjectManager.ProjectManager;
                                                        
                                                       
                                                        var model = this.get('/LeftProjectTree.combomodel');
                                                        //  print ("loading Projects?")
														//print(JSON.stringify(pm.projects, null,4));Seed.quit();
                                                        //console.dump(pm.projects);
                                                        model.loadData(pm.projects);
                                                         
                                                        
                                                        nb.el.set_current_page(1);
                                                        //pm.on('changed', function() {
                                                    	//console.log("CAUGHT project manager change");
                                                        //    _combo.model.loadData(pm.projects);
                                                        //}
                                                        return;
                                                    }
                                                },
                                                {
                                                    xtype: Gtk.Notebook,
                                                    id : "notebook",
                                                    pack : "pack_start,true,true",
													current_page : 0,
                                                     
                                                    show_border : false,
                                                    show_tabs : false,
                                                    items : [
                                                        {
                                                            xtype: Gtk.ScrolledWindow,
                                                            id : "LeftTree",
                                                            pack : "add",
                                                            getActiveElement : function() { // return path to actie node.
                                                            
                                                                 var path = this.getActivePath();
                                                                 if (!path) {
                                                                    return false;
                                                                 }
                                                                 var ret ={} ;
                                                                 this.get('model').el.get_iter_from_string(ret, path);
                                                                 
                                                                 var value =  ''+ this.get('model').el.get_value(ret.iter, 2).value.get_string();
                                                                    
                                                                 return JSON.parse(value);
                                                            },
                                                            getActiveFile : function() {
                                                                return this.get('model').file;
                                                            },
                                                            getActivePath : function() {
                                                                var model = this.get('model');
                                                                var view = this.get('view');
                                                                if (view.selection.count_selected_rows() < 1) {
                                                                    return false;
                                                                }
                                                                var ret = {};
                                                                view.selection.get_selected(ret);
                                                                return ret.model.get_path(ret.iter).to_string();
                                                            },
                                                            getPaleteProvider : function() {
                                                                var model = this.get('model');
                                                                var pm = imports.ProjectManager.ProjectManager;
                                                                return pm.getPalete(model.file.getType());
                                                            },
                                                            getRenderer : function() {
                                                            
                                                            	switch( this.getActiveFile().getType()) {
                                                            		case 'Roo':
                                                            		    return this.get('/RightBrowser.view');
                                                            		case 'Gtk':
                                                            		    return this.get('/RightGtkView');
                                                            	}
																return false;
                                                            
                                                            },
                                                            
                                                            renderView : function() {
                                                                var render = this.getRenderer();
                                                                var model = this.get('model');
                                                                if (render) {
                                                                    render.renderJS(model.toJS(false,true)[0]);
                                                                } else {
                                                                    print("NO RENDER JS METHOD?");
                                                                }
                                                            },
                                                            shadow_type : Gtk.ShadowType.IN,
                                                            items : [
                                                                {
                                                                    xtype: Gtk.TreeView,
                                                                    listeners : {
                                                                        button_press_event : function (self, ev) {
                                                                         	console.log("button press?");
                                                                         	
                                                                         	if (!this.get('/Editor').save()) {
                                                                         	    // popup!! - click handled.. 
                                                                         	    return true;
                                                                                }
                                                                         	
                                                                                if (ev.button.button != 3) {
                                                                                    print("click" + ev.button.button);
                                                                                    return false;
                                                                                }
                                                                              
                                                                            
                                                                                var res = {}; 
                                                                                this.get('/LeftTree.view').el.get_path_at_pos(ev.button.x,ev.button.y, res);
                                                                                
                                                                                if (!this.get('/LeftTreeMenu').el)  {
																					this.get('/LeftTreeMenu').init();
																				}
                                                                                
                                                                                this.get('/LeftTreeMenu').el.set_screen(Gdk.Screen.get_default());
                                                                                this.get('/LeftTreeMenu').el.show_all();
                                                                                this.get('/LeftTreeMenu').el.popup(null, null, null, null, 3, ev.button.time);
                                                                                print("click:" + res.path.to_string());
                                                                                return false;
                                                                        },
                                                                        drag_begin : function (self, ctx) {
                                                                        	print('SOURCE: drag-begin');
                                                                                 this.targetData = false;
                                                                                // find what is selected in our tree...
                                                                                var ret ={};
                                                                                this.selection.get_selected(ret);
                                                                        
                                                                                // set some properties of the tree for use by the dropped element.
                                                                                var value = ''+ ret.model.get_value(ret.iter, 2).value.get_string();
                                                                                var data = JSON.parse(value);
                                                                                var xname = this.get('/LeftTree.model').file.guessName(data);
                                                                                
                                                                                this.el.dragData = xname;
                                                                                this.el.dropList = this.get('/LeftTree').getPaleteProvider().getDropList(xname);
                                                                                
                                                                        
                                                                                // make the drag icon a picture of the node that was selected
                                                                                var path = ret.model.get_path(ret.iter);
                                                                                this.el.treepath = path.to_string();
                                                                                
                                                                                // returns a cairo surface
                                                                                var pix = this.el.create_row_drag_icon ( path);
                                                                                
                                                                                if (Gtk.drag_set_icon_surface) {
                                                                                   Gtk.drag_set_icon_surface( ctx,   pix  );
                                                                                } else {
                                                                                    Gtk.drag_set_icon_pixmap (ctx,
                                                                                        pix.get_colormap(),   pix,   null, -10, -10);
                                                                                }
                                                                                
                                                                                return true;
                                                                        },
                                                                        drag_end : function (self, drag_context) {
                                                                        	Seed.print('LEFT-TREE: drag-end');
                                                                                this.el.dragData = false;
                                                                                this.el.dropList = false;
                                                                                this.targetData = false;
                                                                                this.get('/LeftTree.view').highlight(false);
                                                                                return true;
                                                                        },
                                                                        drag_data_get : function(self, ctx, sel_data, info, time)
                                                                        {
                                                                            
                                                                            sel_data.set_text( 
                                                                                      "HELOLW" 
                                                                                    
                                                                            );
                                                                            
                                                                        },
                                                                        
                                                                        drag_motion : function (self, ctx, x, y, time) {
                                                                            console.log("LEFT-TREE: drag-motion");
                                                                            var src = Gtk.drag_get_source_widget( ctx);
                                                            
                                                                            // a drag from  elsewhere...- prevent drop..
                                                                            if (!src.dragData) {
                                                                                print("no drag data!");
                                                                                Gdk.drag_status(ctx, 0, time);
                                                                                this.targetData = false;
                                                                                return true;
                                                                            }
                                                                            var action = Gdk.DragAction.COPY;
                                                                            if (src == this.el) {
                                                                                // unless we are copying!!! ctl button..
                                                                                action = ctx.get_actions() & Gdk.DragAction.MOVE ? Gdk.DragAction.MOVE : Gdk.DragAction.COPY ;
                                                                            }
                                                                            var data = {};
                                                            
                                                                            if (!this.get('/LeftTree.model').el.iter_n_children(null)) {
                                                                                    // no children.. -- asume it's ok..
                                                                                    this.targetData =  [ '' , Gtk.TreeViewDropPosition.INTO_OR_AFTER , ''];
                                                                                    Gdk.drag_status(ctx, action ,time);
                                                                                    return true;
                                                                            }
                                                            
                                                                            print("GETTING POS");
                                                                            var isOver = this.get('/LeftTree.view').el.get_dest_row_at_pos(x,y, data);
                                                                            print("ISOVER? " + isOver);
                                                                            if (!isOver) {
                                                                                Gdk.drag_status(ctx, 0 ,time);
                                                                                return false; // not over apoint!?!
                                                                            }
                                                                            // drag node is parent of child..
                                                                            console.log("SRC TREEPATH: " + src.treepath);
                                                                            console.log("TARGET TREEPATH: " + data.path.to_string());
                                                                            
                                                                            // nned to check a  few here..
                                                                            //Gtk.TreeViewDropPosition.INTO_OR_AFTER
                                                                            //Gtk.TreeViewDropPosition.INTO_OR_BEFORE
                                                                            //Gtk.TreeViewDropPosition.AFTER
                                                                            //Gtk.TreeViewDropPosition.BEFORE
                                                                            
                                                                            if (typeof(src.treepath) != 'undefined'  && 
                                                                                src.treepath == data.path.to_string().substring(0,src.treepath.length)) {
                                                                                print("subpath drag");
                                                                                Gdk.drag_status( ctx, 0 ,time);
                                                                                return false;
                                                                            }
                                                                            
                                                                            // check that 
                                                                            //print("DUMPING DATA");
                                                                            //console.dump(data);
                                                                            // path, pos
                                                                            
                                                                            print(data.path.to_string() +' => '+  data.pos);
                                                                            var tg = this.get('/LeftTree.model').findDropNodeByPath(
                                                                                data.path.to_string(), src.dropList, data.pos);
                                                                                
                                                                            this.get('/LeftTree.view').highlight(tg);
                                                                            if (!tg.length) {
                                                                                print("Can not find drop node path");
                                                                                this.targetData = false;
                                                                                Gdk.drag_status(ctx, 0, time);
                                                                                return true;
                                                                            }
                                                                            //  print(JSON.stringify(tg,null,4));
                                                                            //console.dump(tg);
                                                                            this.targetData = tg;    
                                                                            
                                                                            
                                                                            Gdk.drag_status(ctx, action ,time);
                                                                             
                                                                            return true;
                                                                        },
                                                                        drag_drop : function (w, ctx, x, y, time) {
                                                                              Seed.print("TARGET: drag-drop");
                                                                                //print(JSON.stringify(w.drag_dest_get_target_list(),null,4));
                                                                                w.drag_get_data
                                                                                (          /* will receive 'drag-data-received' signal */
                                                                                        ctx,        /* represents the current state of the DnD */
                                                                                        imports.Builder3.Globals.atoms["STRING"],    /* the target type we want */
                                                                                        time            /* time stamp */
                                                                                );
                                                                                
                                                                                 
                                                                                /* No target offered by source => error */
                                                                               
                                                        
                                                                                return  true;
                                                                        },
                                                                        drag_data_received : function (self, ctx, x, y, sel_data, info, time) {
                                                                                 print("Tree: drag-data-received");
                                                                        
                                                                                      var   delete_selection_data = false;
                                                                                       var  dnd_success = false;
                                                                                       //print(JSON.stringify(sel_data, null,4));
                                                                                        /* Deal with what we are given from source */
                                                                                        
                                                                                        // simce I can not be bothered to sort out
                                                                                        // drag drop = let's assume it worked...
                                                                                        
                                                                                        if( true || (sel_data && sel_data.length )) {
                                                                                            
                                                                                            if (ctx.action == Gdk.DragAction.ASK)  {
                                                                                                /* Ask the user to move or copy, then set the ctx action. */
                                                                                            }
                                                                        
                                                                                            if (ctx.action == Gdk.DragAction.MOVE) {
                                                                                                //delete_selection_data = true;
                                                                                            }
                                                                                            
                                                                                            var source = Gtk.drag_get_source_widget( ctx );
                                                                        
                                                                                            if (this.targetData) {
                                                                                                if (source != this.el) {
                                                                                                    print("DRAG FROM ANOTHER WIDGET");
                                                                                                    this.get('/LeftTree.model').dropNode(this.targetData,  source.dragData);
                                                                                                } else {
                                                                                                    // drag around.. - reorder..
                                                                                                     print("DRAG FROM SELF");
                                                                                                     this.get('/LeftTree.model').moveNode(this.targetData, ctx.action);
                                                                                                    
                                                                                                    
                                                                                                }
                                                                                                //Seed.print(this.targetData);
                                                                                              
                                                                                            }
                                                                                            
                                                                                            
                                                                                            
                                                                                            // we can send stuff to souce here...
                                                                        
                                                                                            dnd_success = true;
                                                                        
                                                                                        }
                                                                        
                                                                                        if (dnd_success == false)
                                                                                        {
                                                                                                Seed.print ("DnD data transfer failed!\n");
                                                                                        }
                                                                        
                                                                                        Gtk.drag_finish (  ctx, dnd_success, delete_selection_data, time);
                                                                                        return true;
                                                                        },
                                                                        cursor_changed : function (self) {
                                                                             if (this.blockChanges) { // probably not needed.. 
                                                                               return true;
                                                                             }
                                                                             var render = this.get('/LeftTree').getRenderer();                
                                                                           
                                                                            
                                                                            if (this.selection.count_selected_rows() < 1) {
                                                                                this.get('/LeftPanel.model').load( false);
                                                                                this.get('/MidPropTree').activeElement =  false;
                                                                                this.get('/MidPropTree').hideWin();
                                                                        
                                                                                var pm = this.get('/RightPalete.model');
                                                                                if (!this.get('/LeftTree').getPaleteProvider()) {
                                                                                    // it may not be loaded yet..
                                                                                    return  true;
                                                                                }
                                                                                pm.load(
                                                                                        this.get('/LeftTree').getPaleteProvider().gatherList(
                                                                                            this.get('/LeftTree.model').listAllTypes()
                                                                                        )
                                                                                    );
                                                                                if (render && render.redraw) {
                                                                                    render.redraw();
                                                                                }
                                                                                return true;
                                                                            }
                                                                                    
                                                                                //console.log('changed');
                                                                            var s = this.selection;
                                                                            var ret = {};
                                                                            s.get_selected(ret);
                                                                            
                                                                             // var val = "";
                                                                            var value = ''+ret.model.get_value(ret.iter, 2).value.get_string();
                                                                            this.get('/LeftPanel.model').activePath = ret.model.get_path(ret.iter).to_string();
                                                                            
                                                                            print("----------START EDITING: " + this.get('/LeftTree').getActivePath() );
                                                                            
                                                                            
                                                                            var data = JSON.parse(value);
                                                                            this.get('/MidPropTree').activeElement =  data;
                                                                            this.get('/MidPropTree').hideWin();
                                                                            this.get('/LeftPanel.model').load( data);
                                                                            
                                                                            console.log(value);
                                                                           // _g.button.set_label(''+value.get_string());
                                                                    
                                                                            var pm =this.get('/RightPalete.model');
                                                                            pm.load(  this.get('/LeftTree').getPaleteProvider().gatherList(
                                                                                 this.get('/LeftTree.model').listAllTypes()));
                                                                           
                                                                            
                                                                            if (render && render.redraw) {
                                                                                render.redraw();
                                                                            }
                                                                               
                                                                                //Seed.print( value.get_string());
                                                                            return true;
                                                                                        
                                                                        }
                                                                    },
                                                                    id : "view",
                                                                    pack : "add",
                                                                    tooltip_column : 1,
                                                                    enable_tree_lines : true,
                                                                    headers_visible : false,
                                                                    highlight : function(treepath_ar) {
                                                                    
                                                                            // highlighting for drag/drop
                                                                            if (treepath_ar.length && treepath_ar[0].length ) {
                                                                                this.el.set_drag_dest_row( 
                                                                                        new  Gtk.TreePath.from_string( treepath_ar[0] ),  treepath_ar[1]);
                                                                                } else {
                                                                                    this.el.set_drag_dest_row(null, Gtk.TreeViewDropPosition.INTO_OR_AFTER);
                                                                                }
                                                                                 
                                                                            },
                                                                            
                                                                    init : function() {
                                                                        XObject.prototype.init.call(this);
                                                                    	var description = new Pango.FontDescription.c_new();
                                                                    	description.set_size(8000);
                                                                    	this.el.modify_font(description);
                                                                    
                                                                    	this.selection = this.el.get_selection();
                                                                    	this.selection.set_mode( Gtk.SelectionMode.SINGLE);
                                                                    	var _this = this;
                                                                    
                                                                    	// is this really needed??
                                                                    	this.selection.signal['changed'].connect(function() {
                                                                    		_this.get('/LeftTree.view').listeners.cursor_changed.apply(
                                                                    		    _this.get('/LeftTree.view'), [ _this.get('/LeftTree.view'), '']
                                                                    		);
                                                                    	});
                                                                        
                                                                    	this.el.drag_source_set(             /* widget will be drag-able */
                                                                    		Gdk.ModifierType.BUTTON1_MASK,       /* modifier that will start a drag */
                                                                    		null,            /* lists of target to support */
                                                                    		0,              /* size of list */
                                                                    		Gdk.DragAction.COPY   | Gdk.DragAction.MOVE           /* what to do with data after dropped */
                                                                    	);
                                                                     
                                                                    	this.el.drag_source_set_target_list(imports.Builder3.Globals.targetList);
                                                                    
                                                                    	this.el.drag_source_add_text_targets(); 
                                                                    	this.el.drag_dest_set
                                                                    	( 
                                                                    	    Gtk.DestDefaults.MOTION  | Gtk.DestDefaults.HIGHLIGHT,
                                                                    	    null,            /* lists of target to support */
                                                                    	    0,              /* size of list */
                                                                    	    Gdk.DragAction.COPY   | Gdk.DragAction.MOVE       /* what to do with data after dropped */
                                                                    	);
                                                                    
                                                                    	this.el.drag_dest_set_target_list(  imports.Builder3.Globals.targetList);
                                                                    	this.el.drag_dest_add_text_targets( );
                                                                    },
                                                                    selectNode : function(treepath_str) {
                                                                        //this.selection.select_path(new  Gtk.TreePath.from_string( treepath_str));
                                                                     var tp = new Gtk.TreePath.from_string(treepath_str);
                                                                              this.el.set_cursor(tp, null, false);  
                                                                          this.el.scroll_to_cell(tp, null, false, 0,0);
                                                                    },
                                                                    items : [
                                                                        {
                                                                            xtype: Gtk.TreeStore,
                                                                            activePath : false,
                                                                            currentTree : false,
                                                                            id : "model",
                                                                            pack : "set_model",
                                                                            
                                                                            setFromNode : function(tp, n)
                                                                            {
                                                                                if (tp === false) {
                                                                                    tp = this.get('/LeftTree').getActivePath();
                                                                                }
                                                                                var ret= {}
                                                                                this.el.get_iter(ret, new  Gtk.TreePath.from_string( tp ) );
                                                                                this.el.set_value(ret.iter, 0, '' +  this.nodeTitle(n));
                                                                                this.el.set_value(ret.iter, 1, '' + this.nodeTitle(n));
                                                                                this.el.set_value(ret.iter, 2, '' + this.nodeToJSON(n));
                                                                                
                                                                            },
                                                                            
                                                                            changed : function(  refresh) {
                                                                                
                                                                                    
                                                                                
                                                                                   print("-------MODEL CHANGED CALLED"  );
                                                                                    
                                                                                        //this.currentTree = this.toJS(false, true)[0];
                                                                                    var d = new Date();
                                                                                    this.file.items = this.toJS(false, false);
                                                                                    print ("TO JS in " + ((new Date()) - d) + "ms");
                                                                                  //  print("AFTER CHANGED");
                                                                                    //console.dump(this.file.items);
                                                                                    this.file.save();
                                                                                    if (typeof(this.file.valaCompileCmd) !== 'undefined') {
                                                                                            var cmd = this.file.valaCompileCmd();
                                                                                            print(cmd.join(" "));
                                                                                            try {
                                                                                            
                                                                                            var Spawn = imports.Spawn;
                                                                                             var output = Spawn.run({
                                                                                                 cwd : '/tmp',
                                                                                                 args : cmd,
                                                                                                 env : [] // optional
                                                                                               
                                                                                                });
                                                                                                print(output);
                                                                                             } catch(e) {
                                                                                                print(e.message);
                                                                                                print(e.toString());
                                                                                            }
                                                                                            /*
                                                                                            print(cmd.join(' '));
                                                                                            var out = {};
                                                                                            this.get('/Terminal').el.fork_command_full(
                                                                                                Vte.PtyFlags.DEFAULT,
                                                                                                '/tmp',
                                                                                                cmd, //argv
                                                                                                [], // env
                                                                                                0, //spawn flags
                                                                                                null, // user func
                                                                                                null, // child setupdata
                                                                                                out
                                                                                           ); 
                                                                                           */
                                                                                            //var cmd = "/usr/bin/seed " + runner + " " + dir + "\n";
                                                                                            //this.get('/Terminal').el.feed_child(cmd, cmd.length);
                                                                                            
                                                                                        
                                                                                        
                                                                                    }
                                                                                    
                                                                                    this.currentTree = this.file.items[0];
                                                                                    //console.log(this.file.toSource());
                                                                                    
                                                                                    if (refresh) {
                                                                                        print("REDNER BROWSER?!");
                                                                                        this.get('/LeftTree').renderView();
                                                                            
                                                                                        var pm = this.get('/RightPalete.model');
                                                                                        if (!this.get('/RightPalete').provider) {
                                                                                            pm.load([]);
                                                                                            return;
                                                                                        }
                                                                                        
                                                                                        
                                                                                        pm.load( this.get('/RightPalete').provider.gatherList(this.listAllTypes()));
                                                                                        //imports['Builder/RightBrowser.js'].renderJS(this.toJS());
                                                                                    }
                                                                            	          
                                                                            },
                                                                            deleteSelected : function() {
                                                                                this.get('/LeftTree.view').blockChanges = true;
                                                                                var oret = {};
                                                                                var s = this.get('/LeftTree.view').selection;
                                                                                s.get_selected(oret);
                                                                                var path = this.el.get_path(oret.iter).to_string();
                                                                                
                                                                                this.activePath= false;      
                                                                                s.unselect_all();
                                                                            
                                                                                this.activePath= false;      
                                                                                 var ret = {};
                                                                                this.el.get_iter_from_string(ret, path);
                                                                                this.el.remove(ret.iter);
                                                                                
                                                                                // rebuild treemap. -- depreciated.!!
                                                                                this.map = {};
                                                                                this.treemap = { };
                                                                                //this.toJS(null, true) // does not do anything?
                                                                                this.activePath= false;      
                                                                                this.changed(true);
                                                                                this.get('/LeftTree.view').blockChanges = false;
                                                                            },
                                                                            dropNode : function(target_data, node) {
                                                                                     print("drop Node");
                                                                                 // console.dump(node);
                                                                                    //print(JSON.Stringify(target_data, null, 4));
                                                                                    var tp = target_data[0].length ? new  Gtk.TreePath.from_string( target_data[0] ) : false;
                                                                                    
                                                                                    print("add " + tp + "@" + target_data[1]  );
                                                                                    var parent = tp;
                                                                                    var after = false;
                                                                                    if (tp && target_data[1]  < 2) { // before or after..
                                                                                        var ar = target_data[0].split(':');
                                                                                        ar.pop();
                                                                                        parent  = new  Gtk.TreePath.from_string( ar.join(':') );
                                                                                        after = tp;
                                                                                    }
                                                                                    var nret = {};
                                                                                    var pret = {}
                                                                                    var aret = after ? {} : false;
                                                                                    
                                                                                    
                                                                                    
                                                                                    if (parent !== false) {
                                                                                        this.el.get_iter(pret, parent);
                                                                                    } else {
                                                                                        pret.iter = null;
                                                                                    }
                                                                                    
                                                                                    
                                                                                    if (tp && after) {
                                                                                        print(target_data[1]  > 0 ? 'insert_after' : 'insert_before');
                                                                                        this.el.get_iter(aret, after);
                                                                                        this.el[ target_data[1]  > 0 ? 'insert_after' : 'insert_before'](
                                                                                                nret, pret.iter, aret.iter);
                                                                                        
                                                                                    } else {
                                                                                        this.el.append(nret, pret.iter);
                                                                                        
                                                                                    }
                                                                                    var new_path = this.el.get_path(nret.iter).to_string();
                                                                                    print("new path = " + new_path)
                                                                                    if (typeof(node) == 'string') {
                                                                                        var ar = node.split('.');
                                                                                        var xtype = ar.pop();
                                                                                        
                                                                                        node = {
                                                                                            '|xns' : ar.join('.'),
                                                                                            'xtype' : xtype
                                                                                        };
                                                                                        if (target_data.length == 3 && target_data[2].length) {
                                                                                            node['*prop'] = target_data[2];
                                                                                        }
                                                                                        node = this.get('/DialogTemplateSelect').show(node);
                                                                                        
                                                                                    }
                                                                                    // work out what kind of packing to use..
                                                                                    if (typeof(node.pack) == 'undefined'  && parent !== false) {
                                                                                        var pal = this.get('/LeftTree').getPaleteProvider();
                                                                                        if (pal.name == 'Gtk') {
                                                                                            var pname = pal.guessName(this.singleNodeToJS(parent.to_string()));
                                                                                            var cname = pal.guessName(node);
                                                                                            node.pack = pal.getDefaultPack(pname, cname);
                                                                                        }
                                                                                        
                                                                                    }
                                                                                    
                                                                                    
                                                                                    var xitems = [];
                                                                                    if (node.items) {
                                                                                        xitems = node.items;
                                                                                        delete node.items;
                                                                                    }
                                                                                    // load children - if it has any..
                                                                            
                                                                                    if (xitems) {
                                                                                        this.load(xitems, nret.iter);
                                                                                        this.get('/LeftTree.view').el.expand_row(this.el.get_path(nret.iter), true);
                                                                                    }
                                                                                    if (tp && (xitems || after)) {
                                                                                        this.get('/LeftTree.view').el.expand_row(this.el.get_path(pret.iter), true);
                                                                                    }
                                                                                    // wee need to get the empty proptypes from somewhere..
                                                                                    
                                                                                    //var olditer = this.activeIter;
                                                                                    //this.activePath = new_path;
                                                                                    print("calling changed with node data")
                                                                              // changed actually set's the node data..
                                                                                    this.setFromNode(new_path,node);
                                                                                    this.changed(true);
                                                                                    
                                                                                    
                                                                                    
                                                                                    this.get('/LeftTree.view').el.set_cursor(this.el.get_path(nret.iter), null, false);
                                                                                    
                                                                                    //Builder.MidPropTree._model.load(node);
                                                                                    //Builder.MidPropTree._win.hideWin();
                                                                                    //Builder.LeftPanel._model.load( node);
                                                                                    
                                                                                        
                                                                            },
                                                                            findDropNode : function(treepath_str, targets) {
                                                                            
                                                                            // this is used by the dragdrop code in the roo version AFAIR..
                                                                            
                                                                                		var path = treepath_str.replace(/^builder-/, '');
                                                                                        // treemap is depreciated... - should really check if model has any entries..
                                                                            
                                                                                        if (!this.el.iter_n_children(null)) {
                                                                                            print("NO KEYS");
                                                                                            return [ '',  Gtk.TreeViewDropPosition.INTO_OR_AFTER];
                                                                                        }
                                                                                        print("FIND treepath: " + path);
                                                                                        //console.dump(this.treemap);
                                                                                        
                                                                                        if (!treepath_str.match(/^builder-/)) {
                                                                                            return []; // nothing!
                                                                                        }
                                                                                        if (targets === true) {
                                                                                            return [ path ];
                                                                                        }
                                                                                        return this.findDropNodeByPath(path,targets) 
                                                                            },
                                                                            findDropNodeByPath : function(treepath_str, targets, pref) {
                                                                                var path = treepath_str + ''; // dupe it..
                                                                                pref = typeof(pref) == 'undefined' ?  Gtk.TreeViewDropPosition.INTO_OR_AFTER : pref;
                                                                                var last = false;
                                                                                //console.dump(this.treemap);
                                                                                while (path.length) {
                                                                                    print("LOOKING FOR PATH: " + path);
                                                                                    var node_data = this.singleNodeToJS(path);
                                                                                    if (node_data === false) {
                                                                                        print("node not found");
                                                                                        return [];
                                                                                    }
                                                                                    
                                                                                    var xname = this.get('/LeftTree.model').file.guessName(node_data);
                                                                                    var match = false;
                                                                                    var prop = '';
                                                                                    targets.forEach(function(tg) {
                                                                                        if (match) {
                                                                                            return;;
                                                                                        }
                                                                                        if ((tg == xname)  ) {
                                                                                            match = tg;
                                                                                        }
                                                                                        if (tg.indexOf(xname +':') === 0) {
                                                                                            match = tg;
                                                                                            prop = tg.split(':').pop();
                                                                                        }
                                                                                    });
                                                                                    
                                                                                    if (match) {
                                                                                        if (last) { // pref is after/before..
                                                                                            // then it's after last
                                                                                            if (pref > 1) {
                                                                                                return []; // do not allow..
                                                                                            }
                                                                                            return [ last, pref , prop];
                                                                                            
                                                                                        }
                                                                                        return [ path , Gtk.TreeViewDropPosition.INTO_OR_AFTER , prop];
                                                                                    }
                                                                                    var par = path.split(':');
                                                                                    last = path;
                                                                                    par.pop();
                                                                                    path = par.join(':');
                                                                                }
                                                                                
                                                                                return [];
                                                                                        
                                                                            },
                                                                            getIterValue : function (iter, col) {
                                                                                
                                                                                var gval = ''+this.el.get_value(iter, col).value.get_string();
                                                                                return  gval;
                                                                                
                                                                                
                                                                            },
									    columns : [
                                                                                        GObject.TYPE_STRING, // title 
                                                                                        GObject.TYPE_STRING, // tip
                                                                                        GObject.TYPE_STRING // source..
                                                                             ] ,
																			
																			
                                                                           
                                                                            listAllTypes : function() {
                                                                                var s = this.get('/LeftTree.view').selection;
                                                                                print ("LIST ALL TYPES: " + s.count_selected_rows() );
                                                                                
                                                                                if (s.count_selected_rows() > 0) {
                                                                                    var ret = {}
                                                                                    s.get_selected(ret);
                                                                            
                                                                                    // set some properties of the tree for use by the dropped element.
                                                                                    var value = ''+ this.el.get_value(ret.iter, 2).value.get_string();
                                                                                    var data = JSON.parse(value);
                                                                                    
                                                                                    
                                                                                    var xname = this.get('/LeftTree.model').file.guessName(data);
                                                                                    console.log('selected:' + xname);
                                                                                    if (xname.length) {
                                                                                        return [ xname ];
                                                                                    }
                                                                                    return []; // could not find it..
                                                                                }
                                                                                
                                                                                var ret = [ ];
                                                                                
                                                                               var _this = this;
                                                                                function addall(li)
                                                                                {
                                                                                    var el;
                                                                                    for (var i =0 ; i < li.length; i++ ) { 
                                                                                        el = li[i];
                                                                                    
                                                                                        // this is specific to roo!!!?
                                                                                        if (!el) { // skip empty?
                                                                                            return;
                                                                                        }
                                                                                        var fullpath =  _this.file.guessName(el);
                                                                                        if (fullpath.length && ret.indexOf(fullpath) < 0) {
                                                                                            ret.push(fullpath);
                                                                                        }
                                                                                        
                                                                                        
                                                                                        if (el.items && el.items.length) {
                                                                                            addall(el.items);
                                                                                        }
                                                                                        
                                                                                    };
                                                                                    
                                                                                    
                                                                                }
                                                                                
                                                                                addall([this.currentTree]);
                                                                                
                                                                                // only if we have nothing, should we add '*top'
                                                                                if (!ret.length) {
                                                                                    ret = [ '*top' ];
                                                                                }
                                                                                //console.log('all types in tree');
                                                                                //console.dump(ret);
                                                                                
                                                                                return ret;
                                                                                                        
                                                                            },
                                                                            load : function(tr,iter)
                                                                                    {
                                                                                         //this.insert(citer,iter,0);
                                                                                         
                                                                                        for(var i =0 ; i < tr.length; i++) {
                                                                                            var ret = {  };
                                                                                            if (iter) {
                                                                                                this.el.insert(ret ,iter,-1);
                                                                                            } else {
                                                                                                this.el.append(ret);
                                                                                            }
                                                                                            //print(JSON.stringify(ret,null,4));
                                                                                            //print('call nodeToJSON: ' + tr[i]);
                                                                                            var body = this.nodeToJSON(tr[i]);
                                                                                            //print(body);
                                                                                            //this.el.set_value(ret.iter, 0, '' _ [GObject.TYPE_STRING, this.nodeTitle(tr[i]) ]);
                                                                                            //this.el.set_value(ret.iter, 1, [GObject.TYPE_STRING, this.nodeTip(tr[i]) ]);
                                                                                            //this.el.set_value(ret.iter, 2, [GObject.TYPE_STRING, body ]);
                                                                                            this.el.set_value(ret.iter, 0, ''  +  this.nodeTitle(tr[i]) );
                                                                                            this.el.set_value(ret.iter, 1, '' + this.nodeTip(tr[i]) );
                                                                                            this.el.set_value(ret.iter, 2, '' +  body );
                                                                                            if (tr[i].items && tr[i].items.length) {
                                                                                                this.load(tr[i].items, ret.iter);
                                                                                            }
                                                                                        }     
                                                                                    },
                                                                            loadFile : function(f) {
                                                                                //console.dump(f);
                                                                                  print("LOADFILE");
                                                                                        this.el.clear();
                                                                                        this.file = f;
                                                                                        
                                                                                        if (!f) {
                                                                                            console.log('missing file');
                                                                                            return;
                                                                                        }
                                                                                        
                                                                                        // load the file if not loaded..
                                                                                        if (f.items === false) {
                                                                                            var _this = this;
                                                                                            f.loadItems(function() {
                                                                                                _this.loadFile(f);
                                                                                            });
                                                                                            return;
                                                                                            
                                                                                        }
                                                                                        this.get('/Window').setTitle(f.project.getName() + ' - ' + f.name);
                                                                                        
                                                                                        if (f.items.length && typeof(f.items[0]) == 'string') {
                                                                                        
                                                                                            //this.get('/RightEditor').el.show();
                                                                                            //this.get('/RightEditor.view').load( f.items[0]);
                                                                                            return;
                                                                                        }
                                                                                        print("LOAD");
                                                                                        //print(JSON.stringify(f.items, null,4));
                                                                                        //console.dump(f.items);
                                                                                        this.load(f.items);
                                                                                        this.get('/LeftTree.view').el.expand_all();
                                                                            
                                                                                        if (!f.items.length) {
                                                                                            // single item..
                                                                                            
                                                                                            this.get('/Window.leftvpaned').el.set_position(80);
                                                                                            // select first...
                                                                                            this.get('/LeftTree.view').el.set_cursor( 
                                                                                                new  Gtk.TreePath.from_string('0'), null, false);
                                                                                            
                                                                                            
                                                                                        } else {
                                                                                              this.get('/Window.leftvpaned').el.set_position(200);
                                                                                        }
                                                                                        
                        //return; -- debuggin
                                                                                        //print("hide right editior");
                                                                                        //this.get('/RightEditor').el.hide();
                                                                                        this.get('/Editor').el.hide();
                                                                                        print("set current tree");
                                                                                        
                                                                                        this.currentTree = this.toJS(false, false)[0];
                                                                                        
                                                                                        
                                                                                        //console.dump(this.currentTree);
                                                                                        this.currentTree = this.currentTree || { items: [] };
                                                                                        this.get('/LeftTree').renderView();
                                                                                       // console.dump(this.map);
                                                                                        //var RightPalete     = imports.Builder.RightPalete.RightPalete;
                                                                                        var pm = this.get('/RightPalete.model');
                                                                                        // set up provider..
                                                                                        
                                                                                        this.get('/RightPalete').provider = this.get('/LeftTree').getPaleteProvider();
                                                                                        
                                                                                        if (!this.get('/RightPalete').provider) {
                                                                                            print ("********* PALETE PROVIDER MISSING?!!");
                                                                                        }
                                                                                        this.get('/LeftTree').renderView();
                                                                                        
                                                                                        pm.load( this.get('/LeftTree').getPaleteProvider().gatherList(this.listAllTypes()));
                                                                                        
                                                                                        
                                                                                                
                                                                                        this.get('/Window.view-notebook').el.set_current_page(
                                                                                            this.get('/LeftTree.model').file.getType()== 'Roo' ? 0 : -1);
                                                                                                
                                                                            },
                                                                            moveNode : function(target_data, action) {
                                                                                 //print("MOVE NODE");
                                                                                       // console.dump(target_data);
                                                                                var oret = {};
                                                                                var s = this.get('/LeftTree.view').selection;
                                                                                s.get_selected( oret);
                                                                                var node = this.nodeToJS(oret.iter,false);
                                                                                    //console.dump(node);
                                                                                //print(JSON.stringify(node, null,4)); 
                                                                                    
                                                                                    // needs to drop first, otherwise the target_data 
                                                                                        // treepath will be invalid.
                                                                                        
                                                                                this.dropNode(target_data, node);
                                                                                if (action & Gdk.DragAction.MOVE) {
                                                                                                  //          print("REMOVING OLD NODE");
                                                                                    this.el.remove(oret.iter);
                                                                                                    
                                                                                }
                                                                                        
                                                                                this.activePath= false;
                                                                                this.changed(true);
                                                                            },
                                                                            nodeTip : function(c) {
                                                                                var ret = this.nodeTitle(c,true);
                                                                                var funcs = '';
                                                                            
                                                                                
                                                                                for( var i in c) {
                                                                            
                                                                                    if (!i.length || i[0] != '|') {
                                                                                        continue;
                                                                                    }
                                                                                    if (i == '|init') { 
                                                                                        continue;
                                                                                    }
                                                                                    if (typeof(c[i]) != 'string') {
                                                                                       continue;
                                                                                    }
                                                                                    //print("prop : " + i + ':' + c[i]);
                                                                                    if (!c[i].match(new RegExp('function'))) {
                                                                                        continue;
                                                                                    }
                                                                                    funcs += "\n<b>" + i.substring(1) + '</b> : ' + c[i].split(/\n/).shift();
                                                                                        
                                                                                }
                                                                                if (funcs.length) {
                                                                                    ret+="\n\nMethods:" + funcs;
                                                                                }
                                                                                return ret;
                                                                                
                                                                            },
                                                                            nodeTitle : function(c, renderfull) {
                                                                                  var txt = [];
                                                                                c = c || {};
                                                                                var sr = (typeof(c['+buildershow']) != 'undefined') &&  !c['+buildershow'] ? true : false;
                                                                                if (sr) txt.push('<s>');
                                                                                if (typeof(c['*prop']) != 'undefined')   { txt.push(c['*prop']+ ':'); }
                                                                                
                                                                                if (renderfull && c['|xns']) {
                                                                                    txt.push(c['|xns']);
                                                                                }
                                                                                
                                                                                if (c.xtype)      { txt.push(c.xtype); }
                                                                                if (c.id)      { txt.push('<b>[id=' + c.id + ']</b>'); }
                                                                                if (c.fieldLabel) { txt.push('[' + c.fieldLabel + ']'); }
                                                                                if (c.boxLabel)   { txt.push('[' + c.boxLabel + ']'); }
                                                                                
                                                                                
                                                                                if (c.layout)     { txt.push('<i>' + c.layout + '</i>'); }
                                                                                if (c.title)      { txt.push('<b>' + c.title + '</b>'); }
                                                                                if (c.label)      { txt.push('<b>' + c.label+ '</b>'); }
                                                                                if (c.header)    { txt.push('<b>' + c.header + '</b>'); }
                                                                                if (c.legend)      { txt.push('<b>' + c.legend + '</b>'); }
                                                                                if (c.text)       { txt.push('<b>' + c.text + '</b>'); }
                                                                                if (c.name)       { txt.push('<b>' + c.name+ '</b>'); }
                                                                                if (c.region)     { txt.push('<i>(' + c.region + ')</i>'); }
                                                                                if (c.dataIndex) { txt.push('[' + c.dataIndex+ ']'); }
                                                                                
                                                                                // for flat classes...
                                                                                if (typeof(c['*class']) != 'undefined')  { txt.push('<b>' +  c['*class']+  '</b>'); }
                                                                                if (typeof(c['*extends']) != 'undefined')  { txt.push(': <i>' +  c['*extends']+  '</i>'); }
                                                                                
                                                                                
                                                                                if (sr) txt.push('</s>');
                                                                                return (txt.length == 0 ? "Element" : txt.join(" "));
                                                                            },
                                                                            nodeToJS : function (treepath, with_id) 
                                                                            {
                                                                                //print("nodeToJS : WITHID: "+ with_id);
                                                                                var iter = treepath;  // API used to be iter here..
                                                                                if (typeof(iter) == 'string') {
                                                                                    var ret = {};
                                                                                    if (!this.el.get_iter(ret,
                                                                                                new Gtk.TreePath.from_string(treepath))) {
                                                                                        return false;
                                                                                    }
                                                                                    iter = ret.iter;
                                                                                } 
                                                                                var pret = {};
                                                                                var iv = this.getIterValue(iter, 2);
                                                                               // print("IV" + iv);
                                                                                var k = JSON.parse(iv);
                                                                                if (k && k.json && !this.el.iter_parent( pret, iter  )) {
                                                                                    delete k.json;
                                                                                }
                                                                                
                                                                                if (with_id) {
                                                                                    var treepath_str = this.el.get_path(iter).to_string();
                                                                                    // not sure how we can handle mixed id stuff..
                                                                                    if (typeof(k.id) == 'undefined')  {
                                                                                        k.id =  'builder-'+ treepath_str ;
                                                                                    }
                                                                                    
                                                                                    // needed??
                                                                                    this.treemap[  treepath_str ] = k;
                                                                                    k.xtreepath = treepath_str ;
                                                                                    
                                                                                }
                                                                                if (this.el.iter_has_child(iter)) {
                                                                                    var cret = {};
                                                                                    this.el.iter_children(cret, iter);
                                                                                    k.items = this.toJS(cret.iter,with_id);
                                                                                }
                                                                                return k;
                                                                            },
                                                                            nodeToJSON : function(c) {
                                                                                var o  = {}
                                                                                for (var i in c) {
                                                                                    if (i == 'items') {
                                                                                         continue;
                                                                                    }
                                                                                    o[i] = c[i];
                                                                                }
                                                                                return JSON.stringify(o);
                                                                            },
                                                                            singleNodeToJS : function (treepath) 
                                                                                    {
                                                                                        var ret = {};
                                                                                        if (!this.el.get_iter(ret, new Gtk.TreePath.from_string(treepath))) {
                                                                                            return false;
                                                                                        }
                                                                                        
                                                                                        var iv = this.getIterValue(ret.iter, 2);
                                                                                       
                                                                                        return JSON.parse(iv);
                                                                                        
                                                                                    },
                                                                            toJS : function(treepath, with_id)
                                                                            {
                                                                                //print("toJS : WITHID: "+ with_id);
                                                                                
                                                                                var iter = treepath;  // API used to be iter here..
                                                                                
                                                                                if (typeof(iter) == 'string') {
                                                                                    var ret = {};
                                                                                     if (!this.el.get_iter(ret, new Gtk.TreePath.from_string(treepath))) {
                                                                                        return false;
                                                                                    }
                                                                                    iter = ret.iter;
                                                                                }
                                                                                
                                                                                var first = false;
                                                                                
                                                                                if (!iter) {
                                                                                    
                                                                                    this.treemap = { }; 
                                                                                     var ret = {};
                                                                                     if (!this.el.get_iter_first(ret)) {
                                                                                        return [];
                                                                                    }
                                                                                    iter = ret.iter;
                                                                                    first = true;
                                                                                } 
                                                                                
                                                                                var ar = [];
                                                                                   
                                                                                while (true) {
                                                                                    
                                                                                    var k = this.nodeToJS(iter, with_id); 
                                                                                    ar.push(k);
                                                                                    
                                                                                    
                                                                                    if (!this.el.iter_next(iter)) {
                                                                                        break;
                                                                                    }
                                                                                }
                                                                                
                                                                                if (treepath === false) {
                                                                                    //dupe!!!
                                                                                    return JSON.parse(JSON.stringify(ar));
                                                                                }
                                                                                
                                                                                return ar;
                                                                                // convert the list into a json string..
                                                                            
                                                                                
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: Gtk.TreeViewColumn,
                                                                            pack : "append_column",
                                                                            init : function() {
                                                                                XObject.prototype.init.call(this);
                                                                               this.el.add_attribute(this.items[0].el , 'markup', 0 );
                                                                            },
                                                                            items : [
                                                                                {
                                                                                    xtype: Gtk.CellRendererText,
                                                                                    pack : "pack_start"
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: Gtk.Menu,
                                                                    pack : false,
                                                                    id : "LeftTreeMenu",
                                                                    items : [
                                                                        {
                                                                            xtype: Gtk.MenuItem,
                                                                            pack : "add",
                                                                            label : "Delete Element",
                                                                            listeners : {
                                                                                activate : function (self) {
                                                                                
                                                                                     this.get('/LeftTree.model').deleteSelected();
                                                                                }
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: Gtk.MenuItem,
                                                                            listeners : {
                                                                                activate : function (self) {
                                                                                
                                                                                    var tree = this.get('/LeftTree');
                                                                                    var model = this.get('/LeftTree.model');
                                                                                    var el = tree.getActivePath();
                                                                                    print(el);
                                                                                    var js = model.toJS(el, false);
                                                                                    // print(JSON.stringify(js[0], null,4));
                                                                                    this.get('/DialogSaveTemplate').show(JSON.stringify(js[0], null,4));
                                                                                     
                                                                                    
                                                                                }
                                                                            },
                                                                            label : "Save as Template",
                                                                            pack : "add"
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: Gtk.VBox,
                                                            pack : "add",
                                                            id : "LeftProjectTree",
                                                            showNoProjectSelected : function() {
                                                               this.get('/StandardErrorDialog').show("Select a Project first."); 
                                                            },
                                                            getActiveProject : function() {
                                                                 return this.project;
                                                            },
                                                            listeners : {
                                                                leave_notify_event : function (self, event) {
                                                                    return false;
                                                                }
                                                            },
                                                            items : [
                                                                {
                                                                    xtype: Gtk.HBox,
                                                                    pack : "pack_start,false,false",
                                                                    items : [
                                                                        {
                                                                            xtype: Gtk.ComboBox,
                                                                            listeners : {
                                                                                changed : function (self) {
                                                                                	var fn = this.getValue();
                                                                                	var pm  = imports.ProjectManager.ProjectManager;
                                                                                	this.get('/LeftProjectTree.model').loadProject(pm.getByFn(fn))
                                                                                }
                                                                            },
                                                                            id : "combo",
                                                                            getValue : function() {
                                                                                var ix = this.el.get_active();
                                                                                if (ix < 0 ) {
                                                                                    return false;
                                                                                }
                                                                                var data = imports.ProjectManager.ProjectManager.projects;
                                                                                if (typeof(data[ix]) == 'undefined') {
                                                                             	return false; 
                                                                                }
                                                                                return data[ix].fn;
                                                                            },
                                                                            init : function() {
                                                                                XObject.prototype.init.call(this);
                                                                                this.el.add_attribute(this.get('render').el , 'markup', 1 );  
                                                                            },
                                                                            setValue : function(fn)
                                                                            {
                                                                                var el = this.el;
                                                                                el.set_active(-1);
                                                                                var data = imports.ProjectManager.ProjectManager.projects;
                                                                                data.forEach(function(n, ix) {
                                                                                    if (fn == n.fn) {
                                                                                        el.set_active(ix);
                                                                                        return false;
                                                                                    }
                                                                                });
                                                                            },
                                                                            items : [
                                                                                {
                                                                                    xtype: Gtk.CellRendererText,
                                                                                    pack : "pack_start,true",
                                                                                    id : "render"
                                                                                },
                                                                                {
                                                                                    xtype: Gtk.ListStore,
                                                                                    id : "combomodel",
                                                                                    pack : "set_model",
																					
																					columns : [
																						GObject.TYPE_STRING,   
                                                                                        GObject.TYPE_STRING
																					],
																					
																					
                                                                                    
                                                                                    loadData : function(data) {
																						//print("load data called");Seed.quit();
																						//print(data);Seed.quit();
																						
                                                                                        var ov = this.get('/LeftProjectTree.combo').getValue();
                                                                                        this.el.clear();
                                                                                        var el = this.el;
                                                                                        var na = {};
                                                                                        
																						
																						data.forEach(function(p) {
                                                                                            
                                                                                            el.append(na);
                                                                                            //print(JSON.stringify(XObject.keys(na)));
                                                                                            //print(typeof(na.iter));
                                                                                            //print(JSON.stringify(iter))
                                                                                            el.set_value(na.iter, 0, p.fn);
                                                                                            el.set_value(na.iter, 1, p.name);
                                                                                            
                                                                                        });
                                                                                        
                                                                                        this.get('/LeftProjectTree.combo').setValue(ov);
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: Gtk.ScrolledWindow,
                                                                    pack : "add",
                                                                    shadow_type : Gtk.ShadowType.IN,
                                                                  
                                                                    items : [
                                                                        {
                                                                            xtype: Gtk.TreeView,
                                                                           
                                                                            listeners : {
                                                                                cursor_changed : function (self) {
                                                                                    
                                                                                    var model = this.get('/LeftProjectTree.model');
                                                                                    

                                                                                    
                                                                                    if (model.loading) {
                                                                                        
                                                                                         
                                                                                        return;
                                                                                    }
                                                                                    print("LOADING IS FALSE");
                                                                                    var ret = {};        
                                                                                    if (this.selection.count_selected_rows() < 1) {
                                                                                        //XN.get('Builder.LeftTree.model').
                                                                                        this.get('/LeftTree.model').load( false);
                                                                                        
                                                                                        return;
                                                                                    }
                                                                                     //console.log('changed');
                                                                                    var s = this.selection;
                                                                                    s.get_selected(ret);
                                                                                    var value = ''+ ret.model.get_value(ret.iter, 2).value.get_string();
                                                                                    //console.log(JSON.stringify(value,null,4));// id..
                                                                                    console.log("OUT?" + value);// id..
                                                                                    var file = this.get('/LeftProjectTree').project.getById(value);
                                                                                    
                                                                                    file.items = false;
                                                                                    console.log(file);
                                                                                    
                                                                            
                                                                            
                                                                                    var nb = this.get('/LeftTopPanel.expander');
                                                                                    nb.el.expanded = false;
                                                                                    nb.onCollapse();
                                                                                    //nb.listeners.activate.call(nb);
                                                                                    //_expander.el.set_expanded(false);
                                                                            
                                                                                    var ltm = this.get('/LeftTree.model');
                                                                                    ltm.loadFile(file);
                                                                                    
                                                                                    return true;
                                                                                }
                                                                            },
                                                                            id : "view",
                                                                            tooltip_column : 1,
                                                                            enable_tree_lines : true,
                                                                            headers_visible : false,
                                                                            init : function() {
                                                                                XObject.prototype.init.call(this);
                                                                            var description = new Pango.FontDescription.c_new();
                                                                                                        description.set_size(8000);
                                                                                                        this.el.modify_font(description);
                                                                                                        
                                                                                                        this.selection = this.el.get_selection();
                                                                                                        this.selection.set_mode( Gtk.SelectionMode.SINGLE);
                                                                            },
                                                                            items : [
                                                                                {
                                                                                    xtype: Gtk.TreeStore,
                                                                                    pack : "set_model",
                                                                                    id : "model",
                                                                                    loading : false,
																					columns :  [
                                                                                                        GObject.TYPE_STRING, // title 
                                                                                                        GObject.TYPE_STRING, // tip
                                                                                                        GObject.TYPE_STRING // id..
                                                                                                        ] ,
																					 
                                                                                    
                                                                                    loadProject : function(pr) {
                                                                                         print("LOAD PROJECT");
                                                                                          var model = this.get('/LeftProjectTree.model');
                                                                                         model.loading = true;
                                                                                          
                                                                                        this.el.clear();
                                                                                         if (!pr) {
                                                                                             return;
                                                                                         }
                                                                                      
                                                                                         this.get('/LeftProjectTree').project = pr;
                                                                                       
                                                                                         this.load(pr.toTree());
                                                                                    
                                                                                         this.get('/LeftProjectTree.view').el.expand_all();
                                                                                         model.loading = false;
                                                                                         
                                                                                    },
                                                                                    load : function(tr,iter) {
                                                                                      //  console.dump(tr);
                                                                                        
                                                                                       
                                                                                        console.log('Project tree load: ' + tr.length);
                                                                                        var cret = {};
                                                                                        //this.insert(citer,iter,0);
                                                                                        
                                                                                        var _this = this;
                                                                                        // recursive...
                                                                                        tr.forEach(function (r) {
                                                                                            if (!iter) {
                                                                                                _this.el.append(cret);   
                                                                                            } else {
                                                                                                _this.el.insert(cret,iter,-1);
                                                                                            }
                                                                                            _this.el.set_value(cret.iter, 0,  '' + r.getTitle() ); // title 
                                                                                            _this.el.set_value(cret.iter, 1, '' + r.getTitleTip()); // tip
                                                                                            _this.el.set_value(cret.iter, 2, '' + r.id ); //id
                                                                                            if (r.cn && r.cn.length) {
                                                                                                _this.load(r.cn, cret.iter);
                                                                                            }
                                                                                            
                                                                                        });
                                                                                         
                                                                                    },
                                                                                    getValue : function(iter, col) {
                                                                                        var gval = ''+ this.el.get_value(iter, col).value.get_string();
                                                                                        return  gval;
                                                                                    }
                                                                                },
                                                                                {
                                                                                    xtype: Gtk.TreeViewColumn,
                                                                                    pack : "append_column",
                                                                                    init : function() {
                                                                                        XObject.prototype.init.call(this);
                                                                                        this.el.add_attribute(this.items[0].el , 'markup', 0 );
                                                                                    },
                                                                                    items : [
                                                                                        {
                                                                                            xtype: Gtk.CellRendererText,
                                                                                            pack : "pack_start"
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: Gtk.VBox,
                                            items : [
                                                {
                                                    xtype: Gtk.HBox,
                                                    pack : "pack_start,false,true,0",
                                                    id : "LeftProps",
                                                    items : [
                                                        {
                                                            xtype: Gtk.Button,
                                                            pack : "add",
                                                            listeners : {
                                                                button_press_event : function (self, event) {
                                                                    this.get('/MidPropTree.model').showData('props');
                                                                    return false;
                                                                }
                                                            },
                                                            items : [
                                                                {
                                                                    xtype: Gtk.HBox,
                                                                    pack : "add",
                                                                    items : [
                                                                        {
                                                                            xtype: Gtk.Image,
                                                                            pack : "add",
                                                                            stock : Gtk.STOCK_ADD,
                                                                            icon_size : Gtk.IconSize.MENU
                                                                        },
                                                                        {
                                                                            xtype: Gtk.Label,
                                                                            pack : "add",
                                                                            label : "Property"
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: Gtk.Button,
                                                            listeners : {
                                                                button_press_event : function (self, event) {
                                                                    
                                                                 	if (!this.get('/Editor').save()) {
                                                                 	    // popup!! - click handled.. 
                                                                 	    return true;
                                                                        }
                                                                        this.get('/MidPropTree.model').showData('events');
                                                                    return false;
                                                                }
                                                            },
                                                            pack : "add",
                                                            items : [
                                                                {
                                                                    xtype: Gtk.HBox,
                                                                    pack : "add",
                                                                    items : [
                                                                        {
                                                                            xtype: Gtk.Image,
                                                                            pack : "add",
                                                                            stock : Gtk.STOCK_ADD,
                                                                            icon_size : Gtk.IconSize.MENU
                                                                        },
                                                                        {
                                                                            xtype: Gtk.Label,
                                                                            pack : "add",
                                                                            label : "Handler"
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: Gtk.Button,
                                                            listeners : {
                                                                button_press_event : function (self, ev) {
                                                                
                                                                 	if (!this.get('/Editor').save()) {
                                                                 	    // popup!! - click handled.. 
                                                                 	    return true;
                                                                        }
                                                                        
                                                                	var p = this.get('/AddPropertyPopup');
                                                                	if (!p.el) {
                                                                		p.init();
                                                                	}
                                                                 	p.el.set_screen(Gdk.Screen.get_default());
                                                                        p.el.show_all();
                                                                         p.el.popup(null, null, null, null, 3, ev.button.time);
                                                                    return true;
                                                                }
                                                            },
                                                            pack : "add",
                                                            items : [
                                                                {
                                                                    xtype: Gtk.HBox,
                                                                    pack : "add",
                                                                    items : [
                                                                        {
                                                                            xtype: Gtk.Image,
                                                                            pack : "add",
                                                                            stock : Gtk.STOCK_ADD,
                                                                            icon_size : Gtk.IconSize.MENU
                                                                        },
                                                                        {
                                                                            xtype: Gtk.Label,
                                                                            pack : "add",
                                                                            label : "Other"
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: Gtk.Menu,
                                                                    pack : false,
                                                                    id : "AddPropertyPopup",
                                                                    items : [
                                                                        {
                                                                            xtype: Gtk.MenuItem,
                                                                            pack : "append",
                                                                            tooltip_markup : "Using this.get('*someid') will find any id in an application.",
                                                                            label : "ID",
                                                                            listeners : {
                                                                                activate : function (self) {
                                                                                    
                                                                                    this.get('/LeftPanel.model').add( {
                                                                                        key : 'id', 
                                                                                        type : 'string',
                                                                                        val : '',
                                                                                        //skel  : skel,
                                                                                        etype : 'props'
                                                                                    });
                                                                                }
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: Gtk.MenuItem,
                                                                            pack : "append",
                                                                            tooltip_markup : "Add what type of packing is to be used",
                                                                            label : "PACK",
                                                                            listeners : {
                                                                                activate : function (self) {
                                                                                
                                                                                    this.get('/LeftPanel.model').add( {
                                                                                    	 key : 'pack', 
                                                                                       	 type : 'string',
                                                                                       	 val : 'add',
                                                                                          etype : 'props'
                                                                                    });
                                                                                }
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: Gtk.MenuItem,
                                                                            pack : "append",
                                                                            tooltip_markup : "Override the init method",
                                                                            label : "INIT",
                                                                            listeners : {
                                                                                activate : function (self) {
                                                                                
                                                                                    this.get('/LeftPanel.model').add( {
                                                                                       key : '|init', 
                                                                                        type : 'function',
                                                                                        val  : "function() {\n    XObject.prototype.init.call(this);\n}\n",
                                                                                        etype : 'props'
                                                                                    });
                                                                                }
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: Gtk.SeparatorMenuItem,
                                                                            pack : "add"
                                                                        },
                                                                        {
                                                                            xtype: Gtk.MenuItem,
                                                                            pack : "append",
                                                                            tooltip_markup : "Add a user defined string property",
                                                                            label : "String",
                                                                            listeners : {
                                                                                activate : function (self) {
                                                                                
                                                                                    this.get('/LeftPanel.model').add( {
                                                                                  		  key : '', 
                                                                                                type : 'string',
                                                                                                val  : "",
                                                                                                etype : 'props'
                                                                                    });
                                                                                }
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: Gtk.MenuItem,
                                                                            pack : "append",
                                                                            tooltip_markup : "Add a user defined number property",
                                                                            label : "Number",
                                                                            listeners : {
                                                                                activate : function (self) {
                                                                                
                                                                                    this.get('/LeftPanel.model').add( {
                                                                                  		  key : '', 
                                                                                                type : 'number',
                                                                                                val  : 0,
                                                                                                etype : 'props'
                                                                                    });
                                                                                }
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: Gtk.MenuItem,
                                                                            pack : "append",
                                                                            tooltip_markup : "Add a user defined boolean property",
                                                                            label : "Boolean",
                                                                            listeners : {
                                                                                activate : function (self) {
                                                                                
                                                                                    this.get('/LeftPanel.model').add( {
                                                                                  		  key : '', 
                                                                                                type : 'boolean',
                                                                                                val  : false,
                                                                                                etype : 'props'
                                                                                    });
                                                                                }
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: Gtk.SeparatorMenuItem,
                                                                            pack : "add"
                                                                        },
                                                                        {
                                                                            xtype: Gtk.MenuItem,
                                                                            pack : "append",
                                                                            tooltip_markup : "Add a user function boolean property",
                                                                            label : "Function",
                                                                            listeners : {
                                                                                activate : function (self) {
                                                                                
                                                                                    this.get('/LeftPanel.model').add( {
                                                                                  	    key : '|', 
                                                                                                        type : 'function',
                                                                                                        val  : "function() {\n    \n}\n",
                                                                                                        etype : 'props'
                                                                                    });
                                                                                }
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: Gtk.ScrolledWindow,
                                                    editing : false,
                                                    id : "LeftPanel",
                                                    pack : "add",
                                                    
                                                    shadow_type : Gtk.ShadowType.IN,
                                                    items : [
                                                        {
                                                            xtype: Gtk.TreeView,
                                                            listeners : {
                                                                button_press_event : function (self, ev) {
                                                                
                                                                    
                                                                    if (!this.get('/Editor').save()) {
                                                                        // popup!! - click handled.. 
                                                                        return true;
                                                                    }
                                                                    var res = { }; 
                                                                    
                                                                    if (!this.el.get_path_at_pos(ev.button.x,ev.button.y, res)) {
                                                                        return false; //not on a element.
                                                                    }
                                                                    
                                                                     // right click.
                                                                     if (ev.button.button == 3) {    
                                                                        // show popup!.   
                                                                        if (res.column.title == 'value' && this.get('/LeftPanel').editing) {
                                                                            return false;
                                                                        }
                                                                        //if (! this.get('/LeftPanelPopup')LeftPanelPopup.el) LeftPanelPopup.init();
                                                                        var p = this.get('/LeftPanelPopup');
                                                                        if (!p.el) {
                                                                            p.init();
                                                                        }
                                                                
                                                                        p.el.set_screen(Gdk.Screen.get_default());
                                                                        p.el.show_all();
                                                                        p.el.popup(null, null, null, null, 3, ev.button.time);
                                                                        //Seed.print("click:" + res.column.title);
                                                                        
                                                                        
                                                                        return false;
                                                                    }
                                                                    
                                                                     
                                                                    if (res.column.title != 'value') {
                                                                          //  XObject.error("column is not value?");
                                                                        return false; // ignore.. - key click.. ??? should we do this??
                                                                    }
                                                                    
                                                                    // currently editing???
                                                                //    if (  this.activePath) {
                                                                        
                                                                     //   this.activePath = false;
                                                                       // stop editing!!!!
                                                                        if (this.get('/Editor').dirty) {
                                                                            //if (!this.get('/Editor.buffer').checkSyntax()) {
                                                                            //   this.get('/StandardErrorDialog').show("Fix errors in code and save.."); 
                                                                            //   return true;
                                                                            //    // error Dialog
                                                                            //}
                                                                            if (!this.get('/Editor.view').save()) {
                                                                                return true;
                                                                            }
                                                                        }   
                                                                        this.get('/LeftPanel').editableColumn.items[0].el.stop_editing();
                                                                        this.get('/LeftPanel').editing = false;
                                                                    
                                                                    //    XObject.error("Currently editing?");
                                                                     //   return false;
                                                                   // }
                                                                    
                                                                    var renderer = this.get('/LeftPanel').editableColumn.items[0].el; // set has_entry..
                                                                    
                                                                    var type = this.get('/LeftPanel.model').getType(res.path.to_string());
                                                                        
                                                                    // get options for this type -- this is to support option lists etc..
                                                                    var provider = this.get('/LeftTree').getPaleteProvider();
                                                                    var opts = provider.findOptions(type);
                                                                    
                                                                    if (opts === false) {
                                                                        // it's text etnry
                                                                         this.get('/LeftPanel').editableColumn.setOptions([]);
                                                                        renderer.has_entry = true;
                                                                    } else {
                                                                         this.get('/LeftPanel').editableColumn.setOptions(opts);
                                                                        renderer.has_entry = false;
                                                                    }
                                                                    this.get('/LeftPanel.model').startEditing(res.path.to_string(), 1);
                                                                        
                                                                   //Seed.print("click" + ev.type);
                                                                    //console.dump(res);
                                                                    return false;
                                                                
                                                                              
                                                                   
                                                                }
                                                            },
                                                            id : "view",
                                                            tooltip_column : 5,
                                                            enable_tree_lines : true,
                                                            headers_visible : false,
                                                            init : function() {
                                                                 XObject.prototype.init.call(this); 
                                                                                   
                                                                                this.selection = this.el.get_selection();
                                                                                this.selection.set_mode( Gtk.SelectionMode.SINGLE);
                                                                             
                                                                                
                                                                                var description = new Pango.FontDescription.c_new();
                                                                                description.set_size(8000);
                                                                                this.el.modify_font(description);
                                                            },
                                                            items : [
                                                                {
                                                                    xtype: Gtk.TreeStore,
                                                                    activePath : false,
                                                                    id : "model",
                                                                    pack : "set_model",
                                                                    add : function(info) {
                                                                          // info includes key, val, skel, etype..
                                                                                  console.dump(info);
                                                                                type = info.type.toLowerCase();
                                                                                var data = this.toJS();
                                                                                
                                                                                if (info.etype == 'events') {
                                                                                    data.listeners = data.listeners || { };
                                                                                    if (typeof(data.listeners[info.key]) != 'undefined') {
                                                                                        return; //already set!
                                                                                    }
                                                                                } else {
                                                                                    if (typeof(data[info.key]) != 'undefined') {
                                                                                        return;
                                                                                    }
                                                                                }
                                                                                
                                                                                if (typeof(info.val) == 'undefined') {
                                                                                        
                                                                                    info.val = '';
                                                                                    if (info.type.toLowerCase() == 'boolean') {
                                                                                        info.val = true;
                                                                                    }
                                                                                    if (type == 'number') {
                                                                                        info.val = 0;
                                                                                    }
                                                                                    // utf8 == string..
                                                                                    
                                                                                    
                                                                                }
                                                                                var k = info.key;
                                                                                if (info.etype == 'events') {
                                                                                 
                                                                                    data.listeners[info.key] = info.val;
                                                                                    k = '!' + info.key;
                                                                                } else {
                                                                                    data[info.key] = info.val;
                                                                                }
                                                                                
                                                                                
                                                                                var map = this.load(data);
                                                                                
                                                                                // flag it as changed to the interface..
                                                                                this.get('/LeftTree.model').setFromNode(false,data);
                                                                                this.get('/LeftTree.model').changed(true); 
                                                                                
                                                                                
                                                                                this.startEditing(map[k]);
                                                                                 
                                                                                /*
                                                                                LeftPanel.get('view').el.row_activated(
                                                                                    new Gtk.TreePath.from_string(map[k]), 
                                                                                    LeftPanel.editableColumn.el
                                                                                );
                                                                                */
                                                                    },
                                                                    changed : function(str, doRefresh) {
                                                                        if (!this.activePath) {
                                                                            print("NO active path when changed")
                                                                            return;
                                                                        }
                                                                        var ret = {};
                                                                        this.el.get_iter(ret, new Gtk.TreePath.from_string(this.activePath));
                                                                        
                                                                        this.el.set_value(ret.iter, 1, '' +str);
                                                                        this.el.set_value(ret.iter, 3, '' + this.toShort(str));
                                                                        var type = this.getIterValue(ret.iter, 4);
                                                                    
                                                                        this.el.set_value(ret.iter, 5, type + ' : ' + str);
                                                                        // update the tree...  
                                                                        //print("new data: "  + JSON.stringify(this.toJS() , null,4));
                                                                        this.get('/LeftTree.model').setFromNode(false,this.toJS());
                                                                        this.get('/LeftTree.model').changed(doRefresh); 
                                                                                 
                                                                    },
                                                                    deleteSelected : function() {
                                                                         var data = this.toJS();
                                                                        var ret ={};
                                                                        var s = this.get('/LeftPanel.view').selection;
                                                                        s.get_selected( ret);
                                                                             
                                                                           
                                                                        var val = this.get('/LeftPanel.model').el.get_value(ret.iter, 0).value.get_string();
                                                                        
                                                                        if (val[0] == '!') {
                                                                            // listener..
                                                                            if (!data.listeners || typeof(data.listeners[  val.substring(1)]) == 'undefined') {
                                                                                return;
                                                                            }
                                                                            delete data.listeners[  val.substring(1)];
                                                                            if (!XObject.keys(data.listeners).length) {
                                                                                delete data.listeners;
                                                                            }
                                                                            
                                                                        } else {
                                                                            if (typeof(data[val]) == 'undefined') {
                                                                                return;
                                                                            }
                                                                            delete data[val];
                                                                        }
                                                                        
                                                                        
                                                                        this.load(data);
                                                                        
                                                                        
                                                                        this.get('/LeftTree.model').setFromNode(false,this.toJS());
                                                                        this.get('/LeftTree.model').changed(true); 
                                                                        
                                                                        
                                                                    },
                                                                    getIterValue : function(iter, col) {
                                                                        var gval = '' + this.get('/LeftPanel.model').el.get_value(iter, col).value.get_string();
                                                                        return gval;
                                                                    },
                                                                    getType : function(treepath) {
                                                                         return this.getValue(treepath, 4);
                                                                    },
                                                                    getValue : function(treepath_str, col) 
                                                                    {
                                                                       // get's the  value in a row.. - keys - returns string, values - formats it..
                                                                        var ret = {};
                                                                        this.el.get_iter(ret, new Gtk.TreePath.from_string(treepath_str));
                                                                        
                                                                        var val = '' + this.get('/LeftPanel.model').el.get_value(ret.iter, col).value.get_string();
                                                                        
                                                                        if (col != 1) {
                                                                            return val;
                                                                        }
                                                                        var type = this.getType(this.el.get_path(ret.iter).to_string());
                                                                        //print("TYPE: " +type + " -  val:" + val);
                                                                        switch(type.toLowerCase()) {
                                                                            case 'number':
                                                                            case 'uint':
                                                                            case 'int':
                                                                                return parseFloat(val); // Nan ?? invalid!!?        
                                                                            case 'float':
                                                                            case 'gfloat':
                                                                                return 1.0 * parseFloat(val); // Nan ?? invalid!!?
                                                                            case 'boolean':
                                                                                return val == 'true' ? true : false;
                                                                            default: 
                                                                                var nv = parseFloat(val);
                                                                                if (!isNaN(nv) && (val == ''+nv)) {
                                                                                    return nv;
                                                                                }
                                                                                return val;
                                                                        }
                                                                                                
                                                                    },
																	columns :  [
                                                                                                    GObject.TYPE_STRING,  // 0 real key
                                                                                                    GObject.TYPE_STRING, // 1 real value 
                                                                                                     GObject.TYPE_STRING,  // 2 visable key
                                                                                                     GObject.TYPE_STRING, // 3 visable value
                                                                                                     GObject.TYPE_STRING, // 4 need to store type of!!!
                                                                                                      GObject.TYPE_STRING // 5 tooltip
                                                                                                  
                                                                                                ],
																	
                                                                     load : function(ar) {
                                                                    // might casue problesm..
                                                                        // this.get('/Editor.RightEditor').save();
                                                                    
                                                                           this.get('/Editor').el.hide();
                                                                         this.get('/Editor').activePath = false;
                                                                    
                                                                    
                                                                      this.el.clear();
                                                                                  
                                                                        //this.get('/RightEditor').el.hide();
                                                                        if (ar === false) {
                                                                            return false;
                                                                        }
                                                                        var ret = {}; 
                                                                        
                                                                    
                                                                        var provider = this.get('/LeftTree').getPaleteProvider();
                                                                        
                                                                         
                                                                        // sort!!!?
                                                                        var keys  = XObject.keys(ar);
                                                                        keys.sort();
                                                                        ar.listeners = ar.listeners || {};
                                                                        
                                                                        for (var i in ar.listeners ) {
                                                                             var iret ={};
                                                                            this.el.append(iret);
                                                                            var p = this.el.get_path(iret.iter).to_string();
                                                                            ret['!' + i] = p;
                                                                            
                                                                            this.el.set_value(iret.iter, 0, '!'+  i  );
                                                                            this.el.set_value(iret.iter, 1, '' + ar.listeners[i]);
                                                                            this.el.set_value(iret.iter, 2, '<b>'+ i + '</b>');
                                                                            
                                                                            this.el.set_value(iret.iter, 3, '' + this.toShort(ar.listeners[i]));
                                                                            this.el.set_value(iret.iter, 4, 'function');
                                                                            this.el.set_value(iret.iter, 5, i + ' : ' + ar.listeners[i]);
                                                                        }
                                                                        
                                                                        
                                                                       
                                                                        var _this = this;
                                                                        keys.forEach(function(i) {
                                                                            if (typeof(ar[i]) == 'object') {
                                                                                return;
                                                                            }
                                                                            
                                                                            var type = provider.findType(ar, i, ar[i]);
                                                                            var iret = {};
                                                                            _this.el.append(iret);
                                                                            var p = _this.el.get_path(iret.iter).to_string();
                                                                            ret[i] = p;
                                                                            _this.el.set_value(iret.iter, 0, ''+i);
                                                                            _this.el.set_value(iret.iter, 1, '' + ar[i]);  
                                                                            _this.el.set_value(iret.iter, 2, ''+i);
                                                                            _this.el.set_value(iret.iter, 3, ''+ _this.toShort(ar[i]));
                                                                            _this.el.set_value(iret.iter, 4, ''+type);
                                                                            _this.el.set_value(iret.iter, 5, type + ' : ' + ar[i]);
                                                                        });
                                                                        return ret;
                                                                    },
                                                                    startEditing : function(path,col) {
                                                                        
                                                                        // alled by menu 'edit' currently..
                                                                        /**
                                                                        * start editing path (or selected if not set..)
                                                                        * @param {String|false} path  (optional) treepath to edit - selected tree gets
                                                                        *     edited by default.
                                                                        * @param {Number} 0 or 1 (optional)- column to edit. 
                                                                        */
                                                                        // fix tp to be the 'treepath' string (eg. 0/1/2...)
                                                                        var tp;
                                                                        if (typeof(path) == 'string') {
                                                                            tp = new Gtk.TreePath.from_string(path);
                                                                        } else {
                                                                            var itr = {};
                                                                            var s = this.get('/LeftPanel.view').selection;
                                                                            s.get_selected( itr);
                                                                            tp = this.el.get_path(itr.iter);
                                                                            path = tp.to_string();
                                                                        }
                                                                        
                                                                       
                                                                        // which colum is to be edited..
                                                                        var colObj = false;
                                                                        
                                                                        // not sure what this does..
                                                                        
                                                                        if (typeof(col) == 'undefined') {
                                                                            var k = this.getValue(path, 0);
                                                                            col = 1;
                                                                            colObj = (!k.length || k == '|') ? 
                                                                                this.get('/LeftPanel').propertyColumn : this.get('/LeftPanel').editableColumn;
                                                                        } else {
                                                                            colObj = col ? this.get('/LeftPanel').editableColumn : this.get('/LeftPanel').propertyColumn;
                                                                        }
                                                                        
                                                                        // make sure the pulldown is set correctly..
                                                                        // not really needed for second col...
                                                                        var showEditor = false;
                                                                        this.get('/Editor').activePath = false;
                                                                        this.get('/Editor').el.hide();
                                                                        var provider = this.get('/LeftTree').getPaleteProvider();
                                                                        if (col) {
                                                                            var provider = this.get('/LeftTree').getPaleteProvider();
                                                                            var type = this.get('/LeftPanel.model').getType(path);
                                                                            var opts = provider.findOptions(type);
                                                                            var renderer = this.get('/LeftPanel').editableColumn.items[0].el;
                                                                            
                                                                            if (opts === false) {
                                                                                this.get('/LeftPanel').editableColumn.setOptions([]);
                                                                                renderer.has_entry = true; 
                                                                            } else {
                                                                                this.get('/LeftPanel').editableColumn.setOptions(opts);
                                                                                renderer.has_entry = false;/// - pulldowns do not have entries
                                                                            }
                                                                            // determine if we should use the Text editor...
                                                                            var keyname = this.getValue(path, 0);
                                                                            var data_value = this.getValue(path, 1);
                                                                        
                                                                            if ((keyname[0] == '|') || 
                                                                                (   
                                                                                    (typeof(data_value) == 'string' ) && 
                                                                                    ( data_value.match(/function/g) || data_value.match(/\n/g)) // || (data_value.length > 20))
                                                                                )) {
                                                                                showEditor = true;
                                                                            }
                                                                            print("SHOW EDITOR" + showEditor ? 'YES' :'no');
                                                                            
                                                                        }
                                                                        var _this = this;    
                                                                        // end editing..
                                                                       // this.get('/BottomPane').el.hide();
                                                                        //this.get('/RightEditor').el.hide();
                                                                         
                                                                        
                                                                        if (showEditor) {
                                                                    
                                                                            this.activePath = false;
                                                                            
                                                                            _this.get('/Editor').el.show_all();
                                                                            GLib.timeout_add(0, 1, function() {
                                                                    
                                                                                //_this.get('/BottomPane').el.show();
                                                                                 //_this.get('/RightEditor').el.show();
                                                                                
                                                                                _this.get('/Editor.RightEditor.view').load( _this.getValue(path, 1), provider.name );
                                                                                
                                                                                _this.get('/Editor').activePath = path;
                                                                                _this.activePath = path ;
                                                                              
                                                                                return false;
                                                                            });
                                                                            return;
                                                                        }
                                                                          
                                                                        
                                                                        
                                                                    
                                                                        // iter now has row...
                                                                        GLib.timeout_add(0, 100, function() {
                                                                            _this.activePath = path;
                                                                            colObj.items[0].el.editable = true; // esp. need for col 0..
                                                                            _this.get('/LeftPanel.view').el.set_cursor_on_cell(
                                                                                tp,
                                                                                colObj.el,
                                                                                colObj.items[0].el,
                                                                                true
                                                                            );
                                                                        });
                                                                        
                                                                    },
                                                                    toJS : function() {
                                                                        var iret = {};
                                                                         this.get('/LeftPanel.model').el.get_iter_first(iret);
                                                                         
                                                                        var ar = {};
                                                                           
                                                                        while (true) {
                                                                            
                                                                            var k = this.getValue(this.el.get_path(iret.iter).to_string(), 0);
                                                                           // Seed.print(k);
                                                                            if (k[0] == '!') {
                                                                                ar.listeners = ar.listeners || {};
                                                                                ar.listeners[  k.substring(1)] = this.getValue(this.el.get_path(iret.iter).to_string(), 1);
                                                                                
                                                                            } else {
                                                                                ar[ k ] = this.getValue(this.el.get_path(iret.iter).to_string(), 1);
                                                                            }
                                                                            
                                                                            if (! this.get('/LeftPanel.model').el.iter_next(iret.iter)) {
                                                                                break;
                                                                            }
                                                                        }
                                                                        
                                                                        
                                                                        //print(JSON.stringify(ar));
                                                                        return ar;
                                                                        // convert the l
                                                                    },
                                                                    toShort : function(str) {
                                                                        var a = typeof(str) == 'string' ? str.split("\n") : [];
                                                                            return a.length > 1 ? a[0] + '....' : '' + str;
                                                                    }
                                                                },
                                                                {
                                                                    xtype: Gtk.TreeViewColumn,
                                                                    pack : "append_column",
                                                                    init : function() {
                                                                        XObject.prototype.init.call(this);
                                                                    
                                                                        this.el.add_attribute(this.items[0].el , 'text', 2 );
                                                                        this.get('/LeftPanel').propertyColumn = this;
                                                                    },
                                                                    title : "key",
                                                                    items : [
                                                                        {
                                                                            xtype: Gtk.CellRendererText,
                                                                            pack : "pack_start",
                                                                            listeners : {
                                                                                editing_started : function (self, editable, path) {
                                                                                
                                                                                        this.get('/LeftPanel.model').activePath  = path;
                                                                                
                                                                                },
                                                                                edited : function (self, object, p0) {
                                                                                    
                                                                                    //print("CHANGED VALUE:" + JSON.stringify(p0, null,4));
                                                                                    //    return;
                                                                                	var model = this.get('/LeftPanel.model');
                                                                                    var path = model.activePath;
                                                                                    var iret = {};
                                                                                    model.el.get_iter(iret, new Gtk.TreePath.from_string(path));
                                                                                    model.el.set_value(iret.iter, 0, p0);
                                                                                    model.el.set_value(iret.iter, 2, p0);
                                                                                        
                                                                                	model.activePath = false;
                                                                                    this.get('/LeftTree.model').setFromNode(false,model.toJS());
                                                                                    this.get('/LeftTree.model').changed(true); 
                                                                        
                                                                                    this.el.editable = false;
                                                                                }
                                                                            }
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: Gtk.TreeViewColumn,
                                                                    pack : "append_column",
                                                                    title : "value",
                                                                    init : function() {
                                                                        XObject.prototype.init.call(this);
                                                                    	this.el.add_attribute(this.items[0].el , 'text', 3 );
                                                                    	//this.el.add_attribute(this.items[0].el , 'sensitive', 3 );
                                                                    	//this.el.add_attribute(this.items[0].el , 'editable', 3 );
                                                                              // this.el.set_cell_data_func(cell, age_cell_data_func, NULL, NULL);
                                                                    
                                                                     	this.get('/LeftPanel').editableColumn= this;
                                                                    },
                                                                    setOptions : function(ar) {
                                                                           var m = this.items[0].el.model;
                                                                                m.clear();
                                                                                
                                                                                ar.forEach(function(i) {
                                                                                       // sort!!!?
                                                                                    var iret  = {};
                                                                                    m.append(iret);
                                                                                    m.set_value(iret.iter, 0, i);
                                                                                });
                                                                                
                                                                    },
                                                                    items : [
                                                                        {
                                                                            xtype: Gtk.CellRendererCombo,
                                                                            listeners : {
                                                                                edited : function (self, object, p0) {
                                                                                    
                                                                                 	this.get('/LeftPanel').editing = false;
                                                                                 	var ap = this.get('/LeftPanel.model').activePath
                                                                                	print("EDITED? "  + ap + " - p:" + p0 + " t:" + p0);
                                                                                        this.get('/LeftPanel.model').changed(p0, true);
                                                                                        this.get('/LeftPanel.model').activePath = false;
                                                                                        this.el.editable = false;
                                                                                },
                                                                                editing_started : function (self, editable, path) {
                                                                                   this.get('/LeftPanel').editing  = true;
                                                                                	//  console.log('editing started');
                                                                                       // r.has_entry = false;
                                                                                
                                                                                    this.el.editable = false; // make sure it's not editor...
                                                                                   
                                                                                }
                                                                            },
                                                                            editable : false,
                                                                            pack : "pack_start",
                                                                            text_column : 0,
                                                                            has_entry : true,
                                                                            init : function() {
                                                                                XObject.prototype.init.call(this);
                                                                               this.el.model = new Gtk.ListStore();
                                                                                this.el.model.set_column_types ( 1, [
                                                                                    GObject.TYPE_STRING  // 0 real key
                                                                                  ]);
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: Gtk.Menu,
                                                            pack : false,
                                                            id : "LeftPanelPopup",
                                                            items : [
                                                                {
                                                                    xtype: Gtk.MenuItem,
                                                                    pack : "append",
                                                                    label : "Delete",
                                                                    listeners : {
                                                                        activate : function (self) {
                                                                        	this.get('/LeftPanel.model').deleteSelected();
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    xtype: Gtk.MenuItem,
                                                                    pack : "append",
                                                                    label : "Edit",
                                                                    listeners : {
                                                                        activate : function (self) {
                                                                        	this.get('/LeftPanel.model').startEditing(false, 0);
                                                                        }
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: Gtk.ScrolledWindow,
                                    pack : "pack_end,false,true,0",
                                    id : "MidPropTree",
                                    shown : true,
                                    shadow_type : Gtk.ShadowType.IN,
                                    init : function() {
                                        XObject.prototype.init.call(this);
                                           XObject.prototype.init.call(this); 
                                        this.el.set_policy (Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC)
                                        this.el.set_size_request ( 150, -1 );
                                        this.shown = true;
                                    },
                                    activeElement : false,
                                    hideWin : function() {
                                         
                                        if (!this.shown) {
                                            print("HIDEWIN - currently not shown")
                                            return;
                                        }
                                        
                                        
                                        if (this.get('/Window.left').el.position < 160) {
                                            print("HIDEWIN - small already.")
                                            
                                            return;
                                        }
                                        this.get('/Window.left').el.position = this.get('/Window.left').el.position  - 150;
                                        print("HIDEWIN attempting to hide.")

                                        this.el.hide();
                                        this.shown = false;
                                    },
                                    items : [
                                        {
                                            xtype: Gtk.TreeView,
                                            listeners : {
                                                cursor_changed : function (self) {
                                                        // this is getting fired when we are loading elements..
                                                        if (this.get('/MidPropTree.model').loading) {
                                                            return;
                                                        }
                                                        
                                                       var iret = {};
                                                                        
                                                        //console.log('changed');
                                                        var m = this.get('model');
                                                        if (!this.selection){
                                                           this.selection = this.el.get_selection();
                                                        }
                                                   
                                                        var s = this.selection;
                                                        if (!s.get_selected(iret)) {
                                                            return; 
                                                        }
                                                        var tp = m.el.get_path(iret.iter).to_string();
                                                        
                                                        
                                                        // var val = "";
                                                        
                                                        var key = m.getValue(tp, 0);
                                                        
                                                        var type = m.getValue(tp, 1);
                                                        var skel = m.getValue(tp, 3);
                                                        var etype = m.getValue(tp, 5);
                                                        
                                                        
                                                        this.get('/MidPropTree').hideWin();
                                                
                                                        if (type.toLowerCase() == 'function') {
                                                            
                                                            if (etype != 'events') {
                                                                key = '|' + key;
                                                            }
                                                            print("cursor_changed: ADDding to left panel model");
                                                            this.get('/LeftPanel.model').add({
                                                                key :  key, 
                                                                type : type,
                                                                val  : skel,
                                                                etype : etype
                                                            })  
                                                            return;
                                                        }
                                                        // has dot in name, and is boolean???? this does not make sense..
                                                        //if (type.indexOf('.') > -1 ||  type.toLowerCase() == 'boolean') {
                                                        //     key = '|' + key;
                                                       // }
                                                        print("cursor_changed: ADDding to left panel model");
                                                        this.get('/LeftPanel.model').add( {
                                                            key : key, 
                                                            type : type,
                                                            //skel  : skel,
                                                            etype : etype
                                                           }) //, 
                                                }
                                            },
                                            pack : "add",
                                            tooltip_column : 2,
                                            enable_tree_lines : true,
                                            headers_visible : false,
                                            init : function() {
                                            	XObject.prototype.init.call(this); 
                                                                
                                                   var description = new Pango.FontDescription.c_new();
                                                 description.set_size(8000);
                                                this.el.modify_font(description);     
                                                                
                                                //this.selection = this.el.get_selection();
                                                // this.selection.set_mode( Gtk.SelectionMode.SINGLE);
                                             
                                            
                                                
                                              
                                                
                                            },
                                            items : [
                                                {
                                                    xtype: Gtk.ListStore,
                                                    id : "model",
                                                    pack : "set_model",
                                                    loading : false,
                                                    getValue : function(treepath, col)
                                                    {
                                                        var tp = new Gtk.TreePath.from_string (treepath);
                                                        var iret = {};
                                                        this.el.get_iter (iret, tp);
                                                        var value = this.el.get_value(iret.iter, col);
                                                        return ''+ value.value.get_string();
                                                        
                                                    },
                                                    init : function() {
                                                        XObject.prototype.init.call(this);
                                                       this.el.set_column_types ( 6, [
                                                            GObject.TYPE_STRING,  // real key
                                                             GObject.TYPE_STRING, // real type
                                                             GObject.TYPE_STRING, // docs ?
                                                             GObject.TYPE_STRING, // visable desc
                                                             GObject.TYPE_STRING, // function desc
                                                             GObject.TYPE_STRING // element type (event|prop)
                                                            
                                                        ] );
                                                    },
                                                    showData : function(type) {
                                                                
                                                                
                                                                this.loading = true;
                                                                this.el.clear();
                                                                if (!this.get('/MidPropTree').activeElement || !type) {
                                                                    this.loading = false;
                                                                    return; // no active element
                                                                }
                                                    
                                                                var fullpath = this.get('/LeftTree.model').file.guessName(
                                                                        this.get('/MidPropTree').activeElement);
                                                                var palete = this.get('/LeftTree').getPaleteProvider();
                                                                
                                                                 
                                                                
                                                                Seed.print('Showing right?');
                                                                if (!this.get('/MidPropTree').shown) {
                                                    
                                                                    this.get('/Window.left').el.position = this.get('/Window.left').el.position  + 150;
                                                                    this.get('/MidPropTree').el.show();
                                                                    this.get('/MidPropTree').shown = true;
                                                                }
                                                                
                                                                var elementList = palete.getPropertiesFor(fullpath, type).sort(function(a,b) { 
                                                                    return a.name >  b.name ? 1 : -1;
                                                                });
                                                                print ("GOT " + elementList.length + " items for " + fullpath + "|" + type);
                                                               // console.dump(elementList);
                                                               
                                                                // scope of this is off..??
                                                                
                                                                
                                                                for(var i =0 ; i < elementList.length; i++) {
                                                                    var iret = {};
                                                                    var p=elementList[i];
                                                                    this.el.append(iret);
                                                                  //  console.log( '<b>' + p.name +'</b> ['+p.type+']');
                                                                        //GObject.TYPE_STRING,  // real key
                                                                        // GObject.TYPE_STRING, // real type
                                                                        // GObject.TYPE_STRING, // docs ?this.el.set_value(iter, 0, p.name);et_value(iter, 0, p.name);
                                                                        // GObject.TYPE_STRING // func def?
                                                                        
                                                                    
                                                                    this.el.set_value(iret.iter, 0, p.name);
                                                                    this.el.set_value(iret.iter, 1, p.type);
                                                                    this.el.set_value(iret.iter, 2, '<span size="small"><b>' + p.name +'</b> ['+p.type+']</span>' + "\n" + p.desc);
                                                                    this.el.set_value(iret.iter, 3, p.sig ? p.sig  : '');
                                                                    this.el.set_value(iret.iter, 4, '<span size="small"><b>' + p.name +'</b> ['+p.type+']</span>');
                                                                    this.el.set_value(iret.iter, 5, type);
                                                                    
                                                                }
                                                                this.loading = false;              
                                                    }
                                                },
                                                {
                                                    xtype: Gtk.TreeViewColumn,
                                                    pack : false,
                                                    init : function() {
                                                        this.el = new Gtk.TreeViewColumn();
                                                        this.parent.el.append_column(this.el);
                                                        
                                                        XObject.prototype.init.call(this);
                                                        this.el.add_attribute(this.items[0].el , 'markup', 4  );
                                                    },
                                                    items : [
                                                        {
                                                            xtype: Gtk.CellRendererText,
                                                            pack : "pack_start,true"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: Gtk.HPaned,
                            pack : "add",
                            id : 'centereast',
                            position : 500,

                            items : [
                                {
                                    xtype: Gtk.VPaned,
                                    pack : "add",
                                    position : 300,
                                    items : [
                                        {
                                            xtype: Gtk.VBox,
                                            pack : "add",
                                            items : [
                                                {
                                                    xtype: Gtk.Notebook,
                                                    pack : "pack_start,true,true",
                                                    id : "view-help-nb",
                                                    init : function() {
                                                        XObject.prototype.init.call(this);
                                                       this.el.set_tab_label(this.items[0].el, new Gtk.Label({ label : "Preview" }));
                                                        this.el.set_tab_label(this.items[1].el, new Gtk.Label({ label : "Help" }));
                                                    },
                                                    items : [
                                                        {
                                                            xtype: Gtk.Notebook,
                                                            id : "view-notebook",
                                                            pack : "add",
                                                            tab_border : 0,
                                                            init : function() {
                                                                XObject.prototype.init.call(this);
                                                                this.el.set_current_page(0);
                                                                //print("SET LABEL?")
                                                                this.el.set_tab_label(this.items[0].el, new Gtk.Label({ label : "Roo View" }));
                                                                this.el.set_tab_label(this.items[1].el, new Gtk.Label({ label : "Gtk View" }));
                                                            },
                                                            show_tabs : false,
                                                            items : [
                                                                {
                                                                    xtype: Gtk.VBox,
                                                                    id : "RightBrowser",
                                                                    pack : "add",
                                                                    items : [
                                                                        {
                                                                            xtype: Gtk.HBox,
                                                                            pack : "pack_start,false,true,0",
                                                                            items : [
                                                                                {
                                                                                    xtype: Gtk.Button,
                                                                                    listeners : {
                                                                                        clicked : function (self) {
                                                                                          this.get('/RightBrowser.view').renderJS(null,true);
                                                                                        }
                                                                                    },
                                                                                    label : "Redraw",
                                                                                    pack : "pack_start,false,false,0"
                                                                                },
                                                                                {
                                                                                    xtype: Gtk.CheckButton,
                                                                                    listeners : {
                                                                                        toggled : function (self, state) {
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
                                                                                        clicked : function (self) {
                                                                                          
																						    var view = this.get('/RightBrowser.view');
																						  //this.get('/RightBrowser.view').redraws = 99;
																							view.refreshRequired = true;
																							view.lastRedraw = false;
																							view.renderedData = false;
																							view.renderJS(null,true);
																						  
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
                                                                            init : function() {
                                                                                XObject.prototype.init.call(this);
                                                                                this.el.set_policy(Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC);
                                                                            },
                                                                            shadow_type : Gtk.ShadowType.IN,
                                                                            items : [
                                                                                {
                                                                                    xtype: WebKit.WebView,
                                                                                    listeners : {
                                                                                        load_finished : function (self, object) {
                                                                                            print("load finished");
                                                                                            var file = this.get('/LeftTree.model').file;
                                                                                            file.saveHTML(object);
                                                                                        //    print("load_finished"); return;
                                                                                        	// if (this.ready) { // dont do it twice!
                                                                                        	 //   return; 
                                                                                        	//}
                                                                                        	if (!this.inspectorShown) {
                                                                                                   this.el.get_inspector().show();
                                                                                                   this.inspectorShown = true;
                                                                                        	}
                                                                                        
                                                                                        	this.ready = true;
                                                                                        	
                                                                                                //if (this.pendingRedraw) {
                                                                                                //    this.pendingRedraw = false;
                                                                                                //    this.refreshRequired  = true;
                                                                                                //}
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
                                                                                                    print("console messages: ADDding to left panel model");
                                                                                                    //
                                                                                                   //this.get('/LeftPanel.model').add({
                                                                                                   //     key : val['set'],
                                                                                                   //     val : val['value']
                                                                                                   // });
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
                                                                                                    Gdk.drag_status(ctx,0, time);
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
                                                                                                
                                                                                                 
                                                                                                w.drag_get_data
                                                                                                (          /* will receive 'drag-data-received' signal */
                                                                                                        ctx,        /* represents the current state of the DnD */
                                                                                                        imports.Builder3.Globals.atoms["STRING"],    /* the target type we want */
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
                                                                                    init : function() {
                                                                                        XObject.prototype.init.call(this);
                                                                                        // this may not work!?
                                                                                        var settings =  this.el.get_settings();
                                                                                        settings.enable_developer_extras = true;
                                                                                        
                                                                                        // this was an attempt to change the url perms.. did not work..
                                                                                        // settings.enable_file_access_from_file_uris = true;
                                                                                        // settings.enable_offline_web_application_cache - true;
                                                                                        // settings.enable_universal_access_from_file_uris = true;
                                                                                        var _this = this;
                                                                                         
                                                                                         // init inspector..
                                                                                        this.el.get_inspector().signal.inspect_web_view.connect(function(wi, pg) {
                                                                                             _this.get('/BottomPane.inspector').el.show();
                                                                                             return _this.get('/BottomPane.inspector').el;
                                                                                        
                                                                                        });
                                                                                         
                                                                                         // FIXME - base url of script..
                                                                                         // we need it so some of the database features work.
                                                                                        this.el.load_html_string( "Render not ready" , 
                                                                                                //fixme - should be a config option!
                                                                                                // or should we catch stuff and fix it up..
                                                                                                'http://localhost/app.Builder/'
                                                                                        );
                                                                                            
                                                                                            
                                                                                       //this.el.open('file:///' + __script_path__ + '/../builder.html');
                                                                                                              
                                                                                        this.el.drag_dest_set
                                                                                        (          /* widget that will accept a drop */
                                                                                                Gtk.DestDefaults.MOTION  | Gtk.DestDefaults.HIGHLIGHT,
                                                                                                null,            /* lists of target to support */
                                                                                                0,              /* size of list */
                                                                                                Gdk.DragAction.COPY         /* what to do with data after dropped */
                                                                                        );
                                                                                                                
                                                                                       // print("RB: TARGETS : " + LeftTree.atoms["STRING"]);
                                                                                        this.el.drag_dest_set_target_list(  imports.Builder3.Globals.targetList);
                                                                                        
                                                                                        GLib.timeout_add_seconds(0, 1, function() {
                                                                                            //    print("run refresh?");
                                                                                             _this.runRefresh(); 
                                                                                             return true;
                                                                                         });
                                                                                        
                                                                                        
                                                                                    },
                                                                                    renderJS : function(data, force) {
                                                                                    
                                                                                        // this is the public redraw call..
                                                                                        // we refresh in a loop privately..
                                                                                        var autodraw = this.get('/RightBrowser.AutoRedraw').el.active;
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
                                                                                    
																						// before
                                                                                        
																						
																						
																						
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
                                                                                        
																						var file = this.get('/LeftTree.model').file;
																						var items = file.items;
                                                                                        file.items = this.get('/LeftTree.model').toJS(false, false);
																						//file.items[0].background = false;
																						//var p = file.parent;
																						//file.parent = false;
																						 
                                                                                        var js_src = file.toSourcePreview();
																						if (this.renderedData && js_src == this.renderedData && project.runhtml == this.runhtml) {
																							// unless it' sforced..
																							
																							return;
																						}
																						
																						this.renderedData = js_src;
																						// restore stuff..
																						//file.parent = p;
																						//file.items = items;
																						//print("send source as " + js_src);
																						
																						js_src += "\n" +
																								"Roo.onReady(function() {\n" +
																								"if (" + file.name +".show) " +  file.name +".show({});\n" +
																								"Roo.XComponent.build();\n" +
                                                                                                
																								"});\n";
																								
																						
																						
																						
																						
                                                                                         //if ((project.runhtml != this.runhtml) || (this.redraws > 10)) {
                                                                                            // then we need to reload the browser using
                                                                                            // load_html_string..
                                                                                            
                                                                                            // then trigger a redraw once it's loaded..
                                                                                            this.pendingRedraw = true;
                                                                                            var runhtml = '<script type="text/javascript">' + "\n" ;
                                                                                            runhtml +=imports.File.File.read(__script_path__ + '/../builder.html.js') + "\n";
                                                                                            runhtml += '</script>'+ "\n" ;
                                                                                            
                                                                                            this.runhtml = project.runhtml;
                                                                                            // need to modify paths
                                                                                            
                                                                                            
                                                                                            this.lastRedraw= new Date();
                                                                                            var html = imports.File.File.read(__script_path__ + '/../builder.html');
                                                                                            html = html.replace('</head>',
																										runhtml +
																										this.runhtml +
																										'<script type="text/javascript">' + "\n" +
																										js_src + "\n" + 
																										'</script>' + 
																										
																										'</head>');
                                                                                            //print("LOAD HTML " + html);
                                                                                            this.el.load_html_string( html , 
                                                                                                //fixme - should be a config option!
                                                                                                'http://localhost/app.Builder/'
                                                                                            );
                                                                                            this.redraws = 0;
                                                                                            // should trigger load_finished! - which in truns shoudl set refresh Required;
                                                                                            return;
                                                                                        
                                                                                        
																						// not used.
                                                                                        //this.renderedData = data;
                                                                                        //var str = JSON.stringify(data) ;
                                                                                        
                                                                                        if (!this.ready) {
                                                                                            console.log('not loaded yet');
                                                                                        }
                                                                                        this.lastRedraw = new Date();
                                                                                        
                                                                                        this.el.execute_script("Builder.render(" +
																										JSON.stringify(js_src) +
																										"," +
																										JSON.stringify(file.name) + 
																										");");
																						
                                                                                        print( "before render" +    this.lastRedraw);
                                                                                        print( "after render" +    (new Date()));
                                                                                        
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: Gtk.VBox,
                                                                    id : "RightGtkView",
                                                                    pack : "add",
                                                                    redraw : function() {
                                                                       this.highlightWidget = false;
                                                                        print("REDRAW CALLED");
                                                                        this.activePath = this.get('/LeftTree').getActivePath();
                                                                        if (this.renderedEl) {
                                                                          print("QUEUE DRAW CALLING");
                                                                          this.renderedEl.queue_draw();
                                                                       }
                                                                    },
                                                                    renderJS : function(data, withDebug)
                                                                    {
                                                                          this.highlightWidget = false;
                                                                       
                                                                        this.withDebug = false;
                                                                        while (this.get('view').el.get_children().length) {
                                                                            var c = this.get('view').el.get_children()[0];
                                                                            this.get('view').el.remove(c);        
                                                                            c.destroy();
                                                                        }
                                                                         if (!data) {
                                                                             return; 
                                                                        }
                                                                        
                                                                        var tree =  this.get('/LeftTree.model').toJS(false,true)[0];
                                                                        // in theory tree is actually window..  
                                                                       try {
                                                                      
                                                                            this.renderedEl = this.viewAdd(tree.items[0], this.get('view').el);
                                                                          
                                                                      } catch (e) {
                                                                         print(e.message);
                                                                        return;
                                                                      }
                                                                        this.get('view').el.set_size_request(
                                                                            tree.default_width * 1 || 400, tree.default_height * 1 || 400
                                                                        ) ;
                                                                        if (this.renderedEl) {
                                                                            this.renderedEl.set_size_request(
                                                                                tree.default_width || 600,
                                                                                tree.default_height || 400
                                                                            );
                                                                        }
                                                                        this.get('view').el.show_all();
                                                                        
                                                                        
                                                                        
                                                                    },
                                                                    showInWindow : function() {
                                                                      print("GET PROEJCT");
                                                                    	var pr = this.get('/LeftProjectTree').getActiveProject();
                                                                      
                                                                    	console.log(pr.paths);
                                                                        return;
                                                                    /*
                                                                         var src= this.buildJS(
                                                                    		this.get('/LeftTree.model').toJS()[0], 
                                                                    		true);
                                                                          // show term?? 
                                                                    
                                                                    
                                                                        //var x = new imports.sandbox.Context();
                                                                        //x.add_globals();
                                                                        //print(src);
                                                                        try {
                                                                            Seed.check_syntax('var e = ' + src);
                                                                            //x.eval(src);
                                                                        } catch( e) {
                                                                            this.get('/Terminal').feed(e.message || e.toString() + "\n");
                                                                            this.get('/Terminal').feed(console._dump(e)+"\n");
                                                                            if (e.line) {
                                                                                var lines = src.split("\n");
                                                                                var start = Math.max(0, e.line - 10);
                                                                                var end = Math.min(lines.length, e.line + 10);
                                                                                for (var i =start ; i < end; i++) {
                                                                                    if (i == e.line) {
                                                                                        this.get('/Terminal').feed(">>>>>" + lines[i] + "\n");
                                                                                        continue;
                                                                                    }
                                                                                    this.get('/Terminal').feed(lines[i] + "\n");
                                                                                }
                                                                                
                                                                            }
                                                                            
                                                                            return;
                                                                        }
                                                                         this.get('/BottomPane').el.set_current_page(1);
                                                                        this.get('/Terminal').el.fork_command( null , [], [], "/tmp", false,false,false); 
                                                                        var cmd = "/usr/bin/seed /tmp/BuilderGtkView.js\n";
                                                                        this.get('/Terminal').el.feed_child(cmd, cmd.length);
                                                                         /*
                                                                        var _top = x.get_global_object()._top;
                                                                        
                                                                        _top.el.set_screen(Gdk.Screen.get_default()); // just in case..
                                                                        _top.el.show_all();
                                                                        if (_top.el.popup) {
                                                                            _top.el.popup(null, null, null, null, 3, null);
                                                                        }
                                                                    */
                                                                    },
                                                                    viewAdd : function(item, par)
                                                                    {
                                                                    
                                                                        // does something similar to xobject..
                                                                        //item.pack = (typeof(item.pack) == 'undefined') ?  'add' : item.pack;
                                                                        
                                                                        // pack is forced to 'false'
                                                                        if (item.pack===false || item.pack === 'false') {  // no ;
                                                                            return;
                                                                        }
                                                                        
                                                                        print("CREATE: " + item['|xns'] + '.' + item['xtype']);
                                                                        
                                                                        
                                                                        var type = item['|xns'] + '.' + item['xtype'];
                                                                        
                                                                        if (item['|xns'] == 'GtkClutter') { // we can not add this yet!
                                                                            return false;
                                                                        }
                                                                        
                                                                        var ns = imports.gi[item['|xns']];
                                                                        var ctr = ns[item['xtype']]; // why are we using array here..?
                                                                        
                                                                    
                                                                        
                                                                        var ctr_args = { };
                                                                        for(var k in item) {
                                                                            var kv = item[k];
                                                                            if (typeof(kv) == 'object' || typeof(kv) == 'function') {
                                                                                continue;
                                                                            }
                                                                            if ( 
                                                                                k == 'pack' ||
                                                                                k == 'items' ||
                                                                                k == 'id' ||
                                                                                k == 'xtype' ||
                                                                                k == 'xdebug' ||
                                                                                k == 'xns' ||
                                                                                k == '|xns'
                                                                            ) {
                                                                                continue;
                                                                            }
                                                                            // value is a function..
                                                                    	if (k[0] == '|' && typeof(kv) == 'string') {
                                                                    
                                                                    		if (kv.match(new RegExp('function'))) {
                                                                    			continue;
                                                                                    }
                                                                    		print("WASL " + k + '=' + kv);
                                                                    		try {
                                                                    			eval( 'kv = ' + kv);
                                                                    		} catch(e) {    continue; }
                                                                                    
                                                                    		k = k.substring(1);
                                                                                 // print(k + '=' + kv);
                                                                    	}
                                                                            if (k[0] == '|') { // should be boolean or number..
                                                                    		k = k.substring(1);
                                                                    		//print(k + '=' + kv);
                                                                            }
                                                                             
                                                                    	if (k == 'show_tabs') { // force tab showing for notebooks.
                                                                               kv = true;
                                                                            }
                                                                            print(k + '=' + typeof(kv) + " : " + kv);
                                                                            ctr_args[k] = kv;
                                                                            
                                                                        } 
                                                                        var altctr =  XObject.baseXObject({ xtype:  ctr} );
                                                                        var pack_m  = false;
                                                                        if (!item.pack && altctr) {
                                                                            // try XObject.
                                                                            print("SETTING PACK TO XObjectBase method");
                                                                            pack_m = altctr.prototype.pack;
                                                                            
                                                                            
                                                                        }
                                                                        
                                                                        var el = new ctr(ctr_args);
                                                                        item.el = el;
                                                                        print("PACK" + item.pack);
                                                                        //console.dump(item.pack);
                                                                        
                                                                        
                                                                        
                                                                        
                                                                        var args = [];
                                                                        if (!pack_m) {
                                                                            item.pack = (typeof(item.pack) == 'undefined') ?  'add' : item.pack;
                                                                            if (typeof(item.pack) == 'string') {
                                                                                 
                                                                                item.pack.split(',').forEach(function(e, i) {
                                                                                    
                                                                                    if (e == 'false') { args.push( false); return; }
                                                                                    if (e == 'true') {  args.push( true);  return; }
                                                                                    if (!isNaN(parseInt(e))) { args.push( parseInt(e)); return; }
                                                                                    args.push(e);
                                                                                });
                                                                                //print(args.join(","));
                                                                                
                                                                                pack_m = args.shift();
                                                                            } else {
                                                                                pack_m = item.pack.shift();
                                                                                args = item.pack;
                                                                            }
                                                                        }
                                                                        // handle error.
                                                                        if (typeof(pack_m) == 'string' && typeof(par[pack_m]) == 'undefined') {
                                                                            throw {
                                                                                    name: "ArgumentError", 
                                                                                    message : 'pack method not available : ' + par.id + " : " + par + '.' +  pack_m +
                                                                                            "ADDING : " + item.id + " " +  el
                                                                                        
                                                                    	    };
                                                                    
                                                                            return;
                                                                        }
                                                                        
                                                                        //console.dump(args);
                                                                        args.unshift(el);
                                                                        //if (XObject.debug) print(pack_m + '[' + args.join(',') +']');
                                                                        //Seed.print('args: ' + args.length);
                                                                        if (typeof(pack_m) == 'string') {
                                                                            par[pack_m].apply(par, args);
                                                                        } else if (pack_m) {
                                                                            pack_m.call(item, par, item);
                                                                        }
                                                                        
                                                                        var _this = this;
                                                                        item.items = item.items || [];
                                                                        item.items.forEach(function(ch,n) {
                                                                    
                                                                             print ("type:" + type);
                                                                              
                                                                             print ("ch.pack:" + ch.pack);
                                                                               
                                                                               
                                                                             if (type == 'Gtk.Table' && ch.pack == 'add') {
                                                                                var c = n % item.n_columns;
                                                                                var r = Math.floor(n/item.n_columns);
                                                                                ch.pack = [ 'attach', c, c+1, r, r+1, 
                                                                                         typeof(ch.x_options) == 'undefined' ?  5 : ch.x_options,
                                                                                            typeof(ch.y_options) == 'undefined' ?  5 : ch.y_options,
                                                                                            typeof(ch.x_padding) == 'undefined' ?  0 : ch.x_padding,
                                                                                            typeof(ch.x_padding) == 'undefined' ?  0 : ch.x_padding
                                                                                ].join(',');
                                                                            }
                                                                        
                                                                            _this.viewAdd(ch, el);
                                                                        });
                                                                        
                                                                        
                                                                        
                                                                        // add the signal handlers.
                                                                        // is it a widget!?!!?
                                                                       
                                                                        
                                                                        try {
                                                                             
                                                                            
                                                                            el.signal.expose_event.connect(XObject.createDelegate(this.widgetExposeEvent, this, [ item  ], true));
                                                                            el.signal.drag_motion.connect(XObject.createDelegate(this.widgetDragMotionEvent, this,[ item  ], true));
                                                                            el.signal.drag_drop.connect(XObject.createDelegate(this.widgetDragDropEvent, this, [ item  ], true));
                                                                            el.signal.button_press_event.connect(XObject.createDelegate(this.widgetPressEvent, this, [ item  ], true ));
                                                                            el.signal.button_release_event.connect(XObject.createDelegate(this.widgetReleaseEvent, this, [ item  ], true ));
                                                                        } catch(e) {
                                                                            // ignore!
                                                                           }
                                                                        
                                                                        
                                                                        
                                                                        return el;
                                                                        
                                                                    },
                                                                    widgetDragDropEvent : function() {
                                                                          print("WIDGET DRAGDROP"); 
                                                                                return true;
                                                                    },
                                                                    widgetDragMotionEvent : function() {
                                                                         print("WIDGET DRAGMOTION"); 
                                                                                return true;
                                                                    },
                                                                    widgetExposeEvent : function(w, evt, ud, item) {
                                                                        var widget = w;
                                                                         if (this.inRender) {
                                                                             return false;
                                                                         }
                                                                         
                                                                         if ( this.highlightWidget) {
                                                                              this.inRender = true;
                                                                              if (item.xtreepath.substring(0, this.activePath.length) == this.activePath) {
                                                                                     Gdk.draw_rectangle(this.highlightWidget.window, this.gc, false, this.box.x , this.box.y, this.box.w, this.box.h);
                                                                                }
                                                                               this.inRender = false;
                                                                               return false;
                                                                         }
                                                                         
                                                                         
                                                                         if (this.activePath != item.xtreepath) {
                                                                            return false;
                                                                         }
                                                                         
                                                                       //  print("HIGHLIGHT: " + item.xtreepath ); // draw highlight??
                                                                         // work out the coords of the window..
                                                                         if (!this.gc) {
                                                                          var dr = widget.window;
                                                                          this.gc = (new Gdk.GC.c_new(dr));
                                                                          this.gc.set_rgb_fg_color(new Gdk.Color({ red: 0xFFFF, green: 0, blue : 0 }));
                                                                          this.gc.set_line_attributes(4,  Gdk.LineStyle.SOLID, Gdk.CapStyle.ROUND , Gdk.JoinStyle.ROUND);
                                                                        }
                                                                    
                                                                        
                                                                         var r  = evt.expose.area;
                                                                         // console.dump([r.x, r.y, r.width, r.height ] );
                                                                         //return false;
                                                                    //     print(widget.get_parent().toString().match(/GtkScrolledWindow/);
                                                                         if (widget.get_parent().toString().match(/GtkScrolledWindow/)) { // eak
                                                                             // happens with gtkscrollview embedded stuff..
                                                                             var np =this.activePath.split(':');
                                                                             np.pop();
                                                                             this.activePath = np.join(':');
                                                                             this.renderedEl.queue_draw();
                                                                             return true;
                                                                    
                                                                            
                                                                         }
                                                                    
                                                                           
                                                                         
                                                                         
                                                                          this.box = {
                                                                            x : r.x - 2,
                                                                            y : r.y - 2,
                                                                            w: r.width + 4,
                                                                            h: r.height + 4
                                                                          }; 
                                                                          // let's draw it..
                                                                          this.inRender = true;
                                                                    
                                                                          
                                                                          this.highlightWidget = widget;
                                                                        
                                                                        
                                                                     
                                                                    
                                                                        //  print("DRAW BOX");
                                                                           //console.dump(this.box);
                                                                          Gdk.draw_rectangle(widget.window, this.gc, false, this.box.x , this.box.y, this.box.w,this.box.h);
                                                                                this.inRender = false;
                                                                                return false;
                                                                    },
                                                                    widgetPressEvent : function(w,e,u,d) {
                                                                         if (this.get('view').pressed) {
                                                                            return false;
                                                                         }
                                                                    this.get('view').pressed = true;
                                                                          print("WIDGET PRESS " + d.xtreepath );       
                                                                              this.get('/LeftTree.view').selectNode(   d.xtreepath );        
                                                                                return false;
                                                                    },
                                                                    widgetReleaseEvent : function() {
                                                                        this.get('view').pressed = false;
                                                                       return false;
                                                                    },
                                                                    items : [
                                                                        {
                                                                            xtype: Gtk.HBox,
                                                                            pack : "pack_start,false,true,0",
                                                                            items : [
                                                                                {
                                                                                    xtype: Gtk.Button,
                                                                                    pack : "pack_start,false,false,0",
                                                                                    label : "Run The Application",
                                                                                    listeners : {
                                                                                        button_press_event : function (self, event) {
                                                                                            // call render on left tree - with special option!?!
                                                                                         
                                                                                            //print("GET PROEJCT");
                                                                                            var pr = this.get('/LeftProjectTree').getActiveProject();
                                                                                          
                                                                                            var dir = '';
                                                                                            for (var i in pr.paths) { 
                                                                                                dir = i;
                                                                                                break;
                                                                                            }
                                                                                            var runner = GLib.path_get_dirname (__script_path__) + '/gtkrun.js'; 
                                                                                            this.get('/Terminal').feed("RUN DIR:" + dir);
                                                                                            var out = {};
                                                                                             
                                                                                           this.get('/Terminal').el.fork_command_full(
                                                                                                Vte.PtyFlags.DEFAULT,
                                                                                                GLib.path_get_dirname (__script_path__) ,
                                                                                                [ 'echo' , "hello"], //argv
                                                                                                [], // env
                                                                                                0, //spawn flags
                                                                                                null, // user func
                                                                                                null, // child setupdata
                                                                                                out
                                                                                        ); 
                                                                                           
                                                                                            var cmd = "/usr/bin/seed " + runner + " " + dir + "\n";
                                                                                            this.get('/Terminal').el.feed_child(cmd, cmd.length);
                                                                                            return false;
                                                                                          
                                                                                        
                                                                                        }
                                                                                    }
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: Gtk.ScrolledWindow,
                                                                            pack : "add",
                                                                            id : "view-sw",
                                                                            shadow_type : Gtk.ShadowType.IN,
                                                                            init : function() {
                                                                                XObject.prototype.init.call(this);
                                                                             this.el.set_policy(Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC);
                                                                            },
                                                                            items : [
                                                                                {
                                                                                    xtype: Gtk.EventBox,
                                                                                    pack : "add_with_viewport",
                                                                                    init : function() {
                                                                                        XObject.prototype.init.call(this);
                                                                                    this.el.modify_bg(Gtk.StateType.NORMAL, new Gdk.Color({
                                                                                                red: 0x9F00, green: 0xB800 , blue : 0xA800
                                                                                               }));
                                                                                    },
                                                                                    items : [
                                                                                        {
                                                                                            xtype: Gtk.Fixed,
                                                                                            pack : "add",
                                                                                            init : function() {
                                                                                            	XObject.prototype.init.call(this);
                                                                                            	//this.el.set_hadjustment(this.parent.el.get_hadjustment());
                                                                                            	//this.el.set_vadjustment(this.parent.el.get_vadjustment());
                                                                                             
                                                                                            },
                                                                                            items : [
                                                                                                {
                                                                                                    xtype: Gtk.EventBox,
                                                                                                    pack : "put,10,10",
                                                                                                    init : function() {
                                                                                                    	//this.el =     new Gtk.Image.from_stock (Gtk.STOCK_HOME,  Gtk.IconSize.MENU);
                                                                                                    	XObject.prototype.init.call(this);
                                                                                                    
                                                                                                                 this.el.drag_dest_set
                                                                                                                (               /* widget that will accept a drop */
                                                                                                                        Gtk.DestDefaults.MOTION  | Gtk.DestDefaults.HIGHLIGHT,
                                                                                                                        null,            /* lists of target to support */
                                                                                                                        0,              /* size of list */
                                                                                                                        Gdk.DragAction.COPY         /* what to do with data after dropped */
                                                                                                                );
                                                                                                                
                                                                                                               // print("RB: TARGETS : " + LeftTree.atoms["STRING"]);
                                                                                                                this.el.drag_dest_set_target_list( imports.Builder3.Globals.targetList);
                                                                                                    },
                                                                                                    ready : false,
                                                                                                    getActiveNode : function(x,y)
                                                                                                    {
                                                                                                       // workout what node is here..
                                                                                                        return '0'; // top..
                                                                                                    },
                                                                                                    id : "view",
                                                                                                    listeners : {
                                                                                                        drag_motion : function (self, ctx, x, y, time) {
                                                                                                            
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
                                                                                                                        var activeNode = this.getActiveNode(x, y);
                                                                                                                        
                                                                                                                        
                                                                                                                        var tg = this.get('/LeftTree.model').findDropNode(activeNode, src.dropList);
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
                                                                                                        drag_drop : function (self,ctx, x, y, time) {
                                                                                                        	Seed.print("TARGET: drag-drop");
                                                                                                                var is_valid_drop_site = true;
                                                                                                                
                                                                                                                 
                                                                                                                self.drag_get_data
                                                                                                                (  /* will receive 'drag-data-received' signal */
                                                                                                                        ctx,        /* represents the current state of the this.gDnD */
                                                                                                                        imports.Builder3.Globals.atoms["STRING"],    /* the target type we want */
                                                                                                                        time            /* time stamp */
                                                                                                                );
                                                                                                                
                                                                                                                
                                                                                                                /* No target offered by source => error */
                                                                                                               
                                                                                                        
                                                                                                                return  is_valid_drop_site;
                                                                                                          
                                                                                                        },
                                                                                                        drag_data_received : function (w, ctx,  x,  y, sel_data,  target_type,  time, ud) 
                                                                                                            {
                                                                                                                Seed.print("GtkView: drag-data-received");
                                                                                                                var delete_selection_data = false;
                                                                                                                var dnd_success = false;
                                                                                                                /* Deal with what we are given from source */
                                                                                                                if( sel_data && sel_data.length ) {
                                                                                                                    
                                                                                                                    if (ctx.action == Gdk.DragAction.ASK)  {
                                                                                                                        /* Ask the user to move or copy, then set the ctx action. */
                                                                                                                    }
                                                                                                        
                                                                                                                    if (ctx.action == Gdk.DragAction.MOVE) {
                                                                                                                        delete_selection_data = true;
                                                                                                                    }
                                                                                                                    var source = Gtk.drag_get_source_widget( ctx );
                                                                                                        
                                                                                                                    Seed.print("Browser: source.DRAGDATA? " + source.dragData);
                                                                                                                    if (this.targetData) {
                                                                                                                        Seed.print(this.targetData);
                                                                                                                        this.get('/LeftTree.model').dropNode(this.targetData,  source.dragData);
                                                                                                                    }
                                                                                                                    
                                                                                                                    
                                                                                                                    
                                                                                                                    dnd_success = true;
                                                                                                        
                                                                                                                }
                                                                                                        
                                                                                                                if (dnd_success == false)
                                                                                                                {
                                                                                                                        Seed.print ("DnD data transfer failed!\n");
                                                                                                                }
                                                                                                                
                                                                                                                Gtk.drag_finish (  ctx, dnd_success, delete_selection_data, time);
                                                                                                                return true;
                                                                                                            },
                                                                                                        button_press_event : function (self, event) {
                                                                                                          this.pressed = false;
                                                                                                            return false;
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: Gtk.ScrolledWindow,
                                                            id : "Help",
                                                            pack : "add",
                                                            show : function() {
                                                                
                                                                var file = this.get('/LeftTree').getActiveFile();
                                                                if (!file) {
                                                                    return;
                                                                }
                                                                var activeEl = this.get('/LeftTree').getActiveElement();
                                                                var xtype = file.guessName( activeEl )
                                                                if (!xtype || !xtype.length) {
                                                                    return;
                                                                }
                                                                //this.get('/Window.view-help-nb').el.set_current_page(1);
                                                                
                                                                // get the active element being edited.
                                                                var helpurl = file.getHelpUrl(xtype);       
                                                                
                                                                // now load the help info in the page..
                                                                this.get('help-view').el.open(helpurl);
                                                            },
                                                            items : [
                                                                {
                                                                    xtype: WebKit.WebView,
                                                                    pack : "add",
                                                                    id : "help-view",
                                                                    init : function() {
                                                                        XObject.prototype.init.call(this);
                                                                       this.get('/Window.help-view').el.open(
                                                                         "http://devel.akbkhome.com/seed/");
                                                                    
                                                                    },
                                                                    zoom_level : 0.8
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: Gtk.Notebook,
                                            id : "BottomPane",
                                            pack : "add",
                                            init : function() {
                                                XObject.prototype.init.call(this);
                                            	//this.el.set_tab_label(this.items[0].el, new Gtk.Label({ label : "Code Editor" }));
                                                	this.el.set_tab_label(this.items[0].el, new Gtk.Label({ label : "Console" }));
                                                	this.el.set_tab_label(this.items[1].el, new Gtk.Label({ label : "Inspector" }));
                                            },
                                            items : [
                                                {
                                                    xtype: Gtk.ScrolledWindow,
                                                    pack : "add",
                                                    items : [
                                                        {
                                                            xtype: Vte.Terminal,
                                                            pack : "add",
                                                            id : "Terminal",
                                                            feed : function(istr) {
                                                                var str = istr.replace(/\n/g, "\r\n") + "\r\n";
                                                                // we should make ourselves visable!!!
                                                                this.get('/BottomPane').el.show();
                                                                this.get('/BottomPane').el.set_current_page(1);
                                                            
                                                                this.el.feed(str ,str.length);
                                                            },
                                                            scroll_on_output : true,
                                                            init : function() {
                                                                XObject.prototype.init.call(this);
                                                                this.el.set_size (80, 1000);
                                                            },
                                                            scrollback_lines : 1000
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
                                        }
                                    ]
                                },
                                {
                                    xtype: Gtk.VBox,
                                    pack : "add",
                                    id : "RightPalete",
                                    hide : function() {
                                        
                                          this.get('buttonbar').el.show();
                                           this.get('viewbox').el.hide();
                                           var ce = this.get('/Window.centereast').el;
                                           
                                           ce.set_position(ce.get_allocated_width() - 30);
                                             
                                           print("TRIED TO HIDE");
                                    },
                                    show : function() {
                                        this.get('buttonbar').el.hide();
                                        this.get('viewbox').el.show();
                                        var ce = this.get('/Window.centereast').el;
                                        //print(JSON.stringify(XObject.keys(ce) ,null,4));
                                        ce.set_position(ce.get_allocated_width() - 150);
                                           
                                       // this.get('model').expanded();
                                                
                                    },
                                    provider : false,
                                    items : [
                                        {
                                            xtype: Gtk.VBox,
                                            pack : "add",
                                            id : "buttonbar",
                                            items : [
                                                {
                                                    xtype: Gtk.Button,
                                                    pack : "pack_start,false,true",
                                                    listeners : {
                                                        clicked : function (self) {
                                                        	this.get('/RightPalete').show();
                                                        }
                                                    },
                                                    items : [
                                                        {
                                                            xtype: Gtk.Image,
                                                            pack : "add",
                                                            stock : Gtk.STOCK_GOTO_FIRST,
                                                            icon_size : Gtk.IconSize.MENU
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: Gtk.Label,
                                                    pack : "add",
                                                    label : "Palete",
                                                    angle : 270,
                                                    init : function() {
                                                        XObject.prototype.init.call(this);
                                                        this.el.add_events ( Gdk.EventMask.BUTTON_MOTION_MASK );
                                                    },
                                                    listeners : {
                                                        enter_notify_event : function (self, event) {
                                                            this.get('/RightPalete').show();
                                                            return false;
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: Gtk.VBox,
                                            pack : "add",
                                            id : "viewbox",
                                            items : [
                                                {
                                                    xtype: Gtk.HBox,
                                                    pack : "pack_start,false,true",
                                                    items : [
                                                        {
                                                            xtype: Gtk.Label,
                                                            pack : "add",
                                                            label : "Palete"
                                                        },
                                                        {
                                                            xtype: Gtk.Button,
                                                            pack : "pack_start,false,true",
                                                            listeners : {
                                                                clicked : function (self) {
                                                                	this.get('/RightPalete').hide();
                                                                }
                                                            },
                                                            items : [
                                                                {
                                                                    xtype: Gtk.Image,
                                                                    pack : "add",
                                                                    stock : Gtk.STOCK_GOTO_LAST,
                                                                    icon_size : Gtk.IconSize.MENU
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: Gtk.ScrolledWindow,
                                                    pack : "add",
                                                    init : function() {
                                                        XObject.prototype.init.call(this);
                                                    	this.el.set_policy(Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC);
                                                        this.el.set_size_request(-1,200);
                                                    },
                                                    shadow_type : Gtk.ShadowType.IN,
                                                    items : [
                                                        {
                                                            xtype: Gtk.TreeView,
                                                            listeners : {
                                                                drag_begin : function (self, ctx) {
                                                                    // we could fill this in now...
                                                                        Seed.print('SOURCE: drag-begin');
                                                                        
                                                                        
                                                                       
                                                                       var  iret = {};
                                                                        var s = this.selection;
                                                                        s.get_selected(iret);
                                                                        var path = this.get('/RightPalete.model').el.get_path(iret.iter);
                                                                        
                                                                        var pix = this.el.create_row_drag_icon ( path);
                                                                            
                                                                        print(pix);       
                                                                        if (Gtk.drag_set_icon_surface) {
                                                                                Gtk.drag_set_icon_surface( ctx,   pix  );
                                                                        } else {
                                                                            Gtk.drag_set_icon_pixmap (ctx,
                                                                                pix.get_colormap(),   pix,   null, -10, -10);
                                                                        }
                                                                        
                                                                        var value = ''+ this.get('/RightPalete.model').el.get_value(iret.iter, 0).value.get_string();
                                                                        if (!this.get('/RightPalete').provider) {
                                                                            return false;
                                                                        }
                                                                        this.el.dropList = this.get('/RightPalete').provider.getDropList(value);
                                                                        this.el.dragData = value;
                                                                        
                                                                        
                                                                        
                                                                        
                                                                        return true;
                                                                },
                                                                drag_data_get : function (self, drag_context, selection_data, info, time) {
                                                                 	//Seed.print('Palete: drag-data-get: ' + target_type);
                                                                        if (this.el.dragData && this.el.dragData.length ) {
                                                                            selection_data.set_text(this.el.dragData ,this.el.dragData.length);
                                                                        }
                                                                        
                                                                        
                                                                        //this.el.dragData = "TEST from source widget";
                                                                        
                                                                        
                                                                },
                                                                drag_end : function (self, drag_context) {
                                                                 	Seed.print('SOURCE: drag-end');
                                                                	this.el.dragData = false;
                                                                	this.el.dropList = false;
                                                                	this.get('/LeftTree.view').highlight(false);
                                                                	return true;
                                                                },
                                                                button_press_event : function (self, event) {
                                                                
                                                                 	if (!this.get('/Editor').save()) {
                                                                 	    // popup!! - click handled.. 
                                                                 	    return true;
                                                                        }
                                                                    return false;
                                                                }
                                                            },
                                                            pack : "add",
                                                            enable_tree_lines : true,
                                                            headers_visible : false,
                                                            init : function() {
                                                                XObject.prototype.init.call(this);
                                                              this.el.set_size_request(150,-1);
                                                                                      //  set_reorderable: [1]
                                                                                              
                                                                        var description = new Pango.FontDescription.c_new();
                                                                description.set_size(8000);
                                                                this.el.modify_font(description);
                                                                
                                                                this.selection = this.el.get_selection();
                                                                this.selection.set_mode( Gtk.SelectionMode.SINGLE);
                                                               // this.selection.signal['changed'].connect(function() {
                                                                //    _view.listeners['cursor-changed'].apply(_view, [ _view, '']);
                                                                //});
                                                                // see: http://live.gnome.org/GnomeLove/DragNDropTutorial
                                                                 
                                                                this.el.drag_source_set (            /* widget will be drag-able */
                                                                        Gdk.ModifierType.BUTTON1_MASK,       /* modifier that will start a drag */
                                                                        null,            /* lists of target to support */
                                                                        0,              /* size of list */
                                                                        Gdk.DragAction.COPY         /* what to do with data after dropped */
                                                                );
                                                                //Gtk.drag_source_set_target_list(this.el, LeftTree.targetList);
                                                               
                                                                this.el.drag_source_set_target_list( imports.Builder3.Globals.targetList);
                                                                this.el.drag_source_add_text_targets( ); 
                                                                /*
                                                                print("RP: TARGET:" + LeftTree.atoms["STRING"]);
                                                                targets = new Gtk.TargetList();
                                                                targets.add( LeftTree.atoms["STRING"], 0, 0);
                                                                targets.add_text_targets( 1 );
                                                                Gtk.drag_dest_set_target_list(this.el, LeftTree.targetList);
                                                                
                                                                //if you want to allow text to be output elsewhere..
                                                                //Gtk.drag_source_add_text_targets(this.el);
                                                                */
                                                                return true; 
                                                            },
                                                            items : [
                                                                {
                                                                    xtype: Gtk.ListStore,
                                                                    pack : "set_model",
                                                                    init : function() {
                                                                        XObject.prototype.init.call(this);
                                                                    this.el.set_column_types ( 2, [
                                                                                                GObject.TYPE_STRING, // title 
                                                                                                GObject.TYPE_STRING // tip
                                                                                                
                                                                                                ] );
                                                                    },
                                                                    id : "model",
                                                                    load : function(tr,iter)
                                                                    {
                                                                        if (!iter) {
                                                                            this.el.clear();
                                                                        }
                                                                        //console.log('Project tree load: ' + tr.length);
                                                                        var cret ={};
                                                                        //this.insert(citer,iter,0);
                                                                        for(var i =0 ; i < tr.length; i++) {
                                                                            if (!iter) {
                                                                                
                                                                                this.el.append(cret);   
                                                                            } else {
                                                                                this.el.insert(cret,iter,-1);
                                                                            }
                                                                            
                                                                            var r = tr[i];
                                                                            //Seed.print(r);
                                                                            this.el.set_value(cret.iter, 0,  '' +  r ); // title 
                                                                            
                                                                            //this.el.set_value(citer, 1,  new GObject.Value( r)); //id
                                                                            //if (r.cn && r.cn.length) {
                                                                            //    this.load(r.cn, citer);
                                                                            //}
                                                                        }
                                                                        
                                                                        
                                                                    },
                                                                    getValue : function (iter, col) {
                                                                        return  this.el.get_value(iter, col).value.get_string();
                                                                        
                                                                        
                                                                        
                                                                    }
                                                                },
                                                                {
                                                                    xtype: Gtk.TreeViewColumn,
                                                                    pack : "append_column",
                                                                    init : function() {
                                                                        XObject.prototype.init.call(this);
                                                                    	this.el.add_attribute(this.items[0].el , 'markup', 0 );
                                                                    },
                                                                    items : [
                                                                        {
                                                                            xtype: Gtk.CellRendererText,
                                                                            pack : "pack_start"
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});
Window.init();
XObject.cache['/Window'] = Window;
