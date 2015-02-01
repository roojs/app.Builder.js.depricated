//<script type="text/javascript">

 
XObject = imports.XObject.XObject;
console = imports.console.console;


Token   = imports.Token.Token;
Lang    = imports.Lang.Lang;

/**
	@class Search a {@link JSDOC.TextStream} for language tokens.
*/
TokenReader = XObject.define(
    function(o) {
        
        XObject.extend(this, o || {});
        
    },
    Object,
    {
        /** @cfg {Boolean} collapseWhite merge multiple whitespace/comments into a single token **/
        collapseWhite : false, // only reduces white space...
        /** @cfg {Boolean} keepDocs keep JSDOC comments **/
        keepDocs : true,
        /** @cfg {Boolean} keepWhite keep White space **/
        keepWhite : false,
        /** @cfg {Boolean} keepComments  keep all comments **/
        keepComments : false,
        /** @cfg {Boolean} sepIdents seperate identifiers (eg. a.b.c into ['a', '.', 'b', '.', 'c'] ) **/
        sepIdents : false,
        /** @cfg {String} filename name of file being parsed. **/
        filename : '',
        /** @config {Boolean} ignoreBadGrammer do not throw errors if we find stuff that might break compression **/
        ignoreBadGrammer : false,
        /**
         * tokenize a stream
         * @return {Array} of tokens
         * 
         * ts = new TextStream(File.read(str));
         * tr = TokenReader({ keepComments : true, keepWhite : true });
         * tr.tokenize(ts)
         * 
         */
        tokenize : function(/**JSDOC.TextStream*/stream) {
            this.line =1;
            var tokens = [];
            /**@ignore*/ 
            tokens.last    = function() { return tokens[tokens.length-1]; }
            /**@ignore*/ 
            tokens.lastSym = function() {
                for (var i = tokens.length-1; i >= 0; i--) {
                    if (!(tokens[i].is("WHIT") || tokens[i].is("COMM"))) return tokens[i];
                }
            }

            while (!stream.look().eof) {
                if (this.read_mlcomment(stream, tokens)) continue;
                if (this.read_slcomment(stream, tokens)) continue;
                if (this.read_dbquote(stream, tokens))   continue;
                if (this.read_snquote(stream, tokens))   continue;
                if (this.read_regx(stream, tokens))      continue;
                if (this.read_numb(stream, tokens))      continue;
                if (this.read_punc(stream, tokens))      continue;
                if (this.read_newline(stream, tokens))   continue;
                if (this.read_space(stream, tokens))     continue;
                if (this.read_word(stream, tokens))      continue;
                
                // if execution reaches here then an error has happened
                tokens.push(new Token(stream.next(), "TOKN", "UNKNOWN_TOKEN", this.line));
            }
            
            
            
            return tokens;
        },

        /**
         * findPuncToken - find the id of a token (previous to current)
         * need to back check syntax..
         * 
         * @arg {Array} tokens the array of tokens.
         * @arg {String} token data (eg. '(')
         * @arg {Number} offset where to start reading from
         * @return {Number} position of token
         */
        findPuncToken : function(tokens, data, n) {
            n = n || tokens.length -1;
            var stack = 0;
            while (n > -1) {
                
                if (!stack && tokens[n].data == data) {
                    return n;
                }
                
                if (tokens[n].data  == ')' || tokens[n].data  == '}') {
                    stack++;
                    n--;
                    continue;
                }
                if (stack && (tokens[n].data  == '{' || tokens[n].data  == '(')) {
                    stack--;
                    n--;
                    continue;
                }
                
                
                n--;
            }
            return -1;
        },
        /**
         * lastSym - find the last token symbol
         * need to back check syntax..
         * 
         * @arg {Array} tokens the array of tokens.
         * @arg {Number} offset where to start..
         * @return {Token} the token
         */
        lastSym : function(tokens, n) {
            for (var i = n-1; i >= 0; i--) {
                if (!(tokens[i].is("WHIT") || tokens[i].is("COMM"))) return tokens[i];
            }
            return null;
        },
        
         
        
        /**
            @returns {Boolean} Was the token found?
         */
        read_word : function(/**JSDOC.TokenStream*/stream, tokens) {
            var found = "";
            while (!stream.look().eof && Lang.isWordChar(stream.look())) {
                found += stream.next();
            }
            
            if (found === "") {
                return false;
            }
            
            var name;
            if ((name = Lang.keyword(found))) {
                if (found == 'return' && tokens.lastSym().data == ')') {
                    //Seed.print('@' + tokens.length);
                    var n = this.findPuncToken(tokens, ')');
                    //Seed.print(')@' + n);
                    n = this.findPuncToken(tokens, '(', n-1);
                    //Seed.print('(@' + n);
                    
                    var lt = this.lastSym(tokens, n);
                   Seed.print(JSON.stringify(lt));
                    if (lt.type != 'KEYW' || ['IF', 'WHILE'].indexOf(lt.name) < -1) {
                        if (!this.ignoreBadGrammer) {
                            throw {
                                name : "ArgumentError", 
                                message: "\n" + this.filename + ':' + this.line + " Error - return found after )"
                            }
                        }
                    }
                    
                    
                    
                }
                
                tokens.push(new Token(found, "KEYW", name, this.line));
                return true;
            }
            if (!this.sepIdents || found.indexOf('.') < 0 ) {
                tokens.push(new Token(found, "NAME", "NAME", this.line));
                return true;
            }
            var n = found.split('.');
            var p = false;
            var _this = this;
            n.forEach(function(nm) {
                if (p) {
                    tokens.push(new Token('.', "PUNC", "DOT", _this.line));
                }
                p=true;
                tokens.push(new Token(nm, "NAME", "NAME", _this.line));
            });
            return true;
                

        },

        /**
            @returns {Boolean} Was the token found?
         */
        read_punc : function(/**JSDOC.TokenStream*/stream, tokens) {
            var found = "";
            var name;
            while (!stream.look().eof && Lang.punc(found+stream.look())) {
                found += stream.next();
            }
            
            
            if (found === "") {
                return false;
            }
            
            if ((found == '}' || found == ']') && tokens.lastSym().data == ',') {
                //print("Error - comma found before " + found);
                //print(JSON.stringify(tokens.lastSym(), null,4));
                if (this.ignoreBadGrammer) {
                    print("\n" + this.filename + ':' + this.line + " Error - comma found before " + found);
                } else {
                    
                    throw {
                        name : "ArgumentError", 
                        message: "\n" + this.filename + ':' + this.line + " Error - comma found before " + found
                    }
                }
            }
            
            tokens.push(new Token(found, "PUNC", Lang.punc(found), this.line));
            return true;
            
        },

        /**
            @returns {Boolean} Was the token found?
         */
        read_space : function(/**JSDOC.TokenStream*/stream, tokens) {
            var found = "";
            
            while (!stream.look().eof && Lang.isSpace(stream.look()) && !Lang.isNewline(stream.look())) {
                found += stream.next();
            }
            
            if (found === "") {
                return false;
            }
            //print("WHITE = " + JSON.stringify(found)); 
            if (this.collapseWhite) found = " ";
            if (this.keepWhite) tokens.push(new Token(found, "WHIT", "SPACE", this.line));
            return true;
        
        },

        /**
            @returns {Boolean} Was the token found?
         */
        read_newline : function(/**JSDOC.TokenStream*/stream, tokens) {
            var found = "";
            var line = this.line;
            while (!stream.look().eof && Lang.isNewline(stream.look())) {
                this.line++;
                found += stream.next();
            }
            
            if (found === "") {
                return false;
            }
            //this.line++;
            if (this.collapseWhite) {
                found = "\n";
            }
            if (this.keepWhite) {
                var last = tokens.pop();
                if (last && last.name != "WHIT") {
                    tokens.push(last);
                }
                
                tokens.push(new Token(found, "WHIT", "NEWLINE", line));
            }
            return true;
        },

        /**
            @returns {Boolean} Was the token found?
         */
        read_mlcomment : function(/**JSDOC.TokenStream*/stream, tokens) {
            if (stream.look() == "/" && stream.look(1) == "*") {
                var found = stream.next(2);
                var c = '';
                var line = this.line;
                while (!stream.look().eof && !(stream.look(-1) == "/" && stream.look(-2) == "*")) {
                    c = stream.next();
                    if (c == "\n") this.line++;
                    found += c;
                }
                
                // to start doclet we allow /** or /*** but not /**/ or /****
                if (/^\/\*\*([^\/]|\*[^*])/.test(found) && this.keepDocs) tokens.push(new Token(found, "COMM", "JSDOC", this.line));
                else if (this.keepComments) tokens.push(new Token(found, "COMM", "MULTI_LINE_COMM", line));
                return true;
            }
            return false;
        },

        /**
            @returns {Boolean} Was the token found?
         */
        read_slcomment : function(/**JSDOC.TokenStream*/stream, tokens) {
            var found;
            if (
                (stream.look() == "/" && stream.look(1) == "/" && (found=stream.next(2)))
                || 
                (stream.look() == "<" && stream.look(1) == "!" && stream.look(2) == "-" && stream.look(3) == "-" && (found=stream.next(4)))
            ) {
                var line = this.line;
                while (!stream.look().eof && !Lang.isNewline(stream.look())) {
                    found += stream.next();
                }
                if (!stream.look().eof) {
                    found += stream.next();
                }
                if (this.keepComments) {
                    tokens.push(new Token(found, "COMM", "SINGLE_LINE_COMM", line));
                }
                this.line++;
                return true;
            }
            return false;
        },

        /**
            @returns {Boolean} Was the token found?
         */
        read_dbquote : function(/**JSDOC.TokenStream*/stream, tokens) {
            if (stream.look() == "\"") {
                // find terminator
                var string = stream.next();
                
                while (!stream.look().eof) {
                    if (stream.look() == "\\") {
                        if (Lang.isNewline(stream.look(1))) {
                            do {
                                stream.next();
                            } while (!stream.look().eof && Lang.isNewline(stream.look()));
                            string += "\\\n";
                        }
                        else {
                            string += stream.next(2);
                        }
                    }
                    else if (stream.look() == "\"") {
                        string += stream.next();
                        tokens.push(new Token(string, "STRN", "DOUBLE_QUOTE", this.line));
                        return true;
                    }
                    else {
                        string += stream.next();
                    }
                }
            }
            return false; // error! unterminated string
        },

        /**
            @returns {Boolean} Was the token found?
         */
        read_snquote : function(/**JSDOC.TokenStream*/stream, tokens) {
            if (stream.look() == "'") {
                // find terminator
                var string = stream.next();
                
                while (!stream.look().eof) {
                    if (stream.look() == "\\") { // escape sequence
                        string += stream.next(2);
                    }
                    else if (stream.look() == "'") {
                        string += stream.next();
                        tokens.push(new Token(string, "STRN", "SINGLE_QUOTE", this.line));
                        return true;
                    }
                    else {
                        string += stream.next();
                    }
                }
            }
            return false; // error! unterminated string
        },

        /**
            @returns {Boolean} Was the token found?
         */
        read_numb : function(/**JSDOC.TokenStream*/stream, tokens) {
            if (stream.look() === "0" && stream.look(1) == "x") {
                return this.read_hex(stream, tokens);
            }
            
            var found = "";
            
            while (!stream.look().eof && Lang.isNumber(found+stream.look())){
                found += stream.next();
            }
            
            if (found === "") {
                return false;
            }
            else {
                if (/^0[0-7]/.test(found)) tokens.push(new Token(found, "NUMB", "OCTAL", this.line));
                else tokens.push(new Token(found, "NUMB", "DECIMAL", this.line));
                return true;
            }
        },
        /*t:
            requires("../lib/JSDOC/TextStream.js");
            requires("../lib/JSDOC/Token.js");
            requires("../lib/JSDOC/Lang.js");
            
            plan(3, "testing read_numb");
            
            //// setup
            var src = "function foo(num){while (num+8.0 >= 0x20 && num < 0777){}}";
            var tr = new TokenReader();
            var tokens = tr.tokenize(new TextStream(src));
            
            var hexToken, octToken, decToken;
            for (var i = 0; i < tokens.length; i++) {
                if (tokens[i].name == "HEX_DEC") hexToken = tokens[i];
                if (tokens[i].name == "OCTAL") octToken = tokens[i];
                if (tokens[i].name == "DECIMAL") decToken = tokens[i];
            }
            ////
            
            is(decToken.data, "8.0", "decimal number is found in source.");
            is(hexToken.data, "0x20", "hexdec number is found in source (issue #99).");
            is(octToken.data, "0777", "octal number is found in source.");
        */

        /**
            @returns {Boolean} Was the token found?
         */
        read_hex : function(/**JSDOC.TokenStream*/stream, tokens) {
            var found = stream.next(2);
            
            while (!stream.look().eof) {
                if (Lang.isHexDec(found) && !Lang.isHexDec(found+stream.look())) { // done
                    tokens.push(new Token(found, "NUMB", "HEX_DEC", this.line));
                    return true;
                }
                else {
                    found += stream.next();
                }
            }
            return false;
        },

        /**
            @returns {Boolean} Was the token found?
         */
        read_regx : function(/**JSDOC.TokenStream*/stream, tokens) {
            var last;
            if (
                stream.look() == "/"
                && 
                (
                    
                    (
                        !(last = tokens.lastSym()) // there is no last, the regex is the first symbol
                        || 
                        (
                               !last.is("NUMB")
                            && !last.is("NAME")
                            && !last.is("RIGHT_PAREN")
                            && !last.is("RIGHT_BRACKET")
                        )
                    )
                )
            ) {
                var regex = stream.next();
                
                while (!stream.look().eof) {
                    if (stream.look() == "\\") { // escape sequence
                        regex += stream.next(2);
                    }
                    else if (stream.look() == "/") {
                        regex += stream.next();
                        
                        while (/[gmi]/.test(stream.look())) {
                            regex += stream.next();
                        }
                        
                        tokens.push(new Token(regex, "REGX", "REGX", this.line));
                        return true;
                    }
                    else {
                        regex += stream.next();
                    }
                }
                // error: unterminated regex
            }
            return false;
        }
});