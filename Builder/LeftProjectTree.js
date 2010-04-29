//<Script type="text/javascript">
Gio = imports.gi.Gio;
Gtk = imports.gi.Gtk;
Gdk = imports.gi.Gdk;
GObject = imports.gi.GObject;
Pango = imports.gi.Pango ;


XObject = imports.XObject.XObject;
console = imports.console;



// http://www.google.com/codesearch/p?hl=en#EKZaOgYQHwo/unstable/sources/sylpheed-2.2.9.tar.bz2%7C1erxr_ilM1o/sylpheed-2.2.9/src/folderview.c&q=gtk_tree_view_get_drag_dest_row

Gtk.rc_parse_string(
            "style \"gtkcombobox-style\" {\n" + 
            "    GtkComboBox::appears-as-list = 1\n" +
            "}\n"+
            "class \"GtkComboBox\" style \"gtkcombobox-style\"\n");


 
LeftProjectTree = new XObject({
        
        xns : Gtk.VBox,
        
        showNoProjectSelected : function()
        {
           StandardErrorDialog.show("Select a Project first.");
        },
        
        
        
        items : [
            {
                
                xtype: Gtk.Toolbar',
                pack : ['pack_start', false , true ], // expand // fill.
                listeners : {
                    'size-allocate': function(w,a) {
                        ////Seed.print(a);
                        
                        LeftProjectTree.get('combo').el.set_size_request( 
                                Gtk.allocation_get_width(a)-50,-1);
                        
                        
                    }
                },
                items : [
                    {
                        
                        xtype: Gtk.ToolItem',
                        pack : [ 'insert', 0],
                        expand: true,
                        
                        items : [
                        
                            {
                                xid : 'combo',
                                
                                xtype : 'ComboBox',
                                //pack : [ 'insert', 1],
                                expand: true,
                                set : {
                                 //   set_text_column : [1]
                                   //set_size_request : [150,-1]
                                },
                                
                            
                                setValue : function(fn)
                                {
                                    var el = this.el;
                                    el.set_active(-1);
                                    var data = Builder.Provider.ProjectManager.projects;
                                    Roo.each(data, function(n, ix) {
                                        if (fn == n.fn) {
                                            el.set_active(ix);
                                            return false;
                                        }
                                    })
                                },
                                getValue : function() 
                                {
                                    var ix = this.el.get_active();
                                    if (ix < 0 ) {
                                        return false;
                                    }
                                    var data = Builder.Provider.ProjectManager.projects;
                                    return data[ix].fn;
                                    /*
                                    var iter = new Gtk.TreeIter();
                                    if (this.el.get_active_iter(iter)) {
                                        return '';
                                    }
                                    var value = new GObject.Value('');
                                    this.model.el.get_value(iter, 0, value);
                                    return value.value;
                                    */
                                },
                                
                                
                                listeners : {
                                    
                                    _new : function ()
                                    {
                                        _combo = this;
                                    },
                                    
                                    _rendered  : function ()
                                    {
                                        
                                        this.el.add_attribute(this.items[0].el , 'markup', 1 );  
                                        //this.el.add_attribute(this.items[0].el , 'popup', 2 );     
                                         
                                     
                                  
                                    },
                                    changed : function() {
                                        var fn = this.getValue();
                                        var pm  = Builder.Provider.ProjectManager;
                                        _model.loadProject(pm.getByFn(fn))
                                    }
                                },
                                items : [
                                   {
                                        
                                        
                                   
                                        
                                        xtype : 'CellRendererText',
                                        pack : ['pack_start'],
                                        

                                         
                                    },
                                    {
                                        
                                        pack : [ 'set_model' ],
                                        xtype : 'ListStore',
                                        xid : 'combomodel',
                                        listeners : {
                                            _new : function()
                                            {
                                                
                                                _combo.model = this;
                                            },
                                            _rendered :  function ()
                                            {
                                             
                                                this.el.set_column_types ( 2, [
                                                    GObject.TYPE_STRING,  // real key
                                                    GObject.TYPE_STRING // real type
                                                    
                                                    
                                                ] );
                                                
                                                 
                                                
                                                return;
                                               
                                            
                                            
                                            }
                                        },
                                       
                                       
                                        
                                        loadData : function (data) {
                                            
                                            var ov = _combo.getValue();
                                            this.el.clear();
                                            var iter = new Gtk.TreeIter();
                                            var el = this.el;
                                            Roo.each(data, function(p) {
                                                
                                                el.append(iter);
                                                
                                                 
                                                el.set_value(iter, 0, p.fn);
                                                el.set_value(iter, 1, p.name);
                                                
                                            });
                                             
                                            _combo.setValue(ov);
                                            
                                        }
                                         
                                    }
                                  
                                         
                                ]
                        
                            }
                        ]
                         
                        
                        
                    },
                    {
                        
                        
                        xtype: Gtk.ToolButton',
                        pack : [ 'insert', 1],
                        label : 'Manage',
                        'stock-id' :  Gtk.STOCK_EDIT,
                        listeners : {
                            clicked: function() {
                                this.items[0].el.show_all();
                                this.items[0].el.popup(null, null, null, null, 1, Gtk.get_current_event_time());
                                
                            }
                        },
                        
                        items : [
                            {
                                
                                xtype : 'Menu',
                                pack : [ false ],
                                
                                
                                items :  [
                                    {
                                        
                                        
                                        xtype : 'MenuItem',
                                        pack : [ 'append' ],
                                        label : 'New Project',
                                        listeners : {
                                            activate : function () {
                                                
                                                if (!Builder.EditProject._win) {
                                                    XN.xnew(Builder.EditProject.create());
                                                }
                                                
                                                Builder.EditProject._win.show({
                                                    success : function(pr) {
                                                        _combo.setValue(pr.fn);
                                                    }
                                                });
                                            }
                                        }
                                    },
                                    {
                                        
                                        
                                        xtype : 'MenuItem',
                                        pack : [ 'append' ],
                                        label : 'Add Directory To Current Project',
                                        listeners : {
                                            activate : function () {
                                                var fn = _combo.getValue();
                                                if (!fn) {
                                                    XN.get(this).box.showNoProjectSelected();
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
                                                var pm  = Builder.Provider.ProjectManager;
                                                pm.getByFn(fn).add(dc.get_filename(), 'dir');
                                                dc.destroy();
                                                
                                                 
                                            }
                                        }
                                    },
                                    {
                                        
                                        
                                        xtype : 'MenuItem',
                                        pack : [ 'append' ],
                                        label : 'Add File To Current Project',
                                        listeners : {
                                            activate : function () {
                                                var fn = _combo.getValue();
                                                if (!fn) {
                                                    XN.get(this).box.showNoProjectSelected();
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
                                                var pm  = Builder.Provider.ProjectManager;
                                                pm.getByFn(fn).add(dc.get_filename(), 'file');
                                                dc.destroy();
                                                
                                                 
                                            }
                                        }
                                    },
                                    
                                    {
                                         
                                        
                                        xtype : 'MenuItem',
                                        pack : [ 'append' ],
                                        label : 'Add Component',
                                        listeners : {
                                            activate : function () {
                                                var fn = _combo.getValue();
                                                if (!fn) {
                                                    XN.get(this).box.showNoProjectSelected();
                                                    return true;
                                                }
                                                var pm  = Builder.Provider.ProjectManager;
                                                XN.get('Builder.DialogNewComponent').dialog.show({
                                                    project : pm.getByFn(fn)
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
                
                
                xtype: Gtk.ScrolledWindow',
                smooth_scroll : true,
               // pack : ['pack_start', true , true ],
                set : {
                    set_shadow_type : [ Gtk.ShadowType.IN ],
                    set_policy : [Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC] //,
                    //set_size_request : [-1,400]
                },
                items : [        
                    {
                        
                            
                        
                        xtype : 'TreeView',
                        set : {
                            set_headers_visible : [ false],
                            set_enable_tree_lines : [ true] ,
                            set_tooltip_column : [1],
                          //  set_reorderable: [1]
                        },  
                        listeners : {
                            _new : function () {
                                _view = this;
                            },
                            _rendered: function()
                            {
                                
                                var description = new Pango.FontDescription.c_new();
                                description.set_size(8000);
                                this.el.modify_font(description);
                                
                                this.selection = this.el.get_selection();
                                this.selection.set_mode( Gtk.SelectionMode.SINGLE);
                               // this.selection.signal['changed'].connect(function() {
                                //    _view.listeners['cursor-changed'].apply(_view, [ _view, '']);
                                //});
                                
                            }, 
                            'cursor-changed'  : function(tv, a) { 
                                //select -- should save existing...
                                var iter = new Gtk.TreeIter();
                                
                                if (this.selection.count_selected_rows() < 1) {
                                    //XN.get('Builder.LeftTree.model').
                                    Builder.LeftTree._model.load( false);
                                    
                                    return;
                                }
                                var model = XN.get(this, 'model');
                                //console.log('changed');
                                var s = this.selection;
                                s.get_selected(model, iter);
                                value = new GObject.Value('');
                                model.el.get_value(iter, 2, value);
                                
                                console.log(value.value);// id..
                                
                                var file = model.project.getById(value.value);
                                
                                
                                console.log(file);
                                
                                
                                var nb = XN.get('Builder.LeftTopPanel.expander');
                                nb.el.expanded = false;
                                nb.listeners.activate.call(nb);
                                //_expander.el.set_expanded(false);

                                var ltm = XN.get('Builder.LeftTree.model');
                                ltm.loadFile(file);
                                
                                return true;
                                
                                
                            
                            }
                        },
                        
                        items  : [
                            {
                                pack : ['set_model'],
                                
                                
                                xtype : 'TreeStore',
                                xid : 'model',
                                listeners : {
                                    _rendered : function()
                                    {
                                        _model = this;
                                        
                                        
                                        
                                        
                                        
                                        
                                        this.el.set_column_types ( 3, [
                                                GObject.TYPE_STRING, // title 
                                                GObject.TYPE_STRING, // tip
                                                GObject.TYPE_STRING // id..
                                                ] );
                        
                                        
                                        
                                    }
                                     
                                    
                                },
                                activeIter : false,
                                changed : function( n, refresh) {
                                    
                                     
                                },
                                
                                project : false,
                                
                                loadProject : function (pr)
                                {
                                    this.project = pr;
                                    this.el.clear();
                                    if (!pr) {
                                        return;
                                    }
                                    this.load(pr.toTree());
                                    _view.el.expand_all();
                                },
                                
                                load : function(tr,iter)
                                {
                                    console.dump(tr);
                                    console.log('Project tree load: ' + tr.length);
                                    var citer = new Gtk.TreeIter();
                                    //this.insert(citer,iter,0);
                                    Roo.each(tr, function (r) {
                                        if (!iter) {
                                            _model.el.append(citer);   
                                        } else {
                                            this.el.insert(citer,iter,-1);
                                        }
                                        this.el.set_value(citer, 0, '' + r.getTitle()); // title 
                                        this.el.set_value(citer, 1, '' + r.getTitleTip()); // tip
                                        this.el.set_value(citer, 2, '' + r.id); //id
                                        if (r.cn && r.cn.length) {
                                            this.load(r.cn, citer);
                                        }
                                        
                                    }, this);
                                    
                                },
                                
                                
                                
                                
                                getValue: function (iter, col) {
                                    var gval = new GObject.Value('');
                                     _model.el.get_value(iter, col ,gval);
                                    return  gval.value;
                                    
                                    
                                }
                                
                                
                                
                              //  this.expand_all();
                            },
                            
                              
                            {
                                pack : ['append_column'],
                                
                                xtype : 'TreeViewColumn',
                                items : [
                                    {
                                        
                                        xtype : 'CellRendererText',
                                        pack: [ 'pack_start']
                                          
                                    } 
                                ],
                                listeners : {
                                    _rendered : function ()
                                    {
                                        this.el.add_attribute(this.items[0].el , 'markup', 0 );
                                    }
                                }
                              
                            }
                            
                       ]
                    }
                ]
                        
                 
            }
        ]
    };
}
