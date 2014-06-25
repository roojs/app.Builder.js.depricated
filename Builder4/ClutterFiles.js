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
ClutterFiles=new XObject({
    xtype: Clutter.ScrollActor,
    id : "ClutterFiles",
    scroll_mode : "Clutter.ScrollMode.VERTICAL",
    'void:show' : (Project.Project pr) {
        // list all the files, and create new Xcls_fileitem for each one.
        
        var fiter = pr.files.map_iterator();
        while (fiter.next()) {
            var a = new Xcls_fileitem(this,fiter.get_value());
            a.ref();
            print("add " + fiter.get_value().name + "\n");
            this.filelayout.el.add_child(a.el);
        }
        this.el.show_all();
    },
    items : [
        {
            xtype: Clutter.Actor,
            id : "filelayout",
            pack : "add_child",
            items : [
                {
                    xtype: Clutter.Actor,
                    '*args' : "JsRender.JsRender file",
                    id : "*fileitem",
                    pack : false,
                    init : this.el.set_size(100,100);,
                    items : [
                        {
                            xtype: Clutter.Texture,
                            '*args' : "JsRender.JsRender file",
                            id : "+image",
                            pack : "add_child",
                            x_align : Clutter.ActorAlign.START,
                            x_expand : true,
                            y_align : Clutter.ActorAlign.START,
                            y_expand : false
                        },
                        {
                            xtype: Clutter.Text,
                            color : "",
                            '*args' : "JsRender.JsRender file",
                            '*ctor' : "with_text(\"Sans 14px\", file.nickName())",
                            id : "+title",
                            pack : "add_child",
                            x_align : Clutter.ActorAlign.START,
                            x_expand : true,
                            y_align : Clutter.ActorAlign.START,
                            y_expand : false
                        }
                    ],
                    layout_manager : {
                        xtype: Clutter.BoxLayout,
                        spacing : 4,
                        orientation : Clutter.Orientation.VERTICAL
                    }
                }
            ],
            layout_manager : {
                xtype: Clutter.FlowLayout,
                orientation : Clutter.FlowOrientation.HORIZONTAL
            }
        }
    ]
});
ClutterFiles.init();
XObject.cache['/ClutterFiles'] = ClutterFiles;
