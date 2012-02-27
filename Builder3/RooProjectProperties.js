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
    modal : true,
    show : function() {
        // get the active project.
        var file = this.get('/Window.LeftTree').getActiveFile();
        if (!file) {
            this.get('/StandardErrorDialog').show("No file is currently active");
            return;
        }
        var project = this.get('/Window.LeftTree').getActiveFile().project;
        //print (project.fn);
        project.runhtml = project.runhtml || '';
        this.get('view').el.get_buffer().set_text(project.runhtml, project.runhtml.length);
        this.get('dbcon').el.set_text(project.dbcon || '');
        print("project db: " + project.dbcon);
        this.el.show_all();
    },
    default_width : 500,
    listeners : {
        delete_event : function (self, event) {
            this.el.hide()
            return true;
        },
        response : function (self, response_id) {
           print(response_id);
           if (!response_id) {
              this.el.hide();
            
              return;
           }
           var buf =    this.get('view').el.get_buffer()
           
            var e = {};
            var s = {};                             
            buf.get_start_iter(s);
            buf.get_end_iter(e);
            
            var str = buf.get_text(s.iter,e.iter,false);
            //print(str);
            // ideally we should syntax check it.. but it's html!?
            
           var project = this.get('/Window.LeftTree').getActiveFile().project;
           
           
           project.runhtml = str;
           
           project.dbcon = this.get('dbcon').el.get_text();
           
           
           imports.ProjectManager.ProjectManager.saveConfig();
        //   print (str);
           //    this.get('view').el.get_buffer().get_text(project.runjs, project.runjs.length);
           // ok pressed..
           this.el.hide();
        }
    },
    items : [
        {
            xtype: Gtk.VBox,
            pack : function(p,e) {
                        p.el.get_content_area().add(e.el);
                        e.border_width  =5;
                    },
            items : [
                {
                    xtype: Gtk.HBox,
                    pack : "pack_start,false,true,3",
                    items : [
                                
                        
                       {
                           xtype: Gtk.Label,
                           pack : "pack_start,false,false,0",
                           label : "Database Name"
                       },
                       {
                            xtype: Gtk.Entry,
                            id : "dbcon",
                            pack : "add",
                            visible : true
                        },
                    ]
                },
        
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
