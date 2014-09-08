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
WindowLeftProps=new XObject({
    allow_edit : false,
    load : (JsRender.JsRender file, JsRender.Node? node) 
    {
        print("load leftprops\n");
        this.before_edit();
        this.node = node;
        this.file = file;
        
     
        this.model.el.clear();
                  
        //this.get('/RightEditor').el.hide();
        if (node ==null) {
            return ;
        }
         
        
    
        //var provider = this.get('/LeftTree').getPaleteProvider();
        Gtk.TreeIter iter;
        
        //typeof(string),  // 0 key type
         //typeof(string),  // 1 key
         //typeof(string),  // 2 key (display)
         //typeof(string),  // 3 value
         //typeof(string),  // 4 value (display)
         //typeof(string),  // 5 both (tooltip)
        
        
        
        
        // really need a way to sort the hashmap...
        var m = this.model.el;
        
        var miter = node.listeners.map_iterator();
        var i = 0;
        
        while(miter.next()) {
            i++;
            m.append(out iter,null);
            
            this.updateIter(iter,  "listener", miter.get_key(), miter.get_value());
            
             
         }
         
          
        miter = node.props.map_iterator();
        
        
       while(miter.next()) {
               i++;
            m.append(out iter,null);
             this.updateIter(iter,  "prop", miter.get_key(), miter.get_value());
             
       }
       print("clear selection\n");
       // clear selection?
       this.model.el.set_sort_column_id(6,Gtk.SortType.ASCENDING); // sort by real key..
       
       this.view.el.get_selection().unselect_all();
       
           var pane = _this.main_window.editpane.el;
        var try_size = i * 12.0f;
        
        // max 80%...
        pane.set_position( 
            (try_size /  pane.max_position)  > 0.8f  ? 
            pane.max_position * 0.2 :
            pane.max_position-try_size);
        
       
    },
    id : "LeftProps",
    before_edit : ()
    {
    
        print("before edit - stop editing\n");
        
      // these do not appear to trigger save...
        _this.keyrender.el.stop_editing(false);
        _this.keyrender.el.editable  =false;
    
        _this.valrender.el.stop_editing(false);
        _this.valrender.el.editable  =false;    
        
        
    // technicall stop the popup editor..
    
    },
    addProp : (string in_type, string key, string value, string value_type) {
          // info includes key, val, skel, etype..
          //console.dump(info);
            //type = info.type.toLowerCase();
            //var data = this.toJS();
              
        var type = in_type == "signals" ? "listener" : in_type;
          
        var fkey = (value_type.length > 0 ? value_type + " " : "") + key;
                  
        if (type == "listener") {
            if (this.node.listeners.has_key(key)) {
                return;
            }
            this.node.listeners.set(key,value);
        } else  {
        
            if (this.node.props.has_key(fkey)) {
                return;
            }
            this.node.props.set(fkey,value);
        }
               
          
        // add a row???
        this.load(this.file, this.node);
        
        
        
        /// need to find the row which I've just added..
        
        
        var s = this.view.el.get_selection();
        s.unselect_all();
        
        print("trying to find new iter");
      
        this.model.el.foreach((model, path, iter) => {
            GLib.Value gval;
        
            this.model.el.get_value(iter, 0 , out gval);
            if ((string)gval != type) {
                print("not type: %s = %s\n", (string)gval , type);
                return false;
            }
            this.model.el.get_value(iter, 1 , out gval);
            if ((string)gval != fkey) {
                print("not key: %s = %s\n", (string)gval , fkey);
                return false;
            }
            // delay this?
            GLib.Timeout.add_full(GLib.Priority.DEFAULT,40 , () => {
            
                this.startEditingValue(this.model.el.get_path(iter));
                return false;
            });
            //s.select_iter(iter);
            return true; 
        });
        
        
        
                  
    },
    xtype : "VBox",
    keySortFormat : (string key) {
        // listeners first - with 0
        // specials
        if (key[0] == '*') {
            return "1 " + key;
        }
        // functions
        
        var bits = key.split(" ");
        
        if (key[0] == '|') {
            return "2 " + bits[bits.length -1];
        }
        // signals
        if (key[0] == '@') {
            return "3 " + bits[bits.length -1];
        }
            
        // props
        if (key[0] == '#') {
            return "4 " + bits[bits.length -1];
        }
        // the rest..
        return "5 " + bits[bits.length -1];    
    
    
    
    },
    file : "",
    stop_editor : "()",
    show_editor : "(JsRender.JsRender file, JsRender.Node node, string type, string key)",
    keyFormat : (string val, string type) {
        
        // Glib.markup_escape_text(val);
    
        if (type == "listener") {
            return "<span font_weight=\"bold\" color=\"#660000\">" + 
                GLib.Markup.escape_text(val) +
                 "</span>";
        }
        // property..
        if (val.length < 1) {
            return "<span  color=\"#FF0000\">--empty--</span>";
        }
        
        //@ = signal
        //$ = property with 
        //# - object properties
        //* = special
        // all of these... - display value is last element..
        var ar = val.strip().split(" ");
        
        
        var dval = GLib.Markup.escape_text(ar[ar.length-1]);
        
        
        
        
        switch(val[0]) {
            case '@': // signal // just bold balck?
                if (dval[0] == '@') {
                    dval = dval.substring(1);
                }
            
                return @"<span  font_weight=\"bold\">@ $dval</span>";        
            case '#': // object properties?
                if (dval[0] == '#') {
                    dval = dval.substring(1);
                }
                return @"<span  font_weight=\"bold\">$dval</span>";
            case '*': // special
                if (dval[0] == '*') {
                    dval = dval.substring(1);
                }
                return @"<span   color=\"#0000CC\" font_weight=\"bold\">$dval</span>";            
            case '$':
                if (dval[0] == '$') {
                    dval = dval.substring(1);
                }
                return @"<span   style=\"italic\">$dval</span>";
           case '|': // user defined methods
                if (dval[0] == '|') {
                    dval = dval.substring(1);
                }
                return @"<span color=\"#008000\" font_weight=\"bold\">$dval</span>";
                
                  
                
            default:
                return dval;
        }
          
        
    
    },
    changed : "()",
    deleteSelected : () {
        
            Gtk.TreeIter iter;
            Gtk.TreeModel mod;
            
            var s = this.view.el.get_selection();
            s.get_selected(out mod, out iter);
                 
                  
            GLib.Value gval;
            mod.get_value(iter, 0 , out gval);
            var type = (string)gval;
            
            mod.get_value(iter, 1 , out gval);
            var key = (string)gval;
            
            switch(type) {
                case "listener":
                    this.node.listeners.remove(key);
                    break;
                    
                case "props":
                    this.node.props.remove(key);
                    break;
            }
            this.load(this.file, this.node);
            
            _this.changed();
    },
    updateIter : (Gtk.TreeIter iter,  string type, string key, string value) {
    
        print("update Iter %s, %s\n", key,value);
        //typeof(string),  // 0 key type
         //typeof(string),  // 1 key
         //typeof(string),  // 2 key (display)
         //typeof(string),  // 3 value
         //typeof(string),  // 4 value (display)
         //typeof(string),  // 5 both (tooltip)
         //typeof(string),  // 6 key (sort)
        
        var dl = value.strip().split("\n");
    
        var dis_val = dl.length > 1 ? (dl[0].strip()+ "...") : dl[0];
        
        if (type == "listener") {
         
           
            
            this.model.el.set(iter, 
                    0, type,
                1, key,
                2, this.keyFormat(key ,type),
                3, value,
                4, dis_val,
                5, "<tt>" +  GLib.Markup.escape_text(key + " " +value) + "</tt>",
                6,  "0 " + key
            ); 
            return;
        }
        
    
    
        this.model.el.set(iter, 
                0, "props",
                1, key,
                2,  this.keyFormat(key , "prop"),
                3, value,
                4, dis_val,
                 5, "<tt>" + GLib.Markup.escape_text(key + " " + value) + "</tt>",
                 6,  this.keySortFormat(key)
            ); 
    },
    xns : Gtk,
    finish_editing : () {
         // 
        this.before_edit();
    },
    show_add_props : "(string type)",
    startEditingValue : ( Gtk.TreePath path) {
    
        // ONLY return true if editing is allowed - eg. combo..
        
                print("start editing?\n");
                if (!this.stop_editor()) {
                    print("stop editor failed\n");
                    return false;
                }
                
                Gtk.TreeIter iter;
    
                var mod = this.model.el;
                mod.get_iter (out iter, path);
                 
                /*
                    m.set(iter, 
                            0, "listener",
                            1, miter.get_key(),
                            2, "<b>" + miter.get_key() + "</b>",
                            3, miter.get_value()
                        ); 
                 
                */
                GLib.Value gval;
                mod.get_value(iter, 3 , out gval);
                var val = (string)gval;
            
                mod.get_value(iter, 1 , out gval);
                var key = (string)gval;
                var type_ar = key.split(" ");
                
                
                
                mod.get_value(iter, 0 , out gval);
                var type = (string)gval;
                
               
                
                var use_textarea = false;
    
                //------------ things that require the text editor...
                
                if (type == "listener") {
                    use_textarea = true;
                }
                if (key.length > 0 && key[0] == '|') { // user defined method
                    use_textarea = true;
                }
                if (key.length > 0 && key[0] == '$') { // raw string
                    use_textarea = true;
                }
                if (key.length > 0 && key == "* init") {
                    use_textarea = true;
                }
                if (val.length > 40) { // long value...
                    use_textarea = true;
                }
                
                
                
                if (use_textarea) {
                    print("Call show editor\n");
                    GLib.Timeout.add_full(GLib.Priority.DEFAULT,10 , () => {
                        this.view.el.get_selection().select_path(path);
                        
                        this.show_editor(file, node, type, key);
                        
                        return false;
                    });
                   
                    
                    return false;
                }
                // others... - fill in options for true/false?
               print("turn on editing %s \n" , mod.get_path(iter).to_string());
               
                   print (type_ar[0].up());
                    if (type_ar.length > 1 && (
                            type_ar[0].up() == "BOOLEAN"
                            ||
                            type_ar[0].up() == "BOOL"                        
                        )) {
                            print("start editing try/false)???");
                            this.valrender.el.has_entry = false;
                            string[] opts =  { "true", "false" };
                            this.valrender.setOptions(opts);
                            
                            this.valrender.el.has_entry = false;
                            this.valrender.el.editable = true;
                             this.allow_edit  = true;
                             GLib.Timeout.add_full(GLib.Priority.DEFAULT,100 , () => {
                                 this.view.el.set_cursor_on_cell(
                                    path,
                                    this.valcol.el,
                                    this.valrender.el,
                                    true
                                );
                                return false;
                            });
                            return true;
                    }
                                          
                    
               
                 string[] opts =  {  };
                this.valrender.setOptions(opts);
               
               GLib.Timeout.add_full(GLib.Priority.DEFAULT,10 , () => {
                    
                    // at this point - work out the type...
                    // if its' a combo... then show the options..
                    this.valrender.el.has_entry = true;
                    
                    this.valrender.el.editable = true;            
                
                    
                    this.allow_edit  = true;
                    
                    
                    
                    
    
                    this.view.el.set_cursor_on_cell(
                        path,
                        this.valcol.el,
                        this.valrender.el,
                        true
                    );
                    return false;
                });
                return false;
            },
    startEditingKey : ( Gtk.TreePath path) {
        
         if (!this.stop_editor()) {
            return;
         }
      
        // others... - fill in options for true/false?
        
           
        GLib.Timeout.add_full(GLib.Priority.DEFAULT,10 , () => {
            this.allow_edit  = true;
            this.keyrender.el.editable = true;
         
            this.view.el.set_cursor_on_cell(
                path,
                this.keycol.el,
                this.keyrender.el,
                true
            );
                   
            return false;
        });
          
        
    },
    homogeneous : false,
    main_window : "null",
    node : "",
    items : [
    	{
            xtype : "HBox",
            xns : Gtk,
            items : [
            	{
                    xtype : "Button",
                    xns : Gtk,
                    listeners : {
                    	button_press_event : (self, ev) => {
                    	       _this.before_edit();
                    	       
                    	           
                    	       var p = _this.AddPropertyPopup;
                    	       p.el.set_screen(Gdk.Screen.get_default());
                    	       p.el.show_all();
                    	        p.el.popup(null, null, null, ev.button, ev.time);
                    	        return true;
                    	   }
                    },
                    items : [
                    	{
                            xtype : "HBox",
                            xns : Gtk,
                            items : [
                            	{
                                    xtype : "Image",
                                    stock : Gtk.STOCK_ADD,
                                    xns : Gtk,
                                    icon_size : Gtk.IconSize.MENU
                                },
                            	{
                                    label : "Other",
                                    xtype : "Label",
                                    xns : Gtk
                                }
                            ]

                        },
                    	{
                            id : "AddPropertyPopup",
                            xtype : "Menu",
                            xns : Gtk,
                            items : [
                            	{
                                    label : "ID",
                                    xtype : "MenuItem",
                                    tooltip_markup : "Using this.get('*someid') will find any id in an application.",
                                    xns : Gtk,
                                    listeners : {
                                    	activate : ()  => {
                                    	       _this.addProp( "prop", "id", "", "string");
                                    	   }
                                    }
                                },
                            	{
                                    label : "PACK",
                                    xtype : "MenuItem",
                                    tooltip_markup : "Add what type of packing is to be used",
                                    xns : Gtk,
                                    listeners : {
                                    	activate : ( ) => {
                                    	   
                                    	       _this.addProp( "prop", "pack","add", "*");
                                    	   }
                                    }
                                },
                            	{
                                    label : "INIT",
                                    xtype : "MenuItem",
                                    tooltip_markup : "Override the init method",
                                    xns : Gtk,
                                    listeners : {
                                    	activate : ( ) => {
                                    	   
                                    	       _this.addProp( "prop",  "init", "{\n\n}\n", "*" );
                                    	   }
                                    }
                                },
                            	{
                                    xtype : "SeparatorMenuItem",
                                    xns : Gtk
                                },
                            	{
                                    label : "String",
                                    xtype : "MenuItem",
                                    tooltip_markup : "Add a user defined string property",
                                    xns : Gtk,
                                    listeners : {
                                    	activate : (self) => {
                                    	   
                                    	       _this.addProp( "prop", "XXXX", "","string");
                                    	   
                                    	   }
                                    }
                                },
                            	{
                                    label : "Number",
                                    xtype : "MenuItem",
                                    tooltip_markup : "Add a user defined number property",
                                    xns : Gtk,
                                    listeners : {
                                    	activate : ( ) =>{
                                    	   
                                    	       _this.addProp("prop",  "XXX", "0", "int");
                                    	   }
                                    }
                                },
                            	{
                                    label : "Boolean",
                                    xtype : "MenuItem",
                                    tooltip_markup : "Add a user defined boolean property",
                                    xns : Gtk,
                                    listeners : {
                                    	activate : ( ) =>{
                                    	   
                                    	       _this.addProp( "prop", "XXX", "true", "bool");
                                    	   }
                                    }
                                },
                            	{
                                    xtype : "SeparatorMenuItem",
                                    xns : Gtk
                                },
                            	{
                                    label : "Javascript Function",
                                    xtype : "MenuItem",
                                    tooltip_markup : "Add a user function boolean property",
                                    xns : Gtk,
                                    listeners : {
                                    	activate : ( ) =>{
                                    	   
                                    	       _this.addProp("prop",  "XXXX", "function() { }", "| function");
                                    	   }
                                    }
                                },
                            	{
                                    label : "Vala Method",
                                    xtype : "MenuItem",
                                    tooltip_markup : "Add a user function boolean property",
                                    xns : Gtk,
                                    listeners : {
                                    	activate : ( ) =>{
                                    	   
                                    	       _this.addProp( "prop", "XXXX", "() {\n\n}\n", "| return_type");
                                    	   }
                                    }
                                }
                            ]

                        }
                    ]

                }
            ]

        },
    	{
            editing : false,
            id : "EditProps",
            shadow_type : Gtk.ShadowType.IN,
            xtype : "ScrolledWindow",
            xns : Gtk,
            items : [
            	{
                    id : "view",
                    tooltip_column : 5,
                    xtype : "TreeView",
                    enable_tree_lines : TRUE,
                    headers_visible : TRUE,
                    xns : Gtk,
                    listeners : {
                    	button_press_event : ( ev)  => {
                    	    
                    	       Gtk.TreeViewColumn col;
                    	       int cell_x;
                    	       int cell_y;
                    	       Gtk.TreePath path;
                    	       if (!this.el.get_path_at_pos((int)ev.x, (int) ev.y, out path, out col, out cell_x, out cell_y )) {
                    	           print("nothing selected on click");
                    	           GLib.Timeout.add_full(GLib.Priority.DEFAULT,10 , () => {
                    	               this.el.get_selection().unselect_all();
                    	   
                    	               return false;
                    	           });
                    	            _this.before_edit();
                    	           return false; //not on a element.
                    	       }
                    	       
                    	        // right click.
                    	        if (ev.type == Gdk.EventType.BUTTON_PRESS  && ev.button == 3) {    
                    	           // show popup!.   
                    	           if (col.title == "Value") {
                    	                _this.before_edit();
                    	               return false;
                    	           }
                    	   
                    	           var p = _this.ContextMenu;
                    	   
                    	           p.el.set_screen(Gdk.Screen.get_default());
                    	           p.el.show_all();
                    	           p.el.popup(null, null, null,  ev.button, ev.time);
                    	           //Seed.print("click:" + res.column.title);
                    	           // select the 
                    	           GLib.Timeout.add_full(GLib.Priority.DEFAULT,10 , () => {
                    	     
                    	               this.el.get_selection().select_path(path);
                    	               return false;
                    	           });
                    	            _this.before_edit();
                    	           return false;
                    	       }
                    	       
                    	        
                    	       if (col.title != "Value") {
                    	           print("col title != Value");
                    	           
                    	           GLib.Timeout.add_full(GLib.Priority.DEFAULT,10 , () => {
                    	               this.el.get_selection().select_path(path);
                    	               return false;
                    	           });
                    	           
                    	           _this.before_edit();
                    	             //  XObject.error("column is not value?");
                    	           return false; // ignore.. - key click.. ??? should we do this??
                    	       }
                    	       
                    	       
                    	       // if the cell can be edited with a pulldown
                    	       // then we should return true... - and let the start_editing handle it?
                    	       
                    	       
                    	       
                    	       
                    	       
                    	       
                    	       
                    	       // currently editing???
                    	   //    if (  this.activePath) {
                    	           
                    	        //   this.activePath = false;
                    	          // stop editing!!!!
                    	        /*
                    	           if (this.get('/Editor').dirty) {
                    	               //if (!this.get('/Editor.buffer').checkSyntax()) {
                    	               //   this.get('/StandardErrorDialog').show("Fix errors in code and save.."); 
                    	               //   return true;
                    	               //    // error Dialog
                    	               //}
                    	               if (!this.get('/Editor.view').save()) {
                    	                   return true;
                    	               }
                    	           }   
                    	           */
                    	           
                    	           //this.EditProps.editableColumn.items[0].el.stop_editing();
                    	           //this.EditProps.editing = false;
                    	       
                    	       //    XObject.error("Currently editing?");
                    	        //   return false;
                    	      // }
                    	       
                    	      // var renderer = this.valrender.el; // set has_entry..
                    	       
                    	       //var type = this.get('/LeftPanel.model').getType(res.path.to_string());
                    	           
                    	       // get options for this type -- this is to support option lists etc..
                    	       //var provider = this.get('/LeftTree').getPaleteProvider();
                    	       //var opts = provider.findOptions(type);
                    	       
                    	   //    if (opts === false) {
                    	           // it's text etnry
                    	   //         this.get('/LeftPanel').editableColumn.setOptions([]);
                    	   //        renderer.has_entry = true;
                    	   //    } else {
                    	   //         this.get('/LeftPanel').editableColumn.setOptions(opts);
                    	   //        renderer.has_entry = false;
                    	   //    }
                    	   
                    	       // we need to set the selected row..
                    	       
                    	        //Gtk.TreePath path;
                    	   
                    	        ;
                    	      //             _this.before_edit(); <<< we really need to stop the other editor..
                    	        _this.keyrender.el.stop_editing(false);
                    	       _this.keyrender.el.editable  =false;
                    	       
                    	              
                    	       return _this.startEditingValue(path); // assumes selected row..
                    	           
                    	      
                    	   
                    	                 
                    	      
                    	   }
                    },
                    items : [
                    	{
                            id : "model",
                            changed : function(str, doRefresh) {
                                if (!this.activePath) {
                                    return;
                                }
                                var iter = new Gtk.TreeIter();
                                this.el.get_iter(iter, new Gtk.TreePath.from_string(this.activePath));
                                
                                this.el.set_value(iter, 1, '' +str);
                                this.el.set_value(iter, 3, '' + this.toShort(str));
                                var type = this.getIterValue(iter, 4);
                            
                                this.el.set_value(iter, 5, type + ' : ' + str);
                                // update the tree...  
                            
                                this.get('/LeftTree.model').changed(this.toJS(), doRefresh); 
                            },
                            xtype : "TreeStore",
                            columns : typeof(string),  // 0 key type
                                 typeof(string),  // 1 key
                                 typeof(string),  // 2 key (display)
                                 typeof(string),  // 3 value
                                 typeof(string),   // 4 value (display)
                                 typeof(string),   // 5 both (tooltip)     
                                 typeof(string)   // 6 key (for sorting),
                            n_columns : 7,
                            xns : Gtk,
                            toShort : function(str) {
                                var a = typeof(str) == 'string' ? str.split("\n") : [];
                                    return a.length > 1 ? a[0] + '....' : '' + str;
                            }
                        },
                    	{
                            id : "keycol",
                            title : "Name",
                            xtype : "TreeViewColumn",
                            resizable : TRUE,
                            xns : Gtk,
                            items : [
                            	{
                                    id : "keyrender",
                                    xtype : "CellRendererText",
                                    xns : Gtk,
                                    listeners : {
                                    	editing_started : (  editable, path) => {
                                    	   
                                    	        Gtk.TreeIter  iter;
                                    	       _this.model.el.get_iter(out iter, new Gtk.TreePath.from_string(path));
                                    	       GLib.Value gval;
                                    	                     
                                    	   
                                    	   
                                    	        //   this.get('/LeftPanel.model').activePath  = path;
                                    	       _this.model.el.get_value(iter,1, out gval);
                                    	           var val = (string)gval;
                                    	                    
                                    	           ((Gtk.Entry)editable).set_text(val);                 
                                    	   },
                                    	edited : (path, newtext) => {
                                    	           print("Keyrender  - signal:edited\n");
                                    	       
                                    	       this.el.editable = false;
                                    	     
                                    	    
                                    	   
                                    	           Gtk.TreeIter  iter;
                                    	           _this.model.el.get_iter(out iter, new Gtk.TreePath.from_string(path));
                                    	           GLib.Value gval;
                                    	           
                                    	            _this.model.el.get_value(iter,1, out gval);
                                    	           var oldval = (string)gval;
                                    	           
                                    	            _this.model.el.get_value(iter,0, out gval);
                                    	           var ktype = (string)gval;
                                    	          
                                    	           _this.model.el.set_value(iter, 1, newtext);
                                    	           
                                    	           print("ktype: %s\n",ktype);
                                    	           switch(ktype) {
                                    	               case "listener":
                                    	                   var ov = _this.node.listeners.get(oldval);
                                    	                   _this.node.listeners.set(newtext, ov);
                                    	                   _this.node.listeners.remove(oldval);
                                    	                   
                                    	                   _this.updateIter(iter,  ktype, newtext, ov);
                                    	                   
                                    	                   break;
                                    	               case "props":
                                    	                   var ov = _this.node.props.get(oldval);
                                    	                   _this.node.props.set(newtext, ov);
                                    	                   _this.node.props.remove(oldval);
                                    	                   _this.updateIter(iter,  ktype, newtext, ov);
                                    	                   break;
                                    	            }
                                    	            _this.changed();
                                    	             
                                    	   }
                                    }
                                }
                            ]

                        },
                    	{
                            id : "valcol",
                            title : "Value",
                            xtype : "TreeViewColumn",
                            resizable : TRUE,
                            xns : Gtk,
                            items : [
                            	{
                                    model : {
                                        id : "valrendermodel",
                                        xtype : "ListStore",
                                        columns : typeof(string),
                                        n_columns : 1,
                                        xns : Gtk
                                    },
                                    id : "valrender",
                                    xtype : "CellRendererCombo",
                                    editable : FALSE,
                                    has_entry : TRUE,
                                    xns : Gtk,
                                    text_column : 0,
                                    setOptions : (string[] ar) {
                                          var m = _this.valrendermodel.el;
                                            m.clear();
                                         Gtk.TreeIter iret;
                                        for (var i =0; i < ar.length; i++) {
                                                m.append(out iret);
                                                m.set_value(iret, 0, ar[i]);
                                        }
                                    
                                    },
                                    listeners : {
                                    	editing_started : ( editable, path) => {
                                    	       //_this.editing = true;
                                    	       print("editing started called\n");
                                    	       if (!_this.allow_edit) {
                                    	          
                                    	            print("val - editing_Started\n");
                                    	           this.el.editable = false; // make sure it's not editor...
                                    	      
                                    	            
                                    	           return;
                                    	       }
                                    	        _this.allow_edit =false;
                                    	       
                                    	      
                                    	        if (       this.el.has_entry ) {
                                    	      
                                    	            Gtk.TreeIter  iter;
                                    	           _this.model.el.get_iter(out iter, new Gtk.TreePath.from_string(path));
                                    	           GLib.Value gval;
                                    	                         
                                    	   
                                    	         
                                    	            //   this.get('/LeftPanel.model').activePath  = path;
                                    	          _this.model.el.get_value(iter,3, out gval);
                                    	       
                                    	   
                                    	           var val = (string)gval;
                                    	           var combo =        (Gtk.ComboBox)editable;
                                    	   
                                    	          var entry =  (Gtk.Entry) combo.get_child();        
                                    	       entry.set_text(val);
                                    	       }
                                    	      
                                    	   },
                                    	edited : (path, newtext) => {
                                    	       print("Valrender  - signal:edited\n");
                                    	     
                                    	           this.el.editable = false;
                                    	   /*  
                                    	    m.set(iter, 
                                    	                   0, "listener",
                                    	                   1, miter.get_key(),
                                    	                   2, "<b>" + miter.get_key() + "</b>",
                                    	                   3, miter.get_value(),
                                    	                   4, display_value(short);
                                    	               ); 
                                    	   
                                    	     */      
                                    	   
                                    	           Gtk.TreeIter  iter;
                                    	           _this.model.el.get_iter(out iter, new Gtk.TreePath.from_string(path));
                                    	           GLib.Value gval;
                                    	           
                                    	            _this.model.el.get_value(iter,0, out gval);
                                    	           var ktype = (string)gval;
                                    	           
                                    	           
                                    	            _this.model.el.get_value(iter,3, out gval);
                                    	           var oldval = (string)gval;
                                    	           
                                    	            _this.model.el.get_value(iter,1, out gval);
                                    	           var key = (string)gval;
                                    	           
                                    	            
                                    	           
                                    	           switch(ktype) {
                                    	               case "listener":
                                    	                   _this.node.listeners.set(key, newtext);
                                    	                   _this.updateIter(iter,ktype,key,newtext);
                                    	                   break;
                                    	               case "props":
                                    	                   _this.node.props.set(key,newtext);
                                    	                   _this.updateIter(iter,ktype, key,newtext);                
                                    	                   break;
                                    	            }
                                    	   //         _this.load(_this.file,_this.node);
                                    	            _this.changed();
                                    	             
                                    	   }
                                    },
                                    items : [

                                    ]

                                }
                            ]

                        }
                    ]

                },
            	{
                    id : "ContextMenu",
                    xtype : "Menu",
                    xns : Gtk,
                    items : [
                    	{
                            label : "Edit",
                            xtype : "MenuItem",
                            xns : Gtk,
                            listeners : {
                            	activate : ( )  =>{
                            	     
                            	       var s = _this.view.el.get_selection();
                            	       Gtk.TreeIter iter;
                            	       Gtk.TreeModel model;
                            	       s.get_selected (out  model, out  iter);
                            	       _this.startEditingKey(model.get_path(iter));
                            	   }
                            }
                        },
                    	{
                            xtype : "SeparatorMenuItem",
                            xns : Gtk
                        },
                    	{
                            label : "Delete",
                            xtype : "MenuItem",
                            xns : Gtk,
                            listeners : {
                            	activate : ( )  =>{
                            	   	_this.deleteSelected();
                            	   }
                            }
                        }
                    ]

                }
            ]

        }
    ]

});
WindowLeftProps.init();
XObject.cache['/WindowLeftProps'] = WindowLeftProps;
