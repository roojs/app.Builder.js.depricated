
//<Script type="Text/javascript">

XObject = imports.XObject.XObject
 
// Cell render text..

GdlDock = XObject.define(
    function(cfg) {
        XObject.call(this, cfg);
    }, 
    XObject,
    {
        pack : 'pack_start',
        init : function()
        {
            this.el = new Gdl.Dock ();
            XObject.prototype.init.call(this);

        }
    }
}; 