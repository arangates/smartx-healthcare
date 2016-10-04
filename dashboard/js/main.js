var first_time_bp = 0;
function getAllBpData() {
    var timestamp_array = [];
    var dp_array = [];
    var sp_array = [];
    $.ajax({url: "http://52.39.9.186:3000/api/feed/latest/10001/10", success: function (result) {
            if (first_time_bp != result[0].time) {
                first_time_bp = result[0].time;
                $.each(result, function (index, value) {
                    var date_temp = new Date(value.time);
                    var date_str = date_temp.toLocaleDateString();
                    var time_str = date_temp.toLocaleTimeString();
                    var formattedTime = date_str + " " + time_str;
                    timestamp_array.push(formattedTime);
                    dp_array.push(value.diastolic_pressure);
                    sp_array.push(value.systolic_pressure);
                });
                var lineChartData = {
                    labels: timestamp_array,
                    datasets: [
                        {
                            label: "Diastolic Pressure",
                            fillColor: "rgba(220,220,220,0.2)",
                            strokeColor: "rgba(220,220,220,1)",
                            pointColor: "rgba(220,220,220,1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(220,220,220,1)",
                            data: dp_array
                        },
                        {
                            label: "Systolic Ppressure",
                            fillColor: "rgba(48, 164, 255, 0.2)",
                            strokeColor: "rgba(48, 164, 255, 1)",
                            pointColor: "rgba(48, 164, 255, 1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(48, 164, 255, 1)",
                            data: sp_array
                        }
                    ]

                }
                var chart1 = document.getElementById("line-chart").getContext("2d");
                window.myLine = new Chart(chart1).Line(lineChartData, {
                    responsive: true
                });
            }
        }});
}
function getAllGaugeData() {
    $.ajax({
        url: "http://52.39.9.186:3000/api/feed/last/10001",
        success: function (result) {
            console.log(result);
            var dp = result[0].diastolic_pressure;
            var sp = result[0].systolic_pressure;
            if ((result[0].pulse != $(".pulse_value").html()) || (dp != $(".dp_value").html()) || (sp != $(".sp_value").html())) {
                var percentColors = [[0.0, "#a9d70b"], [0.50, "#f9c802"], [1.0, "#ff0000"]];
                var opts = {
                    percentColors: percentColors,
                    lines: 12, // The number of lines to draw
                    angle: 0.15, // The length of each line
                    lineWidth: 0.44, // The line thickness
                    pointer: {
                        length: 0.9, // The radius of the inner circle
                        strokeWidth: 0.035, // The rotation offset
                        color: '#000000' // Fill color
                    },
                    limitMax: 'false', // If true, the pointer will not go past the end of the gauge
                    colorStart: '#6FADCF', // Colors
                    colorStop: '#8FC0DA', // just experiment with them
                    strokeColor: '#E0E0E0', // to see which ones work best for you
                    generateGradient: true
                };
                var target = document.getElementById('pulse_gauge'); // your canvas element
                var target2 = document.getElementById('dp_gauge'); // your canvas element
                var target3 = document.getElementById('sp_gauge'); // your canvas element
                var target4 = document.getElementById('temp_gauge'); // your canvas element
                var pulse_gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
                var dp_gauge = new Gauge(target2).setOptions(opts); // create sexy gauge!
                var sp_gauge = new Gauge(target3).setOptions(opts); // create sexy gauge!
                var temp_gauge = new Gauge(target4).setOptions(opts); // create sexy gauge!
                pulse_gauge.maxValue = 140;
                dp_gauge.maxValue = 160;
                sp_gauge.maxValue = 220;
                temp_gauge.maxValue = 50; // set max gauge value
                pulse_gauge.animationSpeed = dp_gauge.animationSpeed = sp_gauge.animationSpeed = temp_gauge.animationSpeed = 32; // set animation speed (32 is default value)                    
                $(".pulse_value").html(result[0].pulse);
                pulse_gauge.set(result[0].pulse); // set actual value
                $(".dp_value").html(dp);
                dp_gauge.set(dp); // set actual value
                $(".sp_value").html(sp);
                sp_gauge.set(sp); // set actual value
                $(".temp_value").html(result[0].temperature);
                temp_gauge.set(result[0].temperature); // set actual value
                //analytics
                if (dp <= 80 && sp <= 120) {
                    show_normal();
                } else if ((dp > 80 && dp <= 89) || (sp > 120 && sp <= 139)) {
                    prehypertension();
                } else if ((dp > 90 && dp <= 99) || (sp > 140 && sp <= 159)) {
                    hypertension1();
                } else if (dp > 100 || sp > 160) {
                    hypertension1();
                }
            }
        }});
}
var first_time_pulse = 0;
function getAllPulseData() {
    var timestamp_array = [];
    var pulse_array = [];
    $.ajax({url: "http://52.39.9.186:3000/api/feed/latest/10001/10", success: function (result) {            
            if (first_time_pulse != result[0].time) {
                first_time_pulse = result[0].time;
                $.each(result, function (index, value) {
                    console.log(value);
                    var date_temp = new Date(value.time);
                    var date_str = date_temp.toLocaleDateString();
                    var time_str = date_temp.toLocaleTimeString();
                    var formattedTime = date_str + " " + time_str;
                    timestamp_array.push(formattedTime);
                    pulse_array.push(value.pulse);
                });
                var lineChartData = {
                    labels: timestamp_array,
                    datasets: [
                        {
                            label: "Last 10 Pulse data",
                            fillColor: "rgba(48, 164, 255, 0.2)",
                            strokeColor: "rgba(48, 164, 255, 1)",
                            pointColor: "rgba(48, 164, 255, 1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(220,220,220,1)",
                            data: pulse_array
                        },
                    ]

                }
                var chart1 = document.getElementById("line-chart").getContext("2d");
                window.myLine = new Chart(chart1).Line(lineChartData, {
                    responsive: true
                });
            }
        }});
}
var first_time_temp = 0;
function getAllTempData() {
    var timestamp_array = [];
    var temp_array = [];
    $.ajax({url: "http://52.39.9.186:3000/api/feed/latest/10001/10", success: function (result) {            
            if (first_time_temp != result[0].time) {
                first_time_temp = result[0].time;
                $.each(result, function (index, value) {
                    console.log(value);
                    var date_temp = new Date(value.time);
                    var date_str = date_temp.toLocaleDateString();
                    var time_str = date_temp.toLocaleTimeString();
                    var formattedTime = date_str + " " + time_str;
                    timestamp_array.push(formattedTime);
                    temp_array.push(value.temperature);
                });
                var lineChartData = {
                    labels: timestamp_array,
                    datasets: [
                        {
                            label: "Last 10 Pulse data",
                            fillColor: "rgba(48, 164, 255, 0.2)",
                            strokeColor: "rgba(48, 164, 255, 1)",
                            pointColor: "rgba(48, 164, 255, 1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(220,220,220,1)",
                            data: temp_array
                        },
                    ]

                }
                var chart1 = document.getElementById("line-chart").getContext("2d");
                window.myLine = new Chart(chart1).Line(lineChartData, {
                    responsive: true
                });
            }
        }});
}
function show_normal(){
    $("#bp_cat").html("<b>Great! </b>You have Normal blood pressure");
    
}
function prehypertension(){
    $("#bp_cat").html("Prehypertension");
    $("#bp_cat").append("Someone has started taking tensions!");
}
function hypertension1(){
    $("#bp_cat").html("It seems, you have been detected with stage 1 Hypertension");
    $("#bp_cat").append("<h3 class='red'> Take deep breaths, cool down!</h3>");
}
function hypertension2(){
    $("#bp_cat").html("Stage 2 hypertension");
    $("#bp_cat").append("<h1>Call the ambulance!</h1>");
}