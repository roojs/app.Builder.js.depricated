

namespace Builder4
{

	class Application : Gtk.Application
	{
		
		 private static  Gtk.TargetEntry[] _targetList = null;

		 static Gtk.TargetEntry[]  targetList {
			get {
				if (_targetList == null) {
					 
					var tl =   Gtk.TargetEntry( Gdk.Atom.intern("STRING", true), 0, 0);
					 
					_targetList += tl;
				}
				return _targetList;
			}
		}
	}
}
