
#vapigen --library gobject-introspection-1.0 /usr/share/gir-1.0/GIRepository-2.0.gir


PKGS=   --pkg gtk+-3.0 \
		--pkg gtksourceview-3.0 \
		--pkg libxml-2.0 \
		--pkg json-glib-1.0 \
		--pkg gee-1.0 \
		--pkg gobject-introspection-1.0 \
		--pkg webkit2gtk-3.0 \
		--pkg clutter-gtk-1.0 \
		--pkg gladeui-2.0 \
		--pkg libsoup-2.4


FLAGS= -g --vapidir=. 

CORESRC=        JsRender/*.vala \
		Project/*.vala \
		Palete/*.vala \
		Builder4/Application.vala

BUILDER4=   Builder4/About.vala \
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
		Builder4/GladeView.vala \
		Builder4/MainWindow.vala \
		

# compile what... for testing 
all:  builder4
#all: test-leftprops
#all: test-palate
#all: test-addprops
#all: test-glade
#all: test-vala
#all: test-gir


builder4:
	valac $(FLAGS) $(PKGS) $(CORESRC) $(BUILDER4)  \
		Builder4/Main.vala  -o /tmp/Builder4

#-- tests 
 
test-leftprops:
	valac $(FLAGS) $(PKGS) $(CORESRC) \
			tests/TestLeftProps.vala \
			Builder4/WindowLeftProps.vala \
			-o /tmp/test-leftprops

test-palate:
	valac $(FLAGS) $(PKGS) $(CORESRC)  \
		Builder4/WindowRightPalete.vala \
		tests/PaleteTest.vala -o /tmp/test-palete

test-glade:
	valac $(FLAGS) $(PKGS) $(CORESRC)  \
		Builder4/GladeView.vala \
		tests/GladeTest.vala -o /tmp/test-glade


test-glade:
	valac $(FLAGS) $(PKGS) $(CORESRC)  \
		Builder4/GtkView.vala \
		tests/GtkTest.vala -o /tmp/test-glade


test-addprops:
	valac $(FLAGS) $(PKGS) $(CORESRC)  \
		Builder4/WindowAddProp.vala \
		tests/AddPropTest.vala -o /tmp/test-addprops

test-vala: 
	valac $(FLAGS) $(PKGS) $(CORESRC)  \
		Builder4/WindowAddProp.vala \
		tests/ValaTest.vala -o /tmp/test-vala

test-gir: 
	valac $(FLAGS) $(PKGS) $(CORESRC)  \
		tests/GirTest.vala -o /tmp/test-gir


#fixme -- old...
datatest:
	 valac $(FLAGS) $(PKGS) $(CORESRC) \
		Test.GtkWriter.vala -o /tmp/test-data


clean:
	rm -f /tmp/Builder4
	rm -f /tmp/test-leftprops
