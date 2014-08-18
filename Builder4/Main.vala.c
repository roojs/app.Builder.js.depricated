/* Main.vala.c generated by valac 0.24.0, the Vala compiler
 * generated from Main.vala, do not modify */


#include <glib.h>
#include <glib-object.h>
#include <stdlib.h>
#include <string.h>
#include <gtk/gtk.h>
#include <clutter-gtk/clutter-gtk.h>


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

#define TYPE_XCLS_MAINWINDOW (xcls_mainwindow_get_type ())
#define XCLS_MAINWINDOW(obj) (G_TYPE_CHECK_INSTANCE_CAST ((obj), TYPE_XCLS_MAINWINDOW, Xcls_MainWindow))
#define XCLS_MAINWINDOW_CLASS(klass) (G_TYPE_CHECK_CLASS_CAST ((klass), TYPE_XCLS_MAINWINDOW, Xcls_MainWindowClass))
#define IS_XCLS_MAINWINDOW(obj) (G_TYPE_CHECK_INSTANCE_TYPE ((obj), TYPE_XCLS_MAINWINDOW))
#define IS_XCLS_MAINWINDOW_CLASS(klass) (G_TYPE_CHECK_CLASS_TYPE ((klass), TYPE_XCLS_MAINWINDOW))
#define XCLS_MAINWINDOW_GET_CLASS(obj) (G_TYPE_INSTANCE_GET_CLASS ((obj), TYPE_XCLS_MAINWINDOW, Xcls_MainWindowClass))

typedef struct _Xcls_MainWindow Xcls_MainWindow;
typedef struct _Xcls_MainWindowClass Xcls_MainWindowClass;
typedef struct _Xcls_MainWindowPrivate Xcls_MainWindowPrivate;

#define XCLS_MAINWINDOW_TYPE_XCLS_VBOX (xcls_mainwindow_xcls_vbox_get_type ())
#define XCLS_MAINWINDOW_XCLS_VBOX(obj) (G_TYPE_CHECK_INSTANCE_CAST ((obj), XCLS_MAINWINDOW_TYPE_XCLS_VBOX, Xcls_MainWindowXcls_vbox))
#define XCLS_MAINWINDOW_XCLS_VBOX_CLASS(klass) (G_TYPE_CHECK_CLASS_CAST ((klass), XCLS_MAINWINDOW_TYPE_XCLS_VBOX, Xcls_MainWindowXcls_vboxClass))
#define XCLS_MAINWINDOW_IS_XCLS_VBOX(obj) (G_TYPE_CHECK_INSTANCE_TYPE ((obj), XCLS_MAINWINDOW_TYPE_XCLS_VBOX))
#define XCLS_MAINWINDOW_IS_XCLS_VBOX_CLASS(klass) (G_TYPE_CHECK_CLASS_TYPE ((klass), XCLS_MAINWINDOW_TYPE_XCLS_VBOX))
#define XCLS_MAINWINDOW_XCLS_VBOX_GET_CLASS(obj) (G_TYPE_INSTANCE_GET_CLASS ((obj), XCLS_MAINWINDOW_TYPE_XCLS_VBOX, Xcls_MainWindowXcls_vboxClass))

typedef struct _Xcls_MainWindowXcls_vbox Xcls_MainWindowXcls_vbox;
typedef struct _Xcls_MainWindowXcls_vboxClass Xcls_MainWindowXcls_vboxClass;

#define XCLS_MAINWINDOW_TYPE_XCLS_TOPBAR (xcls_mainwindow_xcls_topbar_get_type ())
#define XCLS_MAINWINDOW_XCLS_TOPBAR(obj) (G_TYPE_CHECK_INSTANCE_CAST ((obj), XCLS_MAINWINDOW_TYPE_XCLS_TOPBAR, Xcls_MainWindowXcls_topbar))
#define XCLS_MAINWINDOW_XCLS_TOPBAR_CLASS(klass) (G_TYPE_CHECK_CLASS_CAST ((klass), XCLS_MAINWINDOW_TYPE_XCLS_TOPBAR, Xcls_MainWindowXcls_topbarClass))
#define XCLS_MAINWINDOW_IS_XCLS_TOPBAR(obj) (G_TYPE_CHECK_INSTANCE_TYPE ((obj), XCLS_MAINWINDOW_TYPE_XCLS_TOPBAR))
#define XCLS_MAINWINDOW_IS_XCLS_TOPBAR_CLASS(klass) (G_TYPE_CHECK_CLASS_TYPE ((klass), XCLS_MAINWINDOW_TYPE_XCLS_TOPBAR))
#define XCLS_MAINWINDOW_XCLS_TOPBAR_GET_CLASS(obj) (G_TYPE_INSTANCE_GET_CLASS ((obj), XCLS_MAINWINDOW_TYPE_XCLS_TOPBAR, Xcls_MainWindowXcls_topbarClass))

typedef struct _Xcls_MainWindowXcls_topbar Xcls_MainWindowXcls_topbar;
typedef struct _Xcls_MainWindowXcls_topbarClass Xcls_MainWindowXcls_topbarClass;

#define XCLS_MAINWINDOW_TYPE_XCLS_MAINPANE (xcls_mainwindow_xcls_mainpane_get_type ())
#define XCLS_MAINWINDOW_XCLS_MAINPANE(obj) (G_TYPE_CHECK_INSTANCE_CAST ((obj), XCLS_MAINWINDOW_TYPE_XCLS_MAINPANE, Xcls_MainWindowXcls_mainpane))
#define XCLS_MAINWINDOW_XCLS_MAINPANE_CLASS(klass) (G_TYPE_CHECK_CLASS_CAST ((klass), XCLS_MAINWINDOW_TYPE_XCLS_MAINPANE, Xcls_MainWindowXcls_mainpaneClass))
#define XCLS_MAINWINDOW_IS_XCLS_MAINPANE(obj) (G_TYPE_CHECK_INSTANCE_TYPE ((obj), XCLS_MAINWINDOW_TYPE_XCLS_MAINPANE))
#define XCLS_MAINWINDOW_IS_XCLS_MAINPANE_CLASS(klass) (G_TYPE_CHECK_CLASS_TYPE ((klass), XCLS_MAINWINDOW_TYPE_XCLS_MAINPANE))
#define XCLS_MAINWINDOW_XCLS_MAINPANE_GET_CLASS(obj) (G_TYPE_INSTANCE_GET_CLASS ((obj), XCLS_MAINWINDOW_TYPE_XCLS_MAINPANE, Xcls_MainWindowXcls_mainpaneClass))

typedef struct _Xcls_MainWindowXcls_mainpane Xcls_MainWindowXcls_mainpane;
typedef struct _Xcls_MainWindowXcls_mainpaneClass Xcls_MainWindowXcls_mainpaneClass;

#define XCLS_MAINWINDOW_TYPE_XCLS_LEFTPANE (xcls_mainwindow_xcls_leftpane_get_type ())
#define XCLS_MAINWINDOW_XCLS_LEFTPANE(obj) (G_TYPE_CHECK_INSTANCE_CAST ((obj), XCLS_MAINWINDOW_TYPE_XCLS_LEFTPANE, Xcls_MainWindowXcls_leftpane))
#define XCLS_MAINWINDOW_XCLS_LEFTPANE_CLASS(klass) (G_TYPE_CHECK_CLASS_CAST ((klass), XCLS_MAINWINDOW_TYPE_XCLS_LEFTPANE, Xcls_MainWindowXcls_leftpaneClass))
#define XCLS_MAINWINDOW_IS_XCLS_LEFTPANE(obj) (G_TYPE_CHECK_INSTANCE_TYPE ((obj), XCLS_MAINWINDOW_TYPE_XCLS_LEFTPANE))
#define XCLS_MAINWINDOW_IS_XCLS_LEFTPANE_CLASS(klass) (G_TYPE_CHECK_CLASS_TYPE ((klass), XCLS_MAINWINDOW_TYPE_XCLS_LEFTPANE))
#define XCLS_MAINWINDOW_XCLS_LEFTPANE_GET_CLASS(obj) (G_TYPE_INSTANCE_GET_CLASS ((obj), XCLS_MAINWINDOW_TYPE_XCLS_LEFTPANE, Xcls_MainWindowXcls_leftpaneClass))

