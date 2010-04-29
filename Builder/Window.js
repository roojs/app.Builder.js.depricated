//<Script type="text/javascript">

Gtk = imports.gi.Gtk;
// core libs
XObject = imports.XObject;
console = imports.console;

// components.
TopMenu         = imports.Builder.TopMenu.TopMenu;
LeftTopPanel    = imports.Builder.LeftTopPanel.LeftTopPanel;
LeftProps       = imports.Builder.LeftProps.LeftProps;
LeftPanel       = imports.Builder.LeftProps.LeftPanel;
// concept:
/**
 * 
 * left - tree + props
 * right - top = preview - webkit?
 * right - bottom = soruceview
 * 
 * Palete... as toolbar??? - changes depending on what you pick?
 * 
 * Not sure how to do Gtk version.. - our preview might be fun... = probably have to do a gtkhbox.. or something..
 * 
 */
 
 
  
//print('window loaded');

Window = new XObject({
    
    id: 'Builder.Window',
    
    xtype : Gtk.Window,
    
    type: Gtk.WindowType.TOPLEVEL,
    title : "Application Builder",
    border_width : 0,
    
    init : function()
    {
        XObject.prototype.init.call(this); 
        
        this.el.show_all();
        this.get('MidPropTree').hideWin();
        this.get('RightPalete.palete').hide();
        
        this.el.set_default_size(900, 600);
        
    }
    
    listeners : {
        'delete-event' : function (widget, event) {
            return false;
        },
        destroy  : function (widget) {
            Gtk.main_quit();
        },
         
    },
    
        
    items : [
        {
            xtype : Gtk.VBox,
            items : [
                TopMenu,
                {
                    id : 'left',
                    xtype : Gtk.HPaned,
                    position : 400,
                    items : [
                        {
                            xtype : Gtk.HBox,
                            items : [
                                {
                                    id : 'leftvpaned',
                                    xtype : Gtk.VPaned,
                                    position : 300,
                                    items : [
                                        LeftTopPanel,
                                        {
                                            xtype: Gtk.VBox,
                                            items : [
                                                {
                            
                                                    xns : Gtk.HBox,
                                                    pack : [ 'pack_start', false, true, 0 ],
                                                    items : [    LeftProps ]
                                                },
                                                 LeftPanel
                                                }
                                                
                                            ]
                                        }
                                        //LeftProps.add()
                                    ]
                                },
                                {
                                    xtype : 'Include',
                                    xns : 'xnew',
                                    cls : Builder.MidPropTree
                                }
                                
                            ]
                        },
                                
                                
                        {
                            xtype : 'HBox',
                            xns: 'Gtk',
                            
                    
                            items : [
                       
                            
                                {
                                    xtype : 'VPaned',
                                    xns: 'Gtk',
                                    set : {
                                        set_position : [ 300 ]
                                    },
                                    items : [
                                        {
                                            xtype : 'VBox',
                                            xns: 'Gtk',
                                            items : [
                                                {
                                                    xtype : 'Include',
                                                    xns : 'xnew',
                                                    cls : Builder.RightBrowser
                                                },
                                                {
                                                    xtype : 'Expander',
                                                    xns: 'Gtk',
                                                    label : 'Console',
                                                    packing : ['pack_start', false , false ],
                                                    set : {
                                                        //set_position : [ 300 ]
                                                    },
                                                    items : [
                                                    //    Builder.ProjectTree.create()
                                                        {
                                                            xtype : 'Button',
                                                            xns: 'Gtk',
                                                            label : 'Console Goes here'
                                                        }
                                                    ]
                                                }
                                               
                                              
                                                        
                                                  
                                               
                                            ]
                                        },
                                    
                                    
                                       
                                        {
                                            xtype : 'Include',
                                            xns : 'xnew',
                                            cls : Builder.RightEditor
                                        }
                                       
                                       
                                       
                                      
                                        //LeftProps.add()
                                    ]
                                },
                                
                                {
                                    xtype : 'Include',
                                    xns : 'xnew',
                                    cls : Builder.RightPalete
                                }
                               
                                
                                
                               
                            ]
                        }
                    ]
                }
                
            ]
       }
                
    ]
}); 
 
    
 
 
  