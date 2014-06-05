//<Script type="text/javascript">

 

namespace Project {
  static int gtk_id = 1;

 

  public class Gtk : Project
  {
	   
     public Gtk(string path) {
		  
		  
          base(path);
		  this.xtype = "Gtk";
          var gid = "project-gtk-%d".printf(gtk_id++);
          this.id = gid;
          // various loader methods..
        
      }
  }
}
