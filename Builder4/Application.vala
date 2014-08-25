

namespace Builder4
{

	public static string initConfigDirectory()
	{
		var dirname = GLib.Environment.get_home_dir() + "/.Builder";
		var dir = File.new_for_path(dirname);
	        if (!dir.query_exists()) {
			dir.make_directory();
			 
		}
		return dirname;
	}
	
	public class AppSettings : Object
	{

		// what are we going to have as settings?
		public string roo_html_dir { get; set; }

		public AppSettings()
		{
			this.notify.connect(() => {
				this.save();
			});
		}

		public static AppSettings factory()
		{
			 
			var setting_file = initConfigDirectory() + "/builder.settings";
			
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
			print("saving application settings\n");
			FileUtils.set_contents(setting_file,   data);
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
					 
			initConfigDirectory();
			this.settings = AppSettings.factory();	

			this.initResources(); 
		

		}


		
		public static Application  singleton()
		{
			if (application==null) {
				application = new Application();
 
			
			}
			return application;
		}

		

		public void initResources()
		{
			// files to fetch from resources.
			string[] res = { 
				"bootstrap.builder.html",
				"roo.builder.html",
				"roo.builder.js"
			};
			for (var i = 0; i < res.length; i++ ) { 
				this.checkResource(res[i]);
			}

		}
		public void checkResource(string res) {
			if (FileUtils.test(initConfigDirectory() + "/resources/" + res, FileTest.EXISTS)) {
				return;
			}
			// fetch...
			
			var session = new Soup.Session ();
		        var message = new Soup.Message ("GET", 
                		"http://git.roojs.org/?p=app.Builder.js;a=blob_plain;f=resources/" + res
                        );

			    // send the HTTP request and wait for response
		         session.send_message (message);

			    // output the XML result to stdout
			FileUtils.set_contents(initConfigDirectory() + "/resources/" + res,
			                      message.response_body.data
                      );


		}


		
	} 


	
	


		
	
}
