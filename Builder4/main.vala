/**
 * Test the writer code...


*/
 
int main (string[] args) {
    Gtk.init (ref args);
	GtkClutter.init (ref args);
    new JsRender.Lang_Class();
	GLib.Log.set_always_fatal(LogLevelFlags.LEVEL_ERROR | LogLevelFlags.LEVEL_CRITICAL); 
	Project.Project.loadAll();
	var proj = Project.Project.getProject("Pman.Core");
	
	proj.scanDirs();


	var w = new Xcls_MainWindow();
	//w.ref();
	w.project = proj;
	w.initChildren();
	w.el.show_all();
    Gtk.main();
    
	
	return 0;
}