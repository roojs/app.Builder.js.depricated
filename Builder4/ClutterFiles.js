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
    listeners : {
        scroll_event : ( event)  => {
        
            print("scroll event");
            var y = this.filelayout.el.y;
            var dir = event.direction;
            switch (dir) {
                case Clutter.ScrollDirection.UP:
                    y += event.y;
                    break;
                case Clutter.ScrollDirection.DOWN:
                    y -= event.y;
                    break;
                default:
                    return false;
            }
            print("scroll event of %f  - new y = %f ".printf(event.y, y));
            this.filelayout.el.y = y;
            return true;
                
        }
    },
    id : "ClutterFiles",
    scroll_mode : "Clutter.ScrollMode.VERTICAL",
    reactive : true,
    'void:set_size' : (float w, float h) {
        _this.filelayout_manager.el.max_column_width = w - 150;
       this.el.set_size(this.el.get_stage().width-150,
                            this.el.get_stage().height);
                this.el.set_position(100,50);
    },
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
            init : this.el.add_constraint(
                new Clutter.BindConstraint(_this.el,Clutter.BindCoordinate.SIZE, 0.0f)
            );,
            reactive : true,
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
                            '*args' : "JsRender.JsRender file",
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
                column_spacing : 20,
                id : "filelayout_manager",
                row_spacing : 20,
                homogeneous : true,
                orientation : Clutter.FlowOrientation.HORIZONTAL
            }
        }
    ]
});
ClutterFiles.init();
XObject.cache['/ClutterFiles'] = ClutterFiles;
