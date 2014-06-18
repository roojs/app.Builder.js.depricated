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

void testBuilderFile(string ptype, string dir,  string name, string test)
{
	 
	var proj = Project.Project.factory( ptype, dir );
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
		case "PREVIEW":
			print ("Calling to sourcepreview"); 
			print( tf.toSourcePreview());
			return;
	}
	print("invalid test?\n");
}


#if  UI
void testLeftTree(string name)
{
	var dir = "/home/alan/gitlive/app.Builder.js/Builder4"; 
	var proj = new Project.Gtk(dir );
	proj.scanDirs();
	 
	var tf = proj.files.get(dir + "/" + name + ".bjs");
	tf.loadItems();
	var w = new Xcls_MainWindow();

	var  left_tree =new Xcls_WindowLeftTree();

	w.vbox.el.pack_start(left_tree.el,true, true,0);
    w.el.show_all();
 
	left_tree.model.loadFile(tf);
	
}

void rooWindowTest(string name)
{
	var dir = "/home/alan/gitlive/Pman.Core/"; 
	var proj = new Project.Gtk(dir );
	proj.scanDirs();
	 
	var tf = proj.files.get(dir + "/" + name + ".bjs");
	tf.loadItems();
	
	var w = new Xcls_MainWindow();

	 var rv =new Xcls_WindowRooView();

	w.vbox.el.pack_start(rv.el,true, true,0);
    w.el.show_all();
 
	rv.loadFile(tf);
	
}

#endif
int main (string[] args) {
    Gtk.init (ref args);
    new JsRender.Lang_Class();
	GLib.Log.set_always_fatal(LogLevelFlags.LEVEL_ERROR | LogLevelFlags.LEVEL_CRITICAL); 
	//print ("Drop points for Gtk.ScrolledWindow are : " + 
	//	string.joinv(", " , Palete.factory("Gtk").getDropList("Gtk.ScrolledWindow"))
	//);

	//testBuilderFile("Gtk", "/home/alan/gitlive/app.Builder.js/Builder4" , "Editor", "JSON");
	//testBuilderFile("Gtk", "/home/alan/gitlive/app.Builder.js/Builder4, "Editor", "JS");
	//testBuilderFile("Gtk", "/home/alan/gitlive/app.Builder.js/Builder4","Editor", "VALA");
	//testBuilderFile("Roo", "/home/alan/gitlive/Pman.Core/","Pman.Dialog.CoreEmail", "PREVIEW");
	//testLeftTree("Editor");
	rooWindowTest("Pman.Dialog.CoreEmail"); Gtk.main();

    
	
	return 0;
}