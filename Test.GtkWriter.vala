/**
 * Test the writer code...


*/

public static int main () {

	GLib.Log.set_always_fatal(LogLevelFlags.LEVEL_ERROR | LogLevelFlags.LEVEL_CRITICAL); 
	var proj = new Project.Gtk( "/home/alan/gitlive/app.Builder.js/Builder4");
	proj.scanDirs();
	print(proj.toJSON(true));
	print("\ndone\n");
	var tf = proj.files.get("/home/alan/gitlive/app.Builder.js/Builder4/Editor.bjs");
	tf.loadItems();
	var test_out =tf.toJsonString();
	print(test_out);
	FileUtils.set_contents("/tmp/out.bjs",test_out);
	string[] spawn_args = {"diff", "-u", "/home/alan/gitlive/app.Builder.js/Builder4/Editor.bjs", "/tmp/out.bjs" };
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
	//var tf = proj.files['/home/alan/gitlive/app.Builder/Builder4/Editor.bjs'];
	//tf.loadItems(function() {
	//	print(JSON.stringify(tf,null,4));
	//	
		
	//}, true); 

	return 0;
}