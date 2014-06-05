 

static int rid = 1;

class Project.Roo : Project {

	 

    Roo(string path) {

		
        base(path);
        this.xtype = "Roo";
        // various loader methods..
        this.id = "project-roo-%d".printf(rid++);
        
    }
}
 
 