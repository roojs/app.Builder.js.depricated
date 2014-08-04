/*

<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated with glade 3.18.3 -->
<interface>
  <requires lib="gtk+" version="3.12"/>
  <object class="GtkBox" id="box1">
    <property name="visible">True</property>
    <property name="can_focus">False</property>
    <property name="orientation">vertical</property>
    <child>
      <object class="GtkButton" id="button1">
        <property name="label" translatable="yes">button</property>
        <property name="visible">True</property>
        <property name="can_focus">True</property>
        <property name="receives_default">True</property>
      </object>
      <packing>
        <property name="expand">False</property>
        <property name="fill">True</property>
        <property name="position">0</property>
      </packing>
    </child>
    <child>
      <placeholder/>
    </child>
    <child>
      <object class="GtkToggleButton" id="togglebutton1">
        <property name="label" translatable="yes">togglebutton</property>
        <property name="visible">True</property>
        <property name="can_focus">True</property>
        <property name="receives_default">True</property>
      </object>
      <packing>
        <property name="expand">False</property>
        <property name="fill">True</property>
        <property name="position">2</property>
      </packing>
    </child>
  </object>
</interface>
*/
public class JsRender.NodeToGlade : Object {

	Node node;
 	string pad;
	Gee.ArrayList<string> els;
        //Gee.ArrayList<string> skip;
	Gee.HashMap<string,string> ar_props;
	public static int vcnt = 0; 

	public NodeToGlade( Node node,   string pad) 
	{
		this.node = node;
 		this.pad = pad;
		this.els = new Gee.ArrayList<string>(); 
		//this.skip = new Gee.ArrayList<string>();
		this.ar_props = new Gee.HashMap<string,string>();

	}
	
	public string munge ( )
	{

		this.fillValaName(this.node);
		this.pad += "    ";
		return  "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" + 
			"<!-- Generated with glade 3.18.3 -->\n" +
			"<interface>\n" + 
			"    <requires lib=\"gtk+\" version=\"3.12\"/>\n" +
  			this.mungeNode() +
  			"</interface>\n";
          
		     
	}
	public string mungeChild(string pad ,  Node cnode)
	{
		var x = new  NodeToGlade(cnode,  pad);
		return x.mungeNode();
	}
	
	public string mungeNode()
	{
		var pad = this.pad;
		var cls = this.node.xvala_cls.replace(".", "");

		switch(cls) {
			// things we can not do yet...
			case "GtkTreeStore": // top level.. - named and referenced
			case "GtkListStore": // top level.. - named and referenced
			case "GtkTreeViewColumn":
			case "GtkMenu": // top level..
				return "";
		}

		
		var id = this.node.uid();
		var ret = @"$pad<object class=\"$cls\" id=\"$id\">\n";
		// properties..
		var props =  Palete.factory("Gtk").getPropertiesFor(this.node.xvala_cls, "props");
            
    		var pviter = props.map_iterator();
		while (pviter.next()) {
			
				// print("Check: " +cls + "::(" + pviter.get_value().propertyof + ")" + pviter.get_key() + " " );
				
        		// skip items we have already handled..
        		if  (this.node.props.get(pviter.get_key()) == null) {
				continue;
			}
			var k = pviter.get_key();
			var val = GLib.Markup.escape_text(this.node.props.get(pviter.get_key()));
			ret += @"$pad    <property name=\"$k\">$val</property>\n"; // es

                }
		// packing???

		var pack = "";
		if (this.node.props.get("* pack") != null) {

		
			pack = this.packString();
			

		}	
		// children..

		if (this.node.items.size < 1) {
			return ret + @"$pad</object>\n" + pack;
		}
		
		for (var i = 0; i < this.node.items.size; i++ ) {

			var add = this.mungeChild(pad + "        " , this.node.items.get(i) );
			if (add.length < 0) {
				continue;
			}
			
			ret += @"$pad    <child>\n";
			ret += this.mungeChild(pad + "        " , this.node.items.get(i) );
			ret += @"$pad    </child>\n";
		}
		
		return ret + @"$pad</object>\n" + pack;
		

		 

	}
	string toValaNS(Node node)
        {
            var ns = this.node.get("$ xns") ;
            //if (ns == "GtkSource") {
                //return "Gtk.Source.";
            //}
            return ns + ".";
        }
	public void  fillValaName(Node node) 
	{
	    if (node.xvala_cls.length < 1) {
		    vcnt++;

		    var cls = this.toValaNS(node) + node.get("xtype");

		    string id = node.get("id").length > 0 ? 
				node.get("id") :  "%s%d".printf(node.get("xtype"), vcnt);

		    var props = Palete.factory("Gtk").getPropertiesFor(cls,  "props");
		     
		    node.xvala_cls = cls;
		    node.xvala_xcls = "Xcls_" + id;
		    node.xvala_id = node.get("id").length > 0  ? node.get("id") : "";
	    }                                                     
            //this.vitems.append(item);  
            // loop children..
			                                                       
            if (node.items.size < 1) {
                return;
            }
            for(var i =0;i<node.items.size;i++) {
                this.fillValaName(node.items.get(i));
            }
			          
        }
	public string packString()
	{
		 
		var pk = this.node.get("* pack").split(",");
		// pack is part of the parent element..
		var p = node.parent;
		var pfqn  = p.fqn();
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
				 pbody += @"$pad    <property name=\"expand\">False</property>\n";
				pbody += @"$pad    <property name=\"fill\">True</property>\n";
				pbody += @"$pad    <property name=\"position\">1</property>\n";
				var pack = @"$pad<packing>\n" +
					string.joinv("", pbody) + 
						@"$pad</packing>\n";
				return pack;
                
			case "set_model":
				print ("set_model not handled yet..");
				return "";
			
			default:
				print ("unknown pack type: %s", pk[0]);
				break;
				
		}
			
		var pad = this.pad;
		 
		for (var i = 2; i < mdef.paramset.params.size; i++) {
			var poff = i - 1;
			if (pk.length < poff) {
				break;
			}
			
			var key = mdef.paramset.params.get(i).name;
			var val = pk[poff];
			pbody += @"$pad    <property name=\"$key\">$val</property>\n";
		
		}
		if (pbody.length < 1) {
			var generator = new Json.Generator ();
			var n = new Json.Node(Json.NodeType.OBJECT);
			n.set_object(mdef.toJSON());
			generator.set_root(n);
			generator.indent = 4;
			generator.pretty = true;
			    
			print(generator.to_data(null));
			return "";
		}
		
		var pack = @"$pad<packing>\n" +
				string.joinv("", pbody) + 
				@"$pad</packing>\n";
		return pack;

	}
    
}