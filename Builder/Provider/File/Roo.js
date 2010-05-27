//<Script type="text/javascript">

 
Gio = imports.gi.Gio;
console = imports.console;
XObject = imports.XObject.XObject;

  
//----------------------- our roo verison
Base = imports.Builder.Provider.File.Base.Base;
Gio = imports.gi.Gio;
 

JSDOC =  imports['JSDOC.js'];
//----------------------- our roo verison

var rid = 0;

Roo = XObject.define(
    function(cfg) {
        
        // id ,
        //"name":"Edit Module Details",
        // items : 
        //"btype":"FORM", // was to be components...
        //"app":"Builder",
        //"module":"Pman.Tab.BuilderTop2"
        //console.dump(cfg);
        
        if (!cfg.name || !cfg.fullname ) {
            cfg.name = cfg.path.split('/').pop().replace(/\.js$/, '');
            cfg.fullname = (cfg.parent && cfg.parent.length ? (cfg.parent + '.') : '' ) + cfg.name;
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
        Roo.superclass.constructor.call(this, cfg);

        
        // super?!?!
        this.id = 'roo-file-' + (rid++);
        // various loader methods..
    },
    Base,
    {
            
        setNSID : function(id)
        {
            
            this.items[0]['|module'] = id;
       
            
        },
        
        
        getType: function() {
            return 'Roo';
        },
        
      
        loadItems : function(cb)
        {
            console.log("load Items!");
            if (this.items !== false) {
                return false;
            }
            var file = Gio.file_new_for_path(this.path);
            
            var _this = this;                        
            file.read_async(0, null, function(source,result) {
                var stream = source.read_finish(result)
                var dstream = new Gio.DataInputStream.c_new(stream);
                
                var src = dstream.read_until("")
                
                var cfg = JSON.parse(src);
                print("loaded data");
                console.dump(cfg);
                
                _this.name = cfg.name;
                _this.parent =  cfg.parent;
                _this.title =  cfg.title;
                _this.items = cfg.items || []; 
                
                _this.fixItems(_this, false);
                
                
                
                cb();
                /*
                var tstream =  new JSDOC.TextStream(src);
                var tr = new  JSDOC.TokenReader( {
                    keepWhite : true,
                    keepComments : true
                });
                var toks = tr.tokenize(tstream);
                var ts = new JSDOC.Collapse(toks);
                //console.dump(ts.tokens);
                var rd = new JSDOC.RooFile(ts.tokens);
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
                cb();
                */
                
            });
            
            
            
        },
        /**
         * old code had broken xtypes and used arrays differently,
         * this code should try and clean it up..
         * 
         * 
         */
        fixItems : function(node, fixthis)
        {
            if (fixthis) {
                // fix xtype.
                var fn = this.guessName(node);
                //print("guessname got " + fn);
                if (fn) {
                    var bits = fn.split('.');
                    node.xtype = bits.pop();
                    node['|xns'] = bits.join('.');
                    
                }
                // fix array???
                 
                
            }
            if (!node.items || !node.items.length) {
                return;
            }
            var _this = this;
            var aitems = [];
            var nitems = [];
            node.items.forEach(function(i) {
                
                
                
                _this.fixItems(i, true);
                if (i.xtype == 'Array') {
                    aitems.push(i);
                    return;
                }    
                nitems.push(i);
            });
            node.items = nitems; 
            
            if (!aitems.length) {
                return;
            }
            
            aitems.forEach(function(i) {
                
                if (!i.items || !i.items.length) {
                    return;
                }
                var prop = i['*prop'] + '[]';
                // colModel to cm?
                i.items.forEach(function(c) {
                    c['*prop']  = prop;
                    node.items.push(c);
                    
                });
                
                
            });
            
            
            // array handling.. 
            
            
            
            
            
        },
        /**
         * This needs to use some options on the project
         * to determine how the file is output..
         * 
         * At present we are hard coding it..
         * 
         * 
         */
        toSource: function()
        {
            // dump the file tree back out to a string.
            
            if (typeof(this.items[0]['|module']) != 'undefined') {
                return this.toSourceStdClass();
            }
            
            if (this.items[0].region) {
                return this.toSourceLayout();
            }
            return this.toSourceDialog();
              
        },
       
        outputHeader : function()
        {
            return [
                "//<script type=\"text/javascript\">",
                "",
                "// Auto generated file - created by Builder Module - do not edit directly",
                ""
            ].join("\n");
            
       
        },
        // a standard dialog module.
        toSourceDialog : function() 
        {
            var b = this.items[0]; 
            var o = this.mungePropObj(this.items[0]);
            return [
                this.outputHeader(),
                b['|module'] + " = {",
                "",
                "    dialog : false,",
                "    callback:  false,",
                "",   
                "    show : function(data, cb)",
                "    {",
                "        if (!this.dialog) {",
                "            this.create();",
                "        }",
                "",
                "        this.callback = cb;",
                "        this.data = data;",
                "        this.dialog.show();",
                "        if (this.form) {",
                "           this.form.reset();",
                "           this.form.setValues(data);",
                "           this.form.fireEvent('actioncomplete', this.form,  { type: 'setdata', data: data });",
                "        }",
                "",   
                "    },",
                "",
                "    create : function()",
                "    {",
                "        var _this = this;",
                "        this.dialog = Roo.factory(" + this.objectToJsString(o,3) +  ");",
                "    }",
                "};",
                ""
                
             ].join("\n");
             
             
             
        },
        // a layout compoent 
        toSourceLayout : function() 
        {
            var b = this.items[0]; 
            var o = this.mungePropObj(this.items[0]);
            
            var disabled = typeof(b['|disabled']) == 'undefined' ? (b.disabled || false) : b['disabled'];
            
            return [
                this.outputHeader(),
                "",
                "",
                "// register the module first",
                "Pman.on('beforeload', function()",
                "{",
                "    Pman.register({",
                "        modKey : '" + (b.modkey  || "000-unnumbered module") +"',",
                "        module : " + b['|module']  + ",",
                "        region : '" + (b.region  || '') +"',",
                "        parent : " + (b.parent  || false) + ",",
                "        name : \"" + (b.name  || "unnamed module") + "\"",
                "        disabled : " + disabled +" ",
                "    });",
                "});",
                "",
                
                b['|module']  +  " = new Roo.util.Observable({",
                "",
                "    panel : false,",
                "    disabled : false,",
                "    parentLayout:  false,",
                "",
                "    add : function(parentLayout, region)",
                "    {",
                "",
                "        var _this = this;", // standard avaialbe..
                "        this.parentLayout = parentLayout;",
                "",
                "        this.panel = parentLayout.addxtype(" + this.objectToJsString(o,3) +  ");",
                "        this.layout = this.panel.layout;",
                "",
                "    }",
                "});",
                ""
                 
                
             ].join("\n");
        },
            
        guessName : function(ar) // turns the object into full name.
        {
             // eg. xns: Roo, xtype: XXX -> Roo.xxx
            var ret = [];
            ret.push(typeof( ar['|xns'] ) == 'undefined' ? 'Roo' : ar['|xns'] );
            
            
            
            if (typeof( ar['xtype'] ) == 'undefined' || !ar['xtype'].length) {
                return false;
            }
            var xtype = ar['xtype'] + '';
            if (xtype[0] == '*') { // prefixes????
                xtype  = xtype.substring(1);
            }
            if (xtype.match(/^Roo/)) {
                // already starts with roo...
                ret = [];
            }
            ret.push(xtype);
            var str =  ret.join('.');
            
            var pm = imports.Builder.Provider.ProjectManager.ProjectManager;
            return pm.getPalete('Roo').guessName(ret.join('.'));
            
                            
                                 
        },
        /*
        getTree : function( o ) {
            
            
            
        }
        */
         getHelpUrl : function(cls)
        {
            return 'http://www.akbkhome.com/roojs1/docs/symbols/' + cls + '.html';
        }
        
});