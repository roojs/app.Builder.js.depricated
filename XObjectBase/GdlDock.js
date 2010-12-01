
//<Script type="Text/javascript">

XObject = imports.XObject.XObject
Gdl     = imports.gi.Gdl;
// Cell render text..

GdlDock = XObject.define(
    function(cfg) {
        XObject.call(this, cfg);
    }, 
    XObject,
    {
        pack : 'add', // default.. can be pack_start...
        init : function()
        {
            
            // dock for the current window exists. - use it..
            if (this.get('^').dock) {
                
            }
            this.el = new Gdl.Dock ();
            this.layout = new Gdl.DockLayout.c_new (this.el);
            XObject.prototype.init.call(this);
        }
    }
}; 