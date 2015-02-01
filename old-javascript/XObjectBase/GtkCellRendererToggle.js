
//<Script type="Text/javascript">

XObject = imports.XObject.XObject
 
// Cell render text..

GtkCellRendererToggle = XObject.define(
    function(cfg) {
        XObject.call(this, cfg);
    }, 
    XObject,
    {
        pack : 'pack_start'
    }
); 