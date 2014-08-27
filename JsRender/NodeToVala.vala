/**
 * 
 * Code to convert node tree to Javascript...
 * 
 * usage : x = (new JsRender.NodeToJs(node)).munge();
 * 
*/




public class JsRender.NodeToVala : Object {

	 Node node;
	 
	Gee.ArrayList<string> els;
        //Gee.ArrayList<string> skip;
	Gee.HashMap<string,string> ar_props;


	
	public NodeToVala( Node node,  int depth) 
	{
		this.node = node;
		this.doubleStringProps = doubleStringProps;
		this.pad = pad;
		this.els = new Gee.ArrayList<string>(); 
		//this.skip = new Gee.ArrayList<string>();
		this.ar_props = new Gee.HashMap<string,string>();

	}
	string inpad;
	string pad;
	string ipad;
	string cls;
	string xcls;
	




 toValaItem : function(item, depth, strbuilder)
        {
        // print(JSON.stringify(item,null,4));
            
            var inpad = new Array( depth +1 ).join("    ");
            
            var pad = new Array( depth +2 ).join("    ");
            var ipad = new Array( depth +3 ).join("    ");
            
            var cls = item.xvala_cls;
            
            var xcls = item.xvala_xcls;
            
            var citems = {};
            
            if (!depth) {
                // Global Vars..
                strbuilder(inpad + "public static " + xcls + "  " + this.name + ";\n\n");
                 
                
            }
            
            // class header..
            // class xxx {   WrappedGtk  el; }
            strbuilder(inpad + "public class " + xcls + " : Object \n" + inpad + "{\n");
            strbuilder(pad + "public " + cls + " el;\n");
            if (!depth) {
				this.top_xcls = xcls;
			}
            strbuilder(pad + "private " + this.top_xcls + "  _this;\n\n");
            //}
            
            
            // singleton
            
            if (!depth) {
                strbuilder(pad + "public static " + xcls + " singleton()\n");
                strbuilder(pad + "{\n");
                strbuilder(ipad + "if (" + this.name + " == null) {\n");
                strbuilder(ipad + "    " + this.name + "= new "+ xcls + "();\n"); // what about args?
                strbuilder(ipad + "}\n");
                strbuilder(ipad + "return " + this.name +";\n");
                strbuilder(pad + "}\n");
                
            }
            
            
            // properties - global..??
                
                //public bool paused = false;
                //public static StatusIconA statusicon;
            if (!depth) {
                //strbuilder(pad + "public static " + xcls + "  _this;\n");
                for(var i=1;i < this.vitems.length; i++) {
                    if (this.vitems[i].xvala_id  === false) {
                        continue;
                        
                    }
                    if (this.vitems[i].xvala_id[0] == '*') {
                        continue;
                    }
                    if (this.vitems[i].xvala_id[0] == '+') {
                        continue;
                    }
                    strbuilder(pad + "public " + this.vitems[i].xvala_xcls + " " + this.vitems[i].xvala_id + ";\n");
                }
                
            }
            
            strbuilder("\n" + ipad + "// my vars\n");
            
            
            // Key = TYPE:name
            for (var k in item) {
                
                
                if (k[0] != '.') {
                   
                    continue;
                }
                if (k == '.ctor') {
                    continue; 
                }
                
                var kk = k.substring(1);
                
                var vv = kk.split(':');
                if (vv[0] == 'signal') {
                    strbuilder(pad + "public " + vv[0] + " " + vv[1] + " " + vv[2] + item[k] + ";\n");
                } else {
                
                    strbuilder(pad + "public " + vv[0] + " " + vv[1] + ";\n");
                }
                citems[k] = true; 
                
            }
            // if id of child is '+' then it's a property of this..
            
            if (typeof(item.items) != 'undefined') {
                for(var i =0;i<item.items.length;i++) {
                    var ci = item.items[i];
                    if (ci.xvala_id[0] != '+') {
                        continue; // skip generation of children?
                        
                    }
                    strbuilder(pad + "public " + ci.xvala_xcls + " " + ci.xvala_id.substring(1) + ";\n");
                               
                    
                }
            }
            
            
            
            // .vala props.. 
            
            var cargs = []; 
            var cargs_str = '';
            // ctor..
            strbuilder("\n" + ipad + "// ctor \n");
            if (typeof(item['*args']) != 'undefined') {
                cargs_str = ", " + item['*args']
                var ar = item['*args'].split(",");
                for (var ari =0; ari < ar.length; ari++) {
                    cargs.push(ar[ari].trim().split(" ").pop());
                }
                    
            }
            
			if (!depth) {
        		strbuilder(pad + "public " + xcls + "(" + cargs_str.substring(1) +")\n" + pad + "{\n");
			} else {
                
                    //code 
                
				strbuilder(pad + "public " + xcls + "(" + this.top_xcls + " _owner " + cargs_str + ")\n" + pad + "{\n");
			}
            
            
            
            // public static?
            if (!depth) {
                strbuilder(ipad + "_this = this;\n");
                //strbuilder(ipad + this.name  + " = this;\n");
            } else {
                strbuilder(ipad + "_this = _owner;\n");
                if (item.xvala_id !== false && item.xvala_id[0] != '*' && item.xvala_id[0] != '+' ) {
                    strbuilder(ipad + "_this." + item.xvala_id  + " = this;\n");
                   
                }
                
                
            }
            
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
            if (typeof(item['.ctor']) != 'undefined') {
                strbuilder(ipad + "this.el = " + item['.ctor']+ ";\n" );
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
                strbuilder(ipad + "this.el = new " + cls + "();\n" );

            }
            //var meths = this.palete.getPropertiesFor(item['|xns'] + '.' + item.xtype, 'methods');
            //print(JSON.stringify(meths,null,4));Seed.quit();
            
             
            
            // initialize.. my vars..
            strbuilder("\n" + ipad + "// my vars\n");
            for (var k in item) {
                if (k[0] != '.') {
                    continue;
                }
                if (k == '.ctor') {
                    continue; 
                }
                
                var kk = k.substring(1);
                var v = item[k];
                var vv = kk.split(':');
                if (v.length < 1 || vv[0] == "signal") {
                    continue;
                }
                strbuilder(ipad + "this." + vv[1] + " = " +   v +";\n");
                
            }
           
           
            // what are the properties of this class???
            strbuilder("\n" + ipad + "// set gobject values\n");
            var props = this.palete.getPropertiesFor(item['|xns'] + '.' + item.xtype, 'props');
            
            
            
            props.forEach(function(p) {
               
                if (typeof(citems[p.name]) != 'undefined') {
                    return;
                }
                     
                if (typeof(item[p.name]) != 'undefined' && typeof(item[p.name]) != 'object' ) {
                    citems[p.name] = true;
                    
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
                //code
            // add all the child items.. 
            if (typeof(item.items) != 'undefined') {
                for(var i =0;i<item.items.length;i++) {
                    var ci = item.items[i];
                    if (ci.xvala_id[0] == '*') {
                        continue; // skip generation of children?
                    }
                    
                    var xargs = "";
                    if (typeof(ci['*args']) != 'undefined') {
                        
                        var ar = ci['*args'].split(',');
                        for (var ari = 0 ; ari < ar.length; ari++ ) {
                            xargs += "," + ar[ari].trim().split(" ").pop();
                        }
                    }
                    
                    strbuilder(ipad + "var child_" + i + " = new " + ci.xvala_xcls + "( _this " + xargs + ");\n" );
                    strbuilder(ipad + "child_" + i +".ref();\n" ); // we need to reference increase unnamed children...
                    
                    if (typeof(ci['*prop']) != 'undefined') {
                        strbuilder(ipad + "this.el." + ci['*prop'] + " = child_" + i + ".el;\n" );
                        continue
                    }
                    
                    if (ci.pack === false || ci.pack == "false") {
                        continue;
                    }
                    
                    var packing = ci.pack ? ci.pack.split(',') : [ 'add' ];
                    if (typeof(ci['|pack']) != 'undefined') {
                        packing =ci['|pack'].split(',');
                    }
                    var pack = packing.shift();
                    
                    
                    strbuilder(ipad + "this.el." + pack + " (  child_" + i + ".el " +
                               (packing.length ? ", " + packing.join(",") : "") + " );\n"
                            );
                              
                    if (ci.xvala_id[0] != '+') {
                        continue; // skip generation of children?
                        
                    }
                    strbuilder(ipad + "this." + ci.xvala_id.substring(1) + " =  child_" + i +  ";\n");
                          
                }
            }
            if (typeof(item['|init']) != 'undefined') {
                
                
                    var v = item['|init']
                    if (v.length > 1) {
                        strbuilder("\n" + ipad + "// init method \n");            
                         var vv = v;
                         //print(JSON.stringify(vv));Seed.quit();
                         vv = vv.replace(/^\n+/,'');
                         vv = vv.replace(/\n+$/,'');
                         vv = vv.replace(/\n/g,"\n" + ipad);
                         strbuilder(ipad + vv  + "\n");
                    }
            }
            
            citems['|pack'] = true;
            citems['|items'] = true;
            citems['|init'] = true;
            
            if (item.listeners) {
            //    print(JSON.stringify(item.listeners));Seed.quit();
            
                strbuilder("\n" + ipad + "// listeners \n");  
                // add all the signal handlers..
                for (var k in item.listeners) {
                    
                    
                    var v = item.listeners[k] ;
                    
                    var vv = v.replace(/\n/g,"\n" + ipad);
                        
                        
                    
                    strbuilder(ipad + "this.el." + k + ".connect( " + vv  + " );\n");
                    
                }
            }    
                
            
            
            
            // end ctor..
            strbuilder(pad + "}\n");
            
            
            strbuilder("\n" + pad + "// userdefined functions \n");  
            
            // user defined functions...
            
            for (var k in item) {
                if (typeof(citems[k]) != 'undefined') {
                    //strbuilder("\n" + pad + "// skip " + k + " - already used \n"); 
                    continue;
                }
                if (k[0] != '|') {
                     //strbuilder("\n" + pad + "// skip " + k + " - not pipe \n"); 
                    continue;
                }
                // function in the format of {type} (args) { .... }
                 
                var vv = item[k];
                //print(JSON.stringify(vv));Seed.quit();
                vv = vv.replace(/^\n+/,'');
                vv = vv.replace(/\n+$/,'');
                vv = vv.replace(/\n/g,"\n" + ipad);
                
                var vva = k.split(':');
                if (vva.length  < 2) {
                    strbuilder("\n" + pad + "// skip " + k + " - no return type\n"); 
                    continue;
                }
                var rtype = vva.shift().substring(1);
                var body = vv;
                var fname = vva.shift() || '???';
                
                strbuilder(pad + "public " + rtype + " " + fname + body + "\n");
                
                
                
            }
            
            
            
            if (depth > 0) {
                strbuilder(inpad + "}\n");
            }
            
            
            // next loop throug children..
            if (typeof(item.items) != 'undefined') {
                for(var i =0;i<item.items.length;i++) {
                    this.toValaItem(item.items[i], 1, strbuilder);
                }
            }
            if (depth < 1) {
                strbuilder(inpad + "}\n");
            }
            
        }












	
	public string munge ( )
	{
		//return this.mungeToString(this.node);

		this.checkChildren();
		this.readProps();
		this.readArrayProps();
		this.readListeners();
		this.iterChildren();
		
		if (this.els.size < 1) {
			return "";
		}
		// oprops...	
			
		var spad = pad.substring(0, this.pad.length-4);
		var str_props = gLibStringListJoin(",\n" + this.pad , this.els) ;
		//print ("STR PROPS: " + str_props);
		
		return   "{\n" +
			this.pad  + str_props + 
			"\n" + spad +  "}";
		     
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
		var x = new  NodeToVala(cnode,  pad);
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
				this.els.add( prop  + " : " + this.mungeChild (  this.pad + "    ",  pl));
				
				
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
			nstr += this.mungeChild( this.pad + "	        ",   pl);
			
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
		try {
			func_regex = new Regex("^\\s+|\\s+$");
		} catch (Error e) {
			print("failed to build regex");
			return;
		}
		var piter = this.node.props.map_iterator();
		while (piter.next() ) {
			var kk = piter.get_key().split(" ");
			var v = piter.get_value();
			var k = kk[kk.length-1];

			
			//if (this.skip.contains(k) ) {
			//	continue;
			//}
			if (  Regex.match_simple("\\[\\]$", k)) {
				
				

			}
			
			string leftv = k;
			// skip builder stuff. prefixed with  '.' .. just like unix fs..
			if (kk[0][0] == '.') { // |. or . -- do not output..
				continue;
			}
			 if (kk[0][0] == '*') {
				// ignore '*prop';
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
				kk[0][0] == '|' 
				|| 
				kk[0][0] == '$' 
				|| 
				kk[0] == "function"
	   		       
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
				kk[0].down() == "boolean"
    	   		        || 
				kk[0].down() == "bool"
				|| 
				kk[0].down() == "number"
				|| 
				kk[0].down() == "int"
			    ) { // boolean or number...?
				this.els.add(left + v.down() );
				continue;
			}
			
			// strings..
			if (this.doubleStringProps.size < 1) {
				this.els.add(left + this.node.quoteString(v));
				continue;
			}
		   
			if (this.doubleStringProps.index_of(k) > -1) {
				els.add(left + this.node.quoteString(v));
				continue;
			}
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
				this.els.add(left + "[\n" +  this.pad + "	 " +  right + "\n" + this.pad + "]");
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
				str = string.joinv("\n" + this.pad + "	   ", lines);
			}
			

			
			itms +=  this.pad + "	"  + liter.get_key().replace("|", "")  + " : " + str;

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
			itms +=	this.pad + "	"  +
				this.mungeChild( this.pad + "        ",  ele);
			
			
		}
		itms +=  "\n"+  this.pad + "]"  + "\n";
		this.els.add(itms);
	}

		// finally output listeners...
		
	

}
	
	 
	
	
