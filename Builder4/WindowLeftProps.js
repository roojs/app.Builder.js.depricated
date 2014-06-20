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
    items : [
        {
            xtype: Gtk.HBox,
            pack : "pack_start,false,true,0",
            items : [
                {
                    xtype: Gtk.Button,
                    listeners : {
                        button_press_event : ( event ) => {
                            _this.showAddProps();
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
                        button_press_event : function (self, event) {
                            
                         	if (!this.get('/Editor').save()) {
                         	    // popup!! - click handled.. 
                         	    return true;
                                }
                                this.get('/MidPropTree.model').showData('events');
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
                                
                        	var p = this.get('/AddPropertyPopup');
                        	if (!p.el) {
                        		p.init();
                        	}
                         	p.el.set_screen(Gdk.Screen.get_default());
                                p.el.show_all();
                                 p.el.popup(null, null, null, null, 3, ev.button.time);
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
                                    pack : "append",
                                    tooltip_markup : "Using this.get('*someid') will find any id in an application.",
                                    label : "ID",
                                    listeners : {
                                        activate : function (self) {
                                        
                                            this.get('/LeftPanel.model').add( {
                                                key : 'id', 
                                                type : 'string',
                                                val : '',
                                                //skel  : skel,
                                                etype : 'props'
                                            });
                                        }
                                    }
                                },
                                {
                                    xtype: Gtk.MenuItem,
                                    pack : "append",
                                    tooltip_markup : "Add what type of packing is to be used",
                                    label : "PACK",
                                    listeners : {
                                        activate : function (self) {
                                        
                                            this.get('/LeftPanel.model').add( {
                                            	 key : 'pack', 
                                               	 type : 'string',
                                               	 val : 'add',
                                                  etype : 'props'
                                            });
                                        }
                                    }
                                },
                                {
                                    xtype: Gtk.MenuItem,
                                    pack : "append",
                                    tooltip_markup : "Override the init method",
                                    label : "INIT",
                                    listeners : {
                                        activate : function (self) {
                                        
                                            this.get('/LeftPanel.model').add( {
                                               key : '|init', 
                                                type : 'function',
                                                val  : "function() {\n    XObject.prototype.init.call(this);\n}\n",
                                                etype : 'props'
                                            });
                                        }
                                    }
                                },
                                {
                                    xtype: Gtk.SeparatorMenuItem,
                                    pack : "add"
                                },
                                {
                                    xtype: Gtk.MenuItem,
                                    pack : "append",
                                    tooltip_markup : "Add a user defined string property",
                                    label : "String",
                                    listeners : {
                                        activate : function (self) {
                                        
                                            this.get('/LeftPanel.model').add( {
                                          		  key : '', 
                                                        type : 'string',
                                                        val  : "",
                                                        etype : 'props'
                                            });
                                        }
                                    }
                                },
                                {
                                    xtype: Gtk.MenuItem,
                                    pack : "append",
                                    tooltip_markup : "Add a user defined number property",
                                    label : "Number",
                                    listeners : {
                                        activate : function (self) {
                                        
                                            this.get('/LeftPanel.model').add( {
                                          		  key : '', 
                                                        type : 'number',
                                                        val  : 0,
                                                        etype : 'props'
                                            });
                                        }
                                    }
                                },
                                {
                                    xtype: Gtk.MenuItem,
                                    pack : "append",
                                    tooltip_markup : "Add a user defined boolean property",
                                    label : "Boolean",
                                    listeners : {
                                        activate : function (self) {
                                        
                                            this.get('/LeftPanel.model').add( {
                                          		  key : '', 
                                                        type : 'boolean',
                                                        val  : false,
                                                        etype : 'props'
                                            });
                                        }
                                    }
                                },
                                {
                                    xtype: Gtk.SeparatorMenuItem,
                                    pack : "add"
                                },
                                {
                                    xtype: Gtk.MenuItem,
                                    pack : "append",
                                    tooltip_markup : "Add a user function boolean property",
                                    label : "Function",
                                    listeners : {
                                        activate : function (self) {
                                        
                                            this.get('/LeftPanel.model').add( {
                                          	    key : '|', 
                                                                type : 'function',
                                                                val  : "function() {\n    \n}\n",
                                                                etype : 'props'
                                            });
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype: Gtk.ScrolledWindow,
            editing : false,
            id : "EditProps",
            pack : "add",
            init : function() {
                XObject.prototype.init.call(this);
               this.el.set_policy (Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC);
            },
            shadow_type : Gtk.ShadowType.IN,
            items : [
                {
                    xtype: Gtk.TreeView,
                    listeners : {
                        button_press_event : function (self, ev) {
                        
                            
                            if (!this.get('/Editor').save()) {
                                // popup!! - click handled.. 
                                return true;
                            }
                            var res = { }; 
                            
                            if (!this.el.get_path_at_pos(ev.button.x,ev.button.y, res)) {
                                return false; //not on a element.
                            }
                            
                             // right click.
                             if (ev.type == Gdk.EventType.BUTTON_PRESS  && ev.button.button == 3) {    
                                // show popup!.   
                                if (res.column.title == 'value' && this.get('/LeftPanel').editing) {
                                    return false;
                                }
                                //if (! this.get('/LeftPanelPopup')LeftPanelPopup.el) LeftPanelPopup.init();
                                var p = this.get('/LeftPanelPopup');
                                if (!p.el) {
                                    p.init();
                                }
                        
                                p.el.set_screen(Gdk.Screen.get_default());
                                p.el.show_all();
                                p.el.popup(null, null, null, null, 3, ev.button.time);
                                //Seed.print("click:" + res.column.title);
                                
                                
                                return false;
                            }
                            
                             
                            if (res.column.title != 'value') {
                                  //  XObject.error("column is not value?");
                                return false; // ignore.. - key click.. ??? should we do this??
                            }
                            
                            // currently editing???
                        //    if (  this.activePath) {
                                
                             //   this.activePath = false;
                               // stop editing!!!!
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
                                this.get('/LeftPanel').editableColumn.items[0].el.stop_editing();
                                this.get('/LeftPanel').editing = false;
                            
                            //    XObject.error("Currently editing?");
                             //   return false;
                           // }
                            
                            var renderer = this.get('/LeftPanel').editableColumn.items[0].el; // set has_entry..
                            
                            var type = this.get('/LeftPanel.model').getType(res.path.to_string());
                                
                            // get options for this type -- this is to support option lists etc..
                            var provider = this.get('/LeftTree').getPaleteProvider();
                            var opts = provider.findOptions(type);
                            
                            if (opts === false) {
                                // it's text etnry
                                 this.get('/LeftPanel').editableColumn.setOptions([]);
                                renderer.has_entry = true;
                            } else {
                                 this.get('/LeftPanel').editableColumn.setOptions(opts);
                                renderer.has_entry = false;
                            }
                            this.get('/LeftPanel.model').startEditing(res.path.to_string(), 1);
                                
                           //Seed.print("click" + ev.type);
                            //console.dump(res);
                            return false;
                        
                                      
                           
                        }
                    },
                    id : "view",
                    tooltip_column : 5,
                    enable_tree_lines : true,
                    headers_visible : false,
                    init : function() {
                         XObject.prototype.init.call(this); 
                                           
                                        this.selection = this.el.get_selection();
                                        this.selection.set_mode( Gtk.SelectionMode.SINGLE);
                                     
                                        
                                        var description = new Pango.FontDescription.c_new();
                                        description.set_size(8000);
                                        this.el.modify_font(description);
                    },
                    items : [
                        {
                            xtype: Gtk.TreeStore,
                            activePath : false,
                            id : "model",
                            pack : "set_model",
                            add : function(info) {
                                  // info includes key, val, skel, etype..
                                          console.dump(info);
                                        type = info.type.toLowerCase();
                                        var data = this.toJS();
                                        
                                        if (info.etype == 'events') {
                                            data.listeners = data.listeners || { };
                                            if (typeof(data.listeners[info.key]) != 'undefined') {
                                                return; //already set!
                                            }
                                        } else {
                                            if (typeof(data[info.key]) != 'undefined') {
                                                return;
                                            }
                                        }
                                        
                                        if (typeof(info.val) == 'undefined') {
                                                
                                            info.val = '';
                                            if (info.type.toLowerCase() == 'boolean') {
                                                info.val = true;
                                            }
                                            if (type == 'number') {
                                                info.val = 0;
                                            }
                                            // utf8 == string..
                                            
                                            
                                        }
                                        var k = info.key;
                                        if (info.etype == 'events') {
                                         
                                            data.listeners[info.key] = info.val;
                                            k = '!' + info.key;
                                        } else {
                                            data[info.key] = info.val;
                                        }
                                        
                                        
                                        var map = this.load(data);
                                        
                                        // flag it as changed to the interface..
                            
                                        this.get('/LeftTree.model').changed(data, true); 
                                        
                                        
                                        this.startEditing(map[k]);
                                         
                                        /*
                                        LeftPanel.get('view').el.row_activated(
                                            new Gtk.TreePath.from_string(map[k]), 
                                            LeftPanel.editableColumn.el
                                        );
                                        */
                            },
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
                            init : function() {
                                XObject.prototype.init.call(this);
                            this.el.set_column_types ( 6, [
                                                            GObject.TYPE_STRING,  // 0 real key
                                                            GObject.TYPE_STRING, // 1 real value 
                                                             GObject.TYPE_STRING,  // 2 visable key
                                                             GObject.TYPE_STRING, // 3 visable value
                                                             GObject.TYPE_STRING, // 4 need to store type of!!!
                                                              GObject.TYPE_STRING // 5 tooltip
                                                          
                                                        ]);
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
                            pack : "append_column",
                            init : function() {
                                XObject.prototype.init.call(this);
                            
                                this.el.add_attribute(this.items[0].el , 'markup', 2 );
                                this.get('/LeftPanel').propertyColumn = this;
                            },
                            title : "key",
                            items : [
                                {
                                    xtype: Gtk.CellRendererText,
                                    pack : "pack_start",
                                    listeners : {
                                        editing_started : function (self, editable, path) {
                                        
                                                this.get('/LeftPanel.model').activePath  = path;
                                        
                                        },
                                        edited : function (self, object, p0) {
                                        	var model = this.get('/LeftPanel.model');
                                                var path = model.activePath;
                                                var iter = new Gtk.TreeIter();
                                                model.el.get_iter(iter, new Gtk.TreePath.from_string(path));
                                                model.el.set_value(iter, 0, p0);
                                                model.el.set_value(iter, 2, p0);
                                                
                                        	model.activePath = false;
                                        
                                        	this.get('/LeftTree.model').changed(model.toJS(), true); 
                                                this.el.editable = false;
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: Gtk.TreeViewColumn,
                            pack : "append_column",
                            title : "value",
                            init : function() {
                                XObject.prototype.init.call(this);
                            	this.el.add_attribute(this.items[0].el , 'text', 3 );
                            	this.el.add_attribute(this.items[0].el , 'sensitive', 3 );
                            	//this.el.add_attribute(this.items[0].el , 'editable', 3 );
                                      // this.el.set_cell_data_func(cell, age_cell_data_func, NULL, NULL);
                            
                             	this.get('/LeftPanel').editableColumn= this;
                            },
                            setOptions : function(ar) {
                                   var m = this.items[0].el.model;
                                        m.clear();
                                        var iter = new Gtk.TreeIter();
                                        ar.forEach(function(i) {
                                               // sort!!!?
                                            m.append(iter);
                                            m.set_value(iter, 0, i);
                                        });
                                        
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
                                    editable : false,
                                    pack : "pack_start",
                                    text_column : 0,
                                    has_entry : true,
                                    init : function() {
                                        XObject.prototype.init.call(this);
                                       this.el.model = new Gtk.ListStore();
                                        this.el.model.set_column_types ( 1, [
                                            GObject.TYPE_STRING  // 0 real key
                                          ]);
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
