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
                    imports.Builder.LeftPanel.LeftPanel.get('model').deleteSelected();
                }
            }
        },
    
      {
            
            
            xtype : Gtk.MenuItem,
            pack : [ 'append' ],
            label : 'Change Property to Javascript Value',
            listeners : {
                activate : function () {
                   imports.Builder.LeftPanel.LeftPanel.get('model').setSelectedToJS();
                }
            }
        },
        {
            
            
            xtype : Gtk.MenuItem,
            pack : [ 'append' ],
            label : 'Change Property to String (or native) Value',
            listeners : {
                activate : function () {
                    imports.Builder.LeftPanel.LeftPanel.get('model').setSelectedToNoJS();
                }
            }
            
        },
    ]
});
