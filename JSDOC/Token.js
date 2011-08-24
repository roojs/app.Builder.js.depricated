//<Script type="text/javascript">

XObject = imports.XObject.XObject;
 
console = imports.console.console;
/**
 *	@class Token
 * 
 *  @prop data {String} raw value of token
 *  @prop type {String} type of token
 *     TOKN  (unknown)          - name is UNKNOWN_TOKEN
 * 
 *     KEYW  (keyword)          - name is upper case version of keyword
 *     NAME  (name/identifier)  - name is NAME
 *     COMM  (comment)          - name is MULTI_LINE_COMM, JSDOC, SINGLE_LINE_COMM
 *     PUNC  (puctuation)       - name is String description of punctionan (eg LEFTPARAM)
 *     WHIT  (white space)      - name is SPACE,NEWLINE
 *     STRN  (string)           - name is DOBULE_QUOTE, SINGLE_QUOTE
 *     NUMB  (number)           - name is OCTAL,DECIMAL,HEC_DEC
 *     REGX   (reg.expression)  - name is REGX
 *  @prop name {String} see type details above
 *  @prop identifier {Identifier} identifier class if relivant
 * 
 * 
 * 
 * old mappings:
 * 
 * Script.TOKidentifier  - type == 'NAME'
 * Script.TOKassign  = data == '='
 * Script.TOKsemicolon data == '';
 * 
 * 
 * 
*/

Token = XObject.define(
    function(data, type, name, line) {
        this.data = data;
        this.type = type;
        this.name = name;
        this.line = line;
        this.prefix = '';    
        this.outData = false; // used by packer/scopeparser
        this.identifier = false; // used by scope
        this.id = Token.id++;
    }, 
    Object, 
    {
         toString: function()
        {
            return 'line:' + this.line + ', type:' + this.type + 
                ', name:' + this.name + ', data:' + this.data + 
                ((this.outData === false) ? '' : ( 'outData : ' + this.outData));
        },
        
        
        toRaw : function(lvl)
        {
            lvl = lvl || 0;
            
            var ret =  this.data ;
            
            
            if (this.items) {
                var ar = [];
                this.items.forEach(  function(ai) {
                    
                    var str = '';
                    ai.forEach(  function(it) {
                        str += it.toRaw(lvl + 1);
                    })
                    ar.push(str);
                    
                })
                ret +=   ar.join('');
                
            }
            if (this.props) {
                for (var i in this.props) {
                    ret += this.props[i].key.toRaw(lvl+1) + ' : ';
                    this.props[i].val.forEach( function(e) {
                        ret+=e.toRaw(lvl+1);
                    })
                    
                }
            }
            
            
            
            return this.prefix +   ret;
             
        },

        toJS : function() {
            
            try {
                var _tmp = '';
                eval( "_tmp = " + this.data);
                return _tmp;
            } catch( e) {
                return "ERROR unparsable" + this.data;
            }
        },
         
                        

        is : function(what) {
            return this.name === what || this.type === what;
        }
});
Token.id = 0;     