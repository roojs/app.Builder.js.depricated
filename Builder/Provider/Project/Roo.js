//<Script type="text/javascript">
console = imports['console.js']; 
Roo = imports['Roo.js']; 
XN = imports.xnew;
Gio = imports.gi.Gio;
 
Builder = imports['Builder.js']


Builder.Provider.Project.Roo = function(cfg) {
    
    
    Builder.Provider.Project.Roo.superclass.constructor.call(this, cfg);

   
    // various loader methods..
    this.id = Roo.id();
}


Roo.extend(Builder.Provider.Project.Roo, Builder.Provider.Project,  {
    
    
    file : false
    
    
    /*
    // is this used??
    fetchTree : function (o) {
        var file = Gio.file_new_for_path(this.file);
                                
        var _this = this;                        
        this.files = [];
                                
        file.read_async(0, null, function(source,result) {
            var stream = source.read_finish(result);
            var dstream = new Gio.DataInputStream.c_new(stream);
          
            var data =  JSON.parse(dstream.read_until(""));
            Roo.each(data.data, function(d) {
                d.Project = this;
                _this.files.push(new Builder.Provider.File.Roo(d));
                
               //console.dump(data);
            });
            
            o.success.apply(o.scope || this, [this]);
            //Seed.quit();
           
        }); 
        
        return true;
    }
    */
});
 
 