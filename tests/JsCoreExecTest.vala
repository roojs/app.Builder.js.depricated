
// valac --vapidir ../src/vapi JsCoreExecTest.vala ../src/Palete/Javascript.vala --pkg javascriptcore  -o /tmp/jstest

 
int main (string[] args) {
	 var js = Palete.Javascript.singleton();
	 js.executeFile("/home/alan/gitlive/app.Builder.js/tests/hello.js", 
			"hello", "{}");
	  
	
	return 0;
}
 
