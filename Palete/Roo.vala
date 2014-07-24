namespace Palete {

	
/*	
	
	
    public class Introspect.El : Object
    {
        public enum eltype { 
            NS,
            CLASS,
            METHOD,
            PROP
        }
                
            
        public eltype type;
    }

*/
    public class Roo : Palete {
		
		
        public Roo()
        {


            
            base();
            this.name = "Roo";
			  
        }

	Gee.HashMap<string,GirObject> PropsFromJSONArray(string type, JSON.Array)
	{
		for (
			var name = o.get_string_member("name"); 
			var prop = new GirObject(string, name );  
			prop.type        = o.get_string_member("type");
		        prop.doctxt  = o.get_string_member("desc");
			prop.propertyof = o.get_string_member("memberOf");
	    
        public override void  load () {

		this.loadUsageFile("/usr/share/appBuilder/RooUsage.txt");


            
		var pa = new Json.Parser();
		pa.load_from_file("/usr/share/appBuilder/rooprops.txt");
		var node = pa.get_root();

		var clist =  node.get_object().get_object_member("data");
    		clist.foreach_member((o , key, value) => {
			//print(key+"\n");
		 
			{
		his.classes    = new Gee.HashMap<string,GirObject>();
		this.props      = new Gee.HashMap<string,GirObject>();
		this.consts     = new Gee.HashMap<string,GirObject>();
		this.signals    = new Gee.HashMap<string,GirObject>();
			var cls = new GirObject("class", key);  
			cls.members o.get_object().get_array_member("props");
			var props = o.get_object().get_array_member("events");
			
/*
{
 "success": true,
 "data": {
  "Array": {
   "props": [],
   "events": []
  },
  "Date": {
   "props": [],
   "events": []
  },
  
  "Roo.Ajax": {
	  ....
}

    		
		
             
        }
	  
        
        public string doc(string what) {
		return "";
		/*var ns = what.split(".")[0];


		
		
            var gir =  Gir.factory(ns);
			return   gir.doc(what);
			*/
			
            //return typeof(this.comments[ns][what]) == 'undefined' ?  '' : this.comments[ns][what];
        }

		// does not handle implements...
		
        public override Gee.HashMap<string,GirObject> getPropertiesFor(string ename, string type)
        {
		    //print("Loading for " + ename);
		    


				// if (typeof(this.proplist[ename]) != 'undefined') {
		        //print("using cache");
		     //   return this.proplist[ename][type];
		    //}
		    // use introspection to get lists..
	 
   		var es = ename.split(".");
		var gir = Gir.factory(es[0]);

		var cls = gir.classes.get(es[1]);
		if (cls == null) {
			var ret = new Gee.HashMap<string,GirObject>();
			return ret;
			//throw new Error.INVALID_VALUE( "Could not find class: " + ename);
	
		}

		//cls.parseProps();
		//cls.parseSignals(); // ?? needed for add handler..
		//cls.parseMethods(); // ?? needed for ??..
		//cls.parseConstructors(); // ?? needed for ??..

		cls.overlayParent();

		switch  (type) {
			case "props":
				return cls.props;
			case "signals":
				return cls.signals;
			case "methods":
				return cls.methods;
			case "ctors":
				return cls.ctors;
			default:
				throw new Error.INVALID_VALUE( "getPropertiesFor called with: " + type);
				//var ret = new Gee.HashMap<string,GirObject>();
				//return ret;
		
		}
		
	
		//cls.overlayInterfaces(gir);


             
        }
	public string[] getInheritsFor(string ename)
	{
		string[] ret = {};
		var es = ename.split(".");
		var gir = Gir.factory(es[0]);
		
		var cls = gir.classes.get(es[1]);
		if (cls == null) {
			return ret;
		}
		return cls.inheritsToStringArray();
		

	}


	public override void fillPack(JsRender.Node node,JsRender.Node parent)
	{   

		 return;
	}
 
	
    }
}
 
