/**
 * as state management is a bit too complicated inside the builder
 * it's better to seperate this into this class
 * 
 * 
 */
public class WindowState : Object 
{
    public MainWindow win;
    

    
        // my vars (def)

    // ctor 
    public About(MainWindow win)
    {
	this.win = win;
	// initialize
	this.propsInit();
	this.listenerInit();
    }


    // -----------  properties
    // listener uses the properties 
    public propsInit()
    {
	// Add properties
	    this.win.add_props  = new Xcls_WindowAddProp();
	    this.add_props.ref();  /// really?
	    ((Gtk.Container)(this.win.addpropsview.el.get_widget())).add(this.win.add_props.el);
	    //this.projectsettings.el.show_all();

	    var  stage = _this.win.addpropsview.el.get_stage();
	    stage.set_background_color(  Clutter.Color.from_string("#000"));
	
	
	    _this.win.add_props.select.connect( (key,type,skel, etype) => {
		this.win.left_props.addProp(etype, key, skel, type);
	    });
    }
    public propsShow()
    {

    }
    public propsHide()
    {
	
    }
    
    // ----------- Add / Edit listener
    // listener uses the properties 
    public listenerInit()
    {

    }
    public listenerShow()
    {

    }
    public listenerHide()
    {
	
    }