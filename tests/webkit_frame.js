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
w1 = new WebKit.WebView();
s1.add(w1);
v.add(s1);
w.add(v);

// enable inspector..
// load google on show..
w1.signal.show.connect(function() {
    w1.load_html_string("<body>hello world<iframe width='100' height='100' src='about:blank'></iframe></body>");
});


// show and go..
w.show_all();
Gtk.main();



