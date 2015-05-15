
/// # valac  --pkg gio-2.0 --pkg gtk+-3.0  --pkg posix Spawn.vala -o /tmp/Spawn

using GLib;
using Gtk;
// compile valac 



///using Gee; // for array list?
/*
static int main (string[] args) {
    // A reference to our file
    
    var cfg = new SpawnConfig("", { "ls" } , { "" });
    cfg.setHandlers(
            (line) => {
	            stdout.printf("%s\n", line);
            },
            null,null,null );
    cfg.setOptions(
        false, // async
        false, // exceptions?? needed??
        false  // debug???
    );
    try {
        new Spawn(cfg);
       
    } catch (Error e) {
        stdout.printf("Error %s", e.message);
    }
    
    return 0;

}
*/
//var Gio      = imports.gi.Gio;
//var GLib      = imports.gi.GLib;


/**
* @namespace Spawn
* 
* Library to wrap GLib.spawn_async_with_pipes
* 
* usage:
* v 
*
*var output = new Spawn( SpawnConfig() {
    cwd = "/home",  // empty string to default to homedirectory.
    args = {"ls", "-l" },
    evn = {},
    ouput  = (line) => { stdout.printf("%d\n", line); }
    stderr  = (line) => { stdout.printf("%d\n", line); }
    input  = () => { return "xxx"; }
};
*
*
*/
public delegate void SpawnOutput(string line);
public delegate void SpawnErr(string line);
public delegate string SpawnInput();
public delegate void SpawnFinish(int result);
 

public class  SpawnConfig {
    public string cwd;
    public string[] args;
    public string[]  env;
    public bool async;
    public bool exceptions; // fire exceptions.
    public bool debug; // fire exceptions.
    
    public SpawnOutput output;
    public SpawnErr stderr;
    public SpawnInput input;
    public SpawnFinish finish;
    // defaults..
    public SpawnConfig(string cwd,
            string[] args,
            string[] env
        ) {
        this.cwd = cwd;
        this.args = args;
        this.env = env;
         
        async = false;
        exceptions = true;
        debug = false;
        
        output = null;
        stderr = null;
        input = null;
        
    }

 
    public void setHandlers(
            SpawnOutput? output,
            SpawnErr? stderr,
            SpawnInput? input,
            SpawnFinish? finish
         ) {
        this.output = output;
        this.stderr = stderr;
        this.input = input;
        this.finish = finish;
    }
    
    
}

public errordomain SpawnError {
    NO_ARGS,
    WRITE_ERROR,
    EXECUTE_ERROR

}

/**
 * @class Spawn
 * @param cfg {SpawnConfig} settings - see properties.
 * 
 * @arg cwd {String}            working directory. (defaults to home directory)
 * @arg args {Array}            arguments eg. [ 'ls', '-l' ]
 * @arg listeners {Object} (optional) handlers for output, stderr, input
 *     stderr/output both receive output line as argument
 *     input should return any standard input
 *     finish recieves result as argument.
 * @arg env {Array}             enviroment eg. [ 'GITDIR=/home/test' ]
 * @arg async {Boolean} (optional)return instantly, or wait for exit. (default no)
 * @arg exceptions {Boolean}    throw exception on failure (default no)
 * @arg debug {Boolean}    print out what's going on.. (default no)
 * 
 */


public class Spawn : Object
{

    SpawnConfig cfg;

    public Spawn(SpawnConfig cfg) throws Error
    {
       
     
        this.cfg = cfg;
        this.output = "";
        this.stderr = "";
    
        this.cfg.cwd =  this.cfg.cwd.length  < 1 ? GLib.Environment.get_home_dir() : this.cfg.cwd;
        if (this.cfg.args.length < 0) {
            throw new SpawnError.NO_ARGS("No arguments");
        }
        this.run();
    
    }

    
    MainLoop ctx = null; // the mainloop ctx.
    
    /**
     * @property output {String} resulting output
     */
    public string output;
    /**
     * @property stderr {String} resulting output from stderr
     */
    public string stderr;
     /**
     * @property result {Number} execution result.
     */
    int result= 0;
    /**
     * @property pid {Number} pid of child process (of false if it's not running)
     */
    int  pid = -1;
    /**
     * @property in_ch {GLib.IOChannel} input io channel
     */
    IOChannel in_ch = null;
    /**
     * @property out_ch {GLib.IOChannel} output io channel
     */
    IOChannel out_ch = null;
    /**
     * @property err_ch {GLib.IOChannel} stderr io channel
     */
    IOChannel err_ch = null;
    /**
     * @property err_src {int} the watch for errors
     */
    
