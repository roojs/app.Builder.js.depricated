
//<Script type="Text/javascript">

XObject = imports.XObject.XObject
 
GObject = imports.gi.GObject;
//GtkClutter.Embed..
// children are not added at init / but at show stage..
// listener is added on show..
// we should really add a hock to destroy it..
GtkListStore = XObject.define(
    function(cfg) {
        XObject.call(this, cfg);
        // this is an example...
       
    }, 
    XObject,
    {
        pack : 'set_model',
        init : function() 
        {
            this.el.set_column_types ( 6, [
                GObject.TYPE_STRING, 
                GObject.TYPE_STRING, 
                GObject.TYPE_STRING, 
                GObject.TYPE_STRING, 
                GObject.TYPE_STRING, 
                GObject.TYPE_STRING 
            ] );
            XObject.prototype.init.call(this, cfg);
        }
    }
); 
