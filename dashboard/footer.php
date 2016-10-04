<script src="js/gauge.js"></script>
<script src="js/jquery-1.11.1.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/chart.min.js"></script>
<script src="js/chart-data.js"></script>
<script src="js/easypiechart.js"></script>
<script src="js/easypiechart-data.js"></script>
<script src="js/bootstrap-datepicker.js"></script>
<script>
    jQuery(document).ready(function () {
        var percentColors = [[0.0, "#a9d70b" ], [0.50, "#f9c802"], [1.0, "#ff0000"]];
        var opts = {
            percentColors:percentColors,
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
        var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
        gauge.maxValue = 3000; // set max gauge value
        gauge.animationSpeed = 32; // set animation speed (32 is default value)
        gauge.set(1250); // set actual value
    });

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
</body>

</html>
