/**
 * Test the writer code...


*/
 

int main (string[] args) {
    Gtk.init (ref args);
	GtkClutter.init (ref args);
    new JsRender.Lang_Class();
	GLib.Log.set_always_fatal(LogLevelFlags.LEVEL_ERROR | LogLevelFlags.LEVEL_CRITICAL); 
	Project.Project.loadAll();
	 


	var dir = "/home/alan/gitlive/Pman.Cms"; 
	var name = "Pman.Dialog.CmsImage";
	var proj = new Project.Gtk(dir );
	proj.scanDirs();
	 
	var tf = proj.files.get(dir + "/" + name + ".bjs");
	tf.loadItems();



    var w  = new Gtk.Window( Gtk.WindowType.TOPLEVEL );

	var  left_props =new Xcls_LeftProps();

	w.pack_start(left_props.el,true, true,0);
    w.el.show_all();
 
	left_props.load(tf, tf.items.tree); 

		
	//rooWindowTest("Pman.Dialog.CoreEmailPreview");Gtk.main();
	//rooWindowTest("Pman.Dialog.CoreEmail"); Gtk.main();
	 Gtk.main();
    
	
	return 0;
}