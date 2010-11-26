

//<Script type="Text/javascript">

XObject = imports.XObject.XObject
 
// Cell render text..


GtkTreeViewColumn = XObject.define(
    function(cfg) {
        XObject.call(this, cfg);
     
    }, 
    XObject,
    {
        pack : 'append_column'
    }
 
); 
 
