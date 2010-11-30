
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
        pack : function(parent, item) {
            dock.add_item (item1, Gdl.DockPlacement.TOP);
        },
        init : function()
        {
            this.el = new Gdl.GdlDockItem.c_new (
                this.name, 
                this.title, 
                Gdl.DockItemBehavior.LOCKED
            );
            this.layout = new Gdl.DockLayout.c_new (dock);
            XObject.prototype.init.call(this);
        }
    }
}; 