
//<Script type="Text/javascript">

XObject = imports.XObject.XObject
 
GObject = imports.gi.GObject;

// tree view column.. should really have a better way to determin stuff..

GtkTreeViewColumn = XObject.define(
    function(cfg) {
        XObject.call(this, cfg);
        // this is an example...
       
    }, 
    XObject,
    {
        pack : function(parent, item) {
            parent.el.append_column(this.el);
            var n = 0;
            var _t = this;
            var col = 0;
            var found = true; 
            parent.items.forEach(function(e){
                if (found) {
                    return true;
                }
                if (e == _t) {
                    col = n;
                    found = true;
                    return;
                }
                if (XObject.type(e.xtype) == 'GtkTreeViewColumn') {
                    n++;
                }
            });
            
            
            if (this.items.length) {
                
                switch (XObject.type(this.items[0].xtype)) {
                    case "GtkCellRendererText":
                        this.el.add_attribute(this.items[0].el , 'markup', col );
                        break;
                    case "GtkCellRendererToggle":
                        this.el.add_attribute(this.items[0].el , 'active', col ); // boolean???
                        break;    
                        
                }
                
                
            }
            
            
        }
         
    }
); 
