/*

 
*/
public class JsRender.NodeToGtk : Object {

	Node node;
 	Object wrapped_object; 
	NodeToGtk parentObj;
	
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
		this.parentObj = null;
	}
	
	public Object? munge ( )
	{

		 return this.mungeNode ();
		 
		     
	}
	public Object? mungeChild(  Node cnode)
	{
		var x = new  NodeToGtk(cnode);
		x.parentObj = this;
		return x.mungeNode();
	}
	
	public Object? mungeNode()
	{

		var parent = this.parentObj != null ? this.parentObj.wrapped_object : null;
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
			//case "GtkTreeStore": // top level.. - named and referenced
			case "GtkListStore": // top level.. - named and referenced
			//case "GtkTreeViewColumn": // part of liststore?!?!
			//case "GtkMenu": // top level..
			//case "GtkCellRendererText":
			case "GtkSourceBuffer":				
			case "GtkClutterActor"://fixme..
			 case "GtkClutterEmbed"://fixme.. -- we can not nest embedded.. need to solve..
					
				return null;
		}

		this.packParent();
		

		// pack paramenters

		
		if (parent != null && parent.get_type().is_a(typeof(global::Gtk.Container))) {
			this.packContainerParams();
		}
		
		var cls_gir =Palete.Gir.factoryFqn(this.node.fqn()); 
		if (cls_gir == null) {
			return;
		}
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
	public void packParent() 
	{
		var cls = this.node.fqn().replace(".", "");
		
		var gtkbuilder = new global::Gtk.Builder();
		var cls_gtype = gtkbuilder.get_type_from_name(cls);

		if (this.parentObj == null) {
			return;
		}
				
		    
		var parent = this.parentObj.wrapped_object;
		
		var do_pack =true;

		if (parent == null) { // no parent.. can not pack.
			return;
		}
		// our overrides
		if (cls == "GtkMenu") {
			this.packMenu();
			return;
		}

		if (cls == "GtkTreeStore") { // other stores?
			// tree store is buildable??? --- 
			this.packTreeStore();
			return;
		}
		if (cls =="GtkTreeViewColumn") { // other stores?
			//?? treeview column is actually buildable -- but we do not use the builder???
			this.packTreeViewColumn();
			return;
		}
		if (cls_gtype.is_a(typeof(global::Gtk.CellRenderer))) { // other stores?
			this.packCellRenderer();
			return;
		}


		
		// -- handle buildable add_child..
		if (    cls_gtype.is_a(typeof(global::Gtk.Buildable))
		     && 
			parent.get_type().is_a(typeof(global::Gtk.Buildable))
		)
		{
			((global::Gtk.Buildable)parent).add_child(gtkbuilder, 
	                                          this.wrapped_object, null);
			return;
		}
		// other packing?

		

	}

	public void packMenu()
	{


		var parent = this.parentObj.wrapped_object;
		if (!parent.get_type().is_a(typeof(global::Gtk.Widget))) {
			print("skip menu pack - parent is not a widget");
			return;
		}
		
		var p = (global::Gtk.Menu)this.wrapped_object;
		((global::Gtk.Widget)parent).button_press_event.connect((s, ev) => { 
			p.set_screen(Gdk.Screen.get_default());
			p.show_all();
			p.popup(null, null, null, ev.button, ev.time);
			return true;
		});
	}

	public void packTreeStore()
	{
		var parent = this.parentObj.wrapped_object;
		if (!parent.get_type().is_a(typeof(global::Gtk.TreeView))) {
			print("skip treestore pack - parent is not a treeview");
			return;
		}
		((global::Gtk.TreeView)parent).set_model((global::Gtk.TreeModel)this.wrapped_object);
		
	}
	public void packTreeViewColumn()
	{
		var parent = this.parentObj.wrapped_object;
		if (!parent.get_type().is_a(typeof(global::Gtk.TreeView))) {
			print("skip packGtkViewColumn pack - parent is not a treeview");
			return;
		}
		((global::Gtk.TreeView)parent).append_column((global::Gtk.TreeViewColumn)this.wrapped_object);
		// init contains the add_attribute for what to render...
		
	}	


	public void packCellRenderer()
	{
		var parent = this.parentObj.wrapped_object;
		if (!parent.get_type().is_a(typeof(global::Gtk.TreeViewColumn))) {
			print("skip packGtkViewColumn pack - parent is not a treeview");
			return;
		}
		((global::Gtk.TreeViewColumn)parent).pack_start((global::Gtk.CellRenderer)this.wrapped_object, false);
		// init contains the add_attribute for what to render...
		
	}	


	public void packContainerParams()
	{
	 
		if (this.parentObj == null) {
			return;
		}
		// child must be a widget..
		if (!this.wrapped_object.get_type().is_a(typeof(global::Gtk.Widget))) {
			return;
		}
		
		var parent_gir = Palete.Gir.factoryFqn(this.parentObj.node.fqn());

		var parent = this.parentObj.wrapped_object;
		
		if (parent_gir == null) {
			return;
		}
		
		// let's test just setting expand to false...
		var cls_methods = parent_gir.methods;
		if (cls_methods == null) {
			return;
		}
	
		if (!this.node.props.has_key("* pack")) {
			return;
		}
		
		var ns = this.parentObj.node.fqn().split(".")[0];
		 
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
						this.parentObj.node.fqn()  + "." + k, type, pack[i].strip());
					continue;
				}
				print ("pack:set_property ( %s , %s / %s)\n", k, pack[i].strip(), val.strdup_contents());
	
				((global::Gtk.Container)parent).child_set_property(
					(global::Gtk.Widget)this.wrapped_object , k, val);
				 
			}
		
		}
	


			
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