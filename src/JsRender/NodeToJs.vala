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
	Gee.ArrayList<string>  doubleStringProps;  // need to think if this is a good idea like this
	string pad;
	
	Gee.ArrayList<string> els;
        //Gee.ArrayList<string> skip;
	Gee.HashMap<string,string> ar_props;
	
	Gee.HashMap<string,string> out_props;
	Gee.HashMap<string,string> out_listeners;	
	Gee.HashMap<string,Node> out_nodeprops;
	Gee.ArrayList<Node> out_children;
	Gee.HashMap<string,Gee.ArrayList<Node>> out_props_array;
	Gee.HashMap<string,Gee.ArrayList<string>> out_props_array_plain;	
	
	NodeToJs top;
	public string ret;
	
	int cur_line;

	
	public NodeToJs( Node node, Gee.ArrayList<string> doubleStringProps, string pad, NodeToJs? parent) 
	{
		this.node = node;
		this.doubleStringProps = doubleStringProps;
		this.pad = pad;
		
		this.els = new Gee.ArrayList<string>(); 
		this.ar_props = new Gee.HashMap<string,string>();
		
		
		this.out_props = new Gee.HashMap<string,string>();
		this.out_listeners = new Gee.HashMap<string,string>();	
		this.out_nodeprops = new Gee.HashMap<string,Node>() ;
		this.out_children = new Gee.ArrayList<Node> ();
		this.out_props_array = new Gee.HashMap<string,Gee.ArrayList<Node>>() ;
		this.out_props_array_plain = new Gee.HashMap<string,Gee.ArrayList<string>>() ;
	
		
		
		this.cur_line = parent == null ? 0 : parent.cur_line;
		this.ret = "";
		this.top = parent == null ? this : parent.top;
 
	}
	
	
	
	
	
	
	public string munge ( )
	{
		//return this.mungeToString(this.node);

		this.node.line_start = this.cur_line;
		
		this.checkChildren();
		this.readProps();
		this.readArrayProps();
		this.readListeners();

		if (!this.node.props.has_key("* xinclude")) {
			this.iterChildren();
		}
		
		
		
		// no properties to output...
		if (this.els.size < 1) {
			return "";
		}
		
		this.mungeOut();
		
		// oprops...	
			
		var spad = this.pad.substring(0, this.pad.length-indent);
		
		
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
		/**
	
	This currently works by creating a key/value array of this.els, which is just an array of properties..
	this is so that join() works...
	
	how this could work:
	a) output header
	b) output plan properties.
	c) output listeners..
	c) output *prop
	g) output prop_arrays..
	d) output children
	e) 
	
	
	
	*/
	

	public string mungeOut()
	{
		
		var spad = this.pad.substring(0, this.pad.length-indent);
		
		if (this.node.props.has_key("* xinclude")) {
			this.addLine("Roo.apply(" + this.node.props.get("* xinclude") + "._tree(), {");
	 
		} else {
			this.addLine("{");
		}
		var suffix = "";
		// output the items...
		// work out remaining items...
		var  total_nodes = this.out_props.size + 
				this.out_props_array_plain.size + 
				(this.out_listeners.size > 0 ? 1 : 0) +
				this.out_nodeprops.size +
				this.out_props_array.size +
				(this.out_children.size > 0 ? 1 : 0);
		
		
		// * prop

		var niter = this.out_nodeprops.map_iterator();

		while(niter.next()) {
			total_nodes--;
			suffix = total_nodes > 0 ? "," : "";
			this.addMultiLine(this.pad + niter.get_key() + " : " + 
					this.mungeChildNew(this.pad + indent_str, niter.get_value()) + suffix
			);
		}	
		
		// plain properties.
		var iter = this.out_props.map_iterator();
		while(iter.next()) {
			total_nodes--;
			suffix = total_nodes > 0 ? "," : "";
			this.addLine(this.pad + iter.get_key() + " : " + iter.get_value() + suffix);
		}
		/*
		// 				out_props_array_plain -- not used?
		var paiter = this.out_props_array_plain.map_iterator();

		while(paiter.next()) {
			total_nodes--;

			this.addLine(this.pad + paiter.get_key() + " : [");
			var paliter = paiter.get_value().list_iterator();
			while (paliter.next()) {
				suffix = paliter.has_next()  ? "," : "";
				this.addMultiLine(this.pad + indent_str +   paliter.get() + suffix);
			}

			suffix = total_nodes > 0 ? "," : "";
//					this.mungeChild(this.pad + indent_str, niter.get_value())
			this.addLine(this.pad + "]" + suffix);			
		}	
		*/
		
		
				 
		// prop arrays...
		
		var piter = this.out_props_array.map_iterator();

		while(piter.next()) {
			total_nodes--;

			this.addLine(this.pad + piter.get_key() + " : [");
			var pliter = piter.get_value().list_iterator();
			while (pliter.next()) {
				suffix = pliter.has_next()  ? "," : "";
				this.addMultiLine(this.pad + indent_str + 
					this.mungeChildNew(this.pad + indent_str  + indent_str, pliter.get()) + suffix);
			}

			suffix = total_nodes > 0 ? "," : "";
 
			this.addLine(this.pad + "]" + suffix);			
		}	
		// listeners..
		
		if (this.out_listeners.size > 0 ) { 
			total_nodes--;
			this.addLine(this.pad + "listeners : {");
			iter = this.out_listeners.map_iterator();
			var sz = this.out_listeners.size;
			while(iter.next()) {
				sz--;
				suffix = sz > 0 ? "," : "";
				this.addMultiLine(this.pad + indent_str + iter.get_key() + " : " + iter.get_value() + suffix);
			}
			suffix = total_nodes > 0 ? "," : "";
			this.addLine(this.pad + "}" + suffix);			
			
		}
		// children..
		if (this.out_children.size > 0) {
			this.addLine(this.pad + "items  : [" );
			var cniter = this.out_children.list_iterator();
			while (cniter.next()) {
				suffix = cniter.has_next()  ? "," : "";
				this.addMultiLine(this.pad + indent_str
					this.mungeChildNew(this.pad + indent_str  + indent_str, cniter.get()) + suffix
				);
				
			}
			
			this.addLine(this.pad + indent_str + "]");
		}
		
		if (this.node.props.has_key("* xinclude")) {
			this.ret += spad + "})";
	 
		} else {
			this.ret += spad + "}";
		}
		
		
		return this.ret;
	
	}
	
 
	
	
	
	public void addLine(string str= "")
	{
		this.cur_line ++;
		this.ret += str+ "\n";
		
		
		
	}
	
	public void addMultiLine(string str= "")
	{
		 
		this.cur_line += str.split("\n").length;
		//this.ret +=  "/*%d*/ ".printf(l) + str + "\n";
		this.ret +=   str + "\n";
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
		var x = new  NodeToJs(cnode, this.doubleStringProps, pad, this);
		return x.munge();
	}
	
	public string mungeChildNew(string pad ,  Node cnode)
	{
		var x = new  NodeToJs(cnode, this.doubleStringProps, pad, this);
		x.munge();
		return x.ret;
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
				
				this.out_nodeprops.set(prop, pl);
				
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
				this.out_props_array.set(sprop, new Gee.ArrayList<Node>());
			} else {
				old = this.ar_props.get(sprop);
			}
			var nstr  = old += old.length > 0 ? ",\n" : "";
			nstr += this.mungeChild( this.pad + indent_str + indent_str + indent_str ,   pl);
			this.out_props_array.get(sprop).add( pl);
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
			this.out_props.set("'|xns'", this.node.props.get("$ xns") );
			
			this.els.add("'|xns' : '" + this.node.props.get("$ xns") + "'");

		}

		
		try {
			func_regex = new Regex("^\\s+|\\s+$");
		} catch (Error e) {
			print("failed to build regex");
			return;
		}
		// sort the key's so they always get rendered in the same order..
		
		var keys = new Gee.ArrayList<string>();
		var piter = this.node.props.map_iterator();
		while (piter.next() ) {
			string k;
			string ktype;
			string kflag;
			this.node.normalize_key(piter.get_key(), out k, out kflag, out ktype);
			
			keys.add(k);
		}
		
		keys.sort((  a,  b) => {
			return ((string)a).collate((string)b);
			//if (a == b) return 0;
			//return a < b ? -1 : 1;
		});
		
		
		
		for (var i = 0; i< keys.size; i++) {
			var key = this.node.get_key(keys.get(i));
			print("ADD KEY %s\n", key);
			string k;
			string ktype;
			string kflag;
			
			this.node.normalize_key(key, out k, out kflag, out ktype);
			
			
			var v = this.node.get(key);
			 
			
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
				this.out_props.set(left, nstr);
				//print("==> " +  str + "\n");
				this.els.add(left + " : "+  nstr);
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
			    this.out_props.set(left, v.down());
				this.els.add(left + " : " + v.down() );
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
				
				this.els.add(left + " : _this._strings['" + 
					GLib.Checksum.compute_for_string (ChecksumType.MD5, v) +
					"']"
				);
				this.out_props.set(left, "_this._strings['" + 
					GLib.Checksum.compute_for_string (ChecksumType.MD5, v) +
					"']");
				continue;
			}
			if (ktype.down() == "string" && k[0] == '_') {
				this.els.add(left + " : _this._strings['" + 
					GLib.Checksum.compute_for_string (ChecksumType.MD5, v) +
					"']"
				);
				this.out_props.set(left, " _this._strings['" + 
					GLib.Checksum.compute_for_string (ChecksumType.MD5, v) +
					"']"
				);
				
				
				continue;
			}
			// otherwise it needs to be encapsulated.. as single quotes..
			
			var vv = this.node.quoteString(v);
			// single quote.. v.substring(1, v.length-1).replace("'", "\\'") + "'";
			this.els.add(left + " : " +  "'" + vv.substring(1, vv.length-2).replace("'", "\\'") + "'");
			this.out_props.set(left,  "'" + vv.substring(1, vv.length-2).replace("'", "\\'") + "'");

		   
		   
		   
		}
	}
	public void readArrayProps()
	{
	
		// this is not needed in the new version
		// as array props are handled more directly..
		
		// handle the childitems  that are arrays.. eg. button[] = {  }...
		
		// note this does not handle a mix of nodes and properties with the same 
		
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

			
			if (right.length > 0){
				//if (this.out_props_array_plain.has_key(left)) {
				//	this.out_props_array_plain.set(left, new Gee.ArrayList<string>());
				//}
				//this.out_props_array_plain.get(left).add(right);
			
				this.els.add(left + " : [\n" +  this.pad + indent_str + indent_str +  
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
	
 
	
	
		var keys = new Gee.ArrayList<string>();
		var piter = this.node.listeners.map_iterator();
		while (piter.next() ) {
			 
			keys.add(piter.get_key());
		}
		keys.sort((  a,  b) => {
			return ((string)a).collate((string)b);
			//if (a == b) return 0;
			//return a < b ? -1 : 1;
		});
	
		var itms = "listeners : {\n";
		
		for (var i = 0; i< keys.size; i++) {
			var key = keys.get(i);
			var val = this.node.listeners.get(key);
		
	
			itms += i >0 ? ",\n" : "";	
			// 
			var str = val.strip();
			var lines = str.split("\n");
			if (lines.length > 0) {
				//str = string.joinv("\n" + this.pad + "	   ", lines);
				str = string.joinv("\n" + this.pad + indent_str + indent_str , lines);
			}
			
			itms +=  this.pad + indent_str  + key.replace("|", "")  + " : " + str;
			this.out_listeners.set(key.replace("|", "") ,str);
		
			
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
			this.out_children.add(ele);
			
		}
		itms +=  "\n"+  this.pad + "]"  + "\n";
		this.els.add(itms);
	}

		// finally output listeners...
		
	public void xIncludeToString()
	{
		

	}

}
	
	 
	
	
