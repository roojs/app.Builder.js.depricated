/*0*/ static About  _About;
/*1*/ 
/*2*/ public class About : Object 
{
/*3*/     public Gtk.AboutDialog el;
/*4*/     private About  _this;
/*5*/ 
/*6*/     public static About singleton()
/*7*/     {
/*8*/         if (_About == null) {
/*9*/             _About= new About();
/*10*/         }
/*11*/         return _About;
/*12*/     }
/*13*/ 
/*14*/         // my vars (def)
/*15*/ 
/*16*/     // ctor
/*17*/     public About()
/*18*/     {
/*19*/         _this = this;
/*20*/         this.el = new Gtk.AboutDialog();
/*21*/ 
/*22*/         // my vars (dec)
/*23*/ 
/*24*/         // set gobject values
/*25*/         this.el.program_name = "app.Builder.js";
/*26*/         this.el.license = "LGPL";
/*27*/         this.el.authors = { "Alan Knowles" };
/*28*/         this.el.website = "http://www.akbkhome.com/blog.php";
/*29*/         this.el.modal = true;
/*30*/         this.el.copyright = "LGPL";
/*31*/         this.el.license_type = Gtk.License.LGPL_3_0;
/*32*/ 
/*33*/         //listeners
        this.el.delete_event.connect( (self, event) => {
            this.el.hide();
            return true; 
        });
        this.el.response.connect( (rid) => {
            this.el.hide();
        });
/*43*/     }
/*44*/ 
/*45*/     // user defined functions
    public    void show (Gtk.Window parent) {
        this.el.set_transient_for(parent);
        this.el.modal = true;
        this.el.show();
    }
/*52*/ }
