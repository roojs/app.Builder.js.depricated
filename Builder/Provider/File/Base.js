//<Script type="text/javascript">

console = imports.console;
XObject = imports.XObject.XObject;

JSDOC = imports['JSDOC.js'];


// File Provider..

Base = XObject.define(
    
   function(cfg) {
    
        XObject.extend(this, cfg);
    }
    Object,
    {
        
        id : false,
        name : false,   // is the JS name of the file.
        path : '',      // is the full path to the file.
        parent : false, // JS parent.
        
        title : false,  // a title.. ?? nickname.. ??? - 
        project: false, // name...
        Project : false, // link to container project!
        
        items : false, // the tree of nodes.
        
        cn : false, // array used by project tree.
        
        
        /**
         * accepts:
         * { success : , failure : , scope : }
         * 
         * 
         * 
         */
         
        getTree : function( o ) {
            console.log("File.getTree tree called on base object?!?!");
        },
        toJsonArray : function()
        {
            var ret = { }; 
            var _this = this;
            ['id', 'name', 'parent', 'title', 'path'].forEach( function(k) {
                ret[k] = _this[k];
            });
            return ret;
        },
        getTitle : function()
        {
            if (this.title) {
                return this.title;
            }
            return this.path.split('/').pop();
            
        },
        getTitleTip: function()
        {
            if (this.title) {
                return '<b>' + this.title + '</b> ' + this.path;
            }
            return this.path;
        },
        sortCn: function()
        {
            this.cn.sort(function(a,b) {
                return a.path > b.path;// ? 1 : -1;
            });
        },
        
        
        /*
        Roo specific?
        toSourceStdClass: function()
        {
            var cfg = this.items[0]
            var fcfg = XObject.extend({ },  this.items[0]);
            delete fcfg['*class'];
            delete fcfg['*extends'];
            delete fcfg['*static'];
            delete fcfg['|constructor'];
            
            var hasExtends = (typeof(cfg['*extends']) != 'undefined') && cfg['*extends'].length;
            var hasConstructor = (typeof(cfg['|constructor']) != 'undefined');
            var isStatic = (typeof(cfg['*static']) == '*static');
            
            var newline = '';
            var endline = '';
            if (hasExtends) {
                newline =  hasConstructor ? 
                
                 
                    cfg['//constructor'] + "\n" + 
                    cfg['*class'] + " = " + cfg['|constructor'] + "\n\n"+ 
                    "Roo.extend(" + cfg['*class'] + ":, " + cfg['*extends'] + ", " :
                    
                    cfg['//*class'] + "\n" + 
                    cfg['*class'] + " = new " + cfg['*extends'] + "(" ;
                
                endline = ');';
            } else {
                
                
                
                newline  = hasConstructor ? 
                
                    cfg['//constructor'] + "\n" + 
                    cfg['*class'] + " = " + cfg['|constructor'] + "\n\n"+ 
                    'Roo.apply( ' +  cfg['*class'] + ".prototype , " :
                    
                    cfg['//*class'] + "\n" + 
                    cfg['*class'] + " = ";
                
                    
                endline = hasConstructor ? ');' : ';';
            }
                  
            return this.outputHeader() + 
                    newline + 
                    this.objectToJsString(fcfg,1) +
                    endline;
            
            
            
         
        },
        */
        
        copyTo: function(path, cb)
        {
            var _this = this;
            this.loadItems(function() {
                
                _this.path = path;
                cb();
            });
            
        },
        
        
        
        
        /**
         * munges a prop object, removing all the special stuff..
         * putting props back where they should go...
         */
        
        mungePropObj : function(o)
        {
            
           // console.log('mungePropObj: enter');
            var ret = {};
            // standard props do not do anyting.
            for (var i in o){
                if (['items', '*prop'].indexOf(i) > -1) {
                    continue;
                }
                
                ret[i] = o[i];
            }
            ret.items = [];
            o.items = o.items || [];
            var _this = this;
            o.items.forEach( function(e) {
                if (typeof(e) == 'undefined') {
                    return;
                }
                
                if (typeof(e) != 'object') {
                    // should not really hapen?!!?
                    ret.items.push(e); // could be 
                    return;
                }
                if (typeof(e['*prop']) != 'undefined') {
                    var pn = e['*prop'];
                    var val = _this.mungePropObj(e);
                    
                    if (e['xtype'].match(/^Array/)) {
                        ret[pn] = val.items;
                        return;
                    }
                    
                    ret[pn] = val;
                    return;
                }
                // handle fake arrays...
                var val = _this.mungePropObj(e);
                
                ret.items.push(val); // again should not really happen...
                     
                
            });
            //console.log('mungePropObj: leave');
            // do we munge '*' xtypes?
            return ret;
            
        },
        objectKeys : function(o) {
            var ret = [];
            for (var k in o) {
                ret.push(k)
            }
            return ret;
        },
        
        objectToJsString : function (o, ind) 
        {
            ind = ind || 0;
            
            
            var ret = '';
            var ix = new Array(ind+1).join("    ");
            var ix1 = new Array(ind).join("    ");
            for (var k in o) {
                var v = o[k];
                if (k[0] == '+') { // + means  hide from renderer.. we do not save this.
                    continue;
                }
                if (k[0] == '/') { //  means  hide from renderer.. we prefix the col with it..
                    continue;
                }
            
                
                if (typeof(v) == 'object') {
                    
                    if ((v.constructor != Array) && !this.objectKeys(v).length) {
                        continue;
                    }
                    if ((v.constructor == Array) && !v.length && k == 'items') {
                        continue;
                    }   
                }
                ret += ret.length ? ",\n" : '';
                
                var kk = k[0] == '|' ? k.substring(1) : k;
                if (typeof(o['//' + kk]) != 'undefined') {
                    ret += ix + o['//' + kk].split("\n").join( "\n" + ix) + "\n";
                }
                
                switch(typeof(v)) {
                    case 'object': 
                        if (v.constructor == Array) {
                            ret += ix + this.toJsProp(k) +  ' : ' + this.arrayToJsString(v, ind+1);
                            continue;
                        }
                    
                    
                        ret += ix + this.toJsProp(k) +  ' : ' + this.objectToJsString(v, ind+1);
                        continue;
                    
                    case 'boolean' : 
                        ret += ix + this.toJsProp(k) +  ' : ' +  (v ? 'true' : 'false');
                        continue;
                    
                    case 'number' : 
                        ret += ix + this.toJsProp(k) +  ' : ' +  v;
                        continue;
                        
                    
                    case 'string': 
                        if (k[0] == '|') {
                            ret += ix + this.toJsProp(k) +  ' : ' +  v.split("\n").join( "\n" + ix);
                            continue;
                        }
                        // fallthru
                    
                    default:
                        // we should use special stuff here to determine if it's a singly or dobuley 
                        // quoted string..
                        ret += ix + this.toJsProp(k) +  ' : ' +  this.stringToJsString(v, k, o);
                        continue;
                        
                     
                    }
            }
            return "{\n" + ret + "\n" + ix1 + '}'; 
            
        },
        arrayToJsString : function (ar, ind)
        {
            var isobjar = false;
            ar.forEach( function(o) {
                if (typeof(o) == 'object' && (o.constructor != Array)) {
                    isobjar = true;
                }
            });
            var ix = '';
            var ix1 = '';
            var cr = ', ';
            var lb = ' ';
            if (isobjar) {
                ix = new Array(ind+1).join("    ");
                ix1 = new Array(ind).join("    ");
                cr = ",\n";
                lb = "\n";
                 
            }
            // array of parts...
            var ret =  '';
            var _this = this;
            ar.forEach( function(v, n) {
                // skip blank last element in an array
                if ((n == (ar.length -1))  && typeof(v) == 'undefined') {
                    return;
                }
                
                // empty objects in array?
                if (typeof(v) == 'object' && v.constructor != Array) {
                    if (!_this.objectKeys(v).length) {
                        return;
                    }
                }
                    
                
                ret += ret.length ? cr : '';
                
                switch(typeof(v)) {
                
                    case 'object': 
                        if (v.constructor == Array) {
                            
                            ret += ix + _this.arrayToJsString(v, ind+1);
                            return;
                        }
                    
                        ret += ix + _this.objectToJsString(v, ind+1);
                        return;
                    
                    case 'boolean' : 
                        ret += ix +  (v ? 'true' : 'false');
                        return;
                    
                    case 'number' : 
                        ret += ix +  v;
                        return;
                        
                    
                    case 'string': 
                        if (k[0] == '|') {
                            ret += ix + v.split("\n").join( "\n" + ix);
                            return;
                        }
                        // fallthru
                    
                    default:
                        // we should use special stuff here to determine if it's a singly or dobuley 
                        // quoted string..
                        ret += ix + JSON.stringify(v);
                        return;
                        
                 
                }
                 
            });
            return "[" + lb  + ret + lb + ix1 + "]";
            
        },
        stringToJsString :  function(v, k , o) {
            // since most properties can use single quotes (non-translatable)
            // we try to fix this here..
            var val = JSON.stringify(v);
            if (['xns', 'xtype'   ].indexOf(k) > -1) {
                return "'" + val.substring(1, val.length-1).replace(/'/, "\\'") + "'";
            }
            return val;
            
            
        },
        
        
        toJsProp:  function(v) {
            var vv = v[0] == '|' ? v.substring(1) : v;
            if (JSDOC.Lang.isKeyword(vv) || JSDOC.Lang.isBuiltin(vv)) {
                return "'" + vv + "'";
            }
            if (vv.match(/[^A-Z_]+/i)) {
                var val = JSON.stringify(vv);
                return "'" + val.substring(1, val.length-1).replace(/'/, "\\'") + "'";
            }
            return vv;
        }
        
        
    }
);






