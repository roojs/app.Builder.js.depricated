//<Script type="text/javascript">

 



public class Project.Gtk : Project
{

   static int id = 1;

  Gtk(string path) {
        
        Base(path);
       
        // various loader methods..
        this.id = "project-gtk-%s".sprintf(Project.Gtk.id++);
        this.xtype = "Gtk";
    }
}
 
 