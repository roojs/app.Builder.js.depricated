//<Script type="text/javascript">

Gtk = imports.gi.Gtk;
GObject = imports.gi.GObject;
Gio = imports.gi.Gio;
GLib = imports.gi.GLib;

XObject = imports.XObject.XObject;
console = imports.console;



/**
 * add a component
 * 
 * basically uses a standard template ? pulled from the web?
 * 
 * you have to pick which template, and give it a name..
 * 
 * and pick which directory to put it in?
 * 
 */


StandardErrorDialog = new XObject({
    
    
    
    xtype : Gtk.MessageDialog,
    modal : true,
    buttons : Gtk.ButtonsType.OK,
    'message-type' : Gtk.MessageType.ERROR,
    //"secondary-text"           gchar*                : Read / Write
    //"secondary-use-markup"     gboolean              : Read / Write
    text   : "FIXME",
    "use-markup"     : true,
    
    show : function(msg)
    {
        if (!this.el) {
            this.init();
        }
        this.el.text =  msg;
        this.el.show_all();
    },
    
    listeners :  {
        'delete-event' : function (widget, event) {
            this.el.hide();
            return true;
        },
        
        response : function () {
            this.el.hide();
        }
    }
});