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
	 
	var tf = proj.files.get(proj.fn + "/WindowLeftProps.bjs");
	tf.loadItems();
	var w = new Xcls_MainWindow();

	var  left_tree =new Xcls_WindowLeftTree();

	w.vbox.el.pack_start(left_tree.el,true, true,0);
    w.el.show_all();
 
	left_tree.model.loadFile(tf);
    
	var w  = new Gtk.Window( Gtk.WindowType.TOPLEVEL );

	var  left_props =new Xcls_GladeView();
	left_props.el.show();
	w.add(left_props.el);
	w.show_all();   
 
 
	var p = left_props.el.get_project();
    print("LOADING\n");
    p.load_from_file("/home/alan/gitlive/app.Builder.js/tests/test.glade");
	 
	Gtk.main();
    
	
	return 0;
}