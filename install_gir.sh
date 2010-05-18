#!/bin/sh

cd /tmp
wget http://devel.akbkhome.com/seed/Gtk-2.0.gir
cp Gtk-2.0.gir /usr/share/gir-1.0/
g-ir-compiler /usr/share/gir-1.0/Gtk-2.0.gir -o /usr/lib/girepository-1.0/Gtk-2.0.typelib 
