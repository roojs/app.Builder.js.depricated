/**
 * as state management is a bit too complicated inside the builder
 * it's better to seperate this into this class
 * 
 * This class has references to all the Class instances that make up the window..
 * 
 */
public class WindowState : Object 
{
    public MainWindow win;

    public enum State {
        PREVIEW,
        OBJECT,
        PROP,
        LISTENER,
        CODE,
        FILES,
        PROJECT // project settings..
    };

    public State state;

    
    public Xcls_WindowLeftTree  left_tree;
    public Xcls_WindowAddProp   add_props;
    public Xcls_LeftProps       left_props;
    public Xcls_ProjectSettings projectsettings;
    public ValaProjectSettings  vala_projectsettings;
    public Xcls_RightPalete     rightpalete;
    public Editor               code_editor;    
    public Xcls_WindowRooView   window_rooview;
    public Xcls_GtkView         window_gladeview;
    public Xcls_DialogNewComponent new_file_dialog;     

    public Xcls_WindowLeftProjects left_projects; // can not see where this is initialized.. 
    // ctor 
    public WindowState(MainWindow win)
    {
        this.win = win;
        // initialize

        // left elements..
        this.leftTreeInit();
        this.propsListInit();

        // on clutter space...
        this.projectEditInit();
        this.codeEditInit();
        this.projectListInit();)
        this.fileViewInit();
        
        // adding stuff
        this.objectAddInit();
        this.propsAddInit();
     
        
        // previews...
        this.gtkViewInit();
        this.webkitViewInit();

        // dialogs

