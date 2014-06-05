/* Test.GtkWriter.vala.c generated by valac 0.24.0, the Vala compiler
 * generated from Test.GtkWriter.vala, do not modify */


#include <glib.h>
#include <glib-object.h>
#include <stdlib.h>
#include <string.h>
#include <gee.h>


#define JS_RENDER_TYPE_LANGCLASS (js_render_langclass_get_type ())
#define JS_RENDER_LANGCLASS(obj) (G_TYPE_CHECK_INSTANCE_CAST ((obj), JS_RENDER_TYPE_LANGCLASS, JsRenderLang_Class))
#define JS_RENDER_LANGCLASS_CLASS(klass) (G_TYPE_CHECK_CLASS_CAST ((klass), JS_RENDER_TYPE_LANGCLASS, JsRenderLang_ClassClass))
#define JS_RENDER_IS_LANGCLASS(obj) (G_TYPE_CHECK_INSTANCE_TYPE ((obj), JS_RENDER_TYPE_LANGCLASS))
#define JS_RENDER_IS_LANGCLASS_CLASS(klass) (G_TYPE_CHECK_CLASS_TYPE ((klass), JS_RENDER_TYPE_LANGCLASS))
#define JS_RENDER_LANGCLASS_GET_CLASS(obj) (G_TYPE_INSTANCE_GET_CLASS ((obj), JS_RENDER_TYPE_LANGCLASS, JsRenderLang_ClassClass))

typedef struct _JsRenderLang_Class JsRenderLang_Class;
typedef struct _JsRenderLang_ClassClass JsRenderLang_ClassClass;
#define _g_object_unref0(var) ((var == NULL) ? NULL : (var = (g_object_unref (var), NULL)))

#define PROJECT_TYPE_PROJECT (project_project_get_type ())
#define PROJECT_PROJECT(obj) (G_TYPE_CHECK_INSTANCE_CAST ((obj), PROJECT_TYPE_PROJECT, ProjectProject))
#define PROJECT_PROJECT_CLASS(klass) (G_TYPE_CHECK_CLASS_CAST ((klass), PROJECT_TYPE_PROJECT, ProjectProjectClass))
#define PROJECT_IS_PROJECT(obj) (G_TYPE_CHECK_INSTANCE_TYPE ((obj), PROJECT_TYPE_PROJECT))
#define PROJECT_IS_PROJECT_CLASS(klass) (G_TYPE_CHECK_CLASS_TYPE ((klass), PROJECT_TYPE_PROJECT))
#define PROJECT_PROJECT_GET_CLASS(obj) (G_TYPE_INSTANCE_GET_CLASS ((obj), PROJECT_TYPE_PROJECT, ProjectProjectClass))

typedef struct _ProjectProject ProjectProject;
typedef struct _ProjectProjectClass ProjectProjectClass;

#define PROJECT_TYPE_GTK (project_gtk_get_type ())
#define PROJECT_GTK(obj) (G_TYPE_CHECK_INSTANCE_CAST ((obj), PROJECT_TYPE_GTK, ProjectGtk))
#define PROJECT_GTK_CLASS(klass) (G_TYPE_CHECK_CLASS_CAST ((klass), PROJECT_TYPE_GTK, ProjectGtkClass))
#define PROJECT_IS_GTK(obj) (G_TYPE_CHECK_INSTANCE_TYPE ((obj), PROJECT_TYPE_GTK))
#define PROJECT_IS_GTK_CLASS(klass) (G_TYPE_CHECK_CLASS_TYPE ((klass), PROJECT_TYPE_GTK))
#define PROJECT_GTK_GET_CLASS(obj) (G_TYPE_INSTANCE_GET_CLASS ((obj), PROJECT_TYPE_GTK, ProjectGtkClass))

typedef struct _ProjectGtk ProjectGtk;
typedef struct _ProjectGtkClass ProjectGtkClass;
#define _g_free0(var) (var = (g_free (var), NULL))

#define JS_RENDER_TYPE_JS_RENDER (js_render_js_render_get_type ())
#define JS_RENDER_JS_RENDER(obj) (G_TYPE_CHECK_INSTANCE_CAST ((obj), JS_RENDER_TYPE_JS_RENDER, JsRenderJsRender))
#define JS_RENDER_JS_RENDER_CLASS(klass) (G_TYPE_CHECK_CLASS_CAST ((klass), JS_RENDER_TYPE_JS_RENDER, JsRenderJsRenderClass))
#define JS_RENDER_IS_JS_RENDER(obj) (G_TYPE_CHECK_INSTANCE_TYPE ((obj), JS_RENDER_TYPE_JS_RENDER))
#define JS_RENDER_IS_JS_RENDER_CLASS(klass) (G_TYPE_CHECK_CLASS_TYPE ((klass), JS_RENDER_TYPE_JS_RENDER))
#define JS_RENDER_JS_RENDER_GET_CLASS(obj) (G_TYPE_INSTANCE_GET_CLASS ((obj), JS_RENDER_TYPE_JS_RENDER, JsRenderJsRenderClass))

