static GtkView  _GtkView;

public class GtkView : Object 
{
    public Gtk.Viewport el;
    private GtkView  _this;

    public static GtkView singleton()
    {
        if (_GtkView == null) {
            _GtkView= new GtkView();
        }
        return _GtkView;
    }

        // my vars (def)

    // ctor 
    public GtkView()
    {
        _this = this;
        this.el = new Gtk.Viewport( null, null );

        // my vars (dec)

        // set gobject values
        var child_0 = new Xcls_HBox2( _this );
        child_0.ref();
        this.el.add (  child_0.el  );
    }

    // user defined functions 
    public return_type XXXX () {
    
    }
    public void addNode (Object? parent, JsRender.Node node) {  
    
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
        var node_pack = node.get("* pack");
        string[] args = {}'
        if (pack.length < 1 && node_pack.length > 0) {
            var ar = pack.split(",");
            pack = ar[0];
            for (var i =1; i < ar.length; i++) {
                args += ar[i];
            }
        }
        switch(pack) {
            case "add":
                ((Gtk.Container) parent).add(child);
                break;
            case "pack_start":
                ((Gtk.Box) parent).pack_start(
                    child, 
                    args.length > 0 && args[0].down() == "false" ? false : true,
                    args.length > 1 && args[1].down() == "false" ? false : true,
                    args.length > 2 ?  uint64.parse(args[2])
                );
                break;
            case "pack_end":
                ((Gtk.Box) parent).pack_end(
                    child, 
                    args.length > 0 && args[0].down() == "false" ? false : true,
                    args.length > 1 && args[1].down() == "false" ? false : true,
                    args.length > 2 ?  uint64.parse(args[2])
                );            
                break;
                
                
            default:
                print("unknown pack: " + pack);
                return;
        }
        
        
        var iter = node.items.list_iterator();
        while (iter.next()) {
            this.addNode(child, iter.get());
        }
        
    
    }
    public class Xcls_HBox2 : Object 
    {
        public Gtk.HBox el;
        private GtkView  _this;


            // my vars (def)

        // ctor 
        public Xcls_HBox2(GtkView _owner )
        {
            _this = _owner;
            this.el = new Gtk.HBox( true, 0 );

            // my vars (dec)

            // set gobject values
        }

        // user defined functions 
    }
}
