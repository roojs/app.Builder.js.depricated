//<Script type="text/javascript">

 

namespace Project {
  static int gtk_id = 1;


  public class Gtk : Project
  {

     
    Gtk(string path) {
          
          base(path);
         
          // various loader methods..
          this.id = "project-gtk-%d".printf(gtk_id++);
          this.xtype = "Gtk";
      }
  }
}
