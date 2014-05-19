
 

var pr = new imports.Project.Gtk.Gtk({
    xtype : "Gtk",
    name : "Builder4",
    paths : { "/home/alan/gitlive/app.Builder.js/Builder4" : "dir" }
    
});
print(JSON.stringify(pr.files,null,4));
var f = pr.files['/home/alan/gitlive/app.Builder.js/Builder4/Editor.bjs'];
print(JSON.stringify(f,null,4));


File = imports.File.File;


function loaded()
{
    print(JSON.stringify(f,null,4));
    var out  ='';
    print(f.toVala(function(str) {
        //print(str);
        out+=str;
        
    }));
    print(out);
    File.write("/tmp/test.vala", out);
    print('/tmp/test.vala');
    
    
}
f.loadItems(loaded);