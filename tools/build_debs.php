<?php

/**
 * what jhdebuild does..
 * 
 * apt-get update
 * ?? tarball from debian?
 * sudo apt-get --yes build-dep libxml2
 * apt-get source libxml2
 * -- need to determine what version 
 * -- 
 * 
 * cp -R /home/alan/checkout/gnome2/deb-src/libxml2-2.7.6.dfsg/debian libxml2-2.7.7/
 * debchange --preserve -v 2.7.7.2010-08-28-0 --distribution UNRELEASED jhdebuild snapshot
 * dpkg-buildpackage -rfakeroot -us -uc -D
 *
 * 
 * 
 * 
 * dpkg -s libxml2
 * lookfor  libxml ...whitespace.... version .... whitespace..
 * 
 * apt-get source libxml2=version
 * VERSION==> 2.7.6.dfsg-1ubuntu1
 * DIRECTORY => libxml2-2.7.6.dfsg (split on '-')
 * 
 * 
 * 
 * 
 */
 
$HOME = $_SERVER["HOME"];
if (!file_exists($HOME.'/.debgnome')) {
    mkdir( $HOME.'/.debgnome' );
}
if (!file_exists($HOME.'/.debgnome-work')) {
    mkdir( $HOME.'/.debgnome-work' );
}
$cdir =  $HOME.'/.debgnome';
$cfg = (array) json_decode(file_get_contents("$cdir/build.cfg.js"));
$state = (array) json_decode(file_get_contents("$cdir/state.cfg.js"));
// fix json objects..
foreach($state as $pkg => $data) {
    $state[$pkg] = (array) $data;
}

function dpkg_s($data) {
    global $state;
    $dpkg = empty($data['deb.name']) ? $data['pkg'] : $data['deb.name'];
    $pkg = $data['pkg'];
    $out = trim(`dpkg -l $dpkg`);
    $last = preg_split('/\s+/',array_pop(explode("\n", $out)));
    $state[$pkg]['deb.avail'] = $last[2];
    $state[$pkg]['deb.ver'] = array_shift(explode('-',$last[2]));
}

function apt_get_source($data)
{
    global $state, $HOME;
      $dpkg = empty($data['deb.name']) ? $data['pkg'] : $data['deb.name'];
    $pkg = $data['pkg'];
    if ($state[$pkg]['deb.cached'] ==  $state[$pkg]['deb.ver']) {
        return;
    }
  
    chdir('/tmp');
    
    $cmd = 'apt-get source ' . $dpkg . '=' . $state[$pkg]['deb.avail'];
    echo $cmd."\n";
    echo `$cmd`;
    $cmd = 'cp -a /tmp/'. $dpkg . '-'. $state[$pkg]['deb.ver'].'/debian  '. $HOME.'/.debgnome/'.$pkg;
    echo $cmd ."\n";
    echo `$cmd`;
    $state[$pkg]['deb.cached'] =  $state[$pkg]['deb.ver'];

}

$cfg = array(
    'libxml2' =>  array('repo' => 'git://git.gnome.org/libxml2')
);
          
foreach($cfg as $pkg => $data)
{
    // checkout or pull...
    $data = (array) $data;
    $data['pkg'] = $pkg;
    
    $src = $HOME .'/.debgnome-work/'. $pkg;
    if (file_exists($src)) {
        chdir($src);
        echo `git pull --rebase`;
        
    } else {
        $repo = $data['repo'];
        echo `git clone $repo $src`;
        
    }
    
    dpkg_s($data);
    apt_get_source($data);
    
    $cmd = 'rm -rf ' . $src . '/debian';
    `$cmd`;
    $cmd = 'cp -a '.$HOME.'/.debgnome/'.$pkg . ' ' . $src . '/debian';
    
    
    echo `$cmd`;
    chdir($src);
    echo `./autogen.sh --prefix=/usr`;
    echo `touch COPYING`;
    
    $cmd = 'debchange --preserve -v ' . $state[$pkg]['deb.ver']. '-' . 
            date('YmdH') .' --distribution UNRELEASED jhdebuild snapshot';
    echo `$cmd`;
    echo `dpkg-buildpackage -rfakeroot -us -uc -D`;
    
    
    
    file_put_contents("$cdir/state.cfg.js",json_encode($state));
    
}


print_R($state);


