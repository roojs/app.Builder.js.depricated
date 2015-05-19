static Xcls_GtkView  _GtkView;

public class Xcls_GtkView : Object
{
    public Gtk.VBox el;
    private Xcls_GtkView  _this;

    public static Xcls_GtkView singleton()
    {
        if (_GtkView == null) {
            _GtkView= new Xcls_GtkView();
        }
        return _GtkView;
    }
    public Xcls_label_preview label_preview;
    public Xcls_label_code label_code;
    public Xcls_view_layout view_layout;
    public Xcls_container container;
    public Xcls_sourceview sourceview;

        // my vars (def)
    public Gtk.Widget lastObj;
    public int width;
    public Xcls_MainWindow main_window;
    public JsRender.JsRender file;
    public int height;

    // ctor
    public Xcls_GtkView()
    {
        _this = this;
        this.el = new Gtk.VBox( true, 0 );

        // my vars (dec)
        this.lastObj = null;
        this.width = 0;
        this.file = null;
        this.height = 0;

        // set gobject values
        var child_0 = new Xcls_Notebook2( _this );
        child_0.ref();
        this.el.pack_start (  child_0.el , true,true,0 );

        //listeners
        this.el.size_allocate.connect( (aloc) => {
        
            this.width = aloc.width;
            this.height =aloc.height;
            });
    }

    // user defined functions
    public void createThumb () {
        
        
        if (this.file == null) {
            return;
        }
        var filename = this.file.getIconFileName(false);
        
        var  win = this.el.get_parent_window();
        var width = win.get_width();
        var height = win.get_height();
    
        Gdk.Pixbuf screenshot = Gdk.pixbuf_get_from_window(win, 0, 0, width, height); // this.el.position?
    
        screenshot.save(filename,"png");
        return;
        
        
        
        
        
         
        
        // should we hold until it's printed...
        
          
    
        
        
    
    
        
         
    }
    public void loadFile (JsRender.JsRender file) 
    {
            this.file = null;
            
            if (file.tree == null) {
                return;
            }
            this.file = file;
            if (this.lastObj != null) {
                this.container.el.remove(this.lastObj);
            }
            
            // hide the compile view at present..
              
            
            var w = this.width;
            var h = this.height;
            
            print("ALLOC SET SIZES %d, %d\n", w,h); 
            
            // set the container size min to 500/500 or 20 px less than max..
            w = int.max (w-20, 500);
            h = int.max (h-20, 500); 
            
            print("SET SIZES %d, %d\n", w,h);       
            _this.container.el.set_size_request(w,h);
            
            _this.view_layout.el.set_size(w,h); // should be baded on calc.. -- see update_scrolled.
            var rgba = Gdk.RGBA ();
            rgba.parse ("#ccc");
            _this.view_layout.el.override_background_color(Gtk.StateFlags.NORMAL, rgba);
            
            
    	var x = new JsRender.NodeToGtk(file.tree);
            var obj = x.munge() as Gtk.Widget;
            this.lastObj = null;
    	if (obj == null) {
            	return;
    	}
    	this.lastObj = obj;
            
            this.container.el.add(obj);
            obj.show_all();
            
             
            
    }
    public class Xcls_Notebook2 : Object
    {
        public Gtk.Notebook el;
        private Xcls_GtkView  _this;


            // my vars (def)

        // ctor
        public Xcls_Notebook2(Xcls_GtkView _owner )
        {
            _this = _owner;
            this.el = new Gtk.Notebook();

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_label_preview( _this );
            child_0.ref();
            var child_1 = new Xcls_label_code( _this );
            child_1.ref();
            var child_2 = new Xcls_ScrolledWindow5( _this );
            child_2.ref();
            this.el.append_page (  child_2.el , _this.label_preview.el );
            var child_3 = new Xcls_ScrolledWindow8( _this );
            child_3.ref();
            this.el.append_page (  child_3.el , _this.label_code.el );
        }

        // user defined functions
    }
    public class Xcls_label_preview : Object
    {
        public Gtk.Label el;
        private Xcls_GtkView  _this;


            // my vars (def)

        // ctor
        public Xcls_label_preview(Xcls_GtkView _owner )
        {
            _this = _owner;
            _this.label_preview = this;
            this.el = new Gtk.Label( "Preview" );

            // my vars (dec)

            // set gobject values
        }

        // user defined functions
    }

    public class Xcls_label_code : Object
    {
        public Gtk.Label el;
        private Xcls_GtkView  _this;


            // my vars (def)

        // ctor
        public Xcls_label_code(Xcls_GtkView _owner )
        {
            _this = _owner;
            _this.label_code = this;
            this.el = new Gtk.Label( "Code" );

            // my vars (dec)

            // set gobject values
        }

        // user defined functions
    }

    public class Xcls_ScrolledWindow5 : Object
    {
        public Gtk.ScrolledWindow el;
        private Xcls_GtkView  _this;


            // my vars (def)

        // ctor
        public Xcls_ScrolledWindow5(Xcls_GtkView _owner )
        {
            _this = _owner;
            this.el = new Gtk.ScrolledWindow( null, null );

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_view_layout( _this );
            child_0.ref();
            this.el.add (  child_0.el  );
        }

