Gtk = imports.gi.Gtk;
Gdk = imports.gi.Gdk;
Pango = imports.gi.Pango;
GLib = imports.gi.GLib;
Gio = imports.gi.Gio;
GObject = imports.gi.GObject;
GtkSource = imports.gi.GtkSource;
WebKit = imports.gi.WebKit;
Vte = imports.gi.Vte;
console = imports.console;
XObject = imports.XObject.XObject;
MainWindow=new XObject({
    xtype: Gtk.Window,
    destroy : "() => {\n   Gtk.main_quit();\n}",
    listeners : {
        show : ( ) => {
        
            //imports.Builder.Provider.ProjectManager.ProjectManager.loadConfig();
            //this.get('/MidPropTree').hideWin();
            //this.get('/RightPalete').hide();
            //this.get('/BottomPane').el.hide();
            //this.get('/Editor').el.show_all();
        
        },
        delete_event : (  event) => {
            return false;
        }
    },
    border_width : 0,
    default_height : 500,
    default_width : 800,
    id : "Window",
    title : "Application Builder",
    init : this.el.show_all();,
    'void:setTitle' : (string str) {
        this.el.set_title(this.title + ' - ' + str);
    },
    type : Gtk.WindowType.TOPLEVEL,
    items : [
        {
            xtype: Gtk.VBox,
            id : "w-vbox"
        }
    ]
});
MainWindow.init();
XObject.cache['/MainWindow'] = MainWindow;
