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
builder.bjs=new XObject({
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
   // this.el.show_all();
    
   
              
},
default_width : 800,
default_height : 500,
id : "Window",
listeners : {
    
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
                                            
                                        }
                                    },
                                    {
                                        xtype: Gtk.MenuItem,
                                        label : "New File",
                                        listeners : {
                                            
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
                                            
                                        }
                                    },
                                    {
                                        xtype: Gtk.SeparatorMenuItem,
                                        pack : "add"
                                    },
                                    {
                                        xtype: Gtk.MenuItem,
                                        label : "Quit",
                                        pack : "add"
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
                                                                          	  console.dump(target_data);
                                                                                    var tp = target_data[0].length ? new  Gtk.TreePath.from_string( target_data[0] ) : false;
                                                                                    
                                                                                    print("add where: " + target_data[1]  );
                                                                                    var parent = tp;
                                                                                    var after = false;
                                                                                    if (target_data[1]  < 2) { // before or after..
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
                                                                                    
                                                                                    
                                                                                    if (after) {
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
                                                                                    if (xitems) {
                                                                                        this.load(xitems, n_iter);
                                                                                    }
                                                                                    if (xitems || after) {
                                                                                        this.get('/LeftTree.view').el.expand_row(this.el.get_path(iter_par), true);
                                                                                    }
                                                                                    // wee need to get the empty proptypes from somewhere..
                                                                                    
                                                                                    //var olditer = this.activeIter;
                                                                                    this.activeIter = n_iter;
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
                                                        listeners : {
                                                            
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
                                                                            
                                                                        }
                                                                    },
                                                                    {
                                                                        xtype: Gtk.MenuItem,
                                                                        pack : "append",
                                                                        tooltip_markup : "Add what type of packing is to be used",
                                                                        label : "PACK",
                                                                        listeners : {
                                                                            
                                                                        }
                                                                    },
                                                                    {
                                                                        xtype: Gtk.MenuItem,
                                                                        pack : "append",
                                                                        tooltip_markup : "Override the init method",
                                                                        label : "INIT",
                                                                        listeners : {
                                                                            
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
                                                                            
                                                                        }
                                                                    },
                                                                    {
                                                                        xtype: Gtk.MenuItem,
                                                                        pack : "append",
                                                                        tooltip_markup : "Add a user defined number property",
                                                                        label : "Number",
                                                                        listeners : {
                                                                            
                                                                        }
                                                                    },
                                                                    {
                                                                        xtype: Gtk.MenuItem,
                                                                        pack : "append",
                                                                        tooltip_markup : "Add a user defined boolean property",
                                                                        label : "Boolean",
                                                                        listeners : {
                                                                            
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
                                                                    var LeftTree        = imports.Builder.LeftTree.LeftTree;
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
                                                                    
                                                                }
                                                            },
                                                            {
                                                                xtype: Gtk.MenuItem,
                                                                pack : "append",
                                                                label : "Edit",
                                                                listeners : {
                                                                    
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
                                        listeners : {
                                            
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
                                                        listeners : {
                                                            
                                                        },
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
                                                        buildJS : function(data,withDebug) {
                                                            var i = [ 'Gtk', 'Gdk', 'Pango', 'GLib', 'Gio', 'GObject', 
                                                        	'GtkSource', 'WebKit', 'Vte' ];
                                                            var src = "";
                                                            i.forEach(function(e) {
                                                                src += e+" = imports.gi." + e +";\n";
                                                            });
                                                            src += "console = imports.console;\n"; // path?!!?
                                                            src += "XObject = imports.XObject.XObject;\n"; // path?!!?
                                                            if (withDebug) {
                                                                src += "XObject.debug=true;\n"; 
                                                            }
                                                            this.withDebug = withDebug;
                                                            
                                                            src += '_top=new XObject('+ this.mungeToString(data) + ')\n;';
                                                            src += '_top.init();\n';
                                                        
                                                            imports.File.File.write('/tmp/BuilderGtkView.js', src);
                                                            print("Test code  in /tmp/BuilderGtkView.js");
                                                            this.lastSrc = src;
                                                            return src;
                                                        },
                                                        renderJS : function(data, withDebug)
                                                        {
                                                            // can we mess with data?!?!?
                                                            
                                                            /**
                                                             * first effort..
                                                             * sandbox it? - nope then will have dificulting passing. stuff aruond..
                                                             * 
                                                             */
                                                            if (!data) {
                                                                 return; 
                                                            }
                                                            this.withDebug = false;
                                                            var src = this.buildJS(data,withDebug);
                                                            var x = new imports.sandbox.Context();
                                                            x.add_globals();
                                                            //x.get_global_object().a = "hello world";
                                                            
                                                            try {
                                                                Seed.check_syntax('var e = ' + src);
                                                                x.eval(src);
                                                            } catch( e) {
                                                               // if (!withDebug) {
                                                               //    return this.renderJS(data,true);
                                                                //}
                                                                print(e.message || e.toString());
                                                                console.dump(e);
                                                                return;
                                                            }
                                                            
                                                            var r = new Gdk.Rectangle();
                                                            var _top = x.get_global_object()._top;
                                                            
                                                            _top.el.set_screen(Gdk.Screen.get_default()); // just in case..
                                                            _top.el.show_all();
                                                            if (_top.el.popup) {
                                                                _top.el.popup(null, null, null, null, 3, null);
                                                            }
                                                            
                                                            
                                                            
                                                            var pb = _top.el.get_snapshot(r);
                                                            if (!pb) {
                                                                return;
                                                            }
                                                            _top.el.hide();
                                                            _top.el.destroy();
                                                            x._top = false;
                                                        
                                                            var gc = new Gdk.GC.c_new(this.get('/Window').el.window);
                                                                
                                                                // 10 points all round..
                                                            var full = new Gdk.Pixmap.c_new (this.get('/Window').el.window, r.width+20, r.height+20, pb.get_depth());
                                                            // draw a white background..
                                                           // gc.set_rgb_fg_color({ red: 0, white: 0, black : 0 });
                                                            Gdk.draw_rectangle(full, gc, true, 0, 0, r.width+20, r.height+20);
                                                            // paint image..
                                                            Gdk.draw_drawable (full, gc, pb, 0, 0, 10, 10, r.width, r.height);
                                                            // boxes..
                                                            //gc.set_rgb_fg_color({ red: 255, white: 255, black : 255 });
                                                            Gdk.draw_rectangle(full, gc, true, 0, 0, 10, 10);
                                                            this.get('view').el.set_from_pixmap(full, null);
                                                            //this.get('view-vbox').el.set_size_request( r.width+20, r.height+20);
                                                            //var img = new Gtk.Image.from_file("/home/alan/solarpanels.jpeg");
                                                            
                                                            
                                                            
                                                        },
                                                        showInWindow : function() {
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
                                                        mungeToString : function(obj, isListener, pad)
                                                                {
                                                                    pad = pad || '';
                                                                    var keys = [];
                                                                    var isArray = false;
                                                                    isListener = isListener || false;
                                                                    
                                                                    // am I munging a object or array...
                                                                    if (obj.constructor.toString() === Array.toString()) {
                                                                        for (var i= 0; i < obj.length; i++) {
                                                                            keys.push(i);
                                                                        }
                                                                        isArray = true;
                                                                    } else {
                                                                        for (var i in obj) {
                                                                            keys.push(i);
                                                                        }
                                                                    }
                                                                    
                                                                    
                                                                    var els = []; 
                                                                    var skip = [];
                                                                    if (!isArray && 
                                                                            typeof(obj['|xns']) != 'undefined' &&
                                                                            typeof(obj['xtype']) != 'undefined'
                                                                        ) {
                                                                            els.push('xtype: '+ obj['|xns'] + '.' + obj['xtype']);
                                                                            skip.push('|xns','xtype');
                                                                        }
                                                                    
                                                                    var _this = this;
                                                                    
                                                                    
                                                                    
                                                                    keys.forEach(function(i) {
                                                                        var el = obj[i];
                                                                        if (!isArray && skip.indexOf(i) > -1) {
                                                                            return;
                                                                        }
                                                                        if (isListener) {
                                                        			if (!_this.withDebug) {
                                                                                // do not write listeners unless we are debug mode.
                                                                            	    return;
                                                                           	 }
                                                                            //if (obj[i].match(new RegExp("Gtk.main" + "_quit"))) { // we can not handle this very well..
                                                                            //    return;
                                                                           // }
                                                                            var str= ('' + obj[i]).replace(/^\s+|\s+$/g,"");
                                                                            var lines = str.split("\n");
                                                                            if (lines.length > 1) {
                                                                                str = lines.join("\n" + pad);
                                                                            }
                                                                            els.push(JSON.stringify(i) + ":" + str);
                                                                            return;
                                                                        }
                                                                        if (i[0] == '|') {
                                                                            // does not hapepnd with arrays..
                                                                            if (typeof(el) == 'string' && !obj[i].length) { //skip empty.
                                                                                return;
                                                                            }
                                                                            // this needs to go...
                                                                           // if (typeof(el) == 'string'  && obj[i].match(new RegExp("Gtk.main" + "_quit"))) { // we can not handle this very well..
                                                                            //    return;
                                                                            //}
                                                                            
                                                                            var str= ('' + obj[i]).replace(/^\s+|\s+$/g,"");;
                                                                            var lines = str.split("\n");
                                                                            if (lines.length > 1) {
                                                                                str = lines.join("\n" + pad);
                                                                            }
                                                                            
                                                                            els.push(JSON.stringify(i.substring(1)) + ":" + str);
                                                                            return;
                                                                        }
                                                                        var left = isArray ? '' : (JSON.stringify(i) + " : " )
                                                                        if (typeof(el) == 'object') {
                                                                            els.push(left + _this.mungeToString(el, i == 'listeners', pad + '    '));
                                                                            return;
                                                                        }
                                                                        els.push(JSON.stringify(i) + ":" + JSON.stringify(obj[i]));
                                                                    });
                                                                    var spad = pad.substring(0, pad.length-4);
                                                                    return (isArray ? '[' : '{') + "\n" +
                                                                        pad  + els.join(",\n" + pad ) + 
                                                                        "\n" + spad + (isArray ? ']' : '}');
                                                                       
                                                                    
                                                                    
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
                                                                        xtype: Gtk.Viewport,
                                                                        pack : "add",
                                                                        init : function() {
                                                                        	XObject.prototype.init.call(this);
                                                                        	this.el.set_hadjustment(this.parent.el.get_hadjustment());
                                                                        	this.el.set_vadjustment(this.parent.el.get_vadjustment());
                                                                        },
                                                                        items : [
                                                                            {
                                                                                xtype: Gtk.Image,
                                                                                pack : "add",
                                                                                init : function() {
                                                                                	this.el =     new Gtk.Image.from_stock (Gtk.STOCK_HOME,  Gtk.IconSize.MENU);
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
                                                        listeners : {
                                                            
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
})
;builder.bjs.init();
