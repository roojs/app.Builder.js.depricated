//<script type="text/javascript">
GIRepository = imports.gi.GIRepository;
GObject = imports.gi.GObject;
/**
 * XObject
 * Yet another attempt to create a usable object construction library for seed..
 * 
 * Why is this useful?
 * A) It turns rather messy code into a tree structure, making it easy to find code relating to 
 *    an interface element
 * B) In theory it should be gjs/Seed compatible..
 * C) It provides getElementById style lookups for elements.
 * D) It provides classic OO constructors for Javascript (extend/define)
 * E) It does not modify any buildin prototypes.. 
 *
 * Extend this.. to use it's wonderful features..
 * 
 * normal usage:
 * XObject = imports.XObject.XObject;
 * 
 * Xyz = new XObject({
 *     xtype: Gtk.Window,
 *     id : 'window',
 *     items : [
 *     
 *     ]
 *  });
 *  Xyz.init(); // create and show.
 * 
 * 
 * use XObject.debug = 1 to turn on debugging
 * 
 * If XObjectBase/[xns]/[xtype].js exists, it will use this to override properties..
 * 
 * 
 * He's some questions.
 * - should we have a special property to use as the constructor / gobject.properties rather
 *   than sending all basic types to this?
 * 
 * @cfg xtype {String|Function} constructor or string.
 * @cfg id {String}  (optional) id for registry
 * @cfg xns {String|Object}   (optional) namespace eg. Gtk or 'Gtk' - used with xtype.
 * @cfg items {Array}   (optional) list of child elements which will be constructed.. using XObject
 * @cfg listeners {Object}   (optional) map Gobject signals to functions
 * @cfg pack {Function|String|Array}   (optional) how this object gets added to it's parent
 * @cfg el {Object}   (optional) premade GObject
 * 
 * 
 * 
 * 
 * 
 * 
 */

function XObject (cfg) {
    // first apply cfg if set.
      //print("new XOBJECT!!!");
      
    //print ("XObject ctr");
      
    this.config = {}; // used to initialize GObject
    
    this.cfg = XObject.extend({}, cfg); // used to store original configuration.. for referencing..
    
    // we could use this to determine if 
    // we are actually inside a inherited class...
    // as define() should actually set this up..
    
    if (!this.constructor) {
        
        this.constructor = XObject;
        var base = XObject.baseXObject(cfg);
        if (base) {
            XObject.extend(this,base.prototype);
        }
        
    }
    
    // copy down all elements into self..
    // make an extra copy in this.config?? - which is the one used in the constructor later
    
    for (var i in cfg) {
        this[i] = cfg[i];
        if (typeof(cfg[i]) == 'function') { // do we skip objects.
            continue;
        }
        // these properties are not copied to cfg.
        if (    i == 'pack' ||
                i == 'items' ||
                i == 'id' ||
                i == 'xtype' ||
                i == 'xdebug' ||
                i == 'xns') {
            continue;
        }
        
        
        this.config[i] = cfg[i];
    }
    
    
    this.items = this.items || [];
    
    
    // pack can be false!
    if (typeof(this.pack) == 'undefined') {
        
        this.pack = [ 'add' ]
        /*
        var Gtk  = imports.gi.Gtk;
        switch (true) {
            // any others!!
            case (this.xtype == Gtk.MenuItem):  this.pack = [ 'append' ]; break;
            
        }
        */
        
    }
    
    // interesting question should we call constructor on items here...
    // as the real work is done in init anyway..
    var _this= this;
    
    var items = [];
    this.items.forEach(function(i) {
        items.push(i);
    });
    this.items = [];
    // create XObject for all the children.
    items.forEach(function(i,n) {
        var base = XObject.baseXObject(i);
        base = base || XObject;
        var item = (i.constructor == XObject) ? i : new base(i);
        item.parent = _this;
        _this.items.push(item);
        //_this.addItem(i);
    });
     
    
}



