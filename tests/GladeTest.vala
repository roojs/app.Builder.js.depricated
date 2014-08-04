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

	
	
	var w  = new Gtk.Window( Gtk.WindowType.TOPLEVEL );

	var  left_props =new Xcls_GladeView();
	left_props.el.show();
	w.add(left_props.el);
	w.show_all();   
	left_props.load(tf);
 
	
	Gtk.main();
    
	
	return 0;
}