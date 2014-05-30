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
        this.initCoreObjects();
        this.initShitespaceNames();
        
    }
    
    
    bool isBuiltin(string  name) {
        return (this.coreObjects.index(name) > -1);
    },
    
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
    }
    punc : function(string ch) {
        return this.puncNames[ch];
    }
    
    bool isNumber : function(string str) {
        return Regex.match_simple("^(\.[0-9]|[0-9]+\.|[0-9])[0-9]*([eE][+-][0-9]+)?$",str);
    },

    bool  isHexDec : function(str) {
        return Regex.match_simple("^0x[0-9A-F]+$",str);
    },

    bool isWordChar : function(str) {
        return Regex.match_simple("^[a-zA-Z0-9$_.]+$", str);
    },

    bool isSpace : function(str) {
        return this.whitespace.get(str) != null;
    },

    bool isNewline : function(str) {
        return this.newline.get(str) != null;
    }
    
    void init() {
        
        this.coreObjects = new Glib.List<string>();
        string[] co = { '_global_', 'Array', 'Boolean', 'Date', 'Error', 
            'Function', 'Math', 'Number', 'Object', 'RegExp', 'String' };
        for(var i =0; i< co.length;i++ ) {
            this.coreObjects.append(co[i]);
        }
        string[] ws =  {
            " ":      "SPACE",
            "\f":     "FORMFEED",
            "\t":     "TAB",
            "\u0009": "UNICODE_TAB",
            "\u000A": "UNICODE_NBR",
            "\u0008": "VERTICAL_TAB"
        },
        string[]  newlineNames = {
            "\n":     "NEWLINE",
            "\r":     "RETURN",
            "\u000A": "UNICODE_LF",
            "\u000D": "UNICODE_CR",
            "\u2029": "UNICODE_PS",
            "\u2028": "UNICODE_LS"
        },
        string[]  keywordNames = {
            "=break":      "BREAK",
            "=case":       "CASE",
            "=catch":      "CATCH",
            "=const":      "VAR",
            "=continue":   "CONTINUE",
            "=default":    "DEFAULT",
            "=delete":     "DELETE",
            "=do":         "DO",
            "=else":       "ELSE",
            "=false":      "FALSE",
            "=finally":    "FINALLY",
            "=for":        "FOR",
            "=function":   "FUNCTION",
            "=if":         "IF",
            "=in":         "IN",
            "=instanceof": "INSTANCEOF",
            "=new":        "NEW",
            "=null":       "NULL",
            "=return":     "RETURN",
            "=switch":     "SWITCH",
            "=this":       "THIS",
            "=throw":      "THROW",
            "=true":       "TRUE",
            "=try":        "TRY",
            "=typeof":     "TYPEOF",
            "=void":       "VOID",
            "=while":      "WHILE",
            "=with":       "WITH",
            "=var":        "VAR"
         },
    
  
        puncNames : {
            ";":   "SEMICOLON",
            ",":   "COMMA",
            "?":   "HOOK",
            ":":   "COLON",
            "||":  "OR", 
            "&&":  "AND",
            "|":   "BITWISE_OR",
            "^":   "BITWISE_XOR",
            "&":   "BITWISE_AND",
            "===": "STRICT_EQ", 
            "==":  "EQ",
            "=":   "ASSIGN",
            "!==": "STRICT_NE",
            "!=":  "NE",
            "<<":  "LSH",
            "<=":  "LE", 
            "<":   "LT",
            ">>>": "URSH",
            ">>":  "RSH",
            ">=":  "GE",
            ">":   "GT", 
            "++":  "INCREMENT",
            "--":  "DECREMENT",
            "+":   "PLUS",
            "-":   "MINUS",
            "*":   "MUL",
            "/":   "DIV", 
            "%":   "MOD",
            "!":   "NOT",
            "~":   "BITWISE_NOT",
            ".":   "DOT",
            "[":   "LEFT_BRACE",
            "]":   "RIGHT_BRACE",
            "{":   "LEFT_CURLY",
            "}":   "RIGHT_CURLY",
            "(":   "LEFT_PAREN",
            ")":   "RIGHT_PAREN"
        },

 
    matchingNames : {
        "LEFT_PAREN": "RIGHT_PAREN",
        "RIGHT_PAREN": "LEFT_PAREN",
        "LEFT_CURLY": "RIGHT_CURLY",
        "RIGHT_CURLY": "LEFT_CURLY",
        "LEFT_BRACE": "RIGHT_BRACE",
        "RIGHT_BRACE": "LEFT_BRACE"
    },

 
    
};