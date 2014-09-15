Gtk = imports.gi.Gtk;
Gdk = imports.gi.Gdk;
Pango = imports.gi.Pango;
GLib = imports.gi.GLib;
Gio = imports.gi.Gio;
GObject = imports.gi.GObject;
GtkSource = imports.gi.GtkSource;
WebKit = imports.gi.WebKit;
Vte = imports.gi.Vte;
console = imports.console;
XObject = imports.XObject.XObject;
ProjectSettings=new XObject({
    buttonPressed : "(string btn)",
    id : "ProjectSettings",
    show : (Project.Project project) {
        _this.project = project;
        _this.path.el.label = project.firstPath();
        // get the active project.
         var lm = Gtk.SourceLanguageManager.get_default();
                    
        ((Gtk.SourceBuffer)(_this.view.el.get_buffer())) .set_language(
        
            lm.get_language("html"));
      
        //print (project.fn);
        //project.runhtml = project.runhtml || '';
        _this.view.el.get_buffer().set_text(project.runhtml);
        
           
        _this.rootURL.el.set_text( _this.project.rootURL );
        _this.base_template.el.set_text(_this.project.base_template);    
       
        
        //this.el.show_all();
    },
    project : "",
    xtype : "VBox",
    save : ()
    {
       var buf =    _this.view.el.get_buffer();
       Gtk.TextIter s;
         Gtk.TextIter e;
        buf.get_start_iter(out s);
        buf.get_end_iter(out e);
          _this.project.runhtml = buf.get_text(s,e,true);
          
        _this.project.rootURL = _this.rootURL.el.get_text();
        _this.project.base_template = _this.base_template.el.get_text();    
        
        
    },
    xns : Gtk,
    border_width : 5,
    homogeneous : FALSE,
    items : [
    	{
            xtype : "HBox",
            expand : false,
            xns : Gtk,
            homogeneous : TRUE,
            items : [
            	{
                    label : "Apply",
                    xtype : "Button",
                    xns : Gtk,
                    listeners : {
                    	button_press_event : () => {
                    	       _this.save();
                    	             
                    	       _this.buttonPressed("apply");
                    	           return false;
                    	   }
                    }
                },
            	{
                    label : "Save",
                    xtype : "Button",
                    xns : Gtk,
                    listeners : {
                    	button_press_event : () => {
                    	          _this.save();
                    	             
                    	       _this.buttonPressed("save");
                    	           return false;
                    	   }
                    }
                }
            ]

        },
    	{
            label : "filename",
            id : "path",
            xalign : 0,
            xtype : "Label",
            xns : Gtk
        },
    	{
            label : "HTML To insert at end of <HEAD>",
            xtype : "Label",
            xns : Gtk
        },
    	{
            xtype : "HBox",
            expand : false,
            xns : Gtk,
            homogeneous : FALSE,
            items : [
            	{
                    label : "HTML template file",
                    xtype : "Label",
                    xns : Gtk
                },
            	{
                    id : "base_template",
                    xtype : "Entry",
                    xns : Gtk
                }
            ]

        },
    	{
            xtype : "HBox",
            xns : Gtk,
            homogeneous : FALSE,
            items : [
            	{
                    label : "root URL",
                    xtype : "Label",
                    xns : Gtk
                },
            	{
                    id : "rootURL",
                    xtype : "Entry",
                    xns : Gtk
                }
            ]

        },
    	{
            xtype : "ScrolledWindow",
            xns : Gtk,
            items : [
            	{
                    id : "view",
                    xtype : "View",
                    xns : GtkSource,
                    listeners : {
                    	key_release_event : ( event) =>{
                    	       if (event.keyval != 115) {
                    	           return false;
                    	            
                    	       }
                    	       if   ( (event.state & Gdk.ModifierType.CONTROL_MASK ) < 1 ) {
                    	           return false;
                    	       }
                    	        var buf =    this.el.get_buffer();
                    	       Gtk.TextIter s;
                    	       Gtk.TextIter e;
                    	       buf.get_start_iter(out s);
                    	       buf.get_end_iter(out e);
                    	       _this.project.runhtml = buf.get_text(s,e,true);
                    	       
                    	             
                    	       _this.buttonPressed("save");
                    	        
                    	       return false;
                    	            
                    	   }
                    }
                }
            ]

        }
    ]

});
ProjectSettings.init();
XObject.cache['/ProjectSettings'] = ProjectSettings;
