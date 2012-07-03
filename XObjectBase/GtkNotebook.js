
XObject = imports.XObject.XObject
 

GtkNotebook= XObject.define(
    function(cfg) {
        
        
        this.current_page = cfg.current_page = cfg.current_page || [];
        delete cfg.current_page;
        XObject.call(this, cfg);
        
   
    }, 
    XObject,
    {
        events : false,
        init : function()
        {
            // is this a common feature??? of widgets ...?
            XObject.prototype.init.call(this);
            
            current_page : 0,
                                                    init : function() {
                                                        XObject.prototype.init.call(this);
                                                    	this.el.set_current_page(0);
                                                    
                                                    },
            
            for (var i = 0 ; i < this.events.length ; i++ ) { 
                this.el.add_events (this.events[i] );
            }
            
        }
    }
 
);
GtkExpander.config = {
   
    events         : {
        type : 'Array',
        array_of : 'Gdk.EventMask'
    }
}