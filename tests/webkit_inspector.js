//<Script type="text/javascript">

/**
 *  - test of web kit inspector.
 *  = create a window + 2 webviews. inside scrolled window.
 * load google in first, then hook in the inspector..
 * 
 */
Gtk = imports.gi.Gtk;
WebKit = imports.gi.WebKit;

Gtk.init(null,null);
w = new Gtk.Window.c_new( Gtk.WindowType.TOPLEVEL);

v = new Gtk.VBox();
s1 = new Gtk.ScrolledWindow();
s2 = new Gtk.ScrolledWindow();
w1 = new WebKit.WebView();
w1.signal.show.connect(function() {
    w1.load_uri("http://www.google.com");
    w1.get_settings().enable_developer_extras = true;
});
w1.signal.load_finished.connect(function() {
    print("INSPECT?");
    w1.get_inspector().show();
});
w2 = new WebKit.WebView();
w1.get_inspector().signal.inspect_web_view.connect(function() {
    return w2;
})

s1.add(w1);
s2.add(w2);
v.add(s1);
v.add(s2);
w.add(v);

w.show_all();
Gtk.main();



