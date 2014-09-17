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
    default_width : 400,
    title : "Add an Object",
    xtype : "Dialog",
    default_height : 200,
    modal : true,
    xns : Gtk,
    show : (Palete.Palete pal, JsRender.Node node) {
        
        this.el.show_all();
        var opts = pal.listTemplates(node);
        if (opts.length() < 1) {
            this.el.hide();
            return node;
        }
        this.el.set_attached_to( Xcls_MainWindow.singleton().el);
         this.el.set_transient_for( Xcls_MainWindow.singleton().el);
        
        //opts.unshift({ path: '' , name :'Just add Element' });
         _this.model.loadData(opts);
         _this.combo.el.set_active(0);
         
       
        this.el.run();
        this.el.hide();    
        var ix = _this.combo.el.get_active();
        if (ix < 1 ) {
            return node;
        }
       Gtk.TreeIter iter;
        _this.combo.el.get_active_iter (out iter);
        Value vfname;
        this.model.el.get_value (iter, 0, out vfname);
         
        return pal.loadTemplate((string)vfname);
    
    },
    listeners : {
    	delete_event : (self, event)  =>{
    	       this.el.hide();
    	       return true;
    	   }
    },
    items : [
    	{
            xtype : "VBox",
            pack : get_content_area().add,
            xns : Gtk,
            items : [
            	{
                    xtype : "HBox",
                    xns : Gtk,
                    items : [
                    	{
                            label : "Select Template : ",
                            xtype : "Label",
                            xns : Gtk
                        },
                    	{
                            id : "combo",
                            xtype : "ComboBox",
                            xns : Gtk,
                            items : [
                            	{
                                    id : "cellrenderer",
                                    xtype : "CellRendererText",
                                    xns : Gtk
                                },
                            	{
                                    id : "model",
                                    xtype : "ListStore",
                                    columns : typeof(string),typeof(string),
                                    n_columns : 2,
                                    xns : Gtk,
                                    loadData : (GLib.List<string> data) {
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
                                            
                                            el.set_value(iter, 0, str);
                                            el.set_value(iter, 1, fn);
                                            
                                        }
                                        this.el.set_sort_column_id(1, Gtk.SortType.ASCENDING);          
                                                                         
                                    }
                                }
                            ]

                        }
                    ]

                }
            ]

        },
    	{
            label : "OK",
            xtype : "Button",
            xns : Gtk
        }
    ]

});
DialogTemplateSelect.init();
XObject.cache['/DialogTemplateSelect'] = DialogTemplateSelect;
