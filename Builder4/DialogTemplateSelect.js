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
        delete_event : (self, event)  =>{
            this.el.hide();
            return true;
        }
    },
    default_height : 200,
    default_width : 400,
    title : "Add an Object",
    'JsRender.Node?:show' : (Palete.Palete pal, JsRender.Node node) {
        
    
        var opts = pal.listTemplates(node);
        if (opts.length() < 1) {
            return node;
        }
        this.el.set_attached_to( Xcls_MainWindow.singleton().el);
     
        
        //opts.unshift({ path: '' , name :'Just add Element' });
         _this.model.loadData(opts);
         _this.combo.el.set_active(0);
         
        this.el.show_all();
        this.el.run();
        this.el.hide();
        var ix = _this.combo.el.get_active();
        if (ix < 1 ) {
            return null;
        }
         
        return pal.loadTemplate(opts.nth_data(ix));
    
    },
    modal : true,
    items : [
        {
            xtype: Gtk.VBox,
            pack : get_content_area().add,
            items : [
                {
                    xtype: Gtk.HBox,
                    pack : "pack_start,false,false,0",
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
                            init : this.el.add_attribute(_this.cellrenderer.el , "markup", 1 );,
                            items : [
                                {
                                    xtype: Gtk.CellRendererText,
                                    id : "cellrenderer",
                                    pack : "pack_start,true"
                                },
                                {
                                    xtype: Gtk.ListStore,
                                    id : "model",
                                    n_columns : 2,
                                    pack : "set_model",
                                    columns : typeof(string),typeof(string),
                                    'void:loadData' : (GLib.List<string> data) {
                                        this.el.clear();                                    
                                        Gtk.TreeIter iter;
                                        var el = this.el;
                                        
                                        el.append(out iter);
                                        
                                         
                                        el.set_value(iter, 0, "");
                                        el.set_value(iter, 1, "Just add Element");
                                        
                                        for (var i = 0; i < data.length();i++) {
                                        
                                    
                                            el.append(out iter);
                                            var str = data.nth_data(i);
                                            var fn = Path.get_basename (str);
                                            fn.replace(".json", "");
                                            
                                            el.set_value(iter, 0, fn);
                                            el.set_value(iter, 1, str);
                                            
                                        }
                                                  
                                                                         
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