    int err_src = -1;
      /**
     * @property err_src {int} the watch for output
     */
    int out_src = -1;
    
    /**
     * 
     * @method run
     * Run the configured command.
     * result is applied to object properties (eg. '?' or 'stderr')
     * @returns {Object} self.
     */
    public void run() throws SpawnError, GLib.SpawnError, GLib.IOChannelError
    {
        
         
        err_src = -1;
        out_src = -1;
        int standard_input;
        int standard_output;
        int standard_error;


        
        if (this.cfg.debug) {
           stdout.printf("cd %s; %s" , this.cfg.cwd , string.joinv(" ", this.cfg.args));
        }
        
        Process.spawn_async_with_pipes (
                this.cfg.cwd,
                this.cfg.args,
                this.cfg.env,
                SpawnFlags.SEARCH_PATH | SpawnFlags.DO_NOT_REAP_CHILD,
                null,
                out this.pid,
                out standard_input,
                out standard_output,
			    out standard_error);

		// stdout:
	
         	
    	//print(JSON.stringify(gret));    
         
        if (this.cfg.debug) {
            
            stdout.printf("PID: %d" ,this.pid);
        }
        
        this.in_ch = new GLib.IOChannel.unix_new(standard_input);
        this.out_ch = new GLib.IOChannel.unix_new(standard_output);
        this.err_ch = new GLib.IOChannel.unix_new(standard_error);
        
        // make everything non-blocking!
        
        
            
                  // using NONBLOCKING only works if io_add_watch
          //returns true/false in right conditions
          this.in_ch.set_flags (GLib.IOFlags.NONBLOCK);
          this.out_ch.set_flags (GLib.IOFlags.NONBLOCK);
          this.err_ch.set_flags (GLib.IOFlags.NONBLOCK);
                   
      

 
        ChildWatch.add (this.pid, (w_pid, result) => {
	    
            this.result = result;
            if (this.cfg.debug) {
                stdout.printf("child_watch_add : result:%d ", result);
            }
           
            this.read(this.out_ch);
            this.read(this.err_ch);
            
            
            Process.close_pid(this.pid);
            this.pid = -1;
            if (this.ctx != null) {
                this.ctx.quit();
                this.ctx = null;
            }
            this.tidyup();
        //print("DONE TIDYUP");
            if (this.cfg.finish != null) {
                this.cfg.finish(this.result);
            }
        });
	    
			  
        
        
       
            
            // add handlers for output and stderr.
        
        this.out_src = (int) this.out_ch.add_watch (
            IOCondition.OUT | IOCondition.IN  | IOCondition.PRI |  IOCondition.HUP |  IOCondition.ERR  ,
            (channel, condition) => {
               return this.read(this.out_ch);
            }
        );
        this.err_src = (int) this.err_ch.add_watch (
	         IOCondition.OUT | IOCondition.IN  | IOCondition.PRI |  IOCondition.HUP |  IOCondition.ERR  ,
            (channel, condition) => {
               return this.read(this.err_ch);
            }
        );
              
        
        // call input.. 
        if (this.pid > -1) {
            // child can exit before we get this far..
            if (this.cfg.input != null) {
		        if (this.cfg.debug) print("Trying to call listeners");
                try {
                    this.write(this.cfg.input());
                     // this probably needs to be a bit smarter...
                    //but... let's close input now..
                    this.in_ch.shutdown(true);
                    this.in_ch = null;
                     
                    
                } catch (Error e) {
                    this.tidyup();
                    return;
                  //  throw e;
                    
                }
                
            }
            
        }
                // async - if running - return..
        if (this.cfg.async && this.pid > -1) {
            return;
        }
         
        // start mainloop if not async..
        
        if (this.pid > -1) {
             print("starting main loop");
             //if (this.cfg.debug) {
             //  
             // }
	        this.ctx = new MainLoop ();
            this.ctx.run(); // wait fore exit?
            
            print("main_loop done!");
        } else {
            this.tidyup(); // tidyup get's called in main loop. 
        }
        
        if (this.cfg.exceptions && this.result != 0) {
	    
            throw new SpawnError.EXECUTE_ERROR(this.stderr);
            //this.toString = function() { return this.stderr; };
            ///throw new Exception this; // we throw self...
        }
        
        // finally throw, or return self..
        
        return;
    
    }
    
    

