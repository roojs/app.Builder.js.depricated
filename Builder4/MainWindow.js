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
           
            this.hideViewEditing();
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
    'void:showProjectEdit' : () {
        // make the browser smaller, and show the edit dialog
    },
    init : //this.el.show_all();,
    type : Gtk.WindowType.TOPLEVEL,
    'void:hideViewEditing' : ( )   {
        
         this.window_rooview.createThumb();
         
         this.editpane.el.hide();
        //this.rooview.el.hide();
         this.left_projects.el.show();
        
        var el = _this.rooview.el;
        el.save_easing_state();
       
        // show project / file view..
        //_this.mainpane.lastWidth = _this.leftpane.el.get_position();
        //_this.mainpane.el.set_position(0);
        // rotate y 180..
        el.set_rotation_angle(Clutter.RotateAxis.Y_AXIS, 360.0f);
        el.set_scale(0.0f,0.0f);
        _this.is_editing = false;
    
        _this.left_projects.selectProject(_this.project);
        //_this.clutterfiles.loadProject(_this.project);
    
        el.restore_easing_state();
            
        print("show view browsing");
    },
    'void:initChildren' : () {
        // this needs putting in a better place..
        
        print("init children");
        this.left_tree =new Xcls_WindowLeftTree();
        this.left_tree.ref();
        this.tree.el.pack_start(this.left_tree.el,true, true,0);
    
    
        this.left_props =new Xcls_LeftProps();
        this.left_props.ref();
        this.props.el.pack_start(this.left_props.el,true, true,0);
    
    
        // left projects..
         this.left_projects = new Xcls_WindowLeftProjects();
         this.left_projects.ref();
        this.leftpane.el.pack_start(this.left_projects.el,true, true,0);
       
        
       
        this.window_rooview  =new Xcls_WindowRooView();
        this.window_rooview.ref();
        ((Gtk.Container)(this.rooview.el.get_widget())).add(this.window_rooview.el);
        this.window_rooview.el.show_all();
    
        var stage = _this.rooview.el.get_stage();
        stage.set_background_color(  Clutter.Color.from_string("#000"));
        
        this.clutterfiles = new Xcls_ClutterFiles();
        this.clutterfiles.ref();
        stage.add_child(this.clutterfiles.el);
        this.clutterfiles.el.show_all();
    
    
        this.clutterfiles.open.connect((file) => { 
            _this.project = file.project;
            _this.showViewEditing();
            this.left_tree.model.loadFile(file);
            
            this.window_rooview.loadFile(file);
            print("OPEN : " + file.name);
    
        });
    
        this.left_projects.project_selected.connect((proj) => {
            proj.scanDirs();
            _this.clutterfiles.loadProject(proj);
        
        });
    
    
    
    
    
        //w.el.show_all();
        var tl = new Clutter.Timeline(6000);
        tl.set_repeat_count(-1);
        tl.start();
        tl.ref();
    
        this.children_loaded = true;
    
    
    
    
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
         this.editpane.el.show();
      //   this.rooview.el.show();
         this.left_projects.el.hide();
        
          
        
        var el = _this.rooview.el;
            el.save_easing_state();
      
        
            el.set_rotation_angle(Clutter.RotateAxis.Y_AXIS, 0.0f);
            el.set_scale(1.0f,1.0f);
            _this.is_editing = true;
           // _this.mainpane.el.set_position(_this.leftpane.lastWidth);
            _this.clutterfiles.el.hide();
        
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
                                    id : "editpane",
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
                                            //if (!_this.children_loaded) {  return; }
                                            print("size_allocation %d,%d\n".printf(alloc.width, alloc.height));
                                        
                                        /*    _this.rooview.el.set_size(this.el.get_stage().width-50,
                                                    this.el.get_stage().height);
                                            _this.clutterfiles.set_size(this.el.get_stage().width-50,
                                                   this.el.get_stage().height);
                                        */
                                           // this.el.set_size_request(alloc.width,alloc.height);
                                           // this.el.get_stage().set_size(alloc.width,alloc.height);
                                            _this.rooview.el.set_size(alloc.width-50,
                                                    alloc.height);
                                            _this.clutterfiles.set_size(alloc.width-50,
                                                   alloc.height);
                                        }
                                    },
                                    id : "clutterembed",
                                    pack : "pack_start,true,true,0",
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
                                            xtype: Clutter.Actor,
                                            id : "buttonlayout",
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
                                                 this.el.set_size(50,
                                                       _this.clutterembed.el.get_stage().height);
                                                 
                                            },
                                            items : [
                                                {
                                                    xtype: Clutter.Actor,
                                                    listeners : {
                                                        enter_event : (  event)  => {
                                                            this.el.background_color = new Clutter.Color.from_string("#333");
                                                                return false;
                                                        },
                                                        leave_event : (  event)  => {
                                                            this.el.background_color = new Clutter.Color.from_string("#000");
                                                            return false;
                                                        }
                                                    },
                                                    id : "projectbutton",
                                                    pack : false,
                                                    init : this.el.set_size(50,50);,
                                                    reactive : true,
                                                    items : [
                                                        {
                                                            xtype: Clutter.Text,
                                                            pack : "add_child",
                                                            y_expand : true,
                                                            x_align : Clutter.ActorAlign.START,
                                                            x_expand : true,
                                                            y_align : Clutter.ActorAlign.CENTER
                                                        }
                                                    ]
                                                }
                                            ],
                                            layout_manager : {
                                                xtype: Clutter.BoxLayout,
                                                orientation : Clutter.Orientation.VERTICAL
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
                                                // height 10%
                                                 this.el.add_constraint(
                                                    new Clutter.BindConstraint(
                                                        _this.clutterembed.el.get_stage(), 
                                                        Clutter.BindCoordinate.HEIGHT,
                                                        0.1f
                                                    )
                                                );    
                                                //this.el.set_position(100,100);
                                                //this.el.set_pivot_point(0.5f,0.5f);
                                                 this.el.set_width(50);
                                                //this.el.set_position(100,100);
                                                this.el.set_pivot_point(0.5f,0.5f);
                                              //  this.el.set_size(50,
                                              ///          _this.clutterembed.el.get_stage().height * 0.1f);
                                                 
                                               //  this.el.set_size(50,50);
                                            },
                                            items : [
                                                {
                                                    xtype: Gtk.Button,
                                                    listeners : {
                                                        clicked : ( ) => {
                                                             
                                                            if (_this.is_editing) { 
                                                                _this.hideViewEditing();
                                                            } else {
                                                                _this.showViewEditing();
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
                                                // height 10%
                                                 this.el.add_constraint(
                                                    new Clutter.BindConstraint(
                                                        _this.clutterembed.el.get_stage(), 
                                                        Clutter.BindCoordinate.HEIGHT,
                                                        0.1f
                                                    )
                                                );    
                                                //this.el.set_position(100,100);
                                                //this.el.set_pivot_point(0.5f,0.5f);
                                                 this.el.set_width(50);
                                                //this.el.set_position(100,100);
                                                this.el.set_pivot_point(0.5f,0.5f);
                                              //  this.el.set_size(50,
                                              ///          _this.clutterembed.el.get_stage().height * 0.1f);
                                                 
                                               //  this.el.set_size(50,50);
                                            },
                                            items : [
                                                {
                                                    xtype: Gtk.Button,
                                                    listeners : {
                                                        clicked : ( ) => {
                                                             
                                                            if (_this.is_editing) { 
                                                                _this.hideViewEditing();
                                                            } else {
                                                                _this.showViewEditing();
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
                                        },
                                        {
                                            xtype: GtkClutter.Actor,
                                            id : "projecteditbutton",
                                            pack : "get_stage().add_child",
                                            init : {
                                                
                                                this.el.add_constraint(
                                                    new Clutter.AlignConstraint(
                                                        _this.clutterembed.el.get_stage(), 
                                                        Clutter.AlignAxis.X_AXIS,
                                                        0.0f
                                                    )
                                                );
                                                // top 10%
                                                this.el.add_constraint(
                                                    new Clutter.BindConstraint(
                                                        _this.clutterembed.el.get_stage(), 
                                                        Clutter.BindCoordinate.Y,
                                                        0.1f
                                                    )
                                                );    
                                                // height 10%
                                                 this.el.add_constraint(
                                                    new Clutter.BindConstraint(
                                                        _this.clutterembed.el.get_stage(), 
                                                        Clutter.BindCoordinate.HEIGHT,
                                                        0.1f
                                                    )
                                                );    
                                                //this.el.set_position(100,100);
                                                //this.el.set_pivot_point(0.5f,0.5f);
                                                 this.el.set_width(50);
                                                 
                                                 
                                                
                                            },
                                            items : [
                                                {
                                                    xtype: Gtk.Button,
                                                    listeners : {
                                                        clicked : ( ) => {
                                                             _this.showProjectEdit();
                                                                
                                                        
                                                        }
                                                    },
                                                    label : "PE",
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
