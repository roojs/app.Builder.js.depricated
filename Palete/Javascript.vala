



namespace Palete {

	Javascript instance = null;
	
	public class Javascript {


		public static JSCore.Object class_constructor(
				JSCore.Context ctx, 
				JSCore.Object constructor,  
				JSCore.Value[] arguments, 
                              out JSCore.Value exception) 
		{
		        var c = new JSCore.Class (class_definition);
		        var o = new JSCore.Object (ctx, c, null);

		        return o;
		}
		static const JSCore.StaticFunction[] class_functions = {
		         { null, null, 0 }
		};
		static const JSCore.ClassDefinition class_definition = {
		    0,
		    JSCore.ClassAttribute.None,
		    "App",
		    null,

		    null,
		    class_functions,

		    null,
		    null,

		    null,
		    null,
		    null,
		    null,

		    null,
		    null,
		    class_constructor,
		    null,
		    null
		};

		
		public JSCore.GlobalContext js_global_context =  null;

		public static Javascript singleton()
		{
			if (instance == null) {
				instance = new Javascript();
			}
			return instance;
		}
		public Javascript()
		{
			var goc = new JSCore.Class(  class_definition ); 
			this.js_global_context = new JSCore.GlobalContext(goc);
			

		}
		public bool validate(string code, out string res)
		{
			JSCore.Value ex;
			unowned   JSCore.GlobalContext ctx = this.js_global_context;
			var ret = this.js_global_context.check_script_syntax(
	                           new JSCore.String.with_utf8_c_string(code),
	                           null,
	                           0,
	                           out ex
           		);
			res = ""; 
			if (ex.is_null(ctx)) {
				return ret;
			}

			var exo = ex.to_object(ctx, null);
			unowned JSCore.PropertyNameArray property_names = exo.copy_property_names (ctx);

			print("got %d props\n", (int)property_names.get_count());
			
			JSCore.String js_string = exo.to_string_copy (ctx, null);
			char *c_string = new char[1024];
			
			for (var i=0; i< property_names.get_count(); i++) {
				js_string = property_names.get_name_at_index (i);
				c_string = new char[1024];
				js_string.get_utf8_c_string (c_string, 1023);
				print ("\t%i: %s\n", i, (string)c_string);
				delete c_string;
			}
			res = "??";
			
			return ret;
		
			
		}
		

	}

	


} 