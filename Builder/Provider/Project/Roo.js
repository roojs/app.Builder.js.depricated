//<Script type="text/javascript">

console = imports.console;
XObject = imports.XObject.XObject;
 

Base = imports.Builder.Provider.Project.Base.Base;

id = 1;

Roo = XObject.define(
    function(cfg) {
        
        
        Roo.superclass.constructor.call(this, cfg);

       
        // various loader methods..
        this.id = 'project-gti-' + (id++);
    }, 
    Base,
    {
         
        file : false
    
    
    
});
 
 