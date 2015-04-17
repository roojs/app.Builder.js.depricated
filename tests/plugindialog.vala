

// compile
// valac plugindialog.vala ../src/Builder4/DialogPluginWebkit.vala ../src/Builder4/FakeServer.vala ../src/Application.vala ../src/JsRender/RooDatabase.vala --pkg libgda-5.0  --pkg json-glib-1.0  --pkg  gtk+-3.0 --pkg gee-1.0  --pkg webkit2gtk-4.0 --pkg libxml-2.0   -o /tmp/plugtest
// ??--pkg javascriptcore \


int main (string[] args) {
	Gtk.init (ref args);
	var c  = new Xcls_DialogPluginWebkit();
	c.show(null, "hello");


	Gtk.main();
    
	
	return 0;
}
