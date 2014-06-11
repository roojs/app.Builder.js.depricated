/* -- to compile
valac  --pkg gio-2.0  --pkg posix  --pkg gtk+-3.0 --pkg libnotify --pkg gtksourceview-3.0  --pkg  libwnck-3.0 \
    /tmp/RooProjectProperties.vala  -o /tmp/RooProjectProperties
*/


/* -- to test class
static int main (string[] args) {
    Gtk.init (ref args);
    new Xcls_RooProjectProperties();
    RooProjectProperties.show_all();
     Gtk.main ();
    return 0;
}
*/


public static Xcls_RooProjectProperties  RooProjectProperties;

public class Xcls_RooProjectProperties
{
    public Gtk.Dialog el;
    private static Xcls_RooProjectProperties  _this;

    public Xcls_view view;

        // my vars
    public Project.Project project;

        // ctor 
    public Xcls_RooProjectProperties()
    {
        this.el = new Gtk.Dialog();
        _this = this;
        RooProjectProperties = this;

        // my vars

        // set gobject values
        this.el.default_width = 500;
        this.el.modal = true;
        var child_0 = new Xcls_VBox2();
        this.el. get_content_area().add
 (  child_0.el  );
        var child_1 = new Xcls_Button6();
        this.el.add_action_widget (  child_1.el , 1 );
        var child_2 = new Xcls_Button7();
        this.el.add_action_widget (  child_2.el , 0 );

        // listeners 
        this.el.delete_event.connect(   (self, event) => {
            this.el.hide();
             return true;
        } );
        this.el.response.connect(   (self, response_id)  => {
           //print(response_id);
           if (response_id< 1 ) {
              this.el.hide();
            
              return;
           }
           
           var buf =    view.el.get_buffer();
           Gtk.TextIter s;
             Gtk.TextIter e;
            buf.get_start_iter(out s);
            buf.get_end_iter(out e);
            var str = buf.get_text(s,e,true);
            // ideally we should syntax check it.. but it's html!?
            
           //var project = this.get('/Window.LeftTree').getActiveFile().project;
           
           
           _this.project.runhtml = str;
           _this.project.save();
           
          // imports.Builder.Provider.ProjectManager.ProjectManager.saveConfig();
        //   print (str);
           //    this.get('view').el.get_buffer().get_text(project.runjs, project.runjs.length);
           // ok pressed..
           this.el.hide();
        } );
    }

    // userdefined functions 

    // skip listeners - not pipe 

    // skip .Project.Project:project - already used 

    // skip default_width - already used 

    // skip xtype - not pipe 

    // skip |modal - already used 
    public void show (Project.Project project) {
            _this.project = project;
            // get the active project.
            
            //print (project.fn);
            //project.runhtml = project.runhtml || '';
            _this.view.el.get_buffer().set_text(project.runhtml);
            
            this.el.show_all();
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
            this.el.border_width = 5;
            var child_0 = new Xcls_Label3();
            this.el.pack_start (  child_0.el , false,false,0 );
            var child_1 = new Xcls_ScrolledWindow4();
            this.el.pack_end (  child_1.el , true,true,0 );
        }

        // userdefined functions 

        // skip border_width - already used 

        // skip xtype - not pipe 

        // skip |pack - already used 

        // skip |xns - no return type

        // skip items - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_Label3
    {
        public Gtk.Label el;

            // my vars

            // ctor 
        public Xcls_Label3()
        {
            this.el = new Gtk.Label( "HTML To insert at end of <HEAD>" );

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
    public class Xcls_ScrolledWindow4
    {
        public Gtk.ScrolledWindow el;

            // my vars

            // ctor 
        public Xcls_ScrolledWindow4()
        {
            this.el = new Gtk.ScrolledWindow( null, null );

            // my vars

            // set gobject values
            var child_0 = new Xcls_view();
            this.el.add (  child_0.el  );
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
    public class Xcls_view
    {
        public Gtk.SourceView el;

            // my vars

            // ctor 
        public Xcls_view()
        {
            this.el = new Gtk.SourceView();
            _this.view = this;

            // my vars

            // set gobject values
        }

        // userdefined functions 

        // skip |xns - no return type

        // skip xtype - not pipe 

        // skip pack - not pipe 

        // skip id - not pipe 

        // skip xvala_cls - not pipe 

        // skip xvala_xcls - not pipe 

        // skip xvala_id - not pipe 
    }
    public class Xcls_Button6
    {
        public Gtk.Button el;

            // my vars

            // ctor 
        public Xcls_Button6()
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
    public class Xcls_Button7
    {
        public Gtk.Button el;

            // my vars

            // ctor 
        public Xcls_Button7()
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
