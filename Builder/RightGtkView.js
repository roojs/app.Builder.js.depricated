//<script type="text/javascript">
Gio = imports.gi.Gio;
Gtk = imports.gi.Gtk;
Gdk = imports.gi.Gdk;
GObject = imports.gi.GObject;
 GLib= imports.gi.GLib;

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
        lastSrc : '',
        pack : [ 'append_page', new Gtk.Label({ label : "Gtk View" })  ],
        items : [
        
            {
                xtype: Gtk.HBox,
                pack : [ 'pack_start', false, true, 0 ],
                items : [       
                    {
                        
                        
                        xtype: Gtk.Button,
                        label : 'Show in New Window',
                        pack : [ 'pack_start', false, false, 0 ],
                        listeners : {
                            // pressed...
                            'button-press-event' : function(w, ev ){
                                /// dump..
                                RightGtkView.showInWindow();
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
                id: 'view-sw',
                smooth_scroll : true,
                shadow_type : Gtk.ShadowType.IN ,
                init : function() {
                    XObject.prototype.init.call(this); 
                     
                    this.el.set_policy(Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC);
                },
                
                items : [
                    {
                        
                        id : 'view-vbox',
                        xtype : Gtk.Fixed,
                        init : function () {
                            XObject.prototype.init.call(this); 
                            //this.el.set_hadjustment(this.parent.el.get_hadjustment());
                            //this.el.set_vadjustment(this.parent.el.get_vadjustment());
                                
                        },
                        pack : 'add_with_viewport',
                        items: [
                            {
                                id : 'view',
                                xtype : Gtk.VBox,
                                /*
                                xtype : function() {
                                    return new Gtk.Image.from_stock (Gtk.STOCK_HOME, 100) 

                                },
                                */
                                pack : 'put,15,15',
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
                                        var delete_selection_data = false;
                                        var dnd_success = false;
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
                                 
                                getActiveNode : function(x,y)
                                {
                                   // workout what node is here..
                                    return '0'; // top..
                                }
                            }
                        ]
                    }
                ]
            }
                
        ],
        
        showInWindow: function ()
        {
            
            
            var src= this.buildJS(this.get('/LeftTree.model').toJS()[0], true);
            
            
            this.get('/Terminal').feed("Running\n");
            
            //var x = new imports.sandbox.Context();
            //x.add_globals();
            //print(src);
            try {
                Seed.check_syntax('var e = ' + src);
              //  x.eval(src);
            } catch( e) {
                this.get('/Terminal').feed(e.message || e.toString() + "\n");
                this.get('/Terminal').feed(console._dump(e)+"\n");
                if (e.line) {
                    var lines = src.split("\n");
                    var start = Math.max(0, e.line - 10);
                    var end = Math.min(lines.length, e.line + 10);
                    for (var i =start ; i < end; i++) {
                        if (i == e.line) {
                            this.get('/Terminal').feed(">>>>>" + lines[i] + "\n");
                            
                          
                            continue;
                        }
                        
                        this.get('/Terminal').feed(lines[i] + "\n");
                    }
                    
                }
                
                return;
            }
            this.get('/BottomPane').el.set_current_page(1);
            this.get('/Terminal').el.fork_command( null , [], [], "/tmp", false,false,false); 
            var cmd = "/usr/bin/seed /tmp/BuilderGtkView.js\n";
            this.get('/Terminal').el.feed_child(cmd, cmd.length);
            //'/usr/bin/seed',  [ '/tmp/BuilderGtkView.js'], [], "/tmp", false,false,false);
            /*
            var _top = x.get_global_object()._top;
            
            _top.el.set_screen(Gdk.Screen.get_default()); // just in case..
            _top.el.show_all();
            if (_top.el.popup) {
                _top.el.popup(null, null, null, null, 3, null);
            }
            */
        },
        
        buildJS: function(data,withDebug) 
        {
            var i = [ 'Gtk', 'Gdk', 'Pango', 'GLib', 'Gio', 'GObject', 'GtkSource', 'WebKit', 'Vte' ];
            var src = "";
            i.forEach(function(e) {
                src += e+" = imports.gi." + e +";\n";
            });
            
            if (withDebug) {
               src+= "imports.searchPath.push(" + JSON.stringify(GLib.path_get_dirname(__script_path__)) + ");\n";
            }
            
            src += "console = imports.console;\n"; // path?!!?
            src += "XObject = imports.XObject.XObject;\n"; // path?!!?
            src += "XObject.cache = {};\n"; // reset cache!
            if (withDebug) {
                
                
                
                src += "Gtk.init(null,null);\n"; 
            }
            if (withDebug) {
                src += "XObject.debug=true;\n"; 
            }
            
            this.withDebug = withDebug;
            src += '_top=new XObject('+ this.mungeToString(data) + ')\n;';
            src += '_top.init();\n';
            if (withDebug) {
                src += "_top.el.show_all();\n"; 
                src += "Gtk.main();\n"; 
            }
            File.write('/tmp/BuilderGtkView.js', src);
            print("Test code  in /tmp/BuilderGtkView.js");
            this.lastSrc = src;
            return src;
        },
        
        renderJS : function(data, withDebug)
        {
            // can we mess with data?!?!?
            
            /**
             * first effort..
             * sandbox it? - nope then will have dificulting passing. stuff aruond..
             * 
             */
            if (!data) {
                 return; 
            }
            this.withDebug = false;
            
            if (this.renderedEl) {
                this.get('view').el.remove(this.renderedEl);
                this.renderedEl.destroy();
                this.renderedEl = false;
            }
            
            var tree =  this.get('/LeftTree.model').toJS()[0];
            // in theory tree is actually window..
            this.renderedEl = this.viewAdd(tree.items[0], this.get('view').el);
            
            this.renderedEl.set_size_request(
                tree.default_width || 600,
                tree.default_height || 400
            );
            this.get('view').el.show_all();
            
            return;
            
            
            var src = this.buildJS(data,withDebug);
            var x = new imports.sandbox.Context();
            x.add_globals();
            //x.get_global_object().a = "hello world";
            
            try {
                Seed.check_syntax('var e = ' + src);
                x.eval(src);
            } catch( e) {
                //if (!withDebug) {
                //   return this.renderJS(data,true);
               // }
                print(e.message || e.toString());
                console.dump(e);
                return;
            }
            
            var r = new Gdk.Rectangle();
            var _top = x.get_global_object()._top;
            
            _top.el.set_screen(Gdk.Screen.get_default()); // just in case..
            _top.el.show_all();
              
            
            if (_top.el.popup) {
                _top.el.popup(null, null, null, null, 3, null);
            }
            
            
            
            var pb = _top.items[0].el.get_snapshot(r);
            _top.el.hide();
            if (!pb) {
                return;
            }
            
            _top.el.destroy();
            x._top = false;
            var Window = imports.Builder.Window.Window;
            var gc = new Gdk.GC.c_new(Window.el.window);
                
                // 10 points all round..
            var full = new Gdk.Pixmap.c_new (Window.el.window, r.width+20, r.height+20, pb.get_depth());
            // draw a white background..
           // gc.set_rgb_fg_color({ red: 0, white: 0, black : 0 });
            Gdk.draw_rectangle(full, gc, true, 0, 0, r.width+20, r.height+20);
            // paint image..
            Gdk.draw_drawable (full, gc, pb, 0, 0, 10, 10, r.width, r.height);
            // boxes..
            //gc.set_rgb_fg_color({ red: 255, white: 255, black : 255 });
            Gdk.draw_rectangle(full, gc, true, 0, 0, 10, 10);
            this.get('view').el.set_from_pixmap(full, null);
            //this.get('view-vbox').el.set_size_request( r.width+20, r.height+20);
            //var img = new Gtk.Image.from_file("/home/alan/solarpanels.jpeg");
            
            
            
        },
        mungeToString:  function(obj, isListener, pad)
        {
            pad = pad || '';
            var keys = [];
            var isArray = false;
            isListener = isListener || false;
             
            // am I munging a object or array...
            if (obj.constructor.toString() === Array.toString()) {
                for (var i= 0; i < obj.length; i++) {
                    keys.push(i);
                }
                isArray = true;
            } else {
                for (var i in obj) {
                    keys.push(i);
                }
            }
            
            
            var els = []; 
            var skip = [];
            if (!isArray && 
                    typeof(obj['|xns']) != 'undefined' &&
                    typeof(obj['xtype']) != 'undefined'
                ) {
                    els.push('xtype: '+ obj['|xns'] + '.' + obj['xtype']);
                    skip.push('|xns','xtype');
                }
            
            var _this = this;
            
            
            
            keys.forEach(function(i) {
                var el = obj[i];
                if (!isArray && skip.indexOf(i) > -1) {
                    return;
                }
                if (isListener) {
                    if (!_this.withDebug) {
                        // do not write listeners unless we are debug mode.
                        return;
                    }
                    //if (obj[i].match(new RegExp("Gtk.main" + "_quit"))) { // we can not handle this very well..
                    //    return;
                   // }
                    var str= ('' + obj[i]).replace(/^\s+|\s+$/g,"");
                    var lines = str.split("\n");
                    if (lines.length > 1) {
                        str = lines.join("\n" + pad);
                    }
                    els.push(JSON.stringify(i) + ":" + str);
                    return;
                }
                if (i[0] == '|') {
                    // does not hapepnd with arrays..
                    if (typeof(el) == 'string' && !obj[i].length) { //skip empty.
                        return;
                    }
                    // this needs to go...
                    //if (typeof(el) == 'string'  && obj[i].match(new RegExp("Gtk.main" + "_quit"))) { // we can not handle this very well..
                    //    return;
                    //}
                    
                    var str= ('' + obj[i]).replace(/^\s+|\s+$/g,"");;
                    var lines = str.split("\n");
                    if (lines.length > 1) {
                        str = lines.join("\n" + pad);
                    }
                    
                    els.push(JSON.stringify(i.substring(1)) + ":" + str);
                    return;
                }
                var left = isArray ? '' : (JSON.stringify(i) + " : " )
                if (typeof(el) == 'object') {
                    els.push(left + _this.mungeToString(el, i == 'listeners', pad + '    '));
                    return;
                }
                els.push(JSON.stringify(i) + ":" + JSON.stringify(obj[i]));
            });
            var spad = pad.substring(0, pad.length-4);
            return (isArray ? '[' : '{') + "\n" +
                pad  + els.join(",\n" + pad ) + 
                "\n" + spad + (isArray ? ']' : '}');
               
            
            
        },
        
        buildView : function()
        {
            
            
        },
        viewAdd : function(item, par)
        {
            // does something similar to xobject..
            item.pack = (typeof(item.pack) == 'undefined') ?  'add' : item.pack;
            
            if (item.pack===false || item.pack === 'false') {  // no ;
                return;
            }
            print("CREATE: " + item['|xns'] + '.' + item['xtype']);
            var ns = imports.gi[item['|xns']];
            var ctr = ns[item['xtype']];
            var ctr_args = { };
            for(var k in item) {
                var kv = item[k];
                if (typeof(kv) == 'object' || typeof(kv) == 'function') {
                    continue;
                }
                if ( 
                    k == 'pack' ||
                    k == 'items' ||
                    k == 'id' ||
                    k == 'xtype' ||
                    k == 'xdebug' ||
                    k == 'xns' ||
                    k == '|xns'
                ) {
                    continue;
                }
                ctr_args[k] = kv;
                
            } 
            
            
            var el = new ctr(ctr_args);
            
            print("PACK");
            console.dump(item.pack);
            
            
            
            
            var args = [];
            var pack_m  = false;
            if (typeof(item.pack) == 'string') {
                 
                item.pack.split(',').forEach(function(e, i) {
                    
                    if (e == 'false') { args.push( false); return; }
                    if (e == 'true') {  args.push( true);  return; }
                    if (!isNaN(parseInt(e))) { args.push( parseInt(e)); return; }
                    args.push(e);
                });
                //print(args.join(","));
                
                pack_m = args.shift();
            } else {
                pack_m = item.pack.shift();
                args = item.pack;
            }
            
            // handle error.
            if (pack_m && typeof(par[pack_m]) == 'undefined') {
                Seed.print('pack method not available : ' + item.xtype + '.' +  pack_m);
                return;
            }
            
            console.dump(args);
            args.unshift(el);
            //if (XObject.debug) print(pack_m + '[' + args.join(',') +']');
            //Seed.print('args: ' + args.length);
            if (pack_m) {
                par[pack_m].apply(par, args);
            }
            
            var _this = this;
            item.items = item.items || [];
            item.items.forEach(function(ch) {
                _this.viewAdd(ch, el);
            });
            
            
            
            // add the signal handlers.
            // is it a widget!?!!?
            
            console.dump(el.gtype);
            if (!el.signal.expose_event) {
                return el;
               }
            el.signal.expose_event.connect(XObject.createDelegate(this.widgetExposeEvent, this));
            el.signal.drag_motion.connect(XObject.createDelegate(this.widgetDragMotionEvent, this));
            el.signal.drag_drop.connect(XObject.createDelegate(this.widgetDragDropEvent, this));
            el.signal.button_press_event.connect(XObject.createDelegate(this.widgetPressEvent, this));
            
            
            
            
            return el;
            
        },
         widgetExposeEvent : function()
        {
            print("WIDGET EXPOSE"); // draw highlight??
            return true;
        },
        widgetDragMotionEvent : function()
        {
            print("WIDGET DRAGMOTION"); 
            return true;
        },
        widgetDragDropEvent : function()
        {
            print("WIDGET DRAGDROP"); 
            return true;
        },
        widgetPressEvent : function()
        {
            print("WIDGET PRESs"); 
            return true;
        }
        
        
        
    } 
    
    
);
    
