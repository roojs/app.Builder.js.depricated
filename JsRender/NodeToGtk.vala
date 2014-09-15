/*

 
*/
public class JsRender.NodeToGtk : Object {

	Node node;
 	Object wrapped_object; 
	Gee.ArrayList<string> els;
        //Gee.ArrayList<string> skip;
	Gee.HashMap<string,string> ar_props;
	public static int vcnt = 0; 

	public NodeToGtk( Node node) 
	{
		this.node = node;
 		this.els = new Gee.ArrayList<string>(); 
		//this.skip = new Gee.ArrayList<string>();
		this.ar_props = new Gee.HashMap<string,string>();

	}
	
	public Object? munge ( )
	{

		 return this.mungeNode (null);
		 
		     
	}
	public Object? mungeChild(  Node cnode)
	{
		var x = new  NodeToGtk(cnode);
		return x.mungeNode(this);
	}
	
	public Object? mungeNode(Object? parentObj)
	{

		var parent = parent != null ? parent.wrapped_object : null;
		var cls = this.node.fqn().replace(".", "");
		var ns = this.node.fqn().split(".")[0];
		var gtkbuilder = new global::Gtk.Builder();

		var cls_gtype = gtkbuilder.get_type_from_name(cls);
		print("Type: %s ?= %s\n", this.node.fqn(), cls_gtype.name());

		if (cls_gtype == GLib.Type.INVALID) {
			print("SKIP - gtype is invalid\n");
			return null;
		}
		// if it's a window... 

		if (cls_gtype.is_a(typeof(global::Gtk.Window))) {
			// what if it has none...
			if (this.node.items.size < 1) {
				return null;
			}
			return this.mungeChild(this.node.items.get(0));
		}

		var ret = Object.new(cls_gtype);
		ret.ref(); //??? problematic?
		this.wrapped_object = ret;
		
		 
		switch(cls) {
			// fixme
			case "GtkTreeStore": // top level.. - named and referenced
			case "GtkListStore": // top level.. - named and referenced
			case "GtkTreeViewColumn": // part of liststore?!?!
			case "GtkMenu": // top level..
			case "GtkCellRendererText":
			case "GtkSourceBuffer":				
			case "GtkClutterActor"://fixme..
			///case "GtkClutterEmbed"://fixme..
				return null;
		}


		var do_pack =true;
		
		if (!cls_gtype.is_a(typeof(global::Gtk.Buildable))) {
			print("skipping pack  %s is not a buildable..\n", cls);
			do_pack = false;
		}
		if (parent == null) {
			//print("skipping pack  %s is not a buildable..\n", cls);
			do_pack = false;
		} else  if (!parent.get_type().is_a(typeof(global::Gtk.Buildable))) {
			print("skipping pack parent:%s is not a buildable..\n", parent.get_type().name());
			do_pack = false;
		}

		// at present we are setting the packing / fill / expand as
		// arguments to pack_start etc...
		
		var parent_gir = parentObject == null ? null : Palete.Gir.factoryFqn(parentObject.node.fqn()); 
		
		// let's test just setting expand to false...
		var cls_methods = parent_gir == null ? null : parent_gir.methods;

		// pack on a container..
		
		if (do_pack) {
			((global::Gtk.Buildable)parent).add_child(gtkbuilder, ret, null);
		}

		if  (do_pack && 
				this.node.props.has_key("* pack") 
				&& 
				parent.get_type().is_a(typeof(global::Gtk.Container))) {
			var pack = this.node.props.get("* pack").split(",");

			
			if (cls_methods.has_key(pack[0])) {
				var mparams = cls_methods.get(pack[0]).paramset.params;
				for (var i = 1; i < mparams.size; i++ ) {
					if (i > (pack.length -1)) {
						continue;
					}
					
					var k = mparams.get(i).name;

					Value cur_val;
					 
					var type = mparams.get(i).type;
					type = Palete.Gir.fqtypeLookup(type, ns);

					var val = this.toValue(pack[i].strip(), type);
					if (val == null) {
						print("skip (failed to transform value %s type = %s from %s\n", 
							cls + "." + k, type, pack[i].strip());
						continue;
					}
					print ("pack:set_property ( %s , %s / %s)\n", k, pack[i].strip(), val.strdup_contents());
			
					((global::Gtk.Container)parent).child_set_property((global::Gtk.Widget)ret, k, val);
					 
				}
				
			}
			


			
		}
		   

		var cls_gir =Palete.Gir.factoryFqn(this.node.fqn()); 
		
		//var id = this.node.uid();
		//var ret = @"$pad<object class=\"$cls\" id=\"$id\">\n";
		// properties..
		var props = cls_gir.props;
		
              
    		var pviter = props.map_iterator();
		while (pviter.next()) {
			
				// print("Check: " +cls + "::(" + pviter.get_value().propertyof + ")" + pviter.get_key() + " " );
			var k = pviter.get_key();
        		// skip items we have already handled..
        		if  (!this.node.has(k)) {
				continue;
			}
			// find out the type of the property...
			var type = pviter.get_value().type;
			type = Palete.Gir.fqtypeLookup(type, ns);

			var val = this.toValue(this.node.get(k).strip(), type);
			if (val == null) {
				print("skip (failed to transform value %s type = %s from %s\n", 
					cls + "." + k, type,  this.node.get(k).strip());
				continue;
			}
			print ("set_property ( %s , %s / %s)\n", k, this.node.get(k).strip(), val.strdup_contents());
			
			
			ret.set_property(k, val);  
			

                }
		// packing???
		// for now... - just try the builder style packing
		
		
		 
		if (this.node.items.size < 1) {
			return ret;
		}
		
		for (var i = 0; i < this.node.items.size; i++ ) {

			 this.mungeChild(this.node.items.get(i));
			 
		}
		
		return ret;
		

		 

	}

	public GLib.Value? toValue(string val, string type) {

		var gtkbuilder = new global::Gtk.Builder();

		if (type == "utf8") {
			var qret = new GLib.Value(typeof(string));
			qret.set_string(val);
			return qret;
		}
		
		var prop_gtype = gtkbuilder.get_type_from_name(type);
		

		if (prop_gtype == GLib.Type.INVALID) {
			 
			return null;
		}
		
		
		var ret = new GLib.Value(prop_gtype);


		switch(type) {
			case "gboolean":
				ret.set_boolean(val.down() == "false" ? false : true);
				return ret;
			case "guint":
				ret.set_uint(int.parse(val));
				return ret;
				
			case "gint":
				ret.set_int(int.parse(val));
				return ret;

			case "gfloat":
				ret.set_float(long.parse(val));
				return ret;
				
			case "utf8":
				ret.set_string(val);
				return ret;

			default:

				var sval =new GLib.Value(typeof(string));
				sval.set_string(val);
			
				if (!sval.transform(ref ret)) {
				
					return null;
				}
				return ret;
		}
	}
	
	 
	  
		
}