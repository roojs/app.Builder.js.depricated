/* DialogConfirm.vala.c generated by valac 0.20.1, the Vala compiler
 * generated from DialogConfirm.vala, do not modify */

/* -- to compile
valac  --pkg gio-2.0  --pkg posix  --pkg gtk+-3.0 --pkg libnotify --pkg gtksourceview-3.0  --pkg  libwnck-3.0 \
    /tmp/DialogConfirm.vala  -o /tmp/DialogConfirm
*/
/* -- to test class
static int main (string[] args) {
    Gtk.init (ref args);
    new Xcls_MessageDialog1();
    DialogConfirm.show_all();
     Gtk.main ();
    return 0;
}
*/

#include <glib.h>
#include <glib-object.h>
#include <gtk/gtk.h>
#include <gdk/gdk.h>
#include <stdlib.h>
#include <string.h>
#include <gobject/gvaluecollector.h>


#define TYPE_XCLS_MESSAGEDIALOG1 (xcls_messagedialog1_get_type ())
#define XCLS_MESSAGEDIALOG1(obj) (G_TYPE_CHECK_INSTANCE_CAST ((obj), TYPE_XCLS_MESSAGEDIALOG1, Xcls_MessageDialog1))
#define XCLS_MESSAGEDIALOG1_CLASS(klass) (G_TYPE_CHECK_CLASS_CAST ((klass), TYPE_XCLS_MESSAGEDIALOG1, Xcls_MessageDialog1Class))
#define IS_XCLS_MESSAGEDIALOG1(obj) (G_TYPE_CHECK_INSTANCE_TYPE ((obj), TYPE_XCLS_MESSAGEDIALOG1))
#define IS_XCLS_MESSAGEDIALOG1_CLASS(klass) (G_TYPE_CHECK_CLASS_TYPE ((klass), TYPE_XCLS_MESSAGEDIALOG1))
#define XCLS_MESSAGEDIALOG1_GET_CLASS(obj) (G_TYPE_INSTANCE_GET_CLASS ((obj), TYPE_XCLS_MESSAGEDIALOG1, Xcls_MessageDialog1Class))

typedef struct _Xcls_MessageDialog1 Xcls_MessageDialog1;
typedef struct _Xcls_MessageDialog1Class Xcls_MessageDialog1Class;
typedef struct _Xcls_MessageDialog1Private Xcls_MessageDialog1Private;
#define _g_object_unref0(var) ((var == NULL) ? NULL : (var = (g_object_unref (var), NULL)))
#define _xcls_messagedialog1_unref0(var) ((var == NULL) ? NULL : (var = (xcls_messagedialog1_unref (var), NULL)))
typedef struct _ParamSpecXcls_MessageDialog1 ParamSpecXcls_MessageDialog1;

struct _Xcls_MessageDialog1 {
	GTypeInstance parent_instance;
	volatile int ref_count;
	Xcls_MessageDialog1Private * priv;
	GtkMessageDialog* el;
};

struct _Xcls_MessageDialog1Class {
	GTypeClass parent_class;
	void (*finalize) (Xcls_MessageDialog1 *self);
};

struct _ParamSpecXcls_MessageDialog1 {
	GParamSpec parent_instance;
};


extern Xcls_MessageDialog1* DialogConfirm;
Xcls_MessageDialog1* DialogConfirm = NULL;
static gpointer xcls_messagedialog1_parent_class = NULL;
static Xcls_MessageDialog1* xcls_messagedialog1__this;
static Xcls_MessageDialog1* xcls_messagedialog1__this = NULL;

gpointer xcls_messagedialog1_ref (gpointer instance);
void xcls_messagedialog1_unref (gpointer instance);
GParamSpec* param_spec_xcls_messagedialog1 (const gchar* name, const gchar* nick, const gchar* blurb, GType object_type, GParamFlags flags);
void value_set_xcls_messagedialog1 (GValue* value, gpointer v_object);
void value_take_xcls_messagedialog1 (GValue* value, gpointer v_object);
gpointer value_get_xcls_messagedialog1 (const GValue* value);
GType xcls_messagedialog1_get_type (void) G_GNUC_CONST;
enum  {
	XCLS_MESSAGEDIALOG1_DUMMY_PROPERTY
};
Xcls_MessageDialog1* xcls_messagedialog1_new (void);
Xcls_MessageDialog1* xcls_messagedialog1_construct (GType object_type);
static gboolean __lambda33_ (Xcls_MessageDialog1* self, GdkEventAny* event);
static gboolean ___lambda33__gtk_widget_delete_event (GtkWidget* _sender, GdkEventAny* event, gpointer self);
void xcls_messagedialog1_show_all (Xcls_MessageDialog1* self);
void xcls_messagedialog1_show (Xcls_MessageDialog1* self, const gchar* msg);
static void xcls_messagedialog1_finalize (Xcls_MessageDialog1* obj);


