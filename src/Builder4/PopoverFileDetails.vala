static PopoverFileDetails  _PopoverFileDetails;

public class PopoverFileDetails : Object 
{
    public Gtk.Popover el;
    private PopoverFileDetails  _this;

    public static PopoverFileDetails singleton()
    {
        if (_PopoverFileDetails == null) {
            _PopoverFileDetails= new PopoverFileDetails();
        }
        return _PopoverFileDetails;
    }

        // my vars (def)

    // ctor 
    public PopoverFileDetails()
    {
        _this = this;
        this.el = new Gtk.Popover( null );

        // my vars (dec)

        // set gobject values
    }

    // user defined functions 
}
