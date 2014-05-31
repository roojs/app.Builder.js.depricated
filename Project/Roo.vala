 

static int rid = 1;

class Project.Roo : Project {

    Roo(string path) {
        
        base(path);
       
        // various loader methods..
        this.id = "project-gtk-%s".printf(rid++);
        this.xtype = "Roo";
    }
}
 
 