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
          
            this.projects.push( new Builder.Provider.Project[ar.xtype](ar));
            
            
            
            
            
             
        }
   
        
        
        
        
        
        
        
    },
    
    
    saveConfig : function()
    {
        Roo.each(this.projects, function(p) {
            
            if (!p.fn) {
                // make the filename..
                var t = new GLib.TimeVal();
                GLib.get_current_time(t);
                var str = '' + t.tv_sec + ':' + t.tv_usec;
                Seed.print(str);
                p.fn = GLib.compute_checksum_for_string(GLib.ChecksumType.MD5, str, str.length);
                Seed.print(p.fn);

            }
            
            
            var file = Gio.file_new_for_path(this.dirname + '/' + p.fn + '.json');
            
            var stream = file.replace(null,false,0);
            var  s =  p.toJSON();
            stream.write(s, s.length);
            stream.close();
           
           
        }, this);
        
        
        
        
    },
    update : function(proj) {
        
        Seed.print(JSON.stringify(proj));
        var found = false;
        Roo.each(this.projects , function(p) {
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
        var pr = new Builder.Provider.Project[proj.xtype](proj);
        this.projects.push(pr );
        this.fireEvent('changed', this);
        return pr;
        
        
    },
    getByFn : function (fn) {
        var  ret = false;
        Roo.each(this.projects, function(p) {
            if (p.fn == fn) {
                ret = p;
                return true;
            }
        });
        return ret;
        
    }

    
    
});



 