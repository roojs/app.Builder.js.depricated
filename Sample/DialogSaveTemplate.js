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
    xtype: Gtk.Dialog,
    listeners : {
        delete_event : function (self, event) {
            this.el.hide();
            return true;
        },
        response : function (self, response_id) {
        
            if (!response_id) {
                this.el.hide();
                 return;
            }
            var name = this.get('name').el.get_text();
            if (!name.length) {
                this.get('/StandardErrorDialog').show(
                    "You must give the template a name. "
                );
                return;
            }
            
           if (!name.match(/^[A-Z ]+$/i) || !name.match(/[A-Z]/i)) {
                this.get('/StandardErrorDialog').show(
                    "Template Nane must contain only letters and spaces. "
                );
                 return;
            }
            this.get('/Window.LeftTree').getPaleteProvider().saveTemplate(name, this.data);
            // now we save it..
                this.el.hide();
            
        }
    },
    default_height : 200,
    default_width : 400,
    modal : true,
    show : function(data) {
        this.data = data;
        this.get('name').el.set_text('');
        this.el.show_all();
    },
    items : [
        {
            xtype: Gtk.HBox,
            pack : function(p,e) {
                                p.el.get_content_area().add(e.el)
                            },
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
DialogSaveTemplate.init();
XObject.cache['/DialogSaveTemplate'] = DialogSaveTemplate;
