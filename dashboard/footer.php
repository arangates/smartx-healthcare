<script src="js/gauge.js"></script>
<script src="js/jquery-1.11.1.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/chart.min.js"></script>
<script src="js/chart-data.js"></script>
<script src="js/easypiechart.js"></script>
<script src="js/easypiechart-data.js"></script>
<script src="js/bootstrap-datepicker.js"></script>
<script>
//    $('#calendar').datepicker({
//    });
//
//    !function ($) {
//        $(document).on("click", "ul.nav li.parent > a > span.icon", function () {
//            $(this).find('em:first').toggleClass("glyphicon-minus");
//        });
//        $(".sidebar span.icon").find('em:first').addClass("glyphicon-plus");
//    }(window.jQuery);
//
//    $(window).on('resize', function () {
//        if ($(window).width() > 768)
//            $('#sidebar-collapse').collapse('show')
//    })
//    $(window).on('resize', function () {
//        if ($(window).width() <= 767)
//            $('#sidebar-collapse').collapse('hide')
//    })
</script>
<?php
//echo "<pre>";
//print_r($_SERVER);
//echo "</pre>";
//die();
?>
<script>
<?php if ($_SERVER['SCRIPT_NAME'] == "/smartx-healthcare/dashboard/index.php") { ?>
        $(document).ready(function () {
            setInterval(getAllData, 3000);
        });
<?php } ?>
    function getAllData() {
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
                    dp_gauge.maxValue = 120;
                    sp_gauge.maxValue = 180;
                    temp_gauge.maxValue = 30; // set max gauge value
                    pulse_gauge.animationSpeed = dp_gauge.animationSpeed = sp_gauge.animationSpeed = temp_gauge.animationSpeed = 32; // set animation speed (32 is default value)                    
//                if (result[0].pulse != $(".pulse_value").html()) {
                    $(".pulse_value").html(result[0].pulse);
                    pulse_gauge.set(result[0].pulse); // set actual value
//                }
//                if (dp != $(".dp_value").html()) {
                    $(".dp_value").html(dp);
                    dp_gauge.set(dp); // set actual value
//                }
//                if (sp != $(".sp_value").html()) {
                    $(".sp_value").html(sp);
                    sp_gauge.set(sp); // set actual value
//                }
//                if (result[0].temperature != $(".temp_value").html()) {
                    $(".temp_value").html(result[0].temperature);
                    temp_gauge.set(result[0].temperature); // set actual value
//                }
                    //analytics
                    if (dp <= 80 && sp <= 120) {
                        $("#bp_cat").html("Normal blood pressure");
                    } else if ((dp > 80 && dp <= 89) || (sp > 120 && sp <= 139)) {
                        $("#bp_cat").html("Prehypertension");
                    } else if ((dp > 90 && dp <= 99) || (sp > 140 && sp <= 159)) {
                        $("#bp_cat").html("Stage 1 hypertension");
                    } else if (dp > 100 || sp > 160) {
                        $("#bp_cat").html("Stage 2 hypertension");
                    }
                }
            }});
    }
</script>
</body>

</html>
