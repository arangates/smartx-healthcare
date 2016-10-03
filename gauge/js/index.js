setInterval(function() {
		var count = parseFloat(document.getElementsByClassName('count')[0].innerHTML);
		count = count + 0.1;
		document.getElementsByClassName('count')[0].innerHTML = count.toFixed(1);

}, 1000)

setInterval(function() {
		var count = parseFloat(document.getElementsByClassName('small-count')[0].innerHTML);
		count = count + 0.1;
		document.getElementsByClassName('small-count')[0].innerHTML = count.toFixed(1);

}, 1500)

setInterval(function() {
		var count = parseFloat(document.getElementsByClassName('small-count1')[0].innerHTML);
		count = count + 1.1;
		document.getElementsByClassName('small-count1')[0].innerHTML = count.toFixed(1);

}, 1000)

setInterval(function() {
		var count = parseFloat(document.getElementsByClassName('small-count2')[0].innerHTML);
		count = count + 0.1;
		document.getElementsByClassName('small-count2')[0].innerHTML = count.toFixed(1);

}, 1000)