        this.fileNewInit();
    }


    // left tree

    public void leftTreeInit()
    {
     
        this.left_tree = new Xcls_WindowLeftTree();
        this.left_tree.ref();
        this.left_tree.main_window = _this.win;
    
        this.win.tree.el.pack_start(this.left_tree.el,true, true,0);
        this.left_tree.el.show_all();
           
        this.left_tree.before_node_change.connect(() => {
            return this.leftTreeBeforeChange();

        });

        this.left_tree.node_selected.connect((sel) => {
            this.leftTreeNodeSelected(sel);
        });
     
        this.left_tree.changed.connect(() => {
            this.window_rooview.requestRedraw();
            this.left_tree.model.file.save();
        });
         
    }

    public bool leftTreeBeforeChange(JsRender.Node? sel)
    {
        if (this.state != "codeedit") {
            this.left_props.finish_editing();
            return true;
        }
        if (!this.code_editor.saveContents()) {
            return false;
        }
        return false;
    }
    
    public void leftTreeNodeSelected(JsRender.Node? sel)
    {

        print("node_selected called %s\n", (sel == null) ? "NULL" : "a value");

        if (sel == null) {
            this.left_props.el.hide();
        } 
        this.left_props.el.show();
        this.left_props.load(this.left_tree.getActiveFile(), sel);
        switch (this.state) {
            
            case State.OBJECT: 
                  
                 if (sel == null) {
                    this.rightpalete.clear();
                    break;
                }
                this.rightpalete.load(this.left_tree.getActiveFile().palete(), sel.fqn());
                break;
                 
        
           case State.PROP:
                if (sel == null) {
                    this.add_props.clear();
                    break;
                }
                this.add_props.show(this.left_tree.getActiveFile().palete(), "props", sel.fqn());
                break;

            case State.LISTENER:
               
                if (sel == null) {
                    this.add_props.clear();
                    break;
                }
                this.add_props.show(_this.left_tree.getActiveFile().palete(), "signals", sel.fqn());
                break;
                
            case State.CODEEDIT:
            // SAVE FIRST???
        
            this.codeEditHide();
            break;
               
                            
        }
         

    }




    public void propsListInit()
    {
    
        this.left_props =new Xcls_LeftProps();
        this.left_props.ref();
        this.left_props.main_window = _this;
        this.win.props.el.pack_start(this.left_props.el,true, true,0);
        this.left_props.el.show_all();
    
        this.left_props.show_editor.connect( (file, node, type,  key) => {
            this.codeEditShow(file, node, type,  key);
        });

    
        this.left_props.stop_editor.connect( () => {
            if (this.state != "codeedit") {
                return true;
            }
    
            var ret =  this.code_editor.saveContents();
            if (!ret) {
                return false;
            }
            this.codeEditHide();
            return ret;
        });
    
        this.left_props.changed.connect(() => {
              if (this.left_tree.getActiveFile().xtype == "Roo" ) {
                   this.window_rooview.requestRedraw();
                   
               } else {
                  this.window_gladeview.loadFile(this.left_tree.getActiveFile());
              }
              this.left_tree.model.updateSelected();
              this.left_tree.model.file.save();
        });
    


    }

    //-------------  projects edit

    public void projectEditInit()
    {
        this.projectsettings  =new Xcls_ProjectSettings();
        this.projectsettings.ref();  /// really?
    
        this.vala_projectsettings  =new ValaProjectSettings();
        this.vala_projectsettings.ref();
        this.vala_projectsettings.window = this;
    
        ((Gtk.Container)(this.win.projecteditview.el.get_widget())).add(this.projectsettings.el);
        //this.projectsettings.el.show_all();

        var stage = this.win.projecteditview.el.get_stage();
        stage.set_background_color(  Clutter.Color.from_string("#000"));
    
        this.projectsettings.buttonPressed.connect((btn) => {
             if (this.left_tree.getActiveFile().xtype == "Roo" ) {
                if (btn == "save") {
                    this.window_rooview.view.renderJS(true);
                }
                if (btn == "apply") {
                    this.window_rooview.view.renderJS(true);
                    return;
                }
            } else {
                // do nothing for gtk..
            }
            if (btn == "save" || btn == "apply") {
                this.win.project.save();
         
            }
            
            this.projectEditHide();
             
         });

    }
    // ----------- object adding
    public void objectAddInit()
    {

        this.rightpalete  = new Xcls_RightPalete();
        this.rightpalete.ref();  /// really?
        ((Gtk.Container)(this.win.objectview.el.get_widget())).add(this.rightpalete.el);
        //this.projectsettings.el.show_all();

        stage = _this.win.objectview.el.get_stage();
        stage.set_background_color(  Clutter.Color.from_string("#000"));
           
    }
    
    // -----------  properties adding list...
    // listener uses the properties 
    public void propsAddInit()
    {
    // Add properties
        this.add_props  = new Xcls_WindowAddProp();
        this.add_props.ref();  /// really?
        ((Gtk.Container)(this.win.addpropsview.el.get_widget())).add(this.add_props.el);
        //this.projectsettings.el.show_all();

        var  stage = _this.win.addpropsview.el.get_stage();
        stage.set_background_color(  Clutter.Color.from_string("#000"));


        this.add_props.select.connect( (key,type,skel, etype) => {
            this.left_props.addProp(etype, key, skel, type);
        });

    }
    public void propsAddShow()
    {

    }
    public void propsAddHide()
    {
    
    }



    
    // ----------- Add / Edit listener
    // listener uses the properties 
    //public void listenerInit()     { }
    public void listenerShow()
    {

    }
    public void listenerHide()
    {
    
    }

    // -------------- codeEditor

    public void codeEditInit()
    {
        this.code_editor  = new  Editor();
        this.code_editor.ref();  /// really?
        ((Gtk.Container)(this.win.codeeditview.el.get_widget())).add(this.code_editor.el);
        //this.projectsettings.el.show_all();

        stage = _this.win.codeeditview.el.get_stage();
        stage.set_background_color(  Clutter.Color.from_string("#000"));
        // editor.save...

        this.code_editor.save.connect( () => {
             this.left_tree.model.file.save();
             this.left_tree.model.updateSelected();
        });
        
    }

    // ----------- list of projects on left
    public void  projectListInit() 
    {

        this.left_projects = new Xcls_WindowLeftProjects();
         this.left_projects.ref();
         this.win.leftpane.el.pack_start(this.left_projects.el,true, true,0);
         this.left_projects.el.show_all();
         this.left_projects.project_selected.connect((proj) => {
            proj.scanDirs();
            this.clutterfiles.loadProject(proj);
        
         });

    }
    // ----------- file view

    public void fileViewInit()
    {
        stage = _this.rooview.el.get_stage(); \\ seems odd... 
        this.clutterfiles = new Xcls_ClutterFiles();
        this.clutterfiles.ref();
        stage.add_child(this.clutterfiles.el);
        this.clutterfiles.el.show_all();


        this.clutterfiles.open.connect((file) => { 
            this.fileViewOpen(file);
        });

    }
    public void fileNewInit()
    {
        this.new_file_dialog = new Xcls_DialogNewComponent();
        // force it modal to the main window..
        this.new_file_dialog.el.set_transient_for(this.el);
        this.new_file_dialog.el.set_modal(true);
    
        this.new_file_dialog.success.connect((project,file) =>
        {
            this.fileViewOpen(file);
        });

    }

    
    public void fileViewOpen(JsRender.JsRender file)
    {
        this.win.project = file.project;
        this.previewShow();
            this.left_tree.model.loadFile(file);
    
        var ctr= ((Gtk.Container)(this.win.rooview.el.get_widget()));
        var ctr_p= ((Gtk.Container)(this.win.projecteditview.el.get_widget()));
    
        if (file.xtype == "Roo" ) { 
            ctr.foreach( (w) => { ctr.remove(w); });
            ctr_p.foreach( (w) => { ctr_p.remove(w); });
            ctr.add(this.window_rooview.el);
            ctr_p.add(this.projectsettings.el);            
            this.window_rooview.loadFile(file);
            this.window_rooview.el.show_all();
            this.projectsettings.el.show_all();            

        } else {
            ctr.foreach( (w) => { ctr.remove(w); });
            ctr_p.foreach( (w) => { ctr_p.remove(w); });            
            ctr.add(this.window_gladeview.el);
            ctr_p.add(this.vala_projectsettings.el);
            this.window_gladeview.loadFile(file);
            this.window_gladeview.el.show_all();
            this.vala_projectsettings.el.show_all();
        }
        print("OPEN : " + file.name);
        this.editpane.el.set_position(_this.editpane.el.max_position);
        this.win.setTitle(file.project.name + " : " +file.name);
             

        }

    
    // ---------  webkit view
    public void webkitViewInit()
    {
        this.window_rooview  =new Xcls_WindowRooView();
        this.window_rooview.ref();
        ((Gtk.Container)(this.win.rooview.el.get_widget())).add(this.window_rooview.el);
        this.window_rooview.el.show_all();

        stage = this.win.rooview.el.get_stage();
        stage.set_background_color(  Clutter.Color.from_string("#000"));
    }

    // ------ Gtk  - view

    public void gtkViewInit()
    {
        this.window_gladeview  =new Xcls_GtkView();
        this.window_gladeview.ref();
    }

    public void switchState(State new_state)
    {
        if (this.state == State.PREVIEW) {
            // try and do a snapshot..
            
            
        }

        


        
        switch (this.state) {

            case State.PREVIEW:
                if (this.left_tree.getActiveFile() != null) {
                     if (this.left_tree.getActiveFile().xtype == "Roo" ) {
                         this.window_rooview.createThumb();
                     } else {
                          this.window_gladeview.createThumb();
                      }
                }
                // normally we are going from preview to another state.
                // and different windows hide the preview in differnt ways..
                
                break;
            
           case State.LISTENER:
           case State.PROP:
                this.win.addpropsview.el.save_easing_state();
                this.win.addpropsview.el.set_scale(0.0f,0.0f);
                this.win.addpropsview.el.restore_easing_state();   
                break;
                
            case State.CODE:
                this.win.codeeditview.el.save_easing_state();
                this.win.codeeditview.el.set_scale(0.0f,0.0f);
                this.win.codeeditview.el.restore_easing_state();    
                break;


             case State.OBJECT:
                this.win.objectview.el.save_easing_state();
                this.win.objectview.el.set_scale(0.0f,0.0f);
                this.win.objectview.el.restore_easing_state();    
                break;

           case State.PROJECT:
                this.win.projecteditview.el.save_easing_state();
                this.win.projecteditview.el.set_scale(0.0f,0.0f);
                this.win.projecteditview.el.restore_easing_state();    
                break;
        var oldstate  =this.state;
        this.state = new_state;

                
        this.buttonShowHide();
        
        switch (this.state) {
            
            case State.PREVIEW:  // this is the default state when working...
                 this.win.rooview.el.save_easing_state();
                 this.win.rooview.el.set_scale(1.0f,1.0f);
                 this.win.rooview.el.restore_easing_state();
               
                break;


            case State.LISTENER:
                var ae =      this.left_tree.getActiveElement();
                if (ae == null) {
                    this.state = this.oldstate;
                    this.buttonShowHide();
                    return;
                }
                this.add_props.el.show_all();
                this.add_props.show(
                    Palete.factory(this.win.project.xtype), 
                    "signals",
                    ae.fqn()
                );
                _this.addpropsview.el.save_easing_state();
                    
                var el = _this.rooview.el;
                el.save_easing_state();
               
                  _this.clutterembed.setSizesAlloc("addlistener");

                
              

                _this.addpropsview.el.set_scale(1.0f,1.0f);
               
               
             
                //_this.clutterfiles.loadProject(_this.project);

                el.restore_easing_state();
                _this.addpropsview.el.restore_easing_state();
            case State.PROP:
                this.addpropsview.el.save_easing_state();
                this.addpropsview.el.set_scale(0.0f,0.0f);
                this.win.addpropsview.el.restore_easing_state();   
                break;
                
            case State.CODE:
                this.win.codeeditview.el.save_easing_state();
                this.win.codeeditview.el.set_scale(0.0f,0.0f);
                this.win.codeeditview.el.restore_easing_state();    
                break;


             case State.OBJECT:
                this.win.objectview.el.save_easing_state();
                this.win.objectview.el.set_scale(0.0f,0.0f);
                this.win.objectview.el.restore_easing_state();    
                break;

           case State.PROJECT:
                this.win.projecteditview.el.save_easing_state();
                this.win.projecteditview.el.set_scale(0.0f,0.0f);
                this.win.projecteditview.el.restore_easing_state();    
                break;
                
           case State.FILES:  // can only get here from PREVIEW state.. in theory..
                
   
                this.win.editpane.el.hide(); // holder for tree and properties..
             
                this.left_projects.el.show(); 
            
                var el = this.win.rooview.el;
                el.save_easing_state();
                el.set_easing_duration(1000);

                el.set_rotation_angle(Clutter.RotateAxis.Y_AXIS, 360.0f);
                el.set_scale(0.0f,0.0f);

 
                if (this.win.project != null) {
                    this.left_projects.selectProject(_this.project);
                }
             
                el.restore_easing_state();
                
                break;




            
    }
    
    // -- buttons show hide.....

    public void buttonsShowHide()
    {
        // basically hide everything, then show the relivant..

         this.win.backbutton.el.hide();
    
        this.win.projectbutton.el.hide(); // show file nav...
        this.win.editfilebutton.el.hide();
        this.win.projecteditbutton.el.hide();
         
        
        this.win.objectshowbutton.el.hide(); // add objects
        this.win.addpropbutton.el.hide();  
        this.win.addlistenerbutton.el.hide(); 

    
    
        this.win.addprojectbutton.el.hide();
        this.win.addfilebutton.el.hide();
        this.win.delprojectbutton.el.hide();
        this.win.new_window.el.hide();

        
        switch (this.state) {
            
            case State.PREVIEW:  // this is the default state when working...
               
                this.win.projectbutton.el.show(); // show file nav...
                this.win.editfilebutton.el.show();
                this.win.projecteditbutton.el.show();
                 
                
                this.win.objectshowbutton.el.show(); // add objects
                this.win.addpropbutton.el.show();  
                this.win.addlistenerbutton.el.show(); 
                break;
            
           
            case State.CODE: 
            case State.PROP:
            case State.LISTENER:
            case State.OBJECT
                
                this.win.backbutton.el.show();
                this.win.objectshowbutton.el.show(); // add objects
                this.win.addpropbutton.el.show();  
                this.win.addlistenerbutton.el.show(); 
                 break;
                
            case State.FILES:
                this.win.backbutton.el.show();
                     
                this.win.addprojectbutton.el.show();
                this.win.addfilebutton.el.show();
                this.win.delprojectbutton.el.show();
                this.win.new_window.el.show();
                break;
        

    }


    

    
}

    