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
            this.cnc = Gda.Connection.open_from_string (
				cfg.DBTYPE,
				"DB_NAME=" + this.project.DBNAME, 
				"USERNAME=" + this.project.DBUSERNAME + 
				';PASSWORD=' + this.project.DBPASSWORD,
				Gda.ConnectionOptions.NONE, null
			);
            
        }
        
        public Gee.List<string> tables;
        
        
        
        
        public JSON.Array readTables()
        {
			
			if (this.project.DBNAME == "PostgreSQL") {
				
				return this.fetchAll(this.cnc.execute_select_command( 
					"""select c.relname FROM pg_catalog.pg_class c 
						LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace 
						WHERE c.relkind IN ('r','') AND n.nspname NOT IN ('pg_catalog', 'pg_toast')
						AND pg_catalog.pg_table_is_visible(c.oid) 
					""");
				
				
			 
			return this.fetchAll(this.cnc.execute_select_command( "SHOW TABLES" );
			
			 
			
		}
        
        public JSON.Array fetchAll(qnr)
		{
			var cols = new Gee.List<string>();
			
			for (var i =0;i < qnr.get_n_columns(); i++) {
				cols.add(qnr.get_column_name(i));
			}
			//print(JSON.stringify(cols, null,4));
			var iter = qnr.create_iter();
			var res = new JSON.Array();
			//print(this.get_n_rows());
			
			for (var r = 0; qnr.get_n_rows(); r++) {
				
				// single clo..
				//print("GOT ROW");
				if (cols.size == 1) {
					res.add_string_element(qnr.get_value_at(0,r).get_string());
					continue;
				}
				
				var add = new JSON.Object();
				
				for (i = 0; i < cols.size; i++) { 
					var n = cols.get(i);
					var val = qnr.get_value_at(i,r);
					var type = GObject.type_name(val.g_type) ;
					if (type == "GdaBinary" || type == "GdaBlob") {
						add.set_string_member(n, val.value.to_string(1024));
						continue;
					}
					add.set_string_member(n, val.value);
					
				}
				
				res.add_object_element(add);
				
			}
			return res;

		}
	}
	
}

        
    
