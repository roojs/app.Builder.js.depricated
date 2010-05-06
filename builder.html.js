//<script type="text/javascript">


Builder  = {
    
    render : function(data)
    {
        this.tree = data;
        
        if (!Builder.click) {
            Builder.click= Roo.get(document.body).on('click', this.onclick, this);
         
        }
        
        this.redraw(false);
    },
    
    
    tree : {}, 
    renderObj :  { isBuilder : true },
    dialogroot : false,
    
    redrawClear : function(isAuto)
    {
        this.renderObj = { isBuilder : true };
        
        this.scroll = {
            top:0,
            left:0
        };
        
         
        
        //if (this.panelroot) {
        //    this.scroll = this.panelroot.el.getScroll();
        //    this.layout.remove('center', this.panelroot);
        //    this.panelroot = false;
        //}
        if (this.dialogroot) {
            this.dialogroot.remove();
            this.dialogroot = false;
        }
        if (this.layoutbase) {
            this.layoutbase.remove();
            this.layoutbase= false;
        }
         
        
    },
    
    redraw: function(isAuto)
    {
        
        // top level is not relivant
        this.redrawClear(isAuto);
        
        
        var cfg =  this.tree;
        //console.log(this.dump(cfg));
        if (!cfg) {
            return;
        }
        
        
        this.munge(cfg);
        
        // we draw either a dialog or a tab..
        
        if (cfg.xtype == 'LayoutDialog') {
            
            cfg.modal = false;
            //var xy  = Pman.Tab.BuilderPanel.panel.el.getXY();
            //cfg.items[0].x = xy[0];
            //cfg.items[0].y = xy[1];
            //cfg.items[0].constraintoviewport = false;
        
            this.dialogroot = Roo.get( document.body).createChild({
                id : cfg.id
            });
             
            this.dialog = new Roo[cfg.xtype](this.dialogroot, cfg);
            //this.dialog.el.on('click', this.panelClick, this);
            this.dialog.show();
            return;
            
        }
        
        // otherwise we are creating a layout area on the document..
        
         
        // handles 
        // contentpanel, nestedlayoutpanel, contentpanel.. etc. 
        // force center region..
        cfg.region = 'center';
        cfg.background = false;
        this.layoutbase = new Ext.BorderLayout(document.body, {
          
             center: {
                titlebar: false,
                autoScroll:false,
                closeOnTab: true,
                tabPosition: 'top',
                //resizeTabs: true,
                alwaysShowTabs: true,
                minTabWidth: 140
            }
        });
         
        this.layoutbase.addxtype(  cfg ); 
        
        
        
    },
  
    
    munge :function (cfg)
    {
        var xitems = false;
        //cfg.cls = cfg.cls || '';
        //cfg.cls += ' ' + cfg.id;
        if (!cfg.id) {
            this.dump(cfg);
        }
        //console.log(cfg.xtype + ': ' + cfg.id);
        
        if (cfg.items) {
            xitems = cfg.items;
            delete cfg.items;
        }
        if (typeof(cfg.background) != 'undefined') {
            cfg.background = false;
        }
        
        var xtype = (cfg['|xns'] || '')  + '.' + (cfg.xtype || '');
        
        for(var p in cfg){
            // key is not string?!?!?!!?
            if (typeof(p) != 'string') {
                continue;
            }
            
            if (typeof(cfg[p]) == 'object') { // listeners!!!
                this.munge(cfg[p]);
                continue;
            }
            // SPECIAL - PIPE
            if (p.charAt(0) == '|') {
                
                if (!cfg[p].length) {
                    delete cfg[p];
                    continue;
                }
                try {
                    var _tmp = false;
                    
                    var _this = this.renderObj; /// fake '_this' object..
                    /** eval:var:_this **/
                    /** eval:var:_tmp **/
                    // stupid IE can not return objects evaluated..
                    eval('_tmp =(' + cfg[p] + ')');
                    cfg[p.substr(1)] = _tmp;
                    //if (typeof(_tmp) == 'undefined') {
                    //    alert(cfg[p]);
                   // }
                   
                } catch(e) {  console.log('Error evaluating: '  + cfg[p]); };
                delete cfg[p];
                    
                
                continue;
            }
            // skip '*'
            if ((p.charAt(0) == '*') || (p.charAt(0) == '+')) {
                delete cfg[p];
                continue;
            }
            // normal..
              
        }
        
        // we can overlay some event handlers here..
        cfg.listeners = cfg.listeners || {};
       
        console.log('xtype'  + xtype)
        switch(xtype) {
            case 'Roo.LayoutDialog':
                cfg.listeners.resize = function(dlg, w,h)
                {
                    console.log('{ "id" : "' + dlg.id + '", "set" : "width", "value": ' + w + '}');
                    console.log('{ "id" : "' + dlg.id + '", "set" : "height", "value": ' + h + '}');
                }
                break;
        }
        
        
        
        
        
        // now for all the children.. (items)
        if (xitems === false) {
            return;
        }
        cfg.items = [];
        for (var i = 0; i < xitems.length; i++) {
            // if +builderhide set !!!! drop it!!
            
            
            var xi = xitems[i];
            if (typeof(xi['*prop']) != 'undefined') {
                var pr = xi['*prop'];
                this.munge(xi);
                // if prop is an array - then it's items are really the value..
                if (pr.match(/\[\]$/)) {
                    pr = pr.replace(/\[\]$/, '');
                    cfg[pr] = cfg[pr]  || [];
                    cfg[pr].push(xi);
                    continue;
                }
                
                
                if (xi.xtype && xi.xtype  == 'Array') {
                    cfg[pr] = xi.items;
                } else {
                    cfg[pr] = xi;
                }
                
                
                continue;
            }
            this.munge(xi);
            cfg.items.push(xi);
        }
        
        if (cfg.items.length == 0) {
            delete cfg.items;
        }
        
        
        
    },
    
    
    
    cloneConfig : function(config) {
		if (!config) { return null; }
		var newConfig = {};
		for (var i in config) {
			if (typeof config[i] == 'object') {
				newConfig[i] = this.cloneConfig(config[i]);
			} else if (typeof config[i] != 'function') {
				newConfig[i] = config[i];
			}
		}
		return newConfig;
	},
    dump : function (arr,level) {
        var dumped_text = "";
        if(!level) level = 0;
        
        //The padding given at the beginning of the line.
        var level_padding = "";
        for(var j=0;j<level+1;j++) level_padding += "    ";
        
        if(typeof(arr) == 'object') { //Array/Hashes/Objects 
            for(var item in arr) {
                var value = arr[item];
                
                if(typeof(value) == 'object') { //If it is an array,
                    dumped_text += level_padding + "'" + item + "' ...\n";
                    dumped_text += this.dump(value,level+1);
                } else {
                    dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
                }
            }
        } else { //Stings/Chars/Numbers etc.
            dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
        }
        return dumped_text;
    },
    findNode : function(ftg , method) {
        if (!ftg) {
            return; false
        }
      // console.log(ftg.id);
        if (ftg.id && typeof(ftg.id) == 'string' && ftg.id.match(/builder-/)) {
            var nid = ftg.id.replace('builder-', '').replace('x-form-el-', '');
            this[method]( nid );
            return true;
        }
        // needs fixing..
        console.log(ftg.dom.className);
        var cmat = ftg.dom.className.match(/x-grid-hd-builder-(form-gen-[0-9:]+)/);
        
        if (cmat) {
            this[method]( cmat[1] );
            return true;
        }
        
        return false;
    },
    
    overPos: function(x,y) 
    {
        
        var el = document.elementFromPoint(x,y);
       // //console.log(el.id);
       // console.log(document.body.innerHTML);
        this.hover( {
            getTarget : function () {
                return el;
            },
            stopEvent : function() {
                
            }
        });
        
        
    },
    onclick: function(e) {
        var tg = Roo.get(e.getTarget());
        if (!tg) {
            //console.log('no target');
            return;
           }
         
        if (this.findNode(tg,'logClick')) {
            return;
        }
        var dp = Roo.get(tg.up(''));
        if (dp && this.findNode(dp,'logClick')) {
            return;
        }
        
        var ns = Roo.get(tg.getNextSibling());
        if (ns && this.findNode(ns,'logClick')) {
          
            return;
        }
        if (ns && ns.down('') && this.findNode(Roo.get(ns.down('')) ,'logClick') ) {
            return;
        }
        
        for(var i =0; i < 5; i++) {
            tg = Roo.get(tg.up(''));
            if (!tg) {
                //console.log('no parent' + i);
                return;
            }
            if (tg && this.findNode(tg,'logClick')) {
                return;
            }
        }
        //console.log('no target in parents');
        
    },
    logClick : function(id) 
    {
         var bid = id.length ? 'builder-' + id : '';
         console.log('{ "id" :  "' + bid + '"}');
    },
    
    
    hover : function(e) {
        
       
        var tg = Roo.get(e.getTarget());
        if (!tg) {
            //console.log('no target');
            this.logMove('');
            return;
           }
         
        if (this.findNode(tg,'logMove')) {
            e.stopEvent();
            return;
        }
        var dp = Roo.get(tg.up(''));
        if (dp && this.findNode(dp,'logMove')) {
            e.stopEvent();
            return;
        }
        
        var ns = Roo.get(tg.getNextSibling());
        if (ns && this.findNode(ns,'logMove')) {
            e.stopEvent();
            return;
        }
        if (ns && ns.down('') && this.findNode(Roo.get(ns.down('')) ,'logMove' )) {
            e.stopEvent();
            return;
        }
        
        for(var i =0; i < 5; i++) {
            tg = Roo.get(tg.up(''));
            if (!tg) {
                //console.log('no parent' + i);
                this.logMove('');
                return;
            }
            if (tg && this.findNode(tg,'logMove')) {
                e.stopEvent();
                return;
            }
        }
        //console.log('no target in parents');
        this.logMove('');
    },
    logMove : function (id) {
        //console.log("LOGMOVE: " + id);
        
        if (this.lastID === id) {
            return;
       }
       id = ''+ id;
       var bid = id.length ? 'builder-' + id : '';
       console.log('{ "hover-node" :  "' + bid + '"}');
       this.lastID = id;
    }
            
    
};
    