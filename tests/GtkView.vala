/**
 * Test the writer code...


*/

public Project proj;

int main (string[] args) {
	Gtk.init (ref args);
	//GtkClutter.init (ref args);
	new JsRender.Lang_Class();
	GLib.Log.set_always_fatal(LogLevelFlags.LEVEL_ERROR | LogLevelFlags.LEVEL_CRITICAL); 
	Project.Project.loadAll();
	proj = Project.Project.getProject("Builder4");
	
	proj.scanDirs();
	print("load %s\n", proj.firstPath() + "/WindowLeftProps.bjs");

	loadit("EditProject");

	
	Gtk.main();
    
	
	return 0;
}

void loadit(string name ) {
	
	//var tf = proj.files.get(proj.firstPath() + "/WindowLeftProps.bjs");
	var tf = proj.files.get(proj.firstPath() + "/" + name +".bjs");
	tf.loadItems();

	
	var w  = new Gtk.Window( Gtk.WindowType.TOPLEVEL );

	var  left_props =new Xcls_GtkView();
	left_props.el.show();
	w.add(left_props.el);
	w.show_all();   
	left_props.addNode(tf);
	
	left_props.container.el.show_all();
}