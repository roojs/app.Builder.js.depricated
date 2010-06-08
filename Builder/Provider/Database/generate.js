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



                                              

 
Gda.DataSelect.prototype.fetchAll = function()
{
    var cols = [];
    
    for (var i =0;i < this.get_n_columns(); i++) {
        cols.push(this.get_column_name(i));
    }
    console.dump(cols);
    var iter = this.create_iter();
    var res = [];
    while (iter.move_next()) {
        if (cols.length == 1) {
            res.push(iter.get_value_at(0).get_string());
            continue;
        }
        var add = { };
        
        cols.forEach(function(n,i) {
            print (n + '=' + iter.get_value_at(i).value);
            add[n] = iter.get_value_at(i).get_string();
        });
        
        res.push(add);
        
    }
    return res;

}


var tables = Gda.execute_select_command(cnc, "SHOW TABLES").fetchAll();

tables.forEach(function(table) {
    print(table);
    var schema = Gda.execute_select_command(cnc, "DESCRIBE " + table).fetchAll();
    console.dump(schema );
    
    
});



/*
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
