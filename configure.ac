dnl AC_PREREQ([2.65])


AC_INIT([Builder4], [1], [alan@roojs.com])
AC_CONFIG_MACRO_DIR([m4])
AM_INIT_AUTOMAKE

AC_CONFIG_FILES([
	Makefile
	src/Makefile
])
LT_INIT
AC_PROG_CC
AM_PROG_VALAC

pkg_modules="glib-2.0 >= 2.24.1
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
 		 javascriptcore  
		  vte-2.90  
		 libvala
		 posix
"
PKG_CHECK_MODULES(BUILDER4, [$pkg_modules])
AC_SUBST(BUILDER4_CFLAGS)
AC_SUBST(BUILDER4_LIBS)


AC_OUTPUT