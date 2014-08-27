//<script type="text/javascript">
 

var MODULE = { isBuilder : true };
// BC
var _this = MODULE;

// the apprenderer.
Builder  = {
     
    scriptTag : false,
    
    id : 1,
    
     
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