//<Script type="text/javascript">
Gio = imports.gi.Gio;
Gtk = imports.gi.Gtk;
Gdk = imports.gi.Gdk;
GObject = imports.gi.GObject;
XN = imports.xnew;
console = imports.console;
Pango = imports.gi.Pango ;

Builder = imports['Builder.js'];

var _view;
 
var _view = false;

function create() // parent?
{
    
            
    return {
        xns : 'Gtk',
        xtype: 'ScrolledWindow',
        smooth_scroll : true,
        
        set : {
            set_shadow_type : [ Gtk.ShadowType.IN ],
            set_policy : [Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC]
        },
        
        items : [
            {
                xns : 'WebKit',
                xtype : 'WebView',
                packing : ['add' ],
                ready : false,
                listeners : {
                    _new : function () {
                        _view = this;
                    },
                    _rendered : function()
                    {
                        this.el.open('http://www.akbkhome.com/Builder/Pman/Builder/Gtk/index.html?ts='+Math.random());
                        
                        
                        Gtk.drag_dest_set
                        (
                                this.el,              /* widget that will accept a drop */
                                Gtk.DestDefaults.MOTION  | Gtk.DestDefaults.HIGHLIGHT,
                                null,            /* lists of target to support */
                                0,              /* size of list */
                                Gdk.DragAction.COPY         /* what to do with data after dropped */
                        );
                        targets = new Gtk.TargetList();
                        targets.add( Builder.atoms["STRING"], 0, 0);
                        Gtk.drag_dest_set_target_list(this.el, targets);
                        Gtk.drag_dest_add_text_targets(this.el);
                        
                    },
                   
                    'load-finished' : function() {
                        if (this.ready) { // dont do it twice!
                            return; 
                        }
                        this.ready = true;
                        
                        _view.renderJS(imports['Builder/LeftTree.js']._model.toJS()[0]);
                       // this.el.execute_script("alert(document.documentElement.innerHTML);");
                    },
                    // we should really use console...
                    'script-alert' : function(w,s,r) {
                        Seed.print(r);
                        return false;
                        return true;
                    },
                    'console-message' : function (a,b,c) {
                        console.log(b);
                        if (!b.match(/^\{/)) {
                            return false; // do not handle!!! -> later maybe in console..
                        }
                        console.log(b);
                        var val =  JSON.parse(b);
                        if (typeof(val['hover-node']) != 'undefined') {
                            this.activeNode = val['hover-node'];
                            console.log('active node: ' + this.activeNode);
                            return true;
                        }
                        
                        
                        //Seed.print('a:'+a);
                        //Seed.print('b:'+b);
                        //Seed.print('c:'+c);
                        return false;
                    },
                    
                    "drag-leave" : function () {
                        Seed.print("TARGET: drag-leave");
                        // stop monitoring of mouse montion in rendering..
                        return true;
                    },
                    'drag-motion' : function (w, ctx,  x,   y,   time, ud) 
                    {
                        
                        // status:
                        // if lastCurrentNode == this.currentNode.. -- don't change anything..
                        this.targetData = [];
                        this.el.execute_script("Builder.overPos(" + x +','+ y + ");");
                        
                        // A) find out from drag all the places that node could be dropped.
                        var src = Gtk.drag_get_source_widget(ctx);
                        if (!src.dropList) {
                            Gdk.drag_status(ctx, 0, time);
                            return true;
                        }
                        // b) get what we are over.. (from activeNode)
                        // tree is empty.. - list should be correct..
                        if (!Builder.LeftTree._model.currentTree) {
                            Gdk.drag_status(ctx, Gdk.DragAction.COPY,time);
                            return true;
                            
                        }
                        // c) ask tree where it should be dropped... - eg. parent.. (after node ontop)
                        
                        var tg = Builder.LeftTree._model.findDropNode(this.activeNode, src.dropList);
                     //   Seed.print(tg);
                        if (!tg.length) {
                            Gdk.drag_status(ctx, 0,time);
                            Builder.LeftTree._view.highlight(false);
                            return true;
                        }
                        
                        // if we have a target..
                        // -> highlight it! (in browser)
                        // -> highlight it! (in tree)
                        
                        Gdk.drag_status(ctx, Gdk.DragAction.COPY,time);
                        Builder.LeftTree._view.highlight(tg);
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
                                Builder.atoms["STRING"],    /* the target type we want */
                                time            /* time stamp */
                        );
                        
                        
                        /* No target offered by source => error */
                       

                        return  is_valid_drop_site;
                        

                    },
                    "drag-data-received" : function (w, ctx,  x,  y, sel_data,  target_type,  time, ud) 
                    {
                        Seed.print("Browser: drag-data-received");
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
                                Builder.LeftTree._model.dropNode(this.targetData,  source.dragData);
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
                    var str = JSON.stringify(data) ;
                    if (!this.ready) {
                        console.log('not loaded yet');
                    }
                    Seed.print(str);
                    this.el.execute_script("Builder.render(" + JSON.stringify(data) + ");");
                }
                
                
                /* things we can read.. - to copy settings..
                    this.get_show_line_numbers ();
                    this.get_show_line_marks ();
                    this.get_show_right_margin ();

                    this.get_highlight_current_line ();
                    this.get_wrap_mode () != Gtk.WRAP_NONE

                    this.get_auto_indent ();
                    this.get_insert_spaces_instead_of_tabs ();
                    this.get_indent_width ();

                    
                    
                */
                
                
                
                
                /*Color color;
                
                function mark_tooltip_func  (mark)
                {
                    var iter = new Gtk.TextIter;;
                    var buf = mark.get_buffer ();                                
                    buf.get_iter_at_mark (iter, mark);
                    var line = iter.get_line (iter) + 1;
                    column = iter.get_line_offset (iter);

                    if ((mark.get_category () == "one")) {
                        return "Line:" + line + "  Column: " + column;
                    }
                    
                    return "<b>Line</b>:" + line + "\n<i>Column:</i>" + column;
                    
                }
                
                var color = new Gdk.Color();
                
                Gtk.Color.parse("lightgreen", color);
                
                this.set_mark_category_background (view, "one", color);
                this.set_mark_category_icon_from_stock (view, "one", GTK_STOCK_YES);
                this.set_mark_category_priority (view, "one", 1);
                this.set_mark_category_tooltip_func (view,  "one", mark_tooltip_func, null, null);

                gdk_color_parse ("pink", color);
                this.set_mark_category_background (view, "two", &color);
                this.set_mark_category_icon_from_stock (view, "two", GTK_STOCK_NO);
                this.set_mark_category_priority (view, "two", 2);
                this.set_mark_category_tooltip_markup_func (view, "two", mark_tooltip_func, NULL, NULL);
       */

                
            }
        ]
    };
        
        
    
    
    
}
    
