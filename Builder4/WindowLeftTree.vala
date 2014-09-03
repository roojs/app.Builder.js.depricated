/* -- to compile
valac  --pkg gio-2.0  --pkg posix  --pkg gtk+-3.0 --pkg libnotify --pkg gtksourceview-3.0  --pkg  libwnck-3.0 \
    /tmp/WindowLeftTree.vala  -o /tmp/WindowLeftTree
*/


/* -- to test class
static int main (string[] args) {
    Gtk.init (ref args);
    new Xcls_WindowLeftTree();
    WindowLeftTree.show_all();
     Gtk.main ();
    return 0;
}
*/


public static Xcls_WindowLeftTree  WindowLeftTree;

public class Xcls_WindowLeftTree : Object 
{
    public Gtk.ScrolledWindow el;
    private Xcls_WindowLeftTree  _this;

    public static Xcls_WindowLeftTree singleton()
    {
        if (WindowLeftTree == null) {
            WindowLeftTree= new Xcls_WindowLeftTree();
        }
        return WindowLeftTree;
    }
    public Xcls_view view;
    public Xcls_model model;
    public Xcls_renderer renderer;
    public Xcls_LeftTreeMenu LeftTreeMenu;

        // my vars
    public signal bool before_node_change(JsRender.Node? node);
    public signal void changed();
    public signal void node_selected(JsRender.Node? node);

        // ctor 
    public Xcls_WindowLeftTree()
    {
        _this = this;
        this.el = new Gtk.ScrolledWindow( null, null );

        // my vars

        // set gobject values
        this.el.shadow_type = Gtk.ShadowType.IN;
        var child_0 = new Xcls_view( _this );
        child_0.ref();
        this.el.add (  child_0.el  );
        var child_1 = new Xcls_LeftTreeMenu( _this );
        child_1.ref();

        // init method 
         this.el.set_policy (Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC);
         
    }

    // userdefined functions 
    public JsRender.JsRender getActiveFile() {
            return this.model.file;
        }
    public JsRender.Node? getActiveElement () { // return path to actie node.
        
             var path = this.getActivePath();
             if (path.length < 1) {
                return null;
             }
             return _this.model.pathToNode(path);
        }
    public string getActivePath () {
            var model = this.model;
            var view = this.view.el;
            if (view.get_selection().count_selected_rows() < 1) {
                return "";
            }
            Gtk.TreeIter iter;
            Gtk.TreeModel mod;
            view.get_selection().get_selected(out mod, out iter);
            return mod.get_path(iter).to_string();
        }

    // skip |xns - no return type
    public class Xcls_view : Object 
    {
        public Gtk.TreeView el;
        private Xcls_WindowLeftTree  _this;


            // my vars
        public bool blockChanges;
        public bool drag_in_motion;
        public int drag_x;
        public int drag_y;
        public string dragData;
        public string[] dropList;

