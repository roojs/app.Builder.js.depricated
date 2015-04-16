static DialogPluginWebkit  _DialogPluginWebkit;

public class DialogPluginWebkit : Object 
{
    public Gtk.Dialog el;
    private DialogPluginWebkit  _this;

    public static DialogPluginWebkit singleton()
    {
        if (_DialogPluginWebkit == null) {
            _DialogPluginWebkit= new DialogPluginWebkit();
        }
        return _DialogPluginWebkit;
    }

        // my vars (def)

    // ctor 
    public DialogPluginWebkit()
    {
        _this = this;
        this.el = new Gtk.Dialog();

        // my vars (dec)

        // set gobject values
    }

    // user defined functions 
}
