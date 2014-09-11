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
DialogSaveTemplate=new XObject({
    default_width : 400,
    show : (Gtk.Window parent, Palete.Palete palete, JsRender.Node data) {
     
        
     
         var t =DialogSaveTemplate;
        if (t == null) {
           t =   new Xcls_DialogSaveTemplate();
        }
        t.el.set_transient_for(parent);
        t.data = data;
        t.palete = palete;
        t.name.el.set_text("");
        t.el.show_all();
    },
    xtype : "Dialog",
    default_height : 200,
    palete : "",
    modal : true,
    data : "",
    xns : Gtk,
    listeners : {
    	delete_event : (self, event) => {
    	       this.el.hide();
    	       return true;
    	       
    	   },
    	response : (self, response_id) => {
    	   
    	       if (response_id < 1) {
    	           this.el.hide();
    	            return;
    	       }
    	       var name = _this.name.el.get_text();
    	       if (name.length < 1) {
    	           StandardErrorDialog.singleton().show(
    	               this.el,
    	               "You must give the template a name. "
    	           );
    	           return;
    	       }
    	       if (!Regex.match_simple ("^[A-Za-z]^[A-Za-z0-9 ]+$", name))
    	       {
    	           StandardErrorDialog.singleton().show(
    	               this.el,
    	               "Template Nane must contain only letters and spaces. "
    	           );
    	            return;
    	       }
    	       _this.palete.saveTemplate(name, _this.data);
    	       // now we save it..
    	       this.el.hide();
    	       
    	   }
    },
    items : [
    	{
            xtype : "HBox",
            pack : get_content_area().add,
            xns : Gtk,
            items : [
            	{
                    label : "Name",
                    xtype : "Label",
                    xns : Gtk
                },
            	{
                    id : "name",
                    xtype : "Entry",
                    xns : Gtk
                }
            ]

        },
    	{
            label : "Cancel",
            xtype : "Button",
            xns : Gtk
        },
    	{
            label : "OK",
            xtype : "Button",
            xns : Gtk
        }
    ]

});
DialogSaveTemplate.init();
XObject.cache['/DialogSaveTemplate'] = DialogSaveTemplate;
