static Xcls_ValaCompileErrors  _ValaCompileErrors;

public class Xcls_ValaCompileErrors : Object 
{
    public Gtk.Popover el;
    private Xcls_ValaCompileErrors  _this;

    public static Xcls_ValaCompileErrors singleton()
    {
        if (_ValaCompileErrors == null) {
            _ValaCompileErrors= new Xcls_ValaCompileErrors();
        }
        return _ValaCompileErrors;
    }
    public Xcls_compile_view compile_view;
    public Xcls_hpane hpane;
    public Xcls_compile_tree compile_tree;
    public Xcls_compile_result_store compile_result_store;
    public Xcls_renderer renderer;

        // my vars (def)
    public Xcls_MainWindow window;

    // ctor 
    public Xcls_ValaCompileErrors()
    {
        _this = this;
        this.el = new Gtk.Popover( null );

        // my vars (dec)

        // set gobject values
        this.el.width_request = 900;
        this.el.height_request = 800;
        this.el.modal = true;
        this.el.position = Gtk.PositionType.TOP;
        var child_0 = new Xcls_compile_view( _this );
        child_0.ref();
        this.el.add (  child_0.el  );
    }

    // user defined functions 
    public void show (Json.Object tree, Gtk.Widget onbtn) {
    
        
             //print("looking for %s\n", id);
            // loop through parent childnre
              
            
            var store = this.compile_result_store.el;    
            
            store.clear();
         
            
            tree.foreach_member((obj, file, node) => {
                // id line "display text", file
                
                var title = GLib.Path.get_basename( file) ;
                Gtk.TreeIter iter;
                print("Add file %s", title);
                store.append(out iter, null);
                var lines = tree.get_object_member(file);
                title += " (" + lines.get_size().to_string() + ")";
                store.set(iter, 0, file, 1, 0, 2, title, 3, file,-1);
                
                lines.foreach_member((obja, line, nodea) => {
                    var msg  = "";
                    var ar = lines.get_array_member(line);
                    for (var i = 0 ; i < ar.get_length(); i++) {
        		    msg += (msg.length > 0) ? "\n" : "";
        		    msg += ar.get_string_element(i);
    	        }
                    Gtk.TreeIter citer;  
                    print("Add line %s", line);
                    store.append(out citer, iter);
                    store.set(citer, 
                        0, file + ":" + line, 
                        1, int.parse(line), 
                        2, GLib.Markup.escape_text(line + ": " + msg), 
                        3, file,-1);
                
                });
                
                
            
            });
               
       this.el.hide();
            
       while (Gtk.events_pending()) {
            Gtk.main_iteration();
        }
        
        this.hpane.el.set_position(200);
       if (this.el.relative_to == null) {
       this.el.set_relative_to(onbtn);
         }
        this.el.show_all();
              
    
    }
    public class Xcls_compile_view : Object 
    {
        public Gtk.VBox el;
        private Xcls_ValaCompileErrors  _this;


            // my vars (def)

        // ctor 
        public Xcls_compile_view(Xcls_ValaCompileErrors _owner )
        {
            _this = _owner;
            _this.compile_view = this;
            this.el = new Gtk.VBox( false, 0 );

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_HBox3( _this );
            child_0.ref();
            this.el.pack_start (  child_0.el , false,false,0 );
            var child_1 = new Xcls_hpane( _this );
            child_1.ref();
            this.el.pack_start (  child_1.el , true,true,0 );
        }

        // user defined functions 
    }
    public class Xcls_HBox3 : Object 
    {
        public Gtk.HBox el;
        private Xcls_ValaCompileErrors  _this;


            // my vars (def)

        // ctor 
        public Xcls_HBox3(Xcls_ValaCompileErrors _owner )
        {
            _this = _owner;
            this.el = new Gtk.HBox( true, 0 );

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_Button4( _this );
            child_0.ref();
            this.el.pack_start (  child_0.el , true,true,0 );
        }

        // user defined functions 
    }
    public class Xcls_Button4 : Object 
    {
        public Gtk.Button el;
        private Xcls_ValaCompileErrors  _this;


            // my vars (def)

        // ctor 
        public Xcls_Button4(Xcls_ValaCompileErrors _owner )
        {
            _this = _owner;
            this.el = new Gtk.Button();

            // my vars (dec)

            // set gobject values
            this.el.label = "Compile and Run";
        }

        // user defined functions 
    }
    public class Xcls_hpane : Object 
    {
        public Gtk.HPaned el;
        private Xcls_ValaCompileErrors  _this;


