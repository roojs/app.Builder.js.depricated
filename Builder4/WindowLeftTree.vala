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

public class Xcls_WindowLeftTree
{
    public Gtk.ScrolledWindow el;
    private Xcls_WindowLeftTree  _this;

    public Xcls_view view;
    public Xcls_model model;
    public Xcls_LeftTreeMenu LeftTreeMenu;

        // my vars

        // ctor 
    public Xcls_WindowLeftTree()
    {
        this.el = new Gtk.ScrolledWindow( null, null );
        _this = this;
        WindowLeftTree = this;

        // my vars

        // set gobject values
        this.el.shadow_type = Gtk.ShadowType.IN;
        var child_0 = new Xcls_view(_this);
        this.el.add (  child_0.el  );
        var child_1 = new Xcls_LeftTreeMenu(_this);
        this.el.add (  child_1.el  );
    }

    // userdefined functions 

    // skip |getActiveFile - no return type

    // skip pack - not pipe 

    // skip xtype - not pipe 
    public JsRender.Node? getActiveElement () { // return path to actie node.
        
             var path = this.getActivePath();
             if (path.length < 1) {
                return null;
             }
             Gtk.TreeIter   iter = new ();
             _this.model.el.get_iter_from_string(out iter, path);
             
             GLib.Value value;
             _this.model.el.get_value(iter, 2, out value);
             
             return (JsRender.Node)value;
        }
    public JsRender.JsRender getActiveFile() {
            return this.model.file;
        }
    public string getActivePath () {
            var model = this.model;
            var view = this.view;
            if (view.el.get_selection().count_selected_rows() < 1) {
                return "";
            }
            Gtk.TreeIter iter;
            GtkStore mod;
            view.selection.get_selected(out mod, out iter);
            return mod.get_path(iter).to_string();
        }
    public Palete.Palete getPaleteProviderfunction() {
        
            //var pm = imports.Builder.Provider.ProjectManager.ProjectManager;
            return _this.model.file.getPalete();
        
        }
    public void getRenderer() {
        
            /*
            switch( this.getActiveFile().getType()) {
                case 'Roo':
                    return this.get('/RightBrowser.view');
                case 'Gtk':
                    return this.get('/RightGtkView');
            }
            */
        
        }

    // skip |init - already used 
    public void renderView() {
            
            _this.model.file.renderJS();
        
        }

    // skip |shadow_type - already used 

    // skip |xns - no return type

    // skip items - not pipe 

    // skip id - not pipe 

    // skip xvala_cls - not pipe 

    // skip xvala_xcls - not pipe 

    // skip xvala_id - not pipe 
    public class Xcls_view
    {
        public Gtk.TreeView el;
        private Xcls_WindowLeftTree  _this;


            // my vars
        public GLib.List dragList;
        public string dragData;

