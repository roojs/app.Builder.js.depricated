
//<Script type="Text/javascript">

XObject = imports.XObject.XObject
 
GObject = imports.gi.GObject;

// tree view column.. should really have a better way to determin stuff..

GtkTreeSelection = XObject.define(
    function(cfg)
    {
        // child only get's a listener...
        XObject.call(this, cfg);
        
        // you can not actually ctor this..
         
        
        
    }, 
    XObject,
    {
        pack: function(parent, item)
        {
            // do nothing... init has already made 'el'
            
        },
        
        
        init : function(parent) 
        {
            
            this.el = parent.el.get_selection();
             
            if (typeof(this.config.mode) == 'undefined') {
                this.el.set_mode(this.config.mode );
            }
        }       
             
 
         
    }
); 

GtkTreeView.xconfig = {
    selection   : {
        type : 'Gtk.TreeSelection'
        
    }
    font         : cfg.font || false,
    drag_source : cfg.drag_source || false,
    drag_dest   : cfg.drag_dest || false
    
    
    
}


