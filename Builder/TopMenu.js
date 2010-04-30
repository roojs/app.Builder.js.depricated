//<Script type="text/javascript">
Gtk = imports.gi.Gtk;
GLib = imports.gi.GLib;
GObject = imports.gi.GObject;

XObject = imports.XObject.XObject;
console = imports.console;
 
 
TopMenu = new XObject({
    id : 'TopMenu',
    xtype : Gtk.MenuBar,
    pack : [ 'pack_start', false,false ],
    id : 'menu', 
    items :  [
        {
            
            xtype: Gtk.MenuItem,
            pack : [ 'append' ],
            label : 'File',
            
            items : [
                {
                    
                    xtype : Gtk.Menu,
                    pack : [ 'set_submenu' ],
                    items : [
                      {
            
                            
                            xtype : Gtk.MenuItem,
                            pack : [ 'append' ],
                            label : "New Project (from directory)",
                            listeners : {
                                activate : function () {
                                    
                                }
                            }
                        },
                        {
            
                            
                            xtype : Gtk.MenuItem,
                            pack : [ 'append' ],
                            label : 'Open Project File',
                            listeners : {
                                activate : function () {
                                    
                                }
                            }
                        },
                        {
            
                            
                            xtype : Gtk.MenuItem,
                            pack : [ 'append' ],
                            label : 'Recent (with submenu)',
                            listeners : {
                                activate : function () {
                                    
                                }
                            }
                        },
                        
                          {
        
                            
                            xtype : Gtk.SeparatorMenuItem,
                            pack : [ 'append' ] 
                             
                        },
                        
                        {
            
                            
                            xtype : Gtk.MenuItem,
                            pack : [ 'append' ],
                            label : "Test Loader",
                            listeners : {
                                activate : function () {
                                    
                                    
                                    
                                    
                                }
                            }
                        },
                        
                          {
        
                            
                            xtype : Gtk.SeparatorMenuItem,
                            pack : [ 'append' ] 
                             
                        },
                        {
            
                            
                            xtype : Gtk.MenuItem,
                            pack : [ 'append' ],
                            label : 'Quit',
                            listeners : {
                                activate : function () {
                                    Seed.quit();
                                }
                            }
                        },
                    ]
                }
            ]
        },
    
        {
            
            
            xtype : Gtk.MenuItem,
            pack : [ 'append' ],
            label : 'Settings',
            listeners : {
                activate : function () {
                    
                }
            }
        } 
    ]
});
 