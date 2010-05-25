//<Script type="text/javascript">

/**
 * Project Object
 * 
 * Projects can only contain one directory... - it can import other projects..(later)
 * 
 * we need to sort out that - paths is currently a key/value array..
 * 
 * 
 * 
 */

Gio = imports.gi.Gio;
GLib = imports.gi.GLib; 


console = imports.console;
XObject = imports.XObject.XObject;

ProjectManager = imports.Builder.Provider.ProjectManager.ProjectManager;
Observable = imports.Observable.Observable;

Base = XObject.define( 
    function(cfg) {
        
        
        this.addEvents({ 'changed'  : true });
        var _this = this;
        this.on('changed' , function() {
            Seed.print("Calling PM - changed");
            
            ProjectManager.fireEvent('changed');
        });
        XObject.extend(this, cfg);
        this.files = { }; 
        /*
        if (this.files ){
            for (var f in this.files) {
                var xt = this.xtype;
                var cls = imports.Builder.Provider.File[xt][xt];
                this.files[f] = cls(this.files[f]);
            }
        }
        */
        
        
        this.scanDirs();
        
    },
    Observable, 
    {
        id : false,
        fn:  false, // the md5 sum for this one..
        paths : false,
        files : false,
        tree : false,
        xtype : false,
        
        load : function (o)  // is this used??
        {
            if (!this.fetchTree) {
                console.log("Project.getTree tree called on base object?!?!");
                return false;
            }
            
            if (this.files) {
                return o.success.apply(o.scope || this, [this]);
            }
            return this.fetchTree(o);
            
        },
        getPalete : function()
        {
            print("GET PROVIDER FOR " + this.xtype);
            return  ProjectManager.getPalete(this.xtype);
        },
        toJSON : function()
        {
            var ret = { };
            var _this = this;
            ['id', 'fn', 'paths', 'xtype', 'name'].forEach(  function(k) {
                ret[k] = _this[k];
                
            });
            ret.files = { }; 
            // deal with files..
            for (var f in this.files) {
                print(f);
                ret.files[f] = this.files[f].toJsonArray();
            }
            
            
            return JSON.stringify(ret);
          
          
        },
        toTree : function()
        {
            
            
            // normally this will build tree's based on info in the file stuff..
            // but for the time being, we just return an array of all the files.
            
            
            
            //if (this.tree) {
             //   return this.tree;
            //}
            
            this.tree = [];
            /*
            for (var f in this.files) {
                this.tree.push(this.files[f]);
            }
            return this.tree;
            */
            
            // have parents -> add them to parent...
            var files = {};
            var parents = {};
            for (var k in this.files) {
                
                var f = this.files[k];
                if (!f) {
                    continue;
                   }
                ///console.dump(f);
                f.hasParent = false;
                f.cn = [];
                //console.log(f.name);
                if (f.fullname) {
                    files[f.fullname] = f;
                }
            };
            
            // add Parent pointer..
            for (var k in this.files) {
                var f = this.files[k];
                console.log(f.parent + ":" + f.name);
                if (f.parent && typeof(files[f.parent]) != 'undefined') {
                    // add it to parent;
                    
                    files[f.parent].cn.push(f);
                    f.hasParent = true;
                    
                }
                
                
            };
            
              
            
            var ret = [];
            for (var k in this.files) {
                var f = this.files[k];
                
                f.sortCn();
                if (f.hasParent) {
                    continue;
                }
                if (typeof(files[f.fullname]) != 'undefined') {
                    ret.push(f);
                }
                
            };
            
            
            ret.sort(function(a,b) {
                return a.path > b.path ? 1 : -1;
            });
            this.tree = ret;
            return this.tree;
             
            
        },
        getById : function(id)
        {
            var ret = false;
            for (var k in this.files) {
                var f = this.files[k];
                
                console.log(f.id + '?=' + id);
                if (f.id == id) {
                    return f;
                }
            };
            return ret;
        },
        
        loadFileOnly : function(path)
        {
            
            var xt = this.xtype;
            var cls = imports.Builder.Provider.File[xt][xt];
            return  new cls({
                path : path,
                parent : '',
                project : this
            });
        },
        create : function(filename)
        {
            var ret = this.loadFileOnly(filename);
            ret.save();
            this.addFile(ret);
            return ret;
            
        },
        
         
        addFile: function(pfile) { // add a single file, and trigger changed.
            this.files[pfile.path] = pfile
            this.fireEvent('changed', this);
        },
        
        add: function(path, type)
        {
            this.paths = this.paths || { };
            this.paths[path] = type;
            //Seed.print(" type is '" + type + "'");
            if (type == 'dir') {
                this.scanDir(path);
            //    console.dump(this.files);
            }
            if (type == 'file' ) {
                
                this.files[path] = this.loadFileOnly( path );
            }
            
            // console.dump(this.files);
            this.fireEvent('changed', this);
            
        },
        
        scanDirs: function()
        {
            this.files = this.files  || { };
            for (var d in this.paths) {
                if (this.paths[d] == 'dir') {
                    this.scanDir(d);
                }
                // otherwise add a file..
            }
            //console.dump(this.files);
            
        },
        
        
        // list files.
        scanDir : function(dir, dp) 
        {
            dp = dp || 0;
            Seed.print("Running scandir on " + dir);
            if (dp > 5) { // no more than 5 deep?
                return;
            }
            // this should be done async -- but since we are getting the proto up ...
            var gdir = GLib.dir_open(dir,0);
            var subs = [];
            var _this = this;
            while (true) {
                var fn = GLib.dir_read_name(gdir);
                console.log('trying ' + dir + '/' + fn);
                if (!fn) {
                    GLib.dir_close(gdir);
                    subs.forEach( function(s) {
                        _this.scanDir(s, dp+1);
                    });
                    return;
                }
                if (fn[0] == '.') { // skip hidden
                    continue;
                }
                
                if (GLib.file_test(dir  + '/' + fn, GLib.FileTest.IS_DIR)) {
                    subs.push(dir  + '/' + fn);
                    continue;
                }
                
                if (!fn.match(/\.bjs$/)) {
                    continue;
                }
                var parent = '';
                //if (dp > 0 ) {
                var sp = dir.split('/');
                sp = sp.splice(sp.length - (dp +1), (dp +1));
                parent = sp.join('.');
                
                
                if (typeof(this.files[dir  + '/' + fn]) != 'undefined') {
                    // we already have it..
                    this.files[dir  + '/' + fn].parent = parent;
                    continue;
                }
                var xt = this.xtype;
                var cls = imports.Builder.Provider.File[xt][xt];
                
                Seed.print("Adding file " + dir  + '/' + fn);
                this.files[dir  + '/' + fn] = new cls({
                    path : dir  + '/' + fn,
                    parent : parent,
                    project : this
                });
                //console.log(this.files[dir  + '/' + fn] );
                /*
                var f = Gio.file_new_for_path(dir + '/' + fn);
                var inf = f.query_info('standard::*');
                var tv = new GLib.TimeVal();
                inf.get_modification_time(tv);
                
                // should it do something about this information..
                // fixme... time data is busted..
                this.files[dir  + '/' + fn] = '' + tv.tv_sec + '.' + tv.tv_usec;
                */
            }
             
            
        }
        
        
        
        
        

    }
); 


     
 