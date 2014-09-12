/*

 
*/
public class JsRender.NodeToGtk : Object {

	Node node;
 	
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

		 return this.mungeNode ();
		 
		     
	}
	public Object? mungeChild(  Node cnode, bool with_packing = false)
	{
		var x = new  NodeToGlade(cnode);
		return x.mungeNode(with_packing);
	}
	
	public Object? mungeNode()
	{
		var pad = this.pad;
		var cls = this.node.fqn().replace(".", "");
		
		var gtkbuilder = new global::Gtk.Builder();

		var gtype = gtkbuilder.get_type_from_name(cls);
		print("Type: %s ?= %s\n", this.node.fqn(), gtype.name());


		// if it's a window... 

		if (gtype.is_a((typeof(Gtk.Window))) {
			// what if it has none...
			if (this.node.items.size < 1) {
				return null;
			}
			return this.mungeChild(this.node.items.get(0));
		}

		var ret = Object.new(gtype);
		
		
		 
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
			
			
			
			ret.set_property(k, 
			var k = pviter.get_key();
			var val = GLib.Markup.escape_text(this.node.get(pviter.get_key()).strip());
			ret += @"$pad    <property name=\"$k\">$val</property>\n"; // es

                }
		// packing???

		var pack = "";
		
		if (with_packing   ) {
 
			pack = this.packString();
			

		}	
		// children..

		if (this.node.items.size < 1) {
			return ret + @"$pad</object>\n" + pack;
		}
		
		for (var i = 0; i < this.node.items.size; i++ ) {

			var add = this.mungeChild(pad + "        " , this.node.items.get(i) , true);
			if (add.length < 1) {
				continue;
			}
			
			ret += @"$pad    <child>\n";
			ret += add;
			ret += @"$pad    </child>\n";
		}
		
		return ret + @"$pad</object>\n" + pack;
		

		 

	}
	 
	 
	public string packString()
	{
		
		
		
		
		// pack is part of the parent element..
		var p = node.parent;
		string[]  pk= { "add" };
		var pfqn = "Gtk.Box";
		if (p != null) {
			pfqn  = p.fqn();
			if (this.node.props.get("* pack") == null) {
				return "";
			}
			pk = this.node.get("* pack").split(",");
		} else {
			if (this.node.props.get("* pack") != null) {
				pk = this.node.get("* pack").split(",");
			}
			
		}
		
		if (pfqn == null) {
			return "";
		}
		if (pfqn == "Gtk.ScrolledWindow") {
			return "";
		}
		var p_parts =pfqn.split(".");


		
		var ns = p_parts[0];
    		var gir =  Palete.Gir.factory(ns);
		var cls = gir.classes.get(p_parts[1]);
		var mdef = cls.methods.get(pk[0]);
		if (mdef == null) {
			print("could not find method : %s\n", pk[0]);
			return "";
		}
		/*
		var generator = new Json.Generator ();
	        var n = new Json.Node(Json.NodeType.OBJECT);
		n.set_object(mdef.toJSON());
		generator.set_root(n);
		generator.indent = 4;
		generator.pretty = true;
		    
		print(generator.to_data(null));
		*/
		string[]  pbody  = {};
		switch(pk[0]) {

			case "pack_start":
				pbody += @"$pad    <property name=\"pack_type\">start</property>\n";
				break;
			
			case "pack_end":
				pbody += @"$pad    <property name=\"pack_type\">start</property>\n";
				break;
				
			case "add":
				//pbody += @"$pad    <property name=\"pack_type\">start</property>\n";
				 pbody += @"$pad    <property name=\"expand\">True</property>\n";
				pbody += @"$pad    <property name=\"fill\">True</property>\n";
				//pbody += @"$pad    <property name=\"position\">1</property>\n";
				var pack = @"$pad<packing>\n" +
					string.joinv("", pbody) + 
						@"$pad</packing>\n";
				return pack;
                
			case "set_model":
				print ("set_model not handled yet..");
				return "";
			
			default:
				print ("unknown pack type: %s", pk[0]);
				return "";
				
		}
			
		var pad = this.pad;
		 
		for (var i = 2; i < mdef.paramset.params.size; i++) {
			var poff = i - 1;
			if (poff > (pk.length-1)) {
				break;
			}
			
			var key = mdef.paramset.params.get(i).name;
			var val = pk[poff];
			pbody += @"$pad    <property name=\"$key\">$val</property>\n";
		
		}
	     
		if (pbody.length < 1) {
			/*var generator = new Json.Generator ();
			var n = new Json.Node(Json.NodeType.OBJECT);
			n.set_object(mdef.toJSON());
			generator.set_root(n);
			generator.indent = 4;
			generator.pretty = true;
			    
			print(generator.to_data(null));
			*/
			print("skip - packing - no arguments (" + pk[0] + ")\n");
			return "";
		}
		
		var pack = @"$pad<packing>\n" +
				string.joinv("", pbody) + 
				@"$pad</packing>\n";
		return pack;

	}
	public string  mungeOuter(bool with_window)
	{
		var label = this.node.fqn() + ": " + 
			(this.node.has("title") ? this.node.get("title") : "No-title");
		
		var ret = "";
		ret+= "
<object class=\"GtkBox\" id=\"fake-window1\">
	<property name=\"visible\">True</property>
	<property name=\"can_focus\">False</property>
	<property name=\"orientation\">vertical</property>
";
		if (with_window) { 		
			ret+="
	<child>
		<object class=\"GtkLabel\" id=\"fake-window-label-1\">
			<property name=\"visible\">True</property>
			<property name=\"can_focus\">False</property>
			<property name=\"label\" translatable=\"yes\">" + label + "</property>
		</object>
		<packing>
			<property name=\"expand\">False</property>
			<property name=\"fill\">True</property>
			<property name=\"position\">0</property>
		</packing>
	</child>
	";
		}
		
		ret+=" 
		<child>
		";
		if (with_window) {
			var children = "";
			if (this.node.items.size > 0) {
			
				children =  this.mungeChild(pad + "        " , this.node.items.get(0), false);
			  

			} 
			children += (children.length > 0) ? "<packing>
				<property name=\"expand\">True</property>
				<property name=\"fill\">True</property>
				<property name=\"position\">1</property>
		      </packing>" : "";
			
			ret+= (children.length < 1 ) ? "<placeholder/>" : children;
			
			
			

		} else {
			ret+= this.mungeNode (true);
		}

		ret+="
		    </child>
	    ";
	if (with_window) {
		ret+="
		    <child>
		      <object class=\"GtkBox\" id=\"fake-footer\">
			<property name=\"visible\">True</property>
			<property name=\"can_focus\">False</property>
			<child>
			  <placeholder/>
			</child>
			<child>
			  <placeholder/>
			</child>
		      </object>
		      <packing>
			<property name=\"expand\">False</property>
			<property name=\"fill\">True</property>
			<property name=\"position\">2</property>
		      </packing>
		    </child>
	    ";
	}
		ret +="
	</object>"; 

	return ret;
	}

		
}