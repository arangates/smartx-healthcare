
<script src="js/jquery-1.11.1.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/chart.min.js"></script>
<script src="js/chart-data.js"></script>
<script src="js/easypiechart.js"></script>
<script src="js/easypiechart-data.js"></script>
<script src="js/bootstrap-datepicker.js"></script>
<script src="js/main.js"></script>
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
            getAllGaugeData();
            setInterval(getAllGaugeData, 3000);
        });
<?php } ?>
    
</script>
</body>

</html>
