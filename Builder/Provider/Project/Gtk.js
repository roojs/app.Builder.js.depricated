//<Script type="text/javascript">
console = imports['console.js']; 
Roo = imports['Roo.js']; 
XN = imports.xnew;
Gio = imports.gi.Gio;
 
Builder = imports['Builder.js']


Builder.Provider.Project.Gtk = function(cfg) {
    
    
    Builder.Provider.Project.Gtk.superclass.constructor.call(this, cfg);

   
    // various loader methods..
    this.id = Roo.id();
}


Roo.extend(Builder.Provider.Project.Gtk, Builder.Provider.Project,  {
    
    
    file : false
    
    
    
});
 
 