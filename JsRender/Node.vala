
// test..
// valac gitlive/app.Builder.js/JsRender/Lang.vala gitlive/app.Builder.js/JsRender/Node.vala --pkg gee-1.0 --pkg=json-glib-1.0 -o /tmp/Lang ;/tmp/Lang


/*
 * 
 * props:
 * 
 * key value view of properties.
 * 
 * Old standard..
 * XXXXX : YYYYY  -- standard - should be rendered as XXXX : "YYYY" usually.
 * |XXXXX : YYYYY  -- standard - should be rendered as XXXX : YYYY usually.
 * |init  -- the initialization...
 * *prop : a property which is actually an object definition... 
 * *args : contructor args
 * .ctor : Full contruct line...  
 * 
 * Newer code
 * ".Gee.ArrayList<Xcls_fileitem>:fileitems" ==> # type  name 
 * ".signal:void:open": "(JsRender.JsRender file)" ==> @ type name
 *  "|void:clearFiles": "() .... some code...."  | type name
 *
 * 
 * 
 * 
 * 
 * Standardize this crap...
 * 
 * standard properties (use to set)
 *          If they are long values show the dialog..
 * 
 * bool is_xxx  :: can show a pulldown.. (true/false)
 * string html  
 * $ string html  = string with value interpolated eg. baseURL + ".." 
 *  Clutter.ActorAlign x_align  (typed)  -- shows pulldowns if type is ENUM? 
 * $ untypedvalue = javascript untyped value... 
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
 * 
 *  FORMATING?
.method {
	 color : green;
	 font-weight: bold;	 
}
.prop {
	color : #333;
}
.prop-code {
    font-style: italic;
 }
.listener {
    color: #600;
    font-weight: bold;	 
}
.special { 
  color : #00c;    font-weight: bold;	 


*/






public class JsRender.Node : Object {
	

	public Node parent;
	public Gee.ArrayList<Node> items; // child items..
	
	public Gee.HashMap<string,string> props; // the properties..
	public Gee.HashMap<string,string> listeners; // the listeners..
	public string  xvala_cls;
	public string xvala_xcls; // 'Xcls_' + id;
	public string xvala_id; // item id or ""
		


	public Node()
	{
		this.items = new Gee.ArrayList<Node>();
		this.props = new Gee.HashMap<string,string>();
		this.listeners = new Gee.HashMap<string,string>();

		this.xvala_xcls = "";
		this.parent = null;
	}

	
	
	
	
	public bool hasChildren()
	{
		return this.items.size > 0;
	}
	public bool hasXnsType()
	{
		if (this.props.get("$ xns") != null && this.props.get("xtype") != null) {
			return true;
			
		}
		return false;
	}
	public string fqn()
	{
		if (!this.hasXnsType ()) {
			return "";
		}
		return this.props.get("$ xns") + "." + this.props.get("xtype"); 

	}
	public void setFqn(string fqn)
	{
		var ar = fqn.split(".");
		this.props.set("xtype", ar[ar.length-1]);
		this.props.set("$ xns", fqn.substring(0, -1 * (ar[ar.length-1].length)));
		print("setFQN %s to %s", fqn , this.fqn);
		               

	}
	// wrapper around get props that returns empty string if not found.
	public string get(string key)
	{
		var k = this.props.get(key);
		if (k != null) {
			return k;
		}
		
		k = this.props.get("$ " + key);
		if (k != null) {
			return k;
		}
		
		return "";
		
	}
	public void set(string key, string value) {
		this.props.set(key,value);
	}
	 public bool has(string key)
	{
		var k = this.props.get(key);
		if (k != null) {
			return true;
		}
		
		
		return false;
		
	}

	public void  remove()
	{
		if (this.parent == null) {
			return;
		}
		var nlist = new Gee.ArrayList<Node>();
		for (var i =0;i < this.parent.items.size; i++) {
			if (this.parent.items.get(i) == this) {
				continue;
			}
			nlist.add(this.parent.items.get(i));
		}
		this.parent.items = nlist;
		this.parent = null;

	}
	 
