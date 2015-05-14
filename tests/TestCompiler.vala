
// valac TreeBuilder.vala --pkg libvala-0.24 --pkg posix -o /tmp/treebuilder

namespace Palete {
	 
	
	 

	public class TestCompiler : Vala.CodeVisitor {

		Vala.CodeContext context;
		
  		public TestCompiler(string file) {
			base();
			this.file = file;
			

		}
		public void dumpCode(string str) {
			var ls = str.split("\n");
			for (var i=0;i < ls.length; i++) {
				print("%d : %s\n", i+1, ls[i]);
			}
		}
		
		 
		
		
		public Gee.HashMap<int,string> checkString( )
		{
			// init context:
			var valac = "valac " ;
			
			context = new Vala.CodeContext ();
			Vala.CodeContext.push (context);
		
			context.experimental = false;
			context.experimental_non_null = false;
			
#if VALA_0_28
			var ver=28;
#elif VALA_0_26	
			var ver=26;
#elif VALA_0_24
			var ver=24;
#elif VALA_0_22	
			var ver=22;
#endif
			
			for (int i = 2; i <= ver; i += 2) {
				context.add_define ("VALA_0_%d".printf (i));
			}
			
			
			
			
			
			
			 
				
			
			// or context.get_vapi_path("glib-2.0"); // should return path..
			//context.vapi_directories = vapidirs;
			context.report.enable_warnings = true;
			context.metadata_directories = { };
			context.gir_directories = {};
			context.thread = true;
			
			
			this.report = new ValaSourceReport(this.file);
			context.report = this.report;
			
			
			context.basedir = "/tmp"; //Posix.realpath (".");
		
			context.directory = context.basedir;
		

			// add default packages:
			//if (settings.profile == "gobject-2.0" || settings.profile == "gobject" || settings.profile == null) {
			context.profile = Vala.Profile.GOBJECT;
 			 
			var ns_ref = new Vala.UsingDirective (new Vala.UnresolvedSymbol (null, "GLib", null));
			context.root.add_using_directive (ns_ref);

			var source_file = new Vala.SourceFile (
		    		context, 
		    		Vala.SourceFileType.SOURCE, 
					file
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
							
					if (!FileUtils.test(path, FileTest.EXISTS)) {
						continue;
					}       
	                 
					if (path == this.file.path.replace(".bjs", ".vala")) {
						valac += " " + path;
						continue;
					}
					if (FileUtils.test(path, FileTest.IS_DIR)) {
						continue;
					}
					//print("Add source file %s\n", path);
					
					valac += " " + path;
					
					if (Regex.match_simple("\\.c$", path)) {
						context.add_c_source_file(path);
						continue;
					}
					
					
					var xsf = new Vala.SourceFile (
						context,
						Vala.SourceFileType.SOURCE, 
						path
					);
					xsf.add_using_directive (ns_ref);
					context.add_source_file(xsf);
					
				}
			}
			// default.. packages..
			context.add_external_package ("glib-2.0"); 
			context.add_external_package ("gobject-2.0");
			// user defined ones..
			
	    	var dcg = pr.compilegroups.get("_default_");
	    	for (var i = 0; i < dcg.packages.size; i++) {
				valac += " --pkg " + dcg.packages.get(i);
				context.add_external_package (dcg.packages.get(i));
			}
	    	
			 //Vala.Config.PACKAGE_SUFFIX.substring (1)
			
			// add the modules...
			
			
			
			//context.add_external_package ("libvala-0.24");
			
			this.report.compile_notice("START", "", 0, "");

		
			//add_documented_files (context, settings.source_files);
		
			Vala.Parser parser = new Vala.Parser ();
			parser.parse (context);
			//gir_parser.parse (context);
			if (context.report.get_errors () > 0) {
				print("parse got errors");
				((ValaSourceReport)context.report).dump();
				
				Vala.CodeContext.pop ();
				this.report.compile_notice("END", "", 0, "");
				return this.report.line_errors;
			}


			
			// check context:
			context.check ();
			if (context.report.get_errors () > 0) {
				print("check got errors");
				((ValaSourceReport)context.report).dump();
				Vala.CodeContext.pop ();
				this.report.compile_notice("END", "", 0, "");
				return this.report.line_errors;
				
			}
			
			//context.codegen = new Vala.GDBusServerModule ();
			
			 
			context.output = "/tmp/testbuild";
			valac += " -o " +context.output;
			//context.codegen.emit (context);
			/*
			var ccompiler = new Vala.CCodeCompiler ();
			var cc_command = Environment.get_variable ("CC");
			var pkg_config_command = Environment.get_variable ("PKG_CONFIG");
#if VALA_0_28
			ccompiler.compile (context, cc_command, new string[] { }, pkg_config_command);
#else
			ccompiler.compile (context, cc_command, new string[] { });
#endif
			*/
 
			Vala.CodeContext.pop ();
			//(new Vala.CodeNode()).get_error_types().clear();
			//(new Vala.NullType()).get_type_arguments().clear();
			(new Vala.NullType(null)).get_type_arguments().clear();
			parser = null;
 			this.report.compile_notice("END", "", 0, "");
			print("%s\n", valac);
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


