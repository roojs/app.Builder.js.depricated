
all:
	valac --pkg gtk+-3.0 JsRender/*.vala Project/*.vala -o /tmp/test

clean:
	rm -rf /tmp/test
