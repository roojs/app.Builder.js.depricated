//<Script type="text/javascript">

/**
 *  Test of web kit inspector.
 *  create a window + 2 webviews. inside scrolled window.
 *     load google in first, then hook in the inspector..
 * 
 * needs the transfer ownship fixing on return value in  WebKit-1.0.gir
 * 
 *  <method name="get_inspector"
 *             c:identifier="webkit_web_view_get_inspector">
 *       <return-value transfer-ownership="none">
 *         <type name="WebInspector" c:type="WebKitWebInspector*"/>
 *       </return-value>
 *     </method>
 *
 * then compile it..
 * g-ir-compiler /usr/share/gir-1.0/WebKit-1.0.gir -o /usr/lib/girepository-1.0/WebKit-1.0.typelib 
 *
 */
 
 
Gtk = imports.gi.Gtk;
WebKit = imports.gi.WebKit;

Gtk.init(null,null);

// build the UI..
w = new Gtk.Window.c_new( Gtk.WindowType.TOPLEVEL);
v = new Gtk.VBox();
s1 = new Gtk.ScrolledWindow();
s2 = new Gtk.ScrolledWindow();
w1 = new WebKit.WebView();
w2 = new WebKit.WebView();
s1.add(w1);
s2.add(w2);
v.add(s1);
v.add(s2);
w.add(v);

// enable inspector..
w1.get_settings().enable_developer_extras = true;

// load google on show..
w1.signal.show.connect(function() {
    w1.load_uri("http://www.google.com");
});

// load the inspector when loading has finished!
w1.signal.load_finished.connect(function(wv) {
    w1.get_inspector().show();
});

// return the bottom window as the inspector..
w1.get_inspector().signal.inspect_web_view.connect(function() {
    return w2;
})


w.show_all();
Gtk.main();



