Gtk = imports.gi.Gtk;
Gdk = imports.gi.Gdk;
Pango = imports.gi.Pango;
GLib = imports.gi.GLib;
Gio = imports.gi.Gio;
GObject = imports.gi.GObject;
GtkSource = imports.gi.GtkSource;
WebKit = imports.gi.WebKit;
Vte = imports.gi.Vte;
console = imports.console;
XObject = imports.XObject.XObject;
GtkView=new XObject({
    id : "GtkView",
    xtype : "Viewport",
    xns : Gtk,
    addNode : (JsRender.JsRender file) {  
    {
        
    
    
            // clear existing elements from project?
            
    
            if (file.tree == null) {
                return;
            }
    
    //        print("%s\n",tf.tree.toJsonString());
    	var x = new JsRender.NodeToGlade(file.tree,  "");
            var builder = Builder.from_string (x.munge());
            
    	var obj=  builder.get_object(file.tree.uid());
            this.container.add(obj);        
     
    
    },
    items : [
    	{
            id : "container",
            xtype : "HBox",
            xns : Gtk
        }
    ]

});
GtkView.init();
XObject.cache['/GtkView'] = GtkView;
