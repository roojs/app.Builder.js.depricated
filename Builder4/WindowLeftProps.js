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
     : function(string type, string key, string value) {
          // info includes key, val, skel, etype..
          //console.dump(info);
            //type = info.type.toLowerCase();
            //var data = this.toJS();
            
        var node = _this.activeNode;
                
        if (type == "events") {
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
        
                
        this.startEditing(type, key);
                  
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
                                            _this.addProp( ".string:id", "");
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
                                        
                                            _this.addProp( "*pack","add");
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
                                        
                                            this.addProp( "|init", "{\n\n}\n" );
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
                                        
                                            _this.addProp( ".string:XXXX", "");
                                        
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
                                        
                                            _this.addProp( ".int:XXX", "0");
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
                                        
                                            _this.addProp( ".bool:XXX", "true");
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
                                        
                                            _this.addProp( "|XXXX", "function() { }");
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
                                        
                                            _this.addProp( "|.type:return_type:XXXX", "() {\n\n}\n");
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
                            columns : " typeof(string),  // 0 real key\n                                typeof(string), // 1 real value \n                                 typeof(string),  // 2 visable key\n                                 typeof(string), // 3 visable value\n                                 typeof(string), // 4 need to store type of!!!\n                                  typeof(string)",
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
                            deleteSelected : function() {
                                 var data = this.toJS();
                                var iter = new Gtk.TreeIter();
                                var s = this.get('/LeftPanel.view').selection;
                                s.get_selected(this.el, iter);
                                     
                                   
                                var gval = new GObject.Value('');
                               this.get('/LeftPanel.model').el.get_value(iter, 0 ,gval);
                                
                                var val = gval.value;
                                if (val[0] == '!') {
                                    // listener..
                                    if (!data.listeners || typeof(data.listeners[  val.substring(1)]) == 'undefined') {
                                        return;
                                    }
                                    delete data.listeners[  val.substring(1)];
                                    if (!XObject.keys(data.listeners).length) {
                                        delete data.listeners;
                                    }
                                    
                                } else {
                                    if (typeof(data[val]) == 'undefined') {
                                        return;
                                    }
                                    delete data[val];
                                }
                                
                                
                                this.load(data);
                                this.get('/LeftTree.model').changed(data, true);
                                
                            },
                            getIterValue : function(iter, col) {
                                 var gval = new GObject.Value('');
                                this.get('/LeftPanel.model').el.get_value(iter, col ,gval);
                                return '' + gval.value;
                            },
                            getType : function(treepath) {
                                 return this.getValue(treepath, 4);
                            },
                            getValue : function(treepath_str, col) 
                            {
                               // get's the  value in a row.. - keys - returns string, values - formats it..
                            
                                var iter = new Gtk.TreeIter();
                                this.el.get_iter(iter, new Gtk.TreePath.from_string(treepath_str));
                                
                                var gval = new GObject.Value('');
                                this.get('/LeftPanel.model').el.get_value(iter, col ,gval);
                                var val = '' + gval.value;
                               
                                if (col != 1) {
                                    return val;
                                }
                                var type = this.getType(this.el.get_path(iter).to_string());
                                //print("TYPE: " +type + " -  val:" + val);
                                switch(type.toLowerCase()) {
                                    case 'number':
                                    case 'uint':
                                    case 'int':
                                        return parseFloat(val); // Nan ?? invalid!!?        
                                    case 'float':
                                    case 'gfloat':
                                        return 1.0 * parseFloat(val); // Nan ?? invalid!!?
                                    case 'boolean':
                                        return val == 'true' ? true : false;
                                    default: 
                                        var nv = parseFloat(val);
                                        if (!isNaN(nv) && (val == ''+nv)) {
                                            return nv;
                                        }
                                        return val;
                                }
                                                        
                            },
                            load : function(ar) {
                            // might casue problesm..
                                // this.get('/Editor.RightEditor').save();
                            
                                   this.get('/Editor').el.hide();
                                 this.get('/Editor').activePath = false;
                            
                            
                              this.el.clear();
                                          
                                //this.get('/RightEditor').el.hide();
                                if (ar === false) {
                                    return ;
                                }
                                var ret = {}; 
                                
                            
                                var provider = this.get('/LeftTree').getPaleteProvider();
                                 var iter = new Gtk.TreeIter();
                                 
                                // sort!!!?
                                var keys  = XObject.keys(ar);
                                keys.sort();
                                ar.listeners = ar.listeners || {};
                                
                                for (var i in ar.listeners ) {
                                    this.el.append(iter);
                                    var p = this.el.get_path(iter).to_string();
                                    ret['!' + i] = p;
                                    
                                    this.el.set_value(iter, 0, '!'+  i  );
                                    this.el.set_value(iter, 1, '' + ar.listeners[i]);
                                    this.el.set_value(iter, 2, '<b>'+ i + '</b>');
                                    
                                    this.el.set_value(iter, 3, '' + this.toShort(ar.listeners[i]));
                                    this.el.set_value(iter, 4, 'function');
                                    this.el.set_value(iter, 5, i + ' : ' + ar.listeners[i]);
                                }
                                
                                
                               
                                var _this = this;
                                keys.forEach(function(i) {
                                    if (typeof(ar[i]) == 'object') {
                                        return;
                                    }
                                    
                                    var type = provider.findType(ar, i, ar[i]);
                                    
                                    _this.el.append(iter);
                                    var p = _this.el.get_path(iter).to_string();
                                    ret[i] = p;
                                    _this.el.set_value(iter, 0, ''+i);
                                    _this.el.set_value(iter, 1, '' + ar[i]);  
                                    _this.el.set_value(iter, 2, ''+i);
                                    _this.el.set_value(iter, 3, ''+ _this.toShort(ar[i]));
                                    _this.el.set_value(iter, 4, ''+type);
                                    _this.el.set_value(iter, 5, type + ' : ' + ar[i]);
                                })
                                return ret;
                            },
                            startEditing : function(path,col) {
                                
                                // alled by menu 'edit' currently..
                                /**
                                * start editing path (or selected if not set..)
                                * @param {String|false} path  (optional) treepath to edit - selected tree gets
                                *     edited by default.
                                * @param {Number} 0 or 1 (optional)- column to edit. 
                                */
                                // fix tp to be the 'treepath' string (eg. 0/1/2...)
                                var tp;
                                if (typeof(path) == 'string') {
                                    tp = new Gtk.TreePath.from_string(path);
                                } else {
                                    var iter = new Gtk.TreeIter();
                                    var s = this.get('/LeftPanel.view').selection;
                                    s.get_selected(this.el, iter);
                                    tp = this.el.get_path(iter);
                                    path = tp.to_string();
                                }
                                
                               
                                // which colum is to be edited..
                                var colObj = false;
                                
                                // not sure what this does..
                                
                                if (typeof(col) == 'undefined') {
                                    var k = this.getValue(path, 0);
                                    col = 1;
                                    colObj = (!k.length || k == '|') ? 
                                        this.get('/LeftPanel').propertyColumn : this.get('/LeftPanel').editableColumn;
                                } else {
                                    colObj = col ? this.get('/LeftPanel').editableColumn : this.get('/LeftPanel').propertyColumn;
                                }
                                
                                // make sure the pulldown is set correctly..
                                // not really needed for second col...
                                var showEditor = false;
                                this.get('/Editor').activePath = false;
                                this.get('/Editor').el.hide();
                                 
                                if (col) {
                                    var provider = this.get('/LeftTree').getPaleteProvider();
                                    var type = this.get('/LeftPanel.model').getType(path);
                                    var opts = provider.findOptions(type);
                                    var renderer = this.get('/LeftPanel').editableColumn.items[0].el;
                                    
                                    if (opts === false) {
                                        this.get('/LeftPanel').editableColumn.setOptions([]);
                                        renderer.has_entry = true; 
                                    } else {
                                        this.get('/LeftPanel').editableColumn.setOptions(opts);
                                        renderer.has_entry = false;/// - pulldowns do not have entries
                                    }
                                    // determine if we should use the Text editor...
                                    var keyname = this.getValue(path, 0);
                                    var data_value = this.getValue(path, 1);
                                
                                    if ((keyname[0] == '|') || 
                                        (   
                                            (typeof(data_value) == 'string' ) && 
                                            ( data_value.match(/function/g) || data_value.match(/\n/g)) // || (data_value.length > 20))
                                        )) {
                                        showEditor = true;
                                    }
                                    print("SHOW EDITOR" + showEditor ? 'YES' :'no');
                                    
                                }
                                var _this = this;    
                                // end editing..
                               // this.get('/BottomPane').el.hide();
                                //this.get('/RightEditor').el.hide();
                                 
                                
                                if (showEditor) {
                            
                                    this.activePath = false;
                                    
                                    _this.get('/Editor').el.show_all();
                                    GLib.timeout_add(0, 1, function() {
                            
                                        //_this.get('/BottomPane').el.show();
                                         //_this.get('/RightEditor').el.show();
                                        
                                        _this.get('/Editor.RightEditor.view').load( _this.getValue(path, 1) );
                                        
                                        _this.get('/Editor').activePath = path;
                                        _this.activePath = path ;
                                      
                                        return false;
                                    });
                                    return;
                                }
                                  
                                
                                
                            
                                // iter now has row...
                                GLib.timeout_add(0, 100, function() {
                                    _this.activePath = path;
                                    colObj.items[0].el.editable = true; // esp. need for col 0..
                                    _this.get('/LeftPanel.view').el.set_cursor_on_cell(
                                        tp,
                                        colObj.el,
                                        colObj.items[0].el,
                                        true
                                    );
                                });
                                
                            },
                            toJS : function() {
                                 var iter = new Gtk.TreeIter();
                                this.get('/LeftPanel.model').el.get_iter_first(iter);
                                var ar = {};
                                   
                                while (true) {
                                    
                                    var k = this.getValue(this.el.get_path(iter).to_string(), 0);
                                   // Seed.print(k);
                                    if (k[0] == '!') {
                                        ar.listeners = ar.listeners || {};
                                        ar.listeners[  k.substring(1)] = this.getValue(this.el.get_path(iter).to_string(), 1);
                                        
                                    } else {
                                        ar[ k ] = this.getValue(this.el.get_path(iter).to_string(), 1);
                                    }
                                    
                                    if (! this.get('/LeftPanel.model').el.iter_next(iter)) {
                                        break;
                                    }
                                }
                                
                                
                                //print(JSON.stringify(ar));
                                return ar;
                                // convert the l
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
                                        edited : function (self, object, p0) {
                                         	this.get('/LeftPanel').editing = false;
                                         	var ap = this.get('/LeftPanel.model').activePath
                                        	print("EDITED? "  + ap + " - p:" + p0 + " t:" + p0);
                                                this.get('/LeftPanel.model').changed(p0, true);
                                                this.get('/LeftPanel.model').activePath = false;
                                                this.el.editable = false;
                                        },
                                        editing_started : function (self, editable, path) {
                                           this.get('/LeftPanel').editing  = true;
                                        	//  console.log('editing started');
                                               // r.has_entry = false;
                                        
                                            this.el.editable = false; // make sure it's not editor...
                                           
                                        }
                                    },
                                    editable : "false",
                                    id : "valrender",
                                    pack : "pack_start",
                                    text_column : 0,
                                    has_entry : true,
                                    init : function() {
                                     
                                       this.el.model = new Gtk.ListStore(1 , typeof(string));
                                    },
                                    model : {
                                        xtype: Gtk.ListStore,
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
                            pack : "append",
                            label : "Delete",
                            listeners : {
                                activate : function (self) {
                                	this.get('/LeftPanel.model').deleteSelected();
                                }
                            }
                        },
                        {
                            xtype: Gtk.MenuItem,
                            pack : "append",
                            label : "Edit",
                            listeners : {
                                activate : function (self) {
                                	this.get('/LeftPanel.model').startEditing(false, 0);
                                }
                            }
                        }
                    ]
                }
            ]
        }
    ]
});
WindowLeftProps.init();
XObject.cache['/WindowLeftProps'] = WindowLeftProps;
