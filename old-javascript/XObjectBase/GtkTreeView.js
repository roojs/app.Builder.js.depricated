
//<Script type="Text/javascript">

XObject = imports.XObject.XObject
 
GObject = imports.gi.GObject;

// tree view column.. should really have a better way to determin stuff..

GtkTreeView = XObject.define(
    function(cfg)
    {
        
        
        var clean_cfg = XObject.extend({
            font         :  false,
            drag_source : false,
            drag_dest   : false //,
       //     selection : false,
        }, cfg);
        
        delete clean_cfg.font;
        delete clean_cfg.selection;
        delete clean_cfg.drag_source;
        delete clean_cfg.drag_dest;
         
        
        XObject.call(this, clean_cfg);
        
        this.config = cfg;
        
        // this is an example...
        
        
    }, 
    XObject,
    {
        selection : false,
        
        init : function() 
        {
            
            XObject.prototype.init.call(this);
            
            
            
            
             
            if (this.config.font) {
                var description = new Pango.FontDescription.c_new();
                description.set_size(this.config.font.size);
                this.el.modify_font(description);
            }
            
          
             
            if (this.config.drag_source) {
                var ds = this.config.drag_source;
                
                this.el.drag_source_set(             // widget will be drag-able 
                    ds.modifier, //Gdk.ModifierType.BUTTON1_MASK,       // modifier that will start a drag 
                    null,            // lists of target to support 
                    0,              // size of list 
                    ds.action   ////Gdk.DragAction.COPY   | Gdk.DragAction.MOVE
                                // what to do with data after dropped 
                );
                
                this.el.drag_source_set_target_list(
                        ds.targetList // probably imports.Window.targetList;
                        //this.get('/Window').targetList
                );
                this.el.drag_source_add_text_targets();
            }
            
            if (this.config.drag_dest) {
                
                var ds = this.config.drag_dest;
                
                this.el.drag_dest_set
                (
                    ds.modifier, // Gtk.DestDefaults.MOTION  | Gtk.DestDefaults.HIGHLIGHT,
                    null,            // lists of target to support 
                    0,              // size of list 
                    ds.action //Gdk.DragAction.COPY   | Gdk.DragAction.MOVE       // what to do with data after dropped 
                );
                
                this.el.drag_source_add_text_targets();
                this.el.drag_dest_set_target_list(
                    ds.targetList
                            //this.get('/Window').targetList
                );
                this.el.drag_dest_add_text_targets();
            }
             
        }
                                                                                  
             
 
         
    }
); 

GtkTreeView.config = {
    //selection   : { << just need to add a treeselection..
    //    type : 'Gtk.TreeSelection'
    //},
    font         : {
        type : 'Pango.FontDescription'
    },
    drag_source : {
        type : 'Gtk.TreeDragSource' // these are realy interfaces...
    },
    
    drag_dest   : {
        type : 'Gtk.TreeDragDest'
    }
    
    
};


