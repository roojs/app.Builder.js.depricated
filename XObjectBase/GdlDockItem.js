
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
        
        placement :  Gdl.DockPlacement.TOP,
        behaviour : 0,
        // name / long name...
        
        pack : function(parent, item) 
        {
            if (XObject.type(parent.el) == 'GdlDock') {
                parent.el.add_item (this.el, this.placement || Gdl.DockPlacement.TOP);
                return;
            }
            // otherwise 
            parent.el.dock_to (this.el, this.placement || Gdl.DockPlacement.TOP, -1);
            //     dock.add_item (item2, Gdl.DockPlacement.RIGHT);
            
            
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
            
            
            XObject.prototype.init.call(this);
        }
    }
}; 