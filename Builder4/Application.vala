

namespace Builder4
{

	public class AppSettings : Object
	{
		public string roo_html_dir { get; set; }
		

		public static AppSettings factory()
		{
			var dirname = GLib.Environment.get_home_dir() + "/.Builder";
			var dir = File.new_for_path(dirname);
		        if (!dir.query_exists()) {
				dir.make_directory();
				 
			}
			var setting_file = dirname + "/builder.settings";
			
			if (!FileUtils.test(setting_file, FileTest.EXISTS)) {
				 return new AppSettings();
			}
			string data; 
			FileUtils.get_contents(setting_file, out data);
			return Json.gobject_from_data (typeof (AppSettings), data) as AppSettings;
		}
		public void save()
		{
			var dirname = GLib.Environment.get_home_dir() + "/.Builder";
			var setting_file = dirname + "/builder.settings";
			string data = Json.gobject_to_data (this, null);
			FileUtils.put_contents(setting_file, out data);
		}

		
	}
	
	
	public static Application application = null;
	
	public class Application : Gtk.Application
	{
		enum Target {
		    INT32,
		    STRING,
		    ROOTWIN
		}


		public const Gtk.TargetEntry[] targetList = {
		    { "INTEGER",    0, Target.INT32 },
		    { "STRING",     0, Target.STRING },
		    { "text/plain", 0, Target.STRING },
		    { "application/x-rootwindow-drop", 0, Target.ROOTWIN }
		};
		public AppSettings settings = null;

	
		public Application ()
		{
			Object(
			       application_id: "org.roojs.app-builder",
				flags: ApplicationFlags.FLAGS_NONE
			);
			 
			
			this.settings = AppSettings.factory();	
			
		

		}
		public static Application  singleton()
		{
			if (application==null) {
				application = new Application();
 
			
			}
			return application;
		}
	} 

	


		
	
}
