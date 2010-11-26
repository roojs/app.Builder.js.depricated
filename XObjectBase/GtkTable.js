
//<Script type="Text/javascript">

XObject = imports.XObject.XObject
 
//GtkClutter.Embed..
// children are not added at init / but at show stage..
// listener is added on show..
// we should really add a hock to destroy it..

GtkTable = XObject.define(
    function(cfg) {
        XObject.call(this, cfg);
        var _this = this;
        
        this.items.forEach(function(i,n) {
            var c = n % _this.config.n_columns;
            var r = Math.floor(n/_this.config.n_columns);
            i.pack = [ 'attach', c, c+1, r, r+1, 
                    typeof(i.x_options) == 'undefined' ?  5 : i.x_options,
                    typeof(i.y_options) == 'undefined' ?  5 : i.y_options,
                    typeof(i.x_padding) == 'undefined' ?  0 : i.x_padding,
                    typeof(i.x_padding) == 'undefined' ?  0 : i.x_padding
                   
            ]
        });
    }, 
    XObject,
    {
    }
 
); 