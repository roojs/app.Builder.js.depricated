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
DialogNewComponent=new XObject({
    updateFileFromEntry : () {
    
            _this.file.title = _this.title.el.get_text();
            _this.file.region = _this.region.el.get_text();            
            _this.file.parent = _this.parent.el.get_text();                        
            _this.file.permname = _this.permname.el.get_text();                                    
            _this.file.modOrder = _this.modOrder.el.get_text();                                                
    },
    success : "(Project.Project pr, JsRender.JsRender file)",
    id : "DialogNewComponent",
    default_width : 500,
    deletable : TRUE,
    project : "",
    title : "New Component",
    xtype : "Dialog",
    show : (JsRender.JsRender c) 
    {
        this.project = c.project;
        
        //if (!this.el) {
            //this.init();
         //}
        
        _this.name.el.set_text(c.name);
        _this.title.el.set_text(c.title);
        _this.parent.el.set_text(c.parent);    
        _this.region.el.set_text(c.region);
        _this.modOrder.el.set_text(c.modOrder);
         _this.permname.el.set_text(c.permname);
        
        if (c.path.length > 0) {
            this.el.set_title("Edit File Details - " + c.name);
        } else {
            this.el.set_title("Create New File");
        }
         
        _this.file = c;
        //console.log('show all');
        this.el.show_all();
        
        //this.success = c.success;
        
        
    },
    file : "null",
    default_height : 200,
    modal : TRUE,
    xns : Gtk,
    listeners : {
    	delete_event : (self, event) => {
    	       this.el.hide();
    	       return true; 
    	       //test  
    	   },
    	response : (self, response_id) =>  { 
    	     
    	   	if (response_id < 1) { // cancel!
    	               this.el.hide();
    	               return;
    	           }
    	   
    	           if (_this.name.el.get_text().length  < 1) {
    	               StandardErrorDialog.show(
    	                   this.el,
    	                   "You have to set Component name "
    	               );
    	                
    	               return;
    	           }
    	           // what does this do?
    	           
    	           var isNew = _this.file.name.length  > 0 ? false : true;
    	           
    	           if (!isNew && this.file.name != _this.name.el.get_text()) {
    	               Xcls_StandardErrorDialog.singleton().show(
    	                   this.el,
    	                   "Sorry changing names does not work yet. "
    	               );
    	                
    	               return;
    	           }
    	           
    	            
    	           
    	         
    	           // FIXME - this may be more complicated...
    	           //for (var i in this.def) {
    	           //    this.file[i] =  this.get(i).el.get_text();
    	           //}
    	   
    	           if (!isNew) {
    	                this.updateFileFromEntry();
    	                                                           
    	           
    	               _this.file.save();
    	               this.el.hide();
    	               return;
    	           }
    	           var fn = this.name.el.get_text();
    	           var dir = _this.project.firstPath();
    	          
    	           if (GLib.FileUtils.test(dir + "/" + fn + ".bjs", GLib.FileTest.EXISTS)) {
    	               Xcls_StandardErrorDialog.singleton().show(
    	                   this.el,
    	                   "That file already exists"
    	               ); 
    	               return;
    	           }
    	          
    	          var f =  JsRender.JsRender.factory(
    	                   _this.file.project.xtype,  
    	                   _this.file.project, 
    	                   dir + "/" + fn + ".bjs");
    	   
    	           _this.file = f;
    	           
    	   
    	           
    	           this.updateFileFromEntry();
    	           _this.file.save();
    	           _this.file.project.addFile(_this.file);
    	           
    	   	 
    	           // what about .js ?
    	          
    	           this.el.hide();
    	           
    	           
    	           //var tmpl = this.project.loadFileOnly(DialogNewComponent.get('template').getValue());
    	            
    	           //var nf = _this.project.create(dir + "/" + _this.file.name + ".bjs");
    	           //for (var i in this.file) {
    	           //    nf[i] = this.file[i];
    	           //}
    	           _this.success(_this.project, _this.file);
    	           /*
    	   
    	           -- fixme -- needs to be a signal..
    	           if (DialogNewComponent.success != null) {
    	               DialogNewComponent.success(_this.project, nf);
    	           }
    	           */
    	   },
    	show : (self)  => {
    	     this.el.show_all();
    	     //test
    	   }
    },
    items : [
    	{
            xtype : "VBox",
            pack : get_content_area().add,
            xns : Gtk,
            items : [
            	{
                    xtype : "Table",
                    n_columns : 2,
                    xns : Gtk,
                    n_rows : 3,
                    homogeneous : TRUE,
                    items : [
                    	{
                            label : "Component Name",
                            xalign : 0.900000,
                            xtype : "Label",
                            justify : Gtk.Justification.RIGHT,
                            x_options : 4,
                            xns : Gtk
                        },
                    	{
                            id : "name",
                            visible : TRUE,
                            xtype : "Entry",
                            xns : Gtk
                        },
                    	{
                            label : "Title",
                            visible : TRUE,
                            xalign : 0.900000,
                            xtype : "Label",
                            justify : Gtk.Justification.RIGHT,
                            x_options : 4,
                            xns : Gtk
                        },
                    	{
                            id : "title",
                            visible : TRUE,
                            xtype : "Entry",
                            xns : Gtk
                        },
                    	{
                            label : "Region",
                            tooltip_text : "center, north, south, east, west",
                            visible : TRUE,
                            xalign : 0.900000,
                            xtype : "Label",
                            justify : Gtk.Justification.RIGHT,
                            x_options : 4,
                            xns : Gtk
                        },
                    	{
                            id : "region",
                            visible : TRUE,
                            xtype : "Entry",
                            xns : Gtk
                        },
                    	{
                            label : "Parent Name",
                            visible : TRUE,
                            xalign : 0.900000,
                            xtype : "Label",
                            justify : Gtk.Justification.RIGHT,
                            x_options : 4,
                            xns : Gtk
                        },
                    	{
                            id : "parent",
                            visible : TRUE,
                            xtype : "Entry",
                            xns : Gtk
                        },
                    	{
                            label : "Permission Name",
                            visible : TRUE,
                            xalign : 0.900000,
                            xtype : "Label",
                            justify : Gtk.Justification.RIGHT,
                            x_options : 4,
                            xns : Gtk
                        },
                    	{
                            id : "permname",
                            visible : TRUE,
                            xtype : "Entry",
                            xns : Gtk
                        },
                    	{
                            label : "Order (for tabs)",
                            visible : TRUE,
                            xalign : 0.900000,
                            xtype : "Label",
                            justify : Gtk.Justification.RIGHT,
                            x_options : 4,
                            xns : Gtk
                        },
                    	{
                            id : "modOrder",
                            visible : TRUE,
                            xtype : "Entry",
                            xns : Gtk
                        }
                    ]

                }
            ]

        },
    	{
            label : "Cancel",
            xtype : "Button",
            xns : Gtk
        },
    	{
            label : "OK",
            xtype : "Button",
            xns : Gtk
        }
    ]

});
DialogNewComponent.init();
XObject.cache['/DialogNewComponent'] = DialogNewComponent;
