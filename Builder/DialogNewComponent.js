//<Script type="text/javascript">

Gtk = imports.gi.Gtk;
GObject = imports.gi.GObject;
Gio = imports.gi.Gio;
GLib = imports.gi.GLib;

console = imports.console.console;
XObject = imports.XObject.XObject;


StandardErrorDialog = imports.Builder.StandardErrorDialog.StandardErrorDialog;
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

DialogNewComponent = new XObject({
        
        xtype : Gtk.Dialog,
      //  type: Gtk.WindowType.TOPLEVEL,
        deletable : false,
        modal : true,
        title  : "New Component",
        border_width : 0,
        project : false,
        init : function()
        {
            XObject.prototype.init.call(this); 
            this.el.add_button("OK",1 );
            this.el.add_button("Cancel",0 );
           
        
           
            this.el.set_default_size (600, 400);
            
            //show_all : []
        },
       
        show : function (c) 
        {
            if (!this.el) {
                this.init();
            }
            c = c || { name : '' , xtype : '' };
            // check whic project we are adding to..
            XObject.extend(this, c);
            var Window                = imports.Builder.Window.Window;
            this.el.set_screen(Window.el.get_screen());
            
            var paths = [];
            for (var i in this.project.paths) {
                paths.push({
                    id : i,
                    desc : i
                });
            }
            
            // load the paths.
            this.get('directory_model').loadData(paths);
                
            
            
            this.el.show_all();
            this.success = c.success;
            
            var tm = this.get('template_model');
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
                
                
                    
                   
            
                if (!DialogNewComponent.get('xnsid').el.get_text().length || 
                   DialogNewComponent.get('template').getValue().length ||
                   DialogNewComponent.get('directory').getValue().length 
                ) {
                    StandardErrorDialog.show(
                        "You have to set Project name ,template and directory"
                    );
                     
                    return;
                }
                
                var dir = DialogNewComponent.get('template').getValue();
                var xidns = DialogNewComponent.get('xnsid').get_text();
                
                
                 if (GLib.file_test (GLib.dir + '/' + xidns + '.js', GLib.FileTest.EXISTS)) {
                    StandardErrorDialog.show(
                        "That file already exists"
                    ); 
                    return;
                }
                this.el.hide();
                
                
                var tmpl = this.project.loadFileOnly(DialogNewComponent.get('template').getValue());
                
                var _this = this;
                tmpl.copyTo(dir + '/' + xidns + '.js', function() {
                    tmpl.setNSID(xidns);
                    _this.project.addFile(tmpl);
                    this.success(_this.project, tmpl);
                });
                
                
                
                
            }
            
            
            
        },
        
       
     
        items : [
            {
                
                xtype : Gtk.VBox,
                
                pack: function(p,e) {
                    p.el.get_content_area().add(e.el)
                },
                items : [
                    {
                        xtype : Gtk.HBox,
                        pack : [ 'pack_start', false, true , 0 ],
                        
                        items : [
                            {
                                xtype : Gtk.Label,
                                label : "Component Name:",
                                pack : [ 'pack_start', false, true , 0 ]
                                
                            },
                            
                            {
                                id : 'xnsid',
                                xtype : Gtk.Entry,
                                pack : [ 'pack_end', true, true , 0 ],
                                setValue : function(v) 
                                {
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
                        xtype : Gtk.HBox,
                        pack : [ 'pack_start', false, true , 0 ],
                        
                        items : [
                            {
                                xtype : Gtk.Label,
                                label : "Using Template:",
                                pack : [ 'pack_start', false, true , 0 ],
                                
                            },
                            
                            
                            {
                                id : 'template',
                                xtype : Gtk.ComboBox,
                                pack : [ 'pack_end', true, true , 0 ],
                                init : function()
                                {
                                    XObject.prototype.init.call(this); 
                                    this.el.add_attribute(this.items[0].el , 'markup', 1 );  
                                       
                                },
                            
                                setValue : function(v)
                                {
                                    var el = this.el;
                                    el.set_active(-1);
                                    DialogNewComponent.get('template_model').templates.forEach(
                                        function(n, ix) {
                                            if (v == n ) {
                                                el.set_active(ix);
                                                return false;
                                            }
                                        }
                                    );
                                },
                                getValue : function() 
                                {
                                    var ix = this.el.get_active();
                                    if (ix < 0 ) {
                                        return '';
                                    }
                                    return DialogNewComponent.get('template_model').templates[ix];
                                  
                                },
                                
                                 
                                items : [
                                    {
                                        
                                        xtype : Gtk.CellRendererText,
                                        pack : ['pack_start'],
                                        
                                    },
                                    {
                                        id : 'template_model',
                                        pack : [ 'set_model' ],
                                        xtype : Gtk.ListStore,
                                        
                                        init :   function ()
                                        {
                                            XObject.prototype.init.call(this); 
                                            this.el.set_column_types ( 2, [
                                                    GObject.TYPE_STRING,  // real key
                                                    GObject.TYPE_STRING // real type
                                            ] );
                                             
                                            
                                        
                                        },
                                       
                                        templates : false,
                                        
                                        loadData : function () {
                                            this.el.clear();
                                            var iter = new Gtk.TreeIter();
                                            var el = this.el;
                                            this.templates.forEach(function(p) {
                                                
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
                        xtype : Gtk.HBox,
                        
                        pack : [ 'pack_start', false, true , 0 ],
                        
                        items : [
                            {
                                xtype : Gtk.Label,
                                pack : [ 'pack_start', false, true , 0 ],
                                label : "In Directory:"
                            },
                            
                            {
                                id : 'directory',
                                
                                xtype : Gtk.ComboBox,
                                pack : [ 'pack_end', true, true , 0 ],
                            
                                 init : function()
                                {
                                    XObject.prototype.init.call(this); 
                                   this.el.add_attribute(this.items[0].el , 'markup', 1 );  
                                       
                                },
                            
                                setValue : function(v)
                                {
                                    var el = this.el;
                                    el.set_active(-1);
                                    DialogNewComponent.get('directory_model').data.forEach(
                                        function(n,ix) {
                                            if (v == n.xtype) {
                                                el.set_active(ix);
                                                return false;
                                            }
                                        }
                                    );
                                },
                                getValue : function() 
                                {
                                    var ix = this.el.get_active();
                                    if (ix < 0 ) {
                                        return '';
                                    }
                                    var data = DialogNewComponent.get('directory_model').data;
                                    
                                    return  data[ix].desc;
                                    
                                },
                                
                                 
                                items : [
                                    {
                                        xtype : Gtk.CellRendererText,
                                        pack : ['pack_start'],
                                    },
                                    {
                                        
                                        xtype : Gtk.ListStore,
                                        pack : [ 'set_model' ],
                                        id: 'directory_model',
                                        init : function()
                                        {
                                            XObject.prototype.init.call(this); 
                                            this.el.set_column_types ( 2, [
                                                GObject.TYPE_STRING,  // real key
                                                GObject.TYPE_STRING // real type
                                            ]); 
                                        },
                                     
                                       
                                       
                                        
                                        loadData : function (data) {
                                            this.el.clear();
                                            this.data   = data;
                                            var iter = new Gtk.TreeIter();
                                            var el = this.el;
                                            data.forEach( function(p) {
                                                
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
                        xtype : Gtk.Label,
                        pack : [ 'pack_end', true, true , 0 ],
                        label : ""
                    }
                    
                    
                ]
            }
        ]
    }
);
    


//XN.xnew(create());
//_win = XN.xnew(create());