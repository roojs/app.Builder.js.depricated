//<Script type="text/javascript">

console = imports.console;
XObject = imports.XObject.XObject;
 

Base = imports.Builder.Provider.Project.Base.Base;

id = 1;

Gtk = XObject.define(
    function(cfg) {
        
        
        Gtk.superclass.constructor.call(this, cfg);

       
        // various loader methods..
        this.id = 'project-gtk-' + (id++);
    }, 
    Base,
    {
         
        file : false
    
    }
);
 
 