 

namespace Palete {

    class CompletionProvider : Gtk.SourceCompletionProvider, Object
    {
		
		 public List<Gtk.SourceCompletionItem> proposals;
		//public List<Gtk.SourceCompletionItem> filtered_proposals;

		construct
		{
		   
			this.proposals = new List<Gtk.SourceCompletionItem> ();
		}

		public string get_name ()
		{
		  return  "test";
		}

		public int get_priority ()
		{
		  return 1;
		}

		public bool match (Gtk.SourceCompletionContext context)
		{
		
			return true;
		}

		public void populate (Gtk.SourceCompletionContext context)
		{
			var buffer = context.completion.view.buffer;
			var  mark = buffer.get_insert ();
			TextIter end;

			buffer.get_iter_at_mark (out end, mark);
			var endpos = end;
			
			var searchpos = endpos;
			
			searchpos.backward_find_char(is_space, null);
			searchpos.forward_char();
			var search = endpos.get_text(searchpos);
			
			

			var filtered_proposals = new List<Gtk.SourceCompletionItem> ();
			foreach(var i in this.proposals) {
				//if(i.text.contains(search)) // starts??
				//	this.filtered_proposals.prepend (new Gtk.SourceCompletionItem (i.label, i.text, i.icon, i.info));
				//}
			}
			context.add_proposals (this, filtered_proposals, true);
		}

		public bool activate_proposal (Gtk.SourceCompletionProposal proposal, Gtk.TextIter iter)
		{
			var istart = iter;
			istart.backward_find_char(is_space, null);
			istart.forward_char();

		//    var search = iter.get_text(istart);	    
		
			var buffer = iter.get_buffer();
			buffer.delete(ref istart, ref iter);
			buffer.insert(ref istart, proposal.get_text(), -1);
		
			return true;
		}

		public Gtk.SourceCompletionActivation get_activation ()
		{
			//if(SettingsManager.Get_Setting("complete_auto") == "true"){
				return Gtk.SourceCompletionActivation.INTERACTIVE | Gtk.SourceCompletionActivation.USER_REQUESTED;
			//} else {
			//	return Gtk.SourceCompletionActivation.USER_REQUESTED;
			//}
		}

		public int get_interactive_delay ()
		{
			return -1;
		}

		public bool get_start_iter (Gtk.SourceCompletionContext context, Gtk.SourceCompletionProposal proposal, Gtk.TextIter iter)
		{
			return false;
		}

		public void update_info (Gtk.SourceCompletionProposal proposal, Gtk.SourceCompletionInfo info)
		{

		}

		private bool is_space(unichar space){
			return space.isspace() || space.to_string() == "";
		}
		
		private bool is_forward_space(unichar space){
			return !(
				space.to_string() == " "
				||
				space.to_string() == ""
				||
				space.to_string() == "\n")
				||
				space.to_string() == ")")
				||
				space.to_string() == "("
				
			);
		}
	}


} 
