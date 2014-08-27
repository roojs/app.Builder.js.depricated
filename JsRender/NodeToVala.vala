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
		
	}
	
	
	public string munge ( )
	{
		//return this.mungeToString(this.node);

		this.ignore("pack");
		this.ignore("init");
		
		this.globalVars();
		this.classHeader();
		this.addSingleton();
		this.addTopProperties();
		this.addMyVars();
		this.addPlusProperties();
		this.addValaCtor();
		this.addUnderThis();
		this.addWrappedCtor();
		
		return this.ret;
		var spad = pad.substring(0, this.pad.length-4);
		var str_props = gLibStringListJoin(",\n" + this.pad , this.els) ;
		//print ("STR PROPS: " + str_props);
		
		return   "{\n" +
			this.pad  + str_props + 
			"\n" + spad +  "}";
		     
	} 
	public string mungeChild(string pad ,  Node cnode)
	{
		var x = new  NodeToVala(cnode,  pad, this.top);
		return x.munge();
	}

	public void globalVars()
	{
		if (this.depth > 0) {
			return;
		}
                // Global Vars..
                this.ret += inpad + "public static " + this.xcls + "  " + this.node.name + ";\n\n";
                
                
	}

	void classHeader()
	{
	           
            // class header..
            // class xxx {   WrappedGtk  el; }
            this.ret += inpad + "public class " + this.xcls + " : Object \n" + this.inpad + "{\n";
	    this.ret +=  this.pad + "public " + this.cls + " el;\n");

              
            this.ret + = this.pad + "private " + this.top.xcls + "  _this;\n\n");
            
            
            
            // singleton
	}
	void addSingleton() 
	{
            if (depth > 0) {
		    return;
	    }
            this.ret += pad + "public static " + xcls + " singleton()\n" + 
    			this.pad + "{\n" +
        		this.ipad + "if (" + ??this.name + " == null) {\n");
        		this.ipad + "    " + ??this.name + "= new "+ this.xcls + "();\n" + // what about args?
			this.ipad + "}\n" +
			this.ipad + "return " + ??this.name +";\n" + 
        		this.pad + "}\n"
	}
            

	void addTopProperties()
	{
		if (this.depth > 0) {
			return;
		}
		// properties - global..??

		var iter = this.vitems.map_iterator();
		while(iter.next()) {
			var n = iter.get_value();
			
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
	}
        void addMyVars()
	{
 	       this.ret += "\n" + this.ipad + "// my vars\n";
            
            
    		// Key = TYPE:name
		var iter = this.node.props.map_iterator();
		while (iter.next) {
    			var k = iter.get_key();

			// what are "the private properties with type defs in the new format?
		        if (k[0] != '????') {
		            continue;
		        }
		        
        		var kk = k.substring(1);
                
		        var vv = kk.split(" ");
		        if (vv[0] == 'signal') {
		            this.ret += this.pad + "public " + kk " "  + iter.get_value() + ";\n";
		        } else {
		        
		            this.ret += this.pad + "public " + kk + ";\n";
		        }
			this.skipProp.set(k, true);
			
		        
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
	                this.ret += this.pad + "public " + ci.xvala_xcls + " " + ci.xvala_id.substring(1) + ";\n");
                               
                    
                }
	}

	void addValaCtor()
	{
            
            
            // .vala props.. 
            
    		string[] cargs = {}' 
    		var cargs_str = "";
    		// ctor..
    		this.ret += "\n" + ipad + "// ctor \n";
		if (this.node.has("* args")) {
    		
        		cargs_str = ", " + this.node.get("* args");
        		var ar = this.node.get("* args");.split(",");
        		for (var ari =0; ari < ar.length; ari++) {
            			cargs +=  (ar[ari].trim().split(" ").pop();
                       }
                }
		
    		if (this.depth < 1) {
        		this.ret += this.pad + "public " + this.xcls + "(" + 
				    cargs_str.substring(1) +")\n" + this.pad + "{\n";
		} else {
                
                    //code 
                
			this.ret+= this.pad + "public " + this.xcls + "(" + 
				this.top_xcls + " _owner " + cargs_str + ")\n" + this.pad + "{\n";
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
		

		
				;
            } else if (typeof(ctors[cls]) !== 'undefined') {
                var args = [];
                for(var i =0;i< ctors[cls].length;i++) {
                    
                    var nv = ctors[cls][i].split(':');
                    
                    if (typeof(item[nv[0]]) != 'undefined' && typeof(item[nv[0]]) != 'object' ) {
                        citems[nv[0]] = true;
                        args.push(JSON.stringify(item[nv[0]]));
                        continue;
                    }
                    if (typeof(item['|' + nv[0]]) != 'undefined' && typeof(item['|' + nv[0]]) != 'object' ) {
                        citems[nv[0]] = true;
                        citems['|' + nv[0]] = true;
                        args.push(item['|' + nv[0]]);
                        continue;
                    }
                    args.push(nv.length > 1 ? nv[1] : 'null'); 
                    
                }
                strbuilder(ipad + "this.el = new " + cls + "( "+ args.join(", ") + " );\n" );

            } else {
                this.ret += this.ipad + "this.el = new " + this.cls + "();\n";

            }
	}

	void addInitMyVars()
	{
            //var meths = this.palete.getPropertiesFor(item['|xns'] + '.' + item.xtype, 'methods');
            //print(JSON.stringify(meths,null,4));Seed.quit();
            
             
            
            // initialize.. my vars..
		this.str += "\n" + ipad + "// my vars\n";
		var iter = this.node.props.map_iterator();
		while(iter.next()) {
    			var k = iter.get_key();
			
        		if (k[0] != '.') {
            			continue;
        		}
			
                
        		var kk = k.substring(2);
        		var v = iter.get_value();
        		var vv = kk.split(' ');
        		if (v.length < 1 || vv[0] == "signal") {
            			continue;
        		}       
        		this.ret += this.ipad + "this." + vv[1] + " = " +   v +";\n";
                
    		}
	}
	void addWrappedProperties()
	{
   		var pal = Roo.Palete.factory("Gtk");
            // what are the properties of this class???
  		this.ret += "\n" + this.ipad + "// set gobject values\n";

		var props = pal.getPropertiesFor(this.node.fqn(), "props");
		
            
            
            
    		props.forEach(function(p) {
               
		        if (typeof(citems[p.name]) != 'undefined') {
		            return;
		        }
		             
		        if (typeof(item[p.name]) != 'undefined' && typeof(item[p.name]) != 'object' ) {
		            this.ignore(p.name);
		            
		            var val = JSON.stringify(item[p.name]);
		            if (['xalign','yalign'].indexOf(p.name) > -1) {
		                val +='f';
		            }
		            strbuilder(ipad + "this.el." + p.name + " = " + val + ";\n");
		            return;
		        }
		        if (typeof(item['|' + p.name]) != 'undefined' && typeof(item['|' + p.name]) != 'object' ) {
		            citems['|' + p.name] = true;
		            //if (p.ctor_only ) {
		            //    strbuilder(ipad + "Object(" + p.name + " : " +  item['|' + p.name] + ");\n");
		            //} else {
		                strbuilder(ipad + "this.el." + p.name + " = " +  item['|' + p.name] + ";\n");
		            //}
		            return;
		        }
		       // got a property..
		       
		       
		    });
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
                
            		var ci = iter.get_value();

			if (ci.xvala_id[0] == '*') {
                		continue; // skip generation of children?
            		}
                    
            		var xargs = "";
            		if (ci.has("* args")) {
                        
                		var ar = ci.get("*args").split(',');
                		for (var ari = 0 ; ari < ar.length; ari++ ) {
                    			xargs += "," + ar[ari].trim().split(" ").pop();
                		}
            		}
                    
            		this.ret+== this.ipad + "var child_" + "%d".printf(i) + " = new " + ci.xvala_xcls +
					"( _this " + xargs + ");\n" );
				    
            		this.ret+= this.ipad + "child_" + "%d".printf(i) +".ref();\n"; // we need to reference increase unnamed children...
                    
	                if (ci.has("* prop"])) {
                		this.ret+= ipad + "this.el." + ci.get("* prop") + " = child_" + "%d".printf(i) + ".el;\n";
                		continue
            		}
            	    
            		if (!ci.has("pack") || ci.get("pack") == "false") {
                		continue;
            		}
                    
            		string[]  packing = ci.has("pack") ? ci.get("pack").split(',') : { "add" };
            		
            		var pack = packing[0];
			this.ret += this.ipad + "this.el." + pack + " (  child_" + "%d".printf(i) + ".el " +
                               (packing.length ? ", " + 
                        		string.joinv(",", packing).substr(pack.length+1) : "") + " );\n";
			
                              
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
		
    		this.ret+= this.padMultiline(ipad, this.node.get("init");

         }
	 void addListeners()
	 {
    		if (this.node.listeners.size < 1) {
			return;
		}
			    
            
            
                this.ret+= "\n" + ipad + "// listeners \n";

		var iter = this.listeners.map_iterator();
		while (iter.next()) {
			var k = iter.get_key();
			var v = iter.get_value();
            		this.ret+= this.ipad + "this.el." + k + ".connect( " + this.padMultiline(this.ipad,vv) +");\n"; 
                    
                }
	}    
        void addEndCtor()
	{
            
            
            
    		// end ctor..
    		this.ret+= this.pad + "}\n";
	}
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
                 
        		var vv = iter.get_value();
        		this.ret += this.pad + "public " + k + " " + this.padMultiline(this.ipad, vv) + "\n";
			
                
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
	 
	

}
	
	 
	
	
