//<Script type="text/javascript">
 
Gio = imports.gi.Gio;
console = imports.console;
XObject = imports.XObject.XObject;

  
//----------------------- our roo verison
Base = imports.Builder.Provider.File.Base.Base;

var gid = 1;

Gtk = XObject.define( 
    function(cfg) {
        
        // id ,
        //"name":"Edit Module Details",
        // items : 
        //"btype":"FORM", // was to be components...
        //"app":"Builder",
        //"module":"Pman.Tab.BuilderTop2"
        //console.dump(cfg);
        cfg.parent = cfg.parent || '';
        if (!cfg.name || !cfg.fullname ) {
            cfg.name = cfg.path.split('/').pop().replace(/\.js$/, '');
            cfg.fullname = (cfg.parent.length ? (cfg.parent + '.') : '' ) + cfg.name;
        }
        
        
        this.items = [];
        if (cfg.json) {
            var jstr =  JSON.parse(cfg.json);
            this.items = [ jstr ];
            //console.log(cfg.items.length);
            delete cfg.json; // not needed!
        }
        this.cn = [];
         /*
        var p = cfg.items && cfg.items.length && cfg.items[0].parent ? cfg.items[0].parent : false;
        
        // ensure real data is set...
        Roo.apply(this, {
            name : cfg.module,
            parent : p,
            title : cfg.name,
            project : cfg.app
            
        });
        
        this.cn = [];
        */
        Gtk.superclass.constructor.call(this, cfg);

        
        // super?!?!
        this.id = 'file-gtk-' + gid++;
        // various loader methods..
       
    },
    Base,   
    {
        xtype : 'Gtk',
        setNSID : function(id)
        {
            
            this.items[0]['*class'] = id;
            
            
        },
        getType: function() {
            return 'Gtk';
        },
        
        loadItems : function(cb)
        {
            if (!cb) {
                throw "no callback for loadItems";
            }
            console.log("load Items!");
            if (this.items.length) {
                return false;
            }
            Seed.print("load: " + this.path);
            
            
            var file = Gio.file_new_for_path(this.path);
            
            var _this = this;                        
            file.read_async(0, null, function(source,result) {
                var stream = source.read_finish(result)
                var dstream = new Gio.DataInputStream.c_new(stream);
                
                var src = dstream.read_until("");
                
                
                // update to new JSDOC api!?
                
                var tstream =  new JSDOC.TextStream(src);
                var tr = new  JSDOC.TokenReader( {
                    keepWhite : true,
                    keepComments : true
                });
                var toks = tr.tokenize(tstream);
                //console.dump(toks);
                //Seed.quit();
                var ts = new JSDOC.Collapse(toks);
                //console.dump(ts.tokens);
                var rd = new JSDOC.GtkFile(ts.tokens);
                try {
                    rd.parse();
                } catch (e) {
                    console.log(e);
                    _this.items = [ src ];
                    cb();
                    return;
                }
                 
                console.dump(rd.cfg);
                //!!??? have we got engouth!
                // try parsing self..
                _this.items = [ rd.cfg ];
                _this.imports = rd.imports;
                _this.giImports = rd.giImports ;
                
                cb();
                
                
            });
            
            
            
        },
        /** 
         * fixme - update to new style
         * 
         * 
         * 
         */
        
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
        
        
        toSource: function()
        {
            // dump the file tree back out to a string.
            
            if (typeof(this.items[0]['*class']) != 'undefined') {
                return this.toSourceStdClass();
            }
            
            
            // technically there will be different versions of this.
            var o = this.mungePropObj(this.items[0]);
            //console.dump(o);
            //Seed.quit();
            
            return this.outputHeader() + 
                [
                    "function create()",
                    "{",
                    "    return "
                ].join("\n") +
                this.objectToJsString(o,2) +
                [
                    ";", // end return value..
                    "}"
                ].join("\n");
            
            
            
                
                    
                
                    
                   
            
        },
       
        outputHeader : function()
        {
            var ret = '//<script type="text/javascript">' + "\n";
            ret += "\n\n// gi imports\n";
            Roo.each(this.giImports, function(i) {
                ret += i + " =  imports.gi." + i + ";\n";
            });
            ret += "\n\n// file imports\n";
            for(var k in this.imports) {
                ret += k + " =  imports[" + JSON.stringify(this.imports[k]) + "];\n";
            }
            
            return ret + "\n\n";
        }
        
        /*
        getTree : function( o ) {
            
            
            
        }
        */
        
    });