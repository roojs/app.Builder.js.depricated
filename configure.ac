
dnl Process this file with autoconf to produce a configure script.
AC_PREREQ([2.68])

AC_INIT([builder], [4.0.0])

AC_CONFIG_HEADERS([config.h])

AM_INIT_AUTOMAKE([1.11 subdir-objects])
AM_MAINTAINER_MODE([enable])

AM_SILENT_RULES([yes])

AC_PROG_CC

AM_PROG_VALAC([0.22.0])

dnl we need to check these exist, then it will generate a compile string for them.

PKG_CHECK_MODULES(BUILDER, [
		 glib-2.0 >= 2.24.1
         gobject-2.0 >= 2.24.1
		 gtk+-3.0 
		 gtksourceview-3.0 
		 libxml-2.0 
		 json-glib-1.0 
		 gee-1.0 
		 gobject-introspection-1.0 
		 webkit2gtk-4.0 
		 clutter-gtk-1.0 
		 gladeui-2.0 
		 libsoup-2.4
 		 javascriptcoregtk-4.0 
		libgda-5.0
		  
])

dnl --- libvala -- needs to find matching really..


PKG_CHECK_MODULES(LIBVALA_0_28_X, libvala-0.28 > 0.26.0, have_libvala_0_28_x="yes", have_libvala_0_28_x="no")
AM_CONDITIONAL(HAVE_LIBVALA_0_28_X, test "$have_libvala_0_28_x" = "yes")

PKG_CHECK_MODULES(LIBVALA_0_26_X, libvala-0.26 > 0.25.2, have_libvala_0_26_x="yes", have_libvala_0_26_x="no")
AM_CONDITIONAL(HAVE_LIBVALA_0_26_X, test "$have_libvala_0_26_x" = "yes")

PKG_CHECK_MODULES(LIBVALA_0_24_X, libvala-0.24 > 0.23.1, have_libvala_0_24_x="yes", have_libvala_0_24_x="no")
AM_CONDITIONAL(HAVE_LIBVALA_0_24_X, test "$have_libvala_0_24_x" = "yes")

PKG_CHECK_MODULES(LIBVALA_0_22_X, libvala-0.22 >= 0.17.4, have_libvala_0_22_x="yes", have_libvala_0_22_x="no")
AM_CONDITIONAL(HAVE_LIBVALA_0_22_X, test "$have_libvala_0_22_x" = "yes")


dnl --- gda



PKG_CHECK_MODULES(HAVE_GDA, [libgda-5.0],
                [gda_5_0_enabled=yes],
                [gda_5_0_enabled=no])

if test $vte_2_91_enabled = yes; then
        AC_DEFINE(HAVE_GDA5,1,[libgda 5.0 support])
else
        
        PKG_CHECK_MODULES(HAVE_GDA, [libgda-4.0],
                [gda_4_0_enabled=yes],
                [gda_4_0_enabled=no])
    
        AC_DEFINE(HAVE_GDA4,1,[libgda 4.0 support])
fi
    

dnl --- vte -- fixme..
 

PKG_CHECK_MODULES(HAVE_VTE, [vte-2.91],
                [vte_2_91_enabled=yes],
                [vte_2_91_enabled=no])
                
if test $vte_2_91_enabled = yes; then
        AC_DEFINE(HAVE_VTE_2_91,1,[libvte 2.91 support])
else
        PKG_CHECK_MODULES(HAVE_VTE, [vte-2.90],
                [vte_2_90_enabled=yes])
        AC_DEFINE(HAVE_VTE_2_90,1,[libvte 2.90 support])
fi

 
AC_CONFIG_FILES([
    Makefile
    src/Makefile
])

  
AC_SUBST(BUILDER_CFLAGS)
AC_SUBST(BUILDER_LIBS)


AC_OUTPUT
