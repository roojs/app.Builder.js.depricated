
//<Script type="Text/javascript">

XObject = imports.XObject.XObject
 
//GtkClutter.Embed..
// children are not added at init / but at show stage..
// listener is added on show..
// we should really add a hock to destroy it..
GtkTreeStore = XObject.define(
    function(cfg) {
        XObject.call(this, cfg);

    }, 
    XObject,
    {
        pack : 'set_model'
    }
 
); 
