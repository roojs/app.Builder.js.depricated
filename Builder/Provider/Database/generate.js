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
print(prov.dump_as_string());

var   cnc = Gda.Connection.open_from_string ("mySQL", "DB_NAME=pman", 
                                              "USERNAME=root;PASSWORD=",
                                              Gda.ConnectionOptions.NONE, null);


   
var    mstruct = new Gda.MetaStruct.c_new (cnc.get_meta_store(),  Gda.MetaStructFeature.NONE);


var table = mstruct.complement (Gda.MetaDbObjectType.TABLE, null, null, "customers");

console.dump(table);

