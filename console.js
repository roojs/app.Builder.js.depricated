//<Script type="text/javascript">
/**
 * 
 * simple console wrapper - emulates what you would expect from console
 * 
 * in theory could be replaced with a 'in-line console'
 * 
 * provides 'dump' in addtion to 'log'
 * 
 */

var console = {
    log : function (v)  {
        print(v);
    },
    dump : function (ar) {
        print(this._dump(ar, 0));
    },

    _dump: function(arr,level) {
        var dumped_text = "";
        if(!level) level = 0;
        
        
        //The padding given at the beginning of the line.
        var level_padding = "";
        for(var j=0;j<level+1;j++) level_padding += "    ";
        
        if(level > 15) return  level_padding + "[ ... to deep ...]\n";
        
        if(typeof(arr) == 'object') { //Array/Hashes/Objects 
         
        
            for(var item in arr) {
                var value = arr[item];
                switch (typeof(value)) {
                    case 'object' : 
                        dumped_text += level_padding + "'" + item + "' ...\n";
                        dumped_text += this._dump(value,level+1) + "\n";
                        break;
                    
                    case 'function' : 
                        dumped_text += level_padding + "'" + item + "' => FUNCTION \n";
                        break;
                    
                    default: 
                        dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
                        break;
                }
            }
        } else { //Stings/Chars/Numbers etc.
            dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
        }
        return dumped_text;
    }
}