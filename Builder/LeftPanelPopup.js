//<Script type="text/javascript">
Gtk = imports.gi.Gtk;
GLib = imports.gi.GLib;
GObject = imports.gi.GObject;
XN = imports.xnew;
console = imports.console;
 

 

LeftPanelPopup = new XObject({
    
        
    xtype : Gtk.Menu,
    
     
    items :  [
        {
            
            
            xtype : Gtk.MenuItem,
            pack : [ 'append' ],
            label : 'Delete Property / Event',
            listeners : {
                activate : function () {
                    LeftPanel.get('model').deleteSelected();
                }
            }
        },
    
      {
            
            
            xtype : Gtk.MenuItem,
            pack : [ 'append' ],
            label : 'Change Property to Javascript Value',
            listeners : {
                activate : function () {
                   LeftPanel.get('model').setSelectedToJS();
                }
            }
        },
        {
            
            
            xtype : Gtk.MenuItem,
            pack : [ 'append' ],
            label : 'Change Property to String (or native) Value',
            listeners : {
                activate : function () {
                    LeftPanel.get('model').setSelectedToNoJS();
                }
            }
        },
    ]
});