    private void tidyup()
    {
        if (this.pid > -1) {
            Process.close_pid(this.pid); // hopefully kills it..
            this.pid = -1;
        }
        try {
            if (this.in_ch != null)  this.in_ch.shutdown(true);
            if (this.out_ch != null)  this.out_ch.shutdown(true);
            if (this.err_ch != null)  this.err_ch.shutdown(true);
        } catch (Error e) {
            // error shutting donw.
        }
        // blank out channels
        this.in_ch = null;
        this.err_ch = null;
        this.out_ch = null;
        // rmeove listeners !! important otherwise we kill the CPU
        //if (this.err_src > -1 ) GLib.source_remove(this.err_src);
        //if (this.out_src > -1 ) GLib.source_remove(this.out_src);
        this.err_src = -1;
        this.out_src = -1;
        
    }
    
    
    /**
     * write to stdin of process
     * @arg str {String} string to write to stdin of process
     * @returns GLib.IOStatus (0 == error, 1= NORMAL)
     */
    private int write(string str) throws Error // write a line to 
    {
        if (this.in_ch == null) {
            return 0; // input is closed
        }
        //print("write: " + str);
        // NEEDS GIR FIX! for return value.. let's ignore for the time being..
        //var ret = {};
        size_t written;
        var res = this.in_ch.write_chars(str.to_utf8(), out written);
        
        //print("write_char retunred:" + JSON.stringify(res) +  ' ' +JSON.stringify(ret)  );
        
        if (res != GLib.IOStatus.NORMAL) {
            throw new SpawnError.WRITE_ERROR("Write failed");
        }
        //return ret.value;
        return str.length;
        
    }


    
    /**
     * read from pipe and call appropriate listerner and add to output or stderr string.
     * @arg giochannel to read from.
     * @returns none
     */
    private bool read(IOChannel ch) 
    {
        string prop = (ch == this.out_ch) ? "output" : "stderr";
       // print("prop: " + prop);

        
        //print(JSON.stringify(ch, null,4));
        while (true) {
            string buffer;
            size_t term_pos;
            size_t len;
            IOStatus status;
            try {
                status = ch.read_line( out buffer,  out len,  out term_pos );
            } catch (Error e) {
                //FIXme
                break; // ??
                
            }

            // print('status: '  +JSON.stringify(status));
            // print(JSON.stringify(x));
             switch(status) {
                case GLib.IOStatus.NORMAL:
		
                    //write(fn, x.str);
                    
                    //if (this.listeners[prop]) {
                    //    this.listeners[prop].call(this, x.str_return);
                    //}
                    if (ch == this.out_ch) {
                        this.output += buffer;
                        if (this.cfg.output != null) {
                                this.cfg.output(  buffer);                  
                        }
                    } else {
                        this.stderr += buffer;
                    }
                    //_this[prop] += x.str_return;
                    //if (this.cfg.debug) {
                        stdout.printf("%s : %s", prop , buffer);
                    //}
                    if (this.cfg.async) {
                         
                        if ( Gtk.events_pending()) {
                             Gtk.main_iteration();
                        }
                         
                    }
                    
                    //this.ctx.iteration(true);
                   continue;
                case GLib.IOStatus.AGAIN:
		    //print("Should be called again.. waiting for more data..");
		            return true;
                    //break;
                case GLib.IOStatus.ERROR:    
                case GLib.IOStatus.EOF:
		            return false;
                    //break;
                
            }
            break;
        }
       
        //print("RETURNING");
         return false; // allow it to be called again..
    }
    
}
  /*
// test
try { 
    Seed.print(run({
        args: ['ls', '/tmp'],
        debug : true
    }));
} catch (e) { print(JSON.stringify(e)); }
 
var secs = (new Date()).getSeconds() 

try {      
Seed.print(run({
    args: ['/bin/touch', '/tmp/spawntest-' + secs ],
    debug : true
}));
} catch (e) { print( 'Error: ' + JSON.stringify(e)); }

 
 */
 
