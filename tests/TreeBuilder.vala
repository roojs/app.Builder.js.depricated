
// valac TreeBuilder.vala --pkg libvala-0.24 --pkg posix -o /tmp/treebuilder

public class MyReport  : Vala.Report {
	
	public overide void err (Vala.SourceReference? source, string message) {
		errors++;
		if (source == null) {
			stderr.printf ("My error: %s\n", message);
		} else {
			stderr.printf ("%s: My error: %s\n", source.to_string (), message);
			if (verbose_errors) {
				this.report_source (source);
			}
		}
	}
	

}

public class TreeBuilder : Vala.CodeVisitor {
	
	public Vala.CodeContext create_valac_tree () {
		// init context:
		var context = new Vala.CodeContext ();
		Vala.CodeContext.push (context);
		
		context.experimental = false;
		context.experimental_non_null = false;
		context.vapi_directories = { "/usr/share/vala-0.24/vapi" };
		context.report.enable_warnings = true;
		context.metadata_directories = { };
		context.gir_directories = {};
		context.erport = new MyReport();
		
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

		var source_file = new Vala.SourceFile (context, 
                               Vala.SourceFileType.SOURCE, 
                               "/home/alan/gitlive/app.Builder.js/tests/TreeBuilder.vala");

		//if (source_package == null) {
		//source_package = register_package (new Package (settings.pkg_name, false, null));
		//}

		//register_source_file (source_package, source_file);

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
			print("got errors");
			return context;
		}



		// check context:
		context.check ();
		if (context.report.get_errors () > 0) {
			return context;
		}
		return context;
	}
//
	// startpoint:
	//
 
}

int main (string[] args) {

	var a = new TreeBuilder();
	a.create_valac_tree();
	return 0;
}


