//<Script type="text/javascript">

 
Gio = imports.gi.Gio;
GLib= imports.gi.GLib;
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
            for (var ii = 0; ii < node.items.length;ii++) { 
                var i = node.items[ii]; 
                
                _this.fixItems(i, true);
                if (i.xtype == 'Array') {
                    aitems.push(i);
                    return;
                }    
                nitems.push(i);
            } 
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
            
            print("--- JsRender.Roo.save");
            Base.prototype.save.call(this);
            // now write the js file..
            var js = this.path.replace(/\.bjs$/, '.js');
            var d = new Date();
            var js_src = this.toSource();            
            print("TO SOURCE in " + ((new Date()) - d) + "ms");
            File.write(js, js_src);
            // for bootstrap - we can write the HTML to the templates directory..
            
            var top = this.guessName(this.items[0]);
            print ("TOP = " + top)
             
            
            
            
            
            
        },
        saveHTML : function(frame) {
            var top = this.guessName(this.items[0]);
            print ("TOP = " + top)
            if (top != 'Roo.bootstrap.Body') {
                return;
            }
            print("SAVE HTML -- ");
            print(frame);
            var _this = this;
            // wait a second.
            
            GLib.timeout_add_seconds(0, 1, function() {
                //    print("run refresh?");
                var html = _this.traversedom(frame);
                //print(html);
                
                //print(_this.path);
                var dir = File.dirname(_this.path) +  File.SEPARATOR + 'templates';
                //print(dir);
                if (!File.isDirectory(dir)) {
                    print("Skip no template sub-directory");
                    return false;
                }
                var fn = dir + File.SEPARATOR + File.basename(_this.path).replace(/\.bjs$/, '.html');
                //print(fn);
                File.write(fn, html);
                
                
                 return false; // only once..
                
                
                
            });
            
            
            
            
        },
        
        
        traversedom :  function(web_frame) {
            print("TRAVERSE DOM?");
            
            var dom = web_frame.get_dom_document().body;
            print(dom);
            var ret = '';
            //Roo.select('body > div',true).each(function(el) {
            this.traverseDOMTree(function(s) { ret+=s; }, dom, 1);
            return ret;
        },
        
        
        traverseDOMTree : function(cb, currentElement, depth) {
            if (!currentElement) {
                
                return;
            }
            if (currentElement.class_name.match(/roo-dynamic/)) {
                return;
            }
            
            //Roo.log(currentElement);
            var j;
            var nodeName = currentElement.node_name;
            var tagName = currentElement.tag_name;
            
            if  (nodeName == '#text') {
                cb(currentElement.node_value);
                return;
            
            }
             
            
            
            if(nodeName == 'BR'){
                cb("<BR/>");
                return;
            }
            if (nodeName != 'BODY') {
                
            
            
                var i = 0;
              // Prints the node tagName, such as <A>, <IMG>, etc
                if (tagName) {
                    var attr = [];
                    for(i = 0; i < currentElement.attributes.length;i++) {
                        var aname = currentElement.attributes.item(i).name;
                        if (aname=='id') {
                            aname= 'xbuilderid';
                        }
                        // skip
                        if (currentElement.attributes.item(i).value == 'builderel') {
                            return;
                        }
                        attr.push(aname + '="' + currentElement.attributes.item(i).value + '"' );
                    }
                    
                    
                    cb("<"+currentElement.tag_name+ ( attr.length ? (' ' + attr.join(' ') ) : '') + ">");
                } 
                else {
                  cb("[unknown tag]");
                }
            } else {
                tagName = false;
            }
            // Traverse the tree
            i = 0;
            var currentElementChild = currentElement.child_nodes.item(i);
            var allText = true;
            while (currentElementChild) {
                // Formatting code (indent the tree so it looks nice on the screen)
                
                if  (currentElementChild.node_name == '#text') {
                    cb(currentElementChild.node_value);
                    i++;
                    currentElementChild=currentElement.child_nodes.item(i);
                    continue;
                }   
                allText = false;
                cb("\n");
                for (j = 0; j < depth; j++) {
                  // &#166 is just a vertical line
                  cb("  ");
                }               
                
                    
                // Recursively traverse the tree structure of the child node
                this.traverseDOMTree(cb, currentElementChild, depth+1);
                i++;
                currentElementChild=currentElement.child_nodes.item(i);
            }
            if (!allText) {
                    // The remaining code is mostly for formatting the tree
                cb("\n");
                for (j = 0; j < depth - 1; j++) {
                  cb("  ");
                }     
            }
            if (tagName) {
                cb("</"+tagName+">");
            }
            
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
            if (xtype.match(/bootstrap/)) {
                els.push("'xtype-bootstrap' : '"+ xtype +"'");
            }
                //code
            
            
            
        },
        
        
        toSourcePreview: function()
        {
            
            var top = this.guessName(this.items[0]);
            print(JSON.stringify(this.items, null,4));
                       
            if (!top) {
                return false;
            }
            
            
            if (top.match(/Dialog/)) {
                return this.toSourceDialog(true);
            }
            
            if (top.match(/Modal/)) {
                return this.toSourceModal(true);
            }
            
            return this.toSourceLayout(true);
            
            
            
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
            
            if (top.match(/Modal/)) {
                return this.toSourceModal(true);
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
        toSourceDialog : function(isPreview) 
        {
            
            isPreview = isPreview || false;
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
        
        toSourceModal : function(isPreview) 
        {
            
            isPreview = isPreview || false;
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
        toSourceLayout : function(isPreview) 
        {
            isPreview = isPreview || false;
            var topItem = JSON.parse(JSON.stringify(this.items[0]));
            if (isPreview) {
                topItem.region = 'center';
                topItem.background = false;
            }
            
            var o = this.mungeToString(topItem, false, '            ');   
             
            var modkey = this.modOrder + '-' + this.name.replace(/[^A-Z.]+/ig, '-');
            
            var parent =   (this.parent ?  "'" + this.parent + "'" :  'false');
            if (isPreview) {
                parent = 'false'
            }
            
          
            return [
                this.outputHeader(),
                
                this.name  +  " = new Roo.XComponent({",
                "    part     :  "+ JSON.stringify(this.pathToPart()) + ",",
                        /// critical used by builder to associate modules/parts/persm
                "    order    : '" +modkey+"',",
                "    region   : '" + this.region   +"',",
                "    parent   : "+ parent + ",",
                "    name     : " + JSON.stringify(this.title  || "unnamed module") + ",",
                "    disabled : " + (this.disabled || 'false') +", ",
                "    permname : '" + (this.permname|| '') +"', ",
                    
               // "    tree : function() { return this._tree(); },",   //BC
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