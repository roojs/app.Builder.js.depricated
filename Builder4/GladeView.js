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
GladeView=new XObject({
    xtype: Glade.DesignView,
    id : "GladeView",
    'void:loadFile' : (JsRender.JsRender file)
    {
    
            // clear existing elements from project?
            
            var  p = this.el.get_project();
    var             unowned   li = p.get_objects();
            for (var i =li.length()-1; i > -1; i--) {   
                p.remove_object(li.nth_data(i)); 
            }
    
    //        print("%s\n",tf.tree.toJsonString());
    	var x = new JsRender.NodeToGlade(file.tree,  "");
    
    	 
    	FileIOStream iostream;
    	var  f = File.new_tmp ("tpl-XXXXXX.glade", out iostream);
    	var ostream = iostream.output_stream;
    	var dostream = new DataOutputStream (ostream);
    	dostream.put_string (x.munge());
    	this.el.show();
    	 print("LOADING %s\n",f.get_path ());
            p.load_from_file(f.get_path ());
            
     
    
    }
});
GladeView.init();
XObject.cache['/GladeView'] = GladeView;
