/**
 * 
 * Code to convert node tree to Javascript...
 * 
 * usage : x = (new JsRender.NodeToJs(node)).munge();
 * 
*/




public class JsRender.NodeToJs : Object {

	static uint indent = 1;
	 static string indent_str = " ";
	Node node;
	Gee.ArrayList<string>  doubleStringProps;
	string pad;
	Gee.ArrayList<string> els;
        //Gee.ArrayList<string> skip;
	Gee.HashMap<string,string> ar_props;


	
	public NodeToJs( Node node, Gee.ArrayList<string> doubleStringProps, string pad) 
	{
		this.node = node;
		this.doubleStringProps = doubleStringProps;
		this.pad = pad;
		this.els = new Gee.ArrayList<string>(); 
		//this.skip = new Gee.ArrayList<string>();
		this.ar_props = new Gee.HashMap<string,string>();

	}
	
	public string munge ( )
	{
		//return this.mungeToString(this.node);

	
		
		this.checkChildren();
		this.readProps();
		this.readArrayProps();
		this.readListeners();

		if (!this.node.props.has_key("* xinclude")) {
			this.iterChildren();
		}
		
		
		
		
		if (this.els.size < 1) {
			return "";
		}
		// oprops...	
			
		var spad = pad.substring(0, this.pad.length-indent);
		var str_props = gLibStringListJoin(",\n" + this.pad , this.els) ;
		//print ("STR PROPS: " + str_props);
		if (!this.node.props.has_key("* xinclude")) {
			return   "{\n" +
				this.pad  + str_props + 
				"\n" + spad +  "}";
		}
		// xinclude...


		return "Roo.apply(" + this.node.props.get("* xinclude") + "._tree(), "+
			 "{\n" +
				this.pad  + str_props + 
				"\n" + spad +  "})";
		     
	} 

