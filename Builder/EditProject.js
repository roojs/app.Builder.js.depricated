//<Script type="text/javascript">

 
Gtk = imports.gi.Gtk;
GObject = imports.gi.GObject;
console = imports.console;
XObject = imports.XObject.XObject;

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
    
        
        xtype : function () {
            return new Gtk.Dialog({type: Gtk.WindowType.TOPLEVEL});
        },
        deletable : false,
        modal : true,
        border_width : 0,
        title : "Project Properties",
        project : {},
        init : function()
        {
            XObject.prototype.init.call(this); 
            this.el.add_button("OK",1 );
            this.el.add_button("Cancel",0 );
             
            this.el.set_default_size(600, 400);
        },
        show : function (c) 
        {
            
            c = c || { name : '' , xtype : '' };
            this.project  = c;
            if (!this.el) {
                this.init();
            }
            var _this = this;
            [ 'xtype' , 'name' ].forEach(function(k) {
                _this.get(k).setValue(typeof(c[k]) == 'undefined' ? '' : c[k]);
            });
            
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
        
      
        items : [
            {
                
                xtype : Gtk.VBox,
                pack : function(p,e) {
                    p.el.get_content_area().add(e.el)
                },
                items : [
                    {
                        xtype : Gtk.HBox,
                        pack : [ 'pack_start', false, true , 0 ],
                        items : [
                            {
                                xtype : Gtk.Label,
                                pack : [ 'pack_start', false, true , 0 ],
                                label : "Project Name:"
                            },
                            
                            {
                                xtype : Gtk.Entry,
                                id : 'name',
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
                                pack : [ 'pack_start', false, true , 0 ],
                                label : "Project Type:"
                            },
                            {
                                xtype : Gtk.ComboBox,
                                id : 'xtype',
                                pack : [ 'pack_end', true, true , 0 ],
                                init : function() {
                                    XObject.prototype.init.call(this); 
                                    this.el.add_attribute(this.items[0].el , 'markup', 1 );  
                                },
                                setValue : function(v)
                                {
                                    var el = this.el;
                                    el.set_active(-1);
                                    this.get('model').data.forEach(function(n, ix) {
                                        if (v == n.xtype) {
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
                                    return this.get('model').data[ix].xtype;
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
                                
                                
                                items : [
                                    {
                                        xtype : Gtk.CellRendererText,
                                        pack : ['pack_start']
                                    },
                                    {
                                        id : 'model',
                                        pack : [ 'set_model' ],
                                        xtype : Gtk.ListStore,
                                        init : function ()
                                        {
                                            XObject.prototype.init.call(this); 
                             
                                     
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
                                                
                                            
                                            
                                        },
                                       
                                       
                                        
                                        loadData : function (data) {
                                            
                                            var iter = new Gtk.TreeIter();
                                            var el = this.el;
                                            data.forEach(function(p) {
                                                
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
                        xtype : Gtk.Label,
                        pack : [ 'pack_end', true, true , 0 ],
                        
                        label : ""
                    }
                    
                    
                    
                    
                ]
            }
        ]
    }
    
)
//_win = XN.xnew(create());