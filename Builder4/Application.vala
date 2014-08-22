

namespace Builder4
{
	
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
	} 

	public AppSettings settings;

	
	public Application ()
	{
		Object(
		       application_id: "org.roojs.app-builder",
			flags: ApplicationFlags.FLAGS_NONE
	        );
		
		this.settings = new GLib.AppSettings();
		

	}
	public static Application  singleton()
	{
		if (!application) {
			application = new Application();
			application.init();
			
		}
		return application;
	}

	public void init()
	{
		

		
	
}
