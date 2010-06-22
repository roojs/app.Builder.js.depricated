Gtk = imports.gi.Gtk;
Gdk = imports.gi.Gdk;
Pango = imports.gi.Pango;
GLib = imports.gi.GLib;
Gio = imports.gi.Gio;
GObject = imports.gi.GObject;
GtkSource = imports.gi.GtkSource;
WebKit = imports.gi.WebKit;
Vte = imports.gi.Vte;
GtkClutter = imports.gi.GtkClutter;
console = imports.console;
XObject = imports.XObject.XObject;
Window=new XObject({
    xtype: Gtk.Window,
    default_height : 900,
    default_width : 900,
    init : function() {
        XObject.prototype.init.call(this);
        this.el.show_all();
    },
    items : [
        {
            xtype: GtkClutter.Embed,
            listeners : {
                show : function() { 
                   var stage = this.el.get_stage(); 
                   print(this.items.length);
                   this.items.forEach( 
                      function(e) { 
                          print(e.xtype);
                          stage.add_actor(e.el);
                        }
                     );
                }
            },
            pack : "add",
            items : [
                {
                    xtype: GtkClutter.Actor,
                    pack : false,
                    x : 10,
                    y : 10,
                    init : function() {
                    
                        var child = new XObject(this.items[0]);
                        child.init();
                        child.parent = this;
                        //var contents = new Gtk.Button({ label: 'test' }); 
                        var contents = child.el;
                       
                        print(JSON.stringify(this.items));
                        
                        
                        this.el = new GtkClutter.Actor.with_contents (  contents) ;
                        XObject.prototype.init.call(this);
                    },
                    items : [
                        {
                            xtype: Gtk.Button,
                            listeners : {
                                clicked : function (self) {
                                   Clutter = imports.gi.Clutter;
                                        var animate = this.parent.el.animate(
                                		Clutter.AnimationMode.EASE_OUT_ELASTIC, 2000,
                                		{
                                			   scale_x : 5,
                                			  scale_y: 5,
                                
                                		}
                                		);
                                		animate.timeline.start();
                                
                                }
                            },
                            height_request : 100,
                            label : "project list",
                            pack : false,
                            width_request : 100
                        }
                    ]
                },
                {
                    xtype: GtkClutter.Actor,
                    pack : false,
                    x : 10,
                    y : 150,
                    init : function() {
                    
                        var child = new XObject(this.items[0]);
                        child.init();
                        child.parent = this;
                        //var contents = new Gtk.Button({ label: 'test' }); 
                        var contents = child.el;
                        print ("actor.items");
                        print(JSON.stringify(this.items));
                        
                        
                        this.el = new GtkClutter.Actor.with_contents (  contents) ;
                        XObject.prototype.init.call(this);
                    },
                    items : [
                        {
                            xtype: Gtk.Button,
                            listeners : {
                                clicked : function (self) {
                                   Clutter = imports.gi.Clutter;
                                        var animate = this.parent.el.animate(
                                		Clutter.AnimationMode.EASE_OUT_ELASTIC, 2000,
                                		{
                                			   scale_x : 5,
                                			  scale_y: 5,
                                
                                		}
                                		);
                                		animate.timeline.start();
                                
                                }
                            },
                            height_request : 100,
                            label : "file list",
                            pack : false,
                            width_request : 100
                        }
                    ]
                },
                {
                    xtype: GtkClutter.Actor,
                    pack : false,
                    x : 10,
                    y : 300,
                    init : function() {
                    
                        var child = new XObject(this.items[0]);
                        child.init();
                        child.parent = this;
                        //var contents = new Gtk.Button({ label: 'test' }); 
                        var contents = child.el;
                       
                        print(JSON.stringify(this.items));
                        
                        
                        this.el = new GtkClutter.Actor.with_contents (  contents) ;
                        XObject.prototype.init.call(this);
                    },
                    items : [
                        {
                            xtype: Gtk.Button,
                            listeners : {
                                clicked : function (self) {
                                   Clutter = imports.gi.Clutter;
                                        var animate = this.parent.el.animate(
                                		Clutter.AnimationMode.EASE_OUT_ELASTIC, 2000,
                                		{
                                			   scale_x : 5,
                                			  scale_y: 5,
                                
                                		}
                                		);
                                		animate.timeline.start();
                                
                                }
                            },
                            height_request : 100,
                            label : "tree of parts",
                            pack : false,
                            width_request : 100
                        }
                    ]
                },
                {
                    xtype: GtkClutter.Actor,
                    pack : false,
                    x : 10,
                    y : 450,
                    init : function() {
                    
                        var child = new XObject(this.items[0]);
                        child.init();
                        child.parent = this;
                        //var contents = new Gtk.Button({ label: 'test' }); 
                        var contents = child.el;
                       
                        print(JSON.stringify(this.items));
                        
                        
                        this.el = new GtkClutter.Actor.with_contents (  contents) ;
                        XObject.prototype.init.call(this);
                    },
                    items : [
                        {
                            xtype: Gtk.Button,
                            listeners : {
                                clicked : function (self) {
                                   Clutter = imports.gi.Clutter;
                                        var animate = this.parent.el.animate(
                                		Clutter.AnimationMode.EASE_OUT_ELASTIC, 2000,
                                		{
                                			   scale_x : 5,
                                			  scale_y: 5,
                                
                                		}
                                		);
                                		animate.timeline.start();
                                
                                }
                            },
                            height_request : 100,
                            label : "property editor",
                            pack : false,
                            width_request : 100
                        }
                    ]
                },
                {
                    xtype: GtkClutter.Actor,
                    pack : false,
                    x : 150,
                    y : 450,
                    init : function() {
                    
                        var child = new XObject(this.items[0]);
                        child.init();
                        child.parent = this;
                        //var contents = new Gtk.Button({ label: 'test' }); 
                        var contents = child.el;
                       
                        print(JSON.stringify(this.items));
                        
                        
                        this.el = new GtkClutter.Actor.with_contents (  contents) ;
                        XObject.prototype.init.call(this);
                    },
                    items : [
                        {
                            xtype: Gtk.Button,
                            listeners : {
                                clicked : function (self) {
                                   Clutter = imports.gi.Clutter;
                                        var animate = this.parent.el.animate(
                                		Clutter.AnimationMode.EASE_OUT_ELASTIC, 2000,
                                		{
                                			   scale_x : 5,
                                			  scale_y: 5,
                                
                                		}
                                		);
                                		animate.timeline.start();
                                
                                }
                            },
                            height_request : 100,
                            label : "text editor",
                            pack : false,
                            width_request : 100
                        }
                    ]
                },
                {
                    xtype: GtkClutter.Actor,
                    pack : false,
                    x : 150,
                    y : 10,
                    init : function() {
                    
                        var child = new XObject(this.items[0]);
                        child.init();
                        child.parent = this;
                        //var contents = new Gtk.Button({ label: 'test' }); 
                        var contents = child.el;
                       
                        print(JSON.stringify(this.items));
                        
                        
                        this.el = new GtkClutter.Actor.with_contents (  contents) ;
                        XObject.prototype.init.call(this);
                    },
                    items : [
                        {
                            xtype: Gtk.Button,
                            listeners : {
                                clicked : function (self) {
                                   Clutter = imports.gi.Clutter;
                                        var animate = this.parent.el.animate(
                                		Clutter.AnimationMode.EASE_OUT_ELASTIC, 2000,
                                		{
                                			   scale_x : 5,
                                			  scale_y: 5,
                                
                                		}
                                		);
                                		animate.timeline.start();
                                
                                }
                            },
                            height_request : 100,
                            label : "preview app",
                            pack : false,
                            width_request : 100
                        }
                    ]
                },
                {
                    xtype: GtkClutter.Actor,
                    pack : false,
                    x : 100,
                    y : 300,
                    init : function() {
                    
                        var child = new XObject(this.items[0]);
                        child.init();
                        child.parent = this;
                        //var contents = new Gtk.Button({ label: 'test' }); 
                        var contents = child.el;
                       
                        print(JSON.stringify(this.items));
                        
                        
                        this.el = new GtkClutter.Actor.with_contents (  contents) ;
                        XObject.prototype.init.call(this);
                    },
                    items : [
                        {
                            xtype: Gtk.Button,
                            listeners : {
                                clicked : function (self) {
                                   Clutter = imports.gi.Clutter;
                                        var animate = this.parent.el.animate(
                                		Clutter.AnimationMode.EASE_OUT_ELASTIC, 2000,
                                		{
                                			   scale_x : 5,
                                			  scale_y: 5,
                                
                                		}
                                		);
                                		animate.timeline.start();
                                
                                }
                            },
                            height_request : 100,
                            label : "palete",
                            pack : false,
                            width_request : 100
                        }
                    ]
                }
            ]
        }
    ]
});
Window.init();
XObject.cache['/Window'] = Window;
