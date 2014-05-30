//<script type="text/javscript">

/**
	@namespace
*/

public JsRender.Lang_Class Lang = null;

class JsRender.Lang_Class : Object {
    
    GLib.List<string> coreObjects;
    Gee.Map<string,string> whitespaceNames;
    Gee.Map<string,string> newlineNames;
    Gee.Map<string,string> keywordNames;
    Gee.Map<string,string> puncNames;
    
    void Lang_Class ()
    {
        if (Lang != null) {
            return;
            Lang = this;
        }
        this.init();
        
        
    }
    
    
    bool isBuiltin(string  name) {
        return (this.coreObjects.index(name) > -1);
    }
    
    string whitespace (string ch) {
        return this.whitespaceNames.get(ch);
    }
    string  newline (string ch) {
        return this.newlineNames.get(ch);
    }
    string keyword(string word) {
        return this.keywordNames.get("="+word);
    }
    
    string matching(string name) {
        return this.matchingNames.get(name);
    }
    
    bool isKeyword(string word) {
        return this.keywordNames.get("=" + word) != null;
        
    }
    string punc (string ch) {
        return this.puncNames[ch];
    }
    
    bool isNumber (string str) {
        return Regex.match_simple("^(.[0-9]|[0-9]+.|[0-9])[0-9]*([eE][+-][0-9]+)?$",str);
    }

    bool  isHexDec (string str) {
        return Regex.match_simple("^0x[0-9A-F]+$",str);
    }

    bool isWordChar (string str) {
        return Regex.match_simple("^[a-zA-Z0-9$_.]+$", str);
    }

    bool isSpace (string str) {
        return this.whitespace.get(str) != null;
    }

    bool isNewline (string str) {
        return this.newline.get(str) != null;
    }
    
    void init() {
        
        this.coreObjects = new Glib.List<string>();
        
        this.whitespaceNames = new Gee.Map<string,string>();
        this.newlineNames = new Gee.Map<string,string>();
        this.keywordNames = new Gee.Map<string,string>();
        this.puncNames = new Gee.Map<string,string>();

        
        
        string[] co = { "_global_", "Array", "Boolean", "Date", "Error", 
            "Function", "Math", "Number", "Object", "RegExp", "String" };
        for(var i =0; i< co.length;i++ ) {
            this.coreObjects.append(co[i]);
        }
        string[] ws =  {
            " :SPACE",
            "\f:FORMFEED",
            "\t:TAB",
            "\u0009:UNICODE_TAB",
            "\u000A:UNICODE_NBR",
            "\u0008:VERTICAL_TAB"
        };
        for(var i =0; i< ws.length;i++ ) {
            var x = ws[i].split(":");
            this.whitespaceNames.set(x[0],x[1]);
        }
        
        ws = {
            "\n:NEWLINE",
            "\r:RETURN",
            "\u000A:UNICODE_LF",
            "\u000D:UNICODE_CR",
            "\u2029:UNICODE_PS",
            "\u2028:UNICODE_LS"
        };
        for(var i =0; i< ws.length;i++ ) {
            var x = ws[i].split(":");
            this.newlineNames.set(x[0],x[1]);
        }
        ws = {
            "=break:BREAK",
            "=case:CASE",
            "=catch:CATCH",
            "=const:VAR",
            "=continue:CONTINUE",
            "=default:DEFAULT",
            "=delete:DELETE",
            "=do:DO",
            "=else:ELSE",
            "=false:FALSE",
            "=finally:FINALLY",
            "=for:FOR",
            "=function:FUNCTION",
            "=if:IF",
            "=in:IN",
            "=instanceof:INSTANCEOF",
            "=new:NEW",
            "=null:NULL",
            "=return:RETURN",
            "=switch:SWITCH",
            "=this:THIS",
            "=throw:THROW",
            "=true:TRUE",
            "=try:TRY",
            "=typeof:TYPEOF",
            "=void:VOID",
            "=while:WHILE",
            "=with:WITH",
            "=var:VAR"
         };
        for(var i =0; i< ws.length;i++ ) {
            var x = ws[i].split(":");
            this.keywordNames.set(x[0],x[1]);
        }
    
  
        ws={
            "; SEMICOLON",
            ", COMMA",
            "? HOOK",
             :   "COLON",
            "|| OR", 
            "&& AND",
            "| BITWISE_OR",
            "^ BITWISE_XOR",
            "& BITWISE_AND",
            "=== STRICT_EQ", 
            "== EQ",
            "= ASSIGN",
            "!== STRICT_NE",
            "!= NE",
            "<< LSH",
            "<= LE", 
            "< LT",
            ">>> URSH",
            ">> RSH",
            ">= GE",
            "> GT", 
            "++ INCREMENT",
            "-- DECREMENT",
            "+ PLUS",
            "- MINUS",
            "* MUL",
            "/ DIV", 
            "% MOD",
            "! NOT",
            "~ BITWISE_NOT",
            ". DOT",
            "[ LEFT_BRACE",
            "] RIGHT_BRACE",
            "{ LEFT_CURLY",
            "} RIGHT_CURLY",
            "( LEFT_PAREN",
            ") RIGHT_PAREN"
        };
        for(var i =0; i< ws.length;i++ ) {
            var x = ws[i].split(" ");
            this.puncNames.set(x[0],x[1]);
        }
    
       ws = {
           "LEFT_PAREN:RIGHT_PAREN",
           "RIGHT_PAREN:LEFT_PAREN",
           "LEFT_CURLY:RIGHT_CURLY",
           "RIGHT_CURLY:LEFT_CURLY",
           "LEFT_BRACE:RIGHT_BRACE",
           "RIGHT_BRACE:LEFT_BRACE"
       };
       for(var i =0; i< ws.length;i++ ) {
           var x = ws[i].split(":");
           this.matchingNames.set(x[0],x[1]);
       }
    }
    
    
};