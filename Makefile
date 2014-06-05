
#vapigen --library gobject-introspection-1.0 /usr/share/gir-1.0/GIRepository-2.0.gir


all:
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
	rm -rf /tmp/test
