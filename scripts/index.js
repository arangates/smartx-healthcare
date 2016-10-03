// BP realtime data

setInterval(function() {
		var pulse = parseFloat(document.getElementById('pulse').innerHTML);
		console.log(document.getElementById('pulse').innerHTML);
		pulse = pulse + 0.1;
		document.getElementById('pulse').innerHTML = pulse.toFixed(1);

}, 1000)

setInterval(function() {
		var pulseavg = parseFloat(document.getElementById('pulseavg').innerHTML);
		pulseavg = pulseavg + 0.1;
		document.getElementById('pulseavg').innerHTML = pulseavg.toFixed(1);

}, 1500)

setInterval(function() {
		var pulsemax = parseFloat(document.getElementById('pulsemax').innerHTML);
		pulsemax = pulsemax + 1.1;
		document.getElementById('pulsemax').innerHTML = pulsemax.toFixed(1);

}, 1000)

setInterval(function() {
		var pulselast = parseFloat(document.getElementById('pulselast').innerHTML);
		pulselast = pulselast + 0.1;
		document.getElementById('pulselast').innerHTML = pulselast.toFixed(1);

}, 1000)


// BP realtime data

setInterval(function() {
		var bp = parseFloat(document.getElementById('bp').innerHTML);
		bp = bp + 0.1;
		document.getElementById('bp').innerHTML = bp.toFixed(1);
		console.log(document.getElementById('bp').innerHTML);

}, 1000)

setInterval(function() {
		var bpavg = parseFloat(document.getElementById('bpavg').innerHTML);
		bpavg = bpavg + 0.1;
		document.getElementById('bpavg').innerHTML = bpavg.toFixed(1);

}, 1500)

setInterval(function() {
		var bpmax = parseFloat(document.getElementById('bpmax').innerHTML);
		bpmax = bpmax + 1.1;
		document.getElementById('bpmax').innerHTML = bpmax.toFixed(1);

}, 1000)

setInterval(function() {
		var bplast = parseFloat(document.getElementById('bplast').innerHTML);
		bplast = bplast + 0.1;
		document.getElementById('bplast').innerHTML = bplast.toFixed(1);

}, 1000)



// Temperature realtime data

setInterval(function() {
		var temperature = parseFloat(document.getElementById('temperature').innerHTML);
		temperature = temperature + 0.1;
		document.getElementById('temperature').innerHTML = temperature.toFixed(1);

}, 1000)

setInterval(function() {
		var temperatureavg = parseFloat(document.getElementById('temperatureavg').innerHTML);
		temperatureavg = temperatureavg + 0.1;
		document.getElementById('temperatureavg').innerHTML = temperatureavg.toFixed(1);

}, 1500)

setInterval(function() {
		var temperaturemax = parseFloat(document.getElementById('temperaturemax').innerHTML);
		temperaturemax = temperaturemax + 1.1;
		document.getElementById('temperaturemax').innerHTML = temperaturemax.toFixed(1);

}, 1000)

setInterval(function() {
		var temperaturelast = parseFloat(document.getElementById('temperaturelast').innerHTML);
		temperaturelast = temperaturelast + 0.1;
		document.getElementById('temperaturelast').innerHTML = temperaturelast.toFixed(1);

}, 1000)
