//<Script type="text/javascript">
Gtk = imports.gi.Gtk;
GLib = imports.gi.GLib;
GObject = imports.gi.GObject;

XObject = imports.XObject.XObject;
console = imports.console;
 



AddPropertyPopup = new XObject({
    
        
    xtype : Gtk.Menu,
    
     
    items :  [
        {
            
            
            xtype : Gtk.MenuItem,
            pack : [ 'append' ],
            label : 'Add "pack"',
            tooltip_markup : "Set what type of packing is to be used.",
            listeners : {
                activate : function () {
                 
                }
            }
        },
    
       
        {
            
            
            xtype : Gtk.MenuItem,
            pack : [ 'append' ],
            label : 'Add Function or Property',
            listeners : {
                activate : function () {
                    // popup with name.
                }
            }
            
        },
    ]
});