typedef struct _Xcls_MainWindowXcls_leftpane Xcls_MainWindowXcls_leftpane;
typedef struct _Xcls_MainWindowXcls_leftpaneClass Xcls_MainWindowXcls_leftpaneClass;

#define XCLS_MAINWINDOW_TYPE_XCLS_EDITPANE (xcls_mainwindow_xcls_editpane_get_type ())
#define XCLS_MAINWINDOW_XCLS_EDITPANE(obj) (G_TYPE_CHECK_INSTANCE_CAST ((obj), XCLS_MAINWINDOW_TYPE_XCLS_EDITPANE, Xcls_MainWindowXcls_editpane))
#define XCLS_MAINWINDOW_XCLS_EDITPANE_CLASS(klass) (G_TYPE_CHECK_CLASS_CAST ((klass), XCLS_MAINWINDOW_TYPE_XCLS_EDITPANE, Xcls_MainWindowXcls_editpaneClass))
#define XCLS_MAINWINDOW_IS_XCLS_EDITPANE(obj) (G_TYPE_CHECK_INSTANCE_TYPE ((obj), XCLS_MAINWINDOW_TYPE_XCLS_EDITPANE))
#define XCLS_MAINWINDOW_IS_XCLS_EDITPANE_CLASS(klass) (G_TYPE_CHECK_CLASS_TYPE ((klass), XCLS_MAINWINDOW_TYPE_XCLS_EDITPANE))
#define XCLS_MAINWINDOW_XCLS_EDITPANE_GET_CLASS(obj) (G_TYPE_INSTANCE_GET_CLASS ((obj), XCLS_MAINWINDOW_TYPE_XCLS_EDITPANE, Xcls_MainWindowXcls_editpaneClass))

typedef struct _Xcls_MainWindowXcls_editpane Xcls_MainWindowXcls_editpane;
typedef struct _Xcls_MainWindowXcls_editpaneClass Xcls_MainWindowXcls_editpaneClass;

#define XCLS_MAINWINDOW_TYPE_XCLS_TREE (xcls_mainwindow_xcls_tree_get_type ())
#define XCLS_MAINWINDOW_XCLS_TREE(obj) (G_TYPE_CHECK_INSTANCE_CAST ((obj), XCLS_MAINWINDOW_TYPE_XCLS_TREE, Xcls_MainWindowXcls_tree))
#define XCLS_MAINWINDOW_XCLS_TREE_CLASS(klass) (G_TYPE_CHECK_CLASS_CAST ((klass), XCLS_MAINWINDOW_TYPE_XCLS_TREE, Xcls_MainWindowXcls_treeClass))
#define XCLS_MAINWINDOW_IS_XCLS_TREE(obj) (G_TYPE_CHECK_INSTANCE_TYPE ((obj), XCLS_MAINWINDOW_TYPE_XCLS_TREE))
#define XCLS_MAINWINDOW_IS_XCLS_TREE_CLASS(klass) (G_TYPE_CHECK_CLASS_TYPE ((klass), XCLS_MAINWINDOW_TYPE_XCLS_TREE))
#define XCLS_MAINWINDOW_XCLS_TREE_GET_CLASS(obj) (G_TYPE_INSTANCE_GET_CLASS ((obj), XCLS_MAINWINDOW_TYPE_XCLS_TREE, Xcls_MainWindowXcls_treeClass))

typedef struct _Xcls_MainWindowXcls_tree Xcls_MainWindowXcls_tree;
typedef struct _Xcls_MainWindowXcls_treeClass Xcls_MainWindowXcls_treeClass;

#define XCLS_MAINWINDOW_TYPE_XCLS_PROPS (xcls_mainwindow_xcls_props_get_type ())
#define XCLS_MAINWINDOW_XCLS_PROPS(obj) (G_TYPE_CHECK_INSTANCE_CAST ((obj), XCLS_MAINWINDOW_TYPE_XCLS_PROPS, Xcls_MainWindowXcls_props))
#define XCLS_MAINWINDOW_XCLS_PROPS_CLASS(klass) (G_TYPE_CHECK_CLASS_CAST ((klass), XCLS_MAINWINDOW_TYPE_XCLS_PROPS, Xcls_MainWindowXcls_propsClass))
#define XCLS_MAINWINDOW_IS_XCLS_PROPS(obj) (G_TYPE_CHECK_INSTANCE_TYPE ((obj), XCLS_MAINWINDOW_TYPE_XCLS_PROPS))
#define XCLS_MAINWINDOW_IS_XCLS_PROPS_CLASS(klass) (G_TYPE_CHECK_CLASS_TYPE ((klass), XCLS_MAINWINDOW_TYPE_XCLS_PROPS))
#define XCLS_MAINWINDOW_XCLS_PROPS_GET_CLASS(obj) (G_TYPE_INSTANCE_GET_CLASS ((obj), XCLS_MAINWINDOW_TYPE_XCLS_PROPS, Xcls_MainWindowXcls_propsClass))

typedef struct _Xcls_MainWindowXcls_props Xcls_MainWindowXcls_props;
typedef struct _Xcls_MainWindowXcls_propsClass Xcls_MainWindowXcls_propsClass;

#define XCLS_MAINWINDOW_TYPE_XCLS_CLUTTEREMBED (xcls_mainwindow_xcls_clutterembed_get_type ())
#define XCLS_MAINWINDOW_XCLS_CLUTTEREMBED(obj) (G_TYPE_CHECK_INSTANCE_CAST ((obj), XCLS_MAINWINDOW_TYPE_XCLS_CLUTTEREMBED, Xcls_MainWindowXcls_clutterembed))
#define XCLS_MAINWINDOW_XCLS_CLUTTEREMBED_CLASS(klass) (G_TYPE_CHECK_CLASS_CAST ((klass), XCLS_MAINWINDOW_TYPE_XCLS_CLUTTEREMBED, Xcls_MainWindowXcls_clutterembedClass))
#define XCLS_MAINWINDOW_IS_XCLS_CLUTTEREMBED(obj) (G_TYPE_CHECK_INSTANCE_TYPE ((obj), XCLS_MAINWINDOW_TYPE_XCLS_CLUTTEREMBED))
#define XCLS_MAINWINDOW_IS_XCLS_CLUTTEREMBED_CLASS(klass) (G_TYPE_CHECK_CLASS_TYPE ((klass), XCLS_MAINWINDOW_TYPE_XCLS_CLUTTEREMBED))
#define XCLS_MAINWINDOW_XCLS_CLUTTEREMBED_GET_CLASS(obj) (G_TYPE_INSTANCE_GET_CLASS ((obj), XCLS_MAINWINDOW_TYPE_XCLS_CLUTTEREMBED, Xcls_MainWindowXcls_clutterembedClass))

typedef struct _Xcls_MainWindowXcls_clutterembed Xcls_MainWindowXcls_clutterembed;
typedef struct _Xcls_MainWindowXcls_clutterembedClass Xcls_MainWindowXcls_clutterembedClass;