static gpointer _xcls_messagedialog1_ref0 (gpointer self) {
#line 32 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	return self ? xcls_messagedialog1_ref (self) : NULL;
#line 87 "DialogConfirm.vala.c"
}


static gboolean __lambda33_ (Xcls_MessageDialog1* self, GdkEventAny* event) {
	gboolean result = FALSE;
	GtkMessageDialog* _tmp0_;
#line 43 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	g_return_val_if_fail (event != NULL, FALSE);
#line 44 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	_tmp0_ = self->el;
#line 44 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	gtk_widget_hide ((GtkWidget*) _tmp0_);
#line 45 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	result = TRUE;
#line 45 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	return result;
#line 104 "DialogConfirm.vala.c"
}


static gboolean ___lambda33__gtk_widget_delete_event (GtkWidget* _sender, GdkEventAny* event, gpointer self) {
	gboolean result;
	result = __lambda33_ (self, event);
#line 43 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	return result;
#line 113 "DialogConfirm.vala.c"
}


Xcls_MessageDialog1* xcls_messagedialog1_construct (GType object_type) {
	Xcls_MessageDialog1* self = NULL;
	GtkMessageDialog* _tmp0_;
	Xcls_MessageDialog1* _tmp1_;
	Xcls_MessageDialog1* _tmp2_;
	GtkMessageDialog* _tmp3_;
	GtkMessageDialog* _tmp4_;
	GtkMessageDialog* _tmp5_;
	GtkMessageDialog* _tmp6_;
#line 29 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	self = (Xcls_MessageDialog1*) g_type_create_instance (object_type);
#line 31 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	_tmp0_ = (GtkMessageDialog*) gtk_message_dialog_new (NULL, GTK_DIALOG_MODAL, GTK_MESSAGE_QUESTION, GTK_BUTTONS_YES_NO, "Tests");
#line 31 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	g_object_ref_sink (_tmp0_);
#line 31 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	_g_object_unref0 (self->el);
#line 31 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	self->el = _tmp0_;
#line 32 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	_tmp1_ = _xcls_messagedialog1_ref0 (self);
#line 32 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	_xcls_messagedialog1_unref0 (xcls_messagedialog1__this);
#line 32 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	xcls_messagedialog1__this = _tmp1_;
#line 33 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	_tmp2_ = _xcls_messagedialog1_ref0 (self);
#line 33 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	_xcls_messagedialog1_unref0 (DialogConfirm);
#line 33 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	DialogConfirm = _tmp2_;
#line 38 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	_tmp3_ = self->el;
#line 38 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	gtk_window_set_modal ((GtkWindow*) _tmp3_, TRUE);
#line 39 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	_tmp4_ = self->el;
#line 39 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	gtk_window_set_title ((GtkWindow*) _tmp4_, "Please Confirm d");
#line 40 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	_tmp5_ = self->el;
#line 40 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	g_object_set (_tmp5_, "use-markup", TRUE, NULL);
#line 43 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	_tmp6_ = self->el;
#line 43 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	g_signal_connect ((GtkWidget*) _tmp6_, "delete-event", (GCallback) ___lambda33__gtk_widget_delete_event, self);
#line 29 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	return self;
#line 166 "DialogConfirm.vala.c"
}


Xcls_MessageDialog1* xcls_messagedialog1_new (void) {
#line 29 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	return xcls_messagedialog1_construct (TYPE_XCLS_MESSAGEDIALOG1);
#line 173 "DialogConfirm.vala.c"
}


void xcls_messagedialog1_show_all (Xcls_MessageDialog1* self) {
#line 51 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	g_return_if_fail (self != NULL);
#line 52 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	xcls_messagedialog1_show (self, "test");
#line 182 "DialogConfirm.vala.c"
}


void xcls_messagedialog1_show (Xcls_MessageDialog1* self, const gchar* msg) {
	GtkMessageDialog* _tmp0_;
	const gchar* _tmp1_;
	GtkMessageDialog* _tmp2_;
#line 69 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	g_return_if_fail (self != NULL);
#line 69 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	g_return_if_fail (msg != NULL);
#line 72 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	_tmp0_ = self->el;
#line 72 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	_tmp1_ = msg;
#line 72 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	g_object_set (_tmp0_, "text", _tmp1_, NULL);
#line 73 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	_tmp2_ = self->el;
#line 73 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	gtk_widget_show_all ((GtkWidget*) _tmp2_);
#line 204 "DialogConfirm.vala.c"
}


static void value_xcls_messagedialog1_init (GValue* value) {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	value->data[0].v_pointer = NULL;
#line 211 "DialogConfirm.vala.c"
}


