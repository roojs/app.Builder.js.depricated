//<Script type="text/javascript">
 
Gio = imports.gi.Gio;

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
                if (!d.length || d.match(/^\s+$/) || d.match(/^\//)) { //empty
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
       
        getPropertiesFor: function(ename, type)
        {
            if (typeof(this.proplist[ename]) != 'undefined' &&
                typeof(this.proplist[ename][type]) != 'undefined' ) {
                    return this.proplist[ename][type];
            }
            // use introspection to get lists..
            var gi = GI.IRepository.get_default();
            var es = ename.split('.');
            var bi = gi.find_by_name(es[0], es[1]);
            if (!bi) {
                return [];
            }
            this.proplist[ename] = {}
            this.proplist[ename]['props'] = []
             /*
             we need...
             p.name
            p.type
            p.desc
            p.sig */
           function typeToName (type_info) {
               var ty = GI.type_tag_to_string( GI.type_info_get_tag(type_info));
               
                if ((ty == 'void') && GI.type_info_is_pointer(type_info)) {
                    return false;
                }
                if (ty == 'array') {
                    return false; // unspported   
                }
                if (ty != 'interface') {
                    return ty;
                }
                return false;
            }
            // properties.. -- and parent ones...!!!
            for (var i =0;i <  GIRepository.object_info_get_n_properties(bi); i++) {
                var prop = GIRepository.object_info_get_property(bi, i);  
                var n_original =  base_info_get_name(prop);
                
                var flags =  GI.property_info_get_flags(prop); // check for readonly..
                var ty = typeToName(GIRepository.property_info_get_type(prop));
                
                if (ty === false) {
                    continue;
                }
                var add = {
                     name : base_info_get_name(prop),
                     type :   n_original.replace(/\-/g, '_'),
                     desc : this.doc(ename + '.' + n_original),
                     sig : ''
                }
                this.proplist[ename]['props'].push(add)
            }
            // parent!!?!!?
            
            
        }
        
        
        
    }
);
 
