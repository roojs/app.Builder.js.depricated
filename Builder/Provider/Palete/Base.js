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
        
        
        guessName : function(ar) // turns the object into full name.
        {
             // eg. xns: Roo, xtype: XXX -> Roo.xxx
            if (typeof( ar['|xns'] ) == 'undefined' || typeof( ar['xtype'] ) == 'undefined') {
                return '';
               }
             
            return ar['|xns'] +'.' + ar['xtype'];
                            
                                 
        },
        /**
         * gather a  list of potentional objects that can be added..
         * 
         */
        gatherList: function (existing) {
            existing = existing || [];
           // existing.push('*top'); // always have top
            var ret  = []; 
            console.log("GATHER LIST? " + this.map.length);
            
            
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
                   // print("chk:" + l + " in " + existing.join(',')); 
                    if (existing.indexOf(l) > -1) {
                        addRight(m.right);
                        done =true;
                        //return true; // no more needed..
                    }
                });
                
            });
            ret.sort();
            
           // console.dump(ret);
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
        /**
         * basic guess type.. 
         * 
         */
        findType : function (data, prop, value)
        {
            if (prop[0] == '|') {
                return 'function';
            }
            return typeof(value);
        },
        
        
        findOptions : function(ename)
        {
            switch(ename) {
                case 'boolean': 
                    return [ 'true', 'false' ];
                // everything else does not have options.
                case 'string': 
                case 'utf8': 
                case 'int': 
                case 'uint': 
                case 'function': 
                    return false;
                default: 
                    console.log("OOPS: = unknown type: " + ename);
                    return false;
            }
        },
        confirmCanAdd: function(parent, child) {
            // confirms that one obj can be added to another.
            // returns true, for items, or list of properties that can hold it..
            return true;
            
        }
        
    }
);



