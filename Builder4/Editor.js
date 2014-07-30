Gtk = imports.gi.Gtk;
Gdk = imports.gi.Gdk;
Pango = imports.gi.Pango;
GLib = imports.gi.GLib;
Gio = imports.gi.Gio;
GObject = imports.gi.GObject;
GtkSource = imports.gi.GtkSource;
WebKit = imports.gi.WebKit;
Vte = imports.gi.Vte;
console = imports.console;
XObject = imports.XObject.XObject;
Editor=new XObject({
    xtype: Gtk.VBox,
    pack : "add",
    'bool:saveContents' : ()  {
        
        
        
        
        
        
        
       
         
         var str = Editor.buffer.toString();
         
         if (!Editor.buffer.checkSyntax()) {
             print("check syntax failed");
             //this.get('/StandardErrorDialog').show("Fix errors in code and save.."); 
             return false;
         }
         
         // LeftPanel.model.changed(  str , false);
         _this.dirty = false;
         _this.save_button.el.sensitive = false;
         
         
            
         
        // find the text for the node..
        if (ptype == "listener") {
            this.node.listeners.set(key,str);
        
        } else {
             this.node.props.set(key,str);
        }
    
         
        
        // call the signal..
        this.save();
        
        return true;
    
    },
    homogeneous : true,
    'void:show' : (JsRender.Node node, string ptype, string key)
    {
        this.ptype = ptype;
        this.key  = key;
        this.node = node;
        
       string val = "";
        // find the text for the node..
        if (ptype == "listener") {
            val = node.listeners.get(key);
        
        } else {
            val = node.props.get(key);
        }
        this.view.load(val);
        
    
    },
    items : [
        {
            xtype: Gtk.Toolbar,
            pack : "pack_start,false,true",
            items : [
                {
                    xtype: Gtk.ToolButton,
                    listeners : {
                        clicked : () => { 
                            _this.saveContents();
                        }
                    },
                    id : "save_button",
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
                    listeners : {
                        key_release_event : (event) => {
                            
                            if (event.keyval == 115 && (event.state & Gdk.ModifierType.CONTROL_MASK ) > 0 ) {
                                print("SAVE: ctrl-S  pressed");
                                _this.saveContents();
                                return false;
                            }
                           // print(event.key.keyval)
                            
                            return false;
                        
                        }
                    },
                    id : "view",
                    indent_width : 4,
                    pack : "add",
                    auto_indent : true,
                    init : var description =   Pango.FontDescription.from_string("monospace");
                        description.set_size(9000);
                        this.el.override_font(description);,
                    insert_spaces_instead_of_tabs : true,
                    show_line_numbers : true,
                    'void:load' : (string str) {
                    
                    // show the help page for the active node..
                       //this.get('/Help').show();
                    
                    
                      // this.get('/BottomPane').el.set_current_page(0);
                        this.el.get_buffer().set_text(str, str.length);
                        var lm = Gtk.SourceLanguageManager.get_default();
                        
                        ((Gtk.SourceBuffer)(this.el.get_buffer())) .set_language(lm.get_language("js"));
                        var buf = this.el.get_buffer();
                        var cursor = buf.get_mark("insert");
                        Gtk.TextIter iter;
                        buf.get_iter_at_mark(out iter, cursor);
                        iter.set_line(1);
                        iter.set_line_offset(4);
                        buf.move_mark(cursor, iter);
                        
                        
                        cursor = buf.get_mark("selection_bound");
                        //iter= new Gtk.TextIter;
                        buf.get_iter_at_mark(out iter, cursor);
                        iter.set_line(1);
                        iter.set_line_offset(4);
                        buf.move_mark(cursor, iter);
                        Editor.dirty = false;
                        this.el.grab_focus();
                        _this.save_button.el.sensitive = false;
                    },
                    items : [
                        {
                            xtype: GtkSource.Buffer,
                            listeners : {
                                changed : () => {
                                    // check syntax??
                                        if(this.checkSyntax()) {
                                        Editor.save_button.el.sensitive = true;
                                    }
                                   // print("EDITOR CHANGED");
                                    Editor.dirty = true;
                                
                                    // this.get('/LeftPanel.model').changed(  str , false);
                                    return ;
                                }
                            },
                            id : "buffer",
                            pack : "set_buffer",
                            'bool:checkSyntax' : () {
                             /*
                                var str = this.toString();
                                var res = "";
                                /*
                                try {
                                  //  print('var res = ' + str);
                                    Seed.check_syntax('var res = ' + str);
                                    
                                   
                                } catch (e) {
                                    
                                    this.get('/RightEditor.view').el.modify_base(Gtk.StateType.NORMAL, new Gdk.Color({
                                        red: 0xFFFF, green: 0xCCCC , blue : 0xCCCC
                                       }));
                                    print("SYNTAX ERROR IN EDITOR");   
                                    print(e);
                                    // print(str);
                                    //console.dump(e);
                                    return false;
                                }
                                 this.get('/RightEditor.view').el.modify_base(Gtk.StateType.NORMAL, new Gdk.Color({
                                    red: 0xFFFF, green: 0xFFFF , blue : 0xFFFF
                                   }));
                                */
                                return true;
                            },
                            'string:toString' : () {
                                
                                Gtk.TextIter s;
                                Gtk.TextIter e;
                                this.el.get_start_iter(out s);
                                this.el.get_end_iter(out e);
                                var ret = this.el.get_text(s,e,true);
                                //print("TO STRING? " + ret);
                                return ret;
                            }
                        }
                    ]
                }
            ]
        }
    ]
});
Editor.init();
XObject.cache['/Editor'] = Editor;
