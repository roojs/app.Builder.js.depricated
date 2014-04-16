
//<Script type="Text/javascript">

XObject = imports.XObject.XObject
GtkClutter = imports.gi.GtkClutter;

//GtkClutter.Embed..
// children are not added at init / but at show stage..
// listener is added on show..
// we should really add a hock to destroy it..


GtkClutterActor = XObject.define(
    function(cfg) {
        XObject.call(this, cfg);
        if (!this.items.length) {
            XObject.fatal("Actor does not have any children");
            return;
        }
        
        this.items[0].pack = false;
    }, 
    XObject,
    {
    
        pack : function(parent, item)
        {
            
            if (XObject.type(parent.xtype) == 'GtkClutterWindow') {
                var st = parent.el.get_stage();
                st.add_actor(this.el);
                return;
            }
            XObject.fatal("do not know how to pack actor into " +  XObject.type(parent.xtype));
            
        },
        
       
        
        init : function() {
            print ("Actor init");
            if (!this.items.length) {
                print ("Actor does not have any children");
                return;
            }
            var child = this.items[0];
            child.init();
            child.pack = false;
            child.parent = this;
            //var contents = new Gtk.Button({ label: 'test' }); 
            
           // print(JSON.stringify(this.items));
            child.el.show();
            
            this.el = new GtkClutter.Actor.with_contents (  child.el) ;
            
            XObject.prototype.init.call(this);
            this.el.show_all();
        }
    }
); 