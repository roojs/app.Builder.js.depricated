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
    xtype : "Viewport",
    id : "GtkView",
    xns : Gtk,
    addNode : (Object? parent, JsRender.Node node) {  
    
        var type = GLib.Type.from_name(node.fqn());
        if (type < 1) {
            return;
        }
        // some types can not be created -- eg. dialogs...
        
        var  child = new Object(type);
    
        var pack = "";
        if (parent  == null) {
            pack = "add";
            parent = this.container.el;
        } 
             
        
        
        
        
        var iter = node.items.list_iterator();
        while (iter.next()) {
            this.addNode(child, iter.get());
        }
        
        
    
    },
    items : [
    	{
            xtype : "HBox",
            xns : Gtk
        }
    ]

});
GtkView.init();
XObject.cache['/GtkView'] = GtkView;
