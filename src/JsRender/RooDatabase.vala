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
        //public Project.Project project;

		public string DBTYPE;
		public string DBNAME;
		 
        public Gda.Connection cnc;
        /*
		public RooDatabase (Project.Project project)
        {
            this.project = project;
			this.DBTYPE = this.project.json_project_data.get_string_member("DBTYPE");
			this.DBNAME = this.project.json_project_data.get_string_member("DBNAME");
				this.cnc = Gda.Connection.open_from_string (
				this.DBTYPE,
				"DB_NAME=" + this.DBNAME, 
				"USERNAME=" + this.project.json_project_data.get_string_member("DBUSERNAME") + 
				";PASSWORD=" + this.project.json_project_data.get_string_member("DBPASSWORD"),
				Gda.ConnectionOptions.NONE
			);
            
        }
        * */
        public RooDatabase.from_cfg (string dbtype, string dbname, string dbuser, string dbpass)
         {
             this.DBTYPE = dbtype;
			this.DBNAME = dbname;
		
             this.cnc = Gda.Connection.open_from_string (
				this.DBTYPE,
				"DB_NAME=" + dbname, 
				"USERNAME=" + dbuser + 
				";PASSWORD=" + dbpass,
				Gda.ConnectionOptions.NONE
			);


	    
	}
          
        
        public Json.Array readTables()
        {
			
			if (this.DBTYPE == "PostgreSQL") {
				
				return this.fetchAll(this.cnc.execute_select_command( 
					"""select c.relname FROM pg_catalog.pg_class c 
						LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace 
						WHERE c.relkind IN ('r','') AND n.nspname NOT IN ('pg_catalog', 'pg_toast')
						AND pg_catalog.pg_table_is_visible(c.oid) 
					"""));
				
			}
			if (this.DBTYPE == "MySQL") { 
				return this.fetchAll(this.cnc.execute_select_command( "SHOW TABLES" ));
			}
			return new Json.Array();
			
		}
		
		public Json.Array readTable(string tablename) {
			if (this.DBTYPE== "PostgreSQL") {
				
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
							
					"""));
				
			}
			if (this.DBTYPE== "MySQL") { 
				return this.fetchAll(this.cnc.execute_select_command( "DESCRIBE " + tablename ));
			}
			return  new Json.Array();
			
			
			
		}
		
		public Json.Array readForeignKeys(string table)
        {
			var ret =   new Json.Array();
			// technically we should use FK stuff in mysql, but for the momemnt use my hacky FK()
			if (this.DBTYPE != "MySQL") { 
				return  ret;
			}
			
			var query = """
				SELECT 
				TABLE_COMMENT 
				FROM
				information_schema.TABLES
				WHERE
				TABLE_NAME = '""" + table + """'
				AND
				TABLE_SCHEMA = '""" + this.DBNAME + """'
			""";
			
			var jarr = this.fetchAll(this.cnc.execute_select_command( 
					query
					));
			print(query);
			if (jarr.get_length() < 1) {
				return  ret;
			}
			return ret;
			
			var contents = jarr.get_string_element(0);
			
			 GLib.Regex exp = /FK\(([^\)]+)\)/;
			 string str = "";
			 try {
				GLib.MatchInfo mi;
				if ( exp.match (contents, 0, out mi) ) {
					mi.next();
					str = mi.fetch(0);
				}
			} catch (GLib.Error e) {
				return  ret;
			}
			var ar = str.split("\n");
			for (var i = 0; i < ar.length; i++) {
				var kv = ar[i].split("=");
				var o = new Json.Object();
				o.set_string_member("key", kv[0].strip());
				var lr = kv[1].split(":");
				o.set_string_member("table", lr[0].strip());
				o.set_string_member("col", lr[1].strip());
				ret.add_object_element(o);
			}
			return ret;
				
        
        
		}
        public Json.Array fetchAll(Gda.DataModel qnr)
		{
			var cols = new Gee.ArrayList<string>();
			
			for (var i =0;i < qnr.get_n_columns(); i++) {
				cols.add(qnr.get_column_name(i));
			}
			//print(Json.stringify(cols, null,4));
			var iter = qnr.create_iter();
			var res = new Json.Array();
			 print("ROWS %d\n", this.get_n_rows());
			
			for (var r = 0; r < qnr.get_n_rows(); r++) {
				
				// single clo..
				//print("GOT ROW");
				print("COLS  %d\n", cols.size);
				if (cols.size == 1) {
					res.add_string_element(qnr.get_value_at(0,r).get_string());
					continue;
				}
				
				var add = new Json.Object();
				
				for (var i = 0; i < cols.size; i++) { 
					var n = cols.get(i);
					var val = qnr.get_value_at(i,r);
					var type = val.type().name();
					//print("%s\n",type);
					switch(type) {
						case "GdaBinary":
						case "GdaBlob":
							add.set_string_member(n, "?? big string ??");
							break;
							
						case  "GdaNull":
							add.set_null_member(n);
							break;
						
						default:
							add.set_string_member(n, val.get_string());
							break;
					}
					
				}
				
				res.add_object_element(add);
				
			}
			return res;

		}
		
		
		
	}
	
	
}
// valac --pkg libgda-5.0 --pkg gee-1.0 --pkg json-glib-1.0  --pkg libxml-2.0   RooDatabase.vala  -o /tmp/rdtest

 void main() {
     var x = new JsRender.RooDatabase.from_cfg("MySQL", "hydra", "root", "");
    // var res = x.readTables();
    //var res= x.readTable("Person");
    var res= x.readForeignKeys("Person");
    
	var  generator = new Json.Generator ();
    var  root = new Json.Node(Json.NodeType.ARRAY);
    root.init_array(res);
    generator.set_root (root);
    
	    generator.pretty = true;
	    generator.indent = 4;
    

    print("%s\n", generator.to_data (null));
 }