            // my vars (def)

        // ctor 
        public Xcls_hpane(Xcls_ValaCompileErrors _owner )
        {
            _this = _owner;
            _this.hpane = this;
            this.el = new Gtk.HPaned();

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_ScrolledWindow6( _this );
            child_0.ref();
            this.el.add (  child_0.el  );
            var child_1 = new Xcls_ScrolledWindow11( _this );
            child_1.ref();
            this.el.add (  child_1.el  );
        }

        // user defined functions 
    }
    public class Xcls_ScrolledWindow6 : Object 
    {
        public Gtk.ScrolledWindow el;
        private Xcls_ValaCompileErrors  _this;


            // my vars (def)

        // ctor 
        public Xcls_ScrolledWindow6(Xcls_ValaCompileErrors _owner )
        {
            _this = _owner;
            this.el = new Gtk.ScrolledWindow( null, null );

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_compile_tree( _this );
            child_0.ref();
            this.el.add (  child_0.el  );

            // init method 

            {
             this.el.set_policy (Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC);
             
            
            }
        }

        // user defined functions 
    }
    public class Xcls_compile_tree : Object 
    {
        public Gtk.TreeView el;
        private Xcls_ValaCompileErrors  _this;


            // my vars (def)

        // ctor 
        public Xcls_compile_tree(Xcls_ValaCompileErrors _owner )
        {
            _this = _owner;
            _this.compile_tree = this;
            this.el = new Gtk.TreeView();

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_compile_result_store( _this );
            child_0.ref();
            this.el.set_model (  child_0.el  );
            var child_1 = new Xcls_column( _this );
            child_1.ref();
            this.el.append_column (  child_1.el  );
        }

        // user defined functions 
    }
    public class Xcls_compile_result_store : Object 
    {
        public Gtk.TreeStore el;
        private Xcls_ValaCompileErrors  _this;


            // my vars (def)

        // ctor 
        public Xcls_compile_result_store(Xcls_ValaCompileErrors _owner )
        {
            _this = _owner;
            _this.compile_result_store = this;
            this.el = new Gtk.TreeStore( 4,   typeof(string), typeof(int), typeof(string), typeof(string)  );

            // my vars (dec)

            // set gobject values
        }

        // user defined functions 
    }
    public class Xcls_column : Object 
    {
        public Gtk.TreeViewColumn el;
        private Xcls_ValaCompileErrors  _this;


            // my vars (def)

        // ctor 
        public Xcls_column(Xcls_ValaCompileErrors _owner )
        {
            _this = _owner;
            this.el = new Gtk.TreeViewColumn();

            // my vars (dec)

            // set gobject values
            this.el.title = "Compile output";
            var child_0 = new Xcls_renderer( _this );
            child_0.ref();
            this.el.pack_start (  child_0.el , true );

            // init method 

            {
              this.el.add_attribute(_this.renderer.el , "markup", 2 );
             
            }
        }

        // user defined functions 
    }
    public class Xcls_renderer : Object 
    {
        public Gtk.CellRendererText el;
        private Xcls_ValaCompileErrors  _this;


            // my vars (def)

        // ctor 
        public Xcls_renderer(Xcls_ValaCompileErrors _owner )
        {
            _this = _owner;
            _this.renderer = this;
            this.el = new Gtk.CellRendererText();

            // my vars (dec)

            // set gobject values
        }

        // user defined functions 
    }
    public class Xcls_ScrolledWindow11 : Object 
    {
        public Gtk.ScrolledWindow el;
        private Xcls_ValaCompileErrors  _this;


            // my vars (def)

        // ctor 
        public Xcls_ScrolledWindow11(Xcls_ValaCompileErrors _owner )
        {
            _this = _owner;
            this.el = new Gtk.ScrolledWindow( null, null );

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_SourceView12( _this );
            child_0.ref();
            this.el.add (  child_0.el  );
        }

        // user defined functions 
    }
    public class Xcls_SourceView12 : Object 
    {
        public Gtk.SourceView el;
        private Xcls_ValaCompileErrors  _this;


            // my vars (def)

        // ctor 
        public Xcls_SourceView12(Xcls_ValaCompileErrors _owner )
        {
            _this = _owner;
            this.el = new Gtk.SourceView();

            // my vars (dec)

            // set gobject values
            this.el.editable = false;
            this.el.show_line_marks = true;
            this.el.show_line_numbers = true;
        }

        // user defined functions 
    }
}
