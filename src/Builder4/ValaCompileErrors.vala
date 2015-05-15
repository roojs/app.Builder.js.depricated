static ValaCompileErrors  _ValaCompileErrors;

public class ValaCompileErrors : Object 
{
    public Gtk.Popover el;
    private ValaCompileErrors  _this;

    public static ValaCompileErrors singleton()
    {
        if (_ValaCompileErrors == null) {
            _ValaCompileErrors= new ValaCompileErrors();
        }
        return _ValaCompileErrors;
    }
    public Xcls_compile_tree compile_tree;
    public Xcls_compile_result_store compile_result_store;
    public Xcls_renderer renderer;

        // my vars (def)

    // ctor 
    public ValaCompileErrors()
    {
        _this = this;
        this.el = new Gtk.Popover( null );

        // my vars (dec)

        // set gobject values
        var child_0 = new Xcls_HPaned2( _this );
        child_0.ref();
        this.el.pack_start (  child_0.el , true,true,0 );
    }

    // user defined functions 
    public class Xcls_HPaned2 : Object 
    {
        public Gtk.HPaned el;
        private ValaCompileErrors  _this;


            // my vars (def)

        // ctor 
        public Xcls_HPaned2(ValaCompileErrors _owner )
        {
            _this = _owner;
            this.el = new Gtk.HPaned();

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_ScrolledWindow3( _this );
            child_0.ref();
            this.el.add (  child_0.el  );
            var child_1 = new Xcls_ScrolledWindow8( _this );
            child_1.ref();
            this.el.add (  child_1.el  );
        }

        // user defined functions 
    }
    public class Xcls_ScrolledWindow3 : Object 
    {
        public Gtk.ScrolledWindow el;
        private ValaCompileErrors  _this;


            // my vars (def)

        // ctor 
        public Xcls_ScrolledWindow3(ValaCompileErrors _owner )
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
        private ValaCompileErrors  _this;


            // my vars (def)

        // ctor 
        public Xcls_compile_tree(ValaCompileErrors _owner )
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
        private ValaCompileErrors  _this;


            // my vars (def)

        // ctor 
        public Xcls_compile_result_store(ValaCompileErrors _owner )
        {
            _this = _owner;
            _this.compile_result_store = this;
            this.el = new Gtk.TreeStore( 4,   typeof(string), typeof(int), typeof(string), typeof(string)  );

            // my vars (dec)

            // set gobject values
        }

        // user defined functions 
        public void nodeAppendOrCreate (Gtk.TreePath  par, string id, string file, int line, string message) {
        
            Gtk.TreeIter piter;
             
            this.el.get_iter(out piter, par);
             
            // loop through parent childnre
            Gtk.TreeIter iter; 
            var loop =  par == null ? 
                this.el.iter_children(out iter, null) :
                 this.el.iter_children(out iter,  piter);
            
            while (loop) {
                GLib.Value val;
                this.el.get_value(iter, 0, out val);
                var sval = (string)val;
                if (sval == id) {
                    GLib.Value mval;
                    this.el.get_value(iter, 2, out mval);
                    var smval = (string)mval;
                    mval.set_string(smval + "\n" + GLib.Markup.escape_text(message)); //markup?
                
                    return;
                }
                loop = this.el.iter_next(ref iter);    
            }
            
            // create the node...
            if (par == null) {
                this.el.append(out iter, null);
            } else {
                this.el.append(out iter, piter);
            }
            this.el.set(iter, 0, id, 1, line,2, GLib.Markup.escape_text("%d: %s".printf(line,message)), 3, file,-1);
                
            return ;
        
        }
        public Gtk.TreePath nodeFindOrCreate (Gtk.TreePath? par, string id, string title) {
        
        
            //print("looking for %s\n", id);
            // loop through parent childnre
            Gtk.TreeIter piter   ;
            Gtk.TreeIter iter;
            var loop = true;
            if (par != null) {
                this.el.get_iter(out piter, par);
                loop = this.el.iter_children(out iter,  piter);
            } else {
                loop = this.el.iter_children(out iter, null) ;
            }
                 
                 
            while (loop) {
                GLib.Value val;
                this.el.get_value(iter, 0, out val);
                var sval = (string)val;
                //print("got node %s", sval);
                if (sval == id) {
                    return this.el.get_path(iter);
                }
                loop = this.el.iter_next(ref iter);    
            }
            // create the node...
             if (par == null) {
                this.el.append(out iter, null);
            } else {
              this.el.get_iter(out piter, par);
                this.el.append(out iter, piter);
            }
            //print("add iter %s / %s", id, title);
            this.el.set(iter, 0, id, 1, 0, 2, title, 3, "",-1);
               
            return   this.el.get_path(iter);
        
        }
    }
    public class Xcls_column : Object 
    {
        public Gtk.TreeViewColumn el;
        private ValaCompileErrors  _this;


            // my vars (def)

        // ctor 
        public Xcls_column(ValaCompileErrors _owner )
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
        private ValaCompileErrors  _this;


            // my vars (def)

        // ctor 
        public Xcls_renderer(ValaCompileErrors _owner )
        {
            _this = _owner;
            _this.renderer = this;
            this.el = new Gtk.CellRendererText();

            // my vars (dec)

            // set gobject values
        }

        // user defined functions 
    }
    public class Xcls_ScrolledWindow8 : Object 
    {
        public Gtk.ScrolledWindow el;
        private ValaCompileErrors  _this;


            // my vars (def)

        // ctor 
        public Xcls_ScrolledWindow8(ValaCompileErrors _owner )
        {
            _this = _owner;
            this.el = new Gtk.ScrolledWindow( null, null );

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_SourceView9( _this );
            child_0.ref();
            this.el.add (  child_0.el  );
        }

        // user defined functions 
    }
    public class Xcls_SourceView9 : Object 
    {
        public Gtk.SourceView el;
        private ValaCompileErrors  _this;


            // my vars (def)

        // ctor 
        public Xcls_SourceView9(ValaCompileErrors _owner )
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