XObject.prototype = {
    /**
     * @property el {GObject} the Gtk / etc. element.
     */
    el : false, 
    /*
     * @property items {Array} list of sub elements
     */
    /**
     * @property parent {XObject} parent Element
     */
     
     /**
     * @property config {Object} the construction configuration.
     */
     /**
      * @method init
      * Initializes the Element (el) hooks up all the listeners
      * and packs the children.
      * you can override this, in child objects, then 
      * do this to do thi initaliztion.
      * 
      * XObject.prototype.init.call(this); 
      * 
      */ 
    init : function()
    {
         
       // var items = [];
        //this.items.forEach(function(i) {
        //    items.push(i);
        //});
        // remove items.
        this.listeners = this.listeners || {}; 
        //this.items = [];
         
        // do we need to call 'beforeInit here?'
         
        // handle include?
        //if ((this.xtype == 'Include')) {
        //    o = this.pre_registry[cls];
        //}
        var isSeed = typeof(Seed) != 'undefined';
         
        // xtype= Gtk.Menu ?? what about c_new stuff?
        XObject.log("init: ID:"+ this.id +" typeof(xtype): "  + typeof(this.xtype));
        if (!this.el && typeof(this.xtype) == 'function') {
            XObject.log("func?"  + XObject.keys(this.config).join(','));
            this.el = this.xtype(this.config);
           
        }
        if (!this.el && typeof(this.xtype) == 'object') {
            XObject.log("obj?"  + XObject.keys(this.config).join(','));
            this.el = new (this.xtype)(this.config);
      
        }
        //print(this.el);
        if (!this.el && this.xns) {
            
            var NS = imports.gi[this.xns];
            if (!NS) {
                XObject.error('Invalid xns: ' + this.xns, true);
            }
            constructor = NS[this.xtype];
            if (!constructor) {
                XObject.error('Invalid xtype: ' + this.xns + '.' + this.xtype);
            }
            this.el  =   isSeed ? new constructor(this.config) : new constructor();
            
        }
        XObject.log("init: ID:"+ this.id +" typeof(el):" + this.el);
        
        // always overlay props..
        // check for 'write' on object..
        /*
        if (typeof(XObject.writeablePropsCache[this.xtype.type]) == 'undefined') {
                
            var gi = GIRepository.IRepository.get_default();
            var ty = gi.find_by_gtype(this.xtype.type);
            var write = [];
            for (var i =0; i < GIRepository.object_info_get_n_properties(ty);i++) {
                var p =   GIRepository.object_info_get_property(ty,i);
                if (GIRepository.property_info_get_flags(p) & 2) {
                    write.push(GIRepository.base_info_get_name(p));
                }
            }
            XObject.writeablePropsCache[this.xtype.type] = write;
            print(write.join(", "));
        }
        
        */
        
         
        for (var i in this.config) {
            if (i == 'type') { // problem with Gtk.Window... - not decided on a better way to handle this.
                continue;
            }
            if (i == 'buttons') { // problem with Gtk.MessageDialog..
                continue;
            }
            if (i[0] == '.') { // parent? - 
                continue;
            }
            this.el[i] = this.config[i];
        }
        
        // register it!
        //if (o.xnsid  && o.id) {
         //   XObject.registry = XObject.registry || { };
         //   XObject.registry[o.xnsid] = XObject.registry[o.xnsid] || {}; 
         //   XObject.registry[o.xnsid][o.id] = this;
        //}
        
        var type = this.xtype.type ? GObject.type_name(this.xtype.type) : '';
        XObject.log("add children to " + type);
        
        var _this=this;
        this.items.forEach(function(i,n) {
            _this.addItem(i,n);
        })
            
        
        for (var i in this.listeners) {
            this.addListener(i, this.listeners[i]);
        }
        
        this.init = XObject.emptyFn;
           
        // delete this.listeners ?
        // do again so child props work!
       
        // do we need to call 'init here?'
    },
      
     
     /**
      * @method addItem
      * Adds an item to the object using a new XObject
      * uses pack property to determine how to add it.
      * @arg cfg {Object} same as XObject constructor.
      */
    addItem : function(item, pos) 
    {
        
        if (typeof(item) == 'undefined') {
            XObject.error("Invalid Item added to this!");
            imports.console.dump(this.cfg);
            Seed.quit();
        }
        // what about extended items!?!?!?
       
        item.init();
        //print("CTR:PROTO:" + ( item.id ? item.id : '??'));
       // print("addItem - call init [" + item.pack.join(',') + ']');
        if (!item.el) {
            XObject.error("NO EL!");
            imports.console.dump(item);
            Seed.quit();
        }
        print(XObject.type(this.xtype) + ":pack=" + item.pack);
        
        if (item.pack===false) {  // no packing.. various items have this ..
            return;
        }
        
        if (typeof(item.pack) == 'function') { // pack is a function..
            // parent, child
            item.pack.apply(item, [ this , item  ]);
            item.parent = this;
            return;
        }
        
        // pack =  'add,x,y'
        var args = [];
        var pack_m  = false;
        if (typeof(item.pack) == 'string') {
             
            item.pack.split(',').forEach(function(e, i) {
                
                if (e == 'false') { args.push( false); return; }
                if (e == 'true') {  args.push( true);  return; }
                if (!isNaN(parseInt(e))) { args.push( parseInt(e)); return; }
                args.push(e);
            });
            //print(args.join(","));
            
            pack_m = args.shift();
        } else {
            pack_m = item.pack.shift();
            args = item.pack;
        }
        
        // handle error.
        if (pack_m && typeof(this.el[pack_m]) == 'undefined') {
            
            throw {
                name: "ArgumentError", 
                message : 'pack method not available : ' + this.id + " : " + this.xtype + '.' +  pack_m + " ADDING " + item.el
                    
            }
           
            return;
        }
        
        
        // finally call the pack method 
        //Seed.print('Pack ' + this.el + '.'+ pack_m + '(' + item.el + ')');
        
        args.unshift(item.el);
        
         
        
        
        
        XObject.log(pack_m + '[' + args.join(',') +']');
        //Seed.print('args: ' + args.length);
        if (pack_m) {
            this.el[pack_m].apply(this.el, args);
        }
        
       
        
    },
    /**
      * @method addListener
      * Connects a method to a signal. (gjs/Seed aware)
      * 
      * @arg sig  {String} name of signal
      * @arg fn  {Function} handler.
      */
    addListener  : function(sig, fn) 
    {
 
        XObject.log("Add signal " + sig);
        fn.id= sig;
        var _li = XObject.createDelegate(fn,this);
        // private listeners that are not copied to GTk.
        
        if (typeof(Seed) != 'undefined') {
          //   Seed.print(typeof(_li));
            this.el.signal[sig].connect(_li);
        } else {
            this.el.connect( sig, _li);
        }
             
        
    },
     /**
      * @method get
      * Finds an object in the child elements using xid of object.
      * prefix with '.' to look up the tree.. 
      * prefix with multiple '..' to look further up..
      * prefix with '/' to look from the top, eg. '^LeftTree.model'
      * 
      * @arg name  {String} name of signal
      * @return   {XObject|false} the object if found.
      */
    get : function(xid)
    {
        XObject.log("SEARCH FOR " + xid + " in " + this.id);
        var ret=  false;
        var oid = '' + xid;
        if (!xid.length) {
            throw {
                name: "ArgumentError", 
                message : "ID not found : empty id"
            }
        }
        
        if (xid[0] == '.') {
            return this.parent.get(xid.substring(1));
        }
        if (xid[0] == '/') {
            
            if (typeof(XObject.cache[xid]) != 'undefined') {
                return XObject.cache[xid]; 
            }
            if (xid.indexOf('.') > -1) {
                
                var child = xid.split('.');
                var nxid = child.shift();
                    
                child = child.join('.');
                if (typeof(XObject.cache[nxid]) != 'undefined') {
                    return XObject.cache[nxid].get(child);
                }
                
                
            }
            var e = this;
            while (e.parent) {
                e = e.parent;
            }
            
            try {
                ret = e.get(xid.substring(1));
            } catch (ex) { }
            
            if (!ret) {
                throw {
                    name: "ArgumentError", 
                    message : "ID not found : " + oid
                }
            }
            XObject.cache[xid] = ret;
            return XObject.cache[xid];
        }
        var child = false;
        
        if (xid.indexOf('.') > -1) {
            child = xid.split('.');
            xid = child.shift();
            
            child = child.join('.');
            
        }
        if (xid == this.id) {
            try {
                return child === false ? this : this.get(child);
            } catch (ex) {
                throw {
                    name: "ArgumentError", 
                    message : "ID not found : " + oid
                }
            }
            
        }
        
        
        this.items.forEach(function(ch) {
            if (ret) {
                return;
            }
            if (ch.id == xid) {
                ret = ch;
            }
        })
        if (ret) {
            try {
                return child === false ? ret : ret.get(child);
            } catch (ex) {
                throw {
                    name: "ArgumentError", 
                    message : "ID not found : " + oid
                }
            }
            
        }
        // iterate children.
        var _this = this;
        this.items.forEach(function(ch) {
            if (ret) {
                return;
            }
            if (!ch.get) {
                XObject.error("invalid item...");
                imports.console.dump(_this);
                Seed.quit();
            }
            try {
                ret = ch.get(xid);
            } catch (ex) { }
            
            
        });
        if (!ret) {
            throw {
                name: "ArgumentError", 
                message : "ID not found : " + oid
            }
        }
        try {
            return child === false ? ret : ret.get(child);
        } catch (ex) {
            throw {
                name: "ArgumentError", 
                message : "ID not found : " + oid
            }
        }
    }
      
      
} 
         
     
/**
 * Copies all the properties of config to obj.
 *
 * Pretty much the same as JQuery/Prototype.. or Roo.apply
 * @param {Object} obj The receiver of the properties
 * @param {Object} config The source of the properties
 * @param {Object} defaults A different object that will also be applied for default values
 * @return {Object} returns obj
 * @member XObject extend
 */


