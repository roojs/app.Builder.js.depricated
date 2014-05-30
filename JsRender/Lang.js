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
    },
    string  newline (string ch) {
        return this.newlineNames.get(ch);
    },
    string keyword(string word) {
        return this.keywordNames.get("="+word);
    },
    bool isKeyword(word) {
        return typeof(this.keywordNames["="+word]) == 'undefined' ? false : true;
    },
    punc : function(ch) {
        return this.puncNames[ch];
    },
    
    
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

    matching : function(name) {
        return this.matchingNames[name];
    },
    matchingNames : {
        "LEFT_PAREN": "RIGHT_PAREN",
        "RIGHT_PAREN": "LEFT_PAREN",
        "LEFT_CURLY": "RIGHT_CURLY",
        "RIGHT_CURLY": "LEFT_CURLY",
        "LEFT_BRACE": "RIGHT_BRACE",
        "RIGHT_BRACE": "LEFT_BRACE"
    },

    isNumber : function(str) {
        return /^(\.[0-9]|[0-9]+\.|[0-9])[0-9]*([eE][+-][0-9]+)?$/i.test(str);
    },

    isHexDec : function(str) {
        return /^0x[0-9A-F]+$/i.test(str);
    },

    isWordChar : function(str) {
        return /^[a-zA-Z0-9$_.]+$/.test(str);
    },

    isSpace : function(str) {
        return (typeof this.whitespace(str) != "undefined");
    },

    isNewline : function(str) {
        return (typeof this.newline(str) != "undefined");
    }
    
};