/**
 * Test the writer code...


*/
 
int main (string[] args) {
	Gtk.init (ref args);
	//GtkClutter.init (ref args);
	new JsRender.Lang_Class();
	GLib.Log.set_always_fatal(LogLevelFlags.LEVEL_ERROR | LogLevelFlags.LEVEL_CRITICAL); 
	Project.Project.loadAll();
	var p = Project.getProject("BuilderTest");
	p.scanDirs();
	var ar = p.sortedFiles();
	var iter = ar.list_iterator();
	while (iter.next()) {
		var f= iter.get();
		f.save();
	} 
    
	
	return 0;
}