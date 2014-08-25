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
    id : "ProjectSettings",
    homogeneous : false,
    'void:show' : (Project.Project project) {
        _this.project = project;
        _this.path.el.label = project.firstPath();
        // get the active project.
         var lm = Gtk.SourceLanguageManager.get_default();
                    
        ((Gtk.SourceBuffer)(_this.view.el.get_buffer())) .set_language(
        
            lm.get_language("html"));
      
        //print (project.fn);
        //project.runhtml = project.runhtml || '';
        _this.view.el.get_buffer().set_text(project.runhtml);
        
        //this.el.show_all();
    },
    items : [
        {
            xtype: Gtk.HBox,
            pack : "pack_start,false,false,0",
            homogeneous : false,
            items : [
                {
                    xtype: Gtk.Button,
                    listeners : {
                        button_press_event : () => {
                            var buf =    _this.view.el.get_buffer();
                           Gtk.TextIter s;
                             Gtk.TextIter e;
                            buf.get_start_iter(out s);
                            buf.get_end_iter(out e);
                              _this.project.runhtml = buf.get_text(s,e,true);
                            
                                  
                            _this.buttonPressed("apply");
                                return false;
                        }
                    },
                    label : "Apply",
                    pack : "add"
                },
                {
                    xtype: Gtk.Button,
                    listeners : {
                        button_press_event : () => {
                            var buf =    _this.view.el.get_buffer();
                            Gtk.TextIter s;
                            Gtk.TextIter e;
                            buf.get_start_iter(out s);
                            buf.get_end_iter(out e);
                            _this.project.runhtml = buf.get_text(s,e,true);
                            
                                  
                            _this.buttonPressed("save");
                                return false;
                        }
                    },
                    label : "Save",
                    pack : "add"
                }
            ]
        },
        {
            xtype: Gtk.Label,
            id : "path",
            label : "filename",
            pack : "pack_start,false,false,0",
            xalign : 0
        },
        {
            xtype: Gtk.Label,
            pack : "pack_start,false,false,0",
            label : "HTML To insert at end of <HEAD>"
        },
        {
            xtype: Gtk.HBox,
            pack : "pack_start,false,false,0",
            homogeneous : false,
            items : [
                {
                    xtype: Gtk.Label,
                    label : "HTML template file",
                    pack : "pack_start,false,false,0"
                },
                {
                    xtype: Gtk.Entry,
                    id : "base_template",
                    pack : "add"
                }
            ]
        },
        {
            xtype: Gtk.ScrolledWindow,
            pack : "pack_start,true,true,0",
            items : [
                {
                    xtype: GtkSource.View,
                    listeners : {
                        key_release_event : ( event) =>{
                            if (event.keyval != 115) {
                                return false;
                                 
                            }
                            if   ( (event.state & Gdk.ModifierType.CONTROL_MASK ) < 1 ) {
                                return false;
                            }
                             var buf =    this.el.get_buffer();
                            Gtk.TextIter s;
                            Gtk.TextIter e;
                            buf.get_start_iter(out s);
                            buf.get_end_iter(out e);
                            _this.project.runhtml = buf.get_text(s,e,true);
                            
                                  
                            _this.buttonPressed("save");
                             
                            return false;
                                 
                        }
                    },
                    id : "view",
                    pack : "add",
                    init : var description =   Pango.FontDescription.from_string("monospace");
                        description.set_size(9000);
                        this.el.override_font(description);
                }
            ]
        }
    ]
});
ProjectSettings.init();
XObject.cache['/ProjectSettings'] = ProjectSettings;
