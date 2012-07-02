Gtk = imports.gi.Gtk;
Gdk = imports.gi.Gdk;


atoms = {
               "STRING" : Gdk.atom_intern("STRING")
    	};
targetList = new Gtk.TargetList();
targetList.add(  atoms["STRING"], 0, 0);