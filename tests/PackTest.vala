/**
 * Test the pack code...


*/
 
int main (string[] args) {
	Gtk.init (ref args);
	GtkClutter.init (ref args);
	new JsRender.Lang_Class();
	GLib.Log.set_always_fatal(LogLevelFlags.LEVEL_ERROR | LogLevelFlags.LEVEL_CRITICAL); 
	

	var pal = Palete.Palete.factory("Gtk");

	var node = new JsRender.Node();
	
	var parent = new JsRender.Node();

	parent.setFqn("Gtk.VBox");
	node.setFqn("Gtk.ScolledWindow");
	pal.fillPack(JsRender.Node node,JsRender.Node parent)
	print("pack is %s\n", node.get("* pack");
	 
	
	return 0;
}
 