#define XCLS_MAINWINDOW_TYPE_XCLS_ROOVIEW (xcls_mainwindow_xcls_rooview_get_type ())
#define XCLS_MAINWINDOW_XCLS_ROOVIEW(obj) (G_TYPE_CHECK_INSTANCE_CAST ((obj), XCLS_MAINWINDOW_TYPE_XCLS_ROOVIEW, Xcls_MainWindowXcls_rooview))
#define XCLS_MAINWINDOW_XCLS_ROOVIEW_CLASS(klass) (G_TYPE_CHECK_CLASS_CAST ((klass), XCLS_MAINWINDOW_TYPE_XCLS_ROOVIEW, Xcls_MainWindowXcls_rooviewClass))
#define XCLS_MAINWINDOW_IS_XCLS_ROOVIEW(obj) (G_TYPE_CHECK_INSTANCE_TYPE ((obj), XCLS_MAINWINDOW_TYPE_XCLS_ROOVIEW))
#define XCLS_MAINWINDOW_IS_XCLS_ROOVIEW_CLASS(klass) (G_TYPE_CHECK_CLASS_TYPE ((klass), XCLS_MAINWINDOW_TYPE_XCLS_ROOVIEW))
#define XCLS_MAINWINDOW_XCLS_ROOVIEW_GET_CLASS(obj) (G_TYPE_INSTANCE_GET_CLASS ((obj), XCLS_MAINWINDOW_TYPE_XCLS_ROOVIEW, Xcls_MainWindowXcls_rooviewClass))

typedef struct _Xcls_MainWindowXcls_rooview Xcls_MainWindowXcls_rooview;
typedef struct _Xcls_MainWindowXcls_rooviewClass Xcls_MainWindowXcls_rooviewClass;

#define XCLS_MAINWINDOW_TYPE_XCLS_OBJECTVIEW (xcls_mainwindow_xcls_objectview_get_type ())
#define XCLS_MAINWINDOW_XCLS_OBJECTVIEW(obj) (G_TYPE_CHECK_INSTANCE_CAST ((obj), XCLS_MAINWINDOW_TYPE_XCLS_OBJECTVIEW, Xcls_MainWindowXcls_objectview))
#define XCLS_MAINWINDOW_XCLS_OBJECTVIEW_CLASS(klass) (G_TYPE_CHECK_CLASS_CAST ((klass), XCLS_MAINWINDOW_TYPE_XCLS_OBJECTVIEW, Xcls_MainWindowXcls_objectviewClass))
#define XCLS_MAINWINDOW_IS_XCLS_OBJECTVIEW(obj) (G_TYPE_CHECK_INSTANCE_TYPE ((obj), XCLS_MAINWINDOW_TYPE_XCLS_OBJECTVIEW))
#define XCLS_MAINWINDOW_IS_XCLS_OBJECTVIEW_CLASS(klass) (G_TYPE_CHECK_CLASS_TYPE ((klass), XCLS_MAINWINDOW_TYPE_XCLS_OBJECTVIEW))
#define XCLS_MAINWINDOW_XCLS_OBJECTVIEW_GET_CLASS(obj) (G_TYPE_INSTANCE_GET_CLASS ((obj), XCLS_MAINWINDOW_TYPE_XCLS_OBJECTVIEW, Xcls_MainWindowXcls_objectviewClass))

typedef struct _Xcls_MainWindowXcls_objectview Xcls_MainWindowXcls_objectview;
typedef struct _Xcls_MainWindowXcls_objectviewClass Xcls_MainWindowXcls_objectviewClass;

#define XCLS_MAINWINDOW_TYPE_XCLS_CODEEDITVIEW (xcls_mainwindow_xcls_codeeditview_get_type ())
#define XCLS_MAINWINDOW_XCLS_CODEEDITVIEW(obj) (G_TYPE_CHECK_INSTANCE_CAST ((obj), XCLS_MAINWINDOW_TYPE_XCLS_CODEEDITVIEW, Xcls_MainWindowXcls_codeeditview))
#define XCLS_MAINWINDOW_XCLS_CODEEDITVIEW_CLASS(klass) (G_TYPE_CHECK_CLASS_CAST ((klass), XCLS_MAINWINDOW_TYPE_XCLS_CODEEDITVIEW, Xcls_MainWindowXcls_codeeditviewClass))
#define XCLS_MAINWINDOW_IS_XCLS_CODEEDITVIEW(obj) (G_TYPE_CHECK_INSTANCE_TYPE ((obj), XCLS_MAINWINDOW_TYPE_XCLS_CODEEDITVIEW))
#define XCLS_MAINWINDOW_IS_XCLS_CODEEDITVIEW_CLASS(klass) (G_TYPE_CHECK_CLASS_TYPE ((klass), XCLS_MAINWINDOW_TYPE_XCLS_CODEEDITVIEW))
#define XCLS_MAINWINDOW_XCLS_CODEEDITVIEW_GET_CLASS(obj) (G_TYPE_INSTANCE_GET_CLASS ((obj), XCLS_MAINWINDOW_TYPE_XCLS_CODEEDITVIEW, Xcls_MainWindowXcls_codeeditviewClass))

typedef struct _Xcls_MainWindowXcls_codeeditview Xcls_MainWindowXcls_codeeditview;
typedef struct _Xcls_MainWindowXcls_codeeditviewClass Xcls_MainWindowXcls_codeeditviewClass;

#define XCLS_MAINWINDOW_TYPE_XCLS_ADDPROPSVIEW (xcls_mainwindow_xcls_addpropsview_get_type ())
#define XCLS_MAINWINDOW_XCLS_ADDPROPSVIEW(obj) (G_TYPE_CHECK_INSTANCE_CAST ((obj), XCLS_MAINWINDOW_TYPE_XCLS_ADDPROPSVIEW, Xcls_MainWindowXcls_addpropsview))
#define XCLS_MAINWINDOW_XCLS_ADDPROPSVIEW_CLASS(klass) (G_TYPE_CHECK_CLASS_CAST ((klass), XCLS_MAINWINDOW_TYPE_XCLS_ADDPROPSVIEW, Xcls_MainWindowXcls_addpropsviewClass))
#define XCLS_MAINWINDOW_IS_XCLS_ADDPROPSVIEW(obj) (G_TYPE_CHECK_INSTANCE_TYPE ((obj), XCLS_MAINWINDOW_TYPE_XCLS_ADDPROPSVIEW))
#define XCLS_MAINWINDOW_IS_XCLS_ADDPROPSVIEW_CLASS(klass) (G_TYPE_CHECK_CLASS_TYPE ((klass), XCLS_MAINWINDOW_TYPE_XCLS_ADDPROPSVIEW))
#define XCLS_MAINWINDOW_XCLS_ADDPROPSVIEW_GET_CLASS(obj) (G_TYPE_INSTANCE_GET_CLASS ((obj), XCLS_MAINWINDOW_TYPE_XCLS_ADDPROPSVIEW, Xcls_MainWindowXcls_addpropsviewClass))

typedef struct _Xcls_MainWindowXcls_addpropsview Xcls_MainWindowXcls_addpropsview;
typedef struct _Xcls_MainWindowXcls_addpropsviewClass Xcls_MainWindowXcls_addpropsviewClass;

