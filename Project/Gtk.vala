//<Script type="text/javascript">
/**
 * Gtk projects - normally vala based now..
 * 
 * should have a few extra features..
 * 
 * like:
 *   compile flags etc..
 *   different versions (eg. different files can compile different versions - eg. for testing.
 *   
 * If we model this like adjuta - then we would need a 'project' file that is actually in 
 * the directory somewhere... - and is revision controlled etc..
 * 
 * 
 *  
 * 
 * 
 */
 

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
