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

 
function log (v)  {
        print(v);
}
function dump (ar) {
        print(_dump(ar, 0));
}

function _dump(arr,level) {
    var dumped_text = "";
    level = level || 0;
    
    
    //The padding given at the beginning of the line.
    var level_padding = "";
    
    for(var j=0;j<level+1;j++) {
        level_padding += "    ";
    }
    
    if(level > 15) {
        return  level_padding + "[ ... to deep ...]\n";
    }
    
    if (typeof(arr) != 'object') { //Array/Hashes/Objects 
        return "===>"+arr+"<===("+typeof(arr)+")";
    }

    for(var item in arr) {
        var value = arr[item];
        switch (typeof(value)) {
            case 'object' : 
                dumped_text += level_padding + "'" + item + "' ...\n";
                dumped_text += _dump(value,level+1) + "\n";
                break;
            
            case 'function' : 
                dumped_text += level_padding + "'" + item + "' => FUNCTION \n";
                break;
            
            default: 
                dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
                break;
        }
    }
        
    return dumped_text;
}
