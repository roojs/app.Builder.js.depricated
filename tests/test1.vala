/*
 valac  --pkg gio-2.0  --pkg posix  --pkg gtk+-3.0 --pkg libnotify --pkg  libwnck-3.0 \
      test1.vala \
    -o /tmp/test1



*/

static int main (string[] args) {
    Gtk.init (ref args);
    new Xcls_EditorWindow();
    EditorWindow.showAll();
     Gtk.main ();

    return 0;
}
 

public static Xcls_EditorWindow  EditorWindow;


public class Xcls_EditorWindow : Gtk.Window
{
    public static Xcls_EditorWindow  _this;
    public Xcls_save_button  save_button;
    public Xcls_EditorWindow()
    {
         _this = this;
         EditorWindow = this;
         this.height_request = 300;
         this.title = "Application Builder - Editor";
         this.width_request = 500;
         this.add (  new Xcls_VBox2() );
    }
}
public class Xcls_VBox2 : Gtk.VBox
{
    public Xcls_VBox2()
    {
         this.pack_start (  new Xcls_Toolbar3(), false,true );
    }
}
public class Xcls_Toolbar3 : Gtk.Toolbar
{
    public Xcls_Toolbar3()
    {
         this.add (  new Xcls_save_button() );
    }
}
public class Xcls_save_button : Gtk.Button
{
    public Xcls_save_button()
    {
         _this.save_button = this;
         this.label = "Save";
    }
}
