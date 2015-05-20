// compile
// valac   --pkg  gtk+-3.0  enum.vala   -o /tmp/enum
// ??--pkg javascriptcore \


int main (string[] args) {
	Gtk.init(ref args);
	var type = typeof(Gtk.Box);
	var  ocl = (ObjectClass) type.class_ref ();
	foreach (ParamSpec spec in ocl.list_properties ()) {
		stdout.printf ("%s\n", spec.get_name ());
	}
	 
	return 0;
}
	 
