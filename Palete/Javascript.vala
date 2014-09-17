



namespace Palete {

	Javascript instance = null;
	
	public class Javascript {
		public JSCore.GlobalContext js_global_context =  null;

		public static singleton()
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
		public bool validate(string code, out res)
			JSCore.Value ex;
			
			var ret = this.js_global_context.check_script_syntax(
	                           new JSCore.String.with_utf8_c_string(code),
	                           null,
	                           0,
	                           out ex
           		);
			res = "??";
			return ret;
		
			
		}
		

	}

	


} 