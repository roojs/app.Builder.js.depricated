//<Script type="text/javascript">
//<Script type="text/javascript">
Gio = imports.gi.Gio;
Gtk = imports.gi.Gtk;
Gdk = imports.gi.Gdk;
GObject = imports.gi.GObject;
Pango = imports.gi.Pango ;

XObject = imports.XObject.XObject;
console = imports.console;

// recursive imports here break!!?
Roo             = imports.Builder.Provider.Palete.Roo.Roo;
LeftTreeMenu    = imports.Builder.LeftTreeMenu.LeftTreeMenu;
LeftPanel       = imports.Builder.LeftPanel.LeftPanel;
MidPropTree     = imports.Builder.MidPropTree.MidPropTree;

RightEditor     = imports.Builder.RightEditor.RightEditor;
// http://www.google.com/codesearch/p?hl=en#EKZaOgYQHwo/unstable/sources/sylpheed-2.2.9.tar.bz2%7C1erxr_ilM1o/sylpheed-2.2.9/src/folderview.c&q=gtk_tree_view_get_drag_dest_row

var idSeed = 0;
function id(el, prefix){
    prefix = prefix || "left-tree";
    //el = Roo.getDom(el);
    var ret = prefix + (++idSeed);
    return ret;
    //return el ? (el.id ? el.id : (el.id = id)) : id;
}

