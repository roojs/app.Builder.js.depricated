//<script type="text/javascript">

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
 * 
 * @arg xtype {String|Function} constructor or string.
 * @arg id {String}  (optional) id for registry
 * @arg xns {String|Object}   (optional) namespace eg. Gtk or 'Gtk' - used with xtype.
 * @arg items {Array}   (optional) list of child elements which will be constructed.. using XObject
 * @arg listeners {Object}   (optional) map Gobject signals to functions
 * @arg pack {Function|String|Array}   (optional) how this object gets added to it's parent
 * @arg el {Object}   (optional) premade GObject
 * 
 *  --- needs a xdebug option!
 * 
 * 
 * He's some questions.
 * - should we generate ID's for all elements? (if so we probably need to garbage collect)
 * - should we have a special property to use as the constructor / gobject.properties rather
 *   than sending all basic types to this?
 * 
 * 
 */

function XObject (cfg) {
    // first apply cfg if set.
    this.config = cfg;
    if (cfg.init) {
        this.init = cfg.init; // override!
    }
    
    
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
        var cfg = this.config;
    
        print("new xobj?"  + XObject.keys(cfg).join(','));
        //print(cfg);
        o =  {};
        
        cfg.items = cfg.items || [];
        
        XObject.extend(o, cfg); // copy everything into o.
        
        o.pack = typeof(o.pack) == 'undefined' ? 'add' : o.pack;
        
        XObject.extend(this, o);

        // remove items.
        
        this.listeners = this.listeners || {}; 
        this.items = [];
        
        // remove objects/functions from o, so they can be sent to the contructor.
        for (var i in o) {
            if ((typeof(o[i]) == 'object') || 
                (typeof(o[i]) == 'function') || 
                i == 'pack' ||
                i == 'id' ||
                i == 'xtype' ||
                i == 'xdebug' ||
                i == 'xns'
            ) {
                delete o[i];
            }
        }
        
        // do we need to call 'beforeInit here?'
         
        // handle include?
        //if ((this.xtype == 'Include')) {
        //    o = this.pre_registry[cls];
        //}
        var isSeed = typeof(Seed) != 'undefined';
         
        // xtype= Gtk.Menu ?? what about c_new stuff?
        print(this.xtype);
        if (typeof(this.xtype) == 'function') {
            print("func?"  + XObject.keys(o).join(','));
            this.el = this.el ||   this.xtype(o);
        }
        if (typeof(this.xtype) == 'object') {
            print("obj?"  + XObject.keys(o).join(','));
            this.el = this.el ||  new this.xtype(o);
        }
        //print(this.el);
        if (!this.el && o.xns) {
            
            var NS = imports.gi[o.xns];
            if (!NS) {
                Seed.print('Invalid xns: ' + o.xns);
            }
            constructor = NS[o.xtype];
            if (!constructor) {
                Seed.print('Invalid xtype: ' + o.xns + '.' + o.xtype);
            }
            this.el  =   isSeed ? new constructor(o) : new constructor();
            
        }
        // always overlay props..
        for (var i in o) {
            this.el[i] = o[i];
        }
        // register it!
        //if (o.xnsid  && o.id) {
         //   XObject.registry = XObject.registry || { };
         //   XObject.registry[o.xnsid] = XObject.registry[o.xnsid] || {}; 
         //   XObject.registry[o.xnsid][o.id] = this;
        //}
        
        cfg.items.forEach(this.addItem, this);
        
        for (var i in this.listeners) {
            this.addListener(i, this.listeners[i]);
        }
        // delete this.listeners ?
        
        
        // do we need to call 'init here?'
    },
      
     
     /**
      * @method addItem
      * Adds an item to the object using a new XObject
      * uses pack property to determine how to add it.
      * @arg cfg {Object} same as XObject constructor.
      */
    addItem : function(o) {
        
         
        var item = (o.constructor == XObject) ? o : new XObject(o);
        item.init();
        item.parent = this;
        this.items.push(item);
        
        if (item.pack===false) {  // no 
            return;
        }
        if (typeof(item.pack) == 'function') {
            // parent, child
            item.pack.apply(o, [ o , o.items[i] ]);
            item.parent = this;
            return;
        }
        var args = [];
        var pack_m  = false;
        if (typeof(item.pack) == 'string') {
            pack_m = item.pack;
        } else {
            pack_m = item.pack.shift();
            args = item.pack;
        }
        
        // handle error.
        if (pack_m && typeof(this.el[pack_m]) == 'undefined') {
            Seed.print('pack method not available : ' + this.xtype + '.' +  pack_m);
            return;
        }
        
        
        //Seed.print('Pack ' + this.el + '.'+ pack_m + '(' + item.el + ')');

        args.unshift(item.el);
        print('[' + args.join(',') +']');
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
 
        Seed.print("Add signal " + sig);
 
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
      * prefix with '.' to look up the tree.. multiple '..' to look further up..
      * 
      * @arg name  {String} name of signal
      * @return   {XObject|false} the object if found.
      */
    get : function(xid)
    {
        var ret=  false;
        if (xid[0] == '.') {
            return this.parent.get(xid.substring(1));
        }
        
        
        this.items.forEach(function(ch) {
            if (ch.id == xid) {
                ret = ch;
                return true;
            }
        })
        if (ret) {
            return ret;
        }
        // iterate children.
        this.items.forEach(function(ch) {
            ret = ch.get(xid);
            if (ret) {
                return true;
            }
        })
        return ret;
    }
      
      
} 
         
        
/**
 * Copies all the properties of config to obj.
 *
 * Pretty much the same as JQuery/Prototype..
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
     * Copies all the properties of config to obj, if the do not exist.
     * @param {Object} obj The receiver of the properties
     * @param {Object} config The source of the properties
     * @return {Object} returns obj
     * @member Object extendIf
     */


    extendIf : function(o, c){

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
    define : function(){
        // inline overrides
        var io = function(o){
            for(var m in o){
                this[m] = o[m];
            }
        };
        return function(sb, sp, overrides) {
            if (typeof(sp) == 'undefined') {
                // error condition - try and dump..
                throw "Missing superclass: when applying: " + sb
            }

            var F = function(){}, sbp, spp = sp.prototype;
            F.prototype = spp;
            sbp = sb.prototype = new F();
            sbp.constructor=sb;
            sb.superclass=spp;

            // extends Object.
            if(spp.constructor == Object.prototype.constructor){
                spp.constructor=sp;
            }
            
            sb.override = function(o){
                Object.extend(sb.prototype, o);
            };
            sbp.override = io;
            XObject.extend(sb.prototype, overrides);
            return sb;
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