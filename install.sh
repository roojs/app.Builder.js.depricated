#!/bin/sh
 
#// compile GIR's
mkdir -p ~/.Builder/girepository-1.1 || false
 
ls gir-1.1 | sed s/.gir// | awk \
    '{ print "g-ir-compiler  gir-1.1/" $1 ".gir --includedir=gir-1.1 -o  ~/.Builder/girepository-1.1/" $1 ".typelib" }' \
    | sh -x
