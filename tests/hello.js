
function hello(w) {
	var a = JSON.parse(w);
	w.test=1;
	return JSON.stringify(w)+'xx';

}
