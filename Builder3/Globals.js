


atoms = {
               "STRING" : Gdk.atom_intern("STRING")
    	};
targetList = new Gtk.TargetList();
targetList.add(  atoms["STRING"], 0, 0);