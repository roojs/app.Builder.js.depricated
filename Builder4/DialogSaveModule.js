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
DialogSaveModule=new XObject({
    xtype: Gtk.Dialog,
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
                    (Gtk.Window) _this.el,
                    "You must give the template a name. "
                );
                return;
            }
            if (!Regex.match_simple ("^[A-Za-z\.]+$", name) || 
                !Regex.match_simple ("^[A-Za-z\.]+$", name) )
            {
                StandardErrorDialog.show(
                    (Gtk.Window) _this.el,
        
                    "Template Nane must contain only letters dots"
                );
                 return;
            }
            
            _this.palete.saveTemplate(name, _this.data);
            // now we save it..
            this.el.hide();
            
        }
    },
    default_height : 200,
    default_width : 400,
    modal : true,
    'void:show' : (Gtk.Window parent, Palete.Palete palete, JsRender.Node data) {
     
        
     
        
        this.el.set_transient_for(parent);
        this.data = data;
        this.palete = palete;
        this.name.el.set_text("");
        this.el.show_all();
    },
    items : [
        {
            xtype: Gtk.HBox,
            pack : get_content_area().add,
            items : [
                {
                    xtype: Gtk.Label,
                    label : "Name",
                    pack : "add"
                },
                {
                    xtype: Gtk.Entry,
                    id : "name",
                    pack : "add"
                }
            ]
        },
        {
            xtype: Gtk.Button,
            label : "Cancel",
            pack : "add_action_widget,0"
        },
        {
            xtype: Gtk.Button,
            label : "OK",
            pack : "add_action_widget,1"
        }
    ]
});
DialogSaveModule.init();
XObject.cache['/DialogSaveModule'] = DialogSaveModule;
