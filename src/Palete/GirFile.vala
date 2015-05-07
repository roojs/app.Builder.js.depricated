/**
 * This is the old Gir File based API parser..
 * 
 */
namespace Palete {
 
	 
    
	public class GirFile : Gir {
    
	public GirFile (string ns)  
	{
		var xns = ns == "Glade" ? "Gladeui" : ns;
		var gi = GI.Repository.get_default();
		gi.require(xns, null, 0);
		
		var ver = gi.get_version(xns);
		unowned GLib.SList<string>  pth = GI.Repository.get_search_path ();
		var gir_path = pth.nth_data(0).replace("/lib/girepository-1.0", "/share/gir-1.0");
		// 64bit...
		gir_path = gir_path.replace("/lib/x86_64-linux-gnu/girepository-1.0", "/share/gir-1.0");
		
		//console.log(fn);

		
		
		var file  = gir_path + "/" + xns + "-" + ver + ".gir";
		// print("ns: " + ns + "\n");
		// print("ver: " + ver + "\n");
		// print(file);


		base("Package",ns);
		this.ns = ns;
			//this.nodes = new Gee.Hashmap<string,what>();
		 
		var doc = Xml.Parser.parse_file (file);
		var root = doc->get_root_element();
		this.walk( root, (GirObject) this );

		delete doc;
	
	}
