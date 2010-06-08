//<script type="text/javascript">

/**
 * 
 * Let's see if libgda can be used to generate our Readers for roo...
 * 
 * Concept - conect to database..
 * 
 * list tables
 * 
 * extra schemas..
 * 
 * write readers..
 * 
 * 
 */
Gda  = imports.gi.Gda;
console = imports['../../../console.js'];
Gda.init();

var prov = Gda.Config.list_providers ();
//print(prov.dump_as_string());

var   cnc = Gda.Connection.open_from_string ("MySQL", "DB_NAME=pman", 
                                              "USERNAME=root;PASSWORD=",
                                              Gda.ConnectionOptions.NONE, null);



                                              

 
  
var     model = Gda.execute_select_command(cnc, "SHOW TABLES");
var cols = [];
for (var i =0;i < model.get_n_columns(); i++) {
    cols.push(model.get_column_name(i));
}

var iter = model.create_iter();
var res = [];
while (iter.move_next()) {
    var add = { };
    cols.forEach(function(n,i) {
        add[n] = iter.get_value_at(i).value;
    });
    
    res.push(add);
    
}

console.dump(res);
//print(model.dump_as_string());
/*
cnc.update_meta_store(null);
var    mstruct = new Gda.MetaStruct.c_new (cnc.get_meta_store(),  Gda.MetaStructFeature.NONE);

//var tabs  = cnc.get_meta_store().schema_get_all_tables();
//console.dump(tabs);
var table = mstruct.complement (Gda.MetaDbObjectType.TABLE, null, null, "Projects");

//console.dump(table);
*/
