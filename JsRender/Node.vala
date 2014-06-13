
// test..
// valac gitlive/app.Builder.js/JsRender/Lang.vala gitlive/app.Builder.js/JsRender/Node.vala --pkg gee-1.0 --pkg=json-glib-1.0 -o /tmp/Lang ;/tmp/Lang

public class JsRender.Node  {
    

	public Node parent;
	public GLib.List<Node> items; // child items..
    
    public Gee.HashMap<string,string> props; // the properties..
    public Gee.HashMap<string,string> listeners; // the listeners..
    public string  xvala_cls;
	public string xvala_xcls; // 'Xcls_' + id;
    public string xvala_id; // item id or ""
            
    public bool is_array;
    
    public Node()
    {
        this.items = new GLib.List<Node>();
        this.props = new Gee.HashMap<string,string>();
		this.listeners = new Gee.HashMap<string,string>();
        this.is_array = false;
        this.xvala_xcls = "";
		this.parent = null;
    }
    
    
    
    
    public bool isArray()
    {
        return this.is_array;
    }
    public bool hasChildren()
    {
        return this.items.length() > 0;
    }
    public bool hasXnsType()
    {
        if (this.props.get("|xns") != null && this.props.get("xtype") != null) {
            return true;
            
        }
        return false;
    }
	public string fqn()
	{
		if (!this.hasXnsType ()) {
			return "";
		}
		return this.props.get("|xns") + "." + this.props.get("xtype"); 

	}
	
    // wrapper around get props that returns empty string if not found.
    public string get(string key)
    {
        var k = this.props.get(key);
        if (k != null) {
			return k;
		}
		
		k = this.props.get("|" + key);
		if (k != null) {
			
    		return k;
		}
        
        return "";
        
    }
	 public bool has(string key)
    {
        var k = this.props.get(key);
        if (k != null) {
			return false;
		}
		
		
        return true;
        
    }

	public void  remove()
	{
		if (this.parent == null) {
			return;
		}
		var nlist = new GLib.List<Node>();
		for (var i =0;i < this.parent.items.length(); i++) {
			if (this.parent.items.nth_data(i) == this) {
				continue;
			}
			nlist.append(this.parent.items.nth_data(i));
		}
		this.items = nlist.copy();
		

	}
     
    /* creates javascript based on the rules */
    public Node? findProp(string n) {
		for(var i=0;i< this.items.length();i++) {
			var p = this.items.nth_data(i).get("*prop");
			if (this.items.nth_data(i).get("*prop").length < 1) {
				continue;
			}
			if (p == n) {
				return this.items.nth_data(i);
			}
		}
		return null;

	}

	string gLibStringListJoin( string sep, GLib.List<string> ar) 
	{
		var ret = "";
		for (var i = 0; i < ar.length(); i++) {
			ret += i>0 ? sep : "";
			ret += ar.nth_data(i);
		}
		return ret;

	}
    