typedef struct _JsRenderJsRender JsRenderJsRender;
typedef struct _JsRenderJsRenderClass JsRenderJsRenderClass;
typedef struct _ProjectProjectPrivate ProjectProjectPrivate;

struct _ProjectProject {
	GObject parent_instance;
	ProjectProjectPrivate * priv;
	gchar* id;
	gchar* fn;
	gchar* name;
	GeeHashMap* paths;
	GeeHashMap* files;
	gchar* xtype;
};

struct _ProjectProjectClass {
	GObjectClass parent_class;
};

typedef enum  {
	JS_RENDER_ERROR_INVALID_FORMAT
} JsRenderError;
#define JS_RENDER_ERROR js_render_error_quark ()


gint _vala_main (void);
JsRenderLang_Class* js_render_langclass_new (void);
JsRenderLang_Class* js_render_langclass_construct (GType object_type);
GType js_render_langclass_get_type (void) G_GNUC_CONST;
GType project_project_get_type (void) G_GNUC_CONST;
GType project_gtk_get_type (void) G_GNUC_CONST;
ProjectGtk* project_gtk_new (const gchar* path);
ProjectGtk* project_gtk_construct (GType object_type, const gchar* path);
void project_project_scanDirs (ProjectProject* self);
gchar* project_project_toJSON (ProjectProject* self, gboolean show_all);
GType js_render_js_render_get_type (void) G_GNUC_CONST;
GQuark js_render_error_quark (void);
void js_render_js_render_loadItems (JsRenderJsRender* self, GError** error);
gchar* js_render_js_render_toSource (JsRenderJsRender* self);
static void _vala_array_destroy (gpointer array, gint array_length, GDestroyNotify destroy_func);
static void _vala_array_free (gpointer array, gint array_length, GDestroyNotify destroy_func);


