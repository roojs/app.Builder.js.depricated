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


public class Project.Project {
    
    
    public string id = "";
    public string fn = "";
    public string name = "";
    public Gee.HashMap<string,string> paths;
    public GLib.List<JsRender.JsRender> files ;
    //tree : false,
    public string xtype = "";
    
    
    Project (string path) {
        
        //this.name = name;
        
        
        this.paths = new Gee.HashMap<string,string>();
        this.files = new GLib.List<JsRender.JsRender>();
        //XObject.extend(this, cfg);
        //this.files = { }; 
        
        
        this.scanDirs();
        
    }
    
    public void onChanged() {
       // ProjectManager.fireEvent('changed');
        
    }
    /*
    public load
     
        
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
    */
   // public Palete  getPalete ()
    //{
            //print("Project.Base: GET PROVIDER FOR " + this.xtype);
   //         return  ProjectManager.getPalete(this.xtype);
   // }
    
    public string toJSON()
    {
        
        var builder = new Json.Builder ();
        
        builder.begin_object ();
        
        builder.set_member_name ("name");
        builder.add_string_value (this.name);

        
        builder.set_member_name ("fn");
        builder.add_string_value (this.fn);

        builder.set_member_name ("xtype");
        builder.add_string_value (this.xtype);
        
        // file ??? try/false?
        builder.set_member_name ("paths");
        
        
        builder.begin_array ();
        
        
        var iter = this.paths.map_iterator();
        while (iter.next()) {
            builder.add_string_value (iter.get_key());
        }
        builder.end_array ();
        
        
        var  generator = new Json.Generator ();
        var  root = builder.get_root ();
        generator.set_root (root);

        return  generator.to_data (null);
	      
          
    }
    // returns the first path
    public string getName()
    {
        var iter = this.paths.map_iterator();
        while (iter.next()) {
            return GLib.Path.get_basename(iter.get_key());
        }
      
        return "";
    }
    /**
     *
     * to tree - > should
     */
 
    public GLib.List<JsRender.JsRender> toTree ()
    {
            
         
         
        var files = new Gee.HashMap<string,Json.Object>();
         
        for(var i = 0; i < this.files.length(); i++) {
            var fo = this.files.nth_data(i);
            
            fo.hasParent = false;
            fo.cn = new GLib.List<JsRender.JsRender>();
            
            if (this.files.nth_data(i).fullname.length > 0) {
                files.set(fo.fullname, f);
            }
        }
        
        var iter = files.map_iterator();
        while (iter.next()) {
            var f = iter.get_value();
            
            var par = f.parent;
            if (par.length < 1) {
                return;
            }
            if (!files.has_key(par)) {
                return;
            }
            files.get(par).cn.add(f);
            f.hasParent = true;
             
        };
            
        var ret = new GLib.List<JsRender.JsRender>();
        iter = files.map_iterator();
        while (iter.next()) {
            var f = iter.get_value();
                
            //   f.sortCn();
            if (f.hasParent) {
                continue;
            }
            if (files.has_key(f.fullname)) {
            
                ret.add(f);
            }
        }
        ret.sort( (a,b) => {
            return a.path > b.path ? 1 : -1;
        });
        
        
        //print(JSON.stringify(ret,null,4));
            
        return ret;  
             
            
    }
    
    
    
    public JsRender.JsRender? getById(string id)
    {
        
       for(var i = 0; i < this.files.length; i++) {
            var fo = this.files.index(i);
            
            
            //console.log(f.id + '?=' + id);
            if (f.id == id) {
                return f;
            }
        };
        return null;
    }
        
    public JsRender.JsRender loadFileOnly (string path)
    {
        var xt = this.xtype;
        return JsRender.Base.factory(xt, this, path);
        
    }
    
    public JsRender.JsRender create(string filename)
    {
        var ret = this.loadFileOnly(filename);
        ret.save();
        this.addFile(ret);
        return ret;
        
    }
        
         
    public void addFile(JsRender.JsRender pfile) { // add a single file, and trigger changed.
        this.files.append_val(pfile); // duplicate check?
        this.onChanged();
    }
    
    public void add(string path, string type)
    {
        this.paths.set(path,type);
        //Seed.print(" type is '" + type + "'");
        if (type == "dir") {
            this.scanDir(path);
        //    console.dump(this.files);
        }
        if (type == "file" ) {
            this.files.append(this.loadFileOnly( path ));
        }
        this.onChanged();
        
    }
    public void  scanDirs()
    {
        var iter = this.paths.map_iterator();
        while (iter.next()) {
            if (iter.get_value() != "dir") {
                continue;
            }
            this.scanDir(iter.get_key());
        }
        //console.dump(this.files);
        
    }
        // list files.
    public void scanDir(string dir, int dp =0 ) 
    {
        //dp = dp || 0;
        //Seed.print("Project.Base: Running scandir on " + dir);
        if (dp > 5) { // no more than 5 deep?
            return;
        }
        // this should be done async -- but since we are getting the proto up ...
        
            
        var f = File.new_for_path(dir);
        var file_enum = f.enumerate_children(GLib.FileAttribute.STANDARD_DISPLAY_NAME, GLib.FileQueryInfoFlags.NONE, null);
        
        string[] subs;
        FileInfo next_file; 
        while ((next_file = file_enum.next_file(null)) != null) {
            var fn = next_file.get_display_name();
    
             
            //console.log('trying ' + dir + '/' + fn);
            
            if (fn[0] == '.') { // skip hidden
                continue;
            }
            
            if (FileUtils.test(dir  + "/" + fn, GLib.FileTest.IS_DIR)) {
                subs += (dir  + "/" + fn);
                continue;
            }
            
            if (!Regex.match_simple("\\.bjs$", fn)) {
                continue;
            }
            /*
            var parent = "";
            //if (dp > 0 ) {
            
            var sp = dir.split("/");
            var parent = "";
            for (var i = 0; i < sp.length; i++) {
                
            }
            
            /*
            sp = sp.splice(sp.length - (dp +1), (dp +1));
            parent = sp.join('.');
            
            
            if (typeof(_this.files[dir  + '/' + fn]) != 'undefined') {
                // we already have it..
                _this.files[dir  + '/' + fn].parent = parent;
                return;
            }
            */
            var xt = this.xtype;
            JsRender.JsRender.factory(xt,this, dir + "/" + fn);
            // parent ?? 
            
             
        }
        for (var i = 0; i < subs.length; i++) {
             this.scanDir(subs[i], dp+1);
        }
        
    }
      
}

 