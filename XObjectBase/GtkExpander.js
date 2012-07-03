
//<Script type="Text/javascript">

XObject = imports.XObject.XObject
 
//GtkClutter.Embed..
// children are not added at init / but at show stage..
// listener is added on show..
// we should really add a hock to destroy it..

GtkExpander = XObject.define(
    function(cfg) {
        
        
        this.events = cfg.events = cfg.events || false;
        delete cfg
        XObject.call(this, cfg);
        
   
    }, 
    XObject,
    {
        events : false,
        
    }
 
); 