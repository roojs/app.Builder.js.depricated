
dnl Process this file with autoconf to produce a configure script.
AC_PREREQ([2.68])

AC_INIT([builder4], [0.1.0])

AC_CONFIG_HEADERS([config.h])

AM_INIT_AUTOMAKE([1.11])
AM_MAINTAINER_MODE([enable])

AM_SILENT_RULES([yes])

AC_PROG_CC

AM_PROG_VALAC([0.26.0])

PKG_CHECK_MODULES(BUILDER4, [
	glib-2.0 >= 2.24.1
             gobject-2.0 >= 2.24.1
		 gtk+-3.0 
		 gtksourceview-3.0 
		 libxml-2.0 
		 json-glib-1.0 
		 gee-1.0 
		 gobject-introspection-1.0 
		 webkit2gtk-3.0 
		 clutter-gtk-1.0 
		 gladeui-2.0 
		 libsoup-2.4 
 		 javascriptcoregtk-3.0  
		 vte >= 0.28
		 libvala => 0.24
		 posix
])

AM_INIT_AUTOMAKE([subdir-objects])

AC_CONFIG_FILES([
    Makefile
    src/Makefile
])

  
 


AC_OUTPUT