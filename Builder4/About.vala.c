/* About.vala.c generated by valac 0.20.1, the Vala compiler
 * generated from About.vala, do not modify */

/* -- to compile
valac  --pkg gio-2.0  --pkg posix  --pkg gtk+-3.0 --pkg libnotify --pkg gtksourceview-3.0  --pkg  libwnck-3.0 \
    /tmp/About.vala  -o /tmp/About
*/
/* -- to test class
static int main (string[] args) {
    Gtk.init (ref args);
    new Xcls_AboutDialog1();
    About.show_all();
     Gtk.main ();
    return 0;
}
*/

#include <glib.h>
#include <glib-object.h>
#include <gtk/gtk.h>
#include <gdk/gdk.h>
#include <gobject/gvaluecollector.h>


#define TYPE_XCLS_ABOUTDIALOG1 (xcls_aboutdialog1_get_type ())
#define XCLS_ABOUTDIALOG1(obj) (G_TYPE_CHECK_INSTANCE_CAST ((obj), TYPE_XCLS_ABOUTDIALOG1, Xcls_AboutDialog1))
#define XCLS_ABOUTDIALOG1_CLASS(klass) (G_TYPE_CHECK_CLASS_CAST ((klass), TYPE_XCLS_ABOUTDIALOG1, Xcls_AboutDialog1Class))
#define IS_XCLS_ABOUTDIALOG1(obj) (G_TYPE_CHECK_INSTANCE_TYPE ((obj), TYPE_XCLS_ABOUTDIALOG1))
#define IS_XCLS_ABOUTDIALOG1_CLASS(klass) (G_TYPE_CHECK_CLASS_TYPE ((klass), TYPE_XCLS_ABOUTDIALOG1))
#define XCLS_ABOUTDIALOG1_GET_CLASS(obj) (G_TYPE_INSTANCE_GET_CLASS ((obj), TYPE_XCLS_ABOUTDIALOG1, Xcls_AboutDialog1Class))

typedef struct _Xcls_AboutDialog1 Xcls_AboutDialog1;
typedef struct _Xcls_AboutDialog1Class Xcls_AboutDialog1Class;
typedef struct _Xcls_AboutDialog1Private Xcls_AboutDialog1Private;
#define _g_object_unref0(var) ((var == NULL) ? NULL : (var = (g_object_unref (var), NULL)))
#define _xcls_aboutdialog1_unref0(var) ((var == NULL) ? NULL : (var = (xcls_aboutdialog1_unref (var), NULL)))
typedef struct _ParamSpecXcls_AboutDialog1 ParamSpecXcls_AboutDialog1;

struct _Xcls_AboutDialog1 {
	GTypeInstance parent_instance;
	volatile int ref_count;
	Xcls_AboutDialog1Private * priv;
	GtkAboutDialog* el;
};

struct _Xcls_AboutDialog1Class {
	GTypeClass parent_class;
	void (*finalize) (Xcls_AboutDialog1 *self);
};

struct _ParamSpecXcls_AboutDialog1 {
	GParamSpec parent_instance;
};


extern Xcls_AboutDialog1* About;
Xcls_AboutDialog1* About = NULL;
static gpointer xcls_aboutdialog1_parent_class = NULL;
static Xcls_AboutDialog1* xcls_aboutdialog1__this;
static Xcls_AboutDialog1* xcls_aboutdialog1__this = NULL;

gpointer xcls_aboutdialog1_ref (gpointer instance);
void xcls_aboutdialog1_unref (gpointer instance);
GParamSpec* param_spec_xcls_aboutdialog1 (const gchar* name, const gchar* nick, const gchar* blurb, GType object_type, GParamFlags flags);
void value_set_xcls_aboutdialog1 (GValue* value, gpointer v_object);
void value_take_xcls_aboutdialog1 (GValue* value, gpointer v_object);
gpointer value_get_xcls_aboutdialog1 (const GValue* value);
GType xcls_aboutdialog1_get_type (void) G_GNUC_CONST;
enum  {
	XCLS_ABOUTDIALOG1_DUMMY_PROPERTY
};
Xcls_AboutDialog1* xcls_aboutdialog1_new (void);
Xcls_AboutDialog1* xcls_aboutdialog1_construct (GType object_type);
static void __lambda74_ (Xcls_AboutDialog1* self, gint rid);
static void ___lambda74__gtk_dialog_response (GtkDialog* _sender, gint response_id, gpointer self);
static gboolean __lambda75_ (Xcls_AboutDialog1* self, GtkWidget* _self_, GdkEventAny* event);
static gboolean ___lambda75__gtk_widget_delete_event (GtkWidget* _sender, GdkEventAny* event, gpointer self);
void xcls_aboutdialog1_show_all (Xcls_AboutDialog1* self);
static void xcls_aboutdialog1_finalize (Xcls_AboutDialog1* obj);


