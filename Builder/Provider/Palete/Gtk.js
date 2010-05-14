//<Script type="text/javascript">
 
Gio = imports.gi.Gio;
GIRepository  = imports.gi.GIRepository;
xml     = imports.libxml;
console = imports.console;
XObject = imports.XObject.XObject;

Base = imports.Builder.Provider.Palete.Base.Base;
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
        load: function () {
                
         
        
            var data = File.read(__script_path__ +'/../GtkUsage.txt');
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
            var gi = GIRepository.IRepository.get_default();
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
            
            var pth = GIRepository.IRepository.get_search_path ();
            
            
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
            print("Loading for " + ename);
            
            if (typeof(this.proplist[ename]) != 'undefined') {
                    return this.proplist[ename][type];
            }
            // use introspection to get lists..
            var gi = GIRepository.IRepository.get_default();
            var es = ename.split('.');
            var bi = gi.find_by_name(es[0], es[1]);
            
            if (!bi) {
                print("COULND NOT FIND BY NAME");
                return [];
            }
            var etype = GIRepository.base_info_get_type(bi);
            var meth = etype == GIRepository.IInfoType.INTERFACE ?
                [ 
                    'interface_info_get_n_properties',
                    'interface_info_get_property',
                    'interface_info_get_n_signals',
                    'interface_info_get_signal'
                ] : [ 
                    'object_info_get_n_properties',
                    'object_info_get_property',
                    'object_info_get_n_signals',
                    'object_info_get_signal'
                ]; 
            
            
            this.proplist[ename] = {}
            this.proplist[ename]['props'] = [];
            this.proplist[ename]['events'] = [];
            this.proplist[ename]['inherits']= [];
            var plist = this.proplist[ename]['props'] ;
            var elist = this.proplist[ename]['events'];
            var ilist = this.proplist[ename]['inherits'];
             /*
             we need...
             p.name
            p.type
            p.desc
            p.sig */
            
            // properties.. -- and parent ones...!!!
            for (var i =0;i <  GIRepository[meth[0]](bi); i++) {
                var prop = GIRepository[meth[1]](bi, i);  
                var n_original =  GIRepository.base_info_get_name(prop);
                
                var flags =  GIRepository.property_info_get_flags(prop); // check for readonly..
                
                
                var ty = this.typeToName(GIRepository.property_info_get_type(prop));
                print (n_original +":"+ ty);
                if (ty === false) {
                    continue;
                }
                var add = {
                     name :  n_original.replace(/\-/g, '_'),
                     type :  ty,
                     desc : this.doc(ename + '.' + n_original),
                     sig : ''
                }
                plist.push(add)
            }
           
            // signals..
            
            for (var i =0;i <  GIRepository[meth[2]](bi); i++) {
                var prop = GIRepository[meth[3]](bi, i);  
                var n_original =  GIRepository.base_info_get_name(prop);
                // print ('signal: ' + n_original); 
                var add = {
                    name :  n_original.replace(/\-/g, '_'),
                    type : 'function', //???
                    desc : this.doc(ename + '.signal.' + n_original),
                    sig  : this.genSkel(prop) // fixme..
                }
                elist.push(add);
            }
            
            if (etype == GIRepository.IInfoType.INTERFACE ) {
                  return;
            }
            
            // parent!!?!!?
            var pi = GIRepository.object_info_get_parent(bi);
            
            if (pi) {
                
                   
                var pname = GIRepository.base_info_get_namespace(pi) + '.' +
                    GIRepository.base_info_get_name(pi);
                this.getPropertiesFor(pname, 'props');
            
                elist.push.apply(elist,this.proplist[pname]['events']);
                plist.push.apply(plist,this.proplist[pname]['props']);
                ilist.push.apply(ilist,this.proplist[pname]['inherits']);
            }
            
            // implements needs to be more carefull as it could add dupes..
            // use the parent implements list to ensure no dupes..
            for(var i =0; i < GIRepository.object_info_get_n_interfaces(bi); i++) {
                 
                var prop = GIRepository.object_info_get_interface(bi,i);
                var iface = GIRepository.base_info_get_namespace(prop) +'.'+ 
                    GIRepository.base_info_get_name(prop);
                if ( ilist.indexOf(iface) > -1) {
                    continue;
                }
                this.getPropertiesFor(iface, 'props');
                ilist.push(iface);
                elist.push.apply(elist,this.proplist[iface]['events']);
                plist.push.apply(plist,this.proplist[iface]['props']);
            }
            
            return this.proplist[ename][type];
            
        },
        
        genSkel: function(sig)
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
                
                args.push(GIRepository.base_info_get_name(arg));
            }
            return 'function (' + args.join(', ') + ") {\n" + ret + "}"; 
                
            
            
        },
        typeToName  : function (type_info) // find type for properties or arguments.
        {
           var ty = GIRepository.type_tag_to_string( GIRepository.type_info_get_tag(type_info));
           
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
            var interface_info = GIRepository.type_info_get_interface (type_info);        
            var interface_type = GIRepository.base_info_get_type (interface_info);
            if (interface_type != GIRepository.IInfoType.ENUM) {
                return false;
            }
            return GIRepository.base_info_get_namespace(interface_info) + '.' +
                    GIRepository.base_info_get_name(interface_info);
            
        }
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
            return e.type;
        },
        
        findOptions : function(ename)
        {
            
            var es = ename.split('.');
            if (es.length !=2) {
                return Base.prototype.findOptions(ename);
            }
            var gi = GIRepository.IRepository.get_default();

            var bi = gi.find_by_name(es[0], es[1]);
            
        }
        
        
    }
);
 
