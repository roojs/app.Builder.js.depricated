
// valac TreeBuilder.vala --pkg libvala-0.24 --pkg posix -o /tmp/treebuilder

/**
 * 
 *  This just deals with spawning the compiler and getting the results.
 * 
 *  each window should have one of these...
 * 
 *  x = new ValaSource();
 *  x.connect.compiled(... do something with results... );
 *  
 * x.
 * 
 */

namespace Palete {
	
	public errordomain ValaSourceError {
		INVALID_FORMAT 
	}
	
	//public delegate  void ValaSourceResult(Json.Object res);
	
	 

	public class ValaSource : Object {
 
		
		public signal void compiled(Json.Object res);

		
		JsRender.JsRender file;
  		public int line_offset = 0;
		
 		public ValaSource( ) 
 		{
			base();
		 
		}
		public void dumpCode(string str) 
		{
			var ls = str.split("\n");
			for (var i=0;i < ls.length; i++) {
				print("%d : %s\n", i+1, ls[i]);
			}
		}
		
		//public Gee.HashMap<int,string> checkFile()
		//{
		//	return this.checkString(JsRender.NodeToVala.mungeFile(this.file));
		//}

		public void checkFileWithNodePropChange(
		  
					JsRender.JsRender file,
					JsRender.Node node, 
					string prop,
					string ptype,
					string val
					 )
		{
			
			this.project = file.project;
			this.filepath = file.path;
			this.build_module = file.build_module;
			
			
			Gee.HashMap<int,string> ret = new Gee.HashMap<int,string> ();
			var hash = ptype == "listener" ? node.listeners : node.props;
			
			// untill we get a smarter renderer..
			// we have some scenarios where changing the value does not work
			if (prop == "* xns" || prop == "xtype") {
				result_callback(new Json.Object());
				return ;
			}
				
			
			var old = hash.get(prop);
			var newval = "/*--VALACHECK-START--*/ " + val ;
			
			hash.set(prop, newval);
			var tmpstring = JsRender.NodeToVala.mungeFile(file);
			hash.set(prop, old);
			//print("%s\n", tmpstring);
			var bits = tmpstring.split("/*--VALACHECK-START--*/");
			var offset =0;
			if (bits.length > 0) {
				offset = bits[0].split("\n").length +1;
			}
			
			this.line_offset = offset;
			
			//this.dumpCode(tmpstring);
			//print("offset %d\n", offset);
			this.result_callback = result_cb;
			this.checkStringSpawn(tmpstring );
			
			// modify report
			
			
			
		}
		Spawn compiler;
		ValaSourceResult result_callback;
		public void checkStringSpawn(
					string contents 
				)
		{
 			
			FileIOStream iostream;
			var tmpfile = File.new_tmp ("test-XXXXXX.vala", out iostream);
			tmpfile.ref();

			OutputStream ostream = iostream.output_stream;
			DataOutputStream dostream = new DataOutputStream (ostream);
			dostream.put_string (contents);
			
			
			string[] args = {};
			args += BuilderApplication._self;
			args += "--project";
			args += this.project.fn;
			args += "--target";
			args += this.build_module;
			args += "--add-file";
			args +=  tmpfile.get_path();
			args += "--skip-file";
			args += this.filepath;
			
			 
			
			this.compiler = new Spawn("/tmp", args);
			
			try {
				this.compiler.run(spawnResult); 
			} catch (GLib.SpawnError e) {
				var ret = new Json.Object();
				ret.set_boolean_member("success", false);
				ret.set_string_member("message", e.message);
				this.result_callback(ret);
			}
			 
		}
		public void spawnResult(int res, string output, string stderr)
		{
			 
				
			try { 
				GLib.debug("GOT output %s", output);
				
				var pa = new Json.Parser();
				pa.load_from_data(output);
				var node = pa.get_root();

				if (node.get_node_type () != Json.NodeType.OBJECT) {
					throw new ValaSourceError.INVALID_FORMAT ("Unexpected element type %s", node.type_name ());
				}
				var ret = node.get_object ();
				ret.set_int_member("line_offset", this.line_offset);
				if (result_callback == null) {
					print ("no callback?");
					return;
				}
				this.result_callback(ret);
				
				
			} catch (Error e) {
				var ret = new Json.Object();
				ret.set_boolean_member("success", false);
				ret.set_string_member("message", e.message);
				this.result_callback(ret);
			}
			//compiler.unref();
			//tmpfile.unref();
			 
			
			
		}
		 
}
/*
int main (string[] args) {

	var a = new ValaSource(file);
	a.create_valac_tree();
	return 0;
}
*/


