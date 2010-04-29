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
        xtype : 'Menu',
        
        listeners : {
            _new : function () {
                _menu = this;
            },
            _rendered : function() {
                this.el.show_all();
            }
            
        },
        
        items :  [
            {
                
                xns : 'Gtk',
                xtype : 'MenuItem',
                packing : [ 'append' ],
                label : 'Delete Property / Event',
                listeners : {
                    activate : function () {
                        Builder.LeftPanel._model.deleteSelected();
                    }
                }
            },
        
          {
                
                xns : 'Gtk',
                xtype : 'MenuItem',
                packing : [ 'append' ],
                label : 'Change Property to Javascript Value',
                listeners : {
                    activate : function () {
                        Builder.LeftPanel._model.setSelectedToJS();
                    }
                }
            },
            {
                
                xns : 'Gtk',
                xtype : 'MenuItem',
                packing : [ 'append' ],
                label : 'Change Property to String (or native) Value',
                listeners : {
                    activate : function () {
                        Builder.LeftPanel._model.setSelectedToNoJS();
                    }
                }
            },
        ]
    };
    
}
XN.xnew(create());