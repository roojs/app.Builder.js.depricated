/**
 * Test the writer code...


*/

public static int main () {


	var proj = new Project.Gtk( "/home/alan/gitlive/app.Builder/Builder4");
	print(proj.toJSON());
	


	//var tf = proj.files['/home/alan/gitlive/app.Builder/Builder4/Editor.bjs'];
	//tf.loadItems(function() {
	//	print(JSON.stringify(tf,null,4));
	//	
		
	//}, true); 

	return 0;
}