//<Script type="text/javascript">
Gio = imports.gi.Gio;
Gtk = imports.gi.Gtk;
GObject = imports.gi.GObject;
XN = imports.xnew;
console = imports.console;
Pango = imports.gi.Pango ;
var _view;

var SV = imports.gi.GtkSource;

if (!SV) {
    Seed.die("Failed to load SourceView");
   }
x = new SV.View();

var _view = false;
var _win = false;

function create() // parent?
{
    
            
    return {
        xns : 'Gtk',
        xtype: 'ScrolledWindow',
        listeners : {
            _new : function() {
                _win = this;
            }
        },
        set : {
            set_shadow_type : [ Gtk.ShadowType.IN ]
        },
        
        items : [
            {
                xns : 'GtkSource',
                xtype : 'View',
                
                
                listeners : {
                    _new : function () {
                        _view = this;
                    },
                    _rendered : function()
                    {
                       
                        this.el.get_buffer().signal.changed.connect(function() {
                            var s = new Gtk.TextIter();
                            var e = new Gtk.TextIter();
                            _view.el.get_buffer().get_start_iter(s);
                            _view.el.get_buffer().get_end_iter(e);
                            var str = _view.el.get_buffer().get_text(s,e,true);
                            imports['Builder/LeftPanel.js']._model.changed(  str , false);
                        })
                       
                        var description = Pango.Font.description_from_string("monospace")
                        description.set_size(8000);
                        this.el.modify_font(description);
                
                        return;
                        
                         Seed.print("open "+ __script_path__);
                        var file = Gio.file_new_for_path(__script_path__+'/RightEditor.js');
                        var _this = this;
                                                
                        file.read_async(0, null, function(source,result) {
                            var stream = source.read_finish(result);
                            var dstream = new Gio.DataInputStream.c_new(stream);
                            var data =  dstream.read_until("", 0);
                            _view.el.get_buffer().set_text(data, data.length);
                            var lm = SV.LanguageManager.get_default();
                            
                            _view.el.get_buffer().set_language(lm.get_language('js'));
                            
                          //  consol
                        });
                        
                    }
                   //'line-mark-activated' : line_mark_activated,
                   
                },
                
                load : function(str) {
                    _view.el.get_buffer().set_text(str, str.length);
                    var lm = SV.LanguageManager.get_default();
                    
                    _view.el.get_buffer().set_language(lm.get_language('js'));
                    var buf = _view.el.get_buffer();
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
                    
                    
                    
                    _view.el.grab_focus();
                },
                
              buffer : new SV.Buffer()
                
                /* things we can read.. - to copy settings..
                    this.get_show_line_numbers ();
                    this.get_show_line_marks ();
                    this.get_show_right_margin ();

                    this.get_highlight_current_line ();
                    this.get_wrap_mode () != Gtk.WRAP_NONE

                    this.get_auto_indent ();
                    this.get_insert_spaces_instead_of_tabs ();
                    this.get_indent_width ();

                    
                    
                */
                
                
                
                
                /*Color color;
                
                function mark_tooltip_func  (mark)
                {
                    var iter = new Gtk.TextIter;;
                    var buf = mark.get_buffer ();                                
                    buf.get_iter_at_mark (iter, mark);
                    var line = iter.get_line (iter) + 1;
                    column = iter.get_line_offset (iter);

                    if ((mark.get_category () == "one")) {
                        return "Line:" + line + "  Column: " + column;
                    }
                    
                    return "<b>Line</b>:" + line + "\n<i>Column:</i>" + column;
                    
                }
                
                var color = new Gdk.Color();
                
                Gtk.Color.parse("lightgreen", color);
                
                this.set_mark_category_background (view, "one", color);
                this.set_mark_category_icon_from_stock (view, "one", GTK_STOCK_YES);
                this.set_mark_category_priority (view, "one", 1);
                this.set_mark_category_tooltip_func (view,  "one", mark_tooltip_func, null, null);

                gdk_color_parse ("pink", color);
                this.set_mark_category_background (view, "two", &color);
                this.set_mark_category_icon_from_stock (view, "two", GTK_STOCK_NO);
                this.set_mark_category_priority (view, "two", 2);
                this.set_mark_category_tooltip_markup_func (view, "two", mark_tooltip_func, NULL, NULL);
       */

                
            }
        ]
    };
        
        
    
    
    
}
    