#define XCLS_MAINWINDOW_TYPE_XCLS_PROJECTEDITVIEW (xcls_mainwindow_xcls_projecteditview_get_type ())
#define XCLS_MAINWINDOW_XCLS_PROJECTEDITVIEW(obj) (G_TYPE_CHECK_INSTANCE_CAST ((obj), XCLS_MAINWINDOW_TYPE_XCLS_PROJECTEDITVIEW, Xcls_MainWindowXcls_projecteditview))
#define XCLS_MAINWINDOW_XCLS_PROJECTEDITVIEW_CLASS(klass) (G_TYPE_CHECK_CLASS_CAST ((klass), XCLS_MAINWINDOW_TYPE_XCLS_PROJECTEDITVIEW, Xcls_MainWindowXcls_projecteditviewClass))
#define XCLS_MAINWINDOW_IS_XCLS_PROJECTEDITVIEW(obj) (G_TYPE_CHECK_INSTANCE_TYPE ((obj), XCLS_MAINWINDOW_TYPE_XCLS_PROJECTEDITVIEW))
#define XCLS_MAINWINDOW_IS_XCLS_PROJECTEDITVIEW_CLASS(klass) (G_TYPE_CHECK_CLASS_TYPE ((klass), XCLS_MAINWINDOW_TYPE_XCLS_PROJECTEDITVIEW))
#define XCLS_MAINWINDOW_XCLS_PROJECTEDITVIEW_GET_CLASS(obj) (G_TYPE_INSTANCE_GET_CLASS ((obj), XCLS_MAINWINDOW_TYPE_XCLS_PROJECTEDITVIEW, Xcls_MainWindowXcls_projecteditviewClass))

typedef struct _Xcls_MainWindowXcls_projecteditview Xcls_MainWindowXcls_projecteditview;
typedef struct _Xcls_MainWindowXcls_projecteditviewClass Xcls_MainWindowXcls_projecteditviewClass;

#define XCLS_MAINWINDOW_TYPE_XCLS_BUTTONLAYOUT (xcls_mainwindow_xcls_buttonlayout_get_type ())
#define XCLS_MAINWINDOW_XCLS_BUTTONLAYOUT(obj) (G_TYPE_CHECK_INSTANCE_CAST ((obj), XCLS_MAINWINDOW_TYPE_XCLS_BUTTONLAYOUT, Xcls_MainWindowXcls_buttonlayout))
#define XCLS_MAINWINDOW_XCLS_BUTTONLAYOUT_CLASS(klass) (G_TYPE_CHECK_CLASS_CAST ((klass), XCLS_MAINWINDOW_TYPE_XCLS_BUTTONLAYOUT, Xcls_MainWindowXcls_buttonlayoutClass))
#define XCLS_MAINWINDOW_IS_XCLS_BUTTONLAYOUT(obj) (G_TYPE_CHECK_INSTANCE_TYPE ((obj), XCLS_MAINWINDOW_TYPE_XCLS_BUTTONLAYOUT))
#define XCLS_MAINWINDOW_IS_XCLS_BUTTONLAYOUT_CLASS(klass) (G_TYPE_CHECK_CLASS_TYPE ((klass), XCLS_MAINWINDOW_TYPE_XCLS_BUTTONLAYOUT))
#define XCLS_MAINWINDOW_XCLS_BUTTONLAYOUT_GET_CLASS(obj) (G_TYPE_INSTANCE_GET_CLASS ((obj), XCLS_MAINWINDOW_TYPE_XCLS_BUTTONLAYOUT, Xcls_MainWindowXcls_buttonlayoutClass))

typedef struct _Xcls_MainWindowXcls_buttonlayout Xcls_MainWindowXcls_buttonlayout;
typedef struct _Xcls_MainWindowXcls_buttonlayoutClass Xcls_MainWindowXcls_buttonlayoutClass;

#define XCLS_MAINWINDOW_TYPE_XCLS_PROJECTBUTTON (xcls_mainwindow_xcls_projectbutton_get_type ())
#define XCLS_MAINWINDOW_XCLS_PROJECTBUTTON(obj) (G_TYPE_CHECK_INSTANCE_CAST ((obj), XCLS_MAINWINDOW_TYPE_XCLS_PROJECTBUTTON, Xcls_MainWindowXcls_projectbutton))
#define XCLS_MAINWINDOW_XCLS_PROJECTBUTTON_CLASS(klass) (G_TYPE_CHECK_CLASS_CAST ((klass), XCLS_MAINWINDOW_TYPE_XCLS_PROJECTBUTTON, Xcls_MainWindowXcls_projectbuttonClass))
#define XCLS_MAINWINDOW_IS_XCLS_PROJECTBUTTON(obj) (G_TYPE_CHECK_INSTANCE_TYPE ((obj), XCLS_MAINWINDOW_TYPE_XCLS_PROJECTBUTTON))
#define XCLS_MAINWINDOW_IS_XCLS_PROJECTBUTTON_CLASS(klass) (G_TYPE_CHECK_CLASS_TYPE ((klass), XCLS_MAINWINDOW_TYPE_XCLS_PROJECTBUTTON))
#define XCLS_MAINWINDOW_XCLS_PROJECTBUTTON_GET_CLASS(obj) (G_TYPE_INSTANCE_GET_CLASS ((obj), XCLS_MAINWINDOW_TYPE_XCLS_PROJECTBUTTON, Xcls_MainWindowXcls_projectbuttonClass))

typedef struct _Xcls_MainWindowXcls_projectbutton Xcls_MainWindowXcls_projectbutton;
typedef struct _Xcls_MainWindowXcls_projectbuttonClass Xcls_MainWindowXcls_projectbuttonClass;

#define XCLS_MAINWINDOW_TYPE_XCLS_PROJECTEDITBUTTON (xcls_mainwindow_xcls_projecteditbutton_get_type ())
#define XCLS_MAINWINDOW_XCLS_PROJECTEDITBUTTON(obj) (G_TYPE_CHECK_INSTANCE_CAST ((obj), XCLS_MAINWINDOW_TYPE_XCLS_PROJECTEDITBUTTON, Xcls_MainWindowXcls_projecteditbutton))
#define XCLS_MAINWINDOW_XCLS_PROJECTEDITBUTTON_CLASS(klass) (G_TYPE_CHECK_CLASS_CAST ((klass), XCLS_MAINWINDOW_TYPE_XCLS_PROJECTEDITBUTTON, Xcls_MainWindowXcls_projecteditbuttonClass))
#define XCLS_MAINWINDOW_IS_XCLS_PROJECTEDITBUTTON(obj) (G_TYPE_CHECK_INSTANCE_TYPE ((obj), XCLS_MAINWINDOW_TYPE_XCLS_PROJECTEDITBUTTON))
#define XCLS_MAINWINDOW_IS_XCLS_PROJECTEDITBUTTON_CLASS(klass) (G_TYPE_CHECK_CLASS_TYPE ((klass), XCLS_MAINWINDOW_TYPE_XCLS_PROJECTEDITBUTTON))
#define XCLS_MAINWINDOW_XCLS_PROJECTEDITBUTTON_GET_CLASS(obj) (G_TYPE_INSTANCE_GET_CLASS ((obj), XCLS_MAINWINDOW_TYPE_XCLS_PROJECTEDITBUTTON, Xcls_MainWindowXcls_projecteditbuttonClass))

typedef struct _Xcls_MainWindowXcls_projecteditbutton Xcls_MainWindowXcls_projecteditbutton;
typedef struct _Xcls_MainWindowXcls_projecteditbuttonClass Xcls_MainWindowXcls_projecteditbuttonClass;

