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
    id : "RightPalete",
    'node)' : "",
    xtype : "VBox",
    'node)' : "",
    load : (Palete.Palete pal, string cls ) {
       
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
    'drag_end()' : "",
    xns : Gtk,
    clear : () {
       this.model.el.clear();
    },
    items : [
    	{
            id : "viewbox",
            xtype : "VBox",
            xns : Gtk,
            items : [
            	{
                    shadow_type : Gtk.ShadowType.IN,
                    xtype : "ScrolledWindow",
                    xns : Gtk,
                    items : [
                    	{
                            dragData : "",
                            xtype : "TreeView",
                            enable_tree_lines : true,
                            headers_visible : false,
                            xns : Gtk,
                            listeners : {
                            	button_press_event : ( event) => {
                            	   
                            	    //	if (!this.get('/Editor').save()) {
                            	    //	    // popup!! - click handled.. 
                            	   // 	    return true;
                            	   //        }
                            	       return false;
                            	   },
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
                            	drag_end : ( drag_context)  => {
                            	    	//Seed.print('SOURCE: drag-end');
                            	   	
                            	   	this.dragData = "";
                            	   	//this.dropList = null;
                            	   	_this.drag_end(); // call signal..
                            	   	//this.get('/LeftTree.view').highlight(false);
                            	   	 
                            	   },
                            	drag_data_get : (drag_context, selection_data, info, time) => {
                            	    	//Seed.print('Palete: drag-data-get: ' + target_type);
                            	           if (this.dragData.length > 0 ) {
                            	               print("setting drag data to %s", this.dragData);
                            	               selection_data.set_text(this.dragData ,this.dragData.length);
                            	           }
                            	           
                            	           
                            	           //this.el.dragData = "TEST from source widget";
                            	           
                            	           
                            	   }
                            },
                            items : [
                            	{
                                    getValue : (Gtk.TreeIter iter, int col)  {
                                        GLib.Value gval;
                                         this.el.get_value(iter, col , out gval);
                                        return  (string)gval;
                                        
                                        
                                    },
                                    id : "model",
                                    xtype : "ListStore",
                                    columns : typeof(string),typeof(string),
                                    n_columns : 2,
                                    xns : Gtk
                                },
                            	{
                                    xtype : "TreeViewColumn",
                                    xns : Gtk,
                                    items : [
                                    	{
                                            id : "txtrender",
                                            xtype : "CellRendererText",
                                            xns : Gtk
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
