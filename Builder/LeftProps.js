//<Script type="text/javascript">
Gio = imports.gi.Gio;
Gtk = imports.gi.Gtk;
Gdk = imports.gi.Gdk;
GLib = imports.gi.GLib;
GObject = imports.gi.GObject;
Pango = imports.gi.Pango ;


XObject = imports.XObject.XObject;
console = imports.console;


MidPropTree = imports.Builder.MidPropTree.MidPropTree;
AddPropertyPopup = imports.Builder.AddPropertyPopup.AddPropertyPopup; 


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
                        AddPropertyPopup.el.set_screen(Gdk.Screen.get_default());
                        AddPropertyPopup.el.show_all();
                        AddPropertyPopup.el.popup(null, null, null, null, 3, ev.button.time);
                        //console.log('pressed');
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
    
