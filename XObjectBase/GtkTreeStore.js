
//<Script type="Text/javascript">

XObject = imports.XObject.XObject
 
GObject = imports.gi.GObject;
 
GtkTreeStore = XObject.define(
    function(cfg) {
        this.columns = cfg.columns = cfg.columns || false;
        delete cfg.columns;
        XObject.call(this, cfg);
       
       
    }, 
    XObject,
    {
        pack : 'set_model',
        init : function() 
        {
            XObject.prototype.init.call(this);
            
            if (!this.columns) { 
                
                this.el.set_column_types ( 6, [
                    GObject.TYPE_STRING, 
                    GObject.TYPE_STRING, 
                    GObject.TYPE_STRING, 
                    GObject.TYPE_STRING, 
                    GObject.TYPE_STRING, 
                    GObject.TYPE_STRING 
                ] );
            } else {
                 this.el.set_column_types ( this.columns.length, this.columns);
                  
                
            }
            
            
        }
    }
); 
