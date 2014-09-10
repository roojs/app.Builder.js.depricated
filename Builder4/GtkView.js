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
    lastObj : "null",
    xtype : "Viewport",
    xns : Gtk,
    addNode : (JsRender.JsRender file) 
    {
        
     
    
            if (file.tree == null) {
                return;
            }
            if (this.lastObj != null) {
                this.container.remove(this.lastObj);
            }
     
    	var x = new JsRender.NodeToGlade(file.tree,  "");
    	var str = x.munge();
            var builder = new Gtk.Builder.from_string (str,str.length);
            
    	var obj=  builder.get_object(file.tree.uid()) as Gtk.Widget;
    	this.lastObj = obj;
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
