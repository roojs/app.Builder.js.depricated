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
            label : 'Gtk - Add "pack"',
            tooltip_markup : "Set what type of packing is to be used.",
            listeners : {
                activate : function () {
                    var LeftPanel = imports.Builder.LeftPanel.LeftPanel;
                    LeftPanel.get('model').add( {
                        key : 'pack', 
                        type : 'string',
                        val : 'add',
                        //skel  : skel,
                        etype : 'props'
                    }) //, skel);
                }
            }
        },
        {
            xtype : Gtk.MenuItem,
            pack : [ 'append' ],
            label : 'Gtk - Add "init"',
            tooltip_markup : "Set what type of packing is to be used.",
            listeners : {
                activate : function () {
                    var LeftPanel = imports.Builder.LeftPanel.LeftPanel;
                    LeftPanel.get('model').add( {
                        key : '|init', 
                        type : 'function',
                        val : 'add',
                        skel  : "function() {\n    XObject.prototype.init.call(this);\n}\n",
                        etype : 'props'
                    }) //, skel);
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
