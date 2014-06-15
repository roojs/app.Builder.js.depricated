

namespace Builder4
{

	class Application : Gtk.Application
	{
		
		 private static  TargetEntry[] _targetList = null;

		 static TargetEntry[]  targetList {
			get {
				if (_targetList == null) {
					 
					var tl = new Gtk.TargetList();
					tl.add(  Gdk.atom_intern("STRING"), 0, 0);
					_targetList+= tl;
				}
				return _targetList;
			}
		}
	}
}
