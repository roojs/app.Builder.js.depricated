
//<Script type="Text/javascript">

XObject = imports.XObject.XObject
 
// Cell render text..

GtkCellRenderText = XObject.define(
    function(cfg) {
        XObject.prototype.call(this, cfg);
    }, 
    XObject,
    {
        pack : 'pack_start'
    }
}; 