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
            
                _this.model.file.editorSave();
                
                if (!this.get('/Editor').save()) {
                    // popup!! - click handled.. 
                    return true;
                }
            
                    if (ev.type != Gdk.EventType.BUTTON_PRESS  || ev.button.button != 3) {
                        print("click" + ev.type);
                        return false;
                    }
                  
            
                    var res = {}; 
                    this.get('/LeftTree.view').el.get_path_at_pos(ev.button.x,ev.button.y, res);
                    
                    if (!this.get('/LeftTreeMenu').el)  { this.get('/LeftTreeMenu').init(); }
                    
                    this.get('/LeftTreeMenu').el.set_screen(Gdk.Screen.get_default());
                    this.get('/LeftTreeMenu').el.show_all();
                    this.get('/LeftTreeMenu').el.popup(null, null, null, null, 3, ev.button.time);
                    print("click:" + res.path.to_string());
                    return false;
            } );
            this.el.drag_begin.connect( function (self, drag_context) {
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
            } );
            this.el.drag_end.connect( function (self, drag_context) {
            	Seed.print('LEFT-TREE: drag-end');
                    this.el.dragData = false;
                    this.el.dropList = false;
                    this.targetData = false;
                    this.get('/LeftTree.view').highlight(false);
                    return true;
            } );
            this.el.drag_motion.connect( function (self, ctx, x, y, time) {
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
            } );
            this.el.drag_drop.connect( function (w, ctx, x, y, time) {
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
            } );
            this.el.drag_data_received.connect( function (self, ctx, x, y, sel_data, info, time) {
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
            } );
            this.el.cursor_changed.connect( function (self) {
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
                            
            } );
        }

        // userdefined functions 

        // skip listeners - not pipe 

        // skip id - not pipe 

        // skip pack - not pipe 

        // skip tooltip_column - already used 

        // skip xtype - not pipe 

        // skip |enable_tree_lines - already used 

        // skip |headers_visible - already used 

        // skip |highlight - no return type

        // skip |init - already used 

        // skip |selectNode - no return type

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

        // skip activePath - not pipe 

        // skip currentTree - not pipe 

        // skip id - not pipe 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |changed - no return type

        // skip |deleteSelected - no return type

        // skip |dropNode - no return type

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
