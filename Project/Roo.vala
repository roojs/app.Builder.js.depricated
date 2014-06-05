 

static int rid = 1;

class Project.Roo : Project {

	 

    Roo(string path) {

		this.xtype = "Roo";
        base(path);
       
        // various loader methods..
        this.id = "project-roo-%d".printf(rid++);
        
    }
}
 
 