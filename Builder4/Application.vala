

namespace Builder4
{
	

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

	public GLib.Settings settings;

	
	public Application ()
	{
		Object(
		       application_id: "AppBuilder",
			flags: ApplicationFlags.FLAGS_NONE
	        );
		
		this.settings = new GLib.Settings(this.application_id);
		

	}
	public static  singleton()
	{
		if (!application) {
			application = new Application();
		}
		return application;
	
}
