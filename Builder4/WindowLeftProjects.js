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
WindowLeftProjects=new XObject({
    xtype: Gtk.ScrolledWindow,
    activeElement : false,
    id : "WindowLeftProjects",
    pack : "pack_end,false,true,0",
    init : this.el.set_policy (Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC),
    shadow_type : Gtk.ShadowType.IN,
    items : [
        {
            xtype: Gtk.TreeView,
            listeners : {
                cursor_changed : function (self) {
                       var iter = new Gtk.TreeIter();
                                        
                                        //console.log('changed');
                        var m = this.get('model');
                	if (!this.selection){
                		this.selection = this.el.get_selection();
                	}
                
                        var s = this.selection;
                        if (!s.get_selected(m.el, iter)) {
                		return; 
                	}
                        var tp = m.el.get_path(iter).to_string();
                        
                        
                        // var val = "";
                        
                        var key = m.getValue(tp, 0);
                        
                        var type = m.getValue(tp, 1);
                        var skel = m.getValue(tp, 3);
                        var etype = m.getValue(tp, 5);
                        
                        
                        this.get('/MidPropTree').hideWin();
                
                        if (type.toLowerCase() == 'function') {
                            
                            if (etype != 'events') {
                                key = '|' + key;
                            }
                            
                            this.get('/LeftPanel.model').add({
                                key :  key, 
                                type : type,
                                val  : skel,
                                etype : etype
                            })  
                            return;
                        }
                        // has dot in name, and is boolean???? this does not make sense..
                        //if (type.indexOf('.') > -1 ||  type.toLowerCase() == 'boolean') {
                        //     key = '|' + key;
                       // }
                        
                        this.get('/LeftPanel.model').add( {
                            key : key, 
                            type : type,
                            //skel  : skel,
                            etype : etype
                           }) //, 
                }
            },
            pack : "add",
            tooltip_column : 2,
            enable_tree_lines : true,
            headers_visible : false,
            init : function() {
            	XObject.prototype.init.call(this); 
                                
                   var description = new Pango.FontDescription.c_new();
                 description.set_size(8000);
                this.el.modify_font(description);     
                                
                //this.selection = this.el.get_selection();
                // this.selection.set_mode( Gtk.SelectionMode.SINGLE);
             
            
                
              
                
            },
            items : [
                {
                    xtype: Gtk.ListStore,
                    n_columns : 2,
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
WindowLeftProjects.init();
XObject.cache['/WindowLeftProjects'] = WindowLeftProjects;
