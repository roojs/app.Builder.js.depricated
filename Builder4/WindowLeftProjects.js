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
                    columns : "typeof(string), typeof(Object)",
                    id : "model",
                    n_columns : 2,
                    pack : "set_model"
                },
                {
                    xtype: Gtk.TreeViewColumn,
                    pack : "append_column",
                    init : this.parent.el.append_column(this.el);
                        
                        XObject.prototype.init.call(this);
                        this.el.add_attribute(this.items[0].el , 'markup', 4  );,
                    items : [
                        {
                            xtype: Gtk.CellRendererText,
                            id : "name",
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
