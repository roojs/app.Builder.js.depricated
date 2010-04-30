//<Script type="text/javascript">

console = imports.console;
XObject = imports.XObject.XObject;
 

Base = imports.Builder.Provider.File.Base.Base;

id = 1;

Gtk = XObject.define(
    function(cfg) {
        
        
        Gtk.superclass.constructor.call(this, cfg);

       
        // various loader methods..
        this.id = 'project-gti-' + (id++);
    }, 
    Base,
    {
         
        file : false
    
    
    
});
 
 