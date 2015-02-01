//<Script type="Text/javascript">

XObject = imports.XObject.XObject

Gtk = imports.gi.Gtk;
//GtkClutter.Embed..
// children are not added at init / but at show stage..
// listener is added on show..
// we should really add a hock to destroy it..

GtkScrolledWindow = XObject.define(
    function(cfg) {
        
        XObject.call(this, cfg);
    }, 
    XObject,
    {
        
        // should we always add??
        pack : 'add',
        
        init : function() 
        {
            // aways set policy like this?
            XObject.prototype.init.call(this);
            this.el.set_policy(Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC);
        }

         

});