/**
 * Test the writer code...


*/
gint _vala_main (void) {
	gint result = 0;
	JsRenderLang_Class* _tmp0_ = NULL;
	JsRenderLang_Class* _tmp1_ = NULL;
	ProjectGtk* proj = NULL;
	ProjectGtk* _tmp2_ = NULL;
	gchar* _tmp3_ = NULL;
	gchar* _tmp4_ = NULL;
	JsRenderJsRender* tf = NULL;
	GeeHashMap* _tmp5_ = NULL;
	gpointer _tmp6_ = NULL;
	gchar** spawn_args = NULL;
	gint spawn_args_length1 = 0;
	gint _spawn_args_size_ = 0;
	gchar* _tmp7_ = NULL;
	gchar* _tmp8_ = NULL;
	GError * _inner_error_ = NULL;
#line 8 "/home/alan/gitlive/app.Builder.js/Test.GtkWriter.vala"
	_tmp0_ = js_render_langclass_new ();
#line 8 "/home/alan/gitlive/app.Builder.js/Test.GtkWriter.vala"
	_tmp1_ = _tmp0_;
#line 8 "/home/alan/gitlive/app.Builder.js/Test.GtkWriter.vala"
	_g_object_unref0 (_tmp1_);
#line 9 "/home/alan/gitlive/app.Builder.js/Test.GtkWriter.vala"
	g_log_set_always_fatal (G_LOG_LEVEL_ERROR | G_LOG_LEVEL_CRITICAL);
#line 10 "/home/alan/gitlive/app.Builder.js/Test.GtkWriter.vala"
	_tmp2_ = project_gtk_new ("/home/alan/gitlive/app.Builder.js/Builder4");
#line 10 "/home/alan/gitlive/app.Builder.js/Test.GtkWriter.vala"
	proj = _tmp2_;
#line 11 "/home/alan/gitlive/app.Builder.js/Test.GtkWriter.vala"
	project_project_scanDirs ((ProjectProject*) proj);
#line 12 "/home/alan/gitlive/app.Builder.js/Test.GtkWriter.vala"
	_tmp3_ = project_project_toJSON ((ProjectProject*) proj, TRUE);
#line 12 "/home/alan/gitlive/app.Builder.js/Test.GtkWriter.vala"
	_tmp4_ = _tmp3_;
#line 12 "/home/alan/gitlive/app.Builder.js/Test.GtkWriter.vala"
	g_print ("%s", _tmp4_);
#line 12 "/home/alan/gitlive/app.Builder.js/Test.GtkWriter.vala"
	_g_free0 (_tmp4_);
#line 13 "/home/alan/gitlive/app.Builder.js/Test.GtkWriter.vala"
	g_print ("\ndone\n");
#line 14 "/home/alan/gitlive/app.Builder.js/Test.GtkWriter.vala"
	_tmp5_ = ((ProjectProject*) proj)->files;
#line 14 "/home/alan/gitlive/app.Builder.js/Test.GtkWriter.vala"
	_tmp6_ = gee_abstract_map_get ((GeeAbstractMap*) _tmp5_, "/home/alan/gitlive/app.Builder.js/Builder4/Editor.bjs");
#line 14 "/home/alan/gitlive/app.Builder.js/Test.GtkWriter.vala"
	tf = (JsRenderJsRender*) _tmp6_;
#line 15 "/home/alan/gitlive/app.Builder.js/Test.GtkWriter.vala"
	js_render_js_render_loadItems (tf, &_inner_error_);
#line 15 "/home/alan/gitlive/app.Builder.js/Test.GtkWriter.vala"
	if (_inner_error_ != NULL) {
#line 15 "/home/alan/gitlive/app.Builder.js/Test.GtkWriter.vala"
		_g_object_unref0 (tf);
#line 15 "/home/alan/gitlive/app.Builder.js/Test.GtkWriter.vala"
		_g_object_unref0 (proj);
#line 15 "/home/alan/gitlive/app.Builder.js/Test.GtkWriter.vala"
		g_critical ("file %s: line %d: uncaught error: %s (%s, %d)", __FILE__, __LINE__, _inner_error_->message, g_quark_to_string (_inner_error_->domain), _inner_error_->code);
#line 15 "/home/alan/gitlive/app.Builder.js/Test.GtkWriter.vala"
		g_clear_error (&_inner_error_);
#line 15 "/home/alan/gitlive/app.Builder.js/Test.GtkWriter.vala"
		return 0;
#line 161 "Test.GtkWriter.vala.c"
	}
#line 19 "/home/alan/gitlive/app.Builder.js/Test.GtkWriter.vala"
	_tmp7_ = js_render_js_render_toSource (tf);
#line 19 "/home/alan/gitlive/app.Builder.js/Test.GtkWriter.vala"
	_tmp8_ = _tmp7_;
#line 19 "/home/alan/gitlive/app.Builder.js/Test.GtkWriter.vala"
	g_print ("%s", _tmp8_);
#line 19 "/home/alan/gitlive/app.Builder.js/Test.GtkWriter.vala"
	_g_free0 (_tmp8_);
#line 20 "/home/alan/gitlive/app.Builder.js/Test.GtkWriter.vala"
	result = 0;
#line 20 "/home/alan/gitlive/app.Builder.js/Test.GtkWriter.vala"
	spawn_args = (_vala_array_free (spawn_args, spawn_args_length1, (GDestroyNotify) g_free), NULL);
#line 20 "/home/alan/gitlive/app.Builder.js/Test.GtkWriter.vala"
	_g_object_unref0 (tf);
#line 20 "/home/alan/gitlive/app.Builder.js/Test.GtkWriter.vala"
	_g_object_unref0 (proj);
#line 20 "/home/alan/gitlive/app.Builder.js/Test.GtkWriter.vala"
	return result;
#line 45 "/home/alan/gitlive/app.Builder.js/Test.GtkWriter.vala"
	result = 0;
#line 45 "/home/alan/gitlive/app.Builder.js/Test.GtkWriter.vala"
	spawn_args = (_vala_array_free (spawn_args, spawn_args_length1, (GDestroyNotify) g_free), NULL);
#line 45 "/home/alan/gitlive/app.Builder.js/Test.GtkWriter.vala"
	_g_object_unref0 (tf);
#line 45 "/home/alan/gitlive/app.Builder.js/Test.GtkWriter.vala"
	_g_object_unref0 (proj);
#line 45 "/home/alan/gitlive/app.Builder.js/Test.GtkWriter.vala"
	return result;
#line 191 "Test.GtkWriter.vala.c"
}


int main (int argc, char ** argv) {
#if !GLIB_CHECK_VERSION (2,35,0)
	g_type_init ();
#endif
#line 7 "/home/alan/gitlive/app.Builder.js/Test.GtkWriter.vala"
	return _vala_main ();
#line 201 "Test.GtkWriter.vala.c"
}


static void _vala_array_destroy (gpointer array, gint array_length, GDestroyNotify destroy_func) {
	if ((array != NULL) && (destroy_func != NULL)) {
		int i;
		for (i = 0; i < array_length; i = i + 1) {
			if (((gpointer*) array)[i] != NULL) {
				destroy_func (((gpointer*) array)[i]);
			}
		}
	}
}


static void _vala_array_free (gpointer array, gint array_length, GDestroyNotify destroy_func) {
	_vala_array_destroy (array, array_length, destroy_func);
	g_free (array);
}



