

namespace Builder4
{

	public class AppSettings : Object
	{
		public string str { get; set; }
		public MyEnum en { get; set; }
		public int num { get; set; }


		public AppSettings ()
		{       
			
		}
		public static AppSettings factory()
		{
			var dirname = GLib.Environment.get_home_dir() + "/.Builder";
			var dir = File.new_for_path(dirname);
		        if (!dir.query_exists()) {
				dir.make_directory();
				return;
			}
			var setting_file = dirname + "/builder.settings";
			
			if (!FileUtils.test(setting_file, FileTest.EXISTS)) {
				 return new AppSettings();
			}
			string data; 
			FileUtils.get_contents(settting_file, out data);
			return Json.gobject_from_data (typeof (AppSettings), data) as AppSettings;
		}
	}
	
	
	static Application application = null;
	
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
		public AppSettings settings;

	
		public Application ()
		{
			Object(
			       application_id: "org.roojs.app-builder",
				flags: ApplicationFlags.FLAGS_NONE
			);
			if (File.Exists
			
			this.settings =AppSettings.factory();	
			
		

		}
		public static Application  singleton()
		{
			if (!application) {
				application = new Application();
				application.init();
			
			}
			return application;
		}
	} 

	


		
	
}
