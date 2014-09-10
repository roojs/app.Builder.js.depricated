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
            Builder.from_string (x.munge())
    	 
    	FileIOStream iostream;
    	var  f = File.new_tmp ("tpl-XXXXXX.glade", out iostream);
    	var ostream = iostream.output_stream;
    	var dostream = new DataOutputStream (ostream);
    	dostream.put_string (x.munge());
    	this.el.show();
    	 print("LOADING %s\n",f.get_path ());
            p.load_from_file(f.get_path ());
            
     
    
    }
    
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
