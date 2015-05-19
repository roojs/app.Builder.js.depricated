/*0*/ static About  _About;
/*1*/ 
/*2*/ public class About : Object
/*3*/ {
/*4*/     public Gtk.AboutDialog el;
/*5*/     private About  _this;
/*6*/ 
/*7*/     public static About singleton()
/*8*/     {
/*9*/         if (_About == null) {
/*10*/             _About= new About();
/*11*/         }
/*12*/         return _About;
/*13*/     }
/*14*/ 
/*15*/         // my vars (def)
/*16*/ 
/*17*/     // ctor
/*18*/     public About()
/*19*/     {
/*20*/         _this = this;
/*21*/         this.el = new Gtk.AboutDialog();
/*22*/ 
/*23*/         // my vars (dec)
/*24*/ 
/*25*/         // set gobject values
/*26*/         this.el.program_name = "app.Builder.js";
/*27*/         this.el.license = "LGPL";
/*28*/         this.el.authors = { "Alan Knowles" };
/*29*/         this.el.website = "http://www.akbkhome.com/blog.php";
/*30*/         this.el.modal = true;
/*31*/         this.el.copyright = "LGPL";
/*32*/         this.el.license_type = Gtk.License.LGPL_3_0;
/*33*/ 
/*34*/         //listeners
        this.el.delete_event.connect( (self, event) => {
            this.el.hide();
            return true; 
        });
        this.el.response.connect( (rid) => {
            this.el.hide();
        });
/*44*/     }
/*45*/ 
/*46*/     // user defined functions
    public    void show (Gtk.Window parent) {
        this.el.set_transient_for(parent);
        this.el.modal = true;
        this.el.show();
    }
/*53*/ }
