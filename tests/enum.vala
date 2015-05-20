// compile
// valac   --pkg  gtk+-3.0  enum.vala   -o /tmp/enum
// ??--pkg javascriptcore \


int main (string[] args) {
	Gtk.init(ref args);
	var type = typeof(Gtk.Box);
	var  ocl = (ObjectClass) type.class_ref ();
	var ps = ocl.find_property("orientation");
	var vt = ps.value_type;
    EnumClass ec = (EnumClass) vt.class_ref ();
	for (var i =0;i< ec.n_values; i++) {
		var ev = ec.values[i];
		print("%s : %d", ev.name,ev.value);
	}
	 
	return 0;
}
	 