            // ctor 
        public Xcls_view(Xcls_WindowLeftTree _owner )
        {
            _this = _owner;
            _this.view = this;
            this.el = new Gtk.TreeView();

            // my vars
            this.blockChanges = false;

            // set gobject values
            this.el.enable_tree_lines = true;
            this.el.headers_visible = false;
            this.el.tooltip_column = 1;
            var child_0 = new Xcls_model( _this );
            child_0.ref();
            this.el.set_model (  child_0.el  );
            var child_1 = new Xcls_TreeViewColumn4( _this );
            child_1.ref();
            this.el.append_column (  child_1.el  );

            // init method 
            {
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
            }

            // listeners 
            this.el.button_press_event.connect(   ( ev) => {
                //console.log("button press?");
                if (! _this.before_node_change(null) ) {
                   return true;
                }
            
                
                if (ev.type != Gdk.EventType.BUTTON_PRESS  || ev.button != 3) {
                    //print("click" + ev.type);
                    return false;
                }
                Gtk.TreePath res;
                if (!_this.view.el.get_path_at_pos((int)ev.x,(int)ev.y, out res, null, null, null) ) {
                    return true;
                }
                 
                this.el.get_selection().select_path(res);
                 
                  //if (!this.get('/LeftTreeMenu').el)  { 
                  //      this.get('/LeftTreeMenu').init(); 
                  //  }
                    
                 _this.LeftTreeMenu.el.set_screen(Gdk.Screen.get_default());
                 _this.LeftTreeMenu.el.show_all();
                  _this.LeftTreeMenu.el.popup(null, null, null,  3, ev.time);
                 //   print("click:" + res.path.to_string());
                  return true;
            } );
            this.el.drag_begin.connect( ( ctx)  => {
            	//print('SOURCE: drag-begin');
                    
                    
                    //this.targetData = "";
                    
                    // find what is selected in our tree...
                    
                    var s = _this.view.el.get_selection();
                    if (s.count_selected_rows() < 1) {
                        return;
                    }
                    Gtk.TreeIter iter;
                    Gtk.TreeModel mod;
                    s.get_selected(out mod, out iter);
            
                    
            
                    // set some properties of the tree for use by the dropped element.
                    GLib.Value value;
                    _this.model.el.get_value(iter, 2, out value);
                    var data = (JsRender.Node)(value.dup_object());
                    var xname = data.fqn();
                     print ("XNAME  IS " + xname+ "\n");
                    this.dragData = xname;
                    this.dropList = _this.model.file.palete().getDropList(xname);
                    
                    print ("DROP LIST IS " + string.joinv(", ", this.dropList) + "\n");
                    
            
                    // make the drag icon a picture of the node that was selected
                    var path = _this.model.el.get_path(iter);
            
                    //this.treepath = path.to_string();
                    
                    var pix = this.el.create_row_drag_icon ( path);
                    
                    Gtk.drag_set_icon_surface (ctx, pix) ;
                    
                    return;
            } );
            this.el.drag_end.connect(   (drag_context) => {
            	//Seed.print('LEFT-TREE: drag-end');
                    this.dragData = "";
                    this.dropList = null;
            //        this.targetData = "";
                    this.highlightDropPath("",0);
            //        return true;
            } );
            this.el.drag_motion.connect(  ( ctx, x, y, time)  => {
             
                // the point of this is to detect where an item could be dropped..
                    print("got drag motion");
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
                   
            } );
            this.el.drag_drop.connect(  (  ctx, x, y, time)  => {
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
               
            
                return  false;
            } );
            this.el.drag_data_received.connect(   (ctx, x, y, sel, info, time)  => {
                  //print("Tree: drag-data-received");
            
                    //print("GETTING POS");
                    var  targetData = "";
                    
                    Gtk.TreePath path;
                    Gtk.TreeViewDropPosition pos;
                    var isOver = _this.view.el.get_dest_row_at_pos(this.drag_x,this.drag_y, out path, out pos);
                    
                    // if there are not items in the tree.. the we have to set isOver to true for anything..
                    var isEmpty = false;
                    if (_this.model.el.iter_n_children(null) < 1) {
                        print("got NO children?\n");
                        isOver = true; //??? 
                        isEmpty = true;
                        pos = Gtk.TreeViewDropPosition.INTO_OR_AFTER;
                    }
                    
                 
                    //console.log("LEFT-TREE: drag-motion");
                    var src = Gtk.drag_get_source_widget(ctx);
                    
                    // a drag from  elsewhere...- prevent drop..
                    if (src != this.el) {
                        //print("drag_data_recieved from another element");
                        
                         
                        var selection_text = sel.get_text();
                        
                        if (selection_text == null || selection_text.length < 1 || !isOver) {
                            // nothing valid foudn to drop...
                            if (this.drag_in_motion) {
                                Gdk.drag_status(ctx, 0, time);
                                this.highlightDropPath("", (Gtk.TreeViewDropPosition)0);
                                return;
                            }
                            Gtk.drag_finish (ctx, false, false, time);        // drop failed..
                            // no drop action...
                            return;            
                        
                        }
                         
                        // dropList --- need to gather this ... 
                        //print("get dropList for : %s\n",selection_text);            
                        var dropList = _this.model.file.palete().getDropList(selection_text);
                        
                        print("dropList: %s\n", string.joinv(" , ", dropList));
                        
                        targetData = _this.model.findDropNodeByPath( isEmpty ? "" : path.to_string(), dropList, pos);
                            
                        print("targetDAta: " + targetData +"\n");
                        
                        if (targetData.length < 1) {
                         
                            // invalid drop path..
                            if (this.drag_in_motion) {
                                Gdk.drag_status(ctx, 0, time);
                                this.highlightDropPath("", (Gtk.TreeViewDropPosition)0);
                                return;
                            }
                            Gtk.drag_finish (ctx, false, false, time);        // drop failed..
                            // no drop action...
                            return;
                        }
                        // valid drop path..
                        
                          var td_ar = targetData.split("|");
                          
                        
                        if (this.drag_in_motion) { 
                            Gdk.drag_status(ctx, Gdk.DragAction.COPY ,time);
            
                            this.highlightDropPath(  td_ar[0]  , (Gtk.TreeViewDropPosition)int.parse(td_ar[1]));
                            return;
                        }
                        // continue on to allow drop..
                        
            
                        // at this point, drag is not in motion... -- as checked above... - so it's a real drop event..
                        var node = new JsRender.Node();
                        node.setFqn(selection_text);
            
                        _this.model.dropNode(targetData, node);
                        print("ADD new node!!!\n");
                            
                        ///Xcls_DialogTemplateSelect.singleton().show( _this.model.file.palete(), node);
                        
                        Gtk.drag_finish (ctx, false, false,time);
                        
                        
                        
                        
                        
                        return;
                        
                    }
                        
                   
                    //var action = Gdk.DragAction.COPY;
                        // unless we are copying!!! ctl button..
                    var action = (ctx.get_actions() & Gdk.DragAction.MOVE) > 0 ? Gdk.DragAction.MOVE : Gdk.DragAction.COPY ;
                    
                    
                    if (_this.model.el.iter_n_children(null) < 1) {
                        // no children.. -- asume it's ok..
                        
                        targetData = "|%d|".printf((int)Gtk.TreeViewDropPosition.INTO_OR_AFTER);
                        if (this.drag_in_motion) {    
                            this.highlightDropPath("", (Gtk.TreeViewDropPosition)0);        
                            Gdk.drag_status(ctx, action ,time);
                            return;
                        }
                        // continue through to allow drop...
            
                    } else {
                        
                        
            
                        
                        
                        //print("ISOVER? " + isOver);
                        if (!isOver) {
                            if (this.drag_in_motion) {
                                Gdk.drag_status(ctx, 0 ,time);
                                 this.highlightDropPath("", (Gtk.TreeViewDropPosition)0);                    
                                 return;
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
                        
                        
                        
                        if (selection_text == null || selection_text.length < 1) {
                            //print("Error  - drag selection text returned NULL");
                            if (this.drag_in_motion) {
                                 Gdk.drag_status(ctx, 0 ,time);
                                this.highlightDropPath("", (Gtk.TreeViewDropPosition)0);
                                 return;
                             }
                             Gtk.drag_finish (ctx, false, false, time);        // drop failed..
                             return; /// -- fixme -- this is not really correct..
                        }                
                        
                        // see if we are dragging into ourself?
                        print ("got selection text of  " + selection_text);
                        
                        var target_path = path.to_string();
                        //print("target_path="+target_path);
            
                        // 
                        if (selection_text  == target_path) {
                            print("self drag ?? == we should perhaps allow copy onto self..\n");
                            if (this.drag_in_motion) {
                                 Gdk.drag_status(ctx, 0 ,time);
                                  this.highlightDropPath("", (Gtk.TreeViewDropPosition)0);
                                  return;
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
                            
                        print("targetDAta: " + targetData +"\n");
                        
                        if (targetData.length < 1) {
                            //print("Can not find drop node path");
                            if (this.drag_in_motion) {
                                Gdk.drag_status(ctx, 0, time);
                                this.highlightDropPath("", (Gtk.TreeViewDropPosition)0);
                                return;
                            }
                            Gtk.drag_finish (ctx, false, false, time);        // drop failed..
                            return;
                        }
                        
                        var td_ar = targetData.split("|");
                          
                        
                        if (this.drag_in_motion) { 
                            Gdk.drag_status(ctx, action ,time);
                            this.highlightDropPath(td_ar[0], (Gtk.TreeViewDropPosition)int.parse(td_ar[1]));
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
            
            
                // do we always say failure, so we handle the reall drop?
                    Gtk.drag_finish (ctx, false, false,time); //delete_selection_data, time);
                   
            } );
            this.el.cursor_changed.connect(  ( ) => {
            
            
                 if (this.blockChanges) { // probably not needed.. 
                   return  ;
                 }
                  if (!_this.before_node_change(null) ) {
            	     this.blockChanges = true;
            	     this.el.get_selection().unselect_all();
            	     this.blockChanges = false;
            	     return;
                 }
                 if (_this.model.file == null) {
                     return;
                 } 
                 
                 //var render = this.get('/LeftTree').getRenderer();                
                print("LEFT TREE -> view -> selection changed called\n");
                
                
                // -- it appears that the selection is not updated.
                
                GLib.Timeout.add_full(GLib.Priority.DEFAULT,10 , () => {
                     
            
                        if (this.el.get_selection().count_selected_rows() < 1) {
            
                            print("selected rows < 1\n");
                            //??this.model.load( false);
                            _this.node_selected(null);
                            
                            return false ;
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
                        _this.node_selected(node);
                        return false;
                  });  
                //_this.after_node_change(node);
            
            //        _this.model.file.changed(node, "tree");
               
                //Seed.print( value.get_string());
                return  ;
                            
            } );
            this.el.drag_data_get.connect(  ( drag_context, data, info, time) => {
            
            
                 print("drag-data-get");
                 var s = this.el.get_selection();
                 if (s.count_selected_rows() < 1) {
                        data.set_text("",0);     
                         print("return empty string - no selection..");
                        return;
                    }
                 
                 Gtk.TreeIter iter;
                 Gtk.TreeModel mod;
                 
                 s.get_selected(out mod, out iter);
                 
                
                var tp = mod.get_path(iter).to_string();
                data.set_text(tp,tp.length);
                 print("return " + tp);
            } );
        }

        // userdefined functions 
        public void highlightDropPath ( string treepath, Gtk.TreeViewDropPosition pos) {
            
                    // highlighting for drag/drop
                    if (treepath.length > 0) {
                        this.el.set_drag_dest_row(  new  Gtk.TreePath.from_string( treepath ), pos);
                      } else {
                        this.el.set_drag_dest_row(null, Gtk.TreeViewDropPosition.INTO_OR_AFTER);
                     }
                         
            }
        public void selectNode(string treepath_str) {
                //this.selection.select_path(new  Gtk.TreePath.from_string( treepath_str));
                 var tp = new Gtk.TreePath.from_string(treepath_str);
                 
                 this.el.set_cursor(tp, null, false);  
                 this.el.scroll_to_cell(tp, null, false, 0,0);
            }

        // skip |xns - no return type
    }
    public class Xcls_model : Object 
    {
        public Gtk.TreeStore el;
        private Xcls_WindowLeftTree  _this;


            // my vars
        public JsRender.JsRender? file;
        public Project.Project? project;
        public string activePath;

            // ctor 
        public Xcls_model(Xcls_WindowLeftTree _owner )
        {
            _this = _owner;
            _this.model = this;
            this.el = new Gtk.TreeStore( 3, typeof(string),typeof(string),typeof(Object) );

            // my vars
            this.file = null;
            this.project = null;
            this.activePath = "";

            // set gobject values

            // init method 
            print("model initialized");
        }

        // userdefined functions 
        public JsRender.Node pathToNode(string path) {
             
                 
                 Gtk.TreeIter   iter;
                 _this.model.el.get_iter_from_string(out iter, path);
                 
                 GLib.Value value;
                 _this.model.el.get_value(iter, 2, out value);
                 
                 return (JsRender.Node)value.dup_object();
            
            }

        // skip |listAllTypes - no return type
        public string findDropNode (string treepath_str, string[] targets) {
            
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
            }
        public string findDropNodeByPath (string treepath_str, string[] targets, int in_pref = -1) {
            
                var path = treepath_str; // dupe it..
                
                int pref = in_pref < 0  ?  Gtk.TreeViewDropPosition.INTO_OR_AFTER : in_pref;
                
                var last = "";
                
                //console.dump(this.treemap);
                
                print("findDropNodeByPath : got path length %d / %s\n", path.length, path);
                
                if (path.length == 0) {
                    // top drop. // just return empty..
                    return "|%d".printf((int)pref) ;
                    
                }
                
                
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
                    last = "" + path;
                    var par = path.split(":");
                    string [] ppar = {};
                    for (var i = 0; i < par.length-1; i++) {
                        ppar += par[i];
                    }
                    
                    path = string.joinv(":", ppar);
            
            
                }
                
                return "";
                        
            }
        public void deleteSelected() {
                
                print("DELETE SELECTED?");
                //_this.view.blockChanges = true;
                print("GET SELECTION?");
            
                var s = _this.view.el.get_selection();
                
                print("GET  SELECTED?");
               Gtk.TreeIter iter;
                Gtk.TreeModel mod;
            
                
                if (!s.get_selected(out mod, out iter)) {
                    return; // nothing seleted..
                }
                  
            
            
                this.activePath= "";      
                print("GET  vnode value?");
            
                GLib.Value value;
                this.el.get_value(iter, 2, out value);
                var data = (JsRender.Node)(value.get_object());
                print("removing node from Render\n");
                if (data.parent == null) {
                    this.file.tree = null;
                } else {
                    data.remove();
                }
                print("removing node from Tree\n");    
                s.unselect_all();
                this.el.remove(ref iter);
            
                
                
                
                // 
                
                
            
            
                this.activePath= ""; // again!?!?      
                //this.changed(null,true);
                
                this.file.changed(null, "tree");
                
                _this.view.blockChanges = false;
            }
        public void dropNode(string target_data_str, JsRender.Node node) {
            //         print("drop Node");
                 // console.dump(node);
              //    console.dump(target_data);
              
              
                    // 0 = before , 1=after 2/3 onto
              
              
                    var target_data= target_data_str.split("|");
              
                    var parent_str = target_data[0].length > 0 ? target_data[0] : "";
                    var pos = target_data.length > 1 ? int.parse(target_data[1]) : 2; // ontop..
              
              
                    Gtk.TreePath tree_path  =   parent_str.length > 0 ? new  Gtk.TreePath.from_string( parent_str ) : null;
                    
                    
                    
                    //print("add " + tp + "@" + target_data[1]  );
                    
                    JsRender.Node parentNode = null;
                    
                    Gtk.TreeIter iter_after;
                    Gtk.TreeIter iter_par ;
                    
                   
                     if (target_data.length == 3 && target_data[2].length > 0) {
                        node.props.set("* prop", target_data[2]);
                    }
            
                    Gtk.TreePath expand_parent = null;
                    
                     var new_node = Xcls_DialogTemplateSelect.singleton().show( this.file.palete(), node);
                     node = new_node;
                    
                    
                     //print("pos is %d  \n".printf(pos));
                    
                     Gtk.TreeIter n_iter; 
                     
                     if ( parent_str.length < 1) {
                          this.el.append(out n_iter, null); // drop at top level..
                          node.parent = null;
                          this.file.tree = node;
                          
                          
                    } else   if (pos  < 2) {
                        //print(target_data[1]  > 0 ? 'insert_after' : 'insert_before');
                        
                        this.el.get_iter(out iter_after, tree_path );            
                        this.el.iter_parent(out iter_par, iter_after);
                        expand_parent = this.el.get_path(iter_par);
                        
                        GLib.Value value;
                        this.el.get_value( iter_par, 2, out value);
                        parentNode =  (JsRender.Node)value.dup_object();
                        
                        
                        this.el.get_value( iter_after, 2, out value);
                        var relNode =  (JsRender.Node)value.dup_object();
                        
                        if ( pos  > 0 ) {
                         
                            this.el.insert_after(out n_iter,    iter_par  , iter_after);
                            var ix = parentNode.items.index_of(relNode);
                            parentNode.items.insert(ix+1, node);
                            
                        } else {
                            this.el.insert_before(out n_iter,  iter_par  , iter_after);
                            var ix = parentNode.items.index_of(relNode);
                            parentNode.items.insert(ix, node);
             
                        }
                        //node.parent = parentNode;
                    } else {
                       //  print("appending to  " + parent_str);
                        this.el.get_iter(out iter_par, tree_path);
                        this.el.append(out n_iter,   iter_par );
                        expand_parent = this.el.get_path(iter_par);
                        
                        GLib.Value value;
                        this.el.get_value( iter_par, 2, out value);
                        parentNode =  (JsRender.Node)value.dup_object();
                        node.parent = parentNode;
                        parentNode.items.add(node);
                    }
                    
                    // reparent node in tree...
                   
                    
                    // why only on no parent???
                    
                    //if (node.parent = null) {
                         
                       
                        
                    //}
                    
                    
                    // work out what kind of packing to use.. -- should be in 
                    if (!node.has("pack")   && parent_str.length > 1) {
                        
                        this.file.palete().fillPack(node,parentNode);
                        
                        
                    }
                    
                    // add the node...
                    
                    this.el.set(n_iter, 0, node.nodeTitle(), 1, node.nodeTip(), -1  );
                    var o = new GLib.Value(typeof(Object));
                    o.set_object((Object)node);
                    
                    this.el.set_value(n_iter, 2, o);
                    
                    
                    
                    
            // load children - if it has any..
                  
                    if (node.items.size > 0) {
                        this.load(node.items, n_iter);
                        _this.view.el.expand_row(this.el.get_path(n_iter), true);
                    } else if (expand_parent != null && !_this.view.el.is_row_expanded(expand_parent)) {
                       _this.view.el.expand_row(expand_parent,true);
                    }
            
                    //if (tp != null && (node.items.length() > 0 || pos > 1)) {
                    //    _this.view.el.expand_row(this.el.get_path(iter_par), true);
                   // }
                    // wee need to get the empty proptypes from somewhere..
                    
                    //var olditer = this.activeIter;
                    this.activePath = this.el.get_path(n_iter).to_string();
            
            
                    
                    
                    _this.view.el.set_cursor(this.el.get_path(n_iter), null, false);
                    _this.changed();
                 
                    
                        
            }
        public void load(Gee.ArrayList<JsRender.Node> tr, Gtk.TreeIter? iter) 
            {
                Gtk.TreeIter citer;
                //this.insert(citer,iter,0);
                for(var i =0 ; i < tr.size; i++) {
                    if (iter != null) {
                        this.el.insert(out citer,iter,-1); // why not append?
                    } else {
                        this.el.append(out citer,null);
                    }
                    
                    this.el.set(citer, 0, tr.get(i).nodeTitle(),
                            1, tr.get(i).nodeTip(), -1
                    );
                    var o = new GLib.Value(typeof(Object));
                    o.set_object((Object)tr.get(i));
                    
                    this.el.set_value(citer, 2, o);
                    
                    if (tr.get(i).items.size > 0) {
                        this.load(tr.get(i).items, citer);
                    }
                 
                }
            }
        public void loadFile(JsRender.JsRender f) {
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
                // if it's still null?
                if (f.tree == null) {
                    return;
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
                var o = new Gee.ArrayList<JsRender.Node>();
                o.add(f.tree);
                this.load(o,null);
                
                _this.view.el.expand_all();
            
                if (f.tree.items.size < 1) {
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
                        
            }
        public void moveNode(string target_data, Gdk.DragAction action) 
            {
               
               /// target_data = "path|pos");
               
               
                //print("MOVE NODE");
                // console.dump(target_data);
                Gtk.TreeIter old_iter;
                Gtk.TreeModel mod;
                
                var s = _this.view.el.get_selection();
                s.get_selected(out mod , out old_iter);
                mod.get_path(old_iter);
                
                var node = this.pathToNode(mod.get_path(old_iter).to_string());
                //console.dump(node);
                if (node == null) {
                    print("moveNode: ERROR - node is null?");
                }
                
                
            
                // needs to drop first, otherwise the target_data 
                // treepath will be invalid.
            
                
                if ((action & Gdk.DragAction.MOVE) > 0) {
                        print("REMOVING OLD NODE : " + target_data + "\n");
                        node.remove();
                        this.dropNode(target_data, node);
                        this.el.remove(ref old_iter);
                        
                        
                                     
                } else {
                    print("DROPPING NODE // copy: " + target_data + "\n");
                    node = node.deepClone();
                    this.dropNode(target_data, node);
                }
                _this.changed();
                this.activePath= "";
                //this.updateNode(false,true);
            }

        // skip |xns - no return type
    }
    public class Xcls_TreeViewColumn4 : Object 
    {
        public Gtk.TreeViewColumn el;
        private Xcls_WindowLeftTree  _this;


            // my vars

            // ctor 
        public Xcls_TreeViewColumn4(Xcls_WindowLeftTree _owner )
        {
            _this = _owner;
            this.el = new Gtk.TreeViewColumn();

            // my vars

            // set gobject values
            var child_0 = new Xcls_renderer( _this );
            child_0.ref();
            this.el.pack_start (  child_0.el , true );

            // init method 
              this.el.add_attribute(_this.renderer.el , "markup", 0 );
             
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_renderer : Object 
    {
        public Gtk.CellRendererText el;
        private Xcls_WindowLeftTree  _this;


            // my vars

            // ctor 
        public Xcls_renderer(Xcls_WindowLeftTree _owner )
        {
            _this = _owner;
            _this.renderer = this;
            this.el = new Gtk.CellRendererText();

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_LeftTreeMenu : Object 
    {
        public Gtk.Menu el;
        private Xcls_WindowLeftTree  _this;


            // my vars

            // ctor 
        public Xcls_LeftTreeMenu(Xcls_WindowLeftTree _owner )
        {
            _this = _owner;
            _this.LeftTreeMenu = this;
            this.el = new Gtk.Menu();

            // my vars

            // set gobject values
            var child_0 = new Xcls_MenuItem7( _this );
            child_0.ref();
            this.el.add (  child_0.el  );
            var child_1 = new Xcls_MenuItem8( _this );
            child_1.ref();
            this.el.add (  child_1.el  );
            var child_2 = new Xcls_MenuItem9( _this );
            child_2.ref();
            this.el.add (  child_2.el  );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_MenuItem7 : Object 
    {
        public Gtk.MenuItem el;
        private Xcls_WindowLeftTree  _this;


            // my vars

            // ctor 
        public Xcls_MenuItem7(Xcls_WindowLeftTree _owner )
        {
            _this = _owner;
            this.el = new Gtk.MenuItem();

            // my vars

            // set gobject values
            this.el.label = "Delete Element";

            // listeners 
            this.el.activate.connect(   ( ) => {
                
                print("ACTIVATE?");
                
              
                 _this.model.deleteSelected();
            } );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_MenuItem8 : Object 
    {
        public Gtk.MenuItem el;
        private Xcls_WindowLeftTree  _this;


            // my vars

            // ctor 
        public Xcls_MenuItem8(Xcls_WindowLeftTree _owner )
        {
            _this = _owner;
            this.el = new Gtk.MenuItem();

            // my vars

            // set gobject values
            this.el.label = "Save as Template";

            // listeners 
            this.el.activate.connect(   () => {
            
                 DialogSaveTemplate.singleton().show(
                        (Gtk.Window) _this.el.get_toplevel (), 
                        _this.model.file.palete(), 
                        _this.getActiveElement()
                );
                 
                
            } );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_MenuItem9 : Object 
    {
        public Gtk.MenuItem el;
        private Xcls_WindowLeftTree  _this;


            // my vars

            // ctor 
        public Xcls_MenuItem9(Xcls_WindowLeftTree _owner )
        {
            _this = _owner;
            this.el = new Gtk.MenuItem();

            // my vars

            // set gobject values
            this.el.label = "Save as Module";

            // listeners 
            this.el.activate.connect(   () => {
                var node = _this.getActiveElement();
                 var name = DialogSaveModule.singleton().show(
                        (Gtk.Window) _this.el.get_toplevel (), 
                        _this.model.file.project, 
                        node
                 );
                 if (name.length < 1) {
                        return;
              
                 }
                 node.props.set("* xinclude", name);
                 node.items.clear();
            
            
                var s = _this.view.el.get_selection();
                
                print("GET  SELECTED?");
                Gtk.TreeIter iter;
                Gtk.TreeModel mod;
            
                
                if (!s.get_selected(out mod, out iter)) {
                    return; // nothing seleted..
                }
                Gtk.TreeIter citer;
                var n_cn = mod.iter_n_children(iter) -1;
                for (var i = n_cn; i > -1; i--) {
                    mod.iter_nth_child(out citer, iter, i);
                    
            
                    print("removing node from Tree\n");    
                
                    _this.model.remove(ref citer);
                }
                _this.changed();
                _this.node_selected(node);
                 
                
            } );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
}
