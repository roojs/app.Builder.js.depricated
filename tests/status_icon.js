#!/usr/bin/env seed

// Import and initialize GTK+
Gtk = imports.gi.Gtk;
Gtk.init(null, null);

// Create the window
var window = new Gtk.Window({title: "Hello World"});
window.set_default_size(600, 500);
window.signal.hide.connect(Gtk.main_quit);

// Create the GtkStatusIcon from a file
var icon = new Gtk.StatusIcon({file : "/home/marin/Bureau/Bric_a_brac/notify/icon.png"});

// Create the menu
var menu = new Gtk.Menu();

// Create an item
var item = new Gtk.MenuItem({label: "Hello"});
menu.append(item);

// Signal connecting the popup_menu event of the icon to the "activate" function
icon.signal.popup_menu.connect(active, menu);

function active(status_icon, button, time, data)
{
    // GtkMenu.popup, calling the Gtk.StatusIcon.position_menu function
    // 
    var area = new Gdk.Rectangle();
    var orient = new Gtk.Orientation();
    var ret = {}; 
    status_icon.get_geometry(ret, area, orient);
    console.log(JSON.stringify(area));
    console.log(JSON.stringify(orient));
    
    menu.popup(null, null, Gtk.StatusIcon.position_menu, status_icon, button, time);
}

window.show_all();

Gtk.main();
