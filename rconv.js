/**
 *
 * This is a test file to convert appbuilder style application code
 *  into javascript structures.
 *
 *
 * Needs to test a while directory convert to-><-from and compare..
 *
 * 
 *
 * 
 *
 */

var JsParser = imports.JsParser.JsParser;
var TokenReader = imports.JSDOC.TokenReader.TokenReader;
var TextStream = imports.JSDOC.TextStream.TextStream;

var File = imports.File.File;





var args = Array.prototype.slice.call(Seed.argv);

args.shift();
args.shift();
//print(JSON.stringify(args, null,4));
//Seed.quit();



var tr = new  TokenReader(  { 
    keepDocs :true, 
    keepWhite : true,  
    keepComments : true, 
    sepIdents : false,
    collapseWhite : true,
    filename : args[0],
    ignoreBadGrammer: true
});

var str = File.read(args[0])

var toks = tr.tokenize(new TextStream(str));  


var rf = new JsParser(toks);
//print(JSON.stringify(rf.tokens, null,4));Seed.quit();


rf.parse();

print("------------ in ------------------");
print(str);
print("------------ out ------------------");

// now try and render it back to javascript.
var rclass = imports.JsRender[rf.cfg.type][rf.cfg.type];
var render = new 

print(JSON.stringify(rf.cfg, null,4));
 
 
