

// compile
// valac plugindialog.vala ../src/Builder4/DialogPluginWebkit.vala --pkg  gtk+-3.0  --pkg webkit2gtk-3.0 -o /tmp/plugtest
// ??--pkg javascriptcore \


int main (string[] args) {
	Gtk.init (ref args);
	var c  = Xcls_DialogPluginWebkit();
	c.show();


	Gtk.main();
    
	
	return 0;
}
