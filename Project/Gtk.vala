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
			this.loadConfig();
		
		}
		public Gee.HashMap<string,GtkValaSettings> compilegroups;
		
		public void loadConfig() throws GLib.Error 
		{
			// load a builder.config JSON file.
			// 
			this.compilegroups = new  Gee.HashMap<string,GtkValaSettings>();
			
			
			var fn = this.firstPath() + "/config1.builder";
			print("load: " + fn );
			
			if (!FileUtils.test(fn, FileTest.EXISTS)) {
				this.compilegroups.set("_default_", new GtkValaSettings("_default_") );
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
					vs.parent = this.compilegroups.get("_default_");
				}
				this.compilegroups.set(vs.name,vs);
			}
			print("%s\n",this.configToString ());
			
		}
		public string configToString()
		{
			var ar = new Json.Array();
			var iter = this.compilegroups.map_iterator();
			while(iter.next()) {
				 
				ar.add_object_element(iter.get_value().toJson());
			}

			var generator = new Json.Generator ();
			generator.indent = 4;
			generator.pretty = true;
			var node = new Json.Node(Json.NodeType.ARRAY);
			node.set_array(ar);
			generator.set_root(node);
			return generator.to_data(null);
		}
		
		public void writeConfig()
		{
			var fn = this.firstPath() + "/config1.builder";
			print("write: " + fn );

			

			 

			var f = GLib.File.new_for_path(fn);
			var data_out = new GLib.DataOutputStream(
                                          f.replace(null, false, GLib.FileCreateFlags.NONE, null)
         		);
			data_out.put_string(this.configToString(), null);
			data_out.close(null);
			
			return ;
			
			

		}
		public string relPath(string target)
		{
			var basename = this.firstPath();
			// eg. base = /home/xxx/fred/blogs
			// target = /home/xxx/fred/jones
			var bb = basename;
			var prefix = "";
			while (true) {
				if (    bb.length < target.length &&
					target.substring(0, bb.length) == bb) {
					return prefix + target.substring(bb.length +1);
				}
				if (bb.length < 1) {
					throw new Error.INVALID_FORMAT ("Could not work out relative path %s to %s",
					                                basename, target);
				}
				bb = GLib.Path.get_dirname(bb);
				prefix += "../";
				
			}
	
	
		}
		public Gee.ArrayList<string> files()
		{
			var ret = new Gee.ArrayList<string>();
			var def = this.compilegroups.get("_default_").sources;
			for(var i =0 ;i < def.size; i++) {
				var dirname = this.resolve_path(
	                        this.resolve_path_combine_path(this.firstPath(),def.get(i)));
				// scan the directory for files -- ending with vala || c
				
 
				var dir = File.new_for_path(dirname);
				if (!dir.query_exists()) {
					continue;
				}
		  
		   
				try {
					var file_enum = dir.enumerate_children(
		             			GLib.FileAttribute.STANDARD_DISPLAY_NAME, 
						GLib.FileQueryInfoFlags.NONE, 
						null
					);
		        
		         
					FileInfo next_file; 
					while ((next_file = file_enum.next_file(null)) != null) {
				     		var fn = next_file.get_display_name();
						if (!Regex.match_simple("\\.vala$", fn)) {
							continue;
						}
		    				ret.add(dirname + "/" + fn);
					}       
	   			} catch(Error e) {
					print("oops - something went wrong scanning the projects\n");
				}

			}
			return ret;
			

		}

		public Gee.ArrayList<string> files(string path)
		{
			var ret = new Gee.ArrayList<string>();



			return ret;

		}
		

		public   string  resolve_path_combine_path(string first, string second)
		{
			string ret = first;
			if (first.length > 0 && second.length > 0 && !first.has_suffix("/") && !second.has_prefix("/"))
			{
				ret += "/";
			}
			return ret + second;
		}
		public   string  resolve_path_times(string part, int times, string? clue = null)
		{
			string ret = "";
			for (int i = 0; i < times; i++)
			{
				if (clue != null && i > 0)
				{
					ret += clue;
				}
				ret += part;
			}
			return ret;
		}
		public   string resolve_path(string _path, string? relative = null)
		{
			string path = _path;
			if (relative != null)
			{
				path = this.resolve_path_combine_path(path, relative);
			}
			string[] parts = path.split("/");
			string[] ret = {};
			int relative_parts = 0;
					
			foreach (var part in parts)
			{
				if (part.length < 1 || part == ".")
				{
					continue;
				}
				
				if (part == "..")
				{
					if (ret.length > 0)
					{
						ret = ret[0: ret.length -1];
					}
					else
					{
						relative_parts++;
					}
					continue;
				}
				
				ret += part;
			}
			
			path =  this.resolve_path_combine_path(this.resolve_path_times("..", relative_parts, "/"), string.joinv("/", ret));
			if (_path.has_prefix("/"))
			{
				path = "/" + path;
			}
			return path;
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


		public GtkValaSettings(string name) 
		{
			this.name = name;
			this.compile_flags = "";
			this.target_bin = "";
			this.packages = new Gee.ArrayList<string>();
			this.sources = new Gee.ArrayList<string>();
				
		}
		
		
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
