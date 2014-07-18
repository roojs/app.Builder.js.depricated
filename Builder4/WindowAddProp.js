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
WindowAddProp=new XObject({
    xtype: Gtk.ScrolledWindow,
    id : "MidPropTree",
    init : {
        this.el.set_policy (Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC)
      //  this.el.set_size_request ( 150, -1 );
        //this.shown = true;
    },
    shadow_type : Gtk.ShadowType.IN,
    items : [
        {
            xtype: Gtk.TreeView,
            listeners : {
                cursor_changed : () {
                        Gtk.TreeIter iter;
                        Gtk.TreeModel mode;
                
                        var m = _this.model;
                        var s = this.el.get_selection();
                        if (!s.get_selected(out mod, out iter)) {
                		return; 
                	}
                        var tp = m.el.get_path(iter).to_string();
                        
                        
                        // var val = "";
                        
                        
                        var key = m.getValue(iter, 0);
                        
                        var type = m.getValue(iter, 1);
                        var skel = m.getValue(iter, 3);
                        var etype = m.getValue(iter, 5);
                        
                        
                        
                        _this.select(key,type,skel, etype);
                        
                }
            },
            pack : "add",
            tooltip_column : 2,
            enable_tree_lines : true,
            headers_visible : false,
            init : {  
                   var description = new Pango.FontDescription();
                 description.set_size(8000);
                this.el.modify_font(description);     
                                
                this.el.get_selection().set_mode( Gtk.SelectionMode.SINGLE);
             
            
                
              
                
            },
            items : [
                {
                    xtype: Gtk.ListStore,
                    id : "model",
                    pack : "set_model",
                    getValue : function(treepath, col)
                    {
                        var tp = new Gtk.TreePath.from_string (treepath);
                        var iter = new Gtk.TreeIter();
                        this.el.get_iter (iter, tp);
                        var value = new GObject.Value('');
                        this.el.get_value(iter, col, value);
                        return value.value;
                        
                    },
                    init : function() {
                        XObject.prototype.init.call(this);
                       this.el.set_column_types ( 6, [
                            GObject.TYPE_STRING,  // real key
                             GObject.TYPE_STRING, // real type
                             GObject.TYPE_STRING, // docs ?
                             GObject.TYPE_STRING, // visable desc
                             GObject.TYPE_STRING, // function desc
                             GObject.TYPE_STRING // element type (event|prop)
                            
                        ] );
                    },
                    showData : function(type) {
                        this.el.clear();
                                if (!this.get('/MidPropTree').activeElement || !type) {
                                    return; // no active element
                                }
                    
                                var fullpath = this.get('/LeftTree.model').file.guessName(this.get('/MidPropTree').activeElement);
                                var palete = this.get('/LeftTree').getPaleteProvider();
                                
                                 
                                
                                Seed.print('Showing right?');
                                if (!this.get('/MidPropTree').shown) {
                    
                                    this.get('/Window.left').el.position = this.get('/Window.left').el.position  + 150;
                                    this.get('/MidPropTree').el.show();
                                    this.get('/MidPropTree').shown = true;
                                }
                                
                                var elementList = palete.getPropertiesFor(fullpath, type).sort(function(a,b) { 
                                    return a.name >  b.name ? 1 : -1;
                                });
                                print ("GOT " + elementList.length + " items for " + fullpath + "|" + type);
                               // console.dump(elementList);
                               
                                
                                var iter = new Gtk.TreeIter();
                                for(var i =0 ; i < elementList.length; i++) {
                                    var p=elementList[i];
                                    this.el.append(iter);
                                  //  console.log( '<b>' + p.name +'</b> ['+p.type+']');
                                        //GObject.TYPE_STRING,  // real key
                                        // GObject.TYPE_STRING, // real type
                                        // GObject.TYPE_STRING, // docs ?this.el.set_value(iter, 0, p.name);et_value(iter, 0, p.name);
                                        // GObject.TYPE_STRING // func def?
                                        
                                    
                                    this.el.set_value(iter, 0, p.name);
                                    this.el.set_value(iter, 1, p.type);
                                    this.el.set_value(iter, 2, '<span size="small"><b>' + p.name +'</b> ['+p.type+']</span>' + "\n" + p.desc);
                                    this.el.set_value(iter, 3, p.sig ? p.sig  : '');
                                    this.el.set_value(iter, 4, '<span size="small"><b>' + p.name +'</b> ['+p.type+']</span>');
                                    this.el.set_value(iter, 5, type);
                                    
                                }
                                                 
                    }
                },
                {
                    xtype: Gtk.TreeViewColumn,
                    pack : false,
                    init : function() {
                        this.el = new Gtk.TreeViewColumn();
                        this.parent.el.append_column(this.el);
                        
                        XObject.prototype.init.call(this);
                        this.el.add_attribute(this.items[0].el , 'markup', 4  );
                    },
                    items : [
                        {
                            xtype: Gtk.CellRendererText,
                            pack : "pack_start,true"
                        }
                    ]
                }
            ]
        }
    ]
});
WindowAddProp.init();
XObject.cache['/WindowAddProp'] = WindowAddProp;
