/* DialogConfirm.vala.c generated by valac 0.20.1, the Vala compiler
 * generated from DialogConfirm.vala, do not modify */


#include <glib.h>
#include <glib-object.h>
#include <gtk/gtk.h>
#include <gdk/gdk.h>
#include <stdlib.h>
#include <string.h>


#define TYPE_DIALOG_CONFIRM (dialog_confirm_get_type ())
#define DIALOG_CONFIRM(obj) (G_TYPE_CHECK_INSTANCE_CAST ((obj), TYPE_DIALOG_CONFIRM, DialogConfirm))
#define DIALOG_CONFIRM_CLASS(klass) (G_TYPE_CHECK_CLASS_CAST ((klass), TYPE_DIALOG_CONFIRM, DialogConfirmClass))
#define IS_DIALOG_CONFIRM(obj) (G_TYPE_CHECK_INSTANCE_TYPE ((obj), TYPE_DIALOG_CONFIRM))
#define IS_DIALOG_CONFIRM_CLASS(klass) (G_TYPE_CHECK_CLASS_TYPE ((klass), TYPE_DIALOG_CONFIRM))
#define DIALOG_CONFIRM_GET_CLASS(obj) (G_TYPE_INSTANCE_GET_CLASS ((obj), TYPE_DIALOG_CONFIRM, DialogConfirmClass))

typedef struct _DialogConfirm DialogConfirm;
typedef struct _DialogConfirmClass DialogConfirmClass;
typedef struct _DialogConfirmPrivate DialogConfirmPrivate;
#define _g_object_unref0(var) ((var == NULL) ? NULL : (var = (g_object_unref (var), NULL)))

struct _DialogConfirm {
	GObject parent_instance;
	DialogConfirmPrivate * priv;
	GtkMessageDialog* el;
};

struct _DialogConfirmClass {
	GObjectClass parent_class;
};

struct _DialogConfirmPrivate {
	DialogConfirm* _this;
};


extern DialogConfirm* _DialogConfirm;
DialogConfirm* _DialogConfirm = NULL;
static gpointer dialog_confirm_parent_class = NULL;

GType dialog_confirm_get_type (void) G_GNUC_CONST;
#define DIALOG_CONFIRM_GET_PRIVATE(o) (G_TYPE_INSTANCE_GET_PRIVATE ((o), TYPE_DIALOG_CONFIRM, DialogConfirmPrivate))
enum  {
	DIALOG_CONFIRM_DUMMY_PROPERTY
};
DialogConfirm* dialog_confirm_singleton (void);
DialogConfirm* dialog_confirm_new (void);
DialogConfirm* dialog_confirm_construct (GType object_type);
static gboolean __lambda12_ (DialogConfirm* self, GdkEventAny* event);
static gboolean ___lambda12__gtk_widget_delete_event (GtkWidget* _sender, GdkEventAny* event, gpointer self);
gint dialog_confirm_show (DialogConfirm* self, const gchar* title, const gchar* msg);
static void dialog_confirm_finalize (GObject* obj);


static gpointer _g_object_ref0 (gpointer self) {
#line 13 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	return self ? g_object_ref (self) : NULL;
#line 62 "DialogConfirm.vala.c"
}


DialogConfirm* dialog_confirm_singleton (void) {
	DialogConfirm* result = NULL;
	DialogConfirm* _tmp0_;
	DialogConfirm* _tmp2_;
	DialogConfirm* _tmp3_;
#line 10 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	_tmp0_ = _DialogConfirm;
#line 10 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	if (_tmp0_ == NULL) {
#line 75 "DialogConfirm.vala.c"
		DialogConfirm* _tmp1_;
#line 11 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
		_tmp1_ = dialog_confirm_new ();
#line 11 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
		_g_object_unref0 (_DialogConfirm);
#line 11 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
		_DialogConfirm = _tmp1_;
#line 83 "DialogConfirm.vala.c"
	}
#line 13 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	_tmp2_ = _DialogConfirm;
#line 13 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	_tmp3_ = _g_object_ref0 (_tmp2_);
#line 13 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	result = _tmp3_;
#line 13 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	return result;
#line 93 "DialogConfirm.vala.c"
}


static gboolean __lambda12_ (DialogConfirm* self, GdkEventAny* event) {
	gboolean result = FALSE;
	GtkMessageDialog* _tmp0_;
	GtkMessageDialog* _tmp1_;
#line 33 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	g_return_val_if_fail (event != NULL, FALSE);
#line 34 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	_tmp0_ = self->el;
#line 34 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	gtk_dialog_response ((GtkDialog*) _tmp0_, (gint) GTK_RESPONSE_CANCEL);
#line 35 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	_tmp1_ = self->el;
#line 35 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	gtk_widget_hide ((GtkWidget*) _tmp1_);
#line 36 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	result = TRUE;
#line 36 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	return result;
#line 115 "DialogConfirm.vala.c"
}


static gboolean ___lambda12__gtk_widget_delete_event (GtkWidget* _sender, GdkEventAny* event, gpointer self) {
	gboolean result;
	result = __lambda12_ (self, event);
#line 33 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	return result;
#line 124 "DialogConfirm.vala.c"
}


