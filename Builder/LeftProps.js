//<Script type="text/javascript">
Gio = imports.gi.Gio;
Gtk = imports.gi.Gtk;
GLib = imports.gi.GLib;
GObject = imports.gi.GObject;
Pango = imports.gi.Pango ;
Soup = imports.gi.Soup ;

XObject = imports.XObject.XObject;
console = imports.console;


MidPropTree = imports.Builder.MidPropTree.MidPropTree;
 


/**
 * 
 * Properties and events pulldowns..
 * 
 */

LeftProps = new XObject({
        
        xtype: Gtk.HBox,
        pack : [ 'pack_start', false, true, 0 ],
        items : [       
            {
                
                
                xtype: Gtk.Button,
                 
                listeners : {
                    // pressed...
                    'button-press-event' : function(w, ev ){
                        console.log('pressed');
                        MidPropTree.get('model').showData('props');
                        return true;
                        // show the MidPropTree..
                    }
                  
                },
                items : [
                    {
                        
                        xtype: Gtk.HBox,
                        pack : ['add'],
                        items : [
                            {
                                
                                xtype: Gtk.Image,
                                'stock' : Gtk.STOCK_ADD,
                                'icon-size' : Gtk.IconSize.MENU,
                                
                                pack : ['add']
                                
                            },
                            {
                                
                                xtype: Gtk.Label,
                                pack : ['add'],
                                label: "Property"
                                
                            }
                        
                        ]
                    }
                         
                ]
            },
             {
                
                
                xtype: Gtk.Button,
                 
                
                
                listeners : {
                    // pressed...
                    'button-press-event' : function(w, ev ){
                        console.log('pressed');
                        MidPropTree.get('model').showData('events');
                        return true;
                        // show the MidPropTree..
                    }
                  
                },
                items : [
                    {
                        
                        xtype: Gtk.HBox,
                        pack : ['add'],
                        items : [
                            {
                                
                                xtype: Gtk.Image,
                                'stock' : Gtk.STOCK_ADD,
                                'icon-size' : Gtk.IconSize.MENU,
                                
                                pack : ['add']
                                
                            },
                            {
                                
                                xtype: Gtk.Label,
                                pack : ['add'],
                                label: 'Handler'
                                
                            }
                        
                        ]
                    }
                         
                ]
            },
              {
                
                
                xtype: Gtk.Button,
                 
                
                
                listeners : {
                    // pressed...
                    'button-press-event' : function(w, ev ){
                        // show the menu..
                        
                        console.log('pressed');
                        //Builder.MidPropTree._model.showData('events');
                        return true;
                        // show the MidPropTree..
                    }
                  
                },
                items : [
                    {
                        
                        xtype: Gtk.HBox,
                        pack : ['add'],
                        items : [
                            {
                                
                                xtype: Gtk.Image,
                                'stock' : Gtk.STOCK_ADD,
                                'icon-size' : Gtk.IconSize.MENU,
                                
                                pack : ['add']
                                
                            },
                            {
                                
                                xtype: Gtk.Label,
                                pack : ['add'],
                                label: 'Other'
                                
                            }
                        
                        ]
                    }
                         
                ]
            }
        ]
        
             
    }


)
    
