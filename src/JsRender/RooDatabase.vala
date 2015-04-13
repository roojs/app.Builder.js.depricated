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
        
          
        
        public JSON.Array readTables()
        {
			
			if (this.project.DBNAME == "PostgreSQL") {
				
				return this.fetchAll(this.cnc.execute_select_command( 
					"""select c.relname FROM pg_catalog.pg_class c 
						LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace 
						WHERE c.relkind IN ('r','') AND n.nspname NOT IN ('pg_catalog', 'pg_toast')
						AND pg_catalog.pg_table_is_visible(c.oid) 
					""");
				
			}
			if (this.project.DBNAME == "MySQL") { 
				return this.fetchAll(this.cnc.execute_select_command( "SHOW TABLES" );
			}
			return new JSON.Array();
			
		}
		
		public JSON.Array readTable(string tablename) {
			if (this.project.DBNAME == "PostgreSQL") {
				
				return this.fetchAll(this.cnc.execute_select_command( 
					"""
					
					 SELECT 
                f.attnum AS number, 
                f.attname AS Field, 
                f.attnum, 
                CASE WHEN f.attnotnull = 't' THEN 'NO' ELSE 'YES' END AS isNull,  
                pg_catalog.format_type(f.atttypid,f.atttypmod) AS Type, 
                CASE WHEN p.contype = 'p' THEN 't' ELSE 'f' END AS primarykey, 
                CASE WHEN p.contype = 'u' THEN 't' ELSE 'f' END AS uniquekey, 
                CASE WHEN p.contype = 'f' THEN g.relname END AS foreignkey, 
                CASE WHEN p.contype = 'f' THEN p.confkey END AS foreignkey_fieldnum, 
                CASE WHEN p.contype = 'f' THEN g.relname END AS foreignkey, 
                CASE WHEN p.contype = 'f' THEN p.conkey END AS foreignkey_connnum, 
                CASE WHEN f.atthasdef = 't' THEN d.adsrc END AS default 
                FROM pg_attribute f JOIN pg_class c ON c.oid = f.attrelid 
                        JOIN pg_type t ON t.oid = f.atttypid 
                        LEFT JOIN pg_attrdef d ON d.adrelid = c.oid AND d.adnum = f.attnum 
                        LEFT JOIN pg_namespace n ON n.oid = c.relnamespace 
                        LEFT JOIN pg_constraint p ON p.conrelid = c.oid AND f.attnum = ANY ( p.conkey ) 
                        LEFT JOIN pg_class AS g ON p.confrelid = g.oid 
                WHERE c.relkind = 'r'::char AND n.nspname = 'public' 
                AND c.relname = '""" + tablename + """' AND f.attnum > 0 ORDER BY number;
					
					""");
				
			}
			if (this.project.DBNAME == "MySQL") { 
				return this.fetchAll(this.cnc.execute_select_command( "DESCRIBE " + tablename );
			}
			return  new JSON.Array();;
			
			
			
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

        
    
