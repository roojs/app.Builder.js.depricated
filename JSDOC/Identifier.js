//<Script type="text/javascript">

/**
 * @class  Identifier
 * holds details about identifiers and their replacement values
 * used by the packer..
 * 
 */


function Identifier(name, scope) {
   // print("NEW IDENT: " + name);
    this.name = name;
    this.scope = scope;
    this.identifiers = {};
    
}
Identifier.prototype = {
    name: '',
    refcount: 1,
    mungedValue : '', // should be at least 1?!?!
    scope : false,  // script of fn scope..
    toMunge : true
};
 
