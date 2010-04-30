//<Script type="text/javascript">
Gio = imports.gi.Gio;
Gtk = imports.gi.Gtk;
Gdk = imports.gi.Gdk;
Pango = imports.gi.Pango ;
GObject = imports.gi.GObject;

XObject = imports.XObject.XObject;
console = imports.console;

ProjectManager      = imports.Builder.ProjectManager.ProjectManager; 
LeftProjectTree     = imports.Builder.LeftProjectTree.LeftProjectTree;
LeftTree            = imports.Builder.LeftTree.LeftTree;

// vbox


// expander
// notebook

LeftTopPanel = new XObject({
        
        xtype : Gtk.VBox,
        
        items : [
            
            {
                id : 'expander',
                xtype : Gtk.Expander,
                
                label : 'Project Tree',
                pack : ['pack_start', false , true ], // expand // fill.
                init : function(){
                    XObject.prototype.init.call(this); 
                    this.el.add_events (Gdk.EventMask.BUTTON_MOTION_MASK );
                },
                listeners : {
                    
                    activate : function () 
                    {
                        var nb = LeftTopPanel.get('notebook');
                        if (this.el.expanded) {
                            // now expanded..
                            var pm  = ProjectManager;
                            
                           
                            var model = LeftProjectTree.get('combomodel');
                            
                            model.loadData(ProjectManager.projects);
                             
                            
                            nb.el.set_current_page(1);
                            //pm.on('changed', function() {
                                //console.log("CAUGHT project manager change");
                            //    _combo.model.loadData(pm.projects);
                            //}
                            return;
                        }
                        nb.el.set_current_page(0);
                        
                       //Seed.print("ACTIVATE?");
                       // var pm  = Builder.Provider.ProjectManager;
                       // _combo.model.loadData(pm.projects);
                       // pm.on('changed', function() {
                       //     console.log("CAUGHT project manager change");
                       //    _combo.model.loadData(pm.projects);
                        //});
                       // this.items[0].el[this.get_expanded() ? 'hide' : 'show']();
                    },
                    'enter-notify-event' : function (w,e)
                    {
                        
                        //console.log("enter!");
                        this.el.expanded = !this.el.expanded;
                        //if (this.el.expanded ) {
                            this.listeners.activate.call(this);
                        //   }
                        
                       // return true;
                    }
                    
                },
            },
            {
                    
                xtype : Gtk.Notebook,
                id: 'notebook',
                label : 'Project Tree',
                'show-border' : false,
                'show-tabs' : false,
                pack : ['pack_start', true , true ], // expand // fill.
                
                init : function()
                {
                    XObject.prototype.init.call(this); 
                    this.el.set_current_page(0);
                },
                
                items :  [
                    LeftTree,
                    LeftProjectTree
                    
                ]
            }
            
        ]
    }
);
            
            
            