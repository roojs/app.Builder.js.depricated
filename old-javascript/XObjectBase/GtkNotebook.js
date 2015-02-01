
XObject = imports.XObject.XObject
 

GtkNotebook= XObject.define(
    function(cfg) {
        
        
        this.current_page = cfg.current_page = cfg.current_page || false;
        delete cfg.current_page;
        XObject.call(this, cfg);
        
   
    }, 
    XObject,
    {
        current_page : false,
        init : function()
        {
            // is this a common feature??? of widgets ...?
            XObject.prototype.init.call(this);
            
            if (this.current_page !== false)
            {
                this.el.set_current_page(this.current_page);
            }
                                                    
            
        }
    }
 
);
GtkNotebook.config = {
   
    current_page         : {
        type : 'Integer'
    }
}