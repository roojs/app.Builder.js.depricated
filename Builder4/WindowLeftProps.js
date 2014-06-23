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
    'void:addProp' : (string type, string key, string value) {
          // info includes key, val, skel, etype..
          //console.dump(info);
            //type = info.type.toLowerCase();
            //var data = this.toJS();
            
     
                
        if (type == "listener") {
            if (this.node.listeners.has_key(key)) {
                return;
            }
            this.node.listeners.set(key,value);
        } else  {
        
            if (this.node.props.has_key(key)) {
                return;
            }
            this.node.props.set(key,value);
        }
               
          
        // add a row???
        this.load(this.file, this.node);
        
        
        
        /// need to find the row which I've just added..
        
        
        var s = this.view.el.get_selection();
        s.unselect_all();
        
        GLib.Value gval;
        
        this.view.el.foreach((model, path, iter) => {
    
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
    'void:before_edit' : ()
    {
    _this.keyrender.el.stop_editing(false);
    _this.valrender.el.stop_editing(false);
    // technicall stop the popup editor..
    
    },
    'void:deleteSelected' : () {
        
                Gtk.TreeIter iter;
                Gtk.TreeModel mod;
                
                var s = this.view.el.get_selection();
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
                        this.node.props.remove(key);
                        break;
                }
                this.load(this.file, this.node);
                
                _this.changed();
    },
    'void:load' : (JsRender.JsRender file, JsRender.Node? node) 
    {
        
        this.before_edit();
        this.node = node;
        this.file = file;
        
     
        this.model.el.clear();
                  
        //this.get('/RightEditor').el.hide();
        if (node ==null) {
            return ;
        }
         
        
    
        //var provider = this.get('/LeftTree').getPaleteProvider();
        Gtk.TreeIter iter;
        
        
        // really need a way to sort the hashmap...
        var m = this.model.el;
        
        var miter = node.listeners.map_iterator();
        
        while(miter.next()) {
            m.append(out iter,null);
            m.set(iter, 
                    0, "listener",
                    1, miter.get_key(),
                    2, "<b>" + miter.get_key() + "</b>",
                    3, miter.get_value()
                ); 
         }
         
          
        miter = node.props.map_iterator();
        
        
       while(miter.next()) {
            m.append(out iter,null);
            m.set(iter, 
                    0, "props",
                    1, miter.get_key(),
                    2,  miter.get_key() ,
                    3, miter.get_value()
                ); 
       }
        
    },
    'void:startEditingKey' : () {
        
         
        
        Gtk.TreeIter iter;
        Gtk.TreeModel mod;
        
        var s = this.view.el.get_selection();
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
    'void:startEditingValue' : () {
                
                 
                
                Gtk.TreeIter iter;
                Gtk.TreeModel mod;
                
                var s = this.view.el.get_selection();
                s.get_selected(out mod, out iter);
                     
                /*
                    m.set(iter, 
                            0, "listener",
                            1, miter.get_key(),
                            2, "<b>" + miter.get_key() + "</b>",
                            3, miter.get_value()
                        ); 
                 
                */
                GLib.Value gval;
                mod.get_value(iter, 3 , out gval);
                var val = (string)gval;
            
                mod.get_value(iter, 1 , out gval);
                var key = (string)gval;
                
                mod.get_value(iter, 0 , out gval);
                var type = (string)gval;
                
                var use_textarea = false;
                
                if (type == "listener") {
                    use_textarea = true;
                }
                if (key.length > 0 && key[0] == '|') {
                    use_textarea = true;
                }
                if (use_textarea) {
                    this.show_editor(file, node, type, key);
                    return;
                }
                // others... - fill in options for true/false?
                
                this.keyrender.el.editable = true;
                this.view.el.set_cursor_on_cell(
                    mod.get_path(iter),
                    this.valcol.el,
                    this.valrender.el,
                    true
                );
                
                
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
                            _this.show_add_props("prop");
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
                        button_press_event : ( event)  => {
                            
                        // 	if (!this.get('/Editor').save()) {
                        // 	    // popup!! - click handled.. 
                        // 	    return true;
                        //        }
                            _this.show_add_props("listener");
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
                        button_press_event : (self, ev) => {
                            _this.before_edit();
                            
                                
                            var p = _this.AddPropertyPopup;
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
                                        
                                            _this.addProp( "prop",  "|init", "{\n\n}\n" );
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
                                        activate : (self) => {
                                        
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
                        button_press_event : ( ev)  => {
                        
                            _this.before_edit();
                            
                            Gtk.TreeViewColumn col;
                            int cell_x;
                            int cell_y;
                            Gtk.TreePath path;
                            if (!this.el.get_path_at_pos((int)ev.x, (int) ev.y, out path, out col, out cell_x, out cell_y )) {
                                return false; //not on a element.
                            }
                            
                             // right click.
                             if (ev.type == Gdk.EventType.BUTTON_PRESS  && ev.button == 3) {    
                                // show popup!.   
                                if (col.title == "value") {
                                    return false;
                                }
                        
                                var p = _this.ContextMenu;
                        
                                p.el.set_screen(Gdk.Screen.get_default());
                                p.el.show_all();
                                p.el.popup(null, null, null,  ev.button, ev.time);
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
                                
                                //this.EditProps.editableColumn.items[0].el.stop_editing();
                                //this.EditProps.editing = false;
                            
                            //    XObject.error("Currently editing?");
                             //   return false;
                           // }
                            
                           // var renderer = this.valrender.el; // set has_entry..
                            
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
                            _this.startEditingValue(); // assumes selected row..
                                
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
                    
                    
                        var description = new Pango.FontDescription();
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
                            init : this.el.add_attribute(_this.keyrender.el , "markup", 2 );,
                            items : [
                                {
                                    xtype: Gtk.CellRendererText,
                                    listeners : {
                                        editing_started : (  editable, path) => {
                                        
                                             //   this.get('/LeftPanel.model').activePath  = path;
                                        
                                        },
                                        edited : (path, newtext) => {
                                        /*
                                         m.set(iter, 
                                                        0, "listener",
                                                        1, miter.get_key(),
                                                        2, "<b>" + miter.get_key() + "</b>",
                                                        3, miter.get_value()
                                                    ); 
                                        
                                          */      
                                        
                                                Gtk.TreeIter  iter;
                                                _this.model.el.get_iter(out iter, new Gtk.TreePath.from_string(path));
                                                GLib.Value gval;
                                                
                                                 _this.model.el.get_value(iter,1, out gval);
                                                var oldval = (string)gval;
                                                
                                                 _this.model.el.get_value(iter,0, out gval);
                                                var ktype = (string)gval;
                                               
                                                _this.model.el.set_value(iter, 1, newtext);
                                                
                                                
                                                switch(ktype) {
                                                    case "listener":
                                                        _this.node.listeners.set(newtext, _this.node.listeners.get(oldval));
                                                        _this.node.listeners.remove(oldval);
                                                        break;
                                                    case "prop":
                                                        _this.node.props.set(newtext, _this.node.props.get(oldval));
                                                        _this.node.props.remove(oldval);
                                                        break;
                                                 }
                                                 _this.changed();
                                                  
                                        }
                                    },
                                    id : "keyrender",
                                    pack : "pack_start,false"
                                }
                            ]
                        },
                        {
                            xtype: Gtk.TreeViewColumn,
                            id : "valcol",
                            pack : "append_column",
                            title : "value",
                            init : {
                            	this.el.add_attribute(_this.valrender.el , "text", 3 );
                            	this.el.add_attribute(_this.valrender.el , "sensitive", 3 );
                            	//this.el.add_attribute(this.items[0].el , 'editable', 3 );
                                      // this.el.set_cell_data_func(cell, age_cell_data_func, NULL, NULL);
                            
                             //	this.get('/LeftPanel').editableColumn= this;
                            },
                            items : [
                                {
                                    xtype: Gtk.CellRendererCombo,
                                    listeners : {
                                        edited : (path, newtext) => {
                                                this.el.editable = false;
                                        /*  
                                         m.set(iter, 
                                                        0, "listener",
                                                        1, miter.get_key(),
                                                        2, "<b>" + miter.get_key() + "</b>",
                                                        3, miter.get_value()
                                                    ); 
                                        
                                          */      
                                        
                                                Gtk.TreeIter  iter;
                                                _this.model.el.get_iter(out iter, new Gtk.TreePath.from_string(path));
                                                GLib.Value gval;
                                                
                                                 _this.model.el.get_value(iter,0, out gval);
                                                var ktype = (string)gval;
                                                
                                                
                                                 _this.model.el.get_value(iter,3, out gval);
                                                var oldval = (string)gval;
                                                
                                                 _this.model.el.get_value(iter,1, out gval);
                                                var key = (string)gval;
                                                
                                                 
                                                
                                                switch(ktype) {
                                                    case "listener":
                                                        _this.node.listeners.set(key, newtext);
                                                        break;
                                                    case "prop":
                                                        _this.node.props.set(key,newtext);
                                                        break;
                                                 }
                                                 _this.load(_this.file,_this.node);
                                                 _this.changed();
                                                  
                                        },
                                        editing_started : ( editable, path) => {
                                            //_this.editing = true;
                                            this.el.editable = false; // make sure it's not editor...
                                           
                                        }
                                    },
                                    id : "valrender",
                                    pack : "pack_start,true",
                                    text_column : 0,
                                    editable : false,
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
                                	_this.startEditingKey();
                                }
                            },
                            label : "Edit",
                            pack : "append"
                        },
                        {
                            xtype: Gtk.MenuItem,
                            listeners : {
                                activate : ( )  =>{
                                	_this.deleteSelected();
                                }
                            },
                            label : "Delete",
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
