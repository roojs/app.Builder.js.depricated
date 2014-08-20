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
    listeners : {
        delete_event : (self, event)  => {
            this.el.hide();
            return true;
            
        },
        response : (self, response_id) => {
           this.el.hide();
        }
    },
    text : "fixme",
    buttons : Gtk.ButtonsType.OK,
    message_type : Gtk.MessageType.ERROR,
    modal : true,
    use_markup : true,
    'void:show' : (string msg) {
    
        this.el.text =  msg;
        this.el.show_all();
    },
    'void:show_all' : () {
        this.show("TEST");
    }
});
StandardErrorDialog.init();
XObject.cache['/StandardErrorDialog'] = StandardErrorDialog;
