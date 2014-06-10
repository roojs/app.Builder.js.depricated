/* -- to compile
valac  --pkg gio-2.0  --pkg posix  --pkg gtk+-3.0 --pkg libnotify --pkg gtksourceview-3.0  --pkg  libwnck-3.0 \
    /tmp/DialogNewComponent.vala  -o /tmp/DialogNewComponent
*/


/* -- to test class
static int main (string[] args) {
    Gtk.init (ref args);
    new Xcls_DialogNewComponent();
    DialogNewComponent.show_all();
     Gtk.main ();
    return 0;
}
*/


public static Xcls_DialogNewComponent  DialogNewComponent;

public class Xcls_DialogNewComponent
{
    public Gtk.Dialog el;
    private static Xcls_DialogNewComponent  _this;

    public Xcls_name name;
    public Xcls_title title;
    public Xcls_region region;
    public Xcls_parent parent;
    public Xcls_permname permname;
    public Xcls_modOrder modOrder;

        // my vars
    public JsRender.JsRender file;
    public Project.Project project;

        // ctor 
    public Xcls_DialogNewComponent()
    {
        this.el = new Gtk.Dialog();
        _this = this;
        DialogNewComponent = this;

        // my vars

        // set gobject values
        this.el.default_height = 200;
        this.el.default_width = 500;
        this.el.deletable = false;
        this.el.modal = true;
        this.el.title = "New Component";
        var child_0 = new Xcls_VBox2();
        this.el.add (  child_0.el  );
        var child_1 = new Xcls_Button16();
        this.el.add_action_widget (  child_1.el , 0 );
        var child_2 = new Xcls_Button17();
        this.el.add_action_widget (  child_2.el , 1 );

        // listeners 
        this.el.delete_event.connect( (self, event) => {
            this.el.hide();
            return true;
        }
        
         );
        this.el.response.connect(   (self, response_id) =>  {
          
        	if (response_id < 1) { // cancel!
                    this.el.hide();
                    return;
                }
        
                if (_this.name.el.get_text().length  < 1) {
                    StandardErrorDialog.show(
                        "You have to set Project name "
                    );
                     
                    return;
                }
                // what does this do?
                
                var isNew = _this.file.name.length  > 0 ? false : true;
                
                if (_this.file.name.length > 0 && this.file.name != _this.name.el.get_text()) {
                    StandardErrorDialog.show(
                        "Sorry changing names does not work yet. "
                    );
                     
                    return;
                }
        
                // FIXME - this may be more complicated...
                //for (var i in this.def) {
                //    this.file[i] =  this.get(i).el.get_text();
                //}
        
                if (!isNew) {
                    _this.file.save();
                    this.el.hide();
                    return;
                }
        
            
        	var dir = _this.project.firstPath();
        	//FIXME...
                //for (var i in this.project.paths) {
         	//	dir = i;
        	//	break;
        	//}
        
         
                
                // what about .js ?
                if (GLib.FileUtil.test(_this.file.name + ".bjs", GLib.FileTest.EXISTS)) {
                    StandardErrorDialog.show(
                        "That file already exists"
                    ); 
                    return;
                }
                this.el.hide();
                
                
                //var tmpl = this.project.loadFileOnly(DialogNewComponent.get('template').getValue());
                 
                var nf = _this.project.create(dir + "/" + _this.file.name + ".bjs");
                //for (var i in this.file) {
                //    nf[i] = this.file[i];
                //}
                /*
                -- fixme -- needs to be a signal..
                if (DialogNewComponent.success != null) {
                    DialogNewComponent.success(_this.project, nf);
                }
                */
        } );
        this.el.show.connect( (self)  => {
          this.el.show_all();
        } );
    }

    // userdefined functions 

    // skip listeners - not pipe 

    // skip .JsRender.JsRender:file - already used 

    // skip .Project.Project:project - already used 

    // skip default_height - already used 

    // skip default_width - already used 

    // skip id - not pipe 

    // skip title - already used 

    // skip xtype - not pipe 

    // skip |deletable - already used 

