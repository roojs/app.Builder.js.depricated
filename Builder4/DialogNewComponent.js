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
    xtype: Gtk.Dialog,
    listeners : {
        delete_event : (self, event) => {
            this.el.hide();
            return true;   
        },
        response : (self, response_id) =>  { 
          
        	if (response_id < 1) { // cancel!
                    this.el.hide();
                    return;
                }
        
                if (_this.name.el.get_text().length  < 1) {
                    StandardErrorDialog.show(
                        "You have to set Component name "
                    );
                     
                    return;
                }
                // what does this do?
                
                var isNew = _this.file.name.length  > 0 ? false : true;
                
                if (!isNew && this.file.name != _this.name.el.get_text()) {
                    StandardErrorDialog.show(
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
                    _this.file.title = _this.title.el.get_text();
                    _this.file.region = _this.region.el.get_text();            
                    _this.file.parent = _this.parent.el.get_text();                        
                    _this.file.permname = _this.permname.el.get_text();                                    
                    _this.file.modOrder = _this.modOrder.el.get_text();                                                
                
                    _this.file.save();
                    this.el.hide();
                    return;
                }
                var fn = this.name.el.get_text();
               
               var f =  JsRender.JsRender.factory(
                        _this.file.project.xtype,  
                        _this.file.project, 
                        fn);
        
                this.updateFileFromEntry();
                
        	var dir = _this.project.firstPath();
        	//FIXME...
                //for (var i in this.project.paths) {
         	//	dir = i;
        	//	break;
        	//}
        
         
                
                // what about .js ?
                if (GLib.FileUtils.test(_this.file.name + ".bjs", GLib.FileTest.EXISTS)) {
                    StandardErrorDialog.show(
                        "That file already exists"
                    ); 
                    return;
                }
                this.el.hide();
                
                
                //var tmpl = this.project.loadFileOnly(DialogNewComponent.get('template').getValue());
                 
                var nf = _this.project.create(dir + "/" + _this.file.name + ".bjs");
                //for (var i in this.file) {
                //    nf[i] = this.file[i];
                //}
                _this.success(_this.project, nf);
                /*
        
                -- fixme -- needs to be a signal..
                if (DialogNewComponent.success != null) {
                    DialogNewComponent.success(_this.project, nf);
                }
                */
        },
        show : (self)  => {
          this.el.show_all();
          
        }
    },
    default_height : 200,
    default_width : 500,
    id : "DialogNewComponent",
    title : "New Component",
    deletable : false,
    modal : true,
    'void:show' : (JsRender.JsRender c) 
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
    items : [
        {
            xtype: Gtk.VBox,
            pack : get_content_area().add,
            items : [
                {
                    xtype: Gtk.Table,
                    n_columns : 2,
                    n_rows : 3,
                    pack : "pack_start,false,false,0",
                    homogeneous : false,
                    items : [
                        {
                            xtype: Gtk.Label,
                            label : "Component Name",
                            pack : "attach_defaults,0,1,0,1",
                            x_options : 4,
                            xalign : 0.9,
                            justify : Gtk.Justification.RIGHT
                        },
                        {
                            xtype: Gtk.Entry,
                            id : "name",
                            pack : "attach_defaults,1,2,0,1",
                            visible : true
                        },
                        {
                            xtype: Gtk.Label,
                            label : "Title",
                            pack : "attach_defaults,0,1,1,2",
                            x_options : 4,
                            xalign : 0.9,
                            justify : Gtk.Justification.RIGHT,
                            visible : true
                        },
                        {
                            xtype: Gtk.Entry,
                            id : "title",
                            pack : "attach_defaults,1,2,1,2",
                            visible : true
                        },
                        {
                            xtype: Gtk.Label,
                            label : "Region",
                            pack : "attach_defaults,0,1,2,3",
                            tooltip_text : "center, north, south, east, west",
                            x_options : 4,
                            xalign : 0.9,
                            justify : Gtk.Justification.RIGHT,
                            visible : true
                        },
                        {
                            xtype: Gtk.Entry,
                            id : "region",
                            pack : "attach_defaults,1,2,2,3",
                            visible : true
                        },
                        {
                            xtype: Gtk.Label,
                            label : "Parent Name",
                            pack : "attach_defaults,0,1,3,4",
                            x_options : 4,
                            xalign : 0.9,
                            justify : Gtk.Justification.RIGHT,
                            visible : true
                        },
                        {
                            xtype: Gtk.Entry,
                            id : "parent",
                            pack : "attach_defaults,1,2,3,4",
                            visible : true
                        },
                        {
                            xtype: Gtk.Label,
                            label : "Permission Name",
                            pack : "attach_defaults,0,1,4,5",
                            x_options : 4,
                            xalign : 0.9,
                            justify : Gtk.Justification.RIGHT,
                            visible : true
                        },
                        {
                            xtype: Gtk.Entry,
                            id : "permname",
                            pack : "attach_defaults,1,2,4,5",
                            visible : true
                        },
                        {
                            xtype: Gtk.Label,
                            label : "Order (for tabs)",
                            pack : "attach_defaults,0,1,5,6",
                            x_options : 4,
                            xalign : 0.9,
                            justify : Gtk.Justification.RIGHT,
                            visible : true
                        },
                        {
                            xtype: Gtk.Entry,
                            id : "modOrder",
                            pack : "attach_defaults,1,2,5,6",
                            visible : true
                        }
                    ]
                }
            ]
        },
        {
            xtype: Gtk.Button,
            pack : "add_action_widget,0",
            label : "Cancel"
        },
        {
            xtype: Gtk.Button,
            pack : "add_action_widget,1",
            label : "OK"
        }
    ]
});
DialogNewComponent.init();
XObject.cache['/DialogNewComponent'] = DialogNewComponent;
