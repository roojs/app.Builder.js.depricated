static Xcls_ValaCompileResults  _ValaCompileResults;

public class Xcls_ValaCompileResults : Object
{
    public Gtk.Popover el;
    private Xcls_ValaCompileResults  _this;

    public static Xcls_ValaCompileResults singleton()
    {
        if (_ValaCompileResults == null) {
            _ValaCompileResults= new Xcls_ValaCompileResults();
        }
        return _ValaCompileResults;
    }
    public Xcls_compile_view compile_view;

        // my vars (def)
    public Xcls_MainWindow window;
    public bool active;
    public JsRender.JsRender? file;
    public Json.Object notices;

    // ctor
    public Xcls_ValaCompileResults()
    {
        _this = this;
        this.el = new Gtk.Popover( null );

        // my vars (dec)
        this.active = false;

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
    
            
            this.file = null;
            this.notices = tree;
           
             //print("looking for %s\n", id);
            // loop through parent childnre
              
            
            var store = this.compile_result_store.el;    
            
            store.clear();
         
            
            tree.foreach_member((obj, file, node) => {
                // id line "display text", file
                
                var title = GLib.Path.get_basename(GLib.Path.get_dirname( file)) + "/" +  GLib.Path.get_basename( file) ;
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
            
        int w,h;
        this.window.el.get_size(out w, out h);
        
        // left tree = 250, editor area = 500?
        
        var new_w = int.min(250, w-100);
        if (new_w > (w-100)) {
            new_w = w-100;
        }
        this.el.set_size_request( int.max(100, new_w), int.max(100, h-120));
    
        
    
        if (this.el.relative_to == null) {
            this.el.set_relative_to(onbtn);
        }
        this.el.show_all();
       
        while(Gtk.events_pending()) { 
                Gtk.main_iteration();
        }       
     //   this.hpane.el.set_position( 0);
    }
    public class Xcls_compile_view : Object
    {
        public Gtk.Box el;
        private Xcls_ValaCompileResults  _this;


            // my vars (def)

        // ctor
        public Xcls_compile_view(Xcls_ValaCompileResults _owner )
        {
            _this = _owner;
            _this.compile_view = this;
            this.el = new Gtk.Box( Gtk.Orientation.VERTICAL, 0 );

            // my vars (dec)

            // set gobject values
            this.el.homogeneous = false;
            var child_0 = new Xcls_ScrolledWindow3( _this );
            child_0.ref();
            this.el.pack_end (  child_0.el , true,true,0 );
        }

        // user defined functions
    }
    public class Xcls_ScrolledWindow3 : Object
    {
        public Gtk.ScrolledWindow el;
        private Xcls_ValaCompileResults  _this;


            // my vars (def)

        // ctor
        public Xcls_ScrolledWindow3(Xcls_ValaCompileResults _owner )
        {
            _this = _owner;
            this.el = new Gtk.ScrolledWindow( null, null );

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_SourceView4( _this );
            child_0.ref();

            // init method

            {
             this.el.set_policy (Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC);
             
            
            }
        }

        // user defined functions
    }
    public class Xcls_SourceView4 : Object
    {
        public Gtk.SourceView el;
        private Xcls_ValaCompileResults  _this;


            // my vars (def)

        // ctor
        public Xcls_SourceView4(Xcls_ValaCompileResults _owner )
        {
            _this = _owner;
            this.el = new Gtk.SourceView();

            // my vars (dec)

            // set gobject values
            this.el.show_line_numbers = true;

            // init method

            {
            
                var description =   Pango.FontDescription.from_string("monospace");
                description.set_size(8000);
                this.el.override_font(description);
            
            
            }
        }

        // user defined functions
    }



}
