//<Script type="text/javascript">
Gio = imports.gi.Gio;
Gtk = imports.gi.Gtk;
GLib = imports.gi.GLib;
GObject = imports.gi.GObject;
XN = imports.xnew;
console = imports.console;
Pango = imports.gi.Pango ;
Soup = imports.gi.Soup ;

Builder = imports['Builder.js']
 
var _win;
var _view;
var _model;
 


/**
 * 
 * Properties and events tree - that hides and shows when you press buttons on the left....
 * 
 */
 
                        
function create() // parent?
{
    
             
    return {
        
        xns : 'Gtk',
        xtype: 'ScrolledWindow',
        smooth_scroll : true,
        packing : [ 'pack_end', false, true, 0 ],
        
        listeners : {
            _new : function() {
                _win = this;
            }
        },
        set : {
            set_shadow_type : [ Gtk.ShadowType.IN ],
            set_policy : [Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC],
            set_size_request : [ 150, -1]
        },
        hideWin : function() {
            
            if (!_win.el || !_win.el.visible || Builder.Window._left.el.position < 160) {
                return;
            }
            Builder.Window._left.el.position = Builder.Window._left.el.position  - 150;
                
            this.el.hide();
        },
        items : [
            {
                   
                xns : 'Gtk',
                xtype : 'TreeView',
                set : {
                    set_tooltip_column : [2],
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
                    'cursor-changed' : function () {
                        var iter = new Gtk.TreeIter();
                        
                        //console.log('changed');
                        var s = this.selection;
                        s.get_selected(_model, iter);
                        
                        
                        // var val = "";
                        value = new GObject.Value('');
                        _model.el.get_value(iter, 0, value);
                        var key = value.value;
                        value = new GObject.Value('');
                        _model.el.get_value(iter, 1, value);
                        
                        var type = value.value;
                        value = new GObject.Value('');
                        _model.el.get_value(iter, 4, value);
                        
                        var skel = value.value;
                        _win.hideWin();
                        Builder.LeftPanel._model.add(key, type, skel);
                        
                    }
                },
                items : [
                
                    {
                        xns : 'Gtk',
                        packing : [ 'set_model' ],
                        xtype : 'ListStore',
                        currentData : false,
                        listeners : {
                            _new : function()
                            {
                                _model = this;
                            },
                            _rendered :  function ()
                            {
                             
                                this.el.set_column_types ( 5, [
                                    GObject.TYPE_STRING,  // real key
                                     GObject.TYPE_STRING, // real type
                                     GObject.TYPE_STRING, // docs ?
                                     GObject.TYPE_STRING, // visable desc
                                     GObject.TYPE_STRING // function desc
                                    
                                ] );
                                /*
                                var session = new Soup.SessionAsync();
 
                                var request = new Soup.Message({
                                    method:"GET", 
                                    
                                    uri: new Soup.URI.c_new(
                                        "http://www.akbkhome.com/Builder/index.php/Builder/PropList.php?xtype=*all"
                                    )
                                });
                             
                                // loads our map!
                                var status = session.queue_message(request, function(ses,msg) {
                                        Seed.print('data loaded'); // prints 8062
                                    _model.data = JSON.parse(msg.response_body.data).data;
                                    //Seed.print(msg.response_body.data); // prints empty string.
                                    //Seed.print(msg.status_code); // prints 200
                                   // Seed.print(msg.request_body.data);
                                });
                                */
                                
                               
                            
                            
                            }
                        },
                 
                        load : function (ar)
                        {
                            this.el.clear();
                            // roo specific..
                            var fullpath = Builder.Provider.Palete.Roo.guessName(ar);
                            this.currentData  = false;
                            if (!fullpath.length) {
                                return;
                            }
                            this.currentData = Builder.Provider.Palete.Roo.proplist[fullpath];
                            
                             
                             
                            
                        },
                        
                        
                        
                        
                        showData : function (type) 
                        {
                            
                             this.el.clear();
                            if (!this.currentData) {
                                Seed.print('data not loaded yet');
                                return;
                            }
                            
                            Seed.print('Showing right?');
                            if (!_win.el.visible) {
                                Builder.Window._left.el.position = Builder.Window._left.el.position  + 150;
                                _win.el.show();
                            }
                            
                            
                            
                           
                            
                            var iter = new Gtk.TreeIter();
                            for(var i =0 ; i < this.currentData[type].length; i++) {
                                var p=this.currentData[type][i];
                                this.el.append(iter);
                              //  console.log( '<b>' + p.name +'</b> ['+p.type+']');
                                    //GObject.TYPE_STRING,  // real key
                                    // GObject.TYPE_STRING, // real type
                                    // GObject.TYPE_STRING, // docs ?
                                    // GObject.TYPE_STRING // func def?
                                    
                                
                                this.el.set_value(iter, 0, p.name);
                                this.el.set_value(iter, 1, p.type);
                                this.el.set_value(iter, 2, p.desc);
                                this.el.set_value(iter, 3, p.sig ? p.sig  : '');
                                this.el.set_value(iter, 4, '<span size="small"><b>' + p.name +'</b> ['+p.type+']</span>');
                                
                            }
                             
                          
                            
                        }
                         
                        
                    },
                  
                    

                    {
                        xns : 'Gtk',
                        xtype: 'TreeViewColumn',
                        packing : ['append_column'],
                        listeners : {
                            _rendered : function ()
                            {
                                this.el.add_attribute(this.items[0].el , 'markup', 4  );
                            }
                        },
                        items : [
                        
                        
                        
                            {
                                xns : 'Gtk',
                                xtype : 'CellRendererText',
                                packing : ['pack_start'],
                                

                            }
                        ]
                    }
                ]   
            }
        ]    
            
    };


}
    
