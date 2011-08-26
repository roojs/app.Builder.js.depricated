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

var GLib = imports.gi.GLib;



var args = Array.prototype.slice.call(Seed.argv);

args.shift();
args.shift();
//print(JSON.stringify(args, null,4));
//Seed.quit();


if (File.isFile(args[0])) {
    bjstest(args[0]);    
} else { 
  trhow "argument is not file";
}


print( " diff -w -u /tmp/rconv_orig /tmp/rconv_gen/");



function createTest(fn) {
    
    // does it have a .bjs file..
    var bjs = fn.replace(/\.js$/, '.bjs');
    if (!File.exists(bjs)) {
        return true;
        
    } 
    
    
    print("converting : " + fn);
    // outputs to two directories..
    if (!File.exists('/tmp/rconv_orig')) {
        File.mkdir('/tmp/rconv_orig');
    }
      if (!File.exists('/tmp/rconv_genbjs')) {
        File.mkdir('/tmp/rconv_genbjs');
    }
    if (!File.exists('/tmp/rconv_gen')) {
        File.mkdir('/tmp/rconv_gen');
    }
    
    
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
    File.write('/tmp/rconv_orig/' + GLib.basename(fn) , str);
    var toks = tr.tokenize(new TextStream(str));  
    
    
    var rf = new JsParser(toks);
    //print(JSON.stringify(rf.tokens, null,4));Seed.quit();
    rf.parse();
    
    
    if (File.exists('/tmp/rconv_genbjs/' + GLib.basename(fn).replace(/\.js$/,'.bjs') )) {
        File.remove('/tmp/rconv_genbjs/' + GLib.basename(fn).replace(/\.js$/,'.bjs') );
    }
    File.write('/tmp/rconv_genbjs/' + GLib.basename(fn).replace(/\.js$/,'.bjs'),
               JSON.stringify(rf.cfg,null,4));

    
     
    // now try and render it back to javascript.
    var rclass = imports.JsRender[rf.cfg.type][rf.cfg.type];
    rf.cfg.path = fn;
    var render = new rclass(rf.cfg);
    var res = render.toSource()
    //print();
    if (File.exists('/tmp/rconv_gen/' + GLib.basename(fn) )) {
        File.remove('/tmp/rconv_gen/' + GLib.basename(fn) );
    }
    
    File.write('/tmp/rconv_gen/' + GLib.basename(fn) , res);
}
//print(JSON.stringify(rf.cfg, null,4));
 
 
