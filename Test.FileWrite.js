
 

var pr = new imports.Project.Gtk.Gtk({
    xtype : "Gtk",
    name : "Builder4",
    paths : { "/home/alan/gitlive/app.Builder.js/Builder4" : "dir" }
    
});
print(JSON.stringify(pr.files,null,4));
//var f = pr.files['/home/alan/gitlive/app.Builder.js/Builder4/Editor.bjs'];
var f = pr.files['/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.bjs'];
print(JSON.stringify(f,null,4));


File = imports.File.File;


function loaded()
{
    print(JSON.stringify(f,null,4));
    var out  ='';
    var out = f.toVala();
    print(out);;
    File.write("/tmp/"+ f.name + ".vala", out);
    print("/tmp/"+ f.name + ".vala");
    
    
}
f.loadItems(loaded);