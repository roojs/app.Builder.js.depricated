//<Script type="text/javascript">
Gio = imports.gi.Gio;
GLib = imports.gi.GLib;


console = imports.console;
XObject = imports.XObject.XObject;
 
Observable = imports.Observable.Observable;

/**
 * 
 * /home/alan/.BuilderConfig/*
 * 
 * 
 */

ProjectManager =  new Observable({
    
    events : {
        'changed' : true,
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
        var gdir = GLib.dir_open(this.dirname,0);
        while (true) {
        
            var fn = GLib.dir_read_name(gdir);
            if (!fn) {
                GLib.dir_close(gdir);
                return;
            }
            if (!fn.match(/.json$/)) {
                continue;
            }
            var file = Gio.file_new_for_path(this.dirname + '/' + fn);
            Seed.print(this.dirname + '/' + fn);
            var stream = file.read();
            var dstream = new Gio.DataInputStream.c_new(stream);
            Seed.print(dstream);
            
            str = dstream.read_until("");
            if (!str || !str.length) {
                continue; // empty file.
            }
             
            
            var ar = JSON.parse(str); 
            Seed.print(ar.xtype);
            
            // construct...
            var cls = imports.Builder.Provider.Project[ar.xtype][ar.xtype];
            this.projects.push( new cls(ar));
            
            
            
            
            
             
        }
   
        
        
        
        
        
        
        
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
            
            
            var file = Gio.file_new_for_path(_this.dirname + '/' + p.fn + '.json');
            
            var stream = file.replace(null,false,0);
            //console.dump(p);
            var  s =  p.toJSON();
            stream.write(s, s.length);
            stream.close();
           
           
        });
        
        
        
        
    },
    update : function(proj) {
        
        Seed.print(JSON.stringify(proj));
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
        var cls = imports.Builder.Provider.Project[proj.xtype][proj.xtype];
        var pr = new cls(proj);
        this.projects.push(pr );
        this.fireEvent('changed', this);
        return pr;
        
        
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
            print ("ALREADY GOT " + type);
            return ProjectManager.palete[type];
        }
        var cls = imports.Builder.Provider.Palete[type][type];
        
        ProjectManager.palete[type] =  new cls();
        print (typeof(ProjectManager.palete[type]));
        return ProjectManager.palete[type];
    }

    
    
});



 