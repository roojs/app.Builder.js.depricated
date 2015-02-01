//<script type="text/javscript">


XObject = imports.XObject.XObject;
 


console = imports.console.console;
Token   = imports.Token.Token;
Lang    = imports.Lang.Lang;


/**
 * @class TokenStream
 * 
 * BC notes:
 * 
 * nextT => nextTok
 * lookT => lookTok
 * 
 */
	
 
TokenStream = XObject.define(

    /**
     * @constructor
     * 
     * 
     */

    function(tokens) {
     
        
        this.tokens = (tokens || []);
       // Seed.print(this.tokens.length);
        this.rewind();
    },
    Object,
    {
        cursor : -1, // where are we in the stream.
        
        rewind : function() {
            this.cursor = -1;
        },

        /**
            @type JSDOC.Token
        */
        look : function(/**Number*/n, /**Boolean*/considerWhitespace) {
            if (typeof n == "undefined") n = 0;

            if (considerWhitespace == true) {
                if (this.cursor+n < 0 || this.cursor+n > (this.tokens.length -1)) {
                    return new Token("", "VOID", "START_OF_STREAM");
                }
                return this.tokens[this.cursor+n];
            }
            else {
                var count = 0;
                var i = this.cursor;

                while (true) {
                    if (i < 0) return new Token("", "VOID", "START_OF_STREAM");
                    else if (i > this.tokens.length) return new Token("", "VOID", "END_OF_STREAM");

                    if (i != this.cursor && (this.tokens[i] === undefined || this.tokens[i].is("WHIT"))) {
                        if (n < 0) i--; else i++;
                        continue;
                    }
                    
                    if (count == Math.abs(n)) {
                        return this.tokens[i];
                    }
                    count++;
                    (n < 0)? i-- : i++;
                }

                return new Token("", "VOID", "STREAM_ERROR"); // because null isn't an object and caller always expects an object
            }
        },

        lookFor : function (data)
        {
            // non tree version..
            var i = this.cursor < 0 ? 0 : this.cursor ;
            
            while (true) {
                if (i >= this.tokens.length) return -1;
                if (this.tokens[i].data == data) {
                    return i;
                }
                i++;
                
            }
            // should not get here!
            return -1;

        },


        /**
         * look ahead (or back) x number of tokens (which are not comment or whitespace)
         * ?? used any more?
         */
        lookTok : function(/**Number*/n) {
            if (typeof n == "undefined") n = 1;

            
            var count = 0;
            var i = this.cursor;

            while (true) {
               // print(i);
                if (i < 0) {
                    if (n > -1) {
                        i = 0; 
                        count++;
                        continue;
                        
                    }
                    return   new Token("", "VOID", "END_OF_STREAM");
                }
                else if (i > this.tokens.length) return  new Token("", "VOID", "END_OF_STREAM");

                if (i != this.cursor && (this.tokens[i] === undefined || this.tokens[i].is("WHIT") || this.tokens[i].is("COMM"))) {
                    if (n < 0) i--; else i++;
                    continue;
                }
                
                if (count == Math.abs(n)) {
                    return this.tokens[i];
                }
                count++;
                (n < 0)? i-- : i++;
            }
        // should never get here..
            return false; // because null isn't an object and caller always expects an object;
            
        },

        /**
         *  @return {Token|null}
         * next token (with white space)
         */
            
           
        next : function(/**Number*/howMany) {
            if (typeof howMany == "undefined") howMany = 1;
            if (howMany < 1) return null;
            var got = [];

            for (var i = 1; i <= howMany; i++) {
                if (this.cursor+i >= this.tokens.length) {
                    return null;
                }
                got.push(this.tokens[this.cursor+i]);
            }
            this.cursor += howMany;

            if (howMany == 1) {
                return got[0];
            }
            else return got;
        },
        // what about comments after 'function'...
        // is this used ???
        nextTok  : function() {
            return this.nextNonSpace();
        },
        nextNonSpace : function ()
        {
            
            while (true) {
                tok = this.next(1);
                if (!tok) {
                    return false;
                }
                if (tok.is('WHIT') ||  tok.is('COMM')) {
                    continue;
                }
                return tok;
            }
        },
        /**
         *    @type JSDOC.Token[]
         * @param start {String}  token name or data (eg. '{'
         * @param stop {String} (Optional) token name or data (eg. '}'
         */
        balance : function(/**String*/start, /**String*/stop) {
            
            
            start = typeof(Lang.punc(start)) == 'undefined' ? start : Lang.punc(start);
            
            if (!stop) stop = Lang.matching(start);
            
            var depth = 0;
            var got = [];
            var started = false;
            //Seed.print("START:" + start);
            //Seed.print("STOP:" + stop);
            while ((token = this.look())) {
                if (token.is(start)) {
              //      Seed.print("balance: START : " + depth + " " + token.data);
                    depth++;
                    started = true;
                }
                
                if (started) {
                    got.push(token);
                }
                
                if (token.is(stop)) {
                    depth--;
                //    Seed.print("balance: STOP: "  + depth + " " + token.data);
                    if (depth < 1) return got;
                }
                if (!this.next()) break;
            }
        },

        getMatchingToken : function(/**String*/start, /**String*/stop) {
            var depth = 0;
            var cursor = this.cursor;
            
            if (!start) {
                start = Lang.matching(stop);
                depth = 1;
            }
            if (!stop) stop = Lang.matching(start);
            
            while ((token = this.tokens[cursor])) {
                if (token.is(start)) {
                    depth++;
                }
                
                if (token.is(stop) && cursor) {
                    depth--;
                    if (depth == 0) return this.tokens[cursor];
                }
                cursor++;
            }
        },

        insertAhead : function(/**JSDOC.Token*/token) {
            this.tokens.splice(this.cursor+1, 0, token);
        },
         
        remaining : function() {
            var ret = [];
            while (true) {
                var tok = this.look(1,true);
                if (!tok || !tok.is || tok.is('VOID')) {
                    return ret;
                }
                ret.push(this.next(1));
            }
        },
         

        arrayToString : function(ar) {
            console.log(typeof(ar));
            var ret = [];
            ar.forEach(function(e) {
                ret.push(e.data);
            })
            return ret.join('');
        },
        dump: function(start, end)
        {
            start = Math.max(start || 0, 0);
            end = Math.min(end || this.tokens.length, this.tokens.length);
            var out='';
            for (var i =start;i < end; i++) {
                
                out += (this.tokens[i].outData == false) ? this.tokens[i].data : this.tokens[i].outData;
            };
            print(out);
        }
});
    