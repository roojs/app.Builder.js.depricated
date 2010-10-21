#!/bin/sh
 
#// compile GIR's
mkdir ~/.Builder/girepository-1.1/ || false
 
ls gir-1.1 | sed s/.gir// | awk \
    '{ print "g-ir-compiler  gir-1.1/" $1 ".gir -o  ~/.Builder/gir-1.1/girepositor-1.0" $1 ".typelib" }' \
    | sh -x
