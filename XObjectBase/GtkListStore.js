
//<Script type="Text/javascript">

XObject = imports.XObject.XObject
 
GObject = imports.gi.GObject;
//GtkClutter.Embed..
Gtk= imports.gi.Gtk;

// children are not added at init / but at show stage..
// listener is added on show..
// we should really add a hock to destroy it..
GtkListStore = XObject.define(
    function(cfg) {
        XObject.call(this, cfg);
        // this is an example...
       
    }, 
    XObject,
    {
        pack : 'set_model',
        init : function() 
        {
            XObject.prototype.init.call(this);
            this.el.set_column_types ( 6, [
                GObject.TYPE_STRING, 
                GObject.TYPE_STRING, 
                GObject.TYPE_STRING, 
                GObject.TYPE_STRING, 
                GObject.TYPE_STRING, 
                GObject.TYPE_STRING 
            ] );
            
        },
        append : function( values ) {
            var iter = new Gtk.TreeIter();
            this.el.append(iter);
            for (var i = 0; i < values.length; i++) {
                this.el.set_value(iter,i,values[i]);
            }
            
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
            var gval = new GObject.Value(this.el.get_column_type(col));
            this.el.get_value( iter, col, gval)
            return gval.value;
        },
        setValue  : function ( path, col, val)
        {
            var tpath = path;
            if (typeof(path) == 'string' ) {
                tpath = new Gtk.TreePath.from_string(path);
            }
            var iter = new Gtk.TreeIter();
            this.el.get_iter (iter, tpath) ;
            this.el.set_value(iter,i,values[i]);
        }
                
        
    }
); 
