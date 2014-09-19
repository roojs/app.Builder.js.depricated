/**
 * Test the writer code...


*/

public Project.Project proj;

int main (string[] args) {
	Gtk.init (ref args);
	GtkClutter.init (ref args);
	new JsRender.Lang_Class();
	GLib.Log.set_always_fatal(LogLevelFlags.LEVEL_ERROR | LogLevelFlags.LEVEL_CRITICAL);

	var r  = Palete.factory("Roo");
	var res = r.validateCode(
 	          "if (true) { alert('test'); }",
                 "| function aaa",
	       	 "javascript"
	);
	  res = r.validateCode(
 	          "
if (true) { 
	alert('test'); 
}

{ a syntax error ",
               "| function aaa",
	       	 "javascript"
	);                       
	    
	
	return 0;
}
 