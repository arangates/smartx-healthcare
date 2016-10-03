var f1,f2,f3;
var pubnub = PUBNUB.init({
    publish_key: 'pub-c-e9228c83-be49-4efa-85b9-3396edf738db',
    subscribe_key: 'sub-c-ba81fc1e-896e-11e6-974e-0619f8945a4f'
});
var channel = "Kcteee";

var pulselast= date();
var bplast = date();
var temperaturelast = date();
// Pulse
eon.chart({
    channel: channel,
    history: true,
    flow: true,
    pubnub: pubnub,
    debug: true,

    generate: {
        bindto: '#pulserealtime',
        data: {
            labels: true
            // type: 'bar'
        }
    },

    transform: function(a) {
        return {
            eon: {
                'pulse': a[0]

            }
        };
    }
});

// BP     
eon.chart({
    channel: channel,
    history: true,
    flow: true,
    pubnub: pubnub,
    debug: true,

    generate: {
        bindto: '#bprealtime',
        data: {
            labels: true,

        }
    },

    transform: function(a) {
        return {
            eon: {
                'blood pressure': a[1]
                // 'c-2': a[4],
                // 'c-3': a[5]
            }
        };
    }
});

//temperature
eon.chart({
    channel: channel,
    generate: {
        bindto: '#temperaturerealtime',
        data: {
            type: 'gauge'
        },
        gauge: {
            min: 0,
            max: 100
        },
        color: {
            pattern: ['#FF0000', '#F6C600', '#60B044'],
            threshold: {
                values: [30, 60, 90]
            }
        }
    },
    transform: function(a) {
        return {
            eon: {
                'Temperature': a[2],
            }
        };
    }
});
(function() {
    var sensors = "http://api.thingspeak.com/channels/18675/feed/last.json";
    $.getJSON(sensors, {
            format: "json"
        })
        .done(function(data) {
            setInterval(function() {
                f1 = data.field1; //realtime pulse
                f2 = data.field2; //realtime bp
                f3 = data.field3; //realtime temperature
                // var f4 = data.field4;
                // var f5 = data.field5;
                // var f6 = data.field6;
                // var f7 = data.field7;
                // var f8=data.field8;
                console.log(f1, f2, f3);
                pubnub.publish({
                    channel: channel,
                    message: [f1, f2, f3]
                });
            }, 1500);
        });
})();

// BP realtime data

setInterval(function() {
		var pulse = parseFloat(f1);
		document.getElementById('pulse').innerHTML = pulse.toFixed(1);

}, 1000)

setInterval(function() {
		var pulseavg = parseFloat(document.getElementById('pulseavg').innerHTML);
			document.getElementById('pulseavg').innerHTML = pulseavg.toFixed(1);

}, 1500)

setInterval(function() {
		var pulsemax = parseFloat(document.getElementById('pulsemax').innerHTML);
		
		document.getElementById('pulsemax').innerHTML = pulsemax.toFixed(1);

}, 1000)

setInterval(function() {
		pulselast = ;
		
		document.getElementById('pulselast').innerHTML = pulselast;

}, 1000)


// BP realtime data

setInterval(function() {
		var bp = parseFloat(f2);
		document.getElementById('bp').innerHTML = bp.toFixed(1);
		console.log(document.getElementById('bp').innerHTML);

}, 1000)

setInterval(function() {
		var bpavg = parseFloat(document.getElementById('bpavg').innerHTML);
		
		document.getElementById('bpavg').innerHTML = bpavg.toFixed(1);

}, 1500)

setInterval(function() {
		var bpmax = parseFloat(document.getElementById('bpmax').innerHTML);
		
		document.getElementById('bpmax').innerHTML = bpmax.toFixed(1);

}, 1000)

setInterval(function() {
		bplast = parseFloat(document.getElementById('bplast').innerHTML);
			document.getElementById('bplast').innerHTML = bplast;

}, 1000)



// Temperature realtime data

setInterval(function() {
		var temperature = parseFloat(f3);
		document.getElementById('temperature').innerHTML = temperature.toFixed(1);

}, 1000)

setInterval(function() {
		var temperatureavg = parseFloat(document.getElementById('temperatureavg').innerHTML);
		document.getElementById('temperatureavg').innerHTML = temperatureavg.toFixed(1);

}, 1500)

setInterval(function() {
		var temperaturemax = parseFloat(document.getElementById('temperaturemax').innerHTML);
		document.getElementById('temperaturemax').innerHTML = temperaturemax.toFixed(1);

}, 1000)

setInterval(function() {
		temperaturelast = parseFloat(document.getElementById('temperaturelast').innerHTML);
		document.getElementById('temperaturelast').innerHTML = temperaturelast;

}, 1000)

