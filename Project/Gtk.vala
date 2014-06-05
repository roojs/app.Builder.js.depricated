//<Script type="text/javascript">

 

namespace Project {
  static int gtk_id = 1;

 

  public class Gtk : Project
  {
	 public string gtk = "xtype";
	  
     public Gtk(string path) {
		  
		 
          base(path);
		 
          var gid = "project-gtk-%d".printf(gtk_id++);
          this.id = gid;
          // various loader methods..
        
     }
	 construct {
		   this.xtype = "Gtk";
	 }
  }
}
