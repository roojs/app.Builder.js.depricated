static Xcls_GtkView  _GtkView;

public class Xcls_GtkView : Object 
{
    public Gtk.Viewport el;
    private Xcls_GtkView  _this;

    public static Xcls_GtkView singleton()
    {
        if (_GtkView == null) {
            _GtkView= new Xcls_GtkView();
        }
        return _GtkView;
    }
    public Xcls_container container;

        // my vars (def)

    // ctor 
    public Xcls_GtkView()
    {
        _this = this;
        this.el = new Gtk.Viewport( null, null );

        // my vars (dec)

        // set gobject values
        var child_0 = new Xcls_container( _this );
        child_0.ref();
        this.el.add (  child_0.el  );
    }

    // user defined functions 
    public void addNode (JsRender.JsRender file) {  
    {
        
    
    
            // clear existing elements from project?
            
    
            if (file.tree == null) {
                return;
            }
    
    //        print("%s\n",tf.tree.toJsonString());
    	var x = new JsRender.NodeToGlade(file.tree,  "");
            Builder.from_string (x.munge())
    	 
    	FileIOStream iostream;
    	var  f = File.new_tmp ("tpl-XXXXXX.glade", out iostream);
    	var ostream = iostream.output_stream;
    	var dostream = new DataOutputStream (ostream);
    	dostream.put_string (x.munge());
    	this.el.show();
    	 print("LOADING %s\n",f.get_path ());
            p.load_from_file(f.get_path ());
            
     
    
    }
    
    }
    public void addNodeChildren (Object? parent, JsRender.Node node) { 
    
        var iter = node.items.list_iterator();
        while (iter.next()) {
            this.addNode(parent, iter.get());
        }
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
}
