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
        
		public RooDatabase (Project project)
        {
            this.project = project;
            
        }
        
        
        
        
	}
	
}

        
    
