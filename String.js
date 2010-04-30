/*
 * Based on:
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 *
 * Originally Released Under LGPL - original licence link has changed is not relivant.
 *
 * Fork - LGPL
 * <script type="text/javascript">
 */
// usage:
//imports['String.js'].load(String);
if (imports) {
    load = false; // declare global for gnome langs.
}
(function () {
    

    var string =  {
    
        /** @scope String */
        
        /**
         * Escapes the passed string for ' and \
         * @param {String} string The string to escape
         * @return {String} The escaped string
         * @static
         */
        escape : function(string) {
            return string.replace(/('|\\)/g, "\\$1");
        },

        /**
         * Pads the left side of a string with a specified character.  This is especially useful
         * for normalizing number and date strings.  Example usage:
         * <pre><code>
    var s = String.leftPad('123', 5, '0');
    // s now contains the string: '00123'
    </code></pre>
         * @param {String} string The original string
         * @param {Number} size The total length of the output string
         * @param {String} char (optional) The character with which to pad the original string (defaults to empty string " ")
         * @return {String} The padded string
         * @static
         */
        leftPad : function (val, size, ch) {
            var result = new String(val);
            if(ch === null || ch === undefined || ch === '') {
                ch = " ";
            }
            while (result.length < size) {
                result = ch + result;
            }
            return result;
        },
         /**
         * Allows you to define a tokenized string and pass an arbitrary number of arguments to replace the tokens.  Each
         * token must be unique, and must increment in the format {0}, {1}, etc.  Example usage:
         * <pre><code>
    var cls = 'my-class', text = 'Some text';
    var s = String.format('<div class="{0}">{1}</div>', cls, text);
    // s now contains the string: '<div class="my-class">Some text</div>'
    </code></pre>
         * @p aram {String} string The tokenized string to be formatted
         * @param {String} value1 The value to replace token {0}
         * @param {String} value2 Etc...
         * @return {String} The formatted string
         * @static
         */
        format : function(format){
            var args = Array.prototype.slice.call(arguments, 1);
            return format.replace(/\{(\d+)\}/g, function(m, i){
                return args[i];
            });
        },
        

        /**
         * Allows you to define a tokenized string and pass an arbitrary number of arguments to replace the tokens.  Each
         * token must be unique, and must increment in the format {0}, {1}, etc.  Example usage:
         * <pre><code>
    var cls = 'my-class', text = 'Some text';
    var s = String.format('<div class="{0}">{1}</div>', cls, text);
    // s now contains the string: '<div class="my-class">Some text</div>'
    </code></pre>
         * @param {String} string The tokenized string to be formatted
         * @param {String} value1 The value to replace token {0}
         * @param {String} value2 Etc...
         * @return {String} The formatted string, all arguments will be htmlEncoded.
         * @static
         */
        htmlFormat : function(format){
            var args = Array.prototype.slice.call(arguments, 1);
            return format.replace(/\{(\d+)\}/g, function(m, i){
                return this.htmlEncode(args[i]);
            });
        },
        
        /**
         * Convert certain characters (&, <, >, and ') to their HTML character equivalents for literal display in web pages.
         * @param {String} value The string to encode
         * @return {String} The encoded text
         */
        htmlEncode : function(value){
            return !value ? value : 
                String(value).replace(/&/g, "&amp;"
                    ).replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
        }
        
        
    };

    /**
     * Utility function that allows you to easily switch a string between two alternating values.  The passed value
     * is compared to the current string, and if they are equal, the other value that was passed in is returned.  If
     * they are already different, the first value passed in is returned.  Note that this method returns the new value
     * but does not change the current string.
     * <pre><code>
    // alternate sort directions
    sort = sort.toggle('ASC', 'DESC');

    // instead of conditional logic:
    sort = (sort == 'ASC' ? 'DESC' : 'ASC');
    </code></pre>
     * @param {String} value The value to compare to the current string
     * @param {String} other The new value to use if the string already equals the first value passed in
     * @return {String} The new value
     */
     
    var stringPrototype = {
        toggle : function(value, other){
            return this == value ? other : value;
        },
        
        trim : function (toTrim) {
            var out = this.ltrim(toTrim);
            out = out.rtrim(toTrim);
            return out;
        },
        
        ltrim : function (toTrim) {
            if (this.substr(0, toTrim.length) == toTrim) {
                return this.slice(toTrim.length);
            }
            
            return this;
        },
        
        rtrim : function (toTrim) {
            if (this.substr(this.length - toTrim.length) == toTrim) {
                return this.slice(0, this.length - toTrim.length);
            }
       
            return this;
        }
 
    };
    
    
    
    if (imports) {
        load = function(ar) {
            String = ar;
            imports.lang.copyPropertiesNoOverwrite(string,ar);
            imports.lang.copyPropertiesNoOverwrite(stringPrototype,ar.prototype);
        };
    } else {
        // non imports version.
        for(i in stringPrototype) {
            if (!String.prototype[i]) {
                String.prototype[i] = stringPrototype[i];
            }
        }
        for(i in string) {
            if (!String[i]) {
                String[i] = string[i];
            }
        }
    }
})();