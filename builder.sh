#!/bin/sh
# use our overridden typelibs.
export GI_TYPELIB_PATH=~/.Builder/girepository-1.1

 
cd $(dirname $0)

# run theapplication.
seed ./gtkrun.js Sample
