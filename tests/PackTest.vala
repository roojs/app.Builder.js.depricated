/**
 * Test the pack code...


*/
 
int main (string[] args) {
	Gtk.init (ref args);
	GtkClutter.init (ref args);
	new JsRender.Lang_Class();
	GLib.Log.set_always_fatal(LogLevelFlags.LEVEL_ERROR | LogLevelFlags.LEVEL_CRITICAL); 
	

	var pal = Palete.Palete.factory("Gtk");
	pal.
	 
	Gtk.main();
    
	
	return 0;
}
 