$(document).ready(function() {
    $("#process").click(function() {
        try{
            var input = JSON.parse($("#input").val());
            var totalTaskTime = input.end - input.start;
            var output = "<div id='timeline' class='col-sm-4'><p><strong>Total task time</strong>: " + (totalTaskTime / 1000) + " s </p>";
            var previousTimestamp;
            var previousPage;
            var graph = "<div id='graph' class='col-sm-8'>";

            $.each(input, function(key, value) {
                if (key == "start") {
                    previousTimestamp = value;
                    previousPage = "main";
                } else if (key != "end") {
                    var time = key - previousTimestamp;

                    output += "<p>Time in <strong>" + previousPage + "</strong>: " + (time / 1000) + " s</p>";
                    graph += "<div style='height: " + (time/totalTaskTime * 100) + "%; width: 100%;' class='" + previousPage + "-graph'>" + previousPage + "</div>";
                    previousPage = value.substr(1);
                    previousTimestamp = key;
                } else {
                    var time = value - previousTimestamp;

                    output += "<p>Time in <strong>" + previousPage + "</strong>: " + (time / 1000) + " s</p>";
                    graph += "<div style='height: " + (time/totalTaskTime * 100) + "%; width: 100%;' class='" + previousPage + "-graph'>" + previousPage + "</div>";
                }
            });

            output += "</div>";
            graph += "</div>";

            $("#output").html(output + graph);
        } catch(e) {
            $("#output").html("<p class='text-danger'>Invalid data format</p>");
            console.log(e);
        }

        //Graph styles
        console.log($("timeline").height());
        $("#graph").height($("#timeline").height());
    });
});