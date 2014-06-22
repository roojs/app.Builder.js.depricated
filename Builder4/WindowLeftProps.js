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
WindowLeftProps=new XObject({
    xtype: Gtk.VBox,
    id : "LeftProps",
    'void:startEditingValue' : function() {
        
    },
    'void.startEditingKey' : () {
        
         
        
        Gtk.TreeIter iter;
        Gtk.TreeModel mod;
        
        var s = this.view.get_selection();
        s.get_selected(out mod, out iter);
             
      
        // others... - fill in options for true/false?
        
        this.keyrender.el.editable = true;
        this.view.el.set_cursor_on_cell(
            mod.get_path(iter),
            this.keycol.el,
            this.keyrender.el,
            true
        );
        
        
    },
    'void:addProp' : function(string type, string key, string value) {
          // info includes key, val, skel, etype..
          //console.dump(info);
            //type = info.type.toLowerCase();
            //var data = this.toJS();
            
        var node = _this.activeNode;
                
        if (type == "listener") {
            if (node.listeners.has(key)) {
                return;
            }
            node.listeners.set(key,value);
        } else  {
        
            if (node.props.has(key)) {
                return;
            }
            node.props.set(key,value);
        }
               
          
        // add a row???
        this.load(this.file, this.node);
        
        
        
        /// need to find the row which I've just added..
        
        
        var s = this.view.el.get_selection();
        s.unselect_all();
        
        GLib.Value gval;
        
        this.view.foreach((model, path, iter) {
    
            this.model.el.get_value(iter, 0 , out gval);
            if ((string)gval != type) {
                return;
            }
            this.model.el.get_value(iter, 1 , out gval);
            if ((string)gval != key) {
                return;
            }
            s.set_selection(iter); 
        });
        
        
        this.startEditingValue();
                  
    },
    'void:deleteSelected' : () {
        
                Gtk.TreeIter iter;
                Gtk.TreeModel mod;
                
                var s = this.view.get_selection();
                s.get_selected(out mod, out iter);
                     
                      
                GLib.Value gval;
                mod.get_value(iter, 0 , out gval);
                var type = (string)gval;
                
                mod.get_value(iter, 1 , out gval);
                var key = (string)gval;
                
                switch(type) {
                    case "listener":
                        this.node.listeners.remove(key);
                        break;
                        
                    case "prop":
                        this.node.prop.remove(key);
                        break;
                }
                this.load(dthis.file, this.node);
                
                this.file.changed("prop");
    },
    items : [
        {
            xtype: Gtk.HBox,
            pack : "pack_start,false,true,0",
            items : [
                {
                    xtype: Gtk.Button,
                    listeners : {
                        button_press_event : ( event ) => {
                            _this.showAddProps("prop");
                            return false;
                        }
                    },
                    pack : "add",
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
                    listeners : {
                        button_press_event : function ( event)  => {
                            
                        // 	if (!this.get('/Editor').save()) {
                        // 	    // popup!! - click handled.. 
                        // 	    return true;
                        //        }
                            _this.showAddProps("'events");
                            return false;
                        }
                    },
                    pack : "add",
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
                    listeners : {
                        button_press_event : function (self, ev) {
                        
                         	if (!this.get('/Editor').save()) {
                         	    // popup!! - click handled.. 
                         	    return true;
                                }
                                
                        	var p = this.AddPropertyPopup;
                         	p.el.set_screen(Gdk.Screen.get_default());
                                p.el.show_all();
                                 p.el.popup(null, null, null, 3, ev.button.time);
                            return true;
                        }
                    },
                    pack : "add",
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
                                    listeners : {
                                        activate : ()  => {
                                            _this.addProp( "prop", ".string:id", "");
                                        }
                                    },
                                    label : "ID",
                                    pack : "append",
                                    tooltip_markup : "Using this.get('*someid') will find any id in an application."
                                },
                                {
                                    xtype: Gtk.MenuItem,
                                    listeners : {
                                        activate : ( ) => {
                                        
                                            _this.addProp( "prop", "*pack","add");
                                        }
                                    },
                                    label : "PACK",
                                    pack : "append",
                                    tooltip_markup : "Add what type of packing is to be used"
                                },
                                {
                                    xtype: Gtk.MenuItem,
                                    listeners : {
                                        activate : ( ) => {
                                        
                                            this.addProp( "prop",  "|init", "{\n\n}\n" );
                                        }
                                    },
                                    label : "INIT",
                                    pack : "append",
                                    tooltip_markup : "Override the init method"
                                },
                                {
                                    xtype: Gtk.SeparatorMenuItem,
                                    pack : "add"
                                },
                                {
                                    xtype: Gtk.MenuItem,
                                    listeners : {
                                        activate : function (self) {
                                        
                                            _this.addProp( "prop", ".string:XXXX", "");
                                        
                                        }
                                    },
                                    label : "String",
                                    pack : "append",
                                    tooltip_markup : "Add a user defined string property"
                                },
                                {
                                    xtype: Gtk.MenuItem,
                                    listeners : {
                                        activate : ( ) =>{
                                        
                                            _this.addProp("prop",  ".int:XXX", "0");
                                        }
                                    },
                                    label : "Number",
                                    pack : "append",
                                    tooltip_markup : "Add a user defined number property"
                                },
                                {
                                    xtype: Gtk.MenuItem,
                                    listeners : {
                                        activate : ( ) =>{
                                        
                                            _this.addProp( "prop", ".bool:XXX", "true");
                                        }
                                    },
                                    label : "Boolean",
                                    pack : "append",
                                    tooltip_markup : "Add a user defined boolean property"
                                },
                                {
                                    xtype: Gtk.SeparatorMenuItem,
                                    pack : "add"
                                },
                                {
                                    xtype: Gtk.MenuItem,
                                    listeners : {
                                        activate : ( ) =>{
                                        
                                            _this.addProp("prop",  "|XXXX", "function() { }");
                                        }
                                    },
                                    label : "Javascript Function",
                                    pack : "append",
                                    tooltip_markup : "Add a user function boolean property"
                                },
                                {
                                    xtype: Gtk.MenuItem,
                                    listeners : {
                                        activate : ( ) =>{
                                        
                                            _this.addProp( "prop", "|.type:return_type:XXXX", "() {\n\n}\n");
                                        }
                                    },
                                    label : "Vala Method",
                                    pack : "append",
                                    tooltip_markup : "Add a user function boolean property"
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype: Gtk.ScrolledWindow,
            id : "EditProps",
            pack : "add",
            init : {
              
               this.el.set_policy (Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC);
            },
            shadow_type : Gtk.ShadowType.IN,
            items : [
                {
                    xtype: Gtk.TreeView,
                    listeners : {
                        button_press_event : function ( ev)  => {
                        
                            _this.beforeEdit();
                            
                            Gtk.TreeViewColumn col;
                            int cell_x;
                            int cell_y;
                            Gtk.TreePath path
                            if (!this.el.get_path_at_pos(ev.x,ev.y, out path, out col, out cell_x, out cell_y )) {
                                return false; //not on a element.
                            }
                            
                             // right click.
                             if (ev.type == Gdk.EventType.BUTTON_PRESS  && ev.button == 3) {    
                                // show popup!.   
                                if (col.title == "value" && this.EditProps.editing) {
                                    return false;
                                }
                        
                                var p = this.ContextMenu;
                        
                                p.el.set_screen(Gdk.Screen.get_default());
                                p.el.show_all();
                                p.el.popup(null, null, null, null, 3, ev.button.time);
                                //Seed.print("click:" + res.column.title);
                                
                                
                                return false;
                            }
                            
                             
                            if (col.title != "value") {
                                  //  XObject.error("column is not value?");
                                return false; // ignore.. - key click.. ??? should we do this??
                            }
                            
                            // currently editing???
                        //    if (  this.activePath) {
                                
                             //   this.activePath = false;
                               // stop editing!!!!
                             /*
                                if (this.get('/Editor').dirty) {
                                    //if (!this.get('/Editor.buffer').checkSyntax()) {
                                    //   this.get('/StandardErrorDialog').show("Fix errors in code and save.."); 
                                    //   return true;
                                    //    // error Dialog
                                    //}
                                    if (!this.get('/Editor.view').save()) {
                                        return true;
                                    }
                                }   
                                */
                                this.keycol.el.stop_editing();
                                this.valcol.el.stop_editing();
                                
                                //this.EditProps.editableColumn.items[0].el.stop_editing();
                                this.EditProps.editing = false;
                            
                            //    XObject.error("Currently editing?");
                             //   return false;
                           // }
                            
                            var renderer = this.valrender.el; // set has_entry..
                            
                            //var type = this.get('/LeftPanel.model').getType(res.path.to_string());
                                
                            // get options for this type -- this is to support option lists etc..
                            //var provider = this.get('/LeftTree').getPaleteProvider();
                            //var opts = provider.findOptions(type);
                            
                        //    if (opts === false) {
                                // it's text etnry
                        //         this.get('/LeftPanel').editableColumn.setOptions([]);
                        //        renderer.has_entry = true;
                        //    } else {
                        //         this.get('/LeftPanel').editableColumn.setOptions(opts);
                        //        renderer.has_entry = false;
                        //    }
                            _this.startEditing(res.path.to_string(), 1);
                                
                           //Seed.print("click" + ev.type);
                            //console.dump(res);
                            return false;
                        
                                      
                           
                        }
                    },
                    id : "view",
                    tooltip_column : 5,
                    enable_tree_lines : true,
                    headers_visible : false,
                    init : {
                        var selection = this.el.get_selection();
                        selection.set_mode( Gtk.SelectionMode.SINGLE);
                    
                    
                        var description = new Pango.FontDescription.c_new();
                        description.set_size(8000);
                        this.el.modify_font(description);
                    },
                    items : [
                        {
                            xtype: Gtk.TreeStore,
                            columns : "    typeof(Object),  // 0 real key\n    typeof(string),  // 1 property type (prop|event)\n    typeof(string),  // 2 real key\n    typeof(string),  // 4 visable key\n    typeof(string)  // 5 visable value\n     ",
                            id : "model",
                            n_columns : 6,
                            pack : "set_model",
                            changed : function(str, doRefresh) {
                                if (!this.activePath) {
                                    return;
                                }
                                var iter = new Gtk.TreeIter();
                                this.el.get_iter(iter, new Gtk.TreePath.from_string(this.activePath));
                                
                                this.el.set_value(iter, 1, '' +str);
                                this.el.set_value(iter, 3, '' + this.toShort(str));
                                var type = this.getIterValue(iter, 4);
                            
                                this.el.set_value(iter, 5, type + ' : ' + str);
                                // update the tree...  
                            
                                this.get('/LeftTree.model').changed(this.toJS(), doRefresh); 
                            },
                            toShort : function(str) {
                                var a = typeof(str) == 'string' ? str.split("\n") : [];
                                    return a.length > 1 ? a[0] + '....' : '' + str;
                            }
                        },
                        {
                            xtype: Gtk.TreeViewColumn,
                            id : "keycol",
                            pack : "append_column",
                            title : "key",
                            init : this.el.add_attribute(this.keyrender.el , "markup", 2 );,
                            items : [
                                {
                                    xtype: Gtk.CellRendererText,
                                    listeners : {
                                        editing_started : (  editable, path) => {
                                        
                                             //   this.get('/LeftPanel.model').activePath  = path;
                                        
                                        },
                                        edited : (path, newtext) => {
                                        
                                        
                                        
                                                Gtk.TreeIter  iter;
                                                _this.model.el.get_iter(iter, new Gtk.TreePath.from_string(path));
                                                _this.model.el.set_value(iter, 0, newtext);
                                                this.model.el.set_value(iter, 2, p0);
                                                
                                        	//model.activePath = false;
                                                _this.changed();
                                                this.el.editable = false;
                                        }
                                    },
                                    id : "keyrender",
                                    pack : "pack_start"
                                }
                            ]
                        },
                        {
                            xtype: Gtk.TreeViewColumn,
                            id : "valcol",
                            pack : "append_column",
                            title : "value",
                            init : {
                            	this.el.add_attribute(this.valrender.el , 'text', 3 );
                            	this.el.add_attribute(this.valrender.el , 'sensitive', 3 );
                            	//this.el.add_attribute(this.items[0].el , 'editable', 3 );
                                      // this.el.set_cell_data_func(cell, age_cell_data_func, NULL, NULL);
                            
                             //	this.get('/LeftPanel').editableColumn= this;
                            },
                            items : [
                                {
                                    xtype: Gtk.CellRendererCombo,
                                    listeners : {
                                        edited : ( treepath, str) => {
                                         	_this .editing = false;
                                         	
                                         	//var ap = this.get('/LeftPanel.model').activePath
                                        	//print("EDITED? "  + ap + " - p:" + p0 + " t:" + p0);
                                                _this.setCurrentValue(str, true);
                                                //this.get('/LeftPanel.model').activePath = false;
                                                this.el.editable = false;
                                        },
                                        editing_started : ( editable, path) {
                                            _this.editing = true;
                                            this.el.editable = false; // make sure it's not editor...
                                           
                                        }
                                    },
                                    editable : "false",
                                    id : "valrender",
                                    pack : "pack_start",
                                    text_column : 0,
                                    has_entry : true,
                                    model : {
                                        xtype: Gtk.ListStore,
                                        columns : "typeof(string)",
                                        n_columns : 1,
                                        pack : false
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: Gtk.Menu,
                    id : "ContextMenu",
                    pack : false,
                    items : [
                        {
                            xtype: Gtk.MenuItem,
                            listeners : {
                                activate : ( )  =>{
                                	_this.deleteSelected();
                                }
                            },
                            label : "Delete",
                            pack : "append"
                        },
                        {
                            xtype: Gtk.MenuItem,
                            listeners : {
                                activate : ( ) => {
                                    _this.startEditing(false, 0);
                                }
                            },
                            label : "Edit",
                            pack : "append"
                        }
                    ]
                }
            ]
        }
    ]
});
WindowLeftProps.init();
XObject.cache['/WindowLeftProps'] = WindowLeftProps;
