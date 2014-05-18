//<Script type="text/javascript">


var XObject     = imports.XObject.XObject;


var Lang        = imports.JsRender.Lang.Lang;


var JsParser    = imports.JsParser.JsParser;
var TokenReader = imports.JSDOC.TokenReader.TokenReader;
var TextStream  = imports.JSDOC.TextStream.TextStream;

var File = imports.File.File;
// File Provider..

Base = XObject.define(
    
    function(cfg) {
        
        XObject.extend(this, cfg);
        
    },
    Object,
    {
        /**
         * @cfg {Array} doubleStringProps list of properties that can be double quoted.
         */
        doubleStringProps : false,
        
        id : false,
        name : false,   // is the JS name of the file.
        path : '',      // is the full path to the file.
        parent : false, // JS parent.
        
        title : false,  // a title.. ?? nickname.. ??? - 
        project: false, // name...
        //Project : false, // link to container project!
        
        items : false, // the tree of nodes.
        
        cn : false, // array used by project tree.
        
        
        save : function()
        {
            var write = { }; 
            var _this = this;
            var write = this.toJsonArray()
            print("WRITE: " + this.path);// + "\n" + JSON.stringify(write));
            File.write(this.path, JSON.stringify(write, null, 4));
        },
        
        saveHTML : function()
        {
            // NOOP
        },
        
        /**
         *
         * load from a javascript file.. rather than bjs..
         * 
         *
         */
         
        _loadItems : function(cb)
        {
            // already loaded..
            if (this.items !== false) {
                return false;
            }
              
            
            
            var tr = new  TokenReader(  { 
                keepDocs :true, 
                keepWhite : true,  
                keepComments : true, 
                sepIdents : false,
                collapseWhite : false,
                filename : args[0],
                ignoreBadGrammer: true
            });
            
            var str = File.read(this.path);
            var toks = tr.tokenize(new TextStream(str));  
            var rf = new JsParser(toks);
            rf.parse();
            var cfg = rf.cfg;
            
            this.modOrder = cfg.modOrder || '001';
            this.name = cfg.name.replace(/\.bjs/, ''); // BC!
            this.parent =  cfg.parent;
            this.permname =  cfg.permname || '';
            this.title =  cfg.title || cfg.name;;
            this.items = cfg.items || []; 
            //???
            //this.fixItems(_this, false);
            cb();
            return true;    
                
        },
        
        /**
         * accepts:
         * { success : , failure : , scope : }
         * 
         * 
         * 
         */
         
        getTree : function( o ) {
            print("File.getTree tree called on base object?!?!");
        },
        toJsonArray : function()
        {
            var ret = { }; 
            var _this = this;
            ['id', 'name', 'parent', 'title', 'path', 'items' , 'permname', 'modOrder' ].forEach( function(k) {
                ret[k] = typeof(_this[k]) == 'undefined' ? '' : _this[k];
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
        // should be in palete provider really..
        
        guessName : function(ar) // turns the object into full name.
        {
             // eg. xns: Roo, xtype: XXX -> Roo.xxx
            if (typeof( ar['|xns'] ) == 'undefined' || typeof( ar['xtype'] ) == 'undefined') {
                return '';
               }
             
            return ar['|xns'] +'.' + ar['xtype'];
                            
                                 
        },
        
        
        
        copyTo: function(path, cb)
        {
            var _this = this;
            this.loadItems(function() {
                
                _this.path = path;
                cb();
            });
            
        },
        
        /**
         * 
         * munge JSON tree into Javascript code.
         * 
         * FIXME: + or / prefixes to properties hide it from renderer.
         * FIXME: '*props' - not supported by this.. ?? - upto rendering code..
         * FIXME: needs to understand what properties might be translatable (eg. double quotes)
         * 
         * @arg {object} obj the object or array to munge..
         * @arg {boolean} isListener - is the array being sent a listener..
         * @arg {string} pad - the padding to indent with. 
         */
        
        
        mungeToString:  function(obj, isListener, pad)
        {
            
             
            pad = pad || '    ';
            var keys = [];
            var isArray = false;
            isListener = isListener || false;

            if (!obj) {
                print("missing obj?");
                return;
            }            

            // am I munging a object or array...
            if (obj.constructor && obj.constructor.toString() === Array.toString()) {
                for (var i= 0; i < obj.length; i++) {
                    keys.push(i);
                }
                isArray = true;
            } else {
                for (var i in obj) {
                    keys.push(i);
                }
            }
            
            
            var els = []; 
            var skip = [];
            if (!isArray && 
                    typeof(obj['|xns']) != 'undefined' &&
                    typeof(obj['xtype']) != 'undefined'
                ) {
                    this.mungeXtype(obj['|xns'] + '.' + obj['xtype'], els);
                    //els.push('xtype: '+ obj['|xns'] + '.' + obj['xtype']);
                     
                    skip.push('|xns','xtype');
                    
                }
            
            
            if (!isArray && obj.items && obj.items.length) {
                // look for props..
                var newitems = [];
                for (var ii =0; ii< obj.items.length; ii++) {
                    var pl = obj.items[ii];
                    
 
                    if (typeof(pl['*prop']) == 'undefined') {
                        newitems.push(pl);
                        continue;
                    }
                    
                    //print(JSON.stringify(pl,null,4));
                    // we have a prop...
                    var prop = pl['*prop'] + '';
                    delete pl['*prop'];
                    if (!prop.match(/\[\]$/)) {
                        // it's a standard prop..
                        
                        // munge property..??
                        
                        obj[prop] = pl;
                        
                        keys.push(prop);
                        continue;
                    }
                    prop  = prop.substring(0, prop.length -2); //strip []
                    // it's an array type..
                    obj[prop] = obj[prop]  || [];
                    obj[prop].push(pl);
                  //  print("ADDNG PROP:" + prop + ' ' + keys.indexOf(prop) );
                    if (keys.indexOf(prop) < 0) {
                        keys.push(prop);
                    }
                    
                    
                    
                }
                
                obj.items = newitems;
                if (!obj.items.length) {
                    delete obj.items;
                }
                
            }
            
             
            
            //if (isArray) { print(JSON.stringify(keys, null,4)); }
            // keys is just the real keys of the object.
            var _this = this;
            
            var left =  '';
            
            for (var ii =0; ii< keys.length; ii++) {
            
                var i = keys[ii];
              
                if (typeof(obj[i]) == 'undefined') { // empty or removed.
                    continue;
                }
                var el = obj[i];
                if (!isArray && skip.indexOf(i) > -1) { // things we do not write..
                    continue;
                }
                if (!isArray) {
                    // set the key to be quoted with singel quotes..
                    var leftv = i[0] == '|' ? i.substring(1) : i;
                    // skip builder stuff. prefixed with  '.' .. just like unix fs..
                    if (leftv[0] == '.') {
                        continue;
                    }
                    if (Lang.isKeyword(leftv) || Lang.isBuiltin(leftv)) {
                        left = "'" + leftv + "'";
                    } else if (leftv.match(/[^A-Z_]+/i)) { // not plain a-z... - quoted.
                        var val = JSON.stringify(leftv);
                        left = "'" + val.substring(1, val.length-1).replace(/'/g, "\\'") + "'";
                    } else {
                        left = '' + leftv;
                    }
                    left += ' : ';
                    
                }
                
                
                if (isListener) {
                    // change the lines...
                    var str= ('' + obj[i]).replace(/^\s+|\s+$/g,""); // remove bar.
                    var lines = str.split("\n");
                    if (lines.length > 1) {
                        str = lines.join("\n" + pad);
                    }
                    
                    els.push(left  + str);
                    continue;
                }
                 
                
                
                //var left = isArray ? '' : (JSON.stringify(i) + " : " )
                
                if (i[0] == '|') {
                    // does not hapepnd with arrays..
                    if (typeof(el) == 'string' && !obj[i].length) { //skip empty.
                        continue;
                    }
                    // this needs to go...
                    //if (typeof(el) == 'string'  && obj[i].match(new RegExp("Gtk.main" + "_quit"))) { // we can not handle this very well..
                    //    continue;;
                    //}
                    
                    var str= ('' + obj[i]).replace(/^\s+|\s+$/g,"");;
                    var lines = str.split("\n");
                    if (lines.length > 1) {
                        str = lines.join("\n" + pad);
                    }
                    
                    els.push(left + str);
                    continue;
                }
                
                
                
                
                if (typeof(el) == 'object') {
                    
                    // we can skip empty items lists and empty listeners..
                    //if (!isArray && i == 'items' && !el.length) {
                    //    return; 
                    //}
                   // 
                    var right = _this.mungeToString(el, i == 'listeners', pad + '    ');
                    
                    //if (!left.length && isArray) print(right);
                    
                    if ((typeof(right) != 'undefined') && right.length){
                        els.push(left + right);
                    }
                
                    continue;
                }
                // standard. .
                if (typeof(obj[i]) != 'string') {
                    els.push(left + JSON.stringify(obj[i]));
                    continue;
                }
                // strings..
                if (!_this.doubleStringProps) {
                    els.push(left + JSON.stringify(obj[i]));
                    continue;
                }
                if (_this.doubleStringProps.indexOf(i) > -1) {
                    els.push(left + JSON.stringify(obj[i]));
                    continue;
                }
                // single quote..
                els.push(left + "'" + obj[i].replace(/'/g, "\\'") + "'");
                

            }
            
            if (!isArray && !els.length) {
                return '';
            }
            //output the thing.
            var spad = pad.substring(0, pad.length-4);
            return (isArray ? '[' : '{') + "\n" +
                pad  + els.join(",\n" + pad ) + 
                "\n" + spad + (isArray ? ']' : '}');
               
            
            
        } 
        
         
        
    }
    
     
    
);






