
#include <glib-object.h>
#include <webkit2/webkit-web-extension.h>

static WebKitWebExtension *glob_extension

G_MODULE_EXPORT void
webkit_web_extension_initialize (WebKitWebExtension *extension)
{
    glob_extension = extension;
}