static void value_xcls_messagedialog1_free_value (GValue* value) {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	if (value->data[0].v_pointer) {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
		xcls_messagedialog1_unref (value->data[0].v_pointer);
#line 220 "DialogConfirm.vala.c"
	}
}


static void value_xcls_messagedialog1_copy_value (const GValue* src_value, GValue* dest_value) {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	if (src_value->data[0].v_pointer) {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
		dest_value->data[0].v_pointer = xcls_messagedialog1_ref (src_value->data[0].v_pointer);
#line 230 "DialogConfirm.vala.c"
	} else {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
		dest_value->data[0].v_pointer = NULL;
#line 234 "DialogConfirm.vala.c"
	}
}


static gpointer value_xcls_messagedialog1_peek_pointer (const GValue* value) {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	return value->data[0].v_pointer;
#line 242 "DialogConfirm.vala.c"
}


static gchar* value_xcls_messagedialog1_collect_value (GValue* value, guint n_collect_values, GTypeCValue* collect_values, guint collect_flags) {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	if (collect_values[0].v_pointer) {
#line 249 "DialogConfirm.vala.c"
		Xcls_MessageDialog1* object;
		object = collect_values[0].v_pointer;
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
		if (object->parent_instance.g_class == NULL) {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
			return g_strconcat ("invalid unclassed object pointer for value type `", G_VALUE_TYPE_NAME (value), "'", NULL);
#line 256 "DialogConfirm.vala.c"
		} else if (!g_value_type_compatible (G_TYPE_FROM_INSTANCE (object), G_VALUE_TYPE (value))) {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
			return g_strconcat ("invalid object type `", g_type_name (G_TYPE_FROM_INSTANCE (object)), "' for value type `", G_VALUE_TYPE_NAME (value), "'", NULL);
#line 260 "DialogConfirm.vala.c"
		}
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
		value->data[0].v_pointer = xcls_messagedialog1_ref (object);
#line 264 "DialogConfirm.vala.c"
	} else {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
		value->data[0].v_pointer = NULL;
#line 268 "DialogConfirm.vala.c"
	}
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	return NULL;
#line 272 "DialogConfirm.vala.c"
}


static gchar* value_xcls_messagedialog1_lcopy_value (const GValue* value, guint n_collect_values, GTypeCValue* collect_values, guint collect_flags) {
	Xcls_MessageDialog1** object_p;
	object_p = collect_values[0].v_pointer;
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	if (!object_p) {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
		return g_strdup_printf ("value location for `%s' passed as NULL", G_VALUE_TYPE_NAME (value));
#line 283 "DialogConfirm.vala.c"
	}
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	if (!value->data[0].v_pointer) {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
		*object_p = NULL;
#line 289 "DialogConfirm.vala.c"
	} else if (collect_flags & G_VALUE_NOCOPY_CONTENTS) {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
		*object_p = value->data[0].v_pointer;
#line 293 "DialogConfirm.vala.c"
	} else {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
		*object_p = xcls_messagedialog1_ref (value->data[0].v_pointer);
#line 297 "DialogConfirm.vala.c"
	}
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	return NULL;
#line 301 "DialogConfirm.vala.c"
}


GParamSpec* param_spec_xcls_messagedialog1 (const gchar* name, const gchar* nick, const gchar* blurb, GType object_type, GParamFlags flags) {
	ParamSpecXcls_MessageDialog1* spec;
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	g_return_val_if_fail (g_type_is_a (object_type, TYPE_XCLS_MESSAGEDIALOG1), NULL);
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	spec = g_param_spec_internal (G_TYPE_PARAM_OBJECT, name, nick, blurb, flags);
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	G_PARAM_SPEC (spec)->value_type = object_type;
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	return G_PARAM_SPEC (spec);
#line 315 "DialogConfirm.vala.c"
}


gpointer value_get_xcls_messagedialog1 (const GValue* value) {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	g_return_val_if_fail (G_TYPE_CHECK_VALUE_TYPE (value, TYPE_XCLS_MESSAGEDIALOG1), NULL);
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	return value->data[0].v_pointer;
#line 324 "DialogConfirm.vala.c"
}


void value_set_xcls_messagedialog1 (GValue* value, gpointer v_object) {
	Xcls_MessageDialog1* old;
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	g_return_if_fail (G_TYPE_CHECK_VALUE_TYPE (value, TYPE_XCLS_MESSAGEDIALOG1));
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	old = value->data[0].v_pointer;
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	if (v_object) {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
		g_return_if_fail (G_TYPE_CHECK_INSTANCE_TYPE (v_object, TYPE_XCLS_MESSAGEDIALOG1));
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
		g_return_if_fail (g_value_type_compatible (G_TYPE_FROM_INSTANCE (v_object), G_VALUE_TYPE (value)));
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
		value->data[0].v_pointer = v_object;
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
		xcls_messagedialog1_ref (value->data[0].v_pointer);
#line 344 "DialogConfirm.vala.c"
	} else {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
		value->data[0].v_pointer = NULL;
#line 348 "DialogConfirm.vala.c"
	}
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	if (old) {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
		xcls_messagedialog1_unref (old);
#line 354 "DialogConfirm.vala.c"
	}
}


