
// valac TreeBuilder.vala --pkg libvala-0.24 --pkg posix -o /tmp/treebuilder

namespace Palete {
	
	public class ValaSourceReport  : Vala.Report {


		

		Gee.HashMap<int,string> line_errors;

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
	

	}

	public class ValaSource : Vala.CodeVisitor {

		Vala.CodeContext context;
		
		public ValaSource(JsRender.JsRender file) {
			base();
			// init context:

			context = new Vala.CodeContext ();
			Vala.CodeContext.push (context);
		
			context.experimental = false;
			context.experimental_non_null = false;
			context.vapi_directories = { "/usr/share/vala-0.24/vapi" };
			context.report.enable_warnings = true;
			context.metadata_directories = { };
			context.gir_directories = {};
			context.report = new ValaSourceReport();
		
			context.basedir = Posix.realpath (".");
		
			context.directory = context.basedir;
		

			// add default packages:
			//if (settings.profile == "gobject-2.0" || settings.profile == "gobject" || settings.profile == null) {
				context.profile = Vala.Profile.GOBJECT;
			//	context.add_define ("GOBJECT");
			//}
			//add_depencies (context, settings.packages);
			//if (reporter.errors > 0) {
			//	return context;
			//}

			var source_file = new Vala.SourceFile (
		    		context, 
		    		Vala.SourceFileType.SOURCE, 
                                "~~~~~testfile.vala",
		               NodeToVala.mungeFile(file)
	    		);
			//context.add_source_file (testcode);

		
			// source_file = new Vala.SourceFile (context, 
		        //               Vala.SourceFileType.SOURCE, 
		        //              "/home/alan/gitlive/app.Builder.js/tests/TreeBuilder.vala");

			//if (source_package == null) {
			//source_package = register_package (new Package (settings.pkg_name, false, null));
			//}

			//register_source_file (source_package, source_file);

			context.add_external_package ("glib-2.0");
			context.add_external_package ("gobject-2.0");
			context.add_external_package ("libvala-0.24");
			//context.add_external_package ("posix");
			//if (context.profile == Vala.Profile.GOBJECT) {
				// import the GLib namespace by default (namespace of backend-specific standard library)
				var ns_ref = new Vala.UsingDirective (new Vala.UnresolvedSymbol (null, "GLib", null));
				source_file.add_using_directive (ns_ref);
				context.root.add_using_directive (ns_ref);
			//}

			context.add_source_file (source_file);

		
			//add_documented_files (context, settings.source_files);
		
			Vala.Parser parser = new Vala.Parser ();
			parser.parse (context);
			//gir_parser.parse (context);
			if (context.report.get_errors () > 0) {
				print("parse got errors");
				Vala.CodeContext.pop (context);
				return;
			}



			// check context:
			context.check ();
			if (context.report.get_errors () > 0) {
				print("check got errors");
				Vala.CodeContext.pop (context);
				return;
			}
			Vala.CodeContext.pop (context);
			print("ALL OK?\n");
			return;
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


