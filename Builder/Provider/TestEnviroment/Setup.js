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
    user : '', // the runnning user..
   
    build : function()
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
        });
        var _this = this;
        [ 
            'lighttpd',
            'lighttpd/uploads', 'lighttpd/logs',  'lighttpd/run', 'lighttpd/cache'
        
        ].forEach(function(n) {
            if (!File.isDirectory(_this.dir + '/' + n)) {
                File.mkdir(_this.dir + '/' + n);
            }
        
        });
        
            
            
    },
    cloneModule : function(name)
    {
        if (File.isDirectory(this.dir + '/' + name)) {
            Spawn.run(this.dir + '/' + name, 'git pull');
            return;
        }
        Spawn.run(this.dir, 'git clone http://git.akbkhome.com/' + name);
    },
    
    createIndex : function()
    {
        File.write(this.dir + "/index.php",
            "<" + "?php \n" +
            "ini_set('include_path', \n" +
            "    dirname(__FILE__). ':' .  \n" +
            "    dirname(__FILE__).'/pear:' .  \n" +
            "    ini_get('include_path')); \n" 
            "define('DB_DATAOBJECT_NO_OVERLOAD', true); \n" +
            "require_once 'HTML/FlexyFramework.php'; \n" +
            
            "new HTML_FlexyFramework( array(\n" +
            "    'project'=> 'Pman',\n" +
            "    'debug' => 0,\n" +
            "    'version' => '1.2',\n" +
            "    'enable' => 'Core', \n" +
            
            "    'appNameShort' => \"PROJECT\",\n" +
            "    'appName' => \"PROJECT\",\n" +
            "    'database' => 'mysql://root:@localhost/pman',\n" +
            "    'Pman' => array(\n" +
            "        'isDev' => true,  \n" +
            "    ),\n" +
            "));"
        );
             
    }
    createHttpConf : function()
    {
        File.write(this.dir + 'lighttpd/lighttpd.conf',
            'server.modules = (' + "\n" +
            '    "mod_alias",' + "\n" +
            '    "mod_fastcgi",' + "\n" +
            '    "mod_compress",' + "\n" +
            ')' + "\n" +
           
            'fastcgi.server = ( ".php" => (( ' + "\n" +
            '                     "bin-path" => "/usr/bin/php5-cgi",' + "\n" +
            '                     "socket" => "' + this.dir + '/lighttpd/php5.socket" ' + "\n" +
            '                 )))' + "\n" +
            
            'server.document-root       = "' + this.dir + '"' + "\n" +
            'server.upload-dirs = ( "' + this.dir + '/lighttpd/uploads" )' + "\n" +
            'server.errorlog            = "' + this.dir + '/lighttpd/logs/error.log"' + "\n" +

            'index-file.names           = ( "index.php", "index.html",' + "\n" +
            '                               "index.htm", "default.htm",' + "\n" +
            '                               "index.lighttpd.html" )' + "\n" +
           
            'static-file.exclude-extensions = ( ".php", ".pl", ".fcgi" )' + "\n" +
            'server.port               = 8090' + "\n" +
            'server.bind                = "localhost"' + "\n" +
            'server.pid-file            = "' + this.dir + '/lighttpd/run/lighttpd.pid"' + "\n" +
         
            'dir-listing.encoding        = "utf-8"' + "\n" +
            'server.dir-listing          = "enable"' + "\n" +
            'server.username            = "' + this.user + '"' + "\n" +
            'server.groupname           = "' + this.user + '"' + "\n" +
           
            'compress.cache-dir          = "' + this.dir+ '/lighttpd/cache/"' + "\n" +
            'compress.filetype           = ("text/plain", "text/html", "application/x-javascript", "text/css")' + "\n" +
            'include_shell "/usr/share/lighttpd/create-mime.assign.pl"' + "\n" +
            'include_shell "/usr/share/lighttpd/include-conf-enabled.pl"' + "\n"
        );
          
         
         
         
}        
         

 


