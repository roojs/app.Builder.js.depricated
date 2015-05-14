
// valac TestCompiler.vala --pkg libvala-0.26 --pkg posix -o /tmp/TestCompiler

namespace Palete {
	 
	
	 

	public class TestCompiler : Vala.CodeVisitor {

		Vala.CodeContext context;
		string file;
		
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
		
		 
		
		
		public void checkString( )
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
					this.file
	    		);
			source_file.add_using_directive (ns_ref);
			context.add_source_file (source_file);
			
	    	// add all the files (except the current one) - this.file.path
	    	 
			// default.. packages..
			context.add_external_package ("glib-2.0"); 
			context.add_external_package ("gobject-2.0");
			context.add_external_package ("gtk+-3.0");
			if (!context.add_external_package ("webkit2gtk-4.0")) {
				context.add_external_package ("webkit2gtk-3.0");
			}
			context.add_external_package ("clutter-gtk-1.0");
			context.add_external_package ("gdl-3.0");
			context.add_external_package ("gtksourceview-3.0");
			context.add_external_package ("libvala-0.26");
			// user defined ones..
			 
	    	
			 //Vala.Config.PACKAGE_SUFFIX.substring (1)
			
			// add the modules...
			
			
			
			//context.add_external_package ("libvala-0.24");
			
		 
		
			//add_documented_files (context, settings.source_files);
		
			Vala.Parser parser = new Vala.Parser ();
			parser.parse (context);
			//gir_parser.parse (context);
			if (context.report.get_errors () > 0) {
				print("parse got errors");
				 
				Vala.CodeContext.pop ();
				 
				return;
			}


			
			// check context:
			context.check ();
			if (context.report.get_errors () > 0) {
				 Vala.CodeContext.pop ();
				 
				return ;
				
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
			  
			print("%s\n", valac);
			print("ALL OK?\n");
			return ;
		}
	//
		// startpoint:
		//
	 
	}
}
 
int main (string[] args) {

	for (var i = 0;i < 1000;i++) {
		var a = new Palete.TestCompiler(file);
		a.compileString();
	}
	return 0;
}
 


