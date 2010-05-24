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
DialogNewComponent=new XObject({
    xtype: Gtk.Dialog,
    deletable : false,
    modal : true,
    title : "New Component",
    id : "DialogNewComponent",
    default_width : 500,
    default_height : 200,
    show : function (c) 
            {
                if (!this.el) {
                    this.init();
                }
                c = c || { name : '' , xtype : '' };
                // check whic project we are adding to..
                XObject.extend(this, c);
                // causes problems.. get_screen?? not transfer ownership?
               /// var Window                = imports.Builder.Window.Window;
                //this.el.set_screen(Window.el.get_screen());
                
                //var paths = [];
                //for (var i in this.project.paths) {
                 //   paths.push({
                 //       id : i,
                 //       desc : i
                 //   });
               // }
                 //console.log('load paths');
                 
                // load the paths.
               // this.get('directory_model').loadData(paths);
                    
                
                console.log('show all');
                this.el.show_all();
                this.success = c.success;
                /*
                var tm = this.get('template_model');
                if (tm.templates) {
                    return;
                }
                tm.templates = [];
                var dir = __script_path__ + '/templates/';
                
                var f = Gio.file_new_for_path(dir);
                f.enumerate_children_async ("*",  Gio.FileQueryInfoFlags.NONE, 
                        GLib.PRIORITY_DEFAULT, null, function(o,ar) {
                    // enum completed..
                    var fe = f.enumerate_children_finish(ar);
                    var ch = '';
                    while (ch = fe.next_file(null)) {
                        var add = dir + '/' + ch.get_name();
                        if (!add.match(/\.js$/)) {
                            continue;
                        }
                        tm.templates.push(add);
                        
                    }
                    tm.loadData();
                    
                }, null);
                */
                
            },
    listeners : {
        "delete_event":function (self, event) {
            this.el.hide();
            return true;
        },
        "response":function (self, response_id) {
        	if (response_id < 1) { // cancel!
                    this.el.hide();
                    return;
                }
        
        
                    
                   
            
                if (!this.get('xnsid').el.get_text().length ) {
                    this.get('/StandardErrorDialog').show(
                        "You have to set Project name "
                    );
                     
                    return;
                }
        	var dir ='';
                for (var i in this.project.paths) {
         		dir = i;
        		break;
        	}
        
                var xidns = DialogNewComponent.get('xnsid').el.get_text();
                
                // what about .js ?
                 if (GLib.file_test (GLib.dir + '/' + xidns + '.bjs', GLib.FileTest.EXISTS)) {
                    StandardErrorDialog.show(
                        "That file already exists"
                    ); 
                    return;
                }
                this.el.hide();
                
                
                //var tmpl = this.project.loadFileOnly(DialogNewComponent.get('template').getValue());
                
                var _this = this;
                var nf = _this.project.create(dir + '/' + xidns + '.bjs');
                if (this.get('/DialogNewComponent').success) {
                    this.get('/DialogNewComponent').success(_this.project, nf);
                }
        },
        "show":function (self) {
          this.el.show_all();
        }
    },
    items : [
        {
            xtype: Gtk.VBox,
            pack : function(p,e) {
                                p.el.get_content_area().add(e.el)
                            },
            items : [
                {
                    xtype: Gtk.HBox,
                    pack : "pack_start,false,true,0",
                    items : [
                        {
                            xtype: Gtk.Label,
                            pack : "pack_start,false,true,0",
                            label : "Component Name",
                            xpad : 10
                        },
                        {
                            xtype: Gtk.Entry,
                            pack : "pack_end,true,true,0",
                            id : "xnsid"
                        }
                    ]
                }
            ]
        },
        {
            xtype: Gtk.Button,
            pack : "add_action_widget,0",
            label : "Cancel"
        },
        {
            xtype: Gtk.Button,
            pack : "add_action_widget,1",
            label : "OK"
        }
    ]
})
;DialogNewComponent.init();
XObject.cache['/DialogNewComponent'] = DialogNewComponent;
;