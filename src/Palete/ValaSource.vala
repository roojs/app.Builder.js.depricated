
// valac TreeBuilder.vala --pkg libvala-0.24 --pkg posix -o /tmp/treebuilder

namespace Palete {
	
	public class ValaSourceReport  : Vala.Report {


		

		public Gee.HashMap<int,string> line_errors;

		public ValaSourceReport()
		{
			base();
			this.line_errors = new Gee.HashMap<int,string> ();
		}
		
		public override void err (Vala.SourceReference? source, string message) {
			errors++;
			if (source == null) {
				return;
				//stderr.printf ("My error: %s\n", message);
			}
			if (source.file.filename != "~~~~~testfile.vala") {
				return;
			}
			var pre = "";
			if (line_errors.has_key(source.begin.line)) {
				pre = line_errors.get(source.begin.line) + "\n";
				
			}
			line_errors.set(source.begin.line, pre +  message);
		}
		public void dump()
		{
			var iter = this.line_errors.map_iterator();
			while (iter.next()) {
				print ("%d : %s\n\n", iter.get_key(), iter.get_value());
			}
		}

	}

	public class ValaSource : Vala.CodeVisitor {

		Vala.CodeContext context;
		ValaSourceReport report;
		JsRender.JsRender file; 
		public ValaSource(JsRender.JsRender file) {
			base();
			this.file = file;
			

		}
		public void dumpCode(string str) {
			var ls = str.split("\n");
			for (var i=0;i < ls.length; i++) {
				print("%d : %s\n", i+1, ls[i]);
			}
		}
		
		public Gee.HashMap<int,string> checkFile()
		{
			return this.checkString(JsRender.NodeToVala.mungeFile(this.file));
		}

		public Gee.HashMap<int,string> checkFileWithNodePropChange(
	                   JsRender.Node node, 
                           string prop,
                           string ptype,
                           string val)
		{
			Gee.HashMap<int,string> ret = new Gee.HashMap<int,string> ();
			var hash = ptype == "listener" ? node.listeners : node.props;
			
			// untill we get a smarter renderer..
			// we have some scenarios where changing the value does not work
			if (prop == "* xns" || prop == "xtype") {
				return ret;
			}
				
			
			var old = hash.get(prop);
			var newval = "/*--VALACHECK-START--*/ " + val ;
			
			hash.set(prop, newval);
			var tmpstring = JsRender.NodeToVala.mungeFile(this.file);
			var bits = tmpstring.split("/*--VALACHECK-START--*/");
			var offset =0;
			if (bits.length > 0) {
				offset = bits[0].split("\n").length +1;
			}
			//this.dumpCode(tmpstring);
			//print("offset %d\n", offset);
			this.checkString(tmpstring);
			hash.set(prop, old);
			// modify report
			
			var iter = this.report.line_errors.map_iterator();
			while (iter.next()) {
				// print("%d : %s\n",iter.get_key() - offset, iter.get_value());
				// we have to prefix the error with the fake line number 
				// so that it's a unique mark..
				 ret.set(iter.get_key() - offset, 
			 	       "%d : %s".printf(iter.get_key() - offset,iter.get_value()));
			}
			return ret;
			
		}
		
		public Gee.HashMap<int,string> checkString(string contents)
        {
			// init context:
			
			context = new Vala.CodeContext ();
			Vala.CodeContext.push (context);
		
			context.experimental = false;
			context.experimental_non_null = false;
			var vapidirs = ((Project.Gtk)this.file.project).vapidirs();
			vapidirs +=  "/usr/share/vala-0.24/vapi" ;

			// or context.get_vapi_path("glib-2.0"); // should return path..
			context.vapi_directories = vapidirs;
			context.report.enable_warnings = true;
			context.metadata_directories = { };
			context.gir_directories = {};
			this.report = new ValaSourceReport();;
			context.report = this.report;
			
			
			context.basedir = Posix.realpath (".");
		
			context.directory = context.basedir;
		

			// add default packages:
			//if (settings.profile == "gobject-2.0" || settings.profile == "gobject" || settings.profile == null) {
			context.profile = Vala.Profile.GOBJECT;
 			 
			var ns_ref = new Vala.UsingDirective (new Vala.UnresolvedSymbol (null, "GLib", null));
			context.root.add_using_directive (ns_ref);

			var source_file = new Vala.SourceFile (
		    		context, 
		    		Vala.SourceFileType.SOURCE, 
					"~~~~~testfile.vala",
					contents
	    		);
			source_file.add_using_directive (ns_ref);
			context.add_source_file (source_file);
			
	    	// add all the files (except the current one) - this.file.path
	    	var pr = ((Project.Gtk)this.file.project);
	    	if (this.file.build_module.length > 0) {
				var cg =  pr.compilegroups.get(this.file.build_module);
				for (var i = 0; i < cg.sources.size; i++) {
					var path = pr.resolve_path(
	                        pr.resolve_path_combine_path(pr.firstPath(),cg.sources.get(i)));
					if (path == this.file.path) {
						continue;
					}
					print("Add source file %s\n", path);
					var xsf = new Vala.SourceFile (
						context,
						Vala.SourceFileType.SOURCE, 
						path
					);
					xsf.add_using_directive (ns_ref);
				}
			}
			// default.. packages..
			context.add_external_package ("glib-2.0"); 
			context.add_external_package ("gobject-2.0");
			// user defined ones..
			
	    	var dcg = pr.compilegroups.get("_default");
	    	for (var i = 0; i < dcg.packages.size; i++) {
				context.add_external_package (dcg.packages.get(i));
				
			}
	    	
			 //Vala.Config.PACKAGE_SUFFIX.substring (1)
			
			// add the modules...
			
			
			
			//context.add_external_package ("libvala-0.24");
			
			

		
			//add_documented_files (context, settings.source_files);
		
			Vala.Parser parser = new Vala.Parser ();
			parser.parse (context);
			//gir_parser.parse (context);
			if (context.report.get_errors () > 0) {
				print("parse got errors");
				((ValaSourceReport)context.report).dump();
				Vala.CodeContext.pop ();
				return this.report.line_errors;
			}


			/*
			// check context:
			context.check ();
			if (context.report.get_errors () > 0) {
				print("check got errors");
				((ValaSourceReport)context.report).dump();
				Vala.CodeContext.pop ();
				return this.report.line_errors;
				
			}
			*/
			Vala.CodeContext.pop ();
			
			print("ALL OK?\n");
			return this.report.line_errors;
		}
	//
		// startpoint:
		//
	 
	}
}
/*
int main (string[] args) {

	var a = new ValaSource(file);
	a.create_valac_tree();
	return 0;
}
*/


