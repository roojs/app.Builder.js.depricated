//<Script type="text/javascript">
Gio = imports.gi.Gio;
Gtk = imports.gi.Gtk;
GLib = imports.gi.GLib;
GObject = imports.gi.GObject;
Pango = imports.gi.Pango ;



XObject = imports.XObject.XObject;
console = imports.console;


Roo             = imports.Builder.Provider.Palete.Roo.Roo;



/**
 * 
 * Properties and events tree - that hides and shows when you press buttons on the left....
 * 
 */
 
MidPropTree = new XObject({
         
        
        xtype: Gtk.ScrolledWindow,
        smooth_scroll : true,
        pack : [ 'pack_end', false, true, 0 ],
        
        activeElement : false, // used by left tree to set what list to show.  
        shadow_type :  Gtk.ShadowType.IN,
        init : function() {
            XObject.prototype.init.call(this); 
            this.el.set_policy (Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC)
            this.el.set_size_request ( 150, -1 );
            this.shown = true;
        },
        
        hideWin : function() {
            
            if (!this.shown) {
                return;
            }
            
            var Window          = imports.Builder.Window.Window;            
            if (Window.get('left').el.position < 160) {
                return;
            }
            Window.get('left').el.position = Window.get('left').el.position  - 150;
                
            this.el.hide();
            this.shown = false;
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
                        MidPropTree.get('model').el.get_value(iter, 3, value);
                        var skel = value.value;
                        
                        
                        MidPropTree.hideWin();
                        var LeftPanel       = imports.Builder.LeftPanel.LeftPanel;
                        if (type == 'function') {
                            
                            LeftPanel.get('model').add('|' +key, type, skel) //, skel);
                            return;
                        }
                        
                        LeftPanel.get('model').add(key, type) //, skel);
                        
                        
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
                                 GObject.TYPE_STRING, // element type (event|prop)
                                
                            ] );
                                
                        },
                        /*
                        load : function (ar)
                        {
                            this.el.clear();
                            // roo specific..
                            var LeftTree       = imports.Builder.LeftTree.LeftTree;
                            var fullpath = LeftTree.get('model').file.guessName(ar);
                            var palete = LeftTree.getPaleteProvider();
                            
                            
                            this.currentData  = false;
                            if (!fullpath.length) {
                                return;
                            }
                            palete.getProperties()
                            
                            this.currentData = Roo.proplist[fullpath];
                            
                             
                             
                            
                        },
                        
                        */
                        
                        
                        showData : function (type) 
                        {
                            this.el.clear();
                            if (!MidPropTree.activeElement || !type) {
                                return; // no active element
                            }
                            var LeftTree       = imports.Builder.LeftTree.LeftTree;
                            var fullpath = LeftTree.get('model').file.guessName(MidPropTree.activeElement);
                            var palete = LeftTree.getPaleteProvider();
                            
                             
                            
                            Seed.print('Showing right?');
                            if (!MidPropTree.shown) {
                                var Window          = imports.Builder.Window.Window;
                                Window.get('left').el.position = Window.get('left').el.position  + 150;
                                MidPropTree.el.show();
                                MidPropTree.shown = true;
                            }
                            
                            var elementList = palete.getPropertiesFor(fullpath, type);
                            print ("GOT " + elementList.length + " items for " + fullpath + "|" + type);
                            
                           
                            
                            var iter = new Gtk.TreeIter();
                            for(var i =0 ; i < elementList.length; i++) {
                                var p=elementList[i];
                                this.el.append(iter);
                              //  console.log( '<b>' + p.name +'</b> ['+p.type+']');
                                    //GObject.TYPE_STRING,  // real key
                                    // GObject.TYPE_STRING, // real type
                                    // GObject.TYPE_STRING, // docs ?
                                    // GObject.TYPE_STRING // func def?
                                    
                                
                                this.el.set_value(iter, 0, p.name);
                                this.el.set_value(iter, 1, p.type);
                                this.el.set_value(iter, 2, '<span size="small"><b>' + p.name +'</b> ['+p.type+']</span>' + "\n" + p.desc);
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
                        },
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
    