static gpointer _xcls_aboutdialog1_ref0 (gpointer self) {
#line 32 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	return self ? xcls_aboutdialog1_ref (self) : NULL;
#line 86 "About.vala.c"
}


static void __lambda74_ (Xcls_AboutDialog1* self, gint rid) {
	GtkAboutDialog* _tmp0_;
#line 46 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	_tmp0_ = self->el;
#line 46 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	gtk_widget_hide ((GtkWidget*) _tmp0_);
#line 96 "About.vala.c"
}


static void ___lambda74__gtk_dialog_response (GtkDialog* _sender, gint response_id, gpointer self) {
#line 45 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	__lambda74_ (self, response_id);
#line 103 "About.vala.c"
}


static gboolean __lambda75_ (Xcls_AboutDialog1* self, GtkWidget* _self_, GdkEventAny* event) {
	gboolean result = FALSE;
	GtkAboutDialog* _tmp0_;
#line 49 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	g_return_val_if_fail (_self_ != NULL, FALSE);
#line 49 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	g_return_val_if_fail (event != NULL, FALSE);
#line 50 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	_tmp0_ = self->el;
#line 50 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	gtk_widget_hide ((GtkWidget*) _tmp0_);
#line 51 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	result = TRUE;
#line 51 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	return result;
#line 122 "About.vala.c"
}


static gboolean ___lambda75__gtk_widget_delete_event (GtkWidget* _sender, GdkEventAny* event, gpointer self) {
	gboolean result;
	result = __lambda75_ (self, _sender, event);
#line 49 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	return result;
#line 131 "About.vala.c"
}


Xcls_AboutDialog1* xcls_aboutdialog1_construct (GType object_type) {
	Xcls_AboutDialog1* self = NULL;
	GtkAboutDialog* _tmp0_;
	Xcls_AboutDialog1* _tmp1_;
	Xcls_AboutDialog1* _tmp2_;
	GtkAboutDialog* _tmp3_;
	GtkAboutDialog* _tmp4_;
	GtkAboutDialog* _tmp5_;
	GtkAboutDialog* _tmp6_;
	GtkAboutDialog* _tmp7_;
	GtkAboutDialog* _tmp8_;
	GtkAboutDialog* _tmp9_;
#line 29 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	self = (Xcls_AboutDialog1*) g_type_create_instance (object_type);
#line 31 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	_tmp0_ = (GtkAboutDialog*) gtk_about_dialog_new ();
#line 31 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	g_object_ref_sink (_tmp0_);
#line 31 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	_g_object_unref0 (self->el);
#line 31 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	self->el = _tmp0_;
#line 32 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	_tmp1_ = _xcls_aboutdialog1_ref0 (self);
#line 32 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	_xcls_aboutdialog1_unref0 (xcls_aboutdialog1__this);
#line 32 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	xcls_aboutdialog1__this = _tmp1_;
#line 33 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	_tmp2_ = _xcls_aboutdialog1_ref0 (self);
#line 33 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	_xcls_aboutdialog1_unref0 (About);
#line 33 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	About = _tmp2_;
#line 38 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	_tmp3_ = self->el;
#line 38 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	gtk_about_dialog_set_copyright (_tmp3_, "LGPL");
#line 39 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	_tmp4_ = self->el;
#line 39 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	gtk_about_dialog_set_license (_tmp4_, "LGPL");
#line 40 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	_tmp5_ = self->el;
#line 40 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	gtk_window_set_modal ((GtkWindow*) _tmp5_, TRUE);
#line 41 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	_tmp6_ = self->el;
#line 41 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	gtk_about_dialog_set_program_name (_tmp6_, "app.Builder.js");
#line 42 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	_tmp7_ = self->el;
#line 42 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	gtk_about_dialog_set_website (_tmp7_, "http://www.akbkhome.com/blog.php");
#line 45 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	_tmp8_ = self->el;
#line 45 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	g_signal_connect ((GtkDialog*) _tmp8_, "response", (GCallback) ___lambda74__gtk_dialog_response, self);
#line 49 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	_tmp9_ = self->el;
#line 49 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	g_signal_connect ((GtkWidget*) _tmp9_, "delete-event", (GCallback) ___lambda75__gtk_widget_delete_event, self);
#line 29 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	return self;
#line 199 "About.vala.c"
}


Xcls_AboutDialog1* xcls_aboutdialog1_new (void) {
#line 29 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	return xcls_aboutdialog1_construct (TYPE_XCLS_ABOUTDIALOG1);
#line 206 "About.vala.c"
}


void xcls_aboutdialog1_show_all (Xcls_AboutDialog1* self) {
	GtkAboutDialog* _tmp0_;
#line 73 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	g_return_if_fail (self != NULL);
#line 74 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	_tmp0_ = self->el;
#line 74 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	gtk_widget_show_all ((GtkWidget*) _tmp0_);
#line 218 "About.vala.c"
}


