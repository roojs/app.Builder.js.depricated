
int main (string[] args) {
	Gtk.init (ref args);
	//GtkClutter.init (ref args);
	new JsRender.Lang_Class();
	GLib.Log.set_always_fatal(LogLevelFlags.LEVEL_ERROR | LogLevelFlags.LEVEL_CRITICAL);

	var test = Palete.Gir.factoryFqn("Gtk.MessageDialog.flags");
	
	print ("type %s\n", test.fqtype());
	
	var generator = new Json.Generator ();
	var n = new Json.Node(Json.NodeType.OBJECT);
	n.set_object(test.toJSON());
	generator.set_root(n);
	generator.indent = 4;
	generator.pretty = true;
    
	print(generator.to_data(null));
	 
	return 0;
}

