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
			
			
			var fn = this.path + "/config.builder";
			print("load: " + fn );
			
			if (!FileUtils.test(fn, FileTest.EXISTS)) {
				return;
			}

			var pa = new Json.Parser();
			pa.load_from_file(this.path + "/config.builder");
			var node = pa.get_root();

			// should be an array really.
			if (node.get_node_type () != Json.NodeType.ARRAY) {
				throw new Error.INVALID_FORMAT ("Unexpected element type %s", node.type_name ());
			}
			
			var obj = node.get_array ();
			for(var i= 0;i<obj.get_length();i++) {
				var el = obj.get_object_element(i);
				var vs = new GtkValaSettings.from_json(el);
				this.compilegroups.add(vs);

			}
			
		}

	}
	// an object describing a build config (or generic ...)
	public class GtkValaSettings : Object {
		public GtkValaSettings? parent;
		public string compile_flags; // generic to all.
		public Gee.ArrayList<string> packages; // list of packages?? some might be genericly named?
		public Gee.ArrayList<string> sources; // list of files+dirs (relative to project)
		public string target_bin;

		public GtkValaSettings.from_json(Json.Object el) {
			
		}
		
	}
 
   
}
