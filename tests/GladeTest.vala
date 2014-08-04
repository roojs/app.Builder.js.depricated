/**
 * Test the writer code...


*/
 
int main (string[] args) {
	Gtk.init (ref args);
	//GtkClutter.init (ref args);
	new JsRender.Lang_Class();
	GLib.Log.set_always_fatal(LogLevelFlags.LEVEL_ERROR | LogLevelFlags.LEVEL_CRITICAL); 
	Project.Project.loadAll();
	var proj = Project.Project.getProject("Builder4");
	
	proj.scanDirs();
	print("load %s\n", proj.firstPath() + "/WindowLeftProps.bjs");
	
	var tf = proj.files.get(proj.firstPath() + "/WindowLeftProps.bjs");
	tf.loadItems();

	print("%s\n",tf.tree.toJsonString());
	var x = new JsRender.NodeToGlade(tf.tree,  "");

	 
	FileIOStream iostream;
	var  f = File.new_tmp ("tpl-XXXXXX.glade", out iostream);
	var ostream = iostream.output_stream;
	var dostream = new DataOutputStream (ostream);
	dostream.put_string (x.munge());
	 
	
	var w  = new Gtk.Window( Gtk.WindowType.TOPLEVEL );

	var  left_props =new Xcls_GladeView();
	left_props.el.show();
	w.add(left_props.el);
	w.show_all();   
 
 
	var p = left_props.el.get_project();
    print("LOADING\n");
    p.load_from_file(f.get_path ());
 
	Gtk.main();
    
	
	return 0;
}