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
		
        return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>
        <!-- Generated with glade 3.18.3 -->
        <interface>
          <requires lib=\"gtk+\" version="3.12\"/>" +
          this.mungeNode(this.node) +
          "</interface>";
          
		     
	}
    public string mungeChild(string pad ,  Node cnode)
	{
		var x = new  NodeToGlade(cnode,  pad);
		return x.munge();
	}
	
}