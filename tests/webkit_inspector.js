//<Script type="text/javascript">

/**
 *  - test of web kit inspector.
 *  = create a window + 2 webviews. inside scrolled window.
 * load google in first, then hook in the inspector..
 * 
 */
Gtk = imports.gi.Gtk;
Webkit = imports.gi.Webkit;
 
w = new Gtk.Window({ type:  Gtk.WindowType.TopLEVEL });
v = new Gtk.VBox();
s1 = new Gtk.ScrolledWindow();
s2 = new Gtk.ScrolledWindow();
w1 = new Webkit.WebView();
w2 = new Webkit.WebView();
s1.add(w1);
s2.add(s2);
v.add(s1);
v.add(s2);
w.add(v);
w.show_all();



