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



function bjstest(fn) {
    
    // does it have a .bjs file..
    var bjs = fn.replace(/\.js$/, '.bjs');
    if (!bjs.match(/\.bjs$/) {
        throw "not a bjs file"
    } 
    // let's assume roo..
      
     
    // now try and render it back to javascript.
    var rclass = imports.JsRender.Roo.Roo;
    
    var render = new rclass({
        path: fn
    });
    render.loadItems(function() {
        print(render.toSource());
    });
    
}
//print(JSON.stringify(rf.cfg, null,4));
 
 
