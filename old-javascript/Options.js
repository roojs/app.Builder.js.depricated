//<script type="text/javascript">

XObject = imports.XObject.XObject
 
/**
 * Options parsing is needed as GLib's built in GOptionGroup is not feasible to use in an introspected way at present.
 * 
 * usage :
 * 
 * o = new Options(
 *    help_desription : 'Help about this',
 *    options : [
 *        { arg_short : 'a', arg_long: 'test', description : 'a test', flag_array: true , flag_boolean : false, arg_default: 'fred'}
 *    ]
 * );
 * cfg = o.parse(Seed.argv);
 * 
 * Currently only supports simple parsing
 * eg. --longarg test -b test
 * 
 * Does not support --aaaaa=bbbb
 */
Options  = XObject.define(
    function (cfg) {
        options = []; // default.
        XObject.extend(this,cfg);
        if (this.help_description.length) {
            this.options.push({ arg_short : 'h', arg_long: 'help', description : 'Show Help', flag_boolean : true});
            
        }
    },
    Object,
    {
        /**
         * @cfg {String} help_description what appears at the start of the help message.
         */
        help_description: '',
        /**
         * @cfg {Boolean} If extra arguments are allowed.
         */
        allow_extra : false,
        /**
         * @param {Object} Resulting key/value of data.
         */
        result : false,
        /**
         * @prop {Array} the arguments
         */
        args: false,
        /**
         * @prop {Array} extra the arguments that are not accounted for.
         */
        extra: false,
        /**
         * parse the argv
         * usage: options.parse(Seed.argv)
         */
        parse: function (argv)
        {
            var _this = this;
            this.result = {};
            this.options.forEach(function(a) {
                
                if (typeof(a.arg_default) != 'undefined') {
                    _this.result[a.arg_long] = a.arg_default;
                    return;
                }
                
                if (a.flag_boolean) {
                    _this.result[a.arg_long] = false;
                    return;
                }
                if (a.flag_array) {
                    _this.result[a.arg_long] = [];
                    return;
                }
                
            })
            
            this.extra = {};
            var args = Array.prototype.slice.call(Seed.argv);
            args.shift(); //seed
            args.shift(); //script..
        
            for(var i =0; i < args.length;i++) {
                
                var a= this.findArg(args[i]);
                
                if (!a) {
                    if (!this.allow_extra) {
                        throw {
                            name: "ArgumentError", 
                            message: "Unknown argument: " + args[i] 
                        };
                    }
                    this.extra.push(args[i]);
                }
                
                if (a.arg_long == 'help' ) {
                    print("Help Message Requested");
                    this.showHelp();
                    Seed.quit();
                    return;
                }
                
                if (a.flag_boolean) {
                    this.result[a.arg_long] = true;
                    continue;
                }
                var next = args[i+1];
                if (this.findArg(next)) {
                    throw {
                        name: "ArgumentError", 
                        message: "Invalid argument sequence: " + args[i] + ' ' + next
                    };
                }
                // type juggling -- fixme...
                
                if (a.flag_array) {
                    this.result[a.arg_long].push(next);
                    i++;
                    continue;
                }
            
                if (typeof(this.result[a.arg_long]) != 'undefined' && this.result[a.arg_long] != a.arg_default) {
                    throw {
                        name: "ArgumentError", 
                        message: "Invalid argument duplicate: " + args[i] + ' ' + next
                    };
                }
                
                this.result[a.arg_long] = next;
                i++;
            }
            // validate results..
            this.options.forEach(function(a) {
                if (typeof(a.arg_default) != 'undefined') {
                    return;
                }
                if (a.flag_boolean) {
                    return; 
                }
                if (typeof(_this.result[a.arg_long]) != 'undefined') {
                    return;
                }
                _this.showHelp();
                throw {
                    name: "ArgumentError", 
                    message: "Missing Argument: --" + a.arg_long
                };
            });
            
            
            return this.result;
        },
            
             
        findArg : function(str)
        {
            var ret = false;
            var type = str.substring(0,1) == '-' ? 'arg_short' : '';
            type = str.substring(0,2) == '--' ? 'arg_long' : type;
            if (type == '') {
                return false; // not an arg..
            }
            var match = str.substring(type =='arg_long' ? 2 : 1);
            
            this.options.forEach(function(o) {
                if (ret) {
                    return; // no more parsing.
                }
                if (o[type] == match) {
                    ret = o;
                }
                
            });
            return ret;
            
        },
        
        
        showHelp: function()
        {
            print(this.help_description);
            this.options.forEach(function(o) {
                // fixme needs tidying up..
                print('  --' + o.arg_long + '   (-' + o.arg_short + ')  ' + o.description);
            });
            
                
        }
    }
);
