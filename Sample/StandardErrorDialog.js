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
StandardErrorDialog=new XObject({
    xtype: Gtk.MessageDialog,
    buttons : Gtk.ButtonsType.OK,
    modal : true,
    message_type : Gtk.MessageType.ERROR,
    text : "fixme",
    use_markup : true,
    show : function(msg) {
         if (!this.el) {
                this.init();
            }
            this.el.text =  msg;
            this.el.show_all();
    },
    listeners : {
        "delete_event":function (self, event) {
            this.el.hide();
            return true;
        },
        "response":function (self, response_id) {
           this.el.hide();
        }
    }
})
;StandardErrorDialog.init();
XObject.cache['/StandardErrorDialog'] = StandardErrorDialog;
;