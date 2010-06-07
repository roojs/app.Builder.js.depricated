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
DialogTemplateSelect=new XObject({
    xtype: Gtk.Dialog,
    listeners : {
        delete_event : function (self, event) {
            this.el.hide();
            return true;
        }
    },
    default_height : 200,
    default_width : 400,
    modal : true,
    show : function(node) {
        
        var pal = this.get('/Window.LeftTree').getPaleteProvider();
        var opts = pal.listTemplates(node);
        if (!opts.length) {
            return node;
        }
      
        opts.unshift('Just add Element')
        this.get('combo.model').loadData(opts);
     
         
        this.el.show_all();
        this.el.run();
        this.el.hide();
        var ix = this.get('combo').el.get_active();
        if (ix < 1 ) {
            return node;
        }
        var fn = opts[i];
        return node;
    },
    items : [
        {
            xtype: Gtk.VBox,
            pack : function(p,e) {
                                p.el.get_content_area().add(e.el)
                            },
            items : [
                {
                    xtype: Gtk.HBox,
                    pack : "pack_start,false,false,0",
                    listeners : {
                        
                    },
                    items : [
                        {
                            xtype: Gtk.Label,
                            label : "Select Template : ",
                            pack : "pack_start,false,false"
                        },
                        {
                            xtype: Gtk.ComboBox,
                            id : "combo",
                            pack : "add",
                            init : function() {
                                XObject.prototype.init.call(this);
                                 this.el.add_attribute(this.items[0].el , 'markup', 1 );
                            },
                            items : [
                                {
                                    xtype: Gtk.CellRendererText,
                                    pack : false
                                },
                                {
                                    xtype: Gtk.ListStore,
                                    id : "model",
                                    pack : "set_model",
                                    init : function() {
                                        XObject.prototype.init.call(this);
                                                this.el.set_column_types ( 2, [
                                                GObject.TYPE_STRING,  // real key
                                                GObject.TYPE_STRING // real type
                                                
                                                
                                            ] );
                                    },
                                    loadData : function (data) {
                                        this.el.clear();                                    
                                        var iter = new Gtk.TreeIter();
                                        var el = this.el;
                                        data.forEach(function(p,i) {
                                            print("add " + p);
                                            el.append(iter);
                                            
                                             
                                            el.set_value(iter, 0, i);
                                            el.set_value(iter, 1, p);
                                            
                                        });
                                                  
                                                                         
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype: Gtk.Button,
            label : "OK",
            pack : "add_action_widget,0"
        }
    ]
});
DialogTemplateSelect.init();
XObject.cache['/DialogTemplateSelect'] = DialogTemplateSelect;
