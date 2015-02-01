
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
        list : false, // list goes here, 
        pack : function(parent, item) {
             
            
            parent.el.append_column(this.el);
            var n = 0;
            var _t = this;
            var col = 0;
            var found = false; 
             
            parent.items.forEach(function(e){
                if ([ 'GtkListStore', 'GtkTreeStore', 'GtkTreeModelFilter' ].indexOf( XObject.type(e.xtype) ) > -1 ) {
                    _t.list = e;
                    return;
                }
                
                
                if (found) {
                    return true;
                }
                 
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
                this.items[0].list = this.list;
                switch (XObject.type(this.items[0].xtype)) {
                    case "GtkCellRendererText":
                        this.el.add_attribute(this.items[0].el , 'markup', col );
                        break;
                    case "GtkCellRendererToggle":
                        print("toggle col : " + col);
                        this.el.add_attribute (this.items[0].el , 'active', col ); // boolean???
                        break;    
                        
                }
                
                
            }
            
            
        }
         
    }
); 
GtkTreeViewColumn.ids = 0;