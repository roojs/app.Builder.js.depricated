



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

			
		}
		

	}

	


} 