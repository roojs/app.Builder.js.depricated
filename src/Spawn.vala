
/// # valac  --pkg gio-2.0 --pkg gtk+-3.0  --pkg posix Spawn.vala -o /tmp/Spawn

using GLib;
using Gtk;

/**
 * Revised version?
 * 
 * x = new Spawn( working dir, args)
 * x.env = ..... (if you need to set one...
 * x.output_line.connect((string str) => { ... });
 * x.input_line.connect(() => { return string });
 * x.finish.connect((int res, string output, string stderr) => { ... });
 * x.run();
 * 
 * 
 */




  
 
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
	public signal string? input();
    public signal void output_line(string str);
    public signal void finish(int res, string str, string stderr);

	public string cwd;
	public string[] args;
	public string[] env;
	public bool debug = false;
	public bool is_async = true;
	public bool throw_exceptions = false;

    public Spawn(string cwd, string[] args) throws Error
    {
       
     
        this.cwd = cwd;
        this.args = args;
        this.env = {};
        
        this.output = "";
        this.stderr = "";
    
        this.cwd =  this.cwd.length  < 1 ? GLib.Environment.get_home_dir() : this.cwd;
        if (this.args.length < 0) {
            throw new SpawnError.NO_ARGS("No arguments");
        }
        
    
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


		 
		GLib.debug("cd %s; %s" , this.cwd , string.joinv(" ", this.args));
		
		
		Process.spawn_async_with_pipes (
				this.cwd,
				this.args,
				this.env,
				SpawnFlags.SEARCH_PATH | SpawnFlags.DO_NOT_REAP_CHILD,
				null,
				out this.pid,
				out standard_input,
				out standard_output,
				out standard_error);

		// stdout:

			
		//print(JSON.stringify(gret));    
		 
		GLib.debug("PID: %d" ,this.pid);
		 
		
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
			GLib.debug("child_watch_add : result:%d ", result);
			
		   
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
			
			this.finish(this.result, this.output, this.stderr);
			
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
            var input = this.input();
            if (input != null) {
		        
                try {
                    this.write(input);
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
        if (this.is_async && this.pid > -1) {
            return;
        }
         
        // start mainloop if not async..
        
        if (this.pid > -1) {
            GLib.debug("starting main loop");
             //if (this.cfg.debug) {
             //  
             // }
	        this.ctx = new MainLoop ();
            this.ctx.run(); // wait fore exit?
            
            GLib.debug("main_loop done!");
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
 
