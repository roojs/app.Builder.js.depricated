/**
 * Test the writer code...


*/
  	
}

int main (string[] args) {
    Gtk.init (ref args);
	GtkClutter.init (ref args);
    new JsRender.Lang_Class();
	GLib.Log.set_always_fatal(LogLevelFlags.LEVEL_ERROR | LogLevelFlags.LEVEL_CRITICAL); 
	Project.Project.loadAll();
	 
	var dir = "/home/alan/gitlive/app.Builder.js/Builder4"; 
	var proj = new Project.Gtk(dir );
	proj.scanDirs();
	 
	var tf = proj.files.get(dir + "/" + name + ".bjs");
	tf.loadItems();
	var w = new Xcls_MainWindow();

	var  left_tree =new Xcls_WindowLeftTree();

	w.vbox.el.pack_start(left_tree.el,true, true,0);
    w.el.show_all();
 
	left_tree.model.loadFile(tf);

	//rooWindowTest("Pman.Dialog.CoreEmailPreview");Gtk.main();
	//rooWindowTest("Pman.Dialog.CoreEmail"); Gtk.main();
	rooWindowClutter(); Gtk.main();
    
	
	return 0;
}