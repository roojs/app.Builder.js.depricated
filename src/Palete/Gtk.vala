namespace Palete {

	
	
	
	
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


	public class Gtk : Palete {
		
		public Gee.ArrayList<string> package_cache;
		
		public Gtk()
		{


		    
		    base();
		    this.name = "Gtk";
		    this.loadPackages();	 
				//this.load();
		    // various loader methods..
		      //this.map = [];
		    //this.load();
		    //this.proplist = {};
		    //this.comments = { }; 
		    // no parent...
		}
	      
		public override void  load () {

			this.loadUsageFile(BuilderApplication.configDirectory() + "/resources/GtkUsage.txt");
	 
		     
		}
		
		public string doc(string what) {
	    		var ns = what.split(".")[0];
	    		var gir =  Gir.factory(ns);
			return   gir.doc(what);
			
		    //return typeof(this.comments[ns][what]) == 'undefined' ?  '' : this.comments[ns][what];
		}

			// does not handle implements...
		public override GirObject? getClass(string ename)
		{

			var es = ename.split(".");
			var gir = Gir.factory(es[0]);
		
			return gir.classes.get(es[1]);
		
		}

		public override Gee.HashMap<string,GirObject> getPropertiesFor(string ename, string type)
		{
			//print("Loading for " + ename);
		    


				// if (typeof(this.proplist[ename]) != 'undefined') {
		        //print("using cache");
			//   return this.proplist[ename][type];
			//}
			// use introspection to get lists..
	 
	    		var es = ename.split(".");
			var gir = Gir.factory(es[0]);
		
			var cls = gir.classes.get(es[1]);
			if (cls == null) {
				var ret = new Gee.HashMap<string,GirObject>();
				return ret;
				//throw new Error.INVALID_VALUE( "Could not find class: " + ename);
			
			}

			//cls.parseProps();
			//cls.parseSignals(); // ?? needed for add handler..
			//cls.parseMethods(); // ?? needed for ??..
			//cls.parseConstructors(); // ?? needed for ??..

			cls.overlayParent();

			switch  (type) {
				case "props":
					return cls.props;
				case "signals":
					return cls.signals;
				case "methods":
					return cls.methods;
				case "ctors":
					return cls.ctors;
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
			 
			var cls = Gir.factoryFqn(ename);
			 
			if (cls == null || cls.nodetype != "Class") {
				print("getInheritsFor:could not find cls: %s\n", ename);
				return ret;
			}
			
			return cls.inheritsToStringArray();
			

		}
         
		public override void fillPack(JsRender.Node node,JsRender.Node parent)
		{   
			
			string inherits =  string.joinv(" ", 
                                      this.getInheritsFor (node.fqn())) + " ";
			inherits += node.fqn() + " ";
			//print ("fillPack:Inherits : %s\n", inherits);
			// parent.fqn() method ( node.fqn()
			var methods = this.getPropertiesFor (parent.fqn(), "methods");
			
			var res = new Gee.HashMap<string,string>();
			var map = methods.map_iterator();
			while (map.next()) {
				
				var n = map.get_key();
				//print ("fillPack:checking method %s\n", n);
				
				var meth = map.get_value();
				if (meth.paramset == null || meth.paramset.params.size < 1) {
					print ("fillPack:c -- no params\n");
				
					continue;
				}
				var fp = meth.paramset.params.get(0);
				
				var type = Gir.fqtypeLookup(fp.type, meth.ns);
				print ("fillPack:first param type is %s\n", type);

				
				if (!inherits.contains(" " + type + " ")) {
					continue;
				}
				
				
				var pack = meth.name;
				for(var i =1; i < meth.paramset.params.size; i++) {
					var ty = Gir.fqtypeLookup(meth.paramset.params.get(i).type, meth.ns);
					pack += "," + Gir.guessDefaultValueForType(ty);
				}

				print ("fillPack:add pack:  --          %s\n",pack );

				res.set(meth.name, pack);
				
				

			}
			if (res.size < 1) {
				return ;
			}
			if (res.has_key("pack_start")) {
				node.props.set("* pack", res.get("pack_start"));
				return;
			}
			if (res.has_key("add")) {
				node.props.set("* pack", res.get("add"));
				return;
			}
			var riter = res.map_iterator();
			while(riter.next()) {
				node.props.set("* pack", riter.get_value());
				return;
			}
			
			
		}
		public Gee.ArrayList<string> packages()
		{
			return this.package_cache;
		}
		
		public void  loadPackages()
		{

			 
			this.package_cache = new Gee.ArrayList<string>();
			var context = new Vala.CodeContext ();
			var dirname =  Path.get_dirname (context.get_vapi_path("glib-2.0"));
			 
			var dir = File.new_for_path(dirname);
			try {
				var file_enum = dir.enumerate_children(
                     			GLib.FileAttribute.STANDARD_DISPLAY_NAME, 
					GLib.FileQueryInfoFlags.NONE, 
					null
				);
		        
		         
				FileInfo next_file; 
				while ((next_file = file_enum.next_file(null)) != null) {
			     		var fn = next_file.get_display_name();
					if (!Regex.match_simple("\\.vapi$", fn)) {
						continue;
					}
		    			this.package_cache.add(Path.get_basename(fn).replace(".vapi", ""));
				}       
   			} catch(Error e) {
				print("oops - something went wrong scanning the packages\n");
			}
			 
			
			 
		}
 
	
    }
}
 
