//<Script type="text/javascript">
Gio         = imports.gi.Gio;
GLib        = imports.gi.GLib;


console     = imports.console;
XObject     = imports.XObject.XObject;
 
Observable  = imports.Observable.Observable;
File        = imports.File.File;
/**
 * 
 * /home/alan/.BuilderConfig/*
 * 
 * 
 */

ProjectManager =  new Observable({
    
    events : {
        'changed' : true
    },
    
    
    listeners : {
        'changed' :  function() {
            this.saveConfig();
        }
        
    },
    
    palete : { }, 
    projects : [],
    filename : false,
    
    loadConfig : function ()
    {
        // we can not do this async.... 
        this.dirname = GLib.get_home_dir() + '/.Builder'; 
        
        var dir = Gio.file_new_for_path(this.dirname);
        if (!dir.query_exists()) {
            dir.make_directory();
            return;
        }
      
        this.projects = [];
        var files = File.list(this.dirname);
        
        
        //print(files);Seed.quit();
        for (var i =0 ; i < files.length;i++) {
            var fn = files[i];
             print(fn);
            if (!fn.match(/\.json$/)) {
                continue;
            }
            var str = File.read(this.dirname + '/' + fn);
            if (!str || !str.length) {
                print("EMPTY");
                continue; // empty file.
            }
             
            
            var ar = JSON.parse(str); 
            Seed.print(ar.xtype);
            
            // construct...
            var cls = imports.Project[ar.xtype][ar.xtype];
            this.projects.push( new cls(ar));
            
            
            
            
            
             
        }
//        print(JSON.stringify(this.projects.length));Seed.quit();
   
        this.projects.sort(function(a,b) {
            if (a.getName() == b.getName()) {
                return 0;
            }
            return a.getName() > b.getName() ? 1 : -1;
            
            
        });
   
        
       
        
        
        
        
        
        
    },
    
    
    saveConfig : function()
    {
        var _this = this;
        this.projects.forEach( function(p) {
            
            if (!p.fn) {
                // make the filename..
                var t = new GLib.TimeVal();
                GLib.get_current_time(t);
                var str = '' + t.tv_sec + ':' + t.tv_usec;
                Seed.print(str);
                p.fn = GLib.compute_checksum_for_string(GLib.ChecksumType.MD5, str, str.length);
                Seed.print(p.fn);

            }
            var  s =  p.toJSON();
            File.write(_this.dirname + '/' + p.fn + '.json', s);
           
           
        });
        
        
        
        
    },
    update : function(proj) {
        
        //Seed.print(JSON.stringify(proj));
        var found = false;
        this.projects.forEach( function(p) {
            if (proj == p) {
                found = true;
                return true;
            }
        });
        if (found) {
            this.fireEvent('changed', this);
            return proj;
            return;
        }
        var cls = imports.Project[proj.xtype][proj.xtype];
        var pr = new cls(proj);
        this.projects.push(pr );
        this.fireEvent('changed', this);
        return pr;
        
        
    },
    
    deleteProject : function (fn)
    {
        var newplist = [];
        var _this = this;
        this.projects.forEach(function(p) {
            if (p.fn != fn) {
                newplist.push(p);
                return;
            }
            var file = _this.dirname + '/' + p.fn + '.json';
            if (File.exists(file)) {
                File.remove(file);
            }
            
        });
        this.projects = newplist;
        this.fireEvent('changed', this);
    },
    
    
    getByFn : function (fn) {
        var  ret = false;
        this.projects.forEach(function(p) {
            if (p.fn == fn) {
                ret = p;
                return true;
            }
        });
        return ret;
        
    },
    getPalete: function(type) {
        if (typeof(ProjectManager.palete[type]) != 'undefined') {
            //print ("ALREADY GOT " + type);
            return ProjectManager.palete[type];
        }
        var cls = imports.Palete[type][type];
        
        ProjectManager.palete[type] =  new cls();
        print (typeof(ProjectManager.palete[type]));
        return ProjectManager.palete[type];
    }

    
    
});



 
