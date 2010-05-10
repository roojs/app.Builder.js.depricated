//<Script type="text/javascript">
Gio = imports.gi.Gio;
Gtk = imports.gi.Gtk;
Gdk = imports.gi.Gdk;
GObject = imports.gi.GObject;
Pango = imports.gi.Pango ;


XObject = imports.XObject.XObject;
console = imports.console;

ProjectManager      = imports.Builder.Provider.ProjectManager.ProjectManager;
EditProject         = imports.Builder.EditProject.EditProject;
DialogNewComponent  = imports.Builder.DialogNewComponent.DialogNewComponent;
LeftTree            = imports.Builder.LeftTree.LeftTree;

// http://www.google.com/codesearch/p?hl=en#EKZaOgYQHwo/unstable/sources/sylpheed-2.2.9.tar.bz2%7C1erxr_ilM1o/sylpheed-2.2.9/src/folderview.c&q=gtk_tree_view_get_drag_dest_row


Gtk.rc_parse_string(
            "style \"gtkcombobox-style\" {\n" + 
            "    GtkComboBox::appears-as-list = 1\n" +
            "}\n"+
            "class \"GtkComboBox\" style \"gtkcombobox-style\"\n");


 
LeftProjectTree = new XObject({
        
        xtype : Gtk.VBox,
        
        showNoProjectSelected : function()
        {
           StandardErrorDialog.show("Select a Project first.");
        },
        
        
        
        items : [
            {
                
                xtype: Gtk.Toolbar,
                pack : ['pack_start', false , true ], // expand // fill.
                listeners : {
                    'size-allocate': function(w,a) {
                    
                        
                        //LeftProjectTree.get('combo').el.set_size_request( 
                        //        Gtk.allocation_get_width(a)-50,-1);
                        
                        
                    }
                },
                items : [
                    {
                        
                        xtype: Gtk.ToolItem,
                        pack : [ 'insert', 0],
                        expand: true,
                        
                        items : [
                        
                            {
                                id : 'combo',
                                
                                xtype : Gtk.ComboBox,
                                //pack : [ 'insert', 1],
                                expand: true,
                                
                                init : function () 
                                {
                                    XObject.prototype.init.call(this); 
                                    this.el.add_attribute(this.items[0].el , 'markup', 1 );  
                                },
                            
                                setValue : function(fn)
                                {
                                    var el = this.el;
                                    el.set_active(-1);
                                    var data = ProjectManager.projects;
                                    data.forEach(function(n, ix) {
                                        if (fn == n.fn) {
                                            el.set_active(ix);
                                            return false;
                                        }
                                    });
                                },
                                getValue : function() 
                                {
                                    var ix = this.el.get_active();
                                    if (ix < 0 ) {
                                        return false;
                                    }
                                    var data =  ProjectManager.projects;
                                    return data[ix].fn;
                                    
                                },
                                
                                
                                listeners : {
                                      
                                    changed : function() {
                                        var fn = this.getValue();
                                        var pm  = ProjectManager;
                                        LeftProjectTree.get('model').loadProject(pm.getByFn(fn))
                                    }
                                },
                                items : [
                                   {
                                          
                                        xtype : Gtk.CellRendererText,
                                        pack : ['pack_start']
                                        
                                    },
                                    {
                                        id : 'combomodel',
                                        pack : [ 'set_model' ],
                                        xtype : Gtk.ListStore,
                                        
                                        init :  function ()
                                        {
                                            XObject.prototype.init.call(this); 
                          
                                            this.el.set_column_types ( 2, [
                                                GObject.TYPE_STRING,  // real key
                                                GObject.TYPE_STRING // real type
                                                
                                                
                                            ] );
                                                
                                             
                                        },
                                       
                                       
                                        
                                        loadData : function (data) {
                                            
                                            var ov = LeftProjectTree.get('combo').getValue();
                                            this.el.clear();
                                            var iter = new Gtk.TreeIter();
                                            var el = this.el;
                                            data.forEach(function(p) {
                                                
                                                el.append(iter);
                                                
                                                 
                                                el.set_value(iter, 0, p.fn);
                                                el.set_value(iter, 1, p.name);
                                                
                                            });
                                            
                                            LeftProjectTree.get('combo').setValue(ov);
                                            
                                        }
                                         
                                    }
                                  
                                         
                                ]
                        
                            }
                        ]
                         
                        
                        
                    },
                    {
                        
                        
                        xtype: Gtk.ToolButton,
                        pack : [ 'insert', 1],
                        label : "Manage",
                        'stock-id' :  Gtk.STOCK_EDIT,
                        listeners : {
                            clicked: function() {
                                this.get('menu').el.show_all();
                                this.get('menu').el.popup(null, null, null, 
                                    null, 1, Gtk.get_current_event_time());
                                
                            }
                        },
                        
                        items : [
                            {
                                id : 'menu',
                                xtype : Gtk.Menu,
                                pack : [ false ],
                                
                                
                                items :  [
                                    {
                                        xtype : Gtk.MenuItem,
                                        pack : [ 'append' ],
                                        label : "New Project",
                                        listeners : {
                                            activate : function () {
                                                
                                                
                                                EditProject.show({
                                                    success : function(pr) {
                                                        LeftProjectTree.get('combo').setValue(pr.fn);
                                                    }
                                                });
                                            }
                                        }
                                    },
                                    {
                                        
                                        
                                        xtype : Gtk.MenuItem,
                                        pack : [ 'append' ],
                                        label : "Add Directory To Current Project",
                                        listeners : {
                                            activate : function () {
                                                
                                                var fn = LeftProjectTree.get('combo').getValue();
                                                if (!fn) {
                                                    LeftProjectTree.showNoProjectSelected();
                                                    return true;
                                                }
                                                
                                                
                                                var dc = new Gtk.FileChooserDialog({
                                                    action : Gtk.FileChooserAction.SELECT_FOLDER,
                                                    modal: true,
                                                    'select-multiple' : false,
                                                    "show-hidden" : true,
                                                });
                                                dc.add_button("Add To Project", Gtk.ResponseType.ACCEPT );
                                                dc.add_button("Cancel",Gtk.ResponseType.CANCEL);
                                                
                                                if (dc.run() != Gtk.ResponseType.ACCEPT) {
                                                    
                                                    dc.destroy();
                                                    return;
                                                }
                                                    
                                                //Seed.print(dc.get_filename());
                                                var pm  = ProjectManager;
                                                pm.getByFn(fn).add(dc.get_filename(), 'dir');
                                                dc.destroy();
                                                
                                                 
                                            }
                                        }
                                    },
                                    {
                                        
                                        
                                        xtype : Gtk.MenuItem,
                                        pack : [ 'append' ],
                                        label : "Add File To Current Project",
                                        listeners : {
                                            activate : function () {
                                                var fn = LeftProjectTree.get('combo').getValue();
                                                if (!fn) {
                                                    LeftProjectTree.showNoProjectSelected();
                                                    return true;
                                                }
                                                
                                                
                                                var dc = new Gtk.FileChooserDialog({
                                                    action : Gtk.FileChooserAction.OPEN,
                                                    modal: true,
                                                    'select-multiple' : false, // later..
                                                    "show-hidden" : true,
                                                });
                                                
                                                dc.add_button("Add To Project", Gtk.ResponseType.ACCEPT );
                                                dc.add_button("Cancel",Gtk.ResponseType.CANCEL);
                                                
                                                if (dc.run() != Gtk.ResponseType.ACCEPT) {
                                                    
                                                    dc.destroy();
                                                    return;
                                                }
                                                    
                                                //Seed.print(dc.get_filename());
                                                
                                                ProjectManager.getByFn(fn).add(dc.get_filename(), 'file');
                                                dc.destroy();
                                                
                                                 
                                            }
                                        }
                                    },
                                    
                                    {
                                         
                                        
                                        xtype : Gtk.MenuItem,
                                        pack : [ 'append' ],
                                        label : 'Add Component',
                                        listeners : {
                                            activate : function () {
                                                var fn = LeftProjectTree.get('combo').getValue();
                                                if (!fn) {
                                                    LeftProjectTree.showNoProjectSelected();
                                                    return true;
                                                }
                                                
                                                DialogNewComponent.show({
                                                    project : ProjectManager.getByFn(fn)
                                                });
                                                
                                                 
                                            }
                                        }
                                    }
                                    
                                 
                                ]
                            }
                        ]
                        
                        
                    }
                
                ]
                
                
        
            },

            {
                
                
                xtype: Gtk.ScrolledWindow,
                smooth_scroll : true,
                shadow_type : Gtk.ShadowType.IN,
                 init :  function ()
                {
                    XObject.prototype.init.call(this); 
              
                    this.el.set_policy  (Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC );
                    //set_size_request : [-1,400]
                },
                items : [        
                    {
                        
                        id : 'view',  
                        
                        xtype : Gtk.TreeView,
                        headers_visible :  false,
                        enable_tree_lines :  true ,
                        tooltip_column : 1,
                          //  set_reorderable: [1]
                        
                        init :  function ()
                        {
                            XObject.prototype.init.call(this); 
                            var description = new Pango.FontDescription.c_new();
                            description.set_size(8000);
                            this.el.modify_font(description);
                            
                            this.selection = this.el.get_selection();
                            this.selection.set_mode( Gtk.SelectionMode.SINGLE);
                        },
                        listeners : {
                            
                            'cursor-changed'  : function(tv, a) { 
                                //select -- should save existing...
                                var iter = new Gtk.TreeIter();
                                
                                if (this.selection.count_selected_rows() < 1) {
                                    //XN.get('Builder.LeftTree.model').
                                    LeftTree.get('model').load( false);
                                    
                                    return;
                                }
                                var model = LeftProjectTree.get('model');
                                //console.log('changed');
                                var s = this.selection;
                                s.get_selected(model, iter);
                                value = new GObject.Value('');
                                model.el.get_value(iter, 2, value);
                                
                                console.log(value.value);// id..
                                
                                var file = LeftProjectTree.project.getById(value.value);
                                
                                
                                console.log(file);
                                
                                var LeftTopPanel        = imports.Builder.LeftTopPanel.LeftTopPanel;

                                var nb = LeftTopPanel.get('expander');
                                nb.el.expanded = false;
                                nb.listeners.activate.call(nb);
                                //_expander.el.set_expanded(false);

                                var ltm = LeftTree.get('model');
                                ltm.loadFile(file);
                                
                                return true;
                                
                                
                            
                            }
                        },
                        
                        items  : [
                            {
                                pack : ['set_model'],
                                
                                xtype : Gtk.TreeStore,
                                id : 'model',
                                init :  function ()
                                {
                                    XObject.prototype.init.call(this);    
                                    this.el.set_column_types ( 3, [
                                            GObject.TYPE_STRING, // title 
                                            GObject.TYPE_STRING, // tip
                                            GObject.TYPE_STRING // id..
                                            ] );
                           
                                    
                                },
                                activeIter : false, // fixme - should not use iters..
                                
                                
                                 
                                
                                loadProject : function (pr)
                                {
                                    
                                    
                                    this.el.clear();
                                    if (!pr) {
                                        return;
                                    }
                                    LeftProjectTree.project = pr;
                                    this.load(pr.toTree());
                                    LeftProjectTree.get('view').el.expand_all();
                                    // needs more thought!!??
                                    var Window = imports.Builder.Window.Window;
                                    Window.get('notebook').el.page = (pr.xtype == 'Roo' ? 0 : 1);
                                    
                                    print ("SET notebook to " + pr.xtype);
                                    
                                },
                                
                                load : function(tr,iter)
                                {
                                    console.dump(tr);
                                    console.log('Project tree load: ' + tr.length);
                                    var citer = new Gtk.TreeIter();
                                    //this.insert(citer,iter,0);
                                    
                                    var _this = this;
                                    tr.forEach(function (r) {
                                        if (!iter) {
                                            _this.el.append(citer);   
                                        } else {
                                            _this.el.insert(citer,iter,-1);
                                        }
                                        _this.el.set_value(citer, 0,  '' + r.getTitle() ); // title 
                                        _this.el.set_value(citer, 1, '' + r.getTitleTip()); // tip
                                        _this.el.set_value(citer, 2, '' + r.id ); //id
                                        if (r.cn && r.cn.length) {
                                            _this.load(r.cn, citer);
                                        }
                                        
                                    });
                                    
                                },
                                
                                
                                
                                
                                getValue: function (iter, col) {
                                    var gval = new GObject.Value('');
                                    this.el.get_value(iter, col ,gval);
                                    return  gval.value;
                                    
                                    
                                }
                                
                                
                                
                              //  this.expand_all();
                            },
                            
                              
                            {
                                pack : ['append_column'],
                                
                                xtype : Gtk.TreeViewColumn,
                                items : [
                                    {
                                        
                                        xtype : Gtk.CellRendererText,
                                        pack: [ 'pack_start']
                                          
                                    } 
                                ],
                                     init :  function ()
                                {
                                    XObject.prototype.init.call(this);    
                            
                                    this.el.add_attribute(this.items[0].el , 'markup', 0 );
                                    
                                }
                              
                            }
                            
                       ]
                    }
                ]
                        
            }
        ]
                     
    }
);
