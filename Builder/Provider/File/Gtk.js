//<Script type="text/javascript">
 
Gio = imports.gi.Gio;
console = imports.console;
XObject = imports.XObject.XObject;
File = imports.File.File;
  
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
            
            // name is in theory filename without .bjs (or .js eventually...)
            cfg.name = cfg.path.split('/').pop().replace(/\.(bjs|js)$/, '');
            
            cfg.fullname = (cfg.parent.length ? (cfg.parent + '.') : '' ) + cfg.name;
        }
        
        
        this.items = false;
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
          
            console.log("load Items!");
            if (this.items !== false) {
                return false;
            }
            if (!cb) {
                throw "no callback for loadItems";
            }
            Seed.print("load: " + this.path);
            
            

            
            var _this = this;     
            var src = File.read(this.path);
            
            var cfg = JSON.parse(src);
            print("loaded data");
            console.dump(cfg);
            
            _this.name = cfg.name;
            _this.parent =  cfg.parent;
            _this.title =  cfg.title;
            _this.items = cfg.items || []; 
            cb();
                
                // update to new JSDOC api!?
                /*
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
                
                */
            
            
            
            
        },
        /** 
         *  saveJS
         * 
         * save as a javascript file.
         * 
         * 
         * 
         */
        saveJS: function()
        {
             
        
            var i = [ 'Gtk', 'Gdk', 'Pango', 'GLib', 'Gio', 'GObject', 'GtkSource', 'WebKit', 'Vte' ];
            var src = "";
            i.forEach(function(e) {
                src += e+" = imports.gi." + e +";\n";
            });
            
            src += "console = imports.console;\n"; // path?!!?
            src += "XObject = imports.XObject.XObject;\n"; // path?!!?
            
            
            src += this.name + '=new XObject('+ this.mungeToString(data) + ')\n;';
            src += this.name + '.init();\n';
            
            var fn = GLib.path_get_dirname(this.path) + '/' + this.name + '.js';
            File.write(fn, src);
            
            return fn;
        /*
        getTree : function( o ) {
            
            
            
        }
        */
        
    });