#define XCLS_MAINWINDOW_TYPE_XCLS_OBJECTSHOWBUTTON (xcls_mainwindow_xcls_objectshowbutton_get_type ())
#define XCLS_MAINWINDOW_XCLS_OBJECTSHOWBUTTON(obj) (G_TYPE_CHECK_INSTANCE_CAST ((obj), XCLS_MAINWINDOW_TYPE_XCLS_OBJECTSHOWBUTTON, Xcls_MainWindowXcls_objectshowbutton))
#define XCLS_MAINWINDOW_XCLS_OBJECTSHOWBUTTON_CLASS(klass) (G_TYPE_CHECK_CLASS_CAST ((klass), XCLS_MAINWINDOW_TYPE_XCLS_OBJECTSHOWBUTTON, Xcls_MainWindowXcls_objectshowbuttonClass))
#define XCLS_MAINWINDOW_IS_XCLS_OBJECTSHOWBUTTON(obj) (G_TYPE_CHECK_INSTANCE_TYPE ((obj), XCLS_MAINWINDOW_TYPE_XCLS_OBJECTSHOWBUTTON))
#define XCLS_MAINWINDOW_IS_XCLS_OBJECTSHOWBUTTON_CLASS(klass) (G_TYPE_CHECK_CLASS_TYPE ((klass), XCLS_MAINWINDOW_TYPE_XCLS_OBJECTSHOWBUTTON))
#define XCLS_MAINWINDOW_XCLS_OBJECTSHOWBUTTON_GET_CLASS(obj) (G_TYPE_INSTANCE_GET_CLASS ((obj), XCLS_MAINWINDOW_TYPE_XCLS_OBJECTSHOWBUTTON, Xcls_MainWindowXcls_objectshowbuttonClass))

typedef struct _Xcls_MainWindowXcls_objectshowbutton Xcls_MainWindowXcls_objectshowbutton;
typedef struct _Xcls_MainWindowXcls_objectshowbuttonClass Xcls_MainWindowXcls_objectshowbuttonClass;

#define XCLS_MAINWINDOW_TYPE_XCLS_ADDPROPBUTTON (xcls_mainwindow_xcls_addpropbutton_get_type ())
#define XCLS_MAINWINDOW_XCLS_ADDPROPBUTTON(obj) (G_TYPE_CHECK_INSTANCE_CAST ((obj), XCLS_MAINWINDOW_TYPE_XCLS_ADDPROPBUTTON, Xcls_MainWindowXcls_addpropbutton))
#define XCLS_MAINWINDOW_XCLS_ADDPROPBUTTON_CLASS(klass) (G_TYPE_CHECK_CLASS_CAST ((klass), XCLS_MAINWINDOW_TYPE_XCLS_ADDPROPBUTTON, Xcls_MainWindowXcls_addpropbuttonClass))
#define XCLS_MAINWINDOW_IS_XCLS_ADDPROPBUTTON(obj) (G_TYPE_CHECK_INSTANCE_TYPE ((obj), XCLS_MAINWINDOW_TYPE_XCLS_ADDPROPBUTTON))
#define XCLS_MAINWINDOW_IS_XCLS_ADDPROPBUTTON_CLASS(klass) (G_TYPE_CHECK_CLASS_TYPE ((klass), XCLS_MAINWINDOW_TYPE_XCLS_ADDPROPBUTTON))
#define XCLS_MAINWINDOW_XCLS_ADDPROPBUTTON_GET_CLASS(obj) (G_TYPE_INSTANCE_GET_CLASS ((obj), XCLS_MAINWINDOW_TYPE_XCLS_ADDPROPBUTTON, Xcls_MainWindowXcls_addpropbuttonClass))

typedef struct _Xcls_MainWindowXcls_addpropbutton Xcls_MainWindowXcls_addpropbutton;
typedef struct _Xcls_MainWindowXcls_addpropbuttonClass Xcls_MainWindowXcls_addpropbuttonClass;

#define XCLS_MAINWINDOW_TYPE_XCLS_ADDLISTENERBUTTON (xcls_mainwindow_xcls_addlistenerbutton_get_type ())
#define XCLS_MAINWINDOW_XCLS_ADDLISTENERBUTTON(obj) (G_TYPE_CHECK_INSTANCE_CAST ((obj), XCLS_MAINWINDOW_TYPE_XCLS_ADDLISTENERBUTTON, Xcls_MainWindowXcls_addlistenerbutton))
#define XCLS_MAINWINDOW_XCLS_ADDLISTENERBUTTON_CLASS(klass) (G_TYPE_CHECK_CLASS_CAST ((klass), XCLS_MAINWINDOW_TYPE_XCLS_ADDLISTENERBUTTON, Xcls_MainWindowXcls_addlistenerbuttonClass))
#define XCLS_MAINWINDOW_IS_XCLS_ADDLISTENERBUTTON(obj) (G_TYPE_CHECK_INSTANCE_TYPE ((obj), XCLS_MAINWINDOW_TYPE_XCLS_ADDLISTENERBUTTON))
#define XCLS_MAINWINDOW_IS_XCLS_ADDLISTENERBUTTON_CLASS(klass) (G_TYPE_CHECK_CLASS_TYPE ((klass), XCLS_MAINWINDOW_TYPE_XCLS_ADDLISTENERBUTTON))
#define XCLS_MAINWINDOW_XCLS_ADDLISTENERBUTTON_GET_CLASS(obj) (G_TYPE_INSTANCE_GET_CLASS ((obj), XCLS_MAINWINDOW_TYPE_XCLS_ADDLISTENERBUTTON, Xcls_MainWindowXcls_addlistenerbuttonClass))

typedef struct _Xcls_MainWindowXcls_addlistenerbutton Xcls_MainWindowXcls_addlistenerbutton;
typedef struct _Xcls_MainWindowXcls_addlistenerbuttonClass Xcls_MainWindowXcls_addlistenerbuttonClass;

#define TYPE_XCLS_CLUTTERFILES (xcls_clutterfiles_get_type ())
#define XCLS_CLUTTERFILES(obj) (G_TYPE_CHECK_INSTANCE_CAST ((obj), TYPE_XCLS_CLUTTERFILES, Xcls_ClutterFiles))
#define XCLS_CLUTTERFILES_CLASS(klass) (G_TYPE_CHECK_CLASS_CAST ((klass), TYPE_XCLS_CLUTTERFILES, Xcls_ClutterFilesClass))
#define IS_XCLS_CLUTTERFILES(obj) (G_TYPE_CHECK_INSTANCE_TYPE ((obj), TYPE_XCLS_CLUTTERFILES))
#define IS_XCLS_CLUTTERFILES_CLASS(klass) (G_TYPE_CHECK_CLASS_TYPE ((klass), TYPE_XCLS_CLUTTERFILES))
#define XCLS_CLUTTERFILES_GET_CLASS(obj) (G_TYPE_INSTANCE_GET_CLASS ((obj), TYPE_XCLS_CLUTTERFILES, Xcls_ClutterFilesClass))

typedef struct _Xcls_ClutterFiles Xcls_ClutterFiles;
typedef struct _Xcls_ClutterFilesClass Xcls_ClutterFilesClass;

#define TYPE_XCLS_EDITOR (xcls_editor_get_type ())
#define XCLS_EDITOR(obj) (G_TYPE_CHECK_INSTANCE_CAST ((obj), TYPE_XCLS_EDITOR, Xcls_Editor))
#define XCLS_EDITOR_CLASS(klass) (G_TYPE_CHECK_CLASS_CAST ((klass), TYPE_XCLS_EDITOR, Xcls_EditorClass))
#define IS_XCLS_EDITOR(obj) (G_TYPE_CHECK_INSTANCE_TYPE ((obj), TYPE_XCLS_EDITOR))
#define IS_XCLS_EDITOR_CLASS(klass) (G_TYPE_CHECK_CLASS_TYPE ((klass), TYPE_XCLS_EDITOR))
#define XCLS_EDITOR_GET_CLASS(obj) (G_TYPE_INSTANCE_GET_CLASS ((obj), TYPE_XCLS_EDITOR, Xcls_EditorClass))

