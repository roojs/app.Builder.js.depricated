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
                label : 'Delete Element',
                listeners : {
                    activate : function () {
                        Builder.LeftTree._model.deleteSelected();
                    }
                }
            }
            // on our web version, a pulldown with the list of potential items appears...
            // our palete should handle this.. really.
         
        ]
    };
    
}
XN.xnew(create());