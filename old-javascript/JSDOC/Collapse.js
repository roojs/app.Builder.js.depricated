//<script type="text/javscript">
XObject = imports.XObject.XObject;

 
console     = imports.console.console; 

// make sure parent is loaded..
TokenStream = imports.TokenStream.TokenStream;
/**
 * 
 * base class for parsing segments of token array..
 * 
 * 
 * We want to make parsing the whole thing easy..
 * 
 * so we do various tricks:
 * 
 * 
 * a) white space collased
 *    wsPrefix 
 * b)  toks
 *     { } - collapse into first element.
       ( ) - collapse into first element.
       [ ] - collapse into first element.
 * c) items = , seperation within the above..
 * 
 * usage: x = new Collapse(token_array)
 * 
 * 
 * 
 * 
 */ 
 
Collapse = XObject.define(
    function (ar)
    {
         
        Collapse.superclass.constructor.call(this, ar);
        
        this.spaces();
        var ar = this.collapse(this.tokens);
        
        this.tokens = ar;
        
       // console.dump(ar);
        
    }, 
    TokenStream, 
    {
    
        spaces : function () {
            var ar = [];
            var pref = [];
            
            var tok;
            
            for (var i = 0; i < this.tokens.length; i ++) {
                tok = this.tokens[i];
                if (tok.is("COMM") || tok.is("WHIT")) {
                    pref.push(tok);
                    continue;
                }
                tok.prefix = '';
                if (pref.length) {
                    pref.forEach( function(e) {
                        if (!e) {
                            return;
                        }
                        tok.prefix += e.data;
                    })
                }
                
                ar.push(tok);
                pref=  [];
                
            }
            this.tokens = ar;
            
        },
        collapse : function(ar) {
            
            var st = new  TokenStream(ar);
            var ret = [];
            
            while (true) {
                var  tok = st.look(1,true);
                if (!tok || !tok.is) {
                  //  Seed.print(TokenStream.toString(ret));
                    return ret;
                }
                // console.log(tok.data);
                switch(tok.type) {
                    case "VOID": 
                        return ret; //EOF
                        
                        
                    case "KEYW": 
                    case "TOKN":
                    case "NAME":
                    case "STRN":
                    case "NUMB":
                    case "REGX":
                        ret.push(st.next(1));
                        continue;
                        
                    case "PUNC":
                        switch (tok.data) {
                            case "[":
                            case "{":
                            case "(":
                                
                                var start = st.cursor;
                                st.next(1);
                                var add = st.balance(tok.data);
                                if (!add) {
                                    console.dump(tok);
                                    console.dump(start + '...' + st.cursor);
                                    console.dump(st.tokens);
                                 
                                }
                                if (add) {
                                    add.shift();
                                }
                                //Seed.print("ADD");
                                //Seed.print(JSON.stringify(add, null,4));
                                
                                
                                
                                var toks = add ? this.collapse(add) : [];
                                tok.items = false;
                                tok.props = false;
                                
                                
                                
                                if (tok.data != '{') {
                                    // paramters or array elements..
                                    tok.items = this.toItems(toks, [',']);
                                } else {
                                    // check for types.. it could be a list of statements.. or object
                                    
                                    var ost = new  TokenStream(toks);
                                    //console.dump(ost.look(2,true) );
                                    if (ost.look(2,true) && ost.look(2,true).data == ":") {
                                        tok.props = this.toProps(toks);
                                    } else {
                                        // list of statemetns..
                                        tok.items = this.toItems(toks,[ ';', '{'] );;
                                    }
                                    
                                    
                                }
                                 
                                
                                
                                
                                
                                
                                
                                //Seed.print(" ADD : " + add.length  +  " ITEMS: " + tok.items.length);
                                
                                ret.push(tok);
                                
                                continue;
                   
                            default:
                                ret.push(st.next(1));
                                continue;
                        }
                        Seed.print("OOPS");
                        continue;
                    default : 
                        Seed.print("OOPS" + tok.type);
                        continue;
                }
            }
                
                
            
            
            
            
            
            
            
            
        },
        toItems : function(ar,sep)
        {
            var ret = [];
            var g = [];
              
            for (var i = 0; i < ar.length; i ++) {
                if (sep.indexOf(ar[i].data) < 0) {
                    g.push(ar[i]);
                    continue;
                }
                // var a=..., b =...
                if ((ar[i].data != ';') && g.length && (g[0].name == "VAR")) {;
                    g.push(ar[i]);
                    continue;
                }
                
                g.push(ar[i]);
                ret.push(g);
                g = [];
                
            }
            // last..
            if (g.length) {
                ret.push(g);
            }
            return ret;
            
        },
        toProps : function(ar)
        {
            
            var ret = { }
               
            var g = { key : '', val: [] }
               
            
            var k = '';
            var state = 0;
            for (var i = 0; i < ar.length; i ++) {
                
                switch(state) {
                    case 0:
                        k = ar[i].data;
                        g.key = ar[i];
                        state = 1;
                        continue;
                    case 1:
                        state =2; // should be ':'
                        continue;
                    case 2:
                        g.val.push(ar[i]);
                        if (ar[i].data != ',') {
                            continue;
                        }
                        ret[k] = g;
                        g = { key : '', val: [] }
                        state = 0;
                        continue;
                   
                }
            }
             // last.. - if g.val.length is 0 then it's a trailing ','...
             // we should really throw a syntax error in that case..
            if (k.length && g.val.length) {
                ret[k] = g;
            }
            return ret;
            
            
        }

    
    
});