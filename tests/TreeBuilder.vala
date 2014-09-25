


public class TreeBuilder : Vala.CodeVisitor {
	private ArrayList<PackageMetaData> packages = new ArrayList<PackageMetaData> ();
	private PackageMetaData source_package;

	private HashMap<Vala.SourceFile, SourceFile> files = new HashMap<Vala.SourceFile, SourceFile> ();
	private HashMap<Vala.Symbol, Symbol> symbol_map = new HashMap<Vala.Symbol, Symbol> ();

	private ErrorReporter reporter;