XObject.extend = function(o, c, defaults){
    if(defaults){
        // no "this" reference for friendly out of scope calls
        XObject.extend(o, defaults);
    }
    if(o && c && typeof c == 'object'){
        for(var p in c){
            o[p] = c[p];
        }
    }
    return o;
};

XObject.extend(XObject,
{
     
    /**
     * @property {Boolean} debug XObject  debugging.  - set to true to debug.
     * 
     */
    debug : true,
    /**
     * @property {Object} cache - cache of object ids
     * 
     */
    cache: { },
    /**
     * Empty function
     * 
     */
    emptyFn : function () { },
      
      
      
    /**
     * Debug Logging
     * @param {String|Object} output String to print.
     */
    log : function(output)
    {
        if (!this.debug) {
            return;
        }
        print("LOG:" + output);  
    },
     
    /**
     * Error Logging
     * @param {String|Object} output String to print.
     */
    error : function(output)
    {
        print("ERROR: " + output);  
    },
    /**
     * fatal error
     * @param {String|Object} output String to print.
     */
    fatal : function(output)
    {
        
        throw {
                name: "ArgumentError", 
                message : output
                    
            }
    },
   
    /**
     * Copies all the properties of config to obj, if the do not exist.
     * @param {Object} obj The receiver of the properties
     * @param {Object} config The source of the properties
     * @return {Object} returns obj
     * @member Object extendIf
     */


    extendIf : function(o, c)
    {

        if(!o || !c || typeof c != 'object'){
            return o;
        }
        for(var p in c){
            if (typeof(o[p]) != 'undefined') {
                continue;
            }
            o[p] = c[p];
        }
        return o;
    },

 

    /**
     * Extends one class with another class and optionally overrides members with the passed literal. This class
     * also adds the function "override()" to the class that can be used to override
     * members on an instance.
     *
     * usage:
     * MyObject = Object.define(
     *     function(...) {
     *          ....
     *     },
     *     parentClass, // or Object
     *     {
     *        ... methods and properties.
     *     }
     * });
     * @param {Function} constructor The class inheriting the functionality
     * @param {Object} superclass The class being extended
     * @param {Object} overrides (optional) A literal with members
     * @return {Function} constructor (eg. class
     * @method define
     */
    define : function()
    {
        // inline overrides
        var io = function(o){
            for(var m in o){
                this[m] = o[m];
            }
        };
        return function(constructor, parentClass, overrides) {
            if (typeof(parentClass) == 'undefined') {
                XObject.error("XObject.define: Missing parentClass: when applying: " );
                XObject.error(new String(constructor));
                Seed.quit(); 
            }
            if (typeof(parentClass.prototype) == 'undefined') {
                XObject.error("Missing protype: when applying: " );
                XObject.error(new String(constructor));
                XObject.error(new String(parentClass));
                Seed.quit(); 
            }
            var F = function(){};
            var sbp;
            var spp = parentClass.prototype;
            
            F.prototype = spp;
            sbp = constructor.prototype = new F();
            sbp.constructor=constructor;
            constructor.superclass=spp;

            // extends Object.
            if(spp.constructor == Object.prototype.constructor){
                spp.constructor=parentClass;
            }
            
            constructor.override = function(o){
                Object.extend(constructor.prototype, o);
            };
            sbp.override = io;
            XObject.extend(constructor.prototype, overrides);
            return constructor;
        };
    }(),

         
    /**
     * returns a list of keys of the object.
     * @param {Object} obj object to inspect
     * @return {Array} returns list of kyes
     * @member XObject keys
     */
    keys : function(o)
    {
        var ret = [];
        for(var i in o) {
            ret.push(i);
        }
        return ret;
    },
    /**
     * return the Gobject name of a constructor - does not appear to work on structs..
     * @param {Object} gobject ctr
     * @return {String} returns name
     * @member XObject type
     */
    type : function(o)
    {
        if (typeof(o) == 'object') {
            return GObject.type_name(o.type);
           // print("GNAME:" +gname + " GTYPE:"+cfg.xtype.type);
        }
        return 'unknown';
    },
    /**
     * return the XObjectBase class for a cfg (which includes an xtype)
     * @param {Object} configuration.
     * @return {function} constructor
     * @member XObject baseXObject
     */
    baseXObject : function(cfg)
    {
          try {
            // loocks for XObject/Gtk/TreeView.js [   TreeView = { .... } ]
            // xns is not a string!!!?
            var gname = false;
            if (typeof(cfg.xtype) == 'object') {
                gname = XObject.type(cfg.xtype);
            
            }
            print("TRYING BASE OBJECT : " + gname);
            // in the situation where we have been called and there is a base object
            // defining the behavior..
            // then we should copy the prototypes from the base object into this..
            var base = gname  ? imports.XObjectBase[gname][gname] : false;
            return base;
            
        } catch (e) {
            // if debug?
            XObject.log("error finding " + gname + " - " + e.toString());
            return false;
        }
        
        
    },
    
    /**
     * @member XObject createDelegate
     * creates a delage metdhod
     * @param {Function} method to wrap
     * @param {Object} scope 
     * @param {Array} args to add
     * @param {Boolean|Number} append arguments or replace after N arguments.
     * @return {Function} returns the delegate
     */

    createDelegate : function(method, obj, args, appendArgs){
        
        return function() {
            XObject.log("CALL: " + obj.id + ':'+ method.id);
            
            var callArgs = args || arguments;
            if(appendArgs === true){
                callArgs = Array.prototype.slice.call(arguments, 0);
                callArgs = callArgs.concat(args);
            }else if(typeof appendArgs == "number"){
                callArgs = Array.prototype.slice.call(arguments, 0); // copy arguments first
                    var applyArgs = [appendArgs, 0].concat(args); // create method call params
                    Array.prototype.splice.apply(callArgs, applyArgs); // splice them in
                }
                return method.apply(obj || window, callArgs);
            };
    }
    
});