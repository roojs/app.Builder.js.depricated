// compile
// valac   --pkg  gtk+-3.0  enum.vala   -o /tmp/enum
// ??--pkg javascriptcore \


int main (string[] args) {
 
	
	stdout.printf ("%s\n", Type.from_name ("Gtk.Orientation.VERTICAL").name ());
	
	return 0;
}
	 
