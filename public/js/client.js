var socket = io.connect('http://localhost:3000');
var pingsNumber = 0;
var total = 0;
var time = 0;
var average = 0;
var MAX_DISPLAY = 30;

// when a ping command result is recieved
socket.on('ping', function (pingResult) {
    if (pingResult) {
        time = parseInt(pingResult.time) || 0;
        total += time;
        average = Math.round(total / (pingsNumber+1));
        d3.select(".average_value").text(average.toString());

        if (pingsNumber < MAX_DISPLAY) {
            values.push({ x:pingsNumber, y:time });
        } else {
            for (var i = 0; i < (values.length -1); i++) {
                values[i].y = values[i+1].y;
            }
            values[(values.length -1)].y = time;
        }

        d3.select("g.layer").selectAll("rect").remove();

        layer.selectAll("g.layer")
            .data(values)
            .enter().append("rect")
            .attr("x", function(d) { return x(d.x % MAX_DISPLAY); })
            .attr("y", function(d) { return (height-d.y); })
            .attr("height", function(d) { return d.y; })
            .attr("width", x.rangeBand());

        d3.selectAll("g.tick text").each(function(d) {
            d3.select(this).text(function(d) { return values[d] ? values[d].y : "" });
        });

        pingsNumber++;
    }

});
