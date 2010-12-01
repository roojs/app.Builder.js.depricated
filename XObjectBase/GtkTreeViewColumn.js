
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
        pack : false,
        init : function() 
        {
            // this is done before pack?
            this.el = new Gtk.TreeViewColumn();
            this.parent.el.append_column(this.el);
            
            XObject.prototype.init.call(this);
            
            if (this.items.length) {
                this.el.add_attribute(this.items[0].el , 'markup', 4  );
            }
            

            
        }
    }
); 
