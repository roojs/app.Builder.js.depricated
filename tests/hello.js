
function hello(w) {
	var a = JSON.parse(w);
	a.test=1;
	return JSON.stringify(a)+'xxa';

}
