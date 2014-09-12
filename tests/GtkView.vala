/**
 * Test the writer code...


*/

public Project.Project proj;

int main (string[] args) {
	Gtk.init (ref args);
	GtkClutter.init (ref args);
	new JsRender.Lang_Class();
	GLib.Log.set_always_fatal(LogLevelFlags.LEVEL_ERROR | LogLevelFlags.LEVEL_CRITICAL); 
	Project.Project.loadAll();
	proj = Project.Project.getProject("Builder4");
	
	proj.scanDirs();
	//
	loadit("ProjectSettings");
	//var iter = proj.sortedFiles().list_iterator();
	//while (iter.next()) {  loadit(iter.get().name);	}
	//loadit("WindowLeftProps");
	//loadit("EditProject");
	//loadit("Editor");
	//loadit("MainWindow");
	Gtk.main();
    
	
	return 0;
}

void loadit(string name ) {
	print("load %s\n", proj.firstPath() + "/" + name  + ".bjs");
	//var tf = proj.files.get(proj.firstPath() + "/WindowLeftProps.bjs");
	var tf = proj.files.get(proj.firstPath() + "/" + name +".bjs");
	tf.loadItems();

	
	
	var g = new JsRender.NodeToGtk(tf.tree);
	var obj = g.munge() as Gtk.Widget;
	if (obj == null) {
		print("skip %s - munge returned null\n", name);
		return;
	}
	var w  = new Gtk.Window( Gtk.WindowType.TOPLEVEL );
	w.set_title(tf.name);
	w.ref();
	w.add(obj);
	w.show_all();   
	
}