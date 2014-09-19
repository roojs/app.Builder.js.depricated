
 

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
			exception = null;
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
		public int validate(string code, out string res)
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
				return -1;
			}

	 		
			var exo = ex.to_object(ctx, null);
			unowned JSCore.PropertyNameArray property_names = exo.copy_property_names (ctx);

			
			
			 
			var js_string = new JSCore.String.with_utf8_c_string("line");
			var line = exo.get_property(ctx, js_string, null).to_number(ctx,null);
			
			

			// see if we can convert exception string
			char *c_string = new char[1024];
			var err_string = ex.to_string_copy (ctx, null);
			err_string.get_utf8_c_string (c_string, 1023);
			res = (string)c_string;
			//print ("Error on line %d\n%s\n", (int)line, res); 
			
			var ret = (int) line;
			
			return ret > 0 ? ret -1 : 0;
		
			
		}
		

	}

	


}
 
