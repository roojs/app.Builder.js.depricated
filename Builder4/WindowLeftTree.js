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
WindowLeftTree=new XObject({
    xtype: Gtk.ScrolledWindow,
    id : "WindowLeftTree",
    pack : "add",
    'JsRender.JsRender:getActiveFile' : () {
        return this.model.file;
    },
    'JsRender.Node?:getActiveElement' : () { // return path to actie node.
    
         var path = this.getActivePath();
         if (path.length < 1) {
            return null;
         }
         return _this.model.pathToNode(path);
    },
    init : this.el.set_policy (Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC);,
    shadow_type : Gtk.ShadowType.IN,
    'string:getActivePath' : () {
        var model = this.model;
        var view = this.view.el;
        if (view.get_selection().count_selected_rows() < 1) {
            return "";
        }
        Gtk.TreeIter iter;
        Gtk.TreeModel mod;
        view.get_selection().get_selected(out mod, out iter);
        return mod.get_path(iter).to_string();
    },
    items : [
        {
            xtype: Gtk.TreeView,
            listeners : {
                button_press_event : ( ev) => {
                    //console.log("button press?");
                
                    
                    _this.before_node_change(null);
                    if (ev.type != Gdk.EventType.BUTTON_PRESS  || ev.button != 3) {
                        //print("click" + ev.type);
                        return true;
                    }
                    Gtk.TreePath res;
                    _this.view.el.get_path_at_pos((int)ev.x,(int)ev.y, out res, null, null, null);
                        
                      //if (!this.get('/LeftTreeMenu').el)  { 
                      //      this.get('/LeftTreeMenu').init(); 
                      //  }
                        
                     _this.LeftTreeMenu.el.set_screen(Gdk.Screen.get_default());
                     _this.LeftTreeMenu.el.show_all();
                      _this.LeftTreeMenu.el.popup(null, null, null,  3, ev.time);
                     //   print("click:" + res.path.to_string());
                      return true;
                },
                drag_begin : ( ctx)  => {
                	//print('SOURCE: drag-begin');
                        
                        
                        //this.targetData = "";
                        
                        // find what is selected in our tree...
                        Gtk.TreeIter iter;
                        var s = _this.view.el.get_selection();
                        Gtk.TreeModel mod;
                        s.get_selected(out mod, out iter);
                
                        // set some properties of the tree for use by the dropped element.
                        GLib.Value value;
                        _this.model.el.get_value(iter, 2, out value);
                        var data = (JsRender.Node)(value.dup_object());
                        var xname = data.fqn();
                        
                        this.dragData = xname;
                        this.dropList = _this.model.file.palete().getDropList(xname);
                        
                
                        // make the drag icon a picture of the node that was selected
                        var path = _this.model.el.get_path(iter);
                
                        //this.treepath = path.to_string();
                        
                        var pix = this.el.create_row_drag_icon ( path);
                        
                        Gtk.drag_set_icon_surface (ctx, pix) ;
                        
                        return;
                },
                drag_end : (drag_context) => {
                	//Seed.print('LEFT-TREE: drag-end');
                        this.dragData = "";
                        this.dropList = null;
                //        this.targetData = "";
                        this.highlightDropPath("",0);
                //        return true;
                },
                drag_motion : ( ctx, x, y, time)  => {
                 
                    // the point of this is to detect where an item could be dropped..
                    
                       this.drag_in_motion = true;
                       this.drag_x = x;
                       this.drag_y = y;
                       
                            // request data that will be recieved by the recieve...              
                        Gtk.drag_get_data
                        (
                                this.el,         // will receive 'drag-data-received' signal 
                                ctx,        // represents the current state of the DnD 
                                Gdk.Atom.intern("STRING",true),    // the target type we want 
                                time            // time stamp 
                        );
                    return true;
                       
                },
                drag_drop : (  ctx, x, y, time)  => {
                      //Seed.print("TARGET: drag-drop");
                       this.drag_in_motion = false;   
                        // request data that will be recieved by the recieve...              
                    Gtk.drag_get_data
                    (
                            this.el,         // will receive 'drag-data-received' signal 
                            ctx,        // represents the current state of the DnD 
                            Gdk.Atom.intern("STRING",true),    // the target type we want 
                            time            // time stamp 
                    );
                
                     
                    // No target offered by source => error
                   
                
                    return  true;
                },
                drag_data_received : (ctx, x, y, sel, info, time)  => {
                      //print("Tree: drag-data-received");
                
                
                     
                     
                        //console.log("LEFT-TREE: drag-motion");
                        var src = Gtk.drag_get_source_widget(ctx);
                        
                        // a drag from  elsewhere...- prevent drop..
                        if (src != this.el) {
                            //print("no drag data!");
                            // fix-me - this.. needs to handle comming from the palete...
                            if (this.drag_in_motion) {
                                Gdk.drag_status(ctx, 0, time);
                                return;
                            }
                            Gtk.drag_finish (ctx, false, false, time);        // drop failed..
                            // no drop action...
                            return;
                        }
                            
                        var  targetData = "";
                        //var action = Gdk.DragAction.COPY;
                            // unless we are copying!!! ctl button..
                        var action = (ctx.get_actions() & Gdk.DragAction.MOVE) > 0 ? Gdk.DragAction.MOVE : Gdk.DragAction.COPY ;
                        
                        
                        if (_this.model.el.iter_n_children(null) < 1) {
                            // no children.. -- asume it's ok..
                            
                            targetData = "|%d|".printf((int)Gtk.TreeViewDropPosition.INTO_OR_AFTER);
                            if (this.drag_in_motion) {            
                                Gdk.drag_status(ctx, action ,time);
                                return;
                            }
                            // continue through to allow drop...
                
                        } else {
                            
                            
                
                            //print("GETTING POS");
                            Gtk.TreePath path;
                            Gtk.TreeViewDropPosition pos;
                            var isOver = _this.view.el.get_dest_row_at_pos(this.drag_x,this.drag_y, out path, out pos);
                            
                            //print("ISOVER? " + isOver);
                            if (!isOver) {
                                if (this.drag_in_motion) {
                                    Gdk.drag_status(ctx, 0 ,time);
                                }
                                Gtk.drag_finish (ctx, false, false, time);        // drop failed..
                                return; // not over apoint!?! - no action on drop or motion..
                            }
                            
                            // drag node is parent of child..
                            //console.log("SRC TREEPATH: " + src.treepath);
                            //console.log("TARGET TREEPATH: " + data.path.to_string());
                            
                            // nned to check a  few here..
                            //Gtk.TreeViewDropPosition.INTO_OR_AFTER
                            //Gtk.TreeViewDropPosition.INTO_OR_BEFORE
                            //Gtk.TreeViewDropPosition.AFTER
                            //Gtk.TreeViewDropPosition.BEFORE
                            
                            // what's in the selected data....
                            var selection_text = sel.get_text();
                            // see if we are dragging into ourself?
                            
                             
                            if (selection_text  == path.to_string().substring(0,selection_text.length)) {
                                ///print("subpath drag");
                                if (this.drag_in_motion) {
                                     Gdk.drag_status(ctx, 0 ,time);
                                 }
                                 Gtk.drag_finish (ctx, false, false, time);        // drop failed..
                                 return; /// -- fixme -- this is not really correct..
                
                            }
                            
                            // check that 
                            //print("DUMPING DATA");
                            //console.dump(data);
                            // path, pos
                            
                            //print(data.path.to_string() +' => '+  data.pos);
                            
                            // dropList is a list of xtypes that this node could be dropped on.
                            // it is set up when we start to drag..
                            
                            
                             targetData = _this.model.findDropNodeByPath( path.to_string(), this.dropList, pos);
                                
                
                            
                            if (targetData.length < 1) {
                                //print("Can not find drop node path");
                                if (this.drag_in_motion) {
                                    Gdk.drag_status(ctx, 0, time);
                                }
                                Gtk.drag_finish (ctx, false, false, time);        // drop failed..
                                return;
                            }
                            
                            this.highlightDropPath(targetData, pos);
                            //console.dump(tg);
                               
                            
                            if (this.drag_in_motion) { 
                                Gdk.drag_status(ctx, action ,time);
                                return;
                            }
                            // continue on to allow drop..
                        }
                
                        // at this point, drag is not in motion... -- as checked above... - so it's a real drop event..
                
                
                         var delete_selection_data = false;
                            
                        if (ctx.get_actions() == Gdk.DragAction.ASK)  {
                            /* Ask the user to move or copy, then set the ctx action. */
                        }
                
                        if (ctx.get_actions() == Gdk.DragAction.MOVE) {
                            delete_selection_data = true;
                        }
                        
                            
                                    // drag around.. - reorder..
                        _this.model.moveNode(targetData, ctx.get_actions());
                            
                           
                            
                            
                            
                            // we can send stuff to souce here...
                
                
                
                        Gtk.drag_finish (ctx, true, delete_selection_data, time);
                       
                },
                cursor_changed : ( ) => {
                
                
                     if (this.blockChanges) { // probably not needed.. 
                       return  ;
                     }
                     _this.before_node_change(null);
                     
                     if (_this.model.file == null) {
                         return;
                     } 
                     
                     //var render = this.get('/LeftTree').getRenderer();                
                   
                    
                    if (this.el.get_selection().count_selected_rows() < 1) {
                
                
                        //??this.model.load( false);
                        _this.after_node_change(null);
                        
                        return  ;
                    }
                            
                            //console.log('changed');
                        var s = this.el.get_selection();
                         Gtk.TreeIter iter;
                         Gtk.TreeModel mod;
                        s.get_selected(out mod, out iter);
                        
                        
                        // var val = "";
                        GLib.Value value;
                        _this.model.el.get_value(iter, 2, out value);
                        _this.model.activePath = mod.get_path(iter).to_string();
                        
                        var node = (JsRender.Node)value.dup_object();
                
                        _this.after_node_change(node);
                
                //        _this.model.file.changed(node, "tree");
                       
                        //Seed.print( value.get_string());
                        return  ;
                                
                }
            },
            id : "view",
            pack : "add",
            tooltip_column : 1,
            enable_tree_lines : true,
            headers_visible : false,
            init : {
                var description = new Pango.FontDescription();
                description.set_size(8000);
                this.el.modify_font(description);
            
                var selection = this.el.get_selection();
                selection.set_mode( Gtk.SelectionMode.SINGLE);
            
            
                // is this really needed??
                /*
                this.selection.signal['changed'].connect(function() {
            	    _this.get('/LeftTree.view').listeners.cursor_changed.apply(
            	        _this.get('/LeftTree.view'), [ _this.get('/LeftTree.view'), '']
            	    );
                });
                */
                Gtk.drag_source_set (
            	    this.el,            /* widget will be drag-able */
            	    Gdk.ModifierType.BUTTON1_MASK,       /* modifier that will start a drag */
            	    Builder4.Application.targetList,            /* lists of target to support */
            	    Gdk.DragAction.COPY   | Gdk.DragAction.MOVE           /* what to do with data after dropped */
                );
            
                // ?? needed??
                //Gtk.drag_source_add_text_targets(this.el); 
            
                Gtk.drag_dest_set
                (
                    this.el,              /* widget that will accept a drop */
                    Gtk.DestDefaults.MOTION  | Gtk.DestDefaults.HIGHLIGHT,
                    Builder4.Application.targetList,            /* lists of target to support */
                    Gdk.DragAction.COPY   | Gdk.DragAction.MOVE       /* what to do with data after dropped */
                );
            
                //Gtk.drag_dest_set_target_list(this.el, Builder.Application.targetList);
                //Gtk.drag_dest_add_text_targets(this.el);
            },
            'void:highlightDropPath' : ( string treepath, Gtk.TreeViewDropPosition pos) {
            
                    // highlighting for drag/drop
                    if (treepath.length > 0) {
                        this.el.set_drag_dest_row(  new  Gtk.TreePath.from_string( treepath ), pos);
                      } else {
                            this.el.set_drag_dest_row(null, Gtk.TreeViewDropPosition.INTO_OR_AFTER);
                     }
                         
            },
            'void:selectNode' : (string treepath_str) {
                //this.selection.select_path(new  Gtk.TreePath.from_string( treepath_str));
                 var tp = new Gtk.TreePath.from_string(treepath_str);
                 
                 this.el.set_cursor(tp, null, false);  
                 this.el.scroll_to_cell(tp, null, false, 0,0);
            },
            items : [
                {
                    xtype: Gtk.TreeStore,
                    currentTree : false,
                    id : "model",
                    n_columns : 3,
                    pack : "set_model",
                    'JsRender.Node:pathToNode' : (string path) {
                     
                         
                         Gtk.TreeIter   iter;
                         _this.model.el.get_iter_from_string(out iter, path);
                         
                         GLib.Value value;
                         _this.model.el.get_value(iter, 2, out value);
                         
                         return (JsRender.Node)value.dup_object();
                    
                    },
                    columns : typeof(string),typeof(string),typeof(Object),
                    init : print("model initialized");,
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
                    'string:findDropNode' : (string treepath_str, string[] targets) {
                    
                        // this is used by the dragdrop code in the roo version AFAIR..
                    
                        //var path = treepath_str.replace(/^builder-/, '');
                        // treemap is depreciated... - should really check if model has any entries..
                    
                        if (this.el.iter_n_children(null) < 1) {
                            //print("NO KEYS");
                            return "|%d".printf((int)Gtk.TreeViewDropPosition.INTO_OR_AFTER);
                        }
                        //print("FIND treepath: " + path);
                        //console.dump(this.treemap);
                        
                        //if (!treepath_str.match(/^builder-/)) {
                        //    return []; // nothing!
                        //}
                        if (targets.length > 0 && targets[0] == "*") {
                            return  treepath_str;
                        }
                        return this.findDropNodeByPath(treepath_str,targets, -1);
                    },
                    'string:findDropNodeByPath' : (string treepath_str, string[] targets, int in_pref = -1) {
                    
                        var path = treepath_str; // dupe it..
                        
                        int pref = in_pref < 0  ?  Gtk.TreeViewDropPosition.INTO_OR_AFTER : in_pref;
                        
                        var last = "";
                        
                        //console.dump(this.treemap);
                        
                        while (path.length > 0) {
                            //print("LOOKING FOR PATH: " + path);
                            var node_data = this.pathToNode(path);
                            
                            if (node_data == null) {
                                print("node not found");
                                return null;
                            }
                            
                            var xname = node_data.fqn();
                            var match = "";
                            var prop = "";
                            
                            for (var i =0; i < targets.length; i++)  {
                                var tg = targets[i];
                                if ((tg == xname)  ) {
                                    match = tg;
                                    break;
                                }
                                // if target is "xxxx:name"
                                if (tg.contains(xname +":")) {
                                    match = tg;
                                    var ar = tg.split(":");
                                    prop = ar[1];
                                    break;
                                }
                            }
                            
                            if (match.length > 0) {
                                if (last.length > 0) { // pref is after/before..
                                    // then it's after last
                                    if (pref > 1) {
                                        return "";
                                    }
                                    return last + "|%d".printf((int)pref) + "|" + prop;
                    
                                    
                                }
                                return path + "|%d".printf( (int) Gtk.TreeViewDropPosition.INTO_OR_AFTER) + "|" + prop;
                            }
                            
                            var par = path.split(":");
                            last = "" + path;
                            par[par.length] = "";
                            path = string.joinv(":", par).substring(0,-2);
                        }
                        
                        return "";
                                
                    },
                    'void:deleteSelected' : () {
                        
                        
                        _this.view.blockChanges = true;
                        
                        Gtk.TreeIter old_iter = new Gtk.TreeIter();
                        var s = _this.view.el.get_selection();
                        Gtk.TreeModel mod;
                        
                        s.get_selected(out mod, out old_iter);
                        
                        var path = mod.get_path(old_iter).to_string();
                    
                        this.activePath= "";      
                        s.unselect_all();
                    
                        this.activePath= "";      
                        
                        Gtk.TreeIter iter;
                        this.el.get_iter_from_string(out iter, path);
                    
                        GLib.Value value;
                        this.el.get_value(iter, 2, out value);
                        var data = (JsRender.Node)value.dup_object();
                        data.remove();
                        this.el.remove(ref iter);
                        
                        
                        // 
                        
                        
                    
                    
                        this.activePath= ""; // again!?!?      
                        //this.changed(null,true);
                        
                        this.file.changed(null, "tree");
                        
                        _this.view.blockChanges = false;
                    },
                    'void:dropNode' : (string target_data_str, JsRender.Node node) {
                    //         print("drop Node");
                         // console.dump(node);
                      //    console.dump(target_data);
                      
                            var target_data= target_data_str.split("|");
                      
                            Gtk.TreePath tp = target_data[0].length > 0 ? new  Gtk.TreePath.from_string( target_data[0] ) : null;
                            
                             Gtk.TreePath parent = null;
                            //print("add " + tp + "@" + target_data[1]  );
                            
                            JsRender.Node parentNode = null;
                            
                              parent = tp;
                            
                            Gtk.TreePath after = null;
                            
                            if (tp != null && int.parse(target_data[1])  < 2) { // before or after..
                                var ar = target_data[0].split(":");
                                ar[ar.length-1] = "";
                                var npath = string.joinv(":", ar);
                                
                                
                                parent  = new  Gtk.TreePath.from_string( npath.substring( 0, -2 ));
                                
                                
                                
                                
                                after = tp;
                            }
                            Gtk.TreeIter? n_iter;
                            Gtk.TreeIter? iter_par;
                    
                            Gtk.TreeIter? iter_after;
                            
                            
                            
                            if (parent != null) {
                                this.el.get_iter(out iter_par, parent);
                                GLib.Value value;
                                this.el.get_value( iter_par, 2, out value);
                                  parentNode =  (JsRender.Node)value.dup_object();
                            } else {
                                iter_par = null;
                            }
                            
                            
                            if (tp != null && after != null) {
                                //print(target_data[1]  > 0 ? 'insert_after' : 'insert_before');
                                
                                this.el.get_iter(out iter_after, after);
                                if ( int.parse(target_data[1]) >0 ) {
                                    this.el.insert_after(out n_iter, iter_par, iter_after);
                                } else {
                                    this.el.insert_before(out n_iter, iter_par, iter_after);
                                }
                                
                            } else {
                                this.el.append(out n_iter, iter_par);
                                
                            }
                            
                            if (node.parent == null) {
                            
                                if (target_data.length == 3 && target_data[2].length > 0) {
                                    node.props.set("*prop", target_data[2]);
                                }
                                
                                var new_node = DialogTemplateSelect.show(this.file.palete(), node);
                                node = new_node;
                                
                            }
                            
                            
                            // work out what kind of packing to use.. -- should be in 
                            if (!node.has("pack")   && parent != null) {
                            
                                this.file.palete().fillPack(node,parentNode);
                                
                                
                            }
                            
                            
                            
                    // load children - if it has any..
                    
                            if (node.items.length() > 0) {
                                this.load(node.items, n_iter);
                                _this.view.el.expand_row(this.el.get_path(n_iter), true);
                            }
                            
                            if (tp != null && (node.items.length() > 0 || after != null)) {
                                _this.view.el.expand_row(this.el.get_path(iter_par), true);
                            }
                            // wee need to get the empty proptypes from somewhere..
                            
                            //var olditer = this.activeIter;
                            this.activePath = this.el.get_path(n_iter).to_string();
                    
                      // changed actually set's the node data..
                            this.updateNode(node, true);
                            
                            
                            _this.view.el.set_cursor(this.el.get_path(n_iter), null, false);
                            
                            //Builder.MidPropTree._model.load(node);
                            //Builder.MidPropTree._win.hideWin();
                            //Builder.LeftPanel._model.load( node);
                            
                                
                    },
                    'void:load' : (GLib.List<JsRender.Node> tr, Gtk.TreeIter? iter) 
                    {
                        Gtk.TreeIter citer;
                        //this.insert(citer,iter,0);
                        for(var i =0 ; i < tr.length(); i++) {
                            if (iter != null) {
                                this.el.insert(out citer,iter,-1); // why not append?
                            } else {
                                this.el.append(out citer,null);
                            }
                            
                            this.el.set(citer, 0, tr.nth_data(i).nodeTitle(),
                                    1, tr.nth_data(i).nodeTip(), -1
                            );
                            var o = new GLib.Value(typeof(Object));
                            o.set_object((Object)tr.nth_data(i));
                            
                            this.el.set_value(citer, 2, o);
                            
                            if (tr.nth_data(i).items.length() > 0) {
                                this.load(tr.nth_data(i).items, citer);
                            }
                         
                        }
                    },
                    'void:loadFile' : (JsRender.JsRender f) {
                        //console.dump(f);
                        this.el.clear();
                        this.file = f;
                        
                    //    if (!f) {
                    //        console.log('missing file');
                    //        return;
                    //    }
                        
                        // load the file if not loaded..
                        if (f.tree == null) {
                            f.loadItems( );
                        }
                        
                        
                        
                        /// this.get('/Window').setTitle(f.project.getName() + ' - ' + f.name);
                        
                        //if (f.items.length && typeof(f.items[0]) == 'string') {
                        
                            //this.get('/RightEditor').el.show();
                            //this.get('/RightEditor.view').load( f.items[0]);
                        //    return;
                        //}
                        //print("LOAD");
                        //print(JSON.stringify(f.items, null,4));
                        //console.dump(f.items);
                        var o = new GLib.List<JsRender.Node>();
                        o.append(f.tree);
                        this.load(o,null);
                        
                        _this.view.el.expand_all();
                    
                        if (f.tree.items.length() < 1) {
                            // single item..
                            
                            //this.get('/Window.leftvpaned').el.set_position(80);
                            // select first...
                            _this.view.el.set_cursor( 
                                new  Gtk.TreePath.from_string("0"), null, false);
                            
                            
                        } else {
                              //this.get('/Window.leftvpaned').el.set_position(200);
                        }
                        
                        return;
                        /*    
                        
                        //print("hide right editior");
                        //this.get('/RightEditor').el.hide();
                        //this.get('/Editor').el.hide();
                        //print("set current tree");
                        //this.currentTree = this.toJS(false, false)[0];
                        //console.dump(this.currentTree);
                        //this.currentTree = this.currentTree || { items: [] };
                        //_this.renderView();
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
                            */
                                
                    },
                    'void:moveNode' : (string target_data, Gdk.DragAction action) 
                    {
                        //print("MOVE NODE");
                        // console.dump(target_data);
                        Gtk.TreeIter old_iter;
                        var s = _this.view.el.get_selection();
                        Gtk.TreeModel mod;
                        s.get_selected(out mod , out old_iter);
                        mod.get_path(old_iter);
                        
                        var node = this.pathToNode(mod.get_path(old_iter).to_string());
                        //console.dump(node);
                    
                    
                        // needs to drop first, otherwise the target_data 
                        // treepath will be invalid.
                    
                        
                        
                        if ((action & Gdk.DragAction.MOVE) > 0) {
                                  //          print("REMOVING OLD NODE");
                                node.remove();
                                this.dropNode(target_data, node);
                                this.el.remove(ref old_iter);
                                
                                             
                        } else {
                            node = node.deepClone();
                            this.dropNode(target_data, node);
                        }
                    
                        this.activePath= "";
                        //this.updateNode(false,true);
                    },
                    'void:updateNode' : (JsRender.Node? n, bool refresh)
                     {
                        //     print("MODEL CHANGED CALLED" + this.activePath);
                         if (n != null && this.activePath.length > 0) {
                            Gtk.TreeIter iter;
                            this.el.get_iter(out iter, new Gtk.TreePath.from_string(this.activePath));
                            this.el.set(iter, 0, n.nodeTitle(), 1, n.nodeTip(), -1);
                            var v = new Value(typeof(Object));
                            v.set_object((Object)n);
                        }
                                  
                    }
                },
                {
                    xtype: Gtk.TreeViewColumn,
                    pack : "append_column",
                    init : this.el.add_attribute(_this.renderer.el , "markup", 0 );,
                    items : [
                        {
                            xtype: Gtk.CellRendererText,
                            id : "renderer",
                            pack : "pack_start,true"
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
                    listeners : {
                        activate : ( ) => {
                        
                             _this.model.deleteSelected();
                        }
                    },
                    label : "Delete Element",
                    pack : "add"
                },
                {
                    xtype: Gtk.MenuItem,
                    listeners : {
                        activate : () => {
                        
                             DialogSaveTemplate.show(_this.model.file.palete(), _this.getActiveElement());
                             
                            
                        }
                    },
                    label : "Save as Template",
                    pack : "add"
                }
            ]
        }
    ]
});
WindowLeftTree.init();
XObject.cache['/WindowLeftTree'] = WindowLeftTree;
