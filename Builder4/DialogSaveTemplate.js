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
     
        
            this.el.set_transient_for(parent);
            this.el.modal = true;
            
              this.name.el.set_text("");
            this.el.show_all();
             var   name = "";
            while (true) {
                var response_id = this.el.run();
                if (response_id < 1) {
                    this.el.hide();
                     return;
                }
                
                name = _this.name.el.get_text();
                if (name.length < 1) {
                    StandardErrorDialog.singleton().show(
                         _this.el,
                        "You must give the template a name. "
                    );
                    continue;
                }
                if (!Regex.match_simple ("^[A-Za-z][A-Za-z0-9. ]+$", name) )
                {
                    StandardErrorDialog.singleton().show(
                         _this.el,
                        "Template Name must contain only letters dots"
                    );
                    continue;
                }
                break;
            }
            palete.saveTemplate(name, data);
            
            // now we save it..
            this.el.hide();
            
            
      
       
    },
    xtype : "Dialog",
    default_height : 200,
    palete : "",
    modal : TRUE,
    data : "",
    xns : Gtk,
    listeners : {
    	delete_event : (self, event) => {
    	      this.el.response(Gtk.ResponseType.CANCEL);
    	       return true;
    	       
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
