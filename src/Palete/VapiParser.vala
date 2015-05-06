

// valac VapiParser.vala --pkg libvala-0.24 --pkg posix -o /tmp/treebuilder

namespace Palete {
	 
	 
	 

	public class VapiParser : Vala.CodeVisitor {
		
		static  Gee.HashMap<string,Gir> cache = null;
		
		
		
 		Vala.CodeContext context;
 		public VapiParser() {
			base();
			if (cache == null) {
				cache =  new Gee.HashMap<string,Gir>();
			}
		}
		
		
		
		public override void visit_namespace (Vala.Namespace element) {
			print("parsing namespace %s\n", element.name);
			
			var g = new Gir.new_empty(element.name);
			cache.set(element.name, g);
			
			
			foreach(var c in element.get_classes()) {
				this.add_class(g, c);
			}
			
			 
			
			
		}
		
		public void add_class(GirObject parent, Vala.Class cls)
		{
		
			var c = new GirObject("Class", parent.name + "." + cls.name);
			parent.classes.set(cls.name, c);
			c.ns = parent.name;
			c.parent = cls.base_class.get_full_name() ;  // extends...
			c.gparent = parent;
			
			foreach(var p in element.get_properties()) {
				this.add_property(c, p);
			}
			// methods...
			
			 
		}
		public void add_property(GirObject parent, Vala.Property prop)
		
			var c = new GirObject("Prop",prop.name);
			c.gparent = parent;
			c.ns = parent.ns;
			c.propertyof = parent.name;
			c.type  = prop.property_type.data_type..get_full_name();
			parent.props.set(prop.name,c);
			
		}
			  
		
		public void create_valac_tree( )
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
			context.add_external_package ("gdk-3.0");
			context.add_external_package ("atk");
			context.add_external_package ("gdk-x11-3.0");
			context.add_external_package ("x11");
			
			// user defined ones..
			//context.add_package ("Gtk");
	    	  
			var vfile = new Vala.SourceFile (context, Vala.SourceFileType.PACKAGE, "/usr/share/vala-0.26/vapi/gtk+-3.0.vapi");
			context.add_source_file (vfile);
			 
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
			 
			context.accept(this);
			print("ALL OK?\n");
		 
		}
	//
		// startpoint:
		//
	 
	}
}
 
int main (string[] args) {

	var a = new Palete.VapiParser( );
	a.create_valac_tree();
	return 0;
}
 


