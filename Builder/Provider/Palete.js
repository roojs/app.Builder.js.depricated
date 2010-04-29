//<Script type="text/javascript">
console = imports['console.js']; 
Roo = imports['Roo.js']; 
Gio = imports.gi.Gio;
XN = imports.xnew;
 
Builder = imports['Builder.js']


// Palete Provider..

Builder.Provider.Palete = function(cfg) {
    
    Roo.apply(this, cfg);
    // various loader methods..
   
}

Builder.Provider.Palete.prototype = {
    
    
    map : false, // array of mappings   left: [] , right : []
    
    items : false, // the tree of nodes.
    
    
    /**
     * gather a  list of potentional objects that can be added..
     * 
     */
    gatherList: function (existing) {
        existing = existing || [];
        existing.push('*top'); // always have top
        var ret  = []; 
        
        function addRight(right) {
            Roo.each(right, function(r) {
                if (ret.indexOf(r) > -1) {
                    return;
                }
                ret.push(r);
            });
        }
        
        Roo.each(this.map, function(m) {
            Roo.each(m.left, function(left) {
                var l = left.replace(/:.*$/, '');
                if (existing.indexOf(l) > -1) {
                    addRight(m.right);
                    return true; // no more needed..
                }
            });
            
        });
        return ret;
        
        
        
    },
    
    getDropList : function(rval)
    {
        
        var ret = [];
        Roo.each(this.map, function(m) {
            if (m.right.indexOf(rval) > -1) {
                Roo.each(m.left, function(l) {
                    if (ret.indexOf(l) > -1) {
                        return;
                    }
                    ret.push(l)
                });
            }
            
        });
        console.log("DROP LIST:");
        console.dump(ret);
        return ret;
        
    },
    
    
    confirmCanAdd: function(parent, child) {
        // confirms that one obj can be added to another.
        // returns true, for items, or list of properties that can hold it..
        return true;
        
    }
    
};