    public string mungeToString (bool isListener, string pad,  GLib.List<string> doubleStringProps)
    {
        
         
        pad = pad.length < 1 ? "    " : pad;
        
        
         
        
        //isListener = isListener || false;

       //var keys = this.keys();
        var isArray = this.isArray();
        
        
        var els = new GLib.List<string>(); 
        var skip = new Gee.ArrayList<string>();
        if (!isArray && this.hasXnsType() ) {
                // this.mungeXtype(obj['|xns'] + '.' + obj['xtype'], els); ??????
                
                
               skip.add("|xns");
               skip.add("xtype");
               
        }
        //var newitems = new Gee.ArrayList<JsRender.Node>();
        var oprops = new Gee.HashMap<string,Node>();
        
        if (!isArray && this.hasChildren()) {
            // look for '*props'
           
            for (var ii =0; ii< this.items.length(); ii++) {
                var pl = this.items.nth_data(ii);
                if (!pl.props.has_key("*prop")) {
                    //newitems.add(pl);
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
                    var cn = new Node();
                    oprops.set(prop, cn);
                    
                }
                // ignores the fact it might be duplciated...
                oprops.get(prop).is_array = true;
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
                
                els.append("%d".printf(i) + " : " + el.mungeToString(false, pad,doubleStringProps));
                
            }
            var spad = pad.substring(0, pad.length-4);
            return   "{\n" +
                pad  + this.gLibStringListJoin(",\n" + pad , els) + 
                "\n" + spad +  "}";
               
            
            
            
          
        } 
        string left;
        Regex func_regex ;
        try {
            func_regex = new Regex("^\\s+|\\s+$");
        } catch (Error e) {
            print("failed to build regex");
            return "";
        }
        var piter = this.props.map_iterator();
        while (piter.next() ) {
            var k = piter.get_key();
            var v = piter.get_value();
            
            if (skip.contains(k) ) {
                continue;
            }
            
            
            string leftv = k[0] == '|' ? k.substring(1) : k;
            // skip builder stuff. prefixed with  '.' .. just like unix fs..
            if (leftv[0] == '.') { // |. or . -- do not output..
                continue;
            }
             if (k[0] == '*') {
                // ignore '*prop';
                continue;
             }
                
            
            if (Lang.isKeyword(leftv) || Lang.isBuiltin(leftv)) {
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
                /*           
                string str = "";
                try {
                    str = func_regex.replace(v,v.length, 0, "");
                } catch(Error e) {
                    print("regex failed");
                    return "";
                }
                */
				var str = v.strip();
                var lines = str.split("\n");
                if (lines.length > 0) {
                    str = string.joinv("\n" + pad, lines);
                }
                
                els.append(left  + str);
                continue;
            }
             
            // next.. is it a function..
            if (k[0] == '|') {
                // does not hapepnd with arrays.. 
                if (v.length < 1) {  //if (typeof(el) == 'string' && !obj[i].length) { //skip empty.
                    continue;
                }
				/*
    			print(v);
                string str = "";
                try {
                    str = func_regex.replace(v,v.length, 0, "");
                } catch(Error e) {
                    print("regex failed");
                    return "";
                }
                */
                var str = v.strip();
				  
                var lines = str.split("\n");
				  
                if (lines.length > 0) {
                    str =  string.joinv("\n" + pad, lines);
                }
                //print("==> " +  str + "\n");
                els.append(left + str);
                continue;
            }
            // standard..
            
            
            if (Lang.isNumber(v) || Lang.isBoolean(v)) { // boolean or number...?
                els.append(left + v );
                continue;
            }
            
            // strings..
            if (doubleStringProps.length() < 1) {
                els.append(left + this.quoteString(v));
                continue;
            }
           
            if (doubleStringProps.index(k) > -1) {
                els.append(left + this.quoteString(v));
                continue;
            }
             
            // single quote.. v.substring(1, v.length-1).replace("'", "\\'") + "'";
            els.append(left + "'" + v.substring(1, v.length-1).replace("'", "\\'") + "'");
            

           
           
           
        }
        var iter = oprops.map_iterator();
        while (iter.next()) {
            var k = iter.get_key();
            var vo = iter.get_value();
            string leftv = k[0] == '|' ? k.substring(1) : k;
            if (Lang.isKeyword(leftv) || Lang.isBuiltin(leftv)) {
                left = "'" + leftv + "'";
            } else if (Regex.match_simple("[^A-Za-z_]+",leftv)) { // not plain a-z... - quoted.
                var val = this.quoteString(leftv);
                
                left = "'" + val.substring(1, val.length-1).replace("'", "\\'") + "'";
            } else {
                left = leftv;
            }
            left += " : ";
            
            var right = vo.mungeToString(k == "listeners", pad + "    ",doubleStringProps);
            
            //if (!left.length && isArray) print(right);
            
            if (right.length > 0){
                els.append(left + right);
            }
        
            
        }


		if (this.listeners.size > 0) {
			// munge the listeners.
			//print("ADDING listeners?");
			
			var liter = this.listeners.map_iterator();
		
		    var itms = "listeners : {\n";
			var i =0;
		    while (liter.next()) {
				
				itms += i >0 ? ",\n" : "";    
				// 
				var str = liter.get_value().strip();
                var lines = str.split("\n");
                if (lines.length > 0) {
                    str = string.joinv("\n" + pad + "       ", lines);
                }
                

				
				itms +=  pad + "    "  + liter.get_key()  + " : " + str;

				i++;
			
				
			}
			itms += "\n" + pad + "}";
			//print ( "ADD " + itms); 
			els.append(itms);

		}


		
		// finally munge the children...
		if (this.items.length()> 0) {
			var itms = "items : [\n";
			for(var i = 0; i < this.items.length();i++) {
				// 
				itms +=    pad + "    "  +
					this.items.nth_data(i).mungeToString(false, pad + "        ",  doubleStringProps) + "\n";


			}
			
			els.append(itms);
		}

		// finally output listeners...
		

		



			
        if (els.length() < 1) {
            return "";
        }
        // oprops...    
            
        var spad = pad.substring(0, pad.length-4);
        return   "{\n" +
            pad  + gLibStringListJoin(",\n" + pad , els) + 
            "\n" + spad +  "}";
           
           
               
        
        
    }
    static Json.Generator gen = null;
    
    public string quoteString(string str)
    {
        if (Node.gen == null) {
            Node.gen = new Json.Generator();
        }
       var n = new Json.Node(Json.NodeType.VALUE);
		n.set_string(str);
 
        Node.gen.set_root (n);
        return  Node.gen.to_data (null);   
    }

