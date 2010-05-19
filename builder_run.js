//<Script type="text/javascript">

Gtk = imports.gi.Gtk;


ProjectManager  = imports.Builder.Provider.ProjectManager.ProjectManager;
Window          = imports.Builder.Window.Window;

ProjectManager.loadConfig();
     
     
Seed.print('done import window');

Gtk.init(Seed.argv)

Window.init();
 
          
Gtk.main();
 