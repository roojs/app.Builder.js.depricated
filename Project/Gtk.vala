//<Script type="text/javascript">

 

static int id = 1;

class Project.Gtk : Project.Base {

    void Gtk(string path) {
        
        Base(path);
       
        // various loader methods..
        this.id = "project-gtk-%s".sprintf(id++);
        this.xtype = "gtk";
    }
)
 
 