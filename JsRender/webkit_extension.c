
#include <glib-object.h>
#include <webkit2/webkit-web-extension.h>
#include <stdio.h>


static WebKitWebExtension *glob_extension;

G_MODULE_EXPORT void
webkit_web_extension_initialize (WebKitWebExtension *extension)
{

	printf("%s\n","extension initialized");
	glob_extension = g_object_ref(extension);
}

WebKitWebExtension* get_webkit_extension()
{
	return glob_extension;
}