typedef struct _Xcls_Editor Xcls_Editor;
typedef struct _Xcls_EditorClass Xcls_EditorClass;

#define TYPE_XCLS_GLADEVIEW (xcls_gladeview_get_type ())
#define XCLS_GLADEVIEW(obj) (G_TYPE_CHECK_INSTANCE_CAST ((obj), TYPE_XCLS_GLADEVIEW, Xcls_GladeView))
#define XCLS_GLADEVIEW_CLASS(klass) (G_TYPE_CHECK_CLASS_CAST ((klass), TYPE_XCLS_GLADEVIEW, Xcls_GladeViewClass))
#define IS_XCLS_GLADEVIEW(obj) (G_TYPE_CHECK_INSTANCE_TYPE ((obj), TYPE_XCLS_GLADEVIEW))
#define IS_XCLS_GLADEVIEW_CLASS(klass) (G_TYPE_CHECK_CLASS_TYPE ((klass), TYPE_XCLS_GLADEVIEW))
#define XCLS_GLADEVIEW_GET_CLASS(obj) (G_TYPE_INSTANCE_GET_CLASS ((obj), TYPE_XCLS_GLADEVIEW, Xcls_GladeViewClass))

typedef struct _Xcls_GladeView Xcls_GladeView;
typedef struct _Xcls_GladeViewClass Xcls_GladeViewClass;

#define TYPE_XCLS_LEFTPROPS (xcls_leftprops_get_type ())
#define XCLS_LEFTPROPS(obj) (G_TYPE_CHECK_INSTANCE_CAST ((obj), TYPE_XCLS_LEFTPROPS, Xcls_LeftProps))
#define XCLS_LEFTPROPS_CLASS(klass) (G_TYPE_CHECK_CLASS_CAST ((klass), TYPE_XCLS_LEFTPROPS, Xcls_LeftPropsClass))
#define IS_XCLS_LEFTPROPS(obj) (G_TYPE_CHECK_INSTANCE_TYPE ((obj), TYPE_XCLS_LEFTPROPS))
#define IS_XCLS_LEFTPROPS_CLASS(klass) (G_TYPE_CHECK_CLASS_TYPE ((klass), TYPE_XCLS_LEFTPROPS))
#define XCLS_LEFTPROPS_GET_CLASS(obj) (G_TYPE_INSTANCE_GET_CLASS ((obj), TYPE_XCLS_LEFTPROPS, Xcls_LeftPropsClass))

typedef struct _Xcls_LeftProps Xcls_LeftProps;
typedef struct _Xcls_LeftPropsClass Xcls_LeftPropsClass;

#define TYPE_XCLS_PROJECTSETTINGS (xcls_projectsettings_get_type ())
#define XCLS_PROJECTSETTINGS(obj) (G_TYPE_CHECK_INSTANCE_CAST ((obj), TYPE_XCLS_PROJECTSETTINGS, Xcls_ProjectSettings))
#define XCLS_PROJECTSETTINGS_CLASS(klass) (G_TYPE_CHECK_CLASS_CAST ((klass), TYPE_XCLS_PROJECTSETTINGS, Xcls_ProjectSettingsClass))
#define IS_XCLS_PROJECTSETTINGS(obj) (G_TYPE_CHECK_INSTANCE_TYPE ((obj), TYPE_XCLS_PROJECTSETTINGS))
#define IS_XCLS_PROJECTSETTINGS_CLASS(klass) (G_TYPE_CHECK_CLASS_TYPE ((klass), TYPE_XCLS_PROJECTSETTINGS))
#define XCLS_PROJECTSETTINGS_GET_CLASS(obj) (G_TYPE_INSTANCE_GET_CLASS ((obj), TYPE_XCLS_PROJECTSETTINGS, Xcls_ProjectSettingsClass))

typedef struct _Xcls_ProjectSettings Xcls_ProjectSettings;
typedef struct _Xcls_ProjectSettingsClass Xcls_ProjectSettingsClass;

#define TYPE_XCLS_RIGHTPALETE (xcls_rightpalete_get_type ())
#define XCLS_RIGHTPALETE(obj) (G_TYPE_CHECK_INSTANCE_CAST ((obj), TYPE_XCLS_RIGHTPALETE, Xcls_RightPalete))
#define XCLS_RIGHTPALETE_CLASS(klass) (G_TYPE_CHECK_CLASS_CAST ((klass), TYPE_XCLS_RIGHTPALETE, Xcls_RightPaleteClass))
#define IS_XCLS_RIGHTPALETE(obj) (G_TYPE_CHECK_INSTANCE_TYPE ((obj), TYPE_XCLS_RIGHTPALETE))
#define IS_XCLS_RIGHTPALETE_CLASS(klass) (G_TYPE_CHECK_CLASS_TYPE ((klass), TYPE_XCLS_RIGHTPALETE))
#define XCLS_RIGHTPALETE_GET_CLASS(obj) (G_TYPE_INSTANCE_GET_CLASS ((obj), TYPE_XCLS_RIGHTPALETE, Xcls_RightPaleteClass))

typedef struct _Xcls_RightPalete Xcls_RightPalete;
typedef struct _Xcls_RightPaleteClass Xcls_RightPaleteClass;

#define TYPE_XCLS_WINDOWADDPROP (xcls_windowaddprop_get_type ())
#define XCLS_WINDOWADDPROP(obj) (G_TYPE_CHECK_INSTANCE_CAST ((obj), TYPE_XCLS_WINDOWADDPROP, Xcls_WindowAddProp))
#define XCLS_WINDOWADDPROP_CLASS(klass) (G_TYPE_CHECK_CLASS_CAST ((klass), TYPE_XCLS_WINDOWADDPROP, Xcls_WindowAddPropClass))
#define IS_XCLS_WINDOWADDPROP(obj) (G_TYPE_CHECK_INSTANCE_TYPE ((obj), TYPE_XCLS_WINDOWADDPROP))
#define IS_XCLS_WINDOWADDPROP_CLASS(klass) (G_TYPE_CHECK_CLASS_TYPE ((klass), TYPE_XCLS_WINDOWADDPROP))
#define XCLS_WINDOWADDPROP_GET_CLASS(obj) (G_TYPE_INSTANCE_GET_CLASS ((obj), TYPE_XCLS_WINDOWADDPROP, Xcls_WindowAddPropClass))

typedef struct _Xcls_WindowAddProp Xcls_WindowAddProp;
typedef struct _Xcls_WindowAddPropClass Xcls_WindowAddPropClass;

#define TYPE_XCLS_WINDOWLEFTPROJECTS (xcls_windowleftprojects_get_type ())
#define XCLS_WINDOWLEFTPROJECTS(obj) (G_TYPE_CHECK_INSTANCE_CAST ((obj), TYPE_XCLS_WINDOWLEFTPROJECTS, Xcls_WindowLeftProjects))
#define XCLS_WINDOWLEFTPROJECTS_CLASS(klass) (G_TYPE_CHECK_CLASS_CAST ((klass), TYPE_XCLS_WINDOWLEFTPROJECTS, Xcls_WindowLeftProjectsClass))
#define IS_XCLS_WINDOWLEFTPROJECTS(obj) (G_TYPE_CHECK_INSTANCE_TYPE ((obj), TYPE_XCLS_WINDOWLEFTPROJECTS))
#define IS_XCLS_WINDOWLEFTPROJECTS_CLASS(klass) (G_TYPE_CHECK_CLASS_TYPE ((klass), TYPE_XCLS_WINDOWLEFTPROJECTS))
#define XCLS_WINDOWLEFTPROJECTS_GET_CLASS(obj) (G_TYPE_INSTANCE_GET_CLASS ((obj), TYPE_XCLS_WINDOWLEFTPROJECTS, Xcls_WindowLeftProjectsClass))

