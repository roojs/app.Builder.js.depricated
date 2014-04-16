Gtk = imports.gi.Gtk;
Gdk = imports.gi.Gdk;

Window = imports.Builder3.Window.Window;

JSON.xstringify = function (o) {
	  var seen = [];
	  return JSON.stringify(o, function(_, value) {
		  if (typeof value === 'object' && value !== null) {
			  if (seen.indexOf(value) !== -1) return null;
			  else seen.push(value);
		  }
		  return value;
	  }, 4);
}

/*
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

*/
Window.el.show_all();


// this ties two elements together...
// it used to hapen in the init() code for the element, it should be moved to a 'global init for a whole module'
var pm = imports.ProjectManager.ProjectManager;

var combomodel =  Window.get('/LeftProjectTree.combomodel');
pm.on('changed', function() {
      print("caught changed hook on project manager - reloading data");
     combomodel.loadData(pm.projects);

});
 