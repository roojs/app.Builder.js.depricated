
//<Script type="Text/javascript">

XObject = imports.XObject.XObject
 
//GtkClutter.Embed..
// children are not added at init / but at show stage..
// listener is added on show..
// we should really add a hock to destroy it..

GtkExpander = XObject.define(
    function(cfg) {
        
        
        this.events = cfg.events = cfg.events || [];
        delete cfg.events;
        XObject.call(this, cfg);
        
   
    }, 
    XObject,
    {
        events : false,
        init : function()
        {
            // is this a common feature??? of widgets ...?
     
            for (var i = 0 ; i < this.events.length ; i++ ) { 
                this.el.add_events (Gdk.EventMask.BUTTON_MOTION_MASK );
            }
            
        }
    }
 
); 