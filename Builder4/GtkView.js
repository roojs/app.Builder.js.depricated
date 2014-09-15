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
    loadFile : (JsRender.JsRender file) 
    {
        
     
            this.file = null;
            
            if (file.tree == null) {
                return;
            }
            this.file = file;
            if (this.lastObj != null) {
                this.container.el.remove(this.lastObj);
            }
     
    	var x = new JsRender.NodeToGtk(file.tree);
            var obj = x.munge() as Gtk.Widget;
            this.lastObj = null;
    	if (obj == null) {
            	return;
    	}
    	this.lastObj = obj;
            
            this.container.el.add(obj);
            obj.show_all();
    },
    createThumb : () {
        
        
        if (this.file == null) {
            return;
        }
        var filename = this.file.getIconFileName(false);
        
        var  win = this.el.get_parent_window();
        var width = win.get_width();
        var height = win.get_height();
    
        Gdk.Pixbuf screenshot = Gdk.pixbuf_get_from_window(win, 0, 0, width, height); // this.el.position?
    
        screenshot.save(filename,"png");
        return;
        
        
        
        
        
         
        
        // should we hold until it's printed...
        
          
    
        
        
    
    
        
         
    },
    xtype : "Viewport",
    file : "null",
    xns : Gtk,
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
