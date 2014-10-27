//<Script type="text/javascript">
/**
 * Gtk projects - normally vala based now..
 * 
 * should have a few extra features..
 * 
 * like:
 *   compile flags etc..
 *   different versions (eg. different files can compile different versions - eg. for testing.
 *   
 * If we model this like adjuta - then we would need a 'project' file that is actually in 
 * the directory somewhere... - and is revision controlled etc..
 * 
 * builder.config ??
 * 
 * 
 * 
 * 
 */
 

namespace Project {
	static int gtk_id = 1;
 

	public class Gtk : Project
	{
	  
		public Gtk(string path) {
		  
		  
	  		base(path);
			this.xtype = "Gtk";
	  		var gid = "project-gtk-%d".printf(gtk_id++);
	  		this.id = gid;
		  
		
		}
		public Gee.HashMap<string,GtkValaSettings> compilegroups;
		
		public void loadConfig() throws GLib.Error 
		{
			// load a builder.config JSON file.
			// 
			this.compilegroups = new  Gee.HashMap<string,GtkValaSettings>();
			
			
			var fn = this.firstPath() + "/config.builder";
			print("load: " + fn );
			
			if (!FileUtils.test(fn, FileTest.EXISTS)) {
				return;
			}

			var pa = new Json.Parser();
			pa.load_from_file(fn);
			var node = pa.get_root();

			// should be an array really.
			if (node.get_node_type () != Json.NodeType.ARRAY) {
				throw new Error.INVALID_FORMAT ("Unexpected element type %s", node.type_name ());
			}
			
			var obj = node.get_array ();
			for(var i= 0;i<obj.get_length();i++) {
				var el = obj.get_object_element(i);
				var vs = new GtkValaSettings.from_json(el);
				if (vs.name != "_default_") {
					vs.parent = this.compilegroups.get("_default");
				}
				this.compilegroups.set(vs.name,vs);
			}
			
		}
		public void writeConfig()
		{
			var fn = this.firstPath() + "/config.builder";
			print("write: " + fn );

			var ar = new Json.Array();

			if (this.compilegroups.has_key("_default_")) {
				ar.add_object_member(this.compilegroups.get("_default_").toJson());
			}
			var iter = this.compilegroups.map_iterator();
			while(iter.next()) {
				if (iter.get_key() == "_default_") {
					continue;
				}
				ar.add_object_member(iter.get_value().toJson());
			}

			var generator = new Json.Generator ();
			generator.indent = 4;
			generator.pretty = true;
			var node = new Json.Node(Json.NodeType.ARRAY);
			node.set_array(ar);
			generator.set_root(node);

			var f = GLib.File.new_for_path(fn);
			var data_out = new GLib.DataOutputStream(
                                          f.replace(null, false, GLib.FileCreateFlags.NONE, null)
         		);
			data_out.put_string(generator.to_data(null), null);
			data_out.close(null);
			
			return ;
			
			

		}

	}
	// an object describing a build config (or generic ...)
	public class GtkValaSettings : Object {
		public string name;
		public GtkValaSettings? parent;
		
		public string compile_flags; // generic to all.
		public Gee.ArrayList<string> packages; // list of packages?? some might be genericly named?
		public Gee.ArrayList<string> sources; // list of files+dirs (relative to project)
		public string target_bin;

		public GtkValaSettings.from_json(Json.Object el) {

			
			this.name = el.get_string_member("name");
			this.compile_flags = el.get_string_member("compile_flags");
			this.target_bin = el.get_string_member("target_bin");
			// sources and packages.
			this.sources = this.readArray(el.get_array_member("sources"));
			this.packages = this.readArray(el.get_array_member("packages"));
			
		}
		public Gee.ArrayList<string> readArray(Json.Array ar) 
		{
			var ret = new Gee.ArrayList<string>();
			for(var i =0; i< ar.get_length(); i++) {
				ret.add(ar.get_string_element(i));
			}
			return ret;
		}
		
		public Json.Object toJson()
		{
			var ret = new Json.Object();
			ret.set_string_member("name", this.name);
			ret.set_string_member("compile_flags", this.compile_flags);
			ret.set_string_member("target_bin", this.target_bin);
			ret.set_array_member("sources", this.writeArray(this.sources));
			ret.set_array_member("packages", this.writeArray(this.packages));
			return ret;
		}
		public Json.Array writeArray(Gee.ArrayList<string> ar) {
			var ret = new Json.Array();
			for(var i =0; i< ar.size; i++) {
				ret.add_string_element(ar.get(i));
			}
			return ret;
		}
	}
 
   
}
