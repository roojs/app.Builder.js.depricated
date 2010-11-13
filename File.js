// <script type ="text/Javascript">
GLib = imports.gi.GLib;
Gio = imports.gi.Gio;



/**
* @namespace File
* 
* Library to wrap GLib and Gio basic File related methods
* 
* usage:
* 
* File = import.File.File;
* 
* var contents = File.read("/tmp/test.txt");
*
* 
* 
*/
var File = {

    SEPARATOR : '/',

    // fixme - this needs a bitter location.. 
    // they where in a string class before, but  overriding String methods is not a good normally a good idea..
       
    rtrim : function (s,toTrim) {
        if (s.substr(s.length - toTrim.length) == toTrim) {
            return s.slice(0, s.length - toTrim.length);
        }
   
        return s;
    },
   trim : function (s,toTrim) {
        var out = s.ltrim(toTrim);
        out = out.rtrim(toTrim);
        return out;
    },
    
    ltrim : function (s, toTrim) {
        if (s.substr(0, toTrim.length) == toTrim) {
            return s.slice(toTrim.length);
        }
        
        return s;
    },
    
    join : function () {
        var out = "";
        for (var i = 0; i < arguments.length; i++) {
            if (i == 0) {
              out += this.rtrim(arguments[i], File.SEPARATOR);
            }
            else if (i == arguments.length - 1) {
              out += File.SEPARATOR + this.ltrim(arguments[i], File.SEPARATOR);
            }
            else {
              out += File.SEPARATOR + this.trim(arguments[i], File.SEPARATOR);
            }
        }
        return out;
    },

    read : function (path) {
        var out = {};
        GLib.file_get_contents(path, out, null, null);
        return out['value'];
    },

    isFile : function (path) {
      return GLib.file_test(path, GLib.FileTest.IS_REGULAR);
    },
    exists : function (path) {
      return GLib.file_test(path, GLib.FileTest.EXISTS);
    },
    isDirectory : function (path) {
      return GLib.file_test(path, GLib.FileTest.IS_DIR);
    },

    list : function (path) {
        var listing = [];

        var f = Gio.file_new_for_path(String(path));
        var file_enum = f.enumerate_children(Gio.FILE_ATTRIBUTE_STANDARD_DISPLAY_NAME, Gio.FileQueryInfoFlags.NONE, null);

        var next_file = null;

        while ((next_file = file_enum.next_file(null)) != null) {
          listing.push(next_file.get_display_name());
        }

        file_enum.close(null);

        listing.sort();

        return listing;
    },

    mtime : function (path) {
        var f = Gio.file_new_for_path(String(path));
        var mtime = new GLib.TimeVal();

        var info = f.query_info(Gio.FILE_ATTRIBUTE_TIME_MODIFIED, Gio.FileQueryInfoFlags.NONE, null);
        info.get_modification_time(mtime);

        return new Date(mtime.tv_sec * 1000);
    },

    /**
     * resolve the real path
     * @arg path {String} Path to resolve
     * @returns {String} the resolved path path.
     * 
     */
    realpath :  function (path) { 
        return this.canonical(path);
    },
    canonical : function (path) { 
        var f = Gio.file_new_for_path(String(path));
        var can = f.resolve_relative_path('');
        return can.get_path();
    },
    /**
     * write a string to a file
     * @arg path {String} File to write to alwasy overwrites.
     * @arg string {String} Contents of file.
     * 
     */
    write : function (path, string) {
        var d = new Date();
        var f = Gio.file_new_for_path(String(path));
        var data_out = new Gio.DataOutputStream({base_stream:f.replace(null, false, Gio.FileCreateFlags.NONE, null)});
        data_out.put_string(string, null);
        data_out.close(null);
        print("WRITE : " + path + " in " + ((new Date()) - d) + 'ms');
        
    },
    /**
     * append
     * @arg path {String} File to write to
     * @arg string {String} string to append to file.
     * 
     */
    append : function (path, string) {
        var f = Gio.file_new_for_path(String(path));
        var data_out = new Gio.DataOutputStream({
                base_stream:f.append_to(Gio.FileCreateFlags.NONE, null)
        });
        data_out.put_string(string, null);
        data_out.close(null);
    },
    /**
     * remove 
     * Delete a file.
     * @arg path {String} File to remove
     * 
     * 
     */
    remove : function (path)
    {
        var f = Gio.file_new_for_path(String(path));
        return f['delete']();
    },
    // copy files recursively from fromDir, silently ignore them if they already exist in toDir
    silentRecursiveCopy : function (fromDir, toDir) {
        var filesToCopy = File.recursiveListing(fromDir);
        var srcPath, destPath, src, dest;

        for (var index in filesToCopy) {
          srcPath = File.join(String(fromDir), filesToCopy[index]);
          destPath = File.join(String(toDir), filesToCopy[index]);

          if (File.isFile(srcPath) && !File.isFile(destPath)) {
            File.copyFile(srcPath, destPath);
          }
          else if (File.isDirectory(srcPath) && !File.isDirectory(destPath)) {
            File.mkdir(destPath);
          }

        }
    },
    /**
     * Make a symbolic link
     * @arg  new_link {String} The new link
     * @arg  target    {String} Where it links to.
     */
    link : function (new_link, target) {
        var dest = Gio.file_new_for_path(String(new_link));
        return dest.make_symbolic_link(target, null);
    },
    /**
     * Make a directory
     * FIXME - needs perms setting..
     * 
     * @arg  directory  {String} Directory to make
     */

    mkdir : function (destPath) {
        var dest = Gio.file_new_for_path(String(destPath));
        return dest.make_directory(null);
    },

    /**
     * Copy a file or (directory maybe?)
     * @arg  srcPath {String} source file
     * @arg  destPath {String} destination file
     * @arg  flags {Gio.FileCopyFlags} to overwrite etc...  Gio.FileCopyFlags.OVERWRITE
     */
    copy : function (srcPath, destPath, flags) {
        return this.copyFile(srcPath, destPath, flags);
    },
    copyFile : function (srcPath, destPath, flags) {
        
        flags = typeof(flags) == 'undefined' ? Gio.FileCopyFlags.NONE : flags;
        var dest = Gio.file_new_for_path(String(destPath));
        var src = Gio.file_new_for_path(String(srcPath));

        // a bit of a hack for the fact that Gio.File.copy arguments
        // can be nulled, but not according to the GIR file
        return src.copy(dest, flags);
    },
    
    
    

    recursiveListing : function (dir) {

        function recursiveListingInternal(prefix, listing, dir) {
          var entries = File.list(dir);
          var next, fullPath;

          for (var index in entries) {
            next = entries[index];
            fullPath = File.join(prefix, dir, next);

            if (File.isDirectory(fullPath)) {
              listing.push(next);
              listing = listing.concat(recursiveListingInternal(next, [], fullPath));
            }
            else {
              if (prefix) {
                next = File.join(prefix, next);
              }
              listing.push(next);
            }
          }

          return listing;
        }

        return recursiveListingInternal('', [], dir);
    }

};
