/**
 * Test the writer code...


*/
 
int main (string[] args) {
	Gtk.init (ref args);
	//GtkClutter.init (ref args);
	new JsRender.Lang_Class();
	GLib.Log.set_always_fatal(LogLevelFlags.LEVEL_ERROR | LogLevelFlags.LEVEL_CRITICAL);


	var g = Palete.Gir.factory("Gtk");
	var test = g.classes.get("Dialog");
	
	
	var generator = new Json.Generator ();
	var n = new Json.Node(Json.NodeType.OBJECT);
	n.set_object(test.toJSON());
	generator.set_root(n);
	generator.indent = 4;
	generator.pretty = true;
    
	print(generator.to_data(null));
	return 0;

	
	Project.Project.loadAll();
	var p = Project.Project.getProject("BuilderTest");
	p.scanDirs();
	var ar = p.sortedFiles();
	var iter = ar.list_iterator();
	while (iter.next()) {
		var f= iter.get();
		f.save();
	} 
    
	
	return 0;
}