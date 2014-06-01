
all:
	valac --pkg gtk+-3.0 \
		--pkg json-glib-1.0 \
		--pkg gee-1.0 \
		JsRender/*.vala \
		Project/*.vala \
		Palete/*.vala \
		-o /tmp/test

clean:
	rm -rf /tmp/test
