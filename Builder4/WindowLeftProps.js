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
    xtype: Gtk.VBox,
    id : "LeftProps",
    homogeneous : false,
    'string:keyFormat' : (string val, string type) {
        
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
    'string:keySortFormat' : (string key) {
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
    'void:addProp' : (string in_type, string key, string value, string value_type) {
          // info includes key, val, skel, etype..
          //console.dump(info);
            //type = info.type.toLowerCase();
            //var data = this.toJS();
            
        var type = in_type == "signals" ? "listerner" : in_type;
        
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
        
      
        this.model.el.foreach((model, path, iter) => {
            GLib.Value gval;
        
            this.model.el.get_value(iter, 0 , out gval);
            if ((string)gval != type) {
                return false;
            }
            this.model.el.get_value(iter, 1 , out gval);
            if ((string)gval != fkey) {
                return false;
            }
            this.startEditingValue(this.model.el.get_path(iter));
            //s.select_iter(iter);
            return true; 
        });
        
        
        
                  
    },
    'void:before_edit' : ()
    {
    
        print("before edit - stop editing\n");
        
      // these do not appear to trigger save...
        _this.keyrender.el.stop_editing(false);
        _this.keyrender.el.editable  =false;
    
        _this.valrender.el.stop_editing(false);
        _this.valrender.el.editable  =false;    
        
        
    // technicall stop the popup editor..
    
    },
    'void:deleteSelected' : () {
        
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
    'void:finish_editing' : () {
         // 
        this.before_edit();
    },
    'void:load' : (JsRender.JsRender file, JsRender.Node? node) 
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
        
        while(miter.next()) {
            m.append(out iter,null);
            
            this.updateIter(iter,  "listener", miter.get_key(), miter.get_value());
            
             
         }
         
          
        miter = node.props.map_iterator();
        
        
       while(miter.next()) {
            m.append(out iter,null);
             this.updateIter(iter,  "prop", miter.get_key(), miter.get_value());
             
       }
       print("clear selection\n");
       // clear selection?
       this.model.el.set_sort_column_id(6,Gtk.SortType.ASCENDING); // sort by real key..
       
       this.view.el.get_selection().unselect_all();
       
       
       
    },
    'void:startEditingKey' : ( Gtk.TreePath path) {
        
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
    'void:startEditingValue' : ( Gtk.TreePath path) {
                
                if (!this.stop_editor()) {
                    print("stop editor failed");
                    return;
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
                
                mod.get_value(iter, 0 , out gval);
                var type = (string)gval;
                
                var use_textarea = false;
                
                if (type == "listener") {
                    use_textarea = true;
                }
                if (key.length > 0 && key[0] == '|') {
                    use_textarea = true;
                }
                if (use_textarea) {
                    print("Call show editor\n");
                    GLib.Timeout.add_full(GLib.Priority.DEFAULT,10 , () => {
                        this.view.el.get_selection().select_path(path);
                        
                        this.show_editor(file, node, type, key);
                        
                        return false;
                    });
                   
                    
                    return;
                }
                // others... - fill in options for true/false?
               print("turn on editing %s \n" , mod.get_path(iter).to_string());
                
                GLib.Timeout.add_full(GLib.Priority.DEFAULT,10 , () => {
                    this.allow_edit  = true;
                    this.valrender.el.editable = true;
                    this.view.el.set_cursor_on_cell(
                        path,
                        this.valcol.el,
                        this.valrender.el,
                        true
                    );
                    return false;
                });
                
            },
    'void:updateIter' : (Gtk.TreeIter iter,  string type, string key, string value) {
    
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
    items : [
        {
            xtype: Gtk.HBox,
            pack : "pack_start,false,true,0",
            items : [
                {
                    xtype: Gtk.Button,
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
                    pack : "add",
                    items : [
                        {
                            xtype: Gtk.HBox,
                            pack : "add",
                            items : [
                                {
                                    xtype: Gtk.Image,
                                    pack : "add",
                                    stock : Gtk.STOCK_ADD,
                                    icon_size : Gtk.IconSize.MENU
                                },
                                {
                                    xtype: Gtk.Label,
                                    pack : "add",
                                    label : "Other"
                                }
                            ]
                        },
                        {
                            xtype: Gtk.Menu,
                            pack : false,
                            id : "AddPropertyPopup",
                            items : [
                                {
                                    xtype: Gtk.MenuItem,
                                    listeners : {
                                        activate : ()  => {
                                            _this.addProp( "prop", "id", "", "string");
                                        }
                                    },
                                    label : "ID",
                                    pack : "append",
                                    tooltip_markup : "Using this.get('*someid') will find any id in an application."
                                },
                                {
                                    xtype: Gtk.MenuItem,
                                    listeners : {
                                        activate : ( ) => {
                                        
                                            _this.addProp( "prop", "pack","add", "*");
                                        }
                                    },
                                    label : "PACK",
                                    pack : "append",
                                    tooltip_markup : "Add what type of packing is to be used"
                                },
                                {
                                    xtype: Gtk.MenuItem,
                                    listeners : {
                                        activate : ( ) => {
                                        
                                            _this.addProp( "prop",  "init", "{\n\n}\n", "*" );
                                        }
                                    },
                                    label : "INIT",
                                    pack : "append",
                                    tooltip_markup : "Override the init method"
                                },
                                {
                                    xtype: Gtk.SeparatorMenuItem,
                                    pack : "add"
                                },
                                {
                                    xtype: Gtk.MenuItem,
                                    listeners : {
                                        activate : (self) => {
                                        
                                            _this.addProp( "prop", "XXXX", "","string");
                                        
                                        }
                                    },
                                    label : "String",
                                    pack : "append",
                                    tooltip_markup : "Add a user defined string property"
                                },
                                {
                                    xtype: Gtk.MenuItem,
                                    listeners : {
                                        activate : ( ) =>{
                                        
                                            _this.addProp("prop",  "XXX", "0", "int");
                                        }
                                    },
                                    label : "Number",
                                    pack : "append",
                                    tooltip_markup : "Add a user defined number property"
                                },
                                {
                                    xtype: Gtk.MenuItem,
                                    listeners : {
                                        activate : ( ) =>{
                                        
                                            _this.addProp( "prop", "XXX", "true", "bool");
                                        }
                                    },
                                    label : "Boolean",
                                    pack : "append",
                                    tooltip_markup : "Add a user defined boolean property"
                                },
                                {
                                    xtype: Gtk.SeparatorMenuItem,
                                    pack : "add"
                                },
                                {
                                    xtype: Gtk.MenuItem,
                                    listeners : {
                                        activate : ( ) =>{
                                        
                                            _this.addProp("prop",  "XXXX", "function() { }", "| function");
                                        }
                                    },
                                    label : "Javascript Function",
                                    pack : "append",
                                    tooltip_markup : "Add a user function boolean property"
                                },
                                {
                                    xtype: Gtk.MenuItem,
                                    listeners : {
                                        activate : ( ) =>{
                                        
                                            _this.addProp( "prop", "XXXX", "() {\n\n}\n", "| return_type");
                                        }
                                    },
                                    label : "Vala Method",
                                    pack : "append",
                                    tooltip_markup : "Add a user function boolean property"
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype: Gtk.ScrolledWindow,
            id : "EditProps",
            pack : "pack_end,true,true,0",
            init : {
              
               this.el.set_policy (Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC);
            },
            shadow_type : Gtk.ShadowType.IN,
            items : [
                {
                    xtype: Gtk.TreeView,
                    listeners : {
                        button_press_event : ( ev)  => {
                        
                            _this.before_edit();
                            
                            
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
                                return false; //not on a element.
                            }
                            
                             // right click.
                             if (ev.type == Gdk.EventType.BUTTON_PRESS  && ev.button == 3) {    
                                // show popup!.   
                                if (col.title == "Value") {
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
                                
                                return false;
                            }
                            
                             
                            if (col.title != "Value") {
                                print("col title != Value");
                                
                                GLib.Timeout.add_full(GLib.Priority.DEFAULT,10 , () => {
                                    this.el.get_selection().select_path(path);
                                    return false;
                                });
                                
                                
                                  //  XObject.error("column is not value?");
                                return false; // ignore.. - key click.. ??? should we do this??
                            }
                            
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
                             
                            _this.startEditingValue(path); // assumes selected row..
                                
                           //Seed.print("click" + ev.type);
                            //console.dump(res);
                            return false;
                        
                                      
                           
                        }
                    },
                    id : "view",
                    tooltip_column : 5,
                    enable_tree_lines : true,
                    headers_visible : true,
                    init : {
                        var selection = this.el.get_selection();
                        selection.set_mode( Gtk.SelectionMode.SINGLE);
                    
                    
                        var description = new Pango.FontDescription();
                        description.set_size(8000);
                        this.el.modify_font(description);
                    },
                    items : [
                        {
                            xtype: Gtk.TreeStore,
                            id : "model",
                            n_columns : 7,
                            pack : "set_model",
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
                            columns : typeof(string),  // 0 key type
                                 typeof(string),  // 1 key
                                 typeof(string),  // 2 key (display)
                                 typeof(string),  // 3 value
                                 typeof(string),   // 4 value (display)
                                 typeof(string),   // 5 both (tooltip)     
                                 typeof(string)   // 6 key (for sorting),
                            toShort : function(str) {
                                var a = typeof(str) == 'string' ? str.split("\n") : [];
                                    return a.length > 1 ? a[0] + '....' : '' + str;
                            }
                        },
                        {
                            xtype: Gtk.TreeViewColumn,
                            id : "keycol",
                            pack : "append_column",
                            title : "Name",
                            init : this.el.add_attribute(_this.keyrender.el , "markup", 2 );
                             this.el.add_attribute(_this.keyrender.el , "text", 1 );,
                            resizable : true,
                            items : [
                                {
                                    xtype: Gtk.CellRendererText,
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
                                    },
                                    id : "keyrender",
                                    pack : "pack_start,false"
                                }
                            ]
                        },
                        {
                            xtype: Gtk.TreeViewColumn,
                            id : "valcol",
                            pack : "append_column",
                            resizable : true,
                            title : "Value",
                            init : {
                            	
                            	//     typeof(string),  // 0 key type
                                // typeof(string),  // 1 key
                                // typeof(string),  // 2 key (display)
                                // typeof(string),  // 3 value
                                // typeof(string)   // 4 value (display)
                            
                            	
                            	this.el.add_attribute(_this.valrender.el , "text", 4 );
                            	//this.el.add_attribute(_this.valrender.el , "sensitive", 4 );
                            	//this.el.add_attribute(this.items[0].el , 'editable', 3 );
                                      // this.el.set_cell_data_func(cell, age_cell_data_func, NULL, NULL);
                            
                             //	this.get('/LeftPanel').editableColumn= this;
                            },
                            items : [
                                {
                                    xtype: Gtk.CellRendererCombo,
                                    listeners : {
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
                                                  
                                        },
                                        editing_started : ( editable, path) => {
                                            //_this.editing = true;
                                            if (!_this.allow_edit) {
                                               
                                                 print("val - editing_Started\n");
                                                this.el.editable = false; // make sure it's not editor...
                                           
                                                 
                                                return;
                                            }
                                             _this.allow_edit =false;
                                            
                                           
                                           
                                           
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
                                    id : "valrender",
                                    pack : "pack_start,true",
                                    text_column : 0,
                                    editable : false,
                                    has_entry : true,
                                    model : {
                                        xtype: Gtk.ListStore,
                                        columns : typeof(string),
                                        n_columns : 1,
                                        pack : false
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: Gtk.Menu,
                    id : "ContextMenu",
                    pack : false,
                    items : [
                        {
                            xtype: Gtk.MenuItem,
                            listeners : {
                                activate : ( )  =>{
                                  
                                    var s = _this.view.el.get_selection();
                                    Gtk.TreeIter iter;
                                    Gtk.TreeModel model;
                                    s.get_selected (out  model, out  iter);
                                    _this.startEditingKey(model.get_path(iter));
                                }
                            },
                            label : "Edit",
                            pack : "append"
                        },
                        {
                            xtype: Gtk.SeparatorMenuItem,
                            pack : "append"
                        },
                        {
                            xtype: Gtk.MenuItem,
                            listeners : {
                                activate : ( )  =>{
                                	_this.deleteSelected();
                                }
                            },
                            label : "Delete",
                            pack : "append"
                        }
                    ]
                }
            ]
        }
    ]
});
WindowLeftProps.init();
XObject.cache['/WindowLeftProps'] = WindowLeftProps;
