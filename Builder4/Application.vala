

namespace Builder4
{

	class Application : Gtk.Application
	{
		const Gtk.TargetEntry[] targetList = {
		    { "INTEGER",    0, Gtk.Target.INT32 },
		    { "STRING",     0, Gtk.Target.STRING },
		    { "text/plain", 0, Gtk.Target.STRING },
		    { "application/x-rootwindow-drop", 0, Gtk.Target.ROOTWIN }
		};
	} 
}
