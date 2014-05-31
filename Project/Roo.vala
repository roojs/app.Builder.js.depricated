 

static int id = 1;

class Project.Roo : Project {

    void Roo(string path) {
        
        Base(path);
       
        // various loader methods..
        this.id = "project-gtk-%s".sprintf(id++);
        this.xtype = "Roo";
    }
}
 
 