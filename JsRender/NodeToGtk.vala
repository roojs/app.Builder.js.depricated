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
		return x.mungeNode(this.wrapped_object);
	}
	
	public Object? mungeNode(Object? parent)
	{
		 
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

		
		//var id = this.node.uid();
		//var ret = @"$pad<object class=\"$cls\" id=\"$id\">\n";
		// properties..

		var props = Palete.Gir.factoryFqn(this.node.fqn()).props;
		
              
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
			
			var prop_gtype = gtkbuilder.get_type_from_name(type);

			if (prop_gtype == GLib.Type.INVALID) {
				print("skip %s type = %s  = no gtype\n", cls + "." + k, type);
				continue;
			}
			var sval =new GLib.Value(typeof(string));
			sval.set_string(this.node.get(k).strip());
			var val = new GLib.Value(prop_gtype);
			if (!sval.transform(ref val)) {
				print("skip (failed to transform value %s type = (%s:%s)  from %s\n", 
					cls + "." + k, type, prop_gtype.name(), this.node.get(k).strip());
				continue;
			}
			
			ret.set_property(k, val);  
			

                }
		// packing???
		// for now... - just try the builder style packing
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
		
		if (do_pack) {
			((global::Gtk.Buildable)parent).add_child(gtkbuilder, ret, null);
		}
		    

		 
		if (this.node.items.size < 1) {
			return ret;
		}
		
		for (var i = 0; i < this.node.items.size; i++ ) {

			 this.mungeChild(this.node.items.get(i));
			 
		}
		
		return ret;
		

		 

	}
	 
	  
		
}