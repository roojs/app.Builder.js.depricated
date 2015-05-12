static Xcls_PopoverFileDetails  _PopoverFileDetails;

public class Xcls_PopoverFileDetails : Object 
{
    public Gtk.Popover el;
    private Xcls_PopoverFileDetails  _this;

    public static Xcls_PopoverFileDetails singleton()
    {
        if (_PopoverFileDetails == null) {
            _PopoverFileDetails= new Xcls_PopoverFileDetails();
        }
        return _PopoverFileDetails;
    }
    public Xcls_name name;
    public Xcls_title title;
    public Xcls_region region;
    public Xcls_parent parent;
    public Xcls_permname permname;
    public Xcls_modOrder modOrder;
    public Xcls_build_module build_module;
    public Xcls_dbcellrenderer dbcellrenderer;
    public Xcls_dbmodel dbmodel;
    public Xcls_save_btn save_btn;

        // my vars (def)
    public signal void success (Project.Project pr, JsRender.JsRender file);
    public bool done;
    public Project.Project project;
    public JsRender.JsRender file;
    public Xcls_MainWindow mainwindow;

    // ctor 
    public Xcls_PopoverFileDetails()
    {
        _this = this;
        this.el = new Gtk.Popover( null );

        // my vars (dec)
        this.done = false;
        this.file = null;
        this.mainwindow = null;

        // set gobject values
        this.el.border_width = 0;
        this.el.modal = true;
        this.el.position = Gtk.PositionType.RIGHT;
        var child_0 = new Xcls_VBox2( _this );
        child_0.ref();
        this.el.add (  child_0.el  );

        // listeners 
        this.el.closed.connect( () => {
          if (!this.done) {
            _this.el.show();
          
          }
        });
    }

    // user defined functions 
    public   void updateFileFromEntry () {
    
            _this.file.title = _this.title.el.get_text();
            _this.file.region = _this.region.el.get_text();            
            _this.file.parent = _this.parent.el.get_text();                        
            _this.file.permname = _this.permname.el.get_text();                                    
            _this.file.modOrder = _this.modOrder.el.get_text();
            
            if (_this.file.name.length  > 0 && _this.file.name != _this.name.el.get_text()) {
                _this.file.renameTo(_this.name.el.get_text());
            }
            // store the module...
            _this.file.build_module = "";        
             Gtk.TreeIter iter; 
            if (_this.build_module.el.get_active_iter (out iter)) {
                 Value vfname;
                 this.dbmodel.el.get_value (iter, 0, out vfname);
                 if (((string)vfname).length > 0) {
                     _this.file.build_module = (string)vfname;
                 }
        
            }
            
            
    
                                                        
    }
    public void show (JsRender.JsRender c, Gtk.Widget btn) 
    {
        this.project = c.project;
        this.done = false;
        
        
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
        
            this.save_btn.el.set_label("Save");
        } else {
            this.save_btn.el.set_label("Create");
        }
        
         var ar = new Gee.ArrayList<string>();
         _this.dbmodel.loadData(ar,"");
        // load the modules... if relivant..
        if (this.project.xtype == "Gtk") {
            var p = (Project.Gtk)c.project;
              var cg = p.compilegroups;
    
            var iter = cg.map_iterator();
           while(iter.next()) {
                var key = iter.get_key();
                if (key == "_default_") {
                    continue;
                }
                ar.add(key);
            };
            _this.dbmodel.loadData(ar, c.build_module);
    
        }
        
         
        _this.file = c;
        //console.log('show all');
       this.el.set_modal(true);
        this.el.set_relative_to(btn);
    
        this.el.set_position(Gtk.PositionType.RIGHT);
        
        // window + header?
         print("SHOWALL - POPIP\n");
        this.el.show_all();
        this.name.el.set_focus(true);
        
