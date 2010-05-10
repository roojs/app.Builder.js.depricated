//<Script type="text/javascript">
Gio = imports.gi.Gio;
Gtk = imports.gi.Gtk;
Gdk = imports.gi.Gdk;
GObject = imports.gi.GObject;
Pango = imports.gi.Pango ;

XObject = imports.XObject.XObject;
console = imports.console;


LeftTree =   imports.Builder.LeftTree.LeftTree;
Roo = imports.Builder.Provider.Palete.Roo.Roo;
// normally appears as a vbox with a expander button,
// when you put your mouse over though, it expands.

RightPalete = new XObject({
         
        
        xtype: Gtk.VBox,
        pack : [ 'pack_start', false, false ],
        
        hide : function() {
            this.get('hidden').el.show();
            this.get('visible').el.hide();
        },
        show : function() {
            this.get('hidden').el.hide();
            this.get('visible').el.show();
            this.get('model').expanded();
            
        },
        provider : false,
        
        items : [
            {
                    
                id : 'hidden',
                xtype: Gtk.VBox,
                 
                items : [
                
                
                    {
                        
                        xtype: Gtk.Button,
                        pack : [ 'pack_start', false, true ],
                        listeners : {
                            clicked : function() {
                                RightPalete.show();
                            }
                        },
                        items : [
                            {
                                
                                xtype: Gtk.Image,
                                
                                stock : Gtk.STOCK_GOTO_FIRST,
                                'icon-size' : Gtk.IconSize.MENU,
                                pack : ['add']
                            }
                        ]
                    },
                    {
                        pack : [ 'pack_start', true, true ],
                        
                        xtype: Gtk.Label,
                        label: 'Palete',
                        angle : 270,
                        init : function() {
                            XObject.prototype.init.call(this);  
                            this.el.add_events ( Gdk.EventMask.BUTTON_MOTION_MASK );
                        },
                        listeners : {
                            'enter-notify-event' : function (w,e)
                            {
                                RightPalete.show();
                                //console.log("enter!");
                                //this.el.expanded = !this.el.expanded;
                                //this.listeners.activate.call(this);
                                return true;
                            }
                        }
                    }
                ]
            },
            
            {
                    
                id : 'visible',
                xtype: Gtk.VBox,
                
                items : [         
                    {
                        
                        
                        xtype: Gtk.HBox,
                        pack : [ 'pack_start', false, true ],
                        items : [
                            {
                                 
                                
                                xtype: Gtk.Label,
                                label: "Palete"
                             
                            },
                            {
                                
                                xtype: Gtk.Button,
                                pack : [ 'pack_start', false, true ],
                                listeners : {
                                    clicked : function() {
                                        RightPalete.hide();
                                    }
                                },
                                items : [
                                    {
                                        
                                        xtype: Gtk.Image,
                                        stock : Gtk.STOCK_GOTO_LAST,
                                        'icon-size' : Gtk.IconSize.MENU,
                                
                                        // open arrow...
                                    }
                                ]
                            }
                        ]
                    },
                    
                    // expandable here...( show all.. )
                    
                                // our pallete goes here...
            // two trees technically...
            
                    
                    {
                
                        
                        xtype: Gtk.ScrolledWindow,
                        smooth_scroll : true,
                        shadow_type :  Gtk.ShadowType.IN ,
                        
                        init : function() {
                            XObject.prototype.init.call(this);  
                       
                            this.el.set_policy(Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC);
                            this.el.set_size_request(-1,200);
                        },
                        items : [        
                            {
                                
                                    
                                id : 'view',
                                xtype : Gtk.TreeView,
                                headers_visible :  false,
                                enable_tree_lines :  true ,
                                tooltip_column : 1,
                                init : function() {
                                    XObject.prototype.init.call(this);  
                                    this.el.set_size_request(150,-1);
                                  //  set_reorderable: [1]
                                  
                                    var description = new Pango.FontDescription.c_new();
                                    description.set_size(8000);
                                    this.el.modify_font(description);
                                    
                                    this.selection = this.el.get_selection();
                                    this.selection.set_mode( Gtk.SelectionMode.SINGLE);
                                   // this.selection.signal['changed'].connect(function() {
                                    //    _view.listeners['cursor-changed'].apply(_view, [ _view, '']);
                                    //});
                                    // see: http://live.gnome.org/GnomeLove/DragNDropTutorial
                                     
                                    Gtk.drag_source_set (
                                            this.el,            /* widget will be drag-able */
                                            Gdk.ModifierType.BUTTON1_MASK,       /* modifier that will start a drag */
                                            null,            /* lists of target to support */
                                            0,              /* size of list */
                                            Gdk.DragAction.COPY         /* what to do with data after dropped */
                                    );
                                    Gtk.drag_source_set_target_list(this.el, LeftTree.targetList);
                                    /*
                                    print("RP: TARGET:" + LeftTree.atoms["STRING"]);
                                    targets = new Gtk.TargetList();
                                    targets.add( LeftTree.atoms["STRING"], 0, 0);
                                    targets.add_text_targets( 1 );
                                    Gtk.drag_dest_set_target_list(this.el, LeftTree.targetList);
                                    
                                    //if you want to allow text to be output elsewhere..
                                    //Gtk.drag_source_add_text_targets(this.el);
                                    */
                                    return true; 
                                },  
                                listeners : {
                                    
                              
                                    'drag-data-get' : function (w, ctx, selection_data, target_type,  time, ud) 
                                    {
                                        
                                        Seed.print('Palete: drag-data-get: ' + target_type);
                                        if (this.el.dragData && this.el.dragData.length ) {
                                            selection_data.set_text(this.el.dragData ,this.el.dragData.length);
                                        }
                                        
                                        
                                        //this.el.dragData = "TEST from source widget";
                                        
                                        
                                        
                                        return true;
                                    },
                                   
                                    'drag-begin' : function (w, ctx, ud) 
                                    {
                                        // we could fill this in now...
                                        Seed.print('SOURCE: drag-begin');
                                        
                                        
                                        
                                        var iter = new Gtk.TreeIter();
                                        var s = this.selection;
                                        s.get_selected(RightPalete.get('model').el, iter);
                                        var path = RightPalete.get('model').el.get_path(iter);
                                        
                                        var pix = this.el.create_row_drag_icon ( path);
                                            
                                                
                                        Gtk.drag_set_icon_pixmap (ctx,
                                            pix.get_colormap(),
                                            pix,
                                            null,
                                            -10,
                                            -10);
                                        
                                        var value = new GObject.Value('');
                                        RightPalete.get('model').el.get_value(iter, 0, value);
                                        this.el.dropList = RightPalete.provider.getDropList(value.value);
                                        this.el.dragData = value.value;
                                        
                                        
                                        
                                        
                                        return true;
                                    },
                                    'drag-end' : function () 
                                    {
                                        Seed.print('SOURCE: drag-end');
                                        this.el.dragData = false;
                                        this.el.dropList = false;
                                        LeftTree.get('view').highlight(false);
                                        return true;
                                    },
                                    
                                    /*
                                    'cursor-changed'  : function(tv, a) { 
                                        //select -- should save existing...
                                        var iter = new Gtk.TreeIter();
                                        
                                        if (this.selection.count_selected_rows() < 1) {
                                            
                                            Builder.LeftTree._model.load( false);
                                            
                                            return;
                                        }
                                        
                                        //console.log('changed');
                                        var s = this.selection;
                                        s.get_selected(_model, iter);
                                        value = new GObject.Value('');
                                        _model.el.get_value(iter, 2, value);
                                        
                                        console.log(value.value);
                                        var file = _model.project.get(value.value);
                                        
                                        
                                        console.log(file);
                                        _expander.el.set_expanded(false);

                                        Builder.LeftTree._model.loadFile(file);
                                        
                                        return true;
                                        
                                        
                                    
                                    }
                                    */
                                },
                                
                                items  : [
                                    {
                                        pack : ['set_model'],
                                        
                                        id : 'model',
                                        xtype : Gtk.ListStore,
                                         
                                        init  :  function()
                                        {
                                           
                                           XObject.prototype.init.call(this);  
                                 
                                            
                                            
                                            
                                            this.el.set_column_types ( 2, [
                                                    GObject.TYPE_STRING, // title 
                                                    GObject.TYPE_STRING // tip
                                                    
                                                    ] );
                                             
                                              
                                            
                                        },
                                        expanded : function() // event handler realy.
                                        {
                                            // should ask tree for list of current compeents.
                                            
                                            //console.dump(this.provider);
                                            //var li = this.provider.gatherList([]);
                                            //console.dump(li);
                                            //this.load( this.provider.gatherList([]));
                                            
                                            
                                            
                                            
                                        },
                                        
                                        load : function(tr,iter)
                                        {
                                            if (!iter) {
                                                this.el.clear();
                                            }
                                            //console.log('Project tree load: ' + tr.length);
                                            var citer = new Gtk.TreeIter();
                                            //this.insert(citer,iter,0);
                                            for(var i =0 ; i < tr.length; i++) {
                                                if (!iter) {
                                                    
                                                    this.el.append(citer);   
                                                } else {
                                                    this.el.insert(citer,iter,-1);
                                                }
                                                
                                                var r = tr[i];
                                                Seed.print(r);
                                                this.el.set_value(citer, 0,  '' +  r ); // title 
                                                
                                                //this.el.set_value(citer, 1,  new GObject.Value( r)); //id
                                                //if (r.cn && r.cn.length) {
                                                //    this.load(r.cn, citer);
                                                //}
                                            }
                                            
                                            
                                        },
                                        
                                        
                                        
                                        
                                        getValue: function (iter, col) {
                                            var gval = new GObject.Value('');
                                             this.el.get_value(iter, col ,gval);
                                            return  gval.value;
                                            
                                            
                                        }
                                        
                                        
                                        
                                      //  this.expand_all();
                                    },
                                    
                                      
                                    {
                                        pack : ['append_column'],
                                        
                                        xtype : Gtk.TreeViewColumn,
                                        init  :  function()
                                        {
                                           
                                            XObject.prototype.init.call(this);  
                                            this.el.add_attribute(this.items[0].el , 'markup', 0 );
                                        },

                                        items : [
                                            {
                                                
                                                xtype : Gtk.CellRendererText,
                                                pack: [ 'pack_start']
                                                  
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
            
    }
)