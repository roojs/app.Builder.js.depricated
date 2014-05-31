//<Script type="text/javascript">

 



public class Project.Gtk : Project
{

   static int id = 1;

  Gtk(string path) {
        
        base(path);
       
        // various loader methods..
        this.id = "project-gtk-%s".printf(Gtk.id++);
        this.xtype = "Gtk";
    }
}
 
 