LeftTree = new XObject(
{
        xtype: Gtk.ScrolledWindow,
        smooth_scroll : true,
        
        shadow_type :  Gtk.ShadowType.IN,
        init : function() {
            this.targetList.add( this.atoms["STRING"], 0 , 1);
            // will not work without changes to gir..
           // var ta_ar = Gtk.target_table_new_from_list(this.targetList,r);
            
            XObject.prototype.init.call(this); 
            this.el.set_policy (Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC)
            
             
        },
        
        getPaleteProvider: function ()
        {
            var model = this.get('model');
            var pm = imports.Builder.Provider.ProjectManager.ProjectManager;
            return pm.getPalete(model.file.getType());
            
        },
        
        renderView: function() // renders into the preview pane..
        {
            var model = this.get('model');
            print("RENDER VIEW?" + model.file.getType());
            switch( model.file.getType()) {
                case 'Roo':
                    var RightBrowser    = imports.Builder.RightBrowser.RightBrowser;
                    RightBrowser.get('view').renderJS(model.toJS(false,true)[0]);
                case 'Gtk':
                    var RightGtkView = imports.Builder.RightGtkView.RightGtkView ;
                    RightGtkView.renderJS(model.toJS(false,true)[0]);
            }
            
        },
        
        atoms : {
           "STRING" : Gdk.atom_intern("STRING")
        },
                        
        targetList :  new Gtk.TargetList(),
        
        items : [        
            {
                id : 'view',
                xtype: Gtk.TreeView,
                headers_visible :  false,
                enable_tree_lines :  true,
                tooltip_column : 0,
                // selection  -- set by init..
                init : function() {
                    XObject.prototype.init.call(this); 
                    
                    var description = new Pango.FontDescription.c_new();
                    description.set_size(8000);
                    this.el.modify_font(description);
                    
                    this.selection = this.el.get_selection();
                    this.selection.set_mode( Gtk.SelectionMode.SINGLE);
                    this.selection.signal['changed'].connect(function() {
                        LeftTree.get('view').listeners['cursor-changed'].apply(
                            LeftTree.get('view'), [ LeftTree.get('view'), '']
                        );
                    });
                    
                    Gtk.drag_source_set (
                        this.el,            /* widget will be drag-able */
                        Gdk.ModifierType.BUTTON1_MASK,       /* modifier that will start a drag */
                        null,            /* lists of target to support */
                        0,              /* size of list */
                        Gdk.DragAction.COPY   | Gdk.DragAction.MOVE           /* what to do with data after dropped */
                    );
                    var targets = new Gtk.TargetList();
                    targets.add( LeftTree.atoms["STRING"], 0, 0);
                    Gtk.drag_source_set_target_list(this.el, targets);

                    Gtk.drag_source_add_text_targets(this.el); 
                    Gtk.drag_dest_set
                    (
                            this.el,              /* widget that will accept a drop */
                            Gtk.DestDefaults.MOTION  | Gtk.DestDefaults.HIGHLIGHT,
                            null,            /* lists of target to support */
                            0,              /* size of list */
                            Gdk.DragAction.COPY   | Gdk.DragAction.MOVE       /* what to do with data after dropped */
                    );
                     
                    Gtk.drag_dest_set_target_list(this.el, targets);
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
                
                selectNode : function(treepath_str) 
                {
                    
                   this.selection.select_path(new  Gtk.TreePath.from_string( treepath_str));
                },
                
                listeners : {
                    
                    
                    
                    'button-press-event' : function(tv, ev) {
                        console.log("button press?");
                        if (ev.type != Gdk.EventType.BUTTON_PRESS  || ev.button.button != 3) {
                            Seed.print("click" + ev.type);
                            return false;
                        }
                      
                    
                        var res = {}; 
                        LeftTree.get('view').el.get_path_at_pos(ev.button.x,ev.button.y, res);
                        
                        if (!LeftTreeMenu.el)  LeftTreeMenu.init();
                        
                        LeftTreeMenu.el.set_screen(Gdk.Screen.get_default());
                        LeftTreeMenu.el.show_all();
                        LeftTreeMenu.el.popup(null, null, null, null, 3, ev.button.time);
                        Seed.print("click:" + res.path.to_string());
                        return false;
                        
                    },
                    
                     'drag-begin' : function (w, ctx, ud) 
                    {
                           // we could fill this in now...
                        Seed.print('SOURCE: drag-begin');
                         this.targetData = false;
                        // find what is selected in our tree...
                        var iter = new Gtk.TreeIter();
                        var s = this.selection;
                        s.get_selected(LeftTree.get('model').el, iter);

                        // set some properties of the tree for use by the dropped element.
                        var value = new GObject.Value('');
                        LeftTree.get('model').el.get_value(iter, 2, value);
                        var data = JSON.parse(value.value);
                        var xname = LeftTree.get('model').file.guessName(data);
                        
                        this.el.dragData = xname;
                        this.el.dropList = LeftTree.getPaleteProvider().getDropList(xname);
                        

                        // make the drag icon a picture of the node that was selected
                        var path = LeftTree.get('model').el.get_path(iter);
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
                    
                    'drag-end' : function ( w,  drag_context, x, y, time, user_data)   
                    {
                        // i'm not sure if this would work, without implementing the whole kaboodle.
                        Seed.print('LEFT-TREE: drag-end');
                        this.el.dragData = false;
                        this.el.dropList = false;
                        this.targetData = false;
                        LeftTree.get('view').highlight(false);
                        return true;
                      
                      
                    },
                    'drag-motion' : function (w, ctx,  x,   y,   time, ud) 
                    {
                        
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
                            action = Gdk.DragAction.MOVE;
                        }
                        var data = {};
                        print("GETTING POS");
                        var isOver = LeftTree.get('view').el.get_dest_row_at_pos(x,y, data);
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
                        
                        Seed.print(data.path.to_string() +' => '+  data.pos);
                        var tg = LeftTree.get('model').findDropNodeByPath(
                            data.path.to_string(), src.dropList, data.pos);
                            
                        LeftTree.get('view').highlight(tg);
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
                    
                    'drag-drop'  : function (w, ctx, x, y,time, ud) 
                    {
                                
                        Seed.print("TARGET: drag-drop");
                       
                        Gtk.drag_get_data
                        (
                                w,         /* will receive 'drag-data-received' signal */
                                ctx,        /* represents the current state of the DnD */
                                LeftTree.atoms["STRING"],    /* the target type we want */
                                time            /* time stamp */
                        );
                        
                         
                        /* No target offered by source => error */
                       

                        return  true;
                        

                    },
                   'drag-data-received' : function (w, ctx,  x,  y, sel_data,  target_type,  time, ud) 
                    {
                        Seed.print("Tree: drag-data-received");
                        delete_selection_data = false;
                        dnd_success = false;
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
                                    LeftTree.get('model').dropNode(this.targetData,  source.dragData);
                                } else {
                                    // drag around.. - reorder..
                                    LeftTree.get('model').moveNode(this.targetData);
                                    
                                    
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
                    
                    'cursor-changed'  : function(tv, a) {
                        var iter = new Gtk.TreeIter();
                        
                        if (this.selection.count_selected_rows() < 1) {
                            LeftPanel.get('model').load( false);
                            MidPropTree.activeElement =  false;
                            MidPropTree.hideWin();
                            var RightPalete     = imports.Builder.RightPalete.RightPalete;
                            var pm = RightPalete.get('model');
                            if (!LeftTree.getPaleteProvider()) {
                                // it may not be loaded yet..
                                return  true;
                            }
                            pm.load( LeftTree.getPaleteProvider().gatherList(
                                LeftTree.get('model').listAllTypes()));
                           
                            return true;
                        }
                        
                        //console.log('changed');
                        var s = this.selection;
                        s.get_selected(LeftTree.get('model').el, iter);
                        
                        
                        // var val = "";
                        value = new GObject.Value('');
                        LeftTree.get('model').el.get_value(iter, 2, value);
                        LeftTree.get('model').activeIter = iter;
                        
                        var data = JSON.parse(value.value);
                        MidPropTree.activeElement =  data;
                        MidPropTree.hideWin();
                        LeftPanel.get('model').load( data);
                        
                        console.log(value.value);
                       // _g.button.set_label(''+value.get_string());
                        var RightPalete     = imports.Builder.RightPalete.RightPalete;
                        var pm = RightPalete.get('model');
                        pm.load( RightPalete.provider.gatherList(
                            LeftTree.get('model').listAllTypes()));
                       
                        
                       
                       
                        //Seed.print( value.get_string());
                        return true;
                        
                        
                    
                    }
                },
                
                items  : [
                    {
                        id : 'model',
                        pack : ['set_model'],
                        
                        
                        xtype: Gtk.TreeStore,
                         
                        init : function() {
                            XObject.prototype.init.call(this); 
                 
                            
                            this.el.set_column_types ( 3, [
                                                    GObject.TYPE_STRING, // title 
                                                    GObject.TYPE_STRING, // tip
                                                    GObject.TYPE_STRING // source..
                                                    ] );
                            
                            //if (LeftProjectTree.project).getProvider()
                            
                           
                        },
                        activeIter : false,
                        
                        
                        changed : function( n, refresh) 
                        {
                            print("MODEL CHANGED CALLED" + this.activeIter);
                            if (this.activeIter) {
                                    
                                this.el.set_value(this.activeIter, 0, [GObject.TYPE_STRING, this.nodeTitle(n)]);
                                this.el.set_value(this.activeIter, 1, [GObject.TYPE_STRING, this.nodeTitle(n)]);
                                
                                this.el.set_value(this.activeIter, 2, [GObject.TYPE_STRING, this.nodeToJSON(n)]);
                            }
                                //this.currentTree = this.toJS(false, true)[0];
                            this.file.items = this.toJS(false, false);
                            print("AFTER CHANGED")
                            //console.dump(this.file.items);
                            this.file.save();
                            this.currentTree = this.file.items[0];
                            //console.log(this.file.toSource());
                            
                            if (refresh) {
                                print("REDNER BROWSER?!");
                                LeftTree.renderView();
                                
                                var RightPalete     = imports.Builder.RightPalete.RightPalete;
                                var pm = RightPalete.get('model');
                                if (!RightPalete.provider) {
                                    pm.load([]);
                                    return;
                                }
                                
                                
                                pm.load( RightPalete.provider.gatherList(this.listAllTypes()));
                                //imports['Builder/RightBrowser.js'].renderJS(this.toJS());
                            }
                             
                        },
                        
                        
                        loadFile : function(f)
                        {
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
                            
                                RightEditor.el.show();
                                RightEditor.get('view').load( f.items[0]);
                                return;
                            }
                            print("LOAD");
                            //console.dump(f.items);
                            this.load(f.items);
                            LeftTree.get('view').el.expand_all();
                            var Window = imports.Builder.Window.Window;
                            if (!f.items.length) {
                                // single item..
                                
                                Window.get('leftvpaned').el.set_position(80);
                                // select first...
                                LeftTree.get('view').el.set_cursor( 
                                    new  Gtk.TreePath.from_string('0'), null, false);
                                
                                
                            } else {
                                  Window.get('leftvpaned').el.set_position(200);
                            }
                            
                            
                            print("hide right editior");
                            RightEditor.el.hide();
                            print("set current tree");
                            this.currentTree = this.toJS(false, false)[0];
                            //console.dump(this.currentTree);
                            this.currentTree = this.currentTree || { items: [] };
                            LeftTree.renderView();
                            //console.dump(this.map);
                            var RightPalete     = imports.Builder.RightPalete.RightPalete;
                            var pm = RightPalete.get('model');
                            // set up provider..
                            
                            RightPalete.provider = LeftTree.getPaleteProvider();
                            
                            if (!RightPalete.provider) {
                                print ("********* PALETE PROVIDER MISSING?!!");
                            }
                            LeftTree.renderView();
                            
                            pm.load( LeftTree.getPaleteProvider().gatherList(this.listAllTypes()));
                            
                            
                                    
                            Window.get('view-notebook').el.set_current_page(
                                LeftTree.get('model').file.getType()== 'Roo' ? 0 : -1);
                                    
                            
                            
                        },
                        
                        findDropNode : function (treepath_str, targets)
                        {
                            
                            
                            var path = treepath_str.replace(/^builder-/, '');
                            
                            if (!XObject.keys(this.treemap).length) {
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
                        findDropNodeByPath : function (treepath_str, targets, pref)
                        {
                            
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
                                
                                var xname = LeftTree.get('model').file.guessName(node_data);
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
                        /** 
                        * drop a node.. - tecncially add node..
                        * 
                        * @param {Array} target_data - [ treepath_string,  before/after/ , property (to add as)]
                        * @param {Object} node with data..
                        */
                        
                        dropNode: function(target_data, node) {
                            
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
                                Seed.print(target_data[1]  > 0 ? 'insert_after' : 'insert_before');
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
                                
                                var pname = pal.guessName(this.singleNodeToJS(parent));
                                var cname = pal.file.guessName(node);
                                
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
                                LeftTree.get('view').el.expand_row(this.el.get_path(iter_par), true);
                            }
                            // wee need to get the empty proptypes from somewhere..
                            
                            //var olditer = this.activeIter;
                            this.activeIter = n_iter;
                            this.changed(node, true);
                            
                            
                            
                            LeftTree.get('view').el.set_cursor(this.el.get_path(n_iter), null, false);
                            
                            //Builder.MidPropTree._model.load(node);
                            //Builder.MidPropTree._win.hideWin();
                            //Builder.LeftPanel._model.load( node);
                            
                            
                            
                            
                        },
                        moveNode: function(target_data) {
                            
                            //print("MOVE NODE");
                           // console.dump(target_data);
                            var old_iter = new Gtk.TreeIter();
                            var s = LeftTree.get('view').selection;
                            s.get_selected(this.el, old_iter);
                            var node = this.nodeToJS(old_iter,false);
                            //console.dump(node);
                            
                            
                            // needs to drop first, otherwise the target_data 
                            // treepath will be invalid.
                            
                            this.dropNode(target_data, node);
                            this.el.remove(old_iter);
                            
                            
                        },
                        
                        deleteSelected: function() {
                            
                            
                            
                            var old_iter = new Gtk.TreeIter();
                            var s = LeftTree.get('view').selection;
                            s.get_selected(this.el, old_iter);
                            s.unselect_all();
                            
                            this.el.remove(old_iter);
                            
                            // rebuild treemap.
                            this.map = {};
                            this.treemap = { };
                            //this.toJS(null, true) // does not do anything?
                            this.activeIter = false;
                            this.changed(false,true);
                            
                            
                            
                        },    
                        
                        
                        currentTree  : false,
                         
                        treemap: false, // map of treepath to nodes.
                        
                        listAllTypes : function()
                        {
                            
                            
                            var s = LeftTree.get('view').selection;
                            print ("LIST ALL TYPES: " + s.count_selected_rows() );
                            
                            if (s.count_selected_rows() > 0) {
                                var iter = new Gtk.TreeIter();    
                                s.get_selected(LeftTree.get('model').el, iter);

                                // set some properties of the tree for use by the dropped element.
                                var value = new GObject.Value('');
                                LeftTree.get('model').el.get_value(iter, 2, value);
                                var data = JSON.parse(value.value);
                                
                                
                                var xname = LeftTree.get('model').file.guessName(data);
                                console.log('selected:' + xname);
                                if (xname.length) {
                                    return [ xname ];
                                }
                                return []; // could not find it..
                            }
                            
                            var ret = [ ];
                            
                            function addall(li)
                            {
                                li.forEach(function(el) {
                                    // this is specific to roo!!!?
                                    
                                    var fullpath =  LeftTree.get('model').file.guessName(el);
                                    if (fullpath.length && ret.indexOf(fullpath) < 0) {
                                        ret.push(fullpath);
                                    }
                                    
                                    
                                    if (el.items && el.items.length) {
                                        addall(el.items);
                                    }
                                    
                                })
                                
                                
                            }
                            
                            addall([this.currentTree]);
                            
                            // only if we have nothing, should we add '*top'
                            if (!ret.length) {
                                ret = [ '*top' ];
                            }
                            console.log('all types in tree');
                            console.dump(ret);
                            
                            return ret;
                            
                            
                        },
                        singleNodeToJS: function (treepath) 
                        {
                            var iter = new Gtk.TreeIter(); 
                            if (!this.el.get_iter(iter, new Gtk.TreePath.from_string(treepath))) {
                                return false;
                            }
                            
                            var iv = this.getValue(iter, 2);
                           
                            return JSON.parse(iv);
                            
                        },
                        
                        /**
                         * convert tree into a javascript array
                         * 
                         */
                        nodeToJS: function (iter, with_id) 
                        {
                            var par = new Gtk.TreeIter(); 
                            var iv = this.getValue(iter, 2);
                           // print("IV" + iv);
                            var k = JSON.parse(iv);
                            if (k.json && !this.el.iter_parent( par, iter  )) {
                                delete k.json;
                            }
                            
                            if (with_id) {
                                var treepath_str = this.el.get_path(iter).to_string();
                                k.id =  'builder-'+ treepath_str ;
                               
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
                         /**
                          * iterates through child nodes (or top..)
                          * 
                          */
                        toJS: function(iter, with_id)
                        {
                            Seed.print("WITHID: "+ with_id);
                            
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
                        getValue: function (iter, col) {
                            var gval = new GObject.Value('');
                            this.el.get_value(iter, col ,gval);
                            return  gval.value;
                            
                            
                        },
                        
                        nodeTitle: function(c)
                        {
                              
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
                        
                      //console.log(n.xtype);
                           // return n.xtype;
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
                        /**
                         * load javascript array onto an iter..
                         * @param tr = array of elements
                         * @param iter = iter of parent (or null if not..)
                         */
                        
                        
                         
                        
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
                            
                            
                            
                            
                        },
                        
                        
                        
                      //  this.expand_all();
                    },
                    
                      
                    {
                        xtype: Gtk.TreeViewColumn,
                        pack : ['append_column'],
                        init : function(){
                            XObject.prototype.init.call(this); 
                            this.el.add_attribute(this.items[0].el , 'markup', 0 );
                           
                        },
                        items : [
                            {
                                
                                xtype: Gtk.CellRendererText,
                                pack: [ 'pack_start']
                                  
                            } 
                        ],
                     
                      
                    }
                    
               ]
            }
        ]
                
         
    }
);
    
