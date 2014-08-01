/**
 * Test the writer code...


*/
 
int main (string[] args) {
	Gtk.init (ref args);
	//GtkClutter.init (ref args);
	new JsRender.Lang_Class();
	GLib.Log.set_always_fatal(LogLevelFlags.LEVEL_ERROR | LogLevelFlags.LEVEL_CRITICAL); 
	Project.Project.loadAll();
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

	var  left_props =new Xcls_GladeView();

	w.add(left_props.el);
	w.show_all();
 
 
	var p = left_props.el.get_project();
    
    p.load("/home/alan/gitlive/app.Builder.js/tests/test.glade");
	 
	Gtk.main();
    
	
	return 0;
}