//<Script type="text/javascript">
 
Gio = imports.gi.Gio;
GLib = imports.gi.GLib;

XObject = imports.XObject.XObject;
File = imports.File.File;
  
//----------------------- our roo verison
Base = imports.JsRender.Base.Base;

var gid = 1;

// ctors needed for Constructing vala?? - 

var ctors = {
    "Gtk.Label": [ "label" ],
    "Gtk.Box": [ "orientation", "spacing:0" ],
    "Gtk.MessageDialog" : [ "parent:null", "flags:Gtk.DialogFlags.MODAL", "message_type",  "buttons", "text" ],
    "Gtk.ScrolledWindow": [ "hadjustment:null", "vadjustment:null" ],
    "Gtk.SourceBuffer": [ "table:null" ],
    "Gtk.Table": [ "n_rows", "n_columns" , "homogeneous" ],
    "Gtk.ToolButton": [ "icon_widget:null", "label:null" ],
    "Gtk.HBox": [ "homogeneous:true", "spacing:0" ],
    "Gtk.VBox": [ "homogeneous:true", "spacing:0" ],
    "Gtk.ListStore": [ "n_columns", "columns" ],
    "Gtk.TreeStore": [ "n_columns", "columns" ],
    "Gtk.FileChooserWidget" : [ "action"],
    "Gtk.Window" : [ "type"],
    "Clutter.FlowLayout" : [ "orientation"],
    //"Gtk.Entry": [  ],
};



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
            this.saveVala();
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
        
        saveVala: function()
        {
             
            var fn = GLib.path_get_dirname(this.path) + '/' + this.name + '.vala';
            print("WRITE : " + fn);
            File.write(fn, this.toVala());
            
            return fn;
        },
        valaCompileCmd : function()
        {
            
            var fn = '/tmp/' + this.name + '.vala';
            print("WRITE : " + fn);
            File.write(fn, this.toVala(true));
            
            
            
            return ["valac",
                   "--pkg",  "gio-2.0",
                   "--pkg" , "posix" ,
                   "--pkg" , "gtk+-3.0",
                   "--pkg",  "libnotify",
                   "--pkg",  "gtksourceview-3.0",
                   "--pkg", "libwnck-3.0",
                   fn ,   "-o", "/tmp/" + this.name];
            
           
             
            
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
        
        toVala: function(testcompile)
        {
            var ret = '';
            testcompile = testcompile || false;
            
            this.vcnt = 0;
            //print(JSON.stringify(this.items[0],null,4));
            //print(JSON.stringify(this.items[0],null,4));Seed.quit();

            var item=  XObject.xclone(this.items[0]);
            if (!item.id) {
                item.id = this.name;
                
            }
            
            print(JSON.stringify(item,null,4));
            
            this.palete  = new imports.Palete.Gtk.Gtk({});
            
            this.vitems = [];
            this.toValaName(item);
           // print(JSON.stringify(item,null,4));Seed.quit();
            
            ret += "/* -- to compile\n";
            ret += "valac  --pkg gio-2.0  --pkg posix  --pkg gtk+-3.0 --pkg libnotify --pkg gtksourceview-3.0  --pkg  libwnck-3.0 \\\n";
            //ret += "    " + item.xvala_id + ".vala  -o /tmp/" + item.xvala_id +"\n";
            ret += "    /tmp/" + this.name + ".vala  -o /tmp/" + this.name +"\n";
            ret += "*/\n";
            ret += "\n\n";
            if (!testcompile) {
                ret += "/* -- to test class\n";  
            }
            //
            ret += "static int main (string[] args) {\n";
            ret += "    Gtk.init (ref args);\n";
            ret += "    new " + item.xvala_xcls +"();\n";
            ret += "    " + this.name +".show_all();\n";
            ret += "     Gtk.main ();\n";
            ret += "    return 0;\n";
            ret += "}\n";
            if (!testcompile) {
                ret += "*/\n";
            }
            ret += "\n\n";
            
            
            // print(JSON.stringify(item,null,4));
            this.toValaItem(item,0, function(s) {
                ret+= s;
            });
            
            return ret;
            
        },
        
        toValaNS : function(item)
        {
            var ns = item['|xns'] ;
            if (ns == 'GtkSource') {
                return 'Gtk.Source'
               
            }
            return ns + '.';
        },
        
        toValaName : function(item) {
            this.vcnt++;
            var cls = this.toValaNS(item) + item.xtype;  // eg. Gtk.Window
            var id = item.id ? item.id : (item.xtype + this.vcnt);
            var props = this.palete.getPropertiesFor(cls, 'props');
            
            var id_clsname = id;
            if (id[0] == '+' || id[0] == '*') {
                id_clsname = id_clsname.substring(1);
            }
            
            item.xvala_cls = cls;
            item.xvala_xcls = 'Xcls_' + id_clsname;
            item.xvala_id = item.id ? item.id : false;
            this.vitems.push(item);  
            // loop children..
            if (typeof(item.items) == 'undefined') {
                return;
            }
            for(var i =0;i<item.items.length;i++) {
                this.toValaName(item.items[i]);
            }
          
        },
        
        
        toValaItem : function(item, depth, strbuilder)
        {
        // print(JSON.stringify(item,null,4));
            
            var inpad = new Array( depth +1 ).join("    ");
            
            var pad = new Array( depth +2 ).join("    ");
            var ipad = new Array( depth +3 ).join("    ");
            
            var cls = item.xvala_cls;
            
            var xcls = item.xvala_xcls;
            
            var citems = {};
            
            if (!depth) {
                // Global Vars..
                strbuilder(inpad + "public static " + xcls + "  " + this.name + ";\n\n");
                 
                
            }
            
            // class header..
            // class xxx {   WrappedGtk  el; }
            strbuilder(inpad + "public class " + xcls + " : Object \n" + inpad + "{\n");
            strbuilder(pad + "public " + cls + " el;\n");
            if (!depth) {
				this.top_xcls = xcls;
			}
            strbuilder(pad + "private " + this.top_xcls + "  _this;\n\n");
            //}
            
            
            // singleton
            
            if (!depth) {
                strbuilder(pad + "public static " + xlcs + " singleton()\n");
                strbuilder(pad + "{\n");
                strbuilder(ipad + "if (" + this.name + " == null) {\n");
                strbuilder(ipad + "    " + this.name + "= new "+ xcls + "();\n"); // what about args?
                strbuilder(ipad + "}\n");
                strbuilder(ipad + "return " + this.name +";\n");
                strbuilder(pad + "}\n");
                
            }
            
            
            // properties - global..??
                
                //public bool paused = false;
                //public static StatusIconA statusicon;
            if (!depth) {
                //strbuilder(pad + "public static " + xcls + "  _this;\n");
                for(var i=1;i < this.vitems.length; i++) {
                    if (this.vitems[i].xvala_id  === false) {
                        continue;
                        
                    }
                    if (this.vitems[i].xvala_id[0] == '*') {
                        continue;
                    }
                    if (this.vitems[i].xvala_id[0] == '+') {
                        continue;
                    }
                    strbuilder(pad + "public " + this.vitems[i].xvala_xcls + " " + this.vitems[i].xvala_id + ";\n");
                }
                
            }
            
            strbuilder("\n" + ipad + "// my vars\n");
            
            
            // Key = TYPE:name
            for (var k in item) {
                
                
                if (k[0] != '.') {
                   
                    continue;
                }
                if (k == '.ctor') {
                    continue; 
                }
                
                var kk = k.substring(1);
                
                var vv = kk.split(':');
                if (vv[0] == 'signal') {
                    strbuilder(pad + "public " + vv[0] + " " + vv[1] + " " + vv[2] + item[k] + ";\n");
                } else {
                
                    strbuilder(pad + "public " + vv[0] + " " + vv[1] + ";\n");
                }
                citems[k] = true; 
                
            }
            // if id of child is '+' then it's a property of this..
            
            if (typeof(item.items) != 'undefined') {
                for(var i =0;i<item.items.length;i++) {
                    var ci = item.items[i];
                    if (ci.xvala_id[0] != '+') {
                        continue; // skip generation of children?
                        
                    }
                    strbuilder(pad + "public " + ci.xvala_xcls + " " + ci.xvala_id.substring(1) + ";\n");
                               
                    
                }
            }
            
            
            
            // .vala props.. 
            
            var cargs = []; 
            var cargs_str = '';
            // ctor..
            strbuilder("\n" + ipad + "// ctor \n");
            if (typeof(item['*args']) != 'undefined') {
                cargs_str = ", " + item['*args']
                var ar = item['*args'].split(",");
                for (var ari =0; ari < ar.length; ari++) {
                    cargs.push(ar[ari].trim().split(" ").pop());
                }
                    
            }
            
			if (!depth) {
        		strbuilder(pad + "public " + xcls + "(" + cargs_str.substring(1) +")\n" + pad + "{\n");
			} else {
                
                    //code 
                
				strbuilder(pad + "public " + xcls + "(" + this.top_xcls + " _owner " + cargs_str + ")\n" + pad + "{\n");
			}
            
            
            
            // public static?
            if (!depth) {
                strbuilder(ipad + "_this = this;\n");
                //strbuilder(ipad + this.name  + " = this;\n");
            } else {
                strbuilder(ipad + "_this = _owner;\n");
                if (item.xvala_id !== false && item.xvala_id[0] != '*' && item.xvala_id[0] != '+' ) {
                    strbuilder(ipad + "_this." + item.xvala_id  + " = this;\n");
                   
                }
                
                
            }
            
            // wrapped ctor..
            // this may need to look up properties to fill in the arguments..
            // introspection does not workk..... - as things like gtkmessagedialog
            /*
            if (cls == 'Gtk.Table') {
                
                var methods = this.palete.getPropertiesFor(cls, 'methods');
                
                print(JSON.stringify(this.palete.proplist[cls], null,4));
                Seed.quit();
            }
            */
            if (typeof(item['.ctor']) != 'undefined') {
                strbuilder(ipad + "this.el = " + item['.ctor']+ ";\n" );
            } else if (typeof(ctors[cls]) !== 'undefined') {
                var args = [];
                for(var i =0;i< ctors[cls].length;i++) {
                    
                    var nv = ctors[cls][i].split(':');
                    
                    if (typeof(item[nv[0]]) != 'undefined' && typeof(item[nv[0]]) != 'object' ) {
                        citems[nv[0]] = true;
                        args.push(JSON.stringify(item[nv[0]]));
                        continue;
                    }
                    if (typeof(item['|' + nv[0]]) != 'undefined' && typeof(item['|' + nv[0]]) != 'object' ) {
                        citems[nv[0]] = true;
                        citems['|' + nv[0]] = true;
                        args.push(item['|' + nv[0]]);
                        continue;
                    }
                    args.push(nv.length > 1 ? nv[1] : 'null'); 
                    
                }
                strbuilder(ipad + "this.el = new " + cls + "( "+ args.join(", ") + " );\n" );

            } else {
                strbuilder(ipad + "this.el = new " + cls + "();\n" );

            }
            //var meths = this.palete.getPropertiesFor(item['|xns'] + '.' + item.xtype, 'methods');
            //print(JSON.stringify(meths,null,4));Seed.quit();
            
             
            
            // initialize.. my vars..
            strbuilder("\n" + ipad + "// my vars\n");
            for (var k in item) {
                if (k[0] != '.') {
                    continue;
                }
                if (k == '.ctor') {
                    continue; 
                }
                
                var kk = k.substring(1);
                var v = item[k];
                var vv = kk.split(':');
                if (v.length < 1 || vv[0] == "signal") {
                    continue;
                }
                strbuilder(ipad + "this." + vv[1] + " = " +   v +";\n");
                
            }
           
           
            // what are the properties of this class???
            strbuilder("\n" + ipad + "// set gobject values\n");
            var props = this.palete.getPropertiesFor(item['|xns'] + '.' + item.xtype, 'props');
            
            
            
            props.forEach(function(p) {
               
                if (typeof(citems[p.name]) != 'undefined') {
                    return;
                }
                     
                if (typeof(item[p.name]) != 'undefined' && typeof(item[p.name]) != 'object' ) {
                    citems[p.name] = true;
                    
                    var val = JSON.stringify(item[p.name]);
                    if (['xalign','yalign'].indexOf(p.name) > -1) {
                        val +='f';
                    }
                    strbuilder(ipad + "this.el." + p.name + " = " + val + ";\n");
                    return;
                }
                if (typeof(item['|' + p.name]) != 'undefined' && typeof(item['|' + p.name]) != 'object' ) {
                    citems['|' + p.name] = true;
                    //if (p.ctor_only ) {
                    //    strbuilder(ipad + "Object(" + p.name + " : " +  item['|' + p.name] + ");\n");
                    //} else {
                        strbuilder(ipad + "this.el." + p.name + " = " +  item['|' + p.name] + ";\n");
                    //}
                    return;
                }
               // got a property..
               
               
            });
                //code
            // add all the child items.. 
            if (typeof(item.items) != 'undefined') {
                for(var i =0;i<item.items.length;i++) {
                    var ci = item.items[i];
                    if (ci.xvala_id[0] == '*') {
                        continue; // skip generation of children?
                    }
                    
                    var xargs = "";
                    if (typeof(ci['*args']) != 'undefined') {
                        
                        var ar = ci['*args'].split(',');
                        for (var ari = 0 ; ari < ar.length; ari++ ) {
                            xargs += "," + ar[ari].trim().split(" ").pop();
                        }
                    }
                    
                    strbuilder(ipad + "var child_" + i + " = new " + ci.xvala_xcls + "( _this " + xargs + ");\n" );
                    strbuilder(ipad + "child_" + i +".ref();\n" ); // we need to reference increase unnamed children...
                    
                    if (typeof(ci['*prop']) != 'undefined') {
                        strbuilder(ipad + "this.el." + ci['*prop'] + " = child_" + i + ".el;\n" );
                        continue
                    }
                    
                    if (ci.pack === false || ci.pack == "false") {
                        continue;
                    }
                    
                    var packing = ci.pack ? ci.pack.split(',') : [ 'add' ];
                    if (typeof(ci['|pack']) != 'undefined') {
                        packing =ci['|pack'].split(',');
                    }
                    var pack = packing.shift();
                    
                    
                    strbuilder(ipad + "this.el." + pack + " (  child_" + i + ".el " +
                               (packing.length ? ", " + packing.join(",") : "") + " );\n"
                            );
                              
                    if (ci.xvala_id[0] != '+') {
                        continue; // skip generation of children?
                        
                    }
                    strbuilder(ipad + "this." + ci.xvala_id.substring(1) + " =  child_" + i +  ";\n");
                          
                }
            }
            if (typeof(item['|init']) != 'undefined') {
                
                
                    var v = item['|init']
                    if (v.length > 1) {
                        strbuilder("\n" + ipad + "// init method \n");            
                         var vv = v;
                         //print(JSON.stringify(vv));Seed.quit();
                         vv = vv.replace(/^\n+/,'');
                         vv = vv.replace(/\n+$/,'');
                         vv = vv.replace(/\n/g,"\n" + ipad);
                         strbuilder(ipad + vv  + "\n");
                    }
            }
            
            citems['|pack'] = true;
            citems['|items'] = true;
            citems['|init'] = true;
            
            if (item.listeners) {
            //    print(JSON.stringify(item.listeners));Seed.quit();
            
                strbuilder("\n" + ipad + "// listeners \n");  
                // add all the signal handlers..
                for (var k in item.listeners) {
                    
                    
                    var v = item.listeners[k] ;
                    
                    var vv = v.replace(/\n/g,"\n" + ipad);
                        
                        
                    
                    strbuilder(ipad + "this.el." + k + ".connect( " + vv  + " );\n");
                    
                }
            }    
                
            
            
            
            // end ctor..
            strbuilder(pad + "}\n");
            
            
            strbuilder("\n" + pad + "// userdefined functions \n");  
            
            // user defined functions...
            
            for (var k in item) {
                if (typeof(citems[k]) != 'undefined') {
                    //strbuilder("\n" + pad + "// skip " + k + " - already used \n"); 
                    continue;
                }
                if (k[0] != '|') {
                     //strbuilder("\n" + pad + "// skip " + k + " - not pipe \n"); 
                    continue;
                }
                // function in the format of {type} (args) { .... }
                 
                var vv = item[k];
                //print(JSON.stringify(vv));Seed.quit();
                vv = vv.replace(/^\n+/,'');
                vv = vv.replace(/\n+$/,'');
                vv = vv.replace(/\n/g,"\n" + ipad);
                
                var vva = k.split(':');
                if (vva.length  < 2) {
                    strbuilder("\n" + pad + "// skip " + k + " - no return type\n"); 
                    continue;
                }
                var rtype = vva.shift().substring(1);
                var body = vv;
                var fname = vva.shift() || '???';
                
                strbuilder(pad + "public " + rtype + " " + fname + body + "\n");
                
                
                
            }
            
            
            
            if (depth > 0) {
                strbuilder(inpad + "}\n");
            }
            
            
            // next loop throug children..
            if (typeof(item.items) != 'undefined') {
                for(var i =0;i<item.items.length;i++) {
                    this.toValaItem(item.items[i], 1, strbuilder);
                }
            }
            if (depth < 1) {
                strbuilder(inpad + "}\n");
            }
            
        }
        
        
        
    });