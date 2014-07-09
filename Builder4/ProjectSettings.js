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
ProjectSettings=new XObject({
    xtype: Gtk.VBox,
    border_width : 5,
    homogeneous : false,
    id : "ProjectSettings",
    pack : get_content_area().add,
    'void:show' : (Project.Project project) {
        _this.project = project;
        // get the active project.
        
        //print (project.fn);
        //project.runhtml = project.runhtml || '';
        _this.view.el.get_buffer().set_text(project.runhtml);
        
        this.el.show_all();
    },
    items : [
        {
            xtype: Gtk.Label,
            pack : "pack_start,false,false,0",
            label : "HTML To insert at end of <HEAD>"
        },
        {
            xtype: Gtk.ScrolledWindow,
            pack : "pack_start,true,true,0",
            items : [
                {
                    xtype: GtkSource.View,
                    pack : "add",
                    id : "view"
                }
            ]
        },
        {
            xtype: Gtk.HBox,
            pack : "pack_end,true,true,0",
            items : [
                {
                    xtype: Gtk.Button,
                    listeners : {
                        button_press_event : () => {
                            _this.buttonPressed("cancel");
                        }
                    },
                    label : "Cancel",
                    pack : "add"
                },
                {
                    xtype: Gtk.Button,
                    listeners : {
                        button_press_event : () => {
                            _this.project.runhtml = "";
                            _this.buttonPressed("apply");
                        }
                    },
                    label : "Apply",
                    pack : "add"
                },
                {
                    xtype: Gtk.Button,
                    listeners : {
                        button_press_event : () => {
                            _this.project.runhtml = "";
                            _this.buttonPressed("save");
                        }
                    },
                    label : "Save",
                    pack : "add"
                }
            ]
        }
    ]
});
ProjectSettings.init();
XObject.cache['/ProjectSettings'] = ProjectSettings;
