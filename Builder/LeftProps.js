//<Script type="text/javascript">
Gio = imports.gi.Gio;
Gtk = imports.gi.Gtk;
GLib = imports.gi.GLib;
GObject = imports.gi.GObject;
Pango = imports.gi.Pango ;
Soup = imports.gi.Soup ;




 


/**
 * 
 * Properties and events pulldowns..
 * 
 */

 
function create() // parent?
{
    
    return  {
        xnsid : 'Builder.LeftProps',
        xns : 'Gtk',
        xtype: 'HBox',
        packing : [ 'pack_start', false, true, 0 ],
        items : [       
            {
                
                xns : 'Gtk',
                xtype : 'Button',
                 
                
                
                listeners : {
                    // pressed...
                    'button-press-event' : function(w, ev ){
                        console.log('pressed');
                        Builder.MidPropTree._model.showData('props');
                        return true;
                        // show the MidPropTree..
                    }
                  
                },
                items : [
                    {
                        xns: 'Gtk',
                        xtype : 'HBox',
                        packing : ['add'],
                        items : [
                            {
                                xns: 'Gtk',
                                xtype : 'Image',
                                'stock' : Gtk.STOCK_ADD,
                                'icon-size' : Gtk.IconSize.MENU,
                                
                                packing : ['add']
                                
                            },
                            {
                                xns: 'Gtk',
                                xtype : 'Label',
                                packing : ['add'],
                                label: 'Property'
                                
                            }
                        
                        ]
                    }
                         
                ]
            },
             {
                
                xns : 'Gtk',
                xtype : 'Button',
                 
                
                
                listeners : {
                    // pressed...
                    'button-press-event' : function(w, ev ){
                        console.log('pressed');
                        Builder.MidPropTree._model.showData('events');
                        return true;
                        // show the MidPropTree..
                    }
                  
                },
                items : [
                    {
                        xns: 'Gtk',
                        xtype : 'HBox',
                        packing : ['add'],
                        items : [
                            {
                                xns: 'Gtk',
                                xtype : 'Image',
                                'stock' : Gtk.STOCK_ADD,
                                'icon-size' : Gtk.IconSize.MENU,
                                
                                packing : ['add']
                                
                            },
                            {
                                xns: 'Gtk',
                                xtype : 'Label',
                                packing : ['add'],
                                label: 'Handler'
                                
                            }
                        
                        ]
                    }
                         
                ]
            },
              {
                
                xns : 'Gtk',
                xtype : 'Button',
                 
                
                
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
                        xns: 'Gtk',
                        xtype : 'HBox',
                        packing : ['add'],
                        items : [
                            {
                                xns: 'Gtk',
                                xtype : 'Image',
                                'stock' : Gtk.STOCK_ADD,
                                'icon-size' : Gtk.IconSize.MENU,
                                
                                packing : ['add']
                                
                            },
                            {
                                xns: 'Gtk',
                                xtype : 'Label',
                                packing : ['add'],
                                label: 'Other'
                                
                            }
                        
                        ]
                    }
                         
                ]
            }
        ]
        
             
    };


}
    
