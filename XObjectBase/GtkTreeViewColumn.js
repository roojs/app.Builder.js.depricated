
//<Script type="Text/javascript">

XObject = imports.XObject.XObject
 
GObject = imports.gi.GObject;
//GtkClutter.Embed..
// children are not added at init / but at show stage..
// listener is added on show..
// we should really add a hock to destroy it..
GtkTreeViewColumn = XObject.define(
    function(cfg) {
        XObject.call(this, cfg);
        // this is an example...
       
    }, 
    XObject,
    {
        pack : function(parent, item) {
            parent.el.append_column(this.el);
            var n = 0;
            var _t = this;
            var col = 0;
            var found = true; 
            parent.items.forEach(function(e){
                if (found) {
                    return true;
                }
                if (e == _t) {
                    col = n;
                    found = true;
                    return;
                }
                if (XObject.type(e.xtype) == 'GtkTreeViewColumn') {
                    n++;
                }
            });
            if (this.items.length) {
                this.el.add_attribute(this.items[0].el , 'markup', 4  );
            }
            
            
        },
        init : function() 
        {
            // this is done before pack?
        //    this.el = new Gtk.TreeViewColumn();
          //  this.parent.el.append_column(this.el);
            
            XObject.prototype.init.call(this);
            
            
            
            if (this.items.length) {
                this.el.add_attribute(this.items[0].el , 'markup', 4  );
            }
            

            
        }
    }
); 
