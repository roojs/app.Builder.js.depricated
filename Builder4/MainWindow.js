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
           
            //this.hideViewEditing();
        },
        delete_event : (   event) => {
            return false;
        },
        destroy : () =>  {
         Gtk.main_quit();
        }
    },
    border_width : 0,
    default_height : 500,
    default_width : 800,
    id : "MainWindow",
    init : this.state = "files";
    	  
        //this.el.show_all();,
    type : Gtk.WindowType.TOPLEVEL,
    'void:hideAddListener' : () {
         _this.addpropsview.el.save_easing_state();
        var el = _this.rooview.el;
        el.save_easing_state();
    
        
        el.set_scale(1.0f,1.0f);
        _this.addpropsview.el.set_scale(0.0f,0.0f);
        _this.state = "edit";
    
     
        //_this.clutterfiles.loadProject(_this.project);
    
        el.restore_easing_state();
         _this.addpropsview.el.restore_easing_state();  
      },
    'void:hideAddProp' : () {
         _this.addpropsview.el.save_easing_state();
        var el = _this.rooview.el;
        el.save_easing_state();
    
        
        el.set_scale(1.0f,1.0f);
        _this.addpropsview.el.set_scale(0.0f,0.0f);
        _this.state = "edit";
    
     
        //_this.clutterfiles.loadProject(_this.project);
    
        el.restore_easing_state();
         _this.addpropsview.el.restore_easing_state();  
     },
    'void:hideCodeEdit' : () {
        //this.code_editor.saveContents();
       
         _this.codeeditview.el.save_easing_state();
        var el = _this.rooview.el;
        el.save_easing_state();
    
        
        el.set_scale(1.0f,1.0f);
        _this.codeeditview.el.set_scale(0.0f,0.0f);
        _this.state = "edit";
    
     
        //_this.clutterfiles.loadProject(_this.project);
    
        el.restore_easing_state();
         _this.codeeditview.el.restore_easing_state();  
     },
    'void:hideObject' : () {
          // return to editing state..
           
         
    
    
         
         _this.objectview.el.save_easing_state();
        var el = _this.rooview.el;
        el.save_easing_state();
    
        
        el.set_scale(1.0f,1.0f);
        _this.objectview.el.set_scale(0.0f,0.0f);
        _this.state = "edit";
    
     
        //_this.clutterfiles.loadProject(_this.project);
    
        el.restore_easing_state();
         _this.objectview.el.restore_easing_state();  
     
    
    },
    'void:hideProjectEdit' : () {
        // return to editing state..
           
          _this.projectbutton.el.show();
         _this.projecteditbutton.el.show();
    
         
         
        //this.rooview.el.hide();
         //this.edit_project.el.show();
            _this.projecteditview.el.save_easing_state();
        var el = _this.rooview.el;
        el.save_easing_state();
    
        
        el.set_scale(1.0f,1.0f);
           _this.projecteditview.el.set_scale(1.0f,0.0f);
        _this.state = "edit";
    
     
        //_this.clutterfiles.loadProject(_this.project);
    
        el.restore_easing_state();
          _this.projecteditview.el.restore_easing_state();  
      
    },
    'void:hideViewEditing' : ( )   {
      
        if (this.left_tree.getActiveFile() != null) {
             if (this.left_tree.getActiveFile().xtype == "Roo" ) {
                 this.window_rooview.createThumb();
             } else {
                  this.window_gladeview.createThumb();
              }
          }
          
        _this.addprojectbutton.el.show();   
        _this.addfilebutton.el.show();       
       
          
          _this.projecteditbutton.el.hide();
          _this.objectshowbutton.el.hide();
          _this.addpropbutton.el.hide();      
          _this.addlistenerbutton.el.hide();            
        // show the add file button..
        
              
          
         this.editpane.el.hide();
        //this.rooview.el.hide();
         this.left_projects.el.show();
        
        var el = _this.rooview.el;
        el.save_easing_state();
          el.set_easing_duration(1000);
        // show project / file view..
        //_this.mainpane.lastWidth = _this.leftpane.el.get_position();
        //_this.mainpane.el.set_position(0);
        // rotate y 180..
        el.set_rotation_angle(Clutter.RotateAxis.Y_AXIS, 360.0f);
        el.set_scale(0.0f,0.0f);
       
            _this.state = "files";
    
        _this.left_projects.selectProject(_this.project);
        //_this.clutterfiles.loadProject(_this.project);
    
        el.restore_easing_state();
            
        print("show view browsing");
    },
    'void:initChildren' : () {
        // this needs putting in a better place..
        
        print("init children");
        this.left_tree = new Xcls_WindowLeftTree();
        this.left_tree.ref();
        this.tree.el.pack_start(this.left_tree.el,true, true,0);
        this.left_tree.el.show_all();
       
        this.left_tree.before_node_change.connect(() => {
            if (this.state != "codeedit") {
                this.left_props.finish_editing();
                return true;
            }
            if (!this.code_editor.saveContents()) {
                return false;
            }
            return false;
        
        });
        
        this.left_tree.node_selected.connect((sel) => {
            
            print("node_selected called %s\n", (sel == null) ? "NULL" : "a value");
            
            if (sel == null) {
                this.left_props.el.hide();
            } 
            this.left_props.el.show();
            this.left_props.load(this.left_tree.getActiveFile(), sel);
            switch (this.state) {
                case "object": 
                      
                     if (sel == null) {
                        this.rightpalete.clear();
                        break;
                    }
                    this.rightpalete.load(_this.left_tree.getActiveFile().palete(), sel.fqn());
                    break;
                     
                    
               case "addprop":
                    if (sel == null) {
                        this.add_props.clear();
                        break;
                    }
                    this.add_props.show(_this.left_tree.getActiveFile().palete(), "props", sel.fqn());
                    break;
                    
               case "addlistener":
                    if (sel == null) {
                        this.add_props.clear();
                        break;
                    }
                    this.add_props.show(_this.left_tree.getActiveFile().palete(), "signals", sel.fqn());
                    break;
    
               case "codeedit":
                   
                    this.hideCodeEdit();
                    break;
                   
                                    
            }
            return  ;
              
        });
        
         this.left_tree.changed.connect(() => {
           this.window_rooview.requestRedraw();
        });
         
        
    
        // left properties
    
        this.left_props =new Xcls_LeftProps();
        this.left_props.ref();
        this.props.el.pack_start(this.left_props.el,true, true,0);
        this.left_props.el.show_all();
        
        this.left_props.show_editor.connect( (file, node, type,  key) => {
            this.showCodeEdit(node, type,  key);
        });
        this.left_props.stop_editor.connect( () => {
            if (this.state != "codeedit") {
                return true;
            }
        
            var ret =  this.code_editor.saveContents();
            if (!ret) {
                return false;
            }
            this.hideCodeEdit();
            return ret;
        });
         this.left_props.changed.connect(() => {
              if (this.left_tree.getActiveFile().xtype == "Roo" ) {
                   this.window_rooview.requestRedraw();
               } else {
                  this.window_gladeview.loadFile(this.left_tree.getActiveFile());
              }
        });
        
    
    
    
        // left projects..
         this.left_projects = new Xcls_WindowLeftProjects();
         this.left_projects.ref();
         this.leftpane.el.pack_start(this.left_projects.el,true, true,0);
         this.left_projects.el.show_all();
         this.left_projects.project_selected.connect((proj) => {
            proj.scanDirs();
            _this.clutterfiles.loadProject(proj);
        
         });
        
       
        // project edit..
        this.projectsettings  =new Xcls_ProjectSettings();
        this.projectsettings.ref();  /// really?
        ((Gtk.Container)(this.projecteditview.el.get_widget())).add(this.projectsettings.el);
        //this.projectsettings.el.show_all();
    
        var stage = _this.projecteditview.el.get_stage();
        stage.set_background_color(  Clutter.Color.from_string("#000"));
        
         this.projectsettings.buttonPressed.connect((btn) => {
             if (this.left_tree.getActiveFile().xtype == "Roo" ) {
             
                if (btn == "save") {
                     _this.window_rooview.view.renderJS(true);
                }
                if (btn == "apply") {
                    _this.window_rooview.view.renderJS(true);
                    return;
                }
            } else {
                // do nothing for gtk..
            }
            this.hideProjectEdit();
             
         });
        
        
        // objects (palate..)
        this.rightpalete  = new Xcls_RightPalete();
        this.rightpalete.ref();  /// really?
        ((Gtk.Container)(this.objectview.el.get_widget())).add(this.rightpalete.el);
        //this.projectsettings.el.show_all();
    
        stage = _this.objectview.el.get_stage();
        stage.set_background_color(  Clutter.Color.from_string("#000"));
        
        /*this.projectsettings.buttonPressed.connect((btn) => {
            if (btn == "save") {
                 _this.window_rooview.view.renderJS(true);
            }
            if (btn == "apply") {
                _this.window_rooview.view.renderJS(true);
                return;
            }
            this.hideProjectEdit();
             
         });
        */
        
        
          
        // Add properties
        this.add_props  = new Xcls_WindowAddProp();
        this.add_props.ref();  /// really?
        ((Gtk.Container)(this.addpropsview.el.get_widget())).add(this.add_props.el);
        //this.projectsettings.el.show_all();
    
        stage = _this.addpropsview.el.get_stage();
        stage.set_background_color(  Clutter.Color.from_string("#000"));
        
        
        _this.add_props.select.connect( (key,type,skel, etype) => {
            this.left_props.addProp(etype, key, skel, type);
        });
        
        // editor
        
        
        this.code_editor  = new Xcls_Editor();
        this.code_editor.ref();  /// really?
        ((Gtk.Container)(this.codeeditview.el.get_widget())).add(this.code_editor.el);
        //this.projectsettings.el.show_all();
    
        stage = _this.codeeditview.el.get_stage();
        stage.set_background_color(  Clutter.Color.from_string("#000"));
        // editor.save...
    
        
        
         
        
        
        //  roo view
        
         this.window_rooview  =new Xcls_WindowRooView();
        this.window_rooview.ref();
        ((Gtk.Container)(this.rooview.el.get_widget())).add(this.window_rooview.el);
        this.window_rooview.el.show_all();
    
        stage = _this.rooview.el.get_stage();
        stage.set_background_color(  Clutter.Color.from_string("#000"));
        
          
        //  glade view
        
        this.window_gladeview  =new Xcls_GladeView();
        this.window_gladeview.ref();
    
        //((Gtk.Container)(this.rooview.el.get_widget())).add(this.window_gladeview.el);
        ///this.window_gladeview.el.hide();
    
       
        
        // clutter files
        
        
        this.clutterfiles = new Xcls_ClutterFiles();
        this.clutterfiles.ref();
        stage.add_child(this.clutterfiles.el);
        this.clutterfiles.el.show_all();
    
    
        this.clutterfiles.open.connect((file) => { 
            _this.project = file.project;
            _this.showViewEditing();
            this.left_tree.model.loadFile(file);
            var ctr= ((Gtk.Container)(this.rooview.el.get_widget()));
            if (file.xtype == "Roo" ) { 
                ctr.foreach( (w) => { ctr.remove(w); });
                ctr.add(this.window_rooview.el);
                this.window_rooview.loadFile(file);
                
                this.window_rooview.el.show_all();
            } else {
                ctr.foreach( (w) => { ctr.remove(w); });
                ctr.add(this.window_gladeview.el);
                this.window_gladeview.loadFile(file);
                this.window_gladeview.el.show_all();
            }
            print("OPEN : " + file.name);
    
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
    'void:showAddListener' : () {
    
         
         
        var ae =      this.left_tree.getActiveElement();
        if (ae == null) {
            return;
        }
         
        //this.rooview.el.hide();
        this.add_props.el.show_all();
        this.add_props.show(
            Palete.factory(this.project.xtype), 
            "signals",
            ae.fqn()
        );
        //this.rightpalete.show(this.project);
    
        _this.addpropsview.el.save_easing_state();
            
        var el = _this.rooview.el;
        el.save_easing_state();
       
        
        el.set_scale(0.5f,0.5f);
    
        _this.addpropsview.el.set_scale(1.0f,1.0f);
       
       
     
        //_this.clutterfiles.loadProject(_this.project);
    
        el.restore_easing_state();
        _this.addpropsview.el.restore_easing_state();
        this.state = "addlistener";
    },
    'void:showAddProp' : () {
    
         
         var ae =      this.left_tree.getActiveElement();
        if (ae == null) {
            return;
        }
         
         
         
         
        //this.rooview.el.hide();
        this.add_props.el.show_all();
        this.add_props.show(
            Palete.factory(this.project.xtype), 
            "props",
            ae.fqn()
        );
    
        _this.addpropsview.el.save_easing_state();
            
        var el = _this.rooview.el;
        el.save_easing_state();
       
        
        el.set_scale(0.5f,0.5f);
    
        _this.addpropsview.el.set_scale(1.0f,1.0f);
       
       
     
        //_this.clutterfiles.loadProject(_this.project);
    
        el.restore_easing_state();
        _this.addpropsview.el.restore_easing_state();
        this.state = "addprop";
    },
    'void:showCodeEdit' : (JsRender.Node node, string ptype, string key)
    {
        // this is a bit different,
        // it's not called via a button - but triggered by the prop edit class signal.
        // so it has to hide any other state..
        
        switch(this.state) {
            case "object":
                this.hideObject();
                break;
            case "addprop":
                this.hideAddProp();
                break;
            case "addlistener":
                this.hideAddListener();
                break;
        }
     
     
         
         
        //this.rooview.el.hide();
        this.code_editor.el.show_all();
        this.code_editor.show(
            node,
            ptype,
            key
        );
    
        _this.codeeditview.el.save_easing_state();
            
        var el = _this.rooview.el;
        el.save_easing_state();
       
        
        el.set_scale(0.5f,0.5f);
    
        _this.codeeditview.el.set_scale(1.0f,1.0f);
       
       
     
        //_this.clutterfiles.loadProject(_this.project);
    
        el.restore_easing_state();
        _this.codeeditview.el.restore_easing_state();
        this.state = "codeedit";
    },
    'void:showObject' : () {
    
         
        // what's the active node on the left hand side..
        
        var n = _this.left_tree.getActiveElement();
        if (n == null) {
            return;
        }
        
         
         
         
        //this.rooview.el.hide();
        this.rightpalete.el.show_all();
        this.rightpalete.load(_this.left_tree.getActiveFile().palete(), n.fqn());
    
        
        //this.rightpalete.show(this.project);
    
        _this.objectview.el.save_easing_state();
            
        var el = _this.rooview.el;
        el.save_easing_state();
       
        
        el.set_scale(0.5f,0.5f);
    
        _this.objectview.el.set_scale(1.0f,1.0f);
       
       
     
        //_this.clutterfiles.loadProject(_this.project);
    
        el.restore_easing_state();
        _this.objectview.el.restore_easing_state();
        this.state = "object";
    },
    'void:showProjectEdit' : () {
        // make the browser smaller, and show the edit dialog
        
        
         _this.projectbutton.el.hide();
         _this.projecteditbutton.el.hide();
         
         
        //this.rooview.el.hide();
        this.projectsettings.el.show_all();
        this.projectsettings.show(this.project);
        _this.projecteditview.el.save_easing_state();
            
        var el = _this.rooview.el;
        el.save_easing_state();
       
        
        el.set_scale(0.5f,0.5f);
    
        _this.projecteditview.el.set_scale(1.0f,1.0f);
       
        _this.state = "projectedit";
         
     
        //_this.clutterfiles.loadProject(_this.project);
    
        el.restore_easing_state();
        _this.projecteditview.el.restore_easing_state();
      //  print("show view browsing");
        
    },
    'void:showViewEditing' : ( )  {
         this.editpane.el.show();
      //   this.rooview.el.show();
         this.left_projects.el.hide();
        
        _this.addprojectbutton.el.hide();   
        _this.addfilebutton.el.hide();       
        
       _this.projecteditbutton.el.show();
      _this.objectshowbutton.el.show();
      _this.addpropbutton.el.show();      
      _this.addlistenerbutton.el.show();   
      
          
        var el = _this.rooview.el;
            el.save_easing_state();
      
        
            el.set_rotation_angle(Clutter.RotateAxis.Y_AXIS, 0.0f);
            el.set_scale(1.0f,1.0f);
            _this.state = "edit";
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
                                            if (!_this.children_loaded) {  return; }
                                            //print("size_allocation %d,%d\n".printf(alloc.width, alloc.height));
                                        
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
                                            _this.projecteditview.el.set_size(alloc.width-50,
                                                   alloc.height / 2.0f);
                                                   
                                            _this.objectview.el.set_size((alloc.width -50)/2.0f,
                                                   alloc.height);
                                                   
                                            _this.addpropsview.el.set_size((alloc.width -50)/2.0f,
                                                   alloc.height);
                                            
                                            _this.codeeditview.el.set_size((alloc.width -50)/2.0f,
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
                                                this.el.set_pivot_point(1.0f,1.0f);
                                                
                                                this.el.set_size(_this.clutterembed.el.get_stage().width-50,
                                                        _this.clutterembed.el.get_stage().height);
                                                        
                                            }
                                        },
                                        {
                                            xtype: GtkClutter.Actor,
                                            id : "objectview",
                                            pack : "get_stage().add_child",
                                            init : {
                                               
                                               /*
                                                this.el.add_constraint(
                                                    new Clutter.AlignConstraint(
                                                        _this.clutterembed.el.get_stage(), 
                                                        Clutter.AlignAxis.X_AXIS,
                                                        0.0f
                                                    )
                                                );
                                                */
                                                this.el.fixed_x = 50.0f;
                                                this.el.fixed_y = 0.0f;
                                                //this.el.set_position(100,100);
                                                this.el.set_pivot_point(0.0f,0.0f);
                                                this.el.set_scale(0.0f,1.0f);
                                                this.el.set_size((_this.clutterembed.el.get_stage().width-50)/2,
                                                        _this.clutterembed.el.get_stage().height);
                                                        
                                            }
                                        },
                                        {
                                            xtype: GtkClutter.Actor,
                                            id : "codeeditview",
                                            pack : "get_stage().add_child",
                                            init : {
                                               
                                               /*
                                                this.el.add_constraint(
                                                    new Clutter.AlignConstraint(
                                                        _this.clutterembed.el.get_stage(), 
                                                        Clutter.AlignAxis.X_AXIS,
                                                        0.0f
                                                    )
                                                );
                                                */
                                                this.el.fixed_x = 50.0f;
                                                this.el.fixed_y = 0.0f;
                                                //this.el.set_position(100,100);
                                                this.el.set_pivot_point(0.0f,0.0f);
                                                this.el.set_scale(0.0f,1.0f);
                                                this.el.set_size((_this.clutterembed.el.get_stage().width-50)/2,
                                                        _this.clutterembed.el.get_stage().height);
                                                        
                                            }
                                        },
                                        {
                                            xtype: GtkClutter.Actor,
                                            id : "addpropsview",
                                            pack : "get_stage().add_child",
                                            init : {
                                               
                                               /*
                                                this.el.add_constraint(
                                                    new Clutter.AlignConstraint(
                                                        _this.clutterembed.el.get_stage(), 
                                                        Clutter.AlignAxis.X_AXIS,
                                                        0.0f
                                                    )
                                                );
                                                */
                                                this.el.fixed_x = 50.0f;
                                                this.el.fixed_y = 0.0f;
                                                //this.el.set_position(100,100);
                                                this.el.set_pivot_point(0.0f,0.0f);
                                                this.el.set_scale(0.0f,1.0f);
                                                this.el.set_size((_this.clutterembed.el.get_stage().width-50)/2,
                                                        _this.clutterembed.el.get_stage().height);
                                                        
                                            }
                                        },
                                        {
                                            xtype: GtkClutter.Actor,
                                            id : "projecteditview",
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
                                                this.el.set_pivot_point(0.0f,0.0f);
                                                this.el.set_scale(1.0f,0.0f);
                                                this.el.set_size(_this.clutterembed.el.get_stage().width-50,
                                                        _this.clutterembed.el.get_stage().height /2);
                                                        
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
                                                        },
                                                        button_press_event : ( ) => {
                                                            switch (_this.state) {
                                                                case "edit":
                                                                
                                                                    _this.hideViewEditing();
                                                                    break;  
                                                                case "files":
                                                                    _this.showViewEditing();
                                                                    break; 
                                                                    
                                                                  case "addprop":
                                                                    _this.hideAddProp();
                                                                    _this.hideViewEditing();
                                                                    break;
                                                                case "addlistener":
                                                                    _this.hideAddListener();
                                                                    _this.hideViewEditing();
                                                                    break;
                                                                     
                                                                 case "object":
                                                                    _this.hideObject();
                                                                    _this.hideViewEditing();
                                                                    break;    
                                                                    
                                                                default:
                                                                    break;
                                                            }
                                                            return false;    
                                                        
                                                        }
                                                    },
                                                    id : "projectbutton",
                                                    pack : "add_child",
                                                    init : this.el.set_size(50,50);,
                                                    reactive : true,
                                                    items : [
                                                        {
                                                            xtype: Clutter.Text,
                                                            pack : "add_child",
                                                            line_alignment : Pango.Alignment.CENTER,
                                                            x_align : Clutter.ActorAlign.CENTER,
                                                            x_expand : false,
                                                            y_align : Clutter.ActorAlign.CENTER,
                                                            y_expand : false
                                                        }
                                                    ]
                                                },
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
                                                        },
                                                        button_press_event : ( ) => {
                                                            switch (_this.state) {
                                                                case "edit":
                                                                    _this.showProjectEdit();
                                                                    break;  
                                                                case "files":
                                                                    // _this.showViewEditing();
                                                                    break; 
                                                                case "projectedit":
                                                                    _this.hideProjectEdit();
                                                                    break;
                                                                    
                                                                    
                                                                      
                                                                case "addprop":
                                                                    _this.hideAddProp();
                                                                    _this.showProjectEdit();
                                                                    break;
                                                                case "addlistener":
                                                                    _this.hideAddListener();
                                                                    _this.showProjectEdit();
                                                                    break;
                                                                     
                                                                 case "object":
                                                                    _this.hideObject();
                                                                    _this.showProjectEdit();    
                                                                    break;
                                                                default:
                                                                    break;
                                                            }
                                                            return false;    
                                                        
                                                        
                                                        }
                                                    },
                                                    id : "projecteditbutton",
                                                    pack : "add_child",
                                                    init : this.el.set_size(50,50);,
                                                    reactive : true,
                                                    items : [
                                                        {
                                                            xtype: Clutter.Text,
                                                            line_alignment : Pango.Alignment.CENTER,
                                                            pack : "add_child",
                                                            x_align : Clutter.ActorAlign.CENTER,
                                                            x_expand : false,
                                                            y_align : Clutter.ActorAlign.CENTER,
                                                            y_expand : false
                                                        }
                                                    ]
                                                },
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
                                                        },
                                                        button_press_event : ( ) => {
                                                            
                                                            
                                                            
                                                            switch (_this.state) {
                                                        
                                                         
                                                                case "addprop":
                                                                    _this.hideAddProp();
                                                                    _this.showObject();
                                                                    break;
                                                            case "addlistener":
                                                                    _this.hideAddListener();
                                                                    _this.showObject();
                                                                    break;
                                                        
                                                        // show            
                                                                case "edit":
                                                                    _this.showObject();
                                                                    break;
                                                                    
                                                        // hide            
                                                                case "object":
                                                                    _this.hideObject();
                                                                    break;
                                                                    break;
                                                                                
                                                                default:
                                                                    print("unhandled add objects from %s\n",_this.state);
                                                                    break;
                                                            }
                                                            return false;    
                                                        
                                                        
                                                        }
                                                    },
                                                    id : "objectshowbutton",
                                                    pack : "add_child",
                                                    init : this.el.set_size(50,50);,
                                                    reactive : true,
                                                    items : [
                                                        {
                                                            xtype: Clutter.Text,
                                                            pack : "add_child",
                                                            line_alignment : Pango.Alignment.CENTER,
                                                            x_align : Clutter.ActorAlign.CENTER,
                                                            x_expand : false,
                                                            y_align : Clutter.ActorAlign.CENTER,
                                                            y_expand : false
                                                        }
                                                    ]
                                                },
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
                                                        },
                                                        button_press_event : ( ) => {
                                                            
                                                            
                                                            
                                                            switch (_this.state) {
                                                                case "edit":
                                                                    _this.showAddProp();
                                                                    break;
                                                                    
                                                                case "object":
                                                                    _this.hideObject();
                                                                    _this.showAddProp();
                                                                    break;
                                                               
                                                                case "addlistener":
                                                                    _this.hideAddListener();
                                                                    _this.showAddProp();            
                                                                    break;
                                                                    
                                                                    
                                                                case "addprop":
                                                                    _this.hideAddProp();
                                                                    break;
                                                                    
                                                                default:
                                                                    print("unhandled add property from %s\n",_this.state);
                                                                    break;
                                                                    
                                                            }
                                                            return false;    
                                                        
                                                        
                                                        }
                                                    },
                                                    id : "addpropbutton",
                                                    pack : "add_child",
                                                    init : this.el.set_size(50,50);,
                                                    reactive : true,
                                                    items : [
                                                        {
                                                            xtype: Clutter.Text,
                                                            pack : "add_child",
                                                            line_alignment : Pango.Alignment.CENTER,
                                                            x_align : Clutter.ActorAlign.CENTER,
                                                            x_expand : false,
                                                            y_align : Clutter.ActorAlign.CENTER,
                                                            y_expand : false
                                                        }
                                                    ]
                                                },
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
                                                        },
                                                        button_press_event : ( ) => {
                                                            
                                                            
                                                            
                                                            switch (_this.state) {
                                                                case "edit":
                                                                    _this.showAddListener();
                                                                    break;
                                                                    
                                                               
                                                                case "addlistener":
                                                                    _this.hideAddListener();
                                                                    break;
                                                        
                                                                    
                                                                case "addprop":
                                                                    _this.hideAddProp();
                                                                    _this.showAddListener();
                                                                    break;
                                                                 case "object":
                                                                    _this.hideObject();
                                                                    _this.showAddListener();
                                                                    break;
                                                            
                                                                  default:
                                                                    print("unhandled add listener from %s\n",_this.state);
                                                        
                                                                    break;
                                                                    
                                                            }
                                                            return false;    
                                                        
                                                        
                                                        }
                                                    },
                                                    id : "addlistenerbutton",
                                                    pack : "add_child",
                                                    init : this.el.set_size(50,50);,
                                                    reactive : true,
                                                    items : [
                                                        {
                                                            xtype: Clutter.Text,
                                                            pack : "add_child",
                                                            line_alignment : Pango.Alignment.CENTER,
                                                            x_align : Clutter.ActorAlign.CENTER,
                                                            x_expand : false,
                                                            y_align : Clutter.ActorAlign.CENTER,
                                                            y_expand : false
                                                        }
                                                    ]
                                                },
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
                                                        },
                                                        button_press_event : ( ) => {
                                                          
                                                            // create a new file in project..
                                                            //Xcls_DialogNewComponent.singleton().show(
                                                            
                                                            
                                                            return false;    
                                                        
                                                        
                                                        }
                                                    },
                                                    id : "addprojectbutton",
                                                    pack : "add_child",
                                                    init : this.el.set_size(50.0f,50.0f);,
                                                    reactive : true,
                                                    items : [
                                                        {
                                                            xtype: Clutter.Text,
                                                            pack : "add_child",
                                                            init : this.el.set_size(50.0f,50.0f);,
                                                            line_alignment : Pango.Alignment.CENTER,
                                                            x_align : Clutter.ActorAlign.CENTER,
                                                            x_expand : false,
                                                            y_align : Clutter.ActorAlign.CENTER,
                                                            y_expand : false
                                                        }
                                                    ]
                                                },
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
                                                        },
                                                        button_press_event : ( ) => {
                                                          
                                                            // create a new file in project..
                                                            var f = JsRender.factory(_this.project.xtype,  _this.project, "");
                                                            Xcls_DialogNewComponent.singleton().show(f);
                                                            
                                                            return false;    
                                                        
                                                        
                                                        }
                                                    },
                                                    id : "addfilebutton",
                                                    pack : "add_child",
                                                    init : this.el.set_size(50.0f,50.0f);,
                                                    reactive : true,
                                                    items : [
                                                        {
                                                            xtype: Clutter.Text,
                                                            pack : "add_child",
                                                            init : this.el.set_size(50.0f,50.0f);,
                                                            line_alignment : Pango.Alignment.CENTER,
                                                            x_align : Clutter.ActorAlign.CENTER,
                                                            x_expand : false,
                                                            y_align : Clutter.ActorAlign.CENTER,
                                                            y_expand : false
                                                        }
                                                    ]
                                                }
                                            ],
                                            layout_manager : {
                                                xtype: Clutter.BoxLayout,
                                                orientation : Clutter.Orientation.VERTICAL
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
});
MainWindow.init();
XObject.cache['/MainWindow'] = MainWindow;
