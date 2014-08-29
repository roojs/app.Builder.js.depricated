/**
 * 
 * Code to convert node tree to Javascript...
 * 
 * usage : x = (new JsRender.NodeToJs(node)).munge();
 * 
*/




public class JsRender.NodeToVala : Object {

	 Node node;

	int depth;
	string inpad;
	string pad;
	string ipad;
	string cls;
	string xcls;
	
	string ret;

	Gee.ArrayList<string> ignoreList; 
	GLib.List<Node> vitems; // top level items
	NodeToVala top;
	
	public NodeToVala( Node node,  int depth, NodeToVala? top) 
	{
		this.node = node;
		this.depth = depth;
		this.inpad = string.nfill(depth*4, ' ');
		this.pad = this.inpad + "    ";
		this.ipad = this.inpad + "        ";
		this.cls = node.xvala_cls;
		this.xcls = node.xvala_xcls;
		this.ret = "";
		this.top = top == null ? this : top;
		this.ignoreList = new Gee.ArrayList<string>();
		this.vitems = new GLib.List<Node>();
	}

	public int vcnt = 0;
	string toValaNS(Node item)
        {
            var ns = item.get("xns") ;
            //if (ns == "GtkSource") {
                //return "Gtk.Source.";
            //}
            return ns + ".";
        }
	public void  toValaName(Node item) 
	{
    		this.vcnt++;

		var cls = this.toValaNS(item) + item.get("xtype");

		string id = item.get("id").length > 0 ?
			item.get("id") :  "%s%d".printf(item.get("xtype"), this.vcnt);

		item.xvala_cls = cls;
		item.xvala_xcls = "Xcls_" + id;
		item.xvala_id =  id;
				                                               
		this.vitems.append(item);  
		// loop children..
				                                               
		if (item.items.size < 1) {
			return;
		}
		for(var i =0;i<item.items.size;i++) {
			this.toValaName(item.items.get(i));
		}
			          
        }

	public static string mungeFile(JsRender file) 
	{
		var n = new NodeToVala(file.tree, 0, null);
		n.vcnt = 0;
		
		n.toValaName(file.tree);
		
		
		print("top cls %s / xlcs %s\n ",file.tree.xvala_cls,file.tree.xvala_cls); 
		n.cls = file.tree.xvala_cls;
		n.xcls = file.tree.xvala_xcls;
		return n.munge();
		

	}
	
	public string munge ( )
	{
		//return this.mungeToString(this.node);

		this.ignore("pack");
		this.ignore("init");
		this.ignore("xns");
		this.ignore("xtype");

		
		this.globalVars();
		this.classHeader();
		this.addSingleton();
		this.addTopProperties();
		this.addMyVars();
		this.addPlusProperties();
		this.addValaCtor();
		this.addUnderThis();
		this.addWrappedCtor();

		this.addInitMyVars();
		this.addWrappedProperties();
		this.addChildren();
		this.addInit();
		this.addListeners();
		this.addEndCtor();
		this.addUserMethods();
		this.iterChildren();
		
		return this.ret;
		 
		     
	} 
	public string mungeChild(  Node cnode)
	{
		var x = new  NodeToVala(cnode,  this.depth+1, this.top);
		return x.munge();
	}

	public void globalVars()
	{
		if (this.depth > 0) {
			return;
		}
                // Global Vars..
                //this.ret += this.inpad + "public static " + this.xcls + "  " + this.node.xvala_id+ ";\n\n";

		
		this.ret += this.inpad + "static " + this.xcls + "  _" + this.node.xvala_id+ ";\n\n";
                
                
	}

	void classHeader()
	{
	           
            // class header..
            // class xxx {   WrappedGtk  el; }
            this.ret += inpad + "public class " + this.xcls + " : Object \n" + this.inpad + "{\n";
	    this.ret +=  this.pad + "public " + this.cls + " el;\n";

              
            this.ret += this.pad + "private " + this.top.xcls + "  _this;\n\n";
            
            
            
            // singleton
	}
	void addSingleton() 
	{
            if (depth > 0) {
		    return;
	    }
            this.ret += pad + "public static " + xcls + " singleton()\n" + 
    			this.pad + "{\n" +
        		this.ipad + "if (_" + this.node.xvala_id  + " == null) {\n" +
        		this.ipad + "    _" + this.node.xvala_id + "= new "+ this.xcls + "();\n" + // what about args?
			this.ipad + "}\n" +
			this.ipad + "return _" + this.node.xvala_id +";\n" + 
        		this.pad + "}\n";
	}
            

	void addTopProperties()
	{
		if (this.depth > 0) {
			return;
		}
		// properties - global..??

		var iter = this.node.items.list_iterator();
		while(iter.next()) {
			var n = iter.get();
			
            		if (n.xvala_id.length < 0) {
                		continue;
                        
            		}
            		if (n.xvala_id[0] == '*') {
                		continue;
            		}
            		if (n.xvala_id[0] == '+') {
                		continue;
            		}
             		this.ret += this.pad + "public " + n.xvala_xcls + " " + n.xvala_id + ";\n";
                }
                
	}
	 
