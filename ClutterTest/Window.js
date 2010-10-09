Gtk = imports.gi.Gtk;
Gdk = imports.gi.Gdk;
Pango = imports.gi.Pango;
GLib = imports.gi.GLib;
Gio = imports.gi.Gio;
GObject = imports.gi.GObject;
GtkSource = imports.gi.GtkSource;
WebKit = imports.gi.WebKit;
Vte = imports.gi.Vte;
GtkClutter = imports.gi.GtkClutter;
console = imports.console;
XObject = imports.XObject.XObject;
Window=new XObject({
    xtype: Gtk.Window,
    default_height : 900,
    default_width : 900,
    id : "Window",
    init : function() {
        XObject.prototype.init.call(this);
        this.el.show_all();
    },
    items : [
        {
            xtype: GtkClutter.Embed,
            id : "Canvas",
            pack : "add",
            activate : function(elname) 
            {
            
                // enter event. - triggers start of possible re-arrange.
                // --> 'next event'
                // leave notify event...- cancel..
                // --> clear next event
                
                
                
                
            
            
               // prevent dupes
               
            /*   if (this.lastAct) {
                   if (((new Date()) - this.lastAct)  < 1000) {
                        return;
                    }
               
                }
                */
                this.lastAct = new Date();
            
               // THIS NEEDS TO ACTIVATE CERTIAN LAYOUTS BASED ON WHAT ELEMENT
               // HAS BEEN ACTIVATED.
               var  Clutter = imports.gi.Clutter;
               var _t = this;
               
               var moved = [];
               function mv(en, opts) {
                    moved.push(en);
                     if (opts.scale && !opts.scale_x) {
                        opts.scale_x = opts.scale;
                    }
                     if (opts.scale && !opts.scale_y) {
                        opts.scale_y = opts.scale;
                    }
                    if (opts.scale) {
                        delete opts.scale;
                    }
                    var anim =  _t.get(en).el.animate(    Clutter.AnimationMode.EASE_OUT_ELASTIC, 1000, opts         );
                    
                    anim.timeline.start();
               }
               var left = ['project',  'parts', 'props'  ];
               var right = [ 'filelist',  'editor', 'preview', 'palete' ];
               function emin() {
               
                    left.forEach(function(e) {
                        if (moved.indexOf(e) > -1) { return; } // already moved
                        mv(e, { scale : 0.5, x : 5, y : left.indexOf(e)*60} );
                    });
                    right.forEach(function(e) {
                        if (moved.indexOf(e) > -1) { return; } // already moved
                        mv(e, { scale : 0.5, x : 700 , y : right.indexOf(e)*60} );
                    });
               }
               
               // reserve left < 100 for icons...
               // elements have a few 'scale' states
               // a) minimized '50x50' box on left or right....
               // b) full size
               // c) reduced size (visible but not active..)
               
                // active element should always end up on left...
               
                switch (elname) {
                    case 'project':
                    case 'filelist': 
                    
                        mv('project',   { scale : 2, x : 100 , y : 0}); // full left.
                        mv('filelist',  { scale : 2, x : 400 , y : 0}); // right.           
                         break;
                       
                        
                    case 'parts': // tree of parts
                    case 'props':        
                        mv('parts',   { scale : 2, x : 60 , y : 0}); // full left.
                        mv('props',   { scale : 2, x : 60 , y : 200}); // bottom (full)
                        mv('preview',   { scale : 1, x : 260 , y : 0}); // right (half.)
                         break;
                       
            
                    case 'editor':
                        // editor = props / tree and editor (main!)
                        mv('editor',   { scale : 3, x : 300 , y : 0}); // main?
                        
                        mv('props',   { scale : 2, x : 60 , y : 0}); // bottom (full)
                       mv('parts',   { scale : 2, x : 60 , y : 200}); // full left.     
            
                        break;
                        
                    case 'preview':
                        // preview... debugger is probably helpful..?
                         mv('parts',   { scale : 1, x : 60 , y : 0}); // full left.
                         mv('props',   { scale : 1, x : 60 , y : 200}); // bottom (full)
                         mv('preview',   { scale : 3, x : 160 , y : 0}); // right (half.)
                         break;
                        break;
            
                    case 'palete':
                        mv('parts',   { scale : 2, x : 60 , y : 0}); // full left.
                        mv('palete',   { scale : 2, x : 500 , y : 0}); // bottom (full)
                        
                        break;
                
                }
                            emin();
                
            /*
               
                if (this.lastEl) {
                    mv(this.lastEl, { scale: 0.5 });
                }
                
                this.lastEl = elname;
                mv(elname, { scale: 2});
                */
            },
            enter : function(n) {
                print("ENTER : " + n);
                this.nextActor = n;
                // start countdown..
                this.entered = new Date();
                // set up a timeout..
                if (this.hasTimeout) {
                    return;
                }
                var _t = this;
                this.hasTimeout = GLib.timeout_add (GLib.PRIORITY_DEFAULT, 100, function() { 
            
                    if (!_t.nextActor) { // no actor..
                      //  print("no actor");
                        return true;
                    }
                    // lapsed
                    var lapsed = ((new Date()) - _t.entered);
                    //print ("lapsed: " + lapsed);
                    if (lapsed < 1000) { // not enought time yet..
                        //print("not yet");
                        return true;
                    }
                    var na =         _t.nextActor + '';
                    _t.nextActor = false;
                    _t.activate(na);
                    return true;
                });
            },
            leave : function() {
                this.nextActor = false;
            },
            items : [
                {
                    xtype: GtkClutter.Actor,
                    id : "project",
                    pack : false,
                    scale_x : 0.5,
                    scale_y : 0.5,
                    x : 10,
                    y : 10,
                    items : [
                        {
                            xtype: Gtk.Button,
                            listeners : {
                                enter_notify_event : function (self, event) {
                                   this.get('/Canvas').enter('project');
                                    return false;
                                },
                                leave_notify_event : function (self, event) {
                                print("leave not event?");
                                   this.get('/Canvas').leave();
                                    return false;
                                }
                            },
                            height_request : 100,
                            label : "project list",
                            pack : false,
                            width_request : 100
                        }
                    ]
                },
                {
                    xtype: GtkClutter.Actor,
                    id : "filelist",
                    pack : false,
                    x : 10,
                    y : 150,
                    items : [
                        {
                            xtype: Gtk.Button,
                            listeners : {
                                enter_notify_event : function (self, event) {
                                   this.get('/Canvas').enter('filelist');
                                    return false;
                                },
                                leave_notify_event : function (self, event) {
                                   this.get('/Canvas').leave();
                                    return false;
                                }
                            },
                            height_request : 100,
                            label : "file list",
                            pack : false,
                            width_request : 100
                        }
                    ]
                },
                {
                    xtype: GtkClutter.Actor,
                    id : "parts",
                    pack : false,
                    x : 10,
                    y : 300,
                    items : [
                        {
                            xtype: Gtk.ScrolledWindow,
                            listeners : {
                                enter_notify_event : function (self, event) {
                                   this.get('/Canvas').enter('parts');
                                    return false;
                                },
                                leave_notify_event : function (self, event) {
                                   this.get('/Canvas').leave();
                                    return false;
                                }
                            },
                            height_request : 400,
                            id : "LeftTree",
                            pack : "false",
                            width_request : 150,
                            getActiveElement : function() { // return path to actie node.
                            
                                 var path = this.getActivePath();
                                 if (!path) {
                                    return false;
                                 }
                                 var iter = new Gtk.TreeIter();
                                 this.get('model').el.get_iter_from_string(iter, path);
                                 
                                 var value = new GObject.Value('');
                                 this.get('model').el.get_value(iter, 2, value);
                                    
                                 return JSON.parse(value.value);
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
                                var iter = new Gtk.TreeIter();
                            
                                view.selection.get_selected(model.el, iter);
                                return model.el.get_path(iter).to_string();
                            },
                            getPaleteProvider : function() {
                                var model = this.get('model');
                                var pm = imports.Builder.Provider.ProjectManager.ProjectManager;
                                return pm.getPalete(model.file.getType());
                            },
                            getRenderer : function() {
                            
                            	switch( this.getActiveFile().getType()) {
                            		case 'Roo':
                            		    return this.get('/RightBrowser.view');
                            		case 'Gtk':
                            		    return this.get('/RightGtkView');
                            	}
                            
                            },
                            init : function() {
                                XObject.prototype.init.call(this);
                                this.el.set_policy (Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC)
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
                                        // 	console.log("button press?");
                                         	return;
                                                if (ev.type != Gdk.EventType.BUTTON_PRESS  || ev.button.button != 3) {
                                                    print("click" + ev.type);
                                                    return false;
                                                }
                                              
                                            
                                                var res = {}; 
                                                this.get('/LeftTree.view').el.get_path_at_pos(ev.button.x,ev.button.y, res);
                                                
                                                if (!this.get('/LeftTreeMenu').el)  this.get('/LeftTreeMenu').init();
                                                
                                                this.get('/LeftTreeMenu').el.set_screen(Gdk.Screen.get_default());
                                                this.get('/LeftTreeMenu').el.show_all();
                                                this.get('/LeftTreeMenu').el.popup(null, null, null, null, 3, ev.button.time);
                                                print("click:" + res.path.to_string());
                                                return false;
                                        },
                                        drag_begin : function (self, drag_context) {
                                        	print('SOURCE: drag-begin');
                                                 this.targetData = false;
                                                // find what is selected in our tree...
                                                var iter = new Gtk.TreeIter();
                                                var s = this.selection;
                                                s.get_selected(this.get('/LeftTree.model').el, iter);
                                        
                                                // set some properties of the tree for use by the dropped element.
                                                var value = new GObject.Value('');
                                                this.get('/LeftTree.model').el.get_value(iter, 2, value);
                                                var data = JSON.parse(value.value);
                                                var xname = this.get('/LeftTree.model').file.guessName(data);
                                                
                                                this.el.dragData = xname;
                                                this.el.dropList = this.get('/LeftTree').getPaleteProvider().getDropList(xname);
                                                
                                        
                                                // make the drag icon a picture of the node that was selected
                                                var path = this.get('/LeftTree.model').el.get_path(iter);
                                                this.el.treepath = path.to_string();
                                                
                                                var pix = this.el.create_row_drag_icon ( path);
                                                
                                                Gtk.drag_set_icon_pixmap (ctx,
                                                    pix.get_colormap(),
                                                    pix,
                                                    null,
                                                    -10,
                                                    -10);
                                                
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
                                        drag_motion : function (self, ctx, x, y, time) {
                                            console.log("LEFT-TREE: drag-motion");
                                                        var src = Gtk.drag_get_source_widget(ctx);
                                        
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
                                                            action = ctx.actions & Gdk.DragAction.MOVE ? Gdk.DragAction.MOVE : Gdk.DragAction.COPY ;
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
                                                             Gdk.drag_status(ctx, 0 ,time);
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
                                                        //console.dump(tg);
                                                        this.targetData = tg;    
                                                        
                                                        
                                                        Gdk.drag_status(ctx, action ,time);
                                                         
                                                        return true;
                                        },
                                        drag_drop : function (w, ctx, x, y, time) {
                                              Seed.print("TARGET: drag-drop");
                                                               
                                                                Gtk.drag_get_data
                                                                (
                                                                        w,         /* will receive 'drag-data-received' signal */
                                                                        ctx,        /* represents the current state of the DnD */
                                                                        this.get('/Window').atoms["STRING"],    /* the target type we want */
                                                                        time            /* time stamp */
                                                                );
                                                                
                                                                 
                                                                /* No target offered by source => error */
                                                               
                                        
                                                                return  true;
                                        },
                                        drag_data_received : function (self, ctx, x, y, sel_data, info, time) {
                                        	 print("Tree: drag-data-received");
                                        
                                                      var   delete_selection_data = false;
                                                       var  dnd_success = false;
                                                        /* Deal with what we are given from source */
                                                        if( sel_data && sel_data.length ) {
                                                            
                                                            if (ctx.action == Gdk.DragAction.ASK)  {
                                                                /* Ask the user to move or copy, then set the ctx action. */
                                                            }
                                        
                                                            if (ctx.action == Gdk.DragAction.MOVE) {
                                                                //delete_selection_data = true;
                                                            }
                                                            
                                                            var source = Gtk.drag_get_source_widget(ctx);
                                        
                                                            if (this.targetData) {
                                                                if (source != this.el) {
                                                                    this.get('/LeftTree.model').dropNode(this.targetData,  source.dragData);
                                                                } else {
                                                                    // drag around.. - reorder..
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
                                        
                                                        Gtk.drag_finish (ctx, dnd_success, delete_selection_data, time);
                                                        return true;
                                        },
                                        cursor_changed : function (self) {
                                            return;
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
                                                pm.load( this.get('/LeftTree').getPaleteProvider().gatherList(
                                                    this.get('/LeftTree.model').listAllTypes()));
                                                if (render && render.redraw) {
                                                    render.redraw();
                                                }
                                                return true;
                                            }
                                                    
                                                    //console.log('changed');
                                                var s = this.selection;
                                                  var iter = new Gtk.TreeIter();
                                                s.get_selected(this.get('/LeftTree.model').el, iter);
                                                
                                                
                                                // var val = "";
                                                var value = new GObject.Value('');
                                                this.get('/LeftTree.model').el.get_value(iter, 2, value);
                                                this.get('/LeftTree.model').activePath = this.get('/LeftTree.model').el.get_path(iter).to_string();
                                                
                                                var data = JSON.parse(value.value);
                                                this.get('/MidPropTree').activeElement =  data;
                                                this.get('/MidPropTree').hideWin();
                                                this.get('/LeftPanel.model').load( data);
                                                
                                                console.log(value.value);
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
                                    
                                    	Gtk.drag_source_set (
                                    		this.el,            /* widget will be drag-able */
                                    		Gdk.ModifierType.BUTTON1_MASK,       /* modifier that will start a drag */
                                    		null,            /* lists of target to support */
                                    		0,              /* size of list */
                                    		Gdk.DragAction.COPY   | Gdk.DragAction.MOVE           /* what to do with data after dropped */
                                    	);
                                    
                                    	Gtk.drag_source_set_target_list(this.el, this.get('/Window').targetList);
                                    
                                    	Gtk.drag_source_add_text_targets(this.el); 
                                    	Gtk.drag_dest_set
                                    	(
                                    	    this.el,              /* widget that will accept a drop */
                                    	    Gtk.DestDefaults.MOTION  | Gtk.DestDefaults.HIGHLIGHT,
                                    	    null,            /* lists of target to support */
                                    	    0,              /* size of list */
                                    	    Gdk.DragAction.COPY   | Gdk.DragAction.MOVE       /* what to do with data after dropped */
                                    	);
                                    
                                    	Gtk.drag_dest_set_target_list(this.el, this.get('/Window').targetList);
                                    	Gtk.drag_dest_add_text_targets(this.el);
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
                                            changed : function(n, refresh) {
                                                //     print("MODEL CHANGED CALLED" + this.activePath);
                                                     if (this.activePath) {
                                                        var iter = new Gtk.TreeIter();
                                                        this.el.get_iter(iter, new Gtk.TreePath.from_string(this.activePath))
                                                        this.el.set_value(iter, 0, [GObject.TYPE_STRING, this.nodeTitle(n)]);
                                                        this.el.set_value(iter, 1, [GObject.TYPE_STRING, this.nodeTitle(n)]);
                                                        
                                                        this.el.set_value(iter, 2, [GObject.TYPE_STRING, this.nodeToJSON(n)]);
                                                    }
                                                        //this.currentTree = this.toJS(false, true)[0];
                                                    this.file.items = this.toJS(false, false);
                                                  //  print("AFTER CHANGED");
                                                    //console.dump(this.file.items);
                                                    this.file.save();
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
                                                var old_iter = new Gtk.TreeIter();
                                                var s = this.get('/LeftTree.view').selection;
                                                s.get_selected(this.el, old_iter);
                                                var path = this.el.get_path(old_iter).to_string();
                                            
                                                this.activePath= false;      
                                                s.unselect_all();
                                            
                                                this.activePath= false;      
                                                 var iter = new Gtk.TreeIter();
                                                this.el.get_iter_from_string(iter, path);
                                                this.el.remove(iter);
                                                
                                                // rebuild treemap. -- depreciated.!!
                                                this.map = {};
                                                this.treemap = { };
                                                //this.toJS(null, true) // does not do anything?
                                                this.activePath= false;      
                                                this.changed(false,true);
                                                this.get('/LeftTree.view').blockChanges = false;
                                            },
                                            dropNode : function(target_data, node) {
                                                     print("drop Node");
                                                 // console.dump(node);
                                              //    console.dump(target_data);
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
                                                    var n_iter = new Gtk.TreeIter();
                                                    var iter_par = new Gtk.TreeIter();
                                                    var iter_after = after ? new Gtk.TreeIter() : false;
                                                    
                                                    
                                                    
                                                    if (parent !== false) {
                                                        this.el.get_iter(iter_par, parent);
                                                    } else {
                                                        iter_par = null;
                                                    }
                                                    
                                                    
                                                    if (tp && after) {
                                                        print(target_data[1]  > 0 ? 'insert_after' : 'insert_before');
                                                        this.el.get_iter(iter_after, after);
                                                        this.el[ target_data[1]  > 0 ? 'insert_after' : 'insert_before'](
                                                                n_iter, iter_par, iter_after);
                                                        
                                                    } else {
                                                        this.el.append(n_iter, iter_par);
                                                        
                                                    }
                                                    
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
                                                        this.load(xitems, n_iter);
                                                        this.get('/LeftTree.view').el.expand_row(this.el.get_path(n_iter), true);
                                                    }
                                                    if (tp && (xitems || after)) {
                                                        this.get('/LeftTree.view').el.expand_row(this.el.get_path(iter_par), true);
                                                    }
                                                    // wee need to get the empty proptypes from somewhere..
                                                    
                                                    //var olditer = this.activeIter;
                                                    this.activePath = this.el.get_path(n_iter).to_string();
                                            
                                              // changed actually set's the node data..
                                                    this.changed(node, true);
                                                    
                                                    
                                                    
                                                    this.get('/LeftTree.view').el.set_cursor(this.el.get_path(n_iter), null, false);
                                                    
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
                                                var gval = new GObject.Value('');
                                                this.el.get_value(iter, col ,gval);
                                                return  gval.value;
                                                
                                                
                                            },
                                            init : function() {
                                                XObject.prototype.init.call(this);
                                             this.el.set_column_types ( 3, [
                                                        GObject.TYPE_STRING, // title 
                                                        GObject.TYPE_STRING, // tip
                                                        GObject.TYPE_STRING // source..
                                                        ] );
                                            },
                                            listAllTypes : function() {
                                                var s = this.get('/LeftTree.view').selection;
                                                print ("LIST ALL TYPES: " + s.count_selected_rows() );
                                                
                                                if (s.count_selected_rows() > 0) {
                                                    var iter = new Gtk.TreeIter();    
                                                    s.get_selected(this.el, iter);
                                            
                                                    // set some properties of the tree for use by the dropped element.
                                                    var value = new GObject.Value('');
                                                    this.el.get_value(iter, 2, value);
                                                    var data = JSON.parse(value.value);
                                                    
                                                    
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
                                                    li.forEach(function(el) {
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
                                                        
                                                    });
                                                    
                                                    
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
                                                        var citer = new Gtk.TreeIter();
                                                        //this.insert(citer,iter,0);
                                                        for(var i =0 ; i < tr.length; i++) {
                                                            if (iter) {
                                                                this.el.insert(citer,iter,-1);
                                                            } else {
                                                                this.el.append(citer);
                                                            }
                                                            
                                                            this.el.set_value(citer, 0, [GObject.TYPE_STRING, this.nodeTitle(tr[i]) ]);
                                                            this.el.set_value(citer, 1, [GObject.TYPE_STRING, this.nodeTip(tr[i]) ]);
                                                            this.el.set_value(citer, 2, [GObject.TYPE_STRING, this.nodeToJSON(tr[i])]);
                                                            if (tr[i].items && tr[i].items.length) {
                                                                this.load(tr[i].items, citer);
                                                            }
                                                        }     
                                                    },
                                            loadFile : function(f) {
                                                //console.dump(f);
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
                                                        
                                                            this.get('/RightEditor').el.show();
                                                            this.get('/RightEditor.view').load( f.items[0]);
                                                            return;
                                                        }
                                                        print("LOAD");
                                                        print(JSON.stringify(f.items, null,4));
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
                                                        
                                                        
                                                        //print("hide right editior");
                                                        this.get('/RightEditor').el.hide();
                                                        //print("set current tree");
                                                        this.currentTree = this.toJS(false, false)[0];
                                                        //console.dump(this.currentTree);
                                                        this.currentTree = this.currentTree || { items: [] };
                                                        this.get('/LeftTree').renderView();
                                                        //console.dump(this.map);
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
                                                        var old_iter = new Gtk.TreeIter();
                                                        var s = this.get('/LeftTree.view').selection;
                                                        s.get_selected(this.el, old_iter);
                                                        var node = this.nodeToJS(old_iter,false);
                                                        //console.dump(node);
                                                        
                                                        
                                                        // needs to drop first, otherwise the target_data 
                                                        // treepath will be invalid.
                                                        
                                                        this.dropNode(target_data, node);
                                            	  if (action & Gdk.DragAction.MOVE) {
                                                                  //          print("REMOVING OLD NODE");
                                                                            this.el.remove(old_iter);
                                                                            
                                                        }
                                                        
                                                        this.activePath= false;
                                                        this.changed(false,true);
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
                                                
                                                var iter = treepath;  // API used to be iter here..
                                                if (typeof(iter) == 'string') {
                                                    iter = new Gtk.TreeIter(); 
                                                    if (!this.el.get_iter(iter, new Gtk.TreePath.from_string(treepath))) {
                                                        return false;
                                                    }
                                                } 
                                                var par = new Gtk.TreeIter(); 
                                                var iv = this.getIterValue(iter, 2);
                                               // print("IV" + iv);
                                                var k = JSON.parse(iv);
                                                if (k.json && !this.el.iter_parent( par, iter  )) {
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
                                                    citer = new Gtk.TreeIter();
                                                    this.el.iter_children(citer, iter);
                                                    k.items = this.toJS(citer,with_id);
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
                                                        var iter = new Gtk.TreeIter(); 
                                                        if (!this.el.get_iter(iter, new Gtk.TreePath.from_string(treepath))) {
                                                            return false;
                                                        }
                                                        
                                                        var iv = this.getIterValue(iter, 2);
                                                       
                                                        return JSON.parse(iv);
                                                        
                                                    },
                                            toJS : function(treepath, with_id)
                                            {
                                                //Seed.print("WITHID: "+ with_id);
                                                var iter = treepath;  // API used to be iter here..
                                                if (typeof(iter) == 'string') {
                                                    iter = new Gtk.TreeIter(); 
                                                    if (!this.el.get_iter(iter, new Gtk.TreePath.from_string(treepath))) {
                                                        return false;
                                                    }
                                                } 
                                                var first = false;
                                                if (!iter) {
                                                    
                                                    this.treemap = { }; 
                                                    
                                                    iter = new Gtk.TreeIter();
                                                    if (!this.el.get_iter_first(iter)) {
                                                        return [];
                                                    }
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
                        }
                    ]
                },
                {
                    xtype: GtkClutter.Actor,
                    id : "props",
                    pack : false,
                    x : 10,
                    y : 450,
                    items : [
                        {
                            xtype: Gtk.Button,
                            listeners : {
                                enter_notify_event : function (self, event) {
                                  this.get('/Canvas').enter('props');
                                    return false;
                                },
                                leave_notify_event : function (self, event) {
                                   this.get('/Canvas').leave();
                                    return false;
                                }
                            },
                            height_request : 100,
                            label : "property editor",
                            pack : false,
                            width_request : 100
                        }
                    ]
                },
                {
                    xtype: GtkClutter.Actor,
                    id : "editor",
                    pack : false,
                    x : 150,
                    y : 450,
                    items : [
                        {
                            xtype: Gtk.Button,
                            listeners : {
                                enter_notify_event : function (self, event) {
                                    this.get('/Canvas').enter('editor');
                                    return false;
                                },
                                leave_notify_event : function (self, event) {
                                   this.get('/Canvas').leave();
                                    return false;
                                }
                            },
                            height_request : 100,
                            label : "text editor",
                            pack : false,
                            width_request : 100
                        }
                    ]
                },
                {
                    xtype: GtkClutter.Actor,
                    id : "preview",
                    pack : false,
                    x : 150,
                    y : 10,
                    items : [
                        {
                            xtype: Gtk.Button,
                            listeners : {
                                enter_notify_event : function (self, event) {
                                    this.get('/Canvas').enter('preview');
                                    return false;
                                },
                                leave_notify_event : function (self, event) {
                                   this.get('/Canvas').leave();
                                    return false;
                                }
                            },
                            height_request : 100,
                            label : "preview app",
                            pack : false,
                            width_request : 100
                        }
                    ]
                },
                {
                    xtype: GtkClutter.Actor,
                    id : "palete",
                    pack : false,
                    x : 100,
                    y : 300,
                    items : [
                        {
                            xtype: Gtk.Button,
                            listeners : {
                                enter_notify_event : function (self, event) {
                                  this.get('/Canvas').enter('palete');
                                    return false;
                                },
                                leave_notify_event : function (self, event) {
                                   this.get('/Canvas').leave();
                                    return false;
                                }
                            },
                            height_request : 100,
                            label : "palete",
                            pack : false,
                            width_request : 100
                        }
                    ]
                }
            ]
        }
    ]
});
Window.init();
XObject.cache['/Window'] = Window;
