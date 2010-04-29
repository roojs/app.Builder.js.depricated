//<Script type="text/javascript">

Gtk = imports.gi.Gtk;
// core libs
XObject = imports.XObject;
console = imports.console;

// components.
TopMenu         = imports.Builder.TopMenu.TopMenu;
LeftTopPanel    = imports.Builder.LeftTopPanel.LeftTopPanel;
LeftProps       = imports.Builder.LeftProps.LeftProps;
LeftPanel       = imports.Builder.LeftPanel.LeftPanel;
MidPropTree     = imports.Builder.MidPropTree.MidPropTree;
RightBrowser    = imports.Builder.RightBrowser.RightBrowser;
RightEditor     = imports.Builder.RightEditor.RightEditor;
RightPalete     = imports.Builder.RightPalete.RightPalete;
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
                                                    items : [  
                                                        LeftProps 
                                                    ]
                                                },
                                                LeftPanel
                                                
                                            ]
                                        }
                                        
                                    ]
                                },
                                MidPropTree
                                
                            ]
                        },
                                
                        {
                            xtype : Gtk.HBox
                            items : [
                                {
                                    xtype : Gtk.VPaned,
                                    position :  300,
                                    items : [
                                        {
                                            xtype : Gtk.VBox,
                                            items : [
                                                RightBrowser,
                                                {
                                                    xtype : Gtk.Expander,
                                                    
                                                    label : 'Console',
                                                    pack : ['pack_start', false , false ],
                                                    
                                                    items : [
                                                        {
                                                            xtype : Gtk.Button,
                                                            label : 'Console Goes here'
                                                        }
                                                    ]
                                                }
                                               
                                            ]
                                        },
                                        RightEditor
                                         
                                    ]
                                },
                                RightPalete
                                 
                                
                            ]
                        }
                    ]
                }
                
            ]
       }
                
    ]
}); 
 
    
 
 
  