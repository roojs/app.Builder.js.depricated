/**
 * Test the writer code...


*/


void diff(string original, string data)
{
	
	FileUtils.set_contents("/tmp/test.out",data);
	string[] spawn_args = {"diff", "-w" , "-u", original, "/tmp/out.bjs" };
	
	
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

void testBuilderFile(string name, string test)
{
	var dir = "/home/alan/gitlive/app.Builder.js/Builder4"; 
	var proj = new Project.Gtk(dir );
	proj.scanDirs();
	//print(proj.toJSON(true));
	//print("\ndone\n");
	var tf = proj.files.get(dir + "/" + name + ".bjs");
	tf.loadItems();
	switch(test) {
		case "JSON":
			diff(dir + "/" + name + ".bjs", tf.toJsonString());
			return;
		case "JS":
			diff(dir + "/" + name + ".js", tf.toSource());
			return;
		case "VALA":
			diff(dir + "/" + name + ".vala", tf.toValaSource(false));
			return;
	}
	print("invalid test?\n");
}

public static int main () {
    new JsRender.Lang_Class();
	GLib.Log.set_always_fatal(LogLevelFlags.LEVEL_ERROR | LogLevelFlags.LEVEL_CRITICAL); 

	testBuilderFile("Editor", "JSON");
	//testBuilderFile("Editor", "JS");
	//testBuilderFile("Editor", "VALA");

    
	
	return 0;
}