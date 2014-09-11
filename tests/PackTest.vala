/**
 * Test the pack code...


*/
 
int main (string[] args) {
	Gtk.init (ref args);
	GtkClutter.init (ref args);
	new JsRender.Lang_Class();
	GLib.Log.set_always_fatal(LogLevelFlags.LEVEL_ERROR | LogLevelFlags.LEVEL_CRITICAL); 
	

	Palete.Palete.

	Project.Project.loadAll();
	proj = Project.Project.getProject("Builder4");
	
	proj.scanDirs();
	//
	
	//var iter = proj.sortedFiles().list_iterator();
	//while (iter.next()) {  loadit(iter.get().name);	}
	//loadit("WindowLeftProps");
	//loadit("EditProject");
	//loadit("Editor");
	loadit("MainWindow");
	Gtk.main();
    
	
	return 0;
}
 