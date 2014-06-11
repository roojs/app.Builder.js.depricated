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

public class Xcls_EditProject
{
    public Gtk.Dialog el;
    private static Xcls_EditProject  _this;

    public Xcls_xtype xtype;
    public Xcls_cellrender cellrender;
    public Xcls_model model;
    public Xcls_dir dir;

        // my vars
    public signal void success(Project.Project project);

        // ctor 
    public Xcls_EditProject()
    {
        this.el = new Gtk.Dialog();
        _this = this;
        EditProject = this;

        // my vars

        // set gobject values
        this.el.border_width = 3;
        this.el.default_height = 500;
        this.el.default_width = 600;
        this.el.deletable = true;
        this.el.modal = true;
        this.el.title = "Project Properties";
        var child_0 = new Xcls_VBox2();
        this.el. get_content_area().add 
 
 (  child_0.el  );
        var child_1 = new Xcls_Button9();
        this.el.add_action_widget (  child_1.el , 1 );
        var child_2 = new Xcls_Button10();
        this.el.add_action_widget (  child_2.el , 0 );

        // listeners 
        this.el.destroy_event.connect(  (self, event) => {
             this.el.hide();
                        return false;
        } );
        this.el.response.connect(   (self, id) => {
             if (id < 1) {
                    this.el.hide();
                    return;
            }
            if (_this.xtype.getValue().length < 1) {
                StandardErrorDialog.show("You have to set Project type");             
                return;
            }
            if (_this.dir.el.get_filename().length < 1) {
                StandardErrorDialog.show("You have to select a folder");             
                return;
            }
        
            this.el.hide();
            
            
            var fn = _this.dir.el.get_filename();
            
            var project = Project.Project.factory(_this.xtype.getValue(), fn);
            
            
            //var pr = imports.Builder.Provider.ProjectManager.ProjectManager.update(this.project);
            
            this.success(project);
        
        } );
    }

    // userdefined functions 

    // skip listeners - not pipe 

    // skip .signal:void:success(Project.Project project) - already used 

    // skip border_width - already used 

    // skip default_height - already used 

    // skip default_width - already used 

    // skip title - already used 

    // skip xtype - not pipe 

    // skip |deletable - already used 

    // skip |modal - already used 
    public void show() {
              
        
            //[ 'xtype'  ].forEach(function(k) {
            //    _this.get(k).setValue(typeof(c[k]) == 'undefined' ? '' : c[k]);
            //});
        	// shouild set path..
            _this.model.loadData();
            this.el.show_all();
            //this.success = c.success;
        }

    // skip |xns - no return type

    // skip items - not pipe 

    // skip id - not pipe 

    // skip xvala_cls - not pipe 

    // skip xvala_xcls - not pipe 

    // skip xvala_id - not pipe 
    public class Xcls_VBox2
    {
        public Gtk.VBox el;

            // my vars

            // ctor 
        public Xcls_VBox2()
        {
            this.el = new Gtk.VBox( true, 0 );

            // my vars

            // set gobject values
            var child_0 = new Xcls_HBox3();
            this.el.pack_start (  child_0.el , false,true,3 );
            var child_1 = new Xcls_dir();
            this.el.pack_end (  child_1.el , true,true,5 );
        }

        // userdefined functions 

        // skip xtype - not pipe 

        // skip |pack - already used 

        // skip |xns - no return type

        // skip items - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_HBox3
    {
        public Gtk.HBox el;

            // my vars

            // ctor 
        public Xcls_HBox3()
        {
            this.el = new Gtk.HBox( true, 0 );

            // my vars

            // set gobject values
            var child_0 = new Xcls_Label4();
            this.el.pack_start (  child_0.el , false,true,3 );
            var child_1 = new Xcls_xtype();
            this.el.pack_end (  child_1.el , true,true,3 );
        }

        // userdefined functions 

        // skip |xns - no return type

        // skip xtype - not pipe 

        // skip pack - not pipe 

        // skip items - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_Label4
    {
        public Gtk.Label el;

            // my vars

            // ctor 
        public Xcls_Label4()
        {
            this.el = new Gtk.Label( "Project type :" );

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip |xns - no return type

        // skip xtype - not pipe 

        // skip pack - not pipe 

        // skip label - already used 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_xtype
    {
        public Gtk.ComboBox el;

            // my vars

            // ctor 
        public Xcls_xtype()
        {
            this.el = new Gtk.ComboBox();
            _this.xtype = this;

            // my vars

            // set gobject values
            var child_0 = new Xcls_cellrender();
            this.el.pack_start (  child_0.el , true );
            var child_1 = new Xcls_model();
            this.el.set_model (  child_1.el  );
        }

        // userdefined functions 

        // skip id - not pipe 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |init - already used 

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

        // skip items - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_cellrender
    {
        public Gtk.CellRendererText el;

            // my vars

            // ctor 
        public Xcls_cellrender()
        {
            this.el = new Gtk.CellRendererText();
            _this.cellrender = this;

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip id - not pipe 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |xns - no return type

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_model
    {
        public Gtk.ListStore el;

            // my vars

            // ctor 
        public Xcls_model()
        {
            this.el = new Gtk.ListStore( 3, "typeof(string),typeof(string)" );
            _this.model = this;

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip columns - already used 

        // skip id - not pipe 

        // skip n_columns - already used 

        // skip pack - not pipe 

        // skip xtype - not pipe 
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

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_dir
    {
        public Gtk.FileChooserWidget el;

            // my vars

            // ctor 
        public Xcls_dir()
        {
            this.el = new Gtk.FileChooserWidget( Gtk.FileChooserAction.SELECT_FOLDER );
            _this.dir = this;

            // my vars

            // set gobject values
            this.el.select_multiple = false;
        }

        // userdefined functions 

        // skip |xns - no return type

        // skip xtype - not pipe 

        // skip pack - not pipe 

        // skip |action - already used 

        // skip id - not pipe 

        // skip |select_multiple - already used 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_Button9
    {
        public Gtk.Button el;

            // my vars

            // ctor 
        public Xcls_Button9()
        {
            this.el = new Gtk.Button();

            // my vars

            // set gobject values
            this.el.label = "OK";
        }

        // userdefined functions 

        // skip |xns - no return type

        // skip xtype - not pipe 

        // skip pack - not pipe 

        // skip label - already used 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_Button10
    {
        public Gtk.Button el;

            // my vars

            // ctor 
        public Xcls_Button10()
        {
            this.el = new Gtk.Button();

            // my vars

            // set gobject values
            this.el.label = "Cancel";
        }

        // userdefined functions 

        // skip |xns - no return type

        // skip xtype - not pipe 

        // skip pack - not pipe 

        // skip label - already used 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
}
