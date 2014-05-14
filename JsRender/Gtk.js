//<Script type="text/javascript">
 
Gio = imports.gi.Gio;
GLib = imports.gi.GLib;

XObject = imports.XObject.XObject;
File = imports.File.File;
  
//----------------------- our roo verison
Base = imports.JsRender.Base.Base;

var gid = 1;

Gtk = XObject.define( 
    
    
    function(cfg) {
        
        // id ,
        //"name":"Edit Module Details",
        // items : 
        //"btype":"FORM", // was to be components...
        //"app":"Builder",
        //"module":"Pman.Tab.BuilderTop2"
        //console.dump(cfg);
        cfg.parent = cfg.parent || '';
        if (!cfg.name || !cfg.fullname ) {
            
            // name is in theory filename without .bjs (or .js eventually...)
            cfg.name = cfg.path.split('/').pop().replace(/\.(bjs|js)$/, '');
            
            cfg.fullname = (cfg.parent.length ? (cfg.parent + '.') : '' ) + cfg.name;
        }
        
        
        this.items = false;
        if (cfg.json) {
            var jstr =  JSON.parse(cfg.json);
            this.items = [ jstr ];
            //console.log(cfg.items.length);
            delete cfg.json; // not needed!
        }
        this.cn = [];
         /*
        var p = cfg.items && cfg.items.length && cfg.items[0].parent ? cfg.items[0].parent : false;
        
        // ensure real data is set...
        Roo.apply(this, {
            name : cfg.module,
            parent : p,
            title : cfg.name,
            project : cfg.app
            
        });
        
        this.cn = [];
        */
        Gtk.superclass.constructor.call(this, cfg);

        
        // super?!?!
        this.id = 'file-gtk-' + gid++;
        //console.dump(this);
        // various loader methods..
       
    },
    Base,   
    {
        xtype : 'Gtk',
        setNSID : function(id)
        {
            
            this.items[0]['*class'] = id;
            
            
        },
        getType: function() {
            return 'Gtk';
        },
        
        loadItems : function(cb)
        {
          
            print("load Items!");
            if (this.items !== false) {
                return false;
            }
            if (!cb) {  
                throw {
                    name: "ArgumentError", 
                    message : "no callback for loadItems"
                };
            }
            Seed.print("load: " + this.path);
            
            

            
            var _this = this;     
            var src = File.read(this.path);
            
            var cfg = JSON.parse(src);
            print("loaded data");
            //console.dump(cfg);
            
            //_this.name = cfg.name; -- this should not happen - name should always match filename!!
            _this.parent =  cfg.parent;
            _this.title =  cfg.title;
            _this.items = cfg.items || []; 
           
             cb();
             
             
            
            
            
        },
        /**
         * convert xtype for munged output..
         * 
         */
        mungeXtype : function(xtype, els)
        {
            els.push('xtype: '+ xtype);
        },
        
        toSource : function()
        {
            
            if (!this.items[0]) {
                return false;
            }
            var data = JSON.parse(JSON.stringify(this.items[0]));
            // we should base this on the objects in the tree really..
            var i = [ 'Gtk', 'Gdk', 'Pango', 'GLib', 'Gio', 'GObject', 
                'GtkSource', 'WebKit', 'Vte' ]; //, 'GtkClutter' , 'Gdl'];
            var src = "";
            i.forEach(function(e) {
                src += e+" = imports.gi." + e +";\n";
            });
            
            src += "console = imports.console;\n"; // path?!!?
            src += "XObject = imports.XObject.XObject;\n"; // path?!!?
            
            
            src += this.name + '=new XObject('+ this.mungeToString(data) + ");\n";
            src += this.name + '.init();\n';
            // register it in the cache
            src += "XObject.cache['/" + this.name + "'] = " + this.name + ";\n";
            
            
            return src;
            
            
        },
        save : function() {
            Base.prototype.save.call(this);
            this.saveJS();
        },
        
        /** 
         *  saveJS
         * 
         * save as a javascript file.
         * why is this not save...???
         * 
         * 
         */
        saveJS: function()
        {
             
            var fn = GLib.path_get_dirname(this.path) + '/' + this.name + '.js';
            print("WRITE : " + fn);
            File.write(fn, this.toSource());
            
            return fn;
        },
        /*
        getTree : function( o ) {
            
            
            
        }
        */
        getHelpUrl : function(cls)
        {
            return 'http://devel.akbkhome.com/seed/' + cls + '.html';
        },
        
        vcnt : false,
        
        toVala: function(strbuilder)
        {
            this.vcnt = 0;
            var item= XObject.xclone(items[0]);
            this.palete  = new imports.Palete.Gtk.Gtk({});
            
            this.vitems = [];
            this.toValaNames(item);
            
            this.toValaItem(item,0, strbuilder);
            
            
            
        },
        
        toValaName : function(item) {
            this.vcnt++;
            var cls = item['|xns'] + '.' + item.xtype;
            var id = item.id ? item.id : (item.xtype + this.vcnt);
            
            
            item.xvala_cls = cls;
            item.xvala_xcls = 'Xcls_' + id;
            item.xvala_id = item.id ? item.id : false;
            this.vitems.push(item);  
            // loop children..
            for(var i =0;i<item.items.length;i++) {
                this.toValaName(item.items[i]);
            }
          
        },
        
        
        toValaItem : function(item, depth, strbuilder)
        {
            
            
            var inpad = new Array( depth  ).join("    ");
            
            var pad = new Array( depth +1 ).join("    ");
            var ipad = new Array( depth +2 ).join("    ");
            
            var cls = item.xvala_cls;
            
            var xcls = item.xvala_xcls;
            // class header..
            strbuilder(inpad + "public class " + xcls + " : " + cls + "\n" + pad + "{\n");
            
            // properties??
                
                //public bool paused = false;
                //public static StatusIconA statusicon;
            if (!depth) {
                strbuilder(pad + "public static " + xcls + "  _this;\n");
                for(var i=1;i < this.vitems.length; i++) {
                    if (this.vitems.xvala_id  !== false) {
                        strbuilder(pad + "public static " + this.vitems.xvala_xcls + "  _" + this.vitems.xvala_id + ";\n");
                    }
                }
                
            }
             
            // ctor..
            
            strbuilder(pad + "public " + xcls + "()\n" + ipad + "{\n");
            
            // public static?
            if (!depth) {
                strbuilder(ipad + " _this = this;\n");
            } else {
                if (item.xvala_id !== false) {
                    strbuilder(ipad + " _this." + item.xvala_id  + " = this;\n");
                }
                
                
            }
           
            // what are the properties of this class???
            
            var props = this.palete.getPropertiesFor(cls, 'props');
            props.forEach(function(p) {
               if (typeof(item[p.name]) == 'undefined' || typeof(item[p.name]) == 'object' ) {
                    return;
               }
               // got a property..
               strbuilder(ipad + " this." + p.name + " = " + JSON.stringify(item[p.name]) + ";\n");
               
            });
                //code
            
            
            //print(JSON.stringify(props, null,4));
            //Seed.quit();
            /*
            
           
            //    
                
                 //title : 'gitlive',
                this.stock = Gtk.Stock.REFRESH;
                this.tooltip_text = "GitLive";
                this.title = "vgitlive";
                
                this.set_name("vgitlive");
                this.set_visible(true);      
                
                var menu = new MenuA();
            */
            
        }
        
        
        
    });