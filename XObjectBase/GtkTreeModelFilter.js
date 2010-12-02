
//<Script type="Text/javascript">

XObject = imports.XObject.XObject
 
GObject = imports.gi.GObject;
//GtkClutter.Embed..
Gtk= imports.gi.Gtk;

// children are not added at init / but at show stage..
// listener is added on show..
// we should really add a hock to destroy it..
GtkTreeModelFilter = XObject.define(
    function(cfg) {
        XObject.call(this, cfg);
        // this is an example...
       
    }, 
    XObject,
    {
        pack :  'set_model',
        init : function() 
        {
            // 
            this.items[0].pack = false;
            this.items[0].init();
            this.list = this.items[0];
            this.el = new Gtk.TreeModelFilter.c_new(this.items[0].el, null);
            XObject.prototype.init.call(this);
          
        },
        append : function( values ) {
            this.list.append(values);
        },
          getValue  : function ( path, col)
        {
            // not very type safe...
            var tpath = path;
            if (typeof(path) == 'string' ) {
                tpath = new Gtk.TreePath.from_string(path);
                 
            }
            
            var iter = new Gtk.TreeIter();
            
            this.el.get_iter (iter, tpath) ;
            var citer = new Gtk.TreeIter();
            this.el.convert_iter_to_child_iter(citer, iter);
             
            var gval = new GObject.Value(  [this.list.el.get_column_type(col), null ]);
            this.list.el.get_value( citer, col, gval);
            print("GET VALUE RETURNED: " + gval.value);
            return gval.value;
        },
        setValue  : function ( path, col, val)
        {
            var tpath = path;
            if (typeof(path) == 'string' ) {
                tpath = new Gtk.TreePath.from_string(path);
            }
            var iter = new Gtk.TreeIter();
             var citer = new Gtk.TreeIter();
             this.el.get_iter (iter, tpath) ;
            this.el.convert_iter_to_child_iter(citer, iter);
            
            this.list.el.set_value(citer,col,val);
        }
                
        
    }
); 
