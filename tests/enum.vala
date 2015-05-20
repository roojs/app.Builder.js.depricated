// compile
// valac   --pkg  gtk+-3.0  enum.vala   -o /tmp/enum
// ??--pkg javascriptcore \


int main (string[] args) {
	Gtk.init(ref args);
	var x = Type.from_name ("Gtk.Orientation.HORIZONTAL");
	print("%s\n", x.name ());
	
	return 0;
}
	 
