
#vapigen --library gobject-introspection-1.0 /usr/share/gir-1.0/GIRepository-2.0.gir


PKGS=   --pkg gtk+-3.0 \
		--pkg gtksourceview-3.0 \
		--pkg libxml-2.0 \
		--pkg json-glib-1.0 \
		--pkg gee-1.0 \
		--pkg gobject-introspection-1.0 \
		--pkg webkit2gtk-3.0 \
		--pkg clutter-gtk-1.0


FLAGS= -g ==vapidir=. 

CORESRC= JsRender/*.vala \
		Project/*.vala \
		Palete/*.vala 

BUILDER4= Builder4/Application.vala \
		Builder4/About.vala \
		Builder4/DialogConfirm.vala \
		Builder4/DialogNewComponent.vala \
		Builder4/StandardErrorDialog.vala \
		Builder4/DialogSaveTemplate.vala \
		Builder4/DialogTemplateSelect.vala \
		Builder4/EditProject.vala \
		Builder4/Editor.vala \
		Builder4/ProjectSettings.vala \
		Builder4/MainWindow.vala \
		Builder4/WindowRightPalete.vala \
		Builder4/WindowLeftTree.vala \
		Builder4/WindowRooView.vala \
		Builder4/WindowLeftProps.vala \
		Builder4/ClutterFiles.vala \
		Builder4/WindowLeftProjects.vala \


# for testing 
all:
		test-leftprops
#  test-full

test-leftprops:
		valac $(FLAGS) $(PKGS) $(CORESRC) \
				Builder4/TestLeftProps.vala \
				Builder4/WindowLeftProps.vala \
				-o /tmp/test-leftprops

builder4:
	 valac $(FLAGS) $(PKGS) $(CORESRC) $(BUILDER4)  
		Test.GtkWriter.vala  -o /tmp/Builder4


datatest:
	valac -g  --pkg gtk+-3.0 \
		--pkg gtksourceview-3.0 \
		--pkg libxml-2.0 \
		--pkg json-glib-1.0 \
		--pkg gee-1.0 \
		--pkg gobject-introspection-1.0 \
		Test.GtkWriter.vala \
		JsRender/*.vala \
		Project/*.vala \
		Palete/*.vala \
		-o /tmp/test
#		Builder4/*.vala \

clean:
	rm -f /tmp/Builder4
	rm -f /tmp/test-leftprops
