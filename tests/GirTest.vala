
int main (string[] args) {
	Gtk.init (ref args);


	// test the gir location code..

	var context = new Vala.CodeContext ();
	 
	print(context.get_vapi_path("glib-2.0"));
	
	//GtkClutter.init (ref args);
	new JsRender.Lang_Class();
	GLib.Log.set_always_fatal(LogLevelFlags.LEVEL_ERROR | LogLevelFlags.LEVEL_CRITICAL);

	//var test = Palete.Gir.factoryFqn("Gtk.MessageDialog.flags");	  
	var test = Palete.Gir.factoryFqn("Gtk.ScrolledWindow");
		
	print ("type %s\n", test.fqtype());
	
	var generator = new Json.Generator ();
	generator.indent = 4;
	generator.pretty = true;
    
	var n = new Json.Node(Json.NodeType.OBJECT);
	n.set_object(test.toJSON());
	generator.set_root(n);
	
	print(generator.to_data(null));

	/*
	test = Palete.Gir.factoryFqn(test.fqtype());
	
	n = new Json.Node(Json.NodeType.OBJECT);
	n.set_object(test.toJSON());
	generator.set_root(n);
	
	print(generator.to_data(null));

	*/
	 
	return 0;
}

