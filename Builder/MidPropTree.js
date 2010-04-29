//<Script type="text/javascript">
Gio = imports.gi.Gio;
Gtk = imports.gi.Gtk;
GLib = imports.gi.GLib;
GObject = imports.gi.GObject;
Pango = imports.gi.Pango ;
Soup = imports.gi.Soup ;


XObject = imports.XObject.XObject;
console = imports.console;


Roo             = imports.Builder.Provider.Palete.Roo.Roo;
Window =


/**
 * 
 * Properties and events tree - that hides and shows when you press buttons on the left....
 * 
 */
 
MidPropTree = new XObject({
         
        
        xtype: Gtk.ScrolledWindow,
        smooth_scroll : true,
        pack : [ 'pack_end', false, true, 0 ],
        
          
        shadow_type :  Gtk.ShadowType.IN,
        init : function() {
            XObject.prototype.init.call(this); 
            this.el.set_policy (Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC)
            this.set_size_request ( 150, -1 );
             
        },
        
        hideWin : function() {
            
            if (Window.get('left').el.position < 160) {
                return;
            }
            Window.get('left').el.position = Window.get('left').el.position  - 150;
                
            this.el.hide();
        },
        items : [
            {
                   
                
                xtype : Gtk.TreeView,
                
                enable_tree_lines :  true,
                tooltip_column : 2,
                headers_visible : false,
                // selection  -- set by init..
                init : function() {
                    XObject.prototype.init.call(this); 
                    
           
                    
                    this.selection = this.el.get_selection();
                    this.selection.set_mode( Gtk.SelectionMode.SINGLE);
                 
                
                    
                    var description = new Pango.FontDescription.c_new();
                    description.set_size(8000);
                    this.el.modify_font(description);
                    
                       // this.column.add_attribute(this.column.items[1], "text", 1);
                        
                         
                     
                  //  this.expand_all();
                },
                listeners : {
                    
                    'cursor-changed' : function () {
                        var iter = new Gtk.TreeIter();
                        
                        //console.log('changed');
                        var s = this.selection;
                        s.get_selected(MidPropTree.get('model').el, iter);
                        
                        
                        // var val = "";
                        value = new GObject.Value('');
                        MidPropTree.get('model').el.get_value(iter, 0, value);
                        var key = value.value;
                        value = new GObject.Value('');
                        MidPropTree.get('model').el.get_value(iter, 1, value);
                        
                        var type = value.value;
                        value = new GObject.Value('');
                        MidPropTree.get('model').el.get_value(iter, 4, value);
                        
                        var skel = value.value;
                        MidPropTree.hideWin();
                        LeftPanel.get('model').add(key, type, skel);
                        
                    }
                },
                items : [
                
                    {
                        id : 'model',
                        pack : [ 'set_model' ],
                        xtype : Gtk.ListStore,
                        currentData : false,
                        init : function() {
                            XObject.prototype.init.call(this); 
                            this.el.set_column_types ( 5, [
                                GObject.TYPE_STRING,  // real key
                                 GObject.TYPE_STRING, // real type
                                 GObject.TYPE_STRING, // docs ?
                                 GObject.TYPE_STRING, // visable desc
                                 GObject.TYPE_STRING // function desc
                                
                            ] );
                                
                        },
                 
                        load : function (ar)
                        {
                            this.el.clear();
                            // roo specific..
                            var fullpath = Roo.guessName(ar);
                            this.currentData  = false;
                            if (!fullpath.length) {
                                return;
                            }
                            this.currentData = Roo.proplist[fullpath];
                            
                             
                             
                            
                        },
                        
                        
                        
                        
                        showData : function (type) 
                        {
                            
                             this.el.clear();
                            if (!this.currentData) {
                                Seed.print('data not loaded yet');
                                return;
                            }
                            
                            Seed.print('Showing right?');
                            if (!MidPropTree.el.visible) {
                                Window.get('left').el.position = Window.get('left').el.position  + 150;
                                MidPropTree.el.show();
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
                        
                        xtype: Gtk.TreeViewColumn,
                        pack : ['append_column'],
                        init : function() {
                            XObject.prototype.init.call(this); 
                 
                        
                            this.el.add_attribute(this.items[0].el , 'markup', 4  );
                        }
                        items : [
                            {
                                xtype : Gtk.CellRendererText,
                                pack : ['pack_start']
                            }
                        ]
                    }
                ]   
            }
        ]    
            
    }

);
    
