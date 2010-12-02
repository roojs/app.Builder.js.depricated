
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
            return this.list.getValue.call(this, path, col);
            
        },
        setValue  : function ( path, col, val)
        {
            this.list.setValue.call(this,(path,col,val);
        }
                
        
    }
); 
