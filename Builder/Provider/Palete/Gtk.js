//<Script type="text/javascript">
 
Gio = imports.gi.Gio;

console = imports.console;
XObject = imports.XObject.XObject;

Base = imports.Builder.Provider.Palete.Base.Base;
File = imports.File.File;
//----------------------- our roo verison



Gtk = XObject.define(
    function(cfg) {
        
       
        // various loader methods..
          this.map = [];
        this.load();
      
        // no parent...
        
       
    },
    Base,
    {
        load: function () {
                
         
        
            var data = File.read(__script_path__ +'/../GtkUsage.txt');
          // print(data);
            data  = data.split(/\n/g);
            var state = 0;
            var cfg = [];
            var left = [];
            var right = [];
            
            data.forEach( function(d) {
                if (!d.length || d.match(/^\s+$/) || d.match(/^\//)) { //empty
                    return;
                }
                if (d.match(/^left:/)) { 
                    state = 1;
                    if (left.length ){
                        
                        cfg.push({
                            left : left,
                            right: right
                        });
                        }
                    left = [];
                    right = [];
                    return;
                }
                if (d.match(/^right:/)) { 
                    state = 2;
                    return;
                }
                if (state == 1) {
                    left.push(d.replace(/\s+/g, ''));
                    return;
                }
                right.push(d.replace(/\s+/g, ''));
                //Seed.quit();
               
            }); 
            if (left.length ){
                        
                cfg.push({
                    left : left,
                    right: right
                });
            }
            this.map = cfg;
             
        },
        loadProps : function()
        {
             

            if (this.proplist) {
                return;
            }
            
            var file = Gio.file_new_for_path(__script_path__ +'/../rooprops.json');
            var _this = this;
            
            var data =  File.read(__script_path__ +'/../rooprops.json');
            this.proplist = JSON.parse(data).data;
        }
        getPropertiesFor: function(ename, type)
        {
            this.loadProps();
            if (typeof(this.proplist[ename]) == 'undefined' || 
                typeof(this.proplist[ename][type]) == 'undefined' ) {
                    return [];
            }
            return this.proplist[ename][type];
        }
        
        
        
    }
);
 
