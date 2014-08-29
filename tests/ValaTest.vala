/**
 * Test the writer code...


*/
 
int main (string[] args) {
	Gtk.init (ref args);
	//GtkClutter.init (ref args);
	new JsRender.Lang_Class();
	GLib.Log.set_always_fatal(LogLevelFlags.LEVEL_ERROR | LogLevelFlags.LEVEL_CRITICAL);


	
	Project.Project.loadAll();
	var p = Project.Project.getProject("BuilderTest");
	p.scanDirs();
	var ar = p.sortedFiles();
	var iter = ar.list_iterator();
	while (iter.next()) {
		var f= iter.get();
		f.loadItems();
		var str= JsRender.NodeToVala.mungeFile(f);
		print("\n%s\n",str);
		return 0;
	}
    
	
	return 0;
}


void testGir() {


	var test = Palete.Gir.factoryFqn("Gtk.Label.new");
	if (test == null) {
		print("could not find Gtk.Label.new\n");
		return;
	}

	
	var generator = new Json.Generator ();
	var n = new Json.Node(Json.NodeType.OBJECT);
	n.set_object(test.toJSON());
	generator.set_root(n);
	generator.indent = 4;
	generator.pretty = true;
    
	print(generator.to_data(null));
	
}