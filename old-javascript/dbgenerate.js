//<script type="text/javascript">

/**
 * This is a hacky generator to generate element definitions for the Roo version from the database
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
 * usage: seed generate.js
 *
 *
 *
 *
 *Hack needed to latest GLib-2.0.gir 
 *
 * <record name="KeyFile" c:type="GKeyFile" disguised="1">
	<constructor name="new" c:identifier="g_key_file_new">
        <return-value transfer-ownership="full">
          <type name="KeyFile" c:type="GKeyFile*"/>
        </return-value>
      </constructor>
 *
 *
 * remove introspectable =0 from g_key_file_get_groups
 *   and add transfer-owneership = none to return value
 * remove introspectable =0 from g_key_file_get_keys
 *   and add transfer-owneership = none to return value* 
 * 
 */
Gda  = imports.gi.Gda;
GObject = imports.gi.GObject;

GLib = imports.gi.GLib;

console = imports.console;
File = imports.File.File;
Options = imports.Options.Options;

//Gda.init();

var prov = Gda.Config.list_providers ();
//print(prov.dump_as_string());

var o = new Options({
    help_description : 'Element builder for App Builder based on database schema',
    
    options:  [
        { arg_long : 'DBTYPE' , arg_short : 't', description : 'Database Type (eg. MySQL or PostgreSQL ' },
        { arg_long : 'DBNAME' , arg_short : 'd', description : 'Database Name' },
        { arg_long : 'USERNAME' , arg_short : 'u', description : 'Username'},
        { arg_long : 'PASSWORD' , arg_short : 'p', description : 'Password' , arg_default :'' },
        { arg_long : 'INI' , arg_short : 'I', description :
                    'Either base directory which has Pman/***/DataObjects/***.links.ini or location of ini file.' },
    ]
           
})



var cfg = o.parse(Seed.argv);
print(JSON.stringify(cfg, null,4));

var   cnc = Gda.Connection.open_from_string (cfg.DBTYPE,
         "DB_NAME=" + cfg.DBNAME, 
        "USERNAME=" + cfg.USERNAME + ';PASSWORD=' + cfg.PASSWORD,
        Gda.ConnectionOptions.NONE, null);



                                              

 
Gda.DataSelect.prototype.fetchAll = function()
{
    var cols = [];
    
    for (var i =0;i < this.get_n_columns(); i++) {
        cols.push(this.get_column_name(i));
    }
    //print(JSON.stringify(cols, null,4));
    var iter = this.create_iter();
    var res = [];
    //print(this.get_n_rows());
    var _this = this;
    for (var r = 0; r < this.get_n_rows(); r++) {
        
        // single clo..
        //print("GOT ROW");
        if (cols.length == 1) {
            res.push(this.get_value_at(0,r).get_string());
            continue;
        }
        var add = { };
        
        cols.forEach(function(n,i) {
            var val = _this.get_value_at(i,r);
            var type = GObject.type_name(val.g_type) ;
            var vs = ['GdaBinary', 'GdaBlob' ].indexOf(type) > -1 ? val.value.to_string(1024) : val.value;
            //print(n + " : TYPE: " + GObject.type_name(val.g_type) + " : " + vs);
            //print (n + '=' + iter.get_value_at(i).value);
            add[n] = vs;
        });
        
        res.push(add);
        
    }
    return res;

}

var map = {
    'date' : 'date',
    'datetime' : 'date',
    'timestamp with time zone' : 'date',
    'timestamp without time zone' : 'date',
    'time' : 'string', //bogus
    'int' : 'int',
    'integer' : 'int',
    'bigint' : 'int',
    'double' : 'float',
    'tinyint' : 'int',
    'smallint' : 'int',
    'decimal' : 'float',
    'float' : 'float',
    'numeric' : 'float',
    'char' : 'string',
    'character' : 'string',
    'character varying' : 'string',
    'varchar' : 'string',
    'text' : 'string',
    'longtext' : 'string',
    'tinytext' : 'string',
    'mediumtext' : 'string',
    'enum' : 'string',
    'timestamp' : 'number',
    'blob' : 'text',
    'bytea' : 'text',
    'boolean' : 'int',
    'text[]' : 'string',
    
}

var ini = { }

