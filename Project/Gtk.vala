//<Script type="text/javascript">

 

static int id = 1;


public class Project.Gtk : Project
{

   
  Gtk(string path) {
        
        base(path);
       
        // various loader methods..
        this.id = "project-gtk-%s".printf(id++);
        this.xtype = "Gtk";
    }
}
 
 