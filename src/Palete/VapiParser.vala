

// valac VapiParser.vala --pkg libvala-0.24 --pkg posix -o /tmp/treebuilder

namespace Palete {
	 
	private class PackageMetaData {
		public  Valadoc.Api.Package  package;
		public Gee.HashMap<Vala.Namespace, Valadoc.Api.Namespace> namespaces = new HashMap<Vala.Namespace, Valadoc.Api.Namespace> ();
		public Gee.ArrayList<Vala.SourceFile> files = new ArrayList<Vala.SourceFile> ();

		public PackageMetaData ( Valadoc.Api.Package  package) {
			this.package = package;
		}

		public Namespace get_namespace (Vala.Namespace vns, SourceFile file) {
			Namespace? ns = namespaces.get (vns);
			if (ns != null) {
				return ns;
			}

			// find documentation comment if existing:
			/*
			SourceComment? comment = null;
			if (vns.source_reference != null) {
				foreach (Vala.Comment c in vns.get_comments()) {
					if (c.source_reference.file == file.data ||
						(c.source_reference.file.file_type == Vala.SourceFileType.SOURCE
						 && ((Vala.SourceFile) file.data).file_type == Vala.SourceFileType.SOURCE)
					) {
						Vala.SourceReference pos = c.source_reference;
						if (c is Vala.GirComment) {
							comment = new GirSourceComment (c.content,
															file,
															pos.begin.line,
															pos.begin.column,
															pos.end.line,
															pos.end.column);
						} else {
							comment = new SourceComment (c.content,
														 file,
														 pos.begin.line,
														 pos.begin.column,
														 pos.end.line,
														 pos.end.column);
						}
						break;
					}
				}
			}
			* */

			// find parent if existing
			var parent_vns = vns.parent_symbol;

			if (parent_vns == null) {
				ns = new Namespace (package, file, vns.name, comment, vns);
				package.add_child (ns);
			} else {
				Namespace parent_ns = get_namespace ((Vala.Namespace) parent_vns, file);
				ns = new Namespace (parent_ns, file, vns.name, comment, vns);
				parent_ns.add_child (ns);
			}

			namespaces.set (vns, ns);
			return ns;
		}

		public void register_source_file (Vala.SourceFile file) {
			files.add (file);
		}

		public bool is_package_for_file (Vala.SourceFile source_file) {
			if (source_file.file_type == Vala.SourceFileType.SOURCE && !package.is_package) {
				return true;
			}

			return files.contains (source_file);
		}
	}

	 

	public class VapiParser : Vala.CodeVisitor {
		private ArrayList<PackageMetaData> packages = new ArrayList<PackageMetaData> ();
		Vala.CodeContext context;
 		public VapiParser() {
			base();
			
		}
		private PackageMetaData register_package (Package package) {
			PackageMetaData meta_data = new PackageMetaData (package);
			tree.add_package (package);
			packages.add (meta_data);
			return meta_data;
		}

		
		public void checkPackage(string name)
		{
			// init context:
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
			
			 
			//var vapidirs = ((Project.Gtk)this.file.project).vapidirs();
			// what's the current version of vala???
			
 			
			//vapidirs +=  Path.get_dirname (context.get_vapi_path("glib-2.0")) ;
			
			//for(var i =0 ; i < vapidirs.length; i++) {
			//	valac += " --vapidir=" + vapidirs[i];
			//}
				
			
			// or context.get_vapi_path("glib-2.0"); // should return path..
			//context.vapi_directories = vapidirs;
			context.report.enable_warnings = true;
			context.metadata_directories = { };
			context.gir_directories = {};
			context.thread = true;
			
			
			//this.report = new ValaSourceReport(this.file);
			//context.report = this.report;
			
			
			context.basedir = "/tmp"; //Posix.realpath (".");
		
			context.directory = context.basedir;
		

			// add default packages:
			//if (settings.profile == "gobject-2.0" || settings.profile == "gobject" || settings.profile == null) {
			context.profile = Vala.Profile.GOBJECT;
 			 
			var ns_ref = new Vala.UsingDirective (new Vala.UnresolvedSymbol (null, "GLib", null));
			context.root.add_using_directive (ns_ref);
 
			// default.. packages..
			context.add_external_package ("glib-2.0"); 
			context.add_external_package ("gobject-2.0");
			// user defined ones..
			context.add_package ("Gtk");
	    	  
			var vfile = new Vala.SourceFile (context, Vala.SourceFileType.PACKAGE, "/usr/share/vala-0.26/vapi/gtk+-3.0.vapi");
			context.add_source_file (vfile);
			Package vdpkg = new Package (pkg, true, null);
			register_source_file (register_package (vdpkg), vfile);
			
			//context.add_external_package ("libvala-0.24");
			
			 
		
			//add_documented_files (context, settings.source_files);
		
			Vala.Parser parser = new Vala.Parser ();
			parser.parse (context);
			//gir_parser.parse (context);
			if (context.report.get_errors () > 0) {
				print("parse got errors");
				 
				
				Vala.CodeContext.pop ();
 				return ;
			}


			
			// check context:
			context.check ();
			if (context.report.get_errors () > 0) {
				print("check got errors");
				 
				Vala.CodeContext.pop ();
				 
				return;
				
			}
			 
			Vala.CodeContext.pop ();
			 
			print("%s\n", valac);
			print("ALL OK?\n");
		 
		}
	//
		// startpoint:
		//
	 
	}
}
 
int main (string[] args) {

	var a = new VapiParser(file);
	a.create_valac_tree();
	return 0;
}
*/


