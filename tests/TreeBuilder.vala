


public class TreeBuilder : Vala.CodeVisitor {
	
	private Vala.CodeContext create_valac_tree (Settings settings) {
		// init context:
		var context = new Vala.CodeContext ();
		Vala.CodeContext.push (context);
		
		context.experimental = false;
		context.experimental_non_null = false;
		context.vapi_directories = { "/usr/share/vala-0.24/vapi" };
		context.report.enable_warnings = true;
		context.metadata_directories = { };
		context.gir_directories = {};

		if (settings.basedir == null) {
			context.basedir = realpath (".");
		} else {
			context.basedir = realpath (settings.basedir);
		}

		if (settings.directory != null) {
			context.directory = realpath (settings.directory);
		} else {
			context.directory = context.basedir;
		}


		// add default packages:
		if (settings.profile == "gobject-2.0" || settings.profile == "gobject" || settings.profile == null) {
			context.profile = Vala.Profile.GOBJECT;
			context.add_define ("GOBJECT");
		}

		Vala.Parser parser = new Vala.Parser ();
		parser.parse (context);
		gir_parser.parse (context);
		if (context.report.get_errors () > 0) {
			return context;
		}



		// check context:
		context.check ();
		if (context.report.get_errors () > 0) {
			return context;
		}
	}
}

int main (string[] args) {

	var a = new TreeBuilder();
	a.create_valac_tree(