 

static int rid = 1;

class Project.Roo : Project {
	public string xtype {
		  get { return "Gtk"; }
	  }

    Roo(string path) {
        
        base(path);
       
        // various loader methods..
        this.id = "project-roo-%d".printf(rid++);
        
    }
}
 
 