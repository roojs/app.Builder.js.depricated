//<Script type="text/javascript">
Gtk = imports.gi.Gtk;
GLib = imports.gi.GLib;
GObject = imports.gi.GObject;


XObject = imports.XObject.XObject;
console = imports.console;


LeftTreeMenu = new XObject( 
    {
  
        xtype : Gtk.Menu,
        
        
        items :  [
            {
                
                xtype : Gtk.MenuItem,
                pack : [ 'append' ],
                label : "Delete Element",
                listeners : {
                    activate : function () {
                        imports.Builder.LeftTree.LeftTree.get('model').deleteSelected();
                    }
                }
            }
            // on our web version, a pulldown with the list of potential items appears...
            // our palete should handle this.. really.
         
        ]
    
    
    }
);
 