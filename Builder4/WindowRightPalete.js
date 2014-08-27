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
WindowRightPalete=new XObject({
    xtype: Gtk.VBox,
    id : "RightPalete",
    pack : "pack_start,false,false",
    'void:clear' : () {
       this.model.el.clear();
    },
    'void:load' : (Palete.Palete pal, string cls ) {
       
       // this.get('model').expanded();
        
        var tr = pal.getChildList(cls);
        this.model.el.clear();
    
    
        Gtk.TreeIter citer;
    
        for(var i =0 ; i < tr.length; i++) {
             this.model.el.append(out citer);   
             
            this.model.el.set_value(citer, 0,   tr[i] ); // title 
            
        }
        this.model.el.set_sort_column_id(0,Gtk.SortType.ASCENDING);
        
    },
    items : [
        {
            xtype: Gtk.VBox,
            pack : "add",
            id : "viewbox",
            items : [
                {
                    xtype: Gtk.ScrolledWindow,
                    pack : "add",
                    init : this.el.set_policy(Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC);
                       this.el.set_size_request(-1,200);,
                    shadow_type : Gtk.ShadowType.IN,
                    items : [
                        {
                            xtype: Gtk.TreeView,
                            listeners : {
                                drag_begin : ( ctx) => {
                                    // we could fill this in now...
                                //        Seed.print('SOURCE: drag-begin');
                                        
                                        
                                        
                                        Gtk.TreeIter iter;
                                        var s = this.el.get_selection();
                                        
                                        Gtk.TreeModel mod;
                                        s.get_selected(out mod, out iter);
                                        var path = mod.get_path(iter);
                                        
                                        /// pix is a surface..
                                        var pix = this.el.create_row_drag_icon ( path);
                                            
                                                
                                        Gtk.drag_set_icon_surface (ctx, pix);
                                        GLib.Value value;
                                        
                                
                                        _this.model.el.get_value(iter, 0, out value);
                                        
                                        this.dragData = (string) value;
                                         
                                        
                                        return;
                                },
                                drag_data_get : (drag_context, selection_data, info, time) => {
                                 	//Seed.print('Palete: drag-data-get: ' + target_type);
                                        if (this.dragData.length > 0 ) {
                                            print("setting drag data to %s", this.dragData);
                                            selection_data.set_text(this.dragData ,this.dragData.length);
                                        }
                                        
                                        
                                        //this.el.dragData = "TEST from source widget";
                                        
                                        
                                },
                                drag_end : ( drag_context)  => {
                                 	//Seed.print('SOURCE: drag-end');
                                	
                                	this.dragData = "";
                                	//this.dropList = null;
                                	_this.drag_end(); // call signal..
                                	//this.get('/LeftTree.view').highlight(false);
                                	 
                                },
                                button_press_event : ( event) => {
                                
                                 //	if (!this.get('/Editor').save()) {
                                 //	    // popup!! - click handled.. 
                                // 	    return true;
                                //        }
                                    return false;
                                }
                            },
                            pack : "add",
                            enable_tree_lines : true,
                            headers_visible : false,
                            init : {
                                this.el.set_size_request(150,-1);
                                                      //  set_reorderable: [1]
                                                              
                                var description = new Pango.FontDescription();
                                description.set_size(8000);
                                this.el.modify_font(description);
                                
                                var selection = this.el.get_selection();
                                selection.set_mode( Gtk.SelectionMode.SINGLE);
                               // this.selection.signal['changed'].connect(function() {
                                //    _view.listeners['cursor-changed'].apply(_view, [ _view, '']);
                                //});
                                // see: http://live.gnome.org/GnomeLove/DragNDropTutorial
                                 
                                Gtk.drag_source_set (
                                        this.el,            /* widget will be drag-able */
                                        Gdk.ModifierType.BUTTON1_MASK,       /* modifier that will start a drag */
                                        Builder4.Application.targetList,            /* lists of target to support */
                                        Gdk.DragAction.COPY         /* what to do with data after dropped */
                                );
                                //Gtk.drag_source_set_target_list(this.el, LeftTree.targetList);
                               
                               // Gtk.drag_source_set_target_list(this.el, Application.targetList);
                               // Gtk.drag_source_add_text_targets(this.el); 
                             
                            },
                            items : [
                                {
                                    xtype: Gtk.ListStore,
                                    id : "model",
                                    n_columns : 2,
                                    pack : "set_model",
                                    columns : typeof(string),typeof(string),
                                    'string:getValue' : (Gtk.TreeIter iter, int col)  {
                                        GLib.Value gval;
                                         this.el.get_value(iter, col , out gval);
                                        return  (string)gval;
                                        
                                        
                                    }
                                },
                                {
                                    xtype: Gtk.TreeViewColumn,
                                    pack : "append_column",
                                    init : this.el.add_attribute(_this.txtrender.el , "markup", 0 );,
                                    items : [
                                        {
                                            xtype: Gtk.CellRendererText,
                                            id : "txtrender",
                                            pack : "pack_start,true"
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
WindowRightPalete.init();
XObject.cache['/WindowRightPalete'] = WindowRightPalete;
