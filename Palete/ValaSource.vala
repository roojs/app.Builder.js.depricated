
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
		
		public ValaSource(JsRender.JsRender file) {
			base();
			

		}
		public checkFile(JsRender.JsRender file)
		{
			this.checkString(JsRender.NodeToVala.mungeFile(file));
		}


		
		public checkString(string contents)
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
		               
	    		);
			 
			context.add_external_package ("glib-2.0");
			context.add_external_package ("gobject-2.0");
			context.add_external_package ("libvala-0.24");
			var ns_ref = new Vala.UsingDirective (new Vala.UnresolvedSymbol (null, "GLib", null));
			source_file.add_using_directive (ns_ref);
			context.root.add_using_directive (ns_ref);
			context.add_source_file (source_file);

		
			//add_documented_files (context, settings.source_files);
		
			Vala.Parser parser = new Vala.Parser ();
			parser.parse (context);
			//gir_parser.parse (context);
			if (context.report.get_errors () > 0) {
				print("parse got errors");
				((ValaSourceReport)context.report).dump();
				Vala.CodeContext.pop ();
				return;
			}



			// check context:
			context.check ();
			if (context.report.get_errors () > 0) {
				print("check got errors");
				((ValaSourceReport)context.report).dump();
				Vala.CodeContext.pop ();
				return;
			}
			Vala.CodeContext.pop ();
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

