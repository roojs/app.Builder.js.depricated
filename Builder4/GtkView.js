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
    addNode : (JsRender.JsRender file) 
    {
        
     
    
            if (file.tree == null) {
                return;
            }
    
     
    	var x = new JsRender.NodeToGlade(file.tree,  "");
            var builder = Gtk.Builder.from_string (x.munge());
            
    	var obj=  builder.get_object(file.tree.uid());
            this.container.el.add(obj);
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
