//<Script type="text/javascript">
 
Gio = imports.gi.Gio;
GIRepository  = imports.gi.GIRepository;
GObject= imports.gi.GObject;
xml     = imports.libxml;
console = imports.console;
XObject = imports.XObject.XObject;

Base = imports.Palete.Base.Base;
File = imports.File.File;
//----------------------- our roo verison




Gtk = XObject.define(
    function(cfg) {
        
       
        // various loader methods..
          this.map = [];
        this.load();
        this.proplist = {};
        this.comments = { }; 
        // no parent...
        
       
    },
    Base,
    {
        name : 'Gtk',
        
        load: function () {
                
         
        
            var data = File.read(__script_path__ +'/GtkUsage.txt');
          // print(data);
            data  = data.split(/\n/g);
            var state = 0;
            var cfg = [];
            var left = [];
            var right = [];
            
            data.forEach( function(d) {
                if (!d.length || d.match(/^\s+$/) || d.match(/^\s*\//)) { //empty
                    return;
                }
                if (d.match(/^left:/)) { 
                    state = 1;
                    if (left.length ){
                        
                        cfg.push({
                            left : left,
                            right: right
                        });
                        }
                    left = [];
                    right = [];
                    return;
                }
                if (d.match(/^right:/)) { 
                    state = 2;
                    return;
                }
                if (state == 1) {
                    left.push(d.replace(/\s+/g, ''));
                    return;
                }
                right.push(d.replace(/\s+/g, ''));
                //Seed.quit();
               
            }); 
            if (left.length ){
                        
                cfg.push({
                    left : left,
                    right: right
                });
            }
            this.map = cfg;
             
        },
        
        
        commentLoad : function(ns)
        {
             
            if (typeof(this.comments[ns]) != 'undefined') {
                return;
            }

            console.log("LOAD DOCS: " + ns);
            var gi = GIRepository.Repository.get_default();
            var ver = gi.get_version(ns);
            if (!ver) {
                this.comments[ns] = {};
                return;
            }
            var ret = { };

            // no idea why this is broken on my build system.
            function getAttribute(n, name){
                var properties = n.properties;
                while (properties){
                    if (properties.name == name)
                         return properties.children.content;
                     properties = properties.next
                }
                return null;
            }
                 
         
            function walk(element, path) {
                 
                 
                if (!element) {
                    return;
                }
                
                var n =  getAttribute(element, 'name') ;
                //console.log("WALK" + n);
                if (element.name == 'signal') {
                    path += '.signal';
                } 
                if (n) {
                    path += path.length ? '.' : '';
                    path += n;
                }
                if (element.name == 'return-value') {
                    path += '.return-value';
                }
                
                
             
                var d =   getAttribute(element,'doc');
                if (d) {
                 //   Seed.print(path + ':' + d);
                    ret[path] = d;
                }
                
                var child = element.children;

                while (child){
                    //console.log(child.tag);
                    if (child.type == "element"){
                        walk (child, path);
                    }
                    child = child.next;
                }
            }
            
            var pth = GIRepository.Repository.get_search_path ();
            
            
            var gir_path = pth[0].replace(/lib\/girepository-1.0/, 'share\/gir-1.0');
           
            
            //console.log(fn);
            var  fn = gir_path + '/'+ ns + '-' + ver + '.gir';
           // console.log(fn);
            
            if (!File.exists(fn)) {
                console.log('missing docc file ' + fn);
                this.comments[ns] = {};
                
                return;
            }
            var doc = xml.parseFile(fn);
            //console.log("xmldoc?" + doc);
            walk (doc.root, '');
            //console.dump(ret);
            this.comments[ns] = ret;
            //console.dump(ret);

        },
       
        
        doc : function(what) {
            var ns = what.split('.').shift();
            this.commentLoad(ns);
            return typeof(this.comments[ns][what]) == 'undefined' ?  '' : this.comments[ns][what];
        },
  
        getPropertiesFor: function(ename, type)
        {
            //print("Loading for " + ename);
            
            if (typeof(this.proplist[ename]) != 'undefined') {
                //print("using cache");
                return this.proplist[ename][type];
            }
            // use introspection to get lists..
            var gi = GIRepository.Repository.get_default();
            var es = ename.split('.');
            
            var giname = es[0];
            giname = giname == 'Glade' ? 'Gladeui' : giname;
            
            imports.gi[es[0]];
            var bi = gi.find_by_name(es[0], es[1]);
            
            if (!bi) {
                print("COULND NOT FIND BY NAME");
                return [];
            }
            var etype = bi.get_type();;
            var meth = etype == GIRepository.InfoType.INTERFACE ?
                [ 
                    'interface_info_get_n_properties',
                    'interface_info_get_property',
                    'interface_info_get_n_signals',
                    'interface_info_get_signal',
                    'interface_info_get_n_methods',
                    'interface_info_get_method'
                ] : [ 
                    'object_info_get_n_properties',
                    'object_info_get_property',
                    'object_info_get_n_signals',
                    'object_info_get_signal',
                    'object_info_get_n_methods',
                    'object_info_get_method'
                ]; 
            
            
            this.proplist[ename] = {}
            this.proplist[ename]['props'] = [];
            this.proplist[ename]['events'] = [];
            this.proplist[ename]['methods'] = [];
            this.proplist[ename]['inherits']= [];
            
            var plist = this.proplist[ename]['props'] ;
            var elist = this.proplist[ename]['events'];
            var mlist = this.proplist[ename]['methods'];
            var ilist = this.proplist[ename]['inherits'];
             /*
             we need...
             p.name
            p.type
            p.desc
            p.sig */
            
            // properties.. -- and parent ones...!!!
            for (var i =0;i <  GIRepository[meth[0]](bi); i++) {
                var prop = GIRepository[meth[1]](bi,i);  
                var n_original =  prop.get_name();
                
                var flags =  GIRepository.property_info_get_flags(prop); // check for readonly..
                
                
                var ty = this.typeToName(GIRepository.property_info_get_type(prop));
                var flags = GIRepository.property_info_get_flags(prop);
                print (n_original +":"+ ty);
                if (ty === false) {
                    continue;
                }
                var add = {
                     name :  n_original.replace(/\-/g, '_'),
                     type :  ty,
                     desc : this.doc(ename + '.' + n_original),
                     sig : '',
                     ctor_only : (flags  & GObject.ParamFlags.CONSTRUCT_ONLY) > 0
                }
                plist.push(add)
            }
           
           
           
           
           
            // signals..
            
            for (var i =0;i <  GIRepository[meth[2]](bi); i++) {
                var prop =GIRepository[meth[3]](bi,i);  
                var n_original =  prop.get_name();
                // print ('signal: ' + n_original); 
                var add = {
                    name :  n_original.replace(/\-/g, '_'),
                    type : 'function', //???
                    desc : this.doc(ename + '.signal.' + n_original),
                    sig  : this.genSkel(prop) // fixme..
                }
                elist.push(add);
            }
            // methods
            
            for (var i =0;i <  GIRepository[meth[4]](bi); i++) {
                var prop = GIRepository[meth[5]](bi,i);  
                var n_original =  prop.get_name();
                print(ename +": ADD method: " + n_original );
                //var flags = GIRepository.property_info_get_flags(prop);
                
                if (n_original.match(/^new/)) {
                    var add = {
                        name :  n_original.replace(/\-/g, '_'),
                        type : 'ctor', //???
                        desc : '',
                        //desc : this.doc(ename + "."+ n_original)
                    };
                    this.genParams(prop,add);
                    mlist.push(add);
                    continue;
                }
                continue;
                // not sure why we need all the other ones...
                //if (!(flags & GIRepository.FunctionInfoFlags.IS_METHOD)) {
                //    continue;
                //}
                // print ('signal: ' + n_original); 
                var add = {
                    name :  n_original.replace(/\-/g, '_'),
                    type : 'function', //???
                    desc : '', //this.doc(ename + '.' + n_original)
                };
                this.genParams(prop,add);
                mlist.push(add);
            }
            
            
            
            
            
            
            if (etype == GIRepository.InfoType.INTERFACE ) {
               // print("SKIPPING PARENT - it's an interface?!?!");
                  return;
            }
            
            // parent!!?!!?
            var pi = GIRepository.object_info_get_parent(bi);
            
            if (pi) {
                
                   
                var pname = pi.get_namespace() + '.' + pi.get_name();
                this.getPropertiesFor(pname, 'props');
                
                
                elist.push.apply(elist,this.proplist[pname]['events']);
                plist.push.apply(plist,this.proplist[pname]['props']);
                ilist.push(pname);
                ilist.push.apply(ilist,this.proplist[pname]['inherits']);
                
                this.overrides(mlist, this.proplist[pname]['methods']);
                
                
            } else {
                print("NO PARENT FOUND?");
            }
            
            // implements needs to be more carefull as it could add dupes..
            // use the parent implements list to ensure no dupes..
            for(var i =0; i < GIRepository.object_info_get_n_interfaces(bi); i++) {
                 
                var prop = GIRepository.object_info_get_interface(bi,i);
                var iface = prop.get_namespace() +'.'+ prop.get_name();
                if ( ilist.indexOf(iface) > -1) {
                    continue;
                }
                this.getPropertiesFor(iface, 'props'); // just load one of them..
                ilist.push(iface);
                
                elist.push.apply(elist,this.proplist[iface]['events']);
                plist.push.apply(plist,this.proplist[iface]['props']);
                this.overrides(mlist, this.proplist[pname]['methods']);
            }
            function sfunc(a,b) {
                if (a.name == b.name) return 0;
                return a.name > b.name ? 1 : -1
            }
            plist.sort(sfunc);
            elist.sort(sfunc);
            mlist.sort(sfunc);
            
            return this.proplist[ename][type];
            
        },
        genParams: function(sig, meth)
        {
            var args = ['self'];
            var ret = "\n";
            meth.ret_type = this.typeToName(GIRepository.callable_info_get_return_type(sig));
            // might be a numbeR??
            meth.params = [];
            for(var a_i  =0; a_i   < GIRepository.callable_info_get_n_args(sig); a_i++) {
                var arg = GIRepository.callable_info_get_arg(sig, a_i);
                print(arg.get_name());
                print(arg.get_type());
                meth.params.push({
                    name  : arg.get_name(),
                    type : this.typeToName(arg.get_type(), true)
                });
            }
            
                
            
            
        },
        genSkel: function(sig) // should really use genParams...
        {
            var args = ['self'];
            var ret = "\n";
            var ret_type = this.typeToName(GIRepository.callable_info_get_return_type(sig));
            // might be a numbeR??
            if (ret_type == 'boolean') {
                ret = "    return false;\n";
            }
            for(var a_i  =0; a_i   < GIRepository.callable_info_get_n_args(sig); a_i++) {
                var arg = GIRepository.callable_info_get_arg(sig, a_i);
                
                args.push(arg.get_name());
            }
            return 'function (' + args.join(', ') + ") {\n" + ret + "}"; 
                
            
            
        },
        typeToName  : function (type_info, allow_iface) // find type for properties or arguments.
        {
            print(type_info);
            if (type_info == 17) {
                return 'integer';
            }
             
            var x = GIRepository.type_info_get_tag(type_info);
            print(x);
            var ty = GIRepository.type_tag_to_string( GIRepository.type_info_get_tag(type_info));
            print(ty);
           
            if ((ty == 'void') && GIRepository.type_info_is_pointer(type_info)) {
                return false;
            }
            if (ty == 'array') {
                return false; // unspported   
            }
            if (ty != 'interface') {
                return ty;
            }
            // we can accept enum types here..
            var interface_info = GIRepository.type_info_get_interface(type_info);
            var interface_type = interface_info.get_type();
            
            if (!allow_iface && interface_type != GIRepository.InfoType.ENUM) {
                return false;
            }
            return interface_info.get_namespace() + '.' + interface_info.get_name();
            
        },
        /**
         * merge two proprety arrays' ignoring what's overrriden.
         * 
         */
        
        
        overrides : function (top, bottom)
        {
            function inTop(b)
            {
                return !top.every(function(t) {
                    if (t.name == b.name) {
                        return false;
                    }
                    return true;
                });
            }
            bottom.forEach(function(e) {
                if (!inTop(e)) {
                    top.push(e);
                }
            });
            
        },
        
        /**
         * guess type..
         * 
         */
        findType : function (data, prop, value)
        {
            // specials??
            if ((prop == '|xns') || (prop == 'xtype'))  {
                return 'string';
            }
            
            var qname = this.guessName(data);
            if (prop[0] == '|') {
                prop= prop.substring(1);
            }
            
            var prs = this.getPropertiesFor(qname, 'props');
            var ret = false;
            prs.forEach(function(e) {
                if (ret !== false) {
                    return; // got it.
                }
                if (e.name == prop) {
                    ret = e;
                }
                
            });
            if (!ret) {
                return Base.prototype.findType(data, prop,value);
            }
             
            // got the type
            return ret.type;
        },
        
        findOptions : function(ename)
        {
            
            var es = ename.split('.');
            if (es.length !=2) {
                return Base.prototype.findOptions(ename);
            }
            var gi = GIRepository.Repository.get_default();
            var bi = gi.find_by_name(es[0], es[1]);
            var etype 
            try {
                etype = GIRepository.object_info_get_type(bi);    
            } catch(e) {
                return false;
            }
            
            if (etype != GIRepository.InfoType.ENUM) {
                console.log("Options not handled yet!!!");
                return false;
            }
            var ret = [];
            // got an enum.. let's return the values..
            for(var i =0; i < bi.get_n_values(); i++) {
                 
                  var prop = bi.get_value(i);
                   
                
                  ret.push( ename + '.' + prop.get_name().toUpperCase() ) 
            }
            return ret;
        },
        /**
         * determine the packing types..
         */
        getDefaultPack: function(pname, cname) {
            var list = this.getPackingList(pname,cname);
           // console.dump(list);
            
            
            if (!list.every(function(e) { return e.name != 'add'; })) {
                return 'add'; // add is in our list..?? what about args..?!?
            }
            function toRet(e) {
                var ret = [e.name];
                e.params.forEach(function(p,i) {
                    if (ret === false) { return; } // skip broken..
                    if (i==0) { return; } // skip first..
                    if (p.type == 'boolean') {
                        ret.push('false');
                        return;
                    }
                    if (p.type == 'number') {
                        ret.push('0');
                        return;
                    }
                    if (p.type == 'uint') {
                        ret.push('0');
                        return;
                    }
                    ret = false; // invalid!
                });
                return ret === false ? false : ret.join(',');
            };
            var packret = false;
            list.every(function(e) {
                
                packret = toRet(e);
                //print("DEFAULT PACK TEST : " + e.name + " : " +packret);
                if (packret !== false) {
                    return false;
                }
                return true; // continue
            });
            //print("DEFAULT PACK: " + packret);
            // should we do best match..?
            return packret;
        },
        /**
         * get packing list..
         */
        getPackingList :function (pname, cname)
        {
            var funcs = this.getPropertiesFor(pname,'methods');
            //print("getPackingList : ALL FUNCS");
            //console.dump(funcs);
            var ret = [];
            var _this = this;
            // let's assume top down...
            var inherits = [ cname ];
            inherits.push.apply(inherits, this.getPropertiesFor(cname,'inherits'));
            funcs.forEach(function(m) {
                if (m.params.length && (typeof(m.params[0].type) == 'string') &&
                    inherits.indexOf(m.params[0].type) > -1) {
                    ret.push(m);
                }
            });
            return ret; 
        }
        
        
    }
);
 
