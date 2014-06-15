

namespace Builder4
{
	

	class Application : Gtk.Application
	{
		enum Target {
		    INT32,
		    STRING,
		    ROOTWIN
		}


		const Gtk.TargetEntry[] targetList = {
		    { "INTEGER",    0, Target.INT32 },
		    { "STRING",     0, Target.STRING },
		    { "text/plain", 0, Target.STRING },
		    { "application/x-rootwindow-drop", 0, Target.ROOTWIN }
		};
	} 
}
