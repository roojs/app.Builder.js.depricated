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
    listeners : {
        delete_event : (event) => {
            this.el.response(Gtk.ResponseType.CANCEL);
            this.el.hide();
            return true;
        }
    },
    name : "DialogConfirm",
    text : "Tests",
    title : "Please Confirm d",
    buttons : Gtk.ButtonsType.YES_NO,
    'int:show' : (string title, string msg) {
         //if (!this.el) { this.init(); } 
         //this.success = success;
         this.el.title = title;
        this.el.text =  msg;
        this.el.show_all();
        return  this.el.run();
        
    
    },
    message_type : Gtk.MessageType.QUESTION,
    modal : true,
    use_markup : true
});
DialogConfirm.init();
XObject.cache['/DialogConfirm'] = DialogConfirm;
