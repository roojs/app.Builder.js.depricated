/**
 * Test the writer code...


*/


void diff(string original, string data)
{
	
	FileUtils.set_contents("/tmp/test.out",data);
	string[] spawn_args = {"diff", "-w" , "-u", original, "/tmp/test.out" };
	
	
	string[] spawn_env = Environ.get ();
	int ls_status;
	Process.spawn_sync ("/",
							spawn_args,
							spawn_env,
							SpawnFlags.SEARCH_PATH,
							null,
							null,
							null,
							out ls_status);
	 

}



int main (string[] args) {
	Gtk.init (ref args);
	//GtkClutter.init (ref args);
	new JsRender.Lang_Class();
	GLib.Log.set_always_fatal(LogLevelFlags.LEVEL_ERROR | LogLevelFlags.LEVEL_CRITICAL);


	
	Project.Project.loadAll();
	var p = Project.Project.getProject("Builder5");
	p.scanDirs();
	var ar = p.sortedFiles();
	var iter = ar.list_iterator();
	while (iter.next()) {
		var f= iter.get();
		f.loadItems();

		//print("\n%s\n",f.toJsonString());
		diff(p.firstPath() + "/" + f.name + ".vala", JsRender.NodeToVala.mungeFile(f));
		//var str= 
		//print("\n%s\n",str);
		//return 0;
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