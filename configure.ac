
dnl Process this file with autoconf to produce a configure script.
AC_PREREQ([2.68])

AC_INIT([builder], [4.0.0])

AC_CONFIG_HEADERS([config.h])

AM_INIT_AUTOMAKE([1.11 subdir-objects])
AM_MAINTAINER_MODE([enable])

AM_SILENT_RULES([yes])

AC_PROG_CC

AM_PROG_VALAC([0.26.0])


BUILDER_PACKAGES=" --pkg glib-2.0 >= 2.24.1
          --pkg    gobject-2.0 >= 2.24.1
		 --pkg gtk+-3.0 
		 --pkg gtksourceview-3.0 
		--pkg  libxml-2.0 
		 --pkg json-glib-1.0 
		--pkg  gee-1.0 
		 --pkg gobject-introspection-1.0 
		 --pkg webkit2gtk-3.0 
		 --pkg clutter-gtk-1.0 
		 --pkg gladeui-2.0 
		 --pkg libsoup-2.4 
 		 --pkg javascriptcoregtk-3.0  
		 --pkg vte >= 0.28
		--pkg  libvala-0.26 "

PKG_CHECK_MODULES(BUILDER, [ BUILDER_PACKAGES ])

AC_SUBST(BUILDER_PACKAGES)
 
AC_CONFIG_FILES([
    Makefile
    src/Makefile
])

  
 


AC_OUTPUT