        // user defined functions
    }
    public class Xcls_view_layout : Object
    {
        public Gtk.Layout el;
        private Xcls_GtkView  _this;


            // my vars (def)

        // ctor
        public Xcls_view_layout(Xcls_GtkView _owner )
        {
            _this = _owner;
            _this.view_layout = this;
            this.el = new Gtk.Layout( null, null );

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_container( _this );
            child_0.ref();
            this.el.put (  child_0.el , 10,10 );
        }

        // user defined functions
    }
    public class Xcls_container : Object
    {
        public Gtk.HBox el;
        private Xcls_GtkView  _this;


            // my vars (def)

        // ctor
        public Xcls_container(Xcls_GtkView _owner )
        {
            _this = _owner;
            _this.container = this;
            this.el = new Gtk.HBox( true, 0 );

            // my vars (dec)

            // set gobject values
        }

        // user defined functions
    }



    public class Xcls_ScrolledWindow8 : Object
    {
        public Gtk.ScrolledWindow el;
        private Xcls_GtkView  _this;


            // my vars (def)

        // ctor
        public Xcls_ScrolledWindow8(Xcls_GtkView _owner )
        {
            _this = _owner;
            this.el = new Gtk.ScrolledWindow( null, null );

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_sourceview( _this );
            child_0.ref();
            this.el.add (  child_0.el  );
        }

        // user defined functions
    }
    public class Xcls_sourceview : Object
    {
        public Gtk.SourceView el;
        private Xcls_GtkView  _this;


            // my vars (def)
        public string curfname;

        // ctor
        public Xcls_sourceview(Xcls_GtkView _owner )
        {
            _this = _owner;
            _this.sourceview = this;
            this.el = new Gtk.SourceView();

            // my vars (dec)

            // set gobject values
            this.el.editable = false;
            this.el.show_line_marks = true;
            this.el.show_line_numbers = true;

            // init method

            {
                this.curfname = "";
                   var description =   Pango.FontDescription.from_string("monospace");
                description.set_size(8000);
                this.el.override_font(description);
            
                var attrs = new Gtk.SourceMarkAttributes();
                var  pink = new Gdk.RGBA();
                pink.parse ( "pink");
                attrs.set_background ( pink);
                attrs.set_icon_name ( "process-stop");    
                attrs.query_tooltip_text.connect(( mark) => {
                    //print("tooltip query? %s\n", mark.name);
                    return mark.name;
                });
                
                this.el.set_mark_attributes ("error", attrs, 1);
                
            }
        }

        // user defined functions
        public void loadFile (string fname, int line ) {
        
            
            // resize the view...
            
            
            //if (_this.hpane.el.get_position() < 1) {
                // left tree = 250, editor area = 500?
                 int w,h;
                _this.window.el.get_size(out w, out h);
                
                var new_w = int.min(750, w-100);
                if (new_w > (w-100)) {
                    new_w = w-100;
                }
                _this.el.set_size_request( int.max(100, new_w), int.max(100, h-120));
                
                // let it resize, then find out the new size..
                while(Gtk.events_pending()) { 
                    Gtk.main_iteration();
                }
                
                _this.hpane.el.set_position( _this.hpane.el.max_position - 250);
        
            //}
        
            var buf = ((Gtk.SourceBuffer)(this.el.get_buffer()));
              
            if (this.curfname != fname) {
                this.curfname = fname;
                
                
                Regex regex = new Regex("\\.vala$");
        
                var bjsf = regex.replace(fname,fname.length , 0 , ".bjs");
                
                var p = _this.window.project;
                
                var jsr = p.getByPath(bjsf);
                
                if (_this.file != null) {
                    // remove listeners from the file...
                }
                
                _this.file = null;
                
                if (jsr != null) {
                    _this.file = jsr;
                    
                   // return;
                
                }
                
                
                
        
                Gtk.TextIter start;
                Gtk.TextIter end;     
                buf.get_bounds (out start, out end);
                    
                buf.remove_source_marks (start, end, null);
                     
                 
                
                string str;
                FileUtils.get_contents(fname, out str);
        			
                buf.set_text(str, str.length);
                var lm = Gtk.SourceLanguageManager.get_default();
                
               
                buf.set_language(lm.get_language("vala"));
             
                 
                this.el.grab_focus();
        
        
               
                var lines = _this.notices.get_object_member(fname);
                 
                    
                lines.foreach_member((obj, line, node) => {
                    
                         Gtk.TextIter iter;
                //        print("get inter\n");
                        var eline = int.parse(line) -1 ;
                         
                        
                        buf.get_iter_at_line( out iter, eline);
                        //print("mark line\n");
                        var msg  = "Line: %d".printf(eline+1);
                        var ar = lines.get_array_member(line);
                        for (var i = 0 ; i < ar.get_length(); i++) {
        		        msg += (msg.length > 0) ? "\n" : "";
        		        msg += ar.get_string_element(i);
        	        }
                        
                        
                        buf.create_source_mark(msg, "error", iter);
                    } );
            }
            // jump to the line...
            Gtk.TextIter liter;
            buf.get_iter_at_line (out liter,  line);
            print("Scroll to \n");
            this.el.scroll_to_iter (liter, 0.0f, false, 0.0f, 0.5f);
            print("End Scroll to \n");
        
        
        }
    }



}
