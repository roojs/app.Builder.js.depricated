//<script type="text/javascript">


/**
 * Set up a test enviroment using lighttpd server..
 * 
 * 
 * Needs:
 * 
 * A) index.php
 * B) Pman.Core
 * C) Pman.Base
 * D) files linked together..
 * E) lightttpd.conf file..
 */

Setup = {
    
    dir:  '', // home appbulider...
    
    cloneModules : function()
    {
        if (File.isDirectory(this.dir + '/Pman.Base')) {
            Spawn.run(this.dir + '/Pman.Base', 'git pull');
        }
        Spawn.run(this.dir, 'git clone http://git.akbkhome.com/Pman.Base');
    }
    
    
}
 

 