void value_take_xcls_messagedialog1 (GValue* value, gpointer v_object) {
	Xcls_MessageDialog1* old;
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	g_return_if_fail (G_TYPE_CHECK_VALUE_TYPE (value, TYPE_XCLS_MESSAGEDIALOG1));
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	old = value->data[0].v_pointer;
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	if (v_object) {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
		g_return_if_fail (G_TYPE_CHECK_INSTANCE_TYPE (v_object, TYPE_XCLS_MESSAGEDIALOG1));
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
		g_return_if_fail (g_value_type_compatible (G_TYPE_FROM_INSTANCE (v_object), G_VALUE_TYPE (value)));
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
		value->data[0].v_pointer = v_object;
#line 373 "DialogConfirm.vala.c"
	} else {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
		value->data[0].v_pointer = NULL;
#line 377 "DialogConfirm.vala.c"
	}
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	if (old) {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
		xcls_messagedialog1_unref (old);
#line 383 "DialogConfirm.vala.c"
	}
}


static void xcls_messagedialog1_class_init (Xcls_MessageDialog1Class * klass) {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	xcls_messagedialog1_parent_class = g_type_class_peek_parent (klass);
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	XCLS_MESSAGEDIALOG1_CLASS (klass)->finalize = xcls_messagedialog1_finalize;
#line 393 "DialogConfirm.vala.c"
}


static void xcls_messagedialog1_instance_init (Xcls_MessageDialog1 * self) {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	self->ref_count = 1;
#line 400 "DialogConfirm.vala.c"
}


static void xcls_messagedialog1_finalize (Xcls_MessageDialog1* obj) {
	Xcls_MessageDialog1 * self;
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	self = G_TYPE_CHECK_INSTANCE_CAST (obj, TYPE_XCLS_MESSAGEDIALOG1, Xcls_MessageDialog1);
#line 22 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	_g_object_unref0 (self->el);
#line 410 "DialogConfirm.vala.c"
}


GType xcls_messagedialog1_get_type (void) {
	static volatile gsize xcls_messagedialog1_type_id__volatile = 0;
	if (g_once_init_enter (&xcls_messagedialog1_type_id__volatile)) {
		static const GTypeValueTable g_define_type_value_table = { value_xcls_messagedialog1_init, value_xcls_messagedialog1_free_value, value_xcls_messagedialog1_copy_value, value_xcls_messagedialog1_peek_pointer, "p", value_xcls_messagedialog1_collect_value, "p", value_xcls_messagedialog1_lcopy_value };
		static const GTypeInfo g_define_type_info = { sizeof (Xcls_MessageDialog1Class), (GBaseInitFunc) NULL, (GBaseFinalizeFunc) NULL, (GClassInitFunc) xcls_messagedialog1_class_init, (GClassFinalizeFunc) NULL, NULL, sizeof (Xcls_MessageDialog1), 0, (GInstanceInitFunc) xcls_messagedialog1_instance_init, &g_define_type_value_table };
		static const GTypeFundamentalInfo g_define_type_fundamental_info = { (G_TYPE_FLAG_CLASSED | G_TYPE_FLAG_INSTANTIATABLE | G_TYPE_FLAG_DERIVABLE | G_TYPE_FLAG_DEEP_DERIVABLE) };
		GType xcls_messagedialog1_type_id;
		xcls_messagedialog1_type_id = g_type_register_fundamental (g_type_fundamental_next (), "Xcls_MessageDialog1", &g_define_type_info, &g_define_type_fundamental_info, 0);
		g_once_init_leave (&xcls_messagedialog1_type_id__volatile, xcls_messagedialog1_type_id);
	}
	return xcls_messagedialog1_type_id__volatile;
}


gpointer xcls_messagedialog1_ref (gpointer instance) {
	Xcls_MessageDialog1* self;
	self = instance;
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	g_atomic_int_inc (&self->ref_count);
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	return instance;
#line 435 "DialogConfirm.vala.c"
}


void xcls_messagedialog1_unref (gpointer instance) {
	Xcls_MessageDialog1* self;
	self = instance;
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	if (g_atomic_int_dec_and_test (&self->ref_count)) {
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
		XCLS_MESSAGEDIALOG1_GET_CLASS (self)->finalize (self);
#line 20 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
		g_type_free_instance ((GTypeInstance *) self);
#line 448 "DialogConfirm.vala.c"
	}
}



