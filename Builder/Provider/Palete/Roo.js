//<Script type="text/javascript">
console = imports['console.js']; 
Roo = imports['Roo.js']; 
Gio = imports.gi.Gio;
XN = imports.xnew;
 
Builder = imports['Builder.js'];

//----------------------- our roo verison



Builder.Provider.Palete.Roo = function(cfg) {
    
   
    // various loader methods..
    
    this.map = [];
      
    
   
}

Roo.extend(Builder.Provider.Palete.Roo, Builder.Provider.Palete,   {
    
     
    load: function ( o ) {
       //  Seed.print(__script_path__ +'/RooUsage.txt');
         var file = Gio.file_new_for_path(__script_path__ +'/../RooUsage.txt');
                                    
         var _this = this;                        
         
                                    
        file.read_async(0, null, function(source,result) {
            var stream = source.read_finish(result)
            var dstream = new Gio.DataInputStream.c_new(stream);
          
            var data =  dstream.read_until("")
            data  = data.split(/\n/g);
            var state = 0;
            var cfg = [];
            var left = [];
            var right = [];
            
            Roo.each(data, function(d) {
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
            _this.map = cfg;
            o.success.apply(o.scope || _this, [_this]);
            //console.dump(cfg);
        });
    }, 
    
     
    
    
});
// static load @ starttime.
Roo.apply(Builder.Provider.Palete.Roo, {
     proplist:  false,
     
     load : function()
     {
         

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
        
        // console.log('xns:' + ar.xns + ', xtype:' + ar.xtype);
        
        
        if (!this.proplist) {
            return '';
        }
        
        var data = this.proplist;
        
        var xns = typeof(ar['|xns']) != 'undefined' ? ar['|xns'] : false;
        
        if (xns && ar.xtype) {
            if (typeof(data[xns + '.' + ar.xtype]) == 'undefined') {
                console.log('no-match');
                return '';
            }
            console.log('match');
            return xns + '.' + ar.xtype;

        }        
        if (typeof(data[ ar.xtype]) !== 'undefined') {
            console.log('match xtype');
            return ar.xtype;
        }
        
        // do guess work..
        var opts = [ 'Roo',  'Roo.menu' , 'Roo.form',  'Roo.data',   'Roo.grid',   'Roo.Toolbar' ];
        for(var i in opts) {
            var o = opts[i];
            if (typeof(data[ o + '.'  + ar.xtype]) !== 'undefined') {
                console.log('match:' + o);
                return o + '.'  + ar.xtype;
               
            }
            
        }
        console.log('no-match');
        return '';
                            
                             
    }
    
})

Builder.Provider.Palete.Roo.load();
