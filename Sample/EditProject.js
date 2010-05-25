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
    default_height : 500,
    default_width : 600,
    deletable : true,
    modal : true,
    border_width : 3,
    title : "Project Properties",
    show : function(c) {
           c = c || { name : '' , xtype : '' };
        this.project  = c;
        if (!this.el) {
            this.init();
        }
        var _this = this;
        [ 'xtype'  ].forEach(function(k) {
            _this.get(k).setValue(typeof(c[k]) == 'undefined' ? '' : c[k]);
        });
    	// shouild set path..
        
        this.el.show_all();
        this.success = c.success;
    },
    listeners : {
        "destroy_event":function (self, event) {
             this.el.hide();
                        return false;
        },
        "response":function (self, id) {
         if (id < 1) {
                    this.el.hide();
                    return;
                }
                if (!this.get('xtype').getValue().length) {
                    this.get('/StandardErrorDialog').show("You have to set Project type");             
                    return;
                }
                if (!this.get('dir').el.get_filename().length) {
                    this.get('/StandardErrorDialog').show("You have to select a folder");             
                    return;
                }
        
                this.el.hide();
                
                
                var fn = this.get('dir').el.get_filename();
                
                this.project.name  = GLib.basename(fn);
                this.project.xtype  = this.get('xtype').getValue();
                this.project.paths = {  fn :  'dir' };
                
                var pr = imports.Builder.Provider.ProjectManager.ProjectManager.update(this.project);
                
                this.success(pr);
                Seed.print(id);
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
                    pack : "pack_start,false,true,3",
                    items : [
                        {
                            xtype: Gtk.Label,
                            pack : "pack_start,false,true,3",
                            label : "Project type :"
                        },
                        {
                            xtype: Gtk.ComboBox,
                            pack : "pack_end,true,true,3",
                            id : "xtype",
                            setValue : function(v)
                                            {
                                                var el = this.el;
                                                el.set_active(-1);
                                                this.get('model').data.forEach(function(n, ix) {
                                                    if (v == n.xtype) {
                                                        el.set_active(ix);
                                                        return false;
                                                    }
                                                });
                                            },
                            getValue : function() {
                                 var ix = this.el.get_active();
                                        if (ix < 0 ) {
                                            return '';
                                        }
                                        return this.get('model').data[ix].xtype;
                            },
                            init : function() {
                                XObject.prototype.init.call(this);
                              this.el.add_attribute(this.items[0].el , 'markup', 1 );  
                            },
                            items : [
                                {
                                    xtype: Gtk.CellRendererText,
                                    pack : "pack_start"
                                },
                                {
                                    xtype: Gtk.ListStore,
                                    pack : "set_model",
                                    init : function() {
                                        XObject.prototype.init.call(this);
                                    
                                                                this.el.set_column_types ( 2, [
                                                                    GObject.TYPE_STRING,  // real key
                                                                    GObject.TYPE_STRING // real type
                                                                    
                                                                    
                                                                ] );
                                                                
                                                                this.data = [
                                                                    { xtype: 'Roo', desc : "Roo Project" },
                                                                    { xtype: 'Gtk', desc : "Gtk Project" },    
                                                                    //{ xtype: 'JS', desc : "Javascript Class" }
                                                                ]
                                                                
                                                                this.loadData(this.data);
                                                                    
                                    },
                                    loadData : function (data) {
                                                                                
                                                var iter = new Gtk.TreeIter();
                                                var el = this.el;
                                                data.forEach(function(p) {
                                                    
                                                    el.append(iter);
                                                    
                                                     
                                                    el.set_value(iter, 0, p.xtype);
                                                    el.set_value(iter, 1, p.desc);
                                                    
                                                });
                                                  
                                                                         
                                    },
                                    id : "model"
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
