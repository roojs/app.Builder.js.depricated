#!/bin/sh
 

#// compile GIR's
mkdir -p ~/.Builder/girepository-1.2 || false
 
ls gir-1.2 | sed s/.gir// | awk \
    '{ print "g-ir-compiler  gir-1.2/" $1 ".gir --includedir=gir-1.2 -o  ~/.Builder/girepository-1.2/" $1 ".typelib" }' \
    | sh -x
