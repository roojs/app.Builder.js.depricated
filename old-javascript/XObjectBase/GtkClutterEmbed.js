//<Script type="Text/javascript">

XObject = imports.XObject.XObject
GtkClutter = imports.gi.GtkClutter;

//GtkClutter.Embed..
// children are not added at init / but at show stage..
// listener is added on show..
// we should really add a hock to destroy it..
GtkClutterEmbed = XObject.define(
    function(cfg) {
        XObject.call(this, cfg);
        this.items.forEach( function(i) {
            i.pack = false;
        });
    }, 
    XObject,
    {
        
        
        init : function() {
            // add the event listener..
            
            XObject.prototype.init.call(this);
            
            print("----------Embed init");
            this.addListener('show', function () {
                print("-------EMBED - show");
                var stage = this.el.get_stage(); 
                //print(this.items.length);
                this.items.forEach( function(e) { 
                      //print(e.xtype);
                    stage.add_actor(e.el);
                });
            });
           
           
        }
    }

);