static void value_xcls_aboutdialog1_init (GValue* value) {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	value->data[0].v_pointer = NULL;
#line 225 "About.vala.c"
}


static void value_xcls_aboutdialog1_free_value (GValue* value) {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	if (value->data[0].v_pointer) {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
		xcls_aboutdialog1_unref (value->data[0].v_pointer);
#line 234 "About.vala.c"
	}
}


static void value_xcls_aboutdialog1_copy_value (const GValue* src_value, GValue* dest_value) {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	if (src_value->data[0].v_pointer) {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
		dest_value->data[0].v_pointer = xcls_aboutdialog1_ref (src_value->data[0].v_pointer);
#line 244 "About.vala.c"
	} else {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
		dest_value->data[0].v_pointer = NULL;
#line 248 "About.vala.c"
	}
}


static gpointer value_xcls_aboutdialog1_peek_pointer (const GValue* value) {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	return value->data[0].v_pointer;
#line 256 "About.vala.c"
}


static gchar* value_xcls_aboutdialog1_collect_value (GValue* value, guint n_collect_values, GTypeCValue* collect_values, guint collect_flags) {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	if (collect_values[0].v_pointer) {
#line 263 "About.vala.c"
		Xcls_AboutDialog1* object;
		object = collect_values[0].v_pointer;
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
		if (object->parent_instance.g_class == NULL) {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
			return g_strconcat ("invalid unclassed object pointer for value type `", G_VALUE_TYPE_NAME (value), "'", NULL);
#line 270 "About.vala.c"
		} else if (!g_value_type_compatible (G_TYPE_FROM_INSTANCE (object), G_VALUE_TYPE (value))) {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
			return g_strconcat ("invalid object type `", g_type_name (G_TYPE_FROM_INSTANCE (object)), "' for value type `", G_VALUE_TYPE_NAME (value), "'", NULL);
#line 274 "About.vala.c"
		}
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
		value->data[0].v_pointer = xcls_aboutdialog1_ref (object);
#line 278 "About.vala.c"
	} else {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
		value->data[0].v_pointer = NULL;
#line 282 "About.vala.c"
	}
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	return NULL;
#line 286 "About.vala.c"
}


static gchar* value_xcls_aboutdialog1_lcopy_value (const GValue* value, guint n_collect_values, GTypeCValue* collect_values, guint collect_flags) {
	Xcls_AboutDialog1** object_p;
	object_p = collect_values[0].v_pointer;
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	if (!object_p) {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
		return g_strdup_printf ("value location for `%s' passed as NULL", G_VALUE_TYPE_NAME (value));
#line 297 "About.vala.c"
	}
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	if (!value->data[0].v_pointer) {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
		*object_p = NULL;
#line 303 "About.vala.c"
	} else if (collect_flags & G_VALUE_NOCOPY_CONTENTS) {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
		*object_p = value->data[0].v_pointer;
#line 307 "About.vala.c"
	} else {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
		*object_p = xcls_aboutdialog1_ref (value->data[0].v_pointer);
#line 311 "About.vala.c"
	}
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	return NULL;
#line 315 "About.vala.c"
}


GParamSpec* param_spec_xcls_aboutdialog1 (const gchar* name, const gchar* nick, const gchar* blurb, GType object_type, GParamFlags flags) {
	ParamSpecXcls_AboutDialog1* spec;
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	g_return_val_if_fail (g_type_is_a (object_type, TYPE_XCLS_ABOUTDIALOG1), NULL);
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	spec = g_param_spec_internal (G_TYPE_PARAM_OBJECT, name, nick, blurb, flags);
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	G_PARAM_SPEC (spec)->value_type = object_type;
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	return G_PARAM_SPEC (spec);
#line 329 "About.vala.c"
}


gpointer value_get_xcls_aboutdialog1 (const GValue* value) {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	g_return_val_if_fail (G_TYPE_CHECK_VALUE_TYPE (value, TYPE_XCLS_ABOUTDIALOG1), NULL);
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	return value->data[0].v_pointer;
#line 338 "About.vala.c"
}


void value_set_xcls_aboutdialog1 (GValue* value, gpointer v_object) {
	Xcls_AboutDialog1* old;
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	g_return_if_fail (G_TYPE_CHECK_VALUE_TYPE (value, TYPE_XCLS_ABOUTDIALOG1));
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	old = value->data[0].v_pointer;
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	if (v_object) {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
		g_return_if_fail (G_TYPE_CHECK_INSTANCE_TYPE (v_object, TYPE_XCLS_ABOUTDIALOG1));
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
		g_return_if_fail (g_value_type_compatible (G_TYPE_FROM_INSTANCE (v_object), G_VALUE_TYPE (value)));
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
		value->data[0].v_pointer = v_object;
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
		xcls_aboutdialog1_ref (value->data[0].v_pointer);
#line 358 "About.vala.c"
	} else {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
		value->data[0].v_pointer = NULL;
#line 362 "About.vala.c"
	}
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	if (old) {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
		xcls_aboutdialog1_unref (old);
#line 368 "About.vala.c"
	}
}


