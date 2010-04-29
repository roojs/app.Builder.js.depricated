//<Script type="text/javascript">
Gtk = imports.gi.Gtk;
GLib = imports.gi.GLib;
GObject = imports.gi.GObject;

XObject = imports.XObject;
console = imports.console;
 
 
TopMenu = new XObject({
        xtype : Gtk.MenuBar
        pack : [ 'pack_start', false,false ],
        id : 'menu', 
        items :  [
            {
                
                xtype: Gtk.MenuItem,
                pack : [ 'append' ],
                label : 'File',
                
                items : [
                    {
                        xns : 'Gtk',
                        xtype : 'Menu',
                        pack : [ 'set_submenu' ],
                        items : [
                          {
                
                                xns : 'Gtk',
                                xtype : 'MenuItem',
                                pack : [ 'append' ],
                                label : 'New Project (from directory)',
                                listeners : {
                                    activate : function () {
                                        
                                    }
                                }
                            },
                            {
                
                                xns : 'Gtk',
                                xtype : 'MenuItem',
                                pack : [ 'append' ],
                                label : 'Open Project File',
                                listeners : {
                                    activate : function () {
                                        
                                    }
                                }
                            },
                            {
                
                                xns : 'Gtk',
                                xtype : 'MenuItem',
                                pack : [ 'append' ],
                                label : 'Recent (with submenu)',
                                listeners : {
                                    activate : function () {
                                        
                                    }
                                }
                            },
                            
                              {
            
                                xns : 'Gtk',
                                xtype : 'SeparatorMenuItem',
                                pack : [ 'append' ] 
                                 
                            },
                            
                            {
                
                                xns : 'Gtk',
                                xtype : 'MenuItem',
                                pack : [ 'append' ],
                                label : "Test Loader",
                                listeners : {
                                    activate : function () {
                                        
                                        
                                        
                                        
                                    }
                                }
                            },
                            
                              {
            
                                xns : 'Gtk',
                                xtype : 'SeparatorMenuItem',
                                pack : [ 'append' ] 
                                 
                            },
                            {
                
                                xns : 'Gtk',
                                xtype : 'MenuItem',
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
                
                xns : 'Gtk',
                xtype : 'MenuItem',
                pack : [ 'append' ],
                label : 'Settings',
                listeners : {
                    activate : function () {
                        
                    }
                }
            } 
        ]
    };
    
}
 