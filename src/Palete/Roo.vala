using Gtk;

namespace Palete {

	
/*	
	
	
    public class Introspect.El : Object
    {
        public enum eltype { 
            NS,
            CLASS,
            METHOD,
            PROP
        }
                
            
        public eltype type;
    }

*/
    public class Roo : Palete {
		
		
        public Roo()
        {


            
            base();
            this.name = "Roo";
			  
        }

		Gee.HashMap<string,GirObject> propsFromJSONArray(string type, Json.Array ar)
		{

			var ret = new Gee.HashMap<string,GirObject>();
			
			for (var i =0 ; i < ar.get_length(); i++) {
				var o = ar.get_object_element(i);
				var name = o.get_string_member("name"); 
				var prop = new GirObject(type, name );  
				 
				prop.type        = o.get_string_member("type");
				prop.doctxt  = o.get_string_member("desc");
				prop.propertyof = o.has_member("memberOf") ? o.get_string_member("memberOf") : "";
				prop.sig = o.has_member("sig") ? o.get_string_member("sig") : "";
				
				if (o.has_member("optvals")  ) {
					var oar = o.get_array_member("optvals");
					
					for (var oi = 0; oi < oar.get_length(); oi++) {
						prop.optvalues.add(oar.get_string_element(oi));
					}
					
				}	
				
				
				
				//print(type + ":" + name +"\n");
				ret.set(name,prop);
			}
			return ret;
		}
	 
		public override void  load () {

			if (this.classes != null) {
				return;
			}
			this.loadUsageFile(BuilderApplication.configDirectory() + "/resources/RooUsage.txt");
			this.classes = new Gee.HashMap<string,GirObject>();

				
			var pa = new Json.Parser();
			pa.load_from_file(BuilderApplication.configDirectory() + "/resources/roodata.json");
			var node = pa.get_root();

			var clist =  node.get_object().get_object_member("data");
				clist.foreach_member((o , key, value) => {
				//print("cls:" + key+"\n");
			 
				var cls = new GirObject("class", key);  
				cls.props = this.propsFromJSONArray("prop", value.get_object().get_array_member("props"));
				cls.signals = this.propsFromJSONArray("signal", value.get_object().get_array_member("events"));
				
				this.classes.set(key, cls);
			});
				
				
			
				 
		}
		  
			
		public string doc(string what) {
			return "";
			/*var ns = what.split(".")[0];


			
			
				var gir =  Gir.factory(ns);
				return   gir.doc(what);
				*/
				
			//return typeof(this.comments[ns][what]) == 'undefined' ?  '' : this.comments[ns][what];
		}

		// does not handle implements...
		public override GirObject? getClass(string ename)
		{
			this.load();
			return this.classes.get(ename);
			
		}
		
		public override Gee.HashMap<string,GirObject> getPropertiesFor(string ename, string type)
		{
			//print("Loading for " + ename);
			

			this.load();
					// if (typeof(this.proplist[ename]) != 'undefined') {
					//print("using cache");
				 //   return this.proplist[ename][type];
				//}
				// use introspection to get lists..
		 
			
			var cls = this.classes.get(ename);
			var ret = new Gee.HashMap<string,GirObject>();
			if (cls == null) {
				print("could not find class: %s\n", ename);
				return ret;
				//throw new Error.INVALID_VALUE( "Could not find class: " + ename);
		
			}

			//cls.parseProps();
			//cls.parseSignals(); // ?? needed for add handler..
			//cls.parseMethods(); // ?? needed for ??..
			//cls.parseConstructors(); // ?? needed for ??..

			//cls.overlayParent();

			switch  (type) {
				
				
				case "props":
					return cls.props;
				case "signals":
					return cls.signals;
				case "methods":
					return ret;
				case "ctors":
					return ret;
				default:
					throw new Error.INVALID_VALUE( "getPropertiesFor called with: " + type);
					//var ret = new Gee.HashMap<string,GirObject>();
					//return ret;
			
			}
		
	
		//cls.overlayInterfaces(gir);


			 
		}
		public string[] getInheritsFor(string ename)
		{
			string[] ret = {};
			var es = ename.split(".");
			var gir = Gir.factory(es[0]);
			
			var cls = gir.classes.get(es[1]);
			if (cls == null) {
				return ret;
			}
			return cls.inheritsToStringArray();
			

		}


