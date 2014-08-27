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
EditProject=new XObject({
    xtype: Gtk.Dialog,
    listeners : {
        destroy_event : (self, event) => {
             this.el.hide();
            return false;
        }
    },
    border_width : 3,
    default_height : 500,
    default_width : 600,
    name : "EditProject",
    title : "Project Properties",
    'Project.Project?:show' : () {
          
    
        //[ 'xtype'  ].forEach(function(k) {
        //    _this.get(k).setValue(typeof(c[k]) == 'undefined' ? '' : c[k]);
        //});
    	// shouild set path..
        _this.model.loadData();
        this.el.show_all();
        var id =  this.el.run();
        this.el.hide();
        
         if (id < 1) {
                this.el.hide();
                return null;
        }
        if (_this.xtype.getValue().length < 1) {
            StandardErrorDialog.singleton().show("You have to set Project type");             
            return null;
        }
        if (_this.dir.el.get_filename().length < 1) {
            StandardErrorDialog.singleton().show("You have to select a folder");             
            return null;
        }
     
        var fn = _this.dir.el.get_filename();
        
        var project = Project.Project.factory(_this.xtype.getValue(), fn);
        
        
        //var pr = imports.Builder.Provider.ProjectManager.ProjectManager.update(this.project);
        
        return project;
    
        
        //this.success = c.success;
    },
    deletable : true,
    modal : true,
    items : [
        {
            xtype: Gtk.VBox,
            homogeneous : false,
            pack : get_content_area().add,
            items : [
                {
                    xtype: Gtk.HBox,
                    pack : "pack_start,false,true,3",
                    items : [
                        {
                            xtype: Gtk.Label,
                            pack : "pack_start,false,true,3",
                            label : "Project type :"
                        },
                        {
                            xtype: Gtk.ComboBox,
                            id : "xtype",
                            pack : "pack_end,true,true,3",
                            init : this.el.add_attribute(_this.cellrender.el , "markup", 1 );,
                            setValue : (v)    {
                                    var el = this.el;
                                    el.set_active(-1);
                                    
                                    for (var i =0;i < this.data.length; i++ ) {
                                        if (v == this.data.nth_datA(i)) {
                                            el.set_active(ix);
                                            return false;
                                        }
                                    }
                                },
                            'string:getValue' : () {
                                 var ix = this.el.get_active();
                                    if (ix < 0 ) {
                                        return "";
                                    }
                                    switch(ix) {
                                        case 0:
                                            return "Roo";
                                        case 1:
                                            return "Gtk";
                                    }
                                    return "";
                            },
                            items : [
                                {
                                    xtype: Gtk.CellRendererText,
                                    id : "cellrender",
                                    pack : "pack_start,true"
                                },
                                {
                                    xtype: Gtk.ListStore,
                                    columns : typeof(string),typeof(string),
                                    id : "model",
                                    n_columns : 2,
                                    pack : "set_model",
                                    'void:loadData' : ( ) {
                                            this.el.clear();
                                                          
                                            Gtk.TreeIter iter;
                                                    
                                            el.append(out iter);
                                            
                                            el.set_value(iter, 0, "Roo");
                                            el.set_value(iter, 1, "Roo Project");
                                             el.append(out iter);
                                            
                                            el.set_value(iter, 0, "Gtk");
                                            el.set_value(iter, 1, "Gtk Project");
                                             
                                                  
                                                                         
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: Gtk.FileChooserWidget,
                    pack : "pack_end,true,true,5",
                    action : Gtk.FileChooserAction.SELECT_FOLDER,
                    id : "dir",
                    select_multiple : false
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
EditProject.init();
XObject.cache['/EditProject'] = EditProject;
