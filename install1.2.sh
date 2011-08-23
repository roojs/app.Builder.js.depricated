#!/bin/sh
<<<<<<< HEAD
 
#git clone git://github.com/roojs/gir-1.2-gtk-2.0.git gir-1.2
=======
#git clone git://github.com/roojs/gir-1.2-gtk-3.0.git gir-1.2
>>>>>>> 3b915ee311c6c2f49cc4f64e158b8f1c6fc7de4b

#// compile GIR's
mkdir -p ~/.Builder/girepository-1.2 || false
 
<<<<<<< HEAD
=======
 
>>>>>>> 3b915ee311c6c2f49cc4f64e158b8f1c6fc7de4b
ls gir-1.2 | sed s/.gir// | awk \
    '{ print "g-ir-compiler  gir-1.2/" $1 ".gir --includedir=gir-1.2 -o  ~/.Builder/girepository-1.2/" $1 ".typelib" }' \
    | sh -x
