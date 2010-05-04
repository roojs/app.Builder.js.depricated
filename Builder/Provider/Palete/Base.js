//<Script type="text/javascript">
 
console = imports.console;
XObject = imports.XObject.XObject;


// Palete Provider..
Base = XObject.define(
    function(cfg) {
    
        XObject.extend(this, cfg);
        // various loader methods..
   
    },
    Object, 
    {
        
        
        map : false, // array of mappings   left: [] , right : []
        
        items : false, // the tree of nodes.
        
        
        /**
         * gather a  list of potentional objects that can be added..
         * 
         */
        gatherList: function (existing) {
            existing = existing || [];
           // existing.push('*top'); // always have top
            var ret  = []; 
           // console.dump(this.map);
            function addRight(right) {
                right.forEach(function(r) {
                    if (ret.indexOf(r) > -1) {
                        return;
                    }
                    ret.push(r);
                });
            }
            
            this.map.forEach(function(m) {
                var done = false
                m.left.forEach( function(left) {
                    if (done) return; 
                    
                    var l = left.replace(/:.*$/, '');
                    print("chk:" + l + " in " + existing.join(',')); 
                    if (existing.indexOf(l) > -1) {
                        addRight(m.right);
                        done =true;
                        //return true; // no more needed..
                    }
                });
                
            });
            console.dump(ret);
            return ret;
            
            
            
        },
        
        getDropList : function(rval)
        {
            
            var ret = [];
            this.map.forEach( function(m) {
                if (m.right.indexOf(rval) > -1) {
                    m.left.forEach(function(l) {
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
        
    }
);



