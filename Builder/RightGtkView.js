//<script type="text/javascript">
Gio = imports.gi.Gio;
Gtk = imports.gi.Gtk;
Gdk = imports.gi.Gdk;
GObject = imports.gi.GObject;
 

/**
* we use a hidden window to render the created dialog...
* then use snapshot to render it to an image...
* 
*/
 

XObject = imports.XObject.XObject;
File = imports.File.File;
console = imports.console;

LeftTree = imports.Builder.LeftTree.LeftTree ;
LeftPanel = imports.Builder.LeftPanel.LeftPanel;
 //console.dump(imports.Builder.LeftTree);
 //Seed.quit();

RightGtkView = new XObject({
        xtype : Gtk.VBox,
        pack : [ 'append_page', new Gtk.Label({ label : "Gtk View" })  ],
        items : [
        
            {
                xtype: Gtk.HBox,
                pack : [ 'pack_start', false, true, 0 ],
                items : [       
                    {
                        
                        
                        xtype: Gtk.Button,
                        label : 'Redraw',
                        pack : [ 'pack_start', false, false, 0 ],
                        listeners : {
                            // pressed...
                            'button-press-event' : function(w, ev ){
                                /// dump..
                                return true;
                                // show the MidPropTree..
                            }
                          
                        }
                    }
                ]
            }, 
            {
            
                     
                renderedData : false, 
                xtype: Gtk.ScrolledWindow,
               
                smooth_scroll : true,
                shadow_type : Gtk.ShadowType.IN ,
                init : function() {
                    XObject.prototype.init.call(this); 
                     
                    this.el.set_policy(Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC);
                },
                
                items : [
                
                
                    {
                        id : 'view',
                        xtype : function() {
                            return new Gtk.Image.from_stock (Gtk.STOCK_HOME, 100) 

                        },
                        packing : ['add' ],
                        ready : false,
                        init : function() {
                            XObject.prototype.init.call(this); 
                            // fixme!
                           
                            Gtk.drag_dest_set
                            (
                                    this.el,              /* widget that will accept a drop */
                                    Gtk.DestDefaults.MOTION  | Gtk.DestDefaults.HIGHLIGHT,
                                    null,            /* lists of target to support */
                                    0,              /* size of list */
                                    Gdk.DragAction.COPY         /* what to do with data after dropped */
                            );
                            
                           // print("RB: TARGETS : " + LeftTree.atoms["STRING"]);
                            Gtk.drag_dest_set_target_list(this.el, LeftTree.targetList);
                            //Gtk.drag_dest_add_text_targets(this.el);
                        },   
                        listeners : {
                            
                              
                            
                            "drag-leave" : function () {
                                Seed.print("TARGET: drag-leave");
                                // stop monitoring of mouse montion in rendering..
                                return true;
                            },
                            'drag-motion' : function (w, ctx,  x,   y,   time, ud) 
                            {
                                
                            
                               // console.log('DRAG MOTION'); 
                                // status:
                                // if lastCurrentNode == this.currentNode.. -- don't change anything..
                                 
                                
                                // A) find out from drag all the places that node could be dropped.
                                var src = Gtk.drag_get_source_widget(ctx);
                                if (!src.dropList) {
                                    Gdk.drag_status(ctx, 0, time);
                                    return true;
                                }
                                // b) get what we are over.. (from activeNode)
                                // tree is empty.. - list should be correct..
                                if (!LeftTree.get('model').currentTree) {
                                    Gdk.drag_status(ctx, Gdk.DragAction.COPY,time);
                                    return true;
                                    
                                }
                                // c) ask tree where it should be dropped... - eg. parent.. (after node ontop)
                                var activeNode = this.getActiveNode(x, y);
                                
                                
                                var tg = LeftTree.get('model').findDropNode(activeNode, src.dropList);
                                console.dump(tg);
                                if (!tg.length) {
                                    Gdk.drag_status(ctx, 0,time);
                                    LeftTree.get('view').highlight(false);
                                    return true;
                                }
                                 
                                // if we have a target..
                                // -> highlight it! (in browser)
                                // -> highlight it! (in tree)
                                
                                Gdk.drag_status(ctx, Gdk.DragAction.COPY,time);
                                LeftTree.get('view').highlight(tg);
                                this.targetData = tg;
                                // for tree we should handle this...
                                return true;
                                
                            },
                            "drag-drop"  : function (w, ctx,x,y,time, ud) 
                            {
                                        
                                Seed.print("TARGET: drag-drop");
                                is_valid_drop_site = true;
                                
                                 
                                Gtk.drag_get_data
                                (
                                        w,         /* will receive 'drag-data-received' signal */
                                        ctx,        /* represents the current state of the DnD */
                                        LeftTree.atoms["STRING"],    /* the target type we want */
                                        time            /* time stamp */
                                );
                                
                                
                                /* No target offered by source => error */
                               

                                return  is_valid_drop_site;
                                

                            },
                            "drag-data-received" : function (w, ctx,  x,  y, sel_data,  target_type,  time, ud) 
                            {
                                Seed.print("GtkView: drag-data-received");
                                delete_selection_data = false;
                                dnd_success = false;
                                /* Deal with what we are given from source */
                                if( sel_data && sel_data.length ) {
                                    
                                    if (ctx.action == Gdk.DragAction.ASK)  {
                                        /* Ask the user to move or copy, then set the ctx action. */
                                    }

                                    if (ctx.action == Gdk.DragAction.MOVE) {
                                        delete_selection_data = true;
                                    }
                                    var source = Gtk.drag_get_source_widget(ctx);

                                    Seed.print("Browser: source.DRAGDATA? " + source.dragData);
                                    if (this.targetData) {
                                        Seed.print(this.targetData);
                                        LeftTree.get('model').dropNode(this.targetData,  source.dragData);
                                    }
                                    
                                    
                                    
                                    dnd_success = true;
         
                                }

                                if (dnd_success == false)
                                {
                                        Seed.print ("DnD data transfer failed!\n");
                                }
                                
                                Gtk.drag_finish (ctx, dnd_success, delete_selection_data, time);
                                return true;
                            }
                            
                           //'line-mark-activated' : line_mark_activated,
                           
                            
                        },
                        renderJS: function(data) {
                            
                        },
                        getActiveNode : function(x,y)
                        {
                           // workout what node is here..
                            return '0'; // top..
                        }
                    }
                ]
            }
                
        ],
        renderJs : function(data)
        {
            /**
             * first effort..
             * 
             */
            
            
            
        }
        
    }
    
    
);
    