function readIni(fn)
{
    print('Read INI : ' + fn);
    var key_file = new GLib.KeyFile.c_new();
    if (!key_file.load_from_file (fn , GLib.KeyFileFlags.NONE )) {
        return;
    }
   
    var groups = key_file.get_groups();
    groups.forEach(function(g) {
        //print("KEY:"+g);
        ini[g] = {}
        
        var keys = key_file.get_keys(g);
        if (!keys) { return; }
        
        keys.forEach(function(k) {
                print("GET val: " + k);
                ini[g][k] = key_file.get_value(g,k);
                print(ini[g][k] );
        });
        //print("DONE KEY:"+g);
    });
    //print("DONE KEYS");
}
 
if (File.isFile(cfg.INI)) {
    if (cfg.INI.match(/links\.ini$/)) {
        readIni(cfg.INI);
    } else {
        readIni(cfg.INI.replace(/\.ini$/, ".links.ini"));
    }
}


if (File.isDirectory(cfg.INI)) {
        

    //--- load ini files..
    // this is very specific.
    
    var dirs = File.list( cfg.INI + '/Pman').filter( 
        function(e) { 
            if (!File.isDirectory(cfg.INI + '/Pman/' + e + '/DataObjects')) {
                return false;
            }
            return true;
        }
    );
    
     
    dirs.forEach(function(d) {
        // this currently misses the web.*/Pman/XXXX/DataObjects..
        var path = cfg.INI + '/Pman/' + d + '/DataObjects';
         
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
            readIni(path + '/' + i); 
            
        })
 
    });
    // look at web.XXXX/Pman/XXX/DataObjects/*.ini
    var inis = File.list(cfg.INI).filter(
        function(e) { return e.match(/\.links\.ini$/); }
    )
    
     inis.forEach(function(i) {
        readIni(path + '/' + i); 
        
    })
    
    
}
//print(JSON.stringify(ini, null,4));
 //console.dump(ini);
print("DONE INI");

 //Seed.quit();

//GLib.key_file_load_from_file (key_file, String file, KeyFileFlags flags) : Boolean


switch(cfg.DBTYPE) {
    case "MySQL":
        query_tables = "SHOW TABLES";
        query_describe_table = "DESCRIBE `%s`";
        break;
    
    case 'PostgreSQL':
        query_tables = "select c.relname FROM pg_catalog.pg_class c " + 
            "LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace " + 
            "WHERE c.relkind IN ('r','') AND n.nspname NOT IN ('pg_catalog', 'pg_toast')" +
            "AND pg_catalog.pg_table_is_visible(c.oid) ";
         query_describe_table =  
                "SELECT " +
                "f.attnum AS number, " +
                "f.attname AS Field, " +
                "f.attnum, " +
                "CASE WHEN f.attnotnull = 't' THEN 'NO' ELSE 'YES' END AS isNull, " + 
                "pg_catalog.format_type(f.atttypid,f.atttypmod) AS Type, " +
                "CASE WHEN p.contype = 'p' THEN 't' ELSE 'f' END AS primarykey, " +
                "CASE WHEN p.contype = 'u' THEN 't' ELSE 'f' END AS uniquekey, " +
                "CASE WHEN p.contype = 'f' THEN g.relname END AS foreignkey, " +
                "CASE WHEN p.contype = 'f' THEN p.confkey END AS foreignkey_fieldnum, " +
                "CASE WHEN p.contype = 'f' THEN g.relname END AS foreignkey, " +
                "CASE WHEN p.contype = 'f' THEN p.conkey END AS foreignkey_connnum, " +
                "CASE WHEN f.atthasdef = 't' THEN d.adsrc END AS default " +
                "FROM pg_attribute f JOIN pg_class c ON c.oid = f.attrelid " +
                "        JOIN pg_type t ON t.oid = f.atttypid " +
                "        LEFT JOIN pg_attrdef d ON d.adrelid = c.oid AND d.adnum = f.attnum " +
                "        LEFT JOIN pg_namespace n ON n.oid = c.relnamespace " +
                "        LEFT JOIN pg_constraint p ON p.conrelid = c.oid AND f.attnum = ANY ( p.conkey ) " +
                "        LEFT JOIN pg_class AS g ON p.confrelid = g.oid " +
                "WHERE c.relkind = 'r'::char AND n.nspname = '%n' " +
                "AND c.relname = '%s' AND f.attnum > 0 ORDER BY number";
                
                
                
        break;
    default:
        throw {
             name: "ArgumentError", 
             message: "Invalid data base type " + cfg.DBTYPE + " should be MySQL or PostgreSQL"
         };
            
/*
           "Field": "province",
        "Type": "varchar(255)",
        "Null": "NO", << or is null
        "Key": null,
        "Default": null,
        "Extra": 
*/  
}


 

