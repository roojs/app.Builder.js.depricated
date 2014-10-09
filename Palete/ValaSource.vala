
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

			var hash = ptype == "listener" ? node.listeners : node.props;
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
			Gee.HashMap<int,string> ret = new Gee.HashMap<int,string> ();
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
			context.vapi_directories = { "/usr/share/vala-0.24/vapi" };
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
		               contents
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


