//<script type="text/javascript">

// Auto generated file - created by app.Builder.js- do not edit directly (at present!)

Roo.namespace('Editor.Roo');

Editor.Roo.LayoutDialog = new Roo.XComponent({

 _strings : {
  'b021df6aac4654c454f46c77646e745f' :"Label",
  '793548e77e782c209a78ed67f255b5e2' :"Display Field",
  '4ce58cbe362a5d7b156992a496d55bf3' :"Database Column",
  '189efd19c4153526994a6d7ea5f6f068' :"Field Type",
  '2f616612593df62aeed112de4f03110e' :"Edit a Grid",
  '0ccc2bf3fb98387c23b6ca5500244d6e' :"Use ",
  'c671c787b49f50a3ace9fdc5bd597825' :"core_enum",
  '32954654ac8fe66a1d09be19001de2d4' :"Width",
  'a1fa27779242b4902f7ae3bdd5c6d508' :"Type",
  '6e7376dca68a2386a8737944196ab491' :"Create / Edit Grid"
 },

  part     :  ["Editors", "LayoutDialog" ],
  order    : '001-Editor.Roo.LayoutDialog',
  region   : 'center',
  parent   : false,
  name     : "unnamed module",
  disabled : false, 
  permname : '', 
  _tree : function()
  {
   var _this = this;
   var MODULE = this;
   return {
   grid : {
    ds : {
     '|xns' : 'Roo.data',
     data : [
       [ 1, 'test', 'test', 110 ]
       
     
     ],
     fields : [ 'active', 'dataIndex', 'type','title', 'width', 'ftype', 'display_field' ],
     id : 'dataindex',
     xns : Roo.data,
     xtype : 'SimpleStore'
    },
    toolbar : {
     '|xns' : 'Roo',
     xns : Roo,
     xtype : 'Toolbar',
     items : [
      {
       '|xns' : 'Roo.Toolbar',
       text : _this._strings['2f616612593df62aeed112de4f03110e'],
       xns : Roo.Toolbar,
       xtype : 'TextItem'
      }
     ]

    },
    '|xns' : 'Roo.grid',
    autoExpandColumn : 'title',
    clicksToEdit : 1,
    loadMask : true,
    xns : Roo.grid,
    xtype : 'EditorGrid',
    cm : [
      {
       '|xns' : 'Roo.grid',
       dataIndex : 'active',
       header : _this._strings['0ccc2bf3fb98387c23b6ca5500244d6e'],
       renderer : function(v) {  
           var state = v *1 > 0 ?  '-checked' : '';
       
           return '<img class="x-grid-check-icon' + state + '" src="' + Roo.BLANK_IMAGE_URL + '"/>';
                       
        },
       width : 75,
       xns : Roo.grid,
       xtype : 'ColumnModel'
      },
{
       '|xns' : 'Roo.grid',
       dataIndex : 'dataIndex',
       header : _this._strings['4ce58cbe362a5d7b156992a496d55bf3'],
       renderer : function(v) { return String.format('{0}', v); },
       width : 150,
       xns : Roo.grid,
       xtype : 'ColumnModel'
      },
{
       '|xns' : 'Roo.grid',
       dataIndex : 'type',
       header : _this._strings['a1fa27779242b4902f7ae3bdd5c6d508'],
       renderer : function(v) { return String.format('{0}', v); },
       width : 100,
       xns : Roo.grid,
       xtype : 'ColumnModel'
      },
{
       editor : {
        field : {
         '|xns' : 'Roo.form',
         xns : Roo.form,
         xtype : 'TextField'
        },
        '|xns' : 'Roo.grid',
        xns : Roo.grid,
        xtype : 'GridEditor',
        items : [

        ]

       },
       '|xns' : 'Roo.grid',
       dataIndex : 'title',
       header : _this._strings['b021df6aac4654c454f46c77646e745f'],
       renderer : function(v) { return String.format('{0}', v); },
       width : 120,
       xns : Roo.grid,
       xtype : 'ColumnModel',
       items : [

       ]

      },
{
       editor : {
        field : {
         store : {
          '|xns' : 'Roo.data',
          data : [ 
              [ 'ComboBox', "ComboBox"],
              [ 'TextField' , "TextField"],
              [ 'NumberField', "NumberField"],
              [ 'TextArea', "TextArea"],
              [ 'HtmlEditor', "HtmlEditor"],
              [ 'Hidden', "Hidden"],
              [ 'DateField', "DateField"]    ,
               [ 'Checkbox', "Checkbox"]    
              // checkbox?
          ],
          fields : [  'ftype', 'fname'],
          xns : Roo.data,
          xtype : 'SimpleStore'
         },
         '|xns' : 'Roo.form',
         allowBlank : false,
         displayField : 'fname',
         editable : false,
         hiddenName : 'status',
         listWidth : 200,
         mode : 'local',
         name : 'status',
         triggerAction : 'all',
         valueField : 'ftype',
         width : 150,
         xns : Roo.form,
         xtype : 'ComboBox',
         items : [

         ]

        },
        '|xns' : 'Roo.grid',
        xns : Roo.grid,
        xtype : 'GridEditor',
        items : [

        ]

       },
       '|xns' : 'Roo.grid',
       dataIndex : 'ftype',
       header : _this._strings['189efd19c4153526994a6d7ea5f6f068'],
       renderer : function(v) { return String.format('{0}', v); },
       width : 120,
       xns : Roo.grid,
       xtype : 'ColumnModel',
       items : [

       ]

      },
{
       editor : {
        field : {
         store : {
          '|xns' : 'Roo.data',
          data : [ 
              [ 'ComboBox', "ComboBox"],
              [ 'Text' , "TextField"],
              [ 'Number', "NumberField"],
              [ 'TextArea', "TextArea"],
              [ 'Html', "HtmlEntry"]
              
          ],
          fields : [  'ftype', 'fname'],
          xns : Roo.data,
          xtype : 'SimpleStore'
         },
         '|xns' : 'Roo.form',
         allowBlank : false,
         displayField : 'fname',
         editable : false,
         hiddenName : 'status',
         listWidth : 200,
         mode : 'local',
         name : 'status',
         triggerAction : 'all',
         valueField : 'ftype',
         width : 150,
         xns : Roo.form,
         xtype : 'ComboBox',
         items : [

         ]

        },
        '|xns' : 'Roo.grid',
        xns : Roo.grid,
        xtype : 'GridEditor',
        items : [

        ]

       },
       '|xns' : 'Roo.grid',
       dataIndex : 'display_field',
       header : _this._strings['793548e77e782c209a78ed67f255b5e2'],
       renderer : function(v) { return String.format('{0}', v); },
       width : 150,
       xns : Roo.grid,
       xtype : 'ColumnModel',
       items : [

       ]

      },
{
       editor : {
        field : {
         '|xns' : 'Roo.form',
         decimalPrecision : 0,
         xns : Roo.form,
         xtype : 'NumberField'
        },
        '|xns' : 'Roo.grid',
        xns : Roo.grid,
        xtype : 'GridEditor',
        items : [

        ]

       },
       '|xns' : 'Roo.grid',
       dataIndex : 'width',
       header : _this._strings['32954654ac8fe66a1d09be19001de2d4'],
       renderer : function(v) { return String.format('{0}', v); },
       width : 75,
       xns : Roo.grid,
       xtype : 'ColumnModel',
       items : [

       ]

      }
    ],
    listeners : {
     cellclick : function (_self, rowIndex, columnIndex, e)
      {
      
              var di = this.colModel.getDataIndex(columnIndex);
              if (di != 'active') {
                  return;
              }
               
              var rec = _this.grid.ds.getAt(rowIndex);
              
              rec.set('active', rec.data.active * 1 ? 0 : 1);
              rec.commit();
               
              
      },
     render : function() 
      {
          _this.grid = this; 
          //_this.dialog = Pman.Dialog.FILL_IN
      
      },
     rowdblclick : function (_self, rowIndex, e)
      {
          if (!_this.dialog) return;
        
      }
    },
    items : [

    ]

   },
   '|xns' : 'Roo',
   background : false,
   fitContainer : true,
   fitToframe : true,
   loadData : function(data) { 
   
       alert("IPC:TEST:" + JSON.stringify(data,null,4));
       
       var ar = [];
       for (var k in data) { 
           var r = data[k];
           var has_s = typeof(r.relates_to_schema) != 'undefined'
           ar.push([ !has_s , r.Field, r.Type,  r.Field, 100 , 'TextField', r.Field + '_display_name'] );
           if (!has_s) {
               continue;
           }
           /*
           for (var kk in r.relates_to_schema) {         
               var rr = r.relates_to_schema[kk];
               if (rr.Field == r.relates_to_col) {
                   continue;
               }
               ar.push([ false, r.Field + '_'+ rr.Field, rr.Type,  rr.Field, 100] );
           }
           */
       }
       this.schema = data;
       //alert("IPC:TEST:" + JSON.stringify(ar));
       this.grid.dataSource.loadData(ar);
   },
   region : 'center',
   tableName : 'core_enum',
   title : _this._strings['c671c787b49f50a3ace9fdc5bd597825'],
   title : _this._strings['c671c787b49f50a3ace9fdc5bd597825'],
   toBJS : function() { 
   
   // convert the selected cells into a BJS data ready to send back to the UI..
      return;
       this.table = "XXX";
       this.firstTxtCol = "XXX";
      
       var formHeight = 50;
       
       var jreader = {};
       var  formElements = [];
       this.grid.dataSource.each(function(rec) {
           if (!rec.data.active) {
               return;
           }
           
           var el = {
               fieldLabel : rec.data.title,
               name : rec.data.dataIndex,
               width : 200, //row.type == 'string' ? 200 : 75,
               '|xns' : 'Roo.form',
               xtype : rec.data.ftype
           }
            if (xtype == 'DateField') {
               el.format = 'Y-m-d';
               el.useIso = true;
               el.width = 100;
           }
           
           if (xtype == 'TextArea') {
               el.height = 100;
           }
           
           if (xtype == 'Hidden') {
               delete el.fieldLabel;
               delete el.width;
           }
           if (xtype == 'Combobox') {
           
   
               el.queryParam  = 'query[' + combofields_name + ']';// SET WHEN USED
               
               el.hiddenName = old.name; // SET WHEN USED eg. project_id
               el.displayField = combofields_name; // SET WHEN USED eg. project_id
               el.name  = old.name + '_' + combofields_name; // SET WHEN USED eg. project_id_name
               el.tpl = '<div class="x-grid-cell-text x-btn button"><b>{' + combofields_name +'}</b> </div>'; // SET WHEN USED
             
           
              el.items = [
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
                               '|url' : "baseURL + '/Roo/" + reftable + ".php'",
                           },
                           
                           {
                               '*prop' : 'reader',
                               'xtype' : 'JsonReader',
                               '|xns' : 'Roo.data',
                               'id' : 'id',
                               'root' : 'data',
                               'totalProperty' : 'total'
   
                               
                           }
                       ]
                   }
               ];
           
           }
           
           
           formElements.push(el);
           
           formHeight += rec.data.ftype == 'TextArea' ? 100 : 30;
           
           
       });
       
       
       
       
       
       
        var frmCfg = 
       {
           '|xns' : 'Roo.form',
           xtype : "Form",
           listeners : {
               "|actioncomplete" : "function(_self,action)\n"+
                   "{\n"+
                   "    if (action.type == 'setdata') {\n"+
                   "       //this.load({ method: 'GET', params: { '_id' : _this.data.id }});\n"+
                   "       return;\n"+
                   "    }\n"+
                   "    if (action.type == 'load') {\n"+
                   "        return;\n"+
                   "    }\n"+
                   "    if (action.type =='submit') {\n"+
                   "    \n"+
                   "        _this.dialog.hide();\n"+
                   "    \n"+
                   "         if (_this.callback) {\n"+
                   "            _this.callback.call(_this, action.result.data);\n"+
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
           "|url" : "baseURL + '/Roo/" + this.table + "'",
           items : formElements
       };
       
   
       alert("IPC:OUT:" + JSON.stringify({
               "closable": false,
               "collapsible": false,
               "height": formHeight,
               "resizable": false,
               "title": "Edit / Create " + this.table,
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
           
           
           
       }, null, 4));
   
   },
   xns : Roo,
   xtype : 'GridPanel',
   listeners : {
    activate : function() {
         _this.panel = this;
         if (_this.grid) {
             _this.grid.footer.onClick('first');
         }
     }
   },
   items : [

   ]

  };  }
});
