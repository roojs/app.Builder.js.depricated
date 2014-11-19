[
    {
        "name" : "Builder4",
        "compile_flags" : "-g",
        "target_bin" : "/tmp/Builder5",
        "sources" : [
        ],
        "packages" : [
        ]
    },
    {
        "name" : "another group",
        "compile_flags" : "",
        "target_bin" : "",
        "sources" : [
        ],
        "packages" : [
        ]
    },
    {
        "name" : "_default_",
        "compile_flags" : "",
        "target_bin" : "",
        "sources" : [
            "../Builder4",
            "../Palete",
            "../Project",
            "../JsRender"
        ],
        "packages" : [
            "clutter-gtk-1.0",
            "gdk-3.0",
            "gtk+-3.0",
            "gtksourceview-3.0",
            "libxml-2.0",
            "json-glib-1.0",
            "gobject-introspection-1.0",
            "libsoup-2.4",
            "posix",
            "libvala-0.26"
        ]
    }
]