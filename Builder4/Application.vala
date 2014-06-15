

namespace Builder4
{

	class Application : Gtk.Application
	{
		
		 private static  Gtk.TargetEntry[] _targetList = null;

		 static Gtk.TargetEntry[]  targetList {
			get {
				if (_targetList == null) {
					 
					var tl = new Gtk.TargetEntry( Gdk.atom_intern("STRING"), 0, 0);
					 
					_targetList += tl;
				}
				return _targetList;
			}
		}
	}
}
