
//<Script type="Text/javascript">

XObject = imports.XObject.XObject


//GtkClutter.Embed..
// children are not added at init / but at show stage..
// listener is added on show..
// we should really add a hock to destroy it..

Actor = XObject.define(
    function (x)
    {
        XObject.call(this,x);
       
               
    },
    XObject,
    {
        init : function() {
            print ("Actor init");
            var child = new XObject(this.items[0]);
            child.init();
            child.parent = this;
            //var contents = new Gtk.Button({ label: 'test' }); 
            var contents = child.el;
           
           // print(JSON.stringify(this.items));
            
            
            this.el = new GtkClutter.Actor.with_contents (  contents) ;
            XObject.prototype.init.call(this);
        }

    }
);