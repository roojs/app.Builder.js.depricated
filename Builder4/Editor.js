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
    activeEditor : "\"\"",
    saveContents : ()  {
        
        
        
        
        
        
        
       
         
         var str = _this.buffer.toString();
         
         if (!_this.buffer.checkSyntax()) {
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
    pos_root_x : "",
    pos_root_y : "",
    ptype : "\"\"",
    key : "\"\"",
    xtype : "VBox",
    show : (JsRender.Node node, string ptype, string key)
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
        this.key_edit.el.text = key;    
    
    },
    pos : false,
    id : "Editor",
    dirty : false,
    xns : Gtk,
    save : "()",
    homogeneous : FALSE,
    node : "null",
    items : [
    	{
            xtype : "HBox",
            xns : Gtk,
            homogeneous : FALSE,
            items : [
            	{
                    label : "Save",
                    id : "save_button",
                    xtype : "Button",
                    xns : Gtk,
                    listeners : {
                    	clicked : () => { 
                    	       _this.saveContents();
                    	   }
                    }
                },
            	{
                    id : "key_edit",
                    xtype : "Entry",
                    xns : Gtk
                }
            ]

        },
    	{
            id : "RightEditor",
            xtype : "ScrolledWindow",
            xns : Gtk,
            items : [
            	{
                    id : "view",
                    insert_spaces_instead_of_tabs : TRUE,
                    xtype : "View",
                    highlight_current_line : true,
                    xns : GtkSource,
                    load : (string str) {
                    
                    // show the help page for the active node..
                       //this.get('/Help').show();
                    
                    
                      // this.get('/BottomPane').el.set_current_page(0);
                        this.el.get_buffer().set_text(str, str.length);
                        var lm = Gtk.SourceLanguageManager.get_default();
                        
                        ((Gtk.SourceBuffer)(this.el.get_buffer())) .set_language(lm.get_language("js"));
                        var buf = this.el.get_buffer();
                        
                        /* -- what does all this do? */
                        /*
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
                        
                        */
                        
                        _this.dirty = false;
                        this.el.grab_focus();
                        _this.save_button.el.sensitive = false;
                    },
                    indent_width : 4,
                    auto_indent : TRUE,
                    show_line_numbers : TRUE,
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
                    items : [
                    	{
                            id : "buffer",
                            checkSyntax : () {
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
                            toString : () {
                                
                                Gtk.TextIter s;
                                Gtk.TextIter e;
                                this.el.get_start_iter(out s);
                                this.el.get_end_iter(out e);
                                var ret = this.el.get_text(s,e,true);
                                //print("TO STRING? " + ret);
                                return ret;
                            },
                            xtype : "Buffer",
                            xns : GtkSource,
                            listeners : {
                            	changed : () => {
                            	       // check syntax??
                            	           if(this.checkSyntax()) {
                            	           _this.save_button.el.sensitive = true;
                            	       }
                            	      // print("EDITOR CHANGED");
                            	       _this.dirty = true;
                            	   
                            	       // this.get('/LeftPanel.model').changed(  str , false);
                            	       return ;
                            	   }
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
