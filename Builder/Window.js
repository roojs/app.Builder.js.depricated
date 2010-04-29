//<Script type="text/javascript">

Gtk = imports.gi.Gtk;

XObject = imports.XObject;
console = imports.console;

  
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
 
 
 
var _win;
var _left;
 
//print('window loaded');

Window = new XObject({
    
    id: 'Builder.Window',
    
    xtype : 'Gtk.Window',
    
    type: Gtk.WindowType.TOPLEVEL,
    title : "Application Builder",
    border_width : 0,
    
    init : function()
    {
        this.get('MidPropTree').hideWin();
        this.get('RightPalete.palete').hide();
        
        this.el.set_default_size(900, 600);
        XObject.prototype.init.call(this); 
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
                xtype : 'VBox',
                xns: 'Gtk',
                items : [
                    
                    {
                        xtype : 'Include',
                        xns : 'xnew',
                        cls : Builder.TopMenu
                    },
                    
                    
                    {
                        xtype : 'HPaned',
                        xns: 'Gtk',
                        set : {
                                set_position : [ 400 ]
                        },
                        listeners : {
                            _new : function(self) {
                                _left = this;
                            }
                        },
                        items : [
                            // in my original design - the child elements get loaded by a 'module loader...',
                              
                            {
                                xtype : 'HBox',
                                xns: 'Gtk',
                                
                        
                                items : [
                                    
                                   
                                    {
                                        xtype : 'VPaned',
                                        xns: 'Gtk',
                                        listeners : {
                                            _new  : function()
                                            {
                                                _leftvpaned = this;
                                            }
                                        },
                                        set : {
                                            set_position : [ 300 ]
                                        },
                                        items : [
                                           
                                                     
                                            {
                                                xtype : 'Include',
                                                xns : 'xnew',
                                                cls : Builder.LeftTopPanel
                                            },
                                            
                                                    
                                            {
                        
                                                xns : 'Gtk',
                                                xtype: 'VBox',
                                                
                                                items : [
                                              
                                                    {
                                
                                                        xns : 'Gtk',
                                                        xtype: 'HBox',
                                                        packing : [ 'pack_start', false, true, 0 ],
                                                        items : [   
                                                            {
                                                                xtype : 'Include',
                                                                xns : 'xnew',
                                                                cls : Builder.LeftProps
                                                            }
                                                         
                                                        ]
                                                    },
                                                    {
                                                        xtype : 'Include',
                                                        xns : 'xnew',
                                                        cls : Builder.LeftPanel
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
 
    
 
 
  