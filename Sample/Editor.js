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
Editor=new XObject({
    xtype: Gtk.Window,
    height_request : 300,
    id : "EditorWindow",
    title : "Application Builder - Editor",
    width_request : 500,
    init : function() {
        XObject.prototype.init.call(this);
       // this.show_all();
    },
    items : [
        {
            xtype: Gtk.VBox,
            pack : "add",
            items : [
                {
                    xtype: Gtk.Toolbar,
                    pack : "pack_start,false,true",
                    items : [
                        {
                            xtype: Gtk.Button,
                            label : "Save"
                        }
                    ]
                },
                {
                    xtype: Gtk.ScrolledWindow,
                    id : "RightEditor",
                    pack : "add",
                    items : [
                        {
                            xtype: GtkSource.View,
                            id : "view",
                            indent_width : 4,
                            pack : "add",
                            auto_indent : true,
                            init : function() {
                                XObject.prototype.init.call(this);
                                 var description = Pango.Font.description_from_string("monospace")
                                description.set_size(8000);
                                this.el.modify_font(description);
                            
                            },
                            insert_spaces_instead_of_tabs : true,
                            load : function(str) {
                            
                            // show the help page for the active node..
                               //this.get('/Help').show();
                            
                            
                              // this.get('/BottomPane').el.set_current_page(0);
                                this.el.get_buffer().set_text(str, str.length);
                                var lm = GtkSource.LanguageManager.get_default();
                                
                                this.el.get_buffer().set_language(lm.get_language('js'));
                                var buf = this.el.get_buffer();
                                var cursor = buf.get_mark("insert");
                                var iter= new Gtk.TextIter;
                                buf.get_iter_at_mark(iter, cursor);
                                iter.set_line(1);
                                iter.set_line_offset(4);
                                buf.move_mark(cursor, iter);
                                
                                
                                cursor = buf.get_mark("selection_bound");
                                iter= new Gtk.TextIter;
                                buf.get_iter_at_mark(iter, cursor);
                                iter.set_line(1);
                                iter.set_line_offset(4);
                                buf.move_mark(cursor, iter);
                                 
                                this.el.grab_focus();
                            },
                            show_line_numbers : true,
                            items : [
                                {
                                    xtype: GtkSource.Buffer,
                                    listeners : {
                                        changed : function (self) {
                                            var s = new Gtk.TextIter();
                                            var e = new Gtk.TextIter();
                                            this.el.get_start_iter(s);
                                            this.el.get_end_iter(e);
                                            var str = this.el.get_text(s,e,true);
                                            try {
                                                Seed.check_syntax('var e = ' + str);
                                            } catch (e) {
                                                this.get('/RightEditor.view').el.modify_base(Gtk.StateType.NORMAL, new Gdk.Color({
                                                    red: 0xFFFF, green: 0xCCCC , blue : 0xCCCC
                                                   }));
                                                //print("SYNTAX ERROR IN EDITOR");   
                                                //print(e);
                                                //console.dump(e);
                                                return;
                                            }
                                            this.get('/RightEditor.view').el.modify_base(Gtk.StateType.NORMAL, new Gdk.Color({
                                                    red: 0xFFFF, green: 0xFFFF , blue : 0xFFFF
                                                   }));
                                            
                                             this.get('/LeftPanel.model').changed(  str , false);
                                        }
                                    },
                                    pack : "set_buffer"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});
Editor.init();
XObject.cache['/Editor'] = Editor;
