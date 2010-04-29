//<Script type="text/javascript">

XN = imports.xnew;
Gtk = imports.gi.Gtk;
GObject = imports.gi.GObject;
Gio = imports.gi.Gio;
GLib = imports.gi.GLib;
console = imports.console;
Builder = imports['Builder.js'];
Roo = imports['Roo.js'];

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



XN.create(  {
    xnsid : 'Builder.StandardErrorDialog',
    xid: 'dialog',
    xtype : 'MessageDialog',
    xns : 'Gtk',
    modal : true,
    buttons : Gtk.ButtonsType.OK,
    'message-type' : Gtk.MessageType.ERROR,
    //"secondary-text"           gchar*                : Read / Write
    //"secondary-use-markup"     gboolean              : Read / Write
    text   : "FIXME",
    "use-markup"     : true,
    
    show : function(msg)
    {
        this.el.text =  msg;
        this.el.show_all();
    },
    
    listeners : 
    {
        'delete-event' : function (widget, event) {
            this.el.hide();
            return true;
        },
        _rendered : function()
        {
          //  this.el.show_all();
        },
        response : function () {
            this.el.hide();
        }
    }
});