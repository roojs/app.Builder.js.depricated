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
    'void:hide' : () {
        
          _this.buttonbar.el.show();
          _this.viewbox.el.hide();
      //    print("TRIED TO HIDE");
    },
    'void:show' : () {
        _this.buttonbar.el.hide();
        _this.viewbox.el.show();
       // this.get('model').expanded();
                
    },
    items : [
        {
            xtype: Gtk.VBox,
            pack : "add",
            id : "buttonbar",
            items : [
                {
                    xtype: Gtk.Button,
                    listeners : {
                        clicked : (self) => {
                        	_this.show();
                        }
                    },
                    pack : "pack_start,false,true",
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
                    listeners : {
                        enter_notify_event : (self, event) => {
                            RightPalete.show();
                            return false;
                        }
                    },
                    angle : 270,
                    label : "Palete",
                    pack : "add",
                    init : this.el.add_events ( Gdk.EventMask.BUTTON_MOTION_MASK );
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
                            listeners : {
                                clicked : () => {
                                	_this.hide();
                                }
                            },
                            pack : "pack_start,false,true",
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
                                        var s = _this.selection;
                                        
                                        s.get_selected(_this.model.el, out iter);
                                        var path = _this.model.el.get_path(iter);
                                        
                                        /// pix is a surface..
                                        var pix = this.el.create_row_drag_icon ( path);
                                            
                                                
                                        Gtk.drag_set_icon_surface (ctx, pix);
                                        GLib.Value val;
                                        
                                
                                        _this.model.el.get_value(iter, 0, out value);
                                        if (_this.provider == null) {
                                            return false;
                                        }
                                        //if (!this.get('/RightPalete').provider) {
                                        //    return false;
                                        //}
                                        this.dropList = _this.provider.getDropList((string)value);
                                        this.dragData = (string) value;
                                         
                                        
                                        return true;
                                },
                                drag_data_get : (drag_context, selection_data, info, time) => {
                                 	//Seed.print('Palete: drag-data-get: ' + target_type);
                                        if (this.el.dragData.length > 0 ) {
                                            selection_data.set_text(this.dragData ,this.dragData.length);
                                        }
                                        
                                        
                                        //this.el.dragData = "TEST from source widget";
                                        
                                        
                                },
                                drag_end : ( drag_context)  => {
                                 	//Seed.print('SOURCE: drag-end');
                                	
                                	this.dragData = "";
                                	this.dropList = null;
                                	_this.drag_end(); // call signal..
                                	//this.get('/LeftTree.view').highlight(false);
                                	return true;
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
                                        null,            /* lists of target to support */
                                        0,              /* size of list */
                                        Gdk.DragAction.COPY         /* what to do with data after dropped */
                                );
                                //Gtk.drag_source_set_target_list(this.el, LeftTree.targetList);
                               
                                Gtk.drag_source_set_target_list(this.el, Application.targetList);
                                Gtk.drag_source_add_text_targets(this.el); 
                             
                            },
                            items : [
                                {
                                    xtype: Gtk.ListStore,
                                    columns : "typeof(string),typeof(string)",
                                    id : "model",
                                    n_columns : 2,
                                    pack : "set_model",
                                    'void:load' : (GLib.List<string> tr, Gtk.TreeIter? iter)
                                    {
                                        if (iter == null) {
                                            this.el.clear();
                                        }
                                        //console.log('Project tree load: ' + tr.length);
                                    
                                        Gtk.TreeIter citer;
                                        //this.insert(citer,iter,0);
                                        for(var i =0 ; i < tr.length(); i++) {
                                            if (iter == null) {
                                                
                                                this.el.append(out citer);   
                                            } else {
                                                this.el.insert(out citer,iter,-1);
                                            }
                                            
                                            var r = tr.nth_data(i);
                                            //Seed.print(r);
                                            this.el.set_value(citer, 0,   r ); // title 
                                            
                                            //this.el.set_value(citer, 1,  new GObject.Value( r)); //id
                                            //if (r.cn && r.cn.length) {
                                            //    this.load(r.cn, citer);
                                            //}
                                        }
                                        
                                        
                                    },
                                    'string:getValue' : (Gtk.TreeIter iter, int col)  {
                                        GLib.Value gval;
                                         this.el.get_value(iter, col , out gval);
                                        return  (string)gval;
                                        
                                        
                                    }
                                },
                                {
                                    xtype: Gtk.TreeViewColumn,
                                    pack : "append_column",
                                    init : this.el.add_attribute(_this.txtrender , "markup", 0 );,
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
