/*
 * Renderer for Roo Database code
 * 
 * - Concept - this code does the SQL queries
 *   pulls data from information_schema (on mysql only at present..)
 *   Sends it down the line to the Javascript code. to generate structures 
 * 
 */
 
 // should this be in palete...
namespace JsRender {

  
    class RooDatabase : Object 
    {
        public Project project;
        
        public Gda.Connection cnc;
        
		public RooDatabase (Project project)
        {
            this.project = project;
            
            
        }
        
        public connect()
        {
			this.cnc = Gda.Connection.open_from_string (
				cfg.DBTYPE,
				"DB_NAME=" + this.project.DBNAME, 
				"USERNAME=" + this.project.DBUSERNAME + 
				';PASSWORD=' + this.project.DBPASSWORD,
				Gda.ConnectionOptions.NONE, null
			);



			
		}
        
        
	}
	
}

        
    