	string gLibStringListJoin( string sep, Gee.ArrayList<string> ar) 
	{
		var ret = "";
		for (var i = 0; i < ar.size; i++) {
			ret += i>0 ? sep : "";
			ret += ar.get(i);
		}
		return ret;

	}
	public string mungeChild(string pad ,  Node cnode)
	{
		var x = new  NodeToJs(cnode, this.doubleStringProps, pad);
		return x.munge();
	}
	
	

	
	public void checkChildren () 
	{
		
		 
		// look throught he chilren == looking for * prop.. -- fixme might not work..
		
		
		if (!this.node.hasChildren()) {
			return;
		}
		// look for '*props'
	   
		for (var ii =0; ii< this.node.items.size; ii++) {
			var pl = this.node.items.get(ii);
			if (!pl.props.has_key("* prop")) {
				//newitems.add(pl);
				continue;
			}
			
			//print(JSON.stringify(pl,null,4));
			// we have a prop...
			//var prop = pl['*prop'] + '';
			//delete pl['*prop'];
			var prop = pl.get("* prop");
			print("got prop "+ prop + "\n");
			
			// name ends in [];
			if (! Regex.match_simple("\\[\\]$", prop)) {
				// it's a standard prop..
				
				// munge property..??
				this.els.add( prop  + " : " + this.mungeChild (  this.pad + indent_str,  pl));
				
				
				//keys.push(prop);
				continue;
			}



			
			var sprop  = prop.replace("[]", "");
			print("sprop is : " + sprop + "\n");
			
			// it's an array type..
			var old = "";
			if (!this.ar_props.has_key(sprop)) {
				
				this.ar_props.set(sprop, "");
				
			} else {
				old = this.ar_props.get(sprop);
			}
			var nstr  = old += old.length > 0 ? ",\n" : "";
			nstr += this.mungeChild( this.pad + indent_str + indent_str + indent_str ,   pl);
			
	  		this.ar_props.set(sprop, nstr);
			 
			
		}
		 
	}
	/*
 * Standardize this crap...
 * 
 * standard properties (use to set)
 *          If they are long values show the dialog..
 *
 * someprop : ....
 * bool is_xxx  :: can show a pulldown.. (true/false)
 * string html  
 * $ string html  = string with value interpolated eg. baseURL + ".." 
 *  Clutter.ActorAlign x_align  (typed)  -- shows pulldowns if type is ENUM? 
 * $ untypedvalue = javascript untyped value...  
 * _ string html ... = translatable..

 * 
 * object properties (not part of the GOjbect being wrapped?
 * # Gee.ArrayList<Xcls_fileitem> fileitems
 * 
 * signals
 * @ void open 
 * 
 * methods -- always text editor..
 * | void clearFiles
 * | someJSmethod
 * 
 * specials
 * * prop -- string
 * * args  -- string
 * * ctor -- string
 * * init -- big string?
 * 
 * event handlers (listeners)
 *   just shown 
 * 
 * -----------------
 * special ID values
 *  +XXXX -- indicates it's a instance property / not glob...
 *  *XXXX -- skip writing glob property (used as classes that can be created...)
 * 
 * 
 */
	public void readProps()
	{
		string left;
		Regex func_regex ;

		if (this.node.props.has_key("$ xns")) {
	 
			this.els.add("'|xns' : '" + this.node.props.get("$ xns") + "'");

		}

		
		try {
			func_regex = new Regex("^\\s+|\\s+$");
		} catch (Error e) {
			print("failed to build regex");
			return;
		}
		var piter = this.node.props.map_iterator();
		while (piter.next() ) {
			
			string k;
			string ktype;
			string kflag;
			node.normalize_key(piter.get_key(), out k, out kflag, out ktype);
			
			
			var v = piter.get_value();
			 
			
			//if (this.skip.contains(k) ) {
			//	continue;
			//}
			if (  Regex.match_simple("\\[\\]$", k)) {
				// array .. not supported... here?
				

			}
			
			string leftv = k;
			// skip builder stuff. prefixed with  '.' .. just like unix fs..
			if (kflag == ".") { // |. or . -- do not output..
				continue;
			}
			 if (kflag == "*") {
				// ignore '* prop'; ??? 
				continue;
			 }
				
			
			if (Lang.isKeyword(leftv) || Lang.isBuiltin(leftv)) {
				left = "'" + leftv + "'";
			} else if (Regex.match_simple("[^A-Za-z_]+",leftv)) { // not plain a-z... - quoted.
				var val = this.node.quoteString(leftv);
				
				left = "'" + val.substring(1, val.length-2).replace("'", "\\'") + "'";
			} else {
				left = leftv;
			}
			left += " : ";
			
			
			 
			// next.. is it a function.. or a raw string..
			if (
				kflag == "|" 
				|| 
				kflag == "$" 
				|| 
				ktype == "function"
	   		       
				// ??? any others that are raw output..
				) {
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
				var nstr = "" + str;
				if (lines.length > 0) {
					nstr =  string.joinv("\n" + this.pad, lines);
					//nstr =  string.joinv("\n", lines);
				}
				//print("==> " +  str + "\n");
				this.els.add(left + nstr);
				continue;
			}
			// standard..
			
			
			if (
				Lang.isNumber(v) 
				|| 
				Lang.isBoolean(v)
				||
				ktype.down() == "boolean"
    	   		        || 
				ktype.down() == "bool"
				|| 
				ktype.down() == "number"
				|| 
				ktype.down() == "int"
			    ) { // boolean or number...?
				this.els.add(left + v.down() );
				continue;
			}
			
			// is it a translated string?
			
			
			
			
			// strings..
			//if (this.doubleStringProps.size < 1) {
			//	this.els.add(left + this.node.quoteString(v));
			//	continue;
			//}
		   
			if (this.doubleStringProps.index_of(k) > -1) {
				// then use the translated version...
				
				els.add(left + "_this._strings['" + 
					GLib.Checksum.compute_for_string (ChecksumType.MD5, v) +
					"]'"
				);
				continue;
			}
			if (ktype.down() == "string" && kname[0] == '_') {
				els.add(left + "_this._strings['" + 
					GLib.Checksum.compute_for_string (ChecksumType.MD5, v) +
					"]'"
				);
				continue;
			}
			// otherwise it needs to be encapsulated.. as single quotes..
			
			var vv = this.node.quoteString(v);
			// single quote.. v.substring(1, v.length-1).replace("'", "\\'") + "'";
			this.els.add(left + "'" + vv.substring(1, vv.length-2).replace("'", "\\'") + "'");
			

		   
		   
		   
		}
	}
	public void readArrayProps()
	{
	
		// handle the childitems  that are arrays.. eg. button[] = {  }...
		
		string left;
		
		var iter = this.ar_props.map_iterator();
		while (iter.next()) {
			var k = iter.get_key();
			var right = iter.get_value();
			
			string leftv = k[0] == '|' ? k.substring(1) : k;
			if (Lang.isKeyword(leftv) || Lang.isBuiltin(leftv)) {
				left = "'" + leftv + "'";
			} else if (Regex.match_simple("[^A-Za-z_]+",leftv)) { // not plain a-z... - quoted.
				var val = this.node.quoteString(leftv);
				
				left = "'" + val.substring(1, val.length-2).replace("'", "\\'") + "'";
			} else {
				left = leftv;
			}
			left += " : ";
			
			 
			
			
			if (right.length > 0){
				this.els.add(left + "[\n" +  this.pad + indent_str + indent_str +  
				             right + "\n" + this.pad + "]");
			}
		
			
		}

	}
	public void readListeners()
	{
		
		if (this.node.listeners.size < 1) {
			return;
		}
			// munge the listeners.
			//print("ADDING listeners?");
		
		var liter = this.node.listeners.map_iterator();
	
		var itms = "listeners : {\n";
		var i =0;
		while (liter.next()) {
			
			itms += i >0 ? ",\n" : "";	
			// 
			var str = liter.get_value().strip();
			var lines = str.split("\n");
			if (lines.length > 0) {
				//str = string.joinv("\n" + this.pad + "	   ", lines);
				str = string.joinv("\n" + this.pad + indent_str + indent_str , lines);
			}
			
			itms +=  this.pad + indent_str  + liter.get_key().replace("|", "")  + " : " + str;

			i++;
		
			
		}
		itms += "\n" + this.pad + "}";
		//print ( "ADD " + itms); 
		this.els.add(itms);

	}

	public void iterChildren()
	{
		
		
		// finally munge the children...
		if (this.node.items.size < 1) {
			return;
		}
		var itms = "items : [\n";
		var n = 0;
		for(var i = 0; i < this.node.items.size;i++) {
			var ele = this.node.items.get(i);
			if (ele.props.has_key("* prop")) {
				continue;
			}
			if (n > 0) {
				 itms += ",\n";
			}
			n++;
			itms +=	this.pad + indent_str  +
				this.mungeChild( this.pad + indent_str + indent_str ,  ele);
			
			
		}
		itms +=  "\n"+  this.pad + "]"  + "\n";
		this.els.add(itms);
	}

		// finally output listeners...
		
	public void xIncludeToString()
	{
		

	}

}
	
	 
	
	
