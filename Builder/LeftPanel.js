//<Script type="text/javascript">
Gio = imports.gi.Gio;
Gtk = imports.gi.Gtk;
Gdk = imports.gi.Gdk;
GLib = imports.gi.GLib;
GObject = imports.gi.GObject;
XN = imports.xnew;
console = imports.console;
Pango = imports.gi.Pango ;
Builder = imports['Builder.js']


var _view;
var _model;
var _win;



function create() // parent?
{
    
            
    return {
        
        xns : 'Gtk',
        xtype: 'ScrolledWindow',
        smooth_scroll : true,
        packing : [ 'pack_end', true, true, 0 ],
        
        listeners : {
            _new : function() {
                _win = this;
            }
        },
        set : {
            set_shadow_type : [ Gtk.ShadowType.IN ],
            set_policy : [Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC]
        },
        items : [
            {
                   
                xns : 'Gtk',
                xtype : 'TreeView',
                set : {
                    set_tooltip_column : [1],
                    set_headers_visible : [ false],
                    set_enable_tree_lines : [true]
                    
                },

                
                listeners : {
                    
                    _new : function ()
                    {
                        _view = this;
                    },
                    
                    _rendered  : function ()
                    {
                        
                        this.selection = this.el.get_selection();
                        this.selection.set_mode( Gtk.SelectionMode.SINGLE);
                     
                        
                        var description = new Pango.FontDescription.c_new();
                        description.set_size(8000);
                        this.el.modify_font(description);
                        
                       // this.column.add_attribute(this.column.items[1], "text", 1);
                        
                         
                     
                  //  this.expand_all();
                    },
                    'button-press-event' : function(tv, ev) {
                        if (ev.type != Gdk.EventType.BUTTON_PRESS  || ev.button.button != 3) {
                            Seed.print("click" + ev.type);
                            return false;
                        }
                      
                    
                        
                        var res = _view.el.get_path_at_pos(ev.button.x,ev.button.y);
                        
                        if (res.column.title == 'value') {
                            return false;
                        }
                        Builder.LeftPanelPopup._menu.el.set_screen(Gdk.Screen.get_default());
                        Builder.LeftPanelPopup._menu.el.popup(null, null, null, null, 3, ev.button.time);
                        Seed.print("click:" + res.column.title);
                        return false;
                        
                    }
                },
                items : [
                
                    {
                        xns : 'Gtk',
                        packing : [ 'set_model' ],
                        xtype : 'ListStore',
                        
                        listeners : {
                            _new : function()
                            {
                                _model = this;
                            },
                            _rendered :  function ()
                            {
                             
                                var isSeed = typeof(Seed) != 'undefined';
                                this.el.set_column_types ( 5, [
                                    GObject.TYPE_STRING,  // real key
                                     GObject.TYPE_STRING, // real value 
                                     GObject.TYPE_STRING,  // visable key
                                     GObject.TYPE_STRING, // visable value
                                     GObject.TYPE_STRING// need to store type of!!!
                                     ] );
                                
                                 return;
                               
                            
                            
                            }
                        },
                        toShort: function(str) {
                            var a = typeof(str) == 'string' ? str.split("\n") : [];
                            return a.length > 1 ? a[0] + '....' : '' + str;
                        },
                        load : function (ar)
                        {
                            this.el.clear();
                            
                            Builder.RightEditor._win.el.hide();
                            if (ar === false) {
                                return ;
                            }
                            
                            // sort!!!?
                            var iter = new Gtk.TreeIter();
                            for (var i in ar) {
                                if (typeof(ar[i]) == 'object') {
                                    continue;
                                }
                                this.el.append(iter);
                                this.el.set_value(iter, 0, i);
                                this.el.set_value(iter, 1, '' + ar[i]);
                                this.el.set_value(iter, 2, i);
                                this.el.set_value(iter, 3, this.toShort(ar[i]));
                                this.el.set_value(iter, 4, typeof(ar[i]));
                            }
                            ar.listeners = ar.listeners || {};
                            for (var i in ar.listeners ) {
                                this.el.append(iter);
                                this.el.set_value(iter, 0, '!'+  i  );
                                this.el.set_value(iter, 1, '' + ar.listeners[i]);
                                this.el.set_value(iter, 2, '<b>'+ i + '</b>');
                                
                                this.el.set_value(iter, 3, '' + this.toShort(ar.listeners[i]));
                                this.el.set_value(iter, 4, typeof(ar[i]));
                            }
                            
                        },
                        
                        add : function(key, type, skel) {
                            
                            var data = this.toJS();
                            if (typeof(data[key]) != 'undefined') {
                                return;
                            }
                            val = '';
                            if (type == 'Boolean') {
                                val = true;
                            }
                            if (type == 'Number') {
                                val = 0;
                            }
                            data[key] = val;
                            
                            this.load(data);
                            Builder.LeftTree._model.changed(data, true); 
                            
                            
                        },
                        deleteSelected : function()
                        {
                            var data = this.toJS();
                            var iter = new Gtk.TreeIter();
                            var s = _view.selection;
                            s.get_selected(_model.el, iter);
                                 
                               
                            var gval = new GObject.Value('');
                            _model.el.get_value(iter, 0 ,gval);
                            if (typeof(data[gval.value]) == 'undefined') {
                                return;
                            }
                            delete data[gval.value];
                            this.load(data);
                            Builder.LeftTree._model.changed(data, true); 
                            
                        },
                        
                        
                        
                        activeIter : false,
                        changed : function(str, doRefresh)
                        {
                            if (!this.activeIter) {
                                return;
                            }
                            this.el.set_value(this.activeIter, 1, str);
                            this.el.set_value(this.activeIter, 3, '' + this.toShort(str));
                            // update the tree...
                            
                            Builder.LeftTree._model.changed(this.toJS(), true); 
                        },
                        toJS: function()
                        {
                            var iter = new Gtk.TreeIter();
                            _model.el.get_iter_first(iter);
                            var ar = {};
                               
                            while (true) {
                                
                                var k = this.getValue(iter, 0);
                                Seed.print(k);
                                if (k[0] == '!') {
                                    ar.listeners = ar.listeners || {};
                                    ar.listeners[k.substring(1)] = this.getValue(iter, 1);
                                    
                                } else {
                                    ar[ k ] = this.getValue(iter, 1);
                                }
                                
                                if (!_model.el.iter_next(iter)) {
                                    break;
                                }
                            }
                                Seed.print(JSON.stringify(ar));
                            return ar;
                            // convert the list into a json string..
                        
                            
                        },
                        getValue: function (iter, col) {
                            var gval = new GObject.Value('');
                             _model.el.get_value(iter, col ,gval);
                            var val = '' + gval.value;
                            if (col != 1) {
                                return val;
                            }
                            gval = new GObject.Value('');
                             _model.el.get_value(iter,4  ,gval);
                            switch(gval.value) {
                                case 'number':
                                    return parseFloat(val);
                                case 'boolean':
                                    return val == 'true' ? true : false;
                                default: 
                                    return val;
                            }
                            
                        } 
                          
                        
                    },

                    {
                        xns : 'Gtk',
                        xtype: 'TreeViewColumn',
                        packing : ['append_column'],
                        title : 'key',
                        listeners : {
                            _rendered : function ()
                            {
                                this.el.add_attribute(this.items[0].el , 'markup', 2 );
                            }
                        },
                        items : [
                        
                        
                        
                            {
                                xns : 'Gtk',
                                xtype : 'CellRendererText',
                                packing : ['pack_start'],
                                

                            }
                        ]
                    },
                            
                    {
                        xns : 'Gtk',
                        xtype: 'TreeViewColumn',
                        packing : ['append_column'],
                        title : 'value',
                        listeners : {
                            _rendered : function ()
                            {
                                this.el.add_attribute(this.items[0].el , 'text', 3 );
                            }
                        },
                        items : [
                        
                        
                        
                            {
                                xns : 'Gtk',
                                xtype : 'CellRendererText',
                                packing : ['pack_start'],
                                editable : true,
                                
                                
                                
                                listeners : {
 
                                    edited : function(r,p, t) {
                                        _model.changed(t, true);
                                        _model.activeIter = false;
                                        
                                    },
                                   
                                    'editing-started' : function(r, e, p) {
                                        
                                         var iter = new Gtk.TreeIter();
                                        var s = _view.selection;
                                        s.get_selected(_model.el, iter);
                                         
                                       
                                        var gval = new GObject.Value('');
                                         _model.el.get_value(iter, 0 ,gval);
                                        var val = '' + gval.value;
                                        
                                        gval = new GObject.Value('');
                                         _model.el.get_value(iter, 1 ,gval);
                                        var rval = gval.value;
                                         
                                        _model.activeIter = iter;
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
                                        
                                        if (!showEditor) {
                                            imports['Builder/RightEditor.js']._win.el.hide();

                                            var type = _model.getValue(iter,4);
                                            
                                            // toggle boolean
                                            if (type == 'boolean') {
                                                val = ! _model.getValue(iter,1);
                                                
                                                
                                                 _model.activeIter = false;
                                                GLib.timeout_add(0, 1, function() {
                                                    //   Gdk.threads_enter();
                                                     
                                                    e.editing_done();
                                                    e.remove_widget();
                                                    _model.activeIter = iter;
                                                    _model.changed(''+val,true);
                                                    
                                             
                                                    return false;
                                                    });
                                            }
                                            
                                            return;
                                        }
                                         _model.activeIter = false;
                                        GLib.timeout_add(0, 1, function() {
                                            //   Gdk.threads_enter();
                                            imports['Builder/RightEditor.js']._win.el.show();
                                            imports['Builder/RightEditor.js']._view.load( rval );
                                            
                                            e.editing_done();
                                            e.remove_widget();
                                            _model.activeIter = iter;
                                            
                                     //       Gdk.threads_leave();
                                            return false;
                                        });
                                        //r.stop_editing(true);
                                    }
                                },
                                
                            }
                        ]
                    }
                
                ]
            }
        ]    
            
    };
    
    
}
    
