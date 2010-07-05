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
        this.cloneModule('Pman.Core');
        this.cloneModule('Pman.Base');
        this.cloneModule('pear');
        this.cloneModule('roojs1');
        this.link({
            'Pman.Base/Pman.php'        : 'Pman.php',
            'Pman.Base/Pman/Roo.php'    : 'Pman/Roo.php',
            'Pman.Base/Pman/Login.php'  : 'Pman/Login.php',
            'Pman.Base/Pman/Images.php' : 'Pman/Images.php',
            'Pman.Base/Pman/I18N.php'   : 'Pman/I18N.php',
            'Pman.Base/Pman/GnumericToExcel.php' : 'Pman/GnumericToExcel.php',
            'Pman.Base/Pman/templates' : 'Pman/templates',
            'Pman.Core' : 'Pman/Core',
            
            
            
            
    },
    cloneModule : function(name)
    {
        if (File.isDirectory(this.dir + '/' + name)) {
            Spawn.run(this.dir + '/' + name, 'git pull');
            return;
        }
        Spawn.run(this.dir, 'git clone http://git.akbkhome.com/' + name);
    },
    
    
    
    
    
}
 

 


