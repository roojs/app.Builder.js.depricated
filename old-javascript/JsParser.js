//<script type="text/javscript">

XObject = imports.XObject.XObject;
console     = imports.console.console;
Collapse = imports.JSDOC.Collapse.Collapse;
/**
 * 
 * this takes our collased file, and turns it into the config array..
 * 
 * @see rconv.js (our tester file)
 * 
 * STATUS:
 *
 *  - Pman.Tab.* appears to work.
 * .. next up ..Dialog...
 *
 *
 *
 * Current issues:
 *  - xtype is combined on generated files. (not xns + xtype)
 *  - listeners are prefixed with '|' ... 
 *  - modkey is not getting picked up..
 *  - suspect some of the elements are not getting flattened
 *  - parent on 
 */

JsParser  =  XObject.define(
    function (ar)
    {
        JsParser.superclass.constructor.call(this, ar);
       // console.log("STARTING OUTPUT");
        
         

    },
    Collapse, 
    {
        
        cfg : { },

        parse: function()
        {
            // standard pman dialog
            if (this.tokens[0].data == 'Pman.on') {
                this.parsePmanLayout();
                return;
            }
         
            
            // Standard Pman Dialog - 
            if (this.tokens[2].props && typeof(this.tokens[2].props.create) != 'undefined') {
                this.parsePmanDialog();
                return;
            }
            
            
            // Seed Gtk XObject application. 
            if (this.tokens.length > 2 && this.tokens[2].data.match(/^imports\./)) {
                this.parseXObject();
                return;
            }
            
            Seed.print("Unknown format");
            Seed.print(JSON.stringify(this.tokens,null,4));
            Seed.quit();
            
            
            
            
            
            
            
            
            // perfect for dialogs... - is this our 'generic, non-pman code?'
            
            
            var pos = this.lookFor( 'function');
            
            // XXXXX = function(
            var cfg = {};
            
            if (pos > -1 && (this.tokens[pos-1].data == '=') && (this.tokens[pos-2].type == 'NAME')) {
                
                this.cfg = {
                    '*class' : this.tokens[pos-2].data,
                    '*extends' : '',
                    '//constructor' :  this.tokens[pos-2].prefix,
                    '|constructor' : 'function ' + this.tokens[pos+1].toRaw() + 
                            this.tokens[pos+2].toRaw()
                    
                };
                this.cursor = pos+2;
                
            }
            
            if (pos < 0) {
                // no function - we have a static one...
                pos = this.lookFor( '=');
                if (pos > 1 && 
                    (this.tokens[pos-1].type == 'NAME') &&
                    (this.tokens[pos+1].data == '{')
                ) {
                    this.cfg = {
                        '*class' : this.tokens[pos-1].data,
                        '//*class' :  this.tokens[pos-1].prefix
                        
                        
                    };
                    XObject.extend(this.cfg, this.parseProps(this.tokens[pos+1].props));
                    return;
                    
                }
                
                
                
            }
            
            
              // Roo.apply (l
            var pos = this.lookFor( 'Roo.apply');
            //console.dump(this.tokens);
            
            
            if (
                (pos > -1) &&
                (this.tokens[pos+1].items[0][0].data  == this.cfg['*class'] + '.prototype')
            ) {
                // XXXXXx.prototype = {
                
                
                    
                XObject.extend(this.cfg, this.parseProps(this.tokens[pos+1].items[1][0].props));
                return;
                
            }
            
            
            var pos = this.lookFor('new');
            
            if (pos > -1 && 
                (this.tokens[pos-2].type == 'NAME') &&
                (this.tokens[pos-1].data == '=') && 
                (this.tokens[pos+1].type == 'NAME') &&
                (this.tokens[pos+2].data == '(') 
            ) {
                
                this.cfg = {
                    '//*class' : this.tokens[pos-2].prefix,
                    '*class' : this.tokens[pos-2].data,
                    '*extends' : this.tokens[pos+1].data
                };
                    
                XObject.extend(this.cfg, this.parseProps(this.tokens[pos+2].items[0][0].props));
                
                return;
                
            }
            
            ///Builder.Provider.ProjectManager = new Roo.Observable({
                
            
            
            var pos = this.lookFor( 'Roo.extend');
            if (pos > -1) {
                
                this.cfg['*extends'] = this.tokens[pos+1].items[1][0].data;
                XObject.extend(this.cfg, this.parseProps(this.tokens[pos+1].items[2][0].props));
                
                // no more..
                return;
            }
            
             
                
            var pos = this.lookFor( 'Roo.extend');
            if (pos > -1) {
                
                this.cfg['*extends'] = this.tokens[pos+1].items[1][0].data;
                XObject.extend(this.cfg, this.parseProps(this.tokens[pos+1].items[2][0].props));
                
                // no more..
                return;
            }
            
            
            
            //console.dump(cfg);
            //Seed.quit();
            
            
            
            // other type of layout
          //  console.dump(this.tokens);
            
            // this type of file..
            // xxxx.xxx = function
            // -> into |constructor..
            // -> extend + prototype
             
            
            
                
        },
        
        
        parsePmanLayout : function()
        {
                // then it's a layout style..
            
            //Seed.quit();
            
            
            //console.dump(this.tokens);
            //              the list of statements inside of function..?
            
            
            var stmts =  this.tokens[1].items[1][2].items;
            
            // look for register..
            var topp = false;
            stmts.map( function(s, i) {
                if (s[0].data == 'Pman.register') {
                    topp = brace = s[1].items[0][0].props;
                }
            });
            if (!topp) {
                console.dump(this.tokens);
                throw "could not find top props...";
                
            }
            //print(JSON.stringify(topp,null,4));
            
            this.cfg = this.parseProps(topp);
            for(var k in this.cfg) {
                this.cfg[k.replace(/^\|/, '')] = this.cfg[k];
            }
            if (this.cfg.name) {
                this.cfg.title = this.cfg.name;
                delete this.cfg.name;
            }
           // this.cfg.fullname = this.cfg.name;
            this.cfg.type = 'Roo';
            
            
            
            // looking for parent / name..
            
            
            this.cfg.modOrder = this.cfg.modKey.split('-').shift(); 
            print(JSON.stringify(this.cfg,null,4));
            
            
            //                  (            {          add    { this.panel (  {
            var cfg = this.tokens[7].items[0][0].props.add.val[2].items[2][3].items[0][0].props;
            this.cfg.items = [ this.parseProps(cfg) ];
            //console.dump(this.cfg); 
        },
        
        
        parsePmanDialog : function() {
            
            //console.dump(this.tokens);
            this.cfg.name = this.tokens[0].data;
            
            
            
            var cfg = this.tokens[2].props.create.val[2].items[1][3].items[0][0].props;
            this.cfg.type = 'Roo';
            //console.dump(this.tokens);
            //print(JSON.stringify(cfg,null,4)); Seed.quit();
            
           // print("Trying standard dialog");Seed.quit();;
            
            this.cfg.items = [ this.parseProps(cfg) ];
            return;
            
        },
        
        // Seed xobject file.
        parseXObject : function() {
            
            this.parseImports();
              
            var pos = this.lookFor('XObject');
            if (pos < 0)  {
                throw "Can not find XObject";
            }
            this.cfg.name = this.tokens[pos-3].data;
            this.cfg.type = 'Gtk';
            var cfg = this.tokens[pos+1].items[0][0].props;
            this.cfg.items = [ this.parseProps(cfg) ];
            
            //print(JSON.stringify(this.tokens[pos]));
            
            //print(JSON.stringify(this.tokens,null,4)); Seed.quit();
            //Seed.quit();
            
        },
        
        
        
        /**
         *  parse Imports lines.
         *
         */
        
        parseImports : function()
        {
           // console.dump(this.tokens);
            this.cfg.giImports = [];
            this.cfg.imports= [];
            while (true) {
                var pos = this.lookFor('=');
                if (pos < 0)  {
                    break;
                }
                this.cursor = pos;
                var k = this.look(-1, true);
                var v = this.look(1, true);
               // Seed.print(k.data + " => " + v.data);
               
                /// finish!!! - not an import ...
               
                if (!v.data.match(/^imports/)) {
                    return; ///
                    
                    this.cursor++;
                    continue;
                }
                if (v.data.match(/^imports\.gi/)) {
                    // gi import..
                    this.cfg.giImports.push(v.data.replace(/imports\.gi\./, ''));
                    
                    this.cursor++;
                    continue;
                }
                  
                // two types of import left
                // imports.xnew
                if (v.data.match(/^imports\./)) {
                    this.cfg.imports[k.data] = v.data.replace(/imports\./, '') + '.js';
                    this.cursor++;
                    continue;
                }
                // imports[.....]
                this.cursor++;
                if (this.lookFor('[') > this.lookFor('=')) {
                    continue;
                }
                var bpos = this.lookFor('[');
               // console.dump(this.tokens[bpos]);
                
                this.cfg.imports[k.data] = this.tokens[bpos].items[0][0].toJS();
                
                this.cursor++;
                
            }
        //    console.dump(this.giImports);
          //  console.dump(this.imports);
            //Seed.quit();
            
        },
        
        ///------------------- GENERIC PARSING ------------------
        
        
        
        
        
        
        parseProps:  function(o)
        {
            //print(JSON.stringify(o,null,4));
            
            var ret = { };
            var fakeItems =  [];
            for(var k in o) {
                
                //print( "parsing prop: " + k);
                if (o[k].key.data == '}') {
                    // typo trailing comma in object def.
                    continue;
                }
                
                var kv = k;
                if (o[k].key.type == 'STRN') {
                    kv = o[k].key.toJS();
                }
                if (!o[k].val.length) {
                    console.dump(o[k]);
                }
                
                //console.dump(o[k]);
                if (o[k].val[0].data == "function") {
                    // add comments..
                  //   console.dump(o[k].key.prefix); 
                    var pr = typeof(o[k].key.prefix) == 'undefined' ? '' : o[k].key.prefix ;
                    pr = this.clean_prefix( pr) ;
                    if (pr.length) {
                        ret['//' +kv ] =  pr;
                    }
                    //print("running expand");
                    ret['|' +kv ] =  this.clean_body( this.expand(o[k].val));
                    continue;
                }
                
                
                if (o[k].val[0].data == "[") {
                    
                    if (o[k].val[0].items[0][0].data == '{') {
                        // array of objects..
                        
                        // this works for items..
                        
                        // used elsewhere for buttons: -> in which case we have a fake xtype
                        
                        
                        
                        // if K is not ITEMS - we need to add '*prop' -> and add it to the items array..
                        var add = this.parseArray(o[k].val[0].items);
                        if (kv == 'items') {
                            ret[kv] = add;
                            continue;
                        }
                        add.forEach(function(a) {
                            a['*prop'] = kv + '[]';
                            fakeItems.push(a);
                        });
                        
                        continue;
                    } 
                    // raw array 
                    
                    
                    ret['|' +kv ] =  this.clean_body(this.expand(o[k].val)); // remove ','...
                    continue;
                }
                if (o[k].val[0].data == "(") {
                    ret['|' +kv ] =  this.expand(o[k].val);
                    continue;
                }
                // value is an object..
                
                if (o[k].val[0].data == "{") {
                    
                    // things that can be property of object type:
                    // listeners, set, 
                    var add = this.parseProps(o[k].val[0].props);
                    
                    
                    
                    if (kv == 'set' || kv =='listeners') {
                        ret[kv ] = add;
                        continue;
                    }
                    if ((typeof(add.xtype) != 'undefined') ||  ['sortInfo', 'center', 'east', 'west', 'north', 'south'].indexOf(kv) > -1) {
                        add['*prop'] =  kv;
                        fakeItems.push(add);
                        continue;
                    }
                    
                    
                    ret[ '|' + kv ] =  this.expand(o[k].val);
                    
                    
                    // this hsould be added to 'items', with a *prop element..
                    continue;
                }
                //console.dump(o[k].val);
                
                if (o[k].val[1].data == ',' || o[k].val[1].data == '}') {
                    // single item piece of data...
                    var t1= o[k].val[0];
                    switch(o[k].val[0].type) {
                        case 'STRN':
                        case 'NUMB':
                        case 'KEYW':
                            ret[  kv ]  = t1.toJS();
                            continue;
                        case 'NAME':
                            ret[ '|' + kv ] =  t1.data;
                            continue;
                        
                    }
                }
                // finally give up..
                ret[ '|' + kv ] =  this.clean_body(this.expand(o[k].val));
                
            }
            if (!ret.items && fakeItems.length) {
                ret.items = [];
            }
            fakeItems.forEach(  function(e) {
                ret.items.push(e);
            });
            // merge fakeItems;
            //console.dump(ret);
            
            return ret;
        },
        parseArray: function(ar) {
          // console.dump(ar);
           // Seed.quit();
            var ret = [];
            ar.map(function (e) {
                // has no props...
                if (typeof(e[0].props) == 'undefined') {
                    return;
                }
               
                
                ret.push( this.parseProps(e[0].props));
                     
            },this);
             
            return ret;
          
        },
        
        /**
         * convert a function call token array back into a string
         */
        expand: function(ar)
        {
            var ret = '';
            //print(JSON.stringify(ar,null,4));
             
            for(var i =0 ; i < ar.length -1; i++) {
                ret += ar[i].toRaw();
            }
            
            return ret;
            
            
        },
        
        /***
         * change the indentation on a function 
         *
         */
        clean_body : function(str)
        {
            var lns = str.split("\n");
            var mindent = -1;
            lns.map( function(l, i) {
                if (!i || !l.length || l.match(/^\s+$/)) {
                    return;
                }
                
                var spc = l.match(/\s+/);
                if (!spc || !spc[0].length) {
                    return;
                }
                mindent = mindent < 0 ? spc[0].length : Math.min(spc[0].length, mindent);
                
            });
            //console.log(mindent + ":" + lns[0]);
            var ar = [];
            if (mindent < 0) {
                return str;
            }
            lns.map( function(l,i) {
                if (!i) {
                    ar.push(l.replace(/^\s+/, ''));
                    return;
                }
                ar.push(l.substring(mindent));
            });
            //print(str);
            //print(JSON.stringify(ar,null,4));
            
            
            return ar.join("\n");
        },
        clean_prefix: function(str) {
            
            
            
            if (!str.length) {
                return '';
            }
            var ret = str.replace(/^\s+/gm, "\n").replace(/\n+/gm, "\n");
            return ret == "\n" ? '' : ret;
            
        }    
             
    
});