            // ctor 
        public Xcls_view(Xcls_WindowLeftTree _owner)
        {
            this.el = new Gtk.TreeView();
            _this = _owner;
            _this.view = this;

            // my vars

            // set gobject values
            this.el.enable_tree_lines = true;
            this.el.headers_visible = false;
            this.el.tooltip_column = 1;
            var child_0 = new Xcls_model(_this);
            this.el.set_model (  child_0.el  );
            var child_1 = new Xcls_TreeViewColumn4(_this);
            this.el.append_column (  child_1.el  );

            // listeners 
            this.el.button_press_event.connect(   ( ev) {
                //console.log("button press?");
            
                if (!_this.model.file.editorSave()) {
                
                    // popup!! - click handled.. 
                    return;
                }
            
                if (ev.type != Gdk.EventType.BUTTON_PRESS  || ev.button.button != 3) {
                    //print("click" + ev.type);
                    return;
                }
                Gtk.TreePath res;
                _this.view.el.get_path_at_pos(ev.button.x,ev.button.y, out res);
                    
                  //if (!this.get('/LeftTreeMenu').el)  { 
                  //      this.get('/LeftTreeMenu').init(); 
                  //  }
                    
                 _this.LeftTreeMenu.el.set_screen(Gdk.Screen.get_default());
                 _this.LeftTreeMenu.el.show_all();
                  _this.LeftTreeMenu.el.popup(null, null, null, null, 3, ev.button.time);
                 //   print("click:" + res.path.to_string());
                 //   return false;
            } );
            this.el.drag_begin.connect( ( ctx)  => {
            	//print('SOURCE: drag-begin');
                    
                    
                    this.targetData = "";
                    
                    // find what is selected in our tree...
                    Gtk.TreeIter iter;
                    var s = this.model.get_selection();
                    Gtk.TreeStore mod;
                    s.get_selected(out mod, out iter);
            
                    // set some properties of the tree for use by the dropped element.
                    GLib.Value value;
                    _this.model.el.get_value(iter, 2, out value);
                    var data = (JsRender.Node)(value.value);
                    var xname = data.fqn();
                    
                    this.dragData = xname;
                    this.dropList = this.file.getPalete().getDropList(xname);
                    
            
                    // make the drag icon a picture of the node that was selected
                    var path = _this.model.el.get_path(iter);
            
                    this.treepath = path.to_string();
                    
                    var pix = this.el.create_row_drag_icon ( path);
                    
                    Gtk.drag_set_icon_surface (ctx, pix) 
                    
                    return true;
            } );
            this.el.drag_end.connect(   (drag_context) => {
            	//Seed.print('LEFT-TREE: drag-end');
                    this.dragData = "";
                    this.dropList = null;
                    this.targetData = "";
                    this.view.highlight(false);
            //        return true;
            } );
            this.el.drag_motion.connect(  ( ctx, x, y, time)  => {
                 //console.log("LEFT-TREE: drag-motion");
                    var src = Gtk.drag_get_source_widget(ctx);
                    
                    // a drag from  elsewhere...- prevent drop..
                    if (src != this.el) {
                        //print("no drag data!");
                        Gdk.drag_status(ctx, 0, time);
                        this.targetData = "";
                        return true;
                    }
                    
                    
                    var action = Gdk.DragAction.COPY;
                    if (src == this.el) {
                        // unless we are copying!!! ctl button..
                        action = ctx.actions & Gdk.DragAction.MOVE ? Gdk.DragAction.MOVE : Gdk.DragAction.COPY ;
                    }
                    var data = {};
            
                    if (this.model.el.iter_n_children(null) < 1) {
            	        // no children.. -- asume it's ok..
            	        
            	        this.targetData =  [ '' , Gtk.TreeViewDropPosition.INTO_OR_AFTER , ''];
            	        
            	        Gdk.drag_status(ctx, action ,time);
            	        return true;
                    }
                    
                    
            
                    //print("GETTING POS");
                    Gtk.TreePath path;
                    var isOver = this.view.el.get_dest_row_at_pos(x,y, out path);
                    
                    //print("ISOVER? " + isOver);
                    if (!isOver) {
                        Gdk.drag_status(ctx, 0 ,time);
                        return false; // not over apoint!?!
                    }
                    
                    // drag node is parent of child..
                    //console.log("SRC TREEPATH: " + src.treepath);
                    //console.log("TARGET TREEPATH: " + data.path.to_string());
                    
                    // nned to check a  few here..
                    //Gtk.TreeViewDropPosition.INTO_OR_AFTER
                    //Gtk.TreeViewDropPosition.INTO_OR_BEFORE
                    //Gtk.TreeViewDropPosition.AFTER
                    //Gtk.TreeViewDropPosition.BEFORE
                    
                    if (typeof(src.treepath) != 'undefined'  && 
                        src.treepath == path.path.to_string().substring(0,src.treepath.length)
                        ) {
                        ///print("subpath drag");
                         Gdk.drag_status(ctx, 0 ,time);
                        //return false;
                    }
                    
                    // check that 
                    //print("DUMPING DATA");
                    //console.dump(data);
                    // path, pos
                    
                    //print(data.path.to_string() +' => '+  data.pos);
                    
                    var tg = this.model.findDropNodeByPath(
                        path.path.to_string(), src.dropList, path.pos);
                        
                    this.view.highlight(tg);
                    if (tg.length < 0) {
                        //print("Can not find drop node path");
                        this.targetData = false;
                        Gdk.drag_status(ctx, 0, time);
                        return true;
                    }
                    //console.dump(tg);
                    this.targetData = tg;    
                    
                    
                    Gdk.drag_status(ctx, action ,time);
                     
                    return true;
            } );
            this.el.drag_drop.connect(  (  ctx, x, y, time)  => {
                  //Seed.print("TARGET: drag-drop");
                    
                    // request data that will be recieved by the recieve...              
                Gtk.drag_get_data
                (
                        this.el,         // will receive 'drag-data-received' signal 
                        ctx,        // represents the current state of the DnD 
                        Atom.intern("STRING",true),    // the target type we want 
                        time            // time stamp 
                );
            
                 
                // No target offered by source => error
               
            
                return  true;
            } );
            this.el.drag_data_received.connect(   (ctx, x, y, sel, info, time)  => {
                  //print("Tree: drag-data-received");
            
                   var   delete_selection_data = false;
                   var  dnd_success = false;
                   
                   var seltype = sel.get_data_type().name();
                   var seldata = sel.get_data();
                   
                   
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
                                
                                _this.model.dropNode(this.targetData,  source.dragData);
                            } else {
                                // drag around.. - reorder..
                                 _this.model.moveNode(this.targetData, ctx.action);
                                
                                
                            }
                            //Seed.print(this.targetData);
                          
                        }
                        
                        
                        
                        // we can send stuff to souce here...
            
                        dnd_success = true;
            
                    }
            
