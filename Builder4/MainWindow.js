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
    listeners : {
        show : ( ) => {
            // hide the file editing..
            this.leftpane.el.hide();
            this.window_rooview.el.hide();
            this.left_projects.el.show();
         
        },
        delete_event : (   event) => {
            return false;
        }
    },
    border_width : 0,
    default_height : 500,
    default_width : 800,
    destroy : "() => {\n   Gtk.main_quit();\n}",
    id : "MainWindow",
    init : this.el.show_all();,
    type : Gtk.WindowType.TOPLEVEL,
    'void:hideViewEditing' : ( )   {
        var el = _this.rooview.el;
        el.save_easing_state();
       
        // show project / file view..
        _this.mainpane.lastWidth = _this.leftpane.el.get_position();
        _this.mainpane.el.set_position(0);
        // rotate y 180..
        el.set_rotation_angle(Clutter.RotateAxis.Y_AXIS, 360.0f);
        el.set_scale(0.0f,0.0f);
        _this.rooview.is_fullsize = false;
    
       // _this.clutterembed.clutterfiles.show(_this.project);
    
        el.restore_easing_state();
            
        print("show view browsing");
    },
    'void:initChildren' : () {
    
        this.left_tree =new Xcls_WindowLeftTree();
        this.tree.el.pack_start(this.left_tree.el,true, true,0);
    
    
        this.left_props =new Xcls_LeftProps();
        //left_props.ref();
        this.props.el.pack_start(this.left_props.el,true, true,0);
    
    
        // left projects..
        this.left_projects = new Xcls_WindowLeftProjects();
        this.vbox.el.pack_start(this.left_props.el,true, true,0);
       
        
       
        this.window_rooview  =new Xcls_WindowRooView();
        //rv.ref();
        ((Gtk.Container)(w.rooview.el.get_widget())).add(this.rooview.el);
        //rv.el.show_all();
    
        var stage = _this.rooview.get_stage();
        stage.set_background_color(  Clutter.Color.from_string("#000"));
        
        
        this.clutterfiles = new Xcls_ClutterFiles();
        stage.add_child(this.clutterfiles.el);
    
    
    
        this.clutterfiles.open.connect((file) => { 
            _this.showViewEditing();
            print("OPEN : " + file.name);
    
        });
    
    
    
    
        //w.el.show_all();
        var tl = new Clutter.Timeline(6000);
        tl.set_repeat_count(-1);
        tl.start();
        tl.ref();
    
        
    
    
    
    
    },
    'void:setTitle' : (string str) {
        this.el.set_title(this.title + " - " + str);
    },
    'void:show' : () {
        this.left_tree =new Xcls_WindowLeftTree();
        _this.vbox.el.pack_start(this.left_tree.el,true, true,0);
        this.el.show_all();
    
    },
    'void:showViewEditing' : ( )  {
        var el = _this.rooview.el;
            el.save_easing_state();
      
        
            el.set_rotation_angle(Clutter.RotateAxis.Y_AXIS, 0.0f);
            el.set_scale(1.0f,1.0f);
            _this.rooview.is_fullsize = true;
            _this.mainpane.el.set_position(_this.leftpane.lastWidth);
            _this.clutterembed.clutterfiles.el.hide();
        
        el.restore_easing_state();
            
        print("show view editing");
    },
    items : [
        {
            xtype: Gtk.VBox,
            homogeneous : false,
            id : "vbox",
            pack : "add",
            items : [
                {
                    xtype: Gtk.HBox,
                    homogeneous : true,
                    id : "topbar",
                    pack : "pack_start,false,true,0",
                    height_request : 20,
                    vexpand : false
                },
                {
                    xtype: Gtk.HPaned,
                    id : "mainpane",
                    pack : "pack_end,true,true,0",
                    position : 400,
                    items : [
                        {
                            xtype: Gtk.VBox,
                            id : "leftpane",
                            pack : "add1",
                            items : [
                                {
                                    xtype: Gtk.VPaned,
                                    pack : "pack_start,false,true,0",
                                    items : [
                                        {
                                            xtype: Gtk.VBox,
                                            id : "tree",
                                            pack : "add1"
                                        },
                                        {
                                            xtype: Gtk.VBox,
                                            id : "props",
                                            pack : "add2"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: Gtk.VBox,
                            pack : "add2",
                            items : [
                                {
                                    xtype: GtkClutter.Embed,
                                    listeners : {
                                        size_allocate : (  alloc) => {
                                        
                                            _this.rooview.el.set_size(this.el.get_stage().width-50,
                                                    this.el.get_stage().height);
                                            this.clutterfiles.set_size(this.el.get_stage().width-50,
                                                   this.el.get_stage().height);
                                        
                                        }
                                    },
                                    id : "clutterembed",
                                    pack : "add",
                                    init : var stage = this.el.get_stage();
                                        stage.set_background_color(  Clutter.Color.from_string("#000"));,
                                    items : [
                                        {
                                            xtype: GtkClutter.Actor,
                                            id : "rooview",
                                            pack : "get_stage().add_child",
                                            init : {
                                                this.el.add_constraint(
                                                    new Clutter.AlignConstraint(
                                                        _this.clutterembed.el.get_stage(), 
                                                        Clutter.AlignAxis.X_AXIS,
                                                        1.0f
                                                    )
                                                );
                                                    
                                                //this.el.set_position(100,100);
                                                this.el.set_pivot_point(0.5f,0.5f);
                                                
                                                this.el.set_size(_this.clutterembed.el.get_stage().width-50,
                                                        _this.clutterembed.el.get_stage().height);
                                                        
                                            }
                                        },
                                        {
                                            xtype: GtkClutter.Actor,
                                            id : "projectbutton",
                                            pack : "get_stage().add_child",
                                            init : {
                                                
                                                this.el.add_constraint(
                                                    new Clutter.AlignConstraint(
                                                        _this.clutterembed.el.get_stage(), 
                                                        Clutter.AlignAxis.X_AXIS,
                                                        0.0f
                                                    )
                                                );
                                                
                                                //this.el.set_position(100,100);
                                                this.el.set_pivot_point(0.5f,0.5f);
                                                this.el.set_size(50,50);
                                            },
                                            items : [
                                                {
                                                    xtype: Gtk.Button,
                                                    listeners : {
                                                        clicked : ( ) => {
                                                             
                                                            if (_this.is_editing) { 
                                                                _this.showViewBrowsing();
                                                            } else {
                                                                _this.hideViewEditing();
                                                            }
                                                                
                                                        
                                                        }
                                                    },
                                                    label : "P",
                                                    pack : false,
                                                    init : {
                                                        ((Gtk.Container)(_this.projectbutton.el.get_widget())).add(this.el);
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});
MainWindow.init();
XObject.cache['/MainWindow'] = MainWindow;
