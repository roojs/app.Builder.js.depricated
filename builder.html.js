//<script type="text/javascript">
 

var MODULE = { isBuilder : true };
// BC
var _this = MODULE;

// the apprenderer.
Builder  = {
    
    scriptTag : false,
    
    id : 1,
    
    render : function(data, clsname)
    {
        
       // console.log(data);
        console.log(clsname);
        // for debugging 
        // console.log(data);        return; 
        //Roo.log(data);
        //Roo.log(data);
        // This would be alot simpler if we just use the XComponent code...
        // data should now be dialog or xcomponent..
        // only snag here is that we do not know the name currently..
        //Roo.log(clsname);
        var  ix = '_src_' + this.id++;
        // should replace module name with Builder._src_{id}
        data =  data.replace(clsname, 'Builder.' + ix);
        // next.. we need to ensure that parent is set correctly..
        // done by sender... otherwise building becomes difficult..
        //data  += "\n" + 'Builder.' + ix + ".parent = '#renderel';\n";
        console.log(data);
        //Roo.log(data);return;
        //Roo.log(data);
        if (this.scriptTag) { 
            document.body.removeChild(this.scriptTag);
            this.scriptTag = false;
        }
        
        this.scriptTag = document.body.appendChild(document.createElement('script'));
        this.scriptTag.setAttribute('type','text/javascript');
         
        this.id++;
        this.scriptTag.appendChild(
                    document.createTextNode(
                            data 
        ));
         
        
        //Roo.log(this.tree);
        MODULE = { isBuilder : true }; 
        _this = MODULE;
        if (!Builder.click) {
            Builder.click= Roo.get(document.body).on('click', this.onclick, this);
        }
        Roo.log('Builder.'+ ix);
        Roo.XComponent.build();
        return;
        
        return;
        var  wait_for_tree = function() {
            
            Builder.tree = Builder[ix];
            if (!Builder.tree) {
                Roo.log("Wating for tree : " + ix);
                wait_for_tree.defer(100);
                return;
            }
             Builder.redraw(false);
        }
        wait_for_tree.defer(100);
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
            //console.log(Builder.dump(this.layoutbase.el));
            
            
            try {
                var pan = this.layoutbase.getRegion('center').getPanel(0);
                if (pan) {
                    this.layoutbase.remove('center', pan);
                }
                
                
            } catch( e) {
                console.log(e);
                console.log(JSON.stringify(e));
                // reload!!?
            }
            
            
            
            //this.layoutbase= false;
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
        this.cfg = cfg;
        //console.log(this.dump(cfg)); 
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
            
            
            MODULE.dialog = new Roo[cfg.xtype](this.dialogroot, cfg);
            //this.dialog.el.on('click', this.panelClick, this);
            MODULE.dialog.show();
            return;
            
        }
        
        // otherwise we are creating a layout area on the document..
        
         
        // handles 
        // contentpanel, nestedlayoutpanel, contentpanel.. etc. 
        // force center region..
        cfg.region = 'center';
        cfg.background = false;
        if (!this.layoutbase) {
                
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
        }
        try {
            console.log("ADDING CFG");    
            console.log(cfg)
            this.layoutbase.addxtype(  cfg ); 
        } catch (e) {
            console.log("GOT ERROR? - saved in Builder.lastError");
            Builder.lastError = e;
            console.log(e);
            console.log(typeof(e));
            
            console.log(this.dump(e));
            console.trace();
        }
        
        
    },
  
    
    munge :function (cfg, isListener)
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
                this.munge(cfg[p], p == 'listeners');
                continue;
            }
            // SPECIAL - PIPE
            if (p.charAt(0) == '|' || isListener) {
                
                if (!cfg[p].length) {
                    delete cfg[p];
                    continue;
                }
                var pp = p.charAt(0) == '|'  ? p.substring(1) : p;
                try {
                    
                    
                    var _tmp = false;
                    
                    /** eval:var:MOUDULE **/
                    /** eval:var:_this **/
                    /** eval:var:_tmp **/
                    // stupid IE can not return objects evaluated..
                   // console.log('_tmp =(' + cfg[p] + ')');
                    eval('_tmp =(' + cfg[p] + ')');
                    cfg[pp] = _tmp;
                    
                    //if (typeof(_tmp) == 'undefined') {
                    //    alert(cfg[p]);
                   // }
                   
                } catch(e) {  
                    console.log('Error evaluating: '  + cfg[p] + "\r\n" + JSON.stringify(e)); 
                };
                if (pp != p) {
                    delete cfg[p];
                }
                
                    
                
                continue;
            }
            // skip '*'
            if ((p.charAt(0) == '*') || (p.charAt(0) == '+')) {
                delete cfg[p];
                continue;
            }
            // normal..
              
        }
        
        if (cfg.xtype && cfg.xtype.match(/^Roo\./) && !cfg.xns) {
            // xtype contains full path..
            var bits = cfg.xtype.split('.');
            bits.shift(); // remove roo..
            cfg.xtype = bits.pop(); // get the last bit..
            cfg.xns = Roo;
            while (bits.length) {
                cfg.xns = cfg.xns[bits.shift()]; 
            }
             
        }
        if (cfg.xtype) {
            if (!cfg.xns || typeof(cfg.xns[cfg.xtype]) == 'undefined') {
                throw "Invalid Xtype " + cfg.xtype + ' on ' + cfg.xtreepath;
            }
        }
        if (!isListener) {
            cfg.listeners = cfg.listeners || {};
        }
        // we can overlay some event handlers here..
        
       
        //console.log('xtype'  + xtype)
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
                //console.log('adding prop:' + xi['*prop']);
                
                var pr = xi['*prop'];
                this.munge(xi);
                // if prop is an array - then it's items are really the value..
                if (pr.match(/\[\]$/)) {
                    //console.log('adding array?:' + pr);
                    pr = pr.replace(/\[\]$/, '');
                    cfg[pr] = cfg[pr]  || [];
                    cfg[pr].push(xi);
                    continue;
                }
                
                
                if (xi.xtype && xi.xtype  == 'Array') {
                    cfg[pr] = xi.items;
                } else {
                    //console.log('setting property:' + pr);
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
        console.log(cfg);
        
        
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
        if (level >  3) {
            return '... TO DEEP ...';
        }
        //The padding given at the beginning of the line.
        var level_padding = "";
        for(var j=0;j<level+1;j++) level_padding += "    ";
        
        if(typeof(arr) == 'object') { //Array/Hashes/Objects 
            for(var item in arr) {
                
                var value = arr[item];
                if (item == 'xns') {
                    continue;
                }
                if(typeof(value) == 'function') { //If it is an array,
                    // fake dump...
                    dumped_text += level_padding + "'" + item + "' : function() { ... },\n";
                    continue;
                }
                if(typeof(value) == 'object') { //If it is an array,
                    dumped_text += level_padding + "'" + item + "': {\n";
                    dumped_text += this.dump(value,level+1);
                    dumped_text += level_padding + "}\n";
                    continue;
                }
                dumped_text += level_padding + "'" + item + "' : \"" + value + "\"\n";
                
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
        if (ftg.dom.className.match(/[0-9]+/)) {
            //console.log(ftg.dom.className);
            var cmat = ftg.dom.className.match(/x-grid-hd-builder-(form-gen-[0-9:]+)/);
            if (cmat) {
                this[method]( cmat[1] );
                return true;
            }
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
    },
    clearBootstrap : function()
    {
        // if the page is not bootstrap
        
        if ( typeof(BuilderUseBootstrap) != 'undefined' ) {
            Roo.log("it's boostrap - BuilderUseBootstrap is defined ");
            // it's bootstrap - probably remove roo's css..
            return;
        }
        Roo.log("remove css = BuilderUseBootstrap is not defined");
        var rem = [];
        var ar = document.getElementsByTagName('link');
        for (var i = 0; i < ar.length;i++) {
            var l = ar[i];
            Roo.log(l.getAttribute('href'));
            if (l.getAttribute('href').match(/bootstrap/)) {
                rem.push(l);
                
                
            }
            //code
        }
        Roo.each(rem, function(l) { l.parentNode.removeChild(l);});
    },
    
    applyFlexy: function(tree)
    {
        if (typeof(tree['flexy:foreach']) != 'undefined') {
            //Roo.log("add flexy:foreach");
            tree.el.attr('flexy:foreach', tree['flexy:foreach']);
        }
        if (typeof(tree['flexy:if']) != 'undefined') {
            //Roo.log("add flexy:if");
            tree.el.attr('flexy:if', tree['flexy:if']);
        }
        if (typeof(tree['flexy:include']) != 'undefined') {
            //Roo.log("add flexy:if");
            tree.el.attr('flexy:include', tree['flexy:include']);
        }
        
        if (typeof(tree['xtype-bootstrap']) != 'undefined') {
            //Roo.log("add flexy:if");
            tree.el.attr('xtype', tree['xtype-bootstrap']);
        }
        
        
        if (!tree.items || !tree.items.length) { return; }
        
        for (var i = 0; i < tree.items.length; i++){
            this.applyFlexy(tree.items[i]);
        }
    }
    
     
    
};
Roo.onReady(function() { Builder.clearBootstrap(); });
Roo.XComponent.on('buildcomplete', function() {
    Roo.log("xcomponent built!");
    
    Builder.applyFlexy(Roo.XComponent.modules[0].el);
});