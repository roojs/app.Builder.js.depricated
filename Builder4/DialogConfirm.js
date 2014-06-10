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
DialogConfirm=new XObject({
    xtype: Gtk.MessageDialog,
    'void:show_all' : () {
        this.show("test");
    },
    listeners : {
        delete_event : (event) => {
            this.el.hide();
            return true;
        }
    },
    text : "Tests",
    title : "Please Confirm d",
    buttons : Gtk.ButtonsType.YES_NO,
    message_type : Gtk.MessageType.QUESTION,
    modal : true,
    'void:show' : (string msg) {
         //if (!this.el) { this.init(); } 
         //this.success = success;
        this.el.text =  msg;
        this.el.show_all();
    
    },
    use_markup : true
});
DialogConfirm.init();
XObject.cache['/DialogConfirm'] = DialogConfirm;
