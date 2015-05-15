static ValaCompileErrors  _ValaCompileErrors;

public class ValaCompileErrors : Object 
{
    public Gtk.Popover el;
    private ValaCompileErrors  _this;

    public static ValaCompileErrors singleton()
    {
        if (_ValaCompileErrors == null) {
            _ValaCompileErrors= new ValaCompileErrors();
        }
        return _ValaCompileErrors;
    }

        // my vars (def)

    // ctor 
    public ValaCompileErrors()
    {
        _this = this;
        this.el = new Gtk.Popover( null );

        // my vars (dec)

        // set gobject values
    }

    // user defined functions 
}