        void addMyVars()
	{
 		this.ret += "\n" + this.pad + "// my vars\n";
            

 
   		var cls = Palete.Gir.factoryFqn(this.node.fqn());
           
		
	 






		
    		// Key = TYPE:name
		var iter = this.node.props.map_iterator();
		while (iter.next()) {
    			var k = iter.get_key();
			if (this.shouldIgnore(k)) {
				continue;
			}

			
		        var vv = k.split(" ");
		        if (vv[0] == "@") {
		    		this.ret += this.pad + "public signal" + k.substring(1)  + " "  + iter.get_value() + ";\n";
				this.ignore(k);
				continue;
		        } 
			var kname = vv[vv.length-1];

			if (this.shouldIgnore(kname)) {
				continue;
			}
			
			// is it a class property...
			if (cls.props.has_key(vv[vv.length-1])) {
				continue;
			}
			

			
			    
			this.ret += this.pad + "public " + 
				(k[0] == '$' ? k.substring(2) : k ) + ";\n";
		        
			this.ignore(k);
			
		        
		}
	}
	
            // if id of child is '+' then it's a property of this..
        void addPlusProperties()
	{
      		if (this.node.items.size < 1) {
		      return;
		}
		var iter = this.node.items.list_iterator();
		while (iter.next()) {
			var ci = iter.get();
                    
            		if (ci.xvala_id[0] != '+') {
                		continue; // skip generation of children?
                        
            		}
	                this.ret += this.pad + "public " + ci.xvala_xcls + " " + ci.xvala_id.substring(1) + ";\n";
                               
                    
                }
	}

	void addValaCtor()
	{
            
            
            // .vala props.. 
            
    		string[] cargs = {};
    		var cargs_str = "";
    		// ctor..
    		this.ret += "\n" + this.pad + "// ctor \n";
		if (this.node.has("* args")) {
    			// not sure what this is supposed to be ding..
			
        		cargs_str = ", " + this.node.get("* args");
        		//var ar = this.node.get("* args");.split(",");
        		//for (var ari =0; ari < ar.length; ari++) {
            		//	cargs +=  (ar[ari].trim().split(" ").pop();
                      // }
                }
		
    		if (this.depth < 1) {
        		this.ret += this.pad + "public " + this.xcls + "(" + 
				    cargs_str +")\n" + this.pad + "{\n";
		} else {
                
                    //code 
                
			this.ret+= this.pad + "public " + this.xcls + "(" + 
				this.top.xcls + " _owner " + cargs_str + ")\n" + this.pad + "{\n";
		}
            

	}
	void addUnderThis()
	{
            // public static?
    		if (depth < 1) {
			this.ret += this.ipad + "_this = this;\n";
			return;
		}
		this.ret+= this.ipad + "_this = _owner;\n";

		if (this.node.xvala_id != "" && this.node.xvala_id[0] != '*' && this.node.xvala_id[0] != '+' ) {
    			this.ret+= this.ipad + "_this." + node.xvala_id  + " = this;\n";
           
		}
                
                
   
	}

	void addWrappedCtor()
	{
		// wrapped ctor..
		// this may need to look up properties to fill in the arguments..
		// introspection does not workk..... - as things like gtkmessagedialog
		/*
		if (cls == 'Gtk.Table') {

		var methods = this.palete.getPropertiesFor(cls, 'methods');

		print(JSON.stringify(this.palete.proplist[cls], null,4));
		Seed.quit();
		}
		*/
		if (this.node.has("* ctor")) {
			
            
        		this.ret +=  this.ipad + "this.el = " + this.node.get("* ctor")+ ";\n";
			return;
		}
		// the ctor arguments...

		// see what the 
		var default_ctor = Palete.Gir.factoryFqn(this.node.fqn() + ".new");
		if (default_ctor.paramset != null && default_ctor.paramset.params.size > 0) {
			string[] args  = {};
			var iter =default_ctor.paramset.params.list_iterator();
			while (iter.next()) {
				var n = iter.get().name;
				if (!this.node.has(n)) {
					args += "null";
					continue;
				}
				this.ignore(n);
				args += this.node.get(n);

			}
			this.ret += this.ipad + "this.el = new " + cls + "( "+ string.joinv(", ",args) + " );\n" ;

		}
		
		
                this.ret += this.ipad + "this.el = new " + this.cls + "();\n";

            
	}