                    if (dnd_success == false)
                    {
                            //Seed.print ("DnD data transfer failed!\n");
                    }
            
                    Gtk.drag_finish (ctx, dnd_success, delete_selection_data, time);
                    return true;
            } );
            this.el.cursor_changed.connect(  (self) => {
            
            
                 if (this.blockChanges) { // probably not needed.. 
                   return true;
                 }
                 
                 
                 var render = this.get('/LeftTree').getRenderer();                
               
                
                if (_this.model.get_selection().count_selected_rows() < 1) {
            
            
                    this.model.load( false);
                    this.file.avail_prop_tree.activeElement =  null;
                    this.file.avail_prop_tree.hideWin();
            
             
                    this.file.avail_child_tree.loadAll(null);
                    this.file.renderRedraw();
                    return true;
                }
                        
                        //console.log('changed');
                    var s = this.get_selection();
                     Gtk.TreeIter iter;
                     Gtk.TreeStore mod;
                    s.get_selected(out mod, out iter);
                    
                    
                    // var val = "";
                    GLib.Value value;
                    this.model.el.get_value(iter, 2, out value);
                    this.model.activePath = mod.get_path(iter).to_string();
                    
                    var data = (JsRender.Node)value;
                    this.file.avail_prop_tree.activeElement = data;
                    this.file.avail_prop_tree.hideWin();
                    this.file.property_editor.load(data);
                    this.file.avail_child_tree.loadAll(data);
                
                   
                    //Seed.print( value.get_string());
                    return true;
                            
            } );
        }

        // userdefined functions 

        // skip listeners - not pipe 

        // skip .GLib.List:dragList - already used 

        // skip .string:dragData - already used 

        // skip id - not pipe 

        // skip pack - not pipe 

        // skip tooltip_column - already used 

        // skip xtype - not pipe 

        // skip |enable_tree_lines - already used 

        // skip |headers_visible - already used 

        // skip |init - already used 
        public void highlight ( bool treepath_ar) {
            
                    // highlighting for drag/drop
            //        if (treepath_ar.length && treepath_ar[0].length ) {
              //          this.el.set_drag_dest_row( 
              //                  new  Gtk.TreePath.from_string( treepath_ar[0] ),  
              //                    treepath_ar[1]
            //            );
              //          } else {
                            this.el.set_drag_dest_row(null, Gtk.TreeViewDropPosition.INTO_OR_AFTER);
               //         }
                         
                    }
        public void selectNode(string treepath_str) {
                //this.selection.select_path(new  Gtk.TreePath.from_string( treepath_str));
                 var tp = new Gtk.TreePath.from_string(treepath_str);
                 
                 this.el.set_cursor(tp, null, false);  
                 this.el.scroll_to_cell(tp, null, false, 0,0);
            }

        // skip |xns - no return type

        // skip items - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_model
    {
        public Gtk.TreeStore el;
        private Xcls_WindowLeftTree  _this;


            // my vars
        public string activePath;

            // ctor 
        public Xcls_model(Xcls_WindowLeftTree _owner)
        {
            this.el = new Gtk.TreeStore();
            _this = _owner;
            _this.model = this;

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip .string:activePath - already used 

        // skip currentTree - not pipe 

        // skip id - not pipe 

        // skip pack - not pipe 

        // skip xtype - not pipe 
        public void changed(JsRender.Node? n, bool refresh) {
                //     print("MODEL CHANGED CALLED" + this.activePath);
                 if (n !== null && this.activePath.length > 0) {
                    Gtk.TreeIter iter;
                    this.el.get_iter(iter, new Gtk.TreePath.from_string(this.activePath))
                    this.el.set(iter, 0, n.displayTitle(), 1, n.displayTitle(), -1);
                    var v = new Value(typeof(Object));
                    v.set_object(n);
            
                }
                        //this.currentTree = this.toJS(false, true)[0];
                //    var d = new Date();
                //this.file.items = this.toJS(false, false);
                //    print ("TO JS in " + ((new Date()) - d) + "ms");
                  //  print("AFTER CHANGED");
                    //console.dump(this.file.items);
                    _this.file.save();
                    //this.currentTree = this.file.items[0];
                    //console.log(this.file.toSource());
                    
                    if (refresh) {
                        //print("REDNER BROWSER?!");
                        _this.renderView();
                        _this.file.avail_child_tree.loadAll(n);
                        
                        
            
                        //imports['Builder/RightBrowser.js'].renderJS(this.toJS());
                    }
            	          
            }
        public void deleteSelected() {
                
                
                _this.view.blockChanges = true;
                
                Gtk.TreeIter old_iter = new Gtk.TreeIter();
                var s = _this.view.get_selection();
                Gtk.TreeStore mod;
                
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
                this.el.remove(iter);
                
                
                // 
                
                
            
            
                this.activePath= ""; // again!?!?      
                this.changed(null,true);
                _this.view.blockChanges = false;
            }
        public void dropNode(string target_data_str, JsRender.Node node) {
            //         print("drop Node");
                 // console.dump(node);
              //    console.dump(target_data);
              
                    var target_data= target_data_str.split("|");
              
                    Gtk.TreePath tp = target_data[0].length > 0 ? new  Gtk.TreePath.from_string( target_data[0] ) : null;
                    
                    //print("add " + tp + "@" + target_data[1]  );
                    
                    JsRender.Node parentNode = null;
                    
                    var parent = tp;
                    
                    Gtk.TreePath after = null;
                    
                    if (tp != null && int.parse(target_data[1])  < 2) { // before or after..
                        var ar = target_data[0].split(':');
                        ar[ar.length-1] = "";
                        var npath = string.joinv(":", ar)
                        
                        
                        parent  = new  Gtk.TreePath.from_string( npath.substring( 0, -2 ));
                        
                        
                        
                        
                        after = tp;
                    }
                    Gtk.TreeIter n_iter;
                    Gtk.TreeIter iter_par;
            
                    Gtk.TreeIter iter_after;
                    
                    
                    
                    if (parent !== null) {
                        this.el.get_iter(out iter_par, parent);
                        GLib.Value value;
                        this.el.get_value( iter_par, 2, out value);
                        var parentNode =  (JsRender.Node)value.dup_object();
                    } else {
                        iter_par = null;
                    }
                    
                    
                    if (tp != null && after != null) {
                        //print(target_data[1]  > 0 ? 'insert_after' : 'insert_before');
                        
                        this.el.get_iter(out iter_after, after);
                        if ( int.parse(target_data[1] >0 ) {
                            this.el.insert_after(n_iter, iter_par, iter_after);
                        } else {
                            this.el.insert_before(n_iter, iter_par, iter_after);
                        }
                        
                    } else {
                        this.el.append(n_iter, iter_par);
                        
                    }
                    
                    if (node.parent == null) {
                    
                        if (target_data.length == 3 && target_data[2].length) {
                            node.set('*prop', target_data[2]);
                        }
                        
                        node = DialogTemplateSelect.show(node);
                        
                    }
                    
                    
                    // work out what kind of packing to use.. -- should be in 
                    if (typeof(node.pack) == 'undefined'  && parent !== false) {
                    
                    
                        this.file.getPalete().fillPack(node,parentNode);
                        
                        
                    }
                    
                    
                    var xitems = [];
                    if (node.items) {
                        xitems = node.items;
                        delete node.items;
                    }
            // load children - if it has any..
            
                    if (node.items.length() > 0) {
                        this.load(node.items, n_iter);
                        _this.view.el.expand_row(this.el.get_path(n_iter), true);
                    }
                    
                    if (tp != null && (node.items.length() > 0 || after)) {
                        _this.view.el.expand_row(this.el.get_path(iter_par), true);
                    }
                    // wee need to get the empty proptypes from somewhere..
                    
                    //var olditer = this.activeIter;
                    this.activePath = this.el.get_path(n_iter).to_string();
            
              // changed actually set's the node data..
                    this.changed(node, true);
                    
                    
                    _this.view.el.set_cursor(this.el.get_path(n_iter), null, false);
                    
                    //Builder.MidPropTree._model.load(node);
                    //Builder.MidPropTree._win.hideWin();
                    //Builder.LeftPanel._model.load( node);
                    
                        
            }

        // skip |findDropNode - no return type

        // skip |findDropNodeByPath - no return type

        // skip |getIterValue - no return type

        // skip |init - already used 

        // skip |listAllTypes - no return type

        // skip |load - no return type

        // skip |loadFile - no return type

        // skip |moveNode - no return type

        // skip |nodeTip - no return type

        // skip |nodeTitle - no return type

        // skip |nodeToJS - no return type

        // skip |nodeToJSON - no return type

        // skip |singleNodeToJS - no return type

        // skip |toJS - no return type

        // skip |xns - no return type

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_TreeViewColumn4
    {
        public Gtk.TreeViewColumn el;
        private Xcls_WindowLeftTree  _this;


            // my vars

            // ctor 
        public Xcls_TreeViewColumn4(Xcls_WindowLeftTree _owner)
        {
            this.el = new Gtk.TreeViewColumn();
            _this = _owner;

            // my vars

            // set gobject values
            var child_0 = new Xcls_CellRendererText5(_this);
            this.el.pack_start (  child_0.el  );
        }

        // userdefined functions 

        // skip |xns - no return type

        // skip xtype - not pipe 

        // skip pack - not pipe 

        // skip |init - already used 

        // skip items - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_CellRendererText5
    {
        public Gtk.CellRendererText el;
        private Xcls_WindowLeftTree  _this;


            // my vars

            // ctor 
        public Xcls_CellRendererText5(Xcls_WindowLeftTree _owner)
        {
            this.el = new Gtk.CellRendererText();
            _this = _owner;

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip |xns - no return type

        // skip xtype - not pipe 

        // skip pack - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_LeftTreeMenu
    {
        public Gtk.Menu el;
        private Xcls_WindowLeftTree  _this;


            // my vars

            // ctor 
        public Xcls_LeftTreeMenu(Xcls_WindowLeftTree _owner)
        {
            this.el = new Gtk.Menu();
            _this = _owner;
            _this.LeftTreeMenu = this;

            // my vars

            // set gobject values
            var child_0 = new Xcls_MenuItem7(_this);
            this.el.add (  child_0.el  );
            var child_1 = new Xcls_MenuItem8(_this);
            this.el.add (  child_1.el  );
        }

        // userdefined functions 

        // skip |xns - no return type

        // skip xtype - not pipe 

        // skip pack - not pipe 

        // skip id - not pipe 

        // skip items - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_MenuItem7
    {
        public Gtk.MenuItem el;
        private Xcls_WindowLeftTree  _this;


            // my vars

            // ctor 
        public Xcls_MenuItem7(Xcls_WindowLeftTree _owner)
        {
            this.el = new Gtk.MenuItem();
            _this = _owner;

            // my vars

            // set gobject values
            this.el.label = "Delete Element";

            // listeners 
            this.el.activate.connect( function (self) {
            
                 this.get('/LeftTree.model').deleteSelected();
            } );
        }

        // userdefined functions 

        // skip |xns - no return type

        // skip xtype - not pipe 

        // skip pack - not pipe 

        // skip label - already used 

        // skip listeners - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_MenuItem8
    {
        public Gtk.MenuItem el;
        private Xcls_WindowLeftTree  _this;


            // my vars

            // ctor 
        public Xcls_MenuItem8(Xcls_WindowLeftTree _owner)
        {
            this.el = new Gtk.MenuItem();
            _this = _owner;

            // my vars

            // set gobject values
            this.el.label = "Save as Template";

            // listeners 
            this.el.activate.connect( function (self) {
            
                 var tree = this.get('/LeftTree');
                  var model = this.get('/LeftTree.model');
                 var el = tree.getActivePath();
                 print(el);
                 var js = model.toJS(el, false);
                // print(JSON.stringify(js[0], null,4));
                 this.get('/DialogSaveTemplate').show(JSON.stringify(js[0], null,4));
                 
                
            } );
        }

        // userdefined functions 

        // skip listeners - not pipe 

        // skip label - already used 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |xns - no return type

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
}
