
//<Script type="Text/javascript">

XObject = imports.XObject.XObject
Gdl     = imports.gi.Gdl;
// Cell render text..

GdlDockItem = XObject.define(
    function(cfg) {
        XObject.call(this, cfg);
    }, 
    XObject,
    {
        pack : function(parent, item) 
        {
            parent.el.add_item (item, Gdl.DockPlacement.TOP);
        },
        init : function()
        {
            GdlDockItem.id = GdlDockItem.id ? GdlDockItem.id + 1 : 1;
            
            //new Gdl.DockItem.with_stock  ("item3",
            //             "Item #3 has accented characters ( )",
            //             Gtk.STOCK_CONVERT,
            //             Gdl.DockItemBehavior.NORMAL | Gdl.DockItemBehavior.CANT_CLOSE);
            
            
            this.el = new Gdl.GdlDockItem.c_new (
                this.name       || 'Dock' + GdlDockItem.id, 
                this.long_name  || 'Dock' + GdlDockItem.id, 
                this.behaviour  || 0 //Gdl.DockItemBehavior.LOCKED
            );
            
            this.layout = new Gdl.DockLayout.c_new (dock);
            XObject.prototype.init.call(this);
        }
    }
}; 