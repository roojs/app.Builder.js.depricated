/* -- to compile
valac  --pkg gio-2.0  --pkg posix  --pkg gtk+-3.0 --pkg libnotify --pkg gtksourceview-3.0  --pkg  libwnck-3.0 \
    /tmp/EditProject.vala  -o /tmp/EditProject
*/


/* -- to test class
static int main (string[] args) {
    Gtk.init (ref args);
    new Xcls_EditProject();
    EditProject.show_all();
     Gtk.main ();
    return 0;
}
*/


public static Xcls_EditProject  EditProject;

public class Xcls_EditProject : Object 
{
    public Gtk.Dialog el;
    private Xcls_EditProject  _this;

    public static Xcls_EditProject singleton()
    {
        if (EditProject == null) {
            EditProject= new Xcls_EditProject();
        }
        return EditProject;
    }
    public Xcls_xtype xtype;
    public Xcls_cellrender cellrender;
    public Xcls_model model;
    public Xcls_dir dir;

        // my vars
    public signal void success(Project.Project project);

        // ctor 
    public Xcls_EditProject()
    {
        _this = this;
        this.el = new Gtk.Dialog();

        // my vars

        // set gobject values
        this.el.border_width = 3;
        this.el.default_height = 500;
        this.el.default_width = 600;
        this.el.deletable = true;
        this.el.modal = true;
        this.el.name = "EditProject";
        this.el.title = "Project Properties";
        var child_0 = new Xcls_VBox2( _this );
        child_0.ref();
        this.el. get_content_area().add 
 
 (  child_0.el  );
        var child_1 = new Xcls_Button9( _this );
        child_1.ref();
        this.el.add_action_widget (  child_1.el , 1 );
        var child_2 = new Xcls_Button10( _this );
        child_2.ref();
        this.el.add_action_widget (  child_2.el , 0 );

        // listeners 
        this.el.destroy_event.connect(  (self, event) => {
             this.el.hide();
            return false;
        } );
    }

    // userdefined functions 
    public Project.Project? show() {
              
        
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
            
            
         
            var fn = _this.dir.el.get_filename();
            print("add %s\n" , fn);
            
            var project = Project.Project.factory(_this.xtype.getValue(), fn);
            project.save();
            Project.projects.set(project.name,project);
            
            //var pr = imports.Builder.Provider.ProjectManager.ProjectManager.update(this.project);
            
            return project;
        
            
            //this.success = c.success;
        }

    // skip |xns - no return type
    public class Xcls_VBox2 : Object 
    {
        public Gtk.VBox el;
        private Xcls_EditProject  _this;


            // my vars

            // ctor 
        public Xcls_VBox2(Xcls_EditProject _owner )
        {
            _this = _owner;
            this.el = new Gtk.VBox( false, 0 );

            // my vars

            // set gobject values
            var child_0 = new Xcls_HBox3( _this );
            child_0.ref();
            this.el.pack_start (  child_0.el , false,true,3 );
            var child_1 = new Xcls_dir( _this );
            child_1.ref();
            this.el.pack_end (  child_1.el , true,true,5 );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_HBox3 : Object 
    {
        public Gtk.HBox el;
        private Xcls_EditProject  _this;


            // my vars

            // ctor 
        public Xcls_HBox3(Xcls_EditProject _owner )
        {
            _this = _owner;
            this.el = new Gtk.HBox( false, 0 );

            // my vars

            // set gobject values
            var child_0 = new Xcls_Label4( _this );
            child_0.ref();
            this.el.pack_start (  child_0.el , false,true,3 );
            var child_1 = new Xcls_xtype( _this );
            child_1.ref();
            this.el.pack_end (  child_1.el , true,true,3 );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_Label4 : Object 
    {
        public Gtk.Label el;
        private Xcls_EditProject  _this;


            // my vars

            // ctor 
        public Xcls_Label4(Xcls_EditProject _owner )
        {
            _this = _owner;
            this.el = new Gtk.Label( "Project type :" );

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_xtype : Object 
    {
        public Gtk.ComboBox el;
        private Xcls_EditProject  _this;


            // my vars

            // ctor 
        public Xcls_xtype(Xcls_EditProject _owner )
        {
            _this = _owner;
            _this.xtype = this;
            this.el = new Gtk.ComboBox();

            // my vars

            // set gobject values
            var child_0 = new Xcls_cellrender( _this );
            child_0.ref();
            this.el.pack_start (  child_0.el , true );
            var child_1 = new Xcls_model( _this );
            child_1.ref();
            this.el.set_model (  child_1.el  );

            // init method 
             this.el.add_attribute(_this.cellrender.el , "markup", 1 );  
             
        }

        // userdefined functions 

        // skip |setValue - no return type
        public string getValue () {
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
            }

        // skip |xns - no return type
    }
    public class Xcls_cellrender : Object 
    {
        public Gtk.CellRendererText el;
        private Xcls_EditProject  _this;


            // my vars

            // ctor 
        public Xcls_cellrender(Xcls_EditProject _owner )
        {
            _this = _owner;
            _this.cellrender = this;
            this.el = new Gtk.CellRendererText();

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_model : Object 
    {
        public Gtk.ListStore el;
        private Xcls_EditProject  _this;


            // my vars

            // ctor 
        public Xcls_model(Xcls_EditProject _owner )
        {
            _this = _owner;
            _this.model = this;
            this.el = new Gtk.ListStore( 2, typeof(string),typeof(string) );

            // my vars

            // set gobject values
        }

        // userdefined functions 
        public void loadData  ( ) {
                    this.el.clear();
                                  
                    Gtk.TreeIter iter;
                            
                    el.append(out iter);
                    
                    el.set_value(iter, 0, "Roo");
                    el.set_value(iter, 1, "Roo Project");
                     el.append(out iter);
                    
                    el.set_value(iter, 0, "Gtk");
                    el.set_value(iter, 1, "Gtk Project");
                     
                          
                                                 
            }

        // skip |xns - no return type
    }
    public class Xcls_dir : Object 
    {
        public Gtk.FileChooserWidget el;
        private Xcls_EditProject  _this;


            // my vars

            // ctor 
        public Xcls_dir(Xcls_EditProject _owner )
        {
            _this = _owner;
            _this.dir = this;
            this.el = new Gtk.FileChooserWidget( Gtk.FileChooserAction.SELECT_FOLDER );

            // my vars

            // set gobject values
            this.el.select_multiple = false;
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_Button9 : Object 
    {
        public Gtk.Button el;
        private Xcls_EditProject  _this;


            // my vars

            // ctor 
        public Xcls_Button9(Xcls_EditProject _owner )
        {
            _this = _owner;
            this.el = new Gtk.Button();

            // my vars

            // set gobject values
            this.el.label = "OK";

            // listeners 
            this.el.clicked.connect(  () => {
             
              if (_this.xtype.getValue().length < 1) {
                    StandardErrorDialog.singleton().show("You have to set Project type");             
                    return true;
                }
                if (_this.dir.el.get_filename().length < 1) {
                    StandardErrorDialog.singleton().show("You have to select a folder");             
                    return true;
                }
               return false;
            } );
        }

        // userdefined functions 

        // skip |xns - no return type
    }
    public class Xcls_Button10 : Object 
    {
        public Gtk.Button el;
        private Xcls_EditProject  _this;


            // my vars

            // ctor 
        public Xcls_Button10(Xcls_EditProject _owner )
        {
            _this = _owner;
            this.el = new Gtk.Button();

            // my vars

            // set gobject values
            this.el.label = "Cancel";
        }

        // userdefined functions 

        // skip |xns - no return type
    }
}
