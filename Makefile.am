bin_PROGRAMS = builder4

builder4_SOURCES = \
		JsRender/*.vala \
		Project/*.vala \
		Palete/*.vala \
		Builder4/Application.vala \
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
		Builder4/MainWindow.vala \
		
FLAGS= -g --vapidir=./vapi 


VALAFLAGS = \
	--vapidir=$(srcdir)/vapi -g \
	@BUILDER4_PACKAGES@


EXTRA_DIST = autogen.sh