	/* creates javascript based on the rules */
	public Node? findProp(string n) {
		for(var i=0;i< this.items.size;i++) {
			var p = this.items.get(i).get("* prop");
			if (this.items.get(i).get("* prop").length < 1) {
				continue;
			}
			if (p == n) {
				return this.items.get(i);
			}
		}
		return null;

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
	
	public string mungeToString ( string pad,  Gee.ArrayList<string> doubleStringProps)
	{
		
		 
		pad = pad.length < 1 ? "	" : pad;
		
		
		 
		
		

	   //var keys = this.keys();
		
		
		
		var els = new Gee.ArrayList<string>(); 
		var skip = new Gee.ArrayList<string>();
		if (this.hasXnsType() ) {
				// this.mungeXtype(obj['|xns'] + '.' + obj['xtype'], els); ??????
				
				
			   //skip.add("|xns");
			   //skip.add("xtype");
			   
		}
		//var newitems = new Gee.ArrayList<JsRender.Node>();

		 
		
		// look throught he chilren == looking for * prop.. -- fixme might not work..
		
		var ar_props = new Gee.HashMap<string,string>();

		
		if (this.hasChildren()) {
			// look for '*props'
		   
			for (var ii =0; ii< this.items.size; ii++) {
				var pl = this.items.get(ii);
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
					els.add( prop  + " : " + pl.mungeToString (  pad + "	",  doubleStringProps));
					
					
					//keys.push(prop);
					continue;
				}



				
				var sprop  = prop.replace("[]", "");
				print("sprop is : " + sprop + "\n");
				
				// it's an array type..
				var old = "";
				if (!ar_props.has_key(sprop)) {
					
					ar_props.set(sprop, "");
					
				} else {
					old = ar_props.get(sprop);
				}
				var nstr  = old += old.length > 0 ? ",\n" : "";
				nstr += pl.mungeToString (  pad + "		",  doubleStringProps);
				
		  		ar_props.set(sprop, nstr);
				 
				
			}
			 
			
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
			if (  Regex.match_simple("\\[\\]$", k)) {
				
				

			}
			
			string leftv = k[0] == '$' ? k.substring(2) : k;
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
				
				left = "'" + val.substring(1, val.length-2).replace("'", "\\'") + "'";
			} else {
				left = leftv;
			}
			left += " : ";
			
			
			 
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
				var nstr = "" + str;
				if (lines.length > 0) {
					nstr =  string.joinv("\n" + pad, lines);
				}
				//print("==> " +  str + "\n");
				els.add(left + nstr);
				continue;
			}
			// standard..
			
			
			if (Lang.isNumber(v) || Lang.isBoolean(v)) { // boolean or number...?
				els.add(left + v.down() );
				continue;
			}
			
			// strings..
			if (doubleStringProps.size < 1) {
				els.add(left + this.quoteString(v));
				continue;
			}
		   
