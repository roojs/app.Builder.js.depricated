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

createTest(arg[0]);


function createTest(fn) { 
    
    // outputs to two directories..
    File.mkdir('/tmp/rconv_orig');
    File.mkdir('/tmp/rconv_gen');
    
    
    var tr = new  TokenReader(  { 
        keepDocs :true, 
        keepWhite : true,  
        keepComments : true, 
        sepIdents : false,
        collapseWhite : false,
        filename : args[0],
        ignoreBadGrammer: true
    });
    
    var str = File.read(fn)
    File.write('/tmp/rconv_org/' + File.basename(fn) , str);
    var toks = tr.tokenize(new TextStream(str));  
    
    
    var rf = new JsParser(toks);
    //print(JSON.stringify(rf.tokens, null,4));Seed.quit();
    
    
    rf.parse();
     
    // now try and render it back to javascript.
    var rclass = imports.JsRender[rf.cfg.type][rf.cfg.type];
    rf.cfg.path = args[0];
    var render = new rclass(rf.cfg);
    var res = render.toSource()
    //print();
    
    File.write('/tmp/rconv_gen/' + File.basename(fn) , res);
}
//print(JSON.stringify(rf.cfg, null,4));
 
 
