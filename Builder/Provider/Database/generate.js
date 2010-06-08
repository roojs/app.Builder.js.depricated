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
GObject = imports.gi.GObject;

GLib = imports.gi.GLib;

console = imports['../../../console.js'];
File = imports['../../../File.js'].File;
Gda.init();

var prov = Gda.Config.list_providers ();
//print(prov.dump_as_string());

var db_name = "pman";
var   cnc = Gda.Connection.open_from_string ("MySQL", "DB_NAME=" + db_name, 
                                              "USERNAME=root;PASSWORD=",
                                              Gda.ConnectionOptions.NONE, null);



                                              

 
Gda.DataSelect.prototype.fetchAll = function()
{
    var cols = [];
    
    for (var i =0;i < this.get_n_columns(); i++) {
        cols.push(this.get_column_name(i));
    }
    //console.dump(cols);
    var iter = this.create_iter();
    var res = [];
    while (iter.move_next()) {
        if (cols.length == 1) {
            res.push(iter.get_value_at(0).get_string());
            continue;
        }
        var add = { };
        
        cols.forEach(function(n,i) {
           var val = iter.get_value_at(i);
           var type = GObject.type_name(val.g_type) ;
           var vs = type == 'GdaBlob' ? val.value.to_string(1024) : val.value;
         //  print(n + " : TYPE: " + GObject.type_name(val.g_type) + " : " + vs);
            //print (n + '=' + iter.get_value_at(i).value);
            add[n] = vs;
        });
        
        res.push(add);
        
    }
    return res;

}

var map = {
    'date' : 'date',
    'int' : 'int',
    'bigint' : 'int',
    'char' : 'int',
    'tinyint' : 'int',
    'decimal' : 'float',
    'varchar' : 'string',
    'text' : 'string',
    'enum' : 'string'
    
}

//--- load ini files..
// this is very specific.
var dirs = File.list( GLib.get_home_dir() + '/gitlive').filter( 
    function(e) { return e.match(/^Pman/); }
);
var ini = { }
dirs.forEach(function(d) {
    var path = GLib.get_home_dir() + '/gitlive/' + d + '/DataObjects';
    if (!File.isDirectory(path)) {
        path = GLib.get_home_dir() + '/gitlive/' + d + '/Pman/DataObjects';
    }
    if (!File.isDirectory(path)) {
        return; //skip
    }
    var inis = File.list(path).filter(
        function(e) { return e.match(/\.links\.ini$/); }
    );
    if (!inis.length) {
        return;
    }
    
    inis.forEach(function(i) {
        var key_file = GLib.key_file_new();
        if (!GLib.key_file_load_from_file (key_file, path + '/' + i , GLib.KeyFileFlags.NONE )) {
            return;
        }
       
        var groups = GLib.key_file_get_groups(key_file);
        groups.forEach(function(g) {
            ini[g] = {}
               
            var keys = GLib.key_file_get_keys(key_file,g);
            keys.forEach(function(k) {
                ini[g][k] = GLib.key_file_get_value(key_file,g,k);
            })
        })
        
    })

    
    
});
 console.dump(ini);


 Seed.quit();

//GLib.key_file_load_from_file (key_file, String file, KeyFileFlags flags) : Boolean











var tables = Gda.execute_select_command(cnc, "SHOW TABLES").fetchAll();
var readers = [];
tables.forEach(function(table) {
   // print(table);
    var schema = Gda.execute_select_command(cnc, "DESCRIBE " + table).fetchAll();
    var reader = []; 
    schema.forEach(function(e)  {
        var type = e.Type.match(/([^(]+)\(([^\)]+)\)/);
        var row  = { }; 
        if (!type) {
            return;
        }
        e.Type = type[1];
        e.Size = type[2];
        
        
        row.name = e.Field;
        
        
        if (typeof(map[e.Type]) == 'undefined') {
           console.dump(e);
           throw {
                name: "ArgumentError", 
                message: "Unknown mapping for type : " + e.Type
            };
        }
        row.type = map[e.Type];
        reader.push(row);
        
    });
    readers.push({
        table : table ,
        reader :  reader,
        oreader : JSON.parse(JSON.stringify(reader)) // dupe it..
    });
    
    //console.dump(schema );
    
     
});



// merge in the linked tables..
readers.forEach(function(reader) {
    if (typeof(ini[reader.table]) == 'undefined') {
     
        return;
    }
   print("OVERLAY - " + reader.table);
    // we have a map..
    for (var col in ini[reader.table]) {
        var kv = ini[reader.table][col].split(':');
        var add = readers.filter(function(r) { return r.table == kv[0] })[0];
        add.oreader.forEach(function(or) {
            reader.reader.push({
                name : col + '_' + or.name,
                type : or.type
            });
        });
             
    };
    
    
});

readers.forEach(function(reader) {
    delete reader.oreader;
});

console.dump(readers);
Seed.quit();




//print(JSON.stringify(readers, null, 4));

readers.forEach(function(reader) {
    

    var dir = GLib.get_home_dir() + '/.Builder/Roo.data.JsonReader'; 
    if (!File.isDirectory(dir)) {
        File.mkdir(dir);
    }
    print("WRITE: " +  dir + '/' + db_name + '_' + reader.table + '.json');
    File.write(
        dir + '/' + db_name + '_' + reader.table + '.json',
            
       
        JSON.stringify({
            '|xns' : 'Roo.data',
            xtype : "JsonReader",
            totalProperty : "total",
            root : "data",
            id : 'id', // maybe no..
            '|fields' :  JSON.stringify(reader.reader, null,4)
        }, null, 4)
    )


});