/**
 * Test the writer code...


*/
 
int main (string[] args) {
	Gtk.init (ref args);
	//GtkClutter.init (ref args);
	new JsRender.Lang_Class();
	GLib.Log.set_always_fatal(LogLevelFlags.LEVEL_ERROR | LogLevelFlags.LEVEL_CRITICAL); 
	Project.Project.loadAll();
	
	
    
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