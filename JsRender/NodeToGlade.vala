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
	 
		 
        return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" + 
		"<!-- Generated with glade 3.18.3 -->" +
		"<interface>" + 
		"    <requires lib=\"gtk+\" version=\"3.12\"/>" +
          this.mungeNode() +
          "</interface>";
          
		     
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
		var id = this.node.uid();
		var ret = @"$pad<object class=\"$cls\" id=\"$id\">\n";
		// properties..
		var props =  Palete.factory("Gtk").getPropertiesFor(this.node.xvala_cls, "props");
            
    		var pviter = props.map_iterator();
		while (pviter.next()) {
			
				// print("Check: " +cls + "::(" + pviter.get_value().propertyof + ")" + pviter.get_key() + " " );
				
        		// skip items we have already handled..
        		if  (!(this.node.props.get(pviter.get_key()) == null)) {
				continue;
			}
			var k = pviter.get_key();
			var val = GLib.Markup.escape_text(this.node.props.get(pviter.get_key()));
			ret += @"$pad    <property name=\"$k\">$val</property>\n"; // es

                }
		// packing???
		
		var pack = @"$pad<packing>
$pad    <property name=\"expand\">False</property>
$pad    <property name=\"fill\">True</property>
$pad    <property name=\"position\">0</property>
$pad</packing>\n";

			
		// children..

		if (this.node.items.size < 1) {
			return ret + @"$pad</object>" + pack;
		}
		
		for (var i = 0; i < this.node.items.size; i++ ) {
			ret += @"$pad   <child>\n";
			ret += this.mungeChild(pad + "        " , this.node.items.get(i) );
			ret += @"$pad   </child>\n";
		}
		
		return ret + @"$pad</object>" + pack;
		

		 

	}
    
	void  toValaName() 
	{
    	    this.vcnt++;

	    var cls = this.toValaNS(this.node) + item.get("xtype");

	    string id = this.node.get("id").length > 0 ? 
			this.item.get("id") :  "%s%d".printf(this.item.get("xtype"), this.vcnt);

	    var props = Palete.factory("Gtk").getPropertiesFor(cls,  "props");
             
            
            
            item.xvala_cls = cls;
            item.xvala_xcls = "Xcls_" + id;
            item.xvala_id = this.node.get("id").length > 0  ? this.node.get("id") : "";
			                                                       
            //this.vitems.append(item);  
            // loop children..
			                                                       
            if (this.node.items.size < 1) {
                return;
            }
            for(var i =0;i<this.node.items.size;i++) {
                this.toValaName(this.node.items.get(i));
            }
			          
        }
    
}