//<Script type="text/javascript">

 



class Project.Gtk : Project.Projects


   static int id = 1;

  void Gtk(string path) {
        
        Base(path);
       
        // various loader methods..
        this.id = "project-gtk-%s".sprintf(Project.Gtk.id++);
        this.xtype = "Gtk";
    }
)
 
 