			if (doubleStringProps.index_of(k) > -1) {
				els.add(left + this.quoteString(v));
				continue;
			}
			var vv = this.quoteString(v);
			// single quote.. v.substring(1, v.length-1).replace("'", "\\'") + "'";
			els.add(left + "'" + vv.substring(1, vv.length-2).replace("'", "\\'") + "'");
			

		   
		   
		   
		}
		// handle the childitems  that are arrays.. eg. button[] = {  }...
		
		
		var iter = ar_props.map_iterator();
		while (iter.next()) {
			var k = iter.get_key();
			var right = iter.get_value();
			
			string leftv = k[0] == '|' ? k.substring(1) : k;
			if (Lang.isKeyword(leftv) || Lang.isBuiltin(leftv)) {
				left = "'" + leftv + "'";
			} else if (Regex.match_simple("[^A-Za-z_]+",leftv)) { // not plain a-z... - quoted.
				var val = this.quoteString(leftv);
				
				left = "'" + val.substring(1, val.length-2).replace("'", "\\'") + "'";
			} else {
				left = leftv;
			}
			left += " : ";
			
			 
			
			
			if (right.length > 0){
				els.add(left + "[\n" +  pad + "	 " +  right + "\n" + pad + "]");
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
					str = string.joinv("\n" + pad + "	   ", lines);
				}
				

				
				itms +=  pad + "	"  + liter.get_key().replace("|", "")  + " : " + str;

				i++;
			
				
			}
			itms += "\n" + pad + "}";
			//print ( "ADD " + itms); 
			els.add(itms);

		}


		
		// finally munge the children...
		if (this.items.size> 0) {
			var itms = "items : [\n";
			var n = 0;
			for(var i = 0; i < this.items.size;i++) {

				if (this.items.get(i).props.has_key("* prop")) {
					continue;
				}
				if (n > 0) {
					 itms += ",\n";
				}
				n++;
				itms +=	pad + "	"  +
					this.items.get(i).mungeToString( pad + "		",  doubleStringProps);
				
				
			}
			itms +=  "\n"+  pad + "]"  + "\n";
			els.add(itms);
		}

		// finally output listeners...
		

		



			
		if (els.size < 1) {
			return "";
		}
		// oprops...	
			
		var spad = pad.substring(0, pad.length-4);
		var str_props = gLibStringListJoin(",\n" + pad , els) ;
		//print ("STR PROPS: " + str_props);
		
		return   "{\n" +
			pad  + str_props + 
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

	public void loadFromJson(Json.Object obj, int version) {
		obj.foreach_member((o , key, value) => {
			//print(key+"\n");
			if (key == "items") {
				var ar = value.get_array();
				ar.foreach_element( (are, ix, el) => {
					var node = new Node();
					node.parent = this;
					node.loadFromJson(el.get_object(), version);
					this.items.add(node);
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

			var rkey = key;
			if (version == 1) {
				rkey = this.upgradeKey(key, (string)sv);
			}

			
			this.props.set(rkey,  (string)sv);
		});
		



	}

	public string upgradeKey(string key, string val)
	{
		// convert V1 to V2
		if (key.length < 1) {
			return key;
		}
		switch(key) {
			case "*prop":
			case "*args":
			case ".ctor":
			case "|init":
				return "* " + key.substring(1);
		}
		if (key[0] == '.') {
			var bits = key.substring(1).split(":");
			if (bits[0] == "signal") {
				return "@" + string.joinv(" ", bits).substring(bits[0].length);
			}
			return "# " + string.joinv(" ", bits);			
		}
		if (key[0] != '|') {
			return key;
		}
		var bits = key.substring(1).split(":");
		// two types '$' or '|' << for methods..
		// javascript 
		if  (Regex.match_simple ("^function\\s*(", val.strip())) {
			return "| " + key.substring(1);
		}
		// vala function..
		
		if  (Regex.match_simple ("^\\(", val.strip())) {
		
			return "| " + string.joinv(" ", bits);
		}
		
		// guessing it's a property..
		return "$ " + string.joinv(" ", bits);
		
		

	}





	
	public Node  deepClone()
	{
		var n = new Node();
		n.loadFromJson(this.toJsonObject(), 2);
		return n;

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
		for(var i =0;i < this.items.size;i++) {
			ar.add_object_element(this.items.get(i).toJsonObject());
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
		
			//if (i == "* init") { 
			//	continue;
			//}
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

		if (this.has("* prop"))   { txt += (this.get("* prop") + ":"); }
		
		//if (renderfull && c['|xns']) {
			txt += this.fqn();
			
		//}
		
		//if (c.xtype)	  { txt.push(c.xtype); }
			
		if (this.has("id"))	 { txt += ("<b>[id=" + this.get("id") + "]</b>"); }
		if (this.has("fieldLabel")){ txt += ("[" + this.get("fieldLabel") + "]"); }
		if (this.has("boxLabel"))  { txt += ("[" + this.get("boxLabel") + "]"); }
		
		
		if (this.has("layout"))	{ txt += ("<i>" + this.get("layout") + "</i>"); }
		if (this.has("title"))	 { txt += ("<b>" + this.get("title") + "</b>"); }
		if (this.has("label"))	 { txt += ("<b>" + this.get("label")+ "</b>"); }
		if (this.has("header"))   { txt += ("<b>" + this.get("header") + "</b>"); }
		if (this.has("legend"))	 { txt += ("<b>" + this.get("legend") + "</b>"); }
		if (this.has("text"))	  { txt += ("<b>" + this.get("text") + "</b>"); }
		if (this.has("name"))	  { txt += ("<b>" + this.get("name")+ "</b>"); }
		if (this.has("region"))	{ txt += ("<i>(" + this.get("region") + ")</i>"); }
		if (this.has("dataIndex")){ txt += ("[" + this.get("dataIndex") + "]"); }
		
		// for flat classes...
		//if (typeof(c["*class"]"))!= "undefined")  { txt += ("<b>" +  c["*class"]+  "</b>"); }
		//if (typeof(c["*extends"]"))!= "undefined")  { txt += (": <i>" +  c["*extends"]+  "</i>"); }
		
		
		//if (sr) txt.push('</s>');
		return (txt.length == 0) ? "Element" : string.joinv(" ", txt);
	}

}
