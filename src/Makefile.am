
 
if HAVE_LIBVALA_0_22_X
builder_LIBVALA = --pkg libvala-0.22
AM_CPPFLAGS = $(BUILDER_CFLAGS) $(LIBVALA_0_22_X_CFLAGS)
LIBVALA_LIBS = $(LIBVALA_0_22_X_LIBS)
endif
 
if HAVE_LIBVALA_0_24_X
builder_LIBVALA = --pkg libvala-0.24
AM_CPPFLAGS = $(BUILDER_CFLAGS) $(LIBVALA_0_24_X_CFLAGS)
LIBVALA_LIBS = $(LIBVALA_0_24_X_LIBS)
endif


if HAVE_LIBVALA_0_26_X
builder_LIBVALA = --pkg libvala-0.26
AM_CPPFLAGS = $(BUILDER_CFLAGS) $(LIBVALA_0_26_X_CFLAGS)
LIBVALA_LIBS = $(LIBVALA_0_26_X_LIBS)
endif

if HAVE_LIBVALA_0_28_X
builder_LIBVALA = --pkg libvala-0.28
AM_CPPFLAGS = $(BUILDER_CFLAGS) $(LIBVALA_0_28_X_CFLAGS)
LIBVALA_LIBS = $(LIBVALA_0_28_X_LIBS)
endif

bin_PROGRAMS = builder

builder_PKGS = \
		--pkg glib-2.0  \
        --pkg gobject-2.0  \
		--pkg  gtk+-3.0 \
		--pkg  gtksourceview-3.0 \
		--pkg  libxml-2.0 \
		--pkg json-glib-1.0 \
		--pkg gee-1.0 \
		--pkg gobject-introspection-1.0 \ 
		--pkg webkit2gtk-3.0 \
		--pkg clutter-gtk-1.0 \
		--pkg gladeui-2.0 \
		--pkg libsoup-2.4 \
 		--pkg javascriptcore \
		$(builder_LIBVALA) \
		--pkg vte-2.90 \
		--pkg posix


builder_SOURCES = \
		Application.vala \
		Main.vala \
		JsRender/Gtk.vala \
		JsRender/JsRender.vala \
		JsRender/Lang.vala \
		JsRender/NodeToGlade.vala \
		JsRender/NodeToGtk.vala \
		JsRender/NodeToJs.vala \
		JsRender/NodeToVala.vala \
		JsRender/Node.vala \
		JsRender/Roo.vala \
		Project/Gtk.vala \
		Project/Project.vala \
		Project/Roo.vala \
		Palete/Gir.vala \
		Palete/Gtk.vala \
		Palete/Javascript.vala \
		Palete/Palete.vala \
		Palete/Roo.vala \
		Palete/ValaSource.vala \
		Builder4/About.vala \
		Builder4/DialogConfirm.vala \
		Builder4/DialogNewComponent.vala \
		Builder4/StandardErrorDialog.vala \
		Builder4/DialogSaveTemplate.vala \
		Builder4/DialogSaveModule.vala \
		Builder4/DialogTemplateSelect.vala \
		Builder4/EditProject.vala \
		Builder4/Editor.vala \
		Builder4/ProjectSettings.vala \
		Builder4/WindowRightPalete.vala \
		Builder4/WindowLeftTree.vala \
		Builder4/WindowRooView.vala \
		Builder4/WindowLeftProps.vala \
		Builder4/ClutterFiles.vala \
		Builder4/WindowLeftProjects.vala \
		Builder4/WindowAddProp.vala \
		Builder4/GtkView.vala \
		Builder4/ValaProjectSettings.vala \
		Builder4/MainWindow.vala 



builder_VALAFLAGS = \
	--vapidir=$(srcdir)/vapi -g  $(builder_PKGS)

builder_LDADD =  $(BUILDER_LIBS) $(LIBVALA_LIBS) 



CLEANFILES = *.h *.c *.vapi *.stamp
