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
    fileitems : "",
    id : "ClutterFiles",
    clearFiles : () {
        
        this.filelayout.el.remove_all_children();
        // we need to unref all the chidren that we loaded though...
        
    },
    scroll_mode : "Clutter.ScrollMode.VERTICALLY",
    xtype : "ScrollActor",
    reactive : TRUE,
    loadProject : (Project.Project pr) {
        // list all the files, and create new Xcls_fileitem for each one.
        
        // LEAK --- we should unref all the chilren...
        this.filelayout.el.y = 0;
        this.clearFiles();
        
        print("clutter files - load project: " + pr.name +"\n");
        // should unref.. them hopefully.
        this.fileitems = new Gee.ArrayList<Xcls_fileitem>();
    
        
    
        var fiter = pr.sortedFiles().list_iterator();
        while (fiter.next()) {
            var a = new Xcls_fileitem(this,fiter.get());
            this.fileitems.add(a);
    
    //        a.ref();
            print("add to clutter file view: " + fiter.get().name + "\n");
            this.filelayout.el.add_child(a.el);
        }
        
       
        
        this.el.show_all();
    },
    open : "(JsRender.JsRender file)",
    xns : Clutter,
    set_size : (float w, float h) 
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
    items : [
    	{
            layout_manager : {
                id : "filelayout_manager",
                orientation : Clutter.FlowOrientation.HORIZONTAL,
                xtype : "FlowLayout",
                xns : Clutter,
                row_spacing : 20,
                column_spacing : 20,
                homogeneous : TRUE
            },
            id : "filelayout",
            xtype : "Actor",
            reactive : TRUE,
            xns : Clutter,
            items : [
            	{
                    layout_manager : {
                        orientation : Clutter.Orientation.VERTICAL,
                        spacing : 4,
                        xtype : "BoxLayout",
                        xns : Clutter
                    },
                    id : "*fileitem",
                    xtype : "Actor",
                    file : "",
                    reactive : TRUE,
                    xns : Clutter,
                    listeners : {
                    	button_press_event : (  event) => {
                    	       _this.open(this.file);
                    	       return false;
                    	   },
                    	enter_event : (  event)  => {
                    	       this.el.background_color = new Clutter.Color.from_string("#333");
                    	           return false;
                    	   },
                    	leave_event : (  event)  => {
                    	       this.el.background_color = new Clutter.Color.from_string("#000");
                    	       return false;
                    	   }
                    },
                    items : [
                    	{
                            margin_top : 5,
                            margin_right : 5,
                            id : "+image",
                            x_expand : TRUE,
                            xtype : "Texture",
                            y_align : Clutter.ActorAlign.START,
                            margin_left : 5,
                            xns : Clutter,
                            y_expand : FALSE,
                            x_align : Clutter.ActorAlign.START
                        },
                    	{
                            id : "+typetitle",
                            x_expand : TRUE,
                            xtype : "Text",
                            y_align : Clutter.ActorAlign.START,
                            xns : Clutter,
                            y_expand : FALSE,
                            x_align : Clutter.ActorAlign.START
                        },
                    	{
                            id : "+title",
                            x_expand : TRUE,
                            xtype : "Text",
                            y_align : Clutter.ActorAlign.START,
                            xns : Clutter,
                            y_expand : FALSE,
                            x_align : Clutter.ActorAlign.START
                        }
                    ]

                }
            ]

        }
    ]

});
ClutterFiles.init();
XObject.cache['/ClutterFiles'] = ClutterFiles;