void value_take_xcls_aboutdialog1 (GValue* value, gpointer v_object) {
	Xcls_AboutDialog1* old;
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	g_return_if_fail (G_TYPE_CHECK_VALUE_TYPE (value, TYPE_XCLS_ABOUTDIALOG1));
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	old = value->data[0].v_pointer;
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	if (v_object) {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
		g_return_if_fail (G_TYPE_CHECK_INSTANCE_TYPE (v_object, TYPE_XCLS_ABOUTDIALOG1));
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
		g_return_if_fail (g_value_type_compatible (G_TYPE_FROM_INSTANCE (v_object), G_VALUE_TYPE (value)));
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
		value->data[0].v_pointer = v_object;
#line 387 "About.vala.c"
	} else {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
		value->data[0].v_pointer = NULL;
#line 391 "About.vala.c"
	}
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	if (old) {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
		xcls_aboutdialog1_unref (old);
#line 397 "About.vala.c"
	}
}


static void xcls_aboutdialog1_class_init (Xcls_AboutDialog1Class * klass) {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	xcls_aboutdialog1_parent_class = g_type_class_peek_parent (klass);
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	XCLS_ABOUTDIALOG1_CLASS (klass)->finalize = xcls_aboutdialog1_finalize;
#line 407 "About.vala.c"
}


static void xcls_aboutdialog1_instance_init (Xcls_AboutDialog1 * self) {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	self->ref_count = 1;
#line 414 "About.vala.c"
}


static void xcls_aboutdialog1_finalize (Xcls_AboutDialog1* obj) {
	Xcls_AboutDialog1 * self;
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	self = G_TYPE_CHECK_INSTANCE_CAST (obj, TYPE_XCLS_ABOUTDIALOG1, Xcls_AboutDialog1);
#line 22 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	_g_object_unref0 (self->el);
#line 424 "About.vala.c"
}


GType xcls_aboutdialog1_get_type (void) {
	static volatile gsize xcls_aboutdialog1_type_id__volatile = 0;
	if (g_once_init_enter (&xcls_aboutdialog1_type_id__volatile)) {
		static const GTypeValueTable g_define_type_value_table = { value_xcls_aboutdialog1_init, value_xcls_aboutdialog1_free_value, value_xcls_aboutdialog1_copy_value, value_xcls_aboutdialog1_peek_pointer, "p", value_xcls_aboutdialog1_collect_value, "p", value_xcls_aboutdialog1_lcopy_value };
		static const GTypeInfo g_define_type_info = { sizeof (Xcls_AboutDialog1Class), (GBaseInitFunc) NULL, (GBaseFinalizeFunc) NULL, (GClassInitFunc) xcls_aboutdialog1_class_init, (GClassFinalizeFunc) NULL, NULL, sizeof (Xcls_AboutDialog1), 0, (GInstanceInitFunc) xcls_aboutdialog1_instance_init, &g_define_type_value_table };
		static const GTypeFundamentalInfo g_define_type_fundamental_info = { (G_TYPE_FLAG_CLASSED | G_TYPE_FLAG_INSTANTIATABLE | G_TYPE_FLAG_DERIVABLE | G_TYPE_FLAG_DEEP_DERIVABLE) };
		GType xcls_aboutdialog1_type_id;
		xcls_aboutdialog1_type_id = g_type_register_fundamental (g_type_fundamental_next (), "Xcls_AboutDialog1", &g_define_type_info, &g_define_type_fundamental_info, 0);
		g_once_init_leave (&xcls_aboutdialog1_type_id__volatile, xcls_aboutdialog1_type_id);
	}
	return xcls_aboutdialog1_type_id__volatile;
}


gpointer xcls_aboutdialog1_ref (gpointer instance) {
	Xcls_AboutDialog1* self;
	self = instance;
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	g_atomic_int_inc (&self->ref_count);
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	return instance;
#line 449 "About.vala.c"
}


void xcls_aboutdialog1_unref (gpointer instance) {
	Xcls_AboutDialog1* self;
	self = instance;
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
	if (g_atomic_int_dec_and_test (&self->ref_count)) {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
		XCLS_ABOUTDIALOG1_GET_CLASS (self)->finalize (self);
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/About.vala"
		g_type_free_instance ((GTypeInstance *) self);
#line 462 "About.vala.c"
	}
}



