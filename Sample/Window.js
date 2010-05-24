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
    type : Gtk.WindowType.TOPLEVEL,
    title : "Application Builder",
    border_width : 0,
    init : function() {
         this.atoms = {
               "STRING" : Gdk.atom_intern("STRING")
    	};
    	this.targetList = new Gtk.TargetList();
    	this.targetList.add( this.atoms["STRING"], 0, 0);
    	//imports.Builder.Provider.ProjectManager.ProjectManager.loadConfig();
    Gtk.rc_parse_string(
                "style \"gtkcombobox-style\" {\n" + 
                "    GtkComboBox::appears-as-list = 1\n" +
                "}\n"+
                "class \"GtkComboBox\" style \"gtkcombobox-style\"\n");
        XObject.prototype.init.call(this);
        this.el.show_all();
        
       
                  
    },
    default_width : 800,
    default_height : 500,
    id : "Window",
    listeners : {
        "delete_event":function (self, event) {
            return false;
        },
        "destroy":function (self) {
           Gtk.main_quit();
        },
        "show":function (self) {
          print("WINDOW SHOWING - trying to hide");
        imports.Builder.Provider.ProjectManager.ProjectManager.loadConfig();
         	this.get('/MidPropTree').hideWin();
            this.get('/RightPalete').hide();
        
        }
    },
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
                            label : "File",
                            items : [
                                {
                                    xtype: Gtk.Menu,
                                    pack : "set_submenu",
                                    items : [
                                        {
                                            xtype: Gtk.MenuItem,
                                            label : "New Project",
                                            listeners : {
                                                "activate":function (self) {
                                                	this.get('/EditProject').show({
                                                	    success : function(pr) {
                                                		     this.get('/LeftProjectTree').get('combo').setValue(pr.fn);
                                                	    }
                                                	});
                                                }
                                            }
                                        },
                                        {
                                            xtype: Gtk.MenuItem,
                                            label : "New File",
                                            listeners : {
                                                "activate":function (self) {
                                                 	var fn = this.get('/LeftProjectTree.combo').getValue();
                                                        if (!fn) {
                                                            this.get('/LeftProjectTree').showNoProjectSelected();
                                                            return true;
                                                        }
                                                        var pm = imports.Builder.Provider.ProjectManager.ProjectManager;
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
                                            label : "Add Directory to Project",
                                            pack : "add",
                                            listeners : {
                                                "activate":function (self) {
                                                	var fn = this.get('/LeftProjectTree').get('combo').getValue();
                                                        if (!fn) {
                                                            this.get('/LeftProjectTree').showNoProjectSelected();
                                                            return true;
                                                        }
                                                        
                                                        
                                                        var dc = new Gtk.FileChooserDialog({
                                                            action : Gtk.FileChooserAction.SELECT_FOLDER,
                                                            modal: true,
                                                            'select-multiple' : false,
                                                            "show-hidden" : true,
                                                        });
                                                        dc.add_button("Add To Project", Gtk.ResponseType.ACCEPT );
                                                        dc.add_button("Cancel",Gtk.ResponseType.CANCEL);
                                                        
                                                        if (dc.run() != Gtk.ResponseType.ACCEPT) {
                                                            
                                                            dc.destroy();
                                                            return;
                                                        }
                                                            
                                                        //Seed.print(dc.get_filename());
                                                        var pm  = imports.Builder.Provider.ProjectManager.ProjectManager;
                                                        pm.getByFn(fn).add(dc.get_filename(), 'dir');
                                                        dc.destroy();
                                                }
                                            }
                                        },
                                        {
                                            xtype: Gtk.SeparatorMenuItem,
                                            pack : "add"
                                        },
                                        {
                                            xtype: Gtk.MenuItem,
                                            label : "Quit",
                                            pack : "add",
                                            listeners : {
                                                "activate":function (self) {
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
                            label : "Help"
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
                                                    label : "Select Project",
                                                    id : "expander",
                                                    pack : "pack_start,false,true",
                                                    init : function() {
                                                        XObject.prototype.init.call(this);
                                                       this.el.add_events (Gdk.EventMask.BUTTON_MOTION_MASK );
                                                    },
                                                    listeners : {
                                                        "activate":function (self) {
                                                        	var nb = this.get('/LeftTopPanel.notebook');
                                                        	if (this.el.expanded) {
                                                        	    // now expanded..
                                                                    
                                                        	    var pm  = imports.Builder.Provider.ProjectManager.ProjectManager;
                                                        	    
                                                        	   
                                                        	    var model = this.get('/LeftProjectTree.combomodel');
                                                        	  //  print ("loading Projects?")
                                                        	//console.dump(pm.projects);
                                                        	    model.loadData(pm.projects);
                                                        	     
                                                        	    
                                                        	    nb.el.set_current_page(1);
                                                        	    //pm.on('changed', function() {
                                                        		//console.log("CAUGHT project manager change");
                                                        	    //    _combo.model.loadData(pm.projects);
                                                        	    //}
                                                        	    return;
                                                        	}
                                                        	nb.el.set_current_page(0);
                                                        },
                                                        "enter_notify_event":function (self, event) {
                                                             this.el.expanded = !this.el.expanded;
                                                        //if (this.el.expanded ) {
                                                            this.listeners.activate.call(this);
                                                        //   }
                                                        
                                                        return true;
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: Gtk.Notebook,
                                                    id : "notebook",
                                                    show_border : false,
                                                    show_tabs : false,
                                                    pack : "pack_start,true,true",
                                                    init : function() {
                                                        XObject.prototype.init.call(this);
                                                    	this.el.set_current_page(0);
                                                    
                                                    },
                                                    items : [
                                                        {
                                                            xtype: Gtk.ScrolledWindow,
                                                            pack : "add",
                                                            shadow_type : Gtk.ShadowType.IN,
                                                            init : function() {
                                                                XObject.prototype.init.call(this);
                                                                this.el.set_policy (Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC)
                                                            },
                                                            id : "LeftTree",
                                                            getPaleteProvider : function() {
                                                                var model = this.get('model');
                                                                var pm = imports.Builder.Provider.ProjectManager.ProjectManager;
                                                                return pm.getPalete(model.file.getType());
                                                            },
                                                            renderView : function() {
                                                               	 var model = this.get('model');
                                                            	print("RENDER VIEW?" + model.file.getType());
                                                            	switch( model.file.getType()) {
                                                            		case 'Roo':
                                                            		    this.get('/RightBrowser.view').renderJS(model.toJS(false,true)[0]);
                                                            		case 'Gtk':
                                                            		    this.get('/RightGtkView').renderJS(model.toJS(false,true)[0]);
                                                            	}
                                                            },
                                                            items : [
                                                                {
                                                                    xtype: Gtk.TreeView,
                                                                    pack : "add",
                                                                    id : "view",
                                                                    headers_visible : false,
                                                                    enable_tree_lines : true,
                                                                    tooltip_column : 0,
                                                                    init : function() {
                                                                        	XObject.prototype.init.call(this);
                                                                    	var description = new Pango.FontDescription.c_new();
                                                                    	description.set_size(8000);
                                                                    	this.el.modify_font(description);
                                                                    
                                                                    	this.selection = this.el.get_selection();
                                                                    	this.selection.set_mode( Gtk.SelectionMode.SINGLE);
                                                                    	var _this = this;
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
                                                                    highlight : function(treepath_ar) {
                                                                                        if (treepath_ar.length && treepath_ar[0].length ) {
                                                                                    this.el.set_drag_dest_row( 
                                                                                        new  Gtk.TreePath.from_string( treepath_ar[0] ),  treepath_ar[1]);
                                                                                } else {
                                                                                    this.el.set_drag_dest_row(null, Gtk.TreeViewDropPosition.INTO_OR_AFTER);
                                                                                }
                                                                                 
                                                                            },
                                                                    selectNode : function(treepath_str) {
                                                                        this.selection.select_path(new  Gtk.TreePath.from_string( treepath_str));
                                                                    },
                                                                    listeners : {
                                                                        "button_press_event":function (self, ev) {
                                                                         	console.log("button press?");
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
                                                                        "drag_begin":function (self, drag_context) {
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
                                                                        "drag_end":function (self, drag_context) {
                                                                        	Seed.print('LEFT-TREE: drag-end');
                                                                                this.el.dragData = false;
                                                                                this.el.dropList = false;
                                                                                this.targetData = false;
                                                                                this.get('/LeftTree.view').highlight(false);
                                                                                return true;
                                                                        },
                                                                        "drag_motion":function (self, ctx, x, y, time) {
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
                                                                        "drag_drop":function (w, ctx, x, y, time) {
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
                                                                        "drag_data_received":function (self, ctx, x, y, sel_data, info, time) {
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
                                                                        "cursor_changed":function (self) {
                                                                         var iter = new Gtk.TreeIter();
                                                                                        
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
                                                                                           
                                                                                            return true;
                                                                                        }
                                                                                        
                                                                                        //console.log('changed');
                                                                                        var s = this.selection;
                                                                                        s.get_selected(this.get('/LeftTree.model').el, iter);
                                                                                        
                                                                                        
                                                                                        // var val = "";
                                                                                        value = new GObject.Value('');
                                                                                        this.get('/LeftTree.model').el.get_value(iter, 2, value);
                                                                                        this.get('/LeftTree.model').activePath = this.get('/LeftTree.model').el.get_path(iter).to_string();
                                                                                        
                                                                                        var data = JSON.parse(value.value);
                                                                                        this.get('/MidPropTree').activeElement =  data;
                                                                                        this.get('/MidPropTree').hideWin();
                                                                                        this.get('/LeftPanel.model').load( data);
                                                                                        
                                                                                        console.log(value.value);
                                                                                       // _g.button.set_label(''+value.get_string());
                                                                        
                                                                                        var pm =this.get('/RightPalete.model');
                                                                                        pm.load( this.get('/RightPalete').provider.gatherList(
                                                                                             this.get('/LeftTree.model').listAllTypes()));
                                                                                       
                                                                                        
                                                                                       
                                                                                       
                                                                                        //Seed.print( value.get_string());
                                                                                        return true;
                                                                                        
                                                                        }
                                                                    },
                                                                    items : [
                                                                        {
                                                                            xtype: Gtk.TreeStore,
                                                                            pack : "set_model",
                                                                            id : "model",
                                                                            init : function() {
                                                                                XObject.prototype.init.call(this);
                                                                             this.el.set_column_types ( 3, [
                                                                                        GObject.TYPE_STRING, // title 
                                                                                        GObject.TYPE_STRING, // tip
                                                                                        GObject.TYPE_STRING // source..
                                                                                        ] );
                                                                            },
                                                                            activePath : false,
                                                                            changed : function(n, refresh) {
                                                                                     print("MODEL CHANGED CALLED" + this.activePath);
                                                                                     if (this.activePath) {
                                                                                            var iter = new Gtk.TreeIter();
                                                                                            this.el.get_iter(iter, new Gtk.TreePath.from_string(this.activePath))
                                                                                            this.el.set_value(iter, 0, [GObject.TYPE_STRING, this.nodeTitle(n)]);
                                                                                            this.el.set_value(iter, 1, [GObject.TYPE_STRING, this.nodeTitle(n)]);
                                                                                            
                                                                                            this.el.set_value(iter, 2, [GObject.TYPE_STRING, this.nodeToJSON(n)]);
                                                                                        }
                                                                                            //this.currentTree = this.toJS(false, true)[0];
                                                                                        this.file.items = this.toJS(false, false);
                                                                                        print("AFTER CHANGED");
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
                                                                                        if (f.items.length && typeof(f.items[0]) == 'string') {
                                                                                        
                                                                                            this.get('/RightEditor').el.show();
                                                                                            this.get('/RightEditor.view').load( f.items[0]);
                                                                                            return;
                                                                                        }
                                                                                        print("LOAD");
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
                                                                            dropNode : function(target_data, node) {
                                                                              print("drop Node");
                                                                              	  console.dump(node);
                                                                              	  console.dump(target_data);
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
                                                                                            
                                                                                        }
                                                                                        // work out what kind of packing to use..
                                                                                        if (typeof(node.pack) == 'undefined'  && parent !== false) {
                                                                                            var pal = this.get('/LeftTree').getPaleteProvider();
                                                                                            
                                                                                            var pname = pal.guessName(this.singleNodeToJS(parent.to_string()));
                                                                                            print ("PNAME : "  + pname);
                                                                                            var cname = pal.guessName(node);
                                                                                            print ("CNAME : "  + cname);
                                                                                            node.pack = pal.getDefaultPack(pname, cname);
                                                                                            
                                                                                            
                                                                                        }
                                                                                        
                                                                                        
                                                                                        var xitems = [];
                                                                                        if (node.items) {
                                                                                            xitems = node.items;
                                                                                            delete node.items;
                                                                                        }
                                                                            // load children - if it has any..
                                                                            
                                                                                        if (xitems) {
                                                                                            this.load(xitems, n_iter);
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
                                                                                        
                                                                                        this.activeIter = false;
                                                                                        this.changed(false,true);
                                                                            },
                                                                            deleteSelected : function() {
                                                                                        
                                                                                        var old_iter = new Gtk.TreeIter();
                                                                                        var s = this.get('/LeftTree.view').selection;
                                                                                        s.get_selected(this.el, old_iter);
                                                                                        s.unselect_all();
                                                                                        
                                                                                        this.el.remove(old_iter);
                                                                                        
                                                                                        // rebuild treemap. -- depreciated.!!
                                                                                        this.map = {};
                                                                                        this.treemap = { };
                                                                                        //this.toJS(null, true) // does not do anything?
                                                                                        this.activeIter = false;
                                                                                        this.changed(false,true);
                                                                            },
                                                                            currentTree : false,
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
                                                                            singleNodeToJS : function (treepath) 
                                                                                    {
                                                                                        var iter = new Gtk.TreeIter(); 
                                                                                        if (!this.el.get_iter(iter, new Gtk.TreePath.from_string(treepath))) {
                                                                                            return false;
                                                                                        }
                                                                                        
                                                                                        var iv = this.getIterValue(iter, 2);
                                                                                       
                                                                                        return JSON.parse(iv);
                                                                                        
                                                                                    },
                                                                            nodeToJS : function (iter, with_id) 
                                                                            {
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
                                                                            toJS : function(iter, with_id)
                                                                                    {
                                                                                        //Seed.print("WITHID: "+ with_id);
                                                                                        
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
                                                                                        
                                                                                        return ar;
                                                                                        // convert the list into a json string..
                                                                                    
                                                                                        
                                                                                    },
                                                                            getIterValue : function (iter, col) {
                                                                                var gval = new GObject.Value('');
                                                                                this.el.get_value(iter, col ,gval);
                                                                                return  gval.value;
                                                                                
                                                                                
                                                                            },
                                                                            nodeTitle : function(c) {
                                                                                  var txt = [];
                                                                                c = c || {};
                                                                                var sr = (typeof(c['+buildershow']) != 'undefined') &&  !c['+buildershow'] ? true : false;
                                                                                if (sr) txt.push('<s>');
                                                                                if (typeof(c['*prop']) != 'undefined')   { txt.push(c['*prop']+ ':'); }
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
                                                                                            this.el.set_value(citer, 1, [GObject.TYPE_STRING, this.nodeTitle(tr[i]) ]);
                                                                                            this.el.set_value(citer, 2, [GObject.TYPE_STRING, this.nodeToJSON(tr[i])]);
                                                                                            if (tr[i].items && tr[i].items.length) {
                                                                                                this.load(tr[i].items, citer);
                                                                                            }
                                                                                        }     
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
                                                                                "activate":function (self) {
                                                                                
                                                                                     this.get('/LeftTree.model').deleteSelected();
                                                                                }
                                                                            }
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
                                                                "leave_notify_event":function (self, event) {
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
                                                                            id : "combo",
                                                                            init : function() {
                                                                                XObject.prototype.init.call(this);
                                                                                this.el.add_attribute(this.get('render').el , 'markup', 1 );  
                                                                            },
                                                                            getValue : function() {
                                                                                var ix = this.el.get_active();
                                                                                if (ix < 0 ) {
                                                                                    return false;
                                                                                }
                                                                                var data = imports.Builder.Provider.ProjectManager.ProjectManager.projects;
                                                                                return data[ix].fn;
                                                                            },
                                                                            setValue : function(fn)
                                                                            {
                                                                                var el = this.el;
                                                                                el.set_active(-1);
                                                                                var data = imports.Builder.Provider.ProjectManager.ProjectManager.projects;
                                                                                data.forEach(function(n, ix) {
                                                                                    if (fn == n.fn) {
                                                                                        el.set_active(ix);
                                                                                        return false;
                                                                                    }
                                                                                });
                                                                            },
                                                                            listeners : {
                                                                                "changed":function (self) {
                                                                                	var fn = this.getValue();
                                                                                	var pm  = imports.Builder.Provider.ProjectManager.ProjectManager;
                                                                                	this.get('/LeftProjectTree.model').loadProject(pm.getByFn(fn))
                                                                                }
                                                                            },
                                                                            items : [
                                                                                {
                                                                                    xtype: Gtk.CellRendererText,
                                                                                    pack : "pack_start,true",
                                                                                    id : "render"
                                                                                },
                                                                                {
                                                                                    xtype: Gtk.ListStore,
                                                                                    pack : "set_model",
                                                                                    init : function() {
                                                                                        XObject.prototype.init.call(this);
                                                                                      this.el.set_column_types ( 2, [
                                                                                            GObject.TYPE_STRING,  // real key
                                                                                            GObject.TYPE_STRING // real type
                                                                                            
                                                                                            
                                                                                        ] );
                                                                                            
                                                                                    },
                                                                                    loadData : function(data) {
                                                                                         var ov = this.get('/LeftProjectTree.combo').getValue();
                                                                                        this.el.clear();
                                                                                        var iter = new Gtk.TreeIter();
                                                                                        var el = this.el;
                                                                                        data.forEach(function(p) {
                                                                                            
                                                                                            el.append(iter);
                                                                                            
                                                                                             
                                                                                            el.set_value(iter, 0, p.fn);
                                                                                            el.set_value(iter, 1, p.name);
                                                                                            
                                                                                        });
                                                                                        
                                                                                        this.get('/LeftProjectTree.combo').setValue(ov);
                                                                                    },
                                                                                    id : "combomodel"
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: Gtk.ScrolledWindow,
                                                                    pack : "add",
                                                                    shadow_type : Gtk.ShadowType.IN,
                                                                    init : function() {
                                                                        XObject.prototype.init.call(this);
                                                                        this.el.set_policy  (Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC );
                                                                    },
                                                                    items : [
                                                                        {
                                                                            xtype: Gtk.TreeView,
                                                                            headers_visible : false,
                                                                            enable_tree_lines : true,
                                                                            tooltip_column : 1,
                                                                            init : function() {
                                                                                XObject.prototype.init.call(this);
                                                                            var description = new Pango.FontDescription.c_new();
                                                                                                        description.set_size(8000);
                                                                                                        this.el.modify_font(description);
                                                                                                        
                                                                                                        this.selection = this.el.get_selection();
                                                                                                        this.selection.set_mode( Gtk.SelectionMode.SINGLE);
                                                                            },
                                                                            id : "view",
                                                                            listeners : {
                                                                                "cursor_changed":function (self) {
                                                                                 	var iter = new Gtk.TreeIter();
                                                                                                                
                                                                                        if (this.selection.count_selected_rows() < 1) {
                                                                                            //XN.get('Builder.LeftTree.model').
                                                                                            this.get('/LeftTree.model').load( false);
                                                                                            
                                                                                            return;
                                                                                        }
                                                                                        var model = this.get('/LeftProjectTree.model');
                                                                                        //console.log('changed');
                                                                                        var s = this.selection;
                                                                                        s.get_selected(model, iter);
                                                                                        value = new GObject.Value('');
                                                                                        model.el.get_value(iter, 2, value);
                                                                                        
                                                                                        console.log(value.value);// id..
                                                                                        
                                                                                        var file = this.get('/LeftProjectTree').project.getById(value.value);
                                                                                        
                                                                                        
                                                                                        console.log(file);
                                                                                        
                                                                                
                                                                                
                                                                                        var nb = this.get('/LeftTopPanel.expander');
                                                                                        nb.el.expanded = false;
                                                                                        nb.listeners.activate.call(nb);
                                                                                        //_expander.el.set_expanded(false);
                                                                                
                                                                                        var ltm = this.get('/LeftTree.model');
                                                                                        ltm.loadFile(file);
                                                                                        
                                                                                        return true;
                                                                                }
                                                                            },
                                                                            items : [
                                                                                {
                                                                                    xtype: Gtk.TreeStore,
                                                                                    pack : "set_model",
                                                                                    id : "model",
                                                                                    init : function() {
                                                                                        XObject.prototype.init.call(this);
                                                                                      this.el.set_column_types ( 3, [
                                                                                                        GObject.TYPE_STRING, // title 
                                                                                                        GObject.TYPE_STRING, // tip
                                                                                                        GObject.TYPE_STRING // id..
                                                                                                        ] );
                                                                                       
                                                                                    },
                                                                                    loadProject : function(pr) {
                                                                                               this.el.clear();
                                                                                                if (!pr) {
                                                                                                    return;
                                                                                                }
                                                                                                this.get('/LeftProjectTree').project = pr;
                                                                                                this.load(pr.toTree());
                                                                                                this.get('/LeftProjectTree.view').el.expand_all();
                                                                                    },
                                                                                    load : function(tr,iter) {
                                                                                        console.dump(tr);
                                                                                                console.log('Project tree load: ' + tr.length);
                                                                                                var citer = new Gtk.TreeIter();
                                                                                                //this.insert(citer,iter,0);
                                                                                                
                                                                                                var _this = this;
                                                                                                tr.forEach(function (r) {
                                                                                                    if (!iter) {
                                                                                                        _this.el.append(citer);   
                                                                                                    } else {
                                                                                                        _this.el.insert(citer,iter,-1);
                                                                                                    }
                                                                                                    _this.el.set_value(citer, 0,  '' + r.getTitle() ); // title 
                                                                                                    _this.el.set_value(citer, 1, '' + r.getTitleTip()); // tip
                                                                                                    _this.el.set_value(citer, 2, '' + r.id ); //id
                                                                                                    if (r.cn && r.cn.length) {
                                                                                                        _this.load(r.cn, citer);
                                                                                                    }
                                                                                                    
                                                                                                });
                                                                                    },
                                                                                    getValue : function(iter, col) {
                                                                                        var gval = new GObject.Value('');
                                                                                        this.el.get_value(iter, col ,gval);
                                                                                        return  '' + gval.value;
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
                                            listeners : {
                                                
                                            },
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
                                                                "button_press_event":function (self, event) {
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
                                                            pack : "add",
                                                            listeners : {
                                                                "button_press_event":function (self, event) {
                                                                    this.get('/MidPropTree.model').showData('events');
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
                                                                            label : "Handler"
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: Gtk.Button,
                                                            pack : "add",
                                                            listeners : {
                                                                "button_press_event":function (self, ev) {
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
                                                                                "activate":function (self) {
                                                                                
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
                                                                                "activate":function (self) {
                                                                                
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
                                                                                "activate":function (self) {
                                                                                
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
                                                                                "activate":function (self) {
                                                                                
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
                                                                                "activate":function (self) {
                                                                                
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
                                                                                "activate":function (self) {
                                                                                
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
                                                                                "activate":function (self) {
                                                                                
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
                                                    id : "LeftPanel",
                                                    pack : "add",
                                                    shadow_type : Gtk.ShadowType.IN,
                                                    editing : false,
                                                    init : function() {
                                                        XObject.prototype.init.call(this);
                                                       this.el.set_policy (Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC);
                                                    },
                                                    items : [
                                                        {
                                                            xtype: Gtk.TreeView,
                                                            id : "view",
                                                            tooltip_column : 1,
                                                            headers_visible : false,
                                                            enable_tree_lines : true,
                                                            init : function() {
                                                                 XObject.prototype.init.call(this); 
                                                                                   
                                                                                this.selection = this.el.get_selection();
                                                                                this.selection.set_mode( Gtk.SelectionMode.SINGLE);
                                                                             
                                                                                
                                                                                var description = new Pango.FontDescription.c_new();
                                                                                description.set_size(8000);
                                                                                this.el.modify_font(description);
                                                            },
                                                            listeners : {
                                                                "button_press_event":function (self, ev) {
                                                                    
                                                                                
                                                                                var res = { }; 
                                                                                if (!this.el.get_path_at_pos(ev.button.x,ev.button.y, res)) {
                                                                                    return false; //not on a element.
                                                                                }
                                                                                
                                                                                
                                                                                if (ev.type != Gdk.EventType.BUTTON_PRESS  || ev.button.button != 3) {
                                                                                    
                                                                                    if (res.column.title != 'value') {
                                                                                        return false; // ignore..
                                                                                    }
                                                                                    if (  this.get('/LeftPanel').editing) {
                                                                                        return false;
                                                                                    }
                                                                                    var renderer = this.get('/LeftPanel').editableColumn.items[0].el; // set has_entry..
                                                                                    this.get('/LeftPanel').editableColumn.items[0].el.stop_editing();
                                                                                    var type = this.get('/LeftPanel.model').getType(res.path.to_string());
                                                                                    
                                                                                     
                                                                
                                                                                    var provider = this.get('/LeftTree').getPaleteProvider();
                                                                                    
                                                                                    var opts = provider.findOptions(type);
                                                                                    
                                                                                    if (opts === false) {
                                                                                         this.get('/LeftPanel').editableColumn.setOptions([]);
                                                                                        renderer.has_entry = true;
                                                                                    } else {
                                                                                        LeftPanel.editableColumn.setOptions(opts);
                                                                                        renderer.has_entry = false;
                                                                                    }
                                                                                    
                                                                                    
                                                                                   //Seed.print("click" + ev.type);
                                                                                    //console.dump(res);
                                                                                    return false;
                                                                                }
                                                                              
                                                                            
                                                                               
                                                                                if (res.column.title == 'value') {
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
                                                            },
                                                            items : [
                                                                {
                                                                    xtype: Gtk.TreeStore,
                                                                    pack : "set_model",
                                                                    id : "model",
                                                                    init : function() {
                                                                        XObject.prototype.init.call(this);
                                                                    this.el.set_column_types ( 5, [
                                                                                                    GObject.TYPE_STRING,  // 0 real key
                                                                                                    GObject.TYPE_STRING, // 1 real value 
                                                                                                     GObject.TYPE_STRING,  // 2 visable key
                                                                                                     GObject.TYPE_STRING, // 3 visable value
                                                                                                     GObject.TYPE_STRING, // 4 need to store type of!!!
                                                                                                  
                                                                                                ]);
                                                                    },
                                                                    toShort : function(str) {
                                                                        var a = typeof(str) == 'string' ? str.split("\n") : [];
                                                                            return a.length > 1 ? a[0] + '....' : '' + str;
                                                                    },
                                                                    load : function(ar) {
                                                                         this.el.clear();
                                                                                                
                                                                                this.get('/RightEditor').el.hide();
                                                                                if (ar === false) {
                                                                                    return ;
                                                                                }
                                                                                var ret = {}; 
                                                                                
                                                                    
                                                                                var provider = this.get('/LeftTree').getPaleteProvider();
                                                                                
                                                                                // sort!!!?
                                                                                var iter = new Gtk.TreeIter();
                                                                                for (var i in ar) {
                                                                                    if (typeof(ar[i]) == 'object') {
                                                                                        continue;
                                                                                    }
                                                                                    
                                                                                    var type = provider.findType(ar, i, ar[i]);
                                                                                    
                                                                                    this.el.append(iter);
                                                                                    var p = this.el.get_path(iter).to_string();
                                                                                    ret[i] = p;
                                                                                    this.el.set_value(iter, 0, i);
                                                                                    this.el.set_value(iter, 1, '' + ar[i]);
                                                                                    this.el.set_value(iter, 2, i);
                                                                                    this.el.set_value(iter, 3, this.toShort(ar[i]));
                                                                                    this.el.set_value(iter, 4, type);
                                                                                }
                                                                                ar.listeners = ar.listeners || {};
                                                                                for (var i in ar.listeners ) {
                                                                                    this.el.append(iter);
                                                                                    var p = this.el.get_path(iter).to_string();
                                                                                    ret['!' + i] = p;
                                                                                    
                                                                                    this.el.set_value(iter, 0, '!'+  i  );
                                                                                    this.el.set_value(iter, 1, '' + ar.listeners[i]);
                                                                                    this.el.set_value(iter, 2, '<b>'+ i + '</b>');
                                                                                    
                                                                                    this.el.set_value(iter, 3, '' + this.toShort(ar.listeners[i]));
                                                                                    this.el.set_value(iter, 4, 'function');
                                                                                }
                                                                                return ret;
                                                                    },
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
                                                                                    if (info.type == 'boolean') {
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
                                                                    
                                                                                this.get('/LeftTree.model').changed(data, true); 
                                                                                
                                                                                
                                                                                this.startEditing(map[k]);
                                                                                 
                                                                                /*
                                                                                LeftPanel.get('view').el.row_activated(
                                                                                    new Gtk.TreePath.from_string(map[k]), 
                                                                                    LeftPanel.editableColumn.el
                                                                                );
                                                                                */
                                                                    },
                                                                    startEditing : function(path,col) {
                                                                    /**
                                                                    * start editing path (or selected if not set..)
                                                                    * @param {String|false} path  (optional) treepath to edit - selected tree gets
                                                                    *     edited by default.
                                                                    * @param {Number} 0 or 1 (optional)- column to edit. 
                                                                    */
                                                                         var tp;
                                                                                if (typeof(path) == 'string') {
                                                                                    tp = new Gtk.TreePath.from_string(path);
                                                                                } else {
                                                                                    var iter = new Gtk.TreeIter();
                                                                                    var s = this.get('/LeftPanel.view').selection;
                                                                                    s.get_selected(this.el, iter);
                                                                                    tp = this.el.get_path(iter);
                                                                                    path = tp.to_string();
                                                                                }
                                                                                
                                                                               
                                                                                // which colum is to be edited..
                                                                                var colObj = false;
                                                                                if (typeof(col) == 'undefined') {
                                                                                    var k = this.getValue(path, 0);
                                                                                    colObj = (!k.length || k == '|') ? 
                                                                                        this.get('/LeftPanel').propertyColumn : this.get('/LeftPanel').editableColumn;
                                                                                } else {
                                                                                    colObj = col ? this.get('/LeftPanel').editableColumn : this.get('/LeftPanel').propertyColumn;
                                                                                }
                                                                                
                                                                                // make sure the pulldown is set correctly..
                                                                                // not really needed for second col...
                                                                    
                                                                                var provider = this.get('/LeftTree').getPaleteProvider();
                                                                               
                                                                                var type = this.get('/LeftPanel.model').getType(path);
                                                                                var opts = provider.findOptions(type);
                                                                                var renderer = this.get('/LeftPanel').editableColumn.items[0].el;
                                                                                
                                                                                if (opts === false) {
                                                                                    this.get('/LeftPanel').editableColumn.setOptions([]);
                                                                                    renderer.has_entry = true; /// probably does not have any effect.
                                                                                } else {
                                                                                    this.get('/LeftPanel').editableColumn.setOptions(opts);
                                                                                    renderer.has_entry = false;
                                                                                }
                                                                                
                                                                                var _this=this;
                                                                                // iter now has row...
                                                                                GLib.timeout_add(0, 100, function() {
                                                                                    
                                                                                    colObj.items[0].el.editable = true; // esp. need for col 0..
                                                                                    _this.get('/LeftPanel.view').el.set_cursor_on_cell(
                                                                                        tp,
                                                                                        colObj.el,
                                                                                        colObj.items[0].el,
                                                                                        true
                                                                                    );
                                                                                });
                                                                                
                                                                    },
                                                                    deleteSelected : function() {
                                                                         var data = this.toJS();
                                                                        var iter = new Gtk.TreeIter();
                                                                        var s = this.get('/LeftPanel.view').selection;
                                                                        s.get_selected(this.el, iter);
                                                                             
                                                                           
                                                                        var gval = new GObject.Value('');
                                                                       this.get('/LeftPanel.model').el.get_value(iter, 0 ,gval);
                                                                        
                                                                        var val = gval.value;
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
                                                                        this.get('/LeftTree.model').changed(data, true);
                                                                        
                                                                    },
                                                                    activePath : false,
                                                                    changed : function(str, doRefresh) {
                                                                        if (!this.activePath) {
                                                                            return;
                                                                        }
                                                                        var iter = new Gtk.TreeIter();
                                                                        this.el.get_iter(iter, new Gtk.TreePath.from_string(this.activePath));
                                                                        
                                                                        this.el.set_value(iter, 1, '' +str);
                                                                        this.el.set_value(iter, 3, '' + this.toShort(str));
                                                                        // update the tree...  
                                                                    
                                                                        this.get('/LeftTree.model').changed(this.toJS(), doRefresh); 
                                                                    },
                                                                    toJS : function() {
                                                                         var iter = new Gtk.TreeIter();
                                                                        this.get('/LeftPanel.model').el.get_iter_first(iter);
                                                                        var ar = {};
                                                                           
                                                                        while (true) {
                                                                            
                                                                            var k = this.getValue(this.el.get_path(iter).to_string(), 0);
                                                                           // Seed.print(k);
                                                                            if (k[0] == '!') {
                                                                                ar.listeners = ar.listeners || {};
                                                                                ar.listeners[  k.substring(1)] = this.getValue(this.el.get_path(iter).to_string(), 1);
                                                                                
                                                                            } else {
                                                                                ar[ k ] = this.getValue(this.el.get_path(iter).to_string(), 1);
                                                                            }
                                                                            
                                                                            if (! this.get('/LeftPanel.model').el.iter_next(iter)) {
                                                                                break;
                                                                            }
                                                                        }
                                                                        
                                                                        
                                                                        //print(JSON.stringify(ar));
                                                                        return ar;
                                                                        // convert the l
                                                                    },
                                                                    getType : function(treepath) {
                                                                         return this.getValue(treepath, 4);
                                                                    },
                                                                    getValue : function(treepath_str, col) {
                                                                          var iter = new Gtk.TreeIter();
                                                                        this.el.get_iter(iter, new Gtk.TreePath.from_string(treepath_str));
                                                                        
                                                                        var gval = new GObject.Value('');
                                                                        this.get('/LeftPanel.model').el.get_value(iter, col ,gval);
                                                                        var val = '' + gval.value;
                                                                        if (col != 1) {
                                                                            return val;
                                                                        }
                                                                        var type = this.getType(this.el.get_path(iter).to_string());
                                                                        //print("TYPE: " +type + " -  val:" + val);
                                                                        switch(type.toLowerCase()) {
                                                                            case 'number':
                                                                            case 'uint':
                                                                            case 'int':
                                                                                return parseFloat(val); // Nan ?? invalid!!?
                                                                            case 'boolean':
                                                                                return val == 'true' ? true : false;
                                                                            default: 
                                                                                return val;
                                                                        }
                                                                                                
                                                                    },
                                                                    editSelected : function(e) {
                                                                        print("EDIT SELECTED?");
                                                                                var iter = new Gtk.TreeIter();
                                                                                var s = this.get('/LeftPanel.view').selection;
                                                                                s.get_selected(this.get('/LeftPanel.model').el, iter);
                                                                                var m = this.get('/LeftPanel.model')
                                                                               
                                                                                var gval = new GObject.Value('');
                                                                                this.el.get_value(iter, 0 ,gval);
                                                                                var val = '' + gval.value;
                                                                                
                                                                                gval = new GObject.Value('');
                                                                                this.el.get_value(iter, 1 ,gval);
                                                                                var rval = gval.value;
                                                                                var activePath = this.el.get_path(iter).to_string(); 
                                                                                this.activePath = activePath ;
                                                                                // was activeIter...
                                                                                //  not listener...
                                                                                
                                                                                var showEditor = false;
                                                                                
                                                                                if (val[0] == '!') {
                                                                                    showEditor = true;
                                                                                }
                                                                                if (val[0] == '|') {
                                                                                    if (rval.match(/function/g) || rval.match(/\n/g)) {
                                                                                        showEditor = true;
                                                                                    }
                                                                                }
                                                                                
                                                                                if (showEditor) {
                                                                                    var _this = this;
                                                                                    this.activePath = false;
                                                                                    GLib.timeout_add(0, 1, function() {
                                                                                        //   Gdk.threads_enter();
                                                                                        _this.get('/RightEditor').el.show();
                                                                    		   _this.get('/RightEditor.view').load( rval );
                                                                                        
                                                                                        e.editing_done();
                                                                                        e.remove_widget();
                                                                                        _this.activePath = activePath ;
                                                                                        
                                                                                 //       Gdk.threads_leave();
                                                                                        return false;
                                                                                    });
                                                                                    return;
                                                                                }
                                                                                 
                                                                                this.get('/RightEditor').el.hide();
                                                                    
                                                                                //var type = this.getValue(this.el.get_path(iter).to_string(),4);
                                                                                
                                                                                
                                                                    }
                                                                },
                                                                {
                                                                    xtype: Gtk.TreeViewColumn,
                                                                    pack : "append_column",
                                                                    init : function() {
                                                                        XObject.prototype.init.call(this);
                                                                    
                                                                        this.el.add_attribute(this.items[0].el , 'markup', 2 );
                                                                        this.get('/LeftPanel').propertyColumn = this;
                                                                    },
                                                                    title : "key",
                                                                    items : [
                                                                        {
                                                                            xtype: Gtk.CellRendererText,
                                                                            pack : "pack_start",
                                                                            listeners : {
                                                                                "editing_started":function (self, editable, path) {
                                                                                
                                                                                        this.get('/LeftPanel.model').activePath  = path;
                                                                                
                                                                                },
                                                                                "edited":function (self, object, p0) {
                                                                                	var model = this.get('/LeftPanel.model');
                                                                                        var path = model.activePath;
                                                                                        var iter = new Gtk.TreeIter();
                                                                                        model.el.get_iter(iter, new Gtk.TreePath.from_string(path));
                                                                                        model.el.set_value(iter, 0, p0);
                                                                                        model.el.set_value(iter, 2, p0);
                                                                                        
                                                                                	model.activePath = false;
                                                                                
                                                                                	this.get('/LeftTree.model').changed(model.toJS(), true); 
                                                                                        this.el.editable = false;
                                                                                }
                                                                            }
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: Gtk.TreeViewColumn,
                                                                    pack : "append_column",
                                                                    init : function() {
                                                                        XObject.prototype.init.call(this);
                                                                    	this.el.add_attribute(this.items[0].el , 'text', 3 );
                                                                    	this.el.add_attribute(this.items[0].el , 'sensitive', 3 );
                                                                    	this.el.add_attribute(this.items[0].el , 'editable', 3 );
                                                                              // this.el.set_cell_data_func(cell, age_cell_data_func, NULL, NULL);
                                                                    
                                                                     	this.get('/LeftPanel').editableColumn= this;
                                                                    },
                                                                    setOptions : function(ar) {
                                                                           var m = this.items[0].el.model;
                                                                                m.clear();
                                                                                var iter = new Gtk.TreeIter();
                                                                                ar.forEach(function(i) {
                                                                                       // sort!!!?
                                                                                    m.append(iter);
                                                                                    m.set_value(iter, 0, i);
                                                                                });
                                                                                
                                                                    },
                                                                    items : [
                                                                        {
                                                                            xtype: Gtk.CellRendererCombo,
                                                                            pack : "pack_start",
                                                                            editable : true,
                                                                            has_entry : true,
                                                                            text_column : 0,
                                                                            init : function() {
                                                                                XObject.prototype.init.call(this);
                                                                               this.el.model = new Gtk.ListStore();
                                                                                this.el.model.set_column_types ( 1, [
                                                                                    GObject.TYPE_STRING  // 0 real key
                                                                                  ]);
                                                                            },
                                                                            listeners : {
                                                                                "edited":function (self, object, p0) {
                                                                                 	this.get('/LeftPanel').editing = false;
                                                                                	print("EDITED? p:" + p0 + " t:" + p0);
                                                                                        this.get('/LeftPanel.model').changed(p0, true);
                                                                                        this.get('/LeftPanel.model').activePath = false;
                                                                                },
                                                                                "editing_started":function (self, editable, path) {
                                                                                   this.get('/LeftPanel').editing  = true;
                                                                                	//  console.log('editing started');
                                                                                       // r.has_entry = false;
                                                                                   this.get('/LeftPanel.model').editSelected(editable);
                                                                                }
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
                                                                        "activate":function (self) {
                                                                        	this.get('/LeftPanel.model').deleteSelected();
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    xtype: Gtk.MenuItem,
                                                                    pack : "append",
                                                                    label : "Edit",
                                                                    listeners : {
                                                                        "activate":function (self) {
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
                                            return;
                                        }
                                        
                                        
                                        if (this.get('/Window.left').el.position < 160) {
                                            return;
                                        }
                                        this.get('/Window.left').el.position = this.get('/Window.left').el.position  - 150;
                                            
                                        this.el.hide();
                                        this.shown = false;
                                    },
                                    items : [
                                        {
                                            xtype: Gtk.TreeView,
                                            enable_tree_lines : true,
                                            headers_visible : false,
                                            tooltip_column : 2,
                                            init : function() {
                                            	XObject.prototype.init.call(this); 
                                                                
                                                   var description = new Pango.FontDescription.c_new();
                                                 description.set_size(8000);
                                                this.el.modify_font(description);     
                                                                
                                                //this.selection = this.el.get_selection();
                                                // this.selection.set_mode( Gtk.SelectionMode.SINGLE);
                                             
                                            
                                                
                                              
                                                
                                            },
                                            pack : "add",
                                            listeners : {
                                                "cursor_changed":function (self) {
                                                       var iter = new Gtk.TreeIter();
                                                                        
                                                                        //console.log('changed');
                                                        var m = this.get('model');
                                                	if (!this.selection){
                                                		this.selection = this.el.get_selection();
                                                	}
                                                
                                                        var s = this.selection;
                                                        if (!s.get_selected(m.el, iter)) {
                                                		return; 
                                                	}
                                                        var tp = m.el.get_path(iter).to_string();
                                                        
                                                        
                                                        // var val = "";
                                                        
                                                        var key = m.getValue(tp, 0);
                                                        
                                                        var type = m.getValue(tp, 1);
                                                        var skel = m.getValue(tp, 3);
                                                        var etype = m.getValue(tp, 5);
                                                        
                                                        
                                                        this.get('/MidPropTree').hideWin();
                                                
                                                        if (type == 'function') {
                                                            
                                                            if (etype != 'events') {
                                                                key = '|' + key;
                                                            }
                                                            
                                                            this.get('/LeftPanel.model').add({
                                                                key :  key, 
                                                                type : type,
                                                                val  : skel,
                                                                etype : etype
                                                            })  
                                                            return;
                                                        }
                                                        
                                                        if (type.indexOf('.') > -1 || 
                                                                type == 'boolean') {
                                                             key = '|' + key;
                                                        }
                                                        
                                                        this.get('/LeftPanel.model').add( {
                                                            key : key, 
                                                            type : type,
                                                            //skel  : skel,
                                                            etype : etype
                                                           }) //, 
                                                }
                                            },
                                            items : [
                                                {
                                                    xtype: Gtk.ListStore,
                                                    pack : "set_model",
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
                                                    getValue : function(treepath, col)
                                                    {
                                                        var tp = new Gtk.TreePath.from_string (treepath);
                                                        var iter = new Gtk.TreeIter();
                                                        this.el.get_iter (iter, tp);
                                                        var value = new GObject.Value('');
                                                        this.el.get_value(iter, col, value);
                                                        return value.value;
                                                        
                                                    },
                                                    showData : function(type) {
                                                        this.el.clear();
                                                                if (!this.get('/MidPropTree').activeElement || !type) {
                                                                    return; // no active element
                                                                }
                                                    
                                                                var fullpath = this.get('/LeftTree.model').file.guessName(this.get('/MidPropTree').activeElement);
                                                                var palete = this.get('/LeftTree').getPaleteProvider();
                                                                
                                                                 
                                                                
                                                                Seed.print('Showing right?');
                                                                if (!this.get('/MidPropTree').shown) {
                                                    
                                                                    this.get('/Window.left').el.position = this.get('/Window.left').el.position  + 150;
                                                                    this.get('/MidPropTree').el.show();
                                                                    this.get('/MidPropTree').shown = true;
                                                                }
                                                                
                                                                var elementList = palete.getPropertiesFor(fullpath, type);
                                                                print ("GOT " + elementList.length + " items for " + fullpath + "|" + type);
                                                               // console.dump(elementList);
                                                               
                                                                
                                                                var iter = new Gtk.TreeIter();
                                                                for(var i =0 ; i < elementList.length; i++) {
                                                                    var p=elementList[i];
                                                                    this.el.append(iter);
                                                                  //  console.log( '<b>' + p.name +'</b> ['+p.type+']');
                                                                        //GObject.TYPE_STRING,  // real key
                                                                        // GObject.TYPE_STRING, // real type
                                                                        // GObject.TYPE_STRING, // docs ?
                                                                        // GObject.TYPE_STRING // func def?
                                                                        
                                                                    
                                                                    this.el.set_value(iter, 0, p.name);
                                                                    this.el.set_value(iter, 1, p.type);
                                                                    this.el.set_value(iter, 2, '<span size="small"><b>' + p.name +'</b> ['+p.type+']</span>' + "\n" + p.desc);
                                                                    this.el.set_value(iter, 3, p.sig ? p.sig  : '');
                                                                    this.el.set_value(iter, 4, '<span size="small"><b>' + p.name +'</b> ['+p.type+']</span>');
                                                                    this.el.set_value(iter, 5, type);
                                                                    
                                                                }
                                                                                 
                                                    },
                                                    id : "model"
                                                },
                                                {
                                                    xtype: Gtk.TreeViewColumn,
                                                    init : function() {
                                                        this.el = new Gtk.TreeViewColumn();
                                                        this.parent.el.append_column(this.el);
                                                        
                                                        XObject.prototype.init.call(this);
                                                        this.el.add_attribute(this.items[0].el , 'markup', 4  );
                                                    },
                                                    pack : false,
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
                            xtype: Gtk.HBox,
                            pack : "add",
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
                                                    id : "view-notebook",
                                                    tab_border : 0,
                                                    init : function() {
                                                        XObject.prototype.init.call(this);
                                                        this.el.set_current_page(0);
                                                        print("SET LABEL?")
                                                        this.el.set_tab_label(this.items[0].el, new Gtk.Label({ label : "Roo View" }));
                                                        this.el.set_tab_label(this.items[1].el, new Gtk.Label({ label : "Gtk View" }));
                                                    },
                                                    show_tabs : false,
                                                    items : [
                                                        {
                                                            xtype: Gtk.VBox,
                                                            pack : "add",
                                                            id : "RightBrowser",
                                                            items : [
                                                                {
                                                                    xtype: Gtk.HBox,
                                                                    pack : "pack_start,false,true,0",
                                                                    items : [
                                                                        {
                                                                            xtype: Gtk.Button,
                                                                            pack : "pack_start,false,false,0",
                                                                            label : "Dump HTML to console",
                                                                            listeners : {
                                                                                "activate":function (self) {
                                                                                 	this.get('/RightBrowser.view').el.execute_script(
                                                                                            "console.log(document.body.innerHTML);");
                                                                                        this.get('/RightBrowser.view').el.execute_script(
                                                                                	    "console.log(Builder.dump(Builder));");   
                                                                                }
                                                                            }
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: Gtk.ScrolledWindow,
                                                                    pack : "add",
                                                                    shadow_type : Gtk.ShadowType.IN,
                                                                    init : function() {
                                                                        XObject.prototype.init.call(this);
                                                                      this.el.set_policy(Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC);
                                                                    },
                                                                    items : [
                                                                        {
                                                                            xtype: WebKit.WebView,
                                                                            pack : "add",
                                                                            id : "view",
                                                                            init : function() {
                                                                                XObject.prototype.init.call(this);
                                                                                // this may not work!?
                                                                                //this.el.open('file:///' + __script_path__ + '/../builder.html');
                                                                                                        
                                                                                Gtk.drag_dest_set
                                                                                (
                                                                                        this.el,              /* widget that will accept a drop */
                                                                                        Gtk.DestDefaults.MOTION  | Gtk.DestDefaults.HIGHLIGHT,
                                                                                        null,            /* lists of target to support */
                                                                                        0,              /* size of list */
                                                                                        Gdk.DragAction.COPY         /* what to do with data after dropped */
                                                                                );
                                                                                                        
                                                                               // print("RB: TARGETS : " + LeftTree.atoms["STRING"]);
                                                                                Gtk.drag_dest_set_target_list(this.el, this.get('/Window').targetList);
                                                                            },
                                                                            renderJS : function() {
                                                                                this.renderedData = data;
                                                                                var str = JSON.stringify(data) ;
                                                                                
                                                                                if (!this.ready) {
                                                                                    console.log('not loaded yet');
                                                                                }
                                                                                Seed.print("RENDER:" + str);
                                                                                imports.File.File.write('/tmp/builder.debug.js', "Builder.render(" + JSON.stringify(data) + ");");
                                                                                this.el.execute_script("Builder.render(" + JSON.stringify(data) + ");");
                                                                            },
                                                                            listeners : {
                                                                                "load_finished":function (self, object) {
                                                                                	 if (this.ready) { // dont do it twice!
                                                                                	    return; 
                                                                                	}
                                                                                	this.ready = true;
                                                                                
                                                                                	this.renderJS(this.get('/LeftTree.model').toJS()[0]);
                                                                                },
                                                                                "script_alert":function (self, object, p0) {
                                                                                     	print(p0);
                                                                                        return false;
                                                                                        return true; // do not display anything...
                                                                                },
                                                                                "console_message":function (self, object, p0, p1) {
                                                                                     console.log(object);
                                                                                        if (!object.match(/^\{/)) {
                                                                                            return false; // do not handle!!! -> later maybe in console..
                                                                                        }
                                                                                        console.log(object);
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
                                                                                            if (!tg) {
                                                                                                return false;
                                                                                            }
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
                                                                                "drag_motion":function (w, ctx,  x,   y,   time, ud) {
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
                                                                                "drag_drop":function (w, ctx, x, y,time, ud) {
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
                                                                                "drag_data_received":function (w, ctx,  x,  y, sel_data,  target_type,  time, ud) 
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
                                                                                    }
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: Gtk.VBox,
                                                            pack : "add",
                                                            id : "RightGtkView",
                                                            renderJS : function(data, withDebug)
                                                            {
                                                                 if (!data) {
                                                                             return; 
                                                                }
                                                                this.withDebug = false;
                                                                
                                                                if (this.renderedEl) {
                                                                    this.get('view').el.remove(this.renderedEl);
                                                                    this.renderedEl.destroy();
                                                                    this.renderedEl = false;
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
                                                                
                                                                this.renderedEl.set_size_request(
                                                                    tree.default_width || 600,
                                                                    tree.default_height || 400
                                                                );
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
                                                                item.pack = (typeof(item.pack) == 'undefined') ?  'add' : item.pack;
                                                                
                                                                if (item.pack===false || item.pack === 'false') {  // no ;
                                                                    return;
                                                                }
                                                                print("CREATE: " + item['|xns'] + '.' + item['xtype']);
                                                                var ns = imports.gi[item['|xns']];
                                                                var ctr = ns[item['xtype']];
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
                                                            
                                                            	if (k[0] == '|' && typeof(kv) == 'string') {
                                                            
                                                            		if (kv.match(new RegExp('function'))) {
                                                            			continue;
                                                                            }
                                                            		 print("WASL " + k + '=' + kv);
                                                            		try {
                                                            			eval( 'kv = ' + kv);
                                                            		} catch(e) {    continue; }
                                                                            
                                                            		k = k.substring(1);
                                                                          print(k + '=' + kv);
                                                            	}
                                                                    if (k[0] == '|') { // should be boolean or number..
                                                            		k = k.substring(1);
                                                                    }
                                                                    ctr_args[k] = kv;
                                                                    
                                                                } 
                                                                
                                                                
                                                                var el = new ctr(ctr_args);
                                                                
                                                                //print("PACK");
                                                                //console.dump(item.pack);
                                                                
                                                                
                                                                
                                                                
                                                                var args = [];
                                                                var pack_m  = false;
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
                                                                
                                                                // handle error.
                                                                if (pack_m && typeof(par[pack_m]) == 'undefined') {
                                                                    throw {
                                                                            name: "ArgumentError", 
                                                                            message : 'pack method not available : ' + par.id + " : " + par + '.' +  pack_m +
                                                                                    "ADDING : " + item.id + " " +  el
                                                                                
                                                            	    };
                                                            
                                                                    return;
                                                                }
                                                                
                                                                console.dump(args);
                                                                args.unshift(el);
                                                                //if (XObject.debug) print(pack_m + '[' + args.join(',') +']');
                                                                //Seed.print('args: ' + args.length);
                                                                if (pack_m) {
                                                                    par[pack_m].apply(par, args);
                                                                }
                                                                
                                                                var _this = this;
                                                                item.items = item.items || [];
                                                                item.items.forEach(function(ch) {
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
                                                            widgetExposeEvent : function() {
                                                               ///   print("WIDGET EXPOSE"); // draw highlight??
                                                                        return false;
                                                            },
                                                            widgetDragMotionEvent : function() {
                                                                 print("WIDGET DRAGMOTION"); 
                                                                        return true;
                                                            },
                                                            widgetDragDropEvent : function() {
                                                                  print("WIDGET DRAGDROP"); 
                                                                        return true;
                                                            },
                                                            widgetPressEvent : function(w,e,u,d) {
                                                                 if (this.get('view').pressed) {
                                                                    return false;
                                                                 }
                                                            this.get('view').pressed = true;
                                                                  print("WIDGET PRESS " + d.xtreepath );       
                                                                  var tp = new Gtk.TreePath.from_string(d.xtreepath);
                                                                      this.get('/LeftTree.view').el.set_cursor(tp, null, false);  
                                                                  this.get('/LeftTree.view').el.scroll_to_cell(tp, null, false, 0,0);
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
                                                                                "button_press_event":function (self, event) {
                                                                                  // call render on left tree - with special option!?!
                                                                                 
                                                                                
                                                                                
                                                                                	print("GET PROEJCT");
                                                                                	var pr = this.get('/LeftProjectTree').getActiveProject();
                                                                                  
                                                                                var dir = '';
                                                                                 for (var i in pr.paths) { 
                                                                                      dir = i;
                                                                                      break;
                                                                                  }
                                                                                   var runner = GLib.path_get_dirname (__script_path__) + '/gtkrun.js'; 
                                                                                   print ("RUN DIR:" + dir);
                                                                                   
                                                                                   this.get('/BottomPane').el.set_current_page(1);
                                                                                    this.get('/Terminal').el.fork_command( null , [], [], GLib.path_get_dirname (__script_path__) 
                                                                                	, false,false,false); 
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
                                                                            xtype: Gtk.Fixed,
                                                                            pack : "add_with_viewport",
                                                                            init : function() {
                                                                            	XObject.prototype.init.call(this);
                                                                            	//this.el.set_hadjustment(this.parent.el.get_hadjustment());
                                                                            	//this.el.set_vadjustment(this.parent.el.get_vadjustment());
                                                                            },
                                                                            listeners : {
                                                                                
                                                                            },
                                                                            items : [
                                                                                {
                                                                                    xtype: Gtk.EventBox,
                                                                                    pack : "put,10,10",
                                                                                    init : function() {
                                                                                    	//this.el =     new Gtk.Image.from_stock (Gtk.STOCK_HOME,  Gtk.IconSize.MENU);
                                                                                    	XObject.prototype.init.call(this);
                                                                                    
                                                                                                Gtk.drag_dest_set
                                                                                                (
                                                                                                        this.el,              /* widget that will accept a drop */
                                                                                                        Gtk.DestDefaults.MOTION  | Gtk.DestDefaults.HIGHLIGHT,
                                                                                                        null,            /* lists of target to support */
                                                                                                        0,              /* size of list */
                                                                                                        Gdk.DragAction.COPY         /* what to do with data after dropped */
                                                                                                );
                                                                                                
                                                                                               // print("RB: TARGETS : " + LeftTree.atoms["STRING"]);
                                                                                                Gtk.drag_dest_set_target_list(this.el, this.get('/Window').targetList);
                                                                                    },
                                                                                    ready : false,
                                                                                    getActiveNode : function(x,y)
                                                                                    {
                                                                                       // workout what node is here..
                                                                                        return '0'; // top..
                                                                                    },
                                                                                    id : "view",
                                                                                    listeners : {
                                                                                        "drag_motion":function (self, ctx, x, y, time) {
                                                                                            
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
                                                                                        "drag_drop":function (self,ctx, x, y, time) {
                                                                                        	Seed.print("TARGET: drag-drop");
                                                                                                var is_valid_drop_site = true;
                                                                                                
                                                                                                 
                                                                                                Gtk.drag_get_data
                                                                                                (
                                                                                                        self,         /* will receive 'drag-data-received' signal */
                                                                                                        ctx,        /* represents the current state of the this.gDnD */
                                                                                                        this.get('/Window').atoms["STRING"],    /* the target type we want */
                                                                                                        time            /* time stamp */
                                                                                                );
                                                                                                
                                                                                                
                                                                                                /* No target offered by source => error */
                                                                                               
                                                                                        
                                                                                                return  is_valid_drop_site;
                                                                                          
                                                                                        },
                                                                                        "drag_data_received":function (w, ctx,  x,  y, sel_data,  target_type,  time, ud) 
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
                                                                                                    var source = Gtk.drag_get_source_widget(ctx);
                                                                                        
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
                                                                                                
                                                                                                Gtk.drag_finish (ctx, dnd_success, delete_selection_data, time);
                                                                                                return true;
                                                                                            },
                                                                                        "button_press_event":function (self, event) {
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
                                            xtype: Gtk.Notebook,
                                            pack : "add",
                                            init : function() {
                                                XObject.prototype.init.call(this);
                                            	this.el.set_tab_label(this.items[0].el, new Gtk.Label({ label : "Code Editor" }));
                                                	this.el.set_tab_label(this.items[1].el, new Gtk.Label({ label : "Console" }));
                                            },
                                            id : "BottomPane",
                                            items : [
                                                {
                                                    xtype: Gtk.ScrolledWindow,
                                                    pack : "add",
                                                    id : "RightEditor",
                                                    items : [
                                                        {
                                                            xtype: GtkSource.View,
                                                            pack : "add",
                                                            id : "view",
                                                            init : function() {
                                                                XObject.prototype.init.call(this);
                                                                 var description = Pango.Font.description_from_string("monospace")
                                                                description.set_size(8000);
                                                                this.el.modify_font(description);
                                                            
                                                            },
                                                            load : function(str) {
                                                               this.get('/BottomPane').el.set_current_page(0);
                                                                this.el.get_buffer().set_text(str, str.length);
                                                                var lm = GtkSource.LanguageManager.get_default();
                                                                
                                                                this.el.get_buffer().set_language(lm.get_language('js'));
                                                                var buf = this.el.get_buffer();
                                                                var cursor = buf.get_mark("insert");
                                                                var iter= new Gtk.TextIter;
                                                                buf.get_iter_at_mark(iter, cursor);
                                                                iter.set_line(1);
                                                                iter.set_line_offset(4);
                                                                buf.move_mark(cursor, iter);
                                                                
                                                                
                                                                cursor = buf.get_mark("selection_bound");
                                                                iter= new Gtk.TextIter;
                                                                buf.get_iter_at_mark(iter, cursor);
                                                                iter.set_line(1);
                                                                iter.set_line_offset(4);
                                                                buf.move_mark(cursor, iter);
                                                                 
                                                                this.el.grab_focus();
                                                            },
                                                            items : [
                                                                {
                                                                    xtype: GtkSource.Buffer,
                                                                    pack : "set_buffer",
                                                                    listeners : {
                                                                        "changed":function (self) {
                                                                            var s = new Gtk.TextIter();
                                                                            var e = new Gtk.TextIter();
                                                                            this.el.get_start_iter(s);
                                                                            this.el.get_end_iter(e);
                                                                            var str = this.el.get_text(s,e,true);
                                                                            try {
                                                                                Seed.check_syntax('var e = ' + str);
                                                                            } catch (e) {
                                                                                this.get('/RightEditor.view').el.modify_base(Gtk.StateType.NORMAL, new Gdk.Color({
                                                                                    red: 0xFFFF, green: 0xCCCC , blue : 0xCCCC
                                                                                   }));
                                                                                print("SYNTAX ERROR IN EDITOR");   
                                                                                print(e);
                                                                                console.dump(e);
                                                                                return;
                                                                            }
                                                                            this.get('/RightEditor.view').el.modify_base(Gtk.StateType.NORMAL, new Gdk.Color({
                                                                                    red: 0xFFFF, green: 0xFFFF , blue : 0xFFFF
                                                                                   }));
                                                                            
                                                                             this.get('/LeftPanel.model').changed(  str , false);
                                                                        }
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
                                                            xtype: Vte.Terminal,
                                                            pack : "add",
                                                            id : "Terminal",
                                                            feed : function(str) {
                                                                this.el.feed(str,str.length);
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: Gtk.VBox,
                                    pack : "pack_start,false,false",
                                    id : "RightPalete",
                                    hide : function() {
                                        
                                          this.get('buttonbar').el.show();
                                           this.get('viewbox').el.hide();
                                        print("TRIED TO HIDE");
                                    },
                                    show : function() {
                                        this.get('buttonbar').el.hide();
                                        this.get('viewbox').el.show();
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
                                                        "clicked":function (self) {
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
                                                        "enter_notify_event":function (self, event) {
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
                                                                "clicked":function (self) {
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
                                                            pack : "add",
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
                                                                 
                                                                Gtk.drag_source_set (
                                                                        this.el,            /* widget will be drag-able */
                                                                        Gdk.ModifierType.BUTTON1_MASK,       /* modifier that will start a drag */
                                                                        null,            /* lists of target to support */
                                                                        0,              /* size of list */
                                                                        Gdk.DragAction.COPY         /* what to do with data after dropped */
                                                                );
                                                                //Gtk.drag_source_set_target_list(this.el, LeftTree.targetList);
                                                               
                                                                Gtk.drag_source_set_target_list(this.el, this.get('/Window').targetList);
                                                                Gtk.drag_source_add_text_targets(this.el); 
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
                                                            headers_visible : false,
                                                            enable_tree_lines : true,
                                                            listeners : {
                                                                "drag_begin":function (self, ctx) {
                                                                    // we could fill this in now...
                                                                        Seed.print('SOURCE: drag-begin');
                                                                        
                                                                        
                                                                        
                                                                        var iter = new Gtk.TreeIter();
                                                                        var s = this.selection;
                                                                        s.get_selected(this.get('/RightPalete.model').el, iter);
                                                                        var path = this.get('/RightPalete.model').el.get_path(iter);
                                                                        
                                                                        var pix = this.el.create_row_drag_icon ( path);
                                                                            
                                                                                
                                                                        Gtk.drag_set_icon_pixmap (ctx,
                                                                            pix.get_colormap(),
                                                                            pix,
                                                                            null,
                                                                            -10,
                                                                            -10);
                                                                        
                                                                        var value = new GObject.Value('');
                                                                        this.get('/RightPalete.model').el.get_value(iter, 0, value);
                                                                        if (!this.get('/RightPalete').provider) {
                                                                            return false;
                                                                        }
                                                                        this.el.dropList = this.get('/RightPalete').provider.getDropList(value.value);
                                                                        this.el.dragData = value.value;
                                                                        
                                                                        
                                                                        
                                                                        
                                                                        return true;
                                                                },
                                                                "drag_data_get":function (self, drag_context, selection_data, info, time) {
                                                                 	//Seed.print('Palete: drag-data-get: ' + target_type);
                                                                        if (this.el.dragData && this.el.dragData.length ) {
                                                                            selection_data.set_text(this.el.dragData ,this.el.dragData.length);
                                                                        }
                                                                        
                                                                        
                                                                        //this.el.dragData = "TEST from source widget";
                                                                        
                                                                        
                                                                },
                                                                "drag_end":function (self, drag_context) {
                                                                 	Seed.print('SOURCE: drag-end');
                                                                	this.el.dragData = false;
                                                                	this.el.dropList = false;
                                                                	this.get('/LeftTree.view').highlight(false);
                                                                	return true;
                                                                }
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
                                                                        var citer = new Gtk.TreeIter();
                                                                        //this.insert(citer,iter,0);
                                                                        for(var i =0 ; i < tr.length; i++) {
                                                                            if (!iter) {
                                                                                
                                                                                this.el.append(citer);   
                                                                            } else {
                                                                                this.el.insert(citer,iter,-1);
                                                                            }
                                                                            
                                                                            var r = tr[i];
                                                                            //Seed.print(r);
                                                                            this.el.set_value(citer, 0,  '' +  r ); // title 
                                                                            
                                                                            //this.el.set_value(citer, 1,  new GObject.Value( r)); //id
                                                                            //if (r.cn && r.cn.length) {
                                                                            //    this.load(r.cn, citer);
                                                                            //}
                                                                        }
                                                                        
                                                                        
                                                                    },
                                                                    getValue : function (iter, col) {
                                                                        var gval = new GObject.Value('');
                                                                         this.el.get_value(iter, col ,gval);
                                                                        return  gval.value;
                                                                        
                                                                        
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
