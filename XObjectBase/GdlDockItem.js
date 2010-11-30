
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
        pack : 'pack_start',
        init : function()
        {
            this.el = new Gdl.GdlDockItem.c_new ("item1", "Item #1", Gdl.DockItemBehavior.LOCKED);
            this.layout = new Gdl.DockLayout.c_new (dock);
            XObject.prototype.init.call(this);
        }
    }
}; 