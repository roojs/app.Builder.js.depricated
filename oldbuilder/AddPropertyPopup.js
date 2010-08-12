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
            label : 'Add "id"',
            tooltip_markup : "Using this.get('*someid') will find any id in an application.",
            listeners : {
                activate : function () {
                    var LeftPanel = imports.Builder.LeftPanel.LeftPanel;
                    LeftPanel.get('model').add( {
                        key : 'id', 
                        type : 'string',
                        val : '',
                        //skel  : skel,
                        etype : 'props'
                    }) //, skel);
                }
            }
        },
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
                        val  : "function() {\n    XObject.prototype.init.call(this);\n}\n",
                        etype : 'props'
                    }) //, skel);
                }
            }
        },
    
       
        {
            xtype : Gtk.MenuItem,
            pack : [ 'append' ],
            label : 'Add String Property (User defined)',
            listeners : {
                activate : function () {
                    var LeftPanel = imports.Builder.LeftPanel.LeftPanel;
                    LeftPanel.get('model').add( {
                        key : '', 
                        type : 'string',
                        val  : "",
                        etype : 'props'
                    });
                   
                }
            }
            
        },
        {
            xtype : Gtk.MenuItem,
            pack : [ 'append' ],
            label : 'Add Number Property (User defined)',
            listeners : {
                activate : function () {
                    var LeftPanel = imports.Builder.LeftPanel.LeftPanel;
                    LeftPanel.get('model').add( {
                        key : '', 
                        type : 'number',
                        val  : 0,
                        etype : 'props'
                    });
                   
                }
            }
            
        },
        {
            xtype : Gtk.MenuItem,
            pack : [ 'append' ],
            label : 'Add Boolean Property (User defined)',
            listeners : {
                activate : function () {
                    var LeftPanel = imports.Builder.LeftPanel.LeftPanel;
                    LeftPanel.get('model').add( {
                        key : '', 
                        type : 'boolean',
                        val  : false,
                        etype : 'props'
                    });
                   
                }
            }
            
        },
        {
            
            
            xtype : Gtk.MenuItem,
            pack : [ 'append' ],
            label : 'Add Function (User defined)',
            listeners : {
                activate : function () {
                    var LeftPanel = imports.Builder.LeftPanel.LeftPanel;
                    LeftPanel.get('model').add( {
                        key : '|', 
                        type : 'function',
                        val  : "function() {\n    \n}\n",
                        etype : 'props'
                    }) //, skel);
                }
            }
            
        },
    ]
});
