//<Script type="text/javascript">


public class JsRender.JsRender  : Object {
    /**
     * @cfg {Array} doubleStringProps list of properties that can be double quoted.
     */
    public Array<string> doubleStringProps;
    
    public string id;
    public string name;   // is the JS name of the file.
    public string path;  // is the full path to the file.
    public string parent;  // JS parent.
    
    public string title;  // a title.. ?? nickname.. ??? - 
    public Project.Project project;
    //Project : false, // link to container project!
    
    public Node tree; // the tree of nodes.
    
    public GLib.List<JsRender> cn; // child files.. (used by project ... should move code here..)

    public bool hasParent; 
    
    JsRender(Project.Project project, string path) {
        
        this.cn = new GLib.List<JsRender>();
        this.path = path;
        this.project = project;
        this.hasParent = false;
        this.parent = "";
        
        var ar = this.path.split("/");
            // name is in theory filename without .bjs (or .js eventually...)
        Regex regex = new Regex ("\\.(bjs|js)$");

        this.name = regex.replace(ar[ar.length-1],ar[ar.length-1].length, 0 , ""); 
            
        this.fullname = (this.parent.length ? (this.parent + ".") : "" ) + this.name;


        
    }
    public JsRender? factory(string xt, Project.Project project, string path)
    {
        JsRender ret;
        switch (xt) {
            case "Gtk":
                return new Gtk(project, path);
            case "Roo":
                return new Roo(project, path);
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
        node.init_object(this.toJsonArray());
        generator.set_root(node);
        
        print("WRITE: " + this.path);// + "\n" + JSON.stringify(write));
        generator.to_file(this.path);
    }
        
    void   saveHTML ()
    {
        // NOOP
    }
    
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
    /*     
    void getTree ( o ) {
        print("File.getTree tree called on base object?!?!");
    }
*/
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
            return "<b>" + this.title + "</b> " + this.path;
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
        
    string guessName(Node ar) // turns the object into full name.
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
    
    public string mungeToString(string pad)
    {
        return this.tree.mungeToString(false, pad);
        
    }
    
      
}
    
     
 






