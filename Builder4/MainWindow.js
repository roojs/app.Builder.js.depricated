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
        show : function (self) {
          print("WINDOW SHOWING - trying to hide");
        imports.Builder.Provider.ProjectManager.ProjectManager.loadConfig();
         	this.get('/MidPropTree').hideWin();
            this.get('/RightPalete').hide();
            this.get('/BottomPane').el.hide();
            //this.get('/Editor').el.show_all();
        
        },
        delete_event : function (self, event) {
        
        }
    },
    border_width : 0,
    default_height : 500,
    default_width : 800,
    id : "Window",
    title : "Application Builder",
    init : function() {
         this.atoms = {
               "STRING" : Gdk.atom_intern("STRING")
    	};
    	this.targetList = new Gtk.TargetList();
    	this.targetList.add( this.atoms["STRING"], 0, 0);
    	//imports.Builder.Provider.ProjectManager.ProjectManager.loadConfig();
    Gtk.rc_parse_string(
                "style \"gtkcombobox-style\" {\n" + 
                "    GtkComboBox::appears-as-list = 1\n" +
                "}\n"+
                "class \"GtkComboBox\" style \"gtkcombobox-style\"\n");
        XObject.prototype.init.call(this);
        this.el.show_all();
        
       
                  
    },
    setTitle : function(str) {
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
