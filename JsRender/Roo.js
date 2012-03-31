//<Script type="text/javascript">

 
Gio = imports.gi.Gio;
XObject = imports.XObject.XObject;

  
//----------------------- our roo verison
Base = imports.JsRender.Base.Base;
File = imports.File.File;


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
            cfg.name = cfg.path.split('/').pop().replace(/\.bjs$/, '').replace(/\.js$/, '');
            //cfg.fullname = (cfg.parent && cfg.parent.length ? (cfg.parent + '.') : '' ) + cfg.name;
            cfg.fullname = cfg.name;
        }
        
        
        this.items = false;
        if (cfg.json) {
            var jstr =  JSON.parse(cfg.json);
            this.items = [ jstr ];
            //console.log(cfg.items.length);
            delete cfg.json; // not needed!
        }
        this.cn = [];
        
        Roo.superclass.constructor.call(this, cfg);

        
        // super?!?!
        this.id = 'roo-file-' + (rid++);
        // various loader methods..
    },
    Base,
    {
        doubleStringProps : [ 
            'title',
            'legend',
            'loadingText',
            'emptyText',
            'qtip',
            'value',
            'text',
            'emptyMsg',
            'displayMsg'
        ],
        path : '', // the file path..
        modOrder : '001', /// sequence id that this uses.
        region : 'center',
        parent : '',
        title : '', // the title on displayed when loading.
        disable : '', // use a function to that returns false to disable this..
        permname: '', /// permission name
        
        items: false,
        
        setNSID : function(id)
        {
            
            this.items[0]['|module'] = id;
       
            
        },
        
        
        getType: function() {
            return 'Roo';
        },
       
      
        loadItems : function(cb, sync)
        {
            
            
            
            print("load Items!");
            if (this.items !== false) {
                return false;
            }
            
            var _this = this;
             
            function loaded(src) {
                var cfg = JSON.parse(src);
                print("loaded data");
                //print(JSON.stringify(cfg, null,4));
                _this.modOrder = cfg.modOrder || '001';
                _this.name = cfg.name.replace(/\.bjs/, ''); // BC!
                _this.parent =  cfg.parent;
                _this.permname =  cfg.permname || '';
                _this.title =  cfg.title;
                _this.items = cfg.items || []; 
                
                _this.fixItems(_this, false);
                
                
                
                cb();
            }
            if (sync) {
                loaded(File.read(this.path));
                return true;
            }
            
            
            var file = Gio.file_new_for_path(this.path);
            
                             
            file.read_async(0, null, function(source,result) {
                var stream = source.read_finish(result)
                var dstream = new Gio.DataInputStream.c_new(stream);
                
                loaded (dstream.read_until(""));
                
                
                 
                
            });
            
            return true;
            
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
        
        save : function()
        {
            Base.prototype.save.call(this);
            // now write the js file..
            var js = this.path.replace(/\.bjs$/, '.js');
            var d = new Date();
            var js_src = this.toSource();
            print("TO SOURCE in " + ((new Date()) - d) + "ms");
            File.write(js, js_src);
            
            
            
        },
         /**
         * convert xtype for munged output..
         * 
         */
        mungeXtype : function(xtype, els)
        {
            var bits = xtype.split('.');
            // assume it has lenght!
            
            els.push("xtype: '"+ bits.pop()+"'");
            els.push('xns: '+ bits.join('.'));
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
            
            // we have 2 types = dialogs and components
            // 
            var top = this.guessName(this.items[0]);
            if (!top) {
                return false;
            }
            if (top.match(/Dialog/)) {
                return this.toSourceDialog();
            }
            return this.toSourceLayout();
            
            /*
            eventually support 'classes??'
             return this.toSourceStdClass();
            */
              
        },
       
        outputHeader : function()
        {
            return [
                "//<script type=\"text/javascript\">",
                "",
                "// Auto generated file - created by app.Builder.js- do not edit directly (at present!)",
                ""
            ].join("\n");
            
       
        },
        // a standard dialog module.
        // fixme - this could be alot neater..
        toSourceDialog : function() 
        {
            var items = JSON.parse(JSON.stringify(this.items[0]));
            var o = this.mungeToString(items, false, '            ');   
            return [
                this.outputHeader(),
                this.name + " = {",
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
                "        this.dialog.show(this.data._el);",
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
                "        this.dialog = Roo.factory(" + o +  ");",
                "    }",
                "};",
                ""
                
             ].join("\n");
             
             
             
        },
        
        
        pathToPart : function()
        {
            var dir = File.basename(File.dirname(this.path));
            var modname = dir.split('.').pop();
            
            // now we have the 'module name'..
            var fbits = File.basename(this.path).split('.');
            fbits.pop(); // remove extension..
            var npart = fbits.pop(); // this should be 'AdminProjectManager' for example...
            if (npart.substring(0, modname.length) == modname) {
                npart = npart.substring(modname.length);
            }
            return [ modname , npart];
            
            
            
            
        },
        
        // a layout compoent 
        toSourceLayout : function() 
        {
            var items = JSON.parse(JSON.stringify(this.items[0]));
            var o = this.mungeToString(items, false, '            ');   
             
            var modkey = this.modOrder + '-' + this.name.replace(/[^A-Z.]+/ig, '-');
            
            
            if (this.name.match(/^Pman/)) {
                
                 
                // old BC way we did things..
                return [
                    this.outputHeader(),
                    "",
                    "",
                    "// register the module first",
                    "Pman.on('beforeload', function()",
                    "{",
                    "    Pman.register(" + this.name + ".prototype._registerOptions() );",
                    "});",
                    "",
                    
                    this.name  +  " = new Roo.util.Observable({",
                    "",
                    "    panel : false,",
                    "    disabled : false,",
                    "    parentLayout:  false,",
                    "",
                    "    _registerOptions : function() {",
                    "        return {",
                    "            part :  "+ JSON.stringify(this.pathToPart()) + ",", /// critical used by builder to associate modules/parts/persm
                    "            modKey : '" +modkey+"',",
                    "            modKey : '" +modkey+"',",
                    "            module : " + this.name + ",",
                    "            region : '" + this.region   +"',",
                    "            parent : " + (this.parent ||  'false') + ",",
                    "            name : " + JSON.stringify(this.title  || "unnamed module") + ",",
                    "            disabled : " + (this.disabled || 'false') +", ",
                    "            permname: '" + (this.permname|| '') +"' ",
                    "         }",
                    "    },",
                    "    add : function(parentLayout, region)",
                    "    {",
                    "",
                    "        this.parentLayout = parentLayout;",
                    "",
                    "        this.panel = parentLayout.addxtype(this._tree());",
                    "        this.layout = this.panel.layout;",
                    "",
                    "    },",
                    "    _tree : function () {",
                    "        var _this = this;", 
                    "        var MODULE = this;", /// this looks like a better name.
                    "        return " + o + ';',
                    "    }",
                      
                    "});",
                    ""
                     
                    
                 ].join("\n");
            }
            
        
            return [
                this.outputHeader(),
                
                this.name  +  " = new Roo.XComponent({",
                "    order    : '" +modkey+"',",
                "    region   : '" + this.region   +"',",
                "    parent   : "+ (this.parent ?  "'" + this.parent + "'" :  'false') + ",",
                "    name     : " + JSON.stringify(this.title  || "unnamed module") + ",",
                "    disabled : " + (this.disabled || 'false') +", ",
                "    tree : function() { return this._tree(); },",   //BC
                "    _tree : function()",
                "    {",
                "        var _this = this;", // bc
                "        var MODULE = this;", /// this looks like a better name.
                "        return " + o + ';',
                "    }",
                "});",
                ""
                 
             ].join("\n");
            
        },
            
        guessName : function(ar) // turns the object into full name.
        {
             // eg. xns: Roo, xtype: XXX -> Roo.xxx
            if (!ar) {
                return false;
            }
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
            
            
            
            var pm = imports.ProjectManager.ProjectManager;
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