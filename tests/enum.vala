// compile
// valac   --pkg  gtk+-3.0  enum.vala   -o /tmp/enum
// ??--pkg javascriptcore \


int main (string[] args) {
	Gtk.init(ref args);
	var type = typeof(Gtk.Box);
	var  ocl = (ObjectClass) type.class_ref ();
	var ps = ocl.find_property("orientation");
	var vt = ps.value_type;
	print("%s : %s\n", vt.name(), vt.is_enum() ? "Y" : "N");
	 
	return 0;
}
	 
