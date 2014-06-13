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
    listeners : {
        show : ( ) => {
        
            //imports.Builder.Provider.ProjectManager.ProjectManager.loadConfig();
            //this.get('/MidPropTree').hideWin();
            //this.get('/RightPalete').hide();
            //this.get('/BottomPane').el.hide();
            //this.get('/Editor').el.show_all();
        
        },
        delete_event : (   event) => {
            return false;
        }
    },
    'void:show' : () {
        var left_tree =new Xcls_WindowLeftTree();
        _this.vbox.el.pack_start(left_tree.el,true, true,0);
        this.el.show_all();
    
    },
    border_width : 0,
    default_height : 500,
    default_width : 800,
    destroy : "() => {\n   Gtk.main_quit();\n}",
    id : "Window",
    init : this.el.show_all();,
    type : Gtk.WindowType.TOPLEVEL,
    'void:setTitle' : (string str) {
        this.el.set_title(this.title + " - " + str);
    },
    items : [
        {
            xtype: Gtk.VBox,
            id : "vbox"
        }
    ]
});
MainWindow.init();
XObject.cache['/MainWindow'] = MainWindow;
