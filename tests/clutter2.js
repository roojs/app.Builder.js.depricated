GtkClutter = imports.gi.GtkClutter;
Clutter = imports.gi.Clutter;
Gtk  = imports.gi.Gtk;

Gtk.init(null,null);
GtkClutter.init(null,null);

 
    /* construct the toplevel UI */
//win = new Gtk.Window.c_new(Gtk.WindowType.TOPLEVEL);


win   = new Gtk.Window({ 
	type:Gtk.WindowType.TOPLEVEL, 
	default_width : 500,
	default_height : 500
 } );

clutter  = new GtkClutter.Embed({ 
});
win.add(clutter);
 print(clutter);
//win.add(clutter); 

clutter.signal.show.connect(function() {
	print ("SHOW");
	stage = clutter.get_stage();
	button = new Gtk.Button({ label: 'test'} );
	button.show();
	actor = new GtkClutter.Actor.with_contents(button);
	actor.fixed_x = 100;
	actor.fixed_y = 100;
	stage.add_actor(actor);
	 actor.set_receives_events(true);
	button.signal.enter.connect(function() {
		print("ENTER EVENT");

		animate = actor.animate(
			Clutter.AnimationMode.EASE_OUT_ELASTIC, 2000,
			{
				   scale_x : 5,
				  scale_y: 5,

			}
		);
		animate.timeline.start();
	});
	button.signal.leave.connect(function() {
		print("LEAVE EVENT");

		animate = actor.animate(
			Clutter.AnimationMode.EASE_OUT_ELASTIC, 2000,
			{
				   scale_x : 1,
				  scale_y: 1,

			}
		);
		animate.timeline.start();
	});
/*
	animation = actor.animatev(
		Clutter.AnimationMode.EASE_IN_OUT_SINE, 5000,
		5,
		 [ "fixed::x", // (float) allocation.x,
		    "fixed::y", //(float) allocation.y,
//		   "fixed::scale-gravity", //CLUTTER_GRAVITY_CENTER,
		    "scale-x",// 0.,
		    "scale-y",// 0.,
		    "opacity", //0x0,
		],
		[   100,
		     100,
		    0.0,
		      0.0,
		     0,
		]
	);
*/
 });

win.show_all();

Gtk.main(); 