    public void loadFromJson(Json.Object obj) {
        obj.foreach_member((o , key, value) => {
			//print(key+"\n");
            if (key == "items") {
                var ar = value.get_array();
                ar.foreach_element( (are, ix, el) => {
                    var node = new Node();
					node.parent = this;
                    node.loadFromJson(el.get_object());
                    this.items.append(node);
                });
                return;
            }
            if (key == "listeners") {
                var li = value.get_object();
                li.foreach_member((lio , li_key, li_value) => {
                    this.listeners.set(li_key, li_value.get_string());

                });
                return;
            }
			var v = value.get_value();
			var sv =  Value (typeof (string));
			v.transform(ref sv);
			 
            this.props.set(key,  (string)sv);
        });
        



    }
	public Node  deepClone()
	{
		return this.loadFromJson(this.toJsonObject());

	}
	public string toJsonString()
    {
        if (Node.gen == null) {
            Node.gen = new Json.Generator();
        }
        var n = new Json.Node(Json.NodeType.OBJECT);
		n.set_object(this.toJsonObject () );
        Node.gen.set_root (n);
        return  Node.gen.to_data (null);   
    }
	
    public Json.Object toJsonObject()
	{
		var ret = new Json.Object();

		// listeners...
		var li = new Json.Object();
		ret.set_object_member("listeners", li);
		var liter = this.listeners.map_iterator();
        while (liter.next()) {
			li.set_string_member(liter.get_key(), liter.get_value());
		}

		//props
	    var iter = this.props.map_iterator();
        while (iter.next()) {
			this.jsonObjectsetMember(ret, iter.get_key(), iter.get_value());
		}
		
		var ar = new Json.Array();
		ret.set_array_member("items", ar);
		
		// children..
		for(var i =0;i < this.items.length();i++) {
			ar.add_object_element(this.items.nth_data(i).toJsonObject());
        }
		return ret;
		
 
	}
	 
	public void jsonObjectsetMember(Json.Object o, string key, string val) {
		if (Lang.isBoolean(val)) {
			o.set_boolean_member(key, val == "false" ? false : true);
			return;
		}
		
		
		if (Lang.isNumber(val)) {
			if (val.contains(".")) {
				//print( "ADD " + key + "=" + val + " as a double?\n");
				o.set_double_member(key, double.parse (val));
				return;

			}
			//print( "ADD " + key + "=" + val + " as a int?\n")  ;
			o.set_int_member(key,long.parse(val));
			return;
		}
		///print( "ADD " + key + "=" + val + " as a string?\n");
		o.set_string_member(key,val);
		
	}
	public string nodeTip()
	{
		var ret = this.nodeTitle();
		var funcs = "";
		var iter = this.props.map_iterator();
        while (iter.next()) {
			var i =  iter.get_key();
			//, iter.get_value());
			if ( i[0] != '|') {
				continue;
			}
		
		    if (i == "|init") { 
		        continue;
		    }
			var val = iter.get_value();
			if (Regex.match_simple("^\\s*function", val)) { 
				funcs += "\n<b>" + i.substring(1) +"</b> : " + val.split("\n")[0];
				continue;
			}
		    if (Regex.match_simple("^\\s*\\(", val)) {
    			funcs += "\n<b>" + i.substring(1) +"</b> : " + val.split("\n")[0];
				continue;
			}
            
		}
		if (funcs.length > 0) {
		    ret+="\n\nMethods:" + funcs;
		} 
		return ret;

	}
    public string nodeTitle() {
  	    string[] txt = {};

		//var sr = (typeof(c['+buildershow']) != 'undefined') &&  !c['+buildershow'] ? true : false;
		//if (sr) txt.push('<s>');

		if (this.has("*prop"))   { txt += (this.get("*prop") + ":"); }
		
		//if (renderfull && c['|xns']) {
		    txt += this.fqn();
		    
		//}
		
		//if (c.xtype)      { txt.push(c.xtype); }
		    
		if (this.has("id"))     { txt += ("<b>[id=" + this.get("id") + "]</b>"); }
		if (this.has("fieldLabel")){ txt += ("[" + this.get("fieldLabel") + "]"); }
		if (this.has("boxLabel"))  { txt += ("[" + this.get("boxLabel") + "]"); }
		
		
		if (this.has("layout"))    { txt += ("<i>" + this.get("layout") + "</i>"); }
		if (this.has("title"))     { txt += ("<b>" + this.get("title") + "</b>"); }
		if (this.has("label"))     { txt += ("<b>" + this.get("label")+ "</b>"); }
		if (this.has("header"))   { txt += ("<b>" + this.get("header") + "</b>"); }
		if (this.has("legend"))     { txt += ("<b>" + this.get("legend") + "</b>"); }
		if (this.has("text"))      { txt += ("<b>" + this.get("text") + "</b>"); }
		if (this.has("name"))      { txt += ("<b>" + this.get("name")+ "</b>"); }
		if (this.has("region"))    { txt += ("<i>(" + this.get("region") + ")</i>"); }
		if (this.has("dataIndex")){ txt += ("[" + this.get("dataIndex") + "]"); }
		
		// for flat classes...
		//if (typeof(c["*class"]"))!= "undefined")  { txt += ("<b>" +  c["*class"]+  "</b>"); }
		//if (typeof(c["*extends"]"))!= "undefined")  { txt += (": <i>" +  c["*extends"]+  "</i>"); }
		
		
		//if (sr) txt.push('</s>');
		return (txt.length == 0) ? "Element" : string.joinv(" ", txt);
    }

}
