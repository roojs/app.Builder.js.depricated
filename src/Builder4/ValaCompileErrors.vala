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
    public Xcls_save_btn save_btn;
    public Xcls_hpane hpane;
    public Xcls_compile_tree compile_tree;
    public Xcls_compile_result_store compile_result_store;
    public Xcls_renderer renderer;
    public Xcls_sourceview sourceview;

        // my vars (def)
    public Xcls_MainWindow window;
    public bool close;
    public Json.Object notices;

    // ctor 
    public Xcls_ValaCompileErrors()
    {
        _this = this;
        this.el = new Gtk.Popover( null );

        // my vars (dec)
        this.close = false;

        // set gobject values
        this.el.width_request = 900;
        this.el.height_request = 800;
        this.el.modal = true;
        this.el.position = Gtk.PositionType.TOP;
        var child_0 = new Xcls_compile_view( _this );
        child_0.ref();
        this.el.add (  child_0.el  );

        // listeners 
        this.el.closed.connect( () => {
            if (this.close) {
                return;
            }
            this.el.show();
        });
    }

    // user defined functions 
    public void show (Json.Object tree, Gtk.Widget onbtn) {
    
            this.notices = tree;
            this.close = false;
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
        
        var new_w = int.min(750, w-100);
        if (new_w > (w-100)) {
            new_w = w-100;
        }
        this.el.set_size_request( int.max(100, new_w), int.max(100, h-120));
    
        
        this.hpane.el.set_position(250);
       if (this.el.relative_to == null) {
            this.el.set_relative_to(onbtn);
        }
        this.el.show_all();
        this.save_btn.el.hide();          
    
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
            var child_1 = new Xcls_Button5( _this );
            child_1.ref();
            this.el.pack_start (  child_1.el , true,true,0 );
            var child_2 = new Xcls_save_btn( _this );
            child_2.ref();
            this.el.pack_start (  child_2.el , true,true,0 );
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
    public class Xcls_Button5 : Object 
    {
        public Gtk.Button el;
        private Xcls_ValaCompileErrors  _this;


            // my vars (def)

        // ctor 
        public Xcls_Button5(Xcls_ValaCompileErrors _owner )
        {
            _this = _owner;
            this.el = new Gtk.Button();

            // my vars (dec)

            // set gobject values
            this.el.label = "Edit";

            // listeners 
            this.el.clicked.connect( () => {
                // is the file managed by the builder?
                
                var f = _this.sourceview.curfname;
                
                Regex regex = new Regex("\\.vala$");
            
                var bjsf = regex.replace(f,f.length , 0 , ".bjs");
                
                var p = _this.window.project;
                
                
                
                var jsr = p.getByPath(bjsf);
                if (jsr != null) {
                    _this.window.windowstate.fileViewOpen(jsr);
                    
                    return;
                
                }
            
            
            });
        }

        // user defined functions 
    }
    public class Xcls_save_btn : Object 
    {
        public Gtk.Button el;
        private Xcls_ValaCompileErrors  _this;


            // my vars (def)

        // ctor 
        public Xcls_save_btn(Xcls_ValaCompileErrors _owner )
        {
            _this = _owner;
            _this.save_btn = this;
            this.el = new Gtk.Button();

            // my vars (dec)

            // set gobject values
            this.el.label = "Save";
            this.el.visible = false;
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
            var child_0 = new Xcls_ScrolledWindow8( _this );
            child_0.ref();
            this.el.add (  child_0.el  );
            var child_1 = new Xcls_ScrolledWindow13( _this );
            child_1.ref();
            this.el.add (  child_1.el  );
        }

        // user defined functions 
    }
    public class Xcls_ScrolledWindow8 : Object 
    {
        public Gtk.ScrolledWindow el;
        private Xcls_ValaCompileErrors  _this;


            // my vars (def)

        // ctor 
        public Xcls_ScrolledWindow8(Xcls_ValaCompileErrors _owner )
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

            // init method 

            {
             var description = new Pango.FontDescription();
                description.set_size(8000);
                this.el.modify_font(description);
            
            }

            // listeners 
            this.el.cursor_changed.connect( () => {
                var sel = this.el.get_selection();
             
                        if (sel.count_selected_rows() < 1) {
            
                            print("selected rows < 1\n");
                            //??this.mo 
                            return  ;
                        }
                            
                            //console.log('changed');
                         
                         Gtk.TreeIter iter;
                         Gtk.TreeModel mod;
                        sel.get_selected(out mod, out iter);
                        /*
                         store.set(citer, 
                                0, file + ":" + line, 
                                1, int.parse(line), 
                                2, GLib.Markup.escape_text(line + ": " + msg), 
                                3, file,-1);
                        
                        });
                        */
                        
                        
                        
                        // var val = "";
                        GLib.Value value;
                        _this.compile_result_store.el.get_value(iter, 3, out value);
                        var fname = (string)value;
                        GLib.Value lvalue;
                        _this.compile_result_store.el.get_value(iter, 1, out lvalue);
                        var line = (int) lvalue;
                        
                        print ("loadfile %s : %d", fname,line);
                        
                        _this.sourceview.loadFile(fname, line);
                        
                        
                        
                        
            });
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
    public class Xcls_ScrolledWindow13 : Object 
    {
        public Gtk.ScrolledWindow el;
        private Xcls_ValaCompileErrors  _this;


            // my vars (def)

        // ctor 
        public Xcls_ScrolledWindow13(Xcls_ValaCompileErrors _owner )
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
        private Xcls_ValaCompileErrors  _this;


            // my vars (def)
        public string curfname;

        // ctor 
        public Xcls_sourceview(Xcls_ValaCompileErrors _owner )
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
          var buf = ((Gtk.SourceBuffer)(this.el.get_buffer()));
              
            if (this.curfname != fname) {
                this.curfname = fname;
        
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
