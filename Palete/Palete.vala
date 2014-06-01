
namespace Palete 
{
    public errordomain Error {
        INVALID_TYPE,
        NEED_IMPLEMENTING
    }
    

    static Gee.HashMap<string,Palete>? cache = null;
    
    public static   Palete factory(string xtype)
    {
        if (this.cache == null) {
            this.cache = new Gee.HashMap<string,Palete>();
        }
        if (this.cache.get(xtype) != null) {
            return this.cache.get(xtype);
        }
        switch(xtype) {
            case "Gtk":
                this.cache.set(xtype, new Gtk());
                break;
            case "Roo":
                this.cache.set(xtype, new Roo());
                break;
            default:
                throw Error.INVALID_TYPE("invalid argument to Palete factory");
        }
        return this.cache.get(xtype);
    }
       

    public class Palete : Object 
    {
        
       
  
        
        public Palete()
        {
            // nothing?
        }
        
        
        //map : false, // array of mappings   left: [] , right : []
        
        //items : false, // the tree of nodes.
        
        


        string  guessName(JsRender.Node ar) throws Error // turns the object into full name.
        {
            throw new Error.NEED_IMPLEMENTING("xxx. guessName needs implimenting");
        }
            

            
        /**
         * gather a  list of potentional objects that can be added..
         * 
         */
        /*
        gatherList: function (existing) {
            existing = existing || [];
           // existing.push('*top'); // always have top
            var ret  = []; 
            console.log("GATHER LIST? " + this.map.length);
            
            
            function addRight(right) {
                right.forEach(function(r) {
                    if (ret.indexOf(r) > -1) {
                        return;
                    }
                    ret.push(r);
                });
            }
            
            this.map.forEach(function(m) {
                var done = false
                m.left.forEach( function(left) {
                    if (done) return; 
                    
                    var l = left.replace(/:.*$/, '');
                   // print("chk:" + l + " in " + existing.join(',')); 
                    if (existing.indexOf(l) > -1) {
                        addRight(m.right);
                        done =true;
                        //return true; // no more needed..
                    }
                });
                
            });
            ret.sort();
            
           // console.dump(ret);
            return ret;
            
            
            
        },
        
        getDropList : function(rval)
        {
            
            var ret = [];
            this.map.forEach( function(m) {
                if (m.right.indexOf(rval) > -1) {
                    m.left.forEach(function(l) {
                        if (ret.indexOf(l) > -1) {
                            return;
                        }
                        ret.push(l)
                    });
                }
                
            });
            console.log("DROP LIST:");
            console.dump(ret);
            return ret;
            
        },
        /**
         * basic guess type.. 
         * 
         * /
        findType : function (data, prop, value)
        {
            if (prop[0] == '|') {
                return 'function';
            }
            return typeof(value);
        },
        
        
        findOptions : function(ename)
        {
            switch(ename.toLowerCase()) {
                case 'boolean': 
                    return [ 'true', 'false' ];
                // everything else does not have options.
                case 'string': 
                case 'utf8': 
                case 'int': 
                case 'uint': 
                case 'function': 
                    return false;
                default: 
                    console.log("OOPS: = unknown type: " + ename);
                    return false;
            }
        },
        confirmCanAdd: function(parent, child) {
            // confirms that one obj can be added to another.
            // returns true, for items, or list of properties that can hold it..
            return true;
            
        },
        getDefaultPack: function(pname, cname) {
            return 'add';
        },
        saveTemplate: function(name, data)
        {
            var gn = this.guessName(JSON.parse(data));
            // store it in user's directory..
            var appdir = GLib.get_home_dir() + '/.Builder'; 
            
            if (!File.isDirectory(appdir+ '/' + gn)) {
                File.mkdir(appdir+ '/' + gn);
            }
            File.write(appdir+ '/' + gn + '/' +  name + '.json', data);
            
        },
        /**
         * list templates - in home directory (and app dir in future...)
         * @param {String} name  - eg. Gtk.Window..
         * @return {Array} list of templates available..
         * /
        listTemplates : function(name)
        {
            
            var gn = name;
            if (typeof(gn) != 'string') {
                gn = this.guessName(gn);
            }
            
            
            var dir= GLib.get_home_dir() + '/.Builder/' + gn; 
            if (!File.isDirectory(dir)) {
                return [];
            }
            var ret =  [];
            File.list(dir).forEach(function(n) {
                if (!n.match(/\.json$/)) {
                    return;
                }
                
                ret.push({
                    path : dir + '/' + n,
                    name:  n.replace(/\.json$/,'')
                });
            });
            return ret;
            
        },
        loadTemplate : function(path)
        {
            return JSON.parse(File.read(path));
        }
    */        
        
    }

}



