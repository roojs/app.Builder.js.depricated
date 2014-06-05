//<Script type="text/javascript">

 

namespace Project {
  static int gtk_id = 1;
  

  public class Gtk : Project
  {

     
     public Gtk(string path) {
		  
          this.xtype = "Gtk";
          base(path);
          var gid = "project-gtk-%d".printf(gtk_id++);
          this.id = gid;
          // various loader methods..
        
      }
  }
}