	void addInitMyVars()
	{
            //var meths = this.palete.getPropertiesFor(item['|xns'] + '.' + item.xtype, 'methods');
            //print(JSON.stringify(meths,null,4));Seed.quit();
            
     		var cls = Palete.Gir.factoryFqn(this.node.fqn());
            
            // initialize.. my vars..
		this.ret += "\n" + this.pad + "// my vars\n";
		var iter = this.node.props.map_iterator();
		while(iter.next()) {
    			var k = iter.get_key();
			
        		var ar  = k.strip().split(" ");
			var kname = ar[ar.length-1];
			if (cls.props.has_key(kname)) {
				continue;
			}
                
        		var v = iter.get_value();
			// ignore signals.. 
        		if (v.length < 1 || ar[0] == "@") {
            			continue;
        		}
			// if it's a string...
			
        		this.ret += this.ipad + "this." + kname + " = " +   v +";\n";
    		}
	}

	


	
	void addWrappedProperties()
	{
   		var cls = Palete.Gir.factoryFqn(this.node.fqn());
            // what are the properties of this class???
  		this.ret += "\n" + this.ipad + "// set gobject values\n";

		var iter = cls.props.map_iterator();
		while (iter.next()) {
			var p = iter.get_key();
			if (!this.node.has(p)) {
				continue;
			}
	     		this.ignore(p);
			var v = this.node.get(p);

			// what's the type.. - if it's a string.. then we quote it..
			if (iter.get_value().type == "utf8") {
				 v = "\"" +  v.escape("") + "\"";
			}

			
			this.ret += ipad + "this.el." + p  + " = " + v + ";\n";
		            
		       // got a property..
		       

		}
	    
	}

	void addChildren()
	{
                //code
		if (this.node.items.size < 1) {
			return;
		}
             
    		var iter = this.node.items.list_iterator();
		var i = -1;
		while (iter.next()) {
			i++;
                
            		var ci = iter.get();

			if (ci.xvala_id[0] == '*') {
                		continue; // skip generation of children?
            		}
                    
            		var xargs = "";
            		if (ci.has("* args")) {
                        
                		var ar = ci.get("*args").split(",");
                		for (var ari = 0 ; ari < ar.length; ari++ ) {
                    			xargs += "," + ar[ari]; //.trim().split(" ").pop();
                		}
            		}
                    
            		this.ret += this.ipad + "var child_" + "%d".printf(i) + " = new " + ci.xvala_xcls +
					"( _this " + xargs + ");\n" ;
				    
            		this.ret+= this.ipad + "child_" + "%d".printf(i) +".ref();\n"; // we need to reference increase unnamed children...
                    
	                if (ci.has("* prop")) {
                		this.ret+= ipad + "this.el." + ci.get("* prop") + " = child_" + "%d".printf(i) + ".el;\n";
                		continue;
            		}
            	    
            		if (!ci.has("pack") || ci.get("pack") == "false") {
                		continue;
            		}
                    
            		string[]  packing =  { "add" };
			if (ci.has("pack")) {
				packing = ci.get("pack").split(",");
			}
            		
            		var pack = packing[0];
			this.ret += this.ipad + "this.el." + pack + " (  child_" + "%d".printf(i) + ".el " +
                               (packing.length > 0 ? 
                        		(", " + string.joinv(",", packing).substring(pack.length+1))
                 			:
	                                ""
                                ) + " );\n";
			
                              
            		if (ci.xvala_id[0] != '+') {
                		continue; // skip generation of children?
		                        
            		}
            		this.ret+= this.ipad + "this." + ci.xvala_id.substring(1) + " =  child_" + "%d".printf(i) +  ";\n";
                          
		}
	}

	void addInit()
	{

	    
    		if (!this.node.has("init")) {
			    return;
		}
    		this.ret+= "\n" + ipad + "// init method \n";
		
    		this.ret+= this.padMultiline(ipad, this.node.get("init"));

         }
	 void addListeners()
	 {
    		if (this.node.listeners.size < 1) {
			return;
		}
			    
            
            
                this.ret+= "\n" + ipad + "// listeners \n";

		var iter = this.node.listeners.map_iterator();
		while (iter.next()) {
			var k = iter.get_key();
			var v = iter.get_value();
            		this.ret+= this.ipad + "this.el." + k + ".connect( " + 
					this.padMultiline(this.ipad,v) +");\n"; 
                    
                }
	}    
        void addEndCtor()
	{
            
            
            
    		// end ctor..
    		this.ret+= this.pad + "}\n";
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
	 
	void addUserMethods()
	{
            
  		this.ret+= "\n" + pad + "// userdefined functions \n";  
            
    		// user defined functions...
   		var iter = this.node.props.map_iterator();
		while(iter.next()) {
    			var k = iter.get_key();
			if (this.shouldIgnore(k)) {
				continue;
			}
			// HOW TO DETERIME if its a method?            
        		if (k[0] != '|') {
             			//strbuilder("\n" + pad + "// skip " + k + " - not pipe \n"); 
            			continue;
			}       
        		// function in the format of {type} (args) { .... }
         		var kk = k.substring(2);
        		var vv = iter.get_value();
        		this.ret += this.pad + "public " + kk + " " + this.padMultiline(this.ipad, vv) + "\n";
			
                
            }
	}

	void iterChildren()
	{
            
    		if (this.depth > 0) {
			this.ret+= this.inpad + "}\n";
    		}
		
		var iter = this.node.items.list_iterator();
		var i = -1;
		while (iter.next()) {
    			this.ret += this.mungeChild(iter.get());
		}
             
    		if (this.depth < 1) {
        		this.ret+= this.inpad + "}\n";
    		}
            
        }

	string padMultiline(string pad, string str)
	{
		return str;
	}
	
	void ignore(string i) {
		this.ignoreList.add(i);
		
	}
	bool shouldIgnore(string i)
	{
		return ignoreList.contains(i);
	}
	

}
	
	 
	
	


