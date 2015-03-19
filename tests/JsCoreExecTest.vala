
// valac -g --vapidir ../src/vapi JsCoreExecTest.vala ../src/Palete/Javascript.vala ../src/c/jscore_object_call_as_function.c  --pkg javascriptcore  --pkg libsoup-2.4  --pkg webkit2gtk-3.0 --pkg  gtk+-3.0 -o /tmp/jstest

 
int main (string[] args) {
	 var js = Palete.Javascript.singleton();
	 js.executeFile("/home/alan/gitlive/app.Builder.js/tests/hello.js", 
			"hello", "{}");
	  
	
	return 0;
}
 
