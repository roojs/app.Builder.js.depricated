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
console = imports['../../../console.js'].console;
Gda.init();

var   cnc = Gda.Connection.open_from_string ("mySQL", "DB_NAME=pman", 
                                              "USERNAME=root;PASSWORD=",
                                              Gda.ConnectionOptions.NONE, none);


   
var    mstruct = new Gda.MetaStruct( { features :  GDA_META_STRUCT_FEATURE_NONE });


var table = mstruct.complement (Gda.MetaDbObjectType.TABLE, null, null, "customers");

console.dump(table);

