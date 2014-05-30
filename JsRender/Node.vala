
// test..
// valac gitlive/app.Builder.js/JsRender/Lang.vala gitlive/app.Builder.js/JsRender/Node.vala --pkg gee-1.0 -o /tmp/Lang ;/tmp/Lang

class JsRender.Node : Object {
    
    GLib.List<JsRender.Node> items; // child items..
    
    Gee.Map<string,string> props; // the properties..
    
  
    
    bool is_array;
    
    Node()
    {
        this.items = new GLib.List<JsRender.Node>();
        this.props = new GLib.Map<string,string>();
        this.is_array = false;
        
    }
    
    
    
    
    boolean isArray()
    {
        return this.is_array;
    }
    boolean hasChildren()
    {
        return this.items.length() > 0;
    }
    bool hasXnsType()
    {
        if (this.props.get("|xns") != null && this.props.get("xtype") != null) {
            return true;
            
        }
        return false;
    }
    // wrapper around get props that returns empty string if not found.
    string get(string key)
    {
        var k = this.props.get(key);
        if (k == null) {
            return "";
        }
        return k;
        
    }
    string quoteString(string s)
    {
        /// do json..
        // except for numbers...
        
    }
    /* creates javascript based on the rules */
    
    string mungeToString (bool isListener, string pad)
    {
        
         
        pad = pad.length < 1 ? "    " : pad;
        
        
        
        var isArray = false;
        
        //isListener = isListener || false;

       //var keys = this.keys();
        var isArray = this.isArray();
        
        
        var els = new GLib.List<string>(); 
        var skip = new Array<string>();
        if (!isArray && obj.hasXnsType() ) {
                // this.mungeXtype(obj['|xns'] + '.' + obj['xtype'], els); ??????
                
                
               skip.append_Val("|xns");
               skip.append_Val("xtype");
               
        }
        var newitems = new Array<JsRender.Node>();
        var oprops = new Gee.Map<string,JsRender.Node>();
        
        if (!isArray && this.hasChildren()) {
            // look for '*props'
           
            for (var ii =0; ii< this.items.length(); ii++) {
                var pl = this.items.nth_data(ii);
                if (!pl.props.has_key("*prop")) {
                    newitems.append(pl);
                    continue;
                }
                
                //print(JSON.stringify(pl,null,4));
                // we have a prop...
                //var prop = pl['*prop'] + '';
                //delete pl['*prop'];
                var prop = pl.get("*prop");
                // name ends in [];
                if (! Regex.match_simple("\\[\\]$", prop)) {
                    // it's a standard prop..
                    
                    // munge property..??
                    oprops.set(prop, pl);
                    
                    
                    //keys.push(prop);
                    continue;
                }
                
                prop  = prop.substring(0,  -2); //strip []
                // it's an array type..
                if (!oprops.has_key(prop)) {
                    var cn = new JsRender.Node();
                    oprops.set(prop, pl);
                    
                }
                // ignores the fact it might be duplciated...
                oprops.get(prop).isArray = true;
                oprops.get(prop).items.append(pl);
              
                
                
                
            }
            
            //obj.items = newitems;
            //if (!obj.items.length) {
            //    delete obj.items;
            //}
            
        }
        if (this.isArray()) {
            
            
            for (var i=0;i< this.items.length();i++) {
                var el = this.items.nth_data(i);
                
                els.append("%d".format(i) + " : " + el.mungeToString(false, pad));
                
            }
            var spad = pad.substring(0, pad.length-4);
            return   "{\n" +
                pad  + string.join(",\n" + pad , els) + 
                "\n" + spad +  "}";
               
            
            
            
          
        } 
        string left;
        var func_regex = new Regex("^\\s+|\\s+$");
        this.props.map_iterator().foreach((k,v) => {
            if (skip.find(k) != null) {
                return; 
            }
            
            
            var leftv = k[0] == '|' ? k.substring(1) : k;
            // skip builder stuff. prefixed with  '.' .. just like unix fs..
            if (leftv[0] == '.') { // |. or . -- do not output..
                return;
            }
             if (k[0] == '*') {
                // ignore '*prop';
                return;
             }
                
            
            if (JsRender.Lang.isKeyword(leftv) || JsRender.Lang.isBuiltin(leftv)) {
                left = "'" + leftv + "'";
            } else if (Regex.match_simple("[^A-Za-z_]+",leftv)) { // not plain a-z... - quoted.
                var val = this.quoteString(leftv);
                
                left = "'" + val.substring(1, val.length-1).replace("'", "\\'") + "'";
            } else {
                left = leftv;
            }
            left += " : ";
            
            if (isListener) {
            // change the lines...
                var str= func_regex.replace(v, "");  // remove bar. ???
                var lines = str.split("\n");
                if (lines.length > 1) {
                    str = string.join("\n" + pad, lines);
                }
                
                els.append(left  + str);
                return;
            }
             
            // next.. is it a function..
            if (k[0] == '|') {
                // does not hapepnd with arrays.. 
                if (v.length < 1) {  //if (typeof(el) == 'string' && !obj[i].length) { //skip empty.
                    return;
                }
                
                var str= func_regex.replace(v, "");
                var lines = str.split("\n");
                if (lines.length > 1) {
                    str =  string.join("\n" + pad, lines);
                }
                
                els.append(left + str);
                return;
            }
            // standard..
            
            
            if (!this.isString(v)) { // boolean or number...?
                els.append(left + this.quoteString(v));
                return;
            }
            // strings..
            if (!_this.doubleStringProps.length) {
                els.append(left + this.quoteString(v));
                continue;
            }
           
            if (_this.doubleStringProps.index(k) > -1) {
                els.push(left + this.quoteString(v));
                continue;
            }
            
            // single quote.. v.substring(1, v.length-1).replace("'", "\\'") + "'";
            els.push(left + "'" + v.substring(1, v.length-1).replace("'", "\\'") + "'";
            

           
           
           
        });
        oprops.map_iterator().foreach((k,vo) => {
            var leftv = k[0] == '|' ? k.substring(1) : k;
            if (JsRender.Lang.isKeyword(leftv) || JsRender.Lang.isBuiltin(leftv)) {
                left = "'" + leftv + "'";
            } else if (Regex.match_simple("[^A-Za-z_]+",leftv) { // not plain a-z... - quoted.
                var val = this.quoteString(leftv);
                
                left = "'" + val.substring(1, val.length-1).replace("'", "\\'") + "'";
            } else {
                left = leftv;
            }
            left += " : ";
            
            var right = vo.mungeToString(k == "listeners", pad + '    ');
            
            //if (!left.length && isArray) print(right);
            
            if (right.length > 0){
                els.push(left + right);
            }
        
            
        });
        if (!els.length()) {
            return "";
        }
        // oprops...    
            
        var spad = pad.substring(0, pad.length-4);
        return   "{\n" +
            pad  + string.join(",\n" + pad , els) + 
            "\n" + spad +  "}";
           
           
               
        
        
    } 
    
}
