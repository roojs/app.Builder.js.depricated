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
RooProjectProperties=new XObject({
    xtype: Gtk.Dialog,
    listeners : {
        delete_event : (self, event) => {
            this.el.hide();
             return true;
        },
        response : (self, response_id)  => {
           //print(response_id);
           if (response_id< 1 ) {
              this.el.hide();
            
              return;
           }
           
           var buf =    view.el.get_buffer();
           Gtk.TextIter s;
             Gtk.TextIter e;
            buf.get_start_iter(out s);
            buf.get_end_iter(out e);
            var str = buf.get_text(s,e,true);
            // ideally we should syntax check it.. but it's html!?
            
           //var project = this.get('/Window.LeftTree').getActiveFile().project;
           
           
           _this.project.runhtml = str;
           _this.project.save();
           
          // imports.Builder.Provider.ProjectManager.ProjectManager.saveConfig();
        //   print (str);
           //    this.get('view').el.get_buffer().get_text(project.runjs, project.runjs.length);
           // ok pressed..
           this.el.hide();
        }
    },
    default_width : 500,
    modal : true,
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
            xtype: Gtk.VBox,
            border_width : 5,
            pack : get_content_area().add,
            items : [
                {
                    xtype: Gtk.Label,
                    pack : "pack_start,false,false,0",
                    label : "HTML To insert at end of <HEAD>"
                },
                {
                    xtype: Gtk.ScrolledWindow,
                    pack : "pack_end,true,true,0",
                    items : [
                        {
                            xtype: GtkSource.View,
                            pack : "add",
                            id : "view"
                        }
                    ]
                }
            ]
        },
        {
            xtype: Gtk.Button,
            pack : "add_action_widget,1",
            label : "OK"
        },
        {
            xtype: Gtk.Button,
            pack : "add_action_widget,0",
            label : "Cancel"
        }
    ]
});
RooProjectProperties.init();
XObject.cache['/RooProjectProperties'] = RooProjectProperties;