typedef struct _Xcls_WindowLeftProjects Xcls_WindowLeftProjects;
typedef struct _Xcls_WindowLeftProjectsClass Xcls_WindowLeftProjectsClass;

#define TYPE_XCLS_WINDOWLEFTTREE (xcls_windowlefttree_get_type ())
#define XCLS_WINDOWLEFTTREE(obj) (G_TYPE_CHECK_INSTANCE_CAST ((obj), TYPE_XCLS_WINDOWLEFTTREE, Xcls_WindowLeftTree))
#define XCLS_WINDOWLEFTTREE_CLASS(klass) (G_TYPE_CHECK_CLASS_CAST ((klass), TYPE_XCLS_WINDOWLEFTTREE, Xcls_WindowLeftTreeClass))
#define IS_XCLS_WINDOWLEFTTREE(obj) (G_TYPE_CHECK_INSTANCE_TYPE ((obj), TYPE_XCLS_WINDOWLEFTTREE))
#define IS_XCLS_WINDOWLEFTTREE_CLASS(klass) (G_TYPE_CHECK_CLASS_TYPE ((klass), TYPE_XCLS_WINDOWLEFTTREE))
#define XCLS_WINDOWLEFTTREE_GET_CLASS(obj) (G_TYPE_INSTANCE_GET_CLASS ((obj), TYPE_XCLS_WINDOWLEFTTREE, Xcls_WindowLeftTreeClass))

typedef struct _Xcls_WindowLeftTree Xcls_WindowLeftTree;
typedef struct _Xcls_WindowLeftTreeClass Xcls_WindowLeftTreeClass;

#define TYPE_XCLS_WINDOWROOVIEW (xcls_windowrooview_get_type ())
#define XCLS_WINDOWROOVIEW(obj) (G_TYPE_CHECK_INSTANCE_CAST ((obj), TYPE_XCLS_WINDOWROOVIEW, Xcls_WindowRooView))
#define XCLS_WINDOWROOVIEW_CLASS(klass) (G_TYPE_CHECK_CLASS_CAST ((klass), TYPE_XCLS_WINDOWROOVIEW, Xcls_WindowRooViewClass))
#define IS_XCLS_WINDOWROOVIEW(obj) (G_TYPE_CHECK_INSTANCE_TYPE ((obj), TYPE_XCLS_WINDOWROOVIEW))
#define IS_XCLS_WINDOWROOVIEW_CLASS(klass) (G_TYPE_CHECK_CLASS_TYPE ((klass), TYPE_XCLS_WINDOWROOVIEW))
#define XCLS_WINDOWROOVIEW_GET_CLASS(obj) (G_TYPE_INSTANCE_GET_CLASS ((obj), TYPE_XCLS_WINDOWROOVIEW, Xcls_WindowRooViewClass))

typedef struct _Xcls_WindowRooView Xcls_WindowRooView;
typedef struct _Xcls_WindowRooViewClass Xcls_WindowRooViewClass;

struct _Xcls_MainWindow {
	GObject parent_instance;
	Xcls_MainWindowPrivate * priv;
	GtkWindow* el;
	Xcls_MainWindowXcls_vbox* vbox;
	Xcls_MainWindowXcls_topbar* topbar;
	Xcls_MainWindowXcls_mainpane* mainpane;
	Xcls_MainWindowXcls_leftpane* leftpane;
	Xcls_MainWindowXcls_editpane* editpane;
	Xcls_MainWindowXcls_tree* tree;
	Xcls_MainWindowXcls_props* props;
	Xcls_MainWindowXcls_clutterembed* clutterembed;
	Xcls_MainWindowXcls_rooview* rooview;
	Xcls_MainWindowXcls_objectview* objectview;
	Xcls_MainWindowXcls_codeeditview* codeeditview;
	Xcls_MainWindowXcls_addpropsview* addpropsview;
	Xcls_MainWindowXcls_projecteditview* projecteditview;
	Xcls_MainWindowXcls_buttonlayout* buttonlayout;
	Xcls_MainWindowXcls_projectbutton* projectbutton;
	Xcls_MainWindowXcls_projecteditbutton* projecteditbutton;
	Xcls_MainWindowXcls_objectshowbutton* objectshowbutton;
	Xcls_MainWindowXcls_addpropbutton* addpropbutton;
	Xcls_MainWindowXcls_addlistenerbutton* addlistenerbutton;
	ProjectProject* project;
	Xcls_ClutterFiles* clutterfiles;
	Xcls_Editor* code_editor;
	Xcls_GladeView* window_gladeview;
	Xcls_LeftProps* left_props;
	Xcls_ProjectSettings* projectsettings;
	Xcls_RightPalete* rightpalete;
	Xcls_WindowAddProp* add_props;
	Xcls_WindowLeftProjects* left_projects;
	Xcls_WindowLeftTree* left_tree;
	Xcls_WindowRooView* window_rooview;
	gboolean children_loaded;
	gchar* state;
	gchar* title;
};

struct _Xcls_MainWindowClass {
	GObjectClass parent_class;
};



gint _vala_main (gchar** args, int args_length1);
JsRenderLang_Class* js_render_langclass_new (void);
JsRenderLang_Class* js_render_langclass_construct (GType object_type);
GType js_render_langclass_get_type (void) G_GNUC_CONST;
void project_project_loadAll (gboolean force);
GType project_project_get_type (void) G_GNUC_CONST;
ProjectProject* project_project_getProject (const gchar* name);
void project_project_scanDirs (ProjectProject* self);
GType xcls_mainwindow_get_type (void) G_GNUC_CONST;
Xcls_MainWindow* xcls_mainwindow_new (void);
Xcls_MainWindow* xcls_mainwindow_construct (GType object_type);
GType xcls_mainwindow_xcls_vbox_get_type (void) G_GNUC_CONST;
GType xcls_mainwindow_xcls_topbar_get_type (void) G_GNUC_CONST;
GType xcls_mainwindow_xcls_mainpane_get_type (void) G_GNUC_CONST;
GType xcls_mainwindow_xcls_leftpane_get_type (void) G_GNUC_CONST;
GType xcls_mainwindow_xcls_editpane_get_type (void) G_GNUC_CONST;
GType xcls_mainwindow_xcls_tree_get_type (void) G_GNUC_CONST;
GType xcls_mainwindow_xcls_props_get_type (void) G_GNUC_CONST;
GType xcls_mainwindow_xcls_clutterembed_get_type (void) G_GNUC_CONST;
GType xcls_mainwindow_xcls_rooview_get_type (void) G_GNUC_CONST;
GType xcls_mainwindow_xcls_objectview_get_type (void) G_GNUC_CONST;
GType xcls_mainwindow_xcls_codeeditview_get_type (void) G_GNUC_CONST;
GType xcls_mainwindow_xcls_addpropsview_get_type (void) G_GNUC_CONST;
GType xcls_mainwindow_xcls_projecteditview_get_type (void) G_GNUC_CONST;
GType xcls_mainwindow_xcls_buttonlayout_get_type (void) G_GNUC_CONST;
GType xcls_mainwindow_xcls_projectbutton_get_type (void) G_GNUC_CONST;
GType xcls_mainwindow_xcls_projecteditbutton_get_type (void) G_GNUC_CONST;
GType xcls_mainwindow_xcls_objectshowbutton_get_type (void) G_GNUC_CONST;
GType xcls_mainwindow_xcls_addpropbutton_get_type (void) G_GNUC_CONST;
GType xcls_mainwindow_xcls_addlistenerbutton_get_type (void) G_GNUC_CONST;
GType xcls_clutterfiles_get_type (void) G_GNUC_CONST;
GType xcls_editor_get_type (void) G_GNUC_CONST;
GType xcls_gladeview_get_type (void) G_GNUC_CONST;
GType xcls_leftprops_get_type (void) G_GNUC_CONST;
GType xcls_projectsettings_get_type (void) G_GNUC_CONST;
GType xcls_rightpalete_get_type (void) G_GNUC_CONST;
GType xcls_windowaddprop_get_type (void) G_GNUC_CONST;
GType xcls_windowleftprojects_get_type (void) G_GNUC_CONST;
GType xcls_windowlefttree_get_type (void) G_GNUC_CONST;
GType xcls_windowrooview_get_type (void) G_GNUC_CONST;
void xcls_mainwindow_initChildren (Xcls_MainWindow* self);
void xcls_mainwindow_hideViewEditing (Xcls_MainWindow* self);