    // skip |modal - already used 
    public void show(JsRender.JsRender c) 
        {
            this.project = c.project;
            
            if (!this.el) {
                //this.init();
            }
            
            this.def =  { 
                name : '' , 
                title : '' ,
                region : '' ,
                parent: '',
              //  disable: '',
                modOrder : '0',
                permname : ''
            };
            
            
            for (var i in this.def) {
                c[i] = c[i] || this.def[i];
                this.get(i).el.set_text(c[i]);
            }
            
            if (c.path.length > 0) {
                this.el.set_title("Edit File Details - " + c.name);
            } else {
                this.el.set_title("Create New File");
            }
             
            this.file = c;
            console.log('show all');
            this.el.show_all();
            this.success = c.success;
            
            
        }

    // skip |xns - no return type

    // skip items - not pipe 

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
            var child_0 = new Xcls_Table3();
            this.el.pack_start (  child_0.el , false,false,0 );
        }

        // userdefined functions 

        // skip |xns - no return type

        // skip xtype - not pipe 

        // skip |pack - already used 

        // skip items - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_Table3
    {
        public Gtk.Table el;

            // my vars

            // ctor 
        public Xcls_Table3()
        {
            this.el = new Gtk.Table();

            // my vars

            // set gobject values
            this.el.homogeneous = false;
            this.el.n_columns = 2;
            this.el.n_rows = 3;
            var child_0 = new Xcls_Label4();
            this.el.add (  child_0.el  );
            var child_1 = new Xcls_name();
            this.el.add (  child_1.el  );
            var child_2 = new Xcls_Label6();
            this.el.add (  child_2.el  );
            var child_3 = new Xcls_title();
            this.el.add (  child_3.el  );
            var child_4 = new Xcls_Label8();
            this.el.add (  child_4.el  );
            var child_5 = new Xcls_region();
            this.el.add (  child_5.el  );
            var child_6 = new Xcls_Label10();
            this.el.add (  child_6.el  );
            var child_7 = new Xcls_parent();
            this.el.add (  child_7.el  );
            var child_8 = new Xcls_Label12();
            this.el.add (  child_8.el  );
            var child_9 = new Xcls_permname();
            this.el.add (  child_9.el  );
            var child_10 = new Xcls_Label14();
            this.el.add (  child_10.el  );
            var child_11 = new Xcls_modOrder();
            this.el.add (  child_11.el  );
        }

        // userdefined functions 

        // skip n_columns - already used 

        // skip n_rows - already used 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |homogeneous - already used 

        // skip |xns - no return type

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
            this.el = new Gtk.Label();

            // my vars

            // set gobject values
            this.el.justify = Gtk.Justification.RIGHT;
            this.el.label = "Component Name";
            this.el.xalign = 0.9;
        }

        // userdefined functions 

        // skip label - already used 

        // skip pack - not pipe 

        // skip x_options - not pipe 

        // skip xalign - already used 

        // skip xtype - not pipe 

        // skip |justify - already used 

        // skip |xns - no return type

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_name
    {
        public Gtk.Entry el;

            // my vars

            // ctor 
        public Xcls_name()
        {
            this.el = new Gtk.Entry();
            _this.name = this;

            // my vars

            // set gobject values
            this.el.visible = true;
        }

        // userdefined functions 

        // skip id - not pipe 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |visible - already used 

        // skip |xns - no return type

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_Label6
    {
        public Gtk.Label el;

            // my vars

            // ctor 
        public Xcls_Label6()
        {
            this.el = new Gtk.Label();

            // my vars

            // set gobject values
            this.el.justify = Gtk.Justification.RIGHT;
            this.el.label = "Title";
            this.el.visible = true;
            this.el.xalign = 0.9;
        }

        // userdefined functions 

        // skip label - already used 

        // skip pack - not pipe 

        // skip x_options - not pipe 

        // skip xalign - already used 

        // skip xtype - not pipe 

        // skip |justify - already used 

        // skip |visible - already used 

        // skip |xns - no return type

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_title
    {
        public Gtk.Entry el;

            // my vars

            // ctor 
        public Xcls_title()
        {
            this.el = new Gtk.Entry();
            _this.title = this;

            // my vars

            // set gobject values
            this.el.visible = true;
        }

        // userdefined functions 

        // skip id - not pipe 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |visible - already used 

        // skip |xns - no return type

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_Label8
    {
        public Gtk.Label el;

            // my vars

            // ctor 
        public Xcls_Label8()
        {
            this.el = new Gtk.Label();

            // my vars

            // set gobject values
            this.el.justify = Gtk.Justification.RIGHT;
            this.el.label = "Region";
            this.el.tooltip_text = "center, north, south, east, west";
            this.el.visible = true;
            this.el.xalign = 0.9;
        }

        // userdefined functions 

        // skip label - already used 

        // skip pack - not pipe 

        // skip tooltip_text - already used 

        // skip x_options - not pipe 

        // skip xalign - already used 

        // skip xtype - not pipe 

        // skip |justify - already used 

        // skip |visible - already used 

        // skip |xns - no return type

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_region
    {
        public Gtk.Entry el;

            // my vars

            // ctor 
        public Xcls_region()
        {
            this.el = new Gtk.Entry();
            _this.region = this;

            // my vars

            // set gobject values
            this.el.visible = true;
        }

        // userdefined functions 

        // skip id - not pipe 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |visible - already used 

        // skip |xns - no return type

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_Label10
    {
        public Gtk.Label el;

            // my vars

            // ctor 
        public Xcls_Label10()
        {
            this.el = new Gtk.Label();

            // my vars

            // set gobject values
            this.el.justify = Gtk.Justification.RIGHT;
            this.el.label = "Parent Name";
            this.el.visible = true;
            this.el.xalign = 0.9;
        }

        // userdefined functions 

        // skip label - already used 

        // skip pack - not pipe 

        // skip x_options - not pipe 

        // skip xalign - already used 

        // skip xtype - not pipe 

        // skip |justify - already used 

        // skip |visible - already used 

        // skip |xns - no return type

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_parent
    {
        public Gtk.Entry el;

            // my vars

            // ctor 
        public Xcls_parent()
        {
            this.el = new Gtk.Entry();
            _this.parent = this;

            // my vars

            // set gobject values
            this.el.visible = true;
        }

        // userdefined functions 

        // skip id - not pipe 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |visible - already used 

        // skip |xns - no return type

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_Label12
    {
        public Gtk.Label el;

            // my vars

            // ctor 
        public Xcls_Label12()
        {
            this.el = new Gtk.Label();

            // my vars

            // set gobject values
            this.el.justify = Gtk.Justification.RIGHT;
            this.el.label = "Permission Name";
            this.el.visible = true;
            this.el.xalign = 0.9;
        }

        // userdefined functions 

        // skip label - already used 

        // skip pack - not pipe 

        // skip x_options - not pipe 

        // skip xalign - already used 

        // skip xtype - not pipe 

        // skip |justify - already used 

        // skip |visible - already used 

        // skip |xns - no return type

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_permname
    {
        public Gtk.Entry el;

            // my vars

            // ctor 
        public Xcls_permname()
        {
            this.el = new Gtk.Entry();
            _this.permname = this;

            // my vars

            // set gobject values
            this.el.visible = true;
        }

        // userdefined functions 

        // skip id - not pipe 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |visible - already used 

        // skip |xns - no return type

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_Label14
    {
        public Gtk.Label el;

            // my vars

            // ctor 
        public Xcls_Label14()
        {
            this.el = new Gtk.Label();

            // my vars

            // set gobject values
            this.el.justify = Gtk.Justification.RIGHT;
            this.el.label = "Order (for tabs)";
            this.el.visible = true;
            this.el.xalign = 0.9;
        }

        // userdefined functions 

        // skip label - already used 

        // skip pack - not pipe 

        // skip x_options - not pipe 

        // skip xalign - already used 

        // skip xtype - not pipe 

        // skip |justify - already used 

        // skip |visible - already used 

        // skip |xns - no return type

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_modOrder
    {
        public Gtk.Entry el;

            // my vars

            // ctor 
        public Xcls_modOrder()
        {
            this.el = new Gtk.Entry();
            _this.modOrder = this;

            // my vars

            // set gobject values
            this.el.visible = true;
        }

        // userdefined functions 

        // skip id - not pipe 

        // skip pack - not pipe 

        // skip xtype - not pipe 

        // skip |visible - already used 

        // skip |xns - no return type

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_Button16
    {
        public Gtk.Button el;

            // my vars

            // ctor 
        public Xcls_Button16()
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
    public class Xcls_Button17
    {
        public Gtk.Button el;

            // my vars

            // ctor 
        public Xcls_Button17()
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
}
