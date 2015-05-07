
// valac -g  --pkg gee-1.0 --pkg libxml-2.0 --pkg gobject-introspection-1.0 --pkg json-glib-1.0  Palete/Gir.vala -o /tmp/Gir
/* 
public static int main (string[] args) {
    
    var g = Palete.Gir.factory("Gtk");
	var test = g.classes.get("ToolButton");
	
	
    var generator = new Json.Generator ();
    var n = new Json.Node(Json.NodeType.OBJECT);
    n.set_object(test.toJSON());
    generator.set_root(n);
    generator.indent = 4;
    generator.pretty = true;
    
    print(generator.to_data(null));
    return 0;
}
 */
namespace Palete {
 
	public abstract class GirBase : GirObject { 
		
		public abstract void load();
		
		public string doc(string what)
		{
			var ar = what.split(".");
			var cls = this.classes.get(ar[1]);
			if (ar.length == 2) {
				return cls.doctxt != null ? cls.doctxt : "";
			}
			// return the property.. by default..
			var pr = cls.props.get(ar[2]);
			return pr.doctxt != null ? pr.doctxt : "";

		}
	}
    
    
    // Gir - is the libvala based version - 
    
    
	public class Gir : GirBase {
    
		//Gee.Hashmap<string,what> nodes;
		
		public Gir (string ns)
		{
			base("Package",ns);
			this.load();
		}
		public override void  load () 
		{
			// vapi parser....
			
		}
		
		
		/**
		 *  == all static below here...
		 * 
		 */
		public static  Gee.HashMap<string,Gir> cache = null;

		
		public static GirBase?  factory(string ns) {
			if (cache == null) {
				cache = new Gee.HashMap<string,Gir>();
			}
			var ret = cache.get(ns);
			if (ret == null) {

				var add = new Gir(ns);
				
				cache.set(ns, add);
			
				var iter = add.classes.map_iterator();
				while(iter.next()) {
					iter.get_value().overlayParent();
				}
				// loop again and add the ctor properties.
				iter = add.classes.map_iterator();
				while(iter.next()) {
					iter.get_value().overlayCtorProperties();
				}	

				
				ret = cache.get(ns);
			}
			 

			return ret;
			
		}
		public static GirObject?  factoryFqn(string fqn)  
		{       
			var bits = fqn.split(".");
			if (bits.length < 1) {
				return null;
			}
			
			var f = (GirObject)factory(bits[0]);

			if (bits.length == 1 || f ==null) {
				return f;
			}
			return f.fetchByFqn(fqn.substring(bits[0].length+1)); // since classes are stored in fqn format...?
			                    
			
		}

			
		/**
		 * guess the fqn of a type == eg. gboolean or Widget etc...
		 */
		public static string fqtypeLookup(string type, string ns) {
			var g = factory(ns);
			if (g.classes.has_key(type)) {
				return ns + "." + type;
			}
			// enums..
			if (g.consts.has_key(type)) {
				return ns + "." + type;
			}
			
			
			// look at includes..
			var iter = g.includes.map_iterator();
			while(iter.next()) {
				// skip empty namespaces on include..?
				if ( iter.get_key() == "") {
					continue;
				}
				var ret = fqtypeLookup(type, iter.get_key());
				if (ret != type) {
					return ret;
				}
    		}	
			return type;
		}
		


		
		// needed still - where's it called form..
		public static string guessDefaultValueForType(string type) {
			//print("guessDefaultValueForType: %s\n", type);
			if (type.length < 1 || type.contains(".")) {
				return "null";
			}
			switch(type) {
				case "gboolean":
					return "true";
				case "guint":
					return "0";
				case "utf8":
					return "\"\"";
				default:
					return "?"+  type + "?";
			}

		}


		



		 
	}	

        
}