var tables = cnc.execute_select_command( query_tables).fetchAll();
print(JSON.stringify(tables));

var readers = [];
tables.forEach(function(table) {
    //print(table);
    var schema = cnc.execute_select_command(
            query_describe_table.replace(/%s/, table).replace(/%n/,'public')
            ).fetchAll();
    
    
    var reader = []; 
    var colmodel = []; 
    var combofields= [ { name : 'id', type: 'int' } ]; // technically the primary key..
         
    var form = {}
       
    var firstTxtCol = '';
    
    //print(JSON.stringify(schema, null,4));    Seed.quit();
    
    schema.forEach(function(e)  {
        e.Type = e.Type || e.type;
        e.Field = e.Field || e.field;
         
        var type = e.Type.match(/([^(]+)\(([^\)]+)\)/);
        var row  = { }; 
        if (type) {
            e.Type = type[1];
            e.Size = type[2];
        }
        
        
        
        row.name = e.Field;
        
        
        if (typeof(map[e.Type]) == 'undefined') {
           console.dump(e);
           throw {
                name: "ArgumentError", 
                message: "Unknown mapping for type : " + e.Type
            };
        }
        row.type = map[e.Type];
        
        if (row.type == 'string' && !firstTxtCol.length) {
            firstTxtCol = row.name;
        }
        
        if (row.type == 'date') {
            row.dateFormat = 'Y-m-d';
        }
        reader.push(row);
        
        if (combofields.length == 1 && row.type == 'string') {
            combofields.push(row);
        }
        
        
        var title = row.name.replace(/_id/, '').replace(/_/g, ' ');
        title  = title[0].toUpperCase() + title.substring(1);
        
        colmodel.push({
            "xtype": "ColumnModel",
            "header": title,
            "width":  row.type == 'string' ? 200 : 75,
            "dataIndex": row.name,
            "|renderer": row.type != 'date' ? 
                    "function(v) { return String.format('{0}', v); }" :
                    "function(v) { return String.format('{0}', v ? v.format('d/M/Y') : ''); }" , // special for date
            "|xns": "Roo.grid",
            "*prop": "colModel[]"
        });
        var xtype = 'TextField';
        
        
        if (row.type == 'number') {
            xtype = 'NumberField';
        }
        if (row.type == 'date') {
            xtype = 'DateField';
        }
        if (e.Type == 'text') {
            xtype = 'TextArea';
        }
        if (row.name == 'id') {
            xtype = 'Hidden';
        } 
        // what about booleans.. -> checkboxes..
        
        
        
        form[row.name] = {
            fieldLabel : title,
            name : row.name,
            width : row.type == 'string' ? 200 : 75,
            '|xns' : 'Roo.form',
            xtype : xtype
        }
         if (xtype == 'DateField') {
            form[row.name].format = 'Y-m-d';
            form[row.name].width = 100;
        }
        
        if (xtype == 'TextArea') {
            form[row.name].height = 100;
        }
        if (xtype == 'Hidden') {
            delete form[row.name].fieldLabel;
            delete form[row.name].width;
        }
        
    });
    
    var combo = {
        '|xns' : 'Roo.form',
        xtype: 'ComboBox',
        allowBlank : false,
        editable : false,
        emptyText : 'Select ' + table,
        forceSelection : true,
        listWidth : 400,
        loadingText: 'Searching...',
        minChars : 2,
        pageSize : 20,
        qtip: 'Select ' + table,
        selectOnFocus: true,
        triggerAction : 'all',
        typeAhead: true,
        
        width: 300,
        
        
        
        tpl : '<div class="x-grid-cell-text x-btn button"><b>{name}</b> </div>', // SET WHEN USED
        queryParam : '',// SET WHEN USED
        fieldLabel : table,  // SET WHEN USED
        valueField : 'id',
        displayField : '', // SET WHEN USED eg. project_id_name
        hiddenName : '', // SET WHEN USED eg. project_id
        name : '', // SET WHEN USED eg. project_id_name
        items : [
            {
                    
                '*prop' : 'store',
                'xtype' : 'Store',
                '|xns' : 'Roo.data',
                'remoteSort' : true,
                '|sortInfo' : '{ direction : \'ASC\', field: \'id\' }',
                listeners : {
                    '|beforeload' : 'function (_self, o)' +
                    "{\n" +
                    "    o.params = o.params || {};\n" +
                    "    // set more here\n" +
                    "}\n"
                },
                items : [
                    {
                        '*prop' : 'proxy',
                        'xtype' : 'HttpProxy',
                        'method' : 'GET',
                        '|xns' : 'Roo.data',
                        '|url' : "baseURL + '/Roo/" + table + ".php'",
                    },
                    
                    {
                        '*prop' : 'reader',
                        'xtype' : 'JsonReader',
                        '|xns' : 'Roo.data',
                        'id' : 'id',
                        'root' : 'data',
                        'totalProperty' : 'total',
                        '|fields' : JSON.stringify(combofields)
                        
                    }
                ]
            }
        ]
    }
    
    
    
    
    //print(JSON.stringify(reader,null,4));
    readers.push({
        table : table ,
        combo : combo,
        combofields : combofields,
        reader :  reader,
        oreader : JSON.parse(JSON.stringify(reader)), // dupe it..
        colmodel : colmodel,
        firstTxtCol : firstTxtCol,
        form : form
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
        if (!add) {
            continue;
        }
        // merge in data (eg. project_id => project_id_*****
     
        add.oreader.forEach(function(or) {
            reader.reader.push({
                name : col + '_' + or.name,
                type : or.type
            });
        });
        
        // col is mapped to something..
        var combofields = add.combofields;
        if (add.combofields.length < 2) {
            continue;
        }
        if (typeof(reader.form[col]) == 'undefined') {
            print (JSON.stringify(reader.form, null,4));
            print("missing linked column " + col);
            continue;
        }
        
        var combofields_name = add.combofields[1].name;
        var old =   reader.form[col];
        reader.form[col] = JSON.parse(JSON.stringify(add.combo)); // clone
        reader.form[col].queryParam  = 'query[' + combofields_name + ']';// SET WHEN USED
        reader.form[col].fieldLabel = old.fieldLabel;  // SET WHEN USED
        reader.form[col].hiddenName = old.name; // SET WHEN USED eg. project_id
        reader.form[col].displayField = combofields_name; // SET WHEN USED eg. project_id
        reader.form[col].name  = old.name + '_' + combofields_name; // SET WHEN USED eg. project_id_name
        reader.form[col].tpl = '<div class="x-grid-cell-text x-btn button"><b>{' + combofields_name +'}</b> </div>'; // SET WHEN USED
        
             
    };
    
    
});

//readers.forEach(function(reader) {
//    delete reader.oreader;
//});

 



//print(JSON.stringify(readers, null, 4));

readers.forEach(function(reader) {
    

    var dir = GLib.get_home_dir() + '/.Builder/Roo.data.JsonReader'; 
    if (!File.isDirectory(dir)) {
        print("mkdir " + dir);
        File.mkdir(dir);
    }
    
    // READERS
    print("WRITE: " +  dir + '/' + cfg.DBNAME + '_' + reader.table + '.json');
    
                
    var jreader = {
        '|xns' : 'Roo.data',
        xtype : "JsonReader",
        totalProperty : "total",
        root : "data",
        '*prop' : "reader",
        id : 'id', // maybe no..
       
        '|fields' :  JSON.stringify(reader.reader, null,4).replace(/"/g,"'")
    };
    
    File.write(
        dir + '/' + cfg.DBNAME + '_' + reader.table + '.json',
        JSON.stringify(jreader, null, 4)
    )
    
    
    // GRIDS
    dir = GLib.get_home_dir() + '/.Builder/Roo.GridPanel'; 
    if (!File.isDirectory(dir)) {
        print("mkdir " + dir);
        File.mkdir(dir);
    }
    

    print("WRITE: " +  dir + '/' + cfg.DBNAME + '_' + reader.table + '.json');
    
    File.write(
        dir + '/' + cfg.DBNAME + '_' + reader.table + '.json',
            
       
        JSON.stringify({
            '|xns' : 'Roo',
            xtype : "GridPanel",
            "title": reader.table,
            "fitToframe": true,
            "fitContainer": true,
            "tableName": reader.table,
            "background": true,
            "region" : 'center',
            "listeners": {
                "|activate": "function() {\n    _this.panel = this;\n    if (_this.grid) {\n        _this.grid.footer.onClick('first');\n    }\n}"
            },
            "items": [
                {
                    "*prop": "grid",
                    "xtype": "Grid",
                    "autoExpandColumn": reader.firstTxtCol,
                    "loadMask": true,
                    "listeners": {
                        "|render": "function() \n" +
                            "{\n" +
                            "    _this.grid = this; \n" +
                            "    //_this.dialog = Pman.Dialog.FILL_IN\n" +
                            "    if (_this.panel.active) {\n" +
                            "       this.footer.onClick('first');\n" +
                            "    }\n" +
                            "}",
                        "|rowdblclick": "function (_self, rowIndex, e)\n" + 
                            "{\n" + 
                            "    if (!_this.dialog) return;\n" + 
                            "    _this.dialog.show( this.getDataSource().getAt(rowIndex).data, function() {\n" + 
                            "        _this.grid.footer.onClick('first');\n" + 
                            "    }); \n" + 
                            "}\n"
                    },
                    "|xns": "Roo.grid",

                    "items": [
                        {
                            "*prop": "dataSource",
                            "xtype": "Store",
                             remoteSort : true,
                            '|sortInfo' : "{ field : '" + reader.firstTxtCol  +  "', direction: 'ASC' }", 
                            "|xns": "Roo.data",
                            "items": [
                                
                                {
                                    "*prop": "proxy",
                                    "xtype": "HttpProxy",
                                    "method": "GET",
                                    "|url": "baseURL + '/Roo/" + reader.table + ".php'",
                                    "|xns": "Roo.data"
                                },
                                jreader
                            ]
                        },
                        {
                            "*prop": "footer",
                            "xtype": "PagingToolbar",
                            "pageSize": 25,
                            "displayInfo": true,
                            "displayMsg": "Displaying " + reader.table + "{0} - {1} of {2}",
                            "emptyMsg": "No " + reader.table + " found",
                            "|xns": "Roo"
                        },
                        {
                            "*prop": "toolbar",
                            "xtype": "Toolbar",
                            "|xns": "Roo",
                            "items": [
                                {
                                    "text": "Add",
                                    "xtype": "Button",
                                    "cls": "x-btn-text-icon",
                                    "|icon": "Roo.rootURL + 'images/default/dd/drop-add.gif'",
                                    "listeners": {
                                        "|click": "function()\n"+
                                            "{\n"+
                                            "    if (!_this.dialog) return;\n" +
                                            "    _this.dialog.show( { id : 0 } , function() {\n"+
                                            "        _this.grid.footer.onClick('first');\n"+
                                            "   }); \n"+
                                            "}\n"
                                    },
                                    "|xns": "Roo.Toolbar"
                                },
                                {
                                    "text": "Edit",
                                    "xtype": "Button",
                                    "cls": "x-btn-text-icon",
                                    "|icon": "Roo.rootURL + 'images/default/tree/leaf.gif'",
                                    "listeners": {
                                        "|click": "function()\n"+
                                            "{\n"+
                                            "    var s = _this.grid.getSelectionModel().getSelections();\n"+
                                            "    if (!s.length || (s.length > 1))  {\n"+
                                            "        Roo.MessageBox.alert(\"Error\", s.length ? \"Select only one Row\" : \"Select a Row\");\n"+
                                            "        return;\n"+
                                            "    }\n"+
                                            "    if (!_this.dialog) return;\n" +
                                            "    _this.dialog.show(s[0].data, function() {\n"+
                                            "        _this.grid.footer.onClick('first');\n"+
                                            "    }); \n"+
                                            "    \n"+
                                            "}\n" 
                                        
                                    },
                                    "|xns": "Roo.Toolbar"
                                },
                                {
                                    "text": "Delete",
                                    "cls": "x-btn-text-icon",
                                    "|icon": "rootURL + '/Pman/templates/images/trash.gif'",
                                    "xtype": "Button",
                                    "listeners": {
                                        "|click": "function()\n"+
                                            "{\n"+
                                            "     Pman.genericDelete(_this, '" + reader.table + "'); \n"+
                                            "}\n"+
                                            "        "
                                    },
                                    "|xns": "Roo.Toolbar"
                                }
                            ]
                        }, // end toolbar
                    ].concat( reader.colmodel)
                }
            ]
            
            
        }, null, 4)
    )
    
    /// FORMS..
    
    dir = GLib.get_home_dir() + '/.Builder/Roo.form.Form'; 
    if (!File.isDirectory(dir)) {
        print("mkdir " + dir);
        File.mkdir(dir);
    }
    var formElements = [];
    var formHeight = 50;
    for (var k in reader.form) {
        if (k == 'id') { // should really do primary key testing..
            continue;
        }
        formHeight += reader.form[k].xtype == 'TextArea' ? 100 : 30;
        
        formElements.push(reader.form[k]);
    }
    if (reader.form['id']) {
        formElements.push(reader.form['id']);
    }
    

    print("WRITE: " +  dir + '/' + cfg.DBNAME + '_' + reader.table + '.json');
    var frmCfg = 
    {
        '|xns' : 'Roo.form',
        xtype : "Form",
        listeners : {
            "|actioncomplete" : "function(_self,action)\n"+
                "{\n"+
                "    if (action.type == 'setdata') {\n"+
                "       //_this.dialog.el.mask(\"Loading\");\n"+
                "       //this.load({ method: 'GET', params: { '_id' : _this.data.id }});\n"+
                "       return;\n"+
                "    }\n"+
                "    if (action.type == 'load') {\n"+
                "        _this.dialog.el.unmask();\n"+
                "        return;\n"+
                "    }\n"+
                "    if (action.type =='submit') {\n"+
                "    \n"+
                "        _this.dialog.el.unmask();\n"+
                "        _this.dialog.hide();\n"+
                "    \n"+
                "         if (_this.callback) {\n"+
                "            _this.callback.call(_this, _this.form.getValues());\n"+
                "         }\n"+
                "         _this.form.reset();\n"+
                "         return;\n"+
                "    }\n"+
                "}\n",
            
            "|rendered" : "function (form)\n"+
                "{\n"+
                "    _this.form= form;\n"+
                "}\n"
        },
        method : "POST",
        style : "margin:10px;",
        "|url" : "baseURL + '/Roo/" + reader.table + ".php'",
        items : formElements
    };
    
    
    File.write(
        dir + '/' + cfg.DBNAME + '_' + reader.table + '.json',
            
       
        JSON.stringify( frmCfg, null, 4)
    );
            
            
   
   
   
     /// COMBO..
    
    dir = GLib.get_home_dir() + '/.Builder/Roo.form.ComboBox'; 
    if (!File.isDirectory(dir)) {
        print("mkdir " + dir);
        File.mkdir(dir);
    }
   
    print("WRITE: " +  dir + '/' + cfg.DBNAME + '_' + reader.table + '.json');
    
    File.write(
        dir + '/' + cfg.DBNAME + '_' + reader.table + '.json',
            
       
        JSON.stringify(reader.combo, null, 4)
    );
            
   
   
   
   
   
    // DIALOG.
   
   
    dir = GLib.get_home_dir() + '/.Builder/Roo.LayoutDialog'; 
    if (!File.isDirectory(dir)) {
        print("mkdir " + dir);
        File.mkdir(dir);
    }
    var formElements = [];
    for (var k in reader.form) {
        if (k == 'id') { // should really do primary key testing..
            continue;
        }
        formElements.push(reader.form[k]);
    }
    formElements.push(reader.form['id']);

    print("WRITE: " +  dir + '/' + cfg.DBNAME + '_' + reader.table + '.json');
    
    File.write(
        dir + '/' + cfg.DBNAME + '_' + reader.table + '.json',
            
       
        JSON.stringify({
       
            "closable": false,
            "collapsible": false,
            "height": formHeight,
            "resizable": false,
            "title": "Edit / Create " + reader.table,
            "width": 400,
            "modal" : true,
            "xtype": "LayoutDialog",
            "|xns": "Roo",
            "items": [
                {
                    "|xns": "Roo",
                    "xtype": "LayoutRegion",
                    "*prop": "center"
                },
                {
                    "region": "center",
                    "xtype": "ContentPanel",
                    "|xns": "Roo",
                    "items": [
                        frmCfg
                    ]
                },
                
                {
                    "listeners": {
                        "click": "function (_self, e)\n{\n    _this.dialog.hide();\n}"
                    },
                    "*prop": "buttons[]",
                    "text": "Cancel",
                    "xtype": "Button",
                    "|xns": "Roo"
                },
                {
                    "listeners": {
                        "click": "function (_self, e)\n{\n    // do some checks?\n     \n    \n    _this.dialog.el.mask(\"Saving\");\n    _this.form.doAction(\"submit\");\n\n}"
                    },
                    "*prop": "buttons[]",
                    "text": "Save",
                    "xtype": "Button",
                    "|xns": "Roo"
                }
            ]
        }, null,4)
    );
   
   
   
});


