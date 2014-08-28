

namespace Builder4
{

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
			 
			var setting_file = Application.configDirectory() + "/builder.settings";
			
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
					 
			configDirectory();
			this.settings = AppSettings.factory();	

			this.initResources(true); 
		

		}


		
		public static Application  singleton()
		{
			if (application==null) {
				application = new Application();
 
			
			}
			return application;
		}

		
		public static string configDirectory()
		{
			var dirname = GLib.Environment.get_home_dir() + "/.Builder";
		
			if (!FileUtils.test(dirname,FileTest.IS_DIR)) {
				var dir = File.new_for_path(dirname);
				dir.make_directory();	 
			}
			if (!FileUtils.test(dirname + "/resources",FileTest.IS_DIR)) {
				var dir = File.new_for_path(dirname + "/resources");
				dir.make_directory();	 
			}

		
			return dirname;
		}
	

		public void initResources(bool force = false)
		{
			// files to fetch from resources.
			string[] res = { 
				"bootstrap.builder.html",
				"roo.builder.html",
				"roo.builder.js",
				"Gir.overides"
			};
			for (var i = 0; i < res.length; i++ ) { 
				this.fetchResource(res[i], force);
			}
			this.fetchResourceFrom (
	                        "http://git.roojs.org/?p=app.Builder.js;a=blob_plain;f=Palete/RooUsage.txt",
	                        "RooUsage.txt",
                		force
                        );
			this.fetchResourceFrom (
	                        "http://git.roojs.org/?p=app.Builder.js;a=blob_plain;f=Palete/GtkUsage.txt",
	                        "GtkUsage.txt",
                		force
                        );
			this.fetchResourceFrom (
	                        "http://git.roojs.org/?p=roojs1;a=blob_plain;f=docs/json/roodata.json",
	                        "roodata.json",
                		force
                        );
			

		}
		public void fetchResource(string res, bool force) {
			if (!force && FileUtils.test(configDirectory() + "/resources/" + res, FileTest.EXISTS)) {
				return;
			}
			this.fetchResourceFrom(
	                       "http://git.roojs.org/?p=app.Builder.js;a=blob_plain;f=resources/" + res,
	                       res,
			       force
                       );
			

		}

		public void fetchResourceFrom(string src, string res, bool force) {
			if (!force && FileUtils.test(configDirectory() + "/resources/" + res, FileTest.EXISTS)) {
				return;
			}
			// fetch...
			print("downloading %s \nto : %s\n", src,res);
			var session = new Soup.Session ();
			session.user_agent = "App Builder ";
		        var message = new Soup.Message ("GET", 
                		src
                        );

			    // send the HTTP request and wait for response
		         session.send_message (message);

			    // output the XML result to stdout
			FileUtils.set_contents(
	                       configDirectory() + "/resources/" + res,
	                      (string) message.response_body.data
                        );


		}
		
	} 


	
	


		
	
}
