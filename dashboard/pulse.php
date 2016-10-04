<?php include './header.php'; ?>
<div class="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">	
    <div class="row">
        <div class="col-lg-12">
            <h1 class="page-header">Pulse</h1>
        </div>
    </div><!--/.row-->
    <div class="row">
        <div class="col-lg-12">
            <div class="panel panel-default">
                <div class="panel-heading">Pulse rate / Time(H:M:S)</div>
                <div class="panel-body">
                    <div class="canvas-wrapper">
                        <canvas class="main-chart" id="line-chart" height="200" width="600"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </div><!--/.row-->
</div>
<?php include './footer.php'; ?>
<script>
    var timestamp_array = [];
    var pulse_array = [];
    $(document).ready(getAllData);
    function getAllData() {
        $.ajax({url: "http://52.39.9.186:3000/api/feed/latest/10001/10", success: function (result) {
                $.each(result, function (index, value) {
                    var date_temp = new Date(value.time * 1000);
                    var hours = date_temp.getHours();
                    var minutes = "0" + date_temp.getMinutes();
                    var seconds = "0" + date_temp.getSeconds();
                    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
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
            }});
    }
</script>