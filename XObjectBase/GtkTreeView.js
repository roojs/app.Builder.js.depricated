
//<Script type="Text/javascript">

XObject = imports.XObject.XObject
 
GObject = imports.gi.GObject;

// tree view column.. should really have a better way to determin stuff..

GtkTreeView = XObject.define(
    function(cfg)
    {
        this.xconfig = {
            selection : cfg.selection || false,
            font : cfg.fong || false,
            
        }
        
        
        
        XObject.call(this, cfg);
        // this is an example...
        
        
    }, 
    XObject,
    {
        xconfig : false,
        
        init : function() 
        {
            
            XObject.prototype.init.call(this);
            
            
            if (this.xconfig.font) {
                var description = new Pango.FontDescription.c_new();
                description.set_size(this.xconfig.font.size);
                this.el.modify_font(description);
            }
            
            
            var sel = this.selection;
            
            this.el.set_column_types ( 6, [
                GObject.TYPE_STRING, 
                GObject.TYPE_STRING, 
                GObject.TYPE_STRING, 
                GObject.TYPE_STRING, 
                GObject.TYPE_STRING, 
                GObject.TYPE_STRING 
            ] );
            
            
            
_font :  
    {
        xtype : Pango.FontDescription
        size : 8000,
    }
    
var description = new Pango.FontDescription.c_new();
description.set_size(8000);
this.el.modify_font(description);


selection : {
    
}

this.el.get_selection().set_mode( Gtk.SelectionMode.SINGLE);

    this.selection.signal['changed'].connect(function() {
        _this.get('/LeftTree.view').listeners.cursor_changed.apply(
        _this.get('/LeftTree.view'), [ _this.get('/LeftTree.view'), '']
    );
});

this.el.drag_source_set(             /* widget will be drag-able */
    Gdk.ModifierType.BUTTON1_MASK,       /* modifier that will start a drag */
    null,            /* lists of target to support */
    0,              /* size of list */
    Gdk.DragAction.COPY   | Gdk.DragAction.MOVE           /* what to do with data after dropped */
);

this.el.drag_source_set_target_list(this.get('/Window').targetList);

this.el.drag_source_add_text_targets();
this.el.drag_dest_set
(
    Gtk.DestDefaults.MOTION  | Gtk.DestDefaults.HIGHLIGHT,
    null,            /* lists of target to support */
    0,              /* size of list */
    Gdk.DragAction.COPY   | Gdk.DragAction.MOVE       /* what to do with data after dropped */
);

this.el.drag_dest_set_target_list(  this.get('/Window').targetList);
this.el.drag_dest_add_text_targets( );
},



            
            
            
            
            
            
            
            
            
            
        }
         
    }
); 
GtkTreeViewColumn.ids = 0;