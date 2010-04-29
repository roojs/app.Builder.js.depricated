//<Script type="text/javascript">

XN = imports.xnew;
Gtk = imports.gi.Gtk;
GObject = imports.gi.GObject;
console = imports.console;
Builder = imports['Builder.js'];
Roo = imports['Roo.js'];

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

var _form = { };



function create() // parent?
{
    
    
    return {
        xns : 'Gtk',
        xtype : 'Dialog',
        type: Gtk.WindowType.TOPLEVEL,
        deletable : false,
        modal : true,
         
        project : false,
        
        show : function (c) 
        {
            c = c || { name : '' , xtype : '' };
            this.project  = c;
            
            for (k in _form) {
                if (!_form[k]) {
                    Seed.print(k);
                    continue;
                }
                
                _form[k].setValue(typeof(c[k]) == 'undefined' ? '' : c[k]);
            }
            this.el.show_all();
            this.success = c.success;
            
            
        },
        
        listeners : 
        {
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
                if (!_form.xtype.getValue().length) {
                    
                    XN.xnew({
                        xtype : 'MessageDialog',
                        xns : 'Gtk',
                        modal : true,
                        buttons : Gtk.ButtonsType.OK,
                        'message-type' : Gtk.MessageType.ERROR,
                        //"secondary-text"           gchar*                : Read / Write
                        //"secondary-use-markup"     gboolean              : Read / Write
                        text   : "You have to set Project type",
                        "use-markup"     : true,
                        listeners : 
                        {
                            'delete-event' : function (widget, event) {
                                this.el.hide();
                                return true;
                            },
                            _rendered : function()
                            {
                                this.el.show_all();
                            },
                            response : function () {
                                this.el.hide();
                            }
                        }
                   });
                    
                    return;
                }
                this.el.hide();
                
                
                
                
                this.project.name  = _form.name.getValue();
                this.project.xtype  = _form.xtype.getValue();
                
                
                
                
                var pr = Builder.Provider.ProjectManager.update(this.project);
                
                this.success(pr);
                Seed.print(id);
            },
            
            _new  : function(self) {
                _win = this;
                _form = { };
            },
            _rendered : function()
            {
                this.el.add_button("OK",1 );
                this.el.add_button("Cancel",0 );
                
                
            }
        },
        
        set : {
            set_border_width : [ 0 ],
            set_title : [ 'Project Properties' ],
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
                                label : "Project Name:"
                            },
                            
                            {
                                xtype : 'Entry',
                                
                                xns: 'Gtk',
                                packing : [ 'pack_end', true, true , 0 ],
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
                        xtype : 'HBox',
                        xns: 'Gtk',
                        packing : [ 'pack_start', false, true , 0 ],
                        
                        items : [
                            {
                                xtype : 'Label',
                                packing : [ 'pack_start', false, true , 0 ],
                                xns: 'Gtk',
                                label : "Project Type:"
                            },
                            
                            
                            {
                
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
                                        
                                        
                                   
                                        xns : 'Gtk',
                                        xtype : 'CellRendererText',
                                        packing : ['pack_start'],
                                        

                                         
                                    },
                                    {
                                        xns : 'Gtk',
                                        packing : [ 'set_model' ],
                                        xtype : 'ListStore',
                                        
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
                        xtype : 'Label',
                        packing : [ 'pack_end', true, true , 0 ],
                        xns: 'Gtk',
                        label : ""
                    },
                    
                    
                    
                    
                ]
            }
        ]
    };
    
}
//_win = XN.xnew(create());