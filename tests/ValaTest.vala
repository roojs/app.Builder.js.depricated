/**
 * Test the writer code...


*/
 
int main (string[] args) {
	Gtk.init (ref args);
	//GtkClutter.init (ref args);
	new JsRender.Lang_Class();
	GLib.Log.set_always_fatal(LogLevelFlags.LEVEL_ERROR | LogLevelFlags.LEVEL_CRITICAL); 
	Project.Project.loadAll();
	var p = Project.getProject("BuilderTest");
	p.scanDirs();
	var ar = p.sortedFiles();
	for (
public Gee.ArrayList<JsRender.JsRender> sortedFiles()
		{
			var files = new Gee.ArrayList<JsRender.JsRender>();

			var fiter = this.files.map_iterator();
			while(fiter.next()) {
				files.add(fiter.get_value());
			}
		        files.sort((fa,fb) => {
				return ((JsRender.JsRender)fa).name.collate(((JsRender.JsRender)fb).name);

			});
			return files;

		}
		
	// loop through and create vala files..
	
	
	
/*
	var p = Palete.factory("Roo");
	var cl = p.getClass("Roo.form.Form").toJSON();;
	
	var n = new Json.Node(Json.NodeType.OBJECT);
	n.set_object(cl);
    var generator = new Json.Generator ();
	generator.indent = 4;
	generator.pretty = true;
	generator.set_root (n);

	print(generator.to_data (null));
 */
    
	var w  = new Gtk.Window( Gtk.WindowType.TOPLEVEL );

	var  left_props =new Xcls_RightPalete();
    left_props.el.show_all();
	w.add(left_props.el);
	w.show_all();
 
	left_props.load(Palete.factory("Roo"), "Roo.form.Form"); 

		 
	 Gtk.main();
    
	
	return 0;
}