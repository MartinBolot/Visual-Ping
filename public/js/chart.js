// d3 chart
var n = 1; // number of layers
var m = MAX_DISPLAY; // number of samples per layer
var stack = d3.layout.stack();
var values = []; //default values
var layers = stack([values]);
// var yGroupMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y; }); });
var yStackMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); });

var margin = {top: 0, right: 10, bottom: 0, left: 10};
var width = d3.select(".chart").property("clientWidth") - 50;
var height = 500; // max ping

var x = d3.scale.ordinal()
    .domain(d3.range(m))
    .rangeRoundBands([0, width], .08);

var y = d3.scale.linear()
    .domain([0, yStackMax])
    .range([height, 0]);

var color = d3.scale.linear()
    .domain([0, n - 1])
    .range(["#aad", "#556"]);

var xAxis = d3.svg.axis()
    .scale(x)
    .tickSize(0)
    .tickPadding(10)
    .orient("bottom");

var svg = d3.select(".chart").append("svg")
    .attr("width", width - margin.right - margin.left)
    .attr("height", height + 30)
    .append("g");

var layer = svg.selectAll(".layer")
    .data(layers)
    .enter().append("g")
    .attr("class", "layer")
    .style("fill", function(d, i) { return color(i); });

var rect = layer.selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
    .attr("x", function(d) { return x(d.x); })
    .attr("y", height)
    .attr("width", x.rangeBand())
    .attr("height", 0);

rect.transition()
    .delay(function(d, i) { return i * 10; })
    .attr("y", function(d) { return y(d.y0 + d.y); })
    .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); });

svg.append("g")
    .attr("class", "x_axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

d3.selectAll("g.tick text").each(function(d) {
    d3.select(this).text("");
});
