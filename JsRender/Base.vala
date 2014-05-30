//<Script type="text/javascript">


class JsRender.Node : Object {
    
    GLib.List<JsRender.Node> items; // child items..
    
    Gee.Map<string,string> props; // the properties..
    
  
    
    bool is_array;
    
    Node()
    {
        this.items = new GLib.List<JsRender.Node>();
        this.props = new GLib.Map<string,string>();
        this.is_array = false;
        
    }
    
    
    
    GLib.List keys() {
        
        
    }
    boolean isArray()
    {
        return this.is_array;
    }
    boolean hasChildren()
    {
        return this.items.length() > 0;
    }
    bool hasXnsType()
    {
        if (this.props.get("|xns") != null && this.props.get("xtype") != null) {
            return true;
            
        }
        return false;
    }
    // wrapper around get props that returns empty string if not found.
    string get(string key)
    {
        var k = this.props.get(key);
        if (k == null) {
            return "";
        }
        return k;
        
    }
    string quoteString(string s)
    {
        /// do json..
        // except for numbers...
        
    }
    
    string mungeToString (bool isListener, string pad)
    {
        
         
        pad = pad.length < 1 ? "    " : pad;
        
        var keys = [];
        
        var isArray = false;
        
        //isListener = isListener || false;

       //var keys = this.keys();
        var isArray = this.isArray();
        
        
        var els = new GLib.List<string>(); 
        var skip = new Array<string>();
        if (!isArray && obj.hasXnsType() ) {
                // this.mungeXtype(obj['|xns'] + '.' + obj['xtype'], els); ??????
                
                
               skip.append_Val("|xns");
               skip.append_Val("xtype");
               
        }
        var newitems = new Array<JsRender.Node>();
        var oprops = new Gee.Map<string,JsRender.Node>();
        
        if (!isArray && this.hasChildren()) {
            // look for '*props'
           
            for (var ii =0; ii< this.items.length(); ii++) {
                var pl = this.items.nth_data(ii);
                if (!pl.props.has_key("*prop")) {
                    newitems.append(pl);
                    continue;
                }
                
                //print(JSON.stringify(pl,null,4));
                // we have a prop...
                //var prop = pl['*prop'] + '';
                //delete pl['*prop'];
                var prop = pl.get("*prop");
                // name ends in [];
                if (! Regex.match_simple("\[\]$", prop) {
                    // it's a standard prop..
                    
                    // munge property..??
                    oprops.set(prop, pl);
                    
                    
                    //keys.push(prop);
                    continue;
                }
                
                prop  = prop.substring(0,  -2); //strip []
                // it's an array type..
                if (!oprops.has_key(prop)) {
                    var cn = new JsRender.Node();
                    oprops.set(prop, pl);
                    
                }
                // ignores the fact it might be duplciated...
                oprops.get(prop).isArray = true;
                oprops.get(prop).items.append(pl);
              
                
                
                
            }
            
            //obj.items = newitems;
            //if (!obj.items.length) {
            //    delete obj.items;
            //}
            
        }
        if (this.isArray()) {
            
            
            for (var i=0;i< this.items.length();i++) {
                var el = this.items.nth_data(i);
                
                els.append("%d".format(i) + " : " + el.mungeToString(false, pad));
                
            }
            var spad = pad.substring(0, pad.length-4);
            return   "{\n" +
                pad  + string.join(",\n" + pad , els) + 
                "\n" + spad +  "}");
               
            
            
            
          
        } 
        string left;
        var func_regex = new Regex("^\s+|\s+$");
        this.props.map_iterator().foreach((k,v) => {
            if (skip.find(k) != null) {
                return; 
            }
            
            
            var leftv = k[0] == '|' ? k.substring(1) : k;
            // skip builder stuff. prefixed with  '.' .. just like unix fs..
            if (leftv[0] == '.') { // |. or . -- do not output..
                return;
            }
             if (k[0] == '*') {
                // ignore '*prop';
                return;
             }
                
            
            if (JsRender.Lang.isKeyword(leftv) || JsRender.Lang.isBuiltin(leftv)) {
                left = "'" + leftv + "'";
            } else if (Regex.match_simple("[^A-Za-z_]+",leftv) { // not plain a-z... - quoted.
                var val = this.quoteString(leftv);
                
                left = "'" + val.substring(1, val.length-1).replace("'", "\\'") + "'";
            } else {
                left = leftv;
            }
            left += ' : ';
            
            if (isListener) {
            // change the lines...
                var str= func_regex.replace(v, "");  // remove bar. ???
                var lines = str.split("\n");
                if (lines.length > 1) {
                    str = string.join("\n" + pad, lines);
                }
                
                els.append(left  + str);
                return;
            }
             
            // next.. is it a function..
            if (k[0] == '|') {
                // does not hapepnd with arrays.. 
                if (v.length < 1) {  //if (typeof(el) == 'string' && !obj[i].length) { //skip empty.
                    return;
                }
                
                var str= func_regex.replace(v, "");
                var lines = str.split("\n");
                if (lines.length > 1) {
                    str =  string.join("\n" + pad, lines);
                }
                
                els.append(left + str);
                return;
            }
            // standard..
            
            
            if (!this.isString(v)) { // boolean or number...?
                els.append(left + this.quoteString(v));
                return;
            }
            // strings..
            if (!_this.doubleStringProps.length) {
                els.append(left + this.quoteString(v));
                continue;
            }
            if ()
            if (_this.doubleStringProps.index(k) > -1) {
                els.push(left + this.quoteString(v));
                continue;
            }
            
            // single quote.. v.substring(1, v.length-1).replace("'", "\\'") + "'";
            els.push(left + "'" + v.substring(1, v.length-1).replace("'", "\\'") + "'";
            

           
           
           
        });
        oprops.map_iterator().foreach((k,vo) => {
            var leftv = k[0] == '|' ? k.substring(1) : k;
            if (JsRender.Lang.isKeyword(leftv) || JsRender.Lang.isBuiltin(leftv)) {
                left = "'" + leftv + "'";
            } else if (Regex.match_simple("[^A-Za-z_]+",leftv) { // not plain a-z... - quoted.
                var val = this.quoteString(leftv);
                
                left = "'" + val.substring(1, val.length-1).replace("'", "\\'") + "'";
            } else {
                left = leftv;
            }
            left += ' : ';
            
            var right = vo.mungeToString(k == 'listeners', pad + '    ');
            
            //if (!left.length && isArray) print(right);
            
            if ((typeof(right) != 'undefined') && right.length){
                els.push(left + right);
            }
        
            
        });
        if (!els.length()) {
            return "";
        }
        // oprops...    
            
        var spad = pad.substring(0, pad.length-4);
        return   "{\n" +
            pad  + string.join(",\n" + pad , els) + 
            "\n" + spad +  "}");
           
           
               
        
        
    } 
    
}


class JsRender.JsRender  : Object {
    /**
     * @cfg {Array} doubleStringProps list of properties that can be double quoted.
     */
    Array<string> doubleStringProps;
    
    string id;
    string name;   // is the JS name of the file.
    string path;  // is the full path to the file.
    string parent;  // JS parent.
    
    string title;  // a title.. ?? nickname.. ??? - 
    Project.Project project;
    //Project : false, // link to container project!
    
    JsRender.Node tree; // the tree of nodes.
    
    Array<JsRender.Base>() cn;
    
    
    void JsRender(Project.Project project, string path) {
        
        this.cn = new Array<JsRender.Base>();
        this.path = path;
        this.project = project;
        
        
    }
    JsRender.JsRender? factory(string xt, Project.Project project, string path)
    {
        JsRender.JsRender ret;
        switch (xt) {
            case "Gtk":
                return new JsRender.Gtk(project, path)
            case "Roo":
                return new JsRender.Roo(project, path)
        }
        return null;    
    }
    
    void save ()
    {
            
        var write = this.toJsonArray();
        var generator = new Json.Generator ();
        generator.indent = 4;
        generator.pretty = true;
        var node = new Json.Node();
        node.init_object(this.toJsonArray())
        generator.set_root(node);
        
        print("WRITE: " + this.path);// + "\n" + JSON.stringify(write));
        generator.to_file(this.path);
    }
        
    void   saveHTML ()
    {
        // NOOP
    },
    
    /**
     *
     * load from a javascript file.. rather than bjs..
     * 
     *
     */
     /*
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
    */
        /**
         * accepts:
         * { success : , failure : , scope : }
         * 
         * 
         * 
         */
         
    getTree ( o ) {
        print("File.getTree tree called on base object?!?!");
    }
    Json.Object toJsonArray ()
    {
        
        
        var ret = new Json.Object();
        ret.set_string_member("id", this.id);
        ret.set_string_member("name", this.name);
        ret.set_string_member("parent", this.parent);
        ret.set_string_member("title", this.title);
        ret.set_string_member("path", this.path);
        //ret.set_string_member("items", this.items);
        ret.set_string_member("permname", this.permname);
        ret.set_string_member("modOrder", this.modOrder);
        
        return ret;
    }
    
    

    string getTitle ()
    {
        if (this.title.length > 0) {
            return this.title;
        }
        var a = this.path.split('/');
        return a[a.length-1];
    }
    string getTitleTip()
    {
        if (this.title.length > 0) {
            return '<b>' + this.title + '</b> ' + this.path;
        }
        return this.path;
    }
    /*
        sortCn: function()
        {
            this.cn.sort(function(a,b) {
                return a.path > b.path;// ? 1 : -1;
            });
        },
    */
        // should be in palete provider really..
        
    string guessName function(JsRender.Node ar) // turns the object into full name.
    {
         // eg. xns: Roo, xtype: XXX -> Roo.xxx
        if (!ar.hasXnsType()) {
           return '';
        }
        
        return ar.get("|xns") +'.' + ar.get("|xtype");
                          
                            
    }
         
        
    /*
    copyTo: function(path, cb)
    {
        var _this = this;
        this.loadItems(function() {
            
            _this.path = path;
            cb();
        });
        
    },
    */
    
    /**
     * 
     * munge JSON tree into Javascript code.
     *
     * NOTE - needs a deep copy of original tree, before starting..
     *     - so that it does not modify current..
     * 
     * FIXME: + or / prefixes to properties hide it from renderer.
     * FIXME: '*props' - not supported by this.. ?? - upto rendering code..
     * FIXME: needs to understand what properties might be translatable (eg. double quotes)
     * 
     * @arg {object} obj the object or array to munge..
     * @arg {boolean} isListener - is the array being sent a listener..
     * @arg {string} pad - the padding to indent with. 
     */
    
    function mungeToString()
    {
        return this.
        
        
    }
    
     
    
}
    
     
 






