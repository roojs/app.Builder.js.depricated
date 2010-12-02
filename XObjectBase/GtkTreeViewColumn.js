
//<Script type="Text/javascript">

XObject = imports.XObject.XObject
 
GObject = imports.gi.GObject;

// tree view column.. should really have a better way to determin stuff..

GtkTreeViewColumn = XObject.define(
    function(cfg) {
        XObject.call(this, cfg);
        // this is an example...
        GtkTreeViewColumn.ids++;
        this.col_id = GtkTreeViewColumn.ids;
    }, 
    XObject,
    {
        pack : function(parent, item) {
            parent.el.append_column(this.el);
            var n = 0;
            var _t = this;
            var col = 0;
            var found = true; 
            print("looking for " + this.col_id);
            parent.items.forEach(function(e){
                print ("parent child : " + XObject.type(e.xtype));
                
                if (found) {
                    return true;
                }
                print("match " + e.col_id);    
                if (e.col_id == _t.col_id) {
                    col = n;
                    found = true;
                    return;
                }
                if (XObject.type(e.xtype) == 'GtkTreeViewColumn') {
                    n++;
                }
            });
            
            
            if (this.items.length) {
                print("child : " + XObject.type(this.items[0].xtype));
                switch (XObject.type(this.items[0].xtype)) {
                    case "GtkCellRendererText":
                        this.el.add_attribute(this.items[0].el , 'markup', col );
                        break;
                    case "GtkCellRendererToggle":
                        print("toggle col : " + col);
                        this.el.add_attribute(this.items[0].el , 'active', col ); // boolean???
                        break;    
                        
                }
                
                
            }
            
            
        }
         
    }
); 
GtkTreeViewColumn.ids = 0;