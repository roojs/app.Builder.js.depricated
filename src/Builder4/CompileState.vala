/**
 * as state management is a bit too complicated inside the builder
 * it's better to seperate this into this class
 * 
 * This class has references to all the Class instances that make up the window..
 * 
 */
public class CompileState : Object 
{
	public Xcls_MainWindow win;

	public enum State {
		NONE,
		PREVIEW,
		OBJECT,
		PROP,
		LISTENER,
		CODE,
		FILES,
		PROJECT // project settings..
	}

	public State state = State.NONE;

	public bool children_loaded = false;

	
	public X
