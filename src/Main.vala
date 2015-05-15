/**
 * Test the writer code...


*/
 
int main (string[] args) {
	
	
	
	
    

	var app =  BuilderApplication.singleton(  args);
	
	if (BuilderApplication.opt_debug  || BuilderApplication.opt_compile_project == null) {
		GLib.Log.set_handler(null, 
			GLib.LogLevelFlags.LEVEL_DEBUG | GLib.LogLevelFlags.LEVEL_WARNING, 
			(dom, lvl, msg) => {
			print("%s: %s\n", dom, msg);
		});
	}
	
	if (BuilderApplication.opt_compile_project != null) {
		 
		Palete.ValaSource.buildApplication();
		
		GLib.Process.exit(Posix.EXIT_SUCCESS);
	}
	
	 
	
	GLib.debug("project = %s\n", BuilderApplication.opt_compile_project);
	
	Gtk.init (ref args);
	
	
	GtkClutter.init (ref args);
	new JsRender.Lang_Class();
	GLib.Log.set_always_fatal(LogLevelFlags.LEVEL_ERROR | LogLevelFlags.LEVEL_CRITICAL); 
	Project.Project.loadAll();
	/*var proj = Project.Project.getProject("Pman.Core");
	if (proj == null) {
		print("could not load test project Pman.Core");
		return 0;
	}
	proj.scanDirs();
	*/

	var w = Xcls_MainWindow.singleton();
	//w.ref();
	//w.project = proj;
	
	w.el.show_all();
	// it looks like showall after children causes segfault on ubuntu 14.4
	w.initChildren();
	w.windowstate.switchState(WindowState.State.FILES);
	
	Gtk.main();
    
	
	return 0;
}
