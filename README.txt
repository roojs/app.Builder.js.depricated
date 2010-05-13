App Builder

This is a Seed based application builder.. - currently basically a prototype..


The idea is that it can build applications both web based (using roojs) and Desktop based using Gtk
and the gobject introspection bindings.

It's kind of like Glade on steroids..

----------------------------------------------------
Usage:

seed builder_run.js

-> create a project
-> add a folder to the project
-> add a file to the project..
Files are JSON data files at present.. 

-----------------------------------------------------
Where it is..

* basic builder app runs - you can build a tree of elements making up a interface for roo and gtk.
* listeners are  created correctly.

-----------------------------------------------------
TODO

* listeners (for gtk need prototypes);
* calculate mouseover for rendered view of Gtk preview.
* create output to JS ...
* templates for elements... - eg. defaults for classic elements.
* sort out add heirachy for Gtk..
* make heirachy editor...
* use application to write itself...
* Help view - load docs..

-----------------------------------------------------
Concepts

Basically both Roo and JS are built using a tree of elements (tagged with xtype/xns)
sub elements always go in the items array..
we have some special properties of elements, eg.

*prop (a property of the parent)
xtype (element type) eg. Window / Button etc..
|xns  (namespace) = eg. Gtk/Roo etc.

|**** anything starting with a pipe is raw data field rather than quoted..


each element can have a property listeners which is where the listeners go...


