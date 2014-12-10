bin_PROGRAMS = builder4

builder4_SOURCES = \
	sampala.vala \
	sampala-gauge.vala \
	sampala-app.vala

INCLUDES = \
	-include config.h \
	$(SAMPALA_CFLAGS) \
	-DLOCALEDIR=\""$(localedir)"\" \
	-DPKGDATADIR=\""$(pkgdatadir)"\" \
	-DPKGLIBDIR=\""$(pkglibdir)"\"

VALAFLAGS = \
	--vapidir=$(srcdir)/../vapi --pkg config \
	@SAMPALA_PACKAGES@



SUBDIRS = \
	Builder4 \
	JsRender \
	Palate \
	Project
	

EXTRA_DIST = autogen.sh

