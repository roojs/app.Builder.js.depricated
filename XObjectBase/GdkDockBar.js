
//<Script type="Text/javascript">

XObject = imports.XObject.XObject
Gdl     = imports.gi.Gdl;
// Cell render text..

GdlDockBar = XObject.define(
    function(cfg) {
        XObject.call(this, cfg);
    }, 
    XObject,
    {
        pack : 'add', // default.. can be pack_start...
        init : function()
        {
            
            // dock for the current window exists. - use it..
            var dock = this.get('^').dock || new Gdl.Dock ();
            this.get('^').dock =  docl
            this.el  = new Gdl.DockBar.c_new (dock);
            XObject.prototype.init.call(this);
        }
    }
}; 