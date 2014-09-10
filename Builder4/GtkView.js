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
    addNode : (Object? parent, JsRender.Node node) {  
    
        Type? type = GLib.Type.from_name(node.fqn().replace(".", ""));
    
        if (type == null) {
            return;
        }
        // some types can not be created -- eg. dialogs...
        
        
        if (type.is_a(typeof(Gtk.Window))) {
            // fake window???
        
             this.addNodeChildren(parent, node);
             return;
        }
        print("new %s / %s\n", node.fqn(), type.name());     
        var  child = Object.new(type);
        
        
    
        var pack = "";
        if (parent  == null) {
            pack = "add";
            parent = this.container.el;
        }
        var node_pack = node.get("* pack");
        string[] args = {};
        if (pack.length < 1 && node_pack.length > 0) {
            var ar = pack.split(",");
            pack = ar[0];
            for (var i =1; i < ar.length; i++) {
                args += ar[i];
            }
        }
        switch(pack) {
            case "add":
                ((Gtk.Container) parent).add((Gtk.Widget)child);
                break;
            case "pack_start":
                ((Gtk.Box) parent).pack_start(
                    (Gtk.Widget) child, 
                    args.length > 0 && args[0].down() == "false" ? false : true,
                    args.length > 1 && args[1].down() == "false" ? false : true,
                    args.length > 2 ?  (uint) uint64.parse(args[2]) : 0
                );
                break;
            case "pack_end":
                ((Gtk.Box) parent).pack_end(
                    (Gtk.Widget) child, 
                    args.length > 0 && args[0].down() == "false" ? false : true,
                    args.length > 1 && args[1].down() == "false" ? false : true,
                    args.length > 2 ?  (uint)  uint64.parse(args[2]) : 0
                );            
                break;
                
                
            default:
                print("unknown pack: " + pack);
                return;
        }
        
        this.addNodeChildren(child, node);
        
    
    },
    addNodeChildren : (Object? parent, JsRender.Node node) { 
    
        var iter = node.items.list_iterator();
        while (iter.next()) {
            this.addNode(parent, iter.get());
        }
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
