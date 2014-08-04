/* -- to compile
valac  --pkg gio-2.0  --pkg posix  --pkg gtk+-3.0 --pkg libnotify --pkg gtksourceview-3.0  --pkg  libwnck-3.0 \
    /tmp/GladeView.vala  -o /tmp/GladeView
*/


/* -- to test class
static int main (string[] args) {
    Gtk.init (ref args);
    new Xcls_GladeView();
    GladeView.show_all();
     Gtk.main ();
    return 0;
}
*/


public static Xcls_GladeView  GladeView;

public class Xcls_GladeView : Object 
{
    public Glade.DesignView el;
    private Xcls_GladeView  _this;

    public static Xcls_GladeView singleton()
    {
        if (GladeView == null) {
            GladeView= new Xcls_GladeView();
        }
        return GladeView;
    }

        // my vars
    public JsRender.JsRender file;

        // ctor 
    public Xcls_GladeView()
    {
        _this = this;
        this.el = new Glade.DesignView(new Glade.Project());

        // my vars
        this.file = null;

        // set gobject values
    }

    // userdefined functions 
    public void createThumb() {
            
            
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
    public void loadFile(JsRender.JsRender file)
        {
            this.file = file;
                // clear existing elements from project?
                
                var  p = this.el.get_project();
                var    li = p.get_objects().copy();
                // should remove all..
                for (var i =0;    i < li.length(); i++) {   
                    p.remove_object(li.nth_data(i)); 
                }
        
        //        print("%s\n",tf.tree.toJsonString());
        	var x = new JsRender.NodeToGlade(file.tree,  "");
        
        	 
        	FileIOStream iostream;
        	var  f = File.new_tmp ("tpl-XXXXXX.glade", out iostream);
        	var ostream = iostream.output_stream;
        	var dostream = new DataOutputStream (ostream);
        	dostream.put_string (x.munge());
        	this.el.show();
        	 print("LOADING %s\n",f.get_path ());
                p.load_from_file(f.get_path ());
                
         
        
        }

    // skip |xns - no return type
}
