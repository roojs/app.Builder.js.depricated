Gtk = imports.gi.Gtk;
Gdk = imports.gi.Gdk;


atoms = {
               "STRING" : Gdk.atom_intern("STRING")
    	};
targetList = new Gtk.TargetList();
targetList.add(  atoms["STRING"], 0, 0);



Gtk.rc_parse_string(
            "style \"gtkcombobox-style\" {\n" + 
            "    GtkComboBox::appears-as-list = 1\n" +
            "}\n"+
            "class \"GtkComboBox\" style \"gtkcombobox-style\"\n");


//imports.Window.Window.el.show_all();
