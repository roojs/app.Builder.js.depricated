{
    xtype : 'GridPanel',
    title : "test",
    fitToframe : true,
    fitContainer : true,
    tableName : 'test',
    background : true,
    listeners : {
        activate: function() {
            _this.panel = this;
            if (_this.grid) {
                _this.grid.footer.onClick('first');
            }
        }
    },
    grid : {
        xtype : 'Grid',
        autoExpandColumn : 'test',
        loadMask : true,
        listeners : {
            render: function() { 
                _this.grid = this; 
            
                if (_this.panel.active) {
                   this.footer.onClick('first');
                }
            }
        },
        dataSource : {
            xtype : 'Store',
            reader: Pman.Readers.Cash_transaction_split,
            proxy : {
                xtype : 'HttpProxy',
                method : 'GET',
                url: baseURL + 'YOUR URL"
            }
        },
        colModel : [
            {
                header : 'Col1',
                width : 100,
                dataIndex : 'test',
                renderer: function(v) { return String.format('{0}', v); }
            },
             
        ],
        footer : {
            xtype : 'PagingToolbar',
            pageSize : 25,
            displayInfo : true,
            displayMsg : "Displaying cash_transaction_split  {0} - {1} of {2}",
            emptyMsg : "No cash_transaction_split found"
        },
        toolbar : {
            xtype : 'Toolbar',
            items : [
                {
                    text : "Add",
                    xtype : 'Button',
                    cls : 'x-btn-text-icon',
                    icon: Roo.rootURL + 'images/default/dd/drop-add.gif',
                    listeners : {
                        click: function()
                                {
                                    _this.dialog.show( { id : 0 }, function() {
                                        _this.grid.footer.onClick('first');
                        
                                    }); 
                        
                                }
                                
                    }
                },
                {
                    text : "Edit",
                    xtype : 'Button',
                    cls : 'x-btn-text-icon',
                    icon: Roo.rootURL + 'images/default/tree/leaf.gif',
                    listeners : {
                        click: function()
                                {
                                    var s = _this.grid.getSelectionModel().getSelections();
                                    if (!s.length || (s.length > 1))  {
                                        Roo.MessageBox.alert("Error", s.length ? "Select only one Row" : "Select a Row");
                                        return;
                                    }
                                    
                                    _this.dialog.show(s[0].data, function() {
                                        _this.grid.footer.onClick('first');
                                       }); 
                                    
                                }
                                
                    }
                },
                {
                    text : "Delete",
                    cls : 'x-btn-text-icon',
                    icon: rootURL + '/Pman/templates/images/trash.gif',
                    xtype : 'Button',
                    listeners : {
                        click: function()
                                {
                                Pman.genericDelete(_this, _this.grid.tableName); 
                                }
                                
                    }
                }
            ]
        }
    },
    region : 'center'
});
     
