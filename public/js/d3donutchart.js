
function createDonutChart(data, config){
    var width = 800,
    height = 250,
    radius = Math.min(config.width, config.height) / 2;

    var color = d3.scale.ordinal()
        .range(config.colors);
    //var color = d3.scale.category10();

    var pie = d3.layout.pie()
        .sort(null)
        .value(function (d) {
            return d.amnt;
        });

    var arc = d3.svg.arc()
        .outerRadius(config.radius - 10)
        .innerRadius(config.radius - 70);

    var labelArc = d3.svg.arc()
        .outerRadius(config.radius - 40)
        .innerRadius(config.radius - 40);

    var svg = d3.select(config.el).append("svg")
        .attr("width", config.width)
        .attr("height", config.height)
            .append("g")
            .attr("transform", "translate(" + config.width / 2 + 
                                        "," + config.height / 2 + ")");

    var g = svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .style("fill", function (d) {
            return color(d.data.type);
        })
        .style("stroke", function (d) {
            return color(d.data.type);
        });

    g.append("text")
        .attr("transform", function (d) {
            return "translate(" + arc.centroid(d) + ")";
        })
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .text(function (d) {
            return d.data.type;
        });
}
