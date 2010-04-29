//<Script type="text/javascript">

XN = imports.xnew;
Gtk = imports.gi.Gtk;
GObject = imports.gi.GObject;
Gio = imports.gi.Gio;
GLib = imports.gi.GLib;
console = imports.console;
Builder = imports['Builder.js'];
Roo = imports['Roo.js'];

/**
 * add a component
 * 
 * basically uses a standard template ? pulled from the web?
 * 
 * you have to pick which template, and give it a name..
 * 
 * and pick which directory to put it in?
 * 
 */



XN.create(  {
        xnsid : 'Builder.DialogNewComponent',
        xid : 'dialog',
        xns : 'Gtk',
        xtype : 'Dialog',
      //  type: Gtk.WindowType.TOPLEVEL,
        deletable : false,
        modal : true,
        title  : "New Component",
         
        project : false,
        
        show : function (c) 
        {
            
            c = c || { name : '' , xtype : '' };
            // check whic project we are adding to..
            Roo.apply(this, c);
            
            this.el.set_screen(XN.get('Builder.Window').window.el.get_screen());
            
            var paths = [];
            for (var i in this.project.paths) {
                paths.push({
                    id : i,
                    desc : i
                });
            }
            
            // load the paths.
            XN.get(this).directory_model.loadData(paths);
                
            
            
            this.el.show_all();
            this.success = c.success;
            
            var tm = XN.get(this).template_model;
            if (tm.templates) {
                return;
            }
            tm.templates = [];
            var dir = __script_path__ + '/templates/';
            
            var f = Gio.file_new_for_path(dir);
            f.enumerate_children_async ("*",  Gio.FileQueryInfoFlags.NONE, 
                    GLib.PRIORITY_DEFAULT, null, function(o,ar) {
                // enum completed..
                var fe = f.enumerate_children_finish(ar);
                var ch = '';
                while (ch = fe.next_file(null)) {
                    var add = dir + '/' + ch.get_name();
                    if (!add.match(/\.js$/)) {
                        continue;
                    }
                    tm.templates.push(add);
                    
                }
                tm.loadData();
                
            }, null);
            
        },
        
        listeners : 
        {
            'delete-event' : function (widget, event) {
                this.el.hide();
                return true;
            },
            
            response : function (w, id) 
            {
                if (id < 1) { // cancel!
                    this.el.hide();
                    return;
                }
                
                
                    
                   
            
                if (!XN.get(this).xnsid.el.get_text().length || 
                    XN.get(this).template.getValue().length ||
                    XN.get(this).directory.getValue().length 
                ) {
                    XN.get('Builder.StandardErrorDialog').dialog.show(
                        "You have to set Project name ,template and directory"
                    );
                     
                    return;
                }
                
                var dir = XN.get(this).template.getValue();
                var xidns = XN.get(this).xnsid.get_text();
                
                
                 if (GLib.file_test (GLib.dir + '/' + xidns + '.js', GLib.FileTest.EXISTS)) {
                    XN.get('Builder.StandardErrorDialog').dialog.show(
                        "That file already exists"
                    ); 
                    return;
                }
                this.el.hide();
                
                
                var tmpl = this.project.loadFileOnly(XN.get(this).template.getValue());
                
                var _this = this;
                tmpl.copyTo(dir + '/' + xidns + '.js', function() {
                    tmpl.setNSID(xidns);
                    _this.project.addFile(tmpl);
                    this.success(_this.project, tmpl);
                });
                
                
                
                
            },
            
            _new  : function(self) {
                
                
            },
            _rendered : function()
            {
                this.el.add_button("OK",1 );
                this.el.add_button("Cancel",0 );
                
                
            }
        },
        
        set : {
            set_border_width : [ 0 ],
           // set_title : [ 'Project Properties' ],
            set_default_size: [600, 400] //,
            
            //show_all : []
        },
     
        items : [
            {
                
                xtype : 'VBox',
                xns: 'Gtk',
                
                packing : function(p,e) {
                    p.el.get_content_area().add(e.el)
                },
                items : [
                    {
                        xtype : 'HBox',
                        xns: 'Gtk',
                        packing : [ 'pack_start', false, true , 0 ],
                        
                        items : [
                            {
                                xtype : 'Label',
                                packing : [ 'pack_start', false, true , 0 ],
                                xns: 'Gtk',
                                label : "Component Name:"
                            },
                            
                            {
                                xid : 'xnsid',
                                xtype : 'Entry',
                                
                                xns: 'Gtk',
                                packing : [ 'pack_end', true, true , 0 ],
                                
                                setValue : function(v) {
                                    this.el.set_text(v);
                                },
                                getValue : function()
                                {
                                    return this.el.get_text();
                                }
                            }
                         
                        ]
                        
                    },
                    {
                        xtype : 'HBox',
                        xns: 'Gtk',
                        packing : [ 'pack_start', false, true , 0 ],
                        
                        items : [
                            {
                                xtype : 'Label',
                                packing : [ 'pack_start', false, true , 0 ],
                                xns: 'Gtk',
                                label : "Using Template:"
                            },
                            
                            
                            {
                                xid : 'template',
                                xns : 'Gtk',
                                xtype : 'ComboBox',
                                packing : [ 'pack_end', true, true , 0 ],
                                set : {
                                 //   set_text_column : [1]
                                   //set_size_request : [150,-1]
                                },
                                
                            
                                setValue : function(v)
                                {
                                    var el = this.el;
                                    el.set_active(-1);
                                    Roo.each(XN.get(this).template_model.templates, function(n) {
                                        if (v == n ) {
                                            el.set_active(ix);
                                            return false;
                                        }
                                    });
                                },
                                getValue : function() 
                                {
                                    var ix = this.el.get_active();
                                    if (ix < 0 ) {
                                        return '';
                                    }
                                    return XN.get(this).template_model.templates[ix];
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
                                    
                                    
                                    _rendered  : function ()
                                    {
                                        
                                       // _form.xtype = this;
                                        this.el.add_attribute(this.items[0].el , 'markup', 1 );  
                                        //this.el.add_attribute(this.items[0].el , 'popup', 2 );     
                                         
                                     
                                  
                                    }
                                },
                                items : [
                                   {
                                        
                                        
                                   
                                        xns : 'Gtk',
                                        xtype : 'CellRendererText',
                                        packing : ['pack_start'],
                                        

                                         
                                    },
                                    {
                                        xid : 'template_model',
                                        xns : 'Gtk',
                                        packing : [ 'set_model' ],
                                        xtype : 'ListStore',
                                        
                                        listeners : {
                                         
                                            _rendered :  function ()
                                            {
                                             
                                                this.el.set_column_types ( 2, [
                                                    GObject.TYPE_STRING,  // real key
                                                    GObject.TYPE_STRING // real type
                                                    
                                                    
                                                ] );
                                             
                                                return;
                                               
                                            
                                            
                                            }
                                        },
                                       
                                        templates : false,
                                        
                                        loadData : function () {
                                            this.el.clear();
                                            var iter = new Gtk.TreeIter();
                                            var el = this.el;
                                            Roo.each(this.templates, function(p) {
                                                
                                                el.append(iter);
                                                
                                                el.set_value(iter, 0, p);
                                                el.set_value(iter, 1, p);
                                                
                                            });
                                             
                                            
                                            
                                        }
                                         
                                    }
                                  
                                         
                                ]
                            }
                 
                                
                        ]
                    },
                    {
                        xtype : 'HBox',
                        xns: 'Gtk',
                        packing : [ 'pack_start', false, true , 0 ],
                        
                        items : [
                            {
                                xtype : 'Label',
                                packing : [ 'pack_start', false, true , 0 ],
                                xns: 'Gtk',
                                label : "In Directory:"
                            },
                            
                            
                            {
                                xid : 'directory',
                                xns : 'Gtk',
                                xtype : 'ComboBox',
                                packing : [ 'pack_end', true, true , 0 ],
                                set : {
                                 //   set_text_column : [1]
                                   //set_size_request : [150,-1]
                                },
                                
                            
                                setValue : function(v)
                                {
                                    var el = this.el;
                                    el.set_active(-1);
                                    Roo.each(XN.get(this).directory_model.data, function(n, ix) {
                                        if (v == n.xtype) {
                                            el.set_active(ix);
                                            return false;
                                        }
                                    })
                                },
                                getValue : function() 
                                {
                                    var ix = this.el.get_active();
                                    if (ix < 0 ) {
                                        return '';
                                    }
                                    return XN.get(this).directory_model.data[ix].xtype;
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
                                    
                                    
                                    _rendered  : function ()
                                    {
                                        
                                       // _form.xtype = this;
                                        this.el.add_attribute(this.items[0].el , 'markup', 1 );  
                                        //this.el.add_attribute(this.items[0].el , 'popup', 2 );     
                                         
                                     
                                  
                                    }
                                },
                                items : [
                                   {
                                        
                                        
                                   
                                        xns : 'Gtk',
                                        xtype : 'CellRendererText',
                                        packing : ['pack_start'],
                                        

                                         
                                    },
                                    {
                                        xns : 'Gtk',
                                        packing : [ 'set_model' ],
                                        xtype : 'ListStore',
                                        xid: 'directory_model',
                                        listeners : {
                                           
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
                                            this.el.clear();
                                            var iter = new Gtk.TreeIter();
                                            var el = this.el;
                                            Roo.each(data, function(p) {
                                                
                                                el.append(iter);
                                                
                                                 
                                                el.set_value(iter, 0, p.id);
                                                el.set_value(iter, 1, p.desc);
                                                
                                            });
                                             
                                            
                                            
                                        }
                                         
                                    }
                                  
                                         
                                ]
                            }
                 
                                
                        ]
                    },
                    {
                        xtype : 'Label',
                        packing : [ 'pack_end', true, true , 0 ],
                        xns: 'Gtk',
                        label : ""
                    }
                    
                    
                    
                    
                ]
            }
        ]
    }
);
    


//XN.xnew(create());
//_win = XN.xnew(create());