/**
 * Test the writer code...


*/
static gpointer _g_object_ref0 (gpointer self) {
#line 23 "/home/alan/gitlive/app.Builder.js/Builder4/Main.vala"
	return self ? g_object_ref (self) : NULL;
#line 433 "Main.vala.c"
}


gint _vala_main (gchar** args, int args_length1) {
	gint result = 0;
	JsRenderLang_Class* _tmp0_ = NULL;
	JsRenderLang_Class* _tmp1_ = NULL;
	ProjectProject* proj = NULL;
	ProjectProject* _tmp2_ = NULL;
	ProjectProject* _tmp3_ = NULL;
	ProjectProject* _tmp4_ = NULL;
	Xcls_MainWindow* w = NULL;
	Xcls_MainWindow* _tmp5_ = NULL;
	Xcls_MainWindow* _tmp6_ = NULL;
	ProjectProject* _tmp7_ = NULL;
	ProjectProject* _tmp8_ = NULL;
	Xcls_MainWindow* _tmp9_ = NULL;
	GtkWindow* _tmp10_ = NULL;
	Xcls_MainWindow* _tmp11_ = NULL;
	Xcls_MainWindow* _tmp12_ = NULL;
#line 8 "/home/alan/gitlive/app.Builder.js/Builder4/Main.vala"
	gtk_init (&args_length1, &args);
#line 9 "/home/alan/gitlive/app.Builder.js/Builder4/Main.vala"
	gtk_clutter_init (&args_length1, &args);
#line 10 "/home/alan/gitlive/app.Builder.js/Builder4/Main.vala"
	_tmp0_ = js_render_langclass_new ();
#line 10 "/home/alan/gitlive/app.Builder.js/Builder4/Main.vala"
	_tmp1_ = _tmp0_;
#line 10 "/home/alan/gitlive/app.Builder.js/Builder4/Main.vala"
	_g_object_unref0 (_tmp1_);
#line 11 "/home/alan/gitlive/app.Builder.js/Builder4/Main.vala"
	g_log_set_always_fatal (G_LOG_LEVEL_ERROR | G_LOG_LEVEL_CRITICAL);
#line 12 "/home/alan/gitlive/app.Builder.js/Builder4/Main.vala"
	project_project_loadAll (FALSE);
#line 13 "/home/alan/gitlive/app.Builder.js/Builder4/Main.vala"
	_tmp2_ = project_project_getProject ("Pman.Core");
#line 13 "/home/alan/gitlive/app.Builder.js/Builder4/Main.vala"
	proj = _tmp2_;
#line 14 "/home/alan/gitlive/app.Builder.js/Builder4/Main.vala"
	_tmp3_ = proj;
#line 14 "/home/alan/gitlive/app.Builder.js/Builder4/Main.vala"
	if (_tmp3_ == NULL) {
#line 15 "/home/alan/gitlive/app.Builder.js/Builder4/Main.vala"
		g_print ("could not load test project Pman.Core");
#line 16 "/home/alan/gitlive/app.Builder.js/Builder4/Main.vala"
		result = 0;
#line 16 "/home/alan/gitlive/app.Builder.js/Builder4/Main.vala"
		_g_object_unref0 (proj);
#line 16 "/home/alan/gitlive/app.Builder.js/Builder4/Main.vala"
		return result;
#line 484 "Main.vala.c"
	}
#line 18 "/home/alan/gitlive/app.Builder.js/Builder4/Main.vala"
	_tmp4_ = proj;
#line 18 "/home/alan/gitlive/app.Builder.js/Builder4/Main.vala"
	project_project_scanDirs (_tmp4_);
#line 21 "/home/alan/gitlive/app.Builder.js/Builder4/Main.vala"
	_tmp5_ = xcls_mainwindow_new ();
#line 21 "/home/alan/gitlive/app.Builder.js/Builder4/Main.vala"
	w = _tmp5_;
#line 23 "/home/alan/gitlive/app.Builder.js/Builder4/Main.vala"
	_tmp6_ = w;
#line 23 "/home/alan/gitlive/app.Builder.js/Builder4/Main.vala"
	_tmp7_ = proj;
#line 23 "/home/alan/gitlive/app.Builder.js/Builder4/Main.vala"
	_tmp8_ = _g_object_ref0 (_tmp7_);
#line 23 "/home/alan/gitlive/app.Builder.js/Builder4/Main.vala"
	_g_object_unref0 (_tmp6_->project);
#line 23 "/home/alan/gitlive/app.Builder.js/Builder4/Main.vala"
	_tmp6_->project = _tmp8_;
#line 25 "/home/alan/gitlive/app.Builder.js/Builder4/Main.vala"
	_tmp9_ = w;
#line 25 "/home/alan/gitlive/app.Builder.js/Builder4/Main.vala"
	_tmp10_ = _tmp9_->el;
#line 25 "/home/alan/gitlive/app.Builder.js/Builder4/Main.vala"
	gtk_widget_show_all ((GtkWidget*) _tmp10_);
#line 27 "/home/alan/gitlive/app.Builder.js/Builder4/Main.vala"
	_tmp11_ = w;
#line 27 "/home/alan/gitlive/app.Builder.js/Builder4/Main.vala"
	xcls_mainwindow_initChildren (_tmp11_);
#line 28 "/home/alan/gitlive/app.Builder.js/Builder4/Main.vala"
	_tmp12_ = w;
#line 28 "/home/alan/gitlive/app.Builder.js/Builder4/Main.vala"
	xcls_mainwindow_hideViewEditing (_tmp12_);
#line 29 "/home/alan/gitlive/app.Builder.js/Builder4/Main.vala"
	gtk_main ();
#line 32 "/home/alan/gitlive/app.Builder.js/Builder4/Main.vala"
	result = 0;
#line 32 "/home/alan/gitlive/app.Builder.js/Builder4/Main.vala"
	_g_object_unref0 (w);
#line 32 "/home/alan/gitlive/app.Builder.js/Builder4/Main.vala"
	_g_object_unref0 (proj);
#line 32 "/home/alan/gitlive/app.Builder.js/Builder4/Main.vala"
	return result;
#line 528 "Main.vala.c"
}


int main (int argc, char ** argv) {
#if !GLIB_CHECK_VERSION (2,35,0)
	g_type_init ();
#endif
#line 7 "/home/alan/gitlive/app.Builder.js/Builder4/Main.vala"
	return _vala_main (argv, argc);
#line 538 "Main.vala.c"
}