		public override void fillPack(JsRender.Node node,JsRender.Node parent)
		{   

			 return;
		}
		/*
		 *  Pulldown options for type
		 */
		public override bool typeOptions(string fqn, string key, string type, out string[] opts) 
		{
			opts = {};
			print("get typeOptions %s (%s)%s", fqn, type, key);
			if (type.up() == "BOOL" || type.up() == "BOOLEAN") {
				opts = { "true", "false" };
				return true;
			 }
			 
			 var props = this.getPropertiesFor(fqn, "props");
			 if (!props.has_key(key)) {
				 print("prop %s does not have key %s\n", fqn, key);
				 return false;
			 }
			 var pr = props.get(key);
			 if (pr.optvalues.size < 1) {
				 print("prop %s no optvalues for %s\n", fqn, key);
				 return false;
			 }
			 string[] ret = {};
			 for(var i = 0; i < pr.optvalues.size; i++) {
				 ret += pr.optvalues.get(i);
			 }
			 opts = ret;
			 print("prop %s returning optvalues for %s\n", fqn, key);
			 return true;
			 
		}
		public override  List<SourceCompletionItem> suggestComplete(
				JsRender.JsRender file,
				JsRender.Node node,
				string proptype, 
				string key,
				string complete_string
		) { 
			
			var ret =  new List<SourceCompletionItem>();
			// completion rules??
			
			// Roo......
			
			// this. (based on the node type)
			// this.xxx // Node and any determination...
			
			if (complete_string.index_of(".",0) < 0) {
				// string does not have a '.'
				// offer up this / Roo / javascript keywords... / look for var string = .. in the code..
				for(var i = 0; i <  JsRender.Lang.match_strings.size ; i++) {
					var str = JsRender.Lang.match_strings.get(i);
					if (complete_string != str && str.index_of(complete_string,0) == 0 ) { // should we ignore exact matches... ???
						ret.append(new SourceCompletionItem (str, str, null, "javascript : " + str));
					}
					
					
				}
				if (complete_string != "Roo" && "Roo".index_of(complete_string,0) == 0 ) { // should we ignore exact matches... ???
					ret.append(new SourceCompletionItem ("Roo", "Roo", null, "Roo library"));
				}

				return ret;
			}
			// got at least one ".".
			var parts = complete_string.split(".");
			var curtype = "";
			var cur_instance = false;
			if (parts[0] == "this") {
				// work out from the node, what the type is...
				if (node == null) {
					return ret; // no idea..
				}
				curtype = node.fqn();
				cur_instance = true;
			}
			if (parts[0] == "Roo") {	
				curtype = "Roo";
				cur_instance = false;
			}
			
			var prevbits = parts[0] + ".";
			for(var i =0; i < parts.length; i++) {
				var is_last = i == parts.length -1;
				
				// look up all the properties of the type...
				var cls = this.getClass(curtype);
				if (cls == null) {
					return ret;
				}
				
				if (is_last) {
					if (curtype == "") {
						return ret;
					}
					// get the properties / methods and subclasses.. of cls..
					
					
					
					return ret;
				}
				// only exact matches from here on...
				if (cur_instance) {
					if (cls.props.has_key(parts[i])) {
						var prop = cls.props.get(parts[i]);
						if (prop.type.index_of(".",0) > -1) {
							// type is another roo object..
							currtype = prop.type;
							continue;
						}
						return ret;
					}
					// check methods?? - we do not export that at present..
					return ret;	 //no idea...
				}
				
				// not a instance..
				//look for child classes.
				var citer = this.classes.map_iter();
				while (citer.next()) {
					var scls = citer.get_key();
					var look = prevbits + parts[i];
					if (scls.indexOf(look,0) != 0) {
						continue;
					}
					// got a starting match..
					curtype = look;
					cur_instance = false;
				}
					
				
			}
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			return ret;
		}
    }
}
 
