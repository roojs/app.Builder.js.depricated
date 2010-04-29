//<Script type="text/javascript">

XN = imports.xnew;
Gtk = imports.gi.Gtk;
GObject = imports.gi.GObject;
console = imports.console;
Builder = imports['Builder.js'];
Roo = imports['Roo.js'];

StandardErrorDialog = imports.Builder.StandardErrorDialog.StandardErrorDialog;
ProjectManager =      imports.Builder.Provider.ProjectManager.ProjectManager;
/**
 * add/edit project
 * 
 * project type: gtk or roo..
 * 
 * directory.
 * 
 * 
 * 
 */

 
EditProject = new XObject({
    
        
        xtype : Gtk.Dialog,
        type: Gtk.WindowType.TOPLEVEL,
        deletable : false,
        modal : true,
        
        project : {},
        init : function()
        {
            XObject.prototype.init.call(this); 
            this.el.add_button("OK",1 );
            this.el.add_button("Cancel",0 );
            
        },
        show : function (c) 
        {
            c = c || { name : '' , xtype : '' };
            this.project  = c;
            
            [ 'xtype' , 'name' ].forEach(function(k) {
                this.get(k).setValue(typeof(c[k]) == 'undefined' ? '' : c[k]);
            }
            this.el.show_all();
            this.success = c.success;
            
            
        },
        
        listeners :  {
            
            'delete-event' : function (widget, event) {
                this.el.hide();
                return true;
            },
            
            response : function (w, id) 
            {
                
                if (id < 1) {
                    this.el.hide();
                    return;
                }
                if (!this.get('xtype').getValue().length) {
                    StandardErrorDialog.show("You have to set Project type");
                     
                    return;
                }
                this.el.hide();
                
                
                
                
                this.project.name  = this.get('name').getValue();
                this.project.xtype  = this.get('xtype').getValue();
                
                
                
                
                var pr = ProjectManager.update(this.project);
                
                this.success(pr);
                Seed.print(id);
            },
            
        
            
        },
        
        set : {
            set_border_width : [ 0 ],
            set_title : [ 'Project Properties' ],
            set_default_size: [600, 400] //,
            
            //show_all : []
        },
     
        items : [
            {
                
                xtype : Gtk.VBox',
                xns: 'Gtk',
                
                pack : function(p,e) {
                    p.el.get_content_area().add(e.el)
                },
                items : [
                    {
                        xtype : Gtk.HBox',
                        xns: 'Gtk',
                        pack : [ 'pack_start', false, true , 0 ],
                        
                        items : [
                            {
                                xtype : Gtk.Label',
                                pack : [ 'pack_start', false, true , 0 ],
                                xns: 'Gtk',
                                label : "Project Name:"
                            },
                            
                            {
                                xtype : Gtk.Entry',
                                
                                xns: 'Gtk',
                                pack : [ 'pack_end', true, true , 0 ],
                                listeners : {
                                    _rendered  : function(self) {
                                        
                                        _form.name = this;
                                    }
                                },
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
                        xtype : Gtk.HBox',
                        xns: 'Gtk',
                        pack : [ 'pack_start', false, true , 0 ],
                        
                        items : [
                            {
                                xtype : Gtk.Label',
                                pack : [ 'pack_start', false, true , 0 ],
                                xns: 'Gtk',
                                label : "Project Type:"
                            },
                            
                            
                            {
                
                                
                                xtype : Gtk.ComboBox',
                                pack : [ 'pack_end', true, true , 0 ],
                                set : {
                                 //   set_text_column : [1]
                                   //set_size_request : [150,-1]
                                },
                                
                            
                                setValue : function(v)
                                {
                                    var el = this.el;
                                    el.set_active(-1);
                                    Roo.each(this.model.data, function(n, ix) {
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
                                    return this.model.data[ix].xtype;
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
                                        _view = this;
                                    },
                                    
                                    _rendered  : function ()
                                    {
                                        
                                        _form.xtype = this;
                                        this.el.add_attribute(this.items[0].el , 'markup', 1 );  
                                        //this.el.add_attribute(this.items[0].el , 'popup', 2 );     
                                         
                                     
                                  
                                    }
                                },
                                items : [
                                   {
                                        
                                        
                                   
                                        
                                        xtype : Gtk.CellRendererText',
                                        pack : ['pack_start'],
                                        

                                         
                                    },
                                    {
                                        
                                        pack : [ 'set_model' ],
                                        xtype : Gtk.ListStore',
                                        
                                        listeners : {
                                            _new : function()
                                            {
                                                _view.model = this;
                                            },
                                            _rendered :  function ()
                                            {
                                             
                                                this.el.set_column_types ( 2, [
                                                    GObject.TYPE_STRING,  // real key
                                                    GObject.TYPE_STRING // real type
                                                    
                                                    
                                                ] );
                                                
                                                this.data = [
                                                    { xtype: 'Roo', desc : "Roo Project" },
                                                    { xtype: 'Gtk', desc : "Gtk Project" },    
                                                    //{ xtype: 'JS', desc : "Javascript Class" }
                                                ]
                                                
                                                this.loadData(this.data);
                                                
                                                return;
                                               
                                            
                                            
                                            }
                                        },
                                       
                                       
                                        
                                        loadData : function (data) {
                                            
                                            var iter = new Gtk.TreeIter();
                                            var el = this.el;
                                            Roo.each(data, function(p) {
                                                
                                                el.append(iter);
                                                
                                                 
                                                el.set_value(iter, 0, p.xtype);
                                                el.set_value(iter, 1, p.desc);
                                                
                                            });
                                             
                                            
                                            
                                        }
                                         
                                    }
                                  
                                         
                                ]
                            }
                 
                                
                        ]
                    },
                    {
                        xtype : Gtk.Label',
                        pack : [ 'pack_end', true, true , 0 ],
                        xns: 'Gtk',
                        label : ""
                    },
                    
                    
                    
                    
                ]
            }
        ]
    };
    
}
//_win = XN.xnew(create());