//<Script type="text/javascript">
Gio = imports.gi.Gio;
Gtk = imports.gi.Gtk;
Gdk = imports.gi.Gdk;
GLib = imports.gi.GLib;
GObject = imports.gi.GObject;
Pango = imports.gi.Pango ;

XObject = imports.XObject.XObject;
console = imports.console;


LeftPanelPopup  = imports.Builder.LeftPanelPopup.LeftPanelPopup;
RightEditor     = imports.Builder.RightEditor.RightEditor;
/**
 * 
 * really the properties..
 */


LeftPanel = new XObject({
        
        xtype: Gtk.ScrolledWindow,
        smooth_scroll : true,
        pack : [ 'pack_end', true, true, 0 ],
        shadow_type : Gtk.ShadowType.IN,
        
        editing : false,
        
        init : function () {
            XObject.prototype.init.call(this); 
            this.el.set_policy (Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC);
        },
        
          
    
        
        items : [
            {
                id : 'view',
                
                xtype : Gtk.TreeView,
                
                tooltip_column : 1,
                headers_visible :   false ,
                enable_tree_lines :  true ,
                     
                init : function () {
                    XObject.prototype.init.call(this); 
                       
                    this.selection = this.el.get_selection();
                    this.selection.set_mode( Gtk.SelectionMode.SINGLE);
                 
                    
                    var description = new Pango.FontDescription.c_new();
                    description.set_size(8000);
                    this.el.modify_font(description);
                },     
                listeners : {
                    
                  
                    'button-press-event' : function(tv, ev) {
                        
                        
                        
                        
                        var res = { }; 
                        if (!this.el.get_path_at_pos(ev.button.x,ev.button.y, res)) {
                            return false; //not on a element.
                        }
                        
                        
                        if (ev.type != Gdk.EventType.BUTTON_PRESS  || ev.button.button != 3) {
                            
                            if (res.column.title != 'value') {
                                return false; // ignore..
                            }
                            if (  LeftPanel.editing) {
                                return false;
                            }
                            var renderer = LeftPanel.editableColumn.items[0].el; // set has_entry..
                            LeftPanel.editableColumn.items[0].el.stop_editing();
                            var type = LeftPanel.get('model').getType(res.path.to_string());
                            
                             
                            var LeftTree = imports.Builder.LeftTree.LeftTree;
                            var provider = LeftTree.getPaleteProvider();
                            
                            var opts = provider.findOptions(type);
                            
                            if (opts === false) {
                                LeftPanel.editableColumn.setOptions([]);
                                renderer.has_entry = true;
                            } else {
                                LeftPanel.editableColumn.setOptions(opts);
                                renderer.has_entry = false;
                            }
                            
                            
                            Seed.print("click" + ev.type);
                            //console.dump(res);
                            return false;
                        }
                      
                    
                       
                        if (res.column.title == 'value') {
                            return false;
                        }
                        if (!LeftPanelPopup.el) LeftPanelPopup.init();
                        LeftPanelPopup.el.set_screen(Gdk.Screen.get_default());
                        LeftPanelPopup.el.show_all();
                        LeftPanelPopup.el.popup(null, null, null, null, 3, ev.button.time);
                        Seed.print("click:" + res.column.title);
                        
                        
                        return false;
                        
                    },
                    'row-activated' : function() 
                    {
                        console.print('row activated');  
                          // always set the cmobo entry to not ediable..
                        
                      
                    }

                    
                    
                },
                items : [
                
                    {
                        id : 'model',
                        pack : [ 'set_model' ],
                        xtype : Gtk.ListStore,
                        
                        init : function ()
                        {
                            XObject.prototype.init.call(this); 
                            this.el.set_column_types ( 5, [
                                GObject.TYPE_STRING,  // 0 real key
                                GObject.TYPE_STRING, // 1 real value 
                                 GObject.TYPE_STRING,  // 2 visable key
                                 GObject.TYPE_STRING, // 3 visable value
                                 GObject.TYPE_STRING, // 4 need to store type of!!!
                              
                            ]);
                                    
                            
                         
                        },
                        toShort: function(str) {
                            var a = typeof(str) == 'string' ? str.split("\n") : [];
                            return a.length > 1 ? a[0] + '....' : '' + str;
                        },
                        load : function (ar)
                        {
                            this.el.clear();
                            
                            RightEditor.el.hide();
                            if (ar === false) {
                                return ;
                            }
                            var ret = {}; 
                            
                            var LeftTree = imports.Builder.LeftTree.LeftTree;
                            var provider = LeftTree.getPaleteProvider();
                            
                            // sort!!!?
                            var iter = new Gtk.TreeIter();
                            for (var i in ar) {
                                if (typeof(ar[i]) == 'object') {
                                    continue;
                                }
                                
                                var type = provider.findType(ar, i, ar[i]);
                                
                                this.el.append(iter);
                                var p = this.el.get_path(iter).to_string();
                                ret[i] = p;
                                this.el.set_value(iter, 0, i);
                                this.el.set_value(iter, 1, '' + ar[i]);
                                this.el.set_value(iter, 2, i);
                                this.el.set_value(iter, 3, this.toShort(ar[i]));
                                this.el.set_value(iter, 4, type);
                            }
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
                            }
                            return ret;
                        },
                        
                        
                        
                        add : function( info ) {
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
                                if (info.type == 'boolean') {
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
                            var LeftTree        = imports.Builder.LeftTree.LeftTree;
                            LeftTree.get('model').changed(data, true); 
                            
                            
                            this.startEditing(map[k]);
                             
                            /*
                            LeftPanel.get('view').el.row_activated(
                                new Gtk.TreePath.from_string(map[k]), 
                                LeftPanel.editableColumn.el
                            );
                            */
                            
                            
                        },
                        /**
                         * start editing path (or selected if not set..)
                         * @param {String|false} path  (optional) treepath to edit - selected tree gets
                         *     edited by default.
                         * @param {Number} 0 or 1 (optional)- column to edit. 
                         */
                        startEditing : function(path, col)
                        {
                            // fix tp (treepath) and path string..
                            var tp;
                            if (typeof(path) == 'string') {
                                tp = new Gtk.TreePath.from_string(path);
                            } else {
                                var iter = new Gtk.TreeIter();
                                var s = LeftPanel.get('view').selection;
                                s.get_selected(this.el, iter);
                                tp = this.el.get_path(iter);
                                path = tp.to_string();
                            }
                            
                            // which colum is to be edited..
                            var colObj = false;
                            if (typeof(col) == 'undefined') {
                                colObj = (!k.length || k == '|') ? 
                                    LeftPanel.propertyColumn : LeftPanel.editableColumn;
                            } else {
                                colObj = col ? LeftPanel.editableColumn : LeftPanel.propertyColumn;
                            }
                            
                            // make sure the pulldown is set correctly..
                            // not really needed for second col...
                            var LeftTree = imports.Builder.LeftTree.LeftTree;
                            var provider = LeftTree.getPaleteProvider();
                           
                            var type = LeftPanel.get('model').getType(path);
                            var opts = provider.findOptions(type);
                            var renderer = LeftPanel.editableColumn.items[0].el;
                            
                            if (opts === false) {
                                LeftPanel.editableColumn.setOptions([]);
                                renderer.has_entry = true; /// probably does not have any effect.
                            } else {
                                LeftPanel.editableColumn.setOptions(opts);
                                renderer.has_entry = false;
                            }
                            
                            
                            // iter now has row...
                            GLib.timeout_add(0, 100, function() {
                                
                                colObj.items[0].el.editable = true; // esp. need for col 0..
                                LeftPanel.get('view').el.set_cursor_on_cell(
                                    tp,
                                    colObj.el,
                                    colObj.items[0].el,
                                    true
                                );
                            });
                            
                          
                          
                        },
                        deleteSelected : function()
                        {
                            var data = this.toJS();
                            var iter = new Gtk.TreeIter();
                            var s = LeftPanel.get('view').selection;
                            s.get_selected(this.el, iter);
                                 
                               
                            var gval = new GObject.Value('');
                            LeftPanel.get('model').el.get_value(iter, 0 ,gval);
                            
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
                            var LeftTree        = imports.Builder.LeftTree.LeftTree;
                            LeftTree.get('model').changed(data, true);
                            
                        },
                        
                        
                        
                        activePath : false,
                        changed : function(str, doRefresh)
                        {
                            if (!this.activePath) {
                                return;
                            }
                            var iter = new Gtk.TreeIter();
                            this.el.get_iter(iter, new Gtk.TreePath.from_string(this.activePath));
                            
                            this.el.set_value(iter, 1, '' +str);
                            this.el.set_value(iter, 3, '' + this.toShort(str));
                            // update the tree...
                            var LeftTree        = imports.Builder.LeftTree.LeftTree;
                            LeftTree.get('model').changed(this.toJS(), doRefresh); 
                        },
                        toJS: function()
                        {
                            var iter = new Gtk.TreeIter();
                            LeftPanel.get('model').el.get_iter_first(iter);
                            var ar = {};
                               
                            while (true) {
                                
                                var k = this.getValue(iter, 0);
                               // Seed.print(k);
                                if (k[0] == '!') {
                                    ar.listeners = ar.listeners || {};
                                    ar.listeners[  k.substring(1)] = this.getValue(iter, 1);
                                    
                                } else {
                                    ar[ k ] = this.getValue(iter, 1);
                                }
                                
                                if (! LeftPanel.get('model').el.iter_next(iter)) {
                                    break;
                                }
                            }
                            
                            
                            Seed.print(JSON.stringify(ar));
                            return ar;
                            // convert the list into a json string..
                        
                            
                        },
                        getType :function(treepath_str)
                        {
                            var iter = new Gtk.TreeIter();
                            this.el.get_iter(iter, new Gtk.TreePath.from_string(treepath_str));
                            
                            var gval = new GObject.Value('');
                            LeftPanel.get('model').el.get_value(iter,4  ,gval);
                            return gval.value + '';
                        },
                        
                        /** get's a value, and tries to use type column to work out what type */
                        getValue: function (iter, col) {
                            
                            var gval = new GObject.Value('');
                            LeftPanel.get('model').el.get_value(iter, col ,gval);
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
                                case 'boolean':
                                    return val == 'true' ? true : false;
                                default: 
                                    return val;
                            }
                            
                        },
                        
                        editSelected: function( e)
                        {
                            print("EDIT SELECTED?");
                            var iter = new Gtk.TreeIter();
                            var s = LeftPanel.get('view').selection;
                            s.get_selected(LeftPanel.get('model').el, iter);
                            var m = LeftPanel.get('model');
                           
                            var gval = new GObject.Value('');
                            this.el.get_value(iter, 0 ,gval);
                            var val = '' + gval.value;
                            
                            gval = new GObject.Value('');
                            this.el.get_value(iter, 1 ,gval);
                            var rval = gval.value;
                            var activePath = this.el.get_path(iter).to_string(); 
                            this.activePath = activePath ;
                            // was activeIter...
                            //  not listener...
                            
                            var showEditor = false;
                            
                            if (val[0] == '!') {
                                showEditor = true;
                            }
                            if (val[0] == '|') {
                                if (rval.match(/function/g) || rval.match(/\n/g)) {
                                    showEditor = true;
                                }
                            }
                            
                            if (showEditor) {
                                var _this = this;
                                this.activePath = false;
                                GLib.timeout_add(0, 1, function() {
                                    //   Gdk.threads_enter();
                                    RightEditor.el.show();
                                    RightEditor.get('view').load( rval );
                                    
                                    e.editing_done();
                                    e.remove_widget();
                                    _this.activePath = activePath ;
                                    
                             //       Gdk.threads_leave();
                                    return false;
                                });
                                return;
                            }
                             
                            RightEditor.el.hide();

                            var type = this.getValue(iter,4);
                            print("type = " + type);
                            // toggle boolean
                            if (type == 'boolean') {
                                // let's show a pulldown..
                                //LeftPanel.editableColumn.setOptions([ 'true' , 'false']);
                                
                                return;
                                val = ! this.getValue(iter,1);
                                
                                this.activePath = false;
                                var _this = this;
                                GLib.timeout_add(0, 1, function() {
                                    //   Gdk.threads_enter();
                                     
                                    e.editing_done();
                                    e.remove_widget();
                                    _this.activePath = activePath ;
                                    _this.changed(''+val,true);
                                    
                             
                                    return false;
                                });
                            }
                            //LeftPanel.editableColumn.el.has_entry = true; // alwo editing?
                             // otherwise we are going to show the text editor..   
                             
                            
                            
                       
                        }
                          
                        
                    },

                    {
                        
                        xtype: Gtk.TreeViewColumn,
                        pack : ['append_column'],
                        title : 'key',
                        init : function ()
                        {
                            XObject.prototype.init.call(this); 
                            this.el.add_attribute(this.items[0].el , 'markup', 2 );
                            LeftPanel.propertyColumn= this;
                        },
                        items : [
                            {
                                xtype : Gtk.CellRendererText,
                                editable : false,
                                pack : ['pack_start'],
                            
                                listeners : {
                                    'editing-started' : function(r, e, p) {
                                        LeftPanel.get('model').activePath  = p;
                                        this.editEvent = e;
                                    },
                                    edited : function(r,p, t) {

                                        // since our visiable col is differnt from the editable one..
                                        var model = LeftPanel.get('model');
                                        var path = LeftPanel.get('model').activePath;
                                        var iter = new Gtk.TreeIter();
                                        model.el.get_iter(iter, new Gtk.TreePath.from_string(path));
                                        model.el.set_value(iter, 0, t);
                                        model.el.set_value(iter, 2, t);
                                        
                                        LeftPanel.get('model').activePath = false;
                                        var LeftTree        = imports.Builder.LeftTree.LeftTree;
                                        LeftTree.get('model').changed(LeftPanel.get('model').toJS(), true); 
                                        this.el.editable = false;
                                        
                                            //this.el.has_entry = false;
                                    }
                                }
                            }
                        ]
                    },
                            
                    {
                        
                        xtype: Gtk.TreeViewColumn,
                        pack : ['append_column'],
                        title : 'value',
                        init : function ()
                        {
                            XObject.prototype.init.call(this); 
                            this.el.add_attribute(this.items[0].el , 'text', 3 );
                            this.el.add_attribute(this.items[0].el , 'sensitive', 3 );
                            this.el.add_attribute(this.items[0].el , 'editable', 3 );
                           // this.el.set_cell_data_func(cell, age_cell_data_func, NULL, NULL);

                            LeftPanel.editableColumn= this;
                        },
                        setOptions : function(ar)
                        {
                            //this.items[0].el.has_entry = false; // stop editable.
                           //this.items[0].el.editable = false;
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
                                
                                xtype : function() {
                                    var  ret = new Gtk.CellRendererCombo();
                                    ret.model = new Gtk.ListStore();
                                    ret.model.set_column_types ( 1, [
                                        GObject.TYPE_STRING,  // 0 real key
                                        
                                    ]);
                                    
                                    return  ret;
                                },
                                pack : ['pack_start'],
                                editable : true,
                                has_entry : false,
                                text_column : 0,
                                listeners : {
 
                                    edited : function(r,p, t) {
                                        LeftPanel.editing = false;
                                        print("EDITED? p:" + p + " t:" + t);
                                        LeftPanel.get('model').changed(t, true);
                                        LeftPanel.get('model').activePath = false;
                                        //this.el.has_entry = false;
                                    },
                                    
                                    'editing-started' : function(r, e, p) {
                                        LeftPanel.editing  = true;
                                      //  console.log('editing started');
                                       // r.has_entry = false;
                                        LeftPanel.get('model').editSelected(e);
                                    }    
                                },
                                
                                
                            }
                        ]
                    }
                
                ]
            }
        ]    
            
    }
);
    
     
    
