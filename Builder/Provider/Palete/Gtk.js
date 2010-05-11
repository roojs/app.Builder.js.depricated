//<Script type="text/javascript">
 
Gio = imports.gi.Gio;

console = imports.console;
XObject = imports.XObject.XObject;

Base = imports.Builder.Provider.Palete.Base.Base;

//----------------------- our roo verison



Gtk = XObject.define(
    function(cfg) {
        
       
        // various loader methods..
        this.load();
        this.map = [];
        // no parent...
        
       
    },
    Base,
    {
    
     
        
            var data = File.read(__script_path__ +'/../GtkUsage.txt');
            print(data);
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
         
        }
        
    }
);

    // static load @ starttime.
XObject.extend(Gtk, {
        proplist:  [],
         
        load : function()
        {
             
            return;
            if (this.proplist) {
                return;
            }
            
            var file = Gio.file_new_for_path(__script_path__ +'/../rooprops.json');
            var _this = this;
            file.read_async(0, null, function(source,result) {
                var stream = source.read_finish(result)
                var dstream = new Gio.DataInputStream.c_new(stream);
                var data =  dstream.read_until("");       
                _this.proplist = JSON.parse(data).data;

            });
        },
        guessName : function(ar)
        {
            
           
                                
                                 
        }
        
    }
);

Gtk.load();