        //this.success = c.success;
        
        
    }
    public class Xcls_VBox2 : Object 
    {
        public Gtk.VBox el;
        private Xcls_PopoverFileDetails  _this;


            // my vars (def)

        // ctor 
        public Xcls_VBox2(Xcls_PopoverFileDetails _owner )
        {
            _this = _owner;
            this.el = new Gtk.VBox( false, 0 );

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_HeaderBar3( _this );
            child_0.ref();
            this.el.pack_start (  child_0.el , false,true,0 );
            var child_1 = new Xcls_Table4( _this );
            child_1.ref();
            this.el.pack_start (  child_1.el , false,false,4 );
            var child_2 = new Xcls_HButtonBox21( _this );
            child_2.ref();
            this.el.pack_end (  child_2.el , false,true,5 );
        }

        // user defined functions 
    }
    public class Xcls_HeaderBar3 : Object 
    {
        public Gtk.HeaderBar el;
        private Xcls_PopoverFileDetails  _this;


            // my vars (def)

        // ctor 
        public Xcls_HeaderBar3(Xcls_PopoverFileDetails _owner )
        {
            _this = _owner;
            this.el = new Gtk.HeaderBar();

            // my vars (dec)

            // set gobject values
            this.el.title = "Add / Edit File";
        }

        // user defined functions 
    }
    public class Xcls_Table4 : Object 
    {
        public Gtk.Table el;
        private Xcls_PopoverFileDetails  _this;


            // my vars (def)

        // ctor 
        public Xcls_Table4(Xcls_PopoverFileDetails _owner )
        {
            _this = _owner;
            this.el = new Gtk.Table( 3, 2, true );

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_Label5( _this );
            child_0.ref();
            this.el.attach_defaults (  child_0.el , 0,1,0,1 );
            var child_1 = new Xcls_name( _this );
            child_1.ref();
            this.el.attach_defaults (  child_1.el , 1,2,0,1 );
            var child_2 = new Xcls_Label7( _this );
            child_2.ref();
            this.el.attach_defaults (  child_2.el , 0,1,1,2 );
            var child_3 = new Xcls_title( _this );
            child_3.ref();
            this.el.attach_defaults (  child_3.el , 1,2,1,2 );
            var child_4 = new Xcls_Label9( _this );
            child_4.ref();
            this.el.attach_defaults (  child_4.el , 0,1,2,3 );
            var child_5 = new Xcls_region( _this );
            child_5.ref();
            this.el.attach_defaults (  child_5.el , 1,2,2,3 );
            var child_6 = new Xcls_Label11( _this );
            child_6.ref();
            this.el.attach_defaults (  child_6.el , 0,1,3,4 );
            var child_7 = new Xcls_parent( _this );
            child_7.ref();
            this.el.attach_defaults (  child_7.el , 1,2,3,4 );
            var child_8 = new Xcls_Label13( _this );
            child_8.ref();
            this.el.attach_defaults (  child_8.el , 0,1,4,5 );
            var child_9 = new Xcls_permname( _this );
            child_9.ref();
            this.el.attach_defaults (  child_9.el , 1,2,4,5 );
            var child_10 = new Xcls_Label15( _this );
            child_10.ref();
            this.el.attach_defaults (  child_10.el , 0,1,5,6 );
            var child_11 = new Xcls_modOrder( _this );
            child_11.ref();
            this.el.attach_defaults (  child_11.el , 1,2,5,6 );
            var child_12 = new Xcls_Label17( _this );
            child_12.ref();
            this.el.attach_defaults (  child_12.el , 0,1,6,7 );
            var child_13 = new Xcls_build_module( _this );
            child_13.ref();
            this.el.attach_defaults (  child_13.el , 1,2,6,7 );
        }

        // user defined functions 
    }
    public class Xcls_Label5 : Object 
    {
        public Gtk.Label el;
        private Xcls_PopoverFileDetails  _this;


            // my vars (def)

        // ctor 
        public Xcls_Label5(Xcls_PopoverFileDetails _owner )
        {
            _this = _owner;
            this.el = new Gtk.Label( "Component Name" );

            // my vars (dec)

            // set gobject values
            this.el.justify = Gtk.Justification.RIGHT;
            this.el.xalign = 0.900000f;
        }

        // user defined functions 
    }
    public class Xcls_name : Object 
    {
        public Gtk.Entry el;
        private Xcls_PopoverFileDetails  _this;


            // my vars (def)

        // ctor 
        public Xcls_name(Xcls_PopoverFileDetails _owner )
        {
            _this = _owner;
            _this.name = this;
            this.el = new Gtk.Entry();

            // my vars (dec)

            // set gobject values
            this.el.visible = true;
        }

        // user defined functions 
    }
    public class Xcls_Label7 : Object 
    {
        public Gtk.Label el;
        private Xcls_PopoverFileDetails  _this;


            // my vars (def)

        // ctor 
        public Xcls_Label7(Xcls_PopoverFileDetails _owner )
        {
            _this = _owner;
            this.el = new Gtk.Label( "Title" );

            // my vars (dec)

            // set gobject values
            this.el.justify = Gtk.Justification.RIGHT;
            this.el.xalign = 0.900000f;
            this.el.visible = true;
        }

        // user defined functions 
    }
    public class Xcls_title : Object 
    {
        public Gtk.Entry el;
        private Xcls_PopoverFileDetails  _this;


            // my vars (def)

        // ctor 
        public Xcls_title(Xcls_PopoverFileDetails _owner )
        {
            _this = _owner;
            _this.title = this;
            this.el = new Gtk.Entry();

            // my vars (dec)

            // set gobject values
            this.el.visible = true;
        }

        // user defined functions 
    }
    public class Xcls_Label9 : Object 
    {
        public Gtk.Label el;
        private Xcls_PopoverFileDetails  _this;


            // my vars (def)

        // ctor 
        public Xcls_Label9(Xcls_PopoverFileDetails _owner )
        {
            _this = _owner;
            this.el = new Gtk.Label( "Region" );

            // my vars (dec)

            // set gobject values
            this.el.justify = Gtk.Justification.RIGHT;
            this.el.xalign = 0.900000f;
            this.el.tooltip_text = "center, north, south, east, west";
            this.el.visible = true;
        }

        // user defined functions 
    }
    public class Xcls_region : Object 
    {
        public Gtk.Entry el;
        private Xcls_PopoverFileDetails  _this;


            // my vars (def)

        // ctor 
        public Xcls_region(Xcls_PopoverFileDetails _owner )
        {
            _this = _owner;
            _this.region = this;
            this.el = new Gtk.Entry();

            // my vars (dec)

            // set gobject values
            this.el.visible = true;
        }

        // user defined functions 
    }
    public class Xcls_Label11 : Object 
    {
        public Gtk.Label el;
        private Xcls_PopoverFileDetails  _this;


            // my vars (def)

        // ctor 
        public Xcls_Label11(Xcls_PopoverFileDetails _owner )
        {
            _this = _owner;
            this.el = new Gtk.Label( "Parent Name" );

            // my vars (dec)

            // set gobject values
            this.el.justify = Gtk.Justification.RIGHT;
            this.el.xalign = 0.900000f;
            this.el.visible = true;
        }

        // user defined functions 
    }
    public class Xcls_parent : Object 
    {
        public Gtk.Entry el;
        private Xcls_PopoverFileDetails  _this;


            // my vars (def)

        // ctor 
        public Xcls_parent(Xcls_PopoverFileDetails _owner )
        {
            _this = _owner;
            _this.parent = this;
            this.el = new Gtk.Entry();

            // my vars (dec)

            // set gobject values
            this.el.visible = true;
        }

        // user defined functions 
    }
    public class Xcls_Label13 : Object 
    {
        public Gtk.Label el;
        private Xcls_PopoverFileDetails  _this;


            // my vars (def)

        // ctor 
        public Xcls_Label13(Xcls_PopoverFileDetails _owner )
        {
            _this = _owner;
            this.el = new Gtk.Label( "Permission Name" );

            // my vars (dec)

            // set gobject values
            this.el.justify = Gtk.Justification.RIGHT;
            this.el.xalign = 0.900000f;
            this.el.visible = true;
        }

        // user defined functions 
    }
    public class Xcls_permname : Object 
    {
        public Gtk.Entry el;
        private Xcls_PopoverFileDetails  _this;


            // my vars (def)

        // ctor 
        public Xcls_permname(Xcls_PopoverFileDetails _owner )
        {
            _this = _owner;
            _this.permname = this;
            this.el = new Gtk.Entry();

            // my vars (dec)

            // set gobject values
            this.el.visible = true;
        }

        // user defined functions 
    }
    public class Xcls_Label15 : Object 
    {
        public Gtk.Label el;
        private Xcls_PopoverFileDetails  _this;


            // my vars (def)

        // ctor 
        public Xcls_Label15(Xcls_PopoverFileDetails _owner )
        {
            _this = _owner;
            this.el = new Gtk.Label( "Order (for tabs)" );

            // my vars (dec)

            // set gobject values
            this.el.justify = Gtk.Justification.RIGHT;
            this.el.xalign = 0.900000f;
            this.el.visible = true;
        }

        // user defined functions 
    }
    public class Xcls_modOrder : Object 
    {
        public Gtk.Entry el;
        private Xcls_PopoverFileDetails  _this;


            // my vars (def)

        // ctor 
        public Xcls_modOrder(Xcls_PopoverFileDetails _owner )
        {
            _this = _owner;
            _this.modOrder = this;
            this.el = new Gtk.Entry();

            // my vars (dec)

            // set gobject values
            this.el.visible = true;
        }

        // user defined functions 
    }
    public class Xcls_Label17 : Object 
    {
        public Gtk.Label el;
        private Xcls_PopoverFileDetails  _this;


            // my vars (def)

        // ctor 
        public Xcls_Label17(Xcls_PopoverFileDetails _owner )
        {
            _this = _owner;
            this.el = new Gtk.Label( "Module to build (Vala only)" );

            // my vars (dec)

            // set gobject values
            this.el.justify = Gtk.Justification.RIGHT;
            this.el.xalign = 0.900000f;
            this.el.visible = true;
        }

        // user defined functions 
    }
    public class Xcls_build_module : Object 
    {
        public Gtk.ComboBox el;
        private Xcls_PopoverFileDetails  _this;


            // my vars (def)

        // ctor 
        public Xcls_build_module(Xcls_PopoverFileDetails _owner )
        {
            _this = _owner;
            _this.build_module = this;
            this.el = new Gtk.ComboBox();

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_dbcellrenderer( _this );
            child_0.ref();
            this.el.pack_start (  child_0.el , true );
            var child_1 = new Xcls_dbmodel( _this );
            child_1.ref();
            this.el.set_model (  child_1.el  );

            // init method 

            this.el.add_attribute(_this.dbcellrenderer.el , "markup", 1 );
        }

        // user defined functions 
    }
    public class Xcls_dbcellrenderer : Object 
    {
        public Gtk.CellRendererText el;
        private Xcls_PopoverFileDetails  _this;


            // my vars (def)

        // ctor 
        public Xcls_dbcellrenderer(Xcls_PopoverFileDetails _owner )
        {
            _this = _owner;
            _this.dbcellrenderer = this;
            this.el = new Gtk.CellRendererText();

            // my vars (dec)

            // set gobject values
        }

        // user defined functions 
    }
    public class Xcls_dbmodel : Object 
    {
        public Gtk.ListStore el;
        private Xcls_PopoverFileDetails  _this;


            // my vars (def)

        // ctor 
        public Xcls_dbmodel(Xcls_PopoverFileDetails _owner )
        {
            _this = _owner;
            _this.dbmodel = this;
            this.el = new Gtk.ListStore( 2, typeof(string),typeof(string) );

            // my vars (dec)

            // set gobject values
        }

        // user defined functions 
        public void loadData (Gee.ArrayList<string> data, string cur) {
            this.el.clear();                                    
            Gtk.TreeIter iter;
            var el = this.el;
            
           /// el.append(out iter);
            
             
           // el.set_value(iter, 0, "");
           // el.set_value(iter, 1, "aaa  - Just add Element - aaa");
        
            el.append(out iter);
        
            
            el.set_value(iter, 0, "");
            el.set_value(iter, 1, "-- select a module --");
            _this.build_module.el.set_active_iter(iter);
            
            for (var i = 0; i < data.size;i++) {
            
        
                el.append(out iter);
                
                el.set_value(iter, 0, data.get(i));
                el.set_value(iter, 1, data.get(i));
                
                if (data.get(i) == cur) {
                    _this.build_module.el.set_active_iter(iter);
                }
                
            }
             this.el.set_sort_column_id(0, Gtk.SortType.ASCENDING);          
                                             
        }
    }
    public class Xcls_HButtonBox21 : Object 
    {
        public Gtk.HButtonBox el;
        private Xcls_PopoverFileDetails  _this;


            // my vars (def)

        // ctor 
        public Xcls_HButtonBox21(Xcls_PopoverFileDetails _owner )
        {
            _this = _owner;
            this.el = new Gtk.HButtonBox();

            // my vars (dec)

            // set gobject values
            var child_0 = new Xcls_Button22( _this );
            child_0.ref();
            this.el.add (  child_0.el  );
            var child_1 = new Xcls_save_btn( _this );
            child_1.ref();
            this.el.add (  child_1.el  );
        }

        // user defined functions 
    }
    public class Xcls_Button22 : Object 
    {
        public Gtk.Button el;
        private Xcls_PopoverFileDetails  _this;


            // my vars (def)

        // ctor 
        public Xcls_Button22(Xcls_PopoverFileDetails _owner )
        {
            _this = _owner;
            this.el = new Gtk.Button();

            // my vars (dec)

            // set gobject values
            this.el.label = "Cancel";

            // listeners 
            this.el.clicked.connect( () => { 
            
              _this.done = true;
                _this.el.hide(); 
            });
        }

        // user defined functions 
    }
    public class Xcls_save_btn : Object 
    {
        public Gtk.Button el;
        private Xcls_PopoverFileDetails  _this;


            // my vars (def)

        // ctor 
        public Xcls_save_btn(Xcls_PopoverFileDetails _owner )
        {
            _this = _owner;
            _this.save_btn = this;
            this.el = new Gtk.Button();

            // my vars (dec)

            // set gobject values
            this.el.label = "Save";

            // listeners 
            this.el.clicked.connect( ( ) =>  { 
              
            	 
            
            
                    if (_this.name.el.get_text().length  < 1) {
                        StandardErrorDialog.show(
                            _this.mainwindow.el,
                            "You have to set Component name "
                        );
                         
                        return;
                    }
                    // what does this do?
                    
                    var isNew = _this.file.name.length  > 0 ? false : true;
                    /*
                    if (!isNew && this.file.name != _this.name.el.get_text()) {
                        Xcls_StandardErrorDialog.singleton().show(
                            this.el,
                            "Sorry changing names does not work yet. "
                        );
                         
                        return;
                    }
                    */
                     
                    
                  
                    // FIXME - this may be more complicated...
                    //for (var i in this.def) {
                    //    this.file[i] =  this.get(i).el.get_text();
                    //}
            
                    if (!isNew) {
                        try {
                             _this.updateFileFromEntry();
                         } catch( JsRender.Error.RENAME_FILE_EXISTS er) {
                              Xcls_StandardErrorDialog.singleton().show(
                                _this.mainwindow.el,
                                "The name you used already exists "
                            );
                            return;
                             
                         }
                                                                    
                          _this.done = true;
                        _this.file.save();
                        _this.el.hide();
                        return;
                    }
                    var fn = _this.name.el.get_text();
                    var dir = _this.project.firstPath();
                   
                    if (GLib.FileUtils.test(dir + "/" + fn + ".bjs", GLib.FileTest.EXISTS)) {
                        Xcls_StandardErrorDialog.singleton().show(
                            _this.mainwindow.el,
                            "That file already exists"
                        ); 
                        return;
                    }
                   
                   var f =  JsRender.JsRender.factory(
                            _this.file.project.xtype,  
                            _this.file.project, 
                            dir + "/" + fn + ".bjs");
            
                    _this.file = f;
                    
            
                    
                    _this.updateFileFromEntry();
                    _this.file.save();
                    _this.file.project.addFile(_this.file);
                    
            	 
                    // what about .js ?
                   _this.done = true;
                    _this.el.hide();
             
                    
                    
                    _this.success(_this.project, _this.file);
                   
            });
        }

        // user defined functions 
    }
}