DialogConfirm* dialog_confirm_construct (GType object_type) {
	DialogConfirm * self = NULL;
	DialogConfirm* _tmp0_;
	GtkMessageDialog* _tmp1_;
	GtkMessageDialog* _tmp2_;
	GtkMessageDialog* _tmp3_;
	GtkMessageDialog* _tmp4_;
	GtkMessageDialog* _tmp5_;
	GtkMessageDialog* _tmp6_;
#line 19 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	self = (DialogConfirm*) g_object_new (object_type, NULL);
#line 21 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	_tmp0_ = _g_object_ref0 (self);
#line 21 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	_g_object_unref0 (self->priv->_this);
#line 21 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	self->priv->_this = _tmp0_;
#line 22 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	_tmp1_ = (GtkMessageDialog*) gtk_message_dialog_new (NULL, GTK_DIALOG_MODAL, GTK_MESSAGE_QUESTION, GTK_BUTTONS_YES_NO, "Tests", NULL);
#line 22 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	g_object_ref_sink (_tmp1_);
#line 22 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	_g_object_unref0 (self->el);
#line 22 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	self->el = _tmp1_;
#line 27 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	_tmp2_ = self->el;
#line 27 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	gtk_window_set_title ((GtkWindow*) _tmp2_, "Please Confirm d");
#line 28 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	_tmp3_ = self->el;
#line 28 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	gtk_widget_set_name ((GtkWidget*) _tmp3_, "DialogConfirm");
#line 29 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	_tmp4_ = self->el;
#line 29 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	gtk_window_set_modal ((GtkWindow*) _tmp4_, TRUE);
#line 30 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	_tmp5_ = self->el;
#line 30 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	g_object_set (_tmp5_, "use-markup", TRUE, NULL);
#line 33 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	_tmp6_ = self->el;
#line 33 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	g_signal_connect_object ((GtkWidget*) _tmp6_, "delete-event", (GCallback) ___lambda12__gtk_widget_delete_event, self, 0);
#line 19 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	return self;
#line 175 "DialogConfirm.vala.c"
}


DialogConfirm* dialog_confirm_new (void) {
#line 19 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	return dialog_confirm_construct (TYPE_DIALOG_CONFIRM);
#line 182 "DialogConfirm.vala.c"
}


gint dialog_confirm_show (DialogConfirm* self, const gchar* title, const gchar* msg) {
	gint result = 0;
	GtkMessageDialog* _tmp0_;
	const gchar* _tmp1_;
	GtkMessageDialog* _tmp2_;
	const gchar* _tmp3_;
	GtkMessageDialog* _tmp4_;
	GtkMessageDialog* _tmp5_;
	gint _tmp6_ = 0;
	gint ret;
	GtkMessageDialog* _tmp7_;
#line 42 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	g_return_val_if_fail (self != NULL, 0);
#line 42 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	g_return_val_if_fail (title != NULL, 0);
#line 42 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	g_return_val_if_fail (msg != NULL, 0);
#line 45 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	_tmp0_ = self->el;
#line 45 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	_tmp1_ = title;
#line 45 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	gtk_window_set_title ((GtkWindow*) _tmp0_, _tmp1_);
#line 46 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	_tmp2_ = self->el;
#line 46 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	_tmp3_ = msg;
#line 46 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	g_object_set (_tmp2_, "text", _tmp3_, NULL);
#line 47 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	_tmp4_ = self->el;
#line 47 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	gtk_widget_show_all ((GtkWidget*) _tmp4_);
#line 48 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	_tmp5_ = self->el;
#line 48 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	_tmp6_ = gtk_dialog_run ((GtkDialog*) _tmp5_);
#line 48 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	ret = _tmp6_;
#line 50 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	_tmp7_ = self->el;
#line 50 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	gtk_widget_hide ((GtkWidget*) _tmp7_);
#line 51 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	result = ret;
#line 51 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	return result;
#line 233 "DialogConfirm.vala.c"
}


static void dialog_confirm_class_init (DialogConfirmClass * klass) {
#line 3 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	dialog_confirm_parent_class = g_type_class_peek_parent (klass);
#line 3 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	g_type_class_add_private (klass, sizeof (DialogConfirmPrivate));
#line 3 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	G_OBJECT_CLASS (klass)->finalize = dialog_confirm_finalize;
#line 244 "DialogConfirm.vala.c"
}


static void dialog_confirm_instance_init (DialogConfirm * self) {
#line 3 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	self->priv = DIALOG_CONFIRM_GET_PRIVATE (self);
#line 251 "DialogConfirm.vala.c"
}


static void dialog_confirm_finalize (GObject* obj) {
	DialogConfirm * self;
#line 3 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	self = G_TYPE_CHECK_INSTANCE_CAST (obj, TYPE_DIALOG_CONFIRM, DialogConfirm);
#line 5 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	_g_object_unref0 (self->el);
#line 6 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	_g_object_unref0 (self->priv->_this);
#line 3 "/home/alan/gitlive/app.Builder.js/Builder4/DialogConfirm.vala"
	G_OBJECT_CLASS (dialog_confirm_parent_class)->finalize (obj);
#line 265 "DialogConfirm.vala.c"
}


GType dialog_confirm_get_type (void) {
	static volatile gsize dialog_confirm_type_id__volatile = 0;
	if (g_once_init_enter (&dialog_confirm_type_id__volatile)) {
		static const GTypeInfo g_define_type_info = { sizeof (DialogConfirmClass), (GBaseInitFunc) NULL, (GBaseFinalizeFunc) NULL, (GClassInitFunc) dialog_confirm_class_init, (GClassFinalizeFunc) NULL, NULL, sizeof (DialogConfirm), 0, (GInstanceInitFunc) dialog_confirm_instance_init, NULL };
		GType dialog_confirm_type_id;
		dialog_confirm_type_id = g_type_register_static (G_TYPE_OBJECT, "DialogConfirm", &g_define_type_info, 0);
		g_once_init_leave (&dialog_confirm_type_id__volatile, dialog_confirm_type_id);
	}
	return dialog_confirm_type_id__volatile;
}



