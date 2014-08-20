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
ClutterFiles=new XObject({
    xtype: Clutter.ScrollActor,
    listeners : {
        scroll_event : ( event) => {
           //Sprint("scroll event");
                    var y = this.filelayout.el.y;
                    var dir = event.direction;
                    switch (dir) {
                        case Clutter.ScrollDirection.UP:
                            y += event.y /2;
                            break;
                        case Clutter.ScrollDirection.DOWN:
                            y -= event.y /2 ;
                            break;
                        default:
                            return false;
                    }
                    // range of scroll -- can go up -- eg.. -ve value.
                    
                    y = float.min(0, y);
                    
                    // to work out the max -ve number
                    // height of filelayout
                    // height of scrollactor..
                    
                    var last_child_bottom = this.filelayout.el.last_child.y +  this.filelayout.el.last_child.height;
                     if ( (-1 * (y+200)) > (  last_child_bottom - this.el.height)) {
                        return  false;
                    }
                
                
                    
                    
                //    print("\nlast child - this height = %f  ==== new y %f\n ".printf( 
                  //          last_child_bottom - this.el.height,
                   //         y));    
                   // y = float.min(0, y);    //??
                   // print("scroll event of %f  - new y = %f ".printf(event.y, y));
                    this.filelayout.el.y = y;
                    return true;
        }
    },
    id : "ClutterFiles",
    scroll_mode : "Clutter.ScrollMode.VERTICAL",
    init : this.fileitems = new Gee.ArrayList<Xcls_fileitem>();,
    reactive : true,
    'void:clearFiles' : () {
        
        this.filelayout.el.remove_all_children();
        // we need to unref all the chidren that we loaded though...
        
    },
    'void:loadProject' : (Project.Project pr) {
        // list all the files, and create new Xcls_fileitem for each one.
        
        // LEAK --- we should unref all the chilren...
        this.filelayout.el.y = 0;
        this.clearFiles();
        
        print("clutter files - load project: " + pr.name +"\n");
        // should unref.. them hopefully.
        this.fileitems = new Gee.ArrayList<Xcls_fileitem>();
    
        var fiter = pr.files.map_iterator();
        while (fiter.next()) {
            var a = new Xcls_fileitem(this,fiter.get_value());
            this.fileitems.add(a);
    
    //        a.ref();
            print("add to clutter file view: " + fiter.get_value().name + "\n");
            this.filelayout.el.add_child(a.el);
        }
        this.el.show_all();
    },
    'void:set_size' : (float w, float h) 
    {
         if (this.el == null) {
            print("object not ready yet?");
            return;
        }
       _this.filelayout_manager.el.max_column_width = w - 150;
       this.el.set_size(this.el.get_stage().width-150,
                            this.el.get_stage().height);
                this.el.set_position(100,50);
    },
    items : [
        {
            xtype: Clutter.Actor,
            id : "filelayout",
            pack : "add_child",
            init : this.el.add_constraint(
                new Clutter.BindConstraint(_this.el,Clutter.BindCoordinate.SIZE, 0.0f)
            );,
            reactive : true,
            items : [
                {
                    xtype: Clutter.Actor,
                    listeners : {
                        enter_event : (  event)  => {
                            this.el.background_color = new Clutter.Color.from_string("#333");
                                return false;
                        },
                        leave_event : (  event)  => {
                            this.el.background_color = new Clutter.Color.from_string("#000");
                            return false;
                        },
                        button_press_event : (  event) => {
                            _this.open(this.file);
                            return false;
                        }
                    },
                    '*args' : "JsRender.JsRender file",
                    id : "*fileitem",
                    pack : false,
                    init : this.file = file;
                    this.el.set_size(100,100);,
                    reactive : true,
                    items : [
                        {
                            xtype: Clutter.Texture,
                            '*args' : "JsRender.JsRender file",
                            id : "+image",
                            pack : "add_child",
                            margin_left : 5,
                            margin_right : 5,
                            margin_top : 5,
                            x_align : Clutter.ActorAlign.START,
                            x_expand : true,
                            y_align : Clutter.ActorAlign.START,
                            y_expand : false
                        },
                        {
                            xtype: Clutter.Text,
                            '*args' : "JsRender.JsRender file",
                            id : "+typetitle",
                            pack : "add_child",
                            x_align : Clutter.ActorAlign.START,
                            x_expand : true,
                            y_align : Clutter.ActorAlign.START,
                            y_expand : false
                        },
                        {
                            xtype: Clutter.Text,
                            '*args' : "JsRender.JsRender file",
                            id : "+title",
                            pack : "add_child",
                            x_align : Clutter.ActorAlign.START,
                            x_expand : true,
                            y_align : Clutter.ActorAlign.START,
                            y_expand : false
                        }
                    ],
                    layout_manager : {
                        xtype: Clutter.BoxLayout,
                        spacing : 4,
                        orientation : Clutter.Orientation.VERTICAL
                    }
                }
            ],
            layout_manager : {
                xtype: Clutter.FlowLayout,
                column_spacing : 20,
                id : "filelayout_manager",
                row_spacing : 20,
                homogeneous : true,
                orientation : Clutter.FlowOrientation.HORIZONTAL
            }
        }
    ]
});
ClutterFiles.init();
XObject.cache['/ClutterFiles'] = ClutterFiles;
