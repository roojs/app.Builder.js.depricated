//<Script type="text/javascript">
Gtk = imports.gi.Gtk;
GLib = imports.gi.GLib;
GObject = imports.gi.GObject;
XN = imports.xnew;
console = imports.console;
Builder = imports['Builder.js']


 
var _menu;


function create() // parent?
{
    return {
        xns : 'Gtk',
        xtype : 'MenuBar',
        packing : [ 'pack_start', false,false ],
        listeners : {
            _new : function () {
                _menu = this;
            }//,
            //_rendered : function() {
            //    this.el.show_all();
           // }
            
        },
        
        items :  [
            {
                
                xns : 'Gtk',
                xtype : 'MenuItem',
                packing : [ 'append' ],
                label : 'File',
                listeners : {
                    activate : function () {
                        
                    }
                },
                items : [
                    {
                        xns : 'Gtk',
                        xtype : 'Menu',
                        packing : [ 'set_submenu' ],
                        items : [
                          {
                
                                xns : 'Gtk',
                                xtype : 'MenuItem',
                                packing : [ 'append' ],
                                label : 'New Project (from directory)',
                                listeners : {
                                    activate : function () {
                                        
                                    }
                                }
                            },
                            {
                
                                xns : 'Gtk',
                                xtype : 'MenuItem',
                                packing : [ 'append' ],
                                label : 'Open Project File',
                                listeners : {
                                    activate : function () {
                                        
                                    }
                                }
                            },
                            {
                
                                xns : 'Gtk',
                                xtype : 'MenuItem',
                                packing : [ 'append' ],
                                label : 'Recent (with submenu)',
                                listeners : {
                                    activate : function () {
                                        
                                    }
                                }
                            },
                            
                              {
            
                                xns : 'Gtk',
                                xtype : 'SeparatorMenuItem',
                                packing : [ 'append' ] 
                                 
                            },
                            
                            {
                
                                xns : 'Gtk',
                                xtype : 'MenuItem',
                                packing : [ 'append' ],
                                label : "Test Loader",
                                listeners : {
                                    activate : function () {
                                        
                                        
                                        
                                        
                                    }
                                }
                            },
                            
                              {
            
                                xns : 'Gtk',
                                xtype : 'SeparatorMenuItem',
                                packing : [ 'append' ] 
                                 
                            },
                            {
                
                                xns : 'Gtk',
                                xtype : 'MenuItem',
                                packing : [ 'append' ],
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
                packing : [ 'append' ],
                label : 'Settings',
                listeners : {
                    activate : function () {
                        
                    }
                }
            } 
